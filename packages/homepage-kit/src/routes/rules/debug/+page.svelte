<script lang="ts">
  import { Copy, Check } from 'lucide-svelte';
  import { generateCSS, rules, groupedRules, priorityRegistry } from 'adorable-css';
  
  let copiedRule = '';
  
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copiedRule = text;
    setTimeout(() => copiedRule = '', 2000);
  }
  
  // Get all registered rules from the priority registry
  function getAllRules() {
    const allRules = [];
    
    // Get regular rules (legacy)
    const regularRules = Object.keys(rules || {});
    regularRules.forEach(key => {
      allRules.push({
        key,
        type: 'legacy',
        handler: rules[key],
        priority: 'N/A'
      });
    });
    
    // Get priority rules (CSS object rules)
    if (priorityRegistry) {
      const priorityRuleNames = priorityRegistry.getAllRuleNames();
      priorityRuleNames.forEach(key => {
        const ruleInfo = priorityRegistry.getRule(key);
        if (ruleInfo) {
          allRules.push({
            key,
            type: 'priority',
            handler: ruleInfo.handler,
            priority: ruleInfo.priority
          });
        }
      });
      
      // Get string rules (string-based component rules)
      const stringRuleNames = priorityRegistry.getAllStringRuleNames();
      stringRuleNames.forEach(key => {
        const ruleInfo = priorityRegistry.getStringRule(key);
        if (ruleInfo) {
          allRules.push({
            key,
            type: 'string',
            handler: ruleInfo.handler,
            priority: ruleInfo.priority
          });
        }
      });
    }
    
    return allRules.sort((a, b) => a.key.localeCompare(b.key));
  }
  
  function getHandlerInfo(handler) {
    if (typeof handler === 'function') {
      const fnString = handler.toString();
      // Get first 100 characters of function
      return fnString.substring(0, 100) + (fnString.length > 100 ? '...' : '');
    }
    return 'Unknown handler type';
  }
  
  function testRule(key: string, type: string) {
    try {
      if (type === 'string') {
        // For string rules, we can't easily test them without knowing the expected format
        return 'String rule - test manually';
      }
      
      // Try to generate CSS with some common test values
      const testValues = ['', '16', 'red', 'center', 'auto'];
      for (const testValue of testValues) {
        try {
          const result = generateCSS([testValue ? `${key}(${testValue})` : key]);
          if (result && result.trim()) {
            return result.substring(0, 200) + (result.length > 200 ? '...' : '');
          }
        } catch (e) {
          // Continue to next test value
        }
      }
      return 'No CSS generated';
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }
  
  const allRules = getAllRules();
  const rulesByType = {
    legacy: allRules.filter(r => r.type === 'legacy'),
    priority: allRules.filter(r => r.type === 'priority'),
    string: allRules.filter(r => r.type === 'string')
  };
</script>

<div class="docs-page">
  <!-- Hero Section -->
  <header class="docs-hero">
    <h1 class="text(4xl) bold c(gray-900) mb(4)">AdorableCSS Debug Rules</h1>
    <p class="text(lg) c(gray-600) leading(1.7)">
      All registered rules in the AdorableCSS system - for debugging and development
    </p>
    <div class="hbox gap(4) mt(4)">
      <div class="text(sm) c(gray-500)">
        Total Rules: <span class="bold c(gray-700)">{allRules.length}</span>
      </div>
      <div class="text(sm) c(gray-500)">
        Legacy: <span class="bold c(blue-600)">{rulesByType.legacy.length}</span>
      </div>
      <div class="text(sm) c(gray-500)">
        Priority: <span class="bold c(green-600)">{rulesByType.priority.length}</span>
      </div>
      <div class="text(sm) c(gray-500)">
        String: <span class="bold c(purple-600)">{rulesByType.string.length}</span>
      </div>
    </div>
  </header>
  
  <!-- Main Content -->
  <main class="max-w(7xl) mx(auto) px(6)">
    {#each Object.entries(rulesByType) as [typeName, typeRules]}
      {#if typeRules.length > 0}
        <section class="mb(12)">
          <!-- Type Title -->
          <h2 class="text(2xl) bold c(gray-900) mb(6) pb(3) border-b(2/gray-200)">
            {typeName.charAt(0).toUpperCase() + typeName.slice(1)} Rules
            <span class="text(lg) c(gray-500) font(normal)">({typeRules.length})</span>
          </h2>
          
          <!-- Rules Table -->
          <div class="overflow-x(auto)">
            <table class="docs-table w(full)">
              <thead>
                <tr>
                  <th class="docs-table-header w(200px)">Rule Key</th>
                  <th class="docs-table-header w(100px)">Priority</th>
                  <th class="docs-table-header w(300px)">Handler Preview</th>
                  <th class="docs-table-header">Test Output</th>
                </tr>
              </thead>
              <tbody>
                {#each typeRules as rule}
                  <tr class="docs-table-row">
                    <!-- Rule Key -->
                    <td class="docs-table-cell-class">
                      <button
                        class="hbox(middle) gap(2) text(left) w(full) cursor(pointer) p(3) bg(transparent) border(none)"
                        on:click={() => copyToClipboard(rule.key)}
                        title="Click to copy {rule.key}"
                      >
                        <code class="text(sm) font(mono) bold c(indigo-600)">{rule.key}</code>
                        {#if copiedRule === rule.key}
                          <Check size="14" class="c(green-600)" />
                        {:else}
                          <Copy size="12" class="c(gray-400) hover:c(gray-600)" />
                        {/if}
                      </button>
                    </td>
                    
                    <!-- Priority -->
                    <td class="docs-table-cell-css p(3)">
                      <span class="text(sm) font(mono) 
                        {rule.type === 'priority' ? 'c(green-600)' : 
                         rule.type === 'string' ? 'c(purple-600)' : 'c(blue-600)'}">
                        {rule.priority}
                      </span>
                    </td>
                    
                    <!-- Handler Preview -->
                    <td class="docs-table-cell-css p(3)">
                      <pre class="text(xs) font(mono) c(gray-700) overflow(hidden)">{getHandlerInfo(rule.handler)}</pre>
                    </td>
                    
                    <!-- Test Output -->
                    <td class="docs-table-cell-css p(3)">
                      <pre class="text(xs) font(mono) c(gray-600) bg(gray-50) p(2) r(sm) overflow-x(auto)">{testRule(rule.key, rule.type)}</pre>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </section>
      {/if}
    {/each}
    
    <!-- Debug Info -->
    <section class="mt(16) p(6) bg(gray-50) r(lg)">
      <h3 class="text(lg) bold c(gray-900) mb(4)">Debug Information</h3>
      <div class="vbox gap(2) text(sm) c(gray-700)">
        <div>
          <strong>Rules Object:</strong> {rules ? 'Available' : 'Not Available'}
        </div>
        <div>
          <strong>Grouped Rules:</strong> {groupedRules ? 'Available' : 'Not Available'}
        </div>
        <div>
          <strong>Priority Registry:</strong> {priorityRegistry ? 'Available' : 'Not Available'}
        </div>
        {#if priorityRegistry}
          <div>
            <strong>Priority Registry Methods:</strong> 
            {Object.getOwnPropertyNames(Object.getPrototypeOf(priorityRegistry)).filter(name => name !== 'constructor').join(', ')}
          </div>
        {/if}
      </div>
    </section>
  </main>
</div>