<script lang="ts">
  import { Type, Hash, AlignLeft, Minus, Heading1, Type as TypeIcon, FileText, Tag, MessageSquare, Info } from 'lucide-svelte';
  
  // Display component variants - for maximum visual impact
  const displayVariants = [
    { name: 'xs', example: 'Display XS', description: 'Smaller display text', usage: 'Section headers' },
    { name: 'sm', example: 'Display Small', description: 'Small display size', usage: 'Feature titles' },
    { name: 'base', example: 'Display Base', description: 'Standard display size', usage: 'Page headers' },
    { name: 'lg', example: 'Display Large', description: 'Large display text', usage: 'Hero sections' },
    { name: 'xl', example: 'Display XL', description: 'Extra large display', usage: 'Landing pages' },
    { name: '2xl', example: 'Display 2XL', description: 'Double XL display', usage: 'Marketing headers' },
    { name: 'hero', example: 'Hero Display', description: 'Hero section display', usage: 'Main hero text' },
    { name: 'banner', example: 'Banner', description: 'Banner display text', usage: 'Promotional banners' },
  ];

  // Heading component variants - for document structure
  const headingVariants = [
    { name: 'h1', example: 'Heading Level 1', description: 'Primary page title', usage: 'Page titles' },
    { name: 'h2', example: 'Heading Level 2', description: 'Section headers', usage: 'Major sections' },
    { name: 'h3', example: 'Heading Level 3', description: 'Subsection titles', usage: 'Subsections' },
    { name: 'h4', example: 'Heading Level 4', description: 'Component headers', usage: 'Components' },
    { name: 'h5', example: 'Heading Level 5', description: 'Small headings', usage: 'Minor sections' },
    { name: 'h6', example: 'Heading Level 6', description: 'Tiny headings', usage: 'Fine details' },
  ];

  // Title component variants - for component identification
  const titleVariants = [
    { name: 'xs', example: 'Extra Small Title', description: 'Tiny component titles', usage: 'Badges, tags' },
    { name: 'sm', example: 'Small Title', description: 'Small component titles', usage: 'List items' },
    { name: 'base', example: 'Base Title', description: 'Standard titles', usage: 'Cards, sections' },
    { name: 'lg', example: 'Large Title', description: 'Large component titles', usage: 'Feature cards' },
    { name: 'card', example: 'Card Title Example', description: 'Card component titles', usage: 'Card headers' },
    { name: 'modal', example: 'Modal Title', description: 'Modal dialog titles', usage: 'Dialog headers' },
    { name: 'section', example: 'Section Title', description: 'Section component titles', usage: 'Section headers' },
  ];

  // Body component variants - for readable content
  const bodyVariants = [
    { name: 'xs', example: 'Extra small body text for fine print and disclaimers', description: 'Tiny text', usage: 'Legal text' },
    { name: 'sm', example: 'Small body text for secondary content and descriptions', description: 'Small content', usage: 'Descriptions' },
    { name: 'base', example: 'Base body text is optimized for readability with comfortable line height', description: 'Standard text', usage: 'Main content' },
    { name: 'lg', example: 'Large body text for emphasized paragraphs and introductions', description: 'Large text', usage: 'Lead paragraphs' },
    { name: 'article', example: 'Article body text with optimal reading width and line height for long-form content', description: 'Article optimized', usage: 'Blog posts' },
    { name: 'prose', example: 'Prose variant provides the best reading experience for extended text with enhanced typography', description: 'Enhanced prose', usage: 'Documentation' },
  ];

  // Label component variants - for functional UI text
  const labelVariants = [
    { name: 'xs', example: 'Extra Small Label', description: 'Tiny labels', usage: 'Compact UI' },
    { name: 'sm', example: 'Small Label', description: 'Small labels', usage: 'Dense forms' },
    { name: 'base', example: 'Base Label', description: 'Standard labels', usage: 'Form fields' },
    { name: 'button', example: 'Button Label', description: 'Button text', usage: 'Buttons' },
    { name: 'input', example: 'Input Label', description: 'Form field labels', usage: 'Input fields' },
    { name: 'tab', example: 'Tab Label', description: 'Tab navigation', usage: 'Tab bars' },
    { name: 'badge', example: 'BADGE', description: 'Badge text', usage: 'Status badges' },
  ];

  // Caption component variants - for supplementary information
  const captionVariants = [
    { name: 'xs', example: 'Extra small caption text', description: 'Tiny captions', usage: 'Timestamps' },
    { name: 'sm', example: 'Small caption for additional context', description: 'Small captions', usage: 'Helper text' },
    { name: 'base', example: 'Base caption provides supplementary information', description: 'Standard captions', usage: 'Image captions' },
    { name: 'figure', example: 'Figure 1: Example caption for images and diagrams', description: 'Figure captions', usage: 'Media captions' },
    { name: 'form', example: 'Password must be at least 8 characters', description: 'Form helper text', usage: 'Input hints' },
    { name: 'hint', example: 'Hint: Try using keyboard shortcuts', description: 'Hint text', usage: 'UI hints' },
  ];

  // Component color variants
  const colorVariants = ['default', 'muted', 'primary', 'success', 'warning', 'danger', 'gradient'];
  
  // Bold utility weights
  const boldWeights = [
    { name: 'thin', value: '100', example: 'Thin weight text' },
    { name: 'light', value: '300', example: 'Light weight text' },
    { name: 'normal', value: '400', example: 'Normal weight text' },
    { name: 'medium', value: '500', example: 'Medium weight text' },
    { name: 'semi', value: '600', example: 'Semibold weight text' },
    { name: 'bold', value: '700', example: 'Bold weight text' },
    { name: 'extra', value: '800', example: 'Extra bold text' },
    { name: 'black', value: '900', example: 'Black weight text' },
  ];

  let copiedCode = '';
  
  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    copiedCode = code;
    setTimeout(() => copiedCode = '', 2000);
  }
</script>

<div class="vbox gap(4xl)">
  <!-- Section Header -->
  <div class="text(center)">
    <div class="hbox(center) gap(sm) mb(xl)">
      <Type size="32" class="c(purple-600)" />
      <h1 class="display(lg) gradient">Typography System</h1>
    </div>
    <p class="body(lg) c(gray-600) max-w(3xl) mx(auto)">
      A comprehensive 6-role typography system designed for clarity, hierarchy, and beautiful reading experiences. 
      Each role serves a specific purpose in your design system.
    </p>
  </div>

  <!-- Role-Based Typography System -->
  <div class="vbox gap(3xl)">
    <!-- Display Role -->
    <div class="bg(135deg/purple-50..pink-50) r(2xl) p(3xl) border(2/purple-200)">
      <div class="hbox(between/start) mb(2xl)">
        <div>
          <div class="hbox(start) gap(sm) mb(md)">
            <div class="p(sm) r(lg) bg(purple-600) c(white)">
              <TypeIcon size="20" />
            </div>
            <h2 class="heading(h2) c(purple-900)">Display</h2>
          </div>
          <p class="body(base) c(purple-700) max-w(2xl)">
            Maximum visual impact for hero sections, landing pages, and marketing materials. 
            Features tight line-height and negative letter-spacing for dramatic effect.
          </p>
        </div>
        <code class="caption(base) bg(purple-100) px(md) py(sm) r(lg) font(mono) c(purple-800)">
          display(size)
        </code>
      </div>
      
      <div class="vbox gap(xl)">
        {#each displayVariants as variant}
          <div 
            class="group p(xl) r(xl) bg(white) hover:shadow(2xl) transition-all cursor-pointer border(1/purple-100) hover:border(purple-300)"
            on:click={() => copyCode(`display(${variant.name})`)}
          >
            <div class="hbox(between) mb(sm)">
              <code class="badge(sm/primary)">
                display({variant.name})
              </code>
              <span class="caption(xs) c(purple-600)">{variant.usage}</span>
            </div>
            <div class="display({variant.name}) c(gray-900) mb(sm)">
              {variant.example}
            </div>
            <p class="caption(base) c(gray-600)">{variant.description}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Heading Role -->
    <div class="bg(135deg/indigo-50..blue-50) r(2xl) p(3xl) border(2/indigo-200)">
      <div class="hbox(between/start) mb(2xl)">
        <div>
          <div class="hbox(start) gap(sm) mb(md)">
            <div class="p(sm) r(lg) bg(indigo-600) c(white)">
              <Heading1 size="20" />
            </div>
            <h2 class="heading(h2) c(indigo-900)">Heading</h2>
          </div>
          <p class="body(base) c(indigo-700) max-w(2xl)">
            Semantic HTML headings for document structure and SEO. 
            Provides clear visual hierarchy with balanced typography.
          </p>
        </div>
        <code class="caption(base) bg(indigo-100) px(md) py(sm) r(lg) font(mono) c(indigo-800)">
          heading(level)
        </code>
      </div>
      
      <div class="vbox gap(lg)">
        {#each headingVariants as variant}
          <div 
            class="group p(xl) r(xl) bg(white) hover:shadow(xl) transition-all cursor-pointer border(1/indigo-100) hover:border(indigo-300)"
            on:click={() => copyCode(`heading(${variant.name})`)}
          >
            <div class="hbox(between) mb(md)">
              <code class="badge(sm/primary)">
                heading({variant.name})
              </code>
              <span class="caption(xs) c(indigo-600)">{variant.usage}</span>
            </div>
            <div class="heading({variant.name}) c(gray-900) mb(sm)">
              {variant.example}
            </div>
            <p class="caption(base) c(gray-600)">{variant.description}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Title Role -->
    <div class="bg(135deg/cyan-50..sky-50) r(2xl) p(3xl) border(2/cyan-200)">
      <div class="hbox(between/start) mb(2xl)">
        <div>
          <div class="hbox(start) gap(sm) mb(md)">
            <div class="p(sm) r(lg) bg(cyan-600) c(white)">
              <Tag size="20" />
            </div>
            <h2 class="heading(h2) c(cyan-900)">Title</h2>
          </div>
          <p class="body(base) c(cyan-700) max-w(2xl)">
            Component identifiers for cards, modals, and UI elements. 
            Balanced weight and spacing for clear labeling without dominating.
          </p>
        </div>
        <code class="caption(base) bg(cyan-100) px(md) py(sm) r(lg) font(mono) c(cyan-800)">
          title(size)
        </code>
      </div>
      
      <div class="grid(3) gap(lg)">
        {#each titleVariants as variant}
          <div 
            class="group p(lg) r(xl) bg(white) hover:shadow(lg) transition-all cursor-pointer border(1/cyan-100) hover:border(cyan-300)"
            on:click={() => copyCode(`title(${variant.name})`)}
          >
            <div class="hbox(between) mb(sm)">
              <code class="badge(xs/primary)">
                title({variant.name})
              </code>
            </div>
            <h3 class="title({variant.name}) c(gray-900) mb(xs) truncate">
              {variant.example}
            </h3>
            <p class="caption(xs) c(gray-600)">{variant.usage}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Body Role -->
    <div class="bg(135deg/green-50..emerald-50) r(2xl) p(3xl) border(2/green-200)">
      <div class="hbox(between/start) mb(2xl)">
        <div>
          <div class="hbox(start) gap(sm) mb(md)">
            <div class="p(sm) r(lg) bg(green-600) c(white)">
              <FileText size="20" />
            </div>
            <h2 class="heading(h2) c(green-900)">Body</h2>
          </div>
          <p class="body(base) c(green-700) max-w(2xl)">
            Optimized for readability with generous line-height and comfortable spacing. 
            The workhorse of content presentation.
          </p>
        </div>
        <code class="caption(base) bg(green-100) px(md) py(sm) r(lg) font(mono) c(green-800)">
          body(size)
        </code>
      </div>
      
      <div class="vbox gap(lg)">
        {#each bodyVariants as variant}
          <div 
            class="group p(xl) r(xl) bg(white) hover:shadow(lg) transition-all cursor-pointer border(1/green-100) hover:border(green-300)"
            on:click={() => copyCode(`body(${variant.name})`)}
          >
            <div class="hbox(between) mb(md)">
              <code class="badge(sm/success)">
                body({variant.name})
              </code>
              <span class="caption(xs) c(green-600)">{variant.usage}</span>
            </div>
            <p class="body({variant.name}) c(gray-800)">
              {variant.example}
            </p>
            <p class="caption(sm) c(gray-600) mt(sm)">{variant.description}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Label Role -->
    <div class="bg(135deg/amber-50..yellow-50) r(2xl) p(3xl) border(2/amber-200)">
      <div class="hbox(between/start) mb(2xl)">
        <div>
          <div class="hbox(start) gap(sm) mb(md)">
            <div class="p(sm) r(lg) bg(amber-600) c(white)">
              <Tag size="20" />
            </div>
            <h2 class="heading(h2) c(amber-900)">Label</h2>
          </div>
          <p class="body(base) c(amber-700) max-w(2xl)">
            Functional UI text for buttons, forms, and interactive elements. 
            Clear and concise with enhanced weight for small sizes.
          </p>
        </div>
        <code class="caption(base) bg(amber-100) px(md) py(sm) r(lg) font(mono) c(amber-800)">
          label(size)
        </code>
      </div>
      
      <div class="grid(3) gap(lg)">
        {#each labelVariants as variant}
          <div 
            class="group p(lg) r(xl) bg(white) hover:shadow(lg) transition-all cursor-pointer border(1/amber-100) hover:border(amber-300)"
            on:click={() => copyCode(`label(${variant.name})`)}
          >
            <div class="label({variant.name}) c(gray-900) mb(xs) block">
              {variant.example}
            </div>
            <p class="caption(xs) c(gray-600)">{variant.usage}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Caption Role -->
    <div class="bg(135deg/gray-50..slate-50) r(2xl) p(3xl) border(2/gray-300)">
      <div class="hbox(between/start) mb(2xl)">
        <div>
          <div class="hbox(start) gap(sm) mb(md)">
            <div class="p(sm) r(lg) bg(gray-600) c(white)">
              <Info size="20" />
            </div>
            <h2 class="heading(h2) c(gray-900)">Caption</h2>
          </div>
          <p class="body(base) c(gray-700) max-w(2xl)">
            Supplementary information that doesn't compete for attention. 
            Intentionally subdued color and weight for supporting content.
          </p>
        </div>
        <code class="caption(base) bg(gray-200) px(md) py(sm) r(lg) font(mono) c(gray-800)">
          caption(size)
        </code>
      </div>
      
      <div class="grid(2) gap(lg)">
        {#each captionVariants as variant}
          <div 
            class="group p(lg) r(xl) bg(white) hover:shadow(md) transition-all cursor-pointer border(1/gray-200) hover:border(gray-400)"
            on:click={() => copyCode(`caption(${variant.name})`)}
          >
            <div class="hbox(between) mb(sm)">
              <code class="badge(xs/muted)">
                caption({variant.name})
              </code>
              <span class="caption(xs) c(gray-500)">{variant.usage}</span>
            </div>
            <p class="caption({variant.name})">
              {variant.example}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Typography Composition Examples -->
  <div class="bg(gray-900) r(2xl) p(3xl) c(white)">
    <h2 class="heading(h1) c(white) mb(xl) text(center)">Typography in Action</h2>
    <p class="body(lg) c(gray-300) text(center) max-w(3xl) mx(auto) mb(3xl)">
      See how different typography roles work together to create beautiful, functional interfaces
    </p>
    
    <div class="grid(3) gap(xl)">
      <!-- Card Example -->
      <div class="bg(white) r(xl) p(xl) c(gray-900)">
        <div class="caption(xs) uppercase c(purple-600) mb(sm)">Article</div>
        <h3 class="title(card) mb(sm)">Getting Started with AdorableCSS</h3>
        <p class="body(sm) c(gray-700) mb(md)">
          Learn the fundamentals of our intuitive CSS framework and start building beautiful interfaces in minutes.
        </p>
        <div class="hbox(between)">
          <span class="caption(base)">5 min read</span>
          <span class="label(button) c(purple-600)">Read More →</span>
        </div>
      </div>

      <!-- Form Example -->
      <div class="bg(white) r(xl) p(xl) c(gray-900)">
        <h3 class="title(modal) mb(lg)">Create Account</h3>
        <div class="vbox gap(md)">
          <div>
            <label class="label(input) required">Email Address</label>
            <div class="mt(xs) p(md) r(lg) border(1/gray-300) body(base) c(gray-500)">
              name@example.com
            </div>
            <p class="caption(form) help mt(xs)">We'll never share your email</p>
          </div>
          <button class="p(md) r(lg) bg(indigo-600) c(white) label(button) hover:bg(indigo-700) transition">
            Continue
          </button>
        </div>
      </div>

      <!-- Feature Card -->
      <div class="bg(white) r(xl) p(xl) c(gray-900)">
        <div class="badge(xs/success) inline-block mb(md)">NEW</div>
        <h3 class="title(lg) mb(sm)">Dark Mode Support</h3>
        <p class="body(base) c(gray-700) mb(md)">
          Built-in dark mode with automatic theme detection and smooth transitions.
        </p>
        <div class="caption(hint) italic">
          Available in v2.0+
        </div>
      </div>
    </div>
  </div>

  <!-- Typography Utilities -->
  <div class="grid(1) gap(xl)">
    <!-- Bold Utility -->
    <div class="bg(white) r(2xl) p(2xl) shadow(xl) shadow(gray-200.5)">
      <div class="hbox(start) gap(sm) mb(xl)">
        <AlignLeft size="20" class="c(indigo-600)" />
        <h3 class="heading(h3) c(gray-900)">Bold Utility</h3>
      </div>
      
      <p class="body(base) c(gray-600) mb(xl)">
        Fine-tune font weights independently of typography roles
      </p>
      
      <div class="hbox gap(md) overflow-x(auto) pb(md)">
        {#each boldWeights as weight}
          <div 
            class="group p(lg) r(lg) hover:bg(gray-50) transition cursor-pointer bg(gray-50) hover:bg(gray-100) min-w(140px) text(center)"
            on:click={() => copyCode(`bold(${weight.name})`)}
          >
            <div class="body(lg) bold({weight.name}) c(gray-800) mb(md)">
              Aa
            </div>
            <code class="badge(xs/muted) block mb(xs)">
              bold({weight.name})
            </code>
            <span class="caption(xs) c(gray-500) block">{weight.value}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Typography Tips -->
    <div class="bg(black) r(2xl) p(2xl) c(white)">
      <h3 class="heading(h3) c(white) mb(xl)">Pro Tips</h3>
      
      <div class="vbox gap(lg)">
        <div class="p(lg) bg(white.1) r(lg) backdrop-blur(sm)">
          <h4 class="title(sm) c(white) mb(sm)">Semantic HTML</h4>
          <p class="body(sm) c(white.9)">
            Always use the appropriate HTML element. <code class="bg(white.2) px(xs) r(sm)">heading(h1)</code> should be used with <code class="bg(white.2) px(xs) r(sm)">&lt;h1&gt;</code> tags.
          </p>
        </div>
        
        <div class="p(lg) bg(white.1) r(lg) backdrop-blur(sm)">
          <h4 class="title(sm) c(white) mb(sm)">Combine Utilities</h4>
          <p class="body(sm) c(white.9)">
            Mix typography roles with other utilities: <code class="bg(white.2) px(xs) r(sm)">display(hero) gradient hover:glow</code>
          </p>
        </div>
        
        <div class="p(lg) bg(white.1) r(lg) backdrop-blur(sm)">
          <h4 class="title(sm) c(white) mb(sm)">Responsive Typography</h4>
          <p class="body(sm) c(white.9)">
            Use responsive prefixes: <code class="bg(white.2) px(xs) r(sm)">display(base) md:display(lg)</code>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Copy Feedback -->
  {#if copiedCode}
    <div class="fixed bottom(20) right(20) bg(green-600) c(white) px(lg) py(md) r(lg) shadow(xl) animate(fade-in-up)">
      Copied: {copiedCode}
    </div>
  {/if}
</div>

<style>
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  :global(.animate\(fade-in-up\)) {
    animation: fade-in-up 0.3s ease-out;
  }
</style>