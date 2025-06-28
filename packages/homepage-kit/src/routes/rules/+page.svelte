<script lang="ts">
  import { Copy, Check } from 'lucide-svelte';
  import { generateCSS } from 'adorable-css';
  
  let copiedClass = '';
  
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copiedClass = text;
    setTimeout(() => copiedClass = '', 2000);
  }
  
  // Generate actual CSS from AdorableCSS library
  function getGeneratedCSS(className: string): string {
    try {
      const result = generateCSS([className]);
      if (result && result.trim()) {
        // Clean up the CSS output - remove selectors and format properly
        return result
          .replace(/\.[\w\-\(\)]+\s*\{([^}]+)\}/g, '$1')
          .replace(/\s+/g, ' ')
          .trim();
      }
      return 'CSS generation failed';
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }
  
  // Organized by Figma's Properties Panel structure with sub-categories
  const categories = [
    {
      title: 'Layout',
      icon: '⊞', 
      subcategories: [
        {
          title: 'Auto Layout',
          rules: [
            { class: 'hbox', desc: 'Horizontal flexbox' },
            { class: 'vbox', desc: 'Vertical flexbox' },
            { class: 'hbox(reverse)', desc: 'Horizontal reverse' },
            { class: 'vbox(reverse)', desc: 'Vertical reverse' },
            { class: 'hbox(middle)', desc: 'Horizontal center align' },
            { class: 'hbox(top)', desc: 'Horizontal top align' },
            { class: 'hbox(bottom)', desc: 'Horizontal bottom align' },
            { class: 'vbox(left)', desc: 'Vertical left align' },
            { class: 'vbox(center)', desc: 'Vertical center align' },
            { class: 'vbox(right)', desc: 'Vertical right align' },
            { class: 'hbox(between)', desc: 'Space between' },
            { class: 'hbox(around)', desc: 'Space around' },
            { class: 'hbox(evenly)', desc: 'Space evenly' },
            { class: 'pack', desc: 'Pack items' }
          ]
        },
        {
          title: 'Gap & Spacing',
          rules: [
            { class: 'gap(0)', desc: 'No gap' },
            { class: 'gap(4)', desc: '4px gap' },
            { class: 'gap(8)', desc: '8px gap' },
            { class: 'gap(16)', desc: '16px gap' },
            { class: 'gap(24)', desc: '24px gap' },
            { class: 'gap(32)', desc: '32px gap' },
            { class: 'gap(16/24)', desc: 'Gap with row/column' }
          ]
        },
        {
          title: 'Padding',
          rules: [
            { class: 'p(0)', desc: 'No padding' },
            { class: 'p(8)', desc: '8px all sides' },
            { class: 'p(16)', desc: '16px all sides' },
            { class: 'p(24)', desc: '24px all sides' },
            { class: 'px(16)', desc: '16px horizontal' },
            { class: 'py(16)', desc: '16px vertical' },
            { class: 'pt(16)', desc: '16px top' },
            { class: 'pr(16)', desc: '16px right' },
            { class: 'pb(16)', desc: '16px bottom' },
            { class: 'pl(16)', desc: '16px left' }
          ]
        }
      ]
    },
    {
      title: 'Size & Position', 
      icon: '□',
      subcategories: [
        {
          title: 'Size',
          rules: [
            { class: 'w(fill)', desc: 'Fill container width' },
            { class: 'w(hug)', desc: 'Hug contents width' },
            { class: 'w(320)', desc: 'Fixed 320px width' },
            { class: 'w(50%)', desc: '50% width' },
            { class: 'w(100vw)', desc: 'Full viewport width' },
            { class: 'h(fill)', desc: 'Fill container height' },
            { class: 'h(hug)', desc: 'Hug contents height' },
            { class: 'h(64)', desc: 'Fixed 64px height' },
            { class: 'h(100vh)', desc: 'Full viewport height' },
            { class: 'h(screen)', desc: 'Screen height' },
            { class: '64x64', desc: '64x64 square' },
            { class: '16x9', desc: '16:9 aspect ratio' }
          ]
        },
        {
          title: 'Constraints',
          rules: [
            { class: 'min-w(320)', desc: 'Minimum width 320px' },
            { class: 'max-w(1280)', desc: 'Maximum width 1280px' },
            { class: 'min-h(400)', desc: 'Minimum height 400px' },
            { class: 'max-h(800)', desc: 'Maximum height 800px' },
            { class: 'w(300..600)', desc: 'Width range 300-600px' },
            { class: 'h(100..200)', desc: 'Height range 100-200px' }
          ]
        },
        {
          title: 'Position',
          rules: [
            { class: 'relative', desc: 'Relative positioning' },
            { class: 'absolute', desc: 'Absolute positioning' },
            { class: 'fixed', desc: 'Fixed positioning' },
            { class: 'sticky', desc: 'Sticky positioning' },
            { class: 'top(0)', desc: 'Top edge 0' },
            { class: 'left(0)', desc: 'Left edge 0' },
            { class: 'z(10)', desc: 'Z-index 10' },
            { class: 'z(50)', desc: 'Z-index 50' }
          ]
        }
      ]
    },
    {
      title: 'Appearance',
      icon: '●',
      subcategories: [
        {
          title: 'Fill',
          rules: [
            { class: 'bg(white)', desc: 'White background' },
            { class: 'bg(black)', desc: 'Black background' },
            { class: 'bg(gray-100)', desc: 'Light gray background' },
            { class: 'bg(purple-500)', desc: 'Purple background' },
            { class: 'bg(transparent)', desc: 'Transparent background' },
            { class: 'bg(black.1)', desc: '10% black overlay' },
            { class: 'bg(white.5)', desc: '50% white overlay' }
          ]
        },
        {
          title: 'Stroke',
          rules: [
            { class: 'border(1/gray-200)', desc: '1px gray border' },
            { class: 'border(2/black)', desc: '2px black border' },
            { class: 'border-t(1/gray-200)', desc: 'Top border only' },
            { class: 'border-b(1/gray-200)', desc: 'Bottom border only' },
            { class: 'border-l(1/gray-200)', desc: 'Left border only' },
            { class: 'border-r(1/gray-200)', desc: 'Right border only' }
          ]
        },
        {
          title: 'Effects',
          rules: [
            { class: 'shadow(sm)', desc: 'Small shadow' },
            { class: 'shadow(md)', desc: 'Medium shadow' },
            { class: 'shadow(lg)', desc: 'Large shadow' },
            { class: 'shadow(xl)', desc: 'Extra large shadow' },
            { class: 'opacity(0.5)', desc: '50% opacity' },
            { class: 'opacity(80)', desc: '80% opacity' }
          ]
        },
        {
          title: 'Corner Radius',
          rules: [
            { class: 'r(0)', desc: 'No radius' },
            { class: 'r(sm)', desc: 'Small radius' },
            { class: 'r(md)', desc: 'Medium radius' },
            { class: 'r(lg)', desc: 'Large radius' },
            { class: 'r(xl)', desc: 'Extra large radius' },
            { class: 'r(full)', desc: 'Full radius (circle)' },
            { class: 'r(12)', desc: 'Custom 12px radius' },
            { class: 'rt(8)', desc: 'Top radius only' },
            { class: 'rb(8)', desc: 'Bottom radius only' }
          ]
        }
      ]
    },
    {
      title: 'Text',
      icon: 'T',
      subcategories: [
        {
          title: 'Font',
          rules: [
            { class: 'font(xs)', desc: '12px font size' },
            { class: 'font(sm)', desc: '14px font size' },
            { class: 'font(md)', desc: '16px font size' },
            { class: 'font(lg)', desc: '18px font size' },
            { class: 'font(xl)', desc: '20px font size' },
            { class: 'font(2xl)', desc: '24px font size' },
            { class: 'font(3xl)', desc: '30px font size' }
          ]
        },
        {
          title: 'Weight & Style',
          rules: [
            { class: 'bold', desc: 'Bold text (700)' },
            { class: 'bold(600)', desc: 'Semibold text (600)' },
            { class: 'bold(semi)', desc: 'Semibold text' },
            { class: 'italic', desc: 'Italic text' },
            { class: 'underline', desc: 'Underlined text' }
          ]
        },
        {
          title: 'Color',
          rules: [
            { class: 'c(black)', desc: 'Black text' },
            { class: 'c(white)', desc: 'White text' },
            { class: 'c(gray-600)', desc: 'Dark gray text' },
            { class: 'c(purple-600)', desc: 'Purple text' },
            { class: 'c(white.8)', desc: '80% white text' }
          ]
        },
        {
          title: 'Alignment',
          rules: [
            { class: 'text(left)', desc: 'Left align text' },
            { class: 'text(center)', desc: 'Center align text' },
            { class: 'text(right)', desc: 'Right align text' },
            { class: 'text(justify)', desc: 'Justify text' },
            { class: 'text(top)', desc: 'Top align text box' },
            { class: 'text(middle)', desc: 'Middle align text box' },
            { class: 'text(bottom)', desc: 'Bottom align text box' },
            { class: 'text(pack)', desc: 'Center align text box (both axes)' }
          ]
        }
      ]
    },
    {
      title: 'Advanced',
      icon: '⚙️',
      subcategories: [
        {
          title: 'Overflow',
          rules: [
            { class: 'overflow(visible)', desc: 'Content can overflow' },
            { class: 'overflow(hidden)', desc: 'Hide overflow' },
            { class: 'overflow(scroll)', desc: 'Always show scrollbars' },
            { class: 'overflow(auto)', desc: 'Auto scrollbars' },
            { class: 'overflow-x(hidden)', desc: 'Hide horizontal overflow' },
            { class: 'overflow-y(auto)', desc: 'Auto vertical scroll' }
          ]
        }
      ]
    }
  ];
</script>

<div class="docs-page">
  <!-- Hero Section -->
  <header class="docs-hero">
    <div class="vbox gap(6)">
      <h1 class="text(5xl) bold c(gray-900)">AdorableCSS Reference</h1>
      <p class="text(lg) c(gray-600) leading(1.7)">
        Complete documentation of all utility classes organized by Figma's Properties Panel structure
      </p>
    </div>
  </header>

  <!-- Main Layout -->
  <div class="hbox(top)">
    <!-- Left Navigation -->
    <nav class="docs-nav">
      <div class="sticky top(0) py(6)">
        <h3 class="text(sm) bold c(gray-700) mb(4) px(4)">Contents</h3>
        <ul class="vbox gap(1)">
          {#each categories as category}
            <li>
              <a 
                href="#{category.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}"
                class="hbox(middle) gap(3) px(4) py(2) text(sm) c(gray-600) hover:c(gray-900) hover:bg(gray-50) r(md) transition"
              >
                <span class="text(lg)">{category.icon}</span>
                {category.title}
              </a>
              <!-- Subcategories -->
              <ul class="vbox gap(0.5) pl(8) pt(1)">
                {#each category.subcategories as subcategory}
                  <li>
                    <a 
                      href="#{category.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}-{subcategory.title.toLowerCase().replace(/\s+/g, '-')}"
                      class="block px(3) py(1) text(xs) c(gray-500) hover:c(gray-700) hover:bg(gray-50) r(sm) transition"
                    >
                      {subcategory.title}
                    </a>
                  </li>
                {/each}
              </ul>
            </li>
          {/each}
        </ul>
      </div>
    </nav>
    
    <!-- Main Content -->
    <main class="docs-main flex(1) px(6)">
    {#each categories as category}
      <section id="{category.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}" class="docs-section">
        <!-- Category Title -->
        <h2 class="docs-section-title font(3xl)">
          <span class="mr(3)">{category.icon}</span>
          {category.title}
        </h2>
        
        <!-- Subcategories -->
        {#each category.subcategories as subcategory}
          <div class="pb(8)" id="{category.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}-{subcategory.title.toLowerCase().replace(/\s+/g, '-')}">
            <!-- Subcategory Title -->
            <h3 class="text(xl) bold c(gray-800) pb(6) border-b(1/gray-100)">
              {subcategory.title}
            </h3>
            
            <!-- Rules Table -->
            <table class="docs-table font(xs)">
              <thead>
                <tr>
                  <th class="docs-table-header w(200)">Class</th>
                  <th class="docs-table-header">CSS Output</th>
                </tr>
              </thead>
              <tbody>
                {#each subcategory.rules as rule}
                  <tr class="docs-table-row" class:copied={copiedClass === rule.class}>
                    <!-- Class Name -->
                    <td class="docs-table-cell-class">
                      <button
                        class="hbox(middle) gap(3) text(left) w(full) cursor(pointer) p(4) bg(transparent) border(none)"
                        on:click={() => copyToClipboard(rule.class)}
                        title="Click to copy {rule.class}"
                      >
                        <code class="text(lg) font(mono) c(indigo-600)">{rule.class}</code>
                        {#if copiedClass === rule.class}
                          <Check size="16" class="c(green-600)" />
                          <span class="text(xs) c(green-600) bold">Copied!</span>
                        {:else}
                          <Copy size="14" class="c(gray-400) hover:c(gray-600)" />
                        {/if}
                      </button>
                    </td>
                    
                    <!-- CSS Output -->
                    <td class="docs-table-cell-css">
                      <pre class="bg(gray-50) c(gray-900) p(4) text(sm) font(mono) leading(1.6) overflow-x(auto)"><code>{getGeneratedCSS(rule.class)}</code></pre>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/each}
      </section>
    {/each}
    </main>
    
    <!-- Right TOC -->
    <aside class="docs-toc">
      <div class="sticky top(0) py(6)">
        <h3 class="text(sm) bold c(gray-700) mb(4) px(4)">On This Page</h3>
        <ul class="vbox gap(1)">
          {#each categories as category}
            <li>
              <a 
                href="#{category.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}"
                class="block px(4) py(1) text(xs) c(gray-600) hover:c(gray-900) r(sm) transition"
              >
                {category.title}
              </a>
              <!-- Subcategories in TOC -->
              <ul class="vbox gap(0.5) pl(4) pt(0.5)">
                {#each category.subcategories as subcategory}
                  <li>
                    <a 
                      href="#{category.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}-{subcategory.title.toLowerCase().replace(/\s+/g, '-')}"
                      class="block px(3) py(0.5) text(2xs) c(gray-500) hover:c(gray-700) r(sm) transition"
                    >
                      {subcategory.title}
                    </a>
                  </li>
                {/each}
              </ul>
            </li>
          {/each}
        </ul>
        
        <!-- Debug Link -->
        <div class="pt(12) border-t(1/gray-200)">
          <a 
            href="/rules/debug"
            class="hbox(middle) gap(2) px(4) py(2) text(xs) c(purple-600) hover:c(purple-800) hover:bg(purple-50) r(md) transition"
          >
            <span>🐛</span>
            Debug Rules
          </a>
        </div>
      </div>
    </aside>
  </div>
</div>