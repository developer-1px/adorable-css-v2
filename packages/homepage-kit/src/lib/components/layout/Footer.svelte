<script lang="ts">
  import { Github, Twitter, Mail, Heart, ExternalLink, BookOpen, Code2, Sparkles } from 'lucide-svelte';
  import { base } from '$app/paths';
  
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    product: [
      { label: 'Features', href: '/features' },
      { label: 'Playground', href: '/playground' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Examples', href: '/examples' }
    ],
    resources: [
      { label: 'Getting Started', href: '/docs/getting-started' },
      { label: 'API Reference', href: '/reference' },
      { label: 'Design Tokens', href: '/tokens' },
      { label: 'Migration Guide', href: '/docs/migration' }
    ],
    community: [
      { label: 'GitHub', href: 'https://github.com/developer-1px/adorable-css-v2', external: true },
      { label: 'Discord', href: '#', external: true },
      { label: 'Twitter', href: '#', external: true },
      { label: 'Discussions', href: 'https://github.com/developer-1px/adorable-css-v2/discussions', external: true }
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' }
    ]
  };
</script>

<footer class="footer bg(gray-900) border-t(gray-800)">
  <div class="container(6xl) px(lg) py(3xl)">
    <!-- Main Footer Content -->
    <div class="footer-content grid grid-cols(1) lg:grid-cols(5) gap(xl) mb(xl)">
      <!-- Brand Column -->
      <div class="brand-column lg:col-span(2) vbox gap(xl)">
        <!-- Logo & Brand -->
        <div class="brand hbox(middle) gap(md)">
          <div class="logo w(36px) h(36px) r(12px) bg(135deg/#8b5cf6..#ec4899) vbox(pack) shadow(lg)">
            <Sparkles size="18" class="c(white)" />
          </div>
          <div class="brand-text vbox gap(xs)">
            <div class="brand-name 800 font(xl/1) bg(135deg/#8b5cf6..#ec4899)" style="-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
              AdorableCSS
            </div>
            <div class="tagline 500 font(sm) c(gray-400)">The Figma-First CSS Framework</div>
          </div>
        </div>
        
        <!-- Description -->
        <div class="description vbox gap(sm)">
          <p class="font(sm) c(gray-300) leading(1.6)">
            Design beautiful interfaces with intuitive utilities that match your Figma workflow. 
            No more context switching between design and code.
          </p>
          <div class="stats hbox gap(md) font(sm) c(gray-400)">
            <div class="stat hbox(middle) gap(xs)">
              <Code2 size="14" />
              <span>Open Source</span>
            </div>
            <div class="stat hbox(middle) gap(xs)">
              <Heart size="14" />
              <span>MIT License</span>
            </div>
          </div>
        </div>
        
        <!-- Social Links -->
        <div class="social vbox gap(md)">
          <div class="social-title 600 font(sm) c(gray-100)">Follow Us</div>
          <div class="social-links hbox gap(sm)">
            <a href="https://github.com/developer-1px/adorable-css-v2" target="_blank" rel="noopener noreferrer"
               class="social-link w(32px) h(32px) r(md) bg(gray-800) border(gray-700) vbox(pack) hover:border(gray-600) hover:bg(gray-700) transition">
              <Github size="16" class="c(gray-300)" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer"
               class="social-link w(32px) h(32px) r(md) bg(gray-800) border(gray-700) vbox(pack) hover:border(gray-600) hover:bg(gray-700) transition">
              <Twitter size="16" class="c(gray-300)" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer"
               class="social-link w(32px) h(32px) r(md) bg(gray-800) border(gray-700) vbox(pack) hover:border(gray-600) hover:bg(gray-700) transition">
              <Mail size="16" class="c(gray-300)" />
            </a>
          </div>
        </div>
      </div>
      
      <!-- Product Links -->
      <div class="links-column vbox gap(md)">
        <h3 class="column-title 600 font(md) c(gray-100)">Product</h3>
        <nav class="column-nav vbox gap(xs)">
          {#each footerLinks.product as link}
            <a href="{base}{link.href}" class="nav-link font(sm) c(gray-400) hover:c(purple-400) transition no-underline">
              {link.label}
            </a>
          {/each}
        </nav>
      </div>
      
      <!-- Resources Links -->
      <div class="links-column vbox gap(md)">
        <h3 class="column-title 600 font(md) c(gray-100)">Resources</h3>
        <nav class="column-nav vbox gap(xs)">
          {#each footerLinks.resources as link}
            <a href="{base}{link.href}" class="nav-link font(sm) c(gray-400) hover:c(purple-400) transition no-underline">
              {link.label}
            </a>
          {/each}
        </nav>
      </div>
      
      <!-- Community Links -->
      <div class="links-column vbox gap(md)">
        <h3 class="column-title 600 font(md) c(gray-100)">Community</h3>
        <nav class="column-nav vbox gap(xs)">
          {#each footerLinks.community as link}
            <a href={link.external ? link.href : `${base}${link.href}`} 
               target={link.external ? '_blank' : undefined}
               rel={link.external ? 'noopener noreferrer' : undefined}
               class="nav-link font(sm) c(gray-400) hover:c(purple-400) transition no-underline hbox(middle) gap(xs)">
              {link.label}
              {#if link.external}
                <ExternalLink size="10" />
              {/if}
            </a>
          {/each}
        </nav>
      </div>
    </div>
    
    <!-- Newsletter Signup -->
    <div class="newsletter bg(gray-800) border(gray-700) r(lg) p(lg) mb(xl)">
      <div class="grid grid-cols(1) lg:grid-cols(3) gap(md) items(center)">
        <div class="newsletter-content lg:col-span(2) vbox gap(xs)">
          <h3 class="newsletter-title 700 font(lg) c(gray-100)">Stay Updated</h3>
          <p class="newsletter-desc font(sm) c(gray-400)">
            Get the latest updates, tutorials, and design inspiration delivered to your inbox.
          </p>
        </div>
        <div class="newsletter-form">
          <form class="hbox gap(sm)">
            <input 
              type="email" 
              placeholder="Enter your email"
              class="email-input flex(1) px(sm) py(xs) border(gray-600) bg(gray-700) c(white) r(md) font(sm) placeholder:c(gray-400) focus:border(purple-500) focus:outline(none) transition"
            />
            <button 
              type="submit"
              class="subscribe-btn px(md) py(xs) bg(135deg/#8b5cf6..#ec4899) c(white) r(md) 600 font(sm) hover:shadow(lg) transition whitespace(nowrap)"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Bottom Footer -->
    <div class="footer-bottom pt(lg) border-t(gray-800)">
      <div class="hbox(middle+between) gap(lg) flex-wrap">
        <div class="copyright font(sm) c(gray-400)">
          © {currentYear} AdorableCSS. All rights reserved.
        </div>
        
        <div class="legal-links hbox gap(md) font(sm)">
          <a href="{base}/privacy" class="legal-link c(gray-400) hover:c(purple-400) transition no-underline">
            Privacy Policy
          </a>
          <a href="{base}/terms" class="legal-link c(gray-400) hover:c(purple-400) transition no-underline">
            Terms of Service
          </a>
          <a href="{base}/cookies" class="legal-link c(gray-400) hover:c(purple-400) transition no-underline">
            Cookie Policy
          </a>
        </div>
        
        <div class="version-info font(sm) c(gray-400) hbox(middle) gap(xs)">
          <div class="version-dot w(6px) h(6px) bg(green-400) r(full)"></div>
          <span>v2.0.0-beta.1</span>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  .email-input:focus {
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }
</style>