<script lang="ts">
  import { getContext } from 'svelte';
  
  export let className = '';
  
  const avatar = getContext('avatar') || { size: 'md' };
  
  const fontSizes = {
    sm: 'font(xs)',
    md: 'font(sm)',
    lg: 'font(md)', 
    xl: 'font(lg)'
  };
  
  const baseClasses = 'flex h(full) w(full) items(center) justify(center) r(full) bg(--colors-gray-100) c(--colors-gray-600) medium uppercase';
</script>

<div class="{baseClasses} {fontSizes[avatar.size]} {className}">
  <slot />
</div>