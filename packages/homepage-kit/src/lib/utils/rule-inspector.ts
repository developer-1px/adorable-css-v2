// Rule inspection utilities for debugging and reference generation
// Note: Using dynamic imports to avoid build issues

export interface RuleInfo {
  name: string;
  category: string;
  handler: any; // Use any to avoid type issues
  sourceCode: string;
  examples: string[];
  cssOutput: Record<string, any>;
  cssRules: Record<string, string>; // CSS class selector 03-rules
}

export interface CategoryInfo {
  name: string;
  rules: RuleInfo[];
  count: number;
}

/**
 * Extract function source code as string
 */
function getFunctionSource(fn: Function): string {
  let source = fn.toString();
  
  // Clean up the source code for better readability
  source = source
    .replace(/^function\s*/, 'function ')
    .replace(/^\(\s*/, '(')
    .replace(/\s*\)\s*=>/, ') =>')
    .replace(/\{\s*\n\s*/, '{\n  ')
    .replace(/\n\s*\}/g, '\n}')
    .replace(/;\s*\n/g, ';\n  ')
    .replace(/,\s*\n/g, ',\n  ');
    
  return source;
}

/**
 * Generate example CSS output for a rule
 */
function generateExampleOutput(handler: any, examples: string[]): Record<string, any> {
  const output: Record<string, any> = {};
  
  examples.forEach(example => {
    try {
      const result = handler(example);
      output[example || '(no args)'] = result;
    } catch (error) {
      output[example || '(no args)'] = { error: 'Failed to generate' };
    }
  });
  
  return output;
}

/**
 * Generate CSS class 03-rules for examples
 */
async function generateCSSRules(ruleName: string, examples: string[]): Promise<Record<string, string>> {
  const cssRules: Record<string, string> = {};
  
  try {
    // Dynamic import CSS generator
    const { generateCSS } = await import('adorable-css');
    
    examples.forEach(example => {
      try {
        const className = example ? `${ruleName}(${example})` : ruleName;
        const cssOutput = generateCSS([className]);
        cssRules[example || '(no args)'] = cssOutput;
      } catch (error) {
        const displayName = example ? `${ruleName}(${example})` : ruleName;
        cssRules[example || '(no args)'] = `/* Error generating CSS for ${displayName} */`;
      }
    });
  } catch (error) {
    console.error('Failed to load CSS generator:', error);
  }
  
  return cssRules;
}

/**
 * Get common examples for different rule types
 */
function getExamplesForRule(ruleName: string): string[] {
  const exampleMap: Record<string, string[]> = {
    // Typography
    'font': ['lg', 'xl', '16px', 'lg/1.5', 'lg/1.5/-1%'],
    'bold': ['', '600', 'semi', 'bold'],
    'c': ['red', 'blue-500', 'gray-900', '#ff0000', 'red.5'],
    'italic': [''],
    'underline': [''],
    'uppercase': [''],
    
    // Layout
    'w': ['full', 'fill', 'hug', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'auto', 'screen'],
    'h': ['full', 'fill', 'hug', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'auto', 'screen'],
    'max-w': ['full', 'none', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'screen'],
    'min-w': ['full', 'auto', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'screen'],
    'max-h': ['full', 'none', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'screen'],
    'min-h': ['full', 'auto', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'screen'],
    'p': ['md', 'lg', '16px', 'sm/lg'],
    'px': ['md', 'lg', '16px'],
    'py': ['md', 'lg', '16px'],
    
    // Display
    'hbox': ['', 'center', 'middle', 'pack'],
    'vbox': ['', 'center', 'middle', 'pack'],
    'flex': [''],
    'grid': [''],
    
    // Background
    'bg': ['red', 'blue-500', '#ff0000', 'red.5', '135deg/red..blue'],
    
    // Border
    'r': ['md', 'lg', 'full', '8px'],
    'border': ['1', '2/red', '1/solid/gray-300'],
    
    // Position
    'absolute': [''],
    'relative': [''],
    'top': ['md', 'lg', '10px', 'auto'],
    'right': ['md', 'lg', '10px', 'auto'],
    'bottom': ['md', 'lg', '10px', 'auto'],
    'left': ['md', 'lg', '10px', 'auto'],
    'layer': ['', 'center', 'top+left', 'top:md+left:lg', 'top:20+left:30'],
    
    // Effects
    'shadow': ['sm', 'md', 'lg', 'xl'],
    'opacity': ['0.5', '0.8', '1'],
    'scale': ['1.05', '0.95', '1.1'],
    
    // Spacing
    'gap': ['sm', 'md', 'lg', '16px'],
    'space': ['sm', 'md', 'lg'],
  };
  
  return exampleMap[ruleName] || [''];
}

/**
 * Inspect a single rule and return detailed information
 */
export async function inspectRule(name: string, handler: any, category: string): Promise<RuleInfo> {
  const examples = getExamplesForRule(name);
  const sourceCode = getFunctionSource(handler);
  const cssOutput = generateExampleOutput(handler, examples);
  const cssRules = await generateCSSRules(name, examples);
  
  return {
    name,
    category,
    handler,
    sourceCode,
    examples,
    cssOutput,
    cssRules
  };
}

/**
 * Get all 03-rules organized by category with detailed inspection
 */
export async function getAllRulesInfo(): Promise<CategoryInfo[]> {
  const categories: CategoryInfo[] = [];
  
  try {
    // Dynamic import to avoid build issues
    const { groupedRules } = await import('adorable-css');
    
    const categoryPromises = Object.entries(groupedRules).map(async ([categoryName, categoryRules]) => {
      const rules: RuleInfo[] = [];
      
      if (categoryRules && typeof categoryRules === 'object') {
        const rulePromises = Object.entries(categoryRules).map(async ([ruleName, ruleHandler]) => {
          if (typeof ruleHandler === 'function') {
            return await inspectRule(ruleName, ruleHandler, categoryName);
          }
          return null;
        });
        
        const resolvedRules = await Promise.all(rulePromises);
        rules.push(...resolvedRules.filter(rule => rule !== null));
      }
      
      if (rules.length > 0) {
        return {
          name: categoryName,
          rules: rules.sort((a, b) => a.name.localeCompare(b.name)),
          count: rules.length
        };
      }
      return null;
    });

    const resolvedCategories = await Promise.all(categoryPromises);
    categories.push(...resolvedCategories.filter(cat => cat !== null));
  } catch (error) {
    console.error('Failed to load grouped 03-rules:', error);
  }
  
  return categories.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Search 03-rules by name or content
 */
export async function searchRules(query: string): Promise<RuleInfo[]> {
  const allCategories = await getAllRulesInfo();
  const allRules = allCategories.flatMap(cat => cat.rules);
  
  if (!query.trim()) return allRules;
  
  const lowerQuery = query.toLowerCase();
  
  return allRules.filter(rule => 
    rule.name.toLowerCase().includes(lowerQuery) ||
    rule.sourceCode.toLowerCase().includes(lowerQuery) ||
    rule.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get statistics about the rule system
 */
export async function getRuleStats() {
  const categories = await getAllRulesInfo();
  const totalRules = categories.reduce((sum, cat) => sum + cat.count, 0);
  
  return {
    totalRules,
    totalCategories: categories.length,
    categories: categories.map(cat => ({
      name: cat.name,
      count: cat.count
    }))
  };
}