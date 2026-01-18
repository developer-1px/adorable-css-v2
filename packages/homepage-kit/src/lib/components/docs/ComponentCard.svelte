<script lang="ts">
  import type { ComponentDefinition } from 'adorable-css';

  export let title: string;
  export let description: string = "";
  export let componentFunction: (args?: string) => string;
  export let exampleArgs: string = "";
  export let children: string = "Example";
  export let renderAs: 'button' | 'span' | 'div' | 'h3' | 'input' | 'textarea' | 'auto' = 'auto';

  // Auto-detect render element based on title/type if not specified
  function getRenderElement() {
    if (renderAs !== 'auto') return renderAs;
    
    const name = title.toLowerCase();
    if (name.includes('btn') || name.includes('button')) return 'button';
    if (name.includes('badge') || name.includes('tag')) return 'span';
    if (name.includes('heading')) return 'h3';
    if (name.includes('input')) return 'input';
    if (name.includes('textarea')) return 'textarea';
    return 'div';
  }

  $: renderElement = getRenderElement();
</script>

<div class="group bg(white) border(1/gray-200) r(xl) hover:border(gray-300) hover:shadow(sm) transition clip(selection)">
  
  <!-- Preview Area -->
  <div class="h(240px) hbox(center) bg(white) relative overflow(hidden)">
    <!-- Grid Pattern Background (Subtle) -->
    <div class="absolute inset(0) bg(gray-50) opacity(50) pointer-events(none)" 
      style="background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 20px 20px;">
    </div>

    <!-- Component Render -->
    <div class="relative z(1) scale(100) group-hover:scale(105) transition duration(300)">
      {#if renderElement === 'button'}
        <button class={componentFunction(exampleArgs)}>{children}</button>
      {:else if renderElement === 'span'}
        <span class={componentFunction(exampleArgs)}>{children}</span>
      {:else if renderElement === 'h3'}
        <h3 class={componentFunction(exampleArgs)}>{children}</h3>
      {:else if renderElement === 'input'}
        <input type="text" placeholder={children} class={componentFunction(exampleArgs)} readonly />
      {:else if renderElement === 'textarea'}
        <textarea placeholder={children} class={componentFunction(exampleArgs)} readonly rows="3"></textarea>
      {:else}
        <div class={componentFunction(exampleArgs)}>{children}</div>
      {/if}
    </div>
  </div>

  <!-- Footer Info -->
  <div class="border-t(1/gray-200) px(xl) py(lg) bg(white)">
    <div class="hbox(between center)">
      <h3 class="font(medium) text(sm) c(gray-900)">{title}</h3>
      <div class="opacity(0) group-hover:opacity(100) transition">
        <span class="text(xs) c(gray-500)">View Variations &rarr;</span>
      </div>
    </div>
    {#if description}
      <p class="text(sm) c(gray-500) mt(xs)">{description}</p>
    {/if}
  </div>
</div>
