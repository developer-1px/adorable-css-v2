import { rule2, extractValue } from '../../ast-utils/rule2-helpers';

const OVERFLOW_MAP = {visible:'visible',hidden:'hidden',clip:'clip',scroll:'scroll',auto:'auto'};

export const overflow = rule2((s) => { const v = extractValue(s.args?.[0]); return `overflow:${OVERFLOW_MAP[v as keyof typeof OVERFLOW_MAP] || v || 'visible'}`; });
export const overflowX = rule2((s) => { const v = extractValue(s.args?.[0]); return `overflow-x:${OVERFLOW_MAP[v as keyof typeof OVERFLOW_MAP] || v || 'visible'}`; });
export const overflowY = rule2((s) => { const v = extractValue(s.args?.[0]); return `overflow-y:${OVERFLOW_MAP[v as keyof typeof OVERFLOW_MAP] || v || 'visible'}`; });
export const clip = rule2(() => 'overflow:hidden');
export const scrollable = rule2(() => 'overflow:auto');
export const scrollX = rule2(() => 'overflow-x:auto;overflow-y:hidden');
export const scrollY = rule2(() => 'overflow-y:auto;overflow-x:hidden');