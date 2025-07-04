<script lang="ts">
  import { Copy, Check, ChevronDown, ChevronRight } from 'lucide-svelte';
  import { generateCSS, generateCSSFromAdorableCSS, RULE_GROUPS } from 'adorable-css';
  
  let copiedRule = '';
  let liveInput = '';
  let liveCSS = '';
  let liveError = '';
  let expandedGroups: Record<string, boolean> = {};
  
  // @layer 순서대로 그룹 재구성
  const LAYER_GROUPS = [
    {
      layer: 'component',
      name: 'Component Layer',
      description: 'Pre-built UI components and patterns (Priority: 100)',
      groups: []
    },
    {
      layer: 'layout', 
      name: 'Layout Layer',
      description: 'Layout, spacing, and sizing utilities (Priority: 200)',
      groups: []
    },
    {
      layer: 'utility',
      name: 'Utility Layer', 
      description: 'Visual styling and typography utilities (Priority: 300)',
      groups: []
    },
    {
      layer: 'state',
      name: 'State Layer',
      description: 'Interactive states and pseudo-classes (Priority: 400)',
      groups: []
    }
  ];
  
  // RULE_GROUPS를 priority 기준으로 LAYER_GROUPS에 분배
  function organizeByLayer() {
    Object.entries(RULE_GROUPS).forEach(([key, group]) => {
      const priority = group.priority;
      let targetLayer;
      
      if (priority === 100) {
        targetLayer = LAYER_GROUPS.find(l => l.layer === 'component');
      } else if (priority === 200) {
        targetLayer = LAYER_GROUPS.find(l => l.layer === 'layout');
      } else if (priority === 300) {
        targetLayer = LAYER_GROUPS.find(l => l.layer === 'utility');
      } else if (priority === 400) {
        targetLayer = LAYER_GROUPS.find(l => l.layer === 'state');
      }
      
      if (targetLayer) {
        targetLayer.groups.push({ key, ...group });
      }
    });
  }
  
  // 초기화
  organizeByLayer();
  
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
  
  // Count total rules
  function countRules() {
    let total = 0;
    Object.values(RULE_GROUPS).forEach(group => {
      Object.values(group.subgroups).forEach(subgroup => {
        total += Object.keys(subgroup.rules).length;
      });
    });
    return total;
  }
  
  $: totalRules = countRules();
</script>

<div class="min-h(100vh) bg(gray-50)">
  <!-- Main Layout -->
  <div class="flex">
    <!-- Left Navigation -->
    <nav class="hidden lg:block fixed top(0) left(0) w(240px) h(100vh) bg(white) border-r(1/gray-200) scroll(y) overscroll-behavior(contain) z(40)">
      <div class="p(16) pb(12) border-b(1/gray-100)">
        <h2 class="title(sm) c(gray-900)">API Reference</h2>
        <p class="caption(xs) c(gray-500) mt(2)">Total: {totalRules} rules</p>
      </div>
      
      <div class="p(12) vbox gap(24)">
        {#each LAYER_GROUPS as layerGroup}
          {#if layerGroup.groups.length > 0}
            <div>
              <div class="px(8) py(4) bg(purple-50) r(6) mb(12)">
                <h3 class="caption(xs) c(purple-700) uppercase letter-spacing(widest) bold">@{layerGroup.layer}</h3>
              </div>
              
              {#each layerGroup.groups as group}
                <div class="mb(16)">
                  <button
                    class="w(full) hbox(middle) gap(8) cursor(pointer) group"
                    on:click={() => toggleGroup(group.name)}
                  >
                    {#if expandedGroups[group.name]}
                      <ChevronDown size="16" class="c(gray-400)" />
                    {:else}
                      <ChevronRight size="16" class="c(gray-400)" />
                    {/if}
                    <h4 class="body(sm) c(gray-700) flex(1) text(left)">
                      {group.name}
                    </h4>
                  </button>
                  
                  {#if expandedGroups[group.name]}
                    <ul class="vbox gap(1) mt(8)">
                      {#each Object.entries(group.subgroups) as [subgroupKey, subgroup]}
                        <li>
                          <a 
                            href="#{layerGroup.layer}-{group.name}-{subgroup.name}"
                            class="relative block py(6) px(12) ml(20) r(6) transition-all duration(150)
                                   c(gray-600) hover:bg(gray-50) hover:c(gray-900)"
                          >
                            <div class="hbox(middle) gap(8)">
                              <span class="body(sm) flex(1)">{subgroup.name}</span>
                              <span class="caption(xs) c(gray-400)">{Object.keys(subgroup.rules).length}</span>
                            </div>
                          </a>
                        </li>
                      {/each}
                    </ul>
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        {/each}
      </div>
    </nav>
    
    <!-- Main Content -->
    <main class="ml(0) lg:ml(240px) min-h(100vh) bg(white)">
      <div class="px(20) lg:px(40) py(40) xl:pr(280)">
        <!-- Page Header -->
        <div class="mb(48)">
          <h1 class="heading(h1) c(gray-900) mb(16)">API Reference</h1>
          <p class="body(lg) c(gray-600) max-w(3xl) mb(16)">
            Complete reference for all AdorableCSS rules, organized by CSS @layer cascade order.
            Rules are automatically assigned to layers for predictable styling without specificity hacks.
          </p>
          
          <!-- @layer 설명 -->
          <div class="p(20) bg(purple-50) border(1/purple-200) r(12)">
            <h3 class="title(md) c(purple-900) mb(8)">CSS @layer Cascade System</h3>
            <p class="body(sm) c(purple-800) mb(12)">
              AdorableCSS uses the native CSS @layer feature to manage specificity. The cascade order is:
            </p>
            <div class="hbox gap(8) flex-wrap(wrap)">
              <code class="px(12) py(6) bg(white) border(1/purple-300) r(6) font(mono) caption(sm) c(purple-700)">@layer component</code>
              <span class="c(purple-600) self(center)">→</span>
              <code class="px(12) py(6) bg(white) border(1/purple-300) r(6) font(mono) caption(sm) c(purple-700)">@layer layout</code>
              <span class="c(purple-600) self(center)">→</span>
              <code class="px(12) py(6) bg(white) border(1/purple-300) r(6) font(mono) caption(sm) c(purple-700)">@layer utility</code>
              <span class="c(purple-600) self(center)">→</span>
              <code class="px(12) py(6) bg(white) border(1/purple-300) r(6) font(mono) caption(sm) c(purple-700)">@layer state</code>
            </div>
            <p class="body(xs) c(purple-700) mt(8)">
              Later layers always override earlier ones, regardless of selector specificity.
            </p>
          </div>
        </div>

        <!-- Live CSS Tester -->
        <section class="mb(48) p(24) bg(gray-50) r(12) border(1/gray-100)">
          <h3 class="title(lg) c(gray-900) mb(16)">Live CSS Tester</h3>
          <div class="vbox gap(16)">
            <div class="hbox gap(12)">
              <input
                bind:value={liveInput}
                placeholder="Enter AdorableCSS classes... (e.g., w(300) p(lg) c(blue-500))"
                class="flex(1) px(16) py(12) border(1/gray-200) r(8) body(base) mono bg(white)
                       focus:border(purple-300) focus:ring(2/purple-100) transition-all"
                on:input={generateLiveCSS}
              />
              <button
                class="px(20) py(12) bg(purple-600) c(white) r(8) body(sm) bold hover:bg(purple-700) 
                       active:scale(0.98) transition-all duration(150)"
                on:click={() => copyToClipboard(liveCSS)}
                title="Copy CSS output"
              >
                Copy CSS
              </button>
            </div>
            {#if liveCSS}
              <div class="vbox gap(8)">
                <h4 class="label(sm) c(gray-600) uppercase letter-spacing(wide)">Generated CSS:</h4>
                <pre class="p(20) bg(white) border(1/gray-200) r(8) caption(base) mono 
                           overflow-x(auto) max-h(300) scroll(y) c(gray-700)">{liveCSS}</pre>
              </div>
            {/if}
            {#if liveError}
              <div class="p(16) bg(red-50) border(1/red-200) r(8)">
                <p class="body(sm) c(red-700)">Error: {liveError}</p>
              </div>
            {/if}
          </div>
        </section>

      <!-- Rules by Layer -->
      <div class="vbox gap(64)">
        {#each LAYER_GROUPS as layerGroup}
          {#if layerGroup.groups.length > 0}
            <section>
              <!-- Layer Header -->
              <div class="mb(32) pb(16) border-b(2/purple-200)">
                <div class="hbox(middle) gap(12) mb(8)">
                  <code class="px(16) py(8) bg(purple-100) c(purple-800) r(8) mono body(sm)">@layer {layerGroup.layer}</code>
                  <h2 class="heading(h2) c(gray-900)">{layerGroup.name}</h2>
                </div>
                <p class="body(base) c(gray-600)">
                  {layerGroup.description}
                </p>
              </div>
              
              <!-- Groups in this layer -->
              <div class="vbox gap(48)">
                {#each layerGroup.groups as group}
                  <div>
                    <!-- Group Header -->
                    <div class="mb(24)">
                      <h3 class="heading(h3) c(gray-800) mb(8)">{group.name}</h3>
                      <p class="body(sm) c(gray-600)">
                        {group.metadata?.description || `${group.name} utilities`}
                      </p>
                    </div>
                    
                    <div class="vbox gap(32)">
                      {#each Object.entries(group.subgroups) as [subgroupKey, subgroup]}
                        <div id="{layerGroup.layer}-{group.name}-{subgroup.name}" class="card scroll-mt(24)">
                          <!-- Subgroup Header -->
                          <div class="mb(16)">
                            <h4 class="title(lg) c(gray-800) mb(4)">{subgroup.name}</h4>
                            <p class="caption(base) c(gray-500)">{Object.keys(subgroup.rules).length} rules</p>
                          </div>
                  
                  <!-- Examples Grid for Key Rules -->
                  {#if subgroup.name === 'Layout' || subgroup.name === 'Colors' || subgroup.name === 'Typography' || subgroup.name === 'Spacing'}
                    <div class="mb(24) p(20) bg(gray-50) r(12) border(1/gray-200)">
                      <h5 class="label(sm) c(gray-700) mb(16) uppercase letter-spacing(wide)">Visual Examples</h5>
                      <div class="grid(2) lg:grid(3) gap(16)">
                        {#each Object.entries(subgroup.rules).slice(0, 6) as [ruleName, handler]}
                          {#if ruleName.includes('blue') || ruleName.includes('lg') || ruleName.includes('center') || ruleName.includes('gap') || ruleName.includes('p(') || ruleName.includes('heading')}
                            <div class="p(16) bg(white) r(8) border(1/gray-200) vbox gap(8)">
                              <code class="mono caption(xs) c(purple-600)">{ruleName}</code>
                              <div class="min-h(40) hbox(center) border(1/gray-100) r(6) relative">
                                <!-- Visual demo based on rule type -->
                                {#if ruleName.includes('c(') && ruleName.includes('blue')}
                                  <div class="{ruleName} p(8) r(4)">Colored text</div>
                                {:else if ruleName.includes('bg(') && ruleName.includes('blue')}
                                  <div class="{ruleName} p(8) r(4) c(white)">Background</div>
                                {:else if ruleName.includes('p(') || ruleName.includes('gap(')}
                                  <div class="{ruleName} bg(purple-100) r(4)">
                                    <div class="w(20) h(20) bg(purple-300) r(2)"></div>
                                    <div class="w(20) h(20) bg(purple-300) r(2)"></div>
                                  </div>
                                {:else if ruleName.includes('hbox') || ruleName.includes('vbox')}
                                  <div class="{ruleName} gap(8) p(8) bg(blue-50) r(4)">
                                    <div class="w(16) h(16) bg(blue-300) r(2)"></div>
                                    <div class="w(16) h(16) bg(blue-300) r(2)"></div>
                                    <div class="w(16) h(16) bg(blue-300) r(2)"></div>
                                  </div>
                                {:else if ruleName.includes('w(') || ruleName.includes('h(')}
                                  <div class="{ruleName} bg(green-200) r(4) min-h(20)">Size demo</div>
                                {:else if ruleName.includes('heading') || ruleName.includes('font')}
                                  <div class="{ruleName} c(gray-800)">Typography</div>
                                {:else}
                                  <div class="{ruleName} p(4) bg(gray-100) r(4) min-w(40) min-h(20)">Demo</div>
                                {/if}
                              </div>
                            </div>
                          {/if}
                        {/each}
                      </div>
                    </div>
                  {/if}

                  <!-- Rules Table -->
                  <div class="overflow-x(auto) r(8) border(1/gray-200)">
                    <table class="w(full)">
                      <thead>
                        <tr class="bg(gray-50) border-b(1/gray-200)">
                          <th class="text(left) p(sm/lg) label(sm) c(gray-600) w(200)">Rule</th>
                          <th class="text(left) p(sm/lg) label(sm) c(gray-600)">CSS Output</th>
                          <th class="text(left) p(sm/lg) label(sm) c(gray-600) w(100)">Preview</th>
                        </tr>
                      </thead>
                      <tbody>
                        {#each Object.entries(subgroup.rules) as [ruleName, handler], i}
                          <tr class="{i % 2 === 0 ? 'bg(white)' : 'bg(gray-50)'} 
                                     border-b(1/gray-100) hover:bg(purple-50) transition-colors duration(150)">
                            <!-- Rule Name -->
                            <td class="p(sm/lg)">
                              <button
                                class="hbox(middle) gap(8) cursor(pointer) group"
                                on:click={() => copyToClipboard(ruleName)}
                                title="Click to copy {ruleName}"
                              >
                                <code class="mono bold(medium) c(purple-600) body(xs)">{ruleName}</code>
                                {#if copiedRule === ruleName}
                                  <Check size="14" class="c(green-600)" />
                                {:else}
                                  <Copy size="12" class="c(gray-400) group-hover:c(gray-600) transition" />
                                {/if}
                              </button>
                            </td>
                            
                            <!-- CSS Output -->
                            <td class="p(sm/lg)">
                              <code class="body(xs) font(mono) c(gray-700) block whitespace(pre-wrap)">{generateCSSFromAdorableCSS(ruleName)}</code>
                            </td>
                            
                            <!-- Mini Preview -->
                            <td class="p(sm/lg)">
                              <div class="w(60) h(24) hbox(center) border(1/gray-200) r(4) bg(gray-50) relative overflow(hidden)">
                                {#if ruleName.includes('c(') && (ruleName.includes('blue') || ruleName.includes('red') || ruleName.includes('green'))}
                                  <div class="{ruleName} caption(xs)">Aa</div>
                                {:else if ruleName.includes('bg(') && (ruleName.includes('blue') || ruleName.includes('red') || ruleName.includes('green'))}
                                  <div class="{ruleName} w(full) h(full) r(2)"></div>
                                {:else if ruleName.includes('p(') || ruleName.includes('gap(')}
                                  <div class="{ruleName} bg(blue-100) r(2) hbox">
                                    <div class="w(6) h(6) bg(blue-400) r(1)"></div>
                                    <div class="w(6) h(6) bg(blue-400) r(1)"></div>
                                  </div>
                                {:else if ruleName.includes('hbox') || ruleName.includes('vbox')}
                                  <div class="{ruleName} gap(2)">
                                    <div class="w(4) h(4) bg(purple-400) r(1)"></div>
                                    <div class="w(4) h(4) bg(purple-400) r(1)"></div>
                                    <div class="w(4) h(4) bg(purple-400) r(1)"></div>
                                  </div>
                                {:else}
                                  <div class="{ruleName} w(8) h(8) bg(gray-300) r(1)"></div>
                                {/if}
                              </div>
                            </td>
                          </tr>
                        {/each}
                      </tbody>
                    </table>
                  </div>
                </div>
              {/each}
            </div>
                  </div>
                {/each}
              </div>
            </section>
          {/if}
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