<script lang="ts">
  export let src: string = '';
  export let alt: string = '';
  export let initials: string = '';
  export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let status: 'online' | 'offline' | 'away' | 'busy' | null = null;
  
  const sizes = {
    xs: 'w(24) h(24) font(10)',
    sm: 'w(32) h(32) font(12)',
    md: 'w(40) h(40) font(14)',
    lg: 'w(48) h(48) font(16)',
    xl: 'w(56) h(56) font(18)'
  };
  
  const statusColors = {
    online: '#10b981',
    offline: '#6b7280',
    away: '#f59e0b',
    busy: '#ef4444'
  };
  
  // Generate background color from initials
  function getBackgroundColor(str: string): string {
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }
</script>

<div class="avatar-container relative inline-block">
  <div class="avatar {sizes[size]} r() overflow(hidden) bg(#e5e5e5) hbox(pack)">
    {#if src}
      <img {src} {alt} class="w(fill) h(fill) object(cover)" />
    {:else if initials}
      <div 
        class="avatar-initials w(fill) h(fill) hbox(pack) bold c(white)"
        style="background: {getBackgroundColor(initials)}"
      >
        {initials.toUpperCase()}
      </div>
    {:else}
      <div class="avatar-placeholder w(fill) h(fill) hbox(pack) c(#a3a3a3)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="w(60%) h(60%)">
          <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor" opacity="0.3"/>
          <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor" opacity="0.3"/>
        </svg>
      </div>
    {/if}
  </div>
  
  {#if status}
    <div 
      class="status-indicator absolute bottom(0) right(0) w(25%) h(25%) r() border(2/white)"
      style="background: {statusColors[status]}"
    >
      <div class="status-pulse absolute inset(-2) r() opacity(30)" style="background: {statusColors[status]}"></div>
    </div>
  {/if}
</div>

<style>
  .avatar {
    position: relative;
    user-select: none;
  }
  
  .avatar img {
    pointer-events: none;
  }
  
  @keyframes statusPulse {
    0% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0.3;
    }
  }
  
  .status-pulse {
    animation: statusPulse 2s ease-in-out infinite;
  }
</style>