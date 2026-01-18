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
  <aside class="sticky top(0) h(screen) w(280) overflow-y(auto) border-r(1/gray-200) bg(gray-50/50) p(24) hidden lg:block shrink(0)">
    <div class="vbox gap(32)">
      <!-- Brand / Home Link -->
      <a href="/" class="hbox(middle) gap(10) text(none) c(inherit) px(12)">
        <div class="size(24) bg(indigo-600) r(md) shadow(sm)"></div>
        <span class="font(title-md) bold(700) c(slate-900) tracking(tight)">Adorable Docs</span>
      </a>

      <!-- Navigation Tree -->
      <div class="vbox gap(8)">
        {#each sidebarItems as item}
          <div class="vbox gap(4)">
            <a href="#{item.id}" class="block py(6) px(12) r(md) c(slate-600) font(medium) text(sm) hover:bg(white) hover:c(indigo-600) hover:shadow(sm) transition duration(200) text(none)">
              {item.title}
            </a>
            {#if item.children}
              <div class="vbox gap(2) pl(16) border-l(1/gray-200) ml(12)">
                {#each item.children as child}
                  <a href="#{child.id}" class="block py(4) px(12) r(md) c(slate-500) font(medium) text(sm) hover:c(indigo-600) transition duration(200) text(none)">
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
    <header class="sticky top(0) z(10) bg(white/80) backdrop-blur(md) border-b(1/gray-100) px(24) lg:px(48) h(64) hbox(middle) justify(between)">
      <div class="hbox(middle) gap(12) c(slate-500) font(medium) text(sm)">
        <span>Docs</span>
        <span>/</span>
        <span class="c(slate-900)">Introduction</span>
      </div>
      <div class="hbox(middle) gap(12)">
         <div class="w(240) h(36) bg(gray-50) r(md) border(1/gray-200) hbox(middle) px(12) gap(8) c(gray-400) hover:border(gray-300) transition cursor(text)">
            <svg class="size(16)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span class="font(caption)">Search documentation...</span>
            <div class="ml(auto) font(mono) text(xs) c(gray-400) border(1/gray-200) px(4) r(4)">⌘K</div>
         </div>
      </div>
    </header>

    <!-- Page Content -->
    <article class="p(32) lg:p(48) lg:py(64) vbox gap(48)">
      
      <!-- Hero -->
      <div class="vbox gap(24)">
        <h1 class="text(4xl) bold(800) c(slate-900) tracking(tight) leading(tight)">Introduction to AdorableCSS</h1>
        <p class="text(lg) c(slate-600) leading(relaxed) max-w(720)">
          AdorableCSS is an intent-based styling framework designed for the AI age. It generates CSS on-demand based on your semantic intent, keeping your HTML clean and your bundle size tiny.
        </p>
        <div class="hbox gap(16) mt(8)">
           <a href="#installation" class="hbox(middle) gap(8) px(20) h(44) bg(indigo-600) c(white) r(full) font(medium) shadow(indigo-500/0.2) hover:bg(indigo-700) hover:scale(1.02) transition duration(200) text(none)">
             <span>Get Started</span>
             <svg class="size(16)" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
           </a>
           <a href="#github" class="hbox(middle) gap(8) px(20) h(44) bg(white) c(slate-700) border(1/gray-200) r(full) font(medium) hover:bg(gray-50) hover:border(gray-300) transition duration(200) text(none)">
             <span>View on GitHub</span>
           </a>
        </div>
      </div>

      <hr class="border(t/1/gray-100)" />

      <!-- Section: Philosophy -->
      <section id="philosophy" class="vbox gap(32)">
        <div class="vbox gap(16)">
          <h2 class="text(2xl) bold(700) c(slate-900) tracking(tight)">Philosophy</h2>
          <p class="text(base) c(slate-600) leading(1.7)">
            Traditional atomic CSS forces you to memorize thousands of class names. Semantic CSS forces you to switch context between HTML and CSS files. AdorableCSS combines the best of both worlds with a logical, functional syntax.
          </p>
        </div>

        <!-- Callout -->
        <div class="p(24) bg(indigo-50/50) border(1/indigo-100) r(xl) hbox gap(20) shadow(sm)">
          <div class="c(indigo-600) mt(4) p(8) bg(indigo-100) r(lg)">
             <svg class="size(20)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div class="vbox gap(8)">
            <h4 class="text(base) bold(700) c(indigo-950)">Why "Intent-Based"?</h4>
            <p class="text(sm) c(indigo-800) leading(relaxed)">
              Instead of describing the implementation (e.g., `margin-left-4`), you describe the intent. AdorableCSS parses this intent and generates the optimal CSS.
            </p>
          </div>
        </div>
      </section>

      <!-- Section: Code Example -->
      <section id="installation" class="vbox gap(32)">
         <div class="vbox gap(16)">
            <h2 class="text(2xl) bold(700) c(slate-900) tracking(tight)">Installation</h2>
            <p class="text(base) c(slate-600)">Get started by installing the package via your favorite package manager.</p>
         </div>
         
         <div class="bg(slate-900) r(xl) p(24) vbox gap(16) overflow(hidden) shadow(lg)">
            <div class="hbox justify(between) items(center) border-b(1/slate-800) pb(12) -mx(4)">
               <div class="hbox gap(8) px(4)">
                  <div class="size(12) r(full) bg(red-500/80)"></div>
                  <div class="size(12) r(full) bg(yellow-500/80)"></div>
                  <div class="size(12) r(full) bg(green-500/80)"></div>
               </div>
               <span class="font(caption) c(slate-500)">Terminal</span>
               <div class="w(40)"></div> <!-- spacer -->
            </div>
            <div class="vbox gap(8)">
                <code class="font(mono) c(slate-300) text(sm) hbox gap(12)">
                   <span class="c(emerald-400) bold(700)">$</span> 
                   <span>npm install adorable-css</span>
                </code>
                <code class="font(mono) c(slate-300) text(sm) hbox gap(12)">
                   <span class="c(emerald-400) bold(700)">$</span> 
                   <span>npx adorable-init</span>
                </code>
            </div>
         </div>
      </section>

      <!-- Section: Features Table -->
      <section id="features" class="vbox gap(32)">
         <h2 class="text(2xl) bold(700) c(slate-900) tracking(tight)">Features Comparison</h2>
         
         <div class="w(full) overflow-x(auto) border(1/gray-200) r(xl) shadow(sm)">
            <table class="w(full) text(left) border-collapse">
               <thead>
                  <tr class="bg(gray-50/80) border-b(1/gray-200)">
                     <th class="p(16) font(title-sm) c(slate-900)">Feature</th>
                     <th class="p(16) font(title-sm) c(slate-500) font(400)">Tailwind</th>
                     <th class="p(16) font(title-sm) c(indigo-600)">AdorableCSS</th>
                  </tr>
               </thead>
               <tbody class="divide-y(1/gray-100)">
                  <tr class="hover:bg(gray-50/50) transition">
                     <td class="p(16) font(medium) c(slate-900)">Syntax</td>
                     <td class="p(16) font(mono) text(xs) c(slate-500)">text-lg font-bold p-4</td>
                     <td class="p(16) font(mono) text(xs) c(indigo-600) bg(indigo-50/50) r(md) inline-block px(8) py(4)">text(lg) font(bold) p(4)</td>
                  </tr>
                  <tr class="hover:bg(gray-50/50) transition">
                     <td class="p(16) font(medium) c(slate-900)">Values</td>
                     <td class="p(16) c(slate-500)">Pres-set Utilities</td>
                     <td class="p(16) c(slate-700)">Any Value (Arbitrary)</td>
                  </tr>
                  <tr class="hover:bg(gray-50/50) transition">
                     <td class="p(16) font(medium) c(slate-900)">Grouping</td>
                     <td class="p(16) c(slate-500)">No</td>
                     <td class="p(16) c(slate-700)">Yes (Groups)</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </section>

      <div class="h(100)"></div>
    </article>
  </main>

  <!-- Right Sidebar (TOC) -->
  <aside class="sticky top(0) h(screen) w(240) p(32) hidden xl:block shrink(0) pt(96)">
    <div class="vbox gap(16)">
      <h5 class="text(xs) bold(700) uppercase c(slate-900) tracking(widest)">On this page</h5>
      <div class="vbox gap(4) border-l(1/gray-200)">
        {#each tocItems as item}
          <a href="#{item.id}" class="block py(4) pl(16) -ml(1) border-l(2/transparent) c(slate-500) font(medium) text(sm) hover:border-l(indigo-500) hover:c(indigo-600) transition duration(200) text(none)">
            {item.title}
          </a>
        {/each}
      </div>
    </div>
  </aside>

</div>
