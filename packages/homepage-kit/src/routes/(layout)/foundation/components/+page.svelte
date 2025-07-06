<script lang="ts">
  import { Package, Settings, Layers, Palette, Square, Type } from 'lucide-svelte';
  // import { Card } from '$lib/components/ui';

  // Component token categories
  const componentCategories = [
    {
      name: 'Interactive Components',
      description: 'Buttons, links, and interactive elements',
      components: [
        {
          name: 'Button',
          tokens: {
            padding: 'p(md)',
            radius: 'r(md)',
            shadow: 'shadow(sm)',
            hoverShadow: 'hover:shadow(lg)',
            transition: 'transition-all'
          },
          variants: ['primary', 'secondary', 'ghost', 'outline'],
          sizes: ['sm', 'md', 'lg']
        },
        {
          name: 'Link',
          tokens: {
            color: 'c(primary)',
            hoverColor: 'hover:c(primary-700)',
            decoration: 'underline',
            transition: 'transition-colors'
          },
          variants: ['inline', 'standalone', 'nav'],
          sizes: ['inherit']
        }
      ]
    },
    {
      name: 'Layout Components',
      description: 'Cards, containers, and layout structures',
      components: [
        {
          name: 'Card',
          tokens: {
            padding: 'p(xl)',
            radius: 'r(xl)',
            background: 'bg(white)',
            border: 'border(1/gray-200)',
            shadow: 'shadow(sm)'
          },
          variants: ['default', 'outlined', 'elevated', 'interactive'],
          sizes: ['sm', 'md', 'lg', 'xl']
        },
        {
          name: 'Container',
          tokens: {
            maxWidth: 'max-w(4xl)',
            padding: 'px(xl)',
            margin: 'mx(auto)'
          },
          variants: ['fluid', 'constrained', 'prose'],
          sizes: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']
        }
      ]
    },
    {
      name: 'Form Components',
      description: 'Inputs, selects, and form controls',
      components: [
        {
          name: 'Input',
          tokens: {
            padding: 'px(md) py(sm)',
            radius: 'r(md)',
            border: 'border(1/gray-300)',
            focusBorder: 'focus:border(primary)',
            background: 'bg(white)'
          },
          variants: ['default', 'filled', 'underlined'],
          sizes: ['sm', 'md', 'lg']
        },
        {
          name: 'Label',
          tokens: {
            fontSize: 'label(sm)',
            color: 'c(gray-700)',
            marginBottom: 'mb(xs)'
          },
          variants: ['default', 'required', 'optional'],
          sizes: ['sm', 'md']
        }
      ]
    }
  ];

  // Token inheritance examples
  const tokenInheritance = [
    {
      level: 'Global Tokens',
      description: 'Base design tokens',
      tokens: ['spacing-md', 'color-primary', 'radius-md'],
      color: 'blue'
    },
    {
      level: 'Component Tokens',
      description: 'Component-specific overrides',
      tokens: ['button-padding', 'button-radius', 'button-shadow'],
      color: 'purple'
    },
    {
      level: 'Variant Tokens',
      description: 'Variant-specific customizations',
      tokens: ['button-primary-bg', 'button-large-padding'],
      color: 'green'
    }
  ];
</script>

<svelte:head>
  <title>Component Tokens - AdorableCSS Foundation</title>
  <meta name="description" content="Component-specific token system for building consistent, customizable UI components with AdorableCSS." />
</svelte:head>

<div class="vbox gap(4xl)">
  <!-- Section Header -->
  <div class="text(center)">
    <div class="hbox(pack) gap(sm)">
      <Package size="32" class="c(primary)" />
      <h1 class="display(lg) gradient">Component Token System</h1>
    </div>
    <p class="body(lg) c(neutral-600) max-w(4xl) mx(auto) pt(xl)">
      Systematic token architecture for components. Build consistent, customizable UI components 
      with inherited design tokens and variant-specific overrides.
    </p>
  </div>

  <!-- Token Inheritance -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Token Inheritance</h2>
      <p class="body(md) c(gray-600)">
        How tokens flow from global to component to variant levels.
      </p>
    </div>

    <div class="vbox gap(xl)">
      {#each tokenInheritance as level, index}
        <div class="hbox gap(xl) items(center)">
          <!-- Level Info -->
          <div class="w(200) vbox gap(sm)">
            <div class="title(md) c({level.color}-700)">{level.level}</div>
            <div class="body(sm) c(gray-600)">{level.description}</div>
          </div>

          <!-- Tokens -->
          <div class="flex(1) vbox gap(sm)">
            <div class="hbox gap(sm) flex-wrap">
              {#each level.tokens as token}
                <div class="px(md) py(sm) bg({level.color}-50) c({level.color}-700) r(full) mono caption">
                  {token}
                </div>
              {/each}
            </div>
          </div>

          <!-- Arrow -->
          {#if index < tokenInheritance.length - 1}
            <div class="absolute right(-20) top(50%) translate(-50%, -50%) c(gray-400)">
              ↓
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Component Categories -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Component Categories</h2>
      <p class="body(md) c(gray-600)">
        Organized token systems for different types of UI components.
      </p>
    </div>

    <div class="vbox gap(2xl)">
      {#each componentCategories as category}
        <div class="vbox gap(xl)">
          <!-- Category Header -->
          <div class="vbox gap(sm)">
            <h3 class="title(lg) c(gray-900)">{category.name}</h3>
            <p class="body(sm) c(gray-600)">{category.description}</p>
          </div>

          <!-- Components in Category -->
          <div class="grid(2) gap(xl)">
            {#each category.components as component}
              <Card size="lg">
                <div class="vbox gap(lg)">
                  <!-- Component Header -->
                  <div class="vbox gap(sm)">
                    <div class="title(md) c(gray-900)">{component.name}</div>
                    
                    <!-- Variants & Sizes -->
                    <div class="vbox gap(xs)">
                      <div class="hbox gap(sm) items(center)">
                        <span class="caption c(gray-600)">Variants:</span>
                        <div class="hbox gap(xs)">
                          {#each component.variants as variant}
                            <span class="px(xs) py(xs) bg(purple-100) c(purple-700) r(sm) caption">
                              {variant}
                            </span>
                          {/each}
                        </div>
                      </div>
                      
                      <div class="hbox gap(sm) items(center)">
                        <span class="caption c(gray-600)">Sizes:</span>
                        <div class="hbox gap(xs)">
                          {#each component.sizes as size}
                            <span class="px(xs) py(xs) bg(blue-100) c(blue-700) r(sm) caption">
                              {size}
                            </span>
                          {/each}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Component Tokens -->
                  <div class="vbox gap(sm)">
                    <div class="caption c(gray-700)">Default Tokens:</div>
                    <div class="vbox gap(xs)">
                      {#each Object.entries(component.tokens) as [property, value]}
                        <div class="hbox(between) items(center) py(xs) border-b(1/gray-100)">
                          <span class="caption c(gray-600)">{property}:</span>
                          <code class="mono caption bg(gray-50) px(xs) r(xs)">{value}</code>
                        </div>
                      {/each}
                    </div>
                  </div>

                  <!-- Usage Example -->
                  <div class="vbox gap(sm)">
                    <div class="caption c(gray-700)">Usage:</div>
                    <code class="mono caption bg(gray-50) p(sm) r(sm) leading(relaxed)">
                      &lt;{component.name.toLowerCase()} class="{Object.values(component.tokens).join(' ')}"&gt;
                    </code>
                  </div>
                </div>
              </Card>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Token Architecture -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Token Architecture</h2>
      <p class="body(md) c(gray-600)">
        How component tokens are structured and organized for maximum flexibility.
      </p>
    </div>

    <div class="grid(3) gap(xl)">
      <!-- Naming Convention -->
      <Card size="lg" class="border(2/blue-200) bg(blue-50)">
        <div class="vbox gap(lg)">
          <div class="hbox gap(sm) items(center)">
            <Type size="20" class="c(blue-600)" />
            <div class="title(md) c(blue-900)">Naming Convention</div>
          </div>
          
          <div class="vbox gap(md)">
            <div class="body(sm) c(blue-800)">
              <strong>Pattern:</strong> component-property-variant-state
            </div>
            <div class="vbox gap(xs)">
              <code class="mono caption">button-padding-large</code>
              <code class="mono caption">card-shadow-elevated</code>
              <code class="mono caption">input-border-focus</code>
            </div>
          </div>
        </div>
      </Card>

      <!-- Inheritance Rules -->
      <Card size="lg" class="border(2/purple-200) bg(purple-50)">
        <div class="vbox gap(lg)">
          <div class="hbox gap(sm) items(center)">
            <Layers size="20" class="c(purple-600)" />
            <div class="title(md) c(purple-900)">Inheritance Rules</div>
          </div>
          
          <div class="vbox gap(md)">
            <div class="body(sm) c(purple-800)">
              1. Global tokens as defaults
            </div>
            <div class="body(sm) c(purple-800)">
              2. Component tokens override globals
            </div>
            <div class="body(sm) c(purple-800)">
              3. Variant tokens override components
            </div>
            <div class="body(sm) c(purple-800)">
              4. State tokens override variants
            </div>
          </div>
        </div>
      </Card>

      <!-- Customization -->
      <Card size="lg" class="border(2/green-200) bg(green-50)">
        <div class="vbox gap(lg)">
          <div class="hbox gap(sm) items(center)">
            <Settings size="20" class="c(green-600)" />
            <div class="title(md) c(green-900)">Customization</div>
          </div>
          
          <div class="vbox gap(md)">
            <div class="body(sm) c(green-800)">
              Override any token at any level
            </div>
            <div class="body(sm) c(green-800)">
              Create custom variants easily
            </div>
            <div class="body(sm) c(green-800)">
              Maintain design system consistency
            </div>
            <div class="body(sm) c(green-800)">
              Theme-aware token values
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>

  <!-- Implementation Example -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Implementation Example</h2>
      <p class="body(md) c(gray-600)">
        Complete example of implementing component tokens in your design system.
      </p>
    </div>

    <Card size="lg" class="bg(gray-50)">
      <div class="vbox gap(lg)">
        <div class="title(md) c(gray-900)">Button Component Tokens</div>
        
        <pre class="mono caption leading(relaxed) overflow(x-auto)"><code>{`// Global tokens
:root {
  --spacing-sm: 0.5rem;
  --spacing-md: 0.75rem;
  --spacing-lg: 1rem;
  --radius-md: 0.5rem;
  --color-primary: #6366f1;
}

// Component tokens
.button {
  /* Default tokens */
  --button-padding-x: var(--spacing-md);
  --button-padding-y: var(--spacing-sm);
  --button-radius: var(--radius-md);
  --button-bg: var(--color-primary);
  
  /* Apply tokens */
  padding: var(--button-padding-y) var(--button-padding-x);
  border-radius: var(--button-radius);
  background: var(--button-bg);
}

// Variant tokens
.button--large {
  --button-padding-x: var(--spacing-lg);
  --button-padding-y: var(--spacing-md);
}

.button--secondary {
  --button-bg: transparent;
  --button-border: 1px solid var(--color-primary);
}

// Usage
<button class="button button--large button--secondary">
  Large Secondary Button
</button>`}</code></pre>
      </div>
    </Card>
  </div>
</div>