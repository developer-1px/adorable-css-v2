<script lang="ts">
  import { RULE_GROUPS } from 'adorable-css/03-rules/rule-definitions';
  import { generateCSS } from 'adorable-css';
  import { ruleExamples, requiresExample } from '../../../../data/rule-examples';

  // Flatten groups for display
  const groups = Object.entries(RULE_GROUPS).map(([key, group]) => ({
    key,
    ...group,
    subgroups: Object.entries(group.subgroups || {}).map(([subKey, subGroup]) => ({
      key: subKey,
      ...subGroup,
      rules: Object.keys(subGroup.rules || {})
    }))
  }));

  // Helper to copy text
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // standard toast notification could go here
  };

  // Helper to get rule styles
  const getRuleStyles = (rule: string) => {
    try {
      const css = generateCSS([rule]);
      
      // Look for the utilities layer block
      const utilitiesMatch = css.match(/@layer utilities\s*\{([\s\S]*?)\n\}/);
      if (utilitiesMatch && utilitiesMatch[1]) {
        // Extract the declaration block from within utilities
        const ruleBlockMatch = utilitiesMatch[1].match(/\{([\s\S]*?)\}/);
        if (ruleBlockMatch && ruleBlockMatch[1]) {
             return ruleBlockMatch[1].replace(/[{}]/g, '').trim().replace(/;/g, ';\n');
        }
      }
      
      return 'No default style (requires arguments)';
    } catch (e) {
      return 'Error generating style';
    }
  };

  // Helper to get examples for a rule
  const getDisplayRules = (ruleName: string) => {
    // If we have explicit examples, use them
    if (ruleExamples[ruleName]) return ruleExamples[ruleName];
    
    // If it's a padding/margin variant not explicitly listed but similar to p/m
    if (['px','py','pt','pb','pl','pr'].includes(ruleName)) return [`${ruleName}(md)`, `${ruleName}(20px)`];
    if (['mx','my','mt','mb','ml','mr'].includes(ruleName)) return [`${ruleName}(auto)`, `${ruleName}(lg)`];

    // Otherwise just return the rule itself (it's likely a keyword like 'flex' or 'block')
    return [ruleName];
  };
</script>

<div class="min-h-screen bg(white)">
  <!-- Hero Section -->
  <div class="border-b(1/gray-100) bg(gray-50/50)">
    <div class="max-w(1200px) mx(auto) px(xl) py(4xl)">
      <div class="vbox gap(md)">
        <h1 class="text(3xl) font(bold) tracking(tight) c(gray-900)">
          Rule Reference
        </h1>
        <p class="text(lg) c(gray-500) max-w(600px)">
          The definitive guide to AdorableCSS utilities. 
          Showing generated CSS for the most common 80% use-cases.
        </p>
      </div>
    </div>
  </div>

  <div class="max-w(1200px) mx(auto) px(xl) py(3xl)">
    <div class="vbox gap(5xl)">

      <!-- Iterate over Groups -->
      {#each groups as group}
        {#if group.subgroups.length > 0}
        <section class="vbox gap(2xl)">
          <!-- Group Header -->
          <div class="hbox(bottom) gap(md) border-b(1/gray-200) pb(lg)">
            <h2 class="text(2xl) font(bold) c(gray-900)">{group.name}</h2>
            <span class="text(sm) c(gray-400) font(mono) mb(1px)">{group.layer || 'utility'} layer</span>
          </div>

          <!-- Subgroups -->
          <div class="vbox gap(3xl)">
            {#each group.subgroups as subgroup}
              <div class="vbox gap(lg)">
                <h3 class="text(lg) font(semibold) c(gray-700)">{subgroup.name}</h3>
                
                <!-- Rule Table -->
                <div class="vbox border(1/gray-200) r(lg) overflow(hidden)">
                  <!-- Header Row -->
                  <div class="hbox bg(gray-50) py(sm) px(lg) border-b(1/gray-200) text(xs) font(medium) c(gray-500) uppercase tracking(wider)">
                    <div class="w(240px)">Class</div>
                    <div class="flex(1)">Generated CSS</div>
                  </div>

                  <!-- Rows -->
                  <div class="vbox divider(gray-100)">
                    {#each subgroup.rules as ruleName}
                      {#each getDisplayRules(ruleName) as example}
                        <div class="hbox(top) bg(white) hover:bg(gray-50/50) transition">
                          <!-- Class Name Column -->
                          <div class="w(240px) p(md) shrink(0) border-r(1/gray-100)">
                             <!-- svelte-ignore a11y-click-events-have-key-events -->
                             <button 
                                class="font(mono) text(sm) c(indigo-600) hover:c(indigo-700) cursor(pointer) text-align(left)"
                                on:click={() => copyToClipboard(example)}
                              >
                                {example}
                              </button>
                          </div>
                          
                          <!-- CSS Output Column -->
                          <div class="flex(1) p(md) min-w(0)">
                            <pre class="font(mono) text(xs) c(gray-600) whitespace(pre-wrap)">{getRuleStyles(example)}</pre>
                          </div>
                        </div>
                      {/each}
                    {/each}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </section>
        {/if}
      {/each}

    </div>
  </div>
</div>
