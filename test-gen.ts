
import { generateCSS } from './packages/adorable-css/src/01-core/generators/generator';

console.log("--- TEST START ---");
try {
    const css = generateCSS(["@w(360~):c(red)", "@w(~720):c(red)"]);
    console.log("CSS Output:");
    console.log(css);
} catch (e) {
    console.error("Error:", e);
}
console.log("--- TEST END ---");
