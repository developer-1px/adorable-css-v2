<script lang="ts">
  import { registerToken, generateUsedTokensCSS, clearTokenRegistry, DEFAULT_SCALE_CONFIG, defaultTokens } from 'adorable-css';
  
  // 모든 토큰 카테고리 정의
  const categories = {
    font: {
      title: 'Font Scale',
      description: 'Typography sizes with ratio-based scaling',
      tokens: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      unit: 'px',
      baseToken: 'md'
    },
    spacing: {
      title: 'Spacing Scale',
      description: 'Margin, padding, gap with linear scaling',
      tokens: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      unit: 'px',
      baseToken: 'md'
    },
    size: {
      title: 'Size Scale',
      description: 'Width, height, and general sizing',
      tokens: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      unit: 'px',
      baseToken: 'md'
    },
    radius: {
      title: 'Border Radius Scale',
      description: 'Corner radius for rounded elements',
      tokens: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
      unit: 'px',
      baseToken: 'md'
    },
    shadow: {
      title: 'Shadow Scale',
      description: 'Box shadow depth and intensity',
      tokens: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      unit: '',
      baseToken: 'md'
    },
    container: {
      title: 'Container Scale',
      description: 'Breakpoints and container widths',
      tokens: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      unit: 'px',
      baseToken: 'md'
    }
  };

  // 생성된 CSS 변수들
  let generatedCSS = '';
  let tokenValues: Record<string, Record<string, string>> = {};
  let copyButtonText = 'Copy CSS';

  // 토큰 생성 및 CSS 변수 추출
  function generateAllTokens() {
    clearTokenRegistry();
    
    // 모든 토큰 등록
    Object.entries(categories).forEach(([category, config]) => {
      // radius와 shadow는 토큰이 아니라 디자인 시스템의 일부이므로 다르게 처리
      if (category === 'radius' || category === 'shadow') {
        // AdorableCSS의 디자인 토큰 시스템에서 처리됨
        return;
      }
      config.tokens.forEach(token => {
        registerToken(category as any, token);
      });
    });
    
    // display 컴포넌트가 사용하는 추가 토큰 등록 (6xl~11xl)
    ['6xl', '7xl', '8xl', '9xl', '10xl', '11xl'].forEach(token => {
      registerToken('font', token);
    });

    // CSS 생성
    const config = { ...DEFAULT_SCALE_CONFIG, unit: 'px' };
    let dynamicCSS = generateUsedTokensCSS(config);
    
    // radius와 shadow 토큰도 CSS에 추가
    const radiusTokens = Object.entries(defaultTokens.radius || {})
      .map(([key, value]) => `  --radius-${key}: ${value};`)
      .join('\n');
    
    const shadowTokens = Object.entries(defaultTokens.shadow || {})
      .map(([key, value]) => `  --shadow-${key}: ${value};`)
      .join('\n');
    
    // 전체 CSS 조합
    generatedCSS = dynamicCSS.replace(
      ':root {',
      `:root {\n\n  /* Border Radius Tokens */\n${radiusTokens}\n\n  /* Shadow Tokens */\n${shadowTokens}`
    );
    
    // 토큰 값 파싱
    parseTokenValues();
  }

  function parseTokenValues() {
    tokenValues = {};
    
    Object.keys(categories).forEach(category => {
      tokenValues[category] = {};
      
      if (category === 'radius') {
        // radius는 defaultTokens에서 가져옴
        tokenValues[category] = defaultTokens.radius || {};
      } else if (category === 'shadow') {
        // shadow는 defaultTokens에서 가져옴
        tokenValues[category] = defaultTokens.shadow || {};
      } else {
        const regex = new RegExp(`--${category}-([^:]+): ([^;]+);`, 'g');
        let match;
        
        while ((match = regex.exec(generatedCSS)) !== null) {
          tokenValues[category][match[1]] = match[2];
        }
      }
    });
  }

  // 초기화
  generateAllTokens();
  
  // Note: Dynamic class addition removed as it's now handled by CDN package
</script>

<div class="min-h(screen) bg(white)">
  <!-- Hero Section -->
  <section class="py(5xl) text(center) border-b(4/black)">
    <div class="vbox(center) gap(xl)">
      <h1 class="display(3xl) font(black) tracking(tighter)">
        DESIGN TOKENS
      </h1>
      <div class="vbox(center)">
        <p class="text(xl) font(medium) max-w(2xl) leading(relaxed)">
          Mathematical design scales.<br/>
          Consistent. Scalable. Beautiful.
        </p>
      </div>
    </div>
  </section>

  <!-- Introduction Section -->
  <section class="py(4xl) px(5xl) bg(gray-50)">
    <div class="max-w(4xl) mx(auto) vbox gap(2xl)">
      <div class="grid gap(3xl)" style="grid-template-columns: 1fr 1fr;">
        <div class="vbox gap(lg)">
          <h2 class="text(2xl) font(bold) c(gray-900)">What are Design Tokens?</h2>
          <p class="text(lg) c(gray-600) leading(relaxed)">
            Design tokens are the smallest pieces of a design system. They store values like colors, 
            typography, spacing, and sizes that ensure consistency across your entire application.
          </p>
        </div>
        <div class="vbox gap(lg)">
          <h2 class="text(2xl) font(bold) c(gray-900)">Mathematical Scaling</h2>
          <p class="text(lg) c(gray-600) leading(relaxed)">
            AdorableCSS uses mathematical formulas to generate harmonious scales. Font sizes follow 
            a 1.2 ratio, while spacing uses linear progression for predictable, beautiful results.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Token System Content -->
  <div class="vbox gap(5xl) p(5xl)">

  <!-- Token Categories -->
  <div class="vbox gap(5xl)">
    {#each Object.entries(categories) as [categoryKey, category] (categoryKey)}
      <div class="vbox gap(2xl) {categoryKey !== 'font' ? 'border-t(4/black) pt(4xl)' : ''}">
        <!-- Category Header -->
        <div class="vbox gap(md)">
          <h2 class="display(xl) font(black) tracking(tight)">{category.title}</h2>
          <p class="text(lg) c(gray-600) max-w(3xl)">{category.description}</p>
        </div>

        <!-- Tokens Display -->
        {#if categoryKey === 'font'}
          <!-- Font 02-design_tokens - table format for better readability -->
          <div class="border(2/gray-900) radius(lg) overflow(hidden)">
            <table class="w(full)">
              <thead class="bg(gray-900) c(white)">
                <tr>
                  <th class="text(left) p(lg) font(bold) text(sm) uppercase tracking(wider)">Token</th>
                  <th class="text(left) p(lg) font(bold) text(sm) uppercase tracking(wider)">Value</th>
                  <th class="text(left) p(lg) font(bold) text(sm) uppercase tracking(wider)">Preview</th>
                </tr>
              </thead>
              <tbody>
                {#each category.tokens as token, index}
                  <tr class="border-t(1/gray-200) hover:bg(gray-50) transition">
                    <td class="p(lg)">
                      <code class="font(mono) text(sm) bg(gray-100) px(sm) py(xs) radius(sm) c(gray-900)">font-{token}</code>
                    </td>
                    <td class="p(lg)">
                      <code class="font(mono) text(sm) c(gray-600)">{tokenValues[categoryKey]?.[token] || 'calc(...)'}</code>
                    </td>
                    <td class="p(lg)">
                      <p class="font({token}) c(gray-900) leading(normal) max-w(xl)">
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        
        {:else if categoryKey === 'spacing'}
          <!-- Spacing 02-design_tokens - horizontal visual comparison -->
          <div class="border(2/gray-900) radius(lg) overflow(hidden)">
            <div class="grid" style="grid-template-columns: 120px 80px 1fr auto;">
              <!-- Header -->
              <div class="grid-cols(span:4) grid grid(4) bg(gray-900) c(white) p(lg)">
                <div class="font(bold) text(sm) uppercase tracking(wider)">Token</div>
                <div class="font(bold) text(sm) uppercase tracking(wider)">Value</div>
                <div class="font(bold) text(sm) uppercase tracking(wider)">Visual</div>
                <div class="font(bold) text(sm) uppercase tracking(wider) text(right)">Usage</div>
              </div>
              
              {#each category.tokens as token, index}
                <div class="grid-cols(span:4) grid grid(4) items(center) p(lg) {index > 0 ? 'border-t(1/gray-200)' : ''} hover:bg(gray-50) transition">
                  <div>
                    <code class="font(mono) text(sm) bg(gray-100) px(sm) py(xs) radius(sm) c(gray-900)">spacing-{token}</code>
                  </div>
                  <div>
                    <code class="font(mono) text(sm) c(gray-600)">{tokenValues[categoryKey]?.[token] || '...'}</code>
                  </div>
                  <div class="relative">
                    <div class="bg(gray-200) h(32) radius(sm) overflow(hidden)">
                      <div class="bg(blue-500) h(full) radius(sm) shadow(sm) relative" style="width: var(--spacing-{token});">
                        <div class="absolute right(0) top(50%) translate-y(-50%) w(1) h(full) bg(blue-700)"></div>
                      </div>
                    </div>
                  </div>
                  <div class="text(right)">
                    <code class="font(mono) text(xs) c(gray-500)">p({token})</code>
                  </div>
                </div>
              {/each}
            </div>
          </div>

        {:else if categoryKey === 'size'}
          <!-- Size 02-design_tokens - visual grid with context -->
          <div class="grid gap(2xl)" style="grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));">
            {#each category.tokens as token}
              <div class="vbox gap(lg) p(xl) border(2/gray-900) radius(lg) bg(white) hover:shadow(xl) hover:scale(1.02) transition group">
                <!-- Token info -->
                <div class="vbox gap(xs)">
                  <code class="font(mono) text(sm) font(bold) c(gray-900)">size-{token}</code>
                  <code class="font(mono) text(xs) c(gray-600)">{tokenValues[categoryKey]?.[token] || '...'}</code>
                </div>
                
                <!-- Visual representation -->
                <div class="hbox(center) items(center) h(120) bg(gray-100) radius(md) relative overflow(hidden)">
                  <div 
                    class="bg(green-500) radius(sm) shadow(md) group-hover:bg(green-600) transition relative"
                    style="width: var(--size-{token}); height: var(--size-{token});"
                  >
                    <!-- Size indicator lines -->
                    <div class="absolute bottom(-20) left(0) w(full) h(1) bg(gray-400)"></div>
                    <div class="absolute right(-20) top(0) w(1) h(full) bg(gray-400)"></div>
                  </div>
                </div>
                
                <!-- Usage example -->
                <code class="font(mono) text(xs) c(gray-500) text(center)">w({token}) h({token})</code>
              </div>
            {/each}
          </div>

        {:else if categoryKey === 'container'}
          <!-- Container 02-design_tokens - responsive width visualization -->
          <div class="vbox gap(xl)">
            <!-- Viewport reference -->
            <div class="hbox gap(xl) items(center) p(lg) bg(gray-100) radius(lg) text(sm) c(gray-600)">
              <div class="hbox gap(sm) items(center)">
                <div class="w(4) h(4) bg(blue-500) radius(full)"></div>
                <span>Mobile: 375px</span>
              </div>
              <div class="hbox gap(sm) items(center)">
                <div class="w(4) h(4) bg(green-500) radius(full)"></div>
                <span>Tablet: 768px</span>
              </div>
              <div class="hbox gap(sm) items(center)">
                <div class="w(4) h(4) bg(purple-500) radius(full)"></div>
                <span>Desktop: 1200px</span>
              </div>
            </div>
            
            <!-- Container 02-design_tokens -->
            <div class="vbox gap(lg)">
              {#each category.tokens as token, index}
                <div class="vbox gap(lg) p(xl) border(2/gray-900) radius(lg) bg(white) hover:shadow(lg) transition">
                  <!-- Token info -->
                  <div class="hbox(between) items(center)">
                    <div class="hbox gap(xl) items(baseline)">
                      <code class="font(mono) text(lg) font(bold) c(gray-900)">container-{token}</code>
                      <code class="font(mono) text(md) c(gray-600)">{tokenValues[categoryKey]?.[token] || '...'}</code>
                    </div>
                    <code class="font(mono) text(sm) c(gray-500)">max-w({token})</code>
                  </div>
                  
                  <!-- Visual representation with viewport markers -->
                  <div class="relative">
                    <div class="bg(gray-200) h(40) radius(md) relative overflow(hidden)">
                      <!-- Container width -->
                      <div 
                        class="bg(purple-500) h(full) radius(md) shadow(md) relative"
                        style="width: min(var(--container-{token}), 100%);"
                      >
                        <div class="absolute right(0) top(0) h(full) w(2) bg(purple-700)"></div>
                      </div>
                      
                      <!-- Viewport markers -->
                      <div class="absolute top(0) h(full) w(1) bg(blue-500.5)" style="left: 31.25%;"></div>
                      <div class="absolute top(0) h(full) w(1) bg(green-500.5)" style="left: 64%;"></div>
                    </div>
                    
                    <!-- Labels -->
                    <div class="hbox(between) mt(xs) text(xs) c(gray-500)">
                      <span>0</span>
                      <span>1200px</span>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>

        {:else if categoryKey === 'radius'}
          <!-- Border Radius 02-design_tokens - visual examples -->
          <div class="grid gap(xl)" style="grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));">
            {#each category.tokens as token}
              <div class="vbox gap(md) p(xl) border(2/gray-900) radius(lg) bg(white) hover:shadow(lg) transition">
                <!-- Token info -->
                <div class="vbox gap(xs) text(center)">
                  <code class="font(mono) text(sm) font(bold) c(gray-900)">radius-{token}</code>
                  <code class="font(mono) text(xs) c(gray-600)">{tokenValues[categoryKey]?.[token] || '...'}</code>
                </div>
                
                <!-- Visual example -->
                <div class="hbox(center) items(center)">
                  <div 
                    class="w(80) h(80) bg(blue-500) shadow(md)"
                    style="border-radius: {tokenValues[categoryKey]?.[token] || '8px'};"
                  ></div>
                </div>
                
                <!-- Usage -->
                <code class="font(mono) text(xs) c(gray-500) text(center)">r({token})</code>
              </div>
            {/each}
          </div>

        {:else if categoryKey === 'shadow'}
          <!-- Shadow 02-design_tokens - visual examples -->
          <div class="grid gap(xl)" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
            {#each category.tokens as token}
              <div class="vbox gap(lg) p(xl) border(2/gray-900) radius(lg) bg(white) hover:shadow(xl) transition">
                <!-- Token info -->
                <div class="vbox gap(xs) text(center)">
                  <code class="font(mono) text(sm) font(bold) c(gray-900)">shadow-{token}</code>
                  <code class="font(mono) text(xs) c(gray-500) max-w(full) truncate px(sm)">{tokenValues[categoryKey]?.[token] || '...'}</code>
                </div>
                
                <!-- Visual example -->
                <div class="hbox(center) items(center) py(xl)">
                  <div 
                    class="w(100) h(100) bg(white) radius(lg) border(1/gray-200)"
                    style="box-shadow: {tokenValues[categoryKey]?.[token] || '0 4px 6px rgba(0,0,0,0.1)'};"
                  ></div>
                </div>
                
                <!-- Usage -->
                <code class="font(mono) text(xs) c(gray-500) text(center)">shadow({token})</code>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>

    <!-- Generated CSS Preview -->
    <div class="vbox gap(3xl) border-t(4/black) pt(5xl)">
      <!-- Section Header -->
      <div class="vbox gap(lg) text(center)">
        <h2 class="display(xl) font(black) tracking(tight)">GENERATED CSS</h2>
        <p class="text(xl) c(gray-600) max-w(3xl) mx(auto)">
          Copy these CSS variables to use in your project. All values are calculated using our mathematical scaling system.
        </p>
      </div>
      
      <!-- Code Preview -->
      <div class="relative group">
        <div class="bg(gray-900) p(3xl) radius(xl) overflow(auto) border(2/black) shadow(2xl) max-h(600)">
          <pre class="text(sm) font(mono) c(green-400) whitespace(pre) leading(loose) selection:bg(green-400.2)">{generatedCSS}</pre>
        </div>
        
        <!-- Copy Button -->
        <button 
          class="absolute top(xl) right(xl) px(lg) py(md) bg(white) c(gray-900) radius(md) font(mono) text(sm) font(bold) shadow(lg) hover:bg(gray-100) active:scale(0.95) transition opacity(0) group-hover:opacity(100)"
          on:click={() => {
            navigator.clipboard.writeText(generatedCSS);
            copyButtonText = 'Copied!';
            setTimeout(() => {
              copyButtonText = 'Copy CSS';
            }, 2000);
          }}
        >
          {copyButtonText}
        </button>
      </div>
    </div>
  </div>
</div>