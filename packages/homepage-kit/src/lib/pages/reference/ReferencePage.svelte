<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '../../components/ui/Card.svelte';
  import CardHeader from '../../components/ui/CardHeader.svelte';
  import CardTitle from '../../components/ui/CardTitle.svelte';
  import CardDescription from '../../components/ui/CardDescription.svelte';
  import CardContent from '../../components/ui/CardContent.svelte';
  import Badge from '../../components/ui/Badge.svelte';
  import Input from '../../components/ui/Input.svelte';
  import { Lightbulb as Idea } from 'lucide-svelte';
  
  // Import the rules from the core package
  let allRules = {};
  let searchTerm = '';
  let selectedCategory = 'all';
  
  // Rule categories matching actual folder structure
  const ruleCategories = {
    typography: {
      name: 'Typography',
      description: 'Font, color, text utilities',
      color: 'text-blue-600'
    },
    layout: {
      name: 'Layout',
      description: 'Display, grid, size, spacing, overflow',
      color: 'text-green-600'
    },
    visuals: {
      name: 'Visuals',
      description: 'Animation, background, border, effects, shadow',
      color: 'text-purple-600'
    },
    position: {
      name: 'Position',
      description: 'Position utilities',
      color: 'text-orange-600'
    },
    interaction: {
      name: 'Interaction',
      description: 'Cursor, events',
      color: 'text-red-600'
    },
    utilities: {
      name: 'Utilities',
      description: 'Focus, transforms, transitions, general utilities',
      color: 'text-gray-600'
    },
    plugins: {
      name: 'Plugins',
      description: 'Admin, advanced, card, glass, glow, responsive',
      color: 'text-indigo-600'
    }
  };
  
  onMount(async () => {
    try {
      // Import rules dynamically from the core package
      const coreModule = await import('adorable-css');
      
      // Use grouped rules if available
      if (coreModule && coreModule.groupedRules) {
        console.log('Using grouped rules for debugging');
        allRules = {};
        
        // Process each category
        Object.entries(coreModule.groupedRules).forEach(([categoryName, categoryRules]) => {
          if (categoryName === 'plugins' && typeof categoryRules === 'object') {
            // Handle nested plugin categories
            Object.entries(categoryRules).forEach(([pluginName, pluginRules]) => {
              if (typeof pluginRules === 'object') {
                Object.keys(pluginRules).forEach(ruleName => {
                  allRules[ruleName] = {
                    category: 'plugins',
                    name: ruleName,
                    type: typeof pluginRules[ruleName],
                    isFunction: typeof pluginRules[ruleName] === 'function',
                    group: `plugins.${pluginName}`
                  };
                });
              }
            });
          } else if (typeof categoryRules === 'object') {
            // Process regular categories
            Object.keys(categoryRules).forEach(ruleName => {
              allRules[ruleName] = {
                category: categoryName,
                name: ruleName,
                type: typeof categoryRules[ruleName],
                isFunction: typeof categoryRules[ruleName] === 'function',
                group: categoryName
              };
            });
          }
        });
        
        console.log('Total rules:', Object.keys(allRules).length);
        console.log('Rules by category:', Object.entries(coreModule.groupedRules).map(([cat, rules]) => 
          `${cat}: ${typeof rules === 'object' ? Object.keys(rules).length : 0}`
        ));
      } else if (coreModule && coreModule.rules) {
        // Fallback to flat rules
        const ruleKeys = Object.keys(coreModule.rules);
        console.log('Using flat rules, total:', ruleKeys.length);
        
        allRules = {};
        ruleKeys.forEach(key => {
          allRules[key] = {
            category: 'unknown',
            name: key,
            type: typeof coreModule.rules[key],
            isFunction: typeof coreModule.rules[key] === 'function'
          };
        });
      }
    } catch (error) {
      console.error('Failed to load rules:', error);
      allRules = {};
    }
  });
  
  // Filter rules based on search term and category
  $: filteredRules = Object.entries(allRules).filter(([name, rule]) => {
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (rule?.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || rule?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Group rules by category
  $: groupedRules = filteredRules.reduce((acc, [name, rule]) => {
    const category = rule?.category || 'utilities';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push([name, rule]);
    return acc;
  }, {});
  
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }
  
  function getVariantBadge(category) {
    const variants = {
      typography: 'default',
      layout: 'secondary', 
      visuals: 'outline',
      position: 'destructive',
      interaction: 'secondary',
      utilities: 'outline',
      plugins: 'default'
    };
    return variants[category] || 'outline';
  }
</script>

<div class="rules-showcase p(lg) vbox gap(lg) bg(--colors-gray-50) min-h(screen)">
  <!-- Header -->
  <div class="vbox gap(xs)">
    <h1 class="heading(h1) c(--colors-gray-900)">AdorableCSS Rules (Debug)</h1>
    <p class="font(md) c(--colors-gray-600)">All implemented rules from the package</p>
  </div>
  
  <!-- Compact Filters -->
  <div class="hbox(middle) gap(sm) p(md) bg(--colors-white) r(lg) border(1/--colors-gray-200)">
    <Input 
      bind:value={searchTerm} 
      placeholder="Search rules..." 
      className="flex(1) max-w(sm)"
    />
    <select 
      bind:value={selectedCategory} 
      class="h(2xl) px(sm) r(md) border(1/--colors-gray-300) bg(--colors-white) font(sm)"
    >
      <option value="all">All ({Object.keys(allRules).length})</option>
      {#each Object.entries(ruleCategories) as [key, category]}
        <option value={key}>{category.name} ({Object.values(allRules).filter(rule => rule?.category === key).length})</option>
      {/each}
    </select>
    <Badge variant="outline" className="font(xs)">{filteredRules.length} results</Badge>
  </div>
  
  <!-- Compact Rules Grid -->
  {#if Object.keys(groupedRules).length === 0}
    <div class="text(center) py(xl)">
      <p class="font(md) c(--colors-gray-500)">No rules found</p>
    </div>
  {:else}
    {#each Object.entries(groupedRules) as [categoryKey, rules]}
      <div class="category-section">
        <div class="hbox(middle) gap(xs) mb(sm)">
          <h2 class="heading(h2) c(--colors-gray-900)">{ruleCategories[categoryKey]?.name || categoryKey}</h2>
          <Badge variant={getVariantBadge(categoryKey)} className="font(xs)">{rules.length}</Badge>
        </div>
        
        <div class="rules-grid grid(6) gap(xs)">
          {#each rules as [ruleName, ruleInfo]}
            <div class="rule-card p(xs) r(md) border(1/--colors-gray-200) bg(--colors-white) hover:bg(--colors-gray-50) transition cursor(pointer)"
                 on:click={() => copyToClipboard(ruleName)}
                 title="Click to copy: {ruleName} | Group: {ruleInfo?.group || ruleInfo?.category}">
              <div class="vbox gap(xs)">
                <div class="hbox(middle) gap(auto)">
                  <code class="rule-name font(xs) semibold c(--colors-gray-800)">{ruleName}</code>
                  {#if ruleInfo?.isFunction}
                    <span class="font(xs) c(--colors-gray-400)">ƒ</span>
                  {/if}
                </div>
                {#if ruleInfo?.group}
                  <span class="font(xs) c(--colors-gray-500)">{ruleInfo.group}</span>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  {/if}
  
  <!-- Quick Tips -->
  <div class="p(md) r(lg) bg(--colors-blue-50) border(1/--colors-blue-200)">
    <p class="font(sm) c(--colors-blue-800)">
      <strong class="hbox(middle) gap(xs)"><Idea size="14" /> Tip:</strong> Click any rule to copy it • Use <code class="px(xs) py(xs) r(sm) bg(--colors-blue-100)">value/value</code> for combined values • Add <code class="px(xs) py(xs) r(sm) bg(--colors-blue-100)">hover:</code> for states
    </p>
  </div>
</div>

<style>
  .rules-showcase {
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
  }
  
  .category-section {
    margin-bottom: 2rem;
  }
  
  .category-section:last-child {
    margin-bottom: 0;
  }
  
  .rules-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .rule-card:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  
  code {
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  }
  
  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 8px center;
    background-repeat: no-repeat;
    background-size: 16px;
    padding-right: 40px;
  }
  
  @media (max-width: 1024px) {
    .rules-grid {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }
  }
  
  @media (max-width: 768px) {
    .rules-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
    
    .rule-card {
      padding: 0.75rem;
    }
  }
</style>