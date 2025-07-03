<script lang="ts">
  import { page } from '$app/stores';
  import { ChevronRight, Home, Book, Palette, Settings, Code, Layers } from 'lucide-svelte';
  import type { ComponentType } from 'svelte';

  export let layoutType: 'docs' | 'tokens' | 'components' = 'docs';

  $: currentPath = $page.url.pathname;

  type NavigationItem = {
    href?: string;
    label: string;
    icon?: ComponentType;
    items?: { href: string; label: string; }[];
  };

  // Different navigation items based on layout type
  const docsNavigation: NavigationItem[] = [
    { href: '/docs', label: '시작하기', icon: Home },
    { href: '/docs/overview', label: '개요', icon: Book },
    { href: '/docs/getting-started', label: '빠른 시작', icon: Code },
    { href: '/docs/syntax-guide', label: '문법 가이드', icon: Settings },
    { 
      label: '핵심 개념', 
      items: [
        { href: '/docs/figma-first-css-utility', label: 'Figma-First CSS' },
        { href: '/docs/design-token', label: '디자인 토큰' },
        { href: '/docs/layout', label: '레이아웃' },
        { href: '/docs/component', label: '컴포넌트' },
      ]
    },
    {
      label: '고급 주제',
      items: [
        { href: '/docs/design-system', label: '디자인 시스템' },
        { href: '/docs/technical-architecture', label: '기술 아키텍처' },
        { href: '/docs/color-system', label: '컬러 시스템' },
        { href: '/docs/javascript-api', label: 'JavaScript API' },
      ]
    },
    {
      label: '가이드',
      items: [
        { href: '/docs/best-practices', label: '모범 사례' },
        { href: '/docs/troubleshooting', label: '문제 해결' },
        { href: '/docs/migration-guide', label: '마이그레이션' },
        { href: '/docs/team-onboarding', label: '팀 온보딩' },
      ]
    }
  ];

  const tokensNavigation: NavigationItem[] = [
    { href: '/tokens', label: '토큰 개요', icon: Home },
    { href: '/tokens/colors', label: '컬러', icon: Palette },
    { href: '/tokens/typography', label: '타이포그래피', icon: Book },
    { href: '/tokens/spacing', label: '간격', icon: Layers },
    { href: '/tokens/shadows', label: '그림자', icon: Settings },
    { href: '/tokens/radius', label: '모서리', icon: Settings },
    { href: '/tokens/effects', label: '효과', icon: Settings },
  ];

  const componentsNavigation: NavigationItem[] = [
    { href: '/components', label: '컴포넌트 개요', icon: Home },
    { 
      label: '기본 컴포넌트',
      items: [
        { href: '/components/button', label: '버튼' },
        { href: '/components/card', label: '카드' },
        { href: '/components/input', label: '입력' },
        { href: '/components/badge', label: '배지' },
      ]
    },
    {
      label: '레이아웃 컴포넌트',
      items: [
        { href: '/components/container', label: '컨테이너' },
        { href: '/components/grid', label: '그리드' },
        { href: '/components/stack', label: '스택' },
      ]
    }
  ];

  function getNavigation() {
    switch (layoutType) {
      case 'tokens': return tokensNavigation;
      case 'components': return componentsNavigation;
      default: return docsNavigation;
    }
  }

  function isActive(href: string): boolean {
    return currentPath === href || currentPath.startsWith(href + '/');
  }
</script>

<aside class="app-sidebar">
  <nav class="sidebar-nav">
    <ul>
      {#each getNavigation() as item}
        <li>
          {#if item.href}
            <a 
              href={item.href} 
              class:active={isActive(item.href)}
              class="hbox(middle) gap(8) p(8) r(6) transition hover:bg(gray-100) {isActive(item.href) ? 'bg(blue-500) c(white) hover:bg(blue-600)' : 'c(gray-700)'}"
            >
              {#if item.icon}
                <svelte:component this={item.icon} size="16" />
              {/if}
              <span class="body(sm)">{item.label}</span>
            </a>
          {:else}
            <!-- Section header -->
            <div class="px(8) py(12) border-t(1/gray-200) mt(16) first:mt(0) first:border-t(0)">
              <h3 class="label(xs) uppercase tracking(wider) c(gray-500) bold(600)">{item.label}</h3>
            </div>
            
                         {#if 'items' in item && item.items}
               <ul class="ml(8) mt(8)">
                 {#each item.items as subItem}
                  <li>
                    <a 
                      href={subItem.href} 
                      class:active={isActive(subItem.href)}
                      class="block p(6) pl(16) r(4) transition hover:bg(gray-100) relative {isActive(subItem.href) ? 'bg(blue-500) c(white) hover:bg(blue-600)' : 'c(gray-600) hover:c(gray-900)'}"
                    >
                      <span class="body(sm)">{subItem.label}</span>
                      {#if isActive(subItem.href)}
                        <div class="absolute left(8) top(50%) translate-y(-50%) w(3) h(3) r(full) bg(white)"></div>
                      {/if}
                    </a>
                  </li>
                {/each}
              </ul>
            {/if}
          {/if}
        </li>
      {/each}
    </ul>
  </nav>
</aside>

<style>
  .sidebar-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style> 