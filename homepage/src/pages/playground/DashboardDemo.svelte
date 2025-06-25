<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '../../components/ui/Button.svelte';
  import Card from '../../components/ui/Card.svelte';
  import MetricCard from '../../components/ui/MetricCard.svelte';
  
  let mounted = false;
  let currentDate = '';
  
  const metrics = [
    { 
      title: 'Total Revenue', 
      value: '$54,239', 
      change: 12.5, 
      trend: 'up', 
      icon: '💰',
      iconColor: '#10b981'
    },
    { 
      title: 'Active Users', 
      value: '3,428', 
      change: 8.2, 
      trend: 'up', 
      icon: '👥',
      iconColor: '#3b82f6'
    },
    { 
      title: 'Conversion Rate', 
      value: '24.8%', 
      change: -2.4, 
      trend: 'down', 
      icon: '📊',
      iconColor: '#f59e0b'
    },
    { 
      title: 'Avg. Order Value', 
      value: '$128.40', 
      change: 4.3, 
      trend: 'up', 
      icon: '🛍️',
      iconColor: '#8b5cf6'
    }
  ];
  
  const activities = [
    { id: 1, type: 'sale', title: 'New purchase', desc: '$2,345 from Emma Wilson', time: '2 min ago', icon: '💳' },
    { id: 2, type: 'user', title: 'New signup', desc: 'john.doe@example.com', time: '14 min ago', icon: '👤' },
    { id: 3, type: 'alert', title: 'Server alert', desc: 'CPU usage spike to 89%', time: '1 hour ago', icon: '⚠️' },
    { id: 4, type: 'report', title: 'Report ready', desc: 'Q1 2024 analytics', time: '3 hours ago', icon: '📈' }
  ];
  
  onMount(() => {
    mounted = true;
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  });
  
  function updateDate() {
    const now = new Date();
    currentDate = now.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<div class="dashboard vbox w(fill) min-h(screen) bg(#fafbfc)">
  <!-- Modern Header -->
  <header class="header hbox(between+center) h(64) px(2xl) bg(white/80) backdrop(blur/12) border-bottom(1/#f0f0f2) sticky top(0) z(50)">
    <div class="hbox(center) gap(2xl)">
      <!-- Logo -->
      <div class="logo hbox(center) gap(xs)">
        <div class="logo-mark relative w(40) h(40) r(lg) bg(#0a0a0a..#262626/135deg) hbox(pack) shadow(md)">
          <span class="font(xl) bold c(white)">A</span>
          <div class="logo-shine layer(fill) r(lg) bg(white.2..transparent/135deg) opacity(0) hover:opacity(100) transition"></div>
        </div>
        <div class="vbox gap(xs)">
          <h1 class="font(lg) bold c(#0a0a0a)">Analytics Pro</h1>
          <p class="font(xs) c(#737373)">{currentDate}</p>
        </div>
      </div>
      
      <!-- Nav -->
      <nav class="nav hbox gap(xs)">
        <a href="#" class="nav-item px(md) py(sm) r(sm) c(#0a0a0a) font(sm) medium hover:bg(#f5f5f5) transition relative group">
          Dashboard
          <span class="nav-indicator absolute bottom(0) left(md) right(md) h(2) bg(#0a0a0a) r(none) scale-x(1)"></span>
        </a>
        <a href="#" class="nav-item px(md) py(sm) r(sm) c(#737373) font(sm) hover:c(#0a0a0a) hover:bg(#f5f5f5) transition">Analytics</a>
        <a href="#" class="nav-item px(md) py(sm) r(sm) c(#737373) font(sm) hover:c(#0a0a0a) hover:bg(#f5f5f5) transition">Products</a>
        <a href="#" class="nav-item px(md) py(sm) r(sm) c(#737373) font(sm) hover:c(#0a0a0a) hover:bg(#f5f5f5) transition">Customers</a>
      </nav>
    </div>
    
    <div class="hbox(center) gap(md)">
      <!-- Search -->
      <div class="search-container relative">
        <input 
          type="search"
          placeholder="Search anything..."
          class="search-input w(280) h(40) pl(40) pr(md) r(2xl) bg(#f5f5f5) border(1/transparent) font(sm) c(#0a0a0a) placeholder:c(#a3a3a3) focus:bg(white) focus:border(1/#e5e5e5) focus:shadow(0/0/0/4px/#00000008) transition"
        />
        <span class="search-icon absolute left(14) y(center) c(#737373) font(md)">🔍</span>
      </div>
      
      <!-- Actions -->
      <Button variant="ghost" size="sm">
        <span class="font(md)">🔔</span>
      </Button>
      
      <div class="divider w(1) h(24) bg(#e5e5e5)"></div>
      
      <!-- User -->
      <button class="user-menu hbox(center) gap(xs) px(xs) py(xs) r(2xl) hover:bg(#f5f5f5) transition">
        <div class="avatar w(32) h(32) r(full) bg(#6366f1..#8b5cf6/135deg) hbox(pack) shadow(sm)">
          <span class="font(sm) bold c(white)">JW</span>
        </div>
        <div class="vbox gap(xs) text(left)">
          <span class="font(sm) semibold c(#0a0a0a)">John Walker</span>
          <span class="font(xs) c(#737373)">Pro Plan</span>
        </div>
        <span class="font(xs) c(#a3a3a3)">▾</span>
      </button>
    </div>
  </header>
  
  <!-- Main Content -->
  <main class="main-content flex vbox p(2xl) gap(2xl)">
    <!-- Page Title Section -->
    <div class="page-header vbox gap(md)">
      <div class="hbox(between+center)">
        <div class="vbox gap(sm)">
          <h2 class="font(5xl/-2%) bold c(#0a0a0a)">Welcome back, John</h2>
          <p class="font(md) c(#737373)">Here's what's happening with your business today.</p>
        </div>
        
        <div class="hbox gap(xs)">
          <Button variant="secondary">
            <span class="font(md)">📥</span>
            Export Report
          </Button>
          <Button variant="primary">
            <span class="font(md)">✨</span>
            New Dashboard
          </Button>
        </div>
      </div>
    </div>
    
    <!-- Metrics Grid -->
    <div class="metrics-container">
      <div class="metrics-grid grid(4) gap(lg)">
        {#each metrics as metric}
          <MetricCard {...metric} />
        {/each}
      </div>
    </div>
    
    <!-- Content Grid -->
    <div class="content-grid grid(3) gap(xl)">
      <!-- Revenue Chart -->
      <Card padding="28" hover={true} glass={false}>
        <div class="chart-section vbox gap(lg) col-span(2)">
          <div class="hbox(between+center)">
            <div class="vbox gap(xs)">
              <h3 class="font(xl) bold c(#0a0a0a)">Revenue Overview</h3>
              <p class="font(sm) c(#737373)">Daily revenue for the last 30 days</p>
            </div>
            
            <div class="period-selector hbox gap(xs) p(xs) r(lg) bg(#f5f5f5)">
              <button class="period-btn px(sm) py(xs) r(sm) font(sm) medium c(#737373) hover:c(#0a0a0a) transition">Daily</button>
              <button class="period-btn px(sm) py(xs) r(sm) bg(white) c(#0a0a0a) font(sm) medium shadow(sm)">Weekly</button>
              <button class="period-btn px(sm) py(xs) r(sm) font(sm) medium c(#737373) hover:c(#0a0a0a) transition">Monthly</button>
            </div>
          </div>
          
          <!-- Chart Area -->
          <div class="chart-area relative h(320) bg(#fafbfc) r(xl) p(xl)">
            <div class="chart-grid layer(top:xl+right:xl+bottom:xl+left:xl)">
              <!-- Grid lines -->
              {#each [0, 1, 2, 3, 4] as i}
                <div class="grid-line absolute w(fill) h(1) bg(#e5e5e5.5)" style="bottom: {i * 25}%"></div>
              {/each}
              
              <!-- Bars -->
              <div class="bars layer(left:0+right:0+bottom:0) hbox(between) gap(xs)">
                {#each Array(30) as _, i}
                  <div class="bar-wrapper flex vbox(end) group">
                    <div 
                      class="bar w(fill) bg(#3b82f6..#2563eb/to-bottom) r(xs/xs/none/none) transition hover:bg(#2563eb..#1d4ed8/to-bottom) relative"
                      style="height: {Math.random() * 80 + 20}%"
                    >
                      <div class="bar-tooltip absolute bottom(fill) x(center) mb(sm) px(xs) py(xs) r(sm) bg(#0a0a0a) c(white) font(xs) whitespace(nowrap) opacity(0) group-hover:opacity(100) transition pointer-events(none)">
                        ${(Math.random() * 5000 + 1000).toFixed(0)}
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
            
            <!-- Y-axis labels -->
            <div class="y-axis absolute left(0) top(24) bottom(24) w(20) vbox(between) text(right)">
              {#each ['$10k', '$8k', '$6k', '$4k', '$2k', '$0'] as label}
                <span class="font(xs) c(#a3a3a3)">{label}</span>
              {/each}
            </div>
          </div>
        </div>
      </Card>
      
      <!-- Activity Feed -->
      <Card padding="xl" hover={true}>
        <div class="activity-section vbox gap(lg)">
          <div class="hbox(between+center)">
            <h3 class="font(lg) bold c(#0a0a0a)">Recent Activity</h3>
            <button class="font(sm) c(#3b82f6) hover:c(#2563eb) transition">View all →</button>
          </div>
          
          <div class="activity-list vbox gap(xs)">
            {#each activities as activity}
              <div class="activity-item hbox gap(xs) p(xs) r(lg) hover:bg(#f5f5f5.5) transition">
                <div class="activity-icon w(40) h(40) r(lg) bg(#f5f5f5) hbox(pack) font(lg)">
                  {activity.icon}
                </div>
                <div class="activity-content vbox gap(xs) flex">
                  <p class="font(sm) medium c(#0a0a0a)">{activity.title}</p>
                  <p class="font(sm) c(#737373)">{activity.desc}</p>
                </div>
                <span class="activity-time font(xs) c(#a3a3a3) whitespace(nowrap)">{activity.time}</span>
              </div>
            {/each}
          </div>
          
          <Button variant="secondary" size="sm">
            Load more activities
          </Button>
        </div>
      </Card>
    </div>
    
    <!-- Bottom Section -->
    <Card padding="0" hover={false}>
      <div class="table-section vbox">
        <!-- Table Header -->
        <div class="table-header hbox(between+center) p(xl) border-bottom(1/#f0f0f2)">
          <div class="vbox gap(xs)">
            <h3 class="font(lg) bold c(#0a0a0a)">Recent Transactions</h3>
            <p class="font(sm) c(#737373)">Your latest customer transactions</p>
          </div>
          
          <div class="hbox gap(xs)">
            <div class="filter-wrapper relative">
              <select class="filter-select h(36) pl(xs) pr(2xl) r(sm) bg(white) border(1/#e5e5e5) font(sm) c(#0a0a0a) appearance(none) cursor(pointer)">
                <option>All Status</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
              <span class="absolute right(xs) y(center) c(#737373) pointer-events(none)">▾</span>
            </div>
            <Button variant="ghost" size="sm">
              <span>🔍</span>
              Search
            </Button>
          </div>
        </div>
        
        <!-- Table Content -->
        <div class="table-wrapper">
          <table class="data-table w(fill)">
            <thead class="bg(#fafbfc) border-bottom(1/#f0f0f2)">
              <tr>
                <th class="table-header px(xl) py(md) text(left) font(xs/5%) semibold c(#737373) uppercase">Transaction ID</th>
                <th class="table-header px(xl) py(md) text(left) font(xs/5%) semibold c(#737373) uppercase">Customer</th>
                <th class="table-header px(xl) py(md) text(left) font(xs/5%) semibold c(#737373) uppercase">Date</th>
                <th class="table-header px(xl) py(md) text(left) font(xs/5%) semibold c(#737373) uppercase">Status</th>
                <th class="table-header px(xl) py(md) text(right) font(xs/5%) semibold c(#737373) uppercase">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-bottom(1/#f0f0f2) hover:bg(#fafbfc.5) transition">
                <td class="px(xl) py(lg)">
                  <span class="font(sm) medium c(#0a0a0a)">#TRX-001234</span>
                </td>
                <td class="px(xl) py(lg)">
                  <div class="hbox(center) gap(xs)">
                    <div class="w(32) h(32) r() bg(#e5e5e5)"></div>
                    <div class="vbox gap(xs)">
                      <span class="font(sm) medium c(#0a0a0a)">Emma Wilson</span>
                      <span class="font(xs) c(#737373)">emma@example.com</span>
                    </div>
                  </div>
                </td>
                <td class="px(xl) py(lg) font(sm) c(#525252)">Mar 24, 2024</td>
                <td class="px(xl) py(lg)">
                  <span class="status-badge px(xs) py(xs) r(xl) bg(#d1fae5) c(#059669) font(xs) medium">Completed</span>
                </td>
                <td class="px(xl) py(lg) text(right) font(sm) semibold c(#0a0a0a)">$2,345.00</td>
              </tr>
              
              <tr class="border-bottom(1/#f0f0f2) hover:bg(#fafbfc.5) transition">
                <td class="px(xl) py(lg)">
                  <span class="font(sm) medium c(#0a0a0a)">#TRX-001233</span>
                </td>
                <td class="px(xl) py(lg)">
                  <div class="hbox(center) gap(xs)">
                    <div class="w(32) h(32) r() bg(#e5e5e5)"></div>
                    <div class="vbox gap(xs)">
                      <span class="font(sm) medium c(#0a0a0a)">Michael Chen</span>
                      <span class="font(xs) c(#737373)">mchen@example.com</span>
                    </div>
                  </div>
                </td>
                <td class="px(xl) py(lg) font(sm) c(#525252)">Mar 24, 2024</td>
                <td class="px(xl) py(lg)">
                  <span class="status-badge px(xs) py(xs) r(xl) bg(#fef3c7) c(#d97706) font(xs) medium">Pending</span>
                </td>
                <td class="px(xl) py(lg) text(right) font(sm) semibold c(#0a0a0a)">$1,128.50</td>
              </tr>
              
              <tr class="border-bottom(1/#f0f0f2) hover:bg(#fafbfc.5) transition">
                <td class="px(xl) py(lg)">
                  <span class="font(sm) medium c(#0a0a0a)">#TRX-001232</span>
                </td>
                <td class="px(xl) py(lg)">
                  <div class="hbox(center) gap(xs)">
                    <div class="w(32) h(32) r() bg(#e5e5e5)"></div>
                    <div class="vbox gap(xs)">
                      <span class="font(sm) medium c(#0a0a0a)">Sarah Johnson</span>
                      <span class="font(xs) c(#737373)">sarah.j@example.com</span>
                    </div>
                  </div>
                </td>
                <td class="px(xl) py(lg) font(sm) c(#525252)">Mar 23, 2024</td>
                <td class="px(xl) py(lg)">
                  <span class="status-badge px(xs) py(xs) r(xl) bg(#fee2e2) c(#dc2626) font(xs) medium">Failed</span>
                </td>
                <td class="px(xl) py(lg) text(right) font(sm) semibold c(#0a0a0a)">$459.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Table Footer -->
        <div class="table-footer hbox(between+center) p(xl) border-top(1/#f0f0f2)">
          <span class="font(sm) c(#737373)">Showing 1-3 of 248 transactions</span>
          
          <div class="pagination hbox gap(sm)">
            <button class="page-btn px(xs) py(xs) r(sm) c(#a3a3a3) font(sm) disabled cursor(not-allowed)">← Previous</button>
            
            <div class="page-numbers hbox gap(xs)">
              <button class="page-num w(32) h(32) r(sm) bg(#0a0a0a) c(white) font(sm) medium">1</button>
              <button class="page-num w(32) h(32) r(sm) c(#737373) font(sm) hover:bg(#f5f5f5) transition">2</button>
              <button class="page-num w(32) h(32) r(sm) c(#737373) font(sm) hover:bg(#f5f5f5) transition">3</button>
              <span class="px(sm) c(#a3a3a3)">...</span>
              <button class="page-num w(32) h(32) r(sm) c(#737373) font(sm) hover:bg(#f5f5f5) transition">24</button>
            </div>
            
            <button class="page-btn px(xs) py(xs) r(sm) c(#0a0a0a) font(sm) hover:bg(#f5f5f5) transition">Next →</button>
          </div>
        </div>
      </div>
    </Card>
  </main>
</div>

<style>
  /* Global styles */
  .dashboard {
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Remove button defaults */
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }
  
  /* Custom scrollbar */
  :global(*) {
    scrollbar-width: thin;
    scrollbar-color: #e5e5e5 transparent;
  }
  
  :global(*::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }
  
  :global(*::-webkit-scrollbar-track) {
    background: transparent;
  }
  
  :global(*::-webkit-scrollbar-thumb) {
    background: #e5e5e5;
    border-radius: 4px;
  }
  
  :global(*::-webkit-scrollbar-thumb:hover) {
    background: #d4d4d4;
  }
  
  /* Focus styles */
  button:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid #0a0a0a;
    outline-offset: 2px;
  }
  
  /* Smooth transitions */
  * {
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }
  
  /* Grid responsive */
  @media (max-width: 1280px) {
    .metrics-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .content-grid {
      grid-template-columns: 1fr;
    }
    
    .chart-section {
      grid-column: span 1;
    }
  }
  
  @media (max-width: 768px) {
    .metrics-grid {
      grid-template-columns: 1fr;
    }
    
    .nav {
      display: none;
    }
    
    .search-container {
      display: none;
    }
  }
</style>