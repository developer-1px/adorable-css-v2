<script lang="ts">
  import { onMount } from 'svelte';
  import Code from '../../components/Code.svelte';
  import { ChevronRight, Book, Code2, Layers, Zap, Palette, Settings } from 'lucide-svelte';
  import TokenSystemShowcase from '../../components/home/TokenSystemShowcase.svelte';
  import ComponentShowcase from '../../components/home/ComponentShowcase.svelte';
  import DesignToolsShowcase from '../../components/home/DesignToolsShowcase.svelte';
  import CoreConcepts from '../../components/home/CoreConcepts.svelte';
  import BeforeAfter from '../../components/home/BeforeAfter.svelte';
  
  let activeSection = 'getting-started';
  
  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      items: [
        { id: 'installation', title: 'Installation' },
        { id: 'quick-start', title: 'Quick Start' },
        { id: 'philosophy', title: 'Philosophy' }
      ]
    },
    {
      id: 'parser',
      title: 'Parser System',
      icon: Code2,
      items: [
        { id: 'syntax', title: 'Syntax' },
        { id: 'tokenizer', title: 'Tokenizer' },
        { id: 'ast', title: 'AST Generation' }
      ]
    },
    {
      id: 'rules',
      title: 'Rule System',
      icon: Layers,
      items: [
        { id: 'layout', title: 'Layout Rules' },
        { id: 'typography', title: 'Typography' },
        { id: 'colors', title: 'Colors' },
        { id: 'effects', title: 'Effects' }
      ]
    },
    {
      id: 'values',
      title: 'Value Processing',
      icon: Zap,
      items: [
        { id: 'units', title: 'Units' },
        { id: 'constraints', title: 'Constraints' },
        { id: 'variables', title: 'CSS Variables' }
      ]
    },
    {
      id: 'figma',
      title: 'Figma Plugin',
      icon: Palette,
      items: [
        { id: 'setup', title: 'Plugin Setup' },
        { id: 'codegen', title: 'Code Generation' },
        { id: 'sync', title: 'Design Sync' }
      ]
    },
    {
      id: 'components',
      title: 'Components & Examples',
      icon: Settings,
      items: [
        { id: 'design-tokens', title: 'Design Tokens' },
        { id: 'component-library', title: 'Component Library' },
        { id: 'design-tools', title: 'Design Tools' },
        { id: 'core-concepts', title: 'Core Concepts' },
        { id: 'before-after', title: 'Before & After' }
      ]
    }
  ];
</script>

<div class="docs-page hbox w(fill) min-h(screen) bg(white)">
  <!-- Sidebar -->
  <aside class="w(280) overflow-y(auto) h(screen) bg(gray-50) b(r/gray-200) sticky top(0) clip-y">
    <div class="p(xl)">
      <h2 class="bold font(lg) c(gray-900) mb(xl)">Documentation</h2>
      
      <nav class="vbox gap(sm)">
        {#each sections as section}
          <div class="nav-section">
            <button 
              class="w(full) hbox(middle) gap(sm) px(md) py(sm) r(lg) text(left) hover:bg(gray-100) transition {activeSection === section.id ? 'bg(primary-50) c(primary)' : ''}"
              on:click={() => activeSection = section.id}
            >
              <svelte:component this={section.icon} size={18} />
              <span class="font(sm) semibold">{section.title}</span>
              <ChevronRight size={16} class="ml(auto) {activeSection === section.id ? 'rotate(90)' : ''} transition" />
            </button>
            
            {#if activeSection === section.id}
              <div class="nav-items vbox gap(xs) pl(xl) mt(xs)">
                {#each section.items as item}
                  <a 
                    href="#{item.id}" 
                    class="px(md) py(xs) r(md) font(sm) c(gray-600) hover:c(primary) hover:bg(gray-100) transition"
                  >
                    {item.title}
                  </a>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </nav>
    </div>
  </aside>
  
  <!-- Main Content -->
  <main class="docs-content flex(1) p(3xl) max-w(900px)">
    <!-- Getting Started -->
    {#if activeSection === 'getting-started'}
      <article class="vbox gap(3xl)">
        <section id="installation">
          <h1 class="heading(h1) c(gray-900) mb(xl)">Installation</h1>
          
          <p class="font(lg) c(gray-600) mb(xl) leading(relaxed)">
            AdorableCSS can be installed via npm or pnpm. We recommend using it with Vite for the best development experience.
          </p>
          
          <div class="mb(xl)">
            <h3 class="bold font(lg) c(gray-900) mb(md)">Package Installation</h3>
            <div class="p(lg) bg(gray-50) r(lg)">
              <Code code="npm install adorable-css" language="bash" />
            </div>
          </div>
          
          <div class="mb(xl)">
            <h3 class="bold font(lg) c(gray-900) mb(md)">Vite Configuration</h3>
            <div class="p(lg) bg(gray-50) r(lg)">
              <Code code={`// vite.config.ts
import { adorableCSSPlugin } from 'adorable-css/vite'

export default {
  plugins: [adorableCSSPlugin()]
}`} language="typescript" />
            </div>
          </div>
        </section>
        
        <section id="quick-start">
          <h2 class="heading(h2) c(gray-900) mb(xl)">Quick Start</h2>
          
          <p class="font(lg) c(gray-600) mb(xl) leading(relaxed)">
            Once installed, you can start using AdorableCSS utilities in your HTML:
          </p>
          
          <div class="p(lg) bg(gray-50) r(lg)">
            <Code code={`<div class="vbox gap(lg) p(xl) bg(white) r(xl) shadow(lg)">
  <h2 class="heading(h2) c(primary)">Hello World</h2>
  <p class="font(md) c(gray-600)">
    Welcome to AdorableCSS!
  </p>
  <button class="px(lg) py(md) bg(primary) c(white) r(lg) hover:shadow(lg) transition">
    Get Started
  </button>
</div>`} language="html" />
          </div>
        </section>
        
        <section id="philosophy">
          <h2 class="heading(h2) c(gray-900) mb(xl)">Philosophy</h2>
          
          <p class="font(lg) c(gray-600) mb(xl) leading(relaxed)">
            AdorableCSS is built on three core principles:
          </p>
          
          <div class="vbox gap(xl)">
            <div class="principle p(xl) bg(primary-50) r(lg) b(l/4/primary)">
              <h3 class="bold font(lg) c(gray-900) mb(sm)">1. Figma-First Design</h3>
              <p class="font(md) c(gray-600)">
                Every utility maps directly to Figma's mental model. If you know Figma, you already know AdorableCSS.
              </p>
            </div>
            
            <div class="principle p(xl) bg(success-50) r(lg) b(l/4/success)">
              <h3 class="bold font(lg) c(gray-900) mb(sm)">2. Declarative Syntax</h3>
              <p class="font(md) c(gray-600)">
                Write what you mean. <code class="px(6) py(2) bg(gray-100) r(4) font(mono) font(0.9em)">vbox gap(lg)</code> is clearer than memorizing flexbox properties.
              </p>
            </div>
            
            <div class="principle p(xl) bg(warning-50) r(lg) b(l/4/warning)">
              <h3 class="bold font(lg) c(gray-900) mb(sm)">3. Zero Runtime</h3>
              <p class="font(md) c(gray-600)">
                All utilities compile to pure CSS. No JavaScript, no runtime overhead, just fast, cached stylesheets.
              </p>
            </div>
          </div>
        </section>
      </article>
    {/if}
    
    <!-- Parser System -->
    {#if activeSection === 'parser'}
      <article class="vbox gap(3xl)">
        <section id="syntax">
          <h1 class="heading(h1) c(gray-900) mb(xl)">Parser Syntax</h1>
          
          <p class="font(lg) c(gray-600) mb(xl) leading(relaxed)">
            AdorableCSS uses a custom parser that understands function-style utilities, complex expressions, and nested values.
          </p>
          
          <div class="syntax-examples vbox gap(xl)">
            <div>
              <h3 class="bold font(lg) c(gray-900) mb(md)">Basic Syntax</h3>
              <Code code={`property(value)    // w(300)
property(v1/v2)    // p(16/24)
property!          // hidden!`} />
            </div>
            
            <div>
              <h3 class="bold font(lg) c(gray-900) mb(md)">Prefixes</h3>
              <Code code={`hover:property(value)     // hover:bg(primary)
md:property(value)        // md:w(full)
hover:md:property(value)  // hover:md:scale(1.1)`} />
            </div>
            
            <div>
              <h3 class="bold font(lg) c(gray-900) mb(md)">Complex Expressions</h3>
              <Code code={`layer(top:20+left:30)           // Positioning
font(Inter/16/1.5/medium)       // Typography
shadow(0/4/8/rgba(0,0,0,0.1))   // Custom shadow`} />
            </div>
          </div>
        </section>
      </article>
    {/if}
    
    <!-- Components & Examples -->
    {#if activeSection === 'components'}
      <article class="vbox gap(3xl)">
        <section id="design-tokens">
          <h1 class="heading(h1) c(gray-900) mb(xl)">Design Tokens</h1>
          
          <p class="font(lg) c(gray-600) mb(xl) leading(relaxed)">
            AdorableCSS includes a comprehensive design token system that provides consistent spacing, 
            colors, typography, and effects across your entire application.
          </p>
          
          <div class="border(gray-200) r(lg) p(32) bg(gray-50) my(32)">
            <TokenSystemShowcase />
          </div>
        </section>
        
        <section id="component-library">
          <h2 class="heading(h2) c(gray-900) mb(xl)">Component Library</h2>
          
          <p class="font(lg) c(gray-600) mb(xl) leading(relaxed)">
            Explore our collection of pre-built components using AdorableCSS utilities. 
            Each component demonstrates best practices and showcases the power of our design token system.
          </p>
          
          <div class="border(gray-200) r(lg) p(32) bg(gray-50) my(32)">
            <ComponentShowcase />
          </div>
        </section>
        
        <section id="design-tools">
          <h2 class="heading(h2) c(gray-900) mb(xl)">Design Tools</h2>
          
          <p class="font(lg) c(gray-600) mb(xl) leading(relaxed)">
            Discover the tools and workflows that make AdorableCSS a powerful design system. 
            From color palette generation to spacing calculators, these tools help you create cohesive designs.
          </p>
          
          <div class="border(gray-200) r(lg) p(32) bg(gray-50) my(32)">
            <DesignToolsShowcase />
          </div>
        </section>
        
        <section id="core-concepts">
          <h2 class="heading(h2) c(gray-900) mb(xl)">Core Concepts</h2>
          
          <p class="font(lg) c(gray-600) mb(xl) leading(relaxed)">
            Understanding AdorableCSS's core concepts is essential for building maintainable and scalable designs. 
            Learn about the principles that make our framework unique.
          </p>
          
          <div class="border(gray-200) r(lg) p(32) bg(gray-50) my(32)">
            <CoreConcepts />
          </div>
        </section>
        
        <section id="before-after">
          <h2 class="heading(h2) c(gray-900) mb(xl)">Before & After</h2>
          
          <p class="font(lg) c(gray-600) mb(xl) leading(relaxed)">
            See the transformation from traditional CSS approaches to AdorableCSS. 
            These examples demonstrate how our framework simplifies complex styling challenges.
          </p>
          
          <div class="border(gray-200) r(lg) p(32) bg(gray-50) my(32)">
            <BeforeAfter />
          </div>
        </section>
      </article>
    {/if}
    
    <!-- Add more sections as needed -->
  </main>
</div>

