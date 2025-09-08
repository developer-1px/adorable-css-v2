<script lang="ts">
  import { onMount } from 'svelte';
  import { Copy, Check, Search } from 'lucide-svelte';
  
  // Comprehensive syntax patterns organized by category
  const syntaxSections = {
    'Layout System': {
      icon: '📐',
      groups: [
        {
          title: 'Flexbox Containers',
          patterns: [
            { code: 'hbox()', description: 'Horizontal flexbox container' },
            { code: 'vbox()', description: 'Vertical flexbox container' },
            { code: 'hbox(center)', description: 'Center alignment' },
            { code: 'hbox(pack)', description: 'Space between items' },
            { code: 'vbox(middle)', description: 'Center items vertically' },
            { code: 'hbox(pack/middle)', description: 'Space between + center' },
            { code: 'hbox(center+middle)', description: 'Combined alignment' }
          ]
        },
        {
          title: 'Grid System',
          patterns: [
            { code: 'grid(2fr)', description: '2 equal columns' },
            { code: 'grid(1fr/2fr)', description: '1:2 ratio columns' },
            { code: 'grid(auto-fit/300px)', description: 'Auto fit 300px min' },
            { code: 'gap(md)', description: 'Grid/flex gap' },
            { code: 'gap-x(lg)', description: 'Horizontal gap only' },
            { code: 'gap-y(sm)', description: 'Vertical gap only' }
          ]
        },
        {
          title: 'Positioning',
          patterns: [
            { code: 'fixed', description: 'Fixed position' },
            { code: 'absolute', description: 'Absolute position' },
            { code: 'sticky', description: 'Sticky position' },
            { code: 'top(0)', description: 'Top: 0' },
            { code: 'inset(0)', description: 'All sides: 0' },
            { code: 'z(10)', description: 'Z-index: 10' }
          ]
        }
      ]
    },
    'Typography System': {
      icon: '✍️',
      groups: [
        {
          title: 'Typography Components',
          patterns: [
            { code: 'display()', description: 'Display text component' },
            { code: 'display(lg)', description: 'Large display text' },
            { code: 'display(xl)', description: 'Extra large display' },
            { code: 'heading()', description: 'Heading component' },
            { code: 'heading(h1)', description: 'H1 heading style' },
            { code: 'heading(h2)', description: 'H2 heading style' },
            { code: 'title()', description: 'Title component' },
            { code: 'title(lg)', description: 'Large title' },
            { code: 'body()', description: 'Body text component' },
            { code: 'body(lg)', description: 'Large body text' },
            { code: 'label()', description: 'Label component' },
            { code: 'caption()', description: 'Caption component' }
          ]
        },
        {
          title: 'Text Function (Universal)',
          patterns: [
            { code: 'text(16px)', description: 'Font size: 16px' },
            { code: 'text(lg)', description: 'Token-based size' },
            { code: 'text(16px/1.5)', description: 'Size + line height' },
            { code: 'text(lg/1.2/-2%)', description: 'Size + line + spacing' },
            { code: 'text(sm..2xl)', description: 'Responsive clamp sizing' },
            { code: 'text(16px..4vw..48px)', description: 'Custom clamp values' }
          ]
        },
        {
          title: 'Text Properties',
          patterns: [
            { code: 'text(center)', description: 'Text align center' },
            { code: 'text(uppercase)', description: 'Text transform uppercase' },
            { code: 'text(nowrap)', description: 'No line breaks' },
            { code: 'text(center+uppercase)', description: 'Combined properties' },
            { code: 'text(lg/1.5/center+nowrap)', description: 'Full text styling' }
          ]
        },
        {
          title: 'Font Weight & Family',
          patterns: [
            { code: 'font(400)', description: 'Numeric weight' },
            { code: 'font(bold)', description: 'Named weight' },
            { code: 'font(semibold)', description: 'Font weight 600' },
            { code: 'font(mono)', description: 'Monospace family' },
            { code: 'font(serif)', description: 'Serif family' }
          ]
        }
      ]
    },
    'Colors': {
      icon: '🎨',
      groups: [
        {
          title: 'Color Properties',
          patterns: [
            { code: 'c(primary)', description: 'Text color' },
            { code: 'bg(white)', description: 'Background color' },
            { code: 'border(gray-200)', description: 'Border color' },
            { code: 'bg(white.5)', description: '50% opacity' },
            { code: 'c(red-500.8)', description: 'Color with 80% opacity' }
          ]
        },
        {
          title: 'Color Palette',
          patterns: [
            { code: 'c(red-500)', description: 'Shade-based color' },
            { code: 'bg(blue-100)', description: 'Light blue background' },
            { code: 'c(gray-900)', description: 'Dark gray text' },
            { code: 'bg(purple-500)', description: 'Purple background' },
            { code: 'border(green-300)', description: 'Green border' }
          ]
        },
        {
          title: 'Gradients',
          patterns: [
            { code: 'bg(red..blue)', description: 'Basic gradient' },
            { code: 'bg(135deg/purple-500..pink-500)', description: 'Angled gradient' },
            { code: 'bg(to-tr/red..blue)', description: 'Directional gradient' },
            { code: 'c(135deg/purple-600..pink-600)', description: 'Text gradient' }
          ]
        }
      ]
    },
    'Spacing': {
      icon: '📏',
      groups: [
        {
          title: 'Padding',
          patterns: [
            { code: 'p(md)', description: 'All sides padding' },
            { code: 'px(lg)', description: 'Horizontal padding' },
            { code: 'py(sm)', description: 'Vertical padding' },
            { code: 'pt(xl)', description: 'Top padding' },
            { code: 'p(sm/lg)', description: 'Vertical/Horizontal' },
            { code: 'p(xs/sm/md/lg)', description: 'Four-side padding' }
          ]
        },
        {
          title: 'Margin',
          patterns: [
            { code: 'm(auto)', description: 'Center element' },
            { code: 'mx(auto)', description: 'Center horizontally' },
            { code: 'mt(lg)', description: 'Top margin' },
            { code: 'mb(-sm)', description: 'Negative margin' },
            { code: 'm(lg/auto)', description: 'Vertical/Horizontal margin' }
          ]
        }
      ]
    },
    'Sizing': {
      icon: '📦',
      groups: [
        {
          title: 'Width & Height',
          patterns: [
            { code: 'w(fill)', description: 'Width: 100% (Figma Fill)' },
            { code: 'w(hug)', description: 'Width: fit-content (Figma Hug)' },
            { code: 'w(300px)', description: 'Fixed width' },
            { code: 'h(100vh)', description: 'Full viewport height' },
            { code: 'min-w(320px)', description: 'Minimum width' },
            { code: 'max-h(80vh)', description: 'Maximum height' }
          ]
        },
        {
          title: 'Special Sizing',
          patterns: [
            { code: 'size(16:9)', description: 'Aspect ratio' },
            { code: 'size(320x200)', description: 'Fixed dimensions' },
            { code: 'flex(1)', description: 'Flex grow' },
            { code: 'flex(none)', description: 'No flex' },
            { code: 'w(100%-20px)', description: 'Calc-like syntax' }
          ]
        }
      ]
    },
    'Effects': {
      icon: '✨',
      groups: [
        {
          title: 'Shadows',
          patterns: [
            { code: 'shadow(sm)', description: 'Small shadow' },
            { code: 'shadow(md)', description: 'Medium shadow' },
            { code: 'shadow(lg)', description: 'Large shadow' },
            { code: 'shadow(xl)', description: 'Extra large shadow' },
            { code: 'shadow(none)', description: 'Remove shadow' }
          ]
        },
        {
          title: 'Border Radius',
          patterns: [
            { code: 'r(sm)', description: 'Small radius' },
            { code: 'r(md)', description: 'Medium radius' },
            { code: 'r(lg)', description: 'Large radius' },
            { code: 'r(full)', description: 'Fully rounded' },
            { code: 'r(8/16/8/16)', description: 'Individual corners' }
          ]
        },
        {
          title: 'Transforms',
          patterns: [
            { code: 'scale(1.05)', description: 'Scale 105%' },
            { code: 'rotate(45deg)', description: 'Rotate 45 degrees' },
            { code: 'translate(10px, 20px)', description: 'Move element' },
            { code: 'opacity(0.5)', description: '50% opacity' }
          ]
        }
      ]
    },
    'States & Interactions': {
      icon: '🔄',
      groups: [
        {
          title: 'Pseudo States',
          patterns: [
            { code: 'hover:bg(coral)', description: 'Hover state' },
            { code: 'focus:border(blue)', description: 'Focus state' },
            { code: 'active:scale(0.95)', description: 'Active/pressed state' },
            { code: 'disabled:opacity(0.5)', description: 'Disabled state' },
            { code: 'checked:bg(blue-500)', description: 'Checked state' }
          ]
        },
        {
          title: 'Group States',
          patterns: [
            { code: 'group-hover:opacity(1)', description: 'Group hover' },
            { code: 'peer-focus:ring(2)', description: 'Peer focus' },
            { code: 'group-focus:scale(1.05)', description: 'Group focus' }
          ]
        },
        {
          title: 'Transitions',
          patterns: [
            { code: 'transition', description: 'Smooth transitions' },
            { code: 'transition(fast)', description: 'Fast transition' },
            { code: 'transition(slow)', description: 'Slow transition' },
            { code: 'duration(300)', description: 'Custom duration' }
          ]
        }
      ]
    },
    'Responsive Design': {
      icon: '📱',
      groups: [
        {
          title: 'Breakpoint Prefixes',
          patterns: [
            { code: 'sm:p(lg)', description: 'Small screens and up' },
            { code: 'md:grid(2fr)', description: 'Medium screens and up' },
            { code: 'lg:hbox', description: 'Large screens and up' },
            { code: 'xl:w(1200px)', description: 'Extra large and up' },
            { code: '..md:hidden', description: 'Up to medium screens' }
          ]
        },
        {
          title: 'Responsive Combinations',
          patterns: [
            { code: 'hover:md:scale(1.1)', description: 'State + responsive' },
            { code: 'md:hover:bg(gray-100)', description: 'Responsive + state' },
            { code: 'lg:group-hover:opacity(1)', description: 'Complex combinations' }
          ]
        }
      ]
    }
  };

  // Search functionality
  let searchTerm = '';
  let copiedItems = new Set();
  let filteredSections = syntaxSections;

  $: {
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filteredSections = {};
      
      Object.entries(syntaxSections).forEach(([sectionName, section]) => {
        const filteredGroups = section.groups.map(group => ({
          ...group,
          patterns: group.patterns.filter(pattern => 
            pattern.code.toLowerCase().includes(term) || 
            pattern.description.toLowerCase().includes(term)
          )
        })).filter(group => group.patterns.length > 0);
        
        if (filteredGroups.length > 0) {
          filteredSections[sectionName] = {
            ...section,
            groups: filteredGroups
          };
        }
      });
    } else {
      filteredSections = syntaxSections;
    }
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      copiedItems.add(text);
      copiedItems = new Set(copiedItems);
      setTimeout(() => {
        copiedItems.delete(text);
        copiedItems = new Set(copiedItems);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  // Quick navigation items
  const quickNavItems = Object.entries(syntaxSections).map(([name, section]) => ({
    name,
    icon: section.icon,
    id: name.toLowerCase().replace(/\s+/g, '-')
  }));

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
</script>

<svelte:head>
  <title>AdorableCSS Syntax Cheat Sheet</title>
  <meta name="description" content="Complete syntax reference for AdorableCSS - all patterns and examples in one place" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Kalam:wght@300;400;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h(100vh) bg(cream)">
  <!-- Floating decorative elements -->
  <div class="fixed top(5%) left(2%) c(gray-400/15) pointer-events(none) z(-1) text(3xl) rotate(-15deg)">✨</div>
  <div class="fixed top(15%) right(5%) c(gray-400/15) pointer-events(none) z(-1) text(3xl) rotate(20deg)">🎨</div>
  <div class="fixed bottom(25%) left(3%) c(gray-400/15) pointer-events(none) z(-1) text(3xl) rotate(-10deg)">&lbrace; &rbrace;</div>
  <div class="fixed bottom(15%) right(2%) c(gray-400/15) pointer-events(none) z(-1) text(3xl) rotate(15deg)">💖</div>

  <!-- Header -->
  <header class="text(center) py(4xl) relative mb(4xl)">
    <div class="container(6xl) mx(auto) px(3xl)">
      <h1 class="text(clamp(2.25rem,8vw,3rem)) mb(lg) rotate(-2deg) c(coral) leading(tight)"
          style="font-family: 'Caveat', cursive; font-weight: 700;">
        AdorableCSS Cheat Sheet
      </h1>
      <p class="text(xl) c(warm-gray) rotate(1deg) font(medium)"
         style="font-family: 'Kalam', cursive;">
        모든 문법을 한눈에! 빠른 참고 가이드
      </p>
    </div>
  </header>

  <!-- Search Section -->
  <section class="mb(4xl) text(center)">
    <div class="container(2xl) mx(auto) px(3xl)">
      <div class="relative max-w(600px) mx(auto)">
        <div class="relative">
          <input
            bind:value={searchTerm}
            type="text"
            placeholder="문법 검색... (예: hbox, text, bg)"
            class="w(full) p(lg/xl) border(3/soft-black) r(2xl) text(lg) bg(white) 
                   rotate(-0.5deg) transition focus:rotate(0deg) focus:translate-y(-3px) 
                   focus:shadow(6px 6px 0 var(--accent-yellow)) focus:outline(none)"
            style="font-family: 'Space Mono', monospace;"
          />
        </div>
        <p class="mt(lg) c(warm-gray) text(base)"
           style="font-family: 'Kalam', cursive; font-weight: 500;">
          💡 원하는 속성이나 값을 입력하여 빠르게 찾아보세요!
        </p>
      </div>
    </div>
  </section>

  <!-- Quick Navigation -->
  <nav class="mb(4xl)">
    <div class="container(6xl) mx(auto) px(3xl)">
      <div class="hbox(center) gap(md) flex-wrap justify(center)">
        {#each quickNavItems as item, i}
          <button
            on:click={() => scrollToSection(item.id)}
            class="bg(white) border(2/soft-black) p(sm/lg) r(xl) text(decoration-none) 
                   c(charcoal) font(semibold) text(sm) transition cursor(pointer)
                   hover:rotate(0deg) hover:translate-y(-2px) hover:bg(coral) hover:c(white) 
                   hover:shadow(3px 3px 0 var(--soft-black))
                   {i % 2 === 0 ? 'rotate(-2deg)' : 'rotate(2deg)'}"
          >
            {item.icon} {item.name}
          </button>
        {/each}
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <div class="container(6xl) mx(auto) px(3xl) pb(4xl)">
    <div class="grid(repeat(auto-fit,minmax(400px,1fr))) gap(xl)">
      {#each Object.entries(filteredSections) as [sectionName, section], sectionIndex}
        <section 
          id={sectionName.toLowerCase().replace(/\s+/g, '-')}
          class="bg(white) border(3/soft-black) r(lg) p(xl) relative transition
                 hover:rotate(0deg) hover:translate-y(-5px) hover:shadow(8px 8px 0 var(--accent-blue))
                 {sectionIndex % 6 === 0 ? 'rotate(0.5deg)' : 
                  sectionIndex % 6 === 1 ? 'rotate(-0.5deg)' : 
                  sectionIndex % 6 === 2 ? 'rotate(1deg)' : 
                  sectionIndex % 6 === 3 ? 'rotate(-1deg)' :
                  sectionIndex % 6 === 4 ? 'rotate(0.5deg)' : 'rotate(-0.5deg)'}"
        >
          <!-- Section Header -->
          <div class="hbox(middle/between) mb(lg) pb(md) border-b(2/light-gray)">
            <h2 class="text(2xl) c(charcoal)"
                style="font-family: 'Caveat', cursive; font-weight: 700;">{sectionName}</h2>
            <div class="bg(coral) c(white) w(40px) h(40px) r(full) hbox(center/middle) 
                        text(lg) rotate(-10deg)">
              {section.icon}
            </div>
          </div>

          <!-- Groups -->
          {#each section.groups as group}
            <div class="mb(lg)">
              <h3 class="text(lg) font(bold) c(purple-600) mb(md) relative"
                  style="font-family: 'Kalam', cursive;">
                <span class="absolute left(-md) c(accent-yellow)"
                      style="font-family: 'Caveat', cursive; font-weight: 700;">→</span>
                {group.title}
              </h3>

              <div class="vbox gap(sm)">
                {#each group.patterns as pattern}
                  <div class="grid(1fr auto) gap(md) items(center) p(sm/md) bg(cream) r(sm) 
                             transition hover:bg(accent-yellow) hover:translate-x(5px) cursor(pointer)"
                       on:click={() => copyToClipboard(pattern.code)}
                       role="button"
                       tabindex="0"
                       title="클릭하여 문법 복사">
                    <div class="vbox gap(xs)">
                      <code class="text(sm) c(charcoal) font(semibold)"
                            style="font-family: 'Space Mono', monospace;">{pattern.code}</code>
                      <span class="text(xs) c(warm-gray)">{pattern.description}</span>
                    </div>
                    <div class="w(24px) h(24px) hbox(center/middle)">
                      {#if copiedItems.has(pattern.code)}
                        <Check size="16" class="c(green-600)" />
                      {:else}
                        <Copy size="14" class="c(gray-400)" />
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/each}

          <!-- Section Tips -->
          {#if sectionName === 'Layout System'}
            <div class="bg(accent-green) c(white) p(md) r(md) mt(lg) relative rotate(-0.5deg) text(sm)">
              <div class="absolute top(-10px) left(md) bg(white) p(xs) r(full) border(2/soft-black)">💡</div>
              <strong>Layout Tip:</strong> hbox()와 vbox()는 Figma의 Auto Layout과 완전히 동일합니다!
            </div>
          {:else if sectionName === 'Typography System'}
            <div class="bg(accent-green) c(white) p(md) r(md) mt(lg) relative rotate(-0.5deg) text(sm)">
              <div class="absolute top(-10px) left(md) bg(white) p(xs) r(full) border(2/soft-black)">💡</div>
              <strong>Typography Tip:</strong> text() 함수 하나로 모든 텍스트 스타일링이 가능해요!
            </div>
          {:else if sectionName === 'Colors'}
            <div class="bg(accent-green) c(white) p(md) r(md) mt(lg) relative rotate(-0.5deg) text(sm)">
              <div class="absolute top(-10px) left(md) bg(white) p(xs) r(full) border(2/soft-black)">💡</div>
              <strong>Color Tip:</strong> .5, .8 등의 숫자로 투명도를 조절할 수 있어요!
            </div>
          {:else if sectionName === 'Effects'}
            <div class="bg(accent-green) c(white) p(md) r(md) mt(lg) relative rotate(-0.5deg) text(sm)">
              <div class="absolute top(-10px) left(md) bg(white) p(xs) r(full) border(2/soft-black)">💡</div>
              <strong>Effects Tip:</strong> transition 클래스를 추가하면 모든 변화가 부드럽게 애니메이션됩니다!
            </div>
          {/if}
        </section>
      {/each}
    </div>

    <!-- Quick Reference Guide -->
    <section class="mt(4xl) bg(light-gray) border(2/soft-black) p(3xl) r(lg)">
      <h2 class="text(3xl) tracking(tight) c(soft-black) mb(2xl)"
          style="font-family: 'Caveat', cursive; font-weight: 700;">Quick Reference Symbols</h2>
      
      <div class="grid(1) sm:grid(2) lg:grid(4) gap(2xl)">
        <!-- Separators -->
        <div class="vbox gap(md)">
          <h3 class="text(base) font(bold) c(soft-black) mb(sm)"
              style="font-family: 'Kalam', cursive;">Separators</h3>
          <div class="vbox gap(xs)">
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(24px) text(center)"
                    style="font-family: 'Space Mono', monospace;">/</code>
              <span class="text(xs) c(warm-gray)">Multiple values</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(24px) text(center)"
                    style="font-family: 'Space Mono', monospace;">+</code>
              <span class="text(xs) c(warm-gray)">Combined values</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(24px) text(center)"
                    style="font-family: 'Space Mono', monospace;">:</code>
              <span class="text(xs) c(warm-gray)">Key-value pairs</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(24px) text(center)"
                    style="font-family: 'Space Mono', monospace;">..</code>
              <span class="text(xs) c(warm-gray)">Gradients/ranges</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(24px) text(center)"
                    style="font-family: 'Space Mono', monospace;">.</code>
              <span class="text(xs) c(warm-gray)">Opacity notation</span>
            </div>
          </div>
        </div>

        <!-- Prefixes -->
        <div class="vbox gap(md)">
          <h3 class="text(base) font(bold) c(soft-black) mb(sm)"
              style="font-family: 'Kalam', cursive;">Prefixes</h3>
          <div class="vbox gap(xs)">
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(48px) text(center)"
                    style="font-family: 'Space Mono', monospace;">hover:</code>
              <span class="text(xs) c(warm-gray)">Hover state</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(48px) text(center)"
                    style="font-family: 'Space Mono', monospace;">md:</code>
              <span class="text(xs) c(warm-gray)">Responsive</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(48px) text(center)"
                    style="font-family: 'Space Mono', monospace;">group-</code>
              <span class="text(xs) c(warm-gray)">Group state</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(48px) text(center)"
                    style="font-family: 'Space Mono', monospace;">!</code>
              <span class="text(xs) c(warm-gray)">Important</span>
            </div>
          </div>
        </div>

        <!-- Special Values -->
        <div class="vbox gap(md)">
          <h3 class="text(base) font(bold) c(soft-black) mb(sm)"
              style="font-family: 'Kalam', cursive;">Special Values</h3>
          <div class="vbox gap(xs)">
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(36px) text(center)"
                    style="font-family: 'Space Mono', monospace;">auto</code>
              <span class="text(xs) c(warm-gray)">Auto keyword</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(36px) text(center)"
                    style="font-family: 'Space Mono', monospace;">full</code>
              <span class="text(xs) c(warm-gray)">100% token</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(36px) text(center)"
                    style="font-family: 'Space Mono', monospace;">16:9</code>
              <span class="text(xs) c(warm-gray)">Aspect ratio</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(36px) text(center)"
                    style="font-family: 'Space Mono', monospace;">-10</code>
              <span class="text(xs) c(warm-gray)">Negative value</span>
            </div>
          </div>
        </div>

        <!-- Tokens -->
        <div class="vbox gap(md)">
          <h3 class="text(base) font(bold) c(soft-black) mb(sm)"
              style="font-family: 'Kalam', cursive;">Common Tokens</h3>
          <div class="vbox gap(xs)">
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(36px) text(center)"
                    style="font-family: 'Space Mono', monospace;">xs</code>
              <span class="text(xs) c(warm-gray)">Extra small</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(36px) text(center)"
                    style="font-family: 'Space Mono', monospace;">sm</code>
              <span class="text(xs) c(warm-gray)">Small</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(36px) text(center)"
                    style="font-family: 'Space Mono', monospace;">md</code>
              <span class="text(xs) c(warm-gray)">Medium</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(36px) text(center)"
                    style="font-family: 'Space Mono', monospace;">lg</code>
              <span class="text(xs) c(warm-gray)">Large</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(bold) px(xs) py(2xs) bg(light-gray) c(soft-black) r(xs) 
                           min-w(36px) text(center)"
                    style="font-family: 'Space Mono', monospace;">xl</code>
              <span class="text(xs) c(warm-gray)">Extra large</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  /* Custom CSS variables for the design system - Matching original HTML */
  :root {
    /* Colors */
    --cream: #FFFEF9;
    --soft-black: #1A1A1A;
    --charcoal: #2D2D2D;
    --warm-gray: #6B6B6B;
    --light-gray: #E8E8E8;
    --accent-coral: #FF6B6B;
    --accent-blue: #4ECDC4;
    --accent-yellow: #FFE66D;
    --accent-purple: #9B59B6;
    --accent-green: #26D0CE;
    --white: #FFFFFF;
    --coral: #FF6B6B;
    --purple-600: #9B59B6;
    --green-500: #26D0CE;
    
    /* Shadows */
    --shadow-soft: rgba(0, 0, 0, 0.06);
    --shadow-medium: rgba(0, 0, 0, 0.12);
    --shadow-strong: rgba(0, 0, 0, 0.24);
    
    /* Typography Scale */
    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 1.875rem;
    --text-4xl: 2.25rem;
    --text-5xl: 3rem;
    
    /* Spacing */
    --space-xs: 0.25rem;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;
    --space-2xl: 3rem;
    --space-3xl: 4rem;
    
    /* Border Radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-2xl: 1.5rem;
  }
  
  /* Ensure smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
  
  /* Font smoothing for better text rendering */
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>