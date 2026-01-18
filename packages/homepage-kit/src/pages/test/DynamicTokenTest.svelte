<script lang="ts">
  import { onMount } from 'svelte';
  import { addDynamicClasses } from 'adorable-css';
  
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
      const classes = additionalClasses.trim().split(/\s+/);
      addDynamicClasses(...classes);
      additionalClasses = '';
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
        This page demonstrates the integrated auto-inject and rule generation system.
        Tokens are generated dynamically as components are used.
      </p>
    </div>
    
    <!-- Dynamic Display Component -->
    <div class="vbox gap(2xl) p(3xl) bg(white) r(xl) shadow(xl) border(2/black)">
      <h2 class="text(2xl) font(bold) mb(xl)">Dynamic Display Component</h2>
      
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
    
    <!-- Custom Class Tester -->
    <div class="vbox gap(2xl) p(3xl) bg(white) r(xl) shadow(xl) border(2/black)">
      <h2 class="text(2xl) font(bold)">Test Custom Classes</h2>
      <p class="text(lg) c(gray-600)">
        Enter AdorableCSS classes to test dynamic token generation:
      </p>
      
      <div class="hbox gap(md)">
        <input
          type="text"
          bind:value={additionalClasses}
          placeholder="e.g., p(10xl) font(12xl) shadow(5xl)"
          class="flex(1) px(lg) py(md) border(2/gray-300) r(md) focus:border(blue-500) focus:outline(none) transition"
          on:keydown={(e) => e.key === 'Enter' && addCustomClass()}
        />
        <button
          on:click={addCustomClass}
          class="px(xl) py(md) bg(blue-500) c(white) r(md) font(semibold) hover:bg(blue-600) active:scale(0.95) transition"
        >
          Add Classes
        </button>
      </div>
      
      <!-- Test area -->
      <div class="p(2xl) bg(gray-100) r(lg) mt(xl)">
        <p class="text(sm) c(gray-600) mb(md)">Test area - your custom classes will be applied here:</p>
        <div class={additionalClasses || 'p(xl) bg(white) r(md) shadow(md)'}>
          This element will use your custom classes
        </div>
      </div>
    </div>
    
    <!-- Token Status -->
    <div class="vbox gap(xl) p(3xl) bg(white) r(xl) shadow(xl) border(2/black)">
      <h2 class="text(2xl) font(bold)">Token Generation Status</h2>
      <p class="text(lg) c(gray-600)">
        Open DevTools and check the <code class="font(mono) bg(gray-100) px(sm) py(xs) r(sm)">&lt;style id="adorable-css-tokens-dynamic"&gt;</code> element
        to see dynamically generated tokens.
      </p>
      <div class="vbox gap(md) mt(lg)">
        <div class="hbox gap(sm) items(center)">
          <div class="w(3px) h(3px) bg(green-500) r(full)"></div>
          <span class="text(sm)">Tokens are generated on-demand as classes are used</span>
        </div>
        <div class="hbox gap(sm) items(center)">
          <div class="w(3px) h(3px) bg(green-500) r(full)"></div>
          <span class="text(sm)">Both CSS rules and tokens update dynamically</span>
        </div>
        <div class="hbox gap(sm) items(center)">
          <div class="w(3px) h(3px) bg(green-500) r(full)"></div>
          <span class="text(sm)">No need to pre-register tokens manually</span>
        </div>
      </div>
    </div>
  </div>
</div>