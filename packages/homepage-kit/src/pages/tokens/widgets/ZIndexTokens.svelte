<script lang="ts">
  import { Layers, Stack, Copy, Check } from 'lucide-svelte';
  import { Card } from '$lib/components/ui';
  
  let copiedToken = '';
  
  // Z-index tokens based on the Z_MAP in position.ts
  const zIndexTokens = [
    { name: 'below', value: '-1', usage: 'Elements behind content', examples: 'Background decorations' },
    { name: 'base', value: '0', usage: 'Default stacking level', examples: 'Regular content' },
    { name: 'above', value: '1', usage: 'Slightly elevated elements', examples: 'Active states, selected items' },
    { name: 'dropdown', value: '1000', usage: 'Dropdown menus', examples: 'Select options, autocomplete' },
    { name: 'modal', value: '2000', usage: 'Modal dialogs', examples: 'Confirmation dialogs, forms' },
    { name: 'popover', value: '3000', usage: 'Popover content', examples: 'Tooltips on click, info bubbles' },
    { name: 'tooltip', value: '4000', usage: 'Tooltip overlays', examples: 'Hover tooltips, help text' },
    { name: 'max', value: '9999', usage: 'Maximum elevation', examples: 'Critical alerts, system messages' },
    { name: 'top', value: '9999', usage: 'Topmost layer', examples: 'Toast notifications, alerts' }
  ];
  
  // Layer presets from LAYER_MAP
  const layerPresets = [
    { name: 'base', css: 'position:relative;z-index:0', description: 'Base layer for relative positioning' },
    { name: 'card', css: 'position:relative;z-index:1', description: 'Card containers with slight elevation' },
    { name: 'dropdown', css: 'position:absolute;z-index:1000', description: 'Dropdown menus and selects' },
    { name: 'overlay', css: 'position:fixed;z-index:1500', description: 'Full-screen overlays' },
    { name: 'modal', css: 'position:fixed;z-index:2000', description: 'Modal dialogs' },
    { name: 'popover', css: 'position:absolute;z-index:3000', description: 'Popover components' },
    { name: 'tooltip', css: 'position:absolute;z-index:4000', description: 'Tooltip overlays' },
    { name: 'notification', css: 'position:fixed;z-index:5000', description: 'Notifications and toasts' }
  ];
  
  // Visual demo of stacking
  const stackingDemo = [
    { level: 'base', color: 'gray-200', size: 'w(20) h(20)', position: 'top(0) left(0)' },
    { level: 'above', color: 'blue-200', size: 'w(18) h(18)', position: 'top(2) left(2)' },
    { level: 'dropdown', color: 'purple-200', size: 'w(16) h(16)', position: 'top(4) left(4)' },
    { level: 'modal', color: 'pink-200', size: 'w(14) h(14)', position: 'top(6) left(6)' },
    { level: 'tooltip', color: 'yellow-200', size: 'w(12) h(12)', position: 'top(8) left(8)' }
  ];
  
  function copyToClipboard(token: string) {
    navigator.clipboard.writeText(token);
    copiedToken = token;
    setTimeout(() => copiedToken = '', 2000);
  }
</script>

<div class="vbox gap(4xl)">
  <!-- Header -->
  <div class="text(center)">
    <div class="hbox(pack) gap(sm) items(center)">
      <Layers size="2xl" class="c(primary)" />
      <h1 class="display(lg) gradient">Z-Index System</h1>
    </div>
    <p class="body(lg) c(neutral-600) max-w(4xl) mx(auto) pt(xl)">
      Systematic layering with semantic z-index tokens. Control stacking order with clear, 
      predictable values that prevent z-index conflicts.
    </p>
  </div>

  <!-- Z-Index Tokens -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Z-Index Tokens</h2>
      <p class="body(md) c(gray-600)">
        Use semantic tokens instead of arbitrary numbers for consistent layering.
      </p>
    </div>

    <div class="grid(1) md:grid(2) lg:grid(3) gap(lg)">
      {#each zIndexTokens as token}
        <Card 
          size="lg" 
          class="hover:shadow(lg) transition-all cursor(pointer)"
          on:click={() => copyToClipboard(`z(${token.name})`)}
        >
          <div class="vbox gap(md)">
            <!-- Token Header -->
            <div class="hbox(between) items(center)">
              <div class="hbox gap(sm) items(center)">
                <div class="title(md) c(gray-900)">{token.name}</div>
                <div class="mono caption bg(gray-100) c(gray-700) px(sm) py(xs) r(sm)">
                  {token.value}
                </div>
              </div>
              <div class="c(gray-400) hover:c(gray-600) transition">
                {#if copiedToken === `z(${token.name})`}
                  <Check size="sm" />
                {:else}
                  <Copy size="sm" />
                {/if}
              </div>
            </div>

            <!-- Usage -->
            <div class="body(sm) c(gray-600)">{token.usage}</div>

            <!-- Code Example -->
            <div class="mono caption bg(gray-50) p(sm) r(sm) c(gray-700)">
              z({token.name})
            </div>

            <!-- Examples -->
            <div class="caption c(gray-500)">{token.examples}</div>
          </div>
        </Card>
      {/each}
    </div>
  </div>

  <!-- Visual Stacking Demo -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Visual Hierarchy</h2>
      <p class="body(md) c(gray-600)">
        See how different z-index levels stack in practice.
      </p>
    </div>

    <Card size="xl" class="bg(gray-50)">
      <div class="relative h(64) overflow(hidden)">
        {#each stackingDemo as item, i}
          <div 
            class="absolute {item.size} {item.position} bg({item.color}) border(2/{item.color.replace('200', '400')}) r(lg) shadow(md) transition-all duration(300) hover:scale(110)"
            style="z-index: {zIndexTokens.find(t => t.name === item.level)?.value}"
          >
            <div class="hbox(center) h(full)">
              <div class="vbox gap(xs) text(center)">
                <div class="title(sm) c(gray-700)">{item.level}</div>
                <div class="mono caption c(gray-600)">
                  z: {zIndexTokens.find(t => t.name === item.level)?.value}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </Card>
  </div>

  <!-- Layer Presets -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Layer Presets</h2>
      <p class="body(md) c(gray-600)">
        Complete positioning presets that combine position and z-index for common UI patterns.
      </p>
    </div>

    <div class="grid(1) md:grid(2) gap(lg)">
      {#each layerPresets as preset}
        <Card 
          size="lg"
          class="hover:shadow(lg) transition-all cursor(pointer)"
          on:click={() => copyToClipboard(`layer(${preset.name})`)}
        >
          <div class="vbox gap(md)">
            <!-- Preset Header -->
            <div class="hbox(between) items(center)">
              <div class="title(md) c(gray-900)">layer({preset.name})</div>
              <div class="c(gray-400) hover:c(gray-600) transition">
                {#if copiedToken === `layer(${preset.name})`}
                  <Check size="sm" />
                {:else}
                  <Copy size="sm" />
                {/if}
              </div>
            </div>

            <!-- Description -->
            <div class="body(sm) c(gray-600)">{preset.description}</div>

            <!-- CSS Output -->
            <div class="mono caption bg(gray-50) p(sm) r(sm) c(gray-700) break(all)">
              {preset.css}
            </div>
          </div>
        </Card>
      {/each}
    </div>

    <!-- Special Layer Positions -->
    <Card size="lg" class="border(2/blue-200) bg(blue-50)">
      <div class="vbox gap(lg)">
        <div class="title(lg) c(blue-900)">Special Layer Positions</div>
        <div class="body(sm) c(blue-800)">
          The layer() function also supports directional positioning:
        </div>
        
        <div class="grid(2) md:grid(4) gap(md)">
          {#each ['top', 'right', 'bottom', 'left'] as direction}
            <div class="vbox gap(xs) text(center) bg(white) p(md) r(md)">
              <code class="mono caption c(blue-700)">layer({direction})</code>
              <div class="caption c(blue-600)">
                position:absolute;<br/>
                inset:0;<br/>
                {direction === 'top' ? 'bottom:auto' : 
                 direction === 'right' ? 'left:auto' : 
                 direction === 'bottom' ? 'top:auto' : 'right:auto'}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </Card>
  </div>

  <!-- Usage Examples -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Usage Examples</h2>
      <p class="body(md) c(gray-600)">
        Common patterns for using z-index tokens in your components.
      </p>
    </div>

    <div class="grid(1) md:grid(2) gap(xl)">
      <!-- Dropdown Example -->
      <Card size="lg" class="bg(gray-50)">
        <div class="vbox gap(lg)">
          <div class="title(md) c(gray-900)">Dropdown Menu</div>
          <pre class="mono caption leading(relaxed) overflow(x-auto)"><code>{`<!-- Dropdown container -->
<div class="relative">
  <button>Menu</button>
  
  <!-- Dropdown content -->
  <div class="absolute top(full) left(0) z(dropdown) 
              bg(white) shadow(lg) r(md)">
    <div class="p(sm)">Menu items...</div>
  </div>
</div>`}</code></pre>
        </div>
      </Card>

      <!-- Modal Example -->
      <Card size="lg" class="bg(gray-50)">
        <div class="vbox gap(lg)">
          <div class="title(md) c(gray-900)">Modal Dialog</div>
          <pre class="mono caption leading(relaxed) overflow(x-auto)"><code>{`<!-- Modal backdrop -->
<div class="fixed inset(0) z(modal) bg(black.50)">
  
  <!-- Modal content -->
  <div class="layer(modal) hbox(center) p(xl)">
    <div class="bg(white) shadow(2xl) r(xl)">
      Modal content...
    </div>
  </div>
</div>`}</code></pre>
        </div>
      </Card>

      <!-- Tooltip Example -->
      <Card size="lg" class="bg(gray-50)">
        <div class="vbox gap(lg)">
          <div class="title(md) c(gray-900)">Tooltip</div>
          <pre class="mono caption leading(relaxed) overflow(x-auto)"><code>{`<!-- Tooltip trigger -->
<div class="relative">
  <button>Hover me</button>
  
  <!-- Tooltip -->
  <div class="absolute bottom(full) left(50%) 
              translate-x(-50%) z(tooltip)
              bg(gray-900) c(white) px(sm) py(xs) 
              r(sm) whitespace(nowrap)">
    Tooltip text
  </div>
</div>`}</code></pre>
        </div>
      </Card>

      <!-- Layer Shorthand -->
      <Card size="lg" class="bg(gray-50)">
        <div class="vbox gap(lg)">
          <div class="title(md) c(gray-900)">Layer Shorthand</div>
          <pre class="mono caption leading(relaxed) overflow(x-auto)"><code>{`<!-- Full-screen overlay -->
<div class="layer">
  <!-- Equivalent to: position:absolute;inset:0 -->
</div>

<!-- Top bar -->
<div class="layer(top)">
  <!-- position:absolute;inset:0;bottom:auto -->
</div>

<!-- Modal with preset -->
<div class="layer(modal)">
  <!-- position:fixed;z-index:2000 -->
</div>`}</code></pre>
        </div>
      </Card>
    </div>
  </div>

  <!-- Best Practices -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Best Practices</h2>
      <p class="body(md) c(gray-600)">
        Guidelines for maintaining a clean and manageable z-index hierarchy.
      </p>
    </div>

    <div class="grid(1) md:grid(3) gap(xl)">
      <Card size="lg" class="border(2/green-200) bg(green-50)">
        <div class="vbox gap(lg)">
          <Stack size="xl" class="c(green-600)" />
          <div class="title(md) c(green-900)">Use Semantic Tokens</div>
          <div class="body(sm) c(green-800)">
            Always use semantic tokens like z(modal) instead of arbitrary numbers. 
            This prevents z-index wars and makes intent clear.
          </div>
        </div>
      </Card>

      <Card size="lg" class="border(2/blue-200) bg(blue-50)">
        <div class="vbox gap(lg)">
          <Layers size="xl" class="c(blue-600)" />
          <div class="title(md) c(blue-900)">Layer Isolation</div>
          <div class="body(sm) c(blue-800)">
            Create stacking contexts with position:relative to isolate z-index 
            scopes and prevent global pollution.
          </div>
        </div>
      </Card>

      <Card size="lg" class="border(2/purple-200) bg(purple-50)">
        <div class="vbox gap(lg)">
          <Stack size="xl" class="c(purple-600)" />
          <div class="title(md) c(purple-900)">Document Layers</div>
          <div class="body(sm) c(purple-800)">
            Maintain documentation of your z-index hierarchy. Know what lives 
            at each level and why.
          </div>
        </div>
      </Card>
    </div>
  </div>
</div>