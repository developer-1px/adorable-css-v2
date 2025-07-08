<script lang="ts">
  import { onMount } from 'svelte';
  import { Settings, Users, BarChart3, Package, FileText, Monitor, Database, Zap, Activity } from 'lucide-svelte';
  
  let mounted = false;
  let currentTime = new Date();
  
  // Mock data for the admin dashboard
  const stats = [
    { title: 'Total Users', value: '2,543', change: '+5%', icon: Users, color: 'slate' },
    { title: 'Documents', value: '1,234', change: '+3%', icon: FileText, color: 'slate' },
    { title: 'Projects', value: '89', change: '+2%', icon: Package, color: 'slate' },
    { title: 'System Health', value: '99.2%', change: '+0.1%', icon: Activity, color: 'slate' }
  ];
  
  const recentActivity = [
    { user: 'Sarah Kim', action: 'Created new project', time: '2 minutes ago', type: 'create' },
    { user: 'Mike Chen', action: 'Updated user settings', time: '5 minutes ago', type: 'update' },
    { user: 'Emma Wilson', action: 'Deleted old files', time: '12 minutes ago', type: 'delete' },
    { user: 'James Park', action: 'Shared document', time: '18 minutes ago', type: 'share' },
    { user: 'Lisa Zhang', action: 'Joined team workspace', time: '25 minutes ago', type: 'join' }
  ];
  
  const systemMetrics = [
    { name: 'CPU Usage', value: 45, max: 100, color: 'slate', description: 'Processor utilization across all cores' },
    { name: 'Memory', value: 67, max: 100, color: 'slate', description: 'RAM usage including cache and buffers' },
    { name: 'Storage', value: 23, max: 100, color: 'slate', description: 'Disk space utilization' },
    { name: 'Network', value: 89, max: 100, color: 'slate', description: 'Bandwidth utilization' }
  ];
  
  onMount(() => {
    mounted = true;
    
    // Update time every second
    const interval = setInterval(() => {
      currentTime = new Date();
    }, 1000);
    
    return () => clearInterval(interval);
  });
  
  function getActivityIcon(type: string) {
    switch(type) {
      case 'create': return '✨';
      case 'update': return '📝';
      case 'delete': return '🗑️';
      case 'share': return '📤';
      case 'join': return '👋';
      default: return '📄';
    }
  }
  
  function getColorClasses(color: string) {
    switch(color) {
      case 'slate': return 'bg(slate-600) c(white)';
      case 'blue': return 'bg(blue-600) c(white)';
      case 'green': return 'bg(green-600) c(white)';
      default: return 'bg(slate-600) c(white)';
    }
  }
  
  function getProgressColor(color: string) {
    switch(color) {
      case 'slate': return 'bg(slate-500)';
      case 'blue': return 'bg(blue-500)';
      case 'green': return 'bg(green-500)';
      default: return 'bg(slate-500)';
    }
  }
</script>

<svelte:head>
  <title>Admin Dashboard - Showroom 3</title>
  <meta name="description" content="Admin dashboard for system management and monitoring" />
</svelte:head>

<div class="min-h(screen) bg(gray-50)">
  
  <!-- Header -->
  <header class="bg(white) bb(1/slate-200) sticky top(0) z(50) shadow(sm)">
    <div class="hbox(between/middle) px(2xl) py(lg)">
      <div class="hbox(start/middle) gap(lg)">
        <div class="size(48px) r(lg) bg(slate-600) hbox(center/middle)">
          <FileText size="24" class="c(white)" />
        </div>
        <div>
          <h1 class="font(xl) font(semibold) c(slate-800)">Admin Dashboard</h1>
          <p class="font(sm) c(slate-600)">System Management & Monitoring</p>
        </div>
      </div>
      
      <div class="hbox(start/middle) gap(xl)">
        <div class="text(right)">
          <div class="font(sm) font(medium) c(slate-800)">{currentTime.toLocaleTimeString()}</div>
          <div class="font(xs) c(slate-600)">{currentTime.toLocaleDateString()}</div>
        </div>
        <button class="size(40px) r(lg) border(1/slate-300) bg(white) hover:bg(slate-50) transition hbox(center/middle)">
          <Settings size="18" class="c(slate-600)" />
        </button>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="px(2xl) py(2xl)">
    
    <!-- Stats Grid -->
    <section class="mb(3xl)">
      <h2 class="font(lg) font(semibold) c(slate-800) mb(xl)">System Overview</h2>
      
      <div class="grid(4) gap(lg)">
        {#each stats as stat}
          <div class="vbox gap(md) p(xl) bg(white) r(lg) border(1/slate-200) shadow(sm) hover:shadow(md) transition">
            <div class="hbox(between/start)">
              <div class="size(40px) r(md) {getColorClasses(stat.color)} hbox(center/middle)">
                <svelte:component this={stat.icon} size="20" />
              </div>
              <span class="font(xs) font(medium) c({stat.change.includes('+') ? 'green-600' : 'red-600'})">
                {stat.change}
              </span>
            </div>
            
            <div>
              <div class="font(2xl) font(semibold) c(slate-800) mb(xs)">{stat.value}</div>
              <div class="font(sm) c(slate-600)">{stat.title}</div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Main Dashboard Grid -->
    <div class="grid gap(2xl)" style="grid-template-columns: 2fr 1fr;">
      
      <!-- System Metrics -->
      <section class="vbox gap(xl)">
        <h3 class="font(lg) font(semibold) c(slate-800)">System Metrics</h3>
        
        <div class="bg(white) r(lg) border(1/slate-200) shadow(sm) p(xl)">
          <div class="vbox gap(lg)">
            {#each systemMetrics as metric}
              <div class="vbox gap(sm)">
                <div class="hbox(between/middle)">
                  <div class="vbox gap(xs)">
                    <span class="font(sm) font(medium) c(slate-800)">{metric.name}</span>
                    <span class="font(xs) c(slate-600)">{metric.description}</span>
                  </div>
                  <span class="font(sm) font(semibold) c(slate-700)">{metric.value}%</span>
                </div>
                
                <div class="relative h(8) bg(slate-100) r(full) overflow(hidden)">
                  <div 
                    class="absolute top(0) left(0) h(full) {getProgressColor(metric.color)} r(full) transition-all duration(500)"
                    style="width: {metric.value}%"
                  ></div>
                </div>
              </div>
            {/each}
          </div>
        </div>
        
        <!-- Typography Components Showcase -->
        <div class="bg(white) r(lg) border(1/slate-200) shadow(sm) p(xl)">
          <h4 class="font(md) font(semibold) c(slate-800) mb(lg)">Typography Showcase</h4>
          
          <div class="vbox gap(lg)">
            <!-- Headings -->
            <div class="vbox gap(sm)">
              <h5 class="font(sm) font(medium) c(slate-700) uppercase tracking(wide)">Headings</h5>
              <div class="vbox gap(xs) p(md) bg(slate-50) r(md)">
                <h1 class="heading(h1) c(slate-800)">Heading 1 - Main Title</h1>
                <h2 class="heading(h2) c(slate-700)">Heading 2 - Section Title</h2>
                <h3 class="heading(h3) c(slate-700)">Heading 3 - Subsection</h3>
                <h4 class="heading(h4) c(slate-600)">Heading 4 - Component Title</h4>
              </div>
            </div>
            
            <!-- Body Text -->
            <div class="vbox gap(sm)">
              <h5 class="font(sm) font(medium) c(slate-700) uppercase tracking(wide)">Body Text</h5>
              <div class="vbox gap(xs) p(md) bg(slate-50) r(md)">
                <p class="body(lg) c(slate-800)">Large body text for important content and introductions.</p>
                <p class="body(md) c(slate-700)">Medium body text for regular content and descriptions.</p>
                <p class="body(sm) c(slate-600)">Small body text for captions and secondary information.</p>
              </div>
            </div>
            
            <!-- Labels and Captions -->
            <div class="vbox gap(sm)">
              <h5 class="font(sm) font(medium) c(slate-700) uppercase tracking(wide)">Labels & Captions</h5>
              <div class="vbox gap(xs) p(md) bg(slate-50) r(md)">
                <span class="label(lg) c(slate-800)">Large Label - Button Text</span>
                <span class="label(md) c(slate-700)">Medium Label - Form Fields</span>
                <span class="label(sm) c(slate-600)">Small Label - Metadata</span>
                <span class="caption(lg) c(slate-600)">Large Caption Text</span>
                <span class="caption(md) c(slate-500)">Medium Caption Text</span>
                <span class="caption(sm) c(slate-500)">Small Caption Text</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="bg(white) r(lg) border(1/slate-200) shadow(sm) p(xl)">
          <h4 class="font(md) font(semibold) c(slate-800) mb(lg)">Quick Actions</h4>
          
          <div class="grid(3) gap(md)">
            <button class="vbox gap(sm) p(md) r(md) border(1/slate-200) hover:border(1/slate-300) hover:bg(slate-50) transition text(center)">
              <Database size="20" class="c(slate-600) mx(auto)" />
              <span class="font(xs) font(medium) c(slate-700)">Backup</span>
            </button>
            
            <button class="vbox gap(sm) p(md) r(md) border(1/slate-200) hover:border(1/slate-300) hover:bg(slate-50) transition text(center)">
              <Zap size="20" class="c(slate-600) mx(auto)" />
              <span class="font(xs) font(medium) c(slate-700)">Restart</span>
            </button>
            
            <button class="vbox gap(sm) p(md) r(md) border(1/slate-200) hover:border(1/slate-300) hover:bg(slate-50) transition text(center)">
              <Monitor size="20" class="c(slate-600) mx(auto)" />
              <span class="font(xs) font(medium) c(slate-700)">Monitor</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Recent Activity -->
      <section class="vbox gap(xl)">
        <h3 class="font(lg) font(semibold) c(slate-800)">Recent Activity</h3>
        
        <div class="bg(white) r(lg) border(1/slate-200) shadow(sm) p(xl)">
          <div class="vbox gap(md)">
            {#each recentActivity as activity, index}
              <div class="hbox gap(md) p(md) r(md) {index !== recentActivity.length - 1 ? 'bb(1/slate-100)' : ''} hover:bg(slate-50) transition">
                <div class="size(32px) r(md) bg(slate-100) hbox(center/middle) flex-shrink(0)">
                  <span class="font(sm)">{getActivityIcon(activity.type)}</span>
                </div>
                
                <div class="flex(1) vbox gap(xs)">
                  <div class="font(sm) font(medium) c(slate-800)">{activity.user}</div>
                  <div class="font(xs) c(slate-600)">{activity.action}</div>
                  <div class="font(xs) c(slate-500)">{activity.time}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
        
        <!-- System Status -->
        <div class="bg(white) r(lg) border(1/slate-200) shadow(sm) p(xl)">
          <h4 class="font(md) font(semibold) c(slate-800) mb(lg)">System Status</h4>
          
          <div class="vbox gap(sm)">
            <div class="hbox(between/middle) p(sm) r(md) bg(green-50) border(1/green-200)">
              <span class="font(sm) c(green-800)">Database</span>
              <div class="size(6) r(full) bg(green-500)"></div>
            </div>
            
            <div class="hbox(between/middle) p(sm) r(md) bg(green-50) border(1/green-200)">
              <span class="font(sm) c(green-800)">API Server</span>
              <div class="size(6) r(full) bg(green-500)"></div>
            </div>
            
            <div class="hbox(between/middle) p(sm) r(md) bg(yellow-50) border(1/yellow-200)">
              <span class="font(sm) c(yellow-800)">Cache</span>
              <div class="size(6) r(full) bg(yellow-500)"></div>
            </div>
            
            <div class="hbox(between/middle) p(sm) r(md) bg(green-50) border(1/green-200)">
              <span class="font(sm) c(green-800)">CDN</span>
              <div class="size(6) r(full) bg(green-500)"></div>
            </div>
          </div>
        </div>
      </section>
    </div>

  </main>
</div>