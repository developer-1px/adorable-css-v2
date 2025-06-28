<script lang="ts">
  import { onMount } from 'svelte';
  import { getAllRulesInfo, searchRules, getRuleStats, type CategoryInfo, type RuleInfo } from '../../utils/rule-inspector';
  
  let categories: CategoryInfo[] = [];
  let searchQuery = '';
  let searchResults: RuleInfo[] = [];
  let isSearching = false;
  let stats: any = {};
  let selectedRule: RuleInfo | null = null;
  let expandedCategories = new Set<string>();
  
  onMount(async () => {
    try {
      categories = await getAllRulesInfo();
      stats = await getRuleStats();
      console.log('Loaded categories:', categories);
      console.log('Stats:', stats);
    } catch (error) {
      console.error('Failed to load rules:', error);
    }
  });
  
  async function handleSearch() {
    if (searchQuery.trim()) {
      isSearching = true;
      searchResults = await searchRules(searchQuery);
    } else {
      isSearching = false;
      searchResults = [];
    }
  }
  
  function selectRule(rule: RuleInfo) {
    selectedRule = rule;
  }
  
  function toggleCategory(categoryName: string) {
    if (expandedCategories.has(categoryName)) {
      expandedCategories.delete(categoryName);
    } else {
      expandedCategories.add(categoryName);
    }
    expandedCategories = new Set(expandedCategories);
  }
  
  function formatCssOutput(output: any): string {
    if (!output || typeof output !== 'object') return 'null';
    return JSON.stringify(output, null, 2);
  }
  
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }
</script>

<div class="debug-reference min-h(screen) bg(gray-50)">
  <!-- Header -->
  <div class="bg(white) shadow(sm) sticky top">
    <div class="container(xl) py(lg)">
      <div class="vbox gap(md)">
        <div class="hbox(middle+between)">
          <div class="vbox gap(xs)">
            <h1 class="font(3xl) bold c(gray-900)">AdorableCSS Debug Reference</h1>
            <p class="font(md) c(gray-600)">
              Inspect rule functions and their generated CSS output
            </p>
          </div>
          
          <!-- Stats -->
          <div class="hbox gap(lg)">
            <div class="text(center)">
              <div class="font(2xl) bold c(purple-600)">{stats.totalRules || 0}</div>
              <div class="font(sm) c(gray-500)">Total Rules</div>
            </div>
            <div class="text(center)">
              <div class="font(2xl) bold c(blue-600)">{stats.totalCategories || 0}</div>
              <div class="font(sm) c(gray-500)">Categories</div>
            </div>
          </div>
        </div>
        
        <!-- Search -->
        <div class="relative max-w(md)">
          <input
            bind:value={searchQuery}
            on:input={handleSearch}
            placeholder="Search rules by name or function content..."
            class="w(full) px(lg) py(md) pr(3xl) r(lg) border(1/gray-300) focus:border(purple-500) transition"
          />
          <div class="layer(right:md+center-y) c(gray-400)">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container(xl) py(xl)">
    <div class="grid grid-cols(1) lg:grid-cols(3) gap(xl)">
      <!-- Left Panel - Categories/Search Results -->
      <div class="lg:col-span(1)">
        <div class="bg(white) r(xl) shadow(sm) clip">
          <div class="p(lg) bb(1/gray-200)">
            <h2 class="font(lg) bold c(gray-900)">
              {isSearching ? `Search Results (${searchResults.length})` : 'Rule Categories'}
            </h2>
          </div>
          
          <div class="max-h(screen-40) overflow-y(auto)">
            {#if isSearching}
              <!-- Search Results -->
              <div class="vbox">
                {#each searchResults as rule (rule.name)}
                  <button
                    on:click={() => selectRule(rule)}
                    class="w(full) text(left) px(lg) py(md) hover:bg(gray-50) border-b(1/gray-100) transition"
                    class:bg={selectedRule?.name === rule.name}
                  >
                    <div class="vbox gap(xs)">
                      <div class="hbox(middle+between)">
                        <span class="font(sm) bold c(gray-900)">{rule.name}</span>
                        <span class="font(xs) c(purple-600) bg(purple-100) px(sm) py(xs) r(full)">
                          {rule.category}
                        </span>
                      </div>
                    </div>
                  </button>
                {/each}
              </div>
            {:else}
              <!-- Categories -->
              <div class="vbox">
                {#each categories as category (category.name)}
                  <div class="border-b(1/gray-100)">
                    <button
                      on:click={() => toggleCategory(category.name)}
                      class="w(full) text(left) px(lg) py(md) hover:bg(gray-50) transition"
                    >
                      <div class="hbox(middle+between)">
                        <span class="font(sm) bold c(gray-900) capitalize">{category.name}</span>
                        <div class="hbox(middle) gap(sm)">
                          <span class="font(xs) c(gray-500)">{category.count}</span>
                          <svg 
                            width="16" 
                            height="16" 
                            fill="currentColor" 
                            class="c(gray-400) transition transform"
                            class:rotate={expandedCategories.has(category.name)}
                            viewBox="0 0 20 20"
                          >
                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </button>
                    
                    {#if expandedCategories.has(category.name)}
                      <div class="bg(gray-50)">
                        {#each category.rules as rule (rule.name)}
                          <button
                            on:click={() => selectRule(rule)}
                            class="w(full) text(left) px(xl) py(sm) hover:bg(gray-100) transition"
                            class:bg={selectedRule?.name === rule.name}
                          >
                            <span class="font(sm) c(gray-700) font-family(mono)">{rule.name}</span>
                          </button>
                        {/each}
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </div>

      <!-- Right Panel - Rule Details -->
      <div class="lg:col-span(2)">
        {#if selectedRule}
          <div class="vbox gap(lg)">
            <!-- Rule Header -->
            <div class="bg(white) r(xl) shadow(sm) p(xl)">
              <div class="vbox gap(md)">
                <div class="hbox(middle+between)">
                  <div class="vbox gap(xs)">
                    <h3 class="font(2xl) bold c(gray-900) font-family(mono)">{selectedRule.name}()</h3>
                    <div class="hbox(middle) gap(sm)">
                      <span class="font(sm) c(purple-600) bg(purple-100) px(sm) py(xs) r(full)">
                        {selectedRule.category}
                      </span>
                      <span class="font(sm) c(gray-500)">
                        {selectedRule.examples.length} examples
                      </span>
                    </div>
                  </div>
                  
                  <button
                    on:click={() => copyToClipboard(selectedRule.sourceCode)}
                    class="px(md) py(sm) bg(gray-100) hover:bg(gray-200) c(gray-700) r(md) font(sm) transition"
                  >
                    Copy Source
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Function Source Code -->
            <div class="bg(white) r(xl) shadow(sm) clip">
              <div class="px(xl) py(lg) bb(1/gray-200)">
                <h4 class="font(lg) bold c(gray-900)">Function Source Code</h4>
              </div>
              <div class="p(xl)">
                <pre class="bg(gray-900) c(gray-100) p(lg) r(lg) overflow-x(auto) font(sm) font-family(mono) line-height(relaxed)">{selectedRule.sourceCode}</pre>
              </div>
            </div>
            
            <!-- CSS Output Examples -->
            <div class="bg(white) r(xl) shadow(sm) clip">
              <div class="px(xl) py(lg) bb(1/gray-200)">
                <h4 class="font(lg) bold c(gray-900)">CSS Output Examples</h4>
              </div>
              <div class="p(xl)">
                <div class="vbox gap(lg)">
                  {#each Object.entries(selectedRule.cssOutput) as [example, output] (example)}
                    <div class="vbox gap(sm)">
                      <div class="hbox(middle+between)">
                        <code class="font(sm) bold c(purple-600) bg(purple-50) px(sm) py(xs) r(md) font-family(mono)">
                          {selectedRule.name}({example === '(no args)' ? '' : example})
                        </code>
                        <button
                          on:click={() => copyToClipboard(formatCssOutput(output))}
                          class="font(xs) c(gray-500) hover:c(gray-700) transition"
                        >
                          Copy
                        </button>
                      </div>
                      <pre class="bg(gray-50) c(gray-800) p(md) r(md) overflow-x(auto) font(sm) font-family(mono)">{formatCssOutput(output)}</pre>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
            
            <!-- Generated CSS Rules -->
            <div class="bg(white) r(xl) shadow(sm) clip">
              <div class="px(xl) py(lg) bb(1/gray-200)">
                <h4 class="font(lg) bold c(gray-900)">Generated CSS Rules</h4>
                <p class="font(sm) c(gray-600) mt(xs)">Complete CSS class selectors with properties</p>
              </div>
              <div class="p(xl)">
                <div class="vbox gap(lg)">
                  {#each Object.entries(selectedRule.cssRules || {}) as [example, cssRule] (example)}
                    <div class="vbox gap(sm)">
                      <div class="hbox(middle+between)">
                        <code class="font(sm) bold c(blue-600) bg(blue-50) px(sm) py(xs) r(md) font-family(mono)">
                          .{selectedRule.name}({example === '(no args)' ? '' : example})
                        </code>
                        <button
                          on:click={() => copyToClipboard(cssRule)}
                          class="font(xs) c(gray-500) hover:c(gray-700) transition"
                        >
                          Copy CSS
                        </button>
                      </div>
                      <pre class="bg(gray-900) c(green-400) p(md) r(md) overflow-x(auto) font(sm) font-family(mono)">{cssRule || '/* No CSS generated */'}</pre>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {:else}
          <div class="bg(white) r(xl) shadow(sm) p(3xl) text(center)">
            <div class="vbox gap(md)">
              <div class="64x64 bg(gray-100) r(full) mx(auto)">
                <svg width="32" height="32" fill="currentColor" class="c(gray-400)" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
              <h3 class="font(lg) bold c(gray-900)">Select a Rule to Inspect</h3>
              <p class="font(md) c(gray-600) max-w(md) mx(auto)">
                Choose a rule from the left panel to view its function source code and CSS output examples
              </p>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .rotate {
    transform: rotate(180deg);
  }
  
  pre {
    tab-size: 2;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  
  code {
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  }
</style>