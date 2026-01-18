<script lang="ts">
  import { Copy, Check, ChevronRight, BookOpen, Search } from 'lucide-svelte';
  import { generateCSS, RULE_GROUPS } from 'adorable-css';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  
  let copiedRule = '';
  let liveInput = '';
  let liveCSS = '';
  let liveError = '';
  
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copiedRule = text;
    setTimeout(() => copiedRule = '', 2000);
  }
  
  function generateLiveCSS() {
    if (!liveInput.trim()) {
      liveCSS = '';
      liveError = '';
      return;
    }
    
    try {
      // Split input into individual classes
      const classes = liveInput.trim().split(/\s+/);
      const result = generateCSS(classes);
      
      if (result && result.trim()) {
        liveCSS = result;
        liveError = '';
      } else {
        liveCSS = '';
        liveError = 'No CSS generated. Check if the classes are valid.';
      }
    } catch (error) {
      liveCSS = '';
      liveError = (error as Error).message || 'Failed to generate CSS';
    }
  }

  // Count total rules for stats
  function countRules() {
    let total = 0;
    Object.values(RULE_GROUPS).forEach(group => {
      Object.values(group.subgroups).forEach(subgroup => {
        total += Object.keys(subgroup.rules).length;
      });
    });
    return total;
  }
  
  $: totalRules = countRules();
</script>

<div class="min-h(100vh) bg(white)">
  <!-- Minimal Hero with Playground -->
  <section class="relative bg(gray-900) py(5xl)">
    <div class="container(md) mx(auto) px(xl) relative z(10)">
      <div class="vbox(center) gap(3xl)">
        
        <!-- Header -->
        <div class="vbox(center) gap(lg) text(center)">
          <Badge variant="outline" class="c(white) border(white.2)">
            The Engine
          </Badge>
          <h1 class="display(md) c(white) font(bold) tracking(tight)">
            Instant CSS Generation
          </h1>
          <p class="body(lg) c(gray-400) max-w(600px)">
            Test utilities in real-time. AdorableCSS compiles on-demand without any build steps in the browser.
          </p>
        </div>

        <!-- Live Playground -->
        <div class="w(full) max-w(3xl)">
          <div class="bg(white.1) p(xl) r(xl) backdrop-blur(sm) border(1/white.1)">
            <div class="vbox gap(lg)">
              <div class="hbox gap(md)">
                <input
                  bind:value={liveInput}
                  placeholder="Try: hbox(center) gap(xl) p(2xl) bg(blue-500) c(white) r(lg)"
                  class="flex(1) px(lg) py(md) r(lg) body(base) mono bg(black.4) c(white)
                         placeholder:c(gray-500) outline(none) ring(0) focus:bg(black.6) transition-all"
                  on:input={generateLiveCSS}
                />
              </div>
              
              {#if liveCSS}
                 <div class="vbox gap(xs) animation(slide-down)">
                    <div class="hbox(between) items(center)">
                      <span class="text(xs) font(medium) c(gray-400) uppercase tracking(wider)">Generated CSS</span>
                      <button on:click={() => copyToClipboard(liveCSS)} class="c(white.6) hover:c(white) text(xs) transition">
                        {copiedRule === liveCSS ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre class="p(lg) bg(black.6) r(lg) text(xs) mono c(green-400) overflow-x(auto)">{liveCSS}</pre>
                 </div>
              {/if}
              
              {#if liveError}
                <div class="p(md) bg(red-500.1) r(lg) border(1/red-500.2)">
                  <p class="text(sm) c(red-400)">{liveError}</p>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Navigation / References -->
  <section class="py(5xl) container(lg) mx(auto) px(xl)">
    <div class="grid(1) md:grid(2) gap(2xl)">
      
      <!-- Card: Full Reference -->
      <a href="/reference/rules" class="group block">
        <div class="h(full) p(2xl) border(1/gray-200) r(2xl) hover:border(indigo-200) hover:shadow(lg) hover:-translate-y(1) transition-all bg(white)">
          <div class="vbox gap(xl)">
            <div class="w(48px) h(48px) r(xl) bg(indigo-50) hbox(center) c(indigo-600) group-hover:bg(indigo-600) group-hover:c(white) transition">
              <BookOpen size="24" />
            </div>
            <div class="vbox gap(sm)">
               <h3 class="text(2xl) font(bold) c(gray-900)">Full Reference</h3>
               <p class="text(lg) c(gray-500) leading(relaxed)">
                 Browse the comprehensive list of all {totalRules}+ utility rules, organized by category and layer.
               </p>
            </div>
            <div class="pt(lg) hbox(center) justify-self(start)">
               <span class="text(sm) font(semibold) c(indigo-600) group-hover:tracking(wide) transition-all">View Documentation →</span>
            </div>
          </div>
        </div>
      </a>

      <!-- Card: Design Tokens -->
      <a href="/tokens" class="group block">
        <div class="h(full) p(2xl) border(1/gray-200) r(2xl) hover:border(pink-200) hover:shadow(lg) hover:-translate-y(1) transition-all bg(white)">
          <div class="vbox gap(xl)">
            <div class="w(48px) h(48px) r(xl) bg(pink-50) hbox(center) c(pink-600) group-hover:bg(pink-600) group-hover:c(white) transition">
              <Search size="24" />
            </div>
            <div class="vbox gap(sm)">
               <h3 class="text(2xl) font(bold) c(gray-900)">Design Tokens</h3>
               <p class="text(lg) c(gray-500) leading(relaxed)">
                 Explore the design system foundations including typography, spacing, colors, and shadows.
               </p>
            </div>
            <div class="pt(lg) hbox(center) justify-self(start)">
               <span class="text(sm) font(semibold) c(pink-600) group-hover:tracking(wide) transition-all">View Tokens →</span>
            </div>
          </div>
        </div>
      </a>

    </div>
  </section>

</div>