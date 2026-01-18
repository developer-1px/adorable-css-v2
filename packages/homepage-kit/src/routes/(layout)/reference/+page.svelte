<script lang="ts">
  import { referenceData } from '$lib/referenceData';
  
  let activeCategory = Object.keys(referenceData)[0];

  // Helper to scroll to section
  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  // Generate ID from string
  const toId = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '-');
</script>

<div class="hbox w(full) h(screen) bg(gray-50) overflow(hidden)">
  
  <!-- Sidebar -->
  <aside class="w(280) h(full) overflow-y(auto) border-r(1/gray-200) bg(white) p(10) shrink(0)">
    <div class="vbox gap(2) mb(12)">
      <h1 class="font(title-lg) bold(800) c(gray-900)">Rules</h1>
      <p class="font(body-sm) c(gray-500)">Complete API Reference</p>
    </div>

    <div class="vbox gap(10)">
      {#each Object.entries(referenceData) as [category, subcategories]}
        <div class="vbox gap(4)">
          <h3 class="font(caption) c(gray-400) bold(600) uppercase tracking(wider)">{category.split('(')[1]?.replace(')', '') || category}</h3>
          <div class="vbox gap(1)">
            {#each Object.keys(subcategories) as subcategory}
              <a 
                href="#{toId(category)}-{toId(subcategory)}"
                class="p(2) -ml(2) r(md) c(gray-600) hover:bg(gray-50) hover:c(gray-900) transition text(sm) font(medium) block text(none)"
              >
                {subcategory}
              </a>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </aside>

  <!-- Main Content -->
  <main class="flex(1) h(full) overflow-y(auto) scroll-smooth">
    <div class="max-w(1200px) p(24) mx(auto) vbox gap(32)">
      
      {#each Object.entries(referenceData) as [category, subcategories]}
        <section id={toId(category)} class="vbox gap(8)">
          <div class="pb(4) border-b(1/gray-200) mt(8)">
            <h2 class="font(display-sm) bold(800) c(gray-900)">{category}</h2>
          </div>

          <div class="grid(1) lg:grid-cols(2) gap(8)">
            {#each Object.entries(subcategories) as [subcategory, items]}
              <div id="{toId(category)}-{toId(subcategory)}" class="vbox gap(6) p(8) bg(white) r(xl) shadow(sm) border(1/gray-100)">
                <h3 class="font(title-md) c(indigo-600) bold(600)">{subcategory}</h3>
                
                <div class="vbox gap(4)">
                  {#each items as item}
                    <div class="vbox gap(2)">
                      <div class="hbox(middle) gap(2)">
                        <span class="px(2.5) py(1) bg(gray-100) r(md) text(xs) c(gray-500) font(mono)">{item.property}</span>
                      </div>
                      <div class="hbox flex-wrap gap(2)">
                        {#each item.syntax as syntax}
                          <code class="font(mono) text(sm) c(gray-800) bg(gray-50) px(3) py(1.5) r(md) border(1/gray-200)">
                            {syntax}
                          </code>
                        {/each}
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </section>
      {/each}

      <div class="h(100)"></div> <!-- Bottom spacer -->
    </div>
  </main>

</div>
