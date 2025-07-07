import {rule2, extractValue} from '../../../01-core/ast-utils'
import {transformValue} from '../../../03-values/value-transform'
import {isToken} from '../../../03-values/token-resolver'

const FLOW_MAP = {row:'row',col:'column',column:'column','row-dense':'row dense','col-dense':'column dense','column-dense':'column dense'};
const AUTO_MAP = {auto:'auto',min:'min-content',max:'max-content',fr:'1fr'};

const processGridTemplate = (value: string): string => {
  if (/^\d+$/.test(value)) return `repeat(${value}, 1fr)`;
  if (value.includes('/')) return value.split('/').map(v => v.trim()).join(' ');
  if (value.startsWith('repeat(')) return value;
  if (isToken(value, 'grid')) return `var(--ac-grid-${value})`;
  return value;
};

const processSpan = (value: string, property: string): string => {
  if (value === 'full') return `${property}:1 / -1`;
  if (/^\d+$/.test(value)) return `${property}:span ${value} / span ${value}`;
  if (value.includes('/')) return `${property}:${value}`;
  return `${property}:${value}`;
};

const getFlowValue = (value: string) => FLOW_MAP[value as keyof typeof FLOW_MAP] || value;
const getAutoValue = (value: string) => AUTO_MAP[value as keyof typeof AUTO_MAP] || transformValue(value);

export const gridDisplay = rule2(() => 'display:grid');
export const gridCols = rule2((s) => { const v = extractValue(s.args?.[0]); return v ? `grid-template-columns:${processGridTemplate(v)}` : ''; });
export const gridRows = rule2((s) => { const v = extractValue(s.args?.[0]); return v ? `grid-template-rows:${processGridTemplate(v)}` : ''; });
export const gridGap = rule2((s) => { const v = extractValue(s.args?.[0]); return v ? (v.includes('/') ? `grid-gap:${v.split('/').map(transformValue).join(' ')}` : `grid-gap:${transformValue(v)}`) : ''; });
export const gridColGap = rule2((s) => `grid-column-gap:${transformValue(extractValue(s.args?.[0]) || '0')}`);
export const gridRowGap = rule2((s) => `grid-row-gap:${transformValue(extractValue(s.args?.[0]) || '0')}`);
export const colSpan = rule2((s) => { const v = extractValue(s.args?.[0]); return v ? processSpan(v, 'grid-column') : ''; });
export const rowSpan = rule2((s) => { const v = extractValue(s.args?.[0]); return v ? processSpan(v, 'grid-row') : ''; });
export const colStart = rule2((s) => `grid-column-start:${extractValue(s.args?.[0]) || 'auto'}`);
export const colEnd = rule2((s) => `grid-column-end:${extractValue(s.args?.[0]) || 'auto'}`);
export const rowStart = rule2((s) => `grid-row-start:${extractValue(s.args?.[0]) || 'auto'}`);
export const rowEnd = rule2((s) => `grid-row-end:${extractValue(s.args?.[0]) || 'auto'}`);
export const gridFlow = rule2((s) => `grid-auto-flow:${getFlowValue(extractValue(s.args?.[0]) || 'row')}`);
export const gridAutoCols = rule2((s) => `grid-auto-columns:${getAutoValue(extractValue(s.args?.[0]) || 'auto')}`);
export const gridAutoRows = rule2((s) => `grid-auto-rows:${getAutoValue(extractValue(s.args?.[0]) || 'auto')}`);
export const gridAreas = rule2((s) => { const v = extractValue(s.args?.[0]); return v ? `grid-template-areas:${v.split('/').map((row: string) => `"${row.trim()}"`).join(' ')}` : ''; });
export const gridArea = rule2((s) => { const v = extractValue(s.args?.[0]); return v ? `grid-area:${v}` : ''; });