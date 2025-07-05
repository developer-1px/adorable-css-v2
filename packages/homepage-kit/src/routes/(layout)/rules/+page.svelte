<script lang="ts">
  import { Copy, Check, ChevronDown, ChevronRight } from 'lucide-svelte';
  import { generateCSS, generateCSSFromAdorableCSS, RULE_GROUPS } from 'adorable-css';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  
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

<div class="min-h(100vh) bg(white)">
  <!-- Hero Section -->
  <section class="relative overflow(hidden) bg(to-br/mute-900..mute-800) py(2xl)">
    <div class="container(6xl) mx(auto) px(2xl) relative z(10)">
      <div class="vbox(center) gap(2xl)">
        <!-- Hero Content -->
        <div class="vbox(center) gap(lg) max-w(4xl)">
          <Badge variant="outline">
            <span class="c(white)">{totalRules} Rules Available</span>
          </Badge>
          <h1 class="display(lg) c(white)">
            AdorableCSS Rule Reference
          </h1>
          <p class="body(base) c(white.8) max-w(4xl)">
            Complete API reference for all AdorableCSS rules. Organized by CSS @layer cascade for predictable styling without specificity battles.
          </p>
          
          <!-- @layer Visual -->
          <div class="hbox(center) gap(md) flex-wrap">
            <Badge size="lg">
              <span class="c(white)">@component</span>
            </Badge>
            <span class="c(white.6)">→</span>
            <Badge size="lg">
              <span class="c(white)">@layout</span>
            </Badge>
            <span class="c(white.6)">→</span>
            <Badge size="lg">
              <span class="c(white)">@utility</span>
            </Badge>
            <span class="c(white.6)">→</span>
            <Badge size="lg">
              <span class="c(white)">@state</span>
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
        <h2 class="title(md) c(mute-900)">Quick Navigation</h2>
        <p class="caption c(mute-600) pt(xs)">Jump to any rule category</p>
      </div>
      
      <div class="p(lg) vbox gap(xl)">
        {#each LAYER_GROUPS as layerGroup}
          {#if layerGroup.groups.length > 0}
            <div class="vbox gap(sm)">
              <div class="px(md) py(sm) bg(mute-100) r(md)">
                <h3 class="caption(xs) c(mute-700) uppercase letter-spacing(widest) bold">@{layerGroup.layer}</h3>
              </div>
              
              <div class="vbox gap(xs)">
                {#each layerGroup.groups as group}
                  <div>
                    <button
                      class="w(full) hbox(middle) gap(sm) px(md) py(sm) r(md) cursor(pointer) hover:bg(mute-50) transition-colors"
                      on:click={() => toggleGroup(group.name)}
                    >
                      {#if expandedGroups[group.name]}
                        <ChevronDown size="16" class="c(mute-500)" />
                      {:else}
                        <ChevronRight size="16" class="c(mute-500)" />
                      {/if}
                      <h4 class="body(sm) c(mute-800) flex(1) text(left)">
                        {group.name}
                      </h4>
                    </button>
                    
                    {#if expandedGroups[group.name]}
                      <ul class="vbox gap(xs) pl(xl) pt(xs)">
                        {#each Object.entries(group.subgroups) as [subgroupKey, subgroup]}
                          <li>
                            <a 
                              href="#{layerGroup.layer}-{group.name}-{subgroup.name}"
                              class="block py(xs) px(md) r(md) transition-all
                                     c(mute-600) hover:bg(mute-50) hover:c(mute-900)"
                            >
                              <div class="hbox(middle) gap(sm)">
                                <span class="body(sm) flex(1)">{subgroup.name}</span>
                                <span class="caption(xs) c(mute-500)">{Object.keys(subgroup.rules).length}</span>
                              </div>
                            </a>
                          </li>
                        {/each}
                      </ul>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </nav>
    
    <!-- Main Content -->
    <main class="ml(0) lg:ml(280) min-h(100vh) bg(white)">
      <div class="px(xl) lg:px(3xl) py(3xl) max-w(4xl)">

      <!-- Rules by Layer -->
      <div class="vbox gap(8xl)">
        {#each LAYER_GROUPS as layerGroup}
          {#if layerGroup.groups.length > 0}
            <section>
              <!-- Layer Header -->
              <div class="vbox gap(2xl)">
                <div class="vbox(center) gap(lg)">
                  <Badge size="lg" variant="secondary">
                    @layer {layerGroup.layer}
                  </Badge>
                  <h2 class="heading(h1) c(mute-900)">{layerGroup.name}</h2>
                  <p class="body(xl) c(mute-600) max-w(4xl)">
                    {layerGroup.description}
                  </p>
                </div>
                
                <!-- Group Cards for this Layer -->
                <div class="grid(1) md:grid(2) lg:grid(3) gap(xl)">
                  {#each layerGroup.groups as group}
                    <Card variant="interactive">
                      <div class="p(2xl)">
                        <div class="vbox gap(xl)">
                          <div class="vbox gap(sm)">
                            <h3 class="heading(h3) c(mute-900)">{group.name}</h3>
                            <p class="body(sm) c(mute-600)">
                              {group.metadata?.description || `${group.name} utilities`}
                            </p>
                          </div>
                          
                          <!-- Subgroup Pills -->
                          <div class="hbox gap(sm) flex-wrap">
                            {#each Object.entries(group.subgroups).slice(0, 4) as [key, subgroup]}
                              <Badge variant="outline" size="sm">
                                {subgroup.name}
                              </Badge>
                            {/each}
                            {#if Object.keys(group.subgroups).length > 4}
                              <Badge variant="outline" size="sm">
                                +{Object.keys(group.subgroups).length - 4} more
                              </Badge>
                            {/if}
                          </div>
                          
                          <!-- Rule Count -->
                          <div class="hbox(middle) gap(sm)">
                            <div class="w(8) h(8) r(full) bg(mute-200)"></div>
                            <p class="caption c(mute-700)">
                              {Object.values(group.subgroups).reduce((sum, sg) => sum + Object.keys(sg.rules).length, 0)} rules
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  {/each}
                </div>
              </div>
              
              <!-- Detailed Rules Tables -->
              <div class="vbox gap(4xl) pt(4xl)">
                {#each layerGroup.groups as group}
                  <div class="vbox gap(3xl)">
                    <!-- Group Section Header -->
                    <div class="vbox gap(lg) pb(xl)">
                      <h3 class="heading(h2) c(mute-900)">{group.name}</h3>
                      <p class="body(lg) c(mute-600)">
                        {group.metadata?.description || `${group.name} utilities`}
                      </p>
                    </div>
                    
                    <!-- Subgroups -->
                    <div class="vbox gap(3xl)">
                      {#each Object.entries(group.subgroups) as [subgroupKey, subgroup]}
                        <div id="{layerGroup.layer}-{group.name}-{subgroup.name}" class="scroll-mt(100)">
                          <!-- Subgroup Header -->
                          <div class="vbox gap(sm)">
                            <h4 class="heading(h3) c(mute-800)">{subgroup.name}</h4>
                            <div class="hbox(middle) gap(lg)">
                              <Badge variant="outline" size="sm">
                                {Object.keys(subgroup.rules).length} rules
                              </Badge>
                              <p class="caption c(mute-600)">
                                @layer {layerGroup.layer} • Priority {group.priority}
                              </p>
                            </div>
                          </div>
                  
                          <!-- Visual Examples for Key Rules -->
                          {#if subgroup.name === 'Layout' || subgroup.name === 'Colors' || subgroup.name === 'Typography' || subgroup.name === 'Spacing'}
                            <div class="p(2xl) bg(mute-50) r(xl)">
                              <div class="vbox gap(xl)">
                                <h5 class="label(sm) c(mute-700) uppercase letter-spacing(wide)">Visual Examples</h5>
                                <div class="grid(2) md:grid(3) gap(lg)">
                                  {#each Object.entries(subgroup.rules).slice(0, 6) as [ruleName, handler]}
                                    {#if ruleName.includes('primary') || ruleName.includes('lg') || ruleName.includes('center') || ruleName.includes('gap') || ruleName.includes('p(') || ruleName.includes('heading')}
                                      <div class="card(elevated/sm) p(lg)">
                                        <div class="vbox gap(md)">
                                          <code class="mono caption(xs) c(mute-700)">{ruleName}</code>
                                          <div class="min-h(48) hbox(center) bg(white) r(md) relative">
                                            <!-- Visual demo based on rule type -->
                                            {#if ruleName.includes('c(') && ruleName.includes('primary')}
                                              <div class="{ruleName} body(sm)">Colored text</div>
                                            {:else if ruleName.includes('bg(') && ruleName.includes('primary')}
                                              <div class="{ruleName} p(md) r(md) c(white)">Background</div>
                                            {:else if ruleName.includes('p(') || ruleName.includes('gap(')}
                                              <div class="{ruleName} bg(mute-100) r(md) hbox">
                                                <div class="w(24) h(24) bg(mute-300) r(sm)"></div>
                                                <div class="w(24) h(24) bg(mute-300) r(sm)"></div>
                                              </div>
                                            {:else if ruleName.includes('hbox') || ruleName.includes('vbox')}
                                              <div class="{ruleName} gap(sm) p(md) bg(mute-100) r(md)">
                                                <div class="w(20) h(20) bg(primary) r(sm)"></div>
                                                <div class="w(20) h(20) bg(primary) r(sm)"></div>
                                                <div class="w(20) h(20) bg(primary) r(sm)"></div>
                                              </div>
                                            {:else if ruleName.includes('w(') || ruleName.includes('h(')}
                                              <div class="{ruleName} bg(accent.2) r(md) min-h(24)"></div>
                                            {:else if ruleName.includes('heading') || ruleName.includes('font')}
                                              <div class="{ruleName} c(mute-900)">Typography</div>
                                            {:else}
                                              <div class="{ruleName} p(sm) bg(mute-100) r(md) min-w(48) min-h(24)"></div>
                                            {/if}
                                          </div>
                                        </div>
                                      </div>
                                    {/if}
                                  {/each}
                                </div>
                              </div>
                            </div>
                          {/if}

                          <!-- Rules Table -->
                          <div class="overflow-x(auto) r(xl) bg(white)">
                            <table class="w(full)">
                              <thead>
                                <tr class="bg(mute-50)">
                                  <th class="text(left) p(lg) label(sm) c(mute-700) w(240)">Rule</th>
                                  <th class="text(left) p(lg) label(sm) c(mute-700)">CSS Output</th>
                                  <th class="text(left) p(lg) label(sm) c(mute-700) w(120)">Preview</th>
                                </tr>
                              </thead>
                              <tbody>
                                {#each Object.entries(subgroup.rules) as [ruleName, handler], i}
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
                                    
                                    <!-- CSS Output -->
                                    <td class="p(lg)">
                                      <code class="body(sm) font(mono) c(mute-700) block whitespace(pre-wrap)">{generateCSSFromAdorableCSS(ruleName)}</code>
                                    </td>
                                    
                                    <!-- Mini Preview -->
                                    <td class="p(lg)">
                                      <div class="w(80) h(32) hbox(center) r(md) bg(mute-50) relative overflow(hidden)">
                                        {#if ruleName.includes('c(') && (ruleName.includes('primary') || ruleName.includes('error') || ruleName.includes('success'))}
                                          <div class="{ruleName} body(sm)">Aa</div>
                                        {:else if ruleName.includes('bg(') && (ruleName.includes('primary') || ruleName.includes('error') || ruleName.includes('success'))}
                                          <div class="{ruleName} w(full) h(full) r(sm)"></div>
                                        {:else if ruleName.includes('p(') || ruleName.includes('gap(')}
                                          <div class="{ruleName} bg(primary.1) r(sm) hbox">
                                            <div class="w(8) h(8) bg(primary) r(xs)"></div>
                                            <div class="w(8) h(8) bg(primary) r(xs)"></div>
                                          </div>
                                        {:else if ruleName.includes('hbox') || ruleName.includes('vbox')}
                                          <div class="{ruleName} gap(xs)">
                                            <div class="w(6) h(6) bg(accent) r(xs)"></div>
                                            <div class="w(6) h(6) bg(accent) r(xs)"></div>
                                            <div class="w(6) h(6) bg(accent) r(xs)"></div>
                                          </div>
                                        {:else}
                                          <div class="{ruleName} w(12) h(12) bg(mute-300) r(xs)"></div>
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