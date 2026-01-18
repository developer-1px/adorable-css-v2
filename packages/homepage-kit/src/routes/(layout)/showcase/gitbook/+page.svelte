<script lang="ts">
  const sidebarItems = [
    { title: 'Introduction', id: 'introduction' },
    { title: 'Getting Started', id: 'getting-started' },
    { title: 'Core Concepts', id: 'core-concepts', children: [
        { title: 'Utility First', id: 'utility-first' },
        { title: 'Responsive Design', id: 'responsive-design' },
        { title: 'Dark Mode', id: 'dark-mode' },
      ]
    },
    { title: 'Components', id: 'components', children: [
        { title: 'Buttons', id: 'buttons' },
        { title: 'Cards', id: 'cards' },
        { title: 'Inputs', id: 'inputs' },
      ]
    },
    { title: 'API Reference', id: 'api-reference' },
  ];

  const tocItems = [
    { title: 'Philosophy', id: 'philosophy' },
    { title: 'Installation', id: 'installation' },
    { title: 'Configuration', id: 'configuration' },
    { title: 'Community', id: 'community' },
  ];
</script>

<div class="hbox w(full) min-h(screen) bg(white)">

  <!-- Left Sidebar (Navigation) -->
  <aside class="sticky top(0) h(screen) w(280) overflow-y(auto) border-r(1/gray-200) p(24) hidden lg:block shrink(0)">
    <div class="vbox gap(32)">
      <!-- Brand / Home Link -->
      <a href="/" class="hbox(middle) gap(10) text(none) c(inherit)">
        <div class="size(24) bg(indigo-600) r(md)"></div>
        <span class="font(title-md) bold(700) c(gray-900)">Adorable Docs</span>
      </a>

      <!-- Navigation Tree -->
      <div class="vbox gap(8)">
        {#each sidebarItems as item}
          <div class="vbox gap(4)">
            <a href="#{item.id}" class="block py(6) px(12) -mx(12) r(md) c(gray-700) font(medium) hover:bg(gray-50) hover:c(gray-900) transition text(none)">
              {item.title}
            </a>
            {#if item.children}
              <div class="vbox gap(2) pl(16) border-l(1/gray-200) ml(12)">
                {#each item.children as child}
                  <a href="#{child.id}" class="block py(4) px(12) -mx(12) r(md) c(gray-500) font(body-sm) hover:c(gray-900) transition text(none)">
                    {child.title}
                  </a>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </aside>

  <!-- Main Content Area -->
  <main class="flex(1) w(full) max-w(896) mx(auto) min-w(0)">
    
    <!-- Top Bar (Mobile Menu + Search) -->
    <header class="sticky top(0) z(10) bg(white/80) backdrop-blur(md) border-b(1/gray-100) px(24) h(64) hbox(middle) justify(between)">
      <div class="hbox(middle) gap(12) c(gray-500) font(body-sm)">
        <span>Docs</span>
        <span>/</span>
        <span class="c(gray-900)">Introduction</span>
      </div>
      <div class="hbox(middle) gap(12)">
         <div class="w(200) h(36) bg(gray-50) r(md) border(1/gray-200) hbox(middle) px(12) gap(8) c(gray-400)">
            <svg class="size(16)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span class="font(caption)">Search...</span>
         </div>
      </div>
    </header>

    <!-- Page Content -->
    <article class="p(32) lg:p(48) vbox gap(40)">
      
      <!-- Hero -->
      <div class="vbox gap(16)">
        <h1 class="font(display-lg) bold(800) c(gray-900) leading(tight)">Introduction to AdorableCSS</h1>
        <p class="font(body-lg) c(gray-600) leading(relaxed) max-w(640)">
          AdorableCSS is an intent-based styling framework designed for the AI age. It generates CSS on-demand based on your semantic intent, keeping your HTML clean and your bundle size tiny.
        </p>
      </div>

      <hr class="border(t/1/gray-100)" />

      <!-- Section: Philosophy -->
      <section id="philosophy" class="vbox gap(24)">
        <div class="vbox gap(8)">
          <h2 class="font(heading-lg) bold(700) c(gray-900)">Philosophy</h2>
          <p class="font(body-md) c(gray-700) leading(relaxed)">
            Traditional atomic CSS forces you to memorize thousands of class names. Semantic CSS forces you to switch context between HTML and CSS files. AdorableCSS combines the best of both worlds with a logical, functional syntax.
          </p>
        </div>

        <!-- Callout -->
        <div class="p(20) bg(indigo-50) border(1/indigo-100) r(lg) hbox gap(16)">
          <div class="c(indigo-600) mt(4)">
             <svg class="size(20)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div class="vbox gap(6)">
            <h4 class="font(title-sm) bold(700) c(indigo-900)">Why "Intent-Based"?</h4>
            <p class="font(body-sm) c(indigo-800) leading(relaxed)">
              Instead of describing the implementation (e.g., `margin-left-4`), you describe the intent. AdorableCSS parses this intent and generates the optimal CSS.
            </p>
          </div>
        </div>
      </section>

      <!-- Section: Code Example -->
      <section id="installation" class="vbox gap(24)">
         <h2 class="font(heading-lg) bold(700) c(gray-900)">Installation</h2>
         <p class="font(body-md) c(gray-700)">Get started by installing the package via your favorite package manager.</p>
         
         <div class="bg(gray-900) r(xl) p(24) vbox gap(4) overflow(hidden)">
            <div class="hbox justify(between) items(center) mb(12)">
               <span class="font(caption) c(gray-400)">Terminal</span>
               <div class="hbox gap(6)">
                  <div class="size(10) r(full) bg(red-500)"></div>
                  <div class="size(10) r(full) bg(yellow-500)"></div>
                  <div class="size(10) r(full) bg(green-500)"></div>
               </div>
            </div>
            <code class="font(mono) c(gray-300) text(sm)">
               <span class="c(green-400)">$</span> npm install adorable-css
            </code>
            <code class="font(mono) c(gray-300) text(sm)">
               <span class="c(green-400)">$</span> npx adorable-init
            </code>
         </div>
      </section>

      <!-- Section: Features Table -->
      <section id="features" class="vbox gap(24)">
         <h2 class="font(heading-lg) bold(700) c(gray-900)">Features Comparison</h2>
         
         <div class="w(full) overflow-x(auto) border(1/gray-200) r(xl)">
            <table class="w(full) text(left) border-collapse">
               <thead>
                  <tr class="bg(gray-50) border-b(1/gray-200)">
                     <th class="p(16) font(title-sm) c(gray-900)">Feature</th>
                     <th class="p(16) font(title-sm) c(gray-900)">Tailwind</th>
                     <th class="p(16) font(title-sm) c(indigo-600)">AdorableCSS</th>
                  </tr>
               </thead>
               <tbody class="divide-y(1/gray-100)">
                  <tr>
                     <td class="p(16) font(medium) c(gray-900)">Syntax</td>
                     <td class="p(16) font(mono) text(xs) c(gray-500)">text-lg font-bold p-4</td>
                     <td class="p(16) font(mono) text(xs) c(indigo-600)">text(lg) font(bold) p(4)</td>
                  </tr>
                  <tr>
                     <td class="p(16) font(medium) c(gray-900)">Values</td>
                     <td class="p(16) c(gray-600)">Pres-set Utilities</td>
                     <td class="p(16) c(gray-600)">Any Value (Arbitrary)</td>
                  </tr>
                  <tr>
                     <td class="p(16) font(medium) c(gray-900)">Grouping</td>
                     <td class="p(16) c(gray-600)">No</td>
                     <td class="p(16) c(gray-600)">Yes (Groups)</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </section>

      <div class="h(100)"></div>
    </article>
  </main>

  <!-- Right Sidebar (TOC) -->
  <aside class="sticky top(0) h(screen) w(240) p(32) hidden xl:block shrink(0)">
    <div class="vbox gap(16)">
      <h5 class="font(caption) bold(700) uppercase c(gray-900) tracking(widest)">On this page</h5>
      <div class="vbox gap(2) border-l(1/gray-200)">
        {#each tocItems as item}
          <a href="#{item.id}" class="block py(4) pl(16) -ml(1) border-l(2/transparent) c(gray-500) font(body-sm) hover:border-l(gray-300) hover:c(gray-900) transition text(none)">
            {item.title}
          </a>
        {/each}
      </div>
    </div>
  </aside>

</div>
