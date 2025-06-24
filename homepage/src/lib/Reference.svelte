<script lang="ts">
  import { generateCSS } from 'adorable-css';
  
  let searchQuery = '';
  let selectedCategory = 'all';
  let copiedItem = '';
  
  const categories = [
    { id: 'all', name: '전체', icon: '🎨' },
    { id: 'layout', name: '레이아웃', icon: '📐' },
    { id: 'position', name: '위치', icon: '📍' },
    { id: 'typography', name: '타이포그래피', icon: '✏️' },
    { id: 'spacing', name: '여백', icon: '📏' },
    { id: 'visuals', name: '시각효과', icon: '🎨' },
    { id: 'interaction', name: '인터랙션', icon: '👆' },
    { id: 'responsive', name: '반응형', icon: '📱' }
  ];
  
  interface ReferenceItem {
    syntax: string;
    desc: string;
    example?: string;
  }
  
  interface ReferenceSection {
    title: string;
    icon: string;
    items: ReferenceItem[];
  }
  
  const referenceData: Record<string, ReferenceSection[]> = {
    layout: [
      {
        title: 'Flexbox',
        icon: '📦',
        items: [
          { syntax: 'hbox', desc: '가로 방향 flex 컨테이너', example: 'hbox gap(16)' },
          { syntax: 'vbox', desc: '세로 방향 flex 컨테이너', example: 'vbox gap(20)' },
          { syntax: 'hbox(pack)', desc: '가로/세로 중앙 정렬', example: 'hbox(pack) w(200) h(200)' },
          { syntax: 'gap(auto)', desc: 'flexbox 아이템 사이 자동 간격', example: 'hbox gap(auto)' },
          { syntax: 'gap(16)', desc: 'flex/grid 아이템 간격', example: 'hbox gap(16)' },
          { syntax: 'flex', desc: 'flex: 1 (늘어나기)', example: 'hbox > div.flex' }
        ]
      },
      {
        title: 'Grid',
        icon: '🏗️',
        items: [
          { syntax: 'grid(3)', desc: '3열 그리드', example: 'grid(3) gap(20)' },
          { syntax: 'grid(1/3)', desc: '반응형 그리드', example: 'sm:grid(1) md:grid(3)' },
          { syntax: 'col-span(2)', desc: '2열 차지', example: 'grid(3) > div.col-span(2)' }
        ]
      },
      {
        title: 'Size',
        icon: '📏',
        items: [
          { syntax: 'w(200)', desc: '너비 200px', example: 'w(200) h(100)' },
          { syntax: 'w(fill)', desc: '너비 100%', example: 'w(fill)' },
          { syntax: 'w(hug)', desc: '콘텐츠에 맞춤', example: 'w(hug) px(20)' },
          { syntax: 'h(screen)', desc: '뷰포트 높이', example: 'h(screen) vbox(pack)' },
          { syntax: 'w(200..400)', desc: '최소/최대 너비', example: 'w(200..400)' }
        ]
      }
    ],
    position: [
      {
        title: 'Position',
        icon: '🎯',
        items: [
          { syntax: 'absolute', desc: 'position: absolute', example: 'absolute top(0) right(0)' },
          { syntax: 'relative', desc: 'position: relative', example: 'relative z(10)' },
          { syntax: 'fixed', desc: 'position: fixed', example: 'fixed bottom(20) right(20)' },
          { syntax: 'sticky', desc: 'position: sticky', example: 'sticky top(0)' }
        ]
      },
      {
        title: 'Coordinates',
        icon: '📐',
        items: [
          { syntax: 'y(center)', desc: '세로 중앙 (top 50% + translateY)', example: 'absolute y(center)' },
          { syntax: 'x(center)', desc: '가로 중앙 (left 50% + translateX)', example: 'absolute x(center)' },
          { syntax: 'xy(center)', desc: '정중앙', example: 'absolute xy(center)' },
          { syntax: 'inset(0)', desc: '모든 방향 0', example: 'absolute inset(0)' },
          { syntax: 'top(20)', desc: 'top: 20px', example: 'absolute top(20) left(20)' },
          { syntax: 'layer(top:20+left:30)', desc: '복합 위치', example: 'layer(top:20+left:30)' }
        ]
      }
    ],
    typography: [
      {
        title: 'Font',
        icon: '🔤',
        items: [
          { syntax: 'font(16)', desc: '폰트 크기', example: 'font(16) c(#333)' },
          { syntax: 'font(Inter/16/1.5)', desc: '폰트/크기/행간', example: 'font(Inter/16/1.5)' },
          { syntax: 'bold', desc: 'font-weight: bold', example: 'font(20) bold' },
          { syntax: 'medium', desc: 'font-weight: 500', example: 'font(14) medium' },
          { syntax: 'font-responsive(16/32)', desc: '반응형 폰트', example: 'font-responsive(16/32)' }
        ]
      },
      {
        title: 'Text',
        icon: '✍️',
        items: [
          { syntax: 'c(#333)', desc: '텍스트 색상', example: 'c(#333)' },
          { syntax: 'c(#333.5)', desc: '투명도 포함', example: 'c(#000.5)' },
          { syntax: 'c(red..blue)', desc: '그라디언트 텍스트', example: 'c(#667eea..#764ba2)' },
          { syntax: 'text(center)', desc: '텍스트 정렬', example: 'text(center)' },
          { syntax: 'uppercase', desc: '대문자 변환', example: 'uppercase tracking(.1em)' },
          { syntax: 'truncate', desc: '텍스트 말줄임', example: 'truncate w(200)' }
        ]
      }
    ],
    spacing: [
      {
        title: 'Padding',
        icon: '📦',
        items: [
          { syntax: 'p(20)', desc: '모든 방향 padding', example: 'p(20)' },
          { syntax: 'px(20)', desc: '좌우 padding', example: 'px(20) py(10)' },
          { syntax: 'py(20)', desc: '상하 padding', example: 'py(20)' },
          { syntax: 'p(20/40)', desc: '상하/좌우', example: 'p(20/40)' },
          { syntax: 'pt(20)', desc: 'padding-top', example: 'pt(20) pb(10)' }
        ]
      },
      {
        title: 'Margin',
        icon: '🔲',
        items: [
          { syntax: 'mt(20)', desc: 'margin-top', example: 'mt(20)' },
          { syntax: 'mx(auto)', desc: '가로 중앙 정렬', example: 'w(400) mx(auto)' },
          { syntax: 'mb(16)', desc: 'margin-bottom', example: 'mb(16)' }
        ]
      }
    ],
    visuals: [
      {
        title: 'Background',
        icon: '🎨',
        items: [
          { syntax: 'bg(#fff)', desc: '배경색', example: 'bg(#f5f5f5)' },
          { syntax: 'bg(#000.5)', desc: '투명 배경', example: 'bg(#000.5)' },
          { syntax: 'bg(gradient/135deg/#667eea/#764ba2)', desc: '그라디언트', example: 'bg(gradient/135deg/#667eea/#764ba2)' },
          { syntax: 'bg(#667eea..#764ba2)', desc: '간단한 그라디언트', example: 'bg(#667eea..#764ba2)' }
        ]
      },
      {
        title: 'Border & Radius',
        icon: '🔲',
        items: [
          { syntax: 'border(1/#e5e5e5)', desc: '테두리', example: 'border(1/#e5e5e5)' },
          { syntax: 'border-top(1/#000)', desc: '상단 테두리', example: 'border-top(1/#e5e5e5)' },
          { syntax: 'r(8)', desc: '둥근 모서리', example: 'r(8)' },
          { syntax: 'r()', desc: '원형 (50%)', example: 'w(40) h(40) r()' },
          { syntax: 'r(8/8/0/0)', desc: '개별 모서리', example: 'r(8/8/0/0)' }
        ]
      },
      {
        title: 'Effects',
        icon: '✨',
        items: [
          { syntax: 'shadow(sm)', desc: '작은 그림자', example: 'shadow(sm)' },
          { syntax: 'shadow(0/4px/6px/#0000001a)', desc: '커스텀 그림자', example: 'shadow(0/4px/6px/#0000001a)' },
          { syntax: 'opacity(.5)', desc: '투명도', example: 'opacity(.5)' },
          { syntax: 'blur(10)', desc: '블러 효과', example: 'blur(10)' },
          { syntax: 'backdrop(blur/10)', desc: '배경 블러', example: 'backdrop(blur/10)' }
        ]
      }
    ],
    interaction: [
      {
        title: 'Display & Visibility',
        icon: '👁️',
        items: [
          { syntax: 'hidden', desc: 'display: none', example: 'sm:hidden md:block' },
          { syntax: 'block', desc: 'display: block', example: 'hidden sm:block' },
          { syntax: 'inline', desc: 'display: inline', example: 'inline' }
        ]
      },
      {
        title: 'Overflow',
        icon: '📜',
        items: [
          { syntax: 'clip', desc: 'overflow: hidden', example: 'clip' },
          { syntax: 'clip(none)', desc: 'overflow: visible', example: 'clip(none)' },
          { syntax: 'scroll(y)', desc: 'overflow-y: auto', example: 'h(400) scroll(y)' },
          { syntax: 'scroll(x)', desc: 'overflow-x: auto', example: 'w(300) scroll(x)' }
        ]
      },
      {
        title: 'Interaction',
        icon: '🖱️',
        items: [
          { syntax: 'cursor(pointer)', desc: '포인터 커서', example: 'hover:bg(#f5f5f5) cursor(pointer)' },
          { syntax: 'pointer(none)', desc: '클릭 비활성화', example: 'pointer(none) opacity(.5)' },
          { syntax: 'select(none)', desc: '텍스트 선택 금지', example: 'select(none)' },
          { syntax: 'transition', desc: '부드러운 전환', example: 'transition hover:scale(1.05)' }
        ]
      }
    ],
    responsive: [
      {
        title: 'Breakpoints',
        icon: '📱',
        items: [
          { syntax: 'sm:hidden', desc: '640px 이상에서 숨김', example: 'sm:hidden' },
          { syntax: 'md:grid(2)', desc: '768px 이상에서 2열', example: 'grid(1) md:grid(2)' },
          { syntax: 'lg:font(20)', desc: '1024px 이상에서 폰트 20', example: 'font(16) lg:font(20)' },
          { syntax: '~sm:hidden', desc: '640px 미만에서 숨김', example: '~sm:hidden' }
        ]
      },
      {
        title: 'States',
        icon: '🎯',
        items: [
          { syntax: 'hover:bg(#f5f5f5)', desc: '호버 상태', example: 'hover:bg(#f5f5f5) transition' },
          { syntax: 'active:scale(0.98)', desc: '클릭 상태', example: 'active:scale(0.98)' },
          { syntax: 'focus:border(1/#000)', desc: '포커스 상태', example: 'focus:border(1/#3b82f6)' },
          { syntax: 'disabled:opacity(.5)', desc: '비활성 상태', example: 'disabled:opacity(.5)' }
        ]
      }
    ]
  };
  
  function getCategoryData() {
    if (selectedCategory === 'all') {
      return Object.entries(referenceData);
    }
    return referenceData[selectedCategory] ? [[selectedCategory, referenceData[selectedCategory]]] : [];
  }
  
  function filterSections(sections: ReferenceSection[]) {
    if (!searchQuery) return sections;
    
    return sections.map(section => ({
      ...section,
      items: section.items.filter(item => 
        item.syntax.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(section => section.items.length > 0);
  }
  
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copiedItem = text;
    setTimeout(() => copiedItem = '', 2000);
  }
  
  function getGeneratedCSS(syntax: string): string {
    try {
      const css = generateCSS([syntax]);
      // Extract just the CSS properties
      const match = css.match(/\{([^}]+)\}/);
      return match ? match[1].trim() : css;
    } catch {
      return '/* 예제 참고 */';
    }
  }
  
  $: categoryData = getCategoryData();
</script>

<div class="reference-container vbox w(fill) min-h(screen) bg(#fafbfc)">
  <!-- Header -->
  <header class="reference-header vbox gap(24) p(32) bg(white) border-bottom(1/#e5e5e5)">
    <div class="vbox gap(8) text(center)">
      <h1 class="font(40) bold c(#0a0a0a) tracking(-0.02em)">AdorableCSS v2 Reference</h1>
      <p class="font(18) c(#525252)">모든 유틸리티 클래스와 사용법을 한눈에</p>
    </div>
    
    <!-- Controls -->
    <div class="controls hbox gap(16) w(800) mx(auto)">
      <div class="search-wrapper relative flex">
        <input
          type="search"
          bind:value={searchQuery}
          placeholder="유틸리티 검색... (예: hbox, font, bg)"
          class="search-input w(fill) h(48) pl(48) pr(16) r(24) bg(#f5f5f5) border(1/transparent) font(15) c(#0a0a0a) placeholder:c(#a3a3a3) focus:bg(white) focus:border(1/#3b82f6) focus:shadow(0/0/0/4px/#3b82f620) transition"
        />
        <span class="search-icon absolute left(16) y(center) c(#737373) font(18) pointer(none)">🔍</span>
      </div>
      
      <select
        bind:value={selectedCategory}
        class="category-select h(48) px(20) r(24) bg(white) border(1/#e5e5e5) font(15) c(#0a0a0a) cursor(pointer) hover:border(1/#3b82f6) transition"
      >
        {#each categories as cat}
          <option value={cat.id}>{cat.icon} {cat.name}</option>
        {/each}
      </select>
    </div>
  </header>
  
  <!-- Content -->
  <main class="reference-content p(32)">
    <div class="content-wrapper w(1400) mx(auto) vbox gap(48)">
      {#each categoryData as [categoryId, sections]}
        {#each filterSections(sections) as section}
          <section class="reference-section vbox gap(24)">
            <div class="section-header hbox(center) gap(12)">
              <span class="section-icon font(32)">{section.icon}</span>
              <h2 class="font(28) bold c(#0a0a0a)">{section.title}</h2>
            </div>
            
            <div class="items-grid grid(3) gap(16)">
              {#each section.items as item}
                <div class="reference-card vbox gap(16) p(24) r(12) bg(white) border(1/#e5e5e5) hover:border(1/#3b82f6) hover:shadow(0/8px/24px/#0000000a) transition group">
                  <!-- Syntax -->
                  <div class="card-header hbox gap(auto)">
                    <code class="syntax font(16) bold c(#3b82f6) font-family(mono)">{item.syntax}</code>
                    <button
                      class="copy-btn opacity(0) group-hover:opacity(100) transition cursor(pointer) p(6) r(6) hover:bg(#f5f5f5)"
                      on:click={() => copyToClipboard(item.syntax)}
                    >
                      {copiedItem === item.syntax ? '✅' : '📋'}
                    </button>
                  </div>
                  
                  <!-- Description -->
                  <p class="desc font(14) c(#525252)">{item.desc}</p>
                  
                  <!-- Generated CSS -->
                  <div class="css-output vbox gap(8)">
                    <span class="label font(12) bold c(#737373) uppercase tracking(.05em)">생성되는 CSS</span>
                    <code class="css font(13) c(#0a0a0a) font-family(mono) bg(#f5f5f5) p(12) r(6)">
                      {getGeneratedCSS(item.syntax)}
                    </code>
                  </div>
                  
                  <!-- Example -->
                  {#if item.example}
                    <div class="example vbox gap(8)">
                      <span class="label font(12) bold c(#737373) uppercase tracking(.05em)">사용 예시</span>
                      <code class="example-code font(13) c(#059669) font-family(mono) bg(#d1fae5.2) p(12) r(6)">
                        {item.example}
                      </code>
                    </div>
                  {/if}
                  
                  <!-- Visual Preview (for some items) -->
                  {#if item.syntax.includes('shadow') || item.syntax.includes('r(') || item.syntax.includes('bg(')}
                    <div class="preview vbox gap(8)">
                      <span class="label font(12) bold c(#737373) uppercase tracking(.05em)">미리보기</span>
                      <div class="preview-box w(fill) h(60) {item.syntax} {item.syntax.includes('shadow') ? 'bg(white)' : ''}"></div>
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          </section>
        {/each}
      {/each}
    </div>
  </main>
</div>

<style>
  .search-input::-webkit-search-decoration,
  .search-input::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
  
  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23737373' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    padding-right: 40px;
  }
  
  .reference-card {
    container-type: inline-size;
  }
  
  @container (max-width: 400px) {
    .reference-card {
      font-size: 0.9em;
    }
  }
  
  @media (max-width: 1200px) {
    .items-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .items-grid {
      grid-template-columns: 1fr;
    }
    
    .controls {
      flex-direction: column;
      width: 100%;
    }
  }
  
  /* Animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .reference-card {
    animation: fadeIn 0.3s ease-out;
  }
</style>