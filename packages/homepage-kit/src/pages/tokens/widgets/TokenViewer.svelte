<script lang="ts">
  import { registerToken, generateUsedTokensCSS, clearTokenRegistry, DEFAULT_SCALE_CONFIG } from 'adorable-css';
  
  // 모든 토큰 카테고리 정의
  const categories = {
    font: {
      title: 'Font Scale',
      description: 'Typography sizes with ratio-based scaling',
      tokens: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
      unit: 'px',
      baseToken: 'md'
    },
    spacing: {
      title: 'Spacing Scale',
      description: 'Margin, padding, gap with linear scaling',
      tokens: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
      unit: 'px',
      baseToken: 'md'
    },
    size: {
      title: 'Size Scale',
      description: 'Width, height, and general sizing',
      tokens: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
      unit: 'px',
      baseToken: 'md'
    },
    container: {
      title: 'Container Scale',
      description: 'Breakpoints and container widths',
      tokens: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      unit: 'px',
      baseToken: 'md'
    }
  };

  // 생성된 CSS 변수들
  let generatedCSS = '';
  let tokenValues: Record<string, Record<string, string>> = {};

  // 토큰 생성 및 CSS 변수 추출
  function generateAllTokens() {
    clearTokenRegistry();
    
    // 모든 토큰 등록
    Object.entries(categories).forEach(([category, config]) => {
      config.tokens.forEach(token => {
        registerToken(category as any, token);
      });
    });

    // CSS 생성
    const config = { ...DEFAULT_SCALE_CONFIG, unit: 'px' };
    generatedCSS = generateUsedTokensCSS(config);
    
    // 토큰 값 파싱
    parseTokenValues();
  }

  function parseTokenValues() {
    tokenValues = {};
    
    Object.keys(categories).forEach(category => {
      tokenValues[category] = {};
      const regex = new RegExp(`--${category}-([^:]+): ([^;]+);`, 'g');
      let match;
      
      while ((match = regex.exec(generatedCSS)) !== null) {
        tokenValues[category][match[1]] = match[2];
      }
    });
  }

  // 초기화
  generateAllTokens();
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

        <!-- Tokens Grid -->
        {#if categoryKey === 'font'}
          <!-- Font tokens - text preview -->
          <div class="grid gap(xl)" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
            {#each category.tokens as token}
              <div class="vbox gap(md) p(xl) border(2/gray-200) radius(lg) bg(white) hover:shadow(lg) transition">
                <div class="hbox(between) items(center)">
                  <span class="text(md) font(bold) c(gray-900)">font-{token}</span>
                  <span class="text(sm) c(gray-500) font(mono) bg(gray-100) px(sm) py(xs) radius(sm)">
                    {tokenValues[categoryKey]?.[token] || 'calc(...)'}
                  </span>
                </div>
                <div class="font({token}) c(gray-900) leading(tight)">
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
            {/each}
          </div>
        
        {:else if categoryKey === 'spacing'}
          <!-- Spacing tokens - visual bars -->
          <div class="vbox gap(lg)">
            {#each category.tokens as token}
              <div class="hbox(between) items(center) p(xl) border(2/gray-200) radius(lg) bg(white) hover:shadow(md) transition">
                <div class="hbox gap(xl) items(center)">
                  <span class="text(md) font(bold) c(gray-900) min-w(32)">spacing-{token}</span>
                  <div class="bg(blue-500) h(6) radius(sm)" style="width: var(--spacing-{token}, {token === 'xs' ? '4px' : token === 'sm' ? '8px' : token === 'md' ? '12px' : token === 'lg' ? '16px' : token === 'xl' ? '20px' : '24px'}); max-width: 200px;"></div>
                </div>
                <span class="text(sm) c(gray-500) font(mono) bg(gray-100) px(sm) py(xs) radius(sm)">
                  {tokenValues[categoryKey]?.[token] || 'calc(...)'}
                </span>
              </div>
            {/each}
          </div>

        {:else if categoryKey === 'size'}
          <!-- Size tokens - square boxes -->
          <div class="grid gap(xl)" style="grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));">
            {#each category.tokens as token}
              <div class="vbox gap(md) items(center) p(xl) border(2/gray-200) radius(lg) bg(white) hover:shadow(lg) transition">
                <span class="text(md) font(bold) c(gray-900)">size-{token}</span>
                <div class="bg(green-500) radius(md) shadow(sm)" style="width: var(--size-{token}, {token === 'xs' ? '16px' : token === 'sm' ? '24px' : token === 'md' ? '32px' : token === 'lg' ? '48px' : '64px'}); height: var(--size-{token}, {token === 'xs' ? '16px' : token === 'sm' ? '24px' : token === 'md' ? '32px' : token === 'lg' ? '48px' : '64px'});"></div>
                <span class="text(sm) c(gray-500) font(mono) bg(gray-100) px(sm) py(xs) radius(sm)">
                  {tokenValues[categoryKey]?.[token] || 'calc(...)'}
                </span>
              </div>
            {/each}
          </div>

        {:else if categoryKey === 'container'}
          <!-- Container tokens - width bars -->
          <div class="vbox gap(lg)">
            {#each category.tokens as token}
              <div class="vbox gap(md) p(xl) border(2/gray-200) radius(lg) bg(white) hover:shadow(md) transition">
                <div class="hbox(between) items(center)">
                  <span class="text(md) font(bold) c(gray-900)">container-{token}</span>
                  <span class="text(sm) c(gray-500) font(mono) bg(gray-100) px(sm) py(xs) radius(sm)">
                    {tokenValues[categoryKey]?.[token] || 'calc(...)'}
                  </span>
                </div>
                <div class="bg(purple-100) h(8) radius(md) relative overflow(hidden) shadow(inner)">
                  <div 
                    class="bg(purple-500) h(full) radius(md) shadow(sm)" 
                    style="width: var(--container-{token}, {token === 'xs' ? '20%' : token === 'sm' ? '30%' : token === 'md' ? '40%' : token === 'lg' ? '60%' : token === 'xl' ? '80%' : '100%'}); max-width: 100%;"
                  ></div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>

    <!-- Generated CSS Preview -->
    <div class="vbox gap(2xl) border-t(4/black) pt(4xl)">
      <div class="vbox gap(md)">
        <h3 class="display(xl) font(black) tracking(tight)">Generated CSS Variables</h3>
        <p class="text(lg) c(gray-600) max-w(3xl)">Copy these CSS variables to use in your project</p>
      </div>
      <div class="bg(gray-900) p(2xl) radius(lg) overflow(auto) border(2/gray-200) shadow(lg)">
        <pre class="text(sm) font(mono) c(green-300) whitespace(pre-wrap) leading(relaxed)">{generatedCSS}</pre>
      </div>
    </div>
  </div>
</div>

<style>
  /* CSS 변수가 아직 생성되지 않은 경우를 위한 fallback */
  :global(:root) {
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 12px;
    --spacing-lg: 16px;
    --spacing-xl: 20px;
    --spacing-2xl: 24px;
    --spacing-3xl: 32px;
    --spacing-4xl: 48px;
    --spacing-5xl: 64px;
    --spacing-6xl: 80px;
    
    --size-xs: 16px;
    --size-sm: 24px;
    --size-md: 32px;
    --size-lg: 48px;
    --size-xl: 64px;
    --size-2xl: 80px;
    --size-3xl: 96px;
    --size-4xl: 128px;
    --size-5xl: 160px;
    --size-6xl: 192px;
    
    --container-xs: 20%;
    --container-sm: 30%;
    --container-md: 40%;
    --container-lg: 60%;
    --container-xl: 80%;
    --container-2xl: 90%;
    --container-3xl: 95%;
    --container-4xl: 100%;
  }
</style>