<script lang="ts">
  export let title: string;
  export let value: string;
  export let change: number;
  export let trend: 'up' | 'down' | 'neutral' = 'neutral';
  export let icon: string = '';
  export let iconColor: string = '#3b82f6';
  
  // Map trend to design token colors
  const trendStyles = {
    up: 'bg(success-100) c(success-700) ring(1/success-200)',
    down: 'bg(error-100) c(error-700) ring(1/error-200)',
    neutral: 'bg(gray-100) c(gray-700) ring(1/gray-200)'
  };
</script>

<div class="metric-card relative vbox gap(md) p(lg) r(xl) bg(white) ring(1/gray-200) 
           hover:shadow(lg) hover:ring(1/gray-300) hover:translate(0/-1) 
           transition-all duration(normal) ease(out) group cursor-pointer">
  
  <!-- Background decoration with improved design -->
  <div class="decoration layer(top:-10+right:-10) size(100) opacity(xs) rotate(12) group-hover:rotate(24) group-hover:scale(1.02) transition-all duration(slower) ease(out)">
    <svg viewBox="0 0 100 100" class="w(fill) h(fill)">
      <circle cx="50" cy="50" r="40" fill="currentColor" style="color: {iconColor}" opacity="0.08" />
      <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="1" opacity="0.12" style="color: {iconColor}" />
      <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.15" style="color: {iconColor}" />
    </svg>
  </div>
  
  <!-- Header with enhanced spacing -->
  <div class="hbox(between+center) relative z(10)">
    <h3 class="500 font(sm) c(gray-600) group-hover:c(gray-700) transition-colors duration(normal)">{title}</h3>
    {#if icon}
      <div class="icon-wrapper size(40) r(lg) shadow(xs) group-hover:shadow(md) group-hover:scale(1.02) transition-all duration(normal) ease(back)" 
           style="background: {iconColor}15; border: 1px solid {iconColor}20;">
        <span class="font(lg)" style="color: {iconColor}">{icon}</span>
      </div>
    {/if}
  </div>
  
  <!-- Value and change with enhanced typography -->
  <div class="vbox gap(xs) relative z(10)">
    <p class="700 font(4xl/-2%) c(gray-900) group-hover:c(gray-900) transition-colors duration(normal)">{value}</p>
    
    <div class="hbox(center) gap(xs)">
      {#if trend !== 'neutral'}
        <div class="trend-indicator hbox(center) gap(xs) px(xs) py(xs) r(lg) {trendStyles[trend]} backdrop-blur shadow(xs)">
          <span class="trend-arrow 700 font(xs)">
            {trend === 'up' ? '↗' : '↘'}
          </span>
          <span class="600 font(xs)">{Math.abs(change)}%</span>
        </div>
      {/if}
      <span class="font(xs) c(gray-500)">from last period</span>
    </div>
  </div>
  
  <!-- Enhanced sparkline with better animation -->
  <div class="sparkline mt(auto) h(32) relative clip group-hover:h(48) transition-all duration(normal)">
    <svg viewBox="0 0 200 32" class="w(fill) h(fill)">
      <!-- Gradient area under the line -->
      <defs>
        <linearGradient id="gradient-{title.replace(/\s+/g, '')}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:{iconColor};stop-opacity:0.2" />
          <stop offset="100%" style="stop-color:{iconColor};stop-opacity:0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Area fill -->
      <path 
        d="M0,24 L25,20 L50,22 L75,16 L100,18 L125,12 L150,14 L175,8 L200,6 L200,32 L0,32 Z" 
        fill="url(#gradient-{title.replace(/\s+/g, '')})"
        class="group-hover:opacity(0.3) transition-opacity duration(normal)"
      />
      
      <!-- Main line -->
      <path 
        d="M0,24 L25,20 L50,22 L75,16 L100,18 L125,12 L150,14 L175,8 L200,6" 
        fill="none" 
        stroke={iconColor}
        stroke-width="2"
        opacity="0.6"
        class="group-hover:opacity(0.8) transition-opacity duration(normal)"
        filter="url(#glow)"
      />
      
      <!-- Data points -->
      <g class="opacity(0) group-hover:opacity(1) transition-opacity duration(normal)">
        {#each [0, 25, 50, 75, 100, 125, 150, 175, 200] as x, i}
          <circle 
            cx={x} 
            cy={[24, 20, 22, 16, 18, 12, 14, 8, 6][i]} 
            r="2" 
            fill={iconColor}
            class="animate-pulse"
            style="animation-delay: {i * 0.1}s"
          />
        {/each}
      </g>
    </svg>
  </div>
  
  <!-- Enhanced top border indicator -->
  <div class="border-indicator layer(top+left+right) h(xs) r(xl/xl/none/none) opacity(0) group-hover:opacity(1) transition-all duration(normal)" 
       style="background: linear-gradient(90deg, transparent, {iconColor}, transparent)">
  </div>
</div>

<style>
  .metric-card {
    position: relative;
    overflow: hidden;
  }
  
  .metric-card:hover {
    transform: translateY(-2px);
  }
  
  .metric-card:active {
    transform: translateY(-1px);
    transition-duration: var(--duration-fast);
  }
  
  .trend-arrow {
    animation: trendBounce var(--duration-slower) var(--ease-bounce) infinite;
  }
  
  @keyframes trendBounce {
    0%, 100% { 
      transform: translateY(0) scale(1); 
    }
    50% { 
      transform: translateY(-1px) scale(1.1); 
    }
  }
  
  /* Pulse animation for data points */
  @keyframes pulse {
    0%, 100% {
      opacity: 0.6;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }
  
  .animate-pulse {
    animation: pulse var(--duration-slow) var(--ease-in-out) infinite;
  }
  
  /* Focus styles for accessibility */
  .metric-card:focus-visible {
    outline: 2px solid var(--colors-primary-500);
    outline-offset: 2px;
  }
</style>