import { isToken, resolveSizeToken, resolveContainerToken } from '../../../02-design_tokens/token-resolver';
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
  // Enhanced aspect-ratio with constraints: size(16:9/w:300) or size(w:300/16:9)
  const aspectWithConstraintMatch = value.match(/^(?:([0-9.]+):([0-9.]+)\/([wh]):(.+)|([wh]):(.+)\/([0-9.]+):([0-9.]+))$/);
  if (aspectWithConstraintMatch) {
    let ratio1, ratio2, constraint, constraintValue;
    
    if (aspectWithConstraintMatch[1]) {
      // Format: 16:9/w:300
      ratio1 = aspectWithConstraintMatch[1];
      ratio2 = aspectWithConstraintMatch[2];
      constraint = aspectWithConstraintMatch[3];
      constraintValue = aspectWithConstraintMatch[4];
    } else {
      // Format: w:300/16:9
      constraint = aspectWithConstraintMatch[5];
      constraintValue = aspectWithConstraintMatch[6];
      ratio1 = aspectWithConstraintMatch[7];
      ratio2 = aspectWithConstraintMatch[8];
    }
    
    const constraintProp = constraint === 'w' ? 'width' : 'height';
    const constraintCss = `${constraintProp}:${transformValue(constraintValue)}`;
    const aspectRatioCss = `aspect-ratio:${ratio1}/${ratio2}`;
    
    return `${aspectRatioCss};${constraintCss}`;
  }
  
  // Original aspect-ratio without constraints
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