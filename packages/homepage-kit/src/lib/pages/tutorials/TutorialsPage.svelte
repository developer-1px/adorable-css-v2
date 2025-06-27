<script lang="ts">
  import { ArrowRight, BookOpen, Code2, Layout, Palette, Box, Type, Layers, Sparkles } from 'lucide-svelte';
  
  const tutorials = [
    {
      id: 'intro',
      title: 'Hello AdorableCSS',
      description: 'Get started with AdorableCSS and learn the basics',
      icon: Sparkles,
      status: 'available',
      lessons: 3
    },
    {
      id: 'typography',
      title: 'Typography',
      description: 'Master text styling with font utilities and weights',
      icon: Type,
      status: 'available',
      lessons: 5
    },
    {
      id: 'colors',
      title: 'Colors & Themes',
      description: 'Work with colors, gradients, and OKLCH color space',
      icon: Palette,
      status: 'coming-soon',
      lessons: 6
    },
    {
      id: 'layout',
      title: 'Layout System',
      description: 'Build layouts with hbox, vbox, and grid utilities',
      icon: Layout,
      status: 'coming-soon',
      lessons: 8
    },
    {
      id: 'spacing',
      title: 'Box Model & Spacing',
      description: 'Control padding, margins, and gaps effectively',
      icon: Box,
      status: 'coming-soon',
      lessons: 4
    },
    {
      id: 'position',
      title: 'Positioning & Layers',
      description: 'Position elements with layer() and absolute utilities',
      icon: Layers,
      status: 'coming-soon',
      lessons: 5
    }
  ];
  
  function handleTutorialClick(tutorialId: string, status: string) {
    if (status === 'available') {
      window.location.hash = `tutorials/${tutorialId}`;
    }
  }
</script>

<div class="tutorials-page min-h(100vh) bg(gray-50)">
  <div class="container(5xl) px(xl) py(4xl) vbox gap(4xl)">
    <!-- Header -->
    <div class="vbox(center) text(center) gap(xl)">
      <div class="inline-flex">
        <div class="px(lg) py(sm) bg(purple-100) r(full) b(purple-200) 
                    hbox(middle) gap(sm)">
          <BookOpen size="16" class="c(purple-600)" />
          <span class="font(sm) 600 c(purple-700)">Interactive Tutorials</span>
        </div>
      </div>
      
      <div class="vbox gap(lg)">
        <h1 class="900 font(4xl/1.2) c(gray-900)">
          Learn AdorableCSS
        </h1>
        <p class="font(lg) c(gray-600) container(2xl)">
        Master AdorableCSS through hands-on, interactive tutorials. 
        Edit code on the left, see results on the right!
        </p>
      </div>
    </div>
    
    <!-- Tutorial Grid -->
    <div class="grid grid-cols(1) md:grid-cols(2) lg:grid-cols(3) gap(xl)">
      {#each tutorials as tutorial}
        <button
          class="tutorial-card p(2xl) bg(white) r(xl) b(gray-200) 
                 text(left) w(full) transition cursor(pointer)
                 {tutorial.status === 'available' 
                   ? 'hover:shadow(lg) hover:scale(1.02) hover:b(purple-400)' 
                   : 'opacity(.6) cursor(not-allowed)'}"
          onclick={() => handleTutorialClick(tutorial.id, tutorial.status)}
          disabled={tutorial.status !== 'available'}
        >
          <div class="vbox gap(lg)">
            <!-- Icon & Status -->
            <div class="hbox(middle) gap(auto)">
              <div class="w(48px) h(48px) bg(purple-100) r(lg) vbox(pack)">
                <svelte:component this={tutorial.icon} size="24" class="c(purple-600)" />
              </div>
              {#if tutorial.status === 'coming-soon'}
                <span class="px(sm) py(xs) bg(gray-100) r(full) font(xs) c(gray-600)">
                  Coming Soon
                </span>
              {/if}
            </div>
            
            <!-- Content -->
            <div class="vbox gap(sm)">
              <h3 class="700 font(lg) c(gray-900)">{tutorial.title}</h3>
              <p class="font(sm) c(gray-600)">{tutorial.description}</p>
            </div>
            
            <!-- Footer -->
            <div class="hbox(middle) gap(auto) pt(md) bt(gray-100)">
              <span class="font(xs) c(gray-500)">{tutorial.lessons} lessons</span>
              {#if tutorial.status === 'available'}
                <div class="hbox(middle) gap(xs) c(purple-600)">
                  <span class="font(sm) 600">Start</span>
                  <ArrowRight size="16" />
                </div>
              {/if}
            </div>
          </div>
        </button>
      {/each}
    </div>
    
    <!-- Help Section -->
    <div class="text(center)">
      <div class="container(3xl) p(2xl) bg(white) r(xl) b(gray-200) vbox gap(md)">
        <h2 class="700 font(2xl) c(gray-900)">
          New to AdorableCSS?
        </h2>
        <p class="font(md) c(gray-600)">
          Start with "Hello AdorableCSS" to learn the fundamentals, 
          then progress through typography, colors, and layout.
        </p>
        <button
          class="px(xl) py(md) bg(135deg/purple-500,pink-500) c(white) r(lg) 
                 700 font(md) hover:shadow(lg) hover:scale(1.05) transition
                 hbox(middle) gap(sm)"
          onclick={() => handleTutorialClick('intro', 'available')}
        >
          <BookOpen size="20" />
          Start Learning
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .tutorial-card:disabled {
    transform: none !important;
  }
</style>