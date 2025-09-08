<script lang="ts">
  // Remove defaultTokens import - using hardcoded values instead
  
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
      description: 'Width, height, and general dimensions',
      tokens: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      unit: 'px',
      baseToken: 'md'
    },
    container: {
      title: 'Container Scale',
      description: 'Container widths for layouts',
      tokens: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      unit: 'px',
      baseToken: 'md'
    },
    radius: {
      title: 'Border Radius',
      description: 'Corner radius values',
      tokens: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
      unit: '',
      baseToken: 'md'
    },
    shadow: {
      title: 'Box Shadow',
      description: 'Shadow elevation styles',
      tokens: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'inner', 'card', 'hover'],
      unit: '',
      baseToken: 'md'
    }
  };

  // Static token values based on design system
  const staticTokenValues = {
    font: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
      '4xl': '6rem',
      '5xl': '8rem'
    },
    size: {
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem'
    },
    container: {
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem'
    },
    radius: {
      'none': '0px',
      'sm': '0.125rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      'full': '9999px'
    },
    shadow: {
      'sm': '0 2px 4px -1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
      'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
      'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
      'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)'
    }
  };

  // 생성된 CSS 변수들
  let generatedCSS = '';
  let tokenValues = staticTokenValues;
  let copyButtonText = 'Copy CSS';

  // CSS 생성
  function generateCSS() {
    const cssVars: string[] = [':root {'];
    
    Object.entries(tokenValues).forEach(([category, tokens]) => {
      cssVars.push(`\n  /* ${categories[category as keyof typeof categories]?.title || category} */`);
      Object.entries(tokens).forEach(([token, value]) => {
        cssVars.push(`  --${category}-${token}: ${value};`);
      });
    });
    
    cssVars.push('}');
    generatedCSS = cssVars.join('\n');
  }

  // 초기화
  generateCSS();
  
  function getPreviewStyle(category: string, value: string): string {
    switch (category) {
      case 'font':
        return `font-size: ${value}`;
      case 'spacing':
        return `width: ${value}; height: ${value}; background: var(--violet-500)`;
      case 'size':
      case 'container':
        return `width: ${value}; height: 2rem; background: var(--blue-500)`;
      case 'radius':
        return `width: 3rem; height: 3rem; background: var(--indigo-500); border-radius: ${value}`;
      case 'shadow':
        return `width: 3rem; height: 3rem; background: white; box-shadow: ${value}`;
      default:
        return '';
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(generatedCSS).then(() => {
      copyButtonText = 'Copied!';
      setTimeout(() => {
        copyButtonText = 'Copy CSS';
      }, 2000);
    });
  }
</script>

<div class="vbox(gap-2xl) px(2xl) py(3xl)">
  <div class="vbox(gap-lg)">
    <h1 class="text(3xl) font(bold) c(gray-900)">Design Token Viewer</h1>
    <p class="text(lg) c(gray-600)">
      Interactive preview of all design tokens used in AdorableCSS
    </p>
  </div>

  <div class="grid(3) gap(xl) w(full)">
    {#each Object.entries(categories) as [categoryKey, category]}
      <div class="vbox(stretch) p(xl) r(lg) bg(white) shadow(md) b(1) b(gray-200)">
        <h3 class="text(xl) font(semibold) c(gray-900) mb(sm)">{category.title}</h3>
        <p class="text(sm) c(gray-600) mb(lg)">{category.description}</p>
        
        <div class="vbox(gap-sm) text(sm)">
          {#each category.tokens as token}
            {@const value = tokenValues[categoryKey]?.[token] || ''}
            <div class="hbox(stretch) gap(lg) p(sm) r(md) bg(gray-50) hover:bg(gray-100) transition">
              <span class="font(mono) c(gray-700) w(4rem)">{token}</span>
              <span class="font(mono) c(gray-500) flex(1)">{value}</span>
              {#if value}
                <div class="w(3rem) h(3rem) r(md)" style={getPreviewStyle(categoryKey, value)}></div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <div class="vbox(gap-lg) mt(xl)">
    <div class="hbox(stretch)">
      <h2 class="text(2xl) font(bold) c(gray-900)">Generated CSS Variables</h2>
      <button 
        class="button ~primary px(lg) py(sm)"
        on:click={copyToClipboard}
      >
        {copyButtonText}
      </button>
    </div>
    
    <pre class="p(xl) r(lg) bg(gray-900) c(gray-100) overflow-x(auto) text(sm) font(mono)"><code>{generatedCSS}</code></pre>
  </div>
</div>

<style>
  pre {
    white-space: pre;
    word-wrap: normal;
  }
  
  code {
    display: block;
  }
</style>