<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' | 'xl' | string = 'lg';
  export let color = 'purple-500';
  export let bgOpacity = 0.1;
  export let rounded = 'lg';
</script>

<div class="icon-box({size}) bg({color}.{bgOpacity * 10}) c({color}) r({rounded})">
  <slot />
</div>