export const createTokenizer = (lex) => {
  const regex = new RegExp(lex.map((v) => v[1].source).join('|'), 'g')

  return (script) => {
    const tokens = []

    script.replace(regex, (image, ...args) => {
      const type = lex[args.findIndex((v) => v !== undefined)][0]
      tokens.push({ type, image })
      return image
    })

    return tokens
  }
}

// 함수형 파서 콤비네이터 라이브러리
export const createParser = (tokens) => {
  let pos = 0

  const peek = () => (pos < tokens.length ? tokens[pos] : null)

  const consume = (typeOrValue) => {
    const token = peek()
    if (!token) throw new Error(`Expected ${typeOrValue}, got EOF`)
    if (token.type === typeOrValue || token.image === typeOrValue) {
      pos++
      return token
    }
    throw new Error(`Expected ${typeOrValue}, got ${token.image || token.type}`)
  }

  const options = (...parsers) => {
    const startPos = pos
    for (const parser of parsers) {
      try {
        return parser()
      } catch {
        pos = startPos
      }
    }
    throw new Error(`All options failed at ${pos}`)
  }

  const many = (parser) => {
    const results = []
    while (pos < tokens.length) {
      const startPos = pos
      try {
        results.push(parser())
        if (pos === startPos) {
          throw new Error(`Infinite loop detected at ${pos}: parser succeeded without consuming input`)
        }
      } catch {
        pos = startPos
        break
      }
    }
    return results
  }

  const optional = (parser) => {
    const startPos = pos
    try {
      return parser()
    } catch {
      pos = startPos
      return null
    }
  }

  const many1 = (parser) => [parser(), ...many(parser)]

  const many_sep = (parser, sepParser) => {
    const first = optional(parser)
    if (first === null) return []
    return [first, ...many(() => [sepParser(), parser()]).flat(1)]
  }

  const many1_sep = (parser, sepParser) => [parser(), ...many(() => [sepParser(), parser()]).flat(1)]

  const eof = (v) => {
    if (pos < tokens.length) {
      throw new Error(`Unexpected token at ${pos}: ${tokens[pos].image} not EOF.`)
    }
    return v
  }

  return { peek, consume, options, many, many1, many_sep, many1_sep, optional, eof }
}
