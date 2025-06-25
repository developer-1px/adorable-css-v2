<script lang="ts">
  export let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  export let className = '';
  
  // shadcn/ui Badge variants using CVA pattern
  const badgeVariants = {
    default: 'border(1/transparent) bg(--colors-primary-600) c(--colors-primary-50) hover:bg(--colors-primary-700)',
    secondary: 'border(1/transparent) bg(--colors-gray-100) c(--colors-gray-900) hover:bg(--colors-gray-200)',
    destructive: 'border(1/transparent) bg(--colors-error-600) c(--colors-error-50) hover:bg(--colors-error-700)',
    outline: 'border(1/--colors-gray-200) c(--colors-gray-950) bg(transparent)'
  };
  
  const baseClasses = `
    inline-flex(middle) r(full) border px(sm) py(xs) 
    font(xs) semibold transition-colors focus:outline(none) 
    focus:ring(2/--colors-primary-500) focus:ring-offset(2)
  `.replace(/\s+/g, ' ').trim();
  
  $: variantClass = badgeVariants[variant];
</script>

<div class="{baseClasses} {variantClass} {className}">
  <slot />
</div>

<style>
  div {
    user-select: none;
  }
</style>