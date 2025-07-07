<script lang="ts">
  import { Copy, Check, ChevronDown, ChevronRight } from 'lucide-svelte';
  import { generateCSS, generateClass } from 'adorable-css';
  import { getAllRule2Handlers, initializeRule2Handlers } from 'adorable-css/04-rules';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  
  let copiedRule = '';
  let liveInput = '';
  let liveCSS = '';
  let liveError = '';
  let expandedGroups: Record<string, boolean> = {};
  
  // Initialize Rule2 handlers
  initializeRule2Handlers();
  
  // Rule2 groups organized by category
  const RULE2_GROUPS = [
    {
      category: 'Layout',
      description: 'Figma-native spacing, sizing and positioning',
      rules: ['p', 'pt', 'pr', 'pb', 'pl', 'px', 'py', 'gap', 'gap-x', 'gap-y', 'w', 'h', 'size', 'min-w', 'max-w', 'min-h', 'max-h', 'hbox', 'vbox', 'pack', 'wrap']
    },
    {
      category: 'Typography', 
      description: 'Figma-native font and text styling utilities',
      rules: ['font', 'bold', 'italic', 'uppercase', 'lowercase', 'capitalize', 'underline', 'overline', 'strike', 'text', 'truncate']
    },
    {
      category: 'Colors',
      description: 'Text and background color utilities', 
      rules: ['c', 'bg']
    },
    {
      category: 'Visual',
      description: 'Border, radius, opacity and visual effects',
      rules: ['b', 'r', 'border', 'bt', 'br', 'bb', 'bl', 'opacity', 'blur', 'brightness', 'contrast', 'saturate', 'sepia', 'backdrop']
    },
    {
      category: 'CSS Advanced',
      description: 'Essential CSS features not in Figma but necessary for web development',
      rules: ['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'wrap', 'pre', 'pre-wrap', 'pre-line']
    }
  ];
  
  // Get all Rule2 handlers
  function getAllRule2Rules() {
    const handlers = getAllRule2Handlers();
    const rulesByCategory: Record<string, string[]> = {};
    
    RULE2_GROUPS.forEach(group => {
      rulesByCategory[group.category] = group.rules.filter(rule => handlers.has(rule));
    });
    
    return rulesByCategory;
  }
  
  $: rule2Rules = getAllRule2Rules();
  
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copiedRule = text;
    setTimeout(() => copiedRule = '', 2000);
  }
  
  function toggleGroup(groupName: string) {
    expandedGroups[groupName] = !expandedGroups[groupName];
  }
  
  function generateLiveCSS() {
    if (!liveInput.trim()) {
      liveCSS = '';
      liveError = '';
      return;
    }
    
    try {
      // Split input into individual classes
      const classes = liveInput.trim().split(/\s+/);
      const result = generateCSS(classes);
      
      if (result && result.trim()) {
        liveCSS = result;
        liveError = '';
      } else {
        liveCSS = '';
        liveError = 'No CSS generated. Check if the classes are valid.';
      }
    } catch (error) {
      liveCSS = '';
      liveError = (error as Error).message || 'Failed to generate CSS';
    }
  }
  
  // Count total Rule2 rules
  function countRule2Rules() {
    const handlers = getAllRule2Handlers();
    return handlers.size;
  }
  
  $: totalRules = countRule2Rules();
</script>

<div class="min-h(100vh) bg(white)">
  <!-- Hero Section -->
  <section class="relative overflow(hidden) bg(to-br/mute-900..mute-800) py(2xl)">
    <div class="container(6xl) mx(auto) px(2xl) relative z(10)">
      <div class="vbox(center) gap(2xl)">
        <!-- Hero Content -->
        <div class="vbox(center) gap(lg) max-w(4xl)">
          <Badge variant="outline">
            <span class="c(white)">{totalRules} Rule2 Performance Rules</span>
          </Badge>
          <h1 class="display(lg) c(white)">
            AdorableCSS Rule2 Reference
          </h1>
          <p class="body(base) c(white.8) max-w(4xl)">
            Complete reference for AdorableCSS Rule2 performance-optimized handlers. These rules process AST directly for maximum performance.
          </p>
          
          <!-- Rule2 Performance Visual -->
          <div class="hbox(center) gap(md) flex-wrap">
            <Badge size="lg">
              <span class="c(white)">AST Direct</span>
            </Badge>
            <span class="c(white.6)">→</span>
            <Badge size="lg">
              <span class="c(white)">No Conversion</span>
            </Badge>
            <span class="c(white.6)">→</span>
            <Badge size="lg">
              <span class="c(white)">CSS String</span>
            </Badge>
          </div>
        </div>

        <!-- Live Playground -->
        <div class="w(full) max-w(4xl)">
          <div class="bg(white.05) p(2xl) r(xl) backdrop-blur(md)">
            <div class="vbox gap(lg)">
              <div class="vbox(center) gap(xs)">
                <h3 class="title(base) c(white)">Try It Live</h3>
                <p class="body(sm) c(white.7)">Test any AdorableCSS rule and see the generated CSS instantly</p>
              </div>
              
              <div class="vbox gap(lg)">
                <div class="hbox gap(md)">
                  <input
                    bind:value={liveInput}
                    placeholder="Try: hbox(center) gap(xl) p(2xl) bg(primary) c(white) r(lg)"
                    class="flex(1) px(lg) py(md) r(lg) body(base) mono bg(white.1) c(white)
                           placeholder:c(white.4) focus:bg(white.15) transition-all"
                    on:input={generateLiveCSS}
                  />
                  <Button size="lg" variant="secondary" on:click={() => copyToClipboard(liveCSS)}>
                    Copy CSS
                  </Button>
                </div>
                
                {#if liveCSS}
                  <div class="vbox gap(sm)">
                    <pre class="p(lg) bg(black.3) r(lg) caption(sm) mono 
                               overflow-x(auto) max-h(200) scroll(y) c(white.9)">{liveCSS}</pre>
                  </div>
                {/if}
                
                {#if liveError}
                  <div class="p(lg) bg(error.2) r(lg)">
                    <p class="body(sm) c(white)">Error: {liveError}</p>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Decorative Elements -->
    <div class="absolute top(0) left(0) w(100%) h(100%) overflow(hidden) pointer-events(none)">
      <div class="absolute top(-20%) left(-10%) w(60%) h(60%) bg(white.03) r(full) blur(3xl)"></div>
      <div class="absolute bottom(-20%) right(-10%) w(60%) h(60%) bg(primary.05) r(full) blur(3xl)"></div>
    </div>
  </section>

  <!-- Main Layout -->
  <div class="flex">
    <!-- Left Navigation -->
    <nav class="hidden lg:block fixed top(60) left(0) w(280) h(calc(100vh-60px)) bg(white) scroll(y) overscroll-behavior(contain) z(40)">
      <div class="p(xl) pb(lg)">
        <h2 class="title(md) c(mute-900)">Rule2 Navigation</h2>
        <p class="caption c(mute-600) pt(xs)">Performance-optimized rules</p>
      </div>
      
      <div class="p(lg) vbox gap(xl)">
        {#each RULE2_GROUPS as group}
          <div class="vbox gap(sm)">
            <div class="px(md) py(sm) bg(mute-100) r(md)">
              <h3 class="caption(xs) c(mute-700) uppercase letter-spacing(widest) bold">{group.category}</h3>
            </div>
            
            <div class="vbox gap(xs)">
              <a 
                href="#{group.category.toLowerCase()}"
                class="block py(xs) px(md) r(md) transition-all
                       c(mute-600) hover:bg(mute-50) hover:c(mute-900)"
              >
                <div class="hbox(middle) gap(sm)">
                  <span class="body(sm) flex(1)">{group.category}</span>
                  <span class="caption(xs) c(mute-500)">{rule2Rules[group.category]?.length || 0}</span>
                </div>
              </a>
            </div>
          </div>
        {/each}
      </div>
    </nav>
    
    <!-- Main Content -->
    <main class="ml(0) lg:ml(280) min-h(100vh) bg(white)">
      <div class="px(xl) lg:px(3xl) py(3xl) max-w(6xl)">

      <!-- Rule2 Categories -->
      <div class="vbox gap(8xl)">
        {#each RULE2_GROUPS as group}
          <section id="{group.category.toLowerCase()}">
            <!-- Category Header -->
            <div class="vbox gap(2xl)">
              <div class="vbox(center) gap(lg)">
                <Badge size="lg" variant="secondary">
                  Rule2 Performance
                </Badge>
                <h2 class="heading(h1) c(mute-900)">{group.category}</h2>
                <p class="body(xl) c(mute-600) max-w(4xl)">
                  {group.description}
                </p>
              </div>
              
              <!-- Performance Info Card -->
              <div class="p(2xl) bg(primary.05) r(xl)">
                <div class="hbox(middle) gap(2xl)">
                  <div class="vbox gap(sm)">
                    <h3 class="heading(h3) c(primary-900)">Performance Optimized</h3>
                    <p class="body(sm) c(primary-700)">
                      Rule2 handlers process AST directly without string conversions for maximum performance.
                    </p>
                  </div>
                  <div class="vbox gap(xs)">
                    <div class="hbox gap(lg)">
                      <Badge size="sm">AST Direct</Badge>
                      <Badge size="sm">No Object Conversion</Badge>
                      <Badge size="sm">CSS String Output</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Special text() rule examples -->
              {#if group.category === 'Typography'}
                <div class="p(2xl) bg(accent.05) r(xl)">
                  <div class="vbox gap(xl)">
                    <h3 class="heading(h3) c(accent-900)">text() Rule Combinations</h3>
                    <p class="body(sm) c(accent-700)">
                      The text() rule supports multiple combinations for flexible text styling and layout.
                    </p>
                    
                    <div class="grid(1) md:grid(2) gap(lg)">
                      <div class="vbox gap(md)">
                        <h4 class="label(sm) c(accent-800)">Alignment</h4>
                        <div class="vbox gap(xs)">
                          <code class="mono caption c(accent-700)">text(left)</code>
                          <code class="mono caption c(accent-700)">text(center)</code>
                          <code class="mono caption c(accent-700)">text(right)</code>
                          <code class="mono caption c(accent-700)">text(justify)</code>
                        </div>
                      </div>
                      
                      <div class="vbox gap(md)">
                        <h4 class="label(sm) c(accent-800)">Transform & Decoration</h4>
                        <div class="vbox gap(xs)">
                          <code class="mono caption c(accent-700)">text(uppercase)</code>
                          <code class="mono caption c(accent-700)">text(lowercase)</code>
                          <code class="mono caption c(accent-700)">text(capitalize)</code>
                          <code class="mono caption c(accent-700)">text(underline)</code>
                        </div>
                      </div>
                      
                      <div class="vbox gap(md)">
                        <h4 class="label(sm) c(accent-800)">White Space</h4>
                        <div class="vbox gap(xs)">
                          <code class="mono caption c(accent-700)">text(nowrap)</code>
                          <code class="mono caption c(accent-700)">text(wrap)</code>
                          <code class="mono caption c(accent-700)">text(pre)</code>
                          <code class="mono caption c(accent-700)">text(pre-wrap)</code>
                        </div>
                      </div>
                      
                      <div class="vbox gap(md)">
                        <h4 class="label(sm) c(accent-800)">Layout (Figma-like)</h4>
                        <div class="vbox gap(xs)">
                          <code class="mono caption c(accent-700)">text(top)</code>
                          <code class="mono caption c(accent-700)">text(middle)</code>
                          <code class="mono caption c(accent-700)">text(bottom)</code>
                          <code class="mono caption c(accent-700)">text(pack)</code>
                        </div>
                      </div>
                    </div>
                    
                    <div class="vbox gap(md)">
                      <h4 class="label(sm) c(accent-800)">Powerful Combinations</h4>
                      <div class="grid(1) md:grid(2) gap(sm)">
                        <code class="mono caption c(accent-700) p(sm) bg(white) r(md)">text(center+nowrap)</code>
                        <code class="mono caption c(accent-700) p(sm) bg(white) r(md)">text(right+uppercase)</code>
                        <code class="mono caption c(accent-700) p(sm) bg(white) r(md)">text(center+middle)</code>
                        <code class="mono caption c(accent-700) p(sm) bg(white) r(md)">text(left+underline)</code>
                      </div>
                    </div>
                  </div>
                </div>
              {/if}
            </div>
            
            <!-- Rules Table -->
            <div class="vbox gap(2xl) pt(4xl)">
              <div class="overflow-x(auto) r(xl) bg(white) shadow(sm)">
                <table class="w(full)">
                  <thead>
                    <tr class="bg(mute-50)">
                      <th class="text(left) p(lg) label(sm) c(mute-700) w(240)">Rule Name</th>
                      <th class="text(left) p(lg) label(sm) c(mute-700)">Example Usage</th>
                      <th class="text(left) p(lg) label(sm) c(mute-700)">CSS Output</th>
                      <th class="text(left) p(lg) label(sm) c(mute-700) w(120)">Preview</th>
                    </tr>
                  </thead>
                  <tbody>
                    {#each rule2Rules[group.category] || [] as ruleName, i}
                      <tr class="{i % 2 === 0 ? 'bg(white)' : 'bg(mute-50.5)'} 
                                 hover:bg(primary.05) transition-colors duration(150)">
                        <!-- Rule Name -->
                        <td class="p(lg)">
                          <button
                            class="hbox(middle) gap(sm) cursor(pointer) group"
                            on:click={() => copyToClipboard(ruleName)}
                            title="Click to copy {ruleName}"
                          >
                            <code class="mono bold c(mute-900) body(sm)">{ruleName}</code>
                            {#if copiedRule === ruleName}
                              <Check size="16" class="c(success)" />
                            {:else}
                              <Copy size="14" class="c(mute-400) group-hover:c(mute-600) transition" />
                            {/if}
                          </button>
                        </td>
                        
                        <!-- Example Usage -->
                        <td class="p(lg)">
                          <code class="body(sm) font(mono) c(mute-600)">
                            {#if group.category === 'Layout'}
                              {#if ruleName.startsWith('p')}
                                {ruleName}(xl) {ruleName}(20/30)
                              {:else if ruleName === 'w' || ruleName === 'h'}
                                {ruleName}(full) {ruleName}(200) {ruleName}(fill)
                              {:else if ruleName === 'size'}
                                size(32) size(16:9) size(320x200)
                              {:else if ruleName.startsWith('min-') || ruleName.startsWith('max-')}
                                {ruleName}(full) {ruleName}(lg)
                              {:else if ruleName === 'hbox' || ruleName === 'vbox'}
                                {ruleName}() {ruleName}(pack) {ruleName}(center+middle)
                              {:else if ruleName === 'pack' || ruleName === 'wrap'}
                                {ruleName}()
                              {:else if ruleName.startsWith('m')}
                                {ruleName}(lg) {ruleName}(auto)
                              {:else}
                                {ruleName}(md)
                              {/if}
                            {:else if group.category === 'Typography'}
                              {#if ruleName === 'font'}
                                font(xl) font(16/1.5/-2%)
                              {:else if ruleName === 'bold'}
                                bold() bold(600)
                              {:else if ruleName === 'text'}
                                text(center) text(left+nowrap) text(center+middle)
                              {:else if ruleName === 'truncate'}
                                truncate() truncate(2) truncate(3)
                              {:else}
                                {ruleName}()
                              {/if}
                            {:else if group.category === 'Colors'}
                              {#if ruleName === 'c'}
                                c(primary) c(red-500)
                              {:else if ruleName === 'bg'}
                                bg(primary) bg(blue-500)
                              {:else}
                                {ruleName}(primary)
                              {/if}
                            {:else if group.category === 'Visual'}
                              {#if ruleName === 'b' || ruleName === 'border'}
                                {ruleName}() {ruleName}(2) {ruleName}(1/solid/red)
                              {:else if ruleName === 'r'}
                                r() r(lg) r(8/16/8/16)
                              {:else if ruleName.startsWith('b') && ruleName.length === 2}
                                {ruleName}(1/solid/blue)
                              {:else if ruleName === 'opacity'}
                                opacity(0.5) opacity(0.8)
                              {:else if ['blur', 'brightness', 'contrast'].includes(ruleName)}
                                {ruleName}(4) {ruleName}(1.2)
                              {:else}
                                {ruleName}(value)
                              {/if}
                            {:else if group.category === 'CSS Advanced'}
                              {#if ruleName.startsWith('m')}
                                {ruleName}(lg) {ruleName}(auto)
                              {:else if ruleName === 'wrap'}
                                text(wrap) (via text rule)
                              {:else if ruleName.startsWith('pre')}
                                text({ruleName}) (via text rule)
                              {:else}
                                {ruleName}(value)
                              {/if}
                            {:else}
                              {ruleName}(value)
                            {/if}
                          </code>
                        </td>
                        
                        <!-- CSS Output -->
                        <td class="p(lg)">
                          <code class="body(sm) font(mono) c(mute-700) block whitespace(pre-wrap)">
                            {#if group.category === 'Layout'}
                              {#if ruleName.startsWith('p')}
                                {generateClass(`${ruleName}(xl)`)}
                              {:else if ruleName === 'w' || ruleName === 'h'}
                                {generateClass(`${ruleName}(full)`)}
                              {:else if ruleName === 'size'}
                                {generateClass('size(32)')}
                              {:else if ruleName.startsWith('min-') || ruleName.startsWith('max-')}
                                {generateClass(`${ruleName}(full)`)}
                              {:else if ruleName === 'hbox' || ruleName === 'vbox'}
                                {generateClass(`${ruleName}()`)}
                              {:else if ruleName === 'pack' || ruleName === 'wrap'}
                                {generateClass(`${ruleName}()`)}
                              {:else if ruleName.startsWith('m')}
                                {generateClass(`${ruleName}(lg)`)}
                              {:else}
                                {generateClass(`${ruleName}(md)`)}
                              {/if}
                            {:else if group.category === 'Typography'}
                              {#if ruleName === 'font'}
                                {generateClass('font(xl)')}
                              {:else if ruleName === 'bold'}
                                {generateClass('bold()')}
                              {:else if ruleName === 'truncate'}
                                {generateClass('truncate()')}
                              {:else}
                                {generateClass(`${ruleName}()`)}
                              {/if}
                            {:else if group.category === 'Colors'}
                              {generateClass(`${ruleName}(primary)`)}
                            {:else if group.category === 'Visual'}
                              {#if ruleName === 'b' || ruleName === 'border'}
                                {generateClass(`${ruleName}()`)}
                              {:else if ruleName === 'r'}
                                {generateClass('r()')}
                              {:else if ruleName.startsWith('b') && ruleName.length === 2}
                                {generateClass(`${ruleName}(1/solid/blue)`)}
                              {:else if ruleName === 'opacity'}
                                {generateClass('opacity(0.5)')}
                              {:else}
                                {generateClass(`${ruleName}(4)`)}
                              {/if}
                            {:else}
                              {generateClass(`${ruleName}(value)`)}
                            {/if}
                          </code>
                        </td>
                        
                        <!-- Mini Preview -->
                        <td class="p(lg)">
                          <div class="w(80) h(32) hbox(center) r(md) bg(mute-50) relative overflow(hidden)">
                            {#if group.category === 'Colors'}
                              <div class="{ruleName}(primary) body(sm)">Aa</div>
                            {:else if group.category === 'Layout' && ruleName.startsWith('p')}
                              <div class="{ruleName}(lg) bg(primary.1) r(sm) hbox">
                                <div class="w(8) h(8) bg(primary) r(xs)"></div>
                              </div>
                            {:else if group.category === 'Layout' && (ruleName === 'w' || ruleName === 'h')}
                              <div class="{ruleName}(24) bg(primary.1) r(sm)">
                                <div class="w(full) h(full) bg(primary) r(xs)"></div>
                              </div>
                            {:else if group.category === 'Layout' && ruleName === 'size'}
                              <div class="size(24) bg(primary.1) r(sm)">
                                <div class="w(full) h(full) bg(primary) r(xs)"></div>
                              </div>
                            {:else if group.category === 'Layout' && (ruleName.startsWith('min-') || ruleName.startsWith('max-'))}
                              <div class="bg(primary.1) r(sm) p(xs)">
                                <div class="w(16) h(16) bg(primary) r(xs)"></div>
                              </div>
                            {:else if group.category === 'Layout' && (ruleName === 'hbox' || ruleName === 'vbox')}
                              <div class="{ruleName}() gap(xs) bg(primary.1) r(sm) p(xs)">
                                <div class="w(8) h(8) bg(primary) r(xs)"></div>
                                <div class="w(8) h(8) bg(primary) r(xs)"></div>
                              </div>
                            {:else if group.category === 'Layout' && (ruleName === 'pack' || ruleName === 'wrap')}
                              <div class="{ruleName}() gap(xs) bg(primary.1) r(sm) p(xs)">
                                <div class="w(6) h(6) bg(primary) r(xs)"></div>
                                <div class="w(6) h(6) bg(primary) r(xs)"></div>
                              </div>
                            {:else if group.category === 'Layout' && ruleName.startsWith('m')}
                              <div class="{ruleName}(md) bg(primary.1) r(sm)">
                                <div class="w(12) h(12) bg(primary) r(xs)"></div>
                              </div>
                            {:else if group.category === 'Typography'}
                              {#if ruleName === 'truncate'}
                                <div class="truncate() body(sm) c(mute-900) w(60)">Long text that will be truncated with ellipsis</div>
                              {:else}
                                <div class="{ruleName === 'font' ? 'font(lg)' : `${ruleName}()`} body(sm) c(mute-900)">Aa</div>
                              {/if}
                            {:else if group.category === 'Visual'}
                              {#if ruleName === 'b' || ruleName === 'border'}
                                <div class="{ruleName}() w(20) h(20) bg(primary.1) r(xs)"></div>
                              {:else if ruleName === 'r'}
                                <div class="r(lg) w(20) h(20) bg(primary) r(xs)"></div>
                              {:else if ruleName.startsWith('b') && ruleName.length === 2}
                                <div class="{ruleName}(2/solid/primary) w(20) h(20) bg(primary.1) r(xs)"></div>
                              {:else if ruleName === 'opacity'}
                                <div class="opacity(0.5) w(20) h(20) bg(primary) r(xs)"></div>
                              {:else if ['blur', 'brightness', 'contrast'].includes(ruleName)}
                                <div class="{ruleName}(2) w(20) h(20) bg(primary) r(xs)">Fx</div>
                              {:else}
                                <div class="w(20) h(20) bg(primary) r(xs)"></div>
                              {/if}
                            {:else}
                              <div class="w(12) h(12) bg(mute-300) r(xs)"></div>
                            {/if}
                          </div>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        {/each}
      </div>
    
      </div>
    </main>
  </div>
</div>

<style>
  /* Table Styles */
  table {
    border-spacing: 0;
  }
  
  th {
    position: sticky;
    top: 0;
    z-index: 10;
  }
  
  /* Custom scrollbar for sidebar */
  nav::-webkit-scrollbar {
    width: 6px;
  }
  
  nav::-webkit-scrollbar-track {
    background: transparent;
  }
  
  nav::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
  
  nav::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
  }
</style>