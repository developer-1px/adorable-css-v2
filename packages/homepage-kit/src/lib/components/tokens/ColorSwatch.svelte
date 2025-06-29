<script lang="ts">
  import { Copy, Check } from 'lucide-svelte';
  
  export let color: string;
  export let name: string;
  export let value: string;
  export let hex: string = '';
  export let variant: 'compact' | 'detailed' = 'compact';
  
  let copied = false;
  
  function copyColor() {
    navigator.clipboard.writeText(name);
    copied = true;
    setTimeout(() => copied = false, 2000);
  }
</script>

{#if variant === 'compact'}
  <button
    class="group relative vbox cursor-pointer hover:scale(105) transition-transform"
    on:click={copyColor}
  >
    <div 
      class="w(full) h(48px) r(lg) shadow(sm) group-hover:shadow(md) transition-shadow"
      style="background-color: {value}"
    ></div>
    <div class="mt(sm) text(center)">
      <div class="font(mono/xs) c(gray-700) group-hover:c(gray-900) transition-colors">{name}</div>
    </div>
    
    {#if copied}
      <div class="absolute top(50%) left(50%) translate(-50%,-50%) bg(white) r(md) p(xs) shadow(lg)">
        <Check size="16" class="c(green-600)" />
      </div>
    {/if}
  </button>
{:else}
  <button
    class="group relative p(lg) r(xl) bg(white) border(1/gray-200) hover:border(indigo-200) 
           hover:shadow(lg) transition-all cursor-pointer"
    on:click={copyColor}
  >
    <div class="vbox gap(md)">
      <div 
        class="w(full) h(64px) r(lg) shadow(inner)"
        style="background-color: {value}"
      ></div>
      <div class="vbox gap(xs)">
        <div class="font(mono/sm) c(gray-900) bold">{name}</div>
        <div class="font(mono/xs) c(gray-500)">{value}</div>
        {#if hex}
          <div class="font(mono/xs) c(gray-400)">{hex}</div>
        {/if}
      </div>
    </div>
    
    <div class="absolute top(xs) right(xs) opacity(0) group-hover:opacity(100) transition">
      {#if copied}
        <div class="p(xs) r(md) bg(green-100) c(green-700)">
          <Check size="12" />
        </div>
      {:else}
        <div class="p(xs) r(md) bg(white) shadow(sm) border(1/gray-200)">
          <Copy size="12" />
        </div>
      {/if}
    </div>
  </button>
{/if}