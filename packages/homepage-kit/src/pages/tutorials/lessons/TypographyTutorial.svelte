<script lang="ts">
  import TutorialLayout from '../TutorialLayout.svelte';
  
  const code = `<div class="p(xl) vbox gap(lg)">
  
  <h1 class="700 font(2xl) c(neutral-900)">Typography</h1>
  
  <p class="font(lg/1.6) c(neutral-700)">
    Typography in AdorableCSS is simple and intuitive.
  </p>
  
  <div class="vbox gap(md)">
    <h2 class="600 font(xl) c(neutral-800)">Font Sizes</h2>
    <p class="font(sm) c(neutral-600)">Small text</p>
    <p class="font(md) c(neutral-700)">Medium text</p>
    <p class="font(lg) c(neutral-800)">Large text</p>
    <p class="font(xl) c(neutral-900)">Extra large text</p>
  </div>
  
  <div class="vbox gap(md)">
    <h2 class="600 font(xl) c(neutral-800)">Font Weights</h2>
    <p class="400 font(md)">Regular (400)</p>
    <p class="600 font(md)">Semibold (600)</p>
    <p class="700 font(md)">Bold (700)</p>
  </div>
  
</div>`;
</script>

<TutorialLayout title="Typography" {code}>
  {#snippet instructions()}
    <h2>Font 유틸리티</h2>
    <p>AdorableCSS에서 폰트를 스타일링하는 방법을 배워보세요.</p>
    
    <h3>기본 문법</h3>
    <pre><code>font(size)          → font-size
font(size/line)     → font-size + line-height
700 font(xl)        → font-weight + font-size</code></pre>
    
    <h3>폰트 크기 토큰</h3>
    <pre><code>font(sm)  → 14px
font(md)  → 16px
font(lg)  → 20px
font(xl)  → 24px
font(2xl) → 32px</code></pre>
    
    <h3>폰트 두께</h3>
    <pre><code>400 → Regular
500 → Medium
600 → Semibold
700 → Bold
900 → Black</code></pre>
    
    <h3>주의사항</h3>
    <p>폰트 두께는 font() 앞에 와야 합니다:</p>
    <pre><code>✅ 700 font(xl)
❌ font(xl) 700</code></pre>
  {/snippet}
</TutorialLayout>