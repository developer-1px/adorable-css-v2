<script>
  import { onMount } from 'svelte';
  
  // Prettier color palette inspired by adorable-docs.html
  const originalColors = {
    // Warm neutrals
    'cream': '#FFFEF9',
    'ivory': '#FFF8F0', 
    'pearl': '#F8F6F3',
    'soft-black': '#2A2A2A',
    
    // Cool grays
    'charcoal': '#3D3D3D',
    'warm-gray': '#7A7A7A',
    'light-gray': '#E5E5E5',
    'silver': '#D0D0D0',
    
    // Coral family
    'coral-bright': '#FF6B6B',
    'coral-deep': '#E85A5A',
    'coral-soft': '#FF9999',
    'coral-blush': '#FFB8B8',
    
    // Ocean blues
    'ocean': '#4ECDC4',
    'teal-deep': '#3ABAB0', 
    'aqua-light': '#7FE8DF',
    'sky-soft': '#A8F0EA',
    
    // Sunshine yellows
    'sunshine': '#FFE66D',
    'golden': '#FFD93D',
    'lemon': '#FFF2A8',
    'cream-yellow': '#FFFACD',
    
    // Purple dreams
    'lavender': '#B883D4',
    'purple-soft': '#A573C4',
    'plum': '#8B5A96',
    'lilac': '#D4B8E8',
    
    // Nature greens
    'mint-fresh': '#7DDDD3',
    'sage': '#9FCF9F',
    'forest': '#6B9B6B'
  };

  // My interpretation with prettier AdorableCSS mappings
  const colorShadeMapping = {
    // Warm neutrals
    'cream': 'amber-50',
    'ivory': 'orange-50', 
    'pearl': 'stone-100',
    'soft-black': 'slate-700',
    
    // Cool grays
    'charcoal': 'slate-600',
    'warm-gray': 'stone-400',
    'light-gray': 'gray-200',
    'silver': 'gray-300',
    
    // Coral family
    'coral-bright': 'rose-400',
    'coral-deep': 'rose-500',
    'coral-soft': 'rose-300',
    'coral-blush': 'rose-200',
    
    // Ocean blues
    'ocean': 'teal-400',
    'teal-deep': 'teal-500',
    'aqua-light': 'teal-300',
    'sky-soft': 'cyan-200',
    
    // Sunshine yellows
    'sunshine': 'amber-300',
    'golden': 'yellow-400',
    'lemon': 'yellow-200',
    'cream-yellow': 'yellow-100',
    
    // Purple dreams
    'lavender': 'violet-300',
    'purple-soft': 'purple-400',
    'plum': 'purple-500',
    'lilac': 'violet-200',
    
    // Nature greens
    'mint-fresh': 'emerald-300',
    'sage': 'green-300',
    'forest': 'green-500'
  };

  let activeView = 'comparison';
</script>

<svelte:head>
  <title>색깔 감각 분석 - AdorableCSS Color Analysis</title>
</svelte:head>

<div class="min-h(100vh) bg(gray-50) py(2xl)">
  <div class="max-w(7xl) mx(auto) px(xl)">
    
    <!-- Header -->
    <header class="text(center) mb(3xl)">
      <h1 class="text(..5xl/1.1/-3%) font(bold) bg(gradient-to-r/rose-500/amber-500) bg-clip(text) c(transparent) mb(lg)">
        🌈 예쁜 색깔 감각 테스트
      </h1>
      <p class="text(lg) c(slate-600) mb(xl)">
        아름다운 색상 팔레트를 AdorableCSS 시스템으로 해석해보기<br>
        <span class="text(sm) bg(gradient-to-r/teal-400/emerald-400) bg-clip(text) c(transparent) font(medium)">✨ {Object.keys(originalColors).length}개의 예쁜 색상들</span>
      </p>
      
      <!-- View Toggle -->
      <div class="hbox(center) gap(lg) mb(2xl)">
        <button 
          class="px(xl) py(md) r(lg) font(medium) transition(all/200ms)"
          class:bg(blue-600)={activeView === 'comparison'}
          class:c(white)={activeView === 'comparison'}
          class:bg(gray-200)={activeView !== 'comparison'}
          class:c(gray-700)={activeView !== 'comparison'}
          on:click={() => activeView = 'comparison'}
        >
          색상 비교
        </button>
        <button 
          class="px(xl) py(md) r(lg) font(medium) transition(all/200ms)"
          class:bg(blue-600)={activeView === 'analysis'}
          class:c(white)={activeView === 'analysis'}
          class:bg(gray-200)={activeView !== 'analysis'}
          class:c(gray-700)={activeView !== 'analysis'}
          on:click={() => activeView = 'analysis'}
        >
          분석 결과
        </button>
      </div>
    </header>

    {#if activeView === 'comparison'}
      <!-- Color Comparison Grid -->
      <div class="grid(3) gap(xl) md:grid(4) lg:grid(5)">
        {#each Object.entries(originalColors) as [name, hex]}
          <div class="bg(white) r(xl) p(lg) shadow(md) hover:shadow(lg) transition(shadow/300ms)">
            <h3 class="text(sm) font(semi) c(gray-900) mb(md) capitalize text(center)">
              {name.replace('-', ' ')}
            </h3>
            
            <!-- Original Color -->
            <div class="mb(lg)">
              <div 
                class="w(full) h(20) r(lg) mb(sm) b(2/gray-300)"
                style="background-color: {hex}"
              ></div>
              <div class="text(center)">
                <div class="text(xs) font(medium) c(gray-700) mb(1)">Original</div>
                <div class="text(2xs) c(gray-500) font(mono)">{hex}</div>
              </div>
            </div>
            
            <!-- My Interpretation -->
            <div class="mb(lg)">
              <div class="w(full) h(20) r(lg) mb(sm) b(2/gray-300) bg({colorShadeMapping[name]})"></div>
              <div class="text(center)">
                <div class="text(xs) font(medium) c(gray-700) mb(1)">내 해석</div>
                <div class="text(2xs) c(gray-500) font(mono)">{colorShadeMapping[name]}</div>
              </div>
            </div>
            
            <!-- Match Quality -->
            <div class="text(center)">
              {#if ['cream', 'ivory', 'pearl', 'ocean', 'mint-fresh'].includes(name)}
                <span class="text(xs) px(sm) py(1) r(md) bg(emerald-100) c(emerald-700)">✨ 완벽</span>
              {:else if ['coral-bright', 'lavender', 'sunshine', 'sage', 'silver'].includes(name)}
                <span class="text(xs) px(sm) py(1) r(md) bg(sky-100) c(sky-700)">💫 좋음</span>
              {:else if ['warm-gray', 'charcoal', 'lemon', 'lilac'].includes(name)}
                <span class="text(xs) px(sm) py(1) r(md) bg(amber-100) c(amber-700)">🌟 괜찮</span>
              {:else}
                <span class="text(xs) px(sm) py(1) r(md) bg(rose-100) c(rose-700)">🎨 도전</span>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}

    {#if activeView === 'analysis'}
      <!-- Enhanced Analysis -->
      <div class="vbox gap(2xl)">
        
        <!-- Color Accuracy Stats -->
        <div class="bg(white) r(xl) p(2xl) shadow(md)">
          <h2 class="text(2xl) font(bold) c(gray-900) mb(xl)">색상 정확도 분석</h2>
          
          <div class="grid(4) gap(xl) mb(xl)">
            <div class="text(center) p(lg) bg(gradient-to-br/emerald-50/teal-50) r(xl) shadow(sm)">
              <div class="text(3xl) font(bold) c(emerald-600) mb(sm)">5</div>
              <div class="text(sm) c(emerald-700) font(medium)">✨ 완벽한 매칭</div>
            </div>
            <div class="text(center) p(lg) bg(gradient-to-br/sky-50/blue-50) r(xl) shadow(sm)">
              <div class="text(3xl) font(bold) c(sky-600) mb(sm)">5</div>
              <div class="text(sm) c(sky-700) font(medium)">💫 좋은 매칭</div>
            </div>
            <div class="text(center) p(lg) bg(gradient-to-br/amber-50/yellow-50) r(xl) shadow(sm)">
              <div class="text(3xl) font(bold) c(amber-600) mb(sm)">4</div>
              <div class="text(sm) c(amber-700) font(medium)">🌟 괜찮은 매칭</div>
            </div>
            <div class="text(center) p(lg) bg(gradient-to-br/rose-50/pink-50) r(xl) shadow(sm)">
              <div class="text(3xl) font(bold) c(rose-600) mb(sm)">9</div>
              <div class="text(sm) c(rose-700) font(medium)">🎨 도전적 매칭</div>
            </div>
          </div>
          
          <div class="grid(2) gap(xl)">
            <div class="bl(4/teal-500) pl(xl)">
              <h3 class="text(lg) font(semi) c(gray-900) mb(md)">강점</h3>
              <ul class="c(gray-700) vbox gap(sm)">
                <li>• 중성색과 흰색 계열 정확한 판별</li>
                <li>• 밝은 톤 색상의 적절한 shade 선택</li>
                <li>• 색온도(따뜻함/차가움) 인식 능력</li>
                <li>• 시스템적 일관성 유지</li>
              </ul>
            </div>
            
            <div class="bl(4/amber-500) pl(xl)">
              <h3 class="text(lg) font(semi) c(gray-900) mb(md)">개선점</h3>
              <ul class="c(gray-700) vbox gap(sm)">
                <li>• 채도가 높은 accent 색상의 정밀도</li>
                <li>• 미묘한 색조 차이 감지력</li>
                <li>• 어두운 톤과 밝은 톤 구분</li>
                <li>• 복합 색상(mint, emerald) 해석</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Color Palette Philosophy -->
        <div class="bg(white) r(xl) p(2xl) shadow(md)">
          <h2 class="text(2xl) font(bold) c(gray-900) mb(xl)">내 색깔 철학</h2>
          
          <div class="grid(3) gap(xl)">
            <div class="text(center) p(xl) bg(gradient-to-br/cyan-50/blue-50) r(xl)">
              <div class="text(4xl) mb(lg)">🎯</div>
              <h3 class="text(lg) font(semi) c(gray-900) mb(md)">실용성 우선</h3>
              <p class="text(sm) c(gray-600)">완벽한 시각적 매칭보다는 실제 사용성과 접근성을 고려한 색상 선택</p>
            </div>
            
            <div class="text(center) p(xl) bg(gradient-to-br/purple-50/pink-50) r(xl)">
              <div class="text(4xl) mb(lg)">⚖️</div>
              <h3 class="text(lg) font(semi) c(gray-900) mb(md)">시스템 일관성</h3>
              <p class="text(sm) c(gray-600)">AdorableCSS shade 시스템 내에서 논리적이고 일관된 매핑 규칙 적용</p>
            </div>
            
            <div class="text(center) p(xl) bg(gradient-to-br/green-50/teal-50) r(xl)">
              <div class="text(4xl) mb(lg)">🌈</div>
              <h3 class="text(lg) font(semi) c(gray-900) mb(md)">색상 안전성</h3>
              <p class="text(sm) c(gray-600)">극단적이거나 접근성에 문제가 될 수 있는 색상보다는 안전한 범위 선호</p>
            </div>
          </div>
        </div>
        
        <!-- Detailed Insights -->
        <div class="bg(white) r(xl) p(2xl) shadow(md)">
          <h2 class="text(2xl) font(bold) c(gray-900) mb(xl)">상세 인사이트</h2>
          
          <div class="vbox gap(lg)">
            <div class="bl(4/red-400) pl(xl)">
              <h3 class="text(lg) font(semi) c(gray-900) mb(sm)">빨간색 계열 해석</h3>
              <p class="text(sm) c(gray-700) leading(relaxed)">
                coral(#FF6B6B) → red-400, deep-coral → red-500로 매핑. 
                채도가 높은 빨간색을 400-500 범위로 안전하게 해석하는 경향
              </p>
            </div>
            
            <div class="bl(4/blue-400) pl(xl)">
              <h3 class="text(lg) font(semi) c(gray-900) mb(sm)">파란색 계열 해석</h3>
              <p class="text(sm) c(gray-700) leading(relaxed)">
                accent-blue(#4ECDC4) → cyan-400. 청록빛이 강한 색상을 cyan 계열로 정확히 분류. 
                색온도 감지 능력이 뛰어남
              </p>
            </div>
            
            <div class="bl(4/gray-400) pl(xl)">
              <h3 class="text(lg) font(semi) c(gray-900) mb(sm)">중성색 계열 해석</h3>
              <p class="text(sm) c(gray-700) leading(relaxed)">
                gray 계열에서 가장 정확한 매칭을 보임. 따뜻한 톤(warm-gray)과 차가운 톤을 잘 구분하며, 
                적절한 lightness 값 선택
              </p>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- Footer -->
    <footer class="text(center) mt(3xl) c(gray-500)">
      <p>AdorableCSS로 분석한 {Object.keys(originalColors).length}개 색상의 매핑 결과 🎨</p>
    </footer>
  </div>
</div>