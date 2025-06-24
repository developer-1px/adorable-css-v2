<script lang="ts">
  export let variant: 'default' | 'success' | 'warning' | 'error' | 'info' = 'default';
  export let size: 'sm' | 'md' = 'sm';
  export let dot = false;
  
  const variants = {
    default: 'bg(#f4f4f5) c(#525252) border(1/#e5e5e5)',
    success: 'bg(#d1fae5) c(#059669) border(1/#86efac)',
    warning: 'bg(#fef3c7) c(#d97706) border(1/#fcd34d)',
    error: 'bg(#fee2e2) c(#dc2626) border(1/#fca5a5)',
    info: 'bg(#dbeafe) c(#2563eb) border(1/#93c5fd)'
  };
  
  const sizes = {
    sm: 'px(8) py(2) font(11)',
    md: 'px(12) py(4) font(12)'
  };
</script>

<span class="badge hbox(center) gap(6) r(9999) medium border(1) {variants[variant]} {sizes[size]}">
  {#if dot}
    <span class="badge-dot w(6) h(6) r() bg(currentColor) opacity(80)"></span>
  {/if}
  <slot />
</span>

<style>
  .badge {
    display: inline-flex;
    white-space: nowrap;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.8;
    }
    50% {
      opacity: 0.4;
    }
  }
  
  .badge-dot {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>