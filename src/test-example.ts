// Simple test to verify the parser works
import { parseAdorableCSS } from './myparser/parser'
import { generateCSSFromAdorableCSS } from './myparser/generator'

console.log('Testing AdorableCSS Parser...')

// Test basic utilities
const basicTests = [
  'block',
  'hbox',
  'w(300)',
  'p(16)',
  'bg(#fff)',
  'hover:bg(blue)',
  'sm:w(300)'
]

basicTests.forEach(test => {
  try {
    const parsed = parseAdorableCSS(test)
    const css = generateCSSFromAdorableCSS(test)
    console.log(`✓ ${test} -> ${css}`)
  } catch (error) {
    console.log(`✗ ${test} -> Error: ${error.message}`)
  }
})

console.log('Parser test completed!')