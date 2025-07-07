import {rule2, getAllValues} from '../../../01-core/ast-utils'

// Compact flex utilities
const ALIGN = {top:'flex-start',middle:'center',bottom:'flex-end',fill:'stretch',stretch:'stretch',left:'flex-start',center:'center',right:'flex-end',end:'flex-end',baseline:'baseline'};
const JUSTIFY = {left:'flex-start',right:'flex-end',center:'center',end:'flex-end',top:'flex-start',middle:'center',bottom:'flex-end',between:'space-between',around:'space-around',evenly:'space-evenly',baseline:'baseline'};
const TEXT_ALIGN = {left:'left',center:'center',right:'right',fill:'justify',stretch:'justify'};

const parseAlign = (v: string) => ALIGN[v as keyof typeof ALIGN];
const parseJustify = (v: string) => JUSTIFY[v as keyof typeof JUSTIFY];
const parseTextAlign = (v: string) => TEXT_ALIGN[v as keyof typeof TEXT_ALIGN];

const flexCSS = (dir: string, align?: string, justify?: string, extra: string[] = []) =>
  ['display:flex', `flex-direction:${dir}`, ...(align ? [`align-items:${align}`] : []), ...(justify ? [`justify-content:${justify}`] : []), ...extra, ':where(&>*){flex:0 0 auto}'].join(';');

const parseFlexArgs = (args: string[]) => {
  const val = args.join('');
  const vals = val.split(/[+/]/);
  return {
    val,
    vals,
    align: vals.find(x => ['top','middle','bottom','fill','end','baseline','left','center','right','stretch'].includes(x)),
    justify: vals.find(x => ['left','right','center','end','between','around','evenly','top','middle','bottom'].includes(x)),
    hasWrap: vals.includes('wrap'),
    hasReverse: vals.includes('reverse')
  };
};

//
export const hbox = rule2((s) => {
  const values = getAllValues(s);
  const { val, align, justify, hasWrap, hasReverse } = parseFlexArgs(values);
  if (val === 'pack') return flexCSS('row', 'center', 'center');
  const extra = [...(hasWrap ? ['flex-wrap:wrap'] : []), ...(hasReverse ? ['flex-direction:row-reverse'] : [])];
  return flexCSS('row', parseAlign(align) || 'center', parseJustify(justify) || 'flex-start', extra);
});

export const vbox = rule2((s) => {
  const values = getAllValues(s);
  const { val, align, justify, hasWrap, hasReverse } = parseFlexArgs(values);
  if (val === 'pack') return flexCSS('column', 'center', 'center', ['text-align:center']);
  const textAlign = parseTextAlign(align) || 'justify';
  const extra = [...(hasWrap ? ['flex-wrap:wrap'] : []), ...(hasReverse ? ['flex-direction:column-reverse'] : []), ...(textAlign ? [`text-align:${textAlign}`] : [])];
  return flexCSS('column', parseAlign(align) || 'stretch', parseJustify(justify) || 'flex-start', extra);
});

export const pack = rule2(() => flexCSS('row', 'center', 'center'));
export const wrap = hbox;