<script lang="ts">
  import { registerToken, generateUsedTokensCSS, clearTokenRegistry, DEFAULT_SCALE_CONFIG, defaultTokens } from 'adorable-css';

  const categories = {
    font: {
      title: 'Text Scale',
      description: 'Typography sizes with ratio-based scaling',
      tokens: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      unit: 'px',
      baseToken: 'md'
    },
    spacing: {
      title: 'Spacing',
      description: 'Margin, padding, gap with linear scaling',
      tokens: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      unit: 'px',
      baseToken: 'md'
    },
    size: {
      title: 'Sizing',
      description: 'Width, height, and general sizing',
      tokens: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      unit: 'px',
      baseToken: 'md'
    },
    radius: {
      title: 'Radius',
      description: 'Corner radius for rounded elements',
      tokens: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
      unit: 'px',
      baseToken: 'md'
    },
    shadow: {
      title: 'Shadow',
      description: 'Box shadow depth and intensity',
      tokens: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      unit: '',
      baseToken: 'md'
    },
    container: {
      title: 'Container',
      description: 'Breakpoints and container widths',
      tokens: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      unit: 'px',
      baseToken: 'md'
    }
  };

  let generatedCSS = '';
  let tokenValues: Record<string, Record<string, string>> = {};

  function generateAllTokens() {
    clearTokenRegistry();
    Object.entries(categories).forEach(([category, config]) => {
      if (category === 'radius' || category === 'shadow') return;
      config.tokens.forEach(token => {
        registerToken(category as any, token);
      });
    });
    
    ['6xl', '7xl', '8xl', '9xl', '10xl', '11xl'].forEach(token => {
      registerToken('font', token);
    });
    ['6xl'].forEach(token => registerToken('spacing', token)); // Ensure 6xl is registered for demo

    const config = { ...DEFAULT_SCALE_CONFIG, unit: 'px' };
    let dynamicCSS = generateUsedTokensCSS(config);
    
    const radiusTokens = Object.entries(defaultTokens.radius || {})
      .map(([key, value]) => `  --radius-${key}: ${value};`)
      .join('\n');
    
    const shadowTokens = Object.entries(defaultTokens.shadow || {})
      .map(([key, value]) => `  --shadow-${key}: ${value};`)
      .join('\n');
    
    generatedCSS = dynamicCSS.replace(
      ':root {',
      `:root {\n\n  /* Border Radius Tokens */\n${radiusTokens}\n\n  /* Shadow Tokens */\n${shadowTokens}`
    );
    
    parseTokenValues();
  }

  function parseTokenValues() {
    tokenValues = {};
    Object.keys(categories).forEach(category => {
      tokenValues[category] = {};
      
      const values = category === 'radius' ? defaultTokens.radius :
                     category === 'shadow' ? defaultTokens.shadow :
                     null;

      if (values) {
        tokenValues[category] = values;
      } else {
        const regex = new RegExp(`--${category}-([^:]+): ([^;]+);`, 'g');
        let match;
        while ((match = regex.exec(generatedCSS)) !== null) {
          tokenValues[category][match[1]] = match[2];
        }
      }
    });
  }

  generateAllTokens();
  
  import { addDynamicClasses } from 'adorable-css';
  import { onMount } from 'svelte';
  import Container from '$lib/components/ui/Container.svelte';
  
  onMount(() => {
    addDynamicClasses('display(3xl)', 'display(xl)', 'display(2xl)', 'display(banner)');
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }
  };
</script>

<div class="min-h(screen) bg(white) font(sans)">
  <Container>
    <!-- Header -->
    <header class="py(6xl) border-b(1/gray-100) mb(6xl)">
      <div class="vbox gap(lg)">
        <h1 class="text(4xl) font(bold) tracking(tight) c(gray-900)">
          Design Tokens.
        </h1>
        <p class="text(xl) c(gray-500) max-w(600px) leading(relaxed)">
          Mathematical scales for consistent, beautiful UI. 
          Generated dynamically, ensuring pixel-perfect rhythm.
        </p>
      </div>
    </header>

    <div class="grid(1) lg:grid(12) gap(6xl) pb(10xl)">
      <!-- Sidebar Navigation -->
      <aside class="hidden lg:block col-span(3)">
        <nav class="sticky top(32px) vbox gap(md)">
          <div class="text(xs) font(bold) c(gray-400) uppercase tracking(widest) mb(xs)">Tokens</div>
          {#each Object.entries(categories) as [key, cat]}
            <button 
              on:click={() => scrollTo(key)}
              class="text(left) text(sm) font(medium) c(gray-600) hover:c(gray-900) hover:translate-x(4px) transition py(xs)"
            >
              {cat.title}
            </button>
          {/each}
          
          <div class="h(1px) bg(gray-100) my(md)"></div>
          <button 
             on:click={() => scrollTo('generated-css')}
             class="text(left) text(xs) font(medium) c(gray-400) hover:c(gray-900) transition uppercase tracking(wider)"
          >
            Generated CSS
          </button>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="col-span(1) lg:col-span(9) vbox gap(10xl)">
        
        {#each Object.entries(categories) as [categoryKey, category]}
          <section id={categoryKey} class="scroll-mt(120px)">
            <div class="vbox gap(3xl)">
              
              <!-- Section Header -->
              <div class="vbox gap(sm) pb(xl) border-b(1/gray-100)">
                <div class="hbox(between) items(baseline)">
                  <h2 class="text(2xl) font(semibold) c(gray-900)">{category.title}</h2>
                  <code class="text(xs) c(gray-400) font(mono)">--{categoryKey}-*</code>
                </div>
                <p class="text(lg) c(gray-500)">{category.description}</p>
              </div>

              <!-- Content: Typography -->
              {#if categoryKey === 'font'}
                <div class="vbox gap(xl)">
                  {#each category.tokens as token}
                    <div class="group relative bg(white) hover:bg(gray-50/50) transition p(xl) -mx(xl) r(xl)">
                      <div class="grid(1) md:grid(12) gap(lg) items(baseline)">
                        <div class="col-span(3) vbox gap(xs)">
                          <span class="font(mono) text(sm) c(indigo-600)">text({token})</span>
                          <span class="font(mono) text(xs) c(gray-400)">{tokenValues[categoryKey]?.[token] || '-'}</span>
                        </div>
                        <div class="col-span(9)">
                          <p class="text({token}) c(gray-900)">The quick brown fox jumps over the lazy dog.</p>
                        </div>
                      </div>
                    </div>
                  {/each}
                </div>

              <!-- Content: Spacing -->
              {:else if categoryKey === 'spacing'}
                <div class="grid(1) gap(lg)">
                   {#each category.tokens as token}
                    <div class="hbox items(center) gap(xl) p(lg) border(1/gray-100) r(lg) bg(white)">
                      <div class="w(100px) shrink(0) vbox gap(xs)">
                         <span class="font(mono) text(sm) c(indigo-600)">{token}</span>
                         <span class="font(mono) text(xs) c(gray-400)">{tokenValues[categoryKey]?.[token] || '-'}</span>
                      </div>
                      
                      <!-- Visual Metaphor: Two items with gap -->
                      <div class="hbox items(center) gap(md) flex(1)">
                        <div class="bg(gray-100) h(3xl) r(md) px(md) hbox(pack) text(xs) c(gray-500)">Item</div>
                        <!-- The Gap -->
                        <div class="h(2xl) bg(indigo-500/20) relative" style="width: var(--spacing-{token})">
                          <div class="absolute inset(0) hbox(pack)">
                            <span class="text(9px) c(indigo-700) font(mono)">{tokenValues[categoryKey]?.[token]}</span>
                          </div>
                        </div>
                        <div class="bg(gray-100) h(3xl) r(md) px(md) hbox(pack) text(xs) c(gray-500)">Item</div>
                      </div>
                    </div>
                   {/each}
                </div>

              <!-- Content: Radius -->
              {:else if categoryKey === 'radius'}
                <div class="grid(2) md:grid(3) gap(xl)">
                   {#each category.tokens as token}
                     <div class="vbox gap(lg) p(xl) border(1/gray-100) r(xl) bg(gray-50/50)">
                        <div class="aspect(3/2) bg(white) border(1/gray-200) w(full) shadow(sm) hbox(pack)" style="border-radius: {tokenValues[categoryKey]?.[token] || '0'}">
                           <div class="vbox items(center) gap(xs)">
                             <span class="text(sm) font(medium) c(gray-900)">Button</span>
                           </div>
                        </div>
                        <div class="hbox(between) items(center)">
                           <code class="text(sm) c(indigo-600)">radius-{token}</code>
                           <code class="text(xs) c(gray-400)">{tokenValues[categoryKey]?.[token]}</code>
                        </div>
                     </div>
                   {/each}
                </div>

              <!-- Content: Shadow -->
              {:else if categoryKey === 'shadow'}
                <div class="grid(2) md:grid(3) gap(2xl) py(lg)">
                   {#each category.tokens as token}
                     <div class="vbox gap(lg)">
                        <div class="h(120px) bg(white) r(lg) hbox(pack)" style="box-shadow: {tokenValues[categoryKey]?.[token] || 'none'}">
                           <span class="text(sm) font(medium) c(gray-500)">Surface</span>
                        </div>
                        <div class="hbox(between) items(center) px(sm)">
                           <code class="text(sm) c(indigo-600)">shadow-{token}</code>
                        </div>
                     </div>
                   {/each}
                </div>

              <!-- Fallback -->
              {:else}
                 <div class="grid(2) md:grid(4) gap(lg)">
                    {#each category.tokens as token}
                      <div class="p(lg) border(1/gray-100) r(lg) vbox gap(sm)">
                         <span class="font(mono) text(sm) c(gray-900)">{token}</span>
                         <span class="font(mono) text(xs) c(gray-500)">{tokenValues[categoryKey]?.[token] || '-'}</span>
                      </div>
                    {/each}
                 </div>
              {/if}

            </div>
          </section>
        {/each}

        <!-- Generated CSS -->
        <section id="generated-css" class="scroll-mt(120px) pt(10xl) border-t(1/gray-100)">
          <div class="vbox gap(lg)">
            <h2 class="text(2xl) font(semibold) c(gray-900)">Generated CSS</h2>
            <div class="bg(gray-900) p(xl) r(lg) overflow(hidden)">
              <pre class="text(xs) font(mono) c(gray-300) whitespace(pre-wrap) max-h(400px) overflow(auto)">{generatedCSS}</pre>
            </div>
          </div>
        </section>

      </main>
    </div>
  </Container>
</div>