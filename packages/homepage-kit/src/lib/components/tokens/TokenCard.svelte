<script lang="ts">
  import type { ComponentType } from 'svelte';
  
  export let title: string;
  export let subtitle = '';
  export let icon: ComponentType | null = null;
  export let iconColor = 'neutral-400';
  export let shadowColor = 'neutral-200.5';
  export let gradient = false;
  export let gradientColors = 'primary-50..neutral-50';
</script>

<div class="bg(white) r(2xl) shadow(xl) shadow({shadowColor}) {gradient ? '' : 'p(2xl)'} {$$props.class || ''}">
  {#if gradient}
    <div class="bg(to-r/{gradientColors}) p(2xl) border-b(1px/{iconColor.replace('400', '100')})">
      <div class="hbox(between/middle) mb(xl)">
        <div>
          <h3 class="heading(h2) c(neutral-900) mb(xs)">{title}</h3>
          {#if subtitle}
            <p class="text(sm) c(neutral-600)">{subtitle}</p>
          {/if}
        </div>
        {#if icon}
          <svelte:component this={icon} size="20" class="c({iconColor})" />
        {/if}
      </div>
      <slot name="header" />
    </div>
    <div class="p(2xl)">
      <slot />
    </div>
  {:else}
    <div class="hbox(between/middle) mb(2xl)">
      <div>
        <h3 class="heading(h2) c(neutral-900) mb(xs)">{title}</h3>
        {#if subtitle}
          <p class="text(sm) c(neutral-600)">{subtitle}</p>
        {/if}
      </div>
      {#if icon}
        <svelte:component this={icon} size="20" class="c({iconColor})" />
      {/if}
    </div>
    <slot />
  {/if}
</div>