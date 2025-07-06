<script lang="ts">
  import { Type, Hash, AlignLeft, Minus, Heading1, Type as TypeIcon, FileText, Tag, MessageSquare, Info } from 'lucide-svelte';
  import { defaultTokens } from 'adorable-css';
  
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
  
  // Line height 02-design_tokens
  const lineHeightTokens = [
    { name: 'none', value: '1', usage: 'Headings', example: 'Tight line height for display text' },
    { name: 'tight', value: '1.25', usage: 'Display text', example: 'Slightly tighter line height' },
    { name: 'snug', value: '1.375', usage: 'Titles', example: 'Comfortable title spacing' },
    { name: 'normal', value: '1.5', usage: 'Body text', example: 'Default readable line height' },
    { name: 'relaxed', value: '1.625', usage: 'Comfortable reading', example: 'More spacious line height' },
    { name: 'loose', value: '2', usage: 'Spacious', example: 'Extra space between lines' },
  ];
  
  // Letter spacing 02-design_tokens
  const letterSpacingTokens = [
    { name: 'tighter', value: '-0.05em', usage: 'Very tight', example: 'Tightly packed letters' },
    { name: 'tight', value: '-0.025em', usage: 'Tight', example: 'Slightly tight spacing' },
    { name: 'normal', value: '0', usage: 'Default', example: 'Normal letter spacing' },
    { name: 'wide', value: '0.025em', usage: 'Wide', example: 'Slightly wider spacing' },
    { name: 'wider', value: '0.05em', usage: 'Wider', example: 'More space between letters' },
    { name: 'widest', value: '0.1em', usage: 'Widest', example: 'Maximum letter spacing' },
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
    <div class="hbox(pack) gap(sm)">
      <Type size="2xl" class="c(primary)" />
      <h1 class="display(lg) gradient">Typography System</h1>
    </div>
    <p class="body(lg) c(neutral-600) max-w(4xl) mx(auto) pt(xl)">
      A comprehensive 6-role typography system designed for clarity, hierarchy, and beautiful reading experiences. 
      Each role serves a specific purpose in your design system.
    </p>
  </div>

  <!-- Role-Based Typography System -->
  <div class="vbox gap(3xl)">
    <!-- Display Role -->
    <div class="bg(primary-50) r(2xl) p(3xl) b(1/neutral-200)">
      <div class="hbox(between/start) gap(xl)">
        <div>
          <div class="hbox(start) gap(sm) pb(md)">
            <div class="p(sm) r(lg) bg(primary) c(white)">
              <TypeIcon size="xl" />
            </div>
            <h2 class="heading(h2) c(neutral-900)">Display</h2>
          </div>
          <p class="body(base) c(neutral-700) max-w(2xl)">
            Maximum visual impact for hero sections, landing pages, and marketing materials. 
            Features tight line-height and negative letter-spacing for dramatic effect.
          </p>
        </div>
        <code class="caption(base) bg(white) px(md) py(sm) r(lg) font(mono) c(neutral-800)">
          display(size)
        </code>
      </div>
      
      <div class="vbox gap(xl) pt(2xl)">
        {#each displayVariants as variant}
          <div 
            class="group p(xl) r(xl) bg(white) hover:shadow(2xl) transition-all cursor(pointer) b(1/neutral-100) hover:b(1/primary-200)"
            on:click={() => copyCode(`display(${variant.name})`)}
          >
            <div class="hbox(middle) gap(auto) pb(sm)">
              <code class="badge(sm/primary)">
                display({variant.name})
              </code>
              <span class="caption(xs) c(neutral-600)">{variant.usage}</span>
            </div>
            <div class="display({variant.name}) c(neutral-900) pb(sm)">
              {variant.example}
            </div>
            <p class="caption(base) c(neutral-600)">{variant.description}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Heading Role -->
    <div class="bg(white) r(2xl) p(3xl) b(1/neutral-200)">
      <div class="hbox(between/start) gap(xl)">
        <div>
          <div class="hbox(start) gap(sm) pb(md)">
            <div class="p(sm) r(lg) bg(neutral-700) c(white)">
              <Heading1 size="xl" />
            </div>
            <h2 class="heading(h2) c(neutral-900)">Heading</h2>
          </div>
          <p class="body(base) c(neutral-700) max-w(2xl)">
            Semantic HTML headings for document structure and SEO. 
            Provides clear visual hierarchy with balanced typography.
          </p>
        </div>
        <code class="caption(base) bg(neutral-100) px(md) py(sm) r(lg) font(mono) c(neutral-800)">
          heading(level)
        </code>
      </div>
      
      <div class="vbox gap(lg) pt(2xl)">
        {#each headingVariants as variant}
          <div 
            class="group p(xl) r(xl) bg(neutral-50) hover:shadow(xl) transition-all cursor(pointer) b(1/neutral-100) hover:b(1/neutral-300)"
            on:click={() => copyCode(`heading(${variant.name})`)}
          >
            <div class="hbox(middle) gap(auto) pb(md)">
              <code class="badge(sm/muted)">
                heading({variant.name})
              </code>
              <span class="caption(xs) c(neutral-600)">{variant.usage}</span>
            </div>
            <div class="heading({variant.name}) c(neutral-900) pb(sm)">
              {variant.example}
            </div>
            <p class="caption(base) c(neutral-600)">{variant.description}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Title Role -->
    <div class="bg(neutral-50) r(2xl) p(3xl) b(1/neutral-200)">
      <div class="hbox(between/start) gap(xl)">
        <div>
          <div class="hbox(start) gap(sm) pb(md)">
            <div class="p(sm) r(lg) bg(primary) c(white)">
              <Tag size="xl" />
            </div>
            <h2 class="heading(h2) c(neutral-900)">Title</h2>
          </div>
          <p class="body(base) c(neutral-700) max-w(2xl)">
            Component identifiers for cards, modals, and UI elements. 
            Balanced weight and spacing for clear labeling without dominating.
          </p>
        </div>
        <code class="caption(base) bg(white) px(md) py(sm) r(lg) font(mono) c(neutral-800)">
          title(size)
        </code>
      </div>
      
      <div class="grid(3) gap(lg) pt(2xl)">
        {#each titleVariants as variant}
          <div 
            class="group p(lg) r(xl) bg(white) hover:shadow(lg) transition-all cursor(pointer) b(1/neutral-100) hover:b(1/primary-200)"
            on:click={() => copyCode(`title(${variant.name})`)}
          >
            <div class="hbox(middle) gap(auto) pb(sm)">
              <code class="badge(xs/primary)">
                title({variant.name})
              </code>
            </div>
            <h3 class="title({variant.name}) c(neutral-900) pb(xs) truncate">
              {variant.example}
            </h3>
            <p class="caption(xs) c(neutral-600)">{variant.usage}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Body Role -->
    <div class="bg(white) r(2xl) p(3xl) b(1/neutral-200)">
      <div class="hbox(between/start) gap(xl)">
        <div>
          <div class="hbox(start) gap(sm) pb(md)">
            <div class="p(sm) r(lg) bg(neutral-700) c(white)">
              <FileText size="xl" />
            </div>
            <h2 class="heading(h2) c(neutral-900)">Body</h2>
          </div>
          <p class="body(base) c(neutral-700) max-w(2xl)">
            Optimized for readability with generous line-height and comfortable spacing. 
            The workhorse of content presentation.
          </p>
        </div>
        <code class="caption(base) bg(neutral-100) px(md) py(sm) r(lg) font(mono) c(neutral-800)">
          body(size)
        </code>
      </div>
      
      <div class="vbox gap(lg) pt(2xl)">
        {#each bodyVariants as variant}
          <div 
            class="group p(xl) r(xl) bg(neutral-50) hover:shadow(lg) transition-all cursor(pointer) b(1/neutral-100) hover:b(1/neutral-300)"
            on:click={() => copyCode(`body(${variant.name})`)}
          >
            <div class="hbox(middle) gap(auto) pb(md)">
              <code class="badge(sm/muted)">
                body({variant.name})
              </code>
              <span class="caption(xs) c(neutral-600)">{variant.usage}</span>
            </div>
            <p class="body({variant.name}) c(neutral-800)">
              {variant.example}
            </p>
            <p class="caption(sm) c(neutral-600) pt(sm)">{variant.description}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Label Role -->
    <div class="bg(primary-50) r(2xl) p(3xl) b(1/neutral-200)">
      <div class="hbox(between/start) gap(xl)">
        <div>
          <div class="hbox(start) gap(sm) pb(md)">
            <div class="p(sm) r(lg) bg(primary) c(white)">
              <Tag size="xl" />
            </div>
            <h2 class="heading(h2) c(neutral-900)">Label</h2>
          </div>
          <p class="body(base) c(neutral-700) max-w(2xl)">
            Functional UI text for buttons, forms, and interactive elements. 
            Clear and concise with enhanced weight for small sizes.
          </p>
        </div>
        <code class="caption(base) bg(white) px(md) py(sm) r(lg) font(mono) c(neutral-800)">
          label(size)
        </code>
      </div>
      
      <div class="grid(3) gap(lg) pt(2xl)">
        {#each labelVariants as variant}
          <div 
            class="group p(lg) r(xl) bg(white) hover:shadow(lg) transition-all cursor(pointer) b(1/neutral-100) hover:b(1/primary-200)"
            on:click={() => copyCode(`label(${variant.name})`)}
          >
            <div class="label({variant.name}) c(neutral-900) pb(xs) block">
              {variant.example}
            </div>
            <p class="caption(xs) c(neutral-600)">{variant.usage}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Caption Role -->
    <div class="bg(neutral-50) r(2xl) p(3xl) b(1/neutral-300)">
      <div class="hbox(between/start) gap(xl)">
        <div>
          <div class="hbox(start) gap(sm) pb(md)">
            <div class="p(sm) r(lg) bg(neutral-600) c(white)">
              <Info size="xl" />
            </div>
            <h2 class="heading(h2) c(neutral-900)">Caption</h2>
          </div>
          <p class="body(base) c(neutral-700) max-w(2xl)">
            Supplementary information that doesn't compete for attention. 
            Intentionally subdued color and weight for supporting content.
          </p>
        </div>
        <code class="caption(base) bg(neutral-200) px(md) py(sm) r(lg) font(mono) c(neutral-800)">
          caption(size)
        </code>
      </div>
      
      <div class="grid(2) gap(lg) pt(2xl)">
        {#each captionVariants as variant}
          <div 
            class="group p(lg) r(xl) bg(white) hover:shadow(md) transition-all cursor(pointer) b(1/neutral-200) hover:b(1/neutral-400)"
            on:click={() => copyCode(`caption(${variant.name})`)}
          >
            <div class="hbox(middle) gap(auto) pb(sm)">
              <code class="badge(xs/muted)">
                caption({variant.name})
              </code>
              <span class="caption(xs) c(neutral-500)">{variant.usage}</span>
            </div>
            <p class="caption({variant.name})">
              {variant.example}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Typography Utilities -->
  <div class="grid(1) gap(xl)">
    <!-- Bold Utility -->
    <div class="bg(white) r(2xl) p(2xl) shadow(xl) shadow(neutral-200.5)">
      <div class="hbox(start) gap(sm) pb(xl)">
        <AlignLeft size="xl" class="c(primary)" />
        <h3 class="heading(h3) c(neutral-900)">Bold Utility</h3>
      </div>
      
      <p class="body(base) c(neutral-600) pb(xl)">
        Fine-tune font weights independently of typography roles
      </p>
      
      <div class="hbox gap(md) overflow-x(auto) pb(md)">
        {#each boldWeights as weight}
          <div 
            class="group p(lg) r(lg) hover:bg(neutral-50) transition cursor(pointer) bg(neutral-50) hover:bg(neutral-100) min-w(8xl) text(center)"
            on:click={() => copyCode(`bold(${weight.name})`)}
          >
            <div class="body(lg) bold({weight.name}) c(neutral-800) pb(md)">
              Aa
            </div>
            <code class="badge(xs/muted) block pb(xs)">
              bold({weight.name})
            </code>
            <span class="caption(xs) c(neutral-500) block">{weight.value}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Line Height Tokens -->
    <div class="bg(white) r(2xl) p(2xl) shadow(xl) shadow(neutral-200.5)">
      <div class="hbox(start) gap(sm) pb(xl)">
        <Minus size="xl" class="c(primary)" />
        <h3 class="heading(h3) c(neutral-900)">Line Height</h3>
      </div>
      
      <p class="body(base) c(neutral-600) pb(xl)">
        Control the vertical spacing between lines of text using the integrated font() syntax
      </p>
      
      <div class="grid(2) lg:grid(3) gap(lg)">
        {#each lineHeightTokens as token}
          <div 
            class="group p(lg) r(lg) bg(neutral-50) hover:bg(neutral-100) transition cursor(pointer)"
            on:click={() => copyCode(`font(base/${token.name})`)}
          >
            <div class="pb(md)">
              <p class="font(base/{token.name}) c(neutral-800)">
                {token.example}
              </p>
            </div>
            <code class="badge(xs/muted) block pb(xs)">
              font(base/{token.name})
            </code>
            <div class="hbox(middle) gap(auto) gap(sm)">
              <span class="caption(xs) c(neutral-500)">{token.value}</span>
              <span class="caption(xs) c(neutral-500)">{token.usage}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Letter Spacing Tokens -->
    <div class="bg(white) r(2xl) p(2xl) shadow(xl) shadow(neutral-200.5)">
      <div class="hbox(start) gap(sm) pb(xl)">
        <AlignLeft size="xl" class="c(primary)" />
        <h3 class="heading(h3) c(neutral-900)">Letter Spacing</h3>
      </div>
      
      <p class="body(base) c(neutral-600) pb(xl)">
        Adjust the horizontal spacing between characters using the integrated font() syntax
      </p>
      
      <div class="grid(2) lg:grid(3) gap(lg)">
        {#each letterSpacingTokens as token}
          <div 
            class="group p(lg) r(lg) bg(neutral-50) hover:bg(neutral-100) transition cursor(pointer)"
            on:click={() => copyCode(`font(lg/1.5/${token.name})`)}
          >
            <div class="pb(md) text(center)">
              <p class="font(lg/1.5/{token.name}) c(neutral-800)">
                Typography
              </p>
            </div>
            <code class="badge(xs/muted) block pb(xs) text(center)">
              font(lg/1.5/{token.name})
            </code>
            <div class="hbox(middle) gap(auto) gap(sm)">
              <span class="caption(xs) c(neutral-500)">{token.value}</span>
              <span class="caption(xs) c(neutral-500)">{token.usage}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Typography Tips -->
    <div class="bg(neutral-900) r(2xl) p(2xl) c(white)">
      <h3 class="heading(h3) c(white) pb(xl)">Pro Tips</h3>
      
      <div class="vbox gap(lg)">
        <div class="p(lg) bg(white.1) r(lg) backdrop-blur(sm)">
          <h4 class="title(sm) c(white) pb(sm)">Semantic HTML</h4>
          <p class="body(sm) c(white.9)">
            Always use the appropriate HTML element. <code class="bg(white.2) px(xs) r(sm)">heading(h1)</code> should be used with <code class="bg(white.2) px(xs) r(sm)">&lt;h1&gt;</code> tags.
          </p>
        </div>
        
        <div class="p(lg) bg(white.1) r(lg) backdrop-blur(sm)">
          <h4 class="title(sm) c(white) pb(sm)">Combine Utilities</h4>
          <p class="body(sm) c(white.9)">
            Mix typography roles with other utilities: <code class="bg(white.2) px(xs) r(sm)">display(hero) gradient hover:glow</code>
          </p>
        </div>
        
        <div class="p(lg) bg(white.1) r(lg) backdrop-blur(sm)">
          <h4 class="title(sm) c(white) pb(sm)">Responsive Typography</h4>
          <p class="body(sm) c(white.9)">
            Use responsive prefixes: <code class="bg(white.2) px(xs) r(sm)">display(base) md:display(lg)</code>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Typography Composition Examples -->
  <div class="bg(neutral-900) r(2xl) p(3xl) c(white)">
    <h2 class="heading(h1) c(white) pb(xl) text(center)">Typography in Action</h2>
    <p class="body(lg) c(neutral-300) text(center) max-w(4xl) mx(auto) pb(3xl)">
      See how different typography roles work together to create beautiful, functional interfaces
    </p>

    <div class="grid(3) gap(xl)">
      <!-- Card Example -->
      <div class="bg(white) r(xl) p(xl) c(neutral-900)">
        <div class="caption(xs) uppercase c(primary) pb(sm)">Article</div>
        <h3 class="title(card) pb(sm)">Getting Started with AdorableCSS</h3>
        <p class="body(sm) c(neutral-700) pb(md)">
          Learn the fundamentals of our intuitive CSS framework and start building beautiful interfaces in minutes.
        </p>
        <div class="hbox(middle) gap(auto)">
          <span class="caption(base)">5 min read</span>
          <span class="label(button) c(primary)">Read More →</span>
        </div>
      </div>

      <!-- Form Example -->
      <div class="bg(white) r(xl) p(xl) c(neutral-900)">
        <h3 class="title(modal) pb(lg)">Create Account</h3>
        <div class="vbox gap(md)">
          <div>
            <label class="label(input) required">Email Address</label>
            <div class="pt(xs) p(md) r(lg) b(1/neutral-300) body(base) c(neutral-500)">
              name@example.com
            </div>
            <p class="caption(form) help pt(xs)">We'll never share your email</p>
          </div>
          <button class="p(md) r(lg) bg(primary) c(white) label(button) hover:bg(primary-700) transition">
            Continue
          </button>
        </div>
      </div>

      <!-- Feature Card -->
      <div class="bg(white) r(xl) p(xl) c(neutral-900)">
        <div class="badge(xs/success) inline-block pb(md)">NEW</div>
        <h3 class="title(lg) pb(sm)">Dark Mode Support</h3>
        <p class="body(base) c(neutral-700) pb(md)">
          Built-in dark mode with automatic theme detection and smooth transitions.
        </p>
        <div class="caption(hint) italic">
          Available in v2.0+
        </div>
      </div>
    </div>
  </div>

  <!-- Copy Feedback -->
  {#if copiedCode}
    <div class="fixed bottom(xl) right(xl) bg(success) c(white) px(lg) py(md) r(lg) shadow(xl) animate(fade-in-up)">
      Copied: {copiedCode}
    </div>
  {/if}
</div>

<style>
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(var(--spacing-xl));
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