<script lang="ts">
  export let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  export let className = '';
  
  // shadcn/ui Badge variants using CVA pattern
  const badgeVariants = {
    default: 'border(1/transparent) bg(blue-600) c(white) hover:bg(blue-700)',
    secondary: 'border(1/transparent) bg(gray-100) c(gray-900) hover:bg(gray-200)',
    destructive: 'border(1/transparent) bg(red-600) c(white) hover:bg(red-700)',
    outline: 'border(1/gray-200) c(gray-900) bg(transparent)'
  };
  
  const baseClasses = `
    hbox(middle) r(full) border px(sm) py(xs) 
    600 font(xs) transition-colors focus:outline(none) 
    focus:ring(2/blue-500) focus:ring-offset(2)
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