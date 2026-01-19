<script lang="ts">

  
  // Design system configuration
  const sections = {
    Foundation: ['Colors', 'Typography', 'Spacing'],
    Components: ['Buttons', 'Cards']
  };

  const toId = (str: string) => str.toLowerCase();
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
</script>


    <div class="vbox gap(3xl)">
      
      <!-- Colors -->
      <section id="colors" class="vbox gap(sm)">
        <div class="pb(xs) border-b(1px/gray-200) mt(sm)">
          <h2 class="font(display-sm) bold(800) c(gray-900)">Colors</h2>
        </div>
        <div class="vbox gap(md)">
          {#each colorCategories as category}
            <div class="vbox gap(sm) p(sm) bg(white) r(xl) shadow(sm) border(1px/gray-100)">
              <h3 class="font(title-md) c(gray-800)">{category.name}</h3>
              <div class="grid(5) md:grid-cols(10) gap(xs)">
                {#each category.colors as color}
                  <div class="vbox gap(xs) group cursor-pointer">
                    <div
                      class="h(xl) w(full) r(md) transition hover:scale(1.05)"
                      style="background-color: {color.value}"
                    />
                    <div class="opacity(0) group-hover:opacity(100) transition text(center)">
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
      <section id="typography" class="vbox gap(sm)">
        <div class="pb(xs) border-b(1px/gray-200) mt(sm)">
          <h2 class="font(display-sm) bold(800) c(gray-900)">Typography</h2>
        </div>
        <div class="vbox gap(xs) p(sm) bg(white) r(xl) shadow(sm) border(1px/gray-100)">
          {#each typographyScale as type}
            <div class="hbox(middle) gap(sm) p(xs) r(lg) hover:bg(gray-50) transition group">
              <div class="w(140px)">
                <code class="font(caption) c(indigo-500) bg(indigo-50) px(xs) py(xs) r(sm)">{type.name}</code>
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
      <section id="spacing" class="vbox gap(sm)">
        <div class="pb(xs) border-b(1px/gray-200) mt(sm)">
          <h2 class="font(display-sm) bold(800) c(gray-900)">Spacing</h2>
        </div>
        <div class="grid(2) sm:grid-cols(3) md:grid-cols(4) gap(sm) p(sm) bg(white) r(xl) shadow(sm) border(1px/gray-100)">
          {#each spacingSystem as space}
            <div class="hbox(middle) gap(xs)">
              <code class="w(32px) font(caption) c(gray-500)">{space.name}</code>
              <div
                class="h(sm) bg(indigo-500) r(full) opacity(80)"
                style="width: {space.value}"
              />
              <span class="font(caption) c(gray-400)">{space.value}</span>
            </div>
          {/each}
        </div>
      </section>

      <!-- Components -->
      <section id="components" class="vbox gap(sm)">
        <div class="pb(xs) border-b(1px/gray-200) mt(sm)">
          <h2 class="font(display-sm) bold(800) c(gray-900)">Components</h2>
        </div>
        
        <div class="grid(1) lg:grid-cols(2) gap(sm)">
          <!-- Buttons Card -->
          <div id="buttons" class="vbox gap(sm) p(sm) bg(white) r(xl) shadow(sm) border(1px/gray-100)">
            <h3 class="font(title-md) c(gray-800)">Buttons</h3>
            <div class="hbox gap(xs) flex-wrap">
              <button class="px(sm) py(xs) r(md) bg(indigo-600) c(white) font(bold) hover:bg(indigo-700) transition shadow(sm) active:scale(0.98)">Primary</button>
              <button class="px(sm) py(xs) r(md) bg(white) border(1px/gray-200) c(gray-700) font(medium) hover:bg(gray-50) transition shadow(sm)">Secondary</button>
              <button class="px(sm) py(xs) r(md) c(gray-600) hover:bg(gray-50) transition font(medium)">Ghost</button>
            </div>
          </div>

          <!-- Cards Card -->
          <div id="cards" class="vbox gap(sm) p(sm) bg(white) r(xl) shadow(sm) border(1px/gray-100)">
            <h3 class="font(title-md) c(gray-800)">Cards</h3>
            <div class="vbox gap(xs)">
               <div class="vbox gap(xs) p(sm) r(lg) bg(white) shadow(md) border(1px/gray-100)">
                  <div class="hbox(middle) gap(xs)">
                    <div class="size(sm) r(full) bg(indigo-100) hbox(center) c(indigo-600)">
                      <svg class="size(xs)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    </div>
                    <span class="font(medium) c(gray-900)">Elevated Surface</span>
                  </div>
               </div>
               <div class="vbox gap(xs) p(sm) r(lg) bg(gray-50) border(1px/gray-200)">
                  <div class="hbox(middle) gap(xs)">
                    <div class="size(sm) r(full) bg(white) shadow(sm) hbox(center) c(gray-900)">
                       <svg class="size(xs)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
                    </div>
                    <span class="font(medium) c(gray-900)">Flat Surface</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <div class="h(100px)"></div> <!-- Bottom spacer -->
    </div>