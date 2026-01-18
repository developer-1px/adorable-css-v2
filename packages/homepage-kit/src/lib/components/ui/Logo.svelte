<script>
  export let size = 32;
  export let color = "currentColor";
  export let filled = false;
</script>

<svg 
  width={size} 
  height={size} 
  viewBox="0 0 48 48" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
  class={$$props.class}
>
  <defs>
    <linearGradient id="logo-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#6366f1" /> <!-- Indigo 500 -->
      <stop offset="100%" stop-color="#a855f7" /> <!-- Purple 500 -->
    </linearGradient>
  </defs>
  
  {#if filled}
    <rect width="48" height="48" rx="12" fill="url(#logo-gradient)" />
    <path 
      d="M24 8L36 36H12L24 8Z" 
      fill="white" 
      stroke="white" 
      stroke-width="4" 
      stroke-linejoin="round"
    />
    <path d="M16 26H32" stroke="white" stroke-width="4" stroke-linecap="round" />
  {:else}
    <path 
      d="M24 4L42 40H6L24 4Z" 
      stroke="url(#logo-gradient)" 
      stroke-width="6" 
      stroke-linejoin="round"
    />
    <path d="M12 28H36" stroke="url(#logo-gradient)" stroke-width="6" stroke-linecap="round" />
  {/if}
</svg>
