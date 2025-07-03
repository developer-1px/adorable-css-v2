<script>
  import { onMount } from 'svelte';
  
  // Design system configuration
  const designPrinciples = [
    {
      title: 'Consistency',
      description: 'Unified design language across all components and patterns',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`
    },
    {
      title: 'Accessibility',
      description: 'Interfaces designed for all users, regardless of ability',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><circle cx="12" cy="12" r="4"/></svg>`
    },
    {
      title: 'Scalability',
      description: 'System that grows seamlessly with your project needs',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
    },
    {
      title: 'Performance',
      description: 'Optimized for fast loading and smooth interactions',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
    }
  ];

  const colorCategories = [
    {
      name: 'Primary',
      description: 'Main brand colors',
      colors: [
        { name: 'primary-50', value: 'var(--blue-50)' },
        { name: 'primary-100', value: 'var(--blue-100)' },
        { name: 'primary-200', value: 'var(--blue-200)' },
        { name: 'primary-300', value: 'var(--blue-300)' },
        { name: 'primary-400', value: 'var(--blue-400)' },
        { name: 'primary-500', value: 'var(--blue-500)' },
        { name: 'primary-600', value: 'var(--blue-600)' },
        { name: 'primary-700', value: 'var(--blue-700)' },
        { name: 'primary-800', value: 'var(--blue-800)' },
        { name: 'primary-900', value: 'var(--blue-900)' }
      ]
    },
    {
      name: 'Neutral',
      description: 'Versatile grays for text and backgrounds',
      colors: [
        { name: 'gray-50', value: 'var(--gray-50)' },
        { name: 'gray-100', value: 'var(--gray-100)' },
        { name: 'gray-200', value: 'var(--gray-200)' },
        { name: 'gray-300', value: 'var(--gray-300)' },
        { name: 'gray-400', value: 'var(--gray-400)' },
        { name: 'gray-500', value: 'var(--gray-500)' },
        { name: 'gray-600', value: 'var(--gray-600)' },
        { name: 'gray-700', value: 'var(--gray-700)' },
        { name: 'gray-800', value: 'var(--gray-800)' },
        { name: 'gray-900', value: 'var(--gray-900)' }
      ]
    },
    {
      name: 'Semantic',
      description: 'Colors with specific meanings',
      colors: [
        { name: 'success', value: 'var(--emerald-600)', label: 'Success' },
        { name: 'warning', value: 'var(--amber-500)', label: 'Warning' },
        { name: 'error', value: 'var(--red-600)', label: 'Error' },
        { name: 'info', value: 'var(--sky-500)', label: 'Info' }
      ]
    }
  ];

  const typographyScale = [
    { name: 'display(xl)', size: '60px', lineHeight: '1.1', weight: '900', usage: 'Hero headings' },
    { name: 'display(lg)', size: '48px', lineHeight: '1.1', weight: '900', usage: 'Large headings' },
    { name: 'heading(xl)', size: '36px', lineHeight: '1.2', weight: '700', usage: 'Page titles' },
    { name: 'heading(lg)', size: '30px', lineHeight: '1.2', weight: '700', usage: 'Section headings' },
    { name: 'heading(md)', size: '24px', lineHeight: '1.3', weight: '600', usage: 'Sub sections' },
    { name: 'title(lg)', size: '20px', lineHeight: '1.4', weight: '600', usage: 'Card titles' },
    { name: 'title(md)', size: '18px', lineHeight: '1.4', weight: '600', usage: 'List headers' },
    { name: 'body(lg)', size: '18px', lineHeight: '1.6', weight: '400', usage: 'Emphasized body' },
    { name: 'body(md)', size: '16px', lineHeight: '1.6', weight: '400', usage: 'Default body' },
    { name: 'body(sm)', size: '14px', lineHeight: '1.5', weight: '400', usage: 'Secondary text' },
    { name: 'label(md)', size: '14px', lineHeight: '1.4', weight: '500', usage: 'Labels' },
    { name: 'caption', size: '12px', lineHeight: '1.4', weight: '400', usage: 'Captions' }
  ];

  const spacingSystem = [
    { name: 'xs', value: '4px', usage: 'Tight spacing' },
    { name: 'sm', value: '8px', usage: 'Small gaps' },
    { name: 'md', value: '12px', usage: 'Default spacing' },
    { name: 'lg', value: '16px', usage: 'Standard gaps' },
    { name: 'xl', value: '20px', usage: 'Large spacing' },
    { name: '2xl', value: '24px', usage: 'Section internal' },
    { name: '3xl', value: '32px', usage: 'Between sections' },
    { name: '4xl', value: '40px', usage: 'Component groups' },
    { name: '5xl', value: '48px', usage: 'Page sections' },
    { name: '6xl', value: '64px', usage: 'Hero sections' }
  ];

  const componentPatterns = [
    {
      name: '버튼',
      variants: ['primary', 'secondary', 'ghost', 'danger'],
      sizes: ['sm', 'md', 'lg']
    },
    {
      name: '카드',
      variants: ['default', 'elevated', 'bordered', 'interactive'],
      sizes: ['compact', 'default', 'spacious']
    },
    {
      name: '입력 필드',
      variants: ['default', 'filled', 'outlined'],
      states: ['default', 'focus', 'error', 'disabled']
    }
  ];

  let activeTab = 'principles';
</script>

<style>
  :global(:root) {
    /* Design System Variables */
    --ds-radius-sm: 4px;
    --ds-radius-md: 8px;
    --ds-radius-lg: 12px;
    --ds-radius-xl: 16px;
    --ds-radius-full: 9999px;
    
    --ds-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
    --ds-shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
    --ds-shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);
    --ds-shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.12);
    
    --ds-transition-fast: 150ms ease;
    --ds-transition-base: 250ms ease;
    --ds-transition-slow: 350ms ease;
  }
</style>

<div class="vbox gap(3xl) py(5xl)">
  <!-- Hero Section -->
  <section class="vbox(center) gap(xl) text-align(center) container(7xl) mx(auto) px(2xl)">
    <h1 class="display(xl) bold(900) bg(gradient) bg-clip(text) c(transparent)">
      Design System
    </h1>
    <p class="title(lg) c(muted) max-w(prose) mx(auto)">
      Build better experiences with our consistent, scalable design system
    </p>
  </section>

  <!-- Tab Navigation -->
  <nav class="hbox(center) gap(md) container(7xl) mx(auto) px(2xl) border(b/1/muted)">
    <button 
      class="px(xl) py(md) border(b/2/{activeTab === 'principles' ? 'primary' : 'transparent'}) c({activeTab === 'principles' ? 'primary' : 'muted'}) bold(600) transition hover:c(primary)"
      on:click={() => activeTab = 'principles'}
    >
      Design Principles
    </button>
    <button 
      class="px(xl) py(md) border(b/2/{activeTab === 'colors' ? 'primary' : 'transparent'}) c({activeTab === 'colors' ? 'primary' : 'muted'}) bold(600) transition hover:c(primary)"
      on:click={() => activeTab = 'colors'}
    >
      Color System
    </button>
    <button 
      class="px(xl) py(md) border(b/2/{activeTab === 'typography' ? 'primary' : 'transparent'}) c({activeTab === 'typography' ? 'primary' : 'muted'}) bold(600) transition hover:c(primary)"
      on:click={() => activeTab = 'typography'}
    >
      Typography
    </button>
    <button 
      class="px(xl) py(md) border(b/2/{activeTab === 'spacing' ? 'primary' : 'transparent'}) c({activeTab === 'spacing' ? 'primary' : 'muted'}) bold(600) transition hover:c(primary)"
      on:click={() => activeTab = 'spacing'}
    >
      Spacing System
    </button>
    <button 
      class="px(xl) py(md) border(b/2/{activeTab === 'components' ? 'primary' : 'transparent'}) c({activeTab === 'components' ? 'primary' : 'muted'}) bold(600) transition hover:c(primary)"
      on:click={() => activeTab = 'components'}
    >
      Components
    </button>
  </nav>

  <!-- Content Sections -->
  <div class="container(7xl) mx(auto) px(2xl)">
    <!-- Design Principles -->
    {#if activeTab === 'principles'}
      <section class="vbox gap(3xl) fade-in">
        <div class="vbox gap(lg)">
          <h2 class="heading(xl) bold(700)">디자인 원칙</h2>
          <p class="body(lg) c(muted)">
            우리의 디자인 시스템은 네 가지 핵심 원칙을 기반으로 합니다
          </p>
        </div>
        
        <div class="grid(2) gap(2xl)">
          {#each designPrinciples as principle}
            <div class="vbox gap(lg) p(2xl) r(lg) bg(surface) border(1/muted) hover:shadow(lg) transition interactive(2)">
              <div class="w(48) h(48) hbox(center/middle) r(md) bg(primary.1) c(primary)">
                {@html principle.icon}
              </div>
              <h3 class="title(lg) bold(600)">{principle.title}</h3>
              <p class="body(md) c(muted)">{principle.description}</p>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Color System -->
    {#if activeTab === 'colors'}
      <section class="vbox gap(3xl) fade-in">
        <div class="vbox gap(lg)">
          <h2 class="heading(xl) bold(700)">색상 시스템</h2>
          <p class="body(lg) c(muted)">
            OKLCH 기반의 체계적인 색상 팔레트로 일관된 비주얼 언어를 구현합니다
          </p>
        </div>

        {#each colorCategories as category}
          <div class="vbox gap(xl)">
            <div class="vbox gap(sm)">
              <h3 class="title(lg) bold(600)">{category.name}</h3>
              <p class="body(sm) c(muted)">{category.description}</p>
            </div>
            
            <div class="grid({category.colors.length > 4 ? '5' : category.colors.length}) gap(md)">
              {#each category.colors as color}
                <div class="vbox gap(sm) group cursor-pointer">
                  <div 
                    class="h(80) r(md) shadow(sm) group-hover:shadow(lg) transition"
                    style="background-color: {color.value}"
                  />
                  <div class="vbox gap(xs)">
                    <p class="label(md) bold(500)">{color.label || color.name}</p>
                    <code class="caption c(muted) font(mono)">c({color.name})</code>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </section>
    {/if}

    <!-- Typography -->
    {#if activeTab === 'typography'}
      <section class="vbox gap(3xl) fade-in">
        <div class="vbox gap(lg)">
          <h2 class="heading(xl) bold(700)">타이포그래피 스케일</h2>
          <p class="body(lg) c(muted)">
            명확한 계층 구조와 가독성을 위한 타이포그래피 시스템
          </p>
        </div>

        <div class="vbox gap(2xl)">
          {#each typographyScale as type}
            <div class="grid(12) gap(xl) items(center) p(xl) r(lg) border(1/muted) hover:bg(surface) transition">
              <div class="col-span(3)">
                <code class="label(md) c(primary) font(mono)">{type.name}</code>
              </div>
              <div class="col-span(4)">
                <p 
                  class="truncate"
                  style="font-size: {type.size}; line-height: {type.lineHeight}; font-weight: {type.weight}"
                >
                  가나다라 ABC 123
                </p>
              </div>
              <div class="col-span(3) text-align(right)">
                <p class="caption c(muted)">{type.size} / {type.weight}</p>
              </div>
              <div class="col-span(2) text-align(right)">
                <p class="caption c(muted)">{type.usage}</p>
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Spacing System -->
    {#if activeTab === 'spacing'}
      <section class="vbox gap(3xl) fade-in">
        <div class="vbox gap(lg)">
          <h2 class="heading(xl) bold(700)">간격 시스템</h2>
          <p class="body(lg) c(muted)">
            4px 기반의 일관된 간격 시스템으로 조화로운 레이아웃을 만듭니다
          </p>
        </div>

        <div class="vbox gap(xl)">
          {#each spacingSystem as space}
            <div class="hbox gap(xl) items(center)">
              <div class="w(100) text-align(right)">
                <code class="label(md) c(primary) font(mono)">{space.name}</code>
              </div>
              <div class="flex(1) h(40) hbox items(center)">
                <div 
                  class="h(full) bg(primary) r(sm)"
                  style="width: {space.value}"
                />
              </div>
              <div class="w(60) text-align(center)">
                <p class="caption c(muted)">{space.value}</p>
              </div>
              <div class="w(150)">
                <p class="caption c(muted)">{space.usage}</p>
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Components -->
    {#if activeTab === 'components'}
      <section class="vbox gap(3xl) fade-in">
        <div class="vbox gap(lg)">
          <h2 class="heading(xl) bold(700)">컴포넌트 패턴</h2>
          <p class="body(lg) c(muted)">
            재사용 가능한 컴포넌트로 일관된 사용자 경험을 제공합니다
          </p>
          <a 
            href="/(layout)/design-system/components"
            class="mt(lg) px(xl) py(md) r(md) bg(primary) c(white) bold(500) hover:bg(primary-600) transition w(fit) hbox gap(sm) items(center)"
          >
            전체 컴포넌트 보기
            <svg class="size(20)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </a>
        </div>

        <!-- Button Component -->
        <div class="vbox gap(2xl) p(3xl) r(xl) bg(surface) border(1/muted)">
          <h3 class="title(lg) bold(600)">버튼 컴포넌트</h3>
          
          <div class="vbox gap(xl)">
            <p class="label(md) c(muted)">Variants</p>
            <div class="hbox gap(lg) flex-wrap">
              <button class="px(xl) py(md) r(md) bg(primary) c(white) bold(500) hover:bg(primary-600) transition">
                Primary
              </button>
              <button class="px(xl) py(md) r(md) bg(gray-100) c(gray-700) bold(500) hover:bg(gray-200) transition">
                Secondary
              </button>
              <button class="px(xl) py(md) r(md) border(1/gray-300) c(gray-700) bold(500) hover:bg(gray-50) transition">
                Ghost
              </button>
              <button class="px(xl) py(md) r(md) bg(red-500) c(white) bold(500) hover:bg(red-600) transition">
                Danger
              </button>
            </div>
          </div>

          <div class="vbox gap(xl)">
            <p class="label(md) c(muted)">Sizes</p>
            <div class="hbox gap(lg) items(center) flex-wrap">
              <button class="px(md) py(sm) r(md) bg(primary) c(white) bold(500) text(sm) hover:bg(primary-600) transition">
                Small
              </button>
              <button class="px(xl) py(md) r(md) bg(primary) c(white) bold(500) hover:bg(primary-600) transition">
                Medium
              </button>
              <button class="px(2xl) py(lg) r(md) bg(primary) c(white) bold(500) text(lg) hover:bg(primary-600) transition">
                Large
              </button>
            </div>
          </div>
        </div>

        <!-- Card Component -->
        <div class="vbox gap(2xl) p(3xl) r(xl) bg(surface) border(1/muted)">
          <h3 class="title(lg) bold(600)">카드 컴포넌트</h3>
          
          <div class="grid(3) gap(xl)">
            <div class="vbox gap(lg) p(xl) r(lg) bg(white) border(1/gray-200)">
              <h4 class="title(md) bold(600)">Default Card</h4>
              <p class="body(sm) c(muted)">기본 카드 스타일</p>
            </div>
            
            <div class="vbox gap(lg) p(xl) r(lg) bg(white) shadow(md) hover:shadow(lg) transition">
              <h4 class="title(md) bold(600)">Elevated Card</h4>
              <p class="body(sm) c(muted)">그림자가 있는 카드</p>
            </div>
            
            <div class="vbox gap(lg) p(xl) r(lg) bg(gradient) c(white)">
              <h4 class="title(md) bold(600)">Gradient Card</h4>
              <p class="body(sm) c(white.8)">그라디언트 카드</p>
            </div>
          </div>
        </div>

        <!-- Input Component -->
        <div class="vbox gap(2xl) p(3xl) r(xl) bg(surface) border(1/muted)">
          <h3 class="title(lg) bold(600)">입력 필드</h3>
          
          <div class="vbox gap(xl)">
            <div class="vbox gap(sm)">
              <label class="label(md) c(gray-700)">Default Input</label>
              <input 
                type="text" 
                placeholder="텍스트를 입력하세요"
                class="w(full) px(lg) py(md) r(md) border(1/gray-300) focus:border(primary) focus:ring(2/4/primary.2) transition"
              />
            </div>
            
            <div class="vbox gap(sm)">
              <label class="label(md) c(gray-700)">Filled Input</label>
              <input 
                type="text" 
                placeholder="텍스트를 입력하세요"
                class="w(full) px(lg) py(md) r(md) bg(gray-100) border(1/transparent) focus:bg(white) focus:border(primary) focus:ring(2/4/primary.2) transition"
              />
            </div>
            
            <div class="vbox gap(sm)">
              <label class="label(md) c(red-500)">Error State</label>
              <input 
                type="text" 
                placeholder="오류가 있습니다"
                class="w(full) px(lg) py(md) r(md) border(1/red-500) focus:ring(2/4/red.2) transition"
              />
              <p class="caption c(red-500)">유효하지 않은 입력입니다</p>
            </div>
          </div>
        </div>
      </section>
    {/if}
  </div>
</div>