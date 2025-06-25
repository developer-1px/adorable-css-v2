<script lang="ts">
  export let size = 500;
  export let gradient: 'adorable' | 'ocean' | 'sunset' | 'forest' = 'adorable';
  export let blur = 100;
  export let opacity = 30;
  export let animationDuration = 25;
  export let animationDelay = 0;
  export let position = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
  
  const gradients = {
    adorable: 'var(--gradient-adorable)',
    ocean: 'var(--gradient-ocean)',
    sunset: 'var(--gradient-sunset)',
    forest: 'var(--gradient-forest)'
  };
  
  $: style = `
    width: ${size}px;
    height: ${size}px;
    background: ${gradients[gradient]};
    filter: blur(${blur}px);
    opacity: ${opacity / 100};
    animation-duration: ${animationDuration}s;
    animation-delay: ${animationDelay}s;
    top: ${position.top};
    right: ${position.right};
    bottom: ${position.bottom};
    left: ${position.left};
  `;
</script>

<div class="floating-orb" {style}></div>

<style>
  @import '../../styles/brand.css';
  
  .floating-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: float ease-in-out infinite;
  }
</style>