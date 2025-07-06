<script lang="ts">
  import { onMount } from 'svelte';
  
  let testClasses = [
    'display(xs)',
    'display(sm)',
    'display(md)',
    'display(lg)',
    'display(xl)',
    'display(2xl)',
    'display(3xl)',
    'display(4xl)',
    'display(5xl)',
    'display(banner)',
  ];
  
  let additionalClasses = '';
  let currentClass = 0;
  
  // Rotate through classes every 2 seconds
  onMount(() => {
    const interval = setInterval(() => {
      currentClass = (currentClass + 1) % testClasses.length;
    }, 2000);
    
    return () => clearInterval(interval);
  });
  
  function addCustomClass() {
    if (additionalClasses.trim()) {
      // Note: Dynamic class addition is now handled by CDN package
      // In development, classes are pre-generated during build
      console.log('Classes to test:', additionalClasses);
    }
  }
</script>

<div class="min-h(screen) bg(gray-50) p(5xl)">
  <div class="max-w(6xl) mx(auto) vbox gap(4xl)">
    <!-- Title -->
    <div class="vbox gap(xl) text(center)">
      <h1 class="display(2xl) font(black) tracking(tight)">
        Dynamic Token Test
      </h1>
      <p class="text(xl) c(gray-600) max-w(3xl) mx(auto)">
        Note: Dynamic style injection has been moved to the CDN package.
        This page now demonstrates static token generation.
      </p>
    </div>
    
    <!-- Dynamic Display Component -->
    <div class="vbox gap(2xl) p(3xl) bg(white) r(xl) shadow(xl) border(2/black)">
      <h2 class="text(2xl) font(bold) mb(xl)">Display Component Sizes</h2>
      
      <!-- Show current class -->
      <div class="p(xl) bg(gray-100) r(lg) text(center)">
        <p class="text(sm) c(gray-600) mb(md)">Current class: <code class="font(mono) bg(white) px(sm) py(xs) r(sm)">{testClasses[currentClass]}</code></p>
        <div class={testClasses[currentClass]}>
          The quick brown fox
        </div>
      </div>
      
      <!-- All display sizes -->
      <div class="vbox gap(lg) mt(2xl)">
        <h3 class="text(lg) font(semibold)">All Display Sizes:</h3>
        {#each testClasses as className}
          <div class="p(lg) bg(gray-50) r(md) hover:bg(gray-100) transition">
            <code class="font(mono) text(sm) c(gray-600)">{className}</code>
            <div class={className}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Notice about CDN -->
    <div class="vbox gap(xl) p(3xl) bg(blue-50) r(xl) border(2/blue-200)">
      <h2 class="text(2xl) font(bold) c(blue-900)">Dynamic Styles in CDN</h2>
      <p class="text(lg) c(blue-800)">
        The dynamic style injection feature (including <code class="font(mono) bg(white) px(sm) py(xs) r(sm)">addDynamicClasses</code>) 
        has been moved to the CDN package for better separation of concerns.
      </p>
      <div class="vbox gap(md) mt(lg)">
        <div class="hbox gap(sm) items(center)">
          <div class="w(3) h(3) bg(blue-500) r(full)"></div>
          <span class="text(sm) c(blue-700)">Core package: Pure CSS generation and token management</span>
        </div>
        <div class="hbox gap(sm) items(center)">
          <div class="w(3) h(3) bg(blue-500) r(full)"></div>
          <span class="text(sm) c(blue-700)">CDN package: Browser-specific features like dynamic injection</span>
        </div>
        <div class="hbox gap(sm) items(center)">
          <div class="w(3) h(3) bg(blue-500) r(full)"></div>
          <span class="text(sm) c(blue-700)">Use CDN version for dynamic style management in browsers</span>
        </div>
      </div>
    </div>
  </div>
</div>