// 파서 함수
import { createParser, createTokenizer } from "./parser-utils";
import { createMemo } from "../utils/memo";

const tokenize = createTokenizer([
  ["(ws)", /(\s+)/],
  ["(hexcolor)", /(#[0-9a-fA-F]{3,8}(?:\.[0-9]+)*)/],
  ["(dimension-pair)", /((?:[0-9]*\.[0-9]+|[0-9]+)[%a-z]*[x:](?:[0-9]*\.[0-9]+|[0-9]+)[%a-z]*)/], // matches 64x64, 100%x50px, 16:9, etc
  ["(dimension)", /((?:[0-9]*\.[0-9]+|[0-9]+)[%a-z]*)/],
  ["(string)", /('(?:[^']|\\')*'|"(?:[^"]|\\")*")/],
  ["(color-opacity)", /([a-zA-Z]+(?:-[0-9]+)*\.[0-9]+)/], // matches white.8, yellow-200.5
  ["(ident)", /(-*[_a-zA-Z\u00A0-\uFFFF][_a-zA-Z0-9\u00A0-\uFFFF-]*)/],
  ["(range)", /(\.\.\.|\.\.)/],
  ["(operator)", /(!important|::|>>|[-+~|*/%!#@?&:;.,<>=[\](){}])/],
  ["(unknown)", /./],
]);

function _parseAdorableCSS(input: string) {
  const tokens = tokenize(input);

  const { options, consume, many, many1, many_sep, many1_sep, optional, eof } =
    createParser(tokens);

  // 화이트스페이스 스킵 헬퍼
  const skipWs = () => {
    many(() => consume("(ws)"));
  };

  function SelectorList() {
    skipWs();
    const selectors = [];

    // 첫 번째 셀렉터
    const first = optional(() => SingleSelector());
    if (first) {
      selectors.push(first);
    }

    // 나머지 셀렉터들 (스페이스로 구분)
    many(() => {
      skipWs();
      const selector = optional(() => SingleSelector());
      if (selector) {
        selectors.push(selector);
      }
    });

    skipWs();

    return {
      type: "selector",
      value: selectors,
      image: selectors.map((s) => s.image).join(" "),
    };
  }

  function SingleSelector() {
    const at = optional(() => consume("@"));
    const selector = SimpleSelector();
    const important = many(() => consume("!"))
      .map((v) => v.image)
      .join("");

    const combinator = many(() => CombinatorSelector());

    return {
      type: "selector",
      combinator: "",
      selector,
      important,
      combinators: combinator,
      image:
        (at ? "@" : "") +
        selector.image +
        important +
        combinator.map((c) => c.image).join(""),
    };
  }

  function SimpleSelector(): any {
    return options(
      () => Position(),
      () => CSSLiteral(),
      () => FunctionCall(),
      () => Range(),
      () => consume("(ident)"),
      () => consume("&")
    );
  }

  function Position(): any {
    consume("(");
    const x = Term();
    consume(",");
    skipWs();
    const y = Term();
    consume(")");
    return {
      type: "position",
      x,
      y,
      image: `(${x.image},${y.image})`,
    };
  }

  function CombinatorSelector(): any {
    const combinator = many1(() =>
      options(
        () => consume(":"),
        () => consume("."),
        () => consume(">"),
        () => consume(">>"),
        () => consume("+"),
        () => consume("~"),
        () => consume("#"),
        () => consume("::")
      )
    )
      .map((v: any) => v.image)
      .join("");

    const selector = SimpleSelector();
    const important = many(() => consume("!"))
      .map((v: any) => v.image)
      .join("");

    return {
      type: "selector",
      combinator: combinator,
      selector,
      important,
      image: `${combinator}${selector.image}${important}`,
    };
  }

  function Range(): any {
    return options(
      // Triple range: 10..5vw..20 (min..preferred..max)
      () => {
        const min = Term();
        const range1 = consume("(range)").image;
        const preferred = Term();
        const range2 = consume("(range)").image;
        const max = Term();
        return {
          type: "triple-range",
          min,
          preferred,
          max,
          range: range1 + range2,
          image: `${min.image}${range1}${preferred.image}${range2}${max.image}`,
        };
      },

      // 10..20
      () => {
        const min = Term();
        const range = consume("(range)").image;
        const max = Term();
        return {
          type: "range",
          min,
          max,
          range,
          image: `${min.image}${range}${max.image}`,
        };
      },

      // 10..
      () => {
        const min = Term();
        const range = consume("(range)").image;
        return {
          type: "range",
          min,
          max: null,
          range,
          image: `${min.image}${range}`,
        };
      },

      // ..10
      () => {
        const range = consume("(range)").image;
        const max = Term();
        return {
          type: "range",
          min: null,
          max,
          range,
          image: `${range}${max.image}`,
        };
      }
    );
  }

  function FunctionCall(): any {
    const name = consume("(ident)");

    consume("(");

    const args = many_sep(Arg, () =>
      options(
        () => consume("/"),
        () => consume(",")
      )
    );

    consume(")");

    return {
      type: "function",
      name: name.image,
      args,
      image: `${name.image}(${args
        .flat()
        .map((v: any) => v.image)
        .join("")})`,
    };
  }

  function Arg(): any {
    return options(
      () => FunctionCall(),
      () => Range(),
      () => KeyValue(),
      () => CombinatorSelector(),
      () => Expr(),
      () => consume("-")
    );
  }

  function KeyValue(): any {
    const key = consume("(ident)");
    consume(":");
    const value = Expr();

    return {
      type: "keyValue",
      key: key.image,
      value,
      image: `${key.image}:${value.image}`,
    };
  }

  function Expr(): any {
    const value = many1_sep(Term, () =>
      options(
        () => consume("+"),
        () => consume("-"),
        () => consume("*")
      )
    );

    return {
      type: "expr",
      value,
      image: value.map((v: any) => v.image).join(""),
    };
  }

  function ColorValue(): any {
    return options(
      () => consume("(hexcolor)"),      // #fff, #000000
      () => consume("(color-opacity)"), // white.8, yellow-200.5
      () => consume("(ident)")          // blue-500, primary, etc
    );
  }

  function Term(): any {
    return options(
      () => CSSFunc(),
      () => {
        const minus = optional(() => consume("-"));
        const dimension = consume("(dimension)");
        return {
          ...dimension,
          image: minus ? `-${dimension.image}` : dimension.image,
        };
      },
      () => consume("(dimension-pair)"),
      () => ColorValue(),  // All color-related parsing in one place
      () => consume("(string)")
    );
  }

  function CSSFunc(): any {
    const name = consume("(ident)");

    consume("(");

    const args = many_sep(Expr, () =>
      options(
        () => consume("/"),
        () => consume(",")
      )
    );

    consume(")");

    return {
      type: "css_function",
      name: name.image,
      args,
      image: `${name.image}(${args
        .flat()
        .map((v: any) => v.image)
        .join("")})`,
    };
  }

  function CSSLiteral(): any {
    const value: any[] = [];

    consume("{");

    many(() => {
      optional(() => value.push(consume(";")));

      value.push(consume("(ident)"));
      value.push(consume(":"));

      value.push(
        ...many(() =>
          options(
            () => consume("(dimension)"),
            () => consume("(hexcolor)"),
            () => consume("(string)"),
            () => CSSFunc(),
            () => consume("(ident)")
          )
        )
      );

      optional(() => value.push(consume("!important")));
      optional(() => value.push(consume(";")));
    });

    consume("}");

    return {
      type: "css_literal",
      value,
      image:
        "{" +
        value
          .map((v: any) => v.image)
          .join("")
          .replace(/_/g, " ") +
        "}",
    };
  }

  const r = SelectorList();
  eof(r);
  return r;
}

// Export memoized version
export const parseAdorableCSS = createMemo(_parseAdorableCSS);
