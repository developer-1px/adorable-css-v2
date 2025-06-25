<script lang="ts">
  import { onMount } from 'svelte';
  
  const colors = [
    { name: 'purple', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    { name: 'blue', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    { name: 'pink', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    { name: 'teal', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
  ];
  
  let selectedColor = null;
  let copiedColor = '';
  
  function selectColor(color, shade) {
    selectedColor = `${color}-${shade}`;
    copyToClipboard(`c(${color}-${shade})`);
  }
  
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    copiedColor = text;
    setTimeout(() => copiedColor = '', 2000);
  }
</script>

<section class="color-palette w(fill) py(5xl) bg(white)">
  <div class="container(xl)">
    <!-- Section Header -->
    <div class="text(center) mb(4xl)">
      <h2 class="font(5xl) bold c(gray-900) mb(lg)">
        OKLCH Color System
      </h2>
      <p class="font(xl) c(gray-600) container(md/px:0)">
        Perceptually uniform colors that look beautiful in any combination
      </p>
    </div>
    
    <!-- Color Grid -->
    <div class="vbox gap(3xl)">
      {#each colors as color}
        <div class="color-group">
          <h3 class="font(xl) bold c(gray-900) mb(xl) capitalize">{color.name}</h3>
          <div class="hbox gap(0) clip r(xl) shadow(lg)">
            {#each color.shades as shade}
              <button
                class="shade-box flex(1) h(120px) bg({color.name}-{shade}) hover:scale(1.05) transition relative group"
                on:click={() => selectColor(color.name, shade)}
              >
                <div class="layer(bottom:0+left:0+right:0) p(md) bg(black/10) opacity(0) group-hover:opacity(100) transition">
                  <div class="font(xs) bold c(white)">{shade}</div>
                </div>
              </button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Gradient Examples -->
    <div class="gradient-examples mt(5xl)">
      <h3 class="font(2xl) bold c(gray-900) text(center) mb(3xl)">Beautiful Gradients</h3>
      
      <div class="grid grid-cols(3) gap(xl)">
        <div class="gradient-card">
          <div class="h(200px) bg(purple-400..pink-400/135deg) r(xl) mb(lg)"></div>
          <code class="font(sm) c(gray-600)">bg(purple-400..pink-400/135deg)</code>
        </div>
        
        <div class="gradient-card">
          <div class="h(200px) bg(blue-400..teal-400/to-br) r(xl) mb(lg)"></div>
          <code class="font(sm) c(gray-600)">bg(blue-400..teal-400/to-br)</code>
        </div>
        
        <div class="gradient-card">
          <div class="h(200px) bg(pink-300..purple-600..blue-600/to-r) r(xl) mb(lg)"></div>
          <code class="font(sm) c(gray-600)">bg(pink-300..purple-600..blue-600/to-r)</code>
        </div>
      </div>
    </div>
    
    <!-- Copy Notification -->
    {#if copiedColor}
      <div class="fixed bottom(2xl) right(2xl) px(xl) py(lg) bg(gray-900) c(white) r(lg) shadow(xl) font(sm) animate-slide-up">
        Copied: {copiedColor}
      </div>
    {/if}
  </div>
</section>

<style>
  .shade-box {
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .shade-box:first-child {
    border-radius: 0.75rem 0 0 0.75rem;
  }
  
  .shade-box:last-child {
    border-radius: 0 0.75rem 0.75rem 0;
  }
  
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }
  
  .gradient-card > div {
    transition: transform 0.3s ease;
  }
  
  .gradient-card:hover > div {
    transform: scale(1.02);
  }
</style>