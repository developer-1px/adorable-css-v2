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
  
  const baseClasses = 'flex(pack) h(full) w(full) r(full) bg(gray-100) c(gray-600) medium uppercase';
</script>

<div class="{baseClasses} {fontSizes[avatar.size]} {className}">
  <slot />
</div>