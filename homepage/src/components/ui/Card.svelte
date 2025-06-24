<script lang="ts">
  export let padding: string = '24';
  export let hover = false;
  export let glass = false;
  export let gradient = false;
</script>

<div 
  class="card vbox r(12) overflow(hidden) transition {glass ? 'glass-effect' : 'bg(white) border(1/#e5e5e5)'} {hover ? 'hover:shadow(0/10px/20px/#00000008) hover:translate(0/-2)' : ''} {gradient ? 'gradient-border' : ''}"
  style="padding: {padding}px"
>
  <slot />
</div>

<style>
  .card {
    position: relative;
  }
  
  .glass-effect {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: 12px;
    background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
</style>