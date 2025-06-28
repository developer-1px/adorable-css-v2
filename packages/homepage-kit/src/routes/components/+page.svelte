<script lang="ts">
  import { onMount } from 'svelte';
  import { Copy, Check, ChevronRight, ChevronDown } from 'lucide-svelte';
  
  let copiedId: string | null = null;
  let selectedComponent: any = null;
  let selectedExample: any = null;
  let expandedCategories: Record<string, boolean> = {};
  
  function copyCode(code: string, id: string) {
    navigator.clipboard.writeText(code);
    copiedId = id;
    setTimeout(() => copiedId = null, 2000);
  }
  
  function selectExample(component: any, example: any) {
    selectedComponent = component;
    selectedExample = example;
  }
  
  function toggleCategory(categoryTitle: string) {
    expandedCategories[categoryTitle] = !expandedCategories[categoryTitle];
  }
  
  // Component categories with examples
  const componentCategories = [
    {
      title: 'Primitives',
      description: 'Basic building blocks for your UI',
      components: [
        {
          name: 'Buttons',
          id: 'buttons',
          examples: [
            {
              id: 'button-variants',
              title: 'Button Variants',
              description: 'Different button styles for various use cases',
              code: `<div class="vbox gap(16)">
  <div class="hbox gap(12)">
    <button class="btn">Default</button>
    <button class="btn(secondary)">Secondary</button>
    <button class="btn(destructive)">Destructive</button>
  </div>
  <div class="hbox gap(12)">
    <button class="btn(outline)">Outline</button>
    <button class="btn(ghost)">Ghost</button>
    <a href="#" class="btn(link)">Link Button</a>
  </div>
</div>`
            },
            {
              id: 'button-sizes',
              title: 'Button Sizes',
              description: 'Small, default, and large button sizes',
              code: `<div class="hbox gap(12) items(end)">
  <button class="btn(primary/sm)">Small</button>
  <button class="btn(primary)">Default</button>
  <button class="btn(primary/lg)">Large</button>
</div>`
            },
            {
              id: 'icon-buttons',
              title: 'Icon Buttons',
              description: 'Icon-only buttons in different sizes',
              code: `<div class="hbox gap(16)">
  <button class="icon-btn(sm)">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
    </svg>
  </button>
  <button class="icon-btn">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  </button>
  <button class="icon-btn(lg)">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  </button>
</div>`
            }
          ]
        },
        {
          name: 'Cards',
          id: 'cards',
          examples: [
            {
              id: 'card-variants',
              title: 'Card Variants',
              description: 'Different card styles for content containers',
              code: `<div class="vbox gap(16)">
  <div class="card">
    <h3 class="font(lg) bold mb(8)">Default Card</h3>
    <p class="c(gray-600)">This is a basic card component with default styling.</p>
  </div>
  
  <div class="card(elevated)">
    <h3 class="font(lg) bold mb(8)">Elevated Card</h3>
    <p class="c(gray-600)">This card has a stronger shadow for more emphasis.</p>
  </div>
  
  <div class="card(outline)">
    <h3 class="font(lg) bold mb(8)">Outline Card</h3>
    <p class="c(gray-600)">This card uses a border instead of a shadow.</p>
  </div>
</div>`
            },
            {
              id: 'interactive-card',
              title: 'Interactive Card',
              description: 'Card with hover effects',
              code: `<div class="card(interactive) cursor(pointer)">
  <h3 class="font(lg) bold mb(8)">Interactive Card</h3>
  <p class="c(gray-600)">Hover over this card to see the interactive effect.</p>
</div>`
            }
          ]
        },
        {
          name: 'Headings',
          id: 'headings',
          examples: [
            {
              id: 'heading-hierarchy',
              title: 'Heading Hierarchy',
              description: 'All heading levels from h1 to h6',
              code: `<h1 class="heading(h1)">Heading 1</h1>
<h2 class="heading(h2)">Heading 2</h2>
<h3 class="heading(h3)">Heading 3</h3>
<h4 class="heading(h4)">Heading 4</h4>
<h5 class="heading(h5)">Heading 5</h5>
<h6 class="heading(h6)">Heading 6</h6>`
            },
            {
              id: 'special-headings',
              title: 'Special Headings',
              description: 'Display and hero heading styles',
              code: `<h1 class="heading(display)">Display Heading</h1>
<h1 class="heading(hero)">Hero Heading</h1>`
            }
          ]
        },
        {
          name: 'Form Elements',
          id: 'forms',
          examples: [
            {
              id: 'input-fields',
              title: 'Input Fields',
              description: 'Text input fields in various states',
              code: `<div class="vbox gap(12)">
  <input type="text" class="input" placeholder="Default input">
  <input type="text" class="input(sm)" placeholder="Small input">
  <input type="text" class="input(lg)" placeholder="Large input">
  <input type="text" class="input(error)" placeholder="Error state">
  <input type="text" class="input(success)" placeholder="Success state">
</div>`
            },
            {
              id: 'textareas',
              title: 'Textareas',
              description: 'Multi-line text input areas',
              code: `<div class="vbox gap(12)">
  <textarea class="textarea" placeholder="Default textarea"></textarea>
  <textarea class="textarea(sm)" placeholder="Small textarea" rows="2"></textarea>
  <textarea class="textarea(lg)" placeholder="Large textarea" rows="4"></textarea>
</div>`
            }
          ]
        }
      ]
    },
    {
      title: 'Patterns',
      description: 'Complex layout components',
      components: [
        {
          name: 'Hero Sections',
          id: 'hero',
          examples: [
            {
              id: 'hero-minimal',
              title: 'Minimal Hero',
              description: 'Clean and simple hero section',
              code: `<section class="hero(minimal)">
  <div class="hero-content">
    <h1 class="heading(hero) mb(16)">Minimal Hero</h1>
    <p class="font(lg) c(gray-600)">Clean and simple hero section</p>
  </div>
</section>`
            },
            {
              id: 'hero-gradient',
              title: 'Gradient Hero',
              description: 'Hero with gradient background and pattern',
              code: `<section class="hero(gradient)">
  <div class="hero-bg(dots)"></div>
  <div class="hero-content">
    <h1 class="heading(hero) mb(16)">Gradient Hero</h1>
    <p class="font(lg) c(gray-600)">Hero with gradient background</p>
  </div>
</section>`
            },
            {
              id: 'hero-dark',
              title: 'Dark Hero',
              description: 'Dark themed hero section',
              code: `<section class="hero(dark)">
  <div class="hero-content">
    <h1 class="heading(hero) mb(16)">Dark Hero</h1>
    <p class="font(lg) c(gray-300)">Perfect for dark themes</p>
  </div>
</section>`
            }
          ]
        },
        {
          name: 'Containers',
          id: 'containers',
          examples: [
            {
              id: 'container-sizes',
              title: 'Container Sizes',
              description: 'Different max-width container options',
              code: `<div class="container(sm) bg(gray-100) p(24) mb(16)">
  <p class="text(center)">Small Container (640px)</p>
</div>

<div class="container bg(gray-100) p(24) mb(16)">
  <p class="text(center)">Default Container (980px)</p>
</div>

<div class="container(lg) bg(gray-100) p(24) mb(16)">
  <p class="text(center)">Large Container (1280px)</p>
</div>

<div class="container(narrow) bg(gray-100) p(24)">
  <p class="text(center)">Narrow Container</p>
</div>`
            }
          ]
        },
        {
          name: 'Sections',
          id: 'sections',
          examples: [
            {
              id: 'section-types',
              title: 'Section Types',
              description: 'Different section layouts',
              code: `<section class="section">
  <div class="container">
    <h2 class="heading(h2) mb(16)">Default Section</h2>
    <p>Standard section with responsive padding</p>
  </div>
</section>

<section class="section(feature) bg(gray-50)">
  <div class="container">
    <h2 class="heading(h2) mb(16)">Feature Section</h2>
    <p>Highlighted section for features</p>
  </div>
</section>`
            }
          ]
        },
        {
          name: 'Prose',
          id: 'prose',
          examples: [
            {
              id: 'prose-content',
              title: 'Prose Content',
              description: 'Styled content for articles and documentation',
              code: `<article class="prose">
  <h1>The Power of AdorableCSS</h1>
  <p>AdorableCSS brings the intuitive design language of Figma directly to your CSS workflow. With our framework, you can build beautiful interfaces using the same mental model you use when designing.</p>
  <h2>Key Features</h2>
  <ul>
    <li>Figma-inspired syntax</li>
    <li>Built-in design system</li>
    <li>Zero runtime overhead</li>
  </ul>
  <p>Start building today with <code>npm install adorable-css</code></p>
</article>`
            }
          ]
        }
      ]
    },
    {
      title: 'Features',
      description: 'Special effects and enhancements',
      components: [
        {
          name: 'Glass Effects',
          id: 'glass',
          examples: [
            {
              id: 'glass-morphism',
              title: 'Glass Morphism',
              description: 'Frosted glass effect variations',
              code: `<div class="grid(3) gap(24)">
  <div class="glass p(24) text(center)">
    <h3 class="font(lg) bold mb(8)">Default Glass</h3>
    <p class="c(gray-700)">Subtle glass effect</p>
  </div>
  
  <div class="glass(md) p(24) text(center)">
    <h3 class="font(lg) bold mb(8)">Medium Glass</h3>
    <p class="c(gray-700)">More prominent blur</p>
  </div>
  
  <div class="glass(dark) p(24) text(center)">
    <h3 class="font(lg) bold mb(8) c(white)">Dark Glass</h3>
    <p class="c(gray-300)">For dark backgrounds</p>
  </div>
</div>`,
              wrapperClass: 'bg(purple-500..pink-500/135deg) p(48)'
            }
          ]
        },
        {
          name: 'Glow Effects',
          id: 'glow',
          examples: [
            {
              id: 'glow-variations',
              title: 'Glow Variations',
              description: 'Colorful glow effects for buttons',
              code: `<div class="grid(4) gap(24)">
  <button class="btn glow">Default Glow</button>
  <button class="btn(secondary) glow(purple)">Purple Glow</button>
  <button class="btn(outline) glow(blue)">Blue Glow</button>
  <button class="btn(ghost) glow(green)">Green Glow</button>
</div>`,
              wrapperClass: 'bg(gray-900) p(48)'
            }
          ]
        },
        {
          name: 'Figma Components',
          id: 'figma',
          examples: [
            {
              id: 'figma-style',
              title: 'Figma-style Components',
              description: 'Components that mimic Figma\'s interface',
              code: `<div class="figma-frame">
  <div class="figma-auto-layout gap(16)">
    <div class="figma-component">
      <span class="font(sm) bold">Component Instance</span>
    </div>
    <div class="figma-component">
      <span class="font(sm) bold">Another Instance</span>
    </div>
  </div>
</div>`
            }
          ]
        }
      ]
    }
  ];
  
  // Initialize with first example
  onMount(() => {
    // Expand all categories by default
    componentCategories.forEach(category => {
      expandedCategories[category.title] = true;
    });
    
    // Select first example
    if (componentCategories[0]?.components[0]?.examples[0]) {
      selectExample(
        componentCategories[0].components[0],
        componentCategories[0].components[0].examples[0]
      );
    }
  });
</script>

<div class="min-h(screen) bg(gray-50)">
  <div class="hbox(top) h(screen)">
    <!-- Sidebar -->
    <aside class="w(320) bg(white) border-r(1/gray-200) overflow-y(auto)">
      <div class="sticky top(0) z(10) bg(white) border-b(1/gray-200) p(24)">
        <h1 class="font(2xl) bold c(gray-900)">Components</h1>
        <p class="font(sm) c(gray-600) mt(8)">Ready-to-use AdorableCSS components</p>
      </div>
      
      <nav class="p(16)">
        {#each componentCategories as category}
          <div class="mb(16)">
            <!-- Category Header -->
            <button
              class="hbox(between) w(full) p(8) hover:bg(gray-50) r(lg) transition"
              on:click={() => toggleCategory(category.title)}
            >
              <span class="font(sm) bold c(gray-900)">{category.title}</span>
              {#if expandedCategories[category.title]}
                <ChevronDown size="16" class="c(gray-400)" />
              {:else}
                <ChevronRight size="16" class="c(gray-400)" />
              {/if}
            </button>
            
            <!-- Components List -->
            {#if expandedCategories[category.title]}
              <div class="mt(8) ml(8)">
                {#each category.components as component}
                  <div class="mb(12)">
                    <h3 class="font(xs) bold uppercase c(gray-500) mb(4) px(8)">{component.name}</h3>
                    <ul>
                      {#each component.examples as example}
                        <li>
                          <button
                            class="w(full) text(left) px(8) py(6) r(md) hover:bg(gray-100) transition"
                            class:bg(purple-50)={selectedExample?.id === example.id}
                            class:c(purple-600)={selectedExample?.id === example.id}
                            on:click={() => selectExample(component, example)}
                          >
                            <span class="font(sm)">{example.title}</span>
                          </button>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </nav>
    </aside>
    
    <!-- Main Content -->
    <main class="flex(1) overflow-y(auto)">
      {#if selectedExample}
        <div class="p(48)">
          <!-- Example Header -->
          <div class="mb(32)">
            <h2 class="font(3xl) bold c(gray-900) mb(8)">{selectedExample.title}</h2>
            <p class="font(lg) c(gray-600)">{selectedExample.description}</p>
          </div>
          
          <!-- Preview Section -->
          <div class="mb(32)">
            <h3 class="font(sm) bold uppercase c(gray-500) mb(16)">Preview</h3>
            <div class="r(lg) border(1/gray-200) overflow(hidden)">
              <div class="{selectedExample.wrapperClass || 'bg(white) p(32)'}">
                {@html `<div class="preview-content">${selectedExample.code}</div>`}
              </div>
            </div>
          </div>
          
          <!-- Code Section -->
          <div>
            <div class="hbox(between) mb(16)">
              <h3 class="font(sm) bold uppercase c(gray-500)">Code</h3>
              <button
                class="hbox(middle) gap(8) px(12) py(6) r(md) bg(gray-100) hover:bg(gray-200) transition"
                on:click={() => copyCode(selectedExample.code, selectedExample.id)}
              >
                {#if copiedId === selectedExample.id}
                  <Check size="16" />
                  <span class="font(sm)">Copied!</span>
                {:else}
                  <Copy size="16" />
                  <span class="font(sm)">Copy</span>
                {/if}
              </button>
            </div>
            
            <div class="r(lg) bg(gray-900) p(24) overflow-x(auto)">
              <pre class="font(mono/sm) c(gray-300)"><code>{selectedExample.code}</code></pre>
            </div>
          </div>
          
          <!-- Usage Notes -->
          <div class="mt(48) p(24) r(lg) bg(blue-50) border(1/blue-200)">
            <h4 class="font(sm) bold c(blue-900) mb(8)">Usage Notes</h4>
            <ul class="vbox gap(8)">
              <li class="font(sm) c(blue-800)">• All components use AdorableCSS v2 syntax</li>
              <li class="font(sm) c(blue-800)">• Components are fully customizable with utility classes</li>
              <li class="font(sm) c(blue-800)">• Copy the code and adapt it to your needs</li>
            </ul>
          </div>
        </div>
      {:else}
        <div class="vbox(center) h(full)">
          <p class="font(lg) c(gray-500)">Select a component to preview</p>
        </div>
      {/if}
    </main>
  </div>
</div>