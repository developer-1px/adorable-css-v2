<script>
  import { onMount } from 'svelte';
  
  let computedStyles = {};
  
  onMount(() => {
    // Get computed styles to see actual values
    const elements = document.querySelectorAll('[data-test]');
    elements.forEach(el => {
      const testName = el.getAttribute('data-test');
      const style = window.getComputedStyle(el);
      computedStyles[testName] = style.fontSize;
    });
  });
</script>

<div class="vbox(center) py(4xl) container(2xl)">
  <div class="vbox gap(3xl) max-w(5xl) w(full)">
    <h1 class="display(3xl) bold">CSS Calc Formula Test</h1>
    
    <section class="vbox gap(2xl)">
      <h2 class="heading(h2)">Font Size Tokens with Calc</h2>
      <div class="vbox gap(xl) p(2xl) bg(surface) r(lg)">
        <p>Testing dynamic calc formulas instead of hardcoded values:</p>
        
        <div class="grid(2) gap(xl)">
          <div>
            <p class="text(4xs)" data-test="font-4xs">4xs: {computedStyles['font-4xs'] || 'calculating...'}</p>
            <p class="text(3xs)" data-test="font-3xs">3xs: {computedStyles['font-3xs'] || 'calculating...'}</p>
            <p class="text(2xs)" data-test="font-2xs">2xs: {computedStyles['font-2xs'] || 'calculating...'}</p>
            <p class="text(xs)" data-test="font-xs">xs: {computedStyles['font-xs'] || 'calculating...'}</p>
            <p class="text(sm)" data-test="font-sm">sm: {computedStyles['font-sm'] || 'calculating...'}</p>
            <p class="text(md)" data-test="font-md">md (base): {computedStyles['font-md'] || 'calculating...'}</p>
          </div>
          <div>
            <p class="text(lg)" data-test="font-lg">lg: {computedStyles['font-lg'] || 'calculating...'}</p>
            <p class="text(xl)" data-test="font-xl">xl: {computedStyles['font-xl'] || 'calculating...'}</p>
            <p class="text(2xl)" data-test="font-2xl">2xl: {computedStyles['font-2xl'] || 'calculating...'}</p>
            <p class="text(3xl)" data-test="font-3xl">3xl: {computedStyles['font-3xl'] || 'calculating...'}</p>
            <p class="text(4xl)" data-test="font-4xl">4xl: {computedStyles['font-4xl'] || 'calculating...'}</p>
            <p class="text(5xl)" data-test="font-5xl">5xl: {computedStyles['font-5xl'] || 'calculating...'}</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="vbox gap(2xl)">
      <h2 class="heading(h2)">Size Tokens Test</h2>
      <div class="hbox gap(xl) flex-wrap">
        <div class="size(xs) bg(primary) c(white) vbox(center/middle)">xs</div>
        <div class="size(sm) bg(primary) c(white) vbox(center/middle)">sm</div>
        <div class="size(md) bg(primary) c(white) vbox(center/middle)">md</div>
        <div class="size(lg) bg(primary) c(white) vbox(center/middle)">lg</div>
        <div class="size(xl) bg(primary) c(white) vbox(center/middle)">xl</div>
        <div class="size(2xl) bg(primary) c(white) vbox(center/middle)">2xl</div>
      </div>
    </section>
    
    <section class="vbox gap(2xl)">
      <h2 class="heading(h2)">Container Width Test</h2>
      <div class="vbox gap(lg)">
        <div class="w(full) bg(surface)">
          <div class="container(xs) bg(primary.10) p(lg)">container(xs)</div>
        </div>
        <div class="w(full) bg(surface)">
          <div class="container(sm) bg(primary.20) p(lg)">container(sm)</div>
        </div>
        <div class="w(full) bg(surface)">
          <div class="container(md) bg(primary.30) p(lg)">container(md)</div>
        </div>
        <div class="w(full) bg(surface)">
          <div class="container(lg) bg(primary.40) p(lg)">container(lg)</div>
        </div>
        <div class="w(full) bg(surface)">
          <div class="container(xl) bg(primary.50) p(lg)">container(xl)</div>
        </div>
      </div>
    </section>
    
    <section class="vbox gap(2xl)">
      <h2 class="heading(h2)">Spacing Scale Test</h2>
      <div class="vbox gap(lg)">
        <div class="hbox(middle) gap(lg)">
          <span class="label(sm) w(3xl)">gap(xs):</span>
          <div class="hbox gap(xs)">
            <div class="w(2xl) h(2xl) bg(primary)"></div>
            <div class="w(2xl) h(2xl) bg(primary)"></div>
            <div class="w(2xl) h(2xl) bg(primary)"></div>
          </div>
        </div>
        <div class="hbox(middle) gap(lg)">
          <span class="label(sm) w(3xl)">gap(sm):</span>
          <div class="hbox gap(sm)">
            <div class="w(2xl) h(2xl) bg(primary)"></div>
            <div class="w(2xl) h(2xl) bg(primary)"></div>
            <div class="w(2xl) h(2xl) bg(primary)"></div>
          </div>
        </div>
        <div class="hbox(middle) gap(lg)">
          <span class="label(sm) w(3xl)">gap(md):</span>
          <div class="hbox gap(md)">
            <div class="w(2xl) h(2xl) bg(primary)"></div>
            <div class="w(2xl) h(2xl) bg(primary)"></div>
            <div class="w(2xl) h(2xl) bg(primary)"></div>
          </div>
        </div>
        <div class="hbox(middle) gap(lg)">
          <span class="label(sm) w(3xl)">gap(lg):</span>
          <div class="hbox gap(lg)">
            <div class="w(2xl) h(2xl) bg(primary)"></div>
            <div class="w(2xl) h(2xl) bg(primary)"></div>
            <div class="w(2xl) h(2xl) bg(primary)"></div>
          </div>
        </div>
        <div class="hbox(middle) gap(lg)">
          <span class="label(sm) w(3xl)">gap(xl):</span>
          <div class="hbox gap(xl)">
            <div class="w(2xl) h(2xl) bg(primary)"></div>
            <div class="w(2xl) h(2xl) bg(primary)"></div>
            <div class="w(2xl) h(2xl) bg(primary)"></div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="vbox gap(2xl)">
      <h2 class="heading(h2)">CSS Variable Usage</h2>
      <div class="vbox gap(lg) p(2xl) bg(surface) r(lg)">
        <p class="body(lg)">The calc formulas now use CSS variables for ratios:</p>
        <ul class="vbox gap(md) pl(xl)">
          <li><code class="code(inline)">--font-ratio</code>: Default 1.2</li>
          <li><code class="code(inline)">--size-ratio</code>: Default 1.25</li>
          <li><code class="code(inline)">--container-ratio</code>: Default 1.33</li>
        </ul>
        <p class="body(md) mt(lg)">This allows for easy customization of the scale system through CSS variables.</p>
      </div>
    </section>
  </div>
</div>

<style>
  /* Define the CSS variables for the ratios */
  :global(:root) {
    --font-ratio: 1.2;
    --size-ratio: 1.25;
    --container-ratio: 1.33;
  }
</style>