<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { 
    Search, Menu, X, Sun, Moon, Github, 
    ChevronRight, ChevronDown, Copy, Check,
    Palette, Layout, Type, Box, Zap, 
    Accessibility, Globe, Smartphone, Code2,
    BookOpen, FileText, Download, ExternalLink
  } from 'lucide-svelte';

  let mounted = false;
  let sidebarOpen = false;
  let darkMode = false;
  let searchQuery = '';
  let copiedId = '';
  let activeSection = 'getting-started';
  let activeSubsection = '';
  let expandedSections: Record<string, boolean> = {
    'getting-started': true,
    'foundations': false,
    'components': false,
    'patterns': false
  };

  // 부족한 기능 기록
  let missingFeatures: string[] = [];
  
  function logMissingFeature(feature: string) {
    if (!missingFeatures.includes(feature)) {
      missingFeatures.push(feature);
      console.log('🚨 Missing feature:', feature);
    }
  }

  // Navigation structure
  const navigation = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      items: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'installation', title: 'Installation' },
        { id: 'quick-start', title: 'Quick Start' },
        { id: 'migration', title: 'Migration Guide' }
      ]
    },
    {
      id: 'foundations',
      title: 'Foundations',
      icon: Palette,
      items: [
        { id: 'design-tokens', title: 'Design Tokens' },
        { id: 'colors', title: 'Colors' },
        { id: 'typography', title: 'Typography' },
        { id: 'spacing', title: 'Spacing' },
        { id: 'breakpoints', title: 'Breakpoints' }
      ]
    },
    {
      id: 'components',
      title: 'Components',
      icon: Box,
      items: [
        { id: 'buttons', title: 'Buttons' },
        { id: 'cards', title: 'Cards' },
        { id: 'forms', title: 'Forms' },
        { id: 'modals', title: 'Modals' },
        { id: 'navigation', title: 'Navigation' }
      ]
    },
    {
      id: 'patterns',
      title: 'Patterns',
      icon: Layout,
      items: [
        { id: 'hero-sections', title: 'Hero Sections' },
        { id: 'feature-grids', title: 'Feature Grids' },
        { id: 'pricing-tables', title: 'Pricing Tables' },
        { id: 'testimonials', title: 'Testimonials' }
      ]
    }
  ];

  onMount(() => {
    mounted = true;
    // Sticky navigation tracking 구현 시도
    logMissingFeature('scroll-spy for active section tracking');
    logMissingFeature('intersection observer utilities');
  });

  function copyCode(code: string, id: string) {
    navigator.clipboard.writeText(code);
    copiedId = id;
    setTimeout(() => copiedId = '', 2000);
  }

  function toggleSection(sectionId: string) {
    expandedSections[sectionId] = !expandedSections[sectionId];
  }

  function navigateTo(section: string, subsection: string = '') {
    activeSection = section;
    activeSubsection = subsection;
    sidebarOpen = false;
    
    // Smooth scroll 시도
    logMissingFeature('smooth scroll to section with offset for fixed header');
  }

  // Dark mode toggle
  function toggleDarkMode() {
    darkMode = !darkMode;
    logMissingFeature('CSS custom properties toggle for dark mode');
    logMissingFeature('persistent theme storage (localStorage)');
  }

  // Search functionality
  function handleSearch() {
    logMissingFeature('fuzzy search implementation');
    logMissingFeature('search results dropdown');
    logMissingFeature('keyboard navigation for search');
  }
</script>

<!-- Missing Feature Alert (개발용) -->
{#if missingFeatures.length > 0}
  <div class="fixed bottom(xl) right(xl) max-w(400px) bg(red-50) border(1/red-200) r(lg) p(lg) shadow(xl) z(99)">
    <h4 class="font(sm) bold c(red-900) mb(sm)">Missing Features ({missingFeatures.length})</h4>
    <ul class="vbox gap(xs)">
      {#each missingFeatures as feature}
        <li class="font(xs) c(red-700)">• {feature}</li>
      {/each}
    </ul>
  </div>
{/if}

<div class="min-h(screen) bg(gray-50) {darkMode ? 'dark' : ''}">
  <!-- Top Navigation Bar -->
  <header class="sticky top(0) z(90) bg(white) border-b(1/gray-200) backdrop-blur(lg)">
    <div class="contain(wide)">
      <div class="hbox(middle+between) h(64px)">
        <!-- Logo & Brand -->
        <div class="hbox(middle) gap(lg)">
          <!-- Mobile menu button -->
          <button 
            class="p(sm) r(md) lg:hidden hover:bg(gray-100) transition"
            on:click={() => sidebarOpen = !sidebarOpen}
          >
            {#if sidebarOpen}
              <X size="20" />
            {:else}
              <Menu size="20" />
            {/if}
          </button>

          <a href="/packages/homepage-kit/static" class="hbox(middle) gap(sm)">
            <div class="32x32 bg(brand) r(lg) hbox(pack)">
              <span class="font(lg) bold c(white)">A</span>
            </div>
            <span class="font(lg) bold c(gray-900)">AdorableCSS</span>
            <span class="font(sm) c(gray-500)">v2.0</span>
          </a>
        </div>

        <!-- Search Bar -->
        <div class="flex(1) max-w(500px) mx(xl) hidden md:block">
          <div class="relative">
            <input 
              type="search"
              placeholder="Search documentation..."
              bind:value={searchQuery}
              on:input={handleSearch}
              class="w(full) pl(3xl) pr(lg) py(sm) bg(gray-50) border(1/gray-200) r(lg) 
                     focus:bg(white) focus:border(brand) transition"
            />
            <Search size="20" class="absolute left(lg) top(50%) -translate-y(50%) c(gray-400)" />
            <!-- Missing: search results dropdown -->
          </div>
        </div>

        <!-- Right Actions -->
        <div class="hbox(middle) gap(md)">
          <!-- Theme Toggle -->
          <button 
            class="p(sm) r(lg) hover:bg(gray-100) transition"
            on:click={toggleDarkMode}
          >
            {#if darkMode}
              <Sun size="20" />
            {:else}
              <Moon size="20" />
            {/if}
          </button>

          <!-- GitHub -->
          <a 
            href="https://github.com/adorablecss/v2" 
            class="p(sm) r(lg) hover:bg(gray-100) transition"
            target="_blank"
          >
            <Github size="20" />
          </a>

          <!-- CTA -->
          <a href="/playground" class="btn(primary/sm) hidden sm:flex">
            Try Playground
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Layout -->
  <div class="hbox">
    <!-- Sidebar Navigation -->
    <aside class="w(280px) h(screen-64px) sticky top(64px) border-r(1/gray-200) bg(white) 
                   hidden lg:block overflow-y(auto)">
      <nav class="p(lg)">
        <ul class="vbox gap(xs)">
          {#each navigation as section}
            <li>
              <button
                class="w(full) hbox(middle+between) px(md) py(sm) r(md) transition
                       hover:bg(gray-50) {activeSection === section.id ? 'bg(purple-50)' : ''}"
                on:click={() => toggleSection(section.id)}
              >
                <div class="hbox(middle) gap(sm)">
                  <svelte:component this={section.icon} size="18" 
                    class="{activeSection === section.id ? 'c(purple-600)' : 'c(gray-400)'}" 
                  />
                  <span class="font(sm) bold {activeSection === section.id ? 'c(purple-600)' : 'c(gray-700)'}">
                    {section.title}
                  </span>
                </div>
                <ChevronDown size="16" 
                  class="c(gray-400) transition {expandedSections[section.id] ? 'rotate(180deg)' : ''}" 
                />
              </button>

              {#if expandedSections[section.id]}
                <ul class="ml(xl) mt(xs) vbox gap(xs)" transition:fade={{ duration: 200 }}>
                  {#each section.items as item}
                    <li>
                      <button
                        class="w(full) text(left) px(md) py(xs) r(md) font(sm) transition
                               hover:bg(gray-50) {activeSubsection === item.id ? 'c(purple-600) bold' : 'c(gray-600)'}"
                        on:click={() => navigateTo(section.id, item.id)}
                      >
                        {item.title}
                      </button>
                    </li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
        </ul>
      </nav>

      <!-- Missing: Version Switcher -->
      <div class="p(lg) border-t(1/gray-200)">
        <p class="font(xs) c(gray-500)">Missing: Version Switcher</p>
      </div>
    </aside>

    <!-- Mobile Sidebar Overlay -->
    {#if sidebarOpen}
      <div 
        class="fixed inset(0) bg(black.5) z(80) lg:hidden"
        on:click={() => sidebarOpen = false}
        transition:fade={{ duration: 200 }}
      >
        <aside 
          class="w(280px) h(full) bg(white) overflow-y(auto)"
          on:click|stopPropagation
          transition:fly={{ x: -280, duration: 300 }}
        >
          <!-- Same nav content as desktop -->
          <nav class="p(lg)">
            <!-- ... same content ... -->
          </nav>
        </aside>
      </div>
    {/if}

    <!-- Main Content -->
    <main class="flex(1) min-w(0)">
      <article class="max-w(1200px) mx(auto) p(xl) lg:p(2xl)">
        
        <!-- Getting Started Section -->
        {#if activeSection === 'getting-started'}
          {#if !activeSubsection || activeSubsection === 'introduction'}
            <section class="vbox gap(2xl)">
              <!-- Hero -->
              <div class="vbox gap(xl)">
                <h1 class="font(5xl) bold c(gray-900)">
                  Design System Documentation
                </h1>
                <p class="font(xl) c(gray-600) max-w(700px)">
                  Build consistent, beautiful interfaces with AdorableCSS v2's comprehensive design system.
                </p>
              </div>

              <!-- Quick Links -->
              <div class="grid(4) gap(lg)">
                {#each [
                  { icon: Zap, title: 'Quick Start', desc: 'Get up and running in minutes' },
                  { icon: Palette, title: 'Design Tokens', desc: 'Colors, spacing, and more' },
                  { icon: Box, title: 'Components', desc: 'Pre-built UI components' },
                  { icon: Code2, title: 'Playground', desc: 'Try it live' }
                ] as card}
                  <button 
                    class="card() p(xl) hover:shadow(lg) hover:scale(1.02) transition text(left)"
                    on:click={() => logMissingFeature('quick link navigation')}
                  >
                    <svelte:component this={card.icon} size="24" class="c(purple-600) mb(md)" />
                    <h3 class="font(lg) bold c(gray-900) mb(sm)">{card.title}</h3>
                    <p class="font(sm) c(gray-600)">{card.desc}</p>
                  </button>
                {/each}
              </div>

              <!-- Installation -->
              <div class="vbox gap(lg)">
                <h2 class="font(3xl) bold c(gray-900)">Installation</h2>
                
                <div class="card() p(xl)">
                  <h3 class="font(lg) bold c(gray-900) mb(md)">CDN (Recommended)</h3>
                  <div class="relative">
                    <pre class="bg(gray-900) c(gray-100) p(lg) r(lg) overflow-x(auto)">
<code>&lt;script src="https://unpkg.com/adorable-css@latest"&gt;&lt;/script&gt;</code></pre>
                    <button 
                      class="absolute top(md) right(md) p(sm) bg(gray-800) hover:bg(gray-700) r(md) transition"
                      on:click={() => copyCode('<script src="https://unpkg.com/adorable-css@latest"></script>', 'cdn')}
                    >
                      {#if copiedId === 'cdn'}
                        <Check size="16" class="c(green-400)" />
                      {:else}
                        <Copy size="16" class="c(gray-300)" />
                      {/if}
                    </button>
                  </div>
                </div>

                <!-- Missing: Package manager tabs -->
                <div class="card() p(xl)">
                  <p class="font(sm) c(gray-600)">
                    Missing: Tab component for npm/yarn/pnpm installation options
                  </p>
                </div>
              </div>
            </section>
          {/if}

          {#if activeSubsection === 'quick-start'}
            <section class="vbox gap(2xl)">
              <div>
                <h1 class="font(4xl) bold c(gray-900) mb(md)">Quick Start</h1>
                <p class="font(lg) c(gray-600)">Get started with AdorableCSS in 5 minutes.</p>
              </div>

              <!-- Step by step guide -->
              <div class="vbox gap(xl)">
                {#each [
                  { 
                    step: 1, 
                    title: 'Add AdorableCSS to your project',
                    code: '<script src="https://unpkg.com/adorable-css@latest"></script>'
                  },
                  {
                    step: 2,
                    title: 'Start using utility classes',
                    code: '<div class="hbox(middle) gap(lg) p(xl) bg(purple-50) r(lg)">\n  <h1 class="font(2xl) bold c(purple-900)">Hello World!</h1>\n</div>'
                  },
                  {
                    step: 3,
                    title: 'Explore components',
                    code: '<button class="btn(primary)">Get Started</button>'
                  }
                ] as step}
                  <div class="hbox gap(lg)">
                    <div class="w(48px) h(48px) bg(purple-100) r(full) hbox(pack) shrink(0)">
                      <span class="font(lg) bold c(purple-600)">{step.step}</span>
                    </div>
                    <div class="flex(1) vbox gap(md)">
                      <h3 class="font(xl) bold c(gray-900)">{step.title}</h3>
                      <div class="relative">
                        <pre class="bg(gray-900) c(gray-100) p(lg) r(lg) overflow-x(auto)">
<code>{step.code}</code></pre>
                        <button 
                          class="absolute top(md) right(md) p(sm) bg(gray-800) hover:bg(gray-700) r(md) transition"
                          on:click={() => copyCode(step.code, `step-${step.step}`)}
                        >
                          {#if copiedId === `step-${step.step}`}
                            <Check size="16" class="c(green-400)" />
                          {:else}
                            <Copy size="16" class="c(gray-300)" />
                          {/if}
                        </button>
                      </div>
                    </div>
                  </div>
                {/each}
              </div>

              <!-- Live Example -->
              <div class="card() p(xl)">
                <h3 class="font(xl) bold c(gray-900) mb(lg)">Try it yourself</h3>
                <!-- Missing: Live code editor -->
                <div class="bg(gray-100) p(xl) r(lg) text(center)">
                  <p class="c(gray-600)">Missing: Interactive code editor with live preview</p>
                </div>
              </div>
            </section>
          {/if}
        {/if}

        <!-- Foundations Section -->
        {#if activeSection === 'foundations'}
          {#if activeSubsection === 'design-tokens'}
            <section class="vbox gap(2xl)">
              <div>
                <h1 class="font(4xl) bold c(gray-900) mb(md)">Design Tokens</h1>
                <p class="font(lg) c(gray-600)">The foundation of our design system.</p>
              </div>

              <!-- Token Categories -->
              <div class="grid(3) gap(lg)">
                {#each [
                  { title: 'Colors', count: 150, icon: Palette },
                  { title: 'Typography', count: 12, icon: Type },
                  { title: 'Spacing', count: 16, icon: Layout }
                ] as category}
                  <div class="card() p(xl) hover:shadow(lg) transition">
                    <svelte:component this={category.icon} size="32" class="c(purple-600) mb(md)" />
                    <h3 class="font(xl) bold c(gray-900)">{category.title}</h3>
                    <p class="font(sm) c(gray-600)">{category.count} tokens</p>
                  </div>
                {/each}
              </div>

              <!-- Token Table -->
              <div class="card() clip">
                <div class="p(xl) border-b(1/gray-200)">
                  <h3 class="font(xl) bold c(gray-900)">All Design Tokens</h3>
                </div>
                
                <!-- Missing: Filterable/searchable table -->
                <div class="p(xl)">
                  <p class="c(gray-600)">Missing: Interactive token table with search and filters</p>
                </div>
              </div>

              <!-- Download Options -->
              <div class="hbox gap(lg)">
                <button class="btn(primary) hbox(middle) gap(sm)">
                  <Download size="20" />
                  Download as JSON
                </button>
                <button class="btn(secondary) hbox(middle) gap(sm)">
                  <FileText size="20" />
                  Download as CSS
                </button>
                <!-- Missing: Figma tokens, Sketch file -->
                <p class="font(sm) c(gray-500) self(center)">Missing: Figma/Sketch export options</p>
              </div>
            </section>
          {/if}

          {#if activeSubsection === 'colors'}
            <section class="vbox gap(2xl)">
              <div>
                <h1 class="font(4xl) bold c(gray-900) mb(md)">Color System</h1>
                <p class="font(lg) c(gray-600)">A comprehensive color palette for all your needs.</p>
              </div>

              <!-- Color Grid -->
              <div class="vbox gap(xl)">
                {#each ['gray', 'red', 'orange', 'yellow', 'green', 'blue', 'purple'] as color}
                  <div class="vbox gap(md)">
                    <h3 class="font(lg) bold c(gray-900) capitalize">{color}</h3>
                    <div class="grid(10) gap(sm)">
                      {#each ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as shade}
                        <div class="vbox gap(xs)">
                          <div 
                            class="h(48px) r(md) bg({color}-{shade}) cursor(pointer) hover:scale(1.1) transition"
                            on:click={() => copyCode(`bg(${color}-${shade})`, `${color}-${shade}`)}
                          ></div>
                          <p class="font(xs) c(gray-600) text(center)">{shade}</p>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/each}
              </div>

              <!-- Missing Features -->
              <div class="card() p(xl) bg(yellow-50)">
                <h3 class="font(lg) bold c(yellow-900) mb(md)">Missing Color Features</h3>
                <ul class="vbox gap(sm)">
                  <li class="font(sm) c(yellow-800)">• Color contrast checker</li>
                  <li class="font(sm) c(yellow-800)">• WCAG compliance indicators</li>
                  <li class="font(sm) c(yellow-800)">• Color picker with HEX/RGB/HSL conversion</li>
                  <li class="font(sm) c(yellow-800)">• Custom color palette generator</li>
                </ul>
              </div>
            </section>
          {/if}

          {#if activeSubsection === 'typography'}
            <section class="vbox gap(2xl)">
              <div>
                <h1 class="font(4xl) bold c(gray-900) mb(md)">Typography</h1>
                <p class="font(lg) c(gray-600)">Type scale and text utilities.</p>
              </div>

              <!-- Type Scale -->
              <div class="card() p(xl)">
                <h3 class="font(xl) bold c(gray-900) mb(lg)">Type Scale</h3>
                <div class="vbox gap(md)">
                  {#each [
                    { size: 'xs', px: '12px', sample: 'The quick brown fox jumps over the lazy dog' },
                    { size: 'sm', px: '14px', sample: 'The quick brown fox jumps over the lazy dog' },
                    { size: 'md', px: '16px', sample: 'The quick brown fox jumps over the lazy dog' },
                    { size: 'lg', px: '18px', sample: 'The quick brown fox jumps over the lazy dog' },
                    { size: 'xl', px: '20px', sample: 'The quick brown fox jumps over the lazy dog' },
                    { size: '2xl', px: '24px', sample: 'The quick brown fox jumps over the lazy dog' },
                    { size: '3xl', px: '30px', sample: 'The quick brown fox jumps' },
                    { size: '4xl', px: '36px', sample: 'The quick brown fox' },
                    { size: '5xl', px: '48px', sample: 'The quick brown' }
                  ] as type}
                    <div class="hbox(top+between) py(md) border-b(1/gray-100)">
                      <div class="flex(1)">
                        <p class="font({type.size})">{type.sample}</p>
                      </div>
                      <div class="text(right) ml(xl)">
                        <code class="font(sm) c(gray-600)">font({type.size})</code>
                        <p class="font(xs) c(gray-500)">{type.px}</p>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>

              <!-- Font Weights -->
              <div class="card() p(xl)">
                <h3 class="font(xl) bold c(gray-900) mb(lg)">Font Weights</h3>
                <!-- Missing: Variable font weight slider -->
                <p class="c(gray-600)">Missing: Interactive font weight demonstration</p>
              </div>

              <!-- Line Height & Letter Spacing -->
              <div class="grid(2) gap(lg)">
                <div class="card() p(xl)">
                  <h3 class="font(lg) bold c(gray-900) mb(md)">Line Height</h3>
                  <!-- Missing: Line height examples -->
                  <p class="c(gray-600)">Missing: Line height visual examples</p>
                </div>
                <div class="card() p(xl)">
                  <h3 class="font(lg) bold c(gray-900) mb(md)">Letter Spacing</h3>
                  <!-- Missing: Letter spacing examples -->
                  <p class="c(gray-600)">Missing: Letter spacing visual examples</p>
                </div>
              </div>
            </section>
          {/if}

          {#if activeSubsection === 'spacing'}
            <section class="vbox gap(2xl)">
              <div>
                <h1 class="font(4xl) bold c(gray-900) mb(md)">Spacing System</h1>
                <p class="font(lg) c(gray-600)">Consistent spacing scale for layouts.</p>
              </div>

              <!-- Spacing Scale Visual -->
              <div class="card() p(xl)">
                <h3 class="font(xl) bold c(gray-900) mb(lg)">Spacing Scale</h3>
                <div class="vbox gap(md)">
                  {#each [
                    { name: 'xs', value: '4px', scale: 1 },
                    { name: 'sm', value: '8px', scale: 2 },
                    { name: 'md', value: '12px', scale: 3 },
                    { name: 'lg', value: '16px', scale: 4 },
                    { name: 'xl', value: '20px', scale: 5 },
                    { name: '2xl', value: '24px', scale: 6 },
                    { name: '3xl', value: '32px', scale: 8 },
                    { name: '4xl', value: '48px', scale: 12 }
                  ] as space}
                    <div class="hbox(middle) gap(lg)">
                      <code class="font(sm) c(gray-700) w(48px)">{space.name}</code>
                      <div class="h(32px) bg(purple-500) r(sm)" style="width: {space.scale * 16}px"></div>
                      <span class="font(sm) c(gray-600)">{space.value}</span>
                    </div>
                  {/each}
                </div>
              </div>

              <!-- Spacing Examples -->
              <div class="grid(2) gap(lg)">
                <div class="card() p(xl)">
                  <h3 class="font(lg) bold c(gray-900) mb(md)">Padding Example</h3>
                  <div class="bg(purple-100) p(xl) r(lg)">
                    <div class="bg(white) p(lg) r(md)">
                      <p class="font(sm) c(gray-700)">p(xl) outer, p(lg) inner</p>
                    </div>
                  </div>
                </div>
                <div class="card() p(xl)">
                  <h3 class="font(lg) bold c(gray-900) mb(md)">Gap Example</h3>
                  <div class="hbox gap(lg)">
                    <div class="w(48px) h(48px) bg(purple-500) r(md)"></div>
                    <div class="w(48px) h(48px) bg(purple-500) r(md)"></div>
                    <div class="w(48px) h(48px) bg(purple-500) r(md)"></div>
                  </div>
                  <p class="font(sm) c(gray-600) mt(md)">gap(lg)</p>
                </div>
              </div>

              <!-- Missing: Interactive spacing playground -->
              <div class="card() p(xl) bg(yellow-50)">
                <p class="c(yellow-800)">Missing: Interactive spacing playground with visual preview</p>
              </div>
            </section>
          {/if}

          {#if activeSubsection === 'breakpoints'}
            <section class="vbox gap(2xl)">
              <div>
                <h1 class="font(4xl) bold c(gray-900) mb(md)">Responsive Breakpoints</h1>
                <p class="font(lg) c(gray-600)">Build responsive layouts with ease.</p>
              </div>

              <!-- Breakpoint Table -->
              <div class="card() clip">
                <table class="w(full)">
                  <thead class="bg(gray-50)">
                    <tr>
                      <th class="p(md) text(left) font(sm) bold c(gray-700)">Breakpoint</th>
                      <th class="p(md) text(left) font(sm) bold c(gray-700)">Prefix</th>
                      <th class="p(md) text(left) font(sm) bold c(gray-700)">Minimum Width</th>
                      <th class="p(md) text(left) font(sm) bold c(gray-700)">CSS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {#each [
                      { name: 'Mobile', prefix: '-', width: '0px', css: '@media (min-width: 0px)' },
                      { name: 'Tablet', prefix: 'sm:', width: '640px', css: '@media (min-width: 640px)' },
                      { name: 'Laptop', prefix: 'md:', width: '768px', css: '@media (min-width: 768px)' },
                      { name: 'Desktop', prefix: 'lg:', width: '1024px', css: '@media (min-width: 1024px)' },
                      { name: 'Wide', prefix: 'xl:', width: '1280px', css: '@media (min-width: 1280px)' }
                    ] as breakpoint}
                      <tr class="border-t(1/gray-200)">
                        <td class="p(md) font(sm) c(gray-900)">{breakpoint.name}</td>
                        <td class="p(md)"><code class="font(sm) c(purple-600)">{breakpoint.prefix}</code></td>
                        <td class="p(md) font(sm) c(gray-600)">{breakpoint.width}</td>
                        <td class="p(md)"><code class="font(xs) c(gray-600)">{breakpoint.css}</code></td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>

              <!-- Responsive Example -->
              <div class="card() p(xl)">
                <h3 class="font(xl) bold c(gray-900) mb(lg)">Responsive Example</h3>
                <div class="bg(purple-100) p(lg) r(lg) mb(lg)">
                  <div class="bg(white) p(md) r(md) text(center)
                              sm:p(lg) md:p(xl) lg:p(2xl)">
                    <p class="font(sm) sm:font(md) md:font(lg) lg:font(xl)">
                      Resize your browser to see changes
                    </p>
                  </div>
                </div>
                <pre class="bg(gray-900) c(gray-100) p(lg) r(lg) overflow-x(auto)">
<code>p(md) sm:p(lg) md:p(xl) lg:p(2xl)
font(sm) sm:font(md) md:font(lg) lg:font(xl)</code></pre>
              </div>

              <!-- Missing: Responsive preview tool -->
              <div class="card() p(xl) bg(yellow-50)">
                <p class="c(yellow-800)">Missing: Responsive preview tool with device frames</p>
              </div>
            </section>
          {/if}
        {/if}

        <!-- Components Section -->
        {#if activeSection === 'components'}
          {#if activeSubsection === 'buttons'}
            <section class="vbox gap(2xl)">
              <div>
                <h1 class="font(4xl) bold c(gray-900) mb(md)">Buttons</h1>
                <p class="font(lg) c(gray-600)">Button components for every use case.</p>
              </div>

              <!-- Button Variants -->
              <div class="card() p(xl)">
                <h3 class="font(xl) bold c(gray-900) mb(lg)">Variants</h3>
                <div class="hbox gap(md) flex-wrap">
                  <button class="btn(primary)">Primary</button>
                  <button class="btn(secondary)">Secondary</button>
                  <button class="btn(outline)">Outline</button>
                  <button class="btn(ghost)">Ghost</button>
                  <button class="btn(link)">Link</button>
                </div>
                
                <div class="mt(lg) p(lg) bg(gray-100) r(lg)">
                  <pre class="font(sm) c(gray-700)">
btn(primary)
btn(secondary)
btn(outline)
btn(ghost)
btn(link)</pre>
                </div>
              </div>

              <!-- Button Sizes -->
              <div class="card() p(xl)">
                <h3 class="font(xl) bold c(gray-900) mb(lg)">Sizes</h3>
                <div class="hbox(middle) gap(md) flex-wrap">
                  <button class="btn(primary/xs)">Extra Small</button>
                  <button class="btn(primary/sm)">Small</button>
                  <button class="btn(primary)">Default</button>
                  <button class="btn(primary/lg)">Large</button>
                  <button class="btn(primary/xl)">Extra Large</button>
                </div>
              </div>

              <!-- Button States -->
              <div class="card() p(xl)">
                <h3 class="font(xl) bold c(gray-900) mb(lg)">States</h3>
                <div class="grid(3) gap(lg)">
                  <div>
                    <p class="font(sm) c(gray-700) mb(sm)">Loading</p>
                    <!-- Missing: Loading spinner -->
                    <button class="btn(primary) opacity(0.7) cursor(not-allowed)">
                      Loading...
                    </button>
                  </div>
                  <div>
                    <p class="font(sm) c(gray-700) mb(sm)">Disabled</p>
                    <button class="btn(primary) opacity(0.5) cursor(not-allowed)" disabled>
                      Disabled
                    </button>
                  </div>
                  <div>
                    <p class="font(sm) c(gray-700) mb(sm)">With Icon</p>
                    <button class="btn(primary) hbox(middle) gap(sm)">
                      <Download size="16" />
                      Download
                    </button>
                  </div>
                </div>
              </div>

              <!-- Missing: Interactive button builder -->
              <div class="card() p(xl) bg(yellow-50)">
                <p class="c(yellow-800)">Missing: Interactive button builder with live code generation</p>
              </div>
            </section>
          {/if}

          <!-- More component sections... -->
        {/if}

        <!-- Patterns Section -->
        {#if activeSection === 'patterns'}
          {#if activeSubsection === 'hero-sections'}
            <section class="vbox gap(2xl)">
              <div>
                <h1 class="font(4xl) bold c(gray-900) mb(md)">Hero Section Patterns</h1>
                <p class="font(lg) c(gray-600)">Ready-to-use hero section layouts.</p>
              </div>

              <!-- Hero Examples -->
              <div class="vbox gap(2xl)">
                <!-- Simple Hero -->
                <div class="card() clip">
                  <div class="p(xl) border-b(1/gray-200)">
                    <h3 class="font(xl) bold c(gray-900)">Simple Hero</h3>
                  </div>
                  <div class="bg(purple-50) p(4xl)">
                    <div class="text(center)">
                      <h1 class="font(5xl) bold c(gray-900) mb(lg)">Welcome to AdorableCSS</h1>
                      <p class="font(xl) c(gray-600) mb(xl) max-w(600px) mx(auto)">
                        Build beautiful, responsive interfaces with our utility-first CSS framework.
                      </p>
                      <button class="btn(primary/lg)">Get Started</button>
                    </div>
                  </div>
                  <div class="p(xl) bg(gray-900)">
                    <pre class="c(gray-100) text(sm) overflow-x(auto)">
&lt;div class="text(center)"&gt;
  &lt;h1 class="font(5xl) bold c(gray-900) mb(lg)"&gt;Welcome to AdorableCSS&lt;/h1&gt;
  &lt;p class="font(xl) c(gray-600) mb(xl) max-w(600px) mx(auto)"&gt;
    Build beautiful, responsive interfaces with our utility-first CSS framework.
  &lt;/p&gt;
  &lt;button class="btn(primary/lg)"&gt;Get Started&lt;/button&gt;
&lt;/div&gt;</pre>
                  </div>
                </div>

                <!-- Split Hero -->
                <div class="card() clip">
                  <div class="p(xl) border-b(1/gray-200)">
                    <h3 class="font(xl) bold c(gray-900)">Split Hero</h3>
                  </div>
                  <div class="grid(2) min-h(400px)">
                    <div class="vbox(pack) p(2xl)">
                      <h1 class="font(4xl) bold c(gray-900) mb(md)">Build faster</h1>
                      <p class="font(lg) c(gray-600) mb(lg)">
                        Ship beautiful interfaces without writing custom CSS.
                      </p>
                      <div class="hbox gap(md)">
                        <button class="btn(primary)">Start Free</button>
                        <button class="btn(outline)">Learn More</button>
                      </div>
                    </div>
                    <div class="bg(gradient-to-br/purple-400..pink-400) hbox(pack)">
                      <div class="64x64 bg(white.2) r(lg)"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Missing: More pattern variations -->
              <div class="card() p(xl) bg(yellow-50)">
                <p class="c(yellow-800)">Missing: More hero pattern variations (video bg, parallax, etc)</p>
              </div>
            </section>
          {/if}
        {/if}

        <!-- Page Navigation -->
        <nav class="hbox(middle+between) mt(4xl) pt(xl) border-t(1/gray-200)">
          <button class="hbox(middle) gap(sm) c(gray-600) hover:c(gray-900) transition">
            <ChevronRight size="20" class="rotate(180deg)" />
            <span class="font(sm)">Previous</span>
          </button>
          <button class="hbox(middle) gap(sm) c(gray-600) hover:c(gray-900) transition">
            <span class="font(sm)">Next</span>
            <ChevronRight size="20" />
          </button>
        </nav>

        <!-- Feedback -->
        <div class="mt(2xl) p(xl) bg(gray-50) r(lg) text(center)">
          <p class="font(sm) c(gray-600) mb(md)">Was this page helpful?</p>
          <div class="hbox(center) gap(md)">
            <button class="px(lg) py(sm) bg(white) border(1/gray-200) r(md) hover:bg(gray-50) transition">
              👍 Yes
            </button>
            <button class="px(lg) py(sm) bg(white) border(1/gray-200) r(md) hover:bg(gray-50) transition">
              👎 No
            </button>
          </div>
        </div>
      </article>
    </main>

    <!-- Table of Contents (Desktop) -->
    <aside class="w(240px) hidden xl:block">
      <div class="sticky top(88px) p(lg)">
        <h4 class="font(sm) bold c(gray-900) mb(md)">On this page</h4>
        <nav class="vbox gap(xs)">
          <!-- Missing: Dynamic TOC generation -->
          <p class="font(sm) c(gray-500)">Missing: Dynamic table of contents</p>
        </nav>
      </div>
    </aside>
  </div>
</div>

<style>
  /* Missing: Dark mode CSS variables */
  .dark {
    /* Would need CSS custom property support */
  }
  
  /* Missing: Smooth scroll behavior */
  /* Missing: Syntax highlighting for code blocks */
  /* Missing: Print styles */
</style>