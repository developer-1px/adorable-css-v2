<script lang="ts">
  import type { ComponentType } from 'svelte';
  
  export let icon: ComponentType;
  export let iconColor = 'indigo-600';
  export let title: string;
  export let description: string;
  export let gradient = false;
  export let stats: Array<{ value: string; label: string; color?: string }> = [];
</script>

<div class="vbox gap(4xl)">
  <!-- Section Header -->
  <div class="text(center) relative">
    {#if gradient}
      <!-- Floating decoration -->
      <div class="absolute top(-20px) left(50%) translate-x(-50%) w(200px) h(1px) bg(to-r/transparent..{iconColor.replace('600', '300')}..transparent) opacity(60)"></div>
    {/if}
    
    <div class="hbox(center) gap(sm) mb(xl)">
      {#if gradient}
        <div class="p(md) r(full) bg(to-br/{iconColor.replace('600', '100')}..{iconColor.replace('600', '100').replace('indigo', 'purple')}) border(1px/{iconColor.replace('600', '200')})">
          <svelte:component this={icon} size="24" class="c({iconColor})" />
        </div>
      {:else}
        <svelte:component this={icon} size="24" class="c({iconColor})" />
      {/if}
      <h2 class="display(lg) {gradient ? `c(to-r/${iconColor}..${iconColor.replace('indigo', 'purple')})` : 'c(gray-900)'}">{title}</h2>
    </div>
    
    <p class="text(lg) c(gray-600) max-w(2xl) mx(auto) {gradient ? 'leading(relaxed)' : ''}">
      {description}
    </p>
    
    {#if stats.length > 0}
      <!-- Stats row -->
      <div class="hbox(center) gap(2xl) mt(2xl) text(center)">
        {#each stats as stat}
          <div class="vbox gap(xs)">
            <div class="text(2xl) bold c({stat.color || iconColor})">{stat.value}</div>
            <div class="text(sm) c(gray-500)">{stat.label}</div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
  
  <!-- Content slot -->
  <slot />
</div>