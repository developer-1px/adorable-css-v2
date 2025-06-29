<script lang="ts">
  import { defaultTokens } from 'adorable-css';
  import { Type, Hash, AlignLeft, Minus, Heading1 } from 'lucide-svelte';
  
  // Heading component variants
  const headingVariants = [
    { name: 'hero', example: 'Hero', description: 'Ultra-large hero text for landing pages' },
    { name: 'display', example: 'Display', description: 'Large display headlines' },
    { name: 'h1', example: 'Heading 1', description: 'Primary page titles' },
    { name: 'h2', example: 'Heading 2', description: 'Section headers' },
    { name: 'h3', example: 'Heading 3', description: 'Subsection titles' },
    { name: 'h4', example: 'Heading 4', description: 'Component titles' },
    { name: 'h5', example: 'Heading 5', description: 'Small headings' },
    { name: 'h6', example: 'Heading 6', description: 'Caption headers' }
  ];
  
  // Text utility variants
  const textVariants = [
    { name: 'xs', example: 'Extra small text for captions and metadata', size: '0.75rem' },
    { name: 'sm', example: 'Small text for secondary information', size: '0.875rem' },
    { name: 'base', example: 'Base text size for body content and paragraphs', size: '1rem' },
    { name: 'lg', example: 'Large text for emphasis and lead paragraphs', size: '1.125rem' },
    { name: 'xl', example: 'Extra large text for standout content', size: '1.25rem' },
    { name: '2xl', example: 'Double extra large for headlines', size: '1.5rem' },
    { name: '3xl', example: 'Triple extra large for major headings', size: '1.875rem' }
  ];
  
  // Essential font weights only
  const essentialWeights = [
    { name: 'normal', value: '400', description: 'Regular text' },
    { name: 'medium', value: '500', description: 'Medium emphasis' },
    { name: 'semibold', value: '600', description: 'Strong emphasis' },
    { name: 'bold', value: '700', description: 'Bold headings' }
  ];
</script>

<div class="vbox gap(4xl)">
  <!-- Section Header -->
  <div class="text(center)">
    <div class="hbox(center) gap(sm) mb(xl)">
      <Type size="24" class="c(indigo-600)" />
      <h2 class="heading(display) c(gray-900)">Typography</h2>
    </div>
    <p class="text(lg) c(gray-600) max-w(2xl) mx(auto)">
      A carefully crafted type system that scales beautifully from mobile to desktop, 
      ensuring perfect readability at every size
    </p>
  </div>

  <!-- Heading Components -->
  <div class="bg(white) r(2xl) shadow(xl) shadow(gray-200.5) overflow(hidden)">
    <div class="p(2xl) border-b(1px/gray-100)">
      <div class="hbox(between/middle) mb(xl)">
        <div>
          <h3 class="heading(h2) c(gray-900) mb(xs)">Heading Components</h3>
          <p class="text(sm) c(gray-600)">Semantic heading utilities with perfect typography scaling</p>
        </div>
        <Heading1 size="20" class="c(gray-400)" />
      </div>
      
      <div class="vbox gap(lg)">
        {#each headingVariants as { name, example, description }}
          <div class="group p(xl) r(xl) bg(gray-50) hover:bg(indigo-50) transition-all hover:shadow(lg) hover:shadow(indigo-100.5)">
            <div class="hbox(between/middle) gap(2xl)">
              <div class="min-w(180px)">
                <code class="text(xs) px(sm) py(xs) r(md) bg(indigo-600) c(white) inline-block mb(xs)">
                  heading({name})
                </code>
                <div class="text(xs) c(gray-500)">{description}</div>
              </div>
              <div class="flex(1) min-w(0) text(left)">
                <div class="heading({name}) c(gray-900) group-hover:c(indigo-900) transition">
                  {example}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Text Utilities -->
  <div class="bg(white) r(2xl) shadow(xl) shadow(gray-200.5) overflow(hidden)">
    <div class="p(2xl)">
      <div class="hbox(between/middle) mb(xl)">
        <div>
          <h3 class="heading(h2) c(gray-900) mb(xs)">Text Utilities</h3>
          <p class="text(sm) c(gray-600)">Flexible text sizing for content and UI elements</p>
        </div>
        <Hash size="20" class="c(gray-400)" />
      </div>
      
      <div class="vbox gap(lg)">
        {#each textVariants as { name, example, size }}
          <div class="group p(lg) r(lg) bg(gray-50) hover:bg(purple-50) transition-all hover:shadow(md)">
            <div class="hbox(between/middle) gap(xl)">
              <div class="min-w(120px)">
                <code class="text(xs) px(sm) py(xs) r(md) bg(purple-600) c(white) inline-block mb(xs)">
                  text({name})
                </code>
                <div class="text(xs) c(gray-500) font(mono)">{size}</div>
              </div>
              <div class="flex(1) min-w(0)">
                <div class="text({name}) c(gray-800) group-hover:c(purple-900) transition">
                  {example}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Typography Features Grid -->
  <div class="grid(3) gap(xl)">
    <!-- Bold Utility -->
    <div class="bg(white) r(2xl) p(xl) shadow(lg) shadow(gray-200.5)">
      <div class="hbox(start) gap(sm) mb(lg)">
        <AlignLeft size="16" class="c(indigo-600)" />
        <h4 class="heading(h4) c(gray-900)">Bold Utility</h4>
      </div>
      
      <div class="vbox gap(md)">
        {#each essentialWeights as { name, value, description }}
          <div class="group p(sm) r(lg) hover:bg(gray-50) transition">
            <div class="hbox(between) mb(xs)">
              <code class="text(xs) px(xs) py(xs) r(sm) bg(gray-100) c(gray-700)">
                bold({name})
              </code>
              <span class="text(xs) c(gray-500)">{value}</span>
            </div>
            <div class="text(sm) bold({name}) c(gray-800)">
              {description}
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Text Alignment -->
    <div class="bg(white) r(2xl) p(xl) shadow(lg) shadow(gray-200.5)">
      <div class="hbox(start) gap(sm) mb(lg)">
        <Minus size="16" class="c(purple-600)" />
        <h4 class="heading(h4) c(gray-900)">Text Alignment</h4>
      </div>
      
      <div class="vbox gap(md)">
        <div class="group p(sm) r(lg) hover:bg(gray-50) transition">
          <code class="text(xs) px(xs) py(xs) r(sm) bg(purple-100) c(purple-700) mb(xs) inline-block">
            text(left)
          </code>
          <div class="text(sm) text(left) c(gray-700)">Left aligned text</div>
        </div>
        <div class="group p(sm) r(lg) hover:bg(gray-50) transition">
          <code class="text(xs) px(xs) py(xs) r(sm) bg(purple-100) c(purple-700) mb(xs) inline-block">
            text(center)
          </code>
          <div class="text(sm) text(center) c(gray-700)">Center aligned text</div>
        </div>
        <div class="group p(sm) r(lg) hover:bg(gray-50) transition">
          <code class="text(xs) px(xs) py(xs) r(sm) bg(purple-100) c(purple-700) mb(xs) inline-block">
            text(right)
          </code>
          <div class="text(sm) text(right) c(gray-700)">Right aligned text</div>
        </div>
      </div>
    </div>
    
    <!-- Typography Tips -->
    <div class="bg(to-br/indigo-50..purple-50) r(2xl) p(xl) border(1px/indigo-200)">
      <h4 class="heading(h4) c(indigo-900) mb(lg)">Typography Tips</h4>
      <div class="vbox gap(sm) text(sm) c(indigo-800)">
        <p>• Use <code class="bg(indigo-100) px(xs) r(sm)">heading()</code> for semantic structure</p>
        <p>• Combine <code class="bg(indigo-100) px(xs) r(sm)">text()</code> with <code class="bg(indigo-100) px(xs) r(sm)">bold()</code> for emphasis</p>
        <p>• <code class="bg(indigo-100) px(xs) r(sm)">text()</code> handles both sizing and alignment</p>
        <p>• Perfect for both content and UI typography</p>
      </div>
    </div>
  </div>


  <!-- Typography in Action -->
  <div class="bg(135deg/indigo-600..purple-600) r(2xl) p(3xl) text(center) c(white)">
    <h3 class="heading(h1) mb(2xl)">Typography Showcase</h3>
    
    <!-- Heading Hierarchy Demo -->
    <div class="bg(white.1) r(xl) p(2xl) mb(2xl) backdrop-blur(sm)">
      <div class="vbox gap(md) text(left) max-w(3xl) mx(auto)">
        <div class="heading(hero) c(white)">Hero Heading</div>
        <div class="heading(display) c(white.9)">Display Title</div>
        <div class="heading(h1) c(white.8)">Primary Heading</div>
        <div class="heading(h2) c(white.7)">Section Heading</div>
        <div class="text(lg) c(white.8) mt(md)">Large body text for lead paragraphs and important content that needs emphasis.</div>
        <div class="text(base) c(white.7)">Regular body text for main content, perfectly sized for comfortable reading across all devices.</div>
        <div class="text(sm) c(white.6)">Small text for secondary information and supporting details.</div>
      </div>
    </div>
    
    <!-- Interactive Demo -->
    <div class="grid(2) gap(xl) max-w(4xl) mx(auto)">
      <div class="bg(white.1) r(xl) p(xl) backdrop-blur(sm)">
        <h4 class="heading(h3) mb(lg) c(white)">Content Typography</h4>
        <div class="vbox gap(sm) text(left)">
          <div class="heading(h4) bold c(white)">Article Title</div>
          <div class="text(base) c(white.8)">Beautiful typography makes content more readable and engaging for your users.</div>
        </div>
      </div>
      <div class="bg(white.1) r(xl) p(xl) backdrop-blur(sm)">
        <h4 class="heading(h3) mb(lg) c(white)">UI Typography</h4>
        <div class="vbox gap(sm) text(left)">
          <div class="text(sm) bold(medium) c(white)">Form Label</div>
          <div class="text(xs) c(white.7)">Helper text for forms and interfaces</div>
        </div>
      </div>
    </div>
  </div>
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
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.05);
    }
  }
  
  :global(.animate\(fade-in-up\)) {
    animation: fade-in-up 0.8s ease-out;
  }
  
  :global(.animate\(pulse\)) {
    animation: pulse ease-in-out infinite;
  }
  
  /* Enhanced interactive states */
  .group:hover .heading\(hero\),
  .group:hover .heading\(display\) {
    transform: scale(1.02);
    transition: transform 0.3s ease;
  }
  
  /* Smooth copy feedback */
  button:active {
    transform: scale(0.95);
    transition: transform 0.1s ease;
  }
</style>