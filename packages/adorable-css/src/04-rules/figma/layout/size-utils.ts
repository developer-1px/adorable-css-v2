import { isToken, resolveSizeToken, resolveContainerToken } from '../../../03-values/token-resolver';
import { transformValue } from '../../../03-values/value-transform';

// Size keywords mapping
const SIZE_MAP = {
  fill: 'flex:1',
  hug: 'fit-content',
  full: '100%',
  auto: 'auto',
  fit: 'fit-content',
  screen: (prop: string) => prop.includes('width') ? '100vw' : '100vh'
};

export const processSize = (value: string, prop: string): string => {
  if (value === 'fill') return 'flex:1';
  if (value === 'none' && prop.startsWith('max')) return `${prop}:none`;
  if (value === 'screen') return `${prop}:${SIZE_MAP.screen(prop)}`;
  if ((prop.includes('max') || prop.includes('min')) && isToken(value, 'container')) return `${prop}:${resolveContainerToken(value)}`;
  if (isToken(value, 'size')) return `${prop}:${resolveSizeToken(value)}`;
  const mapped = SIZE_MAP[value as keyof typeof SIZE_MAP];
  return `${prop}:${mapped || transformValue(value)}`;
};

export const processDoubleSize = (value: string): string => {
  const ratioMatch = value.match(/^(\d+):(\d+)$/);
  if (ratioMatch) return `aspect-ratio:${ratioMatch[1]}/${ratioMatch[2]};width:100%`;
  
  const dimMatch = value.match(/^([0-9]*\.?[0-9]+[%a-z]*)x([0-9]*\.?[0-9]+[%a-z]*)$/);
  if (dimMatch) return `width:${transformValue(dimMatch[1])};height:${transformValue(dimMatch[2])}`;
  
  if (value === 'full' || value === 'fill') return 'width:100%;height:100%';
  if (value === 'auto') return 'width:auto;height:auto';
  if (value === 'hug') return 'width:fit-content;height:fit-content';
  if (value === 'text') return 'width:max-content;height:max-content';
  
  if (isToken(value, 'size')) {
    const tokenValue = resolveSizeToken(value);
    return `width:${tokenValue};height:${tokenValue}`;
  }
  
  const pixelValue = transformValue(value);
  return `width:${pixelValue};height:${pixelValue}`;
};