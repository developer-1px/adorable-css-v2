import { describe, it, expect } from 'vitest';
import { generateClass } from './generator';

describe('CSS Priority System', () => {
  it('should allow c (utility) to override card (component) color', () => {
    // Test color override
    const cCSS = generateClass('c(red)');
    const cardCSS = generateClass('card(gradient)');
    
    // c should have higher specificity selector
    expect(cCSS).toContain('.c\\(red\\).c\\(red\\)');
    expect(cCSS).toContain('color:red');
    
    // card should have normal specificity 
    expect(cardCSS).toContain('.card\\(gradient\\)');
    expect(cardCSS).toContain('color:white');
    
    console.log('c(red) CSS:', cCSS);
    console.log('card(gradient) CSS:', cardCSS);
  });

  it('should demonstrate priority ordering in multi-class scenarios', () => {
    // In real usage, both classes would be applied to same element
    // CSS cascade should make c(red) win due to higher specificity
    const cCSS = generateClass('c(blue)');
    const cardCSS = generateClass('card(gradient)');
    
    // Verify that c has boosted specificity
    expect(cCSS).toContain('.c\\(blue\\).c\\(blue\\)');
    
    // Verify that card has normal specificity  
    expect(cardCSS).toContain('.card\\(gradient\\)');
    expect(cardCSS).not.toContain('.card\\(gradient\\).card\\(gradient\\)');
  });

  it('should sort CSS 03-rules by priority within single class', () => {
    // This would be a complex class with multiple 03-rules of different priorities
    // For now, test individual classes to verify the system works
    const utilityCSS = generateClass('c(green)');
    expect(utilityCSS).toContain('.c\\(green\\).c\\(green\\)'); // Utility gets boosted specificity
  });

  it('should handle component 03-rules with normal specificity', () => {
    const componentCSS = generateClass('card');
    expect(componentCSS).toContain('.card{');
    expect(componentCSS).not.toContain('.card.card{'); // No specificity boost for 04-components
  });

  it('should demonstrate real-world CSS cascade priority', () => {
    // In real HTML: <div class="card(gradient) c(red)">
    // Both CSS 03-rules would be generated, but c(red) should win due to:
    // 1. Higher specificity (.c\(red\).c\(red\) vs .card\(gradient\))
    // 2. Later in cascade (if same specificity)
    
    const cardCSS = generateClass('card(gradient)');
    const cCSS = generateClass('c(red)');
    
    // Demonstrate the specificity difference
    console.log('CSS Cascade Example:');
    console.log('Component (lower specificity):', cardCSS.includes('color:white'));
    console.log('Utility (higher specificity):', cCSS.includes('.c\\(red\\).c\\(red\\)'));
    
    // In browser, the utility rule would win:
    // .card\(gradient\) { color: white; }           /* specificity: 0,1,0 */
    // .c\(red\).c\(red\) { color: red; }            /* specificity: 0,2,0 */
    
    expect(cardCSS).toContain('color:white');
    expect(cCSS).toContain('color:red');
    expect(cCSS).toContain('.c\\(red\\).c\\(red\\)'); // Higher specificity wins
  });
});