import type { CSSRule, KeywordRuleHandler, RuleHandler } from '../types';

export const visibility: RuleHandler = (args?: string): CSSRule => {
    if (!args) return {};
    const valid = ['visible', 'hidden', 'collapse'];
    if (valid.includes(args)) return { visibility: args };
    return {};
};

export const visible: KeywordRuleHandler = () => ({ visibility: 'visible' });
export const invisible: KeywordRuleHandler = () => ({ visibility: 'hidden' });
export const collapse: KeywordRuleHandler = () => ({ visibility: 'collapse' });

// Screen Reader Only
export const srOnly: KeywordRuleHandler = () => ({
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    'white-space': 'nowrap',
    'border-width': '0'
});

// A11y "Blind" (Legacy alias for sr-only often used)
export const blind = srOnly;

export const visibilityRules = {
    visibility,
    visible,
    invisible,
    collapse,
    'sr-only': srOnly,
    blind
};
