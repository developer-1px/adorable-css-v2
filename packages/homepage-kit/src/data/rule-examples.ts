export const ruleExamples: Record<string, string[]> = {
    // Layout & Spacing
    gap: ['gap(md)', 'gap(4)', 'gap(10px)'],
    p: ['p(md)', 'p(10px)', 'p(4)'],
    m: ['m(auto)', 'm(lg)', 'm(0)'],
    w: ['w(full)', 'w(screen)', 'w(300px)', 'w(1/2)'],
    h: ['h(full)', 'h(screen)', 'h(64px)'],

    // Typography
    text: ['text(xl/1.6)', 'text(center)', 'text(..4xl)', 'text(bold)', 'text(indigo-600)'],
    font: ['font(sans)', 'font(mono)', 'font(serif)'],

    // Colors & Visuals
    bg: ['bg(gray-100)', 'bg(indigo-600)', 'bg(white/80)'],
    c: ['c(white)', 'c(indigo-600)', 'c(gray-900/50)'],
    border: ['border(1/gray-200)', 'border(2/indigo-500)', 'border(b/1/gray-200)'],
    r: ['r(md)', 'r(full)', 'r(lg)'],

    // Effects
    shadow: ['shadow(sm)', 'shadow(lg)', 'shadow(none)'],
    opacity: ['opacity(50)', 'opacity(100)'],

    // Grid
    grid: ['grid(2)', 'grid(12)', 'grid(cols-3)'],
};

// Helper to determine if a rule NEEDS an example (is a function-like rule)
export const requiresExample = (ruleName: string): boolean => {
    const functionalRules = ['gap', 'p', 'm', 'w', 'h', 'text', 'font', 'bg', 'c', 'border', 'r', 'shadow', 'grid', 'z', 'opacity', 'transition', 'transform', 'scale', 'rotate'];
    // Also check if shortest example has parens
    return functionalRules.includes(ruleName) || ['px', 'py', 'pt', 'pb', 'pl', 'pr', 'mx', 'my', 'mt', 'mb', 'ml', 'mr'].includes(ruleName);
};
