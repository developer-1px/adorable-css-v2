<script lang="ts">
  import { onMount } from 'svelte';
  import CodeHighlighter from '$lib/components/CodeHighlighter.svelte';
  import { Copy, Check, Palette, Type, Layout, Box, Sparkles, Zap, Heart } from 'lucide-svelte';
  
  let copiedSection = '';
  let activeTab = 'layout';
  
  function copyCode(code: string, section: string) {
    navigator.clipboard.writeText(code);
    copiedSection = section;
    setTimeout(() => copiedSection = '', 2000);
  }
  
  // Design system categories
  const categories = [
    { id: 'layout', name: 'Layout', icon: Layout },
    { id: 'typography', name: 'Typography', icon: Type },
    { id: 'components', name: 'Components', icon: Box },
    { id: 'colors', name: 'Colors', icon: Palette },
    { id: 'effects', name: 'Effects', icon: Sparkles }
  ];
</script>

<div class="min-h(screen) bg(white)">
  <!-- Hero Section -->
  <section class="section(hero) bg(gray-50) relative clip">
    <div class="layer pointer-events(none)">
      <div class="absolute w(600px) h(600px) r(full) blur(100px) opacity(0.05) 
                  bg(purple-500) top(-300px) left(-200px)"></div>
    </div>
    
    <div class="contain(wide) relative z(10)">
      <div class="content(hero)">
        <div class="hbox(pack) mb(xl)">
          <div class="hbox(middle) gap(sm) px(lg) py(sm) bg(purple-50) r(full) border(1/purple-200)">
            <Palette size="16" class="c(purple-600)" />
            <span class="font(sm) 600 c(purple-700)">Complete Design System</span>
          </div>
        </div>
        
        <h1 class="heading(h1) max-w(800px) mx(auto)">
          <span class="c(gray-900)">AdorableCSS</span>
          <span class="block bg(135deg/purple-500..pink-500)" style="-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
            Design System
          </span>
        </h1>
        
        <p class="font(xl/1.6) c(gray-600) max-w(600px) mx(auto)">
          A comprehensive collection of layout utilities, components, and design patterns.
          <strong class="c(gray-900)">Everything you need to build beautiful UIs.</strong>
        </p>
      </div>
    </div>
  </section>
  
  <!-- Tabs Navigation -->
  <nav class="sticky top(0) z(50) bg(white) border-b(1/gray-200) backdrop-blur(lg)">
    <div class="contain(wide)">
      <div class="hbox(middle) gap(0) clip">
        {#each categories as category}
          <button 
            class="px(xl) py(lg) font(sm) 600 transition relative
                   {activeTab === category.id ? 'c(purple-600)' : 'c(gray-600) hover:c(gray-900)'}"
            on:click={() => activeTab = category.id}
          >
            <div class="hbox(middle) gap(sm)">
              <svelte:component this={category.icon} size="16" />
              <span>{category.name}</span>
            </div>
            {#if activeTab === category.id}
              <div class="absolute bottom(0) left(0) right(0) h(2px) bg(purple-600)"></div>
            {/if}
          </button>
        {/each}
      </div>
    </div>
  </nav>
  
  <!-- Content Sections -->
  <div class="contain(wide) py(3xl)">
    
    <!-- Layout System -->
    {#if activeTab === 'layout'}
      <div class="rhythm()">
        <!-- Section Utilities -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Section Utilities</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Automatic spacing and layout for different types of page sections.
            </p>
          </div>
          
          <div class="grid grid-cols(1) md:grid-cols(2) gap(xl)">
            <!-- section() -->
            <div class="card() p(xl) hover:shadow(lg) transition">
              <div class="stack(lg)">
                <div class="hbox(middle+between)">
                  <h3 class="heading(h4) c(gray-900)">section()</h3>
                  <button 
                    class="p(sm) hover:bg(gray-100) r(md) transition"
                    on:click={() => copyCode('section()', 'section-default')}
                  >
                    {#if copiedSection === 'section-default'}
                      <Check size="16" class="c(green-600)" />
                    {:else}
                      <Copy size="16" class="c(gray-400)" />
                    {/if}
                  </button>
                </div>
                
                <div class="bg(gray-900) r(lg) clip">
                  <CodeHighlighter 
                    code={`<section class="section()">
  <!-- Default section with balanced padding -->
</section>`}
                    language="html" 
                    className="font(sm/1.4)" 
                  />
                </div>
                
                <div class="bg(gray-50) r(md) p(lg) text(center)">
                  <div class="font(sm) 600 c(gray-700)">padding: 4xl 1rem</div>
                </div>
              </div>
            </div>
            
            <!-- section(hero) -->
            <div class="card() p(xl) hover:shadow(lg) transition">
              <div class="stack(lg)">
                <div class="hbox(middle+between)">
                  <h3 class="heading(h4) c(gray-900)">section(hero)</h3>
                  <button 
                    class="p(sm) hover:bg(gray-100) r(md) transition"
                    on:click={() => copyCode('section(hero)', 'section-hero')}
                  >
                    {#if copiedSection === 'section-hero'}
                      <Check size="16" class="c(green-600)" />
                    {:else}
                      <Copy size="16" class="c(gray-400)" />
                    {/if}
                  </button>
                </div>
                
                <div class="bg(gray-900) r(lg) clip">
                  <CodeHighlighter 
                    code={`<section class="section(hero)">
  <!-- Full-height hero section -->
</section>`}
                    language="html" 
                    className="font(sm/1.4)" 
                  />
                </div>
                
                <div class="bg(purple-50) r(md) p(lg) text(center)">
                  <div class="font(sm) 600 c(purple-700)">min-height: 100vh</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Container System -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Container System</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Responsive containers with automatic centering and consistent padding.
            </p>
          </div>
          
          <div class="stack(xl)">
            {#each [
              { name: 'contain()', width: '64rem', desc: 'Default container' },
              { name: 'contain(narrow)', width: '48rem', desc: 'Text-focused content' },
              { name: 'contain(wide)', width: '80rem', desc: 'Wide layouts' },
              { name: 'contain(full)', width: '96rem', desc: 'Maximum width' }
            ] as container}
              <div class="card() p(xl) hover:shadow(lg) transition">
                <div class="hbox(middle+between) mb(lg)">
                  <div class="stack(sm)">
                    <h3 class="heading(h4) c(gray-900)">{container.name}</h3>
                    <p class="font(sm) c(gray-600)">{container.desc}</p>
                  </div>
                  <div class="bg(purple-100) px(lg) py(sm) r(full)">
                    <span class="font(sm) 600 c(purple-700)">{container.width}</span>
                  </div>
                </div>
                
                <div class="bg(gray-100) r(lg) p(lg)">
                  <div class="bg(white) r(md) h(100px) vbox(pack)">
                    <span class="font(sm) c(gray-500)">Container content</span>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
        
        <!-- Layout Utilities -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Layout Utilities</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Flexbox utilities that match Figma's mental model.
            </p>
          </div>
          
          <div class="grid grid-cols(1) lg:grid-cols(3) gap(xl)">
            <!-- hbox -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">Horizontal Box</h3>
              
              <div class="stack(md)">
                <div class="bg(gray-900) r(md) clip">
                  <CodeHighlighter 
                    code={`hbox()         // flex-direction: row
hbox(middle)   // align-items: center
hbox(right)    // justify-content: end
hbox(between)  // justify + space-between`}
                    language="css" 
                    className="font(xs/1.3)" 
                  />
                </div>
                
                <div class="bg(purple-50) r(md) p(md)">
                  <div class="hbox(middle+between)">
                    <div class="w(40px) h(40px) bg(purple-400) r(sm)"></div>
                    <div class="w(40px) h(40px) bg(purple-400) r(sm)"></div>
                    <div class="w(40px) h(40px) bg(purple-400) r(sm)"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- vbox -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">Vertical Box</h3>
              
              <div class="stack(md)">
                <div class="bg(gray-900) r(md) clip">
                  <CodeHighlighter 
                    code={`vbox()       // flex-direction: column
vbox(pack)   // justify-content: center
vbox(center) // align-items: center
vbox(end)    // align-items: flex-end`}
                    language="css" 
                    className="font(xs/1.3)" 
                  />
                </div>
                
                <div class="bg(blue-50) r(md) p(md) h(160px)">
                  <div class="vbox(pack) h(full)">
                    <div class="w(full) h(30px) bg(blue-400) r(sm) mb(sm)"></div>
                    <div class="w(full) h(30px) bg(blue-400) r(sm) mb(sm)"></div>
                    <div class="w(full) h(30px) bg(blue-400) r(sm)"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- gap -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">Gap Utilities</h3>
              
              <div class="stack(md)">
                <div class="bg(gray-900) r(md) clip">
                  <CodeHighlighter 
                    code={`gap(sm)    // 8px
gap(md)    // 12px  
gap(lg)    // 16px
gap(xl)    // 20px
gap(auto)  // space-between`}
                    language="css" 
                    className="font(xs/1.3)" 
                  />
                </div>
                
                <div class="bg(green-50) r(md) p(md)">
                  <div class="hbox gap(lg)">
                    <div class="w(30px) h(30px) bg(green-400) r(sm)"></div>
                    <div class="w(30px) h(30px) bg(green-400) r(sm)"></div>
                    <div class="w(30px) h(30px) bg(green-400) r(sm)"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Content Layout -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Content Layout</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Pre-built patterns for common content layouts.
            </p>
          </div>
          
          <div class="grid grid-cols(1) md:grid-cols(2) gap(xl)">
            <!-- stack() -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">Stack Layout</h3>
              
              <div class="bg(gray-900) r(lg) clip mb(lg)">
                <CodeHighlighter 
                  code={`<div class="stack()">
  <!-- Vertical stack with default gap -->
</div>

<div class="stack(2xl)">
  <!-- Vertical stack with large gap -->
</div>`}
                  language="html" 
                  className="font(sm/1.4)" 
                />
              </div>
              
              <div class="bg(gray-50) r(md) p(lg)">
                <div class="stack(lg)">
                  <div class="bg(gray-200) h(40px) r(sm)"></div>
                  <div class="bg(gray-200) h(40px) r(sm)"></div>
                  <div class="bg(gray-200) h(40px) r(sm)"></div>
                </div>
              </div>
            </div>
            
            <!-- rhythm() -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">Rhythm Layout</h3>
              
              <div class="bg(gray-900) r(lg) clip mb(lg)">
                <CodeHighlighter 
                  code={`<div class="rhythm()">
  <!-- Automatic spacing between children -->
  <h2>Title</h2>
  <p>Paragraph</p>
  <div>Content</div>
</div>`}
                  language="html" 
                  className="font(sm/1.4)" 
                />
              </div>
              
              <div class="bg(gray-50) r(md) p(lg)">
                <div class="rhythm(md)">
                  <div class="bg(gray-300) h(30px) r(sm)"></div>
                  <div class="bg(gray-200) h(60px) r(sm)"></div>
                  <div class="bg(gray-200) h(40px) r(sm)"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
    
    <!-- Typography System -->
    {#if activeTab === 'typography'}
      <div class="rhythm()">
        <!-- Heading System -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Heading System</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Consistent typography scale with built-in responsive sizing.
            </p>
          </div>
          
          <div class="stack(xl)">
            <!-- Hero Text -->
            <div class="card() p(xl)">
              <div class="hbox(middle+between) mb(lg)">
                <h3 class="heading(h4) c(gray-900)">hero-text()</h3>
                <code class="bg(gray-100) px(md) py(sm) r(md) font(xs)">clamp(2.5rem, 5vw, 4rem)</code>
              </div>
              
              <div class="bg(gray-50) r(lg) p(xl)">
                <h1 class="hero-text() c(gray-900)">The quick brown fox</h1>
              </div>
              
              <div class="bg(gray-900) r(lg) clip mt(lg)">
                <CodeHighlighter 
                  code={`<h1 class="hero-text() c(gray-900)">
  Big Hero Title
</h1>`}
                  language="html" 
                  className="font(sm/1.4)" 
                />
              </div>
            </div>
            
            <!-- Regular Headings -->
            {#each [
              { level: 'h1', size: '2.5rem', weight: '800' },
              { level: 'h2', size: '2rem', weight: '700' },
              { level: 'h3', size: '1.5rem', weight: '700' },
              { level: 'h4', size: '1.25rem', weight: '600' },
              { level: 'h5', size: '1rem', weight: '600' }
            ] as heading}
              <div class="card() p(xl)">
                <div class="hbox(middle+between) mb(lg)">
                  <h3 class="heading(h4) c(gray-900)">heading({heading.level})</h3>
                  <div class="hbox gap(md)">
                    <code class="bg(gray-100) px(md) py(sm) r(md) font(xs)">{heading.size}</code>
                    <code class="bg(gray-100) px(md) py(sm) r(md) font(xs)">{heading.weight}</code>
                  </div>
                </div>
                
                <div class="bg(gray-50) r(lg) p(lg)">
                  <div class="heading({heading.level}) c(gray-900)">
                    The quick brown fox jumps over
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
        
        <!-- Text Utilities -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Text Utilities</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Special text styles for different content types.
            </p>
          </div>
          
          <div class="grid grid-cols(1) md:grid-cols(2) gap(xl)">
            <!-- Lead Text -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">lead()</h3>
              
              <div class="bg(gray-50) r(lg) p(lg) mb(lg)">
                <p class="lead() c(gray-700)">
                  This is lead text, perfect for introductions and important paragraphs that need emphasis.
                </p>
              </div>
              
              <div class="bg(gray-900) r(lg) clip">
                <CodeHighlighter 
                  code={`<p class="lead()">
  Important introduction text
</p>`}
                  language="html" 
                  className="font(sm/1.4)" 
                />
              </div>
            </div>
            
            <!-- Caption Text -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">caption()</h3>
              
              <div class="bg(gray-50) r(lg) p(lg) mb(lg)">
                <p class="caption() c(gray-600)">
                  This is caption text, ideal for image captions, footnotes, and secondary information.
                </p>
              </div>
              
              <div class="bg(gray-900) r(lg) clip">
                <CodeHighlighter 
                  code={`<p class="caption()">
  Image caption or footnote
</p>`}
                  language="html" 
                  className="font(sm/1.4)" 
                />
              </div>
            </div>
            
            <!-- Label Text -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">label()</h3>
              
              <div class="bg(gray-50) r(lg) p(lg) mb(lg)">
                <span class="label() c(gray-700)">Form Label</span>
              </div>
              
              <div class="bg(gray-900) r(lg) clip">
                <CodeHighlighter 
                  code={`<label class="label()">
  Form Field Label
</label>`}
                  language="html" 
                  className="font(sm/1.4)" 
                />
              </div>
            </div>
            
            <!-- Flow Text -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">flow()</h3>
              
              <div class="bg(gray-50) r(lg) p(lg) mb(lg)">
                <p class="flow() c(gray-700)">
                  This text has optimal line width for readability. Perfect for articles and long-form content where reading comfort is important.
                </p>
              </div>
              
              <div class="bg(gray-900) r(lg) clip">
                <CodeHighlighter 
                  code={`<article class="flow()">
  <!-- Optimal line width -->
</article>`}
                  language="html" 
                  className="font(sm/1.4)" 
                />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Font Utilities -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Font Utilities</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Comprehensive font sizing and weight system.
            </p>
          </div>
          
          <div class="grid grid-cols(1) lg:grid-cols(2) gap(xl)">
            <!-- Font Sizes -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">Font Sizes</h3>
              
              <div class="stack(md)">
                {#each [
                  { name: 'xs', size: '0.75rem' },
                  { name: 'sm', size: '0.875rem' },
                  { name: 'md', size: '1rem' },
                  { name: 'lg', size: '1.125rem' },
                  { name: 'xl', size: '1.25rem' },
                  { name: '2xl', size: '1.5rem' },
                  { name: '3xl', size: '1.875rem' },
                  { name: '4xl', size: '2.25rem' }
                ] as fontSize}
                  <div class="hbox(middle+between) p(sm) hover:bg(gray-50) r(md)">
                    <span class="font({fontSize.name}) c(gray-900)">font({fontSize.name})</span>
                    <code class="bg(gray-100) px(sm) py(xs) r(sm) font(xs)">{fontSize.size}</code>
                  </div>
                {/each}
              </div>
            </div>
            
            <!-- Font Weights -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">Font Weights</h3>
              
              <div class="stack(md)">
                {#each [
                  { weight: '100', name: 'Thin' },
                  { weight: '200', name: 'Extra Light' },
                  { weight: '300', name: 'Light' },
                  { weight: '400', name: 'Normal' },
                  { weight: '500', name: 'Medium' },
                  { weight: '600', name: 'Semi Bold' },
                  { weight: '700', name: 'Bold' },
                  { weight: '800', name: 'Extra Bold' },
                  { weight: '900', name: 'Black' }
                ] as fontWeight}
                  <div class="hbox(middle+between) p(sm) hover:bg(gray-50) r(md)">
                    <span class="{fontWeight.weight} font(lg) c(gray-900)">{fontWeight.weight}</span>
                    <span class="font(sm) c(gray-600)">{fontWeight.name}</span>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
    
    <!-- Components -->
    {#if activeTab === 'components'}
      <div class="rhythm()">
        <!-- Buttons -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Button System</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Pre-styled buttons with size and variant options.
            </p>
          </div>
          
          <div class="grid grid-cols(1) lg:grid-cols(2) gap(xl)">
            <!-- Button Variants -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">Button Variants</h3>
              
              <div class="stack(md)">
                <button class="btn(primary)">Primary Button</button>
                <button class="btn(secondary)">Secondary Button</button>
                <button class="btn(outline)">Outline Button</button>
                <button class="btn(ghost)">Ghost Button</button>
                <button class="btn(link)">Link Button</button>
              </div>
              
              <div class="bg(gray-900) r(lg) clip mt(lg)">
                <CodeHighlighter 
                  code={`btn(primary)
btn(secondary)
btn(outline)
btn(ghost)
btn(link)`}
                  language="css" 
                  className="font(sm/1.4)" 
                />
              </div>
            </div>
            
            <!-- Button Sizes -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">Button Sizes</h3>
              
              <div class="stack(md)">
                <button class="btn(primary/sm)">Small Button</button>
                <button class="btn(primary)">Default Button</button>
                <button class="btn(primary/lg)">Large Button</button>
                <button class="btn(primary/xl)">Extra Large</button>
              </div>
              
              <div class="bg(gray-900) r(lg) clip mt(lg)">
                <CodeHighlighter 
                  code={`btn(primary/sm)
btn(primary)    // default
btn(primary/lg)
btn(primary/xl)`}
                  language="css" 
                  className="font(sm/1.4)" 
                />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Cards -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Card System</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Versatile card components for content containers.
            </p>
          </div>
          
          <div class="grid grid-cols(1) md:grid-cols(3) gap(xl)">
            <!-- Default Card -->
            <div class="stack(lg)">
              <div class="card() p(xl)">
                <h3 class="heading(h4) c(gray-900) mb(md)">Default Card</h3>
                <p class="c(gray-600)">Basic card with subtle shadow and padding.</p>
              </div>
              
              <div class="bg(gray-900) r(lg) clip">
                <CodeHighlighter 
                  code={`card()`}
                  language="css" 
                  className="font(sm/1.4)" 
                />
              </div>
            </div>
            
            <!-- Elevated Card -->
            <div class="stack(lg)">
              <div class="card(elevated) p(xl)">
                <h3 class="heading(h4) c(gray-900) mb(md)">Elevated Card</h3>
                <p class="c(gray-600)">Card with larger shadow for emphasis.</p>
              </div>
              
              <div class="bg(gray-900) r(lg) clip">
                <CodeHighlighter 
                  code={`card(elevated)`}
                  language="css" 
                  className="font(sm/1.4)" 
                />
              </div>
            </div>
            
            <!-- Interactive Card -->
            <div class="stack(lg)">
              <div class="card(interactive) p(xl)">
                <h3 class="heading(h4) c(gray-900) mb(md)">Interactive Card</h3>
                <p class="c(gray-600)">Card with hover effects for clickable items.</p>
              </div>
              
              <div class="bg(gray-900) r(lg) clip">
                <CodeHighlighter 
                  code={`card(interactive)`}
                  language="css" 
                  className="font(sm/1.4)" 
                />
              </div>
            </div>
          </div>
          
          <!-- Glass Card -->
          <div class="card() p(xl) bg(gray-50)">
            <h3 class="heading(h4) c(gray-900) mb(lg)">Glass Morphism Card</h3>
            
            <div class="grid grid-cols(1) md:grid-cols(2) gap(xl)">
              <div class="relative">
                <!-- Background for glass effect -->
                <div class="absolute inset(0) bg(135deg/purple-400..pink-400) r(xl) blur(xl) opacity(0.3)"></div>
                
                <div class="glass() p(xl) relative">
                  <h4 class="heading(h5) c(gray-900) mb(md)">Glass Card</h4>
                  <p class="c(gray-700)">Beautiful glass morphism effect with backdrop blur.</p>
                </div>
              </div>
              
              <div class="bg(gray-900) r(lg) clip">
                <CodeHighlighter 
                  code={`<div class="glass() p(xl)">
  <!-- Glass morphism effect -->
</div>`}
                  language="html" 
                  className="font(sm/1.4)" 
                />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Badges & Alerts -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Badges & Alerts</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Status indicators and notification components.
            </p>
          </div>
          
          <div class="grid grid-cols(1) md:grid-cols(2) gap(xl)">
            <!-- Badges -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">Badge Variants</h3>
              
              <div class="hbox gap(md) flex-wrap mb(lg)">
                <span class="badge()">Default</span>
                <span class="badge(success)">Success</span>
                <span class="badge(warning)">Warning</span>
                <span class="badge(error)">Error</span>
                <span class="badge(info)">Info</span>
              </div>
              
              <div class="bg(gray-900) r(lg) clip">
                <CodeHighlighter 
                  code={`badge()
badge(success)
badge(warning)
badge(error)
badge(info)`}
                  language="css" 
                  className="font(sm/1.4)" 
                />
              </div>
            </div>
            
            <!-- Alerts -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">Alert Messages</h3>
              
              <div class="stack(md)">
                <div class="alert(success)">
                  <span class="600">Success!</span> Operation completed.
                </div>
                <div class="alert(warning)">
                  <span class="600">Warning!</span> Please review.
                </div>
                <div class="alert(error)">
                  <span class="600">Error!</span> Something went wrong.
                </div>
              </div>
              
              <div class="bg(gray-900) r(lg) clip mt(lg)">
                <CodeHighlighter 
                  code={`alert(success)
alert(warning)
alert(error)`}
                  language="css" 
                  className="font(sm/1.4)" 
                />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Form Elements -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Form Elements</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Consistent form styling with built-in states.
            </p>
          </div>
          
          <div class="card() p(xl)">
            <div class="grid grid-cols(1) md:grid-cols(2) gap(xl)">
              <div class="stack(lg)">
                <div>
                  <label class="label() c(gray-700) mb(sm) block">Default Input</label>
                  <input class="input()" placeholder="Enter text..." />
                </div>
                
                <div>
                  <label class="label() c(gray-700) mb(sm) block">Error State</label>
                  <input class="input(error)" placeholder="Invalid input..." />
                </div>
                
                <div>
                  <label class="label() c(gray-700) mb(sm) block">Success State</label>
                  <input class="input(success)" placeholder="Valid input..." />
                </div>
              </div>
              
              <div class="bg(gray-900) r(lg) clip">
                <CodeHighlighter 
                  code={`<!-- Default input -->
<input class="input()" />

<!-- Error state -->
<input class="input(error)" />

<!-- Success state -->
<input class="input(success)" />

<!-- With label -->
<label class="label()">Field Label</label>
<input class="input()" />`}
                  language="html" 
                  className="font(sm/1.4)" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
    
    <!-- Colors -->
    {#if activeTab === 'colors'}
      <div class="rhythm()">
        <!-- Color Palette -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Color System</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Automatic color palette generation with consistent shades.
            </p>
          </div>
          
          <!-- Primary Colors -->
          <div class="card() p(xl)">
            <h3 class="heading(h3) c(gray-900) mb(xl)">Primary Colors</h3>
            
            <div class="grid grid-cols(1) md:grid-cols(2) lg:grid-cols(3) gap(xl)">
              {#each ['purple', 'blue', 'green', 'yellow', 'orange', 'red'] as color}
                <div class="stack(lg)">
                  <h4 class="heading(h5) c(gray-900) capitalize">{color}</h4>
                  
                  <div class="stack(sm)">
                    {#each ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as shade}
                      <div class="hbox(middle+between) p(sm) r(md) bg({color}-{shade})">
                        <span class="font(sm) 600 {parseInt(shade) >= 500 ? 'c(white)' : 'c(gray-900)'}">
                          {color}-{shade}
                        </span>
                        <code class="font(xs) {parseInt(shade) >= 500 ? 'c(white.8)' : 'c(gray-700)'}">
                          bg({color}-{shade})
                        </code>
                      </div>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </div>
          
          <!-- Semantic Colors -->
          <div class="card() p(xl)">
            <h3 class="heading(h3) c(gray-900) mb(xl)">Semantic Colors</h3>
            
            <div class="grid grid-cols(1) md:grid-cols(2) gap(xl)">
              <div class="stack(lg)">
                <h4 class="heading(h5) c(gray-900)">Text Colors</h4>
                
                <div class="stack(md)">
                  <div class="hbox(middle+between) p(md) bg(gray-50) r(md)">
                    <span class="font(md) c(text-primary)">c(text-primary)</span>
                    <code class="font(xs) c(gray-600)">Primary text</code>
                  </div>
                  <div class="hbox(middle+between) p(md) bg(gray-50) r(md)">
                    <span class="font(md) c(text-secondary)">c(text-secondary)</span>
                    <code class="font(xs) c(gray-600)">Secondary text</code>
                  </div>
                  <div class="hbox(middle+between) p(md) bg(gray-50) r(md)">
                    <span class="font(md) c(text-subtle)">c(text-subtle)</span>
                    <code class="font(xs) c(gray-600)">Subtle text</code>
                  </div>
                </div>
              </div>
              
              <div class="stack(lg)">
                <h4 class="heading(h5) c(gray-900)">System Colors</h4>
                
                <div class="stack(md)">
                  <div class="hbox(middle+between) p(md) bg(primary) r(md)">
                    <span class="font(md) c(white)">bg(primary)</span>
                    <code class="font(xs) c(white.8)">Brand color</code>
                  </div>
                  <div class="hbox(middle+between) p(md) bg(success) r(md)">
                    <span class="font(md) c(white)">bg(success)</span>
                    <code class="font(xs) c(white.8)">Success state</code>
                  </div>
                  <div class="hbox(middle+between) p(md) bg(error) r(md)">
                    <span class="font(md) c(white)">bg(error)</span>
                    <code class="font(xs) c(white.8)">Error state</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Alpha Colors -->
          <div class="card() p(xl)">
            <h3 class="heading(h3) c(gray-900) mb(xl)">Alpha Transparency</h3>
            
            <div class="grid grid-cols(1) md:grid-cols(2) gap(xl)">
              <div>
                <h4 class="heading(h5) c(gray-900) mb(lg)">Syntax</h4>
                
                <div class="bg(gray-900) r(lg) clip mb(lg)">
                  <CodeHighlighter 
                    code={`// Color with alpha
c(white.5)      // 50% white
bg(black.2)     // 20% black
border(blue.3)  // 30% blue

// Any color works
bg(purple-500.8)
c(#ff0000.5)
border(rgb(0,0,0).2)`}
                    language="css" 
                    className="font(sm/1.4)" 
                  />
                </div>
              </div>
              
              <div>
                <h4 class="heading(h5) c(gray-900) mb(lg)">Examples</h4>
                
                <div class="stack(md) bg(gray-100) p(lg) r(lg)">
                  <div class="p(md) bg(white.9) r(md)">bg(white.9)</div>
                  <div class="p(md) bg(black.1) r(md)">bg(black.1)</div>
                  <div class="p(md) bg(purple-500.5) r(md) c(white)">bg(purple-500.5)</div>
                  <div class="p(md) border(2/blue-500.5) r(md)">border(2/blue-500.5)</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Gradients -->
          <div class="card() p(xl)">
            <h3 class="heading(h3) c(gray-900) mb(xl)">Gradient System</h3>
            
            <div class="stack(xl)">
              <div class="grid grid-cols(1) md:grid-cols(2) gap(xl)">
                <div>
                  <h4 class="heading(h5) c(gray-900) mb(lg)">Gradient Syntax</h4>
                  
                  <div class="bg(gray-900) r(lg) clip">
                    <CodeHighlighter 
                      code={`// Basic gradient
bg(purple-500..pink-500)

// With direction
bg(135deg/purple-500..pink-500)
bg(to-right/blue-400..green-400)

// Multiple colors
bg(45deg/red-500,yellow-500,green-500)

// With alpha
bg(90deg/white.8..transparent)`}
                      language="css" 
                      className="font(sm/1.4)" 
                    />
                  </div>
                </div>
                
                <div>
                  <h4 class="heading(h5) c(gray-900) mb(lg)">Gradient Examples</h4>
                  
                  <div class="stack(md)">
                    <div class="h(60px) bg(purple-500..pink-500) r(lg) vbox(pack) c(white) font(sm) 600">
                      bg(purple-500..pink-500)
                    </div>
                    <div class="h(60px) bg(135deg/blue-400..teal-400) r(lg) vbox(pack) c(white) font(sm) 600">
                      bg(135deg/blue-400..teal-400)
                    </div>
                    <div class="h(60px) bg(to-right/orange-400..rose-400) r(lg) vbox(pack) c(white) font(sm) 600">
                      bg(to-right/orange-400..rose-400)
                    </div>
                    <div class="h(60px) bg(45deg/red-500,yellow-500,green-500) r(lg) vbox(pack) c(white) font(sm) 600">
                      bg(45deg/red-500,yellow-500,green-500)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
    
    <!-- Effects -->
    {#if activeTab === 'effects'}
      <div class="rhythm()">
        <!-- Shadows -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Shadow System</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Consistent shadow scale for depth and hierarchy.
            </p>
          </div>
          
          <div class="grid grid-cols(2) md:grid-cols(4) gap(xl)">
            {#each ['sm', 'md', 'lg', 'xl', '2xl', 'inner', 'none'] as shadow}
              <div class="card() p(xl) hover:scale(1.05) transition">
                <div class="w(full) h(80px) bg(white) r(lg) shadow({shadow}) mb(md)"></div>
                <code class="font(sm) c(gray-700)">shadow({shadow})</code>
              </div>
            {/each}
          </div>
          
          <!-- Colored Shadows -->
          <div class="card() p(xl)">
            <h3 class="heading(h3) c(gray-900) mb(lg)">Colored Shadows</h3>
            
            <div class="grid grid-cols(1) md:grid-cols(3) gap(xl)">
              <div class="text(center)">
                <div class="w(full) h(100px) bg(purple-500) r(lg) shadow(xl/purple-500/0.5) mb(md)"></div>
                <code class="font(xs)">shadow(xl/purple-500/0.5)</code>
              </div>
              <div class="text(center)">
                <div class="w(full) h(100px) bg(blue-500) r(lg) shadow(xl/blue-500/0.5) mb(md)"></div>
                <code class="font(xs)">shadow(xl/blue-500/0.5)</code>
              </div>
              <div class="text(center)">
                <div class="w(full) h(100px) bg(green-500) r(lg) shadow(xl/green-500/0.5) mb(md)"></div>
                <code class="font(xs)">shadow(xl/green-500/0.5)</code>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Borders & Radius -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Borders & Radius</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Flexible border utilities with color and width options.
            </p>
          </div>
          
          <div class="grid grid-cols(1) md:grid-cols(2) gap(xl)">
            <!-- Border Radius -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">Border Radius</h3>
              
              <div class="grid grid-cols(3) gap(md)">
                {#each [
                  { name: 'sm', value: '0.25rem' },
                  { name: 'md', value: '0.375rem' },
                  { name: 'lg', value: '0.5rem' },
                  { name: 'xl', value: '0.75rem' },
                  { name: '2xl', value: '1rem' },
                  { name: 'full', value: '9999px' }
                ] as radius}
                  <div class="text(center)">
                    <div class="w(60px) h(60px) bg(purple-100) r({radius.name}) mx(auto) mb(sm)"></div>
                    <code class="font(xs)">r({radius.name})</code>
                  </div>
                {/each}
              </div>
            </div>
            
            <!-- Border Styles -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">Border Styles</h3>
              
              <div class="stack(md)">
                <div class="p(md) border(1/gray-300) r(md)">border(1/gray-300)</div>
                <div class="p(md) border(2/purple-500) r(md)">border(2/purple-500)</div>
                <div class="p(md) bl(4/blue-500) bg(blue-50)">bl(4/blue-500)</div>
                <div class="p(md) border(1/dashed/gray-400) r(md)">border(1/dashed/gray-400)</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Transforms & Transitions -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Transforms & Transitions</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Smooth animations and transform utilities.
            </p>
          </div>
          
          <div class="grid grid-cols(1) md:grid-cols(2) gap(xl)">
            <!-- Transforms -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">Transform Utilities</h3>
              
              <div class="stack(lg)">
                <div class="bg(purple-100) p(lg) r(lg) text(center)">
                  <div class="inline-block p(md) bg(purple-500) c(white) r(md) hover:scale(1.1) transition cursor(pointer)">
                    hover:scale(1.1)
                  </div>
                </div>
                
                <div class="bg(blue-100) p(lg) r(lg) text(center)">
                  <div class="inline-block p(md) bg(blue-500) c(white) r(md) hover:rotate(3deg) transition cursor(pointer)">
                    hover:rotate(3deg)
                  </div>
                </div>
                
                <div class="bg(green-100) p(lg) r(lg) text(center)">
                  <div class="inline-block p(md) bg(green-500) c(white) r(md) hover:translate-y(-4px) transition cursor(pointer)">
                    hover:translate-y(-4px)
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Transitions -->
            <div class="card() p(xl)">
              <h3 class="heading(h4) c(gray-900) mb(lg)">Transition Timing</h3>
              
              <div class="stack(md)">
                <button class="btn(primary) transition">Default (150ms)</button>
                <button class="btn(primary) transition-all duration(300)">300ms duration</button>
                <button class="btn(primary) transition-all duration(500) ease(in-out)">500ms ease-in-out</button>
              </div>
              
              <div class="bg(gray-900) r(lg) clip mt(lg)">
                <CodeHighlighter 
                  code={`transition
transition-all duration(300)
transition-colors duration(200)
ease(in-out)`}
                  language="css" 
                  className="font(sm/1.4)" 
                />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Glass & Blur Effects -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Glass & Blur Effects</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Modern glass morphism and backdrop effects.
            </p>
          </div>
          
          <div class="relative p(2xl) bg(gray-100) r(xl) clip">
            <!-- Background Pattern -->
            <div class="absolute inset(0)">
              <div class="absolute w(200px) h(200px) bg(purple-400) r(full) top(10%) left(10%) blur(xl)"></div>
              <div class="absolute w(300px) h(300px) bg(pink-400) r(full) bottom(10%) right(10%) blur(xl)"></div>
            </div>
            
            <div class="grid grid-cols(1) md:grid-cols(2) gap(xl) relative">
              <!-- Glass Card -->
              <div class="glass() p(xl)">
                <h3 class="heading(h4) c(gray-900) mb(md)">Glass Morphism</h3>
                <p class="c(gray-700) mb(lg)">Beautiful frosted glass effect with backdrop blur.</p>
                
                <div class="bg(gray-900) r(lg) clip">
                  <CodeHighlighter 
                    code={`glass()
glass(light)
glass(dark)`}
                    language="css" 
                    className="font(xs/1.3)" 
                  />
                </div>
              </div>
              
              <!-- Backdrop Blur -->
              <div class="bg(white.8) backdrop-blur(md) p(xl) r(xl) border(1/white.5)">
                <h3 class="heading(h4) c(gray-900) mb(md)">Backdrop Blur</h3>
                <p class="c(gray-700) mb(lg)">Apply blur effects to backgrounds.</p>
                
                <div class="bg(gray-900) r(lg) clip">
                  <CodeHighlighter 
                    code={`backdrop-blur(sm)
backdrop-blur(md)
backdrop-blur(lg)
backdrop-blur(xl)`}
                    language="css" 
                    className="font(xs/1.3)" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Glow Effects -->
        <div class="stack(2xl)">
          <div class="stack(lg)">
            <h2 class="heading(h2) c(gray-900)">Glow Effects</h2>
            <p class="font(lg) c(gray-600) max-w(700px)">
              Eye-catching glow effects for emphasis and delight.
            </p>
          </div>
          
          <div class="card() p(2xl) bg(gray-900)">
            <div class="grid grid-cols(1) md:grid-cols(3) gap(xl)">
              <div class="text(center)">
                <div class="glow(purple) p(xl) bg(purple-500) c(white) r(lg) mb(md)">
                  <h4 class="heading(h5)">Purple Glow</h4>
                </div>
                <code class="font(xs) c(gray-400)">glow(purple)</code>
              </div>
              
              <div class="text(center)">
                <div class="glow(blue) p(xl) bg(blue-500) c(white) r(lg) mb(md)">
                  <h4 class="heading(h5)">Blue Glow</h4>
                </div>
                <code class="font(xs) c(gray-400)">glow(blue)</code>
              </div>
              
              <div class="text(center)">
                <div class="glow(green) p(xl) bg(green-500) c(white) r(lg) mb(md)">
                  <h4 class="heading(h5)">Green Glow</h4>
                </div>
                <code class="font(xs) c(gray-400)">glow(green)</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
    
  </div>
  
  <!-- Footer CTA -->
  <section class="section() bg(gray-50) border-t(1/gray-200)">
    <div class="contain()">
      <div class="content(centered)">
        <h2 class="heading(h2) c(gray-900) max-w(600px)">Start Building Beautiful UIs</h2>
        <p class="font(lg) c(gray-600) max-w(500px) mb(xl)">
          Everything you need is built-in. No design skills required.
        </p>
        
        <div class="hbox(pack) gap(lg)">
          <button class="btn(primary/lg) hbox(middle) gap(md)">
            <Zap size="20" />
            Get Started
          </button>
          <button class="btn(secondary/lg)">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  /* Smooth scroll for sections */
  :global(html) {
    scroll-behavior: smooth;
  }
  
  /* Active tab indicator animation */
  nav button {
    position: relative;
  }
  
  nav button > div:last-child {
    transition: all 0.3s ease;
  }
</style>