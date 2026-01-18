<script>
  import { onMount } from 'svelte';
  
  // Design system configuration
  const colorCategories = [
    {
      name: 'Primary',
      description: 'Brand colors',
      colors: [
        { name: 'primary-50', value: 'var(--primary-50)' },
        { name: 'primary-100', value: 'var(--primary-100)' },
        { name: 'primary-200', value: 'var(--primary-200)' },
        { name: 'primary-300', value: 'var(--primary-300)' },
        { name: 'primary-400', value: 'var(--primary-400)' },
        { name: 'primary-500', value: 'var(--primary-500)' },
        { name: 'primary-600', value: 'var(--primary-600)' },
        { name: 'primary-700', value: 'var(--primary-700)' },
        { name: 'primary-800', value: 'var(--primary-800)' },
        { name: 'primary-900', value: 'var(--primary-900)' }
      ]
    },
    {
      name: 'Neutral',
      description: 'Grays for text and structure',
      colors: [
        { name: 'neutral-50', value: 'var(--neutral-50)' },
        { name: 'neutral-100', value: 'var(--neutral-100)' },
        { name: 'neutral-200', value: 'var(--neutral-200)' },
        { name: 'neutral-300', value: 'var(--neutral-300)' },
        { name: 'neutral-400', value: 'var(--neutral-400)' },
        { name: 'neutral-500', value: 'var(--neutral-500)' },
        { name: 'neutral-600', value: 'var(--neutral-600)' },
        { name: 'neutral-700', value: 'var(--neutral-700)' },
        { name: 'neutral-800', value: 'var(--neutral-800)' },
        { name: 'neutral-900', value: 'var(--neutral-900)' }
      ]
    }
  ];

  const typographyScale = [
    { name: 'display(xl)', size: '60px', weight: '900', usage: 'Hero' },
    { name: 'display(lg)', size: '48px', weight: '900', usage: 'Large' },
    { name: 'heading(xl)', size: '36px', weight: '700', usage: 'Page' },
    { name: 'heading(lg)', size: '30px', weight: '700', usage: 'Section' },
    { name: 'body(lg)', size: '18px', weight: '400', usage: 'Body' },
    { name: 'body(md)', size: '16px', weight: '400', usage: 'Base' },
    { name: 'caption', size: '12px', weight: '400', usage: 'Caption' }
  ];

  const spacingSystem = [
    { name: 'xs', value: '4px' },
    { name: 'sm', value: '8px' },
    { name: 'md', value: '12px' },
    { name: 'lg', value: '16px' },
    { name: 'xl', value: '20px' },
    { name: '2xl', value: '24px' },
    { name: '3xl', value: '32px' },
    { name: '4xl', value: '40px' },
    { name: '6xl', value: '64px' }
  ];

  let activeTab = 'tokens';
</script>

<div class="vbox gap(24) py(32)">
  <!-- Header -->
  <section class="vbox gap(4) max-w(800px) mx(auto) px(6) text-align(center)">
    <h1 class="font(display-lg) bold(900) c(gray-900)">
      Design System
    </h1>
    <p class="font(body-lg) c(gray-500)">
      Tokens and primitives for building Adorable interfaces.
    </p>
  </section>

  <!-- Content -->
  <div class="max-w(1000px) mx(auto) w(full) px(6) vbox gap(32)">
    
    <!-- Colors -->
    <section class="vbox gap(12)">
      <h2 class="font(heading-lg) c(gray-900)">Colors</h2>
      <div class="vbox gap(16)">
        {#each colorCategories as category}
          <div class="vbox gap(4)">
            <h3 class="font(title-md) c(gray-700)">{category.name}</h3>
            <div class="grid(5) md:grid-cols(10) gap(2)">
              {#each category.colors as color}
                <div class="vbox gap(2) group cursor-pointer">
                  <div 
                    class="h(16) w(full) r(md) transition hover:scale(105)"
                    style="background-color: {color.value}"
                  />
                  <div class="opacity(0) group-hover:opacity(100) transition text-align(center)">
                    <span class="font(caption) c(gray-400)">{color.name.split('-')[1] || 'base'}</span>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Typography -->
    <section class="vbox gap(12)">
      <h2 class="font(heading-lg) c(gray-900)">Typography</h2>
      <div class="vbox gap(8)">
        {#each typographyScale as type}
          <div class="hbox(middle) gap(8) p(6) r(lg) hover:bg(gray-50) transition group">
            <div class="w(120)">
              <code class="font(caption) c(indigo-500) bg(indigo-50) px(2) py(1) r(sm)">{type.name}</code>
            </div>
            <div class="flex(1)">
              <p style="font-size: {type.size}; font-weight: {type.weight};" class="c(gray-900)">
                The quick brown fox
              </p>
            </div>
            <div class="c(gray-400) font(caption) opacity(0) group-hover:opacity(100)">
              {type.size} / {type.weight}
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Spacing -->
    <section class="vbox gap(12)">
      <h2 class="font(heading-lg) c(gray-900)">Spacing</h2>
      <div class="grid(2) sm:grid-cols(3) md:grid-cols(4) gap(6)">
        {#each spacingSystem as space}
          <div class="hbox(middle) gap(4)">
            <code class="w(32) font(caption) c(gray-500)">{space.name}</code>
            <div 
              class="h(8) bg(indigo-500) r(full) opacity(80)"
              style="width: {space.value}"
            />
            <span class="font(caption) c(gray-400)">{space.value}</span>
          </div>
        {/each}
      </div>
    </section>

    <!-- Components Preview -->
    <section class="vbox gap(12)">
      <h2 class="font(heading-lg) c(gray-900)">Components</h2>
      <div class="hbox gap(8) flex-wrap">
        <!-- Buttons -->
        <button class="px(6) py(2) r(md) bg(indigo-600) c(white) font(bold) hover:bg(indigo-700) transition">Primary</button>
        <button class="px(6) py(2) r(md) bg(gray-100) c(gray-700) font(bold) hover:bg(gray-200) transition">Secondary</button>
        <button class="px(6) py(2) r(md) c(gray-600) hover:bg(gray-50) transition">Ghost</button>
      </div>
      
      <!-- Cards -->
      <div class="grid(1) sm:grid-cols(2) gap(8)">
        <div class="vbox gap(4) p(8) r(xl) bg(white) shadow(sm) hover:shadow(md) transition">
          <div class="size(12) r(full) bg(indigo-100) hbox(center) c(indigo-600)">
            <svg class="size(6)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <div>
            <h3 class="font(title-lg) c(gray-900)">Borderless Card</h3>
            <p class="font(body-md) c(gray-500) mt(2)">
              Defined by shadow and whitespace, not borders.
            </p>
          </div>
        </div>
        
        <div class="vbox gap(4) p(8) r(xl) bg(gray-50) hover:bg(gray-100) transition">
          <div class="size(12) r(full) bg(white) shadow(sm) hbox(center) c(gray-900)">
            <svg class="size(6)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </div>
          <div>
            <h3 class="font(title-lg) c(gray-900)">Surface Card</h3>
            <p class="font(body-md) c(gray-500) mt(2)">
              Uses a subtle background fill to define its area.
            </p>
          </div>
        </div>
      </div>
    </section>

  </div>
</div>