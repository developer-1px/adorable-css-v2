<script lang="ts">
  export let icon: any = null;
  export let iconColor = 'purple-500';
  export let title: string;
  export let description: string;
  export let gradient = false;
</script>

<div class="{gradient ? 'feature-card-gradient' : 'feature-card'}">
  {#if icon}
    <div class="icon-box(48) bg({iconColor}.1) c({iconColor})">
      {#if typeof icon === 'string'}
        <svelte:component this={icon} size="24" />
      {:else}
        <slot name="icon">
          <svelte:component this={icon} size="24" />
        </slot>
      {/if}
    </div>
  {/if}
  
  <h3 class="font(xl) bold c({gradient ? 'white' : 'gray-900'})">{title}</h3>
  
  <p class="font(sm) c({gradient ? 'white.9' : 'gray-600'}) leading(relaxed)">
    {description}
  </p>
  
  <slot />
</div>