<script lang="ts">
  import { onMount } from 'svelte';
  import { generateCSS } from 'adorable-css';
  
  let htmlInput = `<div class="container(xl) py(3xl)">
  <div class="vbox(pack) gap(2xl)">
    <!-- Hero Section -->
    <div class="vbox(pack) gap(lg) text(center)">
      <h1 class="heading(display/xl) bold bg-clip(text) c(135deg/#667eea..#764ba2)">
        Welcome to AdorableCSS
      </h1>
      <p class="body(xl) c(neutral-600) max-w(2xl) line-height(relaxed)">
        A modern CSS framework with intuitive syntax inspired by Figma
      </p>
    </div>

    <!-- Feature Cards -->
    <div class="grid grid-cols(1) md:grid-cols(3) gap(xl) w(full)">
      <div class="bg(white) p(xl) r(2xl) shadow(lg) hover:shadow(xl) transition group hover:translate-y(-4px)">
        <div class="size(60px) bg(135deg/#667eea..#764ba2) r(full) hbox(pack) mb(lg) group-hover:rotate(360) transition duration(1000)">
          <span class="heading(h3)">🎨</span>
        </div>
        <h3 class="title(xl) bold mb(sm)">Beautiful Design</h3>
        <p class="c(neutral-600)">Craft stunning interfaces with ease</p>
      </div>
      
      <div class="bg(white) p(xl) r(2xl) shadow(lg) hover:shadow(xl) transition group hover:translate-y(-4px)">
        <div class="size(60px) bg(135deg/#f093fb..#f5576c) r(full) hbox(pack) mb(lg) group-hover:rotate(360) transition duration(1000)">
          <span class="heading(h3)">⚡</span>
        </div>
        <h3 class="title(xl) bold mb(sm)">Lightning Fast</h3>
        <p class="c(neutral-600)">Optimized for performance</p>
      </div>
      
      <div class="bg(white) p(xl) r(2xl) shadow(lg) hover:shadow(xl) transition group hover:translate-y(-4px)">
        <div class="size(60px) bg(135deg/#4facfe..#00f2fe) r(full) hbox(pack) mb(lg) group-hover:rotate(360) transition duration(1000)">
          <span class="heading(h3)">🚀</span>
        </div>
        <h3 class="title(xl) bold mb(sm)">Developer Friendly</h3>
        <p class="c(neutral-600)">Intuitive syntax you'll love</p>
      </div>
    </div>

    <!-- CTA Button -->
    <button class="px(2xl) py(lg) bg(135deg/#667eea..#764ba2) c(white) r(full) title(lg) semi shadow(xl) hover:shadow(2xl) hover:translate-y(-2px) transition cursor(pointer)">
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
  let debounceTimer: number | null = null;
  let isUpdating = false;
  let editorElement: HTMLElement;
  let highlightedHTML = '';
  
  // Sample templates
  const templates = [
    {
      name: 'Hero Section',
      code: htmlInput
    },
    {
      name: 'Login Form',
      code: `<div class="hbox(fill) min-h(screen) bg(135deg/#667eea..#764ba2)">
  <div class="glass(30/0.1/white) p(2xl) r(2xl) w(400px) shadow(2xl)">
    <h2 class="heading(h3) bold text(center) mb(xl)">Welcome Back</h2>
    
    <form class="vbox gap(lg)">
      <div class="vbox gap(sm)">
        <label class="caption(sm) bold(500) c(gray-700)">Email</label>
        <input type="email" placeholder="you@example.com" 
          class="w(full) px(lg) py(md) r(lg) b(1/gray-300) focus:b(2/blue-500) transition" />
      </div>
      
      <div class="vbox gap(sm)">
        <label class="caption(sm) bold(500) c(gray-700)">Password</label>
        <input type="password" placeholder="••••••••" 
          class="w(full) px(lg) py(md) r(lg) b(1/gray-300) focus:b(2/blue-500) transition" />
      </div>
      
      <button class="w(full) py(md) bg(135deg/#667eea..#764ba2) c(white) r(lg) bold(500) hover:opacity(0.9) transition">
        Sign In
      </button>
      
      <p class="text(center) caption(sm) c(gray-600)">
        Don't have an account? 
        <a href="#" class="c(info-600) hover:underline">Sign up</a>
      </p>
    </form>
  </div>
</div>`
    },
    {
      name: 'Dashboard Card',
      code: `<div class="p(xl) bg(gray-50) min-h(screen)">
  <div class="container(xl)">
    <h1 class="heading(h1) bold mb(xl)">Dashboard</h1>
    
    <div class="grid grid-cols(1) md:grid-cols(2) lg:grid-cols(4) gap(lg)">
      <!-- Stats Cards -->
      <div class="bg(white) p(xl) r(xl) shadow(md) hover:shadow(xl) transition">
        <div class="hbox(middle) gap(auto)">
          <div>
            <p class="caption(sm) c(gray-600) mb(xs)">Total Revenue</p>
            <p class="bold heading(h3)">$45,231</p>
            <p class="caption(sm) c(success-600) mt(xs)">↑ 12% from last month</p>
          </div>
          <div class="size(48px) bg(blue-100) r(full) hbox(pack)">
            <span class="title(xl)">💰</span>
          </div>
        </div>
      </div>
      
      <div class="bg(white) p(xl) r(xl) shadow(md) hover:shadow(xl) transition">
        <div class="hbox(middle) gap(auto)">
          <div>
            <p class="caption(sm) c(gray-600) mb(xs)">Active Users</p>
            <p class="bold heading(h3)">2,345</p>
            <p class="caption(sm) c(success-600) mt(xs)">↑ 8% from last week</p>
          </div>
          <div class="size(48px) bg(green-100) r(full) hbox(pack)">
            <span class="title(xl)">👥</span>
          </div>
        </div>
      </div>
      
      <div class="bg(white) p(xl) r(xl) shadow(md) hover:shadow(xl) transition">
        <div class="hbox(middle) gap(auto)">
          <div>
            <p class="caption(sm) c(gray-600) mb(xs)">Conversion Rate</p>
            <p class="bold heading(h3)">3.24%</p>
            <p class="caption(sm) c(error-600) mt(xs)">↓ 2% from last week</p>
          </div>
          <div class="w(48px) h(48px) bg(primary-100) r(full) hbox(pack)">
            <span class="title(xl)">📈</span>
          </div>
        </div>
      </div>
      
      <div class="bg(white) p(xl) r(xl) shadow(md) hover:shadow(xl) transition">
        <div class="hbox(middle) gap(auto)">
          <div>
            <p class="caption(sm) c(gray-600) mb(xs)">Satisfaction</p>
            <p class="bold heading(h3)">98.5%</p>
            <p class="caption(sm) c(success-600) mt(xs)">↑ 5% from last month</p>
          </div>
          <div class="w(48px) h(48px) bg(yellow-100) r(full) hbox(pack)">
            <span class="title(xl)">⭐</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`
    },
    {
      name: 'Pricing Cards',
      code: `<div class="container(xl) py(3xl)">
  <div class="vbox gap(3xl)">
    <!-- Header -->
    <div class="vbox gap(md) text(center)">
      <h2 class="heading(display) bold">Choose Your Plan</h2>
      <p class="title(lg) c(gray-600)">Simple pricing that scales with your business</p>
    </div>
    
    <!-- Pricing Cards -->
    <div class="grid grid-cols(1) md:grid-cols(3) gap(xl)">
      <!-- Basic Plan -->
      <div class="vbox bg(white) p(xl) r(xl) shadow(lg) hover:shadow(xl) transition">
        <div class="vbox gap(md) mb(xl)">
          <h3 class="title(xl) bold(600)">Basic</h3>
          <div class="hbox(bottom) gap(xs)">
            <span class="heading(h1) bold">$9</span>
            <span class="body(md) c(gray-600)">/month</span>
          </div>
        </div>
        
        <ul class="vbox gap(md) mb(xl) flex(1)">
          <li class="hbox gap(sm)">
            <span class="c(green-500)">✓</span>
            <span class="caption(sm)">Up to 10 projects</span>
          </li>
          <li class="hbox gap(sm)">
            <span class="c(green-500)">✓</span>
            <span class="caption(sm)">Basic analytics</span>
          </li>
          <li class="hbox gap(sm)">
            <span class="c(green-500)">✓</span>
            <span class="caption(sm)">24/7 support</span>
          </li>
        </ul>
        
        <button class="w(full) py(md) b(1/gray-300) r(lg) hover:bg(gray-50) transition cursor(pointer)">
          Get Started
        </button>
      </div>
      
      <!-- Pro Plan -->
      <div class="vbox bg(135deg/#667eea..#764ba2) c(white) p(xl) r(xl) shadow(xl) scale(1.05) relative">
        <div class="layer(top:0/left:50%) translate-x(-50%) translate-y(-50%) px(lg) py(xs) bg(yellow-400) c(gray-900) r(full) caption(xs) bold uppercase">
          Popular
        </div>
        
        <div class="vbox gap(md) mb(xl)">
          <h3 class="title(xl) bold(600)">Pro</h3>
          <div class="hbox(bottom) gap(xs)">
            <span class="heading(h1) bold">$29</span>
            <span class="body(md) opacity(0.8)">/month</span>
          </div>
        </div>
        
        <ul class="vbox gap(md) mb(xl) flex(1)">
          <li class="hbox gap(sm)">
            <span class="opacity(0.9)">✓</span>
            <span class="caption(sm)">Unlimited projects</span>
          </li>
          <li class="hbox gap(sm)">
            <span class="opacity(0.9)">✓</span>
            <span class="caption(sm)">Advanced analytics</span>
          </li>
          <li class="hbox gap(sm)">
            <span class="opacity(0.9)">✓</span>
            <span class="caption(sm)">Priority support</span>
          </li>
          <li class="hbox gap(sm)">
            <span class="opacity(0.9)">✓</span>
            <span class="caption(sm)">Custom integrations</span>
          </li>
        </ul>
        
        <button class="w(full) py(md) bg(white) c(primary) r(lg) bold(500) hover:opacity(0.9) transition cursor(pointer)">
          Get Started
        </button>
      </div>
      
      <!-- Enterprise Plan -->
      <div class="vbox bg(white) p(xl) r(xl) shadow(lg) hover:shadow(xl) transition">
        <div class="vbox gap(md) mb(xl)">
          <h3 class="title(xl) bold(600)">Enterprise</h3>
          <div class="vbox gap(xs)">
            <span class="heading(h1) bold">Custom</span>
            <span class="caption(sm) c(gray-600)">Contact us for pricing</span>
          </div>
        </div>
        
        <ul class="vbox gap(md) mb(xl) flex(1)">
          <li class="hbox gap(sm)">
            <span class="c(green-500)">✓</span>
            <span class="caption(sm)">Everything in Pro</span>
          </li>
          <li class="hbox gap(sm)">
            <span class="c(green-500)">✓</span>
            <span class="caption(sm)">Dedicated account manager</span>
          </li>
          <li class="hbox gap(sm)">
            <span class="c(green-500)">✓</span>
            <span class="caption(sm)">Custom SLA</span>
          </li>
          <li class="hbox gap(sm)">
            <span class="c(green-500)">✓</span>
            <span class="caption(sm)">On-premise deployment</span>
          </li>
        </ul>
        
        <button class="w(full) py(md) b(1/gray-300) r(lg) hover:bg(gray-50) transition cursor(pointer)">
          Contact Sales
        </button>
      </div>
    </div>
  </div>
</div>`
    },
    {
      name: 'Feature Grid',
      code: `<div class="container(xl) py(3xl)">
  <div class="vbox gap(3xl)">
    <!-- Header -->
    <div class="vbox gap(lg) text(center) max-w(3xl) mx(auto)">
      <span class="px(lg) py(sm) bg(primary-100) c(primary-700) r(full) caption(sm) bold(600) uppercase letter-spacing(wide) w(fit)">
        Features
      </span>
      <h2 class="heading(display) bold">Everything you need to succeed</h2>
      <p class="title(lg) c(gray-600) line-height(relaxed)">
        Our platform provides all the tools and features you need to build, deploy, and scale your applications with confidence.
      </p>
    </div>
    
    <!-- Feature Grid -->
    <div class="grid grid-cols(1) md:grid-cols(2) lg:grid-cols(3) gap(xl)">
      <!-- Feature 1 -->
      <div class="vbox gap(lg) group">
        <div class="size(64px) bg(primary-100) r(xl) hbox(pack) group-hover:bg(135deg/#667eea..#764ba2) transition">
          <span class="heading(h3) group-hover:scale(1.2) transition">🚀</span>
        </div>
        <div class="vbox gap(sm)">
          <h3 class="title(xl) bold(600)">Lightning Fast</h3>
          <p class="c(gray-600) line-height(relaxed)">
            Optimized performance with sub-second load times and instant updates.
          </p>
        </div>
      </div>
      
      <!-- Feature 2 -->
      <div class="vbox gap(lg) group">
        <div class="size(64px) bg(green-100) r(xl) hbox(pack) group-hover:bg(135deg/#10b981..#34d399) transition">
          <span class="heading(h3) group-hover:scale(1.2) transition">🔒</span>
        </div>
        <div class="vbox gap(sm)">
          <h3 class="title(xl) bold(600)">Secure by Default</h3>
          <p class="c(gray-600) line-height(relaxed)">
            Enterprise-grade security with end-to-end encryption and compliance.
          </p>
        </div>
      </div>
      
      <!-- Feature 3 -->
      <div class="vbox gap(lg) group">
        <div class="size(64px) bg(blue-100) r(xl) hbox(pack) group-hover:bg(135deg/#3b82f6..#60a5fa) transition">
          <span class="heading(h3) group-hover:scale(1.2) transition">📊</span>
        </div>
        <div class="vbox gap(sm)">
          <h3 class="title(xl) bold(600)">Advanced Analytics</h3>
          <p class="c(gray-600) line-height(relaxed)">
            Real-time insights and detailed metrics to drive data-driven decisions.
          </p>
        </div>
      </div>
      
      <!-- Feature 4 -->
      <div class="vbox gap(lg) group">
        <div class="size(64px) bg(error-100) r(xl) hbox(pack) group-hover:bg(135deg/#ec4899..#f472b6) transition">
          <span class="heading(h3) group-hover:scale(1.2) transition">🎨</span>
        </div>
        <div class="vbox gap(sm)">
          <h3 class="title(xl) bold(600)">Beautiful Design</h3>
          <p class="c(gray-600) line-height(relaxed)">
            Stunning UI components and themes that delight your users.
          </p>
        </div>
      </div>
      
      <!-- Feature 5 -->
      <div class="vbox gap(lg) group">
        <div class="size(64px) bg(yellow-100) r(xl) hbox(pack) group-hover:bg(135deg/#f59e0b..#fbbf24) transition">
          <span class="heading(h3) group-hover:scale(1.2) transition">⚡</span>
        </div>
        <div class="vbox gap(sm)">
          <h3 class="title(xl) bold(600)">API First</h3>
          <p class="c(gray-600) line-height(relaxed)">
            Powerful APIs with comprehensive documentation and SDKs.
          </p>
        </div>
      </div>
      
      <!-- Feature 6 -->
      <div class="vbox gap(lg) group">
        <div class="size(64px) bg(primary-100) r(xl) hbox(pack) group-hover:bg(135deg/#6366f1..#818cf8) transition">
          <span class="heading(h3) group-hover:scale(1.2) transition">🌍</span>
        </div>
        <div class="vbox gap(sm)">
          <h3 class="title(xl) bold(600)">Global Scale</h3>
          <p class="c(gray-600) line-height(relaxed)">
            Deploy globally with automatic scaling and load balancing.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>`
    },
    {
      name: 'Contact Form',
      code: `<div class="bg(gray-50) min-h(screen) py(3xl)">
  <div class="container(xl)">
    <div class="grid grid-cols(1) lg:grid-cols(2) gap(3xl)">
      <!-- Left Side - Info -->
      <div class="vbox gap(xl)">
        <div class="vbox gap(lg)">
          <h2 class="heading(display) bold">Let's talk</h2>
          <p class="title(lg) c(gray-600) line-height(relaxed)">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        
        <div class="vbox gap(lg)">
          <div class="hbox gap(md)">
            <div class="size(48px) bg(primary-100) r(xl) hbox(pack) flex-shrink(0)">
              <span class="title(xl)">📧</span>
            </div>
            <div class="vbox gap(xs)">
              <h4 class="body(md) bold(600)">Email</h4>
              <p class="c(gray-600)">hello@example.com</p>
            </div>
          </div>
          
          <div class="hbox gap(md)">
            <div class="size(48px) bg(green-100) r(xl) hbox(pack) flex-shrink(0)">
              <span class="title(xl)">📱</span>
            </div>
            <div class="vbox gap(xs)">
              <h4 class="body(md) bold(600)">Phone</h4>
              <p class="c(gray-600)">+1 (555) 123-4567</p>
            </div>
          </div>
          
          <div class="hbox gap(md)">
            <div class="size(48px) bg(blue-100) r(xl) hbox(pack) flex-shrink(0)">
              <span class="title(xl)">📍</span>
            </div>
            <div class="vbox gap(xs)">
              <h4 class="body(md) bold(600)">Office</h4>
              <p class="c(gray-600)">123 Business Ave, Suite 100<br>San Francisco, CA 94107</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Side - Form -->
      <div class="bg(white) p(2xl) r(2xl) shadow(xl)">
        <form class="vbox gap(xl)">
          <div class="grid grid-cols(2) gap(lg)">
            <div class="vbox gap(sm)">
              <label class="caption(sm) bold(500) c(gray-700)">First Name</label>
              <input type="text" 
                class="w(full) px(lg) py(md) r(lg) b(1/gray-300) focus:b(2/primary) transition" 
                placeholder="John" />
            </div>
            <div class="vbox gap(sm)">
              <label class="caption(sm) bold(500) c(gray-700)">Last Name</label>
              <input type="text" 
                class="w(full) px(lg) py(md) r(lg) b(1/gray-300) focus:b(2/primary) transition" 
                placeholder="Doe" />
            </div>
          </div>
          
          <div class="vbox gap(sm)">
            <label class="caption(sm) bold(500) c(gray-700)">Email</label>
            <input type="email" 
              class="w(full) px(lg) py(md) r(lg) b(1/gray-300) focus:b(2/purple-500) transition" 
              placeholder="john@example.com" />
          </div>
          
          <div class="vbox gap(sm)">
            <label class="caption(sm) bold(500) c(gray-700)">Subject</label>
            <input type="text" 
              class="w(full) px(lg) py(md) r(lg) b(1/gray-300) focus:b(2/purple-500) transition" 
              placeholder="How can we help?" />
          </div>
          
          <div class="vbox gap(sm)">
            <label class="caption(sm) bold(500) c(gray-700)">Message</label>
            <textarea 
              class="w(full) px(lg) py(md) r(lg) b(1/gray-300) focus:b(2/purple-500) transition min-h(150px) resize(vertical)" 
              placeholder="Tell us more about your project..."
            ></textarea>
          </div>
          
          <button class="w(full) py(lg) bg(135deg/#667eea..#764ba2) c(white) r(lg) bold(500) hover:opacity(0.9) transition cursor(pointer)">
            Send Message
          </button>
        </form>
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

  function checkFailedClasses(classes: string[]): string[] {
    return classes.filter(className => {
      const css = generateCSS([className]);
      // Check if CSS is empty or only contains empty rules (e.g., ".class{}")
      if (!css || css.trim() === '') return true;
      
      // Check if the CSS rule is empty (only contains selector with empty braces)
      const cssWithoutWhitespace = css.replace(/\s/g, '');
      const emptyRulePattern = /^\.[\w\\():-]+\{\}$/;
      return emptyRulePattern.test(cssWithoutWhitespace);
    });
  }
  
  function updatePreview() {
    if (!iframeDoc) return;
    
    isUpdating = true;
    
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
    
    isUpdating = false;
  }
  
  function handleInputChange() {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    // Update syntax highlighting
    highlightedHTML = highlightHTML(htmlInput);
    
    debounceTimer = setTimeout(() => {
      updatePreview();
      debounceTimer = null;
    }, 300);
  }
  
  function highlightHTML(html: string): string {
    const escaped = escapeHtml(html);
    return escaped
      // HTML comments
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="comment">$1</span>')
      // HTML tags
      .replace(/(&lt;\/?)(\w+)(.*?)(&gt;)/g, (match, p1, p2, p3, p4) => {
        // Highlight attributes
        const attrs = p3.replace(/(\w+)(=)(["'])(.*?)\3/g, 
          '<span class="attr-name">$1</span><span class="punctuation">$2</span><span class="attr-value">$3$4$3</span>'
        );
        return `<span class="punctuation">${p1}</span><span class="tag">${p2}</span>${attrs}<span class="punctuation">${p4}</span>`;
      })
      // Text content (basic)
      .replace(/(&gt;)([^&<]+)(&lt;)/g, '$1<span class="text">$2</span>$3');
  }
  
  function escapeHtml(text: string): string {
    const map: {[key: string]: string} = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
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
    highlightedHTML = highlightHTML(htmlInput);
    updatePreview();
  });
</script>

<div class="playground-page vbox min-h(screen) bg(to-bottom/#fafbfc..#e9ecef)">
  <!-- Enhanced Header -->
  <div class="bg(135deg/#667eea..#764ba2) relative clip">
    <!-- Animated background patterns -->
    <div class="layer(fill) opacity(0.2)">
      <div class="layer(top:-100/left:-100) w(300px) h(300px) bg(white) r(full) blur(100px)" style="animation: pulse 4s ease-in-out infinite;"></div>
      <div class="layer(bottom:-100/right:-100) w(400px) h(400px) bg(white) r(full) blur(120px)" style="animation: pulse 5s ease-in-out infinite reverse;"></div>
      <div class="layer(center) w(500px) h(500px) bg(white.1) r(full) blur(150px)" style="animation: float 20s ease-in-out infinite;"></div>
    </div>
    
    <div class="container(xl) py(lg) relative">
      <div class="hbox(middle) gap(auto)">
        <div class="vbox gap(xs)">
          <div class="hbox(middle) gap(md)">
            <h1 class="heading(h1) bold c(white)">
              AdorableCSS Playground
            </h1>
            <span class="px(md) py(xs) bg(white.2) c(white) r(full) caption(xs) semibold uppercase letter-spacing(wider)">
              Beta
            </span>
          </div>
          <p class="body(md) c(white.8)">
            Experiment with AdorableCSS v2 syntax in real-time
          </p>
        </div>
        
        <!-- Template Selector -->
        <div class="hbox gap(sm)">
          {#each templates as template}
            <button
              on:click={() => loadTemplate(template)}
              class="px(lg) py(sm) bg(white/0.1) hover:bg(white/0.2) c(white) r(lg) caption(sm) backdrop-blur(sm) transition cursor(pointer)"
            >
              {template.name}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Main Editor Area -->
  <div class="flex(1) container(full/px:0)">
    <div class="grid grid-cols(1) lg:grid-cols(2) h(full) relative">
      <!-- Left Panel - Code Editor -->
      <div class="relative bg(white) br(1/gray-200) lg:br(1/gray-200) min-h(400px) lg:min-h(auto)">
        <!-- Editor Header -->
        <div class="px(xl) py(lg) bb(1/gray-200) bg(gray-50)">
          <div class="hbox(middle) gap(lg)">
            <h2 class="caption(sm) bold(600) uppercase letter-spacing(wide) c(gray-700)">HTML Editor</h2>
            <div class="hbox gap(sm)">
              <label class="hbox(middle) gap(xs) caption(sm) c(gray-600)">
                <input type="checkbox" bind:checked={codeLineNumbers} class="cursor(pointer)" />
                Line numbers
              </label>
            </div>
          </div>
        </div>
        
        <!-- Editor Content -->
        <div class="relative h(calc(100%-4rem))">
          {#if codeLineNumbers}
            <div class="layer(top+left+bottom) w(48px) bg(gray-50) br(1/gray-200) scroll(y) overflow-x(hidden)">
              <pre class="p(lg) font-family(mono) caption(sm) c(gray-400) line-height(relaxed) text(right)">{htmlInput.split('\n').map((_, i) => i + 1).join('\n')}</pre>
            </div>
          {/if}
          <div class="relative w(full) h(full)">
            <pre 
              class="layer(fill) p(lg) {codeLineNumbers ? 'pl(64px)' : ''} font-family(mono) caption(sm) line-height(relaxed) pointer-events(none) overflow(auto) whitespace(pre-wrap) word-break(break-word)"
              aria-hidden="true"
            ><code>{@html highlightedHTML || escapeHtml(htmlInput)}</code></pre>
            <textarea
              bind:value={htmlInput}
              on:input={handleInputChange}
              class="layer(fill) bg(transparent) caret-c(gray-800) c(transparent) p(lg) {codeLineNumbers ? 'pl(64px)' : ''} font-family(mono) caption(sm) line-height(relaxed) resize(none) focus:outline(none)"
              spellcheck="false"
              placeholder="Type your HTML with AdorableCSS classes here..."
            ></textarea>
          </div>
          {#if isUpdating}
            <div class="layer(top:8/right:8) px(md) py(xs) bg(primary) c(white) r(full) caption(xs) medium">
              Updating...
            </div>
          {/if}
        </div>
      </div>

      <!-- Right Panel - Preview/CSS/Stats -->
      <div class="relative bg(white) min-h(400px) lg:min-h(auto)">
        <!-- Enhanced Tabs -->
        <div class="hbox bb(1/gray-200) bg(gray-50) px(xl)">
          <button
            on:click={() => activeTab = 'preview'}
            class="px(xl) py(lg) label(sm) bold(600) transition relative {activeTab === 'preview' ? 'c(primary)' : 'c(neutral-600) hover:c(neutral-900)'}"
          >
            <span class="relative z(10)">Preview</span>
            {#if activeTab === 'preview'}
              <div class="layer(bottom+left+right) h(3px) bg(#667eea..#764ba2/to-right) r(full)"></div>
            {/if}
          </button>
          <button
            on:click={() => activeTab = 'css'}
            class="px(xl) py(lg) label(sm) bold(600) transition relative {activeTab === 'css' ? 'c(primary)' : 'c(neutral-600) hover:c(neutral-900)'}"
          >
            <span class="relative z(10)">Generated CSS</span>
            {#if activeTab === 'css'}
              <div class="layer(bottom+left+right) h(3px) bg(#667eea..#764ba2/to-right) r(full)"></div>
            {/if}
          </button>
          <button
            on:click={() => activeTab = 'stats'}
            class="px(xl) py(lg) label(sm) bold(600) transition relative {activeTab === 'stats' ? 'c(primary)' : 'c(neutral-600) hover:c(neutral-900)'}"
          >
            <span class="relative z(10)">Stats</span>
            {#if activeTab === 'stats'}
              <div class="layer(bottom+left+right) h(3px) bg(#667eea..#764ba2/to-right) r(full)"></div>
            {/if}
          </button>
          
          {#if activeTab === 'css'}
            <div class="ml(auto)">
              <button
                on:click={() => copyToClipboard(formatCSS(generatedCSS))}
                class="px(md) py(sm) bg(primary-100) hover:bg(primary-200) c(primary-700) r(md) label(sm) transition"
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
            <div class="h(full) scroll(y) bg(gray-50)">
              <pre class="p(xl) mono caption(sm) c(gray-800) line-height(relaxed) whitespace(pre-wrap) word-break(break-all)">{formatCSS(generatedCSS)}</pre>
            </div>
          {:else if activeTab === 'stats' && stats}
            <div class="p(xl) scroll(y) h(full)">
              <div class="vbox gap(xl)">
                <div class="grid grid-cols(3) gap(lg)">
                  <div class="bg(primary-50) p(lg) r(lg) text(center)">
                    <div class="heading(h1) bold c(primary)">{stats.total}</div>
                    <div class="caption(sm) c(gray-600)">Total Classes</div>
                  </div>
                  <div class="bg(green-50) p(lg) r(lg) text(center)">
                    <div class="heading(h1) bold c(success-600)">{stats.successful.length}</div>
                    <div class="caption(sm) c(gray-600)">Valid Classes</div>
                  </div>
                  <div class="bg(error-50) p(lg) r(lg) text(center)">
                    <div class="heading(h1) bold c(error-600)">{stats.failed.length}</div>
                    <div class="caption(sm) c(gray-600)">Invalid Classes</div>
                  </div>
                </div>
                
                <div class="vbox gap(lg)">
                  <h3 class="title(lg) semibold">Success Rate</h3>
                  <div class="relative h(24px) bg(gray-200) r(full) clip">
                    <div class="h(full) bg(#667eea..#764ba2/to-right) transition duration(500)" style="width: {stats.successRate}"></div>
                    <div class="layer(center) label(sm) bold(600) c(white)">{stats.successRate}</div>
                  </div>
                </div>
                
                {#if stats.failed.length > 0}
                  <div class="vbox gap(md)">
                    <h3 class="title(lg) semibold c(error-600)">Invalid Classes</h3>
                    <div class="vbox gap(sm)">
                      {#each stats.failed as failedClass}
                        <code class="px(md) py(sm) bg(error-50) c(error-700) r(md) caption(sm) mono">{failedClass}</code>
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
  
  /* Syntax highlighting colors */
  :global(.tag) {
    color: #22863a;
    font-weight: 600;
  }
  
  :global(.attr-name) {
    color: #6f42c1;
  }
  
  :global(.attr-value) {
    color: #032f62;
  }
  
  :global(.punctuation) {
    color: #24292e;
  }
  
  :global(.comment) {
    color: #6a737d;
    font-style: italic;
  }
  
  :global(.text) {
    color: #24292e;
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
      max-height: none;
    }
  }
  
  /* Better mobile experience */
  @media (max-width: 768px) {
    .container\(xl\) {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    
    .font\(3xl\) {
      font-size: 2rem;
    }
    
    .font\(4xl\) {
      font-size: 2.5rem;
    }
    
    .font\(5xl\) {
      font-size: 3rem;
    }
  }
</style>