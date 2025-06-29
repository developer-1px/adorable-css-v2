<script lang="ts">
  import { Copy, Check, Palette, Layout, Type, Sparkles, Box, Layers } from 'lucide-svelte';
  import DocsSidebar from '$lib/components/docs/DocsSidebar.svelte';
  
  let copiedCode = '';
  
  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    copiedCode = code;
    setTimeout(() => copiedCode = '', 2000);
  }

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  // Sidebar navigation items
  $: sidebarItems = componentCategories.map(category => ({
    title: category.title,
    icon: category.icon,
    color: category.color,
    onClick: () => scrollToSection(category.title.toLowerCase()),
    active: false
  }));

  const componentCategories = [
    {
      title: 'Primitives',
      description: 'Basic building blocks for your UI',
      icon: Box,
      color: 'blue',
      components: [
        {
          name: 'btn()',
          description: 'shadcn/ui inspired button component with variants and sizes',
          examples: [
            { code: 'btn', label: 'Default button' },
            { code: 'btn(primary)', label: 'Primary variant' },
            { code: 'btn(secondary/sm)', label: 'Secondary small' },
            { code: 'btn(outline/lg)', label: 'Large outline' },
            { code: 'btn(ghost)', label: 'Ghost button' },
            { code: 'btn(destructive)', label: 'Destructive action' }
          ]
        },
        {
          name: 'card()',
          description: 'Flexible card container with multiple variants and interactive states',
          examples: [
            { code: 'card', label: 'Default card' },
            { code: 'card(elevated)', label: 'Elevated shadow' },
            { code: 'card(outline)', label: 'Outline variant' },
            { code: 'card(interactive)', label: 'Interactive hover' },
            { code: 'card(glass)', label: 'Glass effect' },
            { code: 'card(gradient/lg)', label: 'Large gradient' }
          ]
        },
        {
          name: 'badge()',
          description: 'Small status indicators and labels',
          examples: [
            { code: 'badge', label: 'Default badge' },
            { code: 'badge(primary)', label: 'Primary variant' },
            { code: 'badge(success/sm)', label: 'Small success' },
            { code: 'badge(warning)', label: 'Warning state' },
            { code: 'badge(outline)', label: 'Outline style' },
            { code: 'badge(accent/lg)', label: 'Large accent' }
          ]
        },
        {
          name: 'icon-box()',
          description: 'Perfect containers for icons in cards and features',
          examples: [
            { code: 'icon-box', label: 'Default (48px)' },
            { code: 'icon-box(sm)', label: 'Small (32px)' },
            { code: 'icon-box(md)', label: 'Medium (40px)' },
            { code: 'icon-box(lg)', label: 'Large (48px)' },
            { code: 'icon-box(xl)', label: 'Extra large (56px)' },
            { code: 'icon-box(64)', label: 'Custom size (64px)' }
          ]
        },
        {
          name: 'input()',
          description: 'Form input components with various states',
          examples: [
            { code: 'input', label: 'Default input' },
            { code: 'input(ghost)', label: 'Ghost variant' },
            { code: 'input(underlined)', label: 'Underlined style' },
            { code: 'input(error)', label: 'Error state' },
            { code: 'textarea', label: 'Text area' },
            { code: 'textarea(lg)', label: 'Large textarea' }
          ]
        }
      ]
    },
    {
      title: 'Typography',
      description: 'Semantic heading and text components',
      icon: Type,
      color: 'purple',
      components: [
        {
          name: 'heading()',
          description: 'Semantic headings with multiple levels and variants',
          examples: [
            { code: 'heading(h1)', label: 'Main heading' },
            { code: 'heading(h2)', label: 'Section heading' },
            { code: 'heading(display)', label: 'Display heading' },
            { code: 'heading(hero)', label: 'Hero heading' },
            { code: 'heading(caption)', label: 'Caption text' },
            { code: 'heading(h3/muted)', label: 'Muted heading' }
          ]
        },
        {
          name: 'prose()',
          description: 'Rich typography for articles and documentation',
          examples: [
            { code: 'prose', label: 'Default prose' },
            { code: 'prose(compact)', label: 'Compact spacing' },
            { code: 'prose(large)', label: 'Large text' },
            { code: 'prose(serif)', label: 'Serif typography' },
            { code: 'prose(dark)', label: 'Dark theme' },
            { code: 'prose(wide)', label: 'Wide content' }
          ]
        }
      ]
    },
    {
      title: 'Layout',
      description: 'Container and section components',
      icon: Layout,
      color: 'green',
      components: [
        {
          name: 'container()',
          description: 'Apple-inspired responsive containers',
          examples: [
            { code: 'container', label: 'Default (980px)' },
            { code: 'container(compact)', label: 'Compact (692px)' },
            { code: 'container(wide)', label: 'Wide (1190px)' },
            { code: 'container(full)', label: 'Full width' }
          ]
        },
        {
          name: 'section()',
          description: 'Page sections with proper spacing and variants',
          examples: [
            { code: 'section', label: 'Default section' },
            { code: 'section(large)', label: 'Large spacing' },
            { code: 'section(feature)', label: 'Feature section' },
            { code: 'section(flush)', label: 'No padding' },
            { code: 'section(gallery)', label: 'Gallery layout' }
          ]
        },
        {
          name: 'hero()',
          description: 'Hero sections with backgrounds and animations',
          examples: [
            { code: 'hero', label: 'Default hero' },
            { code: 'hero(gradient)', label: 'Gradient background' },
            { code: 'hero(minimal)', label: 'Minimal style' },
            { code: 'hero(dark)', label: 'Dark theme' },
            { code: 'hero(split)', label: 'Split layout' }
          ]
        },
        {
          name: 'feature-card()',
          description: 'Feature showcase cards with hover effects',
          examples: [
            { code: 'feature-card', label: 'Default feature card' },
            { code: 'feature-card-gradient', label: 'Gradient variant' },
            { code: 'feature-card-gradient(purple-500..pink-500)', label: 'Custom gradient' },
            { code: 'feature-card-gradient(blue-500..cyan-500)', label: 'Blue gradient' }
          ]
        }
      ]
    },
    {
      title: 'Effects',
      description: 'Special visual effects and interactions',
      icon: Sparkles,
      color: 'orange',
      components: [
        {
          name: 'glass()',
          description: 'Glassmorphism effects with blur and transparency',
          examples: [
            { code: 'glass', label: 'Default glass' },
            { code: 'glass(md)', label: 'Medium blur' },
            { code: 'glass(dark)', label: 'Dark glass' },
            { code: 'glass-card', label: 'Glass card' },
            { code: 'glass-nav', label: 'Glass navigation' }
          ]
        },
        {
          name: 'glow()',
          description: 'Glow effects for emphasis and interaction',
          examples: [
            { code: 'glow', label: 'Default glow' },
            { code: 'glow(blue)', label: 'Blue glow' },
            { code: 'glow(purple/lg)', label: 'Large purple' },
            { code: 'glow-pulse', label: 'Pulsing glow' },
            { code: 'glow-ring', label: 'Ring glow' }
          ]
        },
        {
          name: 'interactive()',
          description: 'Interactive states and hover effects',
          examples: [
            { code: 'interactive(1)', label: 'Subtle (level 1)' },
            { code: 'interactive(3)', label: 'Medium (level 3)' },
            { code: 'interactive(5)', label: 'Dramatic (level 5)' },
            { code: 'hoverable(lift)', label: 'Lift on hover' },
            { code: 'pressable', label: 'Press state' }
          ]
        }
      ]
    },
    {
      title: 'Documentation',
      description: 'Components for building documentation sites',
      icon: Layers,
      color: 'indigo',
      components: [
        {
          name: 'docs()',
          description: 'Complete documentation layout system',
          examples: [
            { code: 'docs', label: 'Docs layout' },
            { code: 'docs-section', label: 'Content section' },
            { code: 'docs-card', label: 'Info card' },
            { code: 'docs-callout', label: 'Callout box' },
            { code: 'docs-code', label: 'Code block' }
          ]
        },
        {
          name: 'code-block()',
          description: 'Syntax highlighted code blocks',
          examples: [
            { code: 'code-block', label: 'Default block' },
            { code: 'code-block(dark)', label: 'Dark theme' },
            { code: 'code-block(light)', label: 'Light theme' },
            { code: 'code-block(branded)', label: 'Branded style' },
            { code: 'inline-code', label: 'Inline code' }
          ]
        }
      ]
    }
  ];
</script>

<div class="min-h(screen) bg(gray-50)">
  <!-- Header -->
  <header class="bg(white) border-b(1/gray-200) sticky top(0) z(50)">
    <div class="container(7xl) mx(auto) px(xl) py(lg)">
      <div class="hbox(between/middle)">
        <div>
          <h1 class="heading(h1) c(gray-900) mb(xs)">Components</h1>
          <p class="c(gray-600)">Built-in AdorableCSS component utilities</p>
        </div>
        <div class="hbox gap(sm)">
          <div class="badge(outline) hbox(middle) gap(xs)">
            <Palette size="14" />
            <span class="font(xs)">Design System</span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div class="container(7xl) mx(auto) px(xl) py(2xl)">
    <div class="hbox(top) gap(2xl)">
      <!-- Sidebar Navigation -->
      <DocsSidebar title="Components" items={sidebarItems} />

      <!-- Main Content -->
      <main class="flex(1) min-w(0)">
        {#each componentCategories as category}
          <section id={category.title.toLowerCase()} class="mb(4xl)">
            <!-- Category Header -->
            <div class="mb(2xl)">
              <div class="hbox(middle) gap(sm) mb(md)">
                <svelte:component this={category.icon} size="24" class="c({category.color}-500)" />
                <h2 class="heading(h2) c(gray-900)">{category.title}</h2>
              </div>
              <p class="c(gray-600) text(lg)">{category.description}</p>
            </div>

            <!-- Components in Category -->
            <div class="vbox gap(2xl)">
              {#each category.components as component}
                <div class="bg(white) r(xl) border(1/gray-200) overflow(hidden)">
                  <div class="p(xl) border-b(1/gray-100)">
                    <h3 class="heading(h3) c(gray-900) mb(sm) font(mono)">{component.name}</h3>
                    <p class="c(gray-600)">{component.description}</p>
                  </div>
                  
                  <div class="p(xl)">
                    <!-- Preview Section -->
                    <div class="mb(2xl)">
                      <h4 class="font(sm) bold uppercase c(gray-500) mb(lg) tracking(0.1em)">Preview</h4>
                      <div class="p(2xl) bg(gray-50) r(lg) border(1/gray-200)">
                        <div class="hbox(center/middle) gap(lg) flex-wrap">
                          {#each component.examples.slice(0, 4) as example}
                            <div class="{example.code}">
                              {#if component.name === 'btn()'}
                                {example.label}
                              {:else if component.name === 'badge()'}
                                {example.label}
                              {:else if component.name === 'icon-box()'}
                                <div class="{example.code} bg(purple-500.1) c(purple-500)">
                                  <Sparkles size="24" />
                                </div>
                              {:else if component.name === 'heading()'}
                                {example.label}
                              {:else if component.name === 'input()'}
                                <input class="{example.code}" placeholder="{example.label}" />
                              {:else if component.name === 'card()'}
                                <div class="{example.code} w(200px) p(md)">
                                  <h4 class="font(sm) bold mb(xs)">Card Title</h4>
                                  <p class="font(xs) c(gray-600)">{example.label}</p>
                                </div>
                              {:else if component.name === 'container()'}
                                <div class="{example.code} bg(white) border(1/gray-300) p(sm)">
                                  <div class="text(center) font(xs) c(gray-600)">{example.label}</div>
                                </div>
                              {:else if component.name === 'section()'}
                                <div class="{example.code} bg(white) border(1/gray-300) w(180px)">
                                  <div class="text(center) font(xs) c(gray-600)">{example.label}</div>
                                </div>
                              {:else if component.name === 'hero()'}
                                <div class="{example.code} w(200px) h(80px) hbox(center/middle) bg(gradient-to-r/blue-500..purple-600) c(white)">
                                  <div class="text(center) font(xs)">{example.label}</div>
                                </div>
                              {:else if component.name === 'prose()'}
                                <div class="{example.code} w(250px)">
                                  <h4>Sample Prose</h4>
                                  <p>This is {example.label} with typography styling.</p>
                                </div>
                              {:else if component.name.includes('glass')}
                                <div class="relative w(150px) h(80px) bg(to-br/purple-500..blue-500) r(lg) overflow(hidden)">
                                  <div class="{example.code} absolute inset(md) hbox(center/middle) c(white) font(xs)">
                                    {example.label}
                                  </div>
                                </div>
                              {:else if component.name.includes('glow')}
                                <div class="bg(gray-900) p(lg) r(lg)">
                                  <div class="{example.code} btn bg(purple-600) c(white) px(md) py(sm) r(md)">
                                    {example.label}
                                  </div>
                                </div>
                              {:else if component.name.includes('interactive')}
                                <div class="{example.code} btn bg(blue-600) c(white) px(md) py(sm) r(md)">
                                  {example.label}
                                </div>
                              {:else if component.name.includes('docs')}
                                <div class="{example.code} bg(white) border(1/gray-200) p(md) r(md) w(180px)">
                                  <div class="font(xs) c(gray-600)">{example.label}</div>
                                </div>
                              {:else if component.name === 'feature-card()'}
                                <div class="{example.code} w(220px)">
                                  <div class="icon-box bg(purple-500.1) c(purple-500)">
                                    <Sparkles size="24" />
                                  </div>
                                  <h4 class="font(md) bold {example.code.includes('gradient') ? 'c(white)' : 'c(gray-900)'}">Feature</h4>
                                  <p class="font(sm) {example.code.includes('gradient') ? 'c(white.9)' : 'c(gray-600)'}">Amazing feature description</p>
                                </div>
                              {:else if component.name.includes('code-block')}
                                {#if example.code === 'inline-code'}
                                  <span class="{example.code}">const code = true</span>
                                {:else}
                                  <div class="{example.code} w(280px)">
                                    <code>console.log('{example.label}')</code>
                                  </div>
                                {/if}
                              {:else}
                                <div class="{example.code} bg(white) border(1/gray-200) p(md) r(md)">
                                  <div class="font(xs) c(gray-600)">{example.label}</div>
                                </div>
                              {/if}
                            </div>
                          {/each}
                        </div>
                      </div>
                    </div>

                    <!-- Examples Section -->
                    <div>
                      <h4 class="font(sm) bold uppercase c(gray-500) mb(lg) tracking(0.1em)">Examples</h4>
                      <div class="grid(3) gap(lg)">
                        {#each component.examples as example}
                          <div class="group relative">
                            <button
                              class="w(full) text(left) p(md) r(lg) border(1/gray-200) hover:border({category.color}-200) hover:bg({category.color}-50) transition-all"
                              on:click={() => copyCode(example.code)}
                            >
                              <div class="font(mono/sm) c(gray-900) mb(xs)">{example.code}</div>
                              <div class="font(xs) c(gray-500)">{example.label}</div>
                              
                              <div class="absolute top(xs) right(xs) opacity(0) group-hover:opacity(100) transition">
                                {#if copiedCode === example.code}
                                  <div class="p(xs) r(md) bg(green-100) c(green-700) hbox(middle) gap(xs)">
                                    <Check size="12" />
                                    <span class="font(xs)">Copied!</span>
                                  </div>
                                {:else}
                                  <div class="p(xs) r(md) bg(white) shadow(sm) border(1/gray-200) hbox(middle) gap(xs)">
                                    <Copy size="12" />
                                    <span class="font(xs)">Copy</span>
                                  </div>
                                {/if}
                              </div>
                            </button>
                          </div>
                        {/each}
                      </div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </section>
        {/each}

        <!-- Usage Guide -->
        <div class="mt(4xl) p(xl) r(xl) bg(blue-50) border(1/blue-200)">
          <h3 class="heading(h3) c(blue-900) mb(md)">Usage Guide</h3>
          <div class="vbox gap(md)">
            <p class="c(blue-800)">• All components use AdorableCSS v2 syntax with parentheses notation</p>
            <p class="c(blue-800)">• Most components support variants using slash notation: <code class="font(mono) bg(white) px(xs) py(1) r(sm)">component(variant/size)</code></p>
            <p class="c(blue-800)">• Components integrate seamlessly with utility classes for customization</p>
            <p class="c(blue-800)">• Use these components as starting points and enhance with utility classes</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</div>