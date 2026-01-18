import type { CSSRule, RuleHandler } from '../types';
import { isToken, getTokenVar } from '../../02-design_tokens/design-system/tokens/index';
import { px } from '../../01-core/values/makeValue';

const createDivide = (axis: 'x' | 'y'): RuleHandler => (value?: string): CSSRule => {
    let width = '1px';
    let color = 'var(--gray-200)';
    let reverse = false;

    if (value) {
        const parts = value.split('-');

        // Check for reverse
        if (parts.includes('reverse')) {
            reverse = true;
        }

        // Filter out 'reverse' to find width/color
        const args = parts.filter(p => p !== 'reverse');

        if (args.length > 0) {
            // Try to construct a color from parts (e.g. blue-500)
            const maybeColor = args.join('-');
            // Try to find width from first part (e.g. 2, 4px)
            const maybeWidth = args[0];

            if (isToken(maybeColor, 'colors')) {
                color = getTokenVar('colors', maybeColor);
            } else if (maybeWidth.match(/^\d+(px|rem|em)?$/)) {
                width = String(px(maybeWidth));
            }
        }
    }

    const selector = '& > * + *';
    const result: CSSRule = {
        [selector]: {}
    };

    if (axis === 'y') {
        result[selector] = {
            'border-top-width': reverse ? '0px' : width,
            'border-bottom-width': reverse ? width : '0px',
            'border-top-color': color,
            'border-bottom-color': color,
            'border-style': 'solid'
        };
    } else {
        result[selector] = {
            'border-left-width': reverse ? '0px' : width,
            'border-right-width': reverse ? width : '0px',
            'border-left-color': color,
            'border-right-color': color,
            'border-style': 'solid'
        };
    }

    return result;
};

export const divideX = createDivide('x');
export const divideY = createDivide('y');

export const divideRules = {
    'divide-x': divideX,
    'divide-y': divideY,
};
