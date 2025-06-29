<script lang="ts">
  import { Copy, Check } from 'lucide-svelte';
  
  export let code: string;
  export let variant: 'default' | 'mini' | 'inline' = 'default';
  export let label = '';
  
  let copied = false;
  
  function copyCode() {
    navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => copied = false, 2000);
  }
</script>

{#if variant === 'default'}
  <button
    class="group relative w(full) text(left) p(md) r(lg) border(1/gray-200) 
           hover:border(indigo-200) hover:bg(indigo-50) transition-all"
    on:click={copyCode}
  >
    <div class="font(mono/sm) c(gray-900) mb(xs)">{code}</div>
    {#if label}
      <div class="font(xs) c(gray-500)">{label}</div>
    {/if}
    
    <div class="absolute top(xs) right(xs) opacity(0) group-hover:opacity(100) transition">
      {#if copied}
        <div class="p(xs) r(md) bg(green-100) c(green-700) hbox(middle) gap(xs)">
          <Check size="12" />
          <span class="font(xs)">Copied!</span>
        </div>
      {:else}
        <div class="p(xs) r(md) bg(white) shadow(sm) border(1/gray-200) hbox(middle) gap(xs)">
          <Copy size="12" />
          <span class="font(xs)">Copy</span>
        </div>
      {/if}
    </div>
  </button>
{:else if variant === 'mini'}
  <button
    class="p(xs) r(md) hover:bg(gray-100) transition-all hbox(middle) gap(xs)"
    on:click={copyCode}
  >
    {#if copied}
      <Check size="14" class="c(green-600)" />
    {:else}
      <Copy size="14" class="c(gray-400) group-hover:c(gray-600)" />
    {/if}
  </button>
{:else if variant === 'inline'}
  <button
    class="inline-flex items(center) gap(xs) hover:c(indigo-600) transition-colors"
    on:click={copyCode}
  >
    <code class="font(mono) bg(gray-100) px(xs) py(1) r(sm)">{code}</code>
    {#if copied}
      <Check size="12" class="c(green-600)" />
    {:else}
      <Copy size="12" class="c(gray-400)" />
    {/if}
  </button>
{/if}