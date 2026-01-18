import { px, pxGrid } from './src/01-core/values/value-utils';
import { p } from './src/03-rules/layout/spacing';
import { size } from './src/03-rules/layout/size';

console.log("--- Hybrid Spec Verification ---");

// 1. Spacing (Grid Units x4)
const pResult = p("4") as any; // Cast to access internals if needed
console.log(`p(4) -> Expected: 16px. Actual: ${JSON.stringify(pResult)}`);
if (JSON.stringify(pResult) !== '{"padding":"16px"}') throw new Error("Spacing failed 4px grid check!");

// 2. Sizing (Physical Units x1)
const sizeResult = size("32") as any;
console.log(`size(32) -> Expected: 32px. Actual: ${JSON.stringify(sizeResult)}`);
if (JSON.stringify(sizeResult) !== '{"width":"32px","height":"32px"}') throw new Error("Size failed physical pixel check!");

// 3. Mixed Units
const gapResult = pxGrid("1.5");
console.log(`pxGrid(1.5) -> Expected: 6px. Actual: ${gapResult}`);
if (gapResult !== "6px") throw new Error("pxGrid failed float check!");

const widthResult = px("320");
console.log(`px(320) -> Expected: 320px. Actual: ${widthResult}`);
if (widthResult !== "320px") throw new Error("px failed check!");

console.log("✅ Hybrid Spec Verification Passed!");
