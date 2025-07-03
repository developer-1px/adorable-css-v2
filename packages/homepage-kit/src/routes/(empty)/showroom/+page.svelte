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
        <h1 class="heading(md) bold(700) c(gray-900)">Nexus</h1>
        <div class="hbox gap(lg) ..md:hidden">
          <a href="#features" class="body(sm) c(gray-600) hover:c(gray-900) transition">Features</a>
          <a href="#pricing" class="body(sm) c(gray-600) hover:c(gray-900) transition">Pricing</a>
          <a href="#about" class="body(sm) c(gray-600) hover:c(gray-900) transition">About</a>
          <a href="#contact" class="body(sm) c(gray-600) hover:c(gray-900) transition">Contact</a>
        </div>
      </div>
      <div class="hbox gap(md) items(center)">
        <button class="px(lg) py(sm) body(sm) c(gray-700) hover:c(gray-900) transition">
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
    <div class="absolute inset(0) bg(135deg/sky-50..white) z(-1)"></div>
    
    <!-- Floating shapes -->
    <div class="absolute top(10%) right(10%) size(400) bg(cyan-200.2) r(full) blur(3xl) float(6s/ease-in-out/repeat:infinite)"></div>
    <div class="absolute bottom(10%) left(10%) size(300) bg(blue-200.2) r(full) blur(3xl) float(6s/ease-in-out/delay:2s/repeat:infinite)"></div>
    
    <div class="container(5xl) mx(auto) vbox(pack) gap(xl) text(center) slide-up(0.6s/ease-out)">
      <div class="inline-flex px(lg) py(sm) r(full) glassmorphism(sm) c(primary) body(sm) bold(500) hbox gap(sm)">
        <span>🎉</span> New features available
      </div>
      
      <h1 class="display(5xl) c(gray-900)">
        Build faster with<br/>
        <span class="bg(gradient) bg-clip(text) c(transparent)">modern tools</span>
      </h1>
      
      <p class="title(xl) c(gray-600) max-w(3xl)">
        Streamline your workflow with our powerful platform. Ship products faster, 
        collaborate better, and scale with confidence.
      </p>
      
      <div class="hbox(center) gap(lg) flex-wrap">
        <button class="px(2xl) py(lg) bg(primary) c(white) r(full) bold(600) title(md) hover:bg(primary-700) transition shadow(lg) hover:shadow(xl) hover:translate-y(-2) transform">
          Start Free Trial
        </button>
        <button class="px(2xl) py(lg) bg(white) c(gray-700) r(full) bold(600) title(md) border(1/gray-200) hover:border(gray-300) hover:bg(gray-50) transition shadow(sm) hover:shadow(md)">
          Watch Demo
        </button>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py(5xl) px(2xl) bg(gray-50)">
    <div class="container(7xl) mx(auto) vbox gap(3xl)">
      <div class="text(center) vbox(pack) gap(lg)">
        <h2 class="display(3xl) c(gray-900)">
          Everything you need
        </h2>
        <p class="title(lg) c(gray-600) max-w(2xl)">
          Powerful features to help you build, deploy, and scale your applications
        </p>
      </div>
      
      <div class="grid(3) gap(xl) ..lg:grid(1)">
        {#each [
          { icon: 'lightning', title: 'Lightning Fast', desc: 'Optimized performance with edge computing and smart caching' },
          { icon: 'shield', title: 'Enterprise Security', desc: 'Bank-level encryption and compliance with industry standards' },
          { icon: 'users', title: 'Team Collaboration', desc: 'Real-time collaboration tools for distributed teams' },
          { icon: 'code', title: 'Developer First', desc: 'Powerful APIs and SDKs for seamless integration' },
          { icon: 'globe', title: 'Global Scale', desc: 'Deploy to multiple regions with automatic failover' },
          { icon: 'rocket', title: 'Quick Deploy', desc: 'From code to production in minutes, not hours' }
        ] as feature}
          <div class="p(2xl) bg(white) r(xl) shadow(card) hover:shadow(hover) transition hover:translate-y(-4) transform group vbox gap(lg)">
            <div class="w(48) h(48) hbox(center/middle) r(lg) bg(primary.1) c(primary) group-hover:bg(primary) group-hover:c(white) transition">
              {@html icons[feature.icon]}
            </div>
            <div class="vbox gap(sm)">
              <h3 class="title(lg) c(gray-900)">{feature.title}</h3>
              <p class="body(md) c(gray-600)">{feature.desc}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Product Demo Section -->
  <section class="py(5xl) px(2xl) bg(white)">
    <div class="container(7xl) mx(auto) grid(2) gap(3xl) items(center) ..lg:grid(1)">
      <div>
        <h2 class="display(2xl) bold(800) c(gray-900) mb(xl)">
          See it in action
        </h2>
        <p class="title(lg) c(gray-600) mb(2xl) leading(relaxed)">
          Experience the power of our platform with a live demo. See how easy it is to get started.
        </p>
        
        <div class="vbox gap(lg)">
          {#each ['Real-time analytics dashboard', 'Automated deployment pipeline', 'Advanced monitoring and alerts', 'Team collaboration tools'] as item}
            <div class="hbox gap(md) items(start)">
              <div class="w(24) h(24) r(full) bg(emerald-100) c(emerald-600) hbox(center/middle) flex-shrink(0)">
                {@html icons.check}
              </div>
              <p class="body(md) c(gray-700)">{item}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <div class="relative">
        <div class="size(16:9) r(xl) bg(gray-100) shadow(xl) clip">
          <div class="absolute inset(0) bg(135deg/primary.1..cyan.1)"></div>
          <div class="absolute inset(0) hbox(center/middle)">
            <div class="size(80) r(full) bg(white) shadow(lg) hbox(center/middle) hover:scale(110) transition cursor(pointer)">
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
  <section class="py(5xl) px(2xl) bg(gray-50)">
    <div class="container(7xl) mx(auto)">
      <div class="text(center) mb(3xl)">
        <h2 class="display(3xl) bold(800) c(gray-900) mb(lg)">
          Loved by teams worldwide
        </h2>
        <p class="title(lg) c(gray-600) max-w(2xl) mx(auto)">
          Join thousands of companies using our platform to build better products
        </p>
      </div>
      
      <div class="grid(3) gap(xl) ..lg:grid(1)">
        {#each [
          { name: 'Sarah Chen', role: 'CTO at TechCorp', rating: 5, text: 'This platform transformed how we build and deploy applications. The speed improvements alone saved us months of development time.' },
          { name: 'Michael Rodriguez', role: 'Head of Engineering at StartupXYZ', rating: 5, text: 'The best developer experience I\'ve had. Everything just works, and the support team is incredibly responsive.' },
          { name: 'Emma Thompson', role: 'Product Manager at Scale', rating: 5, text: 'Our team productivity increased by 40% after switching. The collaboration features are game-changing.' }
        ] as testimonial}
          <div class="p(2xl) bg(white) r(xl) shadow(card) hover:shadow(hover) transition">
            <div class="hbox gap(2) mb(lg)">
              {#each Array(testimonial.rating) as _}
                <div class="size(20) c(amber-400)">
                  {@html icons.star}
                </div>
              {/each}
            </div>
            <p class="body(md) c(gray-700) mb(xl) leading(relaxed) italic">"{testimonial.text}"</p>
            <div>
              <p class="bold(600) c(gray-900)">{testimonial.name}</p>
              <p class="body(sm) c(gray-600)">{testimonial.role}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py(5xl) px(2xl) bg(white)">
    <div class="container(7xl) mx(auto)">
      <div class="text(center) mb(3xl)">
        <h2 class="display(3xl) bold(800) c(gray-900) mb(lg)">
          Simple, transparent pricing
        </h2>
        <p class="title(lg) c(gray-600) max-w(2xl) mx(auto) mb(xl)">
          Choose the plan that fits your needs. All plans include our core features.
        </p>
        
        <!-- Billing Toggle -->
        <div class="inline-flex r(full) bg(gray-100) p(4)">
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
            Annual <span class="text(sm) c(emerald-600) ml(sm)">Save 20%</span>
          </button>
        </div>
      </div>
      
      <div class="grid(3) gap(xl) ..lg:grid(1)">
        {#each [
          { name: 'Starter', price: activeTab === 'monthly' ? 29 : 23, desc: 'Perfect for small teams', features: ['Up to 5 team members', '10GB storage', 'Basic analytics', 'Email support'] },
          { name: 'Professional', price: activeTab === 'monthly' ? 99 : 79, desc: 'For growing businesses', features: ['Unlimited team members', '100GB storage', 'Advanced analytics', 'Priority support', 'API access'], popular: true },
          { name: 'Enterprise', price: 'Custom', desc: 'For large organizations', features: ['Custom limits', 'Dedicated infrastructure', 'White-label options', 'Dedicated support', 'SLA guarantee'] }
        ] as plan}
          <div class="relative p(2xl) {plan.popular ? 'glassmorphism(md) border(2/primary)' : 'bg(white) border(2/gray-200)'} r(xl) shadow({plan.popular ? 'lg' : 'card'}) hover:shadow(hover) transition">
            {#if plan.popular}
              <div class="absolute top(-12) left(50%) translate-x(-50%) px(lg) py(sm) bg(primary) c(white) r(full) text(sm) bold(600)">
                Most Popular
              </div>
            {/if}
            
            <h3 class="title(xl) bold(700) c(gray-900) mb(sm)">{plan.name}</h3>
            <p class="body(sm) c(gray-600) mb(xl)">{plan.desc}</p>
            
            <div class="mb(xl)">
              {#if typeof plan.price === 'number'}
                <span class="display(2xl) bold(800) c(gray-900)">${plan.price}</span>
                <span class="c(gray-600)">/{activeTab === 'monthly' ? 'month' : 'month'}</span>
              {:else}
                <span class="display(2xl) bold(800) c(gray-900)">{plan.price}</span>
              {/if}
            </div>
            
            <div class="vbox gap(md) mb(xl)">
              {#each plan.features as feature}
                <div class="hbox gap(sm) items(center)">
                  <div class="size(20) c(emerald-500)">
                    {@html icons.check}
                  </div>
                  <p class="body(sm) c(gray-700)">{feature}</p>
                </div>
              {/each}
            </div>
            
            <button class="w(full) py(md) r(lg) bold(600) transition {plan.popular ? 'bg(primary) c(white) hover:bg(primary-700)' : 'bg(white) c(gray-700) border(1/gray-300) hover:bg(gray-50)'}">
              {typeof plan.price === 'number' ? 'Get Started' : 'Contact Sales'}
            </button>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py(5xl) px(2xl) bg(90deg/primary..cyan-500)">
    <div class="container(5xl) mx(auto) text(center) vbox(pack) gap(xl)">
      <h2 class="display(3xl) c(white)">
        Ready to get started?
      </h2>
      <p class="title(xl) c(white.8) max-w(2xl)">
        Join thousands of teams building amazing products with our platform
      </p>
      <div class="hbox(center) gap(lg)">
        <button class="px(2xl) py(lg) bg(white) c(primary) r(full) bold(600) title(md) hover:bg(gray-50) transition shadow(lg) hover:shadow(xl)">
          Start Free Trial
        </button>
        <button class="px(2xl) py(lg) bg(transparent) c(white) r(full) bold(600) title(md) border(2/white) hover:bg(white.1) transition">
          Schedule Demo
        </button>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py(3xl) px(2xl) bg(gray-900)">
    <div class="container(7xl) mx(auto)">
      <div class="grid(4) gap(2xl) mb(3xl) ..lg:grid(2) ..sm:grid(1)">
        <div>
          <h3 class="title(lg) bold(700) c(white) mb(xl)">Nexus</h3>
          <p class="body(sm) c(gray-400) leading(relaxed)">
            Building the future of software development, one tool at a time.
          </p>
        </div>
        <div>
          <h4 class="bold(600) c(white) mb(lg)">Product</h4>
          <div class="vbox gap(md)">
            <a href="#" class="body(sm) c(gray-400) hover:c(white) transition">Features</a>
            <a href="#" class="body(sm) c(gray-400) hover:c(white) transition">Pricing</a>
            <a href="#" class="body(sm) c(gray-400) hover:c(white) transition">Roadmap</a>
            <a href="#" class="body(sm) c(gray-400) hover:c(white) transition">Changelog</a>
          </div>
        </div>
        <div>
          <h4 class="bold(600) c(white) mb(lg)">Resources</h4>
          <div class="vbox gap(md)">
            <a href="#" class="body(sm) c(gray-400) hover:c(white) transition">Documentation</a>
            <a href="#" class="body(sm) c(gray-400) hover:c(white) transition">API Reference</a>
            <a href="#" class="body(sm) c(gray-400) hover:c(white) transition">Blog</a>
            <a href="#" class="body(sm) c(gray-400) hover:c(white) transition">Community</a>
          </div>
        </div>
        <div>
          <h4 class="bold(600) c(white) mb(lg)">Company</h4>
          <div class="vbox gap(md)">
            <a href="#" class="body(sm) c(gray-400) hover:c(white) transition">About</a>
            <a href="#" class="body(sm) c(gray-400) hover:c(white) transition">Careers</a>
            <a href="#" class="body(sm) c(gray-400) hover:c(white) transition">Contact</a>
            <a href="#" class="body(sm) c(gray-400) hover:c(white) transition">Legal</a>
          </div>
        </div>
      </div>
      
      <div class="pt(2xl) bt(gray-800) hbox(between) items(center) ..sm:vbox ..sm:gap(lg)">
        <p class="caption c(gray-400)">© 2024 Nexus. All rights reserved.</p>
        <div class="hbox gap(lg)">
          <a href="#" class="caption c(gray-400) hover:c(white) transition">Privacy Policy</a>
          <a href="#" class="caption c(gray-400) hover:c(white) transition">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</div>