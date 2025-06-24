<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled = false;
  
  const variants = {
    primary: 'bg(#0a0a0a) c(white) hover:bg(#262626) active:bg(#404040) disabled:bg(#737373)',
    secondary: 'bg(white) c(#0a0a0a) border(1/#e5e5e5) hover:bg(#fafafa) hover:border(1/#d4d4d4) active:bg(#f5f5f5)',
    ghost: 'c(#525252) hover:bg(#fafafa) hover:c(#0a0a0a) active:bg(#f5f5f5)',
    danger: 'bg(#dc2626) c(white) hover:bg(#b91c1c) active:bg(#991b1b)'
  };
  
  const sizes = {
    sm: 'h(32) px(12) font(13) gap(6)',
    md: 'h(40) px(16) font(14) gap(8)', 
    lg: 'h(48) px(20) font(15) gap(10)'
  };
</script>

<button
  class="button hbox(center) r(8) medium transition shadow(sm) disabled:opacity(.5) disabled:cursor(not-allowed) active:scale(0.98) {variants[variant]} {sizes[size]}"
  {disabled}
  on:click
>
  <slot />
</button>

<style>
  .button {
    position: relative;
    white-space: nowrap;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    outline: none;
  }
  
  .button:focus-visible {
    box-shadow: 0 0 0 3px rgba(10, 10, 10, 0.1);
  }
  
  .button::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 8px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.1), transparent);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
  }
  
  .button:hover::before {
    opacity: 1;
  }
</style>