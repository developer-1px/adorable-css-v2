
import { generateCSSFromAdorableCSS } from 'adorable-css';

console.log('Testing rules...');

function test(cls: string) {
    try {
        const css = generateCSSFromAdorableCSS(cls);
        console.log(`✅ ${cls} ->`, css);
    } catch (e) {
        console.log(`❌ ${cls} -> Error:`, e.message);
    }
}

test('scroll-mt(100px)');
test('aspect(square)');
test('aspect(3/2)');
test('inline-flex');
test('hbox(inline)');
test('px(1.5)');
test('p(1.5px)');
test('object(cover)');
