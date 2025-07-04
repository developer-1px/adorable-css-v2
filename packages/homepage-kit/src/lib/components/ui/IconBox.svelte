<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' | 'xl' | string = 'lg';
  export let color = 'primary';
  export let bgOpacity = 0.1;
  export let radius = 'lg';
</script>

<div class="icon-box({size}) bg({color}.{bgOpacity * 10}) c({color}) r({radius})">
  <slot />
</div>