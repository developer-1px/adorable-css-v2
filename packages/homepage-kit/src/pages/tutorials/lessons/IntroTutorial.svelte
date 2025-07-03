<script lang="ts">
  import TutorialLayout from '../TutorialLayout.svelte';
  
  const code = `<div class="p(xl) vbox gap(lg)">
  
  <h1 class="700 font(2xl) c(primary-600)">Hello AdorableCSS!</h1>
  
  <p class="font(md/1.6) c(neutral-700)">
    AdorableCSS는 Figma처럼 직관적인 CSS 프레임워크입니다.
  </p>
  
  <div class="hbox gap(lg)">
    <div class="flex(1) p(lg) bg(primary-50) r(lg)">
      <h3 class="600 font(lg) c(primary-900)">Box 1</h3>
      <p class="font(sm) c(primary-700)">hbox로 가로 배치</p>
    </div>
    <div class="flex(1) p(lg) bg(success-50) r(lg)">
      <h3 class="600 font(lg) c(success-900)">Box 2</h3>
      <p class="font(sm) c(success-700)">gap으로 간격</p>
    </div>
  </div>
  
  <button class="px(xl) py(md) bg(primary-500) c(white) r(lg) 
                 700 font(md) cursor(pointer)">
    버튼 예제
  </button>
  
</div>`;
</script>

<TutorialLayout title="Hello AdorableCSS" {code}>
  {#snippet instructions()}
    <h2>AdorableCSS 소개</h2>
    <p>Figma처럼 직관적인 CSS 프레임워크입니다.</p>
    
    <h3>기본 개념</h3>
    <pre><code>p(xl)        → padding: 24px
c(primary-500)  → color: blue
bg(neutral-50)  → background: gray
r(lg)        → border-radius: 12px</code></pre>
    
    <h3>레이아웃</h3>
    <pre><code>hbox         → display: flex
vbox         → display: flex; 
               flex-direction: column
gap(lg)      → gap: 16px
flex(1)      → flex: 1</code></pre>
    
    <h3>색상</h3>
    <pre><code>c(neutral-900)   → 진한 텍스트
c(primary-600) → 브랜드 색상
bg(primary-50)   → 연한 배경
c(white)      → 흰색 텍스트</code></pre>
    
    <h3>간격</h3>
    <pre><code>sm = 8px     xl = 24px
md = 12px    2xl = 32px
lg = 16px    3xl = 40px</code></pre>
  {/snippet}
</TutorialLayout>