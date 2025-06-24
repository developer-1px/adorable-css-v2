<script lang="ts">
  import { generateCSS } from 'adorable-css';
  
  let searchQuery = '';
  let selectedCategory = 'all';
  let copiedItem = '';
  
  const categories = [
    { id: 'all', name: '전체', icon: '🎨' },
    { id: 'layout', name: '레이아웃', icon: '📐' },
    { id: 'position', name: '위치', icon: '📍' },
    { id: 'typography', name: '텍스트', icon: '✏️' },
    { id: 'spacing', name: '여백', icon: '📏' },
    { id: 'visuals', name: '비주얼', icon: '🎨' },
    { id: 'interaction', name: '상호작용', icon: '👆' },
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
        title: 'Display',
        icon: '💻',
        items: [
          { syntax: 'block', desc: 'block', example: 'block' },
          { syntax: 'inline', desc: 'inline', example: 'inline' },
          { syntax: 'inline-block', desc: 'inline-block', example: 'inline-block' },
          { syntax: 'none', desc: 'none', example: 'none' },
          { syntax: 'hidden', desc: 'display: none', example: 'hidden' },
          { syntax: 'flex', desc: 'flex: 1', example: 'flex' },
          { syntax: 'inline-flex', desc: 'inline-flex', example: 'inline-flex' },
          { syntax: 'table', desc: 'table', example: 'table' },
          { syntax: 'table-cell', desc: 'table-cell', example: 'table-cell' },
          { syntax: 'table-row', desc: 'table-row', example: 'table-row' }
        ]
      },
      {
        title: 'Flexbox',
        icon: '📦',
        items: [
          { syntax: 'hbox', desc: 'flex 가로', example: 'hbox gap(16)' },
          { syntax: 'vbox', desc: 'flex 세로', example: 'vbox gap(20)' },
          { syntax: 'hbox(pack)', desc: '정중앙', example: 'hbox(pack)' },
          { syntax: 'hbox(center)', desc: 'align center', example: 'hbox(center)' },
          { syntax: 'hbox(end)', desc: 'justify end', example: 'hbox(end)' },
          { syntax: 'hbox(end+center)', desc: '복합 정렬', example: 'hbox(end+center)' },
          { syntax: 'gap(16)', desc: '간격', example: 'gap(16)' },
          { syntax: 'gap(auto)', desc: '자동 간격', example: 'gap(auto)' },
          { syntax: 'flex', desc: 'flex: 1', example: 'flex' },
          { syntax: 'wrap', desc: 'flex-wrap', example: 'hbox wrap' },
          { syntax: 'nowrap', desc: 'no wrap', example: 'nowrap' }
        ]
      },
      {
        title: 'Grid',
        icon: '🏗️',
        items: [
          { syntax: 'grid(3)', desc: '3열', example: 'grid(3)' },
          { syntax: 'grid(1/3)', desc: '반응형', example: 'grid(1/3)' },
          { syntax: 'grid-cols(4)', desc: '4열', example: 'grid-cols(4)' },
          { syntax: 'grid-rows(2)', desc: '2행', example: 'grid-rows(2)' },
          { syntax: 'col-span(2)', desc: '2열 차지', example: 'col-span(2)' },
          { syntax: 'row-span(3)', desc: '3행 차지', example: 'row-span(3)' }
        ]
      },
      {
        title: 'Size',
        icon: '📏',
        items: [
          { syntax: 'w(200)', desc: '200px', example: 'w(200)' },
          { syntax: 'w(fill)', desc: '100%', example: 'w(fill)' },
          { syntax: 'w(hug)', desc: 'fit-content', example: 'w(hug)' },
          { syntax: 'w(50%)', desc: '50%', example: 'w(50%)' },
          { syntax: 'h(screen)', desc: '100vh', example: 'h(screen)' },
          { syntax: 'h(auto)', desc: 'auto', example: 'h(auto)' },
          { syntax: 'w(200..400)', desc: 'min/max', example: 'w(200..400)' },
          { syntax: 'w(200..)', desc: 'min-width', example: 'w(200..)' },
          { syntax: 'w(..400)', desc: 'max-width', example: 'w(..400)' },
          { syntax: 'size(100)', desc: 'w+h 100px', example: 'size(100)' }
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
          { syntax: 'font(16)', desc: '16px', example: 'font(16)' },
          { syntax: 'font(sm)', desc: '토큰', example: 'font(sm)' },
          { syntax: 'font(Inter/16/1.5)', desc: '패밀리/크기/행간', example: 'font(Inter/16/1.5)' },
          { syntax: 'font(16/24)', desc: '크기/행간', example: 'font(16/24)' },
          { syntax: 'font(16/1.5/-2%)', desc: '크기/행간/자간', example: 'font(16/1.5/-2%)' },
          { syntax: 'thin', desc: '100', example: 'thin' },
          { syntax: 'light', desc: '300', example: 'light' },
          { syntax: 'medium', desc: '500', example: 'medium' },
          { syntax: 'semibold', desc: '600', example: 'semibold' },
          { syntax: 'bold', desc: '700', example: 'bold' },
          { syntax: 'heavy', desc: '900', example: 'heavy' }
        ]
      },
      {
        title: 'Text',
        icon: '✍️',
        items: [
          { syntax: 'c(#333)', desc: '색상', example: 'c(#333)' },
          { syntax: 'c(#333.5)', desc: '투명도', example: 'c(#000.5)' },
          { syntax: 'c(red)', desc: '명명된 색', example: 'c(red)' },
          { syntax: 'c(red..blue)', desc: '그라디언트', example: 'c(red..blue)' },
          { syntax: 'text(center)', desc: '중앙', example: 'text(center)' },
          { syntax: 'text(right)', desc: '오른쪽', example: 'text(right)' },
          { syntax: 'uppercase', desc: '대문자', example: 'uppercase' },
          { syntax: 'capitalize', desc: '첫글자 대문자', example: 'capitalize' },
          { syntax: 'italic', desc: '기울임', example: 'italic' },
          { syntax: 'underline', desc: '밑줄', example: 'underline' },
          { syntax: 'line-through', desc: '취소선', example: 'line-through' },
          { syntax: 'truncate', desc: '말줄임', example: 'truncate' },
          { syntax: 'nowrap', desc: '줄바꿈 없음', example: 'nowrap' },
          { syntax: 'letter-spacing(.1em)', desc: '자간', example: 'letter-spacing(.1em)' }
        ]
      }
    ],
    spacing: [
      {
        title: 'Padding',
        icon: '📦',
        items: [
          { syntax: 'p(20)', desc: '모든 방향', example: 'p(20)' },
          { syntax: 'p(sm)', desc: '토큰', example: 'p(sm)' },
          { syntax: 'px(20)', desc: '좌우', example: 'px(20)' },
          { syntax: 'py(20)', desc: '상하', example: 'py(20)' },
          { syntax: 'p(20/40)', desc: '상하/좌우', example: 'p(20/40)' },
          { syntax: 'p(10/20/30/40)', desc: '상/우/하/좌', example: 'p(10/20/30/40)' },
          { syntax: 'pt(20)', desc: '위', example: 'pt(20)' },
          { syntax: 'pr(20)', desc: '오른쪽', example: 'pr(20)' },
          { syntax: 'pb(20)', desc: '아래', example: 'pb(20)' },
          { syntax: 'pl(20)', desc: '왼쪽', example: 'pl(20)' }
        ]
      },
      {
        title: 'Margin',
        icon: '🔲',
        items: [
          { syntax: 'm(20)', desc: '모든 방향', example: 'm(20)' },
          { syntax: 'm(md)', desc: '토큰', example: 'm(md)' },
          { syntax: 'mx(auto)', desc: '가로 중앙', example: 'mx(auto)' },
          { syntax: 'my(20)', desc: '상하', example: 'my(20)' },
          { syntax: 'mt(20)', desc: '위', example: 'mt(20)' },
          { syntax: 'mr(20)', desc: '오른쪽', example: 'mr(20)' },
          { syntax: 'mb(20)', desc: '아래', example: 'mb(20)' },
          { syntax: 'ml(20)', desc: '왼쪽', example: 'ml(20)' }
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
      },
      {
        title: 'Transform',
        icon: '🔄',
        items: [
          { syntax: 'scale(1.1)', desc: '크기', example: 'scale(1.1)' },
          { syntax: 'scale(x/1.2)', desc: 'x축', example: 'scale(x/1.2)' },
          { syntax: 'rotate(45)', desc: '회전', example: 'rotate(45)' },
          { syntax: 'translate(10/20)', desc: '이동', example: 'translate(10/20)' },
          { syntax: 'skew(x/15)', desc: '기울기', example: 'skew(x/15)' },
          { syntax: 'origin(center)', desc: '기준점', example: 'origin(center)' }
        ]
      },
      {
        title: 'Animation',
        icon: '🎬',
        items: [
          { syntax: 'transition', desc: '전환', example: 'transition' },
          { syntax: 'transition(colors)', desc: '색상만', example: 'transition(colors)' },
          { syntax: 'duration(300)', desc: '시간', example: 'duration(300)' },
          { syntax: 'delay(100)', desc: '지연', example: 'delay(100)' },
          { syntax: 'ease(in-out)', desc: '이징', example: 'ease(in-out)' },
          { syntax: 'animate(spin)', desc: '회전', example: 'animate(spin)' },
          { syntax: 'animate(ping)', desc: '핑', example: 'animate(ping)' },
          { syntax: 'animate(bounce)', desc: '바운스', example: 'animate(bounce)' }
        ]
      },
      {
        title: 'SVG',
        icon: '🎨',
        items: [
          { syntax: 'fill(currentColor)', desc: '채우기', example: 'fill(currentColor)' },
          { syntax: 'fill(#ff0000)', desc: '색상', example: 'fill(#ff0000)' },
          { syntax: 'stroke(2/#000)', desc: '선', example: 'stroke(2/#000)' },
          { syntax: 'stroke-width(2)', desc: '선 두께', example: 'stroke-width(2)' }
        ]
      }
    ],
    interaction: [
      {
        title: 'Display',
        icon: '👁️',
        items: [
          { syntax: 'hidden', desc: 'none', example: 'hidden' },
          { syntax: 'block', desc: 'block', example: 'block' },
          { syntax: 'inline', desc: 'inline', example: 'inline' },
          { syntax: 'inline-block', desc: 'inline-block', example: 'inline-block' },
          { syntax: 'flex', desc: 'flex: 1', example: 'flex' },
          { syntax: 'table', desc: 'table', example: 'table' },
          { syntax: 'sr-only', desc: '스크린리더', example: 'sr-only' }
        ]
      },
      {
        title: 'Overflow',
        icon: '📜',
        items: [
          { syntax: 'clip', desc: 'hidden', example: 'clip' },
          { syntax: 'clip(none)', desc: 'visible', example: 'clip(none)' },
          { syntax: 'scroll', desc: 'auto', example: 'scroll' },
          { syntax: 'scroll(y)', desc: 'y auto', example: 'scroll(y)' },
          { syntax: 'scroll(x)', desc: 'x auto', example: 'scroll(x)' },
          { syntax: 'scrollbar(none)', desc: '스크롤바 숨김', example: 'scrollbar(none)' }
        ]
      },
      {
        title: 'Interaction',
        icon: '🖱️',
        items: [
          { syntax: 'cursor(pointer)', desc: '포인터', example: 'cursor(pointer)' },
          { syntax: 'cursor(not-allowed)', desc: '금지', example: 'cursor(not-allowed)' },
          { syntax: 'pointer(none)', desc: '클릭금지', example: 'pointer(none)' },
          { syntax: 'select(none)', desc: '선택금지', example: 'select(none)' },
          { syntax: 'select(all)', desc: '전체선택', example: 'select(all)' },
          { syntax: 'resize', desc: '크기조정', example: 'resize' },
          { syntax: 'appearance(none)', desc: '기본스타일 제거', example: 'appearance(none)' }
        ]
      }
    ],
    responsive: [
      {
        title: 'Breakpoints',
        icon: '📱',
        items: [
          { syntax: 'sm:', desc: '640px+', example: 'sm:hidden' },
          { syntax: 'md:', desc: '768px+', example: 'md:grid(2)' },
          { syntax: 'lg:', desc: '1024px+', example: 'lg:font(20)' },
          { syntax: 'xl:', desc: '1280px+', example: 'xl:w(1200)' },
          { syntax: '~sm:', desc: '~640px', example: '~sm:hidden' },
          { syntax: '~md:', desc: '~768px', example: '~md:vbox' }
        ]
      },
      {
        title: 'States',
        icon: '🎯',
        items: [
          { syntax: 'hover:', desc: '호버', example: 'hover:bg(#f5)' },
          { syntax: 'active:', desc: '클릭', example: 'active:scale(.98)' },
          { syntax: 'focus:', desc: '포커스', example: 'focus:ring(2)' },
          { syntax: 'disabled:', desc: '비활성', example: 'disabled:opacity(.5)' },
          { syntax: 'checked:', desc: '체크', example: 'checked:bg(blue)' },
          { syntax: 'group-hover:', desc: '그룹호버', example: 'group-hover:visible' },
          { syntax: 'first:', desc: '첫번째', example: 'first:mt(0)' },
          { syntax: 'last:', desc: '마지막', example: 'last:mb(0)' },
          { syntax: 'odd:', desc: '홀수', example: 'odd:bg(#f5)' },
          { syntax: 'even:', desc: '짝수', example: 'even:bg(#fa)' }
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
      const content = match ? match[1].trim() : css;
      // Simplify output for common cases
      return content
        .replace(/;\s*/g, '; ')
        .replace(/:\s*/g, ': ')
        .replace(/;$/, '') // Remove trailing semicolon
        .trim();
    } catch {
      return '/* - */';
    }
  }
  
  $: categoryData = getCategoryData();
</script>

<div class="reference-container vbox w(fill) min-h(screen) bg(#f8fafc)">
  <!-- Header -->
  <header class="reference-header vbox gap(8) p(12) bg(white) border-bottom(1/#e5e7eb)">
    <div class="vbox gap(8) text(center)">
      <h1 class="font(20) bold c(#0f172a) letter-spacing(-0.02em)">AdorableCSS v2 Reference</h1>
      <p class="font(12) c(#64748b)">모든 유틸리티 클래스와 사용법</p>
    </div>
    
    <!-- Controls -->
    <div class="controls hbox gap(8) w(500) mx(auto)">
      <div class="search-wrapper relative flex">
        <input
          type="search"
          bind:value={searchQuery}
          placeholder="유틸리티 검색... (예: hbox, font, bg)"
          class="search-input w(fill) h(32) pl(32) pr(10) r(16) bg(#f1f5f9) border(1/transparent) font(12) c(#0f172a) placeholder:c(#94a3b8) focus:bg(white) focus:border(1/#3b82f6) focus:shadow(0/0/0/2px/#3b82f620) transition"
        />
        <span class="search-icon absolute left(10) y(center) c(#64748b) font(12) pointer(none)">🔍</span>
      </div>
      
      <select
        bind:value={selectedCategory}
        class="category-select h(32) px(12) r(16) bg(white) border(1/#e5e7eb) font(12) c(#0f172a) cursor(pointer) hover:border(1/#3b82f6) transition"
      >
        {#each categories as cat}
          <option value={cat.id}>{cat.icon} {cat.name}</option>
        {/each}
      </select>
    </div>
  </header>
  
  <!-- Content -->
  <main class="reference-content px(12) py(12)">
    <div class="content-wrapper w(fill) mx(auto) vbox gap(16)">
      {#each categoryData as [categoryId, sections]}
        {#each filterSections(sections) as section}
          <section class="reference-section vbox gap(8)">
            <div class="section-header hbox(center) gap(12)">
              <span class="section-icon font(16)">{section.icon}</span>
              <h2 class="font(16) bold c(#0f172a)">{section.title}</h2>
            </div>
            
            <div class="items-grid grid(8) gap(6)">
              {#each section.items as item}
                <div class="reference-card vbox gap(4) p(8) r(6) bg(white) border(1/#e5e7eb) hover:border(1/#3b82f6) hover:shadow(0/2px/6px/#00000008) transition group">
                  <!-- Syntax -->
                  <div class="card-header hbox gap(auto) items-start">
                    <code class="syntax font(11) bold c(#3b82f6) font-family(mono) break-all">{item.syntax}</code>
                    <button
                      class="copy-btn opacity(0) group-hover:opacity(100) transition cursor(pointer) p(1) r(2) hover:bg(#f1f5f9) font(10)"
                      on:click={() => copyToClipboard(item.syntax)}
                    >
                      {copiedItem === item.syntax ? '✅' : '📋'}
                    </button>
                  </div>
                  
                  <!-- Description -->
                  <p class="desc font(10) c(#64748b) line-height(1.2)">{item.desc}</p>
                  
                  <!-- Generated CSS -->
                  <div class="css-output vbox gap(2)">
                    <code class="css font(10) c(#475569) font-family(mono) bg(#f8fafc) p(4) r(2) line-height(1.1)">
                      {getGeneratedCSS(item.syntax)}
                    </code>
                  </div>
                  
                  <!-- Example -->
                  {#if item.example}
                    <code class="example-code font(10) c(#059669) font-family(mono) bg(#ecfdf5.5) p(2) r(2) line-height(1.1)">
                      {item.example}
                    </code>
                  {/if}
                  
                  <!-- Visual Preview (for some items) -->
                  {#if item.syntax.includes('shadow') || item.syntax.includes('r(') || item.syntax.includes('bg(')}
                    <div class="preview-box w(fill) h(24) {item.syntax} {item.syntax.includes('shadow') ? 'bg(white)' : ''}"></div>
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
    font-size: 0.75rem;
  }
  
  @container (max-width: 400px) {
    .reference-card {
      font-size: 0.9em;
    }
  }
  
  @media (max-width: 1600px) {
    .items-grid {
      grid-template-columns: repeat(6, 1fr);
    }
  }
  
  @media (max-width: 1200px) {
    .items-grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }
  
  @media (max-width: 1000px) {
    .items-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .items-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (max-width: 500px) {
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
  
  /* Dense layout optimizations */
  .css, .example-code {
    word-break: break-word;
    overflow-wrap: break-word;
  }
  
  .syntax {
    max-width: 100%;
  }
  
  /* Compact spacing for labels */
  .label {
    margin-bottom: -2px;
  }
  
  /* Tighter preview boxes */
  .preview-box {
    min-height: 24px;
  }
  
  /* Ultra compact mode */
  .reference-card:hover {
    transform: translateY(-1px);
  }
  
  /* Remove unnecessary margins */
  .reference-card > *:last-child {
    margin-bottom: 0;
  }
</style>