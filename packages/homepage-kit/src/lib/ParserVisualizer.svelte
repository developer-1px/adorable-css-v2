<script lang="ts">
  import { parseAdorableCSS, generateCSSFromAdorableCSS } from 'adorable-css';
  import CodeHighlighter from '../components/CodeHighlighter.svelte';
  import Code from '../components/Code.svelte';
  import { 
    Sparkles,
    ArrowRight,
    Copy,
    Check,
    Zap
  } from 'lucide-svelte';
  
  let input = 'hbox(pack) gap(lg) p(xl) bg(primary..accent) r(lg) shadow(lg) hover:scale(1.05) transition';
  let result: any = null;
  let css = '';
  let error = '';
  let copiedItem = '';
  let selectedExample = '';
  
  $: {
    try {
      error = '';
      result = parseAdorableCSS(input);
      css = generateCSSFromAdorableCSS(input);
    } catch (e: any) {
      error = e.message;
      result = null;
      css = '';
    }
  }
  
  // Curated examples organized by category
  const exampleCategories = [
    {
      name: 'Layout',
      icon: '📐',
      examples: [
        { code: 'hbox(pack)', label: 'Center All' },
        { code: 'vbox gap(lg)', label: 'Stack' },
        { code: 'grid grid-cols(3)', label: 'Grid' },
        { code: 'layer', label: 'Fill Parent' }
      ]
    },
    {
      name: 'Styling',
      icon: '🎨',
      examples: [
        { code: 'bg(primary..accent)', label: 'Gradient' },
        { code: 'shadow(lg) r(xl)', label: 'Card' },
        { code: 'backdrop-blur(md)', label: 'Glass' },
        { code: 'b(2/primary)', label: 'Border' }
      ]
    },
    {
      name: 'Animation',
      icon: '✨',
      examples: [
        { code: 'hover:scale(1.05)', label: 'Hover Scale' },
        { code: 'transition', label: 'Smooth' },
        { code: 'transform(rotate(45))', label: 'Rotate' },
        { code: 'hover:shadow(xl)', label: 'Hover Glow' }
      ]
    },
    {
      name: 'Typography',
      icon: '💬',
      examples: [
        { code: 'font(lg/1.5)', label: 'Font Size' },
        { code: 'heading(h1)', label: 'Heading' },
        { code: 'c(primary)', label: 'Color' },
        { code: 'truncate', label: 'Ellipsis' }
      ]
    }
  ];
  
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copiedItem = text;
    setTimeout(() => copiedItem = '', 2000);
  }
  
  function selectExample(code: string) {
    input = code;
    selectedExample = code;
    setTimeout(() => selectedExample = '', 1000);
  }
</script>

<div class="parser-container min-h(screen) bg(white) relative clip">
  <!-- Subtle background accent -->
  <div class="layer(top:-20%+right:-10%) w(800px) h(800px) bg(primary) opacity(3) r(full) blur(200px) pointer(none)"></div>
  <div class="layer(bottom:-30%+left:-15%) w(1000px) h(1000px) bg(accent) opacity(2) r(full) blur(250px) pointer(none)"></div>
  
  <!-- Main content -->
  <div class="relative z(10) container(max:1400)">
    <!-- Minimal header -->
    <header class="text(center) mb(3xl)">
      <div class="inline-block">
        <h1 class="font(3xl) bold c(gray-900) letter-spacing(-0.02em) mb(sm)">
          AdorableCSS Parser
        </h1>
        <p class="font(md) c(gray-600)">
          Transform your syntax into beautiful CSS
        </p>
      </div>
    </header>
    
    <!-- Main parser section -->
    <div class="parser-section container(max:1200/px:0)">
      <!-- Input area with live feedback -->
      <div class="input-section bg(white) r(2xl) shadow(lg) p(2xl) mb(xl) b(1/gray-100)">
        <div class="hbox(top) gap(lg)">
          <!-- Input side -->
          <div class="flex vbox gap(lg)">
            <div class="hbox(middle) gap(sm) mb(sm)">
              <Zap size={20} class="c(primary)" />
              <label class="font(sm) bold c(gray-700) uppercase letter-spacing(0.05em)">
                AdorableCSS Input
              </label>
            </div>
            
            <input
              bind:value={input}
              placeholder="Enter AdorableCSS syntax..."
              class="input w(full) p(lg) font(md) r(lg) bg(gray-50) b(2/transparent) focus:bg(white) focus:b(2/primary) focus:shadow(0/0/0/4px/primary.1) transition"
              style="font-family: 'SF Mono', Monaco, monospace;"
            />
            
            <!-- Parse status -->
            <div class="status-bar">
              {#if error}
                <div class="hbox(middle) gap(sm) c(error)">
                  <span class="w(8px) h(8px) r(full) bg(error)"></span>
                  <span class="font(sm)">{error}</span>
                </div>
              {:else if css}
                <div class="hbox(middle) gap(sm) c(success-600)">
                  <span class="w(8px) h(8px) r(full) bg(success) animate-pulse"></span>
                  <span class="font(sm)">Valid syntax</span>
                </div>
              {/if}
            </div>
          </div>
          
          <!-- Arrow -->
          <div class="px(lg) pt(4xl)">
            <ArrowRight size={24} class="c(gray-400)" />
          </div>
          
          <!-- Output side -->
          <div class="flex vbox gap(lg)">
            <div class="hbox(middle) gap(auto) mb(sm)">
              <span class="font(sm) bold c(gray-700) uppercase letter-spacing(0.05em)">
                Generated CSS
              </span>
              <button
                class="icon-btn p(sm) r(lg) hover:bg(gray-100) transition"
                on:click={() => copyToClipboard(css)}
                disabled={!css}
              >
                {#if copiedItem === css}
                  <Check size={16} class="c(success)" />
                {:else}
                  <Copy size={16} class="c(gray-500)" />
                {/if}
              </button>
            </div>
            
            <div class="output-box bg(gray-900) r(lg) p(lg) min-h(120px) overflow-y(auto)">
              {#if css}
                <CodeHighlighter code={css} language="css" />
              {:else}
                <span class="font(sm) c(gray-500) italic">// CSS output will appear here</span>
              {/if}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Compact examples grid -->
      <div class="examples-section">
        <h2 class="font(lg) bold c(gray-900) mb(lg) text(center)">
          Quick Examples
        </h2>
        
        <div class="examples-grid grid grid-cols(4) gap(md)">
          {#each exampleCategories as category}
            <div class="category-group">
              <h3 class="font(xs) bold c(gray-500) uppercase letter-spacing(0.1em) mb(sm) hbox(middle) gap(xs)">
                <span>{category.icon}</span>
                {category.name}
              </h3>
              <div class="vbox gap(xs)">
                {#each category.examples as example}
                  <button
                    class="example-btn text(left) p(sm) r(lg) bg(gray-50) hover:bg(primary-50) b(1/transparent) hover:b(1/primary-200) transition {selectedExample === example.code ? 'bg(primary-50) b(1/primary-200)' : ''}"
                    on:click={() => selectExample(example.code)}
                  >
                    <code class="font(xs) c(gray-700) block" style="font-family: 'SF Mono', Monaco, monospace;">
                      {example.code}
                    </code>
                    <span class="font(xs) c(gray-500) mt(2px) block">{example.label}</span>
                  </button>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Syntax cheatsheet -->
      <div class="cheatsheet mt(3xl) p(2xl) bg(gray-50) r(2xl)">
        <h3 class="font(lg) bold c(gray-900) mb(lg) text(center) hbox(pack) gap(sm)">
          <Sparkles size={20} class="c(accent)" />
          Syntax Patterns
        </h3>
        
        <div class="patterns-grid grid grid-cols(3) gap(lg)">
          <div class="pattern-card bg(white) p(lg) r(lg) b(1/gray-200)">
            <h4 class="font(sm) bold c(primary) mb(sm)">Basic Utilities</h4>
            <div class="vbox gap(xs)">
              <div class="hbox(middle) gap(sm)">
                <Code code="w(100px)" inline={true} />
                <span class="font(xs) c(gray-500)">→ Fixed width</span>
              </div>
              <div class="hbox(middle) gap(sm)">
                <Code code="p(lg)" inline={true} />
                <span class="font(xs) c(gray-500)">→ Padding with token</span>
              </div>
              <div class="hbox(middle) gap(sm)">
                <Code code="hidden" inline={true} />
                <span class="font(xs) c(gray-500)">→ Display none</span>
              </div>
            </div>
          </div>
          
          <div class="pattern-card bg(white) p(lg) r(lg) b(1/gray-200)">
            <h4 class="font(sm) bold c(accent) mb(sm)">Advanced Syntax</h4>
            <div class="vbox gap(xs)">
              <div class="hbox(middle) gap(sm)">
                <Code code="w(100..200)" inline={true} />
                <span class="font(xs) c(gray-500)">→ Min-max constraint</span>
              </div>
              <div class="hbox(middle) gap(sm)">
                <Code code="p(sm/lg)" inline={true} />
                <span class="font(xs) c(gray-500)">→ Directional values</span>
              </div>
              <div class="hbox(middle) gap(sm)">
                <Code code="hover:scale(1.1)" inline={true} />
                <span class="font(xs) c(gray-500)">→ State modifier</span>
              </div>
            </div>
          </div>
          
          <div class="pattern-card bg(white) p(lg) r(lg) b(1/gray-200)">
            <h4 class="font(sm) bold c(success) mb(sm)">Complex Values</h4>
            <div class="vbox gap(xs)">
              <div class="hbox(middle) gap(sm)">
                <Code code="bg(#fff..#000)" inline={true} />
                <span class="font(xs) c(gray-500)">→ Gradient</span>
              </div>
              <div class="hbox(middle) gap(sm)">
                <Code code="shadow(0/4/8/#000.2)" inline={true} />
                <span class="font(xs) c(gray-500)">→ Custom shadow</span>
              </div>
              <div class="hbox(middle) gap(sm)">
                <Code code="font(Inter/16/1.5)" inline={true} />
                <span class="font(xs) c(gray-500)">→ Font shorthand</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<style>
  .input:focus {
    outline: none;
  }
  
  .output-box {
    max-height: 200px;
  }
  
  /* Smooth transitions */
  .example-btn {
    transition: all 0.15s ease;
  }
  
  .example-btn:hover {
    transform: translateX(2px);
  }
  
  /* Remove scrollbar styling for minimal look */
  .output-box::-webkit-scrollbar {
    width: 6px;
  }
  
  .output-box::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .output-box::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
  
  /* Animation for pulse */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>