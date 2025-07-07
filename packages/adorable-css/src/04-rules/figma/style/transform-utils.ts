import { transformValue } from '../../../03-values/value-transform';

const ORIGIN_MAP = {center:'center',top:'top',right:'right',bottom:'bottom',left:'left','top-left':'top left','top-right':'top right','bottom-left':'bottom left','bottom-right':'bottom right'};

export const addDeg = (val: string) => val.match(/\d+$/) ? `${val}deg` : val;
export const processTransform = (val: string) => val.includes('(') && val.includes(')') ? val : val.match(/^-?\d+(\.\d+)?$/) ? `scale(${val})` : val;
export const getOrigin = (val: string) => ORIGIN_MAP[val as keyof typeof ORIGIN_MAP] || val;