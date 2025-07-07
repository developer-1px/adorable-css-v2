<script lang="ts">
  import { defaultTokens, generateFontCalc } from 'adorable-css';
  
  // Typography Primitive Components from AdorableCSS
  const typographyComponents = [
    {
      name: 'Display',
      description: 'Maximum visual impact for heroes and marketing',
      baseStyles: 'balance text-wrap',
      sizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', 'hero', 'banner', 'splash'],
      variants: ['light', 'thin', 'gradient', 'rainbow', 'chrome', 'serif', 'mono', 'shadow', 'outline', 'glow', 'split'],
      usage: 'Hero sections, landing pages, marketing banners',
      example: 'display(hero) display(gradient)'
    },
    {
      name: 'Heading',
      description: 'Semantic HTML headings for document structure',
      baseStyles: 'c(gray-900) relative position',
      sizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      variants: ['muted', 'primary', 'gradient', 'rainbow', 'serif', 'mono', 'underline', 'shadow', 'outline'],
      usage: 'Page titles, section headers, document structure',
      example: 'heading(h1) heading(primary)'
    },
    {
      name: 'Title',
      description: 'Component identification and labeling',
      baseStyles: 'c(gray-900)',
      sizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', 'card', 'modal', 'section'],
      variants: ['muted', 'primary', 'gradient', 'serif', 'mono', 'truncate', 'clamp', 'underline'],
      usage: 'Card titles, modal headers, section names',
      example: 'title(card) title(truncate)'
    },
    {
      name: 'Body', 
      description: 'Optimized for reading and content consumption',
      baseStyles: 'c(secondary) transition-colors',
      sizes: ['xs', 'sm', 'base', 'lg', 'xl', 'article', 'prose', 'compact', 'relaxed'],
      variants: ['muted', 'secondary', 'primary', 'success', 'warning', 'danger', 'serif', 'mono', 'contrast', 'soft', 'lead', 'quote', 'highlight'],
      usage: 'Articles, paragraphs, long-form content',
      example: 'body(prose) body(serif)'
    },
    {
      name: 'Label',
      description: 'Functional UI text for interactive elements',
      baseStyles: 'c(secondary) select-none',
      sizes: ['xs', 'sm', 'base', 'lg', 'xl', 'button', 'input', 'tab', 'badge', 'tooltip'],
      variants: ['muted', 'primary', 'strong', 'subtle', 'mono', 'uppercase', 'capitalize', 'required', 'optional', 'helper', 'clickable'],
      usage: 'Form labels, button text, UI elements',
      example: 'label(button) label(uppercase)'
    },
    {
      name: 'Caption',
      description: 'Supplementary information and metadata',
      baseStyles: 'c(mute)',
      sizes: ['xs', 'sm', 'base', 'lg', 'figure', 'table', 'form', 'hint', 'timestamp'],
      variants: ['muted', 'primary', 'success', 'warning', 'danger', 'info', 'italic', 'serif', 'mono', 'error', 'help', 'note', 'inline', 'block', 'floating'],
      usage: 'Image captions, help text, timestamps',
      example: 'caption(figure) caption(italic)'
    },
    {
      name: 'Code',
      description: 'Code snippets and technical content',
      baseStyles: 'mono',
      sizes: ['xs', 'sm', 'md', 'lg', 'base', 'inline', 'block', 'minimal'],
      variants: ['primary', 'success', 'warning', 'error'],
      usage: 'Inline code, code blocks, technical documentation',
      example: 'code(inline) code(primary)'
    }
  ];

  // Font size scales - now using dynamic calc system
  const fontSizeTokens = ['4xs', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
  const fontSizes = fontSizeTokens.map(size => ({
    name: size,
    value: generateFontCalc(size),
    class: `text(${size})`,
    usage: getFontSizeUsage(size)
  }));

  // Font weights from adorable-css
  const fontWeights = Object.entries(defaultTokens.fontWeight).map(([weight, value]) => ({
    name: weight,
    value,
    class: `bold(${weight})`,
    usage: getFontWeightUsage(weight)
  }));

  // Line heights from adorable-css
  const lineHeights = Object.entries(defaultTokens.lineHeight).map(([height, value]) => ({
    name: height,
    value,
    class: `leading(${height})`,
    usage: getLineHeightUsage(height)
  }));

  // Letter spacing from adorable-css
  const letterSpacings = Object.entries(defaultTokens.letterSpacing).map(([spacing, value]) => ({
    name: spacing,
    value,
    class: `tracking(${spacing})`,
    usage: getLetterSpacingUsage(spacing)
  }));

  // Text hierarchy - common text color patterns
  const textHierarchyData = {
    'primary': 'gray-900',
    'secondary': 'gray-700', 
    'muted': 'gray-500',
    'disabled': 'gray-400',
    'placeholder': 'gray-400',
    'success': 'emerald-600',
    'warning': 'amber-600',
    'error': 'red-600',
    'info': 'blue-600'
  };

  const textHierarchy = Object.entries(textHierarchyData).map(([token, color]) => ({
    name: getTextHierarchyName(token),
    token,
    color,
    class: `c(${color})`,
    usage: getTextHierarchyUsage(token)
  }));

  function getFontSizeUsage(size: string): string {
    const usageMap: Record<string, string> = {
      '4xs': 'Micro text, legal disclaimers',
      '3xs': 'Ultra small labels',
      '2xs': 'Very small captions',
      'xs': 'Small labels, captions',
      'sm': 'Secondary text, small UI',
      'md': 'Body text (default)',
      'lg': 'Large body text',
      'xl': 'Small headings',
      '2xl': 'Medium headings',
      '3xl': 'Large headings',
      '4xl': 'Display text',
      '5xl': 'Hero text',
      '6xl': 'Large hero text',
      '7xl': 'Extra large display',
      '8xl': 'Massive display',
      '9xl': 'Ultra large display'
    };
    return usageMap[size] || 'Custom usage';
  }

  function getFontWeightUsage(weight: string): string {
    const usageMap: Record<string, string> = {
      'thin': 'Ultra light decorative text',
      'extralight': 'Very light text',
      'light': 'Light body text',
      'normal': 'Regular body text',
      'medium': 'Emphasized text',
      'semi': 'Subheadings',
      'bold': 'Headings, strong emphasis',
      'extra': 'Heavy emphasis',
      'black': 'Maximum impact text'
    };
    return usageMap[weight] || 'Custom usage';
  }

  function getLineHeightUsage(height: string): string {
    const usageMap: Record<string, string> = {
      'none': 'Tight headings, display text',
      'tight': 'Compact headings',
      'snug': 'Subheadings',
      'normal': 'Body text (default)',
      'relaxed': 'Comfortable reading',
      'loose': 'Spacious text blocks'
    };
    return usageMap[height] || 'Custom usage';
  }

  function getLetterSpacingUsage(spacing: string): string {
    const usageMap: Record<string, string> = {
      'tighter': 'Compact display text',
      'tight': 'Condensed headings',
      'normal': 'Regular text (default)',
      'wide': 'Spaced headings',
      'wider': 'Loose display text',
      'widest': 'Ultra wide spacing'
    };
    return usageMap[spacing] || 'Custom usage';
  }

  function getTextHierarchyName(token: string): string {
    const nameMap: Record<string, string> = {
      'primary': 'Primary Text',
      'secondary': 'Secondary Text', 
      'muted': 'Muted Text',
      'disabled': 'Disabled Text',
      'placeholder': 'Placeholder Text',
      'success': 'Success Text',
      'warning': 'Warning Text',
      'error': 'Error Text',
      'info': 'Info Text'
    };
    return nameMap[token] || token;
  }

  function getTextHierarchyUsage(token: string): string {
    const usageMap: Record<string, string> = {
      'primary': 'Main headings, important content',
      'secondary': 'Subheadings, secondary content',
      'muted': 'Body text, descriptions',
      'disabled': 'Disabled states, inactive text',
      'placeholder': 'Form placeholders, hints',
      'success': 'Success messages, confirmations',
      'warning': 'Warning messages, cautions',
      'error': 'Error messages, validation',
      'info': 'Information messages, tips'
    };
    return usageMap[token] || 'Custom usage';
  }

  function copyTypographyCSS() {
    const css = `/* AdorableCSS Typography Foundation */
:root {
  /* Typography scales */
  ${Object.entries(defaultTokens.font).map(([size, value]) => `  --font-${size}: ${value};`).join('\n')}
  
  /* Font weights */
  ${Object.entries(defaultTokens.fontWeight).map(([weight, value]) => `  --font-weight-${weight}: ${value};`).join('\n')}
  
  /* Line heights */
  ${Object.entries(defaultTokens.lineHeight).map(([height, value]) => `  --line-height-${height}: ${value};`).join('\n')}
  
  /* Letter spacing */
  ${Object.entries(defaultTokens.letterSpacing).map(([spacing, value]) => `  --letter-spacing-${spacing}: ${value};`).join('\n')}
}`;
    
    navigator.clipboard.writeText(css);
  }
</script>

<!-- Documentation Page Container -->
<div class="prose(documentation) max-w(none) mx(auto) py(6xl)">
  <div class="container(7xl) mx(auto) px(3xl)">
    
    <!-- Header Section -->
    <header class="vbox gap(4xl) mb(8xl) text(center)">
      <div class="vbox gap(lg)">
        <h1 class="display(3xl) bold(black) tracking(tight) c(gray-900)">
          Typography Foundation
        </h1>
        
        <p class="body(xl) c(gray-600) max-w(4xl) mx(auto) leading(relaxed)">
          A comprehensive typography system built on design tokens, semantic hierarchy, 
          and accessibility principles. From micro-interactions to large displays, 
          every text element serves a purpose.
        </p>
      </div>
      
      <!-- Quick Stats -->
      <div class="hbox(center) gap(6xl) pt(3xl)">
        <div class="vbox gap(sm) text(center)">
          <div class="title(2xl) bold(700) c(primary)">{fontSizeTokens.length}</div>
          <div class="caption(sm) uppercase tracking(wide) c(gray-500)">Font Sizes</div>
        </div>
        <div class="vbox gap(sm) text(center)">
          <div class="title(2xl) bold(700) c(primary)">{Object.keys(defaultTokens.fontWeight).length}</div>
          <div class="caption(sm) uppercase tracking(wide) c(gray-500)">Font Weights</div>
        </div>
        <div class="vbox gap(sm) text(center)">
          <div class="title(2xl) bold(700) c(primary)">7</div>
          <div class="caption(sm) uppercase tracking(wide) c(gray-500)">Components</div>
        </div>
      </div>
    </header>

    <!-- Table of Contents -->
    <nav class="vbox gap(lg) p(3xl) bg(gray-50) r(lg) mb(6xl)">
      <h2 class="title(lg) bold(600) c(gray-900)">목차 (Table of Contents)</h2>
      <div class="grid(2) gap(2xl)">
        <div class="vbox gap(md)">
          <a href="#overview" class="body(base) c(blue-600) hover:c(blue-800) transition">1. Typography System Overview</a>
          <a href="#components" class="body(base) c(blue-600) hover:c(blue-800) transition">2. Typography Components</a>
          <a href="#scale" class="body(base) c(blue-600) hover:c(blue-800) transition">3. Font Scale & Tokens</a>
          <a href="#hierarchy" class="body(base) c(blue-600) hover:c(blue-800) transition">4. Text Hierarchy</a>
        </div>
        <div class="vbox gap(md)">
          <a href="#examples" class="body(base) c(blue-600) hover:c(blue-800) transition">5. Real-world Examples</a>
          <a href="#guidelines" class="body(base) c(blue-600) hover:c(blue-800) transition">6. Usage Guidelines</a>
          <a href="#accessibility" class="body(base) c(blue-600) hover:c(blue-800) transition">7. Accessibility</a>
          <a href="#implementation" class="body(base) c(blue-600) hover:c(blue-800) transition">8. Implementation</a>
        </div>
      </div>
    </nav>

    <!-- Overview Section -->
    <section id="overview" class="vbox gap(4xl) mb(8xl)">
      <div class="vbox gap(lg)">
        <h2 class="heading(2xl) bold(700) c(gray-900) tracking(tight)">Typography System Overview</h2>
        <p class="body(lg) c(gray-600) leading(relaxed)">
          우리의 타이포그래피 시스템은 7개의 전문화된 컴포넌트를 기반으로 구축되었습니다. 
          각 컴포넌트는 특정한 목적과 사용 사례를 가지며, 일관된 계층구조와 가독성을 제공합니다.
        </p>
      </div>
      
      <div class="vbox gap(3xl) p(3xl) bg(blue-50) border(1/blue-200) r(lg)">
        <h3 class="title(lg) bold(600) c(blue-900)">💡 Design Principles</h3>
        <div class="grid(2) gap(3xl)">
          <div class="vbox gap(lg)">
            <h4 class="title(base) bold(600) c(gray-900)">Semantic Hierarchy</h4>
            <p class="body(base) c(gray-700)">각 텍스트 요소는 명확한 의미와 역할을 가집니다.</p>
            
            <h4 class="title(base) bold(600) c(gray-900)">Mathematical Scale</h4>
            <p class="body(base) c(gray-700)">수학적 비율을 기반으로 한 일관된 크기 체계입니다.</p>
          </div>
          <div class="vbox gap(lg)">
            <h4 class="title(base) bold(600) c(gray-900)">Accessibility First</h4>
            <p class="body(base) c(gray-700)">모든 사용자가 쉽게 읽을 수 있도록 설계되었습니다.</p>
            
            <h4 class="title(base) bold(600) c(gray-900)">Token-based</h4>
            <p class="body(base) c(gray-700)">디자인 토큰을 통해 일관성과 유지보수성을 보장합니다.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Typography Components Overview -->
    <section id="components" class="vbox gap(6xl) mb(8xl)">
      <div class="vbox gap(lg)">
        <h2 class="heading(2xl) bold(700) c(gray-900) tracking(tight)">
          Typography Components
        </h2>
        <p class="body(lg) c(gray-600) leading(relaxed) max-w(4xl)">
          7개의 전문화된 타이포그래피 컴포넌트로 모든 텍스트 요구사항을 충족합니다. 
          각 컴포넌트는 고유한 목적과 다양한 크기, 변형을 제공합니다.
        </p>
      </div>
      
      <div class="vbox gap(6xl)">
        {#each typographyComponents as component, index}
          <div class="vbox gap(4xl) p(4xl) bg(white) border(1/gray-200) r(xl) shadow(sm)">
            <!-- Component Header -->
            <div class="vbox gap(lg)">
              <div class="hbox(baseline) gap(lg)">
                <span class="caption(sm) bold(600) uppercase tracking(wide) c(gray-500) bg(gray-100) px(md) py(xs) r(md)">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 class="title(xl) bold(700) c(gray-900)">
                  {component.name}
                </h3>
              </div>
              <p class="body(base) c(gray-600)">
                {component.description}
              </p>
              
              <!-- Usage Info -->
              <div class="hbox gap(2xl)">
                <div class="vbox gap(xs)">
                  <span class="caption(xs) uppercase tracking(wide) c(gray-500)">사용 예시</span>
                  <code class="code(sm) c(blue-600)">{component.example}</code>
                </div>
                <div class="vbox gap(xs)">
                  <span class="caption(xs) uppercase tracking(wide) c(gray-500)">주요 용도</span>
                  <span class="caption(sm) c(gray-700)">{component.usage}</span>
                </div>
              </div>
            </div>
            
            <!-- Sizes Scale -->
            <div class="vbox gap(lg)">
              <h4 class="title(base) bold(600) c(gray-900)">크기 변형 (Sizes)</h4>
              <div class="grid(1) gap(lg) p(lg) bg(gray-50) r(md)">
                {#each component.sizes.slice(0, 6) as size}
                  <div class="hbox(baseline) gap(lg) py(xs)">
                    <code class="code(xs) c(gray-500) w(4xl) text(right)">{size}</code>
                    {#if component.name === 'Display'}
                      <div class="display({size}) c(gray-900)">Display {size}</div>
                    {:else if component.name === 'Heading'}
                      <div class="heading({size}) c(gray-900)">Heading {size}</div>
                    {:else if component.name === 'Title'}
                      <div class="title({size}) c(gray-900)">Title {size}</div>
                    {:else if component.name === 'Body'}
                      <div class="body({size}) c(gray-800)">Body text in {size} size</div>
                    {:else if component.name === 'Label'}
                      <div class="label({size}) c(gray-700)">Label {size}</div>
                    {:else if component.name === 'Caption'}
                      <div class="caption({size}) c(gray-600)">Caption {size}</div>
                    {:else if component.name === 'Code'}
                      <code class="code({size}) c(gray-800)">code({size})</code>
                    {/if}
                  </div>
                {/each}
                {#if component.sizes.length > 6}
                  <div class="caption(sm) c(gray-500) italic">... 및 {component.sizes.length - 6}개 추가 크기</div>
                {/if}
              </div>
            </div>
            
            <!-- Variants -->
            <div class="vbox gap(lg)">
              <h4 class="title(base) bold(600) c(gray-900)">스타일 변형 (Variants)</h4>
              <div class="grid(3) gap(lg)">
                {#each component.variants.slice(0, 9) as variant}
                  <div class="vbox gap(xs) p(md) bg(gray-50) r(md)">
                    <code class="code(xs) c(gray-500)">{variant}</code>
                    {#if component.name === 'Display'}
                      <div class="display(lg) display({variant})">Display</div>
                    {:else if component.name === 'Heading'}
                      <h3 class="heading(h3) heading({variant})">Heading</h3>
                    {:else if component.name === 'Title'}
                      <div class="title(lg) title({variant})">Title Text</div>
                    {:else if component.name === 'Body'}
                      <p class="body(base) body({variant})">Body text</p>
                    {:else if component.name === 'Label'}
                      <span class="label(base) label({variant})">Label</span>
                    {:else if component.name === 'Caption'}
                      <span class="caption(base) caption({variant})">Caption</span>
                    {:else if component.name === 'Code'}
                      <code class="code(base) code({variant})">code</code>
                    {/if}
                  </div>
                {/each}
                {#if component.variants.length > 9}
                  <div class="caption(sm) c(gray-500) italic">... 및 {component.variants.length - 9}개 추가 변형</div>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Font Scale & Tokens -->
    <section id="scale" class="vbox gap(6xl) mb(8xl)">
      <div class="vbox gap(lg)">
        <h2 class="heading(2xl) bold(700) c(gray-900) tracking(tight)">
          Font Scale & Design Tokens
        </h2>
        <p class="body(lg) c(gray-600) leading(relaxed) max-w(4xl)">
          수학적 비율을 기반으로 한 {fontSizeTokens.length}개의 폰트 크기와 
          {Object.keys(defaultTokens.fontWeight).length}개의 폰트 굵기로 구성된 토큰 시스템입니다.
        </p>
      </div>
      
      <div class="grid(2) gap(6xl)">
        <!-- Font Sizes -->
        <div class="vbox gap(3xl)">
          <h3 class="title(lg) bold">Font Sizes</h3>
          <div class="vbox gap(2xl)">
            {#each fontSizes as fontSize}
              <div class="hbox(baseline) gap(4xl)">
                <code class="font(xs) font(mono) c(mute) w(4xl)">{fontSize.name}</code>
                <div class="{fontSize.class} c(black) leading(tight)">
                  Aa
                </div>
                <code class="font(xs) font(mono) c(mute.60)" style="font-size: 0.65rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 300px;">{fontSize.value}</code>
              </div>
            {/each}
          </div>
        </div>
        
        <!-- Font Weights -->
        <div class="vbox gap(3xl)">
          <h3 class="title(lg) bold">Font Weights</h3>
          <div class="vbox gap(2xl)">
            {#each fontWeights as fontWeight}
              <div class="hbox(center) gap(4xl)">
                <code class="font(xs) font(mono) c(mute) w(5xl)">{fontWeight.name}</code>
                <div class="font(2xl) {fontWeight.class} c(black)">
                  Aa
                </div>
                <code class="font(xs) font(mono) c(mute.60)">{fontWeight.value}</code>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <!-- Text Hierarchy -->
    <section id="hierarchy" class="vbox gap(6xl) mb(8xl)">
      <div class="vbox gap(lg)">
        <h2 class="heading(2xl) bold(700) c(gray-900) tracking(tight)">
          Text Hierarchy & Color System
        </h2>
        <p class="body(lg) c(gray-600) leading(relaxed) max-w(4xl)">
          명확한 정보 계층구조를 위한 텍스트 색상 시스템입니다. 
          각 색상은 특정한 의미와 중요도를 나타냅니다.
        </p>
      </div>
      
      <div class="grid(2) gap(3xl)">
        {#each textHierarchy as textType}
          <div class="hbox(baseline) gap(lg) p(lg) bg(white) border(1/gray-200) r(md)">
            <code class="code(xs) c(gray-500) w(8xl)">{textType.token}</code>
            <div class="{textType.class} body(base)">{textType.name}</div>
            <span class="caption(xs) c(gray-500)">({textType.usage})</span>
          </div>
        {/each}
      </div>
    </section>

    <!-- Real-world Examples -->
    <section id="examples" class="vbox gap(6xl) mb(8xl)">
      <div class="vbox gap(lg)">
        <h2 class="heading(2xl) bold(700) c(gray-900) tracking(tight)">
          Real-world Examples
        </h2>
        <p class="body(lg) c(gray-600) leading(relaxed) max-w(4xl)">
          다양한 타이포그래피 컴포넌트를 조합한 실제 사용 사례들입니다.
        </p>
      </div>
      
      <div class="vbox gap(4xl)">
        <!-- Hero Section -->
        <div class="vbox gap(3xl) p(3xl) bg(gray-50) border(1/gray-200) r(lg)">
          <div class="caption(sm) bold(600) uppercase tracking(wide) c(gray-500)">
            01. Hero Section Example
          </div>
          
          <div class="vbox gap(4xl)">
            <div class="hbox gap(lg)">
              <span class="label(badge) label(uppercase) px(md) py(xs) bg(black) c(white)">NEW</span>
              <span class="label(badge) label(muted) px(md) py(xs)">Limited Time</span>
            </div>
            <h1 class="display(hero) display(gradient)">
              Build Faster.<br>Ship Better.
            </h1>
            <p class="body(lead) body(muted) max-w(3xl)">
              Ship beautiful interfaces with confidence using our comprehensive design system
            </p>
            <div class="hbox gap(xl)">
              <button class="label(button) label(uppercase) px(3xl) py(xl) bg(black) c(white)">
                Start Free Trial
              </button>
              <button class="label(button) label(clickable) px(3xl) py(xl)">
                View Demo
              </button>
            </div>
            <div class="caption(base) caption(muted)">
              No credit card required • <code class="code(inline) code(minimal)">14-day</code> free trial
            </div>
          </div>
        </div>
        
        <!-- Product Feature -->
        <div class="vbox gap(3xl) p(3xl) bg(gray-900) c(white) r(lg)">
          <div class="caption(sm) bold(600) uppercase tracking(wide) c(gray-400)">
            02. Product Feature Example
          </div>
          
          <div class="grid(2) gap(6xl)">
            <div class="vbox gap(3xl)">
              <div class="caption(base) caption(primary) uppercase tracking(widest)">Lightning Fast</div>
              <h2 class="display(2xl) display(thin)">Performance First</h2>
              <p class="body(lg) body(soft)">
                Built for speed from the ground up. Every component is optimized 
                for maximum performance and minimal bundle size.
              </p>
              <ul class="vbox gap(lg)">
                <li class="body(base) body(highlight)">• 50ms First Contentful Paint</li>
                <li class="body(base) body(highlight)">• 99/100 Lighthouse Score</li>
                <li class="body(base) body(highlight)">• Zero Runtime Dependencies</li>
              </ul>
            </div>
            <div class="vbox gap(2xl) p(3xl) bg(surface-alt)">
              <pre class="code(block)">// Blazing fast imports
import {'{'}
  display,
  heading,
  body
} from 'adorable-css'</pre>
              <div class="caption(form) caption(info)">
                Average bundle size: <code class="code(inline) code(success)">12kb gzipped</code>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Blog Post -->
        <div class="vbox gap(3xl) p(3xl) bg(white) border(1/gray-200) r(lg) shadow(sm)">
          <div class="caption(sm) bold(600) uppercase tracking(wide) c(gray-500)">
            03. Blog Post Example
          </div>
          
          <article class="vbox gap(3xl) max-w(5xl)">
            <header class="vbox gap(2xl)">
              <div class="hbox gap(xl)">
                <span class="label(badge) px(md) py(xs) bg(accent.10) c(accent)">Tutorial</span>
                <span class="caption(timestamp) caption(muted)">15 min read</span>
              </div>
              <h1 class="heading(h1)">Understanding Typography in Digital Design</h1>
              <div class="hbox gap(xl)">
                <div class="caption(base)">By <span class="caption(base) caption(primary)">Sarah Chen</span></div>
                <div class="caption(base) caption(muted)">•</div>
                <div class="caption(timestamp) caption(muted)">March 15, 2024</div>
              </div>
            </header>
            
            <div class="vbox gap(3xl)">
              <p class="body(article) body(serif)">
                Typography is the art and technique of arranging type to make written language 
                legible, readable, and appealing when displayed. The arrangement of type involves 
                selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.
              </p>
              
              <h2 class="heading(h2)">The Foundation of Good Design</h2>
              
              <p class="body(article) body(secondary)">
                Good typography establishes a strong visual hierarchy, provides a graphic balance 
                to the website, and sets the product's overall tone. Typography should guide and 
                inform your users, optimize readability and accessibility.
              </p>
              
              <blockquote class="body(quote) pl(2xl) border-l(4/accent.30)">
                "Typography is what language looks like."
                <cite class="caption(base) caption(italic) mt(lg) block">— Ellen Lupton</cite>
              </blockquote>
              
              <div class="vbox gap(lg) p(xl) bg(accent.10)">
                <h3 class="title(base) title(black)">Key Takeaways</h3>
                <ul class="vbox gap(md)">
                  <li class="body(base)">• Choose typefaces that reflect your brand personality</li>
                  <li class="body(base)">• Establish clear hierarchy with size and weight</li>
                  <li class="body(base)">• Maintain consistent spacing throughout</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
        
        <!-- Dashboard Widget -->
        <div class="vbox gap(3xl) p(3xl) bg(white) border(1/gray-200) r(lg) shadow(sm)">
          <div class="caption(sm) bold(600) uppercase tracking(wide) c(gray-500)">
            04. Dashboard Widget Example
          </div>
          
          <div class="grid(3) gap(3xl)">
            <!-- Stat Card -->
            <div class="vbox gap(xl) p(2xl) bg(surface)">
              <div class="hbox(between)">
                <div class="caption(base) caption(muted) uppercase">Revenue</div>
                <span class="caption(base) caption(success)">↑ 12%</span>
              </div>
              <div class="display(xl) bold(black)">$45.2K</div>
              <div class="caption(sm) caption(muted)">vs last month</div>
            </div>
            
            <!-- Activity Feed -->
            <div class="vbox gap(xl) p(2xl) bg(surface)">
              <h3 class="title(base) bold">Recent Activity</h3>
              <div class="vbox gap(lg)">
                <div class="vbox gap(xs)">
                  <div class="label(sm) label(strong)">New user registered</div>
                  <div class="caption(timestamp) caption(muted)">2 minutes ago</div>
                </div>
                <div class="vbox gap(xs)">
                  <div class="label(sm) label(strong)">Payment received</div>
                  <div class="caption(timestamp) caption(muted)">5 minutes ago</div>
                </div>
              </div>
            </div>
            
            <!-- Status Card -->
            <div class="vbox gap(xl) p(2xl) bg(surface)">
              <h3 class="title(base) bold">System Status</h3>
              <div class="vbox gap(md)">
                <div class="hbox gap(md)">
                  <div class="w(sm) h(sm) bg(success) r(full)"></div>
                  <span class="label(sm)">API</span>
                  <code class="code(inline) code(success)">operational</code>
                </div>
                <div class="hbox gap(md)">
                  <div class="w(sm) h(sm) bg(warning) r(full)"></div>
                  <span class="label(sm)">CDN</span>
                  <code class="code(inline) code(warning)">degraded</code>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- E-commerce Product -->
        <div class="vbox gap(3xl) p(3xl) bg(gray-50) border(1/gray-200) r(lg)">
          <div class="caption(sm) bold(600) uppercase tracking(wide) c(gray-500)">
            05. E-commerce Example
          </div>
          
          <div class="grid(2) gap(4xl)">
            <div class="vbox gap(3xl)">
              <div class="vbox gap(xl)">
                <div class="hbox gap(md)">
                  <span class="label(badge) px(sm) py(xs) bg(error.10) c(error)">Sale</span>
                  <span class="label(badge) px(sm) py(xs) bg(surface-alt) c(secondary)">Limited Stock</span>
                </div>
                <h1 class="display(xl) bold">Premium Wireless Headphones</h1>
                <div class="hbox(baseline) gap(xl)">
                  <span class="display(lg) c(black)">$199</span>
                  <span class="title(lg) c(mute) line-through">$299</span>
                  <span class="caption(base) caption(error)">Save 33%</span>
                </div>
              </div>
              
              <p class="body(lg) body(secondary)">
                Experience crystal-clear audio with our premium noise-cancelling headphones. 
                Featuring 40-hour battery life and superior comfort for all-day wear.
              </p>
              
              <div class="vbox gap(lg)">
                <label class="label(input) label(required)">Select Color</label>
                <div class="hbox gap(md)">
                  <button class="px(lg) py(md) border(2/black)">Black</button>
                  <button class="px(lg) py(md) border(1/mute.30)">Silver</button>
                  <button class="px(lg) py(md) border(1/gray-300)">Gold</button>
                </div>
              </div>
              
              <button class="label(button) label(uppercase) px(4xl) py(xl) bg(black) c(white) w(full)">
                Add to Cart
              </button>
              
              <div class="caption(form) caption(help) text(center)">
                Free shipping on orders over $50
              </div>
            </div>
          </div>
        </div>
        
        <!-- Documentation -->
        <div class="vbox gap(3xl) p(3xl) bg(white) border(1/gray-200) r(lg) shadow(sm)">
          <div class="caption(sm) bold(600) uppercase tracking(wide) c(gray-500)">
            06. Documentation Example
          </div>
          
          <div class="vbox gap(4xl) max-w(5xl)">
            <nav class="vbox gap(lg)">
              <div class="caption(base) caption(muted) uppercase tracking(wider)">On this page</div>
              <div class="vbox gap(md) pl(xl) border-l(2/mute.20)">
                <a class="body(base) body(clickable)">Getting Started</a>
                <a class="body(base) body(black)">Installation</a>
                <a class="body(base) body(clickable)">Basic Usage</a>
              </div>
            </nav>
            
            <div class="vbox gap(3xl)">
              <section class="vbox gap(2xl)">
                <h1 class="heading(h1)">Installation</h1>
                
                <div class="vbox gap(xl) p(xl) bg(gray-900) c(white)">
                  <div class="hbox(between)">
                    <code class="code(sm) code(primary)">npm install</code>
                    <button class="caption(base) caption(clickable)">Copy</button>
                  </div>
                  <pre class="code(block)">npm install adorable-css</pre>
                </div>
                
                <div class="vbox gap(lg) p(lg) bg(info.10) border-l(4/info)">
                  <div class="label(base) label(strong) c(info)">Pro Tip</div>
                  <p class="body(base) c(info.80)">
                    Use the <code class="code(inline) code(primary)">--save-dev</code> flag 
                    if you're using a build process.
                  </p>
                </div>
              </section>
              
              <section class="vbox gap(2xl)">
                <h2 class="heading(h2)">Basic Usage</h2>
                <p class="body(base) body(secondary)">
                  Import the components you need and start building beautiful typography.
                </p>
                
                <table class="w(full)">
                  <thead>
                    <tr class="bb(2/mute.20)">
                      <th class="label(base) label(uppercase) py(md) text(left)">Component</th>
                      <th class="label(base) label(uppercase) py(md) text(left)">Usage</th>
                      <th class="label(base) label(uppercase) py(md) text(left)">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bb(1/mute.10)">
                      <td class="py(md)"><code class="code(inline)">display</code></td>
                      <td class="caption(base) py(md)">Hero text</td>
                      <td class="py(md)"><span class="label(sm) label(mono)">display(hero)</span></td>
                    </tr>
                    <tr class="bb(1/mute.10)">
                      <td class="py(md)"><code class="code(inline)">heading</code></td>
                      <td class="caption(base) py(md)">Document structure</td>
                      <td class="py(md)"><span class="label(sm) label(mono)">heading(h1)</span></td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Usage Guidelines -->
    <section id="guidelines" class="vbox gap(6xl) mb(8xl)">
      <div class="vbox gap(lg)">
        <h2 class="heading(2xl) bold(700) c(gray-900) tracking(tight)">
          Usage Guidelines
        </h2>
        <p class="body(lg) c(gray-600) leading(relaxed)">
          타이포그래피 컴포넌트를 효과적으로 사용하기 위한 가이드라인입니다.
        </p>
      </div>
      
      <div class="grid(1) gap(4xl)">
        <!-- When to Use Each Component -->
        <div class="vbox gap(lg) p(3xl) bg(green-50) border(1/green-200) r(lg)">
          <h3 class="title(lg) bold(600) c(green-900)">✅ 컴포넌트 선택 가이드</h3>
          <div class="grid(2) gap(2xl)">
            <div class="vbox gap(md)">
              <h4 class="title(base) bold(600) c(gray-900)">Display</h4>
              <p class="body(sm) c(gray-700)">랜딩 페이지의 메인 헤드라인, 마케팅 배너, 후이지의 주요 메시지에 사용</p>
              
              <h4 class="title(base) bold(600) c(gray-900)">Heading</h4>
              <p class="body(sm) c(gray-700)">문서의 구조적 계층(h1-h6), 섹션 제목, 컨텐츠의 주요 부분 구분에 사용</p>
              
              <h4 class="title(base) bold(600) c(gray-900)">Title</h4>
              <p class="body(sm) c(gray-700)">컨트롤과 컴포넌트의 라벨, 카드 제목, 모달 헤더 등에 사용</p>
              
              <h4 class="title(base) bold(600) c(gray-900)">Body</h4>
              <p class="body(sm) c(gray-700)">본문, 기사 내용, 설명 텍스트 등 일반적인 콘텐츠에 사용</p>
            </div>
            <div class="vbox gap(md)">
              <h4 class="title(base) bold(600) c(gray-900)">Label</h4>
              <p class="body(sm) c(gray-700)">버튼, 폼 라벨, 탭, 배지 등 UI 요소의 라벨에 사용</p>
              
              <h4 class="title(base) bold(600) c(gray-900)">Caption</h4>
              <p class="body(sm) c(gray-700)">이미지 설명, 도움말, 타임스탬프, 메타데이터 등 보조 정보에 사용</p>
              
              <h4 class="title(base) bold(600) c(gray-900)">Code</h4>
              <p class="body(sm) c(gray-700)">코드 스니펫, API 예제, 기술 문서에 사용</p>
            </div>
          </div>
        </div>

        <!-- Typography Hierarchy -->
        <div class="vbox gap(lg) p(3xl) bg(blue-50) border(1/blue-200) r(lg)">
          <h3 class="title(lg) bold(600) c(blue-900)">📈 타이포그래피 계층구조</h3>
          <div class="vbox gap(md)">
            <p class="body(base) c(gray-700)">
              정보의 중요도에 따라 적절한 타이포그래피 컴포넌트를 선택하세요:
            </p>
            <ol class="vbox gap(sm) pl(lg)">
              <li class="body(sm) c(gray-700)">1. 가장 중요한 정보: Display 또는 Heading(h1)</li>
              <li class="body(sm) c(gray-700)">2. 주요 섹션: Heading(h2-h3) 또는 Title</li>
              <li class="body(sm) c(gray-700)">3. 내용: Body 또는 Label</li>
              <li class="body(sm) c(gray-700)">4. 보조 정보: Caption</li>
            </ol>
          </div>
        </div>

        <!-- Best Practices -->
        <div class="vbox gap(lg) p(3xl) bg(yellow-50) border(1/yellow-200) r(lg)">
          <h3 class="title(lg) bold(600) c(yellow-900)">⚠️ 베스트 프랙티스</h3>
          <div class="grid(2) gap(2xl)">
            <div class="vbox gap(md)">
              <h4 class="title(base) bold(600) c(green-700)">✅ Do</h4>
              <ul class="vbox gap(xs) pl(lg)">
                <li class="body(sm) c(gray-700)">• 일관된 컴포넌트 사용</li>
                <li class="body(sm) c(gray-700)">• 의미적 계층구조 유지</li>
                <li class="body(sm) c(gray-700)">• 토큰 기반 사이징</li>
                <li class="body(sm) c(gray-700)">• 컴포넌트별 목적에 맞는 사용</li>
              </ul>
            </div>
            <div class="vbox gap(md)">
              <h4 class="title(base) bold(600) c(red-700)">❌ Don't</h4>
              <ul class="vbox gap(xs) pl(lg)">
                <li class="body(sm) c(gray-700)">• 임의의 폰트 크기 사용</li>
                <li class="body(sm) c(gray-700)">• 컴포넌트 목적 무시</li>
                <li class="body(sm) c(gray-700)">• 과도한 변형 사용</li>
                <li class="body(sm) c(gray-700)">• 계층구조 무시</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Accessibility -->
    <section id="accessibility" class="vbox gap(6xl) mb(8xl)">
      <div class="vbox gap(lg)">
        <h2 class="heading(2xl) bold(700) c(gray-900) tracking(tight)">
          Accessibility & Performance
        </h2>
        <p class="body(lg) c(gray-600) leading(relaxed)">
          모든 사용자가 접근할 수 있도록 설계된 타이포그래피 시스템입니다.
        </p>
      </div>
      
      <div class="grid(2) gap(4xl)">
        <!-- Accessibility Features -->
        <div class="vbox gap(lg) p(3xl) bg(white) border(1/gray-200) r(lg) shadow(sm)">
          <h3 class="title(lg) bold(600) c(gray-900)">♿ 접근성 특징</h3>
          <div class="vbox gap(md)">
            <div class="hbox gap(md)">
              <span class="caption(sm) bg(green-100) c(green-800) px(sm) py(xs) r(sm)">WCAG 2.1 AA</span>
              <span class="body(sm) c(gray-700)">색상 대비 기준 준수</span>
            </div>
            <div class="hbox gap(md)">
              <span class="caption(sm) bg(blue-100) c(blue-800) px(sm) py(xs) r(sm)">Semantic</span>
              <span class="body(sm) c(gray-700)">HTML 시맨틱 표준 준수</span>
            </div>
            <div class="hbox gap(md)">
              <span class="caption(sm) bg(purple-100) c(purple-800) px(sm) py(xs) r(sm)">Screen Reader</span>
              <span class="body(sm) c(gray-700)">스크린 리더 호환성</span>
            </div>
            <div class="hbox gap(md)">
              <span class="caption(sm) bg(orange-100) c(orange-800) px(sm) py(xs) r(sm)">Responsive</span>
              <span class="body(sm) c(gray-700)">모든 디바이스 지원</span>
            </div>
          </div>
        </div>

        <!-- Performance Features -->
        <div class="vbox gap(lg) p(3xl) bg(white) border(1/gray-200) r(lg) shadow(sm)">
          <h3 class="title(lg) bold(600) c(gray-900)">⚡ 성능 최적화</h3>
          <div class="vbox gap(md)">
            <div class="hbox gap(md)">
              <span class="caption(sm) bg(green-100) c(green-800) px(sm) py(xs) r(sm)">Zero Runtime</span>
              <span class="body(sm) c(gray-700)">빌드 타임 CSS 생성</span>
            </div>
            <div class="hbox gap(md)">
              <span class="caption(sm) bg(blue-100) c(blue-800) px(sm) py(xs) r(sm)">Tree Shaking</span>
              <span class="body(sm) c(gray-700)">사용되지 않는 코드 제거</span>
            </div>
            <div class="hbox gap(md)">
              <span class="caption(sm) bg(purple-100) c(purple-800) px(sm) py(xs) r(sm)">Token Based</span>
              <span class="body(sm) c(gray-700)">효율적인 CSS 변수 사용</span>
            </div>
            <div class="hbox gap(md)">
              <span class="caption(sm) bg(orange-100) c(orange-800) px(sm) py(xs) r(sm)">Cache Friendly</span>
              <span class="body(sm) c(gray-700)">반복 로드 최소화</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Implementation -->
    <section id="implementation" class="vbox gap(6xl) mb(8xl)">
      <div class="vbox gap(lg)">
        <h2 class="heading(2xl) bold(700) c(gray-900) tracking(tight)">
          Implementation Guide
        </h2>
        <p class="body(lg) c(gray-600) leading(relaxed)">
          AdorableCSS 타이포그래피 시스템을 프로젝트에 적용하는 방법입니다.
        </p>
      </div>
      
      <div class="vbox gap(4xl)">
        <!-- Installation -->
        <div class="vbox gap(lg) p(3xl) bg(gray-900) c(white) r(lg)">
          <h3 class="title(lg) bold(600)">1. 설치 (Installation)</h3>
          <div class="vbox gap(md)">
            <pre class="code(block) bg(gray-800) p(lg) r(md)">npm install adorable-css</pre>
            <p class="body(sm) c(gray-300)">또는 yarn, pnpm 등 선호하는 패키지 매니저를 사용하세요.</p>
          </div>
        </div>

        <!-- Basic Usage -->
        <div class="vbox gap(lg) p(3xl) bg(white) border(1/gray-200) r(lg)">
          <h3 class="title(lg) bold(600) c(gray-900)">2. 기본 사용법</h3>
          <div class="vbox gap(md)">
            <pre class="code(block) bg(gray-100) p(lg) r(md) c(gray-900)">import { generateCSS } from 'adorable-css';

// 클래스 리스트로 CSS 생성
const css = generateCSS([
  'display(hero)',
  'heading(h1)', 
  'body(lg)',
  'caption(sm)'
]);</pre>
            <p class="body(sm) c(gray-600)">사용한 타이포그래피 컴포넌트만 CSS로 생성됩니다.</p>
          </div>
        </div>

        <!-- Export CSS Tokens -->
        <div class="vbox gap(lg) p(3xl) bg(blue-50) border(1/blue-200) r(lg)">
          <h3 class="title(lg) bold(600) c(blue-900)">3. CSS 토큰 내보내기</h3>
          <div class="vbox gap(md)">
            <button 
              on:click={copyTypographyCSS}
              class="hbox(center) gap(md) px(lg) py(md) bg(blue-600) c(white) r(md) hover:bg(blue-700) transition"
            >
              <span class="label(base)">Copy Typography CSS</span>
              <span class="caption(xs)">클립보드에 복사</span>
            </button>
            <p class="body(sm) c(gray-600)">
              프로젝트에서 사용할 수 있는 CSS 변수들을 내보낼 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
    
  </div>
</div>