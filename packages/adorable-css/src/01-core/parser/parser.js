// 파서 함수 (JavaScript)
import { createParser, createTokenizer } from './parser-utils.js'

const tokenize = createTokenizer([
  ['(ws)', /(\s+)/],
  ['(hexcolor)', /(#[0-9a-fA-F]{3,8}(?:\.[0-9]+)*)/],
  ['(dimension-pair)', /((?:[0-9]*\.[0-9]+|[0-9]+)[%a-z]*[x:](?:[0-9]*\.[0-9]+|[0-9]+)[%a-z]*)/],
  ['(dimension)', /((?:[0-9]*\.[0-9]+|[0-9]+)[%a-z]*)/],
  ['(string)', /('(?:[^']|\\')*'|"(?:[^"]|\\")*")/],
  ['(color-opacity)', /([a-zA-Z]+(?:-[0-9]+)*\.[0-9]+)/],
  ['(ident)', /(-*[_a-zA-Z\u00A0-\uFFFF][_a-zA-Z0-9\u00A0-\uFFFF-]*)/],
  ['(range)', /(\.\.\.|\.\.)/],
  ['(operator)', /({{|}}|!important|::|>>|[-+~|*/%!#@?&:;.,<>=[\](){}])/],
  ['(unknown)', /./],
])

export function parseAdorableCSS(input) {
  const tokens = tokenize(input)
  const { options, consume, many, many1, many_sep, many1_sep, optional, eof } = createParser(tokens)

  const skipWs = () => many(() => consume('(ws)'))

  const matchValue = () =>
    options(
      () => consume('(dimension)'),
      () => consume('(hexcolor)'),
      () => consume('(color-opacity)'),
      () => consume('(ident)'),
      () => consume('(string)'),
    )

  // 셀렉터 파싱 (간소화)
  const parseSelector = (allowCombinators = true) => {
    const at = optional(() => consume('@'))
    const selector = options(
      () => parseLiteral('{{'),
      () => parseLiteral('{'),
      () => parseFunction(),
      () => parsePosition(),
      () => parseRange(),
      () => consume('(ident)'),
      () => consume('&'),
    )
    const important = many(() => consume('!'))
      .map((v) => v.image)
      .join('')

    const combinators = allowCombinators ? many(() => parseCombinator()) : []

    return {
      type: 'selector',
      combinator: '',
      selector,
      important,
      combinators,
      image: (at ? '@' : '') + selector.image + important + combinators.map((c) => c.image).join(''),
    }
  }

  const parseCombinator = () => {
    const combinator = many1(() =>
      options(
        () => consume(':'),
        () => consume('.'),
        () => consume('>'),
        () => consume('>>'),
        () => consume('+'),
        () => consume('~'),
        () => consume('#'),
        () => consume('::'),
      ),
    )
      .map((v) => v.image)
      .join('')

    const selector = parseSelector(false)

    const important = many(() => consume('!'))
      .map((v) => v.image)
      .join('')

    return { type: 'selector', combinator, selector, important, image: `${combinator}${selector.image}${important}` }
  }

  const SelectorList = () => {
    skipWs()
    const selectors = [parseSelector()]
    many(() => {
      skipWs()
      const sel = optional(() => parseSelector())
      if (sel) selectors.push(sel)
    })
    skipWs()
    return { type: 'selector', value: selectors, image: selectors.map((s) => s.image).join(' ') }
  }

  // Range 통합 (기존 스펙 호환 + 확장)
  const parseRange = () => {
    // ..로 시작하는 경우 (max-only)
    const startRange = optional(() => consume('(range)'))
    if (startRange) {
      const max = parseNonRangeTerm()
      return {
        type: 'range',
        parts: [max],
        ranges: [startRange.image],
        min: null,
        max,
        preferred: null,
        image: startRange.image + max.image,
      }
    }

    // 일반적인 min..max 케이스 - 첫 번째 term을 파싱하고 range 토큰이 있는지 확인
    const firstTerm = parseNonRangeTerm()
    const rangeToken = optional(() => consume('(range)'))
    
    if (!rangeToken) {
      // 범위가 아니면 실패
      throw new Error('Not a range')
    }

    const parts = [firstTerm],
      ranges = [rangeToken.image]
    
    // 두 번째 term 파싱
    const secondTerm = optional(() => parseNonRangeTerm())
    if (secondTerm) parts.push(secondTerm)
    
    // 추가 범위 토큰들 파싱 (triple range 등)
    let additionalRangeToken
    while ((additionalRangeToken = optional(() => consume('(range)')))) {
      ranges.push(additionalRangeToken.image)
      const term = optional(() => parseNonRangeTerm())
      if (term) parts.push(term)
      else break
    }

    // 기존 스펙 호환: min, max, preferred 필드 제공
    return {
      type: parts.length === 3 ? 'triple-range' : parts.length > 3 ? 'multi-range' : 'range',
      parts,
      ranges,
      min: parts[0] || null,
      max: parts.length > 1 ? parts[parts.length - 1] : null,
      preferred: parts.length === 3 ? parts[1] : null,
      image: parts.map((p, i) => p.image + (ranges[i] || '')).join(''),
    }
  }

  // 범위가 아닌 term들만 파싱하는 헬퍼 함수
  const parseNonRangeTerm = () =>
    options(
      () => parseFunction(),
      () => parseKeyValue(),
      () => {
        const minus = optional(() => consume('-'))
        const d = consume('(dimension)')
        return { ...d, image: minus ? `-${d.image}` : d.image }
      },
      () => consume('(dimension-pair)'),
      () => matchValue(),
    )

  // 한 줄로 압축된 파서들
  const parseFunction = () => {
    const name = consume('(ident)')
    consume('(')
    const args = many_sep(
      () => parseExpr(),
      () =>
        options(
          () => consume('/'),
          () => consume(','),
        ),
    )
    consume(')')
    return {
      type: 'function',
      name: name.image,
      args,
      image: `${name.image}(${args
        .flat()
        .map((v) => v.image)
        .join('')})`,
    }
  }

  const parseKeyValue = () => {
    const key = consume('(ident)')
    consume(':')
    const value = parseExpr()
    return { type: 'keyValue', key: key.image, value, image: `${key.image}:${value.image}` }
  }

  const parsePosition = () => {
    consume('(')
    const x = parseTerm()
    consume(',')
    skipWs()
    const y = parseTerm()
    consume(')')
    return { type: 'position', x, y, image: `(${x.image},${y.image})` }
  }

  const parseExpr = () => {
    const value = many1_sep(
      () => parseTerm(),
      () =>
        options(
          () => consume('+'),
          () => consume('-'),
          () => consume('*'),
        ),
    )
    
    // If only one term without operators, return the term directly
    if (value.length === 1) {
      return value[0]
    }
    
    return { type: 'expr', value, image: value.map((v) => v.image).join('') }
  }

  const parseTerm = () =>
    options(
      () => parseRange(),
      () => parseNonRangeTerm(),
    )

  // Literal parsing (초간결 꼼수)
  const parseLiteral = (openBrace) => {
    const isNested = openBrace === '{{'
    consume(openBrace)
    let raw = '',
      depth = 0

    while (true) {
      const token = optional(() =>
        options(
          () => consume('(operator)'),
          () => consume('(ident)'),
          () => consume('(dimension)'),
          () => consume('(hexcolor)'),
          () => consume('(string)'),
          () => consume('(ws)'),
          () => consume('(color-opacity)'),
          () => consume('(dimension-pair)'),
          () => consume('(range)'),
          () => consume('(unknown)'),
        ),
      )
      if (!token) break
      if (isNested && token.image === '}}' && depth === 0) {
        optional(() => consume('(operator)'))
        break
      }
      if (!isNested && token.image === '}' && depth === 0) break
      raw += token.image
      if (token.image === '{') depth++
      if (token.image === '}') depth--
    }

    if (isNested) {
      raw = raw.replace(/}}$/, '')
      const match = raw.match(/^([^{]+)\{(.+?)\}?$/)
      if (!match) throw new Error(`Invalid nested CSS literal: ${raw}`)
      return {
        type: 'css_nested_literal',
        selector: match[1].trim(),
        properties: match[2].replace(/_/g, ' '),
        image: `{{${raw}}}`,
      }
    }
    return { type: 'css_literal', value: [], image: `{${raw.replace(/_/g, ' ')}}` }
  }

  return eof(SelectorList())
}
