<script lang="ts">
  import { Copy, Check, ChevronDown, ChevronRight } from 'lucide-svelte';
  import { generateCSS, RULE_GROUPS } from 'adorable-css';
  
  let copiedRule = '';
  let liveInput = '';
  let liveCSS = '';
  let liveError = '';
  let expandedGroups: Record<string, boolean> = {};
  
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
      
      <div class="p(12) vbox gap(20)">
        {#each Object.entries(RULE_GROUPS) as [groupKey, group]}
          <div>
            <button
              class="w(full) hbox(middle) gap(8) cursor(pointer) group"
              on:click={() => toggleGroup(group.name)}
            >
              {#if expandedGroups[group.name]}
                <ChevronDown size="16" class="c(gray-400)" />
              {:else}
                <ChevronRight size="16" class="c(gray-400)" />
              {/if}
              <h3 class="caption(xs) c(gray-400) uppercase letter-spacing(widest) flex(1) text(left)">
                {group.name}
              </h3>
            </button>
            
            {#if expandedGroups[group.name]}
              <ul class="vbox gap(1) mt(8)">
                {#each Object.entries(group.subgroups) as [subgroupKey, subgroup]}
                  <li>
                    <a 
                      href="#{group.name}-{subgroup.name}"
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
    </nav>
    
    <!-- Main Content -->
    <main class="ml(0) lg:ml(240px) min-h(100vh) bg(white)">
      <div class="px(20) lg:px(40) py(40) xl:pr(280)">
        <!-- Page Header -->
        <div class="mb(48)">
          <h1 class="heading(h1) c(gray-900) mb(16)">API Reference</h1>
          <p class="body(lg) c(gray-600) max-w(3xl)">
            Complete reference for all AdorableCSS rules, organized by category.
            Explore layout, visual, typography, and utility rules with live examples.
          </p>
        </div>

        <!-- Live CSS Tester -->
        <section class="mb(48) p(24) bg(gray-50) r(12) border(1/gray-100)">
          <h3 class="title(lg) c(gray-900) mb(16)">Live CSS Tester</h3>
          <div class="vbox gap(16)">
            <div class="hbox gap(12)">
              <input
                bind:value={liveInput}
                placeholder="Enter AdorableCSS classes... (e.g., w(300) p(lg) c(blue-500))"
                class="flex(1) px(16) py(12) border(1/gray-200) r(8) body(base) font(mono) bg(white)
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
                <pre class="p(20) bg(white) border(1/gray-200) r(8) caption(base) font(mono) 
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

      <!-- Rules by Group -->
      <div class="vbox gap(48)">
        {#each Object.entries(RULE_GROUPS) as [groupKey, group]}
          <section>
            <!-- Group Header -->
            <div class="mb(24)">
              <h2 class="heading(h1) c(gray-900) mb(8)">{group.name}</h2>
              <p class="body(base) c(gray-600)">
                {group.metadata?.description || `${group.name} utilities`}
              </p>
            </div>
            
            <div class="vbox gap(32)">
              {#each Object.entries(group.subgroups) as [subgroupKey, subgroup]}
                <div id="{group.name}-{subgroup.name}" class="card scroll-mt(24)">
                  <!-- Subgroup Header -->
                  <div class="mb(16)">
                    <h3 class="title(lg) c(gray-800) mb(4)">{subgroup.name}</h3>
                    <p class="caption(base) c(gray-500)">{Object.keys(subgroup.rules).length} rules</p>
                  </div>
                  
                  <!-- Rules Table -->
                  <div class="overflow-x(auto) r(8) border(1/gray-200)">
                    <table class="w(full)">
                      <thead>
                        <tr class="bg(gray-50) border-b(1/gray-200)">
                          <th class="text(left) p(sm/lg) label(sm) c(gray-600) w(200)">Rule</th>
                          <th class="text(left) p(sm/lg) label(sm) c(gray-600) w(120)">Priority</th>
                          <th class="text(left) p(sm/lg) label(sm) c(gray-600)">Description</th>
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
                                <code class="font(mono) bold(medium) c(purple-600) body(xs)">{ruleName}</code>
                                {#if copiedRule === ruleName}
                                  <Check size="14" class="c(green-600)" />
                                {:else}
                                  <Copy size="12" class="c(gray-400) group-hover:c(gray-600) transition" />
                                {/if}
                              </button>
                            </td>
                            
                            <!-- Priority -->
                            <td class="p(sm/lg)">
                              <span class="caption(base) font(mono) c(gray-600)">{group.priority}</span>
                            </td>
                            
                            <!-- Description -->
                            <td class="p(sm/lg)">
                              <span class="body(xs) font(mono) c(gray-700)">{generateCSS([ruleName])}</span>
                            </td>
                          </tr>
                        {/each}
                      </tbody>
                    </table>
                  </div>
                </div>
              {/each}
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