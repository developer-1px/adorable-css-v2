// Simplified CSS generator for AdorableCSS v2 CDN
// This is a standalone version that doesn't depend on the UnoCSS parser

interface CSSRule {
  [property: string]: string | number | undefined
}

type CSSGenerator = (value?: string) => CSSRule | string

// CSS utility functions
const px = (value: string | number): string => {
  if (value === 0 || value === '0') return '0'
  return +value === +value ? value + 'px' : String(value)
}

const makeColor = (value: string): string => {
  if (value === 'transparent') return 'transparent'
  
  // Gradient support: red..blue or #ff0000..#0000ff
  if (value.includes('..')) {
    const [start, end] = value.split('..')
    return `linear-gradient(90deg, ${start}, ${end})`
  }
  
  if (value.startsWith('#') && value.includes('.')) {
    const [rgb, a] = value.split('.')
    if (rgb.length === 4) {
      return `rgba(${rgb.slice(1).split('').map(v => parseInt(v + v, 16)).join(',')},0.${a})`
    }
    if (rgb.length === 7) {
      const r = parseInt(rgb.slice(1, 3), 16)
      const g = parseInt(rgb.slice(3, 5), 16)
      const b = parseInt(rgb.slice(5, 7), 16)
      return `rgba(${r},${g},${b},0.${a})`
    }
  }
  return value
}

const makeBackground = (value: string): string => {
  if (value === 'transparent') return 'transparent'
  
  // Radial gradient: radial/#10b981.1/#059669.0
  if (value.startsWith('radial/')) {
    const parts = value.split('/')
    const colors = parts.slice(1).join(', ')
    return `radial-gradient(circle, ${colors})`
  }
  
  // Complex gradient: gradient/135deg/#667eea/#764ba2
  if (value.startsWith('gradient/')) {
    const parts = value.split('/')
    const angle = parts[1] || '90deg'
    const colors = parts.slice(2).join(', ')
    return `linear-gradient(${angle}, ${colors})`
  }
  
  // Simple gradient: #667eea..#764ba2  
  if (value.includes('..')) {
    const [start, end] = value.split('..')
    return `linear-gradient(135deg, ${start}, ${end})`
  }
  
  return makeColor(value)
}

const makeBorder = (value: string): string => {
  if (!value || value === 'none') return 'none'
  const parts = value.split('/')
  
  // For non-directional borders: width/style/color or width/color
  if (parts.length === 1) {
    // Just width
    return `${px(parts[0])} solid currentColor`
  } else if (parts.length === 2) {
    // width/style or width/color
    const width = px(parts[0])
    const second = parts[1]
    // Check if second part is a style or color
    const borderStyles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']
    if (borderStyles.includes(second)) {
      return `${width} ${second} currentColor`
    } else {
      return `${width} solid ${makeColor(second)}`
    }
  } else {
    // width/style/color
    const width = px(parts[0])
    const style = parts[1] || 'solid'
    const color = parts[2] ? makeColor(parts[2]) : 'currentColor'
    return `${width} ${style} ${color}`
  }
}

// Basic CSS rules for AdorableCSS v2
const cssRules: Record<string, CSSGenerator> = {
  // Layout
  'hbox': (value = '') => {
    const rules: CSSRule = { display: 'flex', 'flex-direction': 'row' }
    if (value) {
      if (value === 'pack') {
        rules['justify-content'] = 'center'
        rules['align-items'] = 'center'
      } else {
        const [justify, align] = value.split('+')
        if (justify === 'center') rules['justify-content'] = 'center'
        else if (justify === 'between') rules['justify-content'] = 'space-between'
        else if (justify === 'around') rules['justify-content'] = 'space-around'
        else if (justify === 'end') rules['justify-content'] = 'flex-end'
        
        if (align === 'center') rules['align-items'] = 'center'
        else if (align === 'end') rules['align-items'] = 'flex-end'
        else if (align === 'stretch') rules['align-items'] = 'stretch'
      }
    }
    return rules
  },
  'vbox': (value = '') => {
    const rules: CSSRule = { display: 'flex', 'flex-direction': 'column' }
    if (value) {
      if (value === 'pack') {
        rules['justify-content'] = 'center'
        rules['align-items'] = 'center'
      } else {
        const [justify, align] = value.split('+')
        if (justify === 'center') rules['justify-content'] = 'center'
        else if (justify === 'between') rules['justify-content'] = 'space-between'
        else if (justify === 'around') rules['justify-content'] = 'space-around'
        else if (justify === 'end') rules['justify-content'] = 'flex-end'
        
        if (align === 'center') rules['align-items'] = 'center'
        else if (align === 'end') rules['align-items'] = 'flex-end'
        else if (align === 'stretch') rules['align-items'] = 'stretch'
      }
    }
    return rules
  },
  'pack': () => ({ display: 'flex', 'justify-content': 'center', 'align-items': 'center' }),
  
  // Sizing
  'w': (value = '') => {
    if (value === 'hug') return { width: 'fit-content' }
    if (value === 'fill') return { width: '100%' }
    return { width: px(value) }
  },
  'h': (value = '') => {
    if (value === 'hug') return { height: 'fit-content' }
    if (value === 'fill') return { height: '100%' }
    if (value === 'screen') return { height: '100vh' }
    return { height: px(value) }
  },
  
  // Position
  'absolute': () => ({ position: 'absolute' }),
  'relative': () => ({ position: 'relative' }),
  'fixed': () => ({ position: 'fixed' }),
  'x': (value = '') => ({ left: px(value) }),
  'y': (value = '') => ({ top: px(value) }),
  'z': (value = '') => ({ 'z-index': value }),
  
  // Spacing
  'p': (value = '') => ({ padding: value.split('/').map(px).join(' ') }),
  'm': (value = '') => ({ margin: value.split('/').map(px).join(' ') }),
  'gap': (value = '') => ({ gap: value.split('/').map(px).join(' ') }),
  
  // Visual
  'bg': (value = '') => ({ background: makeBackground(value) }),
  'c': (value = '') => {
    const color = makeColor(value)
    if (color.includes('linear-gradient')) {
      return { 
        background: color,
        '-webkit-background-clip': 'text',
        'background-clip': 'text',
        '-webkit-text-fill-color': 'transparent'
      }
    }
    return { color }
  },
  'b': (value = '') => ({ border: makeBorder(value) }),
  'r': (value = '') => ({ 'border-radius': value === '' ? '9999px' : px(value) }),
  
  // Typography
  'font': (value = '') => {
    const parts = value.split('/')
    const rules: CSSRule = {}
    if (parts[0]) rules['font-size'] = px(parts[0])
    if (parts[1]) rules['line-height'] = +parts[1] < 4 ? parts[1] : px(parts[1])
    if (parts[2]) rules['letter-spacing'] = parts[2]
    if (parts[3]) rules['font-weight'] = parts[3]
    return rules
  },
  'bold': () => ({ 'font-weight': '700' }),
  'italic': () => ({ 'font-style': 'italic' }),
  'underline': () => ({ 'text-decoration': 'underline' }),
  'strike': () => ({ 'text-decoration': 'line-through' }),
  
  // Text
  'text': (value = '') => {
    const alignments = ['left', 'center', 'right', 'justify']
    if (alignments.includes(value)) {
      return { 'text-align': value }
    }
    return { 'text-align': 'left' }
  },
  'nowrap': () => ({ 'white-space': 'nowrap' }),
  'uppercase': () => ({ 'text-transform': 'uppercase' }),
  'lowercase': () => ({ 'text-transform': 'lowercase' }),
  
  // Effects
  'opacity': (value = '') => ({ opacity: value }),
  'blur': (value = '') => ({ filter: `blur(${px(value)})` }),
  'shadow': (value = '') => {
    const shadows = {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
    }
    return { 'box-shadow': shadows[value as keyof typeof shadows] || shadows.md }
  },
  
  // Transform
  'rotate': (value = '') => ({ transform: `rotate(${value}deg)` }),
  'scale': (value = '') => ({ transform: `scale(${value})` }),
  
  // Overflow
  'clip': () => ({ overflow: 'hidden' }),
  'scroll': (value = '') => {
    if (value === 'x') return { 'overflow-x': 'auto', 'overflow-y': 'hidden' }
    if (value === 'y') return { 'overflow-y': 'auto', 'overflow-x': 'hidden' }
    return { overflow: 'auto' }
  },
  
  // Display
  'none': () => ({ display: 'none' }),
  'hidden': () => ({ visibility: 'hidden' }),
  'block': () => ({ display: 'block' }),
  'inline': () => ({ display: 'inline' }),
  'inline-block': () => ({ display: 'inline-block' }),
  
  // Additional utilities
  'fit': () => ({ width: 'fit-content', height: 'fit-content' }),
  'fill': () => ({ width: '100%', height: '100%' }),
  'center': () => ({ 'text-align': 'center' }),
  'pointer': () => ({ cursor: 'pointer' }),
  'select-none': () => ({ 'user-select': 'none' }),
  'transition': () => ({ transition: 'all 0.2s ease' }),
  
  // Border utilities
  'border': (value = '') => {
    if (!value) return { border: '1px solid currentColor' }
    
    const parts = value.split('/')
    const directions = ['top', 'right', 'bottom', 'left']
    
    if (directions.includes(parts[0])) {
      const direction = parts[0]
      const remainingParts = parts.slice(1)
      
      if (remainingParts.length === 0) {
        return { [`border-${direction}`]: '1px solid currentColor' }
      } else if (remainingParts.length === 1) {
        return { [`border-${direction}`]: `${px(remainingParts[0])} solid currentColor` }
      } else if (remainingParts.length === 2) {
        const width = px(remainingParts[0])
        const second = remainingParts[1]
        const borderStyles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']
        if (borderStyles.includes(second)) {
          return { [`border-${direction}`]: `${width} ${second} currentColor` }
        } else {
          return { [`border-${direction}`]: `${width} solid ${makeColor(second)}` }
        }
      } else {
        const width = px(remainingParts[0])
        const style = remainingParts[1] || 'solid'
        const color = remainingParts[2] ? makeColor(remainingParts[2]) : 'currentColor'
        return { [`border-${direction}`]: `${width} ${style} ${color}` }
      }
    }
    
    return { border: makeBorder(value) }
  },
  
  // Advanced effects
  'backdrop': (value = '') => {
    if (value.startsWith('blur/')) {
      const blurValue = value.split('/')[1]
      return { 'backdrop-filter': `blur(${px(blurValue)})` }
    }
    return { 'backdrop-filter': value }
  },
  
  'text-shadow': (value = '') => {
    const parts = value.split('/')
    const x = parts[0] ? px(parts[0]) : '0'
    const y = parts[1] ? px(parts[1]) : '2px'
    const blur = parts[2] ? px(parts[2]) : '4px'
    const color = parts[3] || 'rgba(0,0,0,0.1)'
    return { 'text-shadow': `${x} ${y} ${blur} ${color}` }
  },
  
  'animate': (value = '') => {
    const parts = value.split('/')
    const name = parts[0] || 'none'
    const duration = parts[1] || '1s'
    const timing = parts[2] || 'ease'
    const iteration = parts[3] || '1'
    return { animation: `${name} ${duration} ${timing} ${iteration}` }
  },
  
  // Font family support
  'font-family': (value = '') => {
    const fontMap: Record<string, string> = {
      'sf-mono': "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
      'inter': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
      'system': "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
      'mono': "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
      'serif': "Georgia, 'Times New Roman', Times, serif"
    }
    return { 'font-family': fontMap[value] || value }
  }
}

// Parse simple AdorableCSS syntax
function parseAdorableCSSClass(className: string): { property: string; value?: string } | null {
  // Handle size syntax: 400x300
  if (/^\d+x\d+$/.test(className)) {
    const [w, h] = className.split('x')
    return { property: 'size', value: `${w}/${h}` }
  }
  
  // Handle aspect ratio: 16:9
  if (/^\d+:\d+$/.test(className)) {
    return { property: 'aspect-ratio', value: className.replace(':', '/') }
  }
  
  // Handle function syntax with complex property names: text-shadow(value), font-family(value)
  // Support nested parentheses like backdrop(brightness(1.2))
  const functionMatch = className.match(/^([a-zA-Z-]+)\((.*)\)$/)
  if (functionMatch) {
    return { property: functionMatch[1], value: functionMatch[2] }
  }
  
  // Handle simple property
  if (cssRules[className]) {
    return { property: className }
  }
  
  return null
}

// Generate CSS for a single class
function generateCSSForClass(className: string): string {
  const parsed = parseAdorableCSSClass(className)
  if (!parsed) {
    console.log(`❌ AdorableCSS: Failed to parse class "${className}"`)
    return ''
  }
  
  let rules: CSSRule | string = {}
  
  // Special cases
  if (parsed.property === 'size' && parsed.value) {
    const [w, h] = parsed.value.split('/')
    rules = { width: px(w), height: px(h) }
  } else if (parsed.property === 'aspect-ratio' && parsed.value) {
    const ratio = parsed.value.replace('/', '/')
    rules = { 'aspect-ratio': ratio }
  } else if (cssRules[parsed.property]) {
    rules = cssRules[parsed.property](parsed.value)
  } else {
    console.log(`❌ AdorableCSS: No rule found for property "${parsed.property}" in class "${className}"`)
    return ''
  }
  
  if (typeof rules === 'string') return rules
  if (typeof rules === 'object' && rules !== null) {
    const cssProps = Object.entries(rules)
      .map(([prop, value]) => `${prop}:${value}`)
      .join(';')
    
    if (cssProps) {
      // Escape CSS class name
      const escapedClassName = className.replace(/[^a-zA-Z0-9-_]/g, '\\$&')
      return `.${escapedClassName}{${cssProps};}`
    }
  }
  
  console.log(`❌ AdorableCSS: Empty rules generated for class "${className}"`)
  return ''
}

// Main CSS generation function
export function generateCSSFromAdorableCSS(classes: string[]): string {
  return classes
    .map(generateCSSForClass)
    .filter(Boolean)
    .join('\n')
}