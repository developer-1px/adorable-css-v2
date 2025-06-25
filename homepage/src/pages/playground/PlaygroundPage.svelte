<script lang="ts">
  import { onMount } from 'svelte';
  import { generateCSS } from 'adorable-css';
  import { checkFailedClasses } from 'adorable-css-cdn';
  
  let htmlInput = `<div class="container(xl) py(3xl)">
  <div class="vbox(center) gap(2xl)">
    <!-- Hero Section -->
    <div class="vbox(center) gap(lg) text(center)">
      <h1 class="font(5xl) bold bg(#667eea..#764ba2/135deg) bg-clip(text) text-fill-color(transparent)">
        Welcome to AdorableCSS
      </h1>
      <p class="font(xl) c(gray-600) max-w(2xl) line-height(relaxed)">
        A modern CSS framework with intuitive syntax inspired by Figma
      </p>
    </div>

    <!-- Feature Cards -->
    <div class="grid grid-cols(1) md:grid-cols(3) gap(xl) w(full)">
      <div class="bg(white) p(xl) r(2xl) shadow(lg) hover:shadow(xl) transition group">
        <div class="w(60px) h(60px) bg(#667eea..#764ba2/135deg) r(full) hbox(pack) mb(lg) group-hover:rotate(360) transition duration(1000)">
          <span class="font(2xl)">🎨</span>
        </div>
        <h3 class="font(xl) bold mb(sm)">Beautiful Design</h3>
        <p class="c(gray-600)">Craft stunning interfaces with ease</p>
      </div>
      
      <div class="bg(white) p(xl) r(2xl) shadow(lg) hover:shadow(xl) transition group">
        <div class="w(60px) h(60px) bg(#f093fb..#f5576c/135deg) r(full) hbox(pack) mb(lg) group-hover:rotate(360) transition duration(1000)">
          <span class="font(2xl)">⚡</span>
        </div>
        <h3 class="font(xl) bold mb(sm)">Lightning Fast</h3>
        <p class="c(gray-600)">Optimized for performance</p>
      </div>
      
      <div class="bg(white) p(xl) r(2xl) shadow(lg) hover:shadow(xl) transition group">
        <div class="w(60px) h(60px) bg(#4facfe..#00f2fe/135deg) r(full) hbox(pack) mb(lg) group-hover:rotate(360) transition duration(1000)">
          <span class="font(2xl)">🚀</span>
        </div>
        <h3 class="font(xl) bold mb(sm)">Developer Friendly</h3>
        <p class="c(gray-600)">Intuitive syntax you'll love</p>
      </div>
    </div>

    <!-- CTA Button -->
    <button class="px(2xl) py(lg) bg(#667eea..#764ba2/135deg) c(white) r(full) font(lg) semibold shadow(xl) hover:shadow(2xl) hover:transform(translateY(-2px)) transition">
      Get Started →
    </button>
  </div>
</div>`;
  
  let generatedCSS = '';
  let activeTab: 'preview' | 'css' | 'stats' = 'preview';
  let previewContainer: HTMLElement;
  let iframeDoc: Document | null = null;
  let stats: any = null;
  let codeLineNumbers = true;
  let showCSSStats = false;
  
  // Sample templates
  const templates = [
    {
      name: 'Hero Section',
      code: htmlInput
    },
    {
      name: 'Login Form',
      code: `<div class="hbox(pack) min-h(screen) bg(#667eea..#764ba2/135deg)">
  <div class="glass(30/0.1/white) p(2xl) r(2xl) w(400px) shadow(2xl)">
    <h2 class="font(2xl) bold text(center) mb(xl)">Welcome Back</h2>
    
    <form class="vbox gap(lg)">
      <div class="vbox gap(sm)">
        <label class="font(sm) medium c(gray-700)">Email</label>
        <input type="email" placeholder="you@example.com" 
          class="w(full) px(lg) py(md) r(lg) b(1/gray-300) focus:b(2/blue-500) transition" />
      </div>
      
      <div class="vbox gap(sm)">
        <label class="font(sm) medium c(gray-700)">Password</label>
        <input type="password" placeholder="••••••••" 
          class="w(full) px(lg) py(md) r(lg) b(1/gray-300) focus:b(2/blue-500) transition" />
      </div>
      
      <button class="w(full) py(md) bg(#667eea..#764ba2/135deg) c(white) r(lg) medium hover:opacity(90) transition">
        Sign In
      </button>
      
      <p class="text(center) font(sm) c(gray-600)">
        Don't have an account? 
        <a href="#" class="c(blue-600) hover:underline">Sign up</a>
      </p>
    </form>
  </div>
</div>`
    },
    {
      name: 'Dashboard Card',
      code: `<div class="p(xl) bg(gray-50) min-h(screen)">
  <div class="container(xl)">
    <h1 class="font(3xl) bold mb(xl)">Dashboard</h1>
    
    <div class="grid grid-cols(1) md:grid-cols(2) lg:grid-cols(4) gap(lg)">
      <!-- Stats Cards -->
      <div class="bg(white) p(xl) r(xl) shadow(md) hover:shadow(xl) transition">
        <div class="hbox(middle) gap(auto)">
          <div>
            <p class="font(sm) c(gray-600) mb(xs)">Total Revenue</p>
            <p class="font(2xl) bold">$45,231</p>
            <p class="font(sm) c(green-600) mt(xs)">↑ 12% from last month</p>
          </div>
          <div class="w(48px) h(48px) bg(blue-100) r(full) hbox(pack)">
            <span class="font(xl)">💰</span>
          </div>
        </div>
      </div>
      
      <div class="bg(white) p(xl) r(xl) shadow(md) hover:shadow(xl) transition">
        <div class="hbox(middle) gap(auto)">
          <div>
            <p class="font(sm) c(gray-600) mb(xs)">Active Users</p>
            <p class="font(2xl) bold">2,345</p>
            <p class="font(sm) c(green-600) mt(xs)">↑ 8% from last week</p>
          </div>
          <div class="w(48px) h(48px) bg(green-100) r(full) hbox(pack)">
            <span class="font(xl)">👥</span>
          </div>
        </div>
      </div>
      
      <div class="bg(white) p(xl) r(xl) shadow(md) hover:shadow(xl) transition">
        <div class="hbox(middle) gap(auto)">
          <div>
            <p class="font(sm) c(gray-600) mb(xs)">Conversion Rate</p>
            <p class="font(2xl) bold">3.24%</p>
            <p class="font(sm) c(red-600) mt(xs)">↓ 2% from last week</p>
          </div>
          <div class="w(48px) h(48px) bg(purple-100) r(full) hbox(pack)">
            <span class="font(xl)">📈</span>
          </div>
        </div>
      </div>
      
      <div class="bg(white) p(xl) r(xl) shadow(md) hover:shadow(xl) transition">
        <div class="hbox(middle) gap(auto)">
          <div>
            <p class="font(sm) c(gray-600) mb(xs)">Satisfaction</p>
            <p class="font(2xl) bold">98.5%</p>
            <p class="font(sm) c(green-600) mt(xs)">↑ 5% from last month</p>
          </div>
          <div class="w(48px) h(48px) bg(yellow-100) r(full) hbox(pack)">
            <span class="font(xl)">⭐</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`
    }
  ];
  
  function extractClasses(html: string): string[] {
    const classRegex = /class="([^"]*)"/g;
    const classes = new Set<string>();
    let match;
    
    while ((match = classRegex.exec(html)) !== null) {
      match[1].split(/\s+/).forEach(cls => {
        if (cls) classes.add(cls);
      });
    }
    
    return Array.from(classes);
  }
  
  function updatePreview() {
    if (!iframeDoc) return;
    
    // Extract all classes from HTML
    const classes = extractClasses(htmlInput);
    
    // Generate CSS and get stats
    generatedCSS = generateCSS(classes);
    
    // Create stats manually
    const failed = checkFailedClasses(classes);
    const successful = classes.filter(c => !failed.includes(c));
    stats = {
      total: classes.length,
      successful: successful,
      failed: failed,
      successRate: classes.length === 0 ? '100%' : `${Math.round((successful.length / classes.length) * 100)}%`
    };
    
    // Update iframe content
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: #f9fafb;
              min-height: 100vh;
            }
            input, button { font-family: inherit; outline: none; }
            ${generatedCSS}
          </style>
        </head>
        <body>
          ${htmlInput}
        </body>
      </html>
    `);
    iframeDoc.close();
  }
  
  function handleInputChange() {
    updatePreview();
  }
  
  function formatCSS(css: string): string {
    // Enhanced CSS formatter
    return css
      .replace(/}/g, '}\n')
      .replace(/{/g, ' {\n  ')
      .replace(/;/g, ';\n  ')
      .replace(/\n\s*\n/g, '\n')
      .replace(/\n\s*}/g, '\n}')
      .trim();
  }
  
  function loadTemplate(template: any) {
    htmlInput = template.code;
    updatePreview();
  }
  
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }
  
  onMount(() => {
    const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
    iframeDoc = iframe.contentDocument || iframe.contentWindow?.document || null;
    updatePreview();
  });
</script>

<div class="playground-page vbox min-h(screen) bg(#fafbfc..#e9ecef/to-bottom)">
  <!-- Enhanced Header -->
  <div class="bg(#667eea..#764ba2/135deg) relative clip">
    <!-- Animated background patterns -->
    <div class="layer(fill) opacity(20)">
      <div class="layer(top:-100+left:-100) w(300px) h(300px) bg(white) r(full) blur(100px)" style="animation: pulse 4s ease-in-out infinite;"></div>
      <div class="layer(bottom:-100+right:-100) w(400px) h(400px) bg(white) r(full) blur(120px)" style="animation: pulse 5s ease-in-out infinite reverse;"></div>
      <div class="layer(center) w(500px) h(500px) bg(white/10) r(full) blur(150px)" style="animation: float 20s ease-in-out infinite;"></div>
    </div>
    
    <div class="container(xl) py(lg) relative">
      <div class="hbox(middle) gap(auto)">
        <div class="vbox gap(xs)">
          <div class="hbox(middle) gap(md)">
            <h1 class="font(3xl) bold c(white)">
              AdorableCSS Playground
            </h1>
            <span class="px(md) py(xs) bg(white/20) c(white) r(full) font(xs) semibold uppercase letter-spacing(wider)">
              Beta
            </span>
          </div>
          <p class="font(md) c(white/80)">
            Experiment with AdorableCSS v2 syntax in real-time
          </p>
        </div>
        
        <!-- Template Selector -->
        <div class="hbox gap(sm)">
          {#each templates as template}
            <button
              on:click={() => loadTemplate(template)}
              class="px(lg) py(sm) bg(white/10) hover:bg(white/20) c(white) r(lg) font(sm) backdrop-blur(sm) transition"
            >
              {template.name}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Main Editor Area -->
  <div class="flex-1 container(full/px:0)">
    <div class="grid grid-cols(1) lg:grid-cols(2) h(full)">
      <!-- Left Panel - Code Editor -->
      <div class="relative bg(white) br(1/gray-200)">
        <!-- Editor Header -->
        <div class="px(xl) py(lg) bb(1/gray-200) bg(gray-50)">
          <div class="hbox(middle) gap(lg)">
            <h2 class="font(sm) semibold uppercase letter-spacing(wide) c(gray-700)">HTML Editor</h2>
            <div class="hbox gap(sm)">
              <label class="hbox(middle) gap(xs) font(sm) c(gray-600)">
                <input type="checkbox" bind:checked={codeLineNumbers} class="cursor(pointer)" />
                Line numbers
              </label>
            </div>
          </div>
        </div>
        
        <!-- Editor Content -->
        <div class="relative h(calc(100%-4rem))">
          {#if codeLineNumbers}
            <div class="layer(top:0+left:0+bottom:0) w(48px) bg(gray-50) br(1/gray-200) overflow-y(auto) overflow-x(hidden)">
              <pre class="p(lg) font-family(mono) font(sm) c(gray-400) line-height(relaxed) text(right)">{htmlInput.split('\n').map((_, i) => i + 1).join('\n')}</pre>
            </div>
          {/if}
          <textarea
            bind:value={htmlInput}
            on:input={handleInputChange}
            class="w(full) h(full) bg(transparent) c(gray-800) p(lg) {codeLineNumbers ? 'pl(64px)' : ''} font-family(mono) font(sm) line-height(relaxed) resize(none) focus:outline(none)"
            spellcheck="false"
          ></textarea>
        </div>
      </div>

      <!-- Right Panel - Preview/CSS/Stats -->
      <div class="relative bg(white)">
        <!-- Enhanced Tabs -->
        <div class="hbox bb(1/gray-200) bg(gray-50) px(xl)">
          <button
            on:click={() => activeTab = 'preview'}
            class="px(xl) py(lg) font(sm) semibold transition relative {activeTab === 'preview' ? 'c(purple-600)' : 'c(gray-600) hover:c(gray-900)'}"
          >
            <span class="relative z(10)">Preview</span>
            {#if activeTab === 'preview'}
              <div class="layer(bottom:0+left:0+right:0) h(3px) bg(#667eea..#764ba2/to-right) r(full)"></div>
            {/if}
          </button>
          <button
            on:click={() => activeTab = 'css'}
            class="px(xl) py(lg) font(sm) semibold transition relative {activeTab === 'css' ? 'c(purple-600)' : 'c(gray-600) hover:c(gray-900)'}"
          >
            <span class="relative z(10)">Generated CSS</span>
            {#if activeTab === 'css'}
              <div class="layer(bottom:0+left:0+right:0) h(3px) bg(#667eea..#764ba2/to-right) r(full)"></div>
            {/if}
          </button>
          <button
            on:click={() => activeTab = 'stats'}
            class="px(xl) py(lg) font(sm) semibold transition relative {activeTab === 'stats' ? 'c(purple-600)' : 'c(gray-600) hover:c(gray-900)'}"
          >
            <span class="relative z(10)">Stats</span>
            {#if activeTab === 'stats'}
              <div class="layer(bottom:0+left:0+right:0) h(3px) bg(#667eea..#764ba2/to-right) r(full)"></div>
            {/if}
          </button>
          
          {#if activeTab === 'css'}
            <div class="ml(auto)">
              <button
                on:click={() => copyToClipboard(formatCSS(generatedCSS))}
                class="px(md) py(sm) bg(purple-100) hover:bg(purple-200) c(purple-700) r(md) font(sm) transition"
              >
                Copy CSS
              </button>
            </div>
          {/if}
        </div>

        <!-- Content Area -->
        <div class="relative h(calc(100%-3.5rem))">
          {#if activeTab === 'preview'}
            <iframe
              id="preview-iframe"
              class="w(full) h(full) b(none)"
              title="Preview"
              style="background: white;"
            ></iframe>
          {:else if activeTab === 'css'}
            <div class="h(full) overflow-y(auto) bg(gray-50)">
              <pre class="p(xl) font-family(mono) font(sm) c(gray-800) line-height(relaxed) whitespace(pre-wrap) word-break(break-all)">{formatCSS(generatedCSS)}</pre>
            </div>
          {:else if activeTab === 'stats' && stats}
            <div class="p(xl) overflow-y(auto) h(full)">
              <div class="vbox gap(xl)">
                <div class="grid grid-cols(3) gap(lg)">
                  <div class="bg(purple-50) p(lg) r(lg) text(center)">
                    <div class="font(3xl) bold c(purple-600)">{stats.total}</div>
                    <div class="font(sm) c(gray-600)">Total Classes</div>
                  </div>
                  <div class="bg(green-50) p(lg) r(lg) text(center)">
                    <div class="font(3xl) bold c(green-600)">{stats.successful.length}</div>
                    <div class="font(sm) c(gray-600)">Valid Classes</div>
                  </div>
                  <div class="bg(red-50) p(lg) r(lg) text(center)">
                    <div class="font(3xl) bold c(red-600)">{stats.failed.length}</div>
                    <div class="font(sm) c(gray-600)">Invalid Classes</div>
                  </div>
                </div>
                
                <div class="vbox gap(lg)">
                  <h3 class="font(lg) semibold">Success Rate</h3>
                  <div class="relative h(24px) bg(gray-200) r(full) clip">
                    <div class="h(full) bg(#667eea..#764ba2/to-right) transition duration(500)" style="width: {stats.successRate}"></div>
                    <div class="layer(center) font(sm) semibold c(white)">{stats.successRate}</div>
                  </div>
                </div>
                
                {#if stats.failed.length > 0}
                  <div class="vbox gap(md)">
                    <h3 class="font(lg) semibold c(red-600)">Invalid Classes</h3>
                    <div class="vbox gap(sm)">
                      {#each stats.failed as failedClass}
                        <code class="px(md) py(sm) bg(red-50) c(red-700) r(md) font(sm) font-family(mono)">{failedClass}</code>
                      {/each}
                    </div>
                  </div>
                {/if}
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .playground-page {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(180deg); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.2; }
    50% { transform: scale(1.1); opacity: 0.3; }
  }
  
  textarea {
    tab-size: 2;
  }
  
  textarea::-webkit-scrollbar,
  pre::-webkit-scrollbar {
    width: 8px;
  }
  
  textarea::-webkit-scrollbar-track,
  pre::-webkit-scrollbar-track {
    background: #f1f3f5;
  }
  
  textarea::-webkit-scrollbar-thumb,
  pre::-webkit-scrollbar-thumb {
    background: #dee2e6;
    border-radius: 4px;
  }
  
  textarea::-webkit-scrollbar-thumb:hover,
  pre::-webkit-scrollbar-thumb:hover {
    background: #ced4da;
  }
  
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #667eea;
  }
  
  pre {
    tab-size: 2;
    margin: 0;
  }
  
  /* Fix for grid layout on mobile */
  @media (max-width: 1024px) {
    .grid.lg\:grid-cols\(2\) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }
</style>