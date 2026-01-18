<script lang="ts">
  import { onMount } from 'svelte';
  import type { ComponentDefinition } from 'adorable-css';
  
  export let componentName: string = 'Component';
  export let componentFunction: (args?: string) => string;
  export let definition: ComponentDefinition;
  export let showCode: boolean = false;
  export let hideLabels: boolean = false;
  export let customExamples: Array<{
    label: string;
    args: string;
    children?: string;
  }> = [];
  export let renderAs: 'button' | 'span' | 'div' | 'h3' | 'input' | 'textarea' | 'auto' = 'auto';
  
  // Children content for the component
  export let childrenContent: string = componentName;
  
  let copiedIndex: number | null = null;
  let selectedVariant: string = 'all';
  let selectedSize: string = 'all';
  
  // Extract sizes and variants from definition
  $: sizes = Object.keys(definition.sizes || {}).filter(s => s !== 'default');
  $: variants = Object.keys(definition.variants || {}).filter(v => v !== 'default');
  $: hasDefaultSize = !!(definition.sizes?.default);
  $: hasDefaultVariant = !!(definition.variants?.default);
  
  // Generate all combinations based on the definition
  function generateCombinations() {
    const combinations: Array<{ variant: string; size: string; args: string; label: string }> = [];
    
    // If neither sizes nor variants exist, just show default
    if (!sizes.length && !variants.length) {
      combinations.push({ variant: 'default', size: 'default', args: '', label: 'Default' });
      return combinations;
    }
    
    // Add default/default if both exist
    if (hasDefaultSize || hasDefaultVariant) {
      combinations.push({ 
        variant: 'default', 
        size: 'default', 
        args: '', 
        label: 'default / default' 
      });
    }
    
    // Add sizes with default variant
    if (hasDefaultVariant || !variants.length) {
      sizes.forEach(size => {
        combinations.push({ 
          variant: 'default', 
          size, 
          args: size, 
          label: variants.length ? `default / ${size}` : size 
        });
      });
    }
    
    // Add variants with default size
    if (hasDefaultSize || !sizes.length) {
      variants.forEach(variant => {
        combinations.push({ 
          variant, 
          size: 'default', 
          args: variant, 
          label: sizes.length ? `${variant} / default` : variant 
        });
      });
    }
    
    // Add all variant + size combinations
    variants.forEach(variant => {
      sizes.forEach(size => {
        combinations.push({ 
          variant, 
          size, 
          args: `${variant}/${size}`, 
          label: `${variant} / ${size}` 
        });
      });
    });
    
    return combinations;
  }
  
  // Auto-detect render element based on component name
  function getRenderElement() {
    if (renderAs !== 'auto') return renderAs;
    
    const name = componentName.toLowerCase();
    if (name.includes('btn') || name.includes('button')) return 'button';
    if (name.includes('badge') || name.includes('tag') || name.includes('chip')) return 'span';
    if (name.includes('heading') || name.includes('title')) return 'h3';
    if (name.includes('input')) return 'input';
    if (name.includes('textarea')) return 'textarea';
    if (name.includes('card') || name.includes('box')) return 'div';
    return 'div';
  }
  
  async function copyToClipboard(text: string, index: number) {
    try {
      await navigator.clipboard.writeText(text);
      copiedIndex = index;
      setTimeout(() => {
        copiedIndex = null;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
  
  $: combinations = generateCombinations();
  $: allExamples = [
    ...combinations.map((combo, i) => ({
      ...combo,
      children: childrenContent,
      index: i
    })),
    ...customExamples.map((example, i) => ({
      ...example,
      variant: 'custom',
      size: 'custom',
      label: example.label,
      children: example.children || childrenContent,
      index: combinations.length + i
    }))
  ];
  
  // Filter examples based on selected variant and size
  $: filteredExamples = allExamples.filter(example => {
    const variantMatch = selectedVariant === 'all' || example.variant === selectedVariant;
    const sizeMatch = selectedSize === 'all' || example.size === selectedSize;
    return variantMatch && sizeMatch;
  });
  
  $: renderElement = getRenderElement();
  
  // Calculate stats
  $: totalSizes = (sizes.length || 0) + (hasDefaultSize ? 1 : 0);
  $: totalVariants = (variants.length || 0) + (hasDefaultVariant ? 1 : 0);
</script>

<div class="vbox gap(24)">
  <div class="vbox gap(16)">
    <div class="hbox(between wrap) gap(16)">
      <div>
        <h3 class="heading(h3) mb(8)">{componentName} Variants</h3>
        <p class="text(sm) c(neutral-600)">
          {totalVariants} variant{totalVariants !== 1 ? 's' : ''} × 
          {totalSizes} size{totalSizes !== 1 ? 's' : ''} = 
          {combinations.length} combination{combinations.length !== 1 ? 's' : ''}
          {customExamples.length ? ` + ${customExamples.length} custom example${customExamples.length !== 1 ? 's' : ''}` : ''}
        </p>
      </div>
      
      <label class="hbox items(center) gap(8) cursor(pointer)">
        <input 
          type="checkbox" 
          bind:checked={showCode}
          class="w(16) h(16) r(4) cursor(pointer)"
        />
        <span class="text(sm) c(neutral-700)">Show code</span>
      </label>
    </div>
    
    <!-- Filter Controls -->
    <div class="vbox gap(12)">
      <!-- Quick Filters -->
      <div class="hbox(wrap) gap(8)">
        <button 
          on:click={() => { selectedVariant = 'all'; selectedSize = 'all'; }}
          class="btn(ghost/sm) {selectedVariant === 'all' && selectedSize === 'all' ? 'bg(primary-50) c(primary) b(1/primary-200)' : ''}"
        >
          All ({allExamples.length})
        </button>
        
        {#if variants.length > 0}
          <div class="w(1) h(20) bg(neutral-200)"></div>
          {#each variants as variant}
            <button 
              on:click={() => { selectedVariant = variant; selectedSize = 'all'; }}
              class="btn(ghost/sm) {selectedVariant === variant && selectedSize === 'all' ? 'bg(primary-50) c(primary) b(1/primary-200)' : ''}"
            >
              {variant}
            </button>
          {/each}
        {/if}
        
        {#if sizes.length > 0}
          <div class="w(1) h(20) bg(neutral-200)"></div>
          {#each sizes as size}
            <button 
              on:click={() => { selectedVariant = 'all'; selectedSize = size; }}
              class="btn(ghost/sm) {selectedVariant === 'all' && selectedSize === size ? 'bg(primary-50) c(primary) b(1/primary-200)' : ''}"
            >
              {size}
            </button>
          {/each}
        {/if}
      </div>
      
      <!-- Advanced Filters -->
      <div class="hbox(wrap) gap(16)">
        <div class="hbox items(center) gap(8)">
          <label class="text(sm) c(neutral-600) bold(medium)">Variant:</label>
          <select 
            bind:value={selectedVariant}
            class="input(ghost) h(32) px(12) py(4) font(sm) min-w(120)"
          >
            <option value="all">All Variants</option>
            {#if hasDefaultVariant}
              <option value="default">Default</option>
            {/if}
            {#each variants as variant}
              <option value={variant}>{variant}</option>
            {/each}
            {#if customExamples.length}
              <option value="custom">Custom</option>
            {/if}
          </select>
        </div>
        
        <div class="hbox items(center) gap(8)">
          <label class="text(sm) c(neutral-600) bold(medium)">Size:</label>
          <select 
            bind:value={selectedSize}
            class="input(ghost) h(32) px(12) py(4) font(sm) min-w(120)"
          >
            <option value="all">All Sizes</option>
            {#if hasDefaultSize}
              <option value="default">Default</option>
            {/if}
            {#each sizes as size}
              <option value={size}>{size}</option>
            {/each}
            {#if customExamples.length}
              <option value="custom">Custom</option>
            {/if}
          </select>
        </div>
        
        <div class="text(sm) c(neutral-500)">
          Showing {filteredExamples.length} of {allExamples.length} examples
        </div>
      </div>
    </div>
  </div>
  
  <!-- Definition details -->
  {#if definition.states || definition.compounds}
    <div class="hbox(wrap text-sm) gap(16)">
      {#if definition.states}
        <div class="hbox gap(8)">
          <span class="c(neutral-500)">States:</span>
          <div class="hbox(wrap) gap(8)">
            {#each Object.keys(definition.states) as state}
              <span class="badge(outline/sm)">{state}</span>
            {/each}
          </div>
        </div>
      {/if}
      
      {#if definition.compounds}
        <div class="hbox items(center) gap(8)">
          <span class="c(neutral-500)">Compound variants:</span>
          <span class="badge(secondary/sm)">
            {Array.isArray(definition.compounds) ? definition.compounds.length : Object.keys(definition.compounds).length}
          </span>
        </div>
      {/if}
    </div>
  {/if}
  
  <div class="grid gap(12) grid-cols(2) sm:grid-cols(3) md:grid-cols(4) lg:grid-cols(5) xl:grid-cols(6) 2xl:grid-cols(8)">
    {#each filteredExamples as example (example.index)}
      <div class="bg(white) border(1/neutral-200) r(lg) p(12) vbox gap(8) group hover:shadow(md) transition">
        {#if !hideLabels}
          <div class="hbox items(center) justify(between) gap(4)">
            <span class="text(2xs) c(neutral-500) uppercase tracking(wide) truncate">
              {example.label}
            </span>
            <button
              on:click={() => copyToClipboard(`${componentName.toLowerCase()}(${example.args ? `'${example.args}'` : ''})`, example.index)}
              class="opacity(0) group-hover:opacity(100) transition-opacity p(2) r(4) hover:bg(neutral-100) flex-shrink(0)"
              title="Copy to clipboard"
            >
              {#if copiedIndex === example.index}
                <svg class="w(14) h(14) c(success-600)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              {:else}
                <svg class="w(14) h(14) c(neutral-500)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              {/if}
            </button>
          </div>
        {/if}
        
        <div class="hbox items(center) justify(center) min-h(60) p(8) bg(neutral-50) r(md) overflow(hidden)">
          <!-- Render the actual component -->
          {#if renderElement === 'button'}
            <button class={componentFunction(example.args)}>
              {example.children}
            </button>
          {:else if renderElement === 'span'}
            <span class={componentFunction(example.args)}>
              {example.children}
            </span>
          {:else if renderElement === 'h3'}
            <h3 class={componentFunction(example.args)}>
              {example.children}
            </h3>
          {:else if renderElement === 'input'}
            <input 
              type="text" 
              placeholder={example.children}
              class={componentFunction(example.args)}
            />
          {:else if renderElement === 'textarea'}
            <textarea 
              placeholder={example.children}
              rows="3"
              class={componentFunction(example.args)}
            ></textarea>
          {:else}
            <div class={componentFunction(example.args)}>
              {example.children}
            </div>
          {/if}
        </div>
        
        {#if showCode}
          <div class="vbox gap(4)">
            <code class="text(xs) c(neutral-600) bg(neutral-100) p(8) r(4) font(mono) break(all)">
              {componentName.toLowerCase()}({example.args ? `'${example.args}'` : ''})
            </code>
            <code class="text(xs) c(neutral-500) bg(neutral-50) p(8) r(4) font(mono) break(all) whitespace(pre-wrap)">
              {componentFunction(example.args)}
            </code>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  /* Custom grid responsive */
  @media (min-width: 1536px) {
    .grid {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }
</style>