<script>
  import { onMount } from 'svelte';
  
  // Modern icons with clean design
  const icons = {
    rocket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    lightning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 3v10c0 1.5-.8 4-8 7-7.2-3-8-5.5-8-7V5l8-3z"/></svg>`,
    users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`
  };
  
  let activeTab = 'monthly';
</script>

<style>
  :global(:root) {
    /* Modern spacing system */
    --section-padding: clamp(4rem, 8vw, 8rem);
    --content-gap: clamp(3rem, 5vw, 5rem);
    
    /* Refined shadows */
    --shadow-subtle: 0 2px 8px rgba(0, 0, 0, 0.04);
    --shadow-card: 0 4px 16px rgba(0, 0, 0, 0.08);
    --shadow-hover: 0 8px 32px rgba(0, 0, 0, 0.12);
    --shadow-modal: 0 16px 48px rgba(0, 0, 0, 0.16);
    
    /* Modern transitions */
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1);
  }
  
  /* Smooth animations */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-slide-up {
    animation: slide-up 0.6s var(--ease-out-expo) forwards;
  }
</style>

<div class="min-h(screen) bg(white)">
  <!-- Navigation -->
  <nav class="fixed top(0) left(0) right(0) z(50) py(lg) px(2xl) glassmorphism(lg) bt(white.2)">
    <div class="container(7xl) mx(auto) hbox(between/middle)">
      <div class="hbox gap(xl) items(center)">
        <h1 class="heading(md) bold(700) c(primary)">Lumina</h1>
        <div class="hbox gap(lg) ..md:hidden">
          <a href="#features" class="body(sm) c(neutral-600) hover:c(primary) transition">Features</a>
          <a href="#pricing" class="body(sm) c(neutral-600) hover:c(primary) transition">Pricing</a>
          <a href="#about" class="body(sm) c(neutral-600) hover:c(primary) transition">About</a>
          <a href="#contact" class="body(sm) c(neutral-600) hover:c(primary) transition">Contact</a>
        </div>
      </div>
      <div class="hbox gap(md) items(center)">
        <button class="px(lg) py(sm) body(sm) c(neutral-600) hover:c(primary) transition">
          Sign In
        </button>
        <button class="px(xl) py(sm) body(sm) bg(primary) c(white) r(full) hover:bg(primary-700) transition shadow(sm) hover:shadow(md)">
          Get Started
        </button>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="relative min-h(screen) vbox(pack) px(2xl) py(5xl) overflow(hidden)">
    <!-- Background gradient -->
    <div class="absolute inset(0) bg(135deg/primary-50..white) z(-1)"></div>
    
    <!-- Floating shapes -->
    <div class="absolute top(10%) right(10%) size(400) bg(primary.1) r(full) blur(3xl) float(6s/ease-in-out/repeat:infinite)"></div>
    <div class="absolute bottom(10%) left(10%) size(300) bg(primary.2) r(full) blur(3xl) float(6s/ease-in-out/delay:2s/repeat:infinite)"></div>
    
    <div class="container(5xl) mx(auto) vbox(pack) gap(xl) text(center) slide-up(0.6s/ease-out)">
      <div class="inline-flex px(lg) py(sm) r(full) glassmorphism(sm) c(primary) body(sm) bold(500) hbox gap(sm)">
        <span>✨</span> Trusted by 50,000+ development teams worldwide
      </div>
      
      <h1 class="display(3xl) c(primary)">
        Ship 10x faster with<br/>
        <span class="bg(gradient) bg-clip(text) c(transparent)">AI-powered development</span>
      </h1>
      
      <p class="body(md) c(neutral-600) max-w(4xl)">
        From code generation to deployment in seconds. Let AI handle the complexity 
        while you focus on building what matters.
      </p>
      
      <div class="hbox(pack) gap(lg) flex-wrap">
        <button class="px(2xl) py(lg) bg(primary) c(white) r(full) bold(600) body(md) hover:bg(primary-700) transition shadow(lg) hover:shadow(xl) hover:translate-y(-2) transform">
          Start free trial
        </button>
        <button class="px(2xl) py(lg) bg(white) c(primary) r(full) bold(600) body(md) border(1/neutral-200) hover:border(neutral-300) hover:bg(neutral-50) transition shadow(sm) hover:shadow(md)">
          Watch 3-min demo
        </button>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py(5xl) px(2xl) bg(neutral-50)">
    <div class="container(7xl) mx(auto) vbox gap(2xl)">
      <div class="text(center) vbox(pack) gap(lg)">
        <h2 class="title(xl) c(primary)">
          Everything developers love
        </h2>
        <p class="body(md) c(neutral-600) max-w(2xl)">
          Built by developers, for developers. Every feature designed to make your workflow seamless.
        </p>
      </div>
      
      <div class="grid(3) gap(2xl) ..lg:grid(1)">
        {#each [
          { icon: 'lightning', title: 'AI Code Generation', desc: 'Describe what you need in plain English. Get production-ready code in seconds, not hours.' },
          { icon: 'shield', title: 'Enterprise Security', desc: 'Real-time vulnerability scanning with OWASP Top 10. SOC2 Type II and ISO 27001 certified.' },
          { icon: 'users', title: 'Live Collaboration', desc: 'Code together in real-time. AI reviews every change and suggests improvements instantly.' },
          { icon: 'code', title: 'Any Stack, Any Scale', desc: 'Works with 50+ languages and frameworks. From startups to Fortune 500, we scale with you.' },
          { icon: 'globe', title: 'Global Edge Network', desc: 'Deploy to 300+ edge locations worldwide. 99.99% uptime SLA with automatic failover.' },
          { icon: 'rocket', title: 'Zero-Config Deploy', desc: 'Push to git, deploy to production. Instant rollbacks, A/B testing, and canary releases built-in.' }
        ] as feature}
          <div class="p(2xl) bg(white) r(xl) shadow(card) hover:shadow(hover) transition hover:translate-y(-4) transform vbox gap(lg)">
            <div class="w(48) h(48) hbox(center/middle) r(lg) bg(primary.1) c(primary) hover:bg(primary) hover:c(white) transition">
              {@html icons[feature.icon]}
            </div>
            <div class="vbox gap(sm)">
              <h3 class="title(lg) c(primary)">{feature.title}</h3>
              <p class="body(md) c(neutral-600)">{feature.desc}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Product Demo Section -->
  <section class="py(4xl) px(2xl) bg(white)">
    <div class="container(7xl) mx(auto) grid(2) gap(3xl) items(center) ..lg:grid(1)">
      <div>
        <h2 class="title(xl) c(primary) mb(lg)">
          Watch AI write your code
        </h2>
        <p class="body(md) c(neutral-600) mb(2xl)">
          See how our AI understands context, writes tests, and deploys to production — all in real-time.
        </p>
        
        <div class="vbox gap(lg)">
          {#each ['Natural language to production code in seconds', 'Automatic test generation with 95%+ coverage', 'Real-time security vulnerability detection', 'One-click deployment to any cloud provider'] as item}
            <div class="hbox gap(md) items(start)">
              <div class="w(24) h(24) r(full) bg(success.1) c(success) hbox(center/middle)">
                {@html icons.check}
              </div>
              <p class="body(md) c(primary)">{item}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <div class="relative">
        <div class="size(16:9) r(xl) bg(neutral-100) shadow(xl) clip">
          <div class="absolute inset(0) bg(135deg/primary.1..primary.2)"></div>
          <div class="absolute inset(0) hbox(center/middle)">
            <div class="size(80) r(full) bg(white) shadow(lg) hbox(center/middle) hover:scale(1.1) transition cursor(pointer)">
              <svg class="size(32) c(primary) ml(4)" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="py(4xl) px(2xl) bg(neutral-50)">
    <div class="container(7xl) mx(auto)">
      <div class="text(center) mb(2xl)">
        <h2 class="title(xl) c(primary) mb(lg)">
          Loved by engineering teams at scale
        </h2>
        <p class="body(md) c(neutral-600) max-w(2xl) mx(auto)">
          From Y Combinator startups to Fortune 500 enterprises
        </p>
      </div>
      
      <div class="grid(3) gap(2xl) ..lg:grid(1)">
        {#each [
          { name: 'Sarah Chen', role: 'VP Engineering at Stripe', company: 'stripe', rating: 5, text: 'Lumina reduced our deployment time from hours to minutes. The AI code review caught bugs we would have missed. This is the future of development.' },
          { name: 'Marcus Johnson', role: 'CTO at Shopify', company: 'shopify', rating: 5, text: 'We migrated 2M+ lines of code using Lumina\'s AI. What would have taken 2 years took 2 months. ROI was immediate and substantial.' },
          { name: 'Priya Patel', role: 'Engineering Director at Netflix', company: 'netflix', rating: 5, text: 'The real-time collaboration features transformed our distributed team. Engineers pair program with AI assistance. Productivity up 3x.' }
        ] as testimonial}
          <div class="p(2xl) bg(white) r(xl) shadow(card) hover:shadow(hover) transition">
            <div class="hbox gap(2) mb(lg)">
              {#each Array(testimonial.rating) as _}
                <div class="size(20) c(warning)">
                  {@html icons.star}
                </div>
              {/each}
            </div>
            <p class="body(md) c(primary) mb(xl) italic">"{testimonial.text}"</p>
            <div>
              <p class="bold(600) c(primary)">{testimonial.name}</p>
              <p class="body(sm) c(neutral-600)">{testimonial.role}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py(4xl) px(2xl) bg(white)">
    <div class="container(7xl) mx(auto)">
      <div class="text(center) mb(2xl)">
        <h2 class="title(xl) c(primary) mb(lg)">
          Pricing that scales with you
        </h2>
        <p class="body(md) c(neutral-600) max-w(2xl) mx(auto) mb(xl)">
          Start free, upgrade when you need more. No hidden fees, no surprises.
        </p>
        
        <!-- Billing Toggle -->
        <div class="inline-flex r(full) bg(neutral-100) p(4)">
          <button 
            class="px(xl) py(sm) r(full) transition {activeTab === 'monthly' ? 'bg(white) shadow(sm)' : ''}"
            on:click={() => activeTab = 'monthly'}
          >
            Monthly
          </button>
          <button 
            class="px(xl) py(sm) r(full) transition {activeTab === 'annual' ? 'bg(white) shadow(sm)' : ''}"
            on:click={() => activeTab = 'annual'}
          >
            Annual <span class="text(sm) c(success) ml(sm)">Save 20%</span>
          </button>
        </div>
      </div>
      
      <div class="grid(3) gap(2xl) ..lg:grid(1)">
        {#each [
          { name: 'Starter', price: activeTab === 'monthly' ? 0 : 0, desc: 'Perfect for side projects', features: ['Up to 3 developers', '5 AI requests/day', 'Community support', 'Public repos only', 'Basic CI/CD'] },
          { name: 'Pro', price: activeTab === 'monthly' ? 49 : 39, desc: 'For professional teams', features: ['Up to 20 developers', 'Unlimited AI requests', 'Priority support', 'Private repos', 'Advanced CI/CD', 'Security scanning'], popular: true },
          { name: 'Enterprise', price: 'Custom', desc: 'For large organizations', features: ['Unlimited developers', 'Custom AI training', 'Dedicated support', 'On-premise option', '99.99% SLA', 'SOC2 compliance'] }
        ] as plan}
          <div class="relative p(2xl) {plan.popular ? 'glassmorphism(md) border(2/primary)' : 'bg(white) border(2/neutral-200)'} r(xl) shadow({plan.popular ? 'lg' : 'card'}) hover:shadow(hover) transition">
            {#if plan.popular}
              <div class="absolute top(-12) left(50%) translate-x(-50%) px(lg) py(sm) bg(primary) c(white) r(full) text(sm) bold(600)">
                Most Popular
              </div>
            {/if}
            
            <h3 class="title(xl) bold(700) c(primary) mb(sm)">{plan.name}</h3>
            <p class="body(sm) c(neutral-600) mb(xl)">{plan.desc}</p>
            
            <div class="mb(xl)">
              {#if typeof plan.price === 'number'}
                <span class="title(xl) bold(800) c(primary)">{plan.price === 0 ? 'Free' : `$${plan.price}`}</span>
                <span class="c(neutral-600)">/{activeTab === 'monthly' ? 'month' : 'month'}</span>
              {:else}
                <span class="display(2xl) bold(800) c(primary)">{plan.price}</span>
              {/if}
            </div>
            
            <div class="vbox gap(md) mb(xl)">
              {#each plan.features as feature}
                <div class="hbox gap(sm) items(center)">
                  <div class="size(20) c(success)">
                    {@html icons.check}
                  </div>
                  <p class="body(sm) c(primary)">{feature}</p>
                </div>
              {/each}
            </div>
            
            <button class="w(full) py(md) r(lg) bold(600) transition {plan.popular ? 'bg(primary) c(white) hover:bg(primary-700)' : 'bg(white) c(primary) border(1/neutral-300) hover:bg(neutral-50)'}">
              {typeof plan.price === 'number' ? (plan.price === 0 ? 'Start free' : 'Get Started') : 'Contact Sales'}
            </button>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py(4xl) px(2xl) bg(gradient)">
    <div class="container(5xl) mx(auto) text(center) vbox(pack) gap(xl)">
      <h2 class="title(xl) c(white)">
        Ready to ship faster?
      </h2>
      <p class="body(md) c(white.8) max-w(2xl)">
        Join 50,000+ developers who ship code 10x faster with AI
      </p>
      <div class="hbox(pack) gap(lg)">
        <button class="px(2xl) py(lg) bg(white) c(primary) r(full) bold(600) body(md) hover:bg(neutral-50) transition shadow(lg) hover:shadow(xl)">
          Start Free Today
        </button>
        <button class="px(2xl) py(lg) bg(transparent) c(white) r(full) bold(600) body(md) border(2/white) hover:bg(white.1) transition">
          Watch Demo
        </button>
      </div>
    </div>
  </section>

  <!-- Bento Grid Section -->
  <section class="py(4xl) px(2xl) bg(white)">
    <div class="container(7xl) mx(auto) vbox gap(2xl)">
      <div class="text(center) vbox(pack) gap(lg)">
        <h2 class="title(xl) c(primary)">
          See it all at a glance
        </h2>
        <p class="body(md) c(neutral-600) max-w(2xl)">
          Real-time insights into your development workflow
        </p>
      </div>
      
      <!-- Bento Grid Layout -->
      <div class="grid(4x3) gap(xl) ..lg:grid(2) ..sm:grid(1)" style="min-height: 600px">
        <!-- Large Stats Card -->
        <div class="glassmorphism(lg) p(2xl) r(xl) vbox gap(xl)" style="grid-column: span 2; grid-row: span 2">
          <div class="vbox gap(sm)">
            <p class="caption c(neutral-600)">Total Revenue</p>
            <h3 class="display(2xl) c(primary)">$2.4M</h3>
            <div class="hbox gap(sm) items(center)">
              <span class="body(sm) c(success)">↑ 24%</span>
              <span class="caption c(neutral-500)">from last month</span>
            </div>
          </div>
          <div class="h(120) bg(neutral-100) r(lg)"></div>
        </div>
        
        <!-- Active Users -->
        <div class="bg(gradient) p(2xl) r(xl) c(white) vbox gap(lg)">
          <div class="size(48) r(lg) bg(white.2) hbox(center/middle)">
            {@html icons.users}
          </div>
          <div class="vbox gap(xs)">
            <h4 class="title(xl) bold(700)">12,543</h4>
            <p class="body(sm) c(white.8)">Active Users</p>
          </div>
        </div>
        
        <!-- Conversion Rate -->
        <div class="bg(neutral-50) p(2xl) r(xl) vbox gap(lg)">
          <div class="size(48) r(lg) bg(neutral-100) c(neutral-600) hbox(center/middle)">
            {@html icons.lightning}
          </div>
          <div class="vbox gap(xs)">
            <h4 class="title(xl) c(primary)">3.2%</h4>
            <p class="body(sm) c(neutral-600)">Conversion Rate</p>
          </div>
        </div>
        
        <!-- Performance Metrics -->
        <div class="bg(neutral-900) p(2xl) r(xl) c(white) vbox gap(lg)" style="grid-column: span 2">
          <h4 class="title(lg)">Performance Metrics</h4>
          <div class="grid(3) gap(lg)">
            <div class="vbox gap(sm)">
              <p class="caption c(neutral-400)">Uptime</p>
              <p class="title(md) c(white)">99.9%</p>
            </div>
            <div class="vbox gap(sm)">
              <p class="caption c(neutral-400)">Response Time</p>
              <p class="title(md) c(white)">143ms</p>
            </div>
            <div class="vbox gap(sm)">
              <p class="caption c(neutral-400)">Error Rate</p>
              <p class="title(md) c(white)">0.03%</p>
            </div>
          </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="border(2/neutral-200) p(2xl) r(xl) vbox gap(lg)" style="grid-row: span 2">
          <h4 class="title(lg) c(neutral-900)">Quick Actions</h4>
          <div class="vbox gap(md)">
            <button class="w(full) py(md) px(lg) bg(neutral-50) hover:bg(neutral-100) r(lg) text(left) body(sm) c(primary) transition">
              Create New Project
            </button>
            <button class="w(full) py(md) px(lg) bg(neutral-50) hover:bg(neutral-100) r(lg) text(left) body(sm) c(primary) transition">
              Invite Team Member
            </button>
            <button class="w(full) py(md) px(lg) bg(neutral-50) hover:bg(neutral-100) r(lg) text(left) body(sm) c(primary) transition">
              Generate Report
            </button>
            <button class="w(full) py(md) px(lg) bg(neutral-50) hover:bg(neutral-100) r(lg) text(left) body(sm) c(primary) transition">
              View Analytics
            </button>
          </div>
        </div>
        
        <!-- Recent Activity -->
        <div class="bg(info-50) p(2xl) r(xl) vbox gap(lg)">
          <h4 class="title(lg) c(neutral-900)">Recent Activity</h4>
          <div class="vbox gap(sm)">
            <div class="hbox gap(sm) items(start)">
              <div class="size(8) r(full) bg(info-400)" style="margin-top: 6px"></div>
              <div class="vbox gap(xs)">
                <p class="body(sm) c(neutral-700)">New user registered</p>
                <p class="caption c(neutral-500)">2 min ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Timeline Section -->
  <section class="py(5xl) px(2xl) bg(neutral-50)">
    <div class="container(5xl) mx(auto) vbox gap(3xl)">
      <div class="text(center) vbox(pack) gap(lg)">
        <h2 class="display(3xl) c(neutral-900)">
          Our Journey
        </h2>
        <p class="title(lg) c(neutral-600) max-w(2xl)">
          From idea to innovation, see how we've grown
        </p>
      </div>
      
      <!-- Timeline -->
      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute left(50%) top(0) bottom(0) w(2) bg(neutral-200) ..md:left(20)"></div>
        
        <!-- Timeline Items -->
        <div class="vbox gap(3xl)">
          {#each [
            { year: '2024', title: 'Global Expansion', desc: 'Launched in 50+ countries worldwide', align: 'left' },
            { year: '2023', title: 'Series B Funding', desc: 'Raised $50M to accelerate growth', align: 'right' },
            { year: '2022', title: 'Product Launch', desc: 'Released our flagship platform', align: 'left' },
            { year: '2021', title: 'Company Founded', desc: 'Started with a simple idea', align: 'right' }
          ] as item, i}
            <div class="relative hbox {item.align === 'left' ? '' : 'justify(end)'} ..md:justify(start)">
              <div class="w(full) max-w(lg) {item.align === 'left' ? 'pr(3xl)' : 'pl(3xl)'} ..md:pl(24) ..md:pr(0)">
                <div class="glassmorphism(md) p(2xl) r(xl) vbox gap(lg) hover:shadow(xl) transition">
                  <div class="caption c(primary)">{item.year}</div>
                  <h3 class="title(xl) c(neutral-900)">{item.title}</h3>
                  <p class="body(md) c(neutral-600)">{item.desc}</p>
                </div>
              </div>
              <!-- Timeline Dot -->
              <div class="absolute left(50%) top(50%) translate-x(-50%) translate-y(-50%) size(20) r(full) bg(primary) border(4/white) ..md:left(20)"></div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Stats Dashboard -->
  <section class="py(4xl) px(2xl) bg(white)">
    <div class="container(7xl) mx(auto) vbox gap(2xl)">
      <div class="text(center) vbox(pack) gap(lg)">
        <h2 class="display(3xl) c(neutral-900)">
          Impact by the numbers
        </h2>
        <p class="title(lg) c(neutral-600) max-w(2xl)">
          Real results from real customers
        </p>
      </div>
      
      <div class="grid(4) gap(xl) ..lg:grid(2) ..sm:grid(1)">
        {#each [
          { value: '99.9%', label: 'Uptime SLA', icon: 'shield', color: 'success' },
          { value: '< 100ms', label: 'Response Time', icon: 'lightning', color: 'info' },
          { value: '50M+', label: 'API Calls/Day', icon: 'globe', color: 'primary' },
          { value: '4.9/5', label: 'Customer Rating', icon: 'star', color: 'warning' }
        ] as stat}
          <div class="text(center) p(2xl) r(xl) bg({stat.color}-50) hover:shadow(lg) transition group">
            <div class="size(64) r(full) bg({stat.color}-100) c({stat.color}-600) hbox(center/middle) mx(auto) group-hover:scale(1.1) transition">
              {@html icons[stat.icon]}
            </div>
            <h3 class="display(xl) c(neutral-900) my(lg)">{stat.value}</h3>
            <p class="body(md) c(neutral-600)">{stat.label}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- FAQ Accordion -->
  <section class="py(5xl) px(2xl) bg(neutral-50)">
    <div class="container(5xl) mx(auto) vbox gap(3xl)">
      <div class="text(center) vbox(pack) gap(lg)">
        <h2 class="display(3xl) c(neutral-900)">
          Frequently asked questions
        </h2>
        <p class="title(lg) c(neutral-600) max-w(2xl)">
          Everything you need to know about our platform
        </p>
      </div>
      
      <div class="vbox gap(lg)">
        {#each [
          { q: 'How do I get started?', a: 'Getting started is easy! Simply sign up for a free account and follow our quick onboarding process.' },
          { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and wire transfers for enterprise customers.' },
          { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel your subscription at any time with no hidden fees or penalties.' },
          { q: 'Do you offer enterprise plans?', a: 'Absolutely! We have custom enterprise plans with dedicated support and SLAs.' }
        ] as faq, i}
          <details class="group">
            <summary class="py(lg) px(xl) bg(white) hover:bg(neutral-50) r(lg) cursor(pointer) hbox(middle) gap(auto) transition">
              <h3 class="title(md) c(neutral-900)">{faq.q}</h3>
              <span class="c(neutral-400) transition group-open:rotate(180)">▼</span>
            </summary>
            <div class="px(xl) pb(lg) bg(white) r(lg)">
              <p class="body(md) c(neutral-600)">{faq.a}</p>
            </div>
          </details>
        {/each}
      </div>
    </div>
  </section>

  <!-- AI-Powered Layout Generation Section -->
  <section class="py(4xl) px(2xl) bg(white)">
    <div class="container(7xl) mx(auto) vbox gap(2xl)">
      <div class="text(center) vbox(pack) gap(lg)">
        <h2 class="title(xl) c(primary)">
          AI Layout Generation
        </h2>
        <p class="body(md) c(neutral-600) max-w(2xl)">
          See how Lumina's AI instantly generates responsive layouts from your design requirements
        </p>
      </div>
      
      <!-- AI Dashboard Generation Example -->
      <div class="vbox gap(lg)">
        <div class="vbox gap(sm)">
          <h3 class="body(md) bold(600) c(primary)">AI Dashboard Builder</h3>
          <p class="caption c(neutral-600)">Prompt: "Create a 3x2 analytics dashboard with key metrics"</p>
        </div>
        <div class="grid(3x2) gap(lg)" style="min-height: 400px">
          <div class="bg(white) p(xl) r(lg) vbox gap(lg) bt(1/neutral-100) shadow(sm)">
            <div class="hbox(between/middle)">
              <p class="caption c(neutral-600)">Revenue</p>
              <span class="caption c(success)">+12%</span>
            </div>
            <h4 class="title(xl) c(primary)">$84.5K</h4>
            <div class="h(40) bg(success.1) r(sm)"></div>
          </div>
          <div class="bg(white) p(xl) r(lg) vbox gap(lg) bt(1/neutral-100) shadow(sm)">
            <div class="hbox(between/middle)">
              <p class="caption c(neutral-600)">Active Users</p>
              <span class="caption c(primary)">+8%</span>
            </div>
            <h4 class="title(xl) c(primary)">12,459</h4>
            <div class="h(40) bg(primary.1) r(sm)"></div>
          </div>
          <div class="bg(white) p(xl) r(lg) vbox gap(lg) bt(1/neutral-100) shadow(sm)">
            <div class="hbox(between/middle)">
              <p class="caption c(neutral-600)">Conversion</p>
              <span class="caption c(neutral-600)">0%</span>
            </div>
            <h4 class="title(xl) c(primary)">3.24%</h4>
            <div class="h(40) bg(neutral-100) r(sm)"></div>
          </div>
          <div class="bg(white) p(xl) r(lg) vbox gap(lg) bt(1/neutral-100) shadow(sm)">
            <div class="hbox(between/middle)">
              <p class="caption c(neutral-600)">API Calls</p>
              <span class="caption c(success)">+25%</span>
            </div>
            <h4 class="title(xl) c(primary)">1.2M</h4>
            <div class="h(40) bg(success.1) r(sm)"></div>
          </div>
          <div class="bg(white) p(xl) r(lg) vbox gap(lg) bt(1/neutral-100) shadow(sm)">
            <div class="hbox(between/middle)">
              <p class="caption c(neutral-600)">Response Time</p>
              <span class="caption c(success)">-15%</span>
            </div>
            <h4 class="title(xl) c(primary)">48ms</h4>
            <div class="h(40) bg(success.1) r(sm)"></div>
          </div>
          <div class="bg(white) p(xl) r(lg) vbox gap(lg) bt(1/neutral-100) shadow(sm)">
            <div class="hbox(between/middle)">
              <p class="caption c(neutral-600)">Error Rate</p>
              <span class="caption c(success)">-32%</span>
            </div>
            <h4 class="title(xl) c(primary)">0.12%</h4>
            <div class="h(40) bg(success.1) r(sm)"></div>
          </div>
        </div>
      </div>
      
      <!-- AI E-commerce Layout Example -->
      <div class="vbox gap(lg)">
        <div class="vbox gap(sm)">
          <h3 class="body(md) bold(600) c(primary)">AI Product Grid</h3>
          <p class="caption c(neutral-600)">Prompt: "Build a 4x2 product showcase with featured items"</p>
        </div>
        <div class="grid(4x2) gap(lg)" style="min-height: 300px">
          <div class="bg(primary) p(xl) r(lg) vbox gap(lg) c(white)" style="grid-column: span 2">
            <div class="hbox gap(sm) items(center)">
              <span class="px(sm) py(xs) bg(white.2) r(sm) caption">FEATURED</span>
              <span class="caption">AI-Generated Layout</span>
            </div>
            <h4 class="body(md) bold(600)">Smart Component Library</h4>
            <p class="caption">Auto-generate UI components from descriptions</p>
            <button class="mt(auto) px(lg) py(sm) bg(white) c(primary) r(full) body(sm) bold(500)">
              Try Now
            </button>
          </div>
          <div class="bg(white) p(lg) r(lg) vbox gap(md) bt(1/neutral-100) shadow(sm)">
            <div class="h(80) bg(neutral-50) r(sm)"></div>
            <h4 class="body(sm) bold(600) c(primary)">Form Builder</h4>
            <p class="caption c(neutral-600)">$29/mo</p>
          </div>
          <div class="bg(neutral-900) p(xl) r(lg) vbox gap(lg) c(white)" style="grid-row: span 2">
            <h4 class="body(md) bold(600)">Code Assistant</h4>
            <p class="caption c(neutral-400)">Real-time AI pair programming</p>
            <div class="vbox gap(sm) mt(auto)">
              <div class="hbox gap(sm) items(center)">
                <div class="size(8) r(full) bg(success)"></div>
                <span class="caption">100% uptime</span>
              </div>
              <div class="hbox gap(sm) items(center)">
                <div class="size(8) r(full) bg(success)"></div>
                <span class="caption">24ms response</span>
              </div>
            </div>
          </div>
          <div class="bg(white) p(lg) r(lg) vbox gap(md) bt(1/neutral-100) shadow(sm)">
            <div class="h(80) bg(neutral-50) r(sm)"></div>
            <h4 class="body(sm) bold(600) c(primary)">API Tools</h4>
            <p class="caption c(neutral-600)">$19/mo</p>
          </div>
          <div class="bg(white) p(lg) r(lg) vbox gap(md) bt(1/neutral-100) shadow(sm)">
            <div class="h(80) bg(neutral-50) r(sm)"></div>
            <h4 class="body(sm) bold(600) c(primary)">Testing Suite</h4>
            <p class="caption c(neutral-600)">$39/mo</p>
          </div>
          <div class="bg(white) p(lg) r(lg) vbox gap(md) bt(1/neutral-100) shadow(sm)">
            <div class="h(80) bg(neutral-50) r(sm)"></div>
            <h4 class="body(sm) bold(600) c(primary)">Deploy Agent</h4>
            <p class="caption c(neutral-600)">$49/mo</p>
          </div>
        </div>
      </div>
      
      <!-- AI Workspace Generation Example -->
      <div class="vbox gap(lg)">
        <div class="vbox gap(sm)">
          <h3 class="body(md) bold(600) c(primary)">AI Workspace Builder</h3>
          <p class="caption c(neutral-600)">Prompt: "Design a 5x3 developer workspace with code editor, terminal, and tools"</p>
        </div>
        <div class="grid(5x3) gap(md)" style="min-height: 500px">
          <!-- Code Editor -->
          <div class="bg(neutral-900) p(xl) r(lg) vbox gap(lg)" style="grid-column: span 3; grid-row: span 2">
            <div class="hbox(between/middle)">
              <h3 class="body(md) c(white)">AI Code Editor</h3>
              <div class="hbox gap(sm)">
                <div class="size(12) r(full) bg(success)"></div>
                <span class="caption c(neutral-400)">Connected</span>
              </div>
            </div>
            <div class="vbox gap(sm) font(mono) caption">
              <p class="c(neutral-500)">// AI-generated function</p>
              <p class="c(primary)">function processUserData(data) {`{`}</p>
              <p class="c(white) pl(xl)">const validated = validate(data);</p>
              <p class="c(white) pl(xl)">return transform(validated);</p>
              <p class="c(primary)">}</p>
            </div>
            <div class="mt(auto) pt(lg) bt(1/neutral-800)">
              <p class="caption c(neutral-500)">AI suggestions: Press Tab to accept</p>
            </div>
          </div>
          
          <!-- AI Assistant -->
          <div class="bg(primary) p(lg) r(lg) vbox gap(md) c(white)" style="grid-column: span 2">
            <h4 class="body(sm) bold(600)">AI Assistant</h4>
            <p class="caption">24,589 queries today</p>
            <div class="mt(auto) hbox gap(sm)">
              <div class="size(8) r(full) bg(white.3)"></div>
              <div class="size(8) r(full) bg(white.5)"></div>
              <div class="size(8) r(full) bg(white)"></div>
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="bg(white) p(md) r(lg) vbox(middle+center) bt(1/neutral-100) shadow(sm)">
            <span class="c(primary)">{@html icons.lightning}</span>
            <p class="caption c(neutral-600) mt(sm)">Deploy</p>
          </div>
          <div class="bg(white) p(md) r(lg) vbox(middle+center) bt(1/neutral-100) shadow(sm)">
            <span class="c(primary)">{@html icons.shield}</span>
            <p class="caption c(neutral-600) mt(sm)">Test</p>
          </div>
          
          <!-- Terminal -->
          <div class="bg(neutral-900) p(lg) r(lg) c(white)" style="grid-column: span 3">
            <h4 class="body(sm) mb(md)">AI Terminal</h4>
            <div class="font(mono) caption vbox gap(xs)">
              <p class="c(neutral-500)">$ lumina generate component --type=dashboard</p>
              <p class="c(success)">✓ Generated dashboard component</p>
              <p class="c(success)">✓ Added responsive breakpoints</p>
              <p class="c(success)">✓ Created test suite</p>
              <p class="c(neutral-400)">$ _</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- CTA for AI Layout Generation -->
      <div class="mt(2xl) p(2xl) bg(neutral-50) r(xl) text(center) vbox(pack) gap(lg)">
        <h3 class="body(md) bold(600) c(primary)">From Prompt to Production</h3>
        <p class="caption c(neutral-600) max-w(2xl)">
          Lumina's AI understands your layout requirements and generates production-ready grid systems instantly. No more manual CSS calculations or complex layout debugging.
        </p>
        <button class="px(xl) py(sm) bg(primary) c(white) r(full) body(sm) bold(500) hover:bg(primary-700) transition shadow(sm) hover:shadow(md)">
          Generate Your First Layout
        </button>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py(3xl) px(2xl) bg(neutral-900)">
    <div class="container(7xl) mx(auto)">
      <div class="grid(4) gap(2xl) mb(3xl) ..lg:grid(2) ..sm:grid(1)">
        <div>
          <h3 class="body(md) bold(700) c(white) mb(xl)">Lumina</h3>
          <p class="caption c(neutral-400)">
            Building the future of software development, one tool at a time.
          </p>
        </div>
        <div>
          <h4 class="caption bold(600) c(white) mb(lg)">Product</h4>
          <div class="vbox gap(md)">
            <a href="#" class="caption c(neutral-400) hover:c(white) transition">Features</a>
            <a href="#" class="caption c(neutral-400) hover:c(white) transition">Pricing</a>
            <a href="#" class="caption c(neutral-400) hover:c(white) transition">Roadmap</a>
            <a href="#" class="caption c(neutral-400) hover:c(white) transition">Changelog</a>
          </div>
        </div>
        <div>
          <h4 class="caption bold(600) c(white) mb(lg)">Resources</h4>
          <div class="vbox gap(md)">
            <a href="#" class="caption c(neutral-400) hover:c(white) transition">Documentation</a>
            <a href="#" class="caption c(neutral-400) hover:c(white) transition">API Reference</a>
            <a href="#" class="caption c(neutral-400) hover:c(white) transition">Blog</a>
            <a href="#" class="caption c(neutral-400) hover:c(white) transition">Community</a>
          </div>
        </div>
        <div>
          <h4 class="caption bold(600) c(white) mb(lg)">Company</h4>
          <div class="vbox gap(md)">
            <a href="#" class="caption c(neutral-400) hover:c(white) transition">About</a>
            <a href="#" class="caption c(neutral-400) hover:c(white) transition">Careers</a>
            <a href="#" class="caption c(neutral-400) hover:c(white) transition">Contact</a>
            <a href="#" class="caption c(neutral-400) hover:c(white) transition">Legal</a>
          </div>
        </div>
      </div>
      
      <div class="pt(2xl) bt(neutral-800) hbox(middle) gap(auto) items(center) ..sm:vbox ..sm:gap(lg)">
        <p class="caption c(neutral-400)">© 2024 Lumina. All rights reserved.</p>
        <div class="hbox gap(lg)">
          <a href="#" class="caption c(neutral-400) hover:c(white) transition">Privacy Policy</a>
          <a href="#" class="caption c(neutral-400) hover:c(white) transition">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</div>