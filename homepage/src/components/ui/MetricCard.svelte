<script lang="ts">
  export let title: string;
  export let value: string;
  export let change: number;
  export let trend: 'up' | 'down' | 'neutral' = 'neutral';
  export let icon: string = '';
  export let iconColor: string = '#6366f1';
</script>

<div class="metric-card relative vbox gap(16) p(24) r(16) bg(white) border(1/#f3f4f6) hover:shadow(0/20px/25px/#00000006) hover:border(1/#e5e7eb) transition group">
  <!-- Background decoration -->
  <div class="decoration absolute top(0) right(0) w(120) h(120) opacity(.04)">
    <svg viewBox="0 0 120 120" class="w(fill) h(fill)">
      <circle cx="60" cy="60" r="50" fill="currentColor" style="color: {iconColor}" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" stroke-width="2" opacity="0.5" />
    </svg>
  </div>
  
  <!-- Header -->
  <div class="hbox(between+center) relative z(1)">
    <h3 class="font(14) medium c(#6b7280)">{title}</h3>
    {#if icon}
      <div class="icon-wrapper w(40) h(40) r(10) hbox(pack) transition group-hover:scale(1.1)" style="background: {iconColor}15">
        <span class="font(20)" style="color: {iconColor}">{icon}</span>
      </div>
    {/if}
  </div>
  
  <!-- Value and change -->
  <div class="vbox gap(8) relative z(1)">
    <p class="font(32) bold c(#111827) tracking(-0.02em)">{value}</p>
    
    <div class="hbox(center) gap(6)">
      {#if trend !== 'neutral'}
        <div class="trend-indicator hbox(center) gap(4) px(8) py(4) r(6) {trend === 'up' ? 'bg(#d1fae5) c(#059669)' : 'bg(#fee2e2) c(#dc2626)'}">
          <span class="trend-arrow font(12) bold">
            {trend === 'up' ? '↑' : '↓'}
          </span>
          <span class="font(12) semibold">{Math.abs(change)}%</span>
        </div>
      {/if}
      <span class="font(13) c(#9ca3af)">from last period</span>
    </div>
  </div>
  
  <!-- Sparkline placeholder -->
  <div class="sparkline mt(auto) h(40) relative">
    <svg viewBox="0 0 200 40" class="w(fill) h(fill)">
      <path 
        d="M0,30 L20,25 L40,27 L60,20 L80,22 L100,15 L120,18 L140,12 L160,10 L180,8 L200,5" 
        fill="none" 
        stroke={iconColor}
        stroke-width="2"
        opacity="0.3"
      />
      <path 
        d="M0,30 L20,25 L40,27 L60,20 L80,22 L100,15 L120,18 L140,12 L160,10 L180,8 L200,5" 
        fill="url(#gradient)"
        opacity="0.1"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:{iconColor};stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:{iconColor};stop-opacity:0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</div>

<style>
  .metric-card {
    position: relative;
    overflow: hidden;
  }
  
  .metric-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, transparent, var(--icon-color, #6366f1), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .metric-card:hover::before {
    opacity: 0.5;
  }
  
  .trend-arrow {
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }
</style>