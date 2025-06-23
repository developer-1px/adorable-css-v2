// Simple test to verify the parser works
import { parseAdorableCSS } from './parser/parser'
import { generateCSSFromAdorableCSS } from './parser/generator'

console.log('Testing AdorableCSS Parser...')

// Test Typography rules first
const typographyTests = [
  'c(#ff0000)',
  'c(#000.5)', 
  'font(16)',
  'font(Inter)',
  'font(Inter/16/24)',
  'text(center)',
  'italic',
  'underline',
  'uppercase'
]

console.log('\n=== Typography Tests ===')
typographyTests.forEach(test => {
  try {
    const parsed = parseAdorableCSS(test)
    const css = generateCSSFromAdorableCSS(test)
    console.log(`✓ ${test} -> ${css}`)
  } catch (error: any) {
    console.log(`✗ ${test} -> Error: ${error.message}`)
  }
})

// Test layout utilities
const layoutTests = [
  'block',
  'hbox',
  'vbox',
  'w(300)',
  'h(200)',
  'w(fill)',
  'h(auto)',
  'p(16)',
  'mx(auto)',
  'gap(16)'
]

console.log('\n=== Layout Tests ===')
layoutTests.forEach(test => {
  try {
    const parsed = parseAdorableCSS(test)
    const css = generateCSSFromAdorableCSS(test)
    console.log(`✓ ${test} -> ${css}`)
  } catch (error: any) {
    console.log(`✗ ${test} -> Error: ${error.message}`)
  }
})

// Test visual utilities
const visualTests = [
  'bg(#fff)',
  'bg(transparent)',
  'b(1)',
  'b(2/#000/solid)',
  'r(8)',
  'r()',
  'shadow(md)',
  'opacity(.5)'
]

console.log('\n=== Visual Tests ===')
visualTests.forEach(test => {
  try {
    const parsed = parseAdorableCSS(test)
    const css = generateCSSFromAdorableCSS(test)
    console.log(`✓ ${test} -> ${css}`)
  } catch (error: any) {
    console.log(`✗ ${test} -> Error: ${error.message}`)
  }
})

// Test position utilities
const positionTests = [
  'absolute',
  'relative',
  'top(10)',
  'z(10)',
  'layer(top:20)',
  'layer(left:30)'
]

console.log('\n=== Position Tests ===')
positionTests.forEach(test => {
  try {
    const parsed = parseAdorableCSS(test)
    const css = generateCSSFromAdorableCSS(test)
    console.log(`✓ ${test} -> ${css}`)
  } catch (error: any) {
    console.log(`✗ ${test} -> Error: ${error.message}`)
  }
})

// Test interaction utilities
const interactionTests = [
  'pointer',
  'cursor(pointer)',
  'select(none)',
  'no-select'
]

console.log('\n=== Interaction Tests ===')
interactionTests.forEach(test => {
  try {
    const parsed = parseAdorableCSS(test)
    const css = generateCSSFromAdorableCSS(test)
    console.log(`✓ ${test} -> ${css}`)
  } catch (error: any) {
    console.log(`✗ ${test} -> Error: ${error.message}`)
  }
})

// Test pseudo-class combinations
const pseudoTests = [
  'hover:c(blue)',
  'hover:bg(red)',
  'focus:b(2/#000)'
]

console.log('\n=== Pseudo-class Tests ===')
pseudoTests.forEach(test => {
  try {
    const parsed = parseAdorableCSS(test)
    const css = generateCSSFromAdorableCSS(test)
    console.log(`✓ ${test} -> ${css}`)
  } catch (error: any) {
    console.log(`✗ ${test} -> Error: ${error.message}`)
  }
})

console.log('\nParser test completed!')