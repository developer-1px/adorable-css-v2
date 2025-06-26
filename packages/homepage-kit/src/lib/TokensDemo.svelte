<script lang="ts">
  import { defaultTokens, type DesignTokens } from '@adorable-css/core';
  import { onMount } from 'svelte';
  
  let customTokens: DesignTokens = JSON.parse(JSON.stringify(defaultTokens));
  let showCode = false;
  
  // Function to update CSS variables
  function updateTokens() {
    const root = document.documentElement;
    
    // Update font size tokens
    Object.entries(customTokens.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });
    
    // Update spacing tokens
    Object.entries(customTokens.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });
    
    // Update other tokens...
    Object.entries(customTokens.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });
    
    Object.entries(customTokens.shadow).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });
  }
  
  onMount(() => {
    updateTokens();
  });
</script>

<div class="vbox gap(xl)">
  <div class="vbox gap(md)">
    <h2 class="700 font(2xl/1.2)">Design Tokens System</h2>
    <p class="font(md) c(#6b7280)">Configure global design tokens for consistent styling across your application.</p>
  </div>
  
  <div class="grid(2) gap(xl)">
    <!-- Token Editor -->
    <div class="vbox gap(lg)">
      <h3 class="700 font(lg)">Token Configuration</h3>
      
      <!-- Font Sizes -->
      <div class="vbox gap(sm)">
        <h4 class="500 font(md)">Font Sizes</h4>
        {#each Object.entries(customTokens.fontSize) as [key, value]}
          <div class="hbox(middle) gap(md)">
            <label class="w(80) font(sm)">{key}:</label>
            <input 
              type="text" 
              bind:value={customTokens.fontSize[key]}
              on:input={updateTokens}
              class="flex p(xs) r(md) border(1/#e5e5e5) font(sm)"
            />
          </div>
        {/each}
      </div>
      
      <!-- Spacing -->
      <div class="vbox gap(sm)">
        <h4 class="500 font(md)">Spacing</h4>
        {#each Object.entries(customTokens.spacing) as [key, value]}
          <div class="hbox(middle) gap(md)">
            <label class="w(80) font(sm)">{key}:</label>
            <input 
              type="text" 
              bind:value={customTokens.spacing[key]}
              on:input={updateTokens}
              class="flex p(xs) r(md) border(1/#e5e5e5) font(sm)"
            />
          </div>
        {/each}
      </div>
      
      <!-- Border Radius -->
      <div class="vbox gap(sm)">
        <h4 class="500 font(md)">Border Radius</h4>
        {#each Object.entries(customTokens.borderRadius).slice(0, 5) as [key, value]}
          <div class="hbox(middle) gap(md)">
            <label class="w(80) font(sm)">{key}:</label>
            <input 
              type="text" 
              bind:value={customTokens.borderRadius[key]}
              on:input={updateTokens}
              class="flex p(xs) r(md) border(1/#e5e5e5) font(sm)"
            />
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Preview -->
    <div class="vbox gap(lg)">
      <h3 class="700 font(lg)">Live Preview</h3>
      
      <!-- Typography Examples -->
      <div class="vbox gap(sm) p(lg) r(lg) bg(#f9fafb)">
        <h4 class="500 font(md) mb(sm)">Typography</h4>
        <p class="font(xs)">font(xs) - Extra small text</p>
        <p class="font(sm)">font(sm) - Small text</p>
        <p class="font(md)">font(md) - Medium text</p>
        <p class="font(lg)">font(lg) - Large text</p>
        <p class="font(xl)">font(xl) - Extra large text</p>
        <p class="font(2xl)">font(2xl) - 2X large text</p>
      </div>
      
      <!-- Spacing Examples -->
      <div class="vbox gap(sm) p(lg) r(lg) bg(#f9fafb)">
        <h4 class="500 font(md) mb(sm)">Spacing</h4>
        <div class="hbox(middle) gap(sm)">
          <div class="p(xs) bg(#3b82f6) c(white) r(sm)">p(xs)</div>
          <div class="p(sm) bg(#3b82f6) c(white) r(sm)">p(sm)</div>
          <div class="p(md) bg(#3b82f6) c(white) r(sm)">p(md)</div>
          <div class="p(lg) bg(#3b82f6) c(white) r(sm)">p(lg)</div>
        </div>
      </div>
      
      <!-- Border Radius Examples -->
      <div class="vbox gap(sm) p(lg) r(lg) bg(#f9fafb)">
        <h4 class="500 font(md) mb(sm)">Border Radius</h4>
        <div class="hbox(middle) gap(sm)">
          <div class="w(3xl) h(3xl) bg(#3b82f6) r(none)"></div>
          <div class="w(3xl) h(3xl) bg(#3b82f6) r(sm)"></div>
          <div class="w(3xl) h(3xl) bg(#3b82f6) r(md)"></div>
          <div class="w(3xl) h(3xl) bg(#3b82f6) r(lg)"></div>
          <div class="w(3xl) h(3xl) bg(#3b82f6) r(xl)"></div>
          <div class="w(3xl) h(3xl) bg(#3b82f6) r(full)"></div>
        </div>
      </div>
      
      <!-- Shadow Examples -->
      <div class="vbox gap(sm) p(lg) r(lg) bg(#f9fafb)">
        <h4 class="500 font(md) mb(sm)">Shadows</h4>
        <div class="hbox(middle) gap(md)">
          <div class="w(4xl) h(4xl) bg(white) r(lg) shadow(sm) p(sm)">sm</div>
          <div class="w(4xl) h(4xl) bg(white) r(lg) shadow(md) p(sm)">md</div>
          <div class="w(4xl) h(4xl) bg(white) r(lg) shadow(lg) p(sm)">lg</div>
          <div class="w(4xl) h(4xl) bg(white) r(lg) shadow(xl) p(sm)">xl</div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Code Example -->
  <div class="vbox gap(md)">
    <button 
      on:click={() => showCode = !showCode}
      class="self(start) px(md) py(sm) r(md) bg(#3b82f6) c(white) hover:bg(#2563eb) transition cursor(pointer)"
    >
      {showCode ? 'Hide' : 'Show'} Code Example
    </button>
    
    {#if showCode}
      <div class="p(lg) r(lg) bg(#1e293b) c(white) overflow(auto)">
        <pre class="font(sm/1.5)"><code>{`// Using design tokens in AdorableCSS

// Typography with tokens
<h1 class="font(2xl)">Large Heading</h1>
<p class="font(md)">Body text with medium size</p>

// Spacing with tokens
<div class="p(lg) m(md) gap(sm)">Content with token-based spacing</div>

// Border radius with tokens
<button class="r(md)">Medium rounded button</button>
<div class="r(full)">Fully rounded element</div>

// Shadows with tokens
<div class="shadow(lg)">Card with large shadow</div>

// Combining tokens
<div class="p(lg) r(xl) shadow(md) gap(md)">
  <h2 class="font(lg)">Card Title</h2>
  <p class="font(sm) c(#6b7280)">Card description text</p>
</div>

// Initialize tokens in your app
import { injectTokens, defaultTokens } from '@adorable-css/core';

// Use default tokens
injectTokens();

// Or customize tokens
const customTokens = {
  ...defaultTokens,
  fontSize: {
    ...defaultTokens.fontSize,
    md: '1.125rem' // Override medium size
  }
};
injectTokens(customTokens);`}</code></pre>
      </div>
    {/if}
  </div>
</div>

<style>
  input {
    outline: none;
  }
  
  input:focus {
    border-color: #3b82f6;
  }
  
  button {
    border: none;
    outline: none;
  }
</style>