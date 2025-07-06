<script lang="ts">
  import { defaultTokens, generateFontCalc } from 'adorable-css';
  
  // Typography Primitive Components from AdorableCSS
  const typographyComponents = [
    {
      name: 'Display',
      description: 'Maximum visual impact for heroes and marketing',
      baseStyles: 'balance text-wrap',
      sizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', 'hero', 'banner', 'splash'],
      variants: ['light', 'thin', 'gradient', 'rainbow', 'chrome', 'serif', 'mono', 'shadow', 'outline', 'glow', 'split'],
      usage: 'Hero sections, landing pages, marketing banners',
      example: 'display(hero) display(gradient)'
    },
    {
      name: 'Heading',
      description: 'Semantic HTML headings for document structure',
      baseStyles: 'c(gray-900) relative position',
      sizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      variants: ['muted', 'primary', 'gradient', 'rainbow', 'serif', 'mono', 'underline', 'shadow', 'outline'],
      usage: 'Page titles, section headers, document structure',
      example: 'heading(h1) heading(primary)'
    },
    {
      name: 'Title',
      description: 'Component identification and labeling',
      baseStyles: 'c(gray-900)',
      sizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', 'card', 'modal', 'section'],
      variants: ['muted', 'primary', 'gradient', 'serif', 'mono', 'truncate', 'clamp', 'underline'],
      usage: 'Card titles, modal headers, section names',
      example: 'title(card) title(truncate)'
    },
    {
      name: 'Body', 
      description: 'Optimized for reading and content consumption',
      baseStyles: 'c(secondary) transition-colors',
      sizes: ['xs', 'sm', 'base', 'lg', 'xl', 'article', 'prose', 'compact', 'relaxed'],
      variants: ['muted', 'secondary', 'primary', 'success', 'warning', 'danger', 'serif', 'mono', 'contrast', 'soft', 'lead', 'quote', 'highlight'],
      usage: 'Articles, paragraphs, long-form content',
      example: 'body(prose) body(serif)'
    },
    {
      name: 'Label',
      description: 'Functional UI text for interactive elements',
      baseStyles: 'c(secondary) select-none',
      sizes: ['xs', 'sm', 'base', 'lg', 'xl', 'button', 'input', 'tab', 'badge', 'tooltip'],
      variants: ['muted', 'primary', 'strong', 'subtle', 'mono', 'uppercase', 'capitalize', 'required', 'optional', 'helper', 'clickable'],
      usage: 'Form labels, button text, UI elements',
      example: 'label(button) label(uppercase)'
    },
    {
      name: 'Caption',
      description: 'Supplementary information and metadata',
      baseStyles: 'c(mute)',
      sizes: ['xs', 'sm', 'base', 'lg', 'figure', 'table', 'form', 'hint', 'timestamp'],
      variants: ['muted', 'primary', 'success', 'warning', 'danger', 'info', 'italic', 'serif', 'mono', 'error', 'help', 'note', 'inline', 'block', 'floating'],
      usage: 'Image captions, help text, timestamps',
      example: 'caption(figure) caption(italic)'
    },
    {
      name: 'Code',
      description: 'Code snippets and technical content',
      baseStyles: 'mono',
      sizes: ['xs', 'sm', 'md', 'lg', 'base', 'inline', 'block', 'minimal'],
      variants: ['primary', 'success', 'warning', 'error'],
      usage: 'Inline code, code blocks, technical documentation',
      example: 'code(inline) code(primary)'
    }
  ];

  // Font size scales - now using dynamic calc system
  const fontSizeTokens = ['4xs', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
  const fontSizes = fontSizeTokens.map(size => ({
    name: size,
    value: generateFontCalc(size),
    class: `text(${size})`,
    usage: getFontSizeUsage(size)
  }));

  // Font weights from adorable-css
  const fontWeights = Object.entries(defaultTokens.fontWeight).map(([weight, value]) => ({
    name: weight,
    value,
    class: `bold(${weight})`,
    usage: getFontWeightUsage(weight)
  }));

  // Line heights from adorable-css
  const lineHeights = Object.entries(defaultTokens.lineHeight).map(([height, value]) => ({
    name: height,
    value,
    class: `leading(${height})`,
    usage: getLineHeightUsage(height)
  }));

  // Letter spacing from adorable-css
  const letterSpacings = Object.entries(defaultTokens.letterSpacing).map(([spacing, value]) => ({
    name: spacing,
    value,
    class: `tracking(${spacing})`,
    usage: getLetterSpacingUsage(spacing)
  }));

  // Text hierarchy - common text color patterns
  const textHierarchyData = {
    'primary': 'gray-900',
    'secondary': 'gray-700', 
    'muted': 'gray-500',
    'disabled': 'gray-400',
    'placeholder': 'gray-400',
    'success': 'emerald-600',
    'warning': 'amber-600',
    'error': 'red-600',
    'info': 'blue-600'
  };

  const textHierarchy = Object.entries(textHierarchyData).map(([token, color]) => ({
    name: getTextHierarchyName(token),
    token,
    color,
    class: `c(${color})`,
    usage: getTextHierarchyUsage(token)
  }));

  function getFontSizeUsage(size: string): string {
    const usageMap: Record<string, string> = {
      '4xs': 'Micro text, legal disclaimers',
      '3xs': 'Ultra small labels',
      '2xs': 'Very small captions',
      'xs': 'Small labels, captions',
      'sm': 'Secondary text, small UI',
      'md': 'Body text (default)',
      'lg': 'Large body text',
      'xl': 'Small headings',
      '2xl': 'Medium headings',
      '3xl': 'Large headings',
      '4xl': 'Display text',
      '5xl': 'Hero text',
      '6xl': 'Large hero text',
      '7xl': 'Extra large display',
      '8xl': 'Massive display',
      '9xl': 'Ultra large display'
    };
    return usageMap[size] || 'Custom usage';
  }

  function getFontWeightUsage(weight: string): string {
    const usageMap: Record<string, string> = {
      'thin': 'Ultra light decorative text',
      'extralight': 'Very light text',
      'light': 'Light body text',
      'normal': 'Regular body text',
      'medium': 'Emphasized text',
      'semi': 'Subheadings',
      'bold': 'Headings, strong emphasis',
      'extra': 'Heavy emphasis',
      'black': 'Maximum impact text'
    };
    return usageMap[weight] || 'Custom usage';
  }

  function getLineHeightUsage(height: string): string {
    const usageMap: Record<string, string> = {
      'none': 'Tight headings, display text',
      'tight': 'Compact headings',
      'snug': 'Subheadings',
      'normal': 'Body text (default)',
      'relaxed': 'Comfortable reading',
      'loose': 'Spacious text blocks'
    };
    return usageMap[height] || 'Custom usage';
  }

  function getLetterSpacingUsage(spacing: string): string {
    const usageMap: Record<string, string> = {
      'tighter': 'Compact display text',
      'tight': 'Condensed headings',
      'normal': 'Regular text (default)',
      'wide': 'Spaced headings',
      'wider': 'Loose display text',
      'widest': 'Ultra wide spacing'
    };
    return usageMap[spacing] || 'Custom usage';
  }

  function getTextHierarchyName(token: string): string {
    const nameMap: Record<string, string> = {
      'primary': 'Primary Text',
      'secondary': 'Secondary Text', 
      'muted': 'Muted Text',
      'disabled': 'Disabled Text',
      'placeholder': 'Placeholder Text',
      'success': 'Success Text',
      'warning': 'Warning Text',
      'error': 'Error Text',
      'info': 'Info Text'
    };
    return nameMap[token] || token;
  }

  function getTextHierarchyUsage(token: string): string {
    const usageMap: Record<string, string> = {
      'primary': 'Main headings, important content',
      'secondary': 'Subheadings, secondary content',
      'muted': 'Body text, descriptions',
      'disabled': 'Disabled states, inactive text',
      'placeholder': 'Form placeholders, hints',
      'success': 'Success messages, confirmations',
      'warning': 'Warning messages, cautions',
      'error': 'Error messages, validation',
      'info': 'Information messages, tips'
    };
    return usageMap[token] || 'Custom usage';
  }

  function copyTypographyCSS() {
    const css = `/* AdorableCSS Typography Foundation */
:root {
  /* Typography scales */
  ${Object.entries(defaultTokens.font).map(([size, value]) => `  --font-${size}: ${value};`).join('\n')}
  
  /* Font weights */
  ${Object.entries(defaultTokens.fontWeight).map(([weight, value]) => `  --font-weight-${weight}: ${value};`).join('\n')}
  
  /* Line heights */
  ${Object.entries(defaultTokens.lineHeight).map(([height, value]) => `  --line-height-${height}: ${value};`).join('\n')}
  
  /* Letter spacing */
  ${Object.entries(defaultTokens.letterSpacing).map(([spacing, value]) => `  --letter-spacing-${spacing}: ${value};`).join('\n')}
}`;
    
    navigator.clipboard.writeText(css);
  }
</script>

<div class="vbox(center) py(9xl) container(3xl) gap(15vh)">
  <div class="max-w(7xl) vbox gap(20vh)">
    <!-- Header -->
    <div class="vbox gap(4xl)">
      <h1 class="display(5xl) bold(black) tracking(tighter) c(black) leading(none)">
        TYPOGRAPHY
      </h1>
      
      <p class="text(2xl) c(mute) bold(light) leading(relaxed) max-w(5xl)">
        A comprehensive type system designed for clarity, hierarchy, and accessibility across all digital interfaces
      </p>
      
      <!-- Stats -->
      <div class="hbox gap(8xl) pt(4xl)">
        <div class="vbox gap(2xl)">
          <div class="display(4xl) bold(black) c(black) leading(none)">{fontSizeTokens.length}</div>
          <div class="text(md) c(mute) uppercase tracking(widest) bold(medium)">FONT SIZES</div>
        </div>
        <div class="vbox gap(2xl)">
          <div class="display(4xl) bold(black) c(black) leading(none)">{Object.keys(defaultTokens.fontWeight).length}</div>
          <div class="text(md) c(mute) uppercase tracking(widest) bold(medium)">WEIGHTS</div>
        </div>
      </div>
    </div>

    <!-- Typography Components Overview -->
    <section class="vbox gap(6xl)">
      <div class="vbox gap(3xl) pb(6xl)">
        <h2 class="display(3xl) bold(black) c(black) tracking(tight) leading(none)">
          TYPOGRAPHY<br>SYSTEM
        </h2>
        <p class="text(lg) c(mute) bold(light) max-w(4xl)">
          Seven specialized components with comprehensive scales and variants
        </p>
      </div>
      
      <div class="vbox gap(12xl)">
        {#each typographyComponents as component, index}
          <div class="vbox gap(6xl) pb(12xl) {index !== typographyComponents.length - 1 ? 'border-b(2/mute.10)' : ''}">
            <!-- Component Header -->
            <div class="hbox(baseline) gap(4xl)">
              <div class="text(xs) bold(black) uppercase tracking(widest) c(mute) w(6xl)">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div class="vbox gap(lg)">
                <h3 class="display(lg) bold(black) c(black) tracking(tight)">
                  {component.name.toUpperCase()}
                </h3>
                <p class="text(md) c(secondary) bold(light)">
                  {component.description}
                </p>
              </div>
            </div>
            
            <!-- Sizes Scale -->
            <div class="vbox gap(3xl)">
              <h4 class="title(md) bold uppercase tracking(wide)">SIZES</h4>
              <div class="vbox gap(2xl)">
                {#each component.sizes as size}
                  <div class="hbox gap(4xl)">
                    <code class="text(sm) font(mono) c(mute) w(6xl)">{size}</code>
                    {#if component.name === 'Display'}
                      <div class="display({size}) c(gray-900)">Display {size}</div>
                    {:else if component.name === 'Heading'}
                      <div class="heading({size}) c(gray-900)">Heading {size}</div>
                    {:else if component.name === 'Title'}
                      <div class="title({size}) c(gray-900)">Title {size}</div>
                    {:else if component.name === 'Body'}
                      <div class="body({size}) c(gray-800)">Body text in {size} size</div>
                    {:else if component.name === 'Label'}
                      <div class="label({size}) c(gray-700)">Label {size}</div>
                    {:else if component.name === 'Caption'}
                      <div class="caption({size}) c(gray-600)">Caption {size}</div>
                    {:else if component.name === 'Code'}
                      <code class="code({size}) c(gray-800)">code({size})</code>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
            
            <!-- Variants -->
            <div class="vbox gap(3xl)">
              <h4 class="title(md) bold uppercase tracking(wide)">VARIANTS</h4>
              <div class="grid(3) gap(3xl)">
                {#each component.variants as variant}
                  <div class="vbox gap(lg)">
                    <code class="text(xs) font(mono) c(mute)">{variant}</code>
                    {#if component.name === 'Display'}
                      <div class="display(lg) display({variant})">Display</div>
                    {:else if component.name === 'Heading'}
                      <h3 class="heading(h3) heading({variant})">Heading</h3>
                    {:else if component.name === 'Title'}
                      <div class="title(lg) title({variant})">Title Text</div>
                    {:else if component.name === 'Body'}
                      <p class="body(base) body({variant})">Body text with {variant} variant</p>
                    {:else if component.name === 'Label'}
                      <span class="label(base) label({variant})">Label</span>
                    {:else if component.name === 'Caption'}
                      <span class="caption(base) caption({variant})">Caption text</span>
                    {:else if component.name === 'Code'}
                      <code class="code(base) code({variant})">code</code>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Type Scale -->
    <section class="vbox gap(8xl) pt(10vh)">
      <div class="vbox gap(3xl) pb(6xl)">
        <h2 class="display(3xl) bold(black) c(black) tracking(tight) leading(none)">
          TYPE SCALE
        </h2>
        <p class="text(lg) c(mute) bold(light) max-w(4xl)">
          Mathematical progression from {fontSizeTokens.length} font sizes
        </p>
      </div>
      
      <div class="grid(2) gap(6xl)">
        <!-- Font Sizes -->
        <div class="vbox gap(3xl)">
          <h3 class="title(lg) bold">Font Sizes</h3>
          <div class="vbox gap(2xl)">
            {#each fontSizes as fontSize}
              <div class="hbox(baseline) gap(4xl)">
                <code class="text(xs) font(mono) c(mute) w(4xl)">{fontSize.name}</code>
                <div class="{fontSize.class} c(black) leading(tight)">
                  Aa
                </div>
                <code class="text(xs) font(mono) c(mute.60)" style="font-size: 0.65rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 300px;">{fontSize.value}</code>
              </div>
            {/each}
          </div>
        </div>
        
        <!-- Font Weights -->
        <div class="vbox gap(3xl)">
          <h3 class="title(lg) bold">Font Weights</h3>
          <div class="vbox gap(2xl)">
            {#each fontWeights as fontWeight}
              <div class="hbox(center) gap(4xl)">
                <code class="text(xs) font(mono) c(mute) w(5xl)">{fontWeight.name}</code>
                <div class="text(2xl) {fontWeight.class} c(black)">
                  Aa
                </div>
                <code class="text(xs) font(mono) c(mute.60)">{fontWeight.value}</code>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <!-- Typography Combinations -->
    <section class="vbox gap(8xl) pt(10vh)">
      <div class="vbox gap(3xl) pb(6xl)">
        <h2 class="display(3xl) bold(black) c(black) tracking(tight) leading(none)">
          TYPOGRAPHY<br>COMBINATIONS
        </h2>
        <p class="text(lg) c(mute) bold(light) max-w(4xl)">
          Real-world examples combining multiple typography components and variants
        </p>
      </div>
      
      <div class="vbox gap(12xl)">
        <!-- Hero Section -->
        <div class="vbox gap(6xl) p(6xl) bg(surface) r(2xl)">
          <div class="text(xs) bold(black) uppercase tracking(widest) c(mute.50)">
            01 — HERO SECTION
          </div>
          
          <div class="vbox gap(4xl)">
            <div class="hbox gap(lg)">
              <span class="label(badge) label(uppercase) px(md) py(xs) bg(black) c(white)">NEW</span>
              <span class="label(badge) label(muted) px(md) py(xs)">Limited Time</span>
            </div>
            <h1 class="display(hero) display(gradient)">
              Build Faster.<br>Ship Better.
            </h1>
            <p class="body(lead) body(muted) max-w(3xl)">
              Ship beautiful interfaces with confidence using our comprehensive design system
            </p>
            <div class="hbox gap(xl)">
              <button class="label(button) label(uppercase) px(3xl) py(xl) bg(black) c(white)">
                Start Free Trial
              </button>
              <button class="label(button) label(clickable) px(3xl) py(xl)">
                View Demo
              </button>
            </div>
            <div class="caption(base) caption(muted)">
              No credit card required • <code class="code(inline) code(minimal)">14-day</code> free trial
            </div>
          </div>
        </div>
        
        <!-- Product Feature -->
        <div class="vbox gap(6xl) p(6xl) bg(black) c(white) r(2xl)">
          <div class="text(xs) bold(black) uppercase tracking(widest) c(mute.50)">
            02 — PRODUCT FEATURE
          </div>
          
          <div class="grid(2) gap(6xl)">
            <div class="vbox gap(3xl)">
              <div class="caption(base) caption(primary) uppercase tracking(widest)">Lightning Fast</div>
              <h2 class="display(2xl) display(thin)">Performance First</h2>
              <p class="body(lg) body(soft)">
                Built for speed from the ground up. Every component is optimized 
                for maximum performance and minimal bundle size.
              </p>
              <ul class="vbox gap(lg)">
                <li class="body(base) body(highlight)">• 50ms First Contentful Paint</li>
                <li class="body(base) body(highlight)">• 99/100 Lighthouse Score</li>
                <li class="body(base) body(highlight)">• Zero Runtime Dependencies</li>
              </ul>
            </div>
            <div class="vbox gap(2xl) p(3xl) bg(surface-alt)">
              <pre class="code(block)">// Blazing fast imports
import {'{'}
  display,
  heading,
  body
} from 'adorable-css'</pre>
              <div class="caption(form) caption(info)">
                Average bundle size: <code class="code(inline) code(success)">12kb gzipped</code>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Blog Post -->
        <div class="vbox gap(6xl) p(6xl) bg(surface) r(2xl)">
          <div class="text(xs) bold(black) uppercase tracking(widest) c(mute.50)">
            03 — BLOG POST
          </div>
          
          <article class="vbox gap(3xl) max-w(5xl)">
            <header class="vbox gap(2xl)">
              <div class="hbox gap(xl)">
                <span class="label(badge) px(md) py(xs) bg(accent.10) c(accent)">Tutorial</span>
                <span class="caption(timestamp) caption(muted)">15 min read</span>
              </div>
              <h1 class="heading(h1)">Understanding Typography in Digital Design</h1>
              <div class="hbox gap(xl)">
                <div class="caption(base)">By <span class="caption(base) caption(primary)">Sarah Chen</span></div>
                <div class="caption(base) caption(muted)">•</div>
                <div class="caption(timestamp) caption(muted)">March 15, 2024</div>
              </div>
            </header>
            
            <div class="vbox gap(3xl)">
              <p class="body(article) body(serif)">
                Typography is the art and technique of arranging type to make written language 
                legible, readable, and appealing when displayed. The arrangement of type involves 
                selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.
              </p>
              
              <h2 class="heading(h2)">The Foundation of Good Design</h2>
              
              <p class="body(article) body(secondary)">
                Good typography establishes a strong visual hierarchy, provides a graphic balance 
                to the website, and sets the product's overall tone. Typography should guide and 
                inform your users, optimize readability and accessibility.
              </p>
              
              <blockquote class="body(quote) pl(2xl) border-l(4/accent.30)">
                "Typography is what language looks like."
                <cite class="caption(base) caption(italic) mt(lg) block">— Ellen Lupton</cite>
              </blockquote>
              
              <div class="vbox gap(lg) p(xl) bg(accent.10)">
                <h3 class="title(base) title(black)">Key Takeaways</h3>
                <ul class="vbox gap(md)">
                  <li class="body(base)">• Choose typefaces that reflect your brand personality</li>
                  <li class="body(base)">• Establish clear hierarchy with size and weight</li>
                  <li class="body(base)">• Maintain consistent spacing throughout</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
        
        <!-- Dashboard Widget -->
        <div class="vbox gap(6xl) p(6xl) bg(white) r(2xl) shadow(xl)">
          <div class="text(xs) bold(black) uppercase tracking(widest) c(mute.50)">
            04 — DASHBOARD WIDGET
          </div>
          
          <div class="grid(3) gap(3xl)">
            <!-- Stat Card -->
            <div class="vbox gap(xl) p(2xl) bg(surface)">
              <div class="hbox(between)">
                <div class="caption(base) caption(muted) uppercase">Revenue</div>
                <span class="caption(base) caption(success)">↑ 12%</span>
              </div>
              <div class="display(xl) bold(black)">$45.2K</div>
              <div class="caption(sm) caption(muted)">vs last month</div>
            </div>
            
            <!-- Activity Feed -->
            <div class="vbox gap(xl) p(2xl) bg(surface)">
              <h3 class="title(base) bold">Recent Activity</h3>
              <div class="vbox gap(lg)">
                <div class="vbox gap(xs)">
                  <div class="label(sm) label(strong)">New user registered</div>
                  <div class="caption(timestamp) caption(muted)">2 minutes ago</div>
                </div>
                <div class="vbox gap(xs)">
                  <div class="label(sm) label(strong)">Payment received</div>
                  <div class="caption(timestamp) caption(muted)">5 minutes ago</div>
                </div>
              </div>
            </div>
            
            <!-- Status Card -->
            <div class="vbox gap(xl) p(2xl) bg(surface)">
              <h3 class="title(base) bold">System Status</h3>
              <div class="vbox gap(md)">
                <div class="hbox gap(md)">
                  <div class="w(sm) h(sm) bg(success) r(full)"></div>
                  <span class="label(sm)">API</span>
                  <code class="code(inline) code(success)">operational</code>
                </div>
                <div class="hbox gap(md)">
                  <div class="w(sm) h(sm) bg(warning) r(full)"></div>
                  <span class="label(sm)">CDN</span>
                  <code class="code(inline) code(warning)">degraded</code>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- E-commerce Product -->
        <div class="vbox gap(6xl) p(6xl) bg(surface) r(2xl)">
          <div class="text(xs) bold(black) uppercase tracking(widest) c(mute.50)">
            05 — E-COMMERCE
          </div>
          
          <div class="grid(2) gap(4xl)">
            <div class="vbox gap(3xl)">
              <div class="vbox gap(xl)">
                <div class="hbox gap(md)">
                  <span class="label(badge) px(sm) py(xs) bg(error.10) c(error)">Sale</span>
                  <span class="label(badge) px(sm) py(xs) bg(surface-alt) c(secondary)">Limited Stock</span>
                </div>
                <h1 class="display(xl) bold">Premium Wireless Headphones</h1>
                <div class="hbox(baseline) gap(xl)">
                  <span class="display(lg) c(black)">$199</span>
                  <span class="title(lg) c(mute) line-through">$299</span>
                  <span class="caption(base) caption(error)">Save 33%</span>
                </div>
              </div>
              
              <p class="body(lg) body(secondary)">
                Experience crystal-clear audio with our premium noise-cancelling headphones. 
                Featuring 40-hour battery life and superior comfort for all-day wear.
              </p>
              
              <div class="vbox gap(lg)">
                <label class="label(input) label(required)">Select Color</label>
                <div class="hbox gap(md)">
                  <button class="px(lg) py(md) border(2/black)">Black</button>
                  <button class="px(lg) py(md) border(1/mute.30)">Silver</button>
                  <button class="px(lg) py(md) border(1/gray-300)">Gold</button>
                </div>
              </div>
              
              <button class="label(button) label(uppercase) px(4xl) py(xl) bg(black) c(white) w(full)">
                Add to Cart
              </button>
              
              <div class="caption(form) caption(help) text(center)">
                Free shipping on orders over $50
              </div>
            </div>
          </div>
        </div>
        
        <!-- Documentation -->
        <div class="vbox gap(6xl) p(6xl) bg(white) r(2xl) shadow(xl)">
          <div class="text(xs) bold(black) uppercase tracking(widest) c(mute.50)">
            06 — DOCUMENTATION
          </div>
          
          <div class="vbox gap(4xl) max-w(5xl)">
            <nav class="vbox gap(lg)">
              <div class="caption(base) caption(muted) uppercase tracking(wider)">On this page</div>
              <div class="vbox gap(md) pl(xl) border-l(2/mute.20)">
                <a class="body(base) body(clickable)">Getting Started</a>
                <a class="body(base) body(black)">Installation</a>
                <a class="body(base) body(clickable)">Basic Usage</a>
              </div>
            </nav>
            
            <div class="vbox gap(3xl)">
              <section class="vbox gap(2xl)">
                <h1 class="heading(h1)">Installation</h1>
                
                <div class="vbox gap(xl) p(xl) bg(gray-900) c(white)">
                  <div class="hbox(between)">
                    <code class="code(sm) code(primary)">npm install</code>
                    <button class="caption(base) caption(clickable)">Copy</button>
                  </div>
                  <pre class="code(block)">npm install adorable-css</pre>
                </div>
                
                <div class="vbox gap(lg) p(lg) bg(info.10) border-l(4/info)">
                  <div class="label(base) label(strong) c(info)">Pro Tip</div>
                  <p class="body(base) c(info.80)">
                    Use the <code class="code(inline) code(primary)">--save-dev</code> flag 
                    if you're using a build process.
                  </p>
                </div>
              </section>
              
              <section class="vbox gap(2xl)">
                <h2 class="heading(h2)">Basic Usage</h2>
                <p class="body(base) body(secondary)">
                  Import the components you need and start building beautiful typography.
                </p>
                
                <table class="w(full)">
                  <thead>
                    <tr class="border-b(2/mute.20)">
                      <th class="label(base) label(uppercase) py(md) text(left)">Component</th>
                      <th class="label(base) label(uppercase) py(md) text(left)">Usage</th>
                      <th class="label(base) label(uppercase) py(md) text(left)">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b(1/mute.10)">
                      <td class="py(md)"><code class="code(inline)">display</code></td>
                      <td class="caption(base) py(md)">Hero text</td>
                      <td class="py(md)"><span class="label(sm) label(mono)">display(hero)</span></td>
                    </tr>
                    <tr class="border-b(1/mute.10)">
                      <td class="py(md)"><code class="code(inline)">heading</code></td>
                      <td class="caption(base) py(md)">Document structure</td>
                      <td class="py(md)"><span class="label(sm) label(mono)">heading(h1)</span></td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>