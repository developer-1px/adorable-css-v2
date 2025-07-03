<script lang="ts">
  import { ArrowRight, BookOpen, Code2, Layout, Palette, Box, Type, Layers, Sparkles, Clock, Trophy, Star, Zap, Heart, CheckCircle } from 'lucide-svelte';
  
  const tutorials = [
    {
      id: 'intro',
      title: 'Hello AdorableCSS',
      description: 'Get started with AdorableCSS and learn the basics',
      icon: Sparkles,
      status: 'available',
      lessons: 3,
      difficulty: 'Beginner',
      time: '15 min',
      color: 'purple'
    },
    {
      id: 'typography',
      title: 'Typography',
      description: 'Master text styling with font utilities and weights',
      icon: Type,
      status: 'available',
      lessons: 5,
      difficulty: 'Beginner',
      time: '20 min',
      color: 'blue'
    },
    {
      id: 'colors',
      title: 'Colors & Themes',
      description: 'Work with colors, gradients, and OKLCH color space',
      icon: Palette,
      status: 'coming-soon',
      lessons: 6,
      difficulty: 'Intermediate',
      time: '30 min',
      color: 'pink'
    },
    {
      id: 'layout',
      title: 'Layout System',
      description: 'Build layouts with hbox, vbox, and grid utilities',
      icon: Layout,
      status: 'coming-soon',
      lessons: 8,
      difficulty: 'Intermediate',
      time: '40 min',
      color: 'green'
    },
    {
      id: 'spacing',
      title: 'Box Model & Spacing',
      description: 'Control padding, margins, and gaps effectively',
      icon: Box,
      status: 'coming-soon',
      lessons: 4,
      difficulty: 'Beginner',
      time: '15 min',
      color: 'orange'
    },
    {
      id: 'position',
      title: 'Positioning & Layers',
      description: 'Position elements with layer() and absolute utilities',
      icon: Layers,
      status: 'coming-soon',
      lessons: 5,
      difficulty: 'Advanced',
      time: '25 min',
      color: 'indigo'
    }
  ];
  
  const learningPath = [
    { step: 1, title: "Learn the Basics", description: "Start with Hello AdorableCSS" },
    { step: 2, title: "Master Typography", description: "Style text like a pro" },
    { step: 3, title: "Explore Colors", description: "Work with modern color systems" },
    { step: 4, title: "Build Layouts", description: "Create responsive designs" }
  ];
  
  const features = [
    { icon: Code2, title: "Live Code Editor", description: "Edit and see results instantly" },
    { icon: Trophy, title: "Progress Tracking", description: "Track your learning journey" },
    { icon: Zap, title: "Interactive Examples", description: "Learn by doing, not reading" }
  ];
  
  function handleTutorialClick(tutorialId: string, status: string) {
    if (status === 'available') {
      window.location.hash = `tutorials/${tutorialId}`;
    }
  }
</script>

<!-- Hero Section with Design System -->
<section class="section(hero) bg(white) relative clip">
  <!-- Background Pattern -->
  <div class="layer pointer-events(none) opacity(0.03)">
    <div class="absolute w(800px) h(800px) bg(neutral-100) r(full) blur(200px) top(-400px) left(-200px)"></div>
    <div class="absolute w(600px) h(600px) bg(neutral-200) r(full) blur(150px) bottom(-300px) right(-150px)"></div>
  </div>
  
  <div class="contain(wide) relative z(10)">
    <div class="content(hero)">
      <!-- Animated Badge -->
      <div class="badge() bg(neutral-100) border(1/neutral-300) gap(sm) hover:scale(1.05) transition r(9999px)">
        <BookOpen size="16" class="c(neutral-700)" />
        <span class="600">Interactive Learning Platform</span>
      </div>
      
      <!-- Hero Content -->
      <div class="stack(xl)">
        <h1 class="hero-text()">
          Learn AdorableCSS
          <span class="block c(brand)">
            The Fun Way
          </span>
        </h1>
        
        <p class="lead() c(neutral-600) max-w(600px)">
          Master the most intuitive CSS framework through hands-on tutorials. 
          <strong class="c(neutral-900)">Edit code on the left, see magic on the right.</strong>
        </p>
      </div>
      
      <!-- Quick Stats -->
      <div class="hbox(center) gap(xl) flex-wrap">
        <div class="hbox(middle) gap(sm)">
          <div class="w(40px) h(40px) r(full) bg(neutral-100) hbox(pack)">
            <CheckCircle size="20" class="c(neutral-700)" />
          </div>
          <div class="vbox">
            <span class="font(xl) 700 c(neutral-900)">2</span>
            <span class="caption() c(neutral-600)">Available Now</span>
          </div>
        </div>
        
        <div class="hbox(middle) gap(sm)">
          <div class="w(40px) h(40px) r(full) bg(neutral-100) hbox(pack)">
            <Clock size="20" class="c(neutral-700)" />
          </div>
          <div class="vbox">
            <span class="font(xl) 700 c(neutral-900)">35 min</span>
            <span class="caption() c(neutral-600)">Total Time</span>
          </div>
        </div>
        
        <div class="hbox(middle) gap(sm)">
          <div class="w(40px) h(40px) r(full) bg(neutral-100) hbox(pack)">
            <Star size="20" class="c(neutral-700)" />
          </div>
          <div class="vbox">
            <span class="font(xl) 700 c(neutral-900)">30</span>
            <span class="caption() c(neutral-600)">Lessons Total</span>
          </div>
        </div>
      </div>
      
      <!-- CTA Button -->
      <button
        class="btn(primary/lg) px(2xl) py(lg) font(lg) hbox(middle) gap(md) shadow(lg)"
        onclick={() => handleTutorialClick('intro', 'available')}
      >
        Start Learning Now
        <ArrowRight size="20" />
      </button>
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="section(compact) bg(neutral-50)">
  <div class="contain()">
    <div class="feature-grid()">
      {#each features as feature}
        <div class="card-base() card-hover() text(center) stack(md)">
          <div class="w(60px) h(60px) r(lg) bg(neutral-100) hbox(pack) mx(auto)">
            <svelte:component this={feature.icon} size="30" class="c(neutral-700)" />
          </div>
          <h3 class="heading(h4)">{feature.title}</h3>
          <p class="caption() c(neutral-600)">{feature.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Tutorial Grid Section -->
<section class="section() bg(white)">
  <div class="contain(wide)">
    <div class="content(centered)">
      <h2 class="heading(h2)">Choose Your Tutorial</h2>
      <p class="lead() c(neutral-600)">
        Start with the basics or jump to what interests you most
      </p>
    </div>
    
    <!-- Tutorial Cards -->
    <div class="grid grid-cols(1) md:grid-cols(2) lg:grid-cols(3) gap(xl)">
      {#each tutorials as tutorial}
        <button
          class="card-base() p(0) clip text(left) w(full) transition group
                 {tutorial.status === 'available' 
                   ? 'card-hover() cursor(pointer)' 
                   : 'opacity(0.7) cursor(not-allowed)'}"
          onclick={() => handleTutorialClick(tutorial.id, tutorial.status)}
          disabled={tutorial.status !== 'available'}
        >
          <!-- Card Header with Gradient -->
          <div class="h(120px) bg(neutral-700) relative">
            <div class="layer hbox(pack)">
              <svelte:component this={tutorial.icon} size="48" class="c(white.3)" />
            </div>
            <div class="layer p(lg) vbox(bottom)">
              <div class="w(48px) h(48px) bg(white) r(lg) hbox(pack) shadow(md)">
                <svelte:component this={tutorial.icon} size="24" class="c(neutral-700)" />
              </div>
            </div>
            {#if tutorial.status === 'coming-soon'}
              <div class="absolute top(md) right(md)">
                <span class="badge() bg(neutral-900.8) c(white) backdrop-blur(sm) r(9999px)">
                  Coming Soon
                </span>
              </div>
            {/if}
          </div>
          
          <!-- Card Content -->
          <div class="p(xl) stack(md)">
            <div class="stack(sm)">
              <h3 class="heading(h3)">{tutorial.title}</h3>
              <p class="c(neutral-600)">{tutorial.description}</p>
            </div>
            
            <!-- Metadata -->
            <div class="hbox gap(md) flex-wrap">
              <span class="badge() bg(neutral-100) c(neutral-700) r(9999px)">
                {tutorial.difficulty}
              </span>
              <span class="hbox(middle) gap(xs) caption() c(neutral-500)">
                <Clock size="14" />
                {tutorial.time}
              </span>
              <span class="hbox(middle) gap(xs) caption() c(neutral-500)">
                <BookOpen size="14" />
                {tutorial.lessons} lessons
              </span>
            </div>
            
            <!-- Action -->
            {#if tutorial.status === 'available'}
              <div class="pt(md) bt(neutral-100)">
                <span class="hbox(middle) gap(sm) c(accent) 600 group-hover:gap(md) transition-all">
                  Start Learning
                  <ArrowRight size="16" />
                </span>
              </div>
            {/if}
          </div>
        </button>
      {/each}
    </div>
  </div>
</section>

<!-- Learning Path Section -->
<section class="section() bg(neutral-50)">
  <div class="contain()">
    <div class="content(centered)">
      <h2 class="heading(h2)">Your Learning Journey</h2>
      <p class="lead() c(neutral-600)">
        Follow our recommended path to AdorableCSS mastery
      </p>
    </div>
    
    <div class="grid grid-cols(1) md:grid-cols(2) lg:grid-cols(4) gap(lg) relative">
      <!-- Connection Line (desktop only) -->
      <div class="absolute top(40px) left(60px) right(60px) h(2px) bg(neutral-300) ..lg:hidden"></div>
      
      {#each learningPath as item, index}
        <div class="relative stack(md) text(center)">
          <!-- Step Number -->
          <div class="w(80px) h(80px) r(full) bg(white) border(3/neutral-400) mx(auto) relative z(10)
                      hbox(pack) shadow(md) group-hover:scale(1.1) transition">
            <span class="font(2xl) 700 c(neutral-700)">{item.step}</span>
          </div>
          
          <!-- Content -->
          <div class="stack(xs)">
            <h3 class="heading(h4)">{item.title}</h3>
            <p class="caption() c(neutral-600)">{item.description}</p>
          </div>
          
          <!-- Progress Indicator -->
          {#if index < 2}
            <div class="badge(success) mx(auto) r(9999px)">
              <CheckCircle size="14" />
              Available
            </div>
          {:else}
            <div class="badge() mx(auto) r(9999px)">
              <Clock size="14" />
              Coming Soon
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section() bg(white)">
  <div class="contain()">
    <div class="p(3xl) text(center) bg(brand) c(white) r(xl) shadow(xl)">
      <div class="stack(xl)">
        <div class="stack(md)">
          <h2 class="heading(h2) c(white)">Ready to Start Learning?</h2>
          <p class="lead() c(white.9) max-w(600px) mx(auto)">
            Join thousands of developers who are mastering AdorableCSS through our interactive tutorials
          </p>
        </div>
        
        <div class="hbox(pack) gap(lg) flex-wrap">
          <button
            class="btn(secondary/lg) px(2xl) py(lg) shadow(xl) 
                   hover:scale(1.05) hover:shadow(2xl) transition"
            onclick={() => handleTutorialClick('intro', 'available')}
          >
            <BookOpen size="20" />
            Start Tutorial
            <ArrowRight size="20" />
          </button>
          
          <button class="btn(outline/lg) c(white) border(2/white.3) px(2xl) py(lg) hover:bg(white.1)">
            <Heart size="20" />
            Save for Later
          </button>
        </div>
        
        <p class="caption() c(white.7)">
          No signup required • 100% free • Learn at your own pace
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  /* Smooth transitions for interactive elements */
  :global(.group:hover .group-hover\:scale\(1\.1\)) {
    transform: scale(1.1);
  }
  
  :global(.group:hover .group-hover\:gap\(md\)) {
    gap: 0.75rem;
  }
</style>