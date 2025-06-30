<script lang="ts">
  import { Copy, Check, ChevronDown, ChevronRight } from 'lucide-svelte';
  import { generateCSS, priorityRegistry } from 'adorable-css';
  import type { RuleInfo } from 'adorable-css';
  
  let copiedRule = '';
  let liveInput = '';
  let liveCSS = '';
  let liveError = '';
  let expandedGroups: Record<string, boolean> = {};
  let expandedSubgroups: Record<string, boolean> = {};
  
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copiedRule = text;
    setTimeout(() => copiedRule = '', 2000);
  }
  
  function toggleGroup(groupName: string) {
    expandedGroups[groupName] = !expandedGroups[groupName];
  }
  
  function toggleSubgroup(subgroupKey: string) {
    expandedSubgroups[subgroupKey] = !expandedSubgroups[subgroupKey];
  }
  
  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  // Get all rules and maintain RULE_GROUPS order
  $: allRules = priorityRegistry?.getAllRulesInfo?.() || [];
  
  // Define the order from RULE_GROUPS in rule-definitions.ts
  const groupOrder = [
    'Position',
    'Auto Layout', 
    'Visual',
    'Text',
    'CSS',
    'Interaction',
    'Utilities',
    'Responsive',
    'Components'
  ];
  
  // Group rules by their metadata, preserving RULE_GROUPS order
  $: groupedRules = allRules.reduce((acc: Record<string, Record<string, RuleInfo[]>>, rule: RuleInfo) => {
    const group = rule.metadata?.group || 'Ungrouped';
    const subgroup = rule.metadata?.subgroup || 'General';
    
    if (!acc[group]) acc[group] = {};
    if (!acc[group][subgroup]) acc[group][subgroup] = [];
    
    acc[group][subgroup].push(rule);
    return acc;
  }, {} as Record<string, Record<string, RuleInfo[]>>);
  
  // Sort groups according to RULE_GROUPS order
  $: orderedGroups = groupOrder
    .filter(groupName => groupedRules[groupName])
    .map(groupName => [groupName, groupedRules[groupName]] as [string, Record<string, RuleInfo[]>])
    .concat(
      Object.entries(groupedRules)
        .filter(([groupName]) => !groupOrder.includes(groupName))
    );
  
  function testRule(rule: RuleInfo): string {
    try {
      if (rule.type === 'string') {
        return 'String rule - generates AdorableCSS classes';
      }
      
      // Try to generate CSS with common test values
      const testValues = ['', '16', 'lg', 'red', 'center'];
      for (const testValue of testValues) {
        try {
          const className = testValue ? `${rule.name}(${testValue})` : rule.name;
          const result = generateCSS([className]);
          if (result && result.trim()) {
            return result.substring(0, 150) + (result.length > 150 ? '...' : '');
          }
        } catch (e) {
          // Continue to next test value
        }
      }
      return 'No CSS generated with test values';
    } catch (error) {
      return `Error: ${(error as Error).message}`;
    }
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
</script>

<div class="docs-page">
  <!-- Main Layout -->
  <div class="hbox(top) max-w(7xl) mx(auto)">
    <!-- Left Navigation -->
    <nav class="docs-nav w(280) px(4) py(6) border-r(1/gray-200)">
      <div class="sticky top(0)">
        <h3 class="text(xs) font(mono) uppercase tracking(wider) c(gray-500) mb(8) px(4)">RULE GROUPS</h3>
        <ul class="vbox gap(16)">
          {#each orderedGroups as [groupName, subgroups]}
            <li>
              <button
                class="w(full) text(left) px(4) py(2) text(lg) bold transition hover:c(gray-900) {expandedGroups[groupName] !== false ? 'c(gray-900)' : 'c(gray-600)'}"
                on:click={() => toggleGroup(groupName)}
              >
                <div class="hbox(between)">
                  <span>{groupName}</span>
                  <span class="text(xs) font(mono) c(gray-400)">
                    {Object.values(subgroups).flat().length}
                  </span>
                </div>
              </button>
              
              {#if expandedGroups[groupName] !== false}
                <ul class="vbox gap(0) mt(3) mb(2)">
                  {#each Object.entries(subgroups) as [subgroupName, rules]}
                    {@const subgroupKey = `${groupName}-${subgroupName}`}
                    <li>
                      <button
                        class="w(full) text(left) px(4) pl(8) py(1.5) text(sm) transition hover:c(gray-900) {expandedSubgroups[subgroupKey] !== false ? 'c(gray-900)' : 'c(gray-500)'}"
                        on:click={() => scrollToSection(`${groupName}-${subgroupName}`)}
                      >
                        <div class="hbox(between)">
                          <span>· {subgroupName}</span>
                          <span class="text(xs) font(mono) c(gray-400)">
                            {rules.length}
                          </span>
                        </div>
                      </button>
                    </li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    </nav>
    
    <!-- Main Content -->
    <main class="flex(1) px(6)">
    <!-- Live CSS Tester -->
    <section class="mb(8) p(6) bg(white) border(1/gray-200) r(lg)">
      <h3 class="text(lg) bold c(gray-900) mb(4)">Live CSS Tester</h3>
      <div class="vbox gap(4)">
        <div class="hbox gap(4)">
          <input
            bind:value={liveInput}
            placeholder="Enter AdorableCSS classes... (e.g., w(300) p(lg) c(blue-500))"
            class="flex(1) px(3) py(2) border(1/gray-300) r(md) text(sm) font(mono)"
            on:input={generateLiveCSS}
          />
          <button
            class="px(4) py(2) bg(blue-500) c(white) r(md) text(sm) hover:bg(blue-600) transition"
            on:click={() => copyToClipboard(liveCSS)}
            title="Copy CSS output"
          >
            Copy CSS
          </button>
        </div>
        {#if liveCSS}
          <div class="vbox gap(2)">
            <h4 class="text(sm) bold c(gray-700)">Generated CSS:</h4>
            <pre class="p(4) bg(gray-50) border(1/gray-200) r(md) text(xs) font(mono) overflow-x(auto) max-h(300) scroll(y)">{liveCSS}</pre>
          </div>
        {/if}
        {#if liveError}
          <div class="p(3) bg(red-50) border(1/red-200) r(md)">
            <p class="text(sm) c(red-700)">Error: {liveError}</p>
          </div>
        {/if}
      </div>
    </section>

      {#if Object.keys(groupedRules).length === 0}
      <!-- Empty State -->
      <div class="text(center) py(16)">
        <div class="text(6xl) mb(4)">🔍</div>
        <h3 class="text(xl) bold c(gray-900) mb(2)">No rules found</h3>
        <p class="text(gray-600)">No rules are currently loaded</p>
      </div>
    {:else}
      <!-- Table View by Group -->
      <div class="overflow-x(auto)">
        <table class="docs-table w(full) border-collapse font(sm)">
          <thead>
            <tr class="bg(gray-50) border-b(2/gray-200)">
              <th class="text(left) p(3) font(semibold) c(gray-900) w(200)">Rule</th>
              <th class="text(left) p(3) font(semibold) c(gray-900) w(100)">Priority</th>
              <th class="text(left) p(3) font(semibold) c(gray-900)">CSS Output</th>
            </tr>
          </thead>
          <tbody>
            {#each orderedGroups as [groupName, subgroups], index}
              <!-- Spacer before group (except first) -->
              {#if index > 0}
                <tr>
                  <td colspan="3" class="h(48)"></td>
                </tr>
              {/if}
              <!-- Group Header Row -->
              <tr class="border-t(3/gray-300)">
                <td colspan="3" class="px(0) py(8)">
                  <button 
                    class="hbox(middle) gap(2) w(full) text(left) cursor(pointer)"
                    on:click={() => toggleGroup(groupName)}
                  >
                    {#if expandedGroups[groupName] !== false}
                      <ChevronDown size="20" class="c(gray-600)" />
                    {:else}
                      <ChevronRight size="20" class="c(gray-600)" />
                    {/if}
                    <span class="font(bold) text(2xl) c(gray-900)">{groupName}</span>
                    <span class="text(sm) font(mono) c(gray-500) ml(3)">
                      {Object.values(subgroups).flat().length} rules
                    </span>
                  </button>
                </td>
              </tr>
              
              {#if expandedGroups[groupName] !== false}
                {#each Object.entries(subgroups) as [subgroupName, rules]}
                  {@const subgroupKey = `${groupName}-${subgroupName}`}
                  <!-- Spacer before subgroup (except first) -->
                  {#if Object.keys(subgroups).indexOf(subgroupName) > 0}
                    <tr>
                      <td colspan="3" class="h(16)"></td>
                    </tr>
                  {/if}
                  <!-- Subgroup Header Row -->
                  <tr id="{groupName}-{subgroupName}">
                    <td colspan="3" class="px(0) pt(6) pb(3)">
                      <button 
                        class="hbox(middle) gap(2) w(full) text(left) cursor(pointer) pl(6)"
                        on:click={() => toggleSubgroup(subgroupKey)}
                      >
                        {#if expandedSubgroups[subgroupKey] !== false}
                          <ChevronDown size="16" class="c(gray-500)" />
                        {:else}
                          <ChevronRight size="16" class="c(gray-500)" />
                        {/if}
                        <span class="font(semibold) text(lg) c(gray-700)">{subgroupName}</span>
                        <span class="text(xs) font(mono) c(gray-400) ml(2)">
                          {rules.length}
                        </span>
                      </button>
                    </td>
                  </tr>
                  
                  {#if expandedSubgroups[subgroupKey] !== false}
                    {#each rules as rule}
                      <tr class="border-b(1/gray-100) hover:bg(gray-50) transition">
                        <!-- Rule Name -->
                        <td class="p(3) pl(12)">
                          <button
                            class="hbox(middle) gap(2) text(left) cursor(pointer)"
                            on:click={() => copyToClipboard(rule.name)}
                            title="Click to copy {rule.name}"
                          >
                            <code class="text(sm) font(mono) bold c(indigo-600)">{rule.name}</code>
                            {#if copiedRule === rule.name}
                              <Check size="14" class="c(green-600)" />
                            {:else}
                              <Copy size="12" class="c(gray-400) hover:c(gray-600)" />
                            {/if}
                          </button>
                        </td>
                        
                        <!-- Priority -->
                        <td class="p(3)">
                          <span class="text(sm) font(mono) c(gray-700)">{rule.priority}</span>
                        </td>
                        
                        <!-- CSS Output -->
                        <td class="p(3)">
                          <code class="text(xs) font(mono) c(gray-600) bg(gray-50) px(2) py(1) r(sm)">{testRule(rule)}</code>
                        </td>
                      </tr>
                    {/each}
                  {/if}
                {/each}
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
      {/if}
    
      <!-- Debug Info -->
      <section class="mt(16) p(6) bg(gray-50) r(lg)">
        <h3 class="text(lg) bold c(gray-900) mb(4)">Debug Information</h3>
        <div class="vbox gap(2) text(sm) c(gray-700)">
          <div>
            <strong>Priority Registry:</strong> {priorityRegistry ? 'Available' : 'Not Available'}
          </div>
          <div>
            <strong>Total Rules:</strong> {allRules.length}
          </div>
          <div>
            <strong>Rules with Metadata:</strong> {allRules.filter(r => r.metadata).length} / {allRules.length}
          </div>
          <div>
            <strong>Group Order:</strong> {groupOrder.join(', ')}
          </div>
        </div>
      </section>
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
    background: var(--gray-50);
    z-index: 10;
  }
  
  tbody tr {
    position: relative;
  }
  
  tbody tr:hover {
    background: var(--gray-50);
  }
  
  /* Better column widths */
  th:nth-child(1), td:nth-child(1) { min-width: 200px; } /* Rule */
  th:nth-child(2), td:nth-child(2) { min-width: 100px; } /* Priority */
  th:nth-child(3), td:nth-child(3) { min-width: 500px; } /* CSS Output */
</style>