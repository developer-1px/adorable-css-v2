<script lang="ts">
  import { Palette, Type, Box, Grid, Zap, Layers, Layout, Copy, Check } from 'lucide-svelte';
  
  // 완전한 색상 팔레트 시스템
  const colorFamilies = [
    { name: 'Primary', colors: ['primary-50', 'primary-100', 'primary-200', 'primary-300', 'primary-400', 'primary-500', 'primary-600', 'primary-700', 'primary-800', 'primary-900'] },
    { name: 'Gray', colors: ['gray-50', 'gray-100', 'gray-200', 'gray-300', 'gray-400', 'gray-500', 'gray-600', 'gray-700', 'gray-800', 'gray-900'] },
    { name: 'Blue', colors: ['blue-50', 'blue-100', 'blue-200', 'blue-300', 'blue-400', 'blue-500', 'blue-600', 'blue-700', 'blue-800', 'blue-900'] },
    { name: 'Purple', colors: ['purple-50', 'purple-100', 'purple-200', 'purple-300', 'purple-400', 'purple-500', 'purple-600', 'purple-700', 'purple-800', 'purple-900'] },
    { name: 'Green', colors: ['green-50', 'green-100', 'green-200', 'green-300', 'green-400', 'green-500', 'green-600', 'green-700', 'green-800', 'green-900'] },
    { name: 'Red', colors: ['red-50', 'red-100', 'red-200', 'red-300', 'red-400', 'red-500', 'red-600', 'red-700', 'red-800', 'red-900'] },
    { name: 'Orange', colors: ['orange-50', 'orange-100', 'orange-200', 'orange-300', 'orange-400', 'orange-500', 'orange-600', 'orange-700', 'orange-800', 'orange-900'] },
    { name: 'Pink', colors: ['pink-50', 'pink-100', 'pink-200', 'pink-300', 'pink-400', 'pink-500', 'pink-600', 'pink-700', 'pink-800', 'pink-900'] }
  ];

  const semanticColors = [
    { name: 'primary', desc: 'Brand primary color' },
    { name: 'secondary', desc: 'Supporting brand color' },
    { name: 'accent', desc: 'Highlight & emphasis' },
    { name: 'mute', desc: 'Subtle backgrounds' },
    { name: 'success', desc: 'Success states' },
    { name: 'warning', desc: 'Warning states' },
    { name: 'error', desc: 'Error states' },
    { name: 'info', desc: 'Information states' }
  ];

  // Complete semantic component system
  const componentCategories = {
    layout: [
      {
        name: 'hero()',
        variants: ['hero()', 'hero(full)', 'hero(compact)', 'hero(split)', 'hero(product)'],
        description: 'Full-viewport hero sections with Apple-inspired layouts'
      },
      {
        name: 'section()',
        variants: ['section()', 'section(large)', 'section(compact)', 'section(feature)'],
        description: 'Consistent vertical rhythm for page sections'
      },
      {
        name: 'contain()',
        variants: ['contain()', 'contain(narrow)', 'contain(wide)', 'contain(full)'],
        description: 'Responsive containers with smart padding'
      },
      {
        name: 'stack()',
        variants: ['stack()', 'stack(sm)', 'stack(lg)', 'stack(xl)'],
        description: 'Automatic spacing between child elements'
      },
      {
        name: 'panel()',
        variants: ['panel()', 'panel(flat)', 'panel(raised)', 'panel(inset)'],
        description: 'Content containers with subtle backgrounds'
      },
      {
        name: 'divider()',
        variants: ['divider()', 'divider(vertical)', 'divider(dashed)', 'divider(thick)'],
        description: 'Visual separation between content sections'
      }
    ],
    typography: [
      {
        name: 'heading()',
        variants: ['heading(super)', 'heading(elevated)', 'heading(headline)', 'heading(reduced)'],
        description: 'Responsive heading system with optimal typography'
      },
      {
        name: 'paragraph()',
        variants: ['paragraph()', 'paragraph(lead)', 'paragraph(small)', 'paragraph(fine)'],
        description: 'Body text with consistent line heights'
      },
      {
        name: 'prose()',
        variants: ['prose()', 'prose(sm)', 'prose(lg)', 'prose(xl)'],
        description: 'Rich text formatting for articles and content'
      },
      {
        name: 'link()',
        variants: ['link()', 'link(subtle)', 'link(bold)', 'link(external)'],
        description: 'Consistent link styling with hover states'
      },
      {
        name: 'caption()',
        variants: ['caption()', 'caption(sm)', 'caption(muted)'],
        description: 'Small descriptive text for images and tables'
      }
    ],
    components: [
      {
        name: 'card()',
        variants: ['card()', 'card(flat)', 'card(elevated)', 'card(interactive)'],
        description: 'Versatile content containers with shadows'
      },
      {
        name: 'alert()',
        variants: ['alert(info)', 'alert(success)', 'alert(warning)', 'alert(error)'],
        description: 'Status messages and notifications'
      },
      {
        name: 'badge()',
        variants: ['badge()', 'badge(sm)', 'badge(lg)', 'badge(outline)'],
        description: 'Small status indicators and labels'
      },
      {
        name: 'avatar()',
        variants: ['avatar()', 'avatar(sm)', 'avatar(lg)', 'avatar(xl)'],
        description: 'User profile images with consistent sizing'
      },
      {
        name: 'tooltip()',
        variants: ['tooltip()', 'tooltip(top)', 'tooltip(bottom)', 'tooltip(left)'],
        description: 'Contextual help and information overlays'
      },
      {
        name: 'modal()',
        variants: ['modal()', 'modal(sm)', 'modal(lg)', 'modal(fullscreen)'],
        description: 'Dialog boxes and overlay interfaces'
      }
    ],
    forms: [
      {
        name: 'btn()',
        variants: ['btn(primary)', 'btn(secondary)', 'btn(outline)', 'btn(ghost)', 'btn(danger)'],
        description: 'Interactive buttons with consistent styling'
      },
      {
        name: 'input()',
        variants: ['input()', 'input(lg)', 'input(error)', 'input(disabled)'],
        description: 'Text input fields with validation states'
      },
      {
        name: 'field()',
        variants: ['field()', 'field(inline)', 'field(stacked)'],
        description: 'Form field groups with labels and help text'
      },
      {
        name: 'select()',
        variants: ['select()', 'select(lg)', 'select(multiple)'],
        description: 'Dropdown selection controls'
      },
      {
        name: 'checkbox()',
        variants: ['checkbox()', 'checkbox(lg)', 'checkbox(indeterminate)'],
        description: 'Binary choice controls'
      },
      {
        name: 'radio()',
        variants: ['radio()', 'radio(lg)', 'radio(card)'],
        description: 'Single choice from multiple options'
      }
    ]
  };

  let copiedComponent = '';
  
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copiedComponent = text;
    setTimeout(() => copiedComponent = '', 2000);
  }
</script>

<svelte:head>
  <title>Design System - AdorableCSS</title>
</svelte:head>

<!-- Hero Section using hero() + contain() + heading() -->
<section class="hero(compact) bg(white) border-b(1/gray-200)">
  <div class="contain(narrow) content(hero)">
    <h1 class="heading(elevated) c(gray-900)">Design System</h1>
    <p class="lead() c(mute)">
      A complete design system built into AdorableCSS. 
      Consistent, beautiful, and ready to use.
    </p>
  </div>
</section>

<!-- Colors Section using section() + contain() + heading() -->
<section class="section() border-b(1/gray-200)" id="colors">
  <div class="contain(wide)">
    <div class="content(centered) mb(4xl)">
      <h2 class="heading(headline) c(gray-900)">Complete Color Palette</h2>
      <p class="lead() c(mute)">
        OKLCH-based color system with semantic naming, automatic shades (50-900), and gradient support.
      </p>
    </div>
    
    <!-- Semantic Colors using card() -->
    <div class="stack(2xl)">
      <h3 class="heading(reduced) c(gray-900)">Semantic Colors</h3>
      <div class="grid(2) gap(lg) md:grid(4)">
        {#each semanticColors as color}
          <div class="card() p(lg)">
            <div class="vbox gap(sm)">
              <div class="h(60px) bg({color.name}) r(md)"></div>
              <div>
                <p class="heading(caption) bold">{color.name}</p>
                <p class="prose(sm) c(mute)">{color.desc}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Color Families using stack() + heading() -->
    <div class="stack(2xl)">
      <h3 class="heading(reduced) c(gray-900)">Color Families (50-900 Shades)</h3>
      <div class="stack(xl)">
        {#each colorFamilies as family}
          <div class="stack(sm)">
            <h4 class="heading(subhead) c(gray-700)">{family.name}</h4>
            <div class="hbox gap(xs) overflow-x(auto)">
              {#each family.colors as color}
                <div class="vbox gap(xs) items(center) shrink(0)">
                  <div class="w(40px) h(40px) bg({color}) r(md) border(1/gray-200)"></div>
                  <span class="prose(xs) c(mute)">{color.split('-')[1]}</span>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Gradient Examples using stack() + card() -->
    <div class="stack(2xl)">
      <h3 class="heading(reduced) c(gray-900)">Gradient System</h3>
      <div class="grid(1) gap(lg) md:grid(2)">
        <div class="card() p(lg)">
          <div class="stack(sm)">
            <div class="h(80px) bg(135deg/purple-500..pink-500) r(lg)"></div>
            <code class="caption() bg(gray-100) p(sm) r(sm)">bg(135deg/purple-500..pink-500)</code>
          </div>
        </div>
        <div class="card() p(lg)">
          <div class="stack(sm)">
            <div class="h(80px) bg(primary..accent) r(lg)"></div>
            <code class="caption() bg(gray-100) p(sm) r(sm)">bg(primary..accent)</code>
          </div>
        </div>
        <div class="card() p(lg)">
          <div class="stack(sm)">
            <div class="h(80px) bg(to-br/blue-400..purple-600) r(lg)"></div>
            <code class="caption() bg(gray-100) p(sm) r(sm)">bg(to-br/blue-400..purple-600)</code>
          </div>
        </div>
        <div class="card() p(lg)">
          <div class="stack(sm)">
            <h4 class="heading(subhead) c(135deg/purple-500..pink-500)">Gradient Text</h4>
            <code class="caption() bg(gray-100) p(sm) r(sm)">c(135deg/purple-500..pink-500)</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Typography Section -->
<section class="py(5xl) border-b(1/gray-200)" id="typography">
  <div class="container() max-w(1000px)">
    <div class="mb(4xl)">
      <h2 class="font(3xl) bold c(gray-900) mb(lg)">Typography</h2>
      <p class="font(lg) c(mute) max-w(600px)">
        Consistent type scale for beautiful typography.
      </p>
    </div>
    
    <div class="vbox gap(2xl)">
      <div class="vbox gap(lg)">
        <h1 class="heading(display)">Display Heading</h1>
        <h1 class="heading(hero)">Hero Heading</h1>
        <h1 class="heading(xl)">Extra Large Heading</h1>
        <h2 class="heading(lg)">Large Heading</h2>
        <h3 class="heading(md)">Medium Heading</h3>
        <h4 class="heading(sm)">Small Heading</h4>
      </div>
      
      <div class="vbox gap(lg)">
        <p class="prose(xl)">Extra large paragraph text for emphasis.</p>
        <p class="prose(lg)">Large paragraph text for readability.</p>
        <p class="prose()">Default paragraph text for body content.</p>
        <p class="prose(sm)">Small paragraph text for secondary content.</p>
      </div>
    </div>
  </div>
</section>

<!-- Spacing Section -->
<section class="py(5xl) border-b(1/gray-200)" id="spacing">
  <div class="container() max-w(1000px)">
    <div class="mb(4xl)">
      <h2 class="font(3xl) bold c(gray-900) mb(lg)">Spacing</h2>
      <p class="font(lg) c(mute) max-w(600px)">
        Consistent spacing scale based on design tokens.
      </p>
    </div>
    
    <div class="vbox gap(xl)">
      {#each ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as size}
        <div class="hbox(middle) gap(xl)">
          <span class="font(sm) c(mute) w(60px)">{size}</span>
          <div class="h(40px) bg(gray-200) r(md)" style="width: var(--space-{size})"></div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Layout Components Section -->
<section class="section() border-b(1/gray-200)" id="layout-components">
  <div class="contain(wide)">
    <div class="content(centered) mb(4xl)">
      <h2 class="heading(headline) c(gray-900)">Layout Components</h2>
      <p class="paragraph(lead) c(mute)">
        Foundational layout components for structure and spacing.
      </p>
    </div>
    
    <div class="stack(4xl)">
      {#each componentCategories.layout as component}
        <div class="panel() p(2xl)">
          <div class="stack(xl)">
            <div class="stack(sm)">
              <h3 class="heading(reduced) c(gray-900)">{component.name}</h3>
              <p class="paragraph() c(mute)">{component.description}</p>
            </div>
            
            <div class="grid(1) gap(lg) md:grid(2)">
              {#each component.variants as variant}
                <div class="card(interactive) p(lg)">
                  <div class="stack(sm)">
                    <div class="hbox(between) items(start)">
                      <code class="badge() bg(gray-100) px(sm) py(xs)">{variant}</code>
                      <button 
                        class="btn(ghost) p(xs)"
                        on:click={() => copyToClipboard(variant)}
                      >
                        {#if copiedComponent === variant}
                          <Check size="16" class="c(success)" />
                        {:else}
                          <Copy size="16" class="c(mute)" />
                        {/if}
                      </button>
                    </div>
                    
                    <!-- Layout Preview -->
                    {#if component.name === 'hero()'}
                      <div class="h(100px) bg(purple-50) r(md) border(1/purple-200) vbox(center)">
                        <span class="caption() c(purple-700)">Hero Layout Preview</span>
                      </div>
                    {:else if component.name === 'section()'}
                      <div class="h(80px) bg(blue-50) r(md) border(1/blue-200) vbox(center)">
                        <span class="caption() c(blue-700)">Section Rhythm</span>
                      </div>
                    {:else if component.name === 'contain()'}
                      <div class="h(60px) bg(green-50) r(md) border(1/green-200) vbox(center)">
                        <span class="caption() c(green-700)">Container Width</span>
                      </div>
                    {:else if component.name === 'stack()'}
                      <div class="h(80px) bg(orange-50) r(md) border(1/orange-200) vbox(center) gap(xs)">
                        <div class="w(60px) h(8px) bg(orange-300) r(sm)"></div>
                        <div class="w(40px) h(8px) bg(orange-300) r(sm)"></div>
                        <div class="w(50px) h(8px) bg(orange-300) r(sm)"></div>
                      </div>
                    {:else if component.name === 'panel()'}
                      <div class="h(60px) bg(gray-100) r(md) border(1/gray-300) vbox(center)">
                        <span class="caption() c(gray-600)">Panel Container</span>
                      </div>
                    {:else if component.name === 'divider()'}
                      <div class="h(60px) bg(gray-50) r(md) border(1/gray-200) vbox(center)">
                        <div class="w(80px) h(1px) bg(gray-300)"></div>
                        <span class="caption() c(gray-600)">Divider Line</span>
                      </div>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Typography Components Section -->
<section class="section() border-b(1/gray-200)" id="typography-components">
  <div class="contain(wide)">
    <div class="content(centered) mb(4xl)">
      <h2 class="heading(headline) c(gray-900)">Typography Components</h2>
      <p class="paragraph(lead) c(mute)">
        Consistent text styling with responsive scaling and semantic hierarchy.
      </p>
    </div>
    
    <div class="stack(4xl)">
      {#each componentCategories.typography as component}
        <div class="panel() p(2xl)">
          <div class="stack(xl)">
            <div class="stack(sm)">
              <h3 class="heading(reduced) c(gray-900)">{component.name}</h3>
              <p class="paragraph() c(mute)">{component.description}</p>
            </div>
            
            <div class="grid(1) gap(lg) md:grid(2)">
              {#each component.variants as variant}
                <div class="card(interactive) p(lg)">
                  <div class="stack(sm)">
                    <div class="hbox(between) items(start)">
                      <code class="badge() bg(gray-100) px(sm) py(xs)">{variant}</code>
                      <button 
                        class="btn(ghost) p(xs)"
                        on:click={() => copyToClipboard(variant)}
                      >
                        {#if copiedComponent === variant}
                          <Check size="16" class="c(success)" />
                        {:else}
                          <Copy size="16" class="c(mute)" />
                        {/if}
                      </button>
                    </div>
                    
                    <!-- Typography Preview -->
                    {#if component.name === 'heading()'}
                      <div class="stack(xs)">
                        <h4 class="{variant} c(gray-900)">Sample Heading</h4>
                        <span class="caption() c(mute)">Responsive typography</span>
                      </div>
                    {:else if component.name === 'paragraph()'}
                      <div class="stack(xs)">
                        <p class="{variant} c(gray-700)">This is sample paragraph text showing the styling.</p>
                        <span class="caption() c(mute)">Body text styling</span>
                      </div>
                    {:else if component.name === 'prose()'}
                      <div class="stack(xs)">
                        <div class="{variant}">
                          <p class="c(gray-700)">Rich text with <strong>bold</strong> and <em>italic</em> styling.</p>
                        </div>
                        <span class="caption() c(mute)">Article formatting</span>
                      </div>
                    {:else if component.name === 'link()'}
                      <div class="stack(xs)">
                        <a href="#" class="{variant}">Sample Link Text</a>
                        <span class="caption() c(mute)">Interactive links</span>
                      </div>
                    {:else if component.name === 'caption()'}
                      <div class="stack(xs)">
                        <span class="{variant} c(mute)">Caption text example</span>
                        <span class="prose(xs) c(mute)">Small descriptive text</span>
                      </div>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- UI Components Section -->
<section class="section() border-b(1/gray-200)" id="ui-components">
  <div class="contain(wide)">
    <div class="content(centered) mb(4xl)">
      <h2 class="heading(headline) c(gray-900)">UI Components</h2>
      <p class="paragraph(lead) c(mute)">
        Interactive elements and content containers for building interfaces.
      </p>
    </div>
    
    <div class="stack(4xl)">
      {#each componentCategories.components as component}
        <div class="panel() p(2xl)">
          <div class="stack(xl)">
            <div class="stack(sm)">
              <h3 class="heading(reduced) c(gray-900)">{component.name}</h3>
              <p class="paragraph() c(mute)">{component.description}</p>
            </div>
            
            <div class="grid(1) gap(lg) md:grid(2)">
              {#each component.variants as variant}
                <div class="card(interactive) p(lg)">
                  <div class="stack(sm)">
                    <div class="hbox(between) items(start)">
                      <code class="badge() bg(gray-100) px(sm) py(xs)">{variant}</code>
                      <button 
                        class="btn(ghost) p(xs)"
                        on:click={() => copyToClipboard(variant)}
                      >
                        {#if copiedComponent === variant}
                          <Check size="16" class="c(success)" />
                        {:else}
                          <Copy size="16" class="c(mute)" />
                        {/if}
                      </button>
                    </div>
                    
                    <!-- Component Preview -->
                    {#if component.name === 'card()'}
                      <div class="{variant} p(md) bg(white) border(1/gray-200)">
                        <span class="caption() c(gray-600)">Card Content</span>
                      </div>
                    {:else if component.name === 'alert()'}
                      <div class="{variant} p(sm) r(md)">
                        <span class="caption() bold">Alert message here</span>
                      </div>
                    {:else if component.name === 'badge()'}
                      <div class="vbox gap(xs)">
                        <span class="{variant} px(sm) py(xs) r(full)">Badge</span>
                        <span class="caption() c(mute)">Status indicator</span>
                      </div>
                    {:else if component.name === 'avatar()'}
                      <div class="vbox gap(xs)">
                        <div class="{variant} bg(purple-500) r(full) vbox(center)">
                          <span class="caption() c(white) bold">JD</span>
                        </div>
                        <span class="caption() c(mute)">User avatar</span>
                      </div>
                    {:else if component.name === 'tooltip()'}
                      <div class="vbox gap(xs)">
                        <div class="relative inline-block">
                          <span class="paragraph() c(gray-700)">Hover me</span>
                          <div class="{variant} absolute -top(8px) bg(gray-900) c(white) px(sm) py(xs) r(sm)">
                            <span class="caption()">Tooltip text</span>
                          </div>
                        </div>
                        <span class="caption() c(mute)">Contextual help</span>
                      </div>
                    {:else if component.name === 'modal()'}
                      <div class="h(80px) bg(gray-50) r(md) border(1/gray-200) vbox(center)">
                        <span class="caption() c(gray-600)">Modal Dialog Preview</span>
                      </div>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Form Components Section -->
<section class="section() border-b(1/gray-200)" id="form-components">
  <div class="contain(wide)">
    <div class="content(centered) mb(4xl)">
      <h2 class="heading(headline) c(gray-900)">Form Components</h2>
      <p class="paragraph(lead) c(mute)">
        Input controls and form elements with consistent styling and validation states.
      </p>
    </div>
    
    <div class="stack(4xl)">
      {#each componentCategories.forms as component}
        <div class="panel() p(2xl)">
          <div class="stack(xl)">
            <div class="stack(sm)">
              <h3 class="heading(reduced) c(gray-900)">{component.name}</h3>
              <p class="paragraph() c(mute)">{component.description}</p>
            </div>
            
            <div class="grid(1) gap(lg) md:grid(2)">
              {#each component.variants as variant}
                <div class="card(interactive) p(lg)">
                  <div class="stack(sm)">
                    <div class="hbox(between) items(start)">
                      <code class="badge() bg(gray-100) px(sm) py(xs)">{variant}</code>
                      <button 
                        class="btn(ghost) p(xs)"
                        on:click={() => copyToClipboard(variant)}
                      >
                        {#if copiedComponent === variant}
                          <Check size="16" class="c(success)" />
                        {:else}
                          <Copy size="16" class="c(mute)" />
                        {/if}
                      </button>
                    </div>
                    
                    <!-- Form Component Preview -->
                    {#if component.name === 'btn()'}
                      <div class="vbox gap(xs)">
                        <button class="{variant}">Button Text</button>
                        <span class="caption() c(mute)">Interactive button</span>
                      </div>
                    {:else if component.name === 'input()'}
                      <div class="stack(xs)">
                        <input type="text" placeholder="Enter text..." class="{variant}" />
                        <span class="caption() c(mute)">Text input field</span>
                      </div>
                    {:else if component.name === 'field()'}
                      <div class="{variant}">
                        <label class="caption() bold c(gray-700)">Field Label</label>
                        <input type="text" placeholder="Input..." class="input()" />
                        <span class="caption() c(mute)">Help text here</span>
                      </div>
                    {:else if component.name === 'select()'}
                      <div class="stack(xs)">
                        <select class="{variant}">
                          <option>Choose option...</option>
                          <option>Option 1</option>
                          <option>Option 2</option>
                        </select>
                        <span class="caption() c(mute)">Dropdown selection</span>
                      </div>
                    {:else if component.name === 'checkbox()'}
                      <div class="stack(xs)">
                        <label class="hbox gap(sm) items(center)">
                          <input type="checkbox" class="{variant}" />
                          <span class="paragraph()">Checkbox label</span>
                        </label>
                        <span class="caption() c(mute)">Binary choice</span>
                      </div>
                    {:else if component.name === 'radio()'}
                      <div class="stack(xs)">
                        <label class="hbox gap(sm) items(center)">
                          <input type="radio" name="example" class="{variant}" />
                          <span class="paragraph()">Radio option</span>
                        </label>
                        <span class="caption() c(mute)">Single choice</span>
                      </div>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Complete Usage Example Section -->
<section class="section() bg(gray-50)" id="usage-examples">
  <div class="contain()">
    <div class="content(centered) mb(4xl)">
      <h2 class="heading(headline) c(gray-900)">Complete Usage Examples</h2>
      <p class="paragraph(lead) c(mute)">
        Real-world examples showing how to combine semantic components.
      </p>
    </div>
    
    <div class="stack(3xl)">
      <!-- Hero Page Example -->
      <div class="card(elevated) p(2xl)">
        <div class="stack(lg)">
          <h3 class="heading(reduced) c(gray-900)">Hero Page Layout</h3>
          <pre class="panel(flat) p(xl) overflow-x(auto) bg(gray-900) c(gray-100) r(lg)"><code>&lt;section class="hero()"&gt;
  &lt;div class="contain(narrow)"&gt;
    &lt;div class="content(hero)"&gt;
      &lt;h1 class="heading(super)"&gt;Build Amazing Apps&lt;/h1&gt;
      &lt;p class="paragraph(lead)"&gt;With AdorableCSS semantic components&lt;/p&gt;
      &lt;div class="stack(md)"&gt;
        &lt;button class="btn(primary)"&gt;Get Started&lt;/button&gt;
        &lt;button class="btn(outline)"&gt;Learn More&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/section&gt;</code></pre>
        </div>
      </div>
      
      <!-- Form Example -->
      <div class="card(elevated) p(2xl)">
        <div class="stack(lg)">
          <h3 class="heading(reduced) c(gray-900)">Contact Form</h3>
          <pre class="panel(flat) p(xl) overflow-x(auto) bg(gray-900) c(gray-100) r(lg)"><code>&lt;section class="section()"&gt;
  &lt;div class="contain(narrow)"&gt;
    &lt;h2 class="heading(headline)"&gt;Contact Us&lt;/h2&gt;
    &lt;div class="stack(lg)"&gt;
      &lt;div class="field()"&gt;
        &lt;label&gt;Name&lt;/label&gt;
        &lt;input class="input()" placeholder="Your name" /&gt;
      &lt;/div&gt;
      &lt;div class="field()"&gt;
        &lt;label&gt;Email&lt;/label&gt;
        &lt;input class="input()" type="email" placeholder="your@email.com" /&gt;
      &lt;/div&gt;
      &lt;button class="btn(primary)"&gt;Send Message&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/section&gt;</code></pre>
        </div>
      </div>
    </div>
  </div>
</section>