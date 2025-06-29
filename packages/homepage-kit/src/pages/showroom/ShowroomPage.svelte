<script lang="ts">
  import { Heart, Star, ShoppingBag, Play, MessageCircle, Image, Calendar, Mail } from 'lucide-svelte';
  
  let activeCategory = 'all';
  const categories = ['all', 'cards', 'buttons', 'forms', 'navigation', 'effects'];
</script>

<div class="showroom-page vbox w(fill) min-h(screen) bg(gray-50)">
  <!-- Header -->
  <header class="w(fill) py(3xl) bg(white) shadow(sm)">
    <div class="container(xl) text(center)">
      <h1 class="bold font(5xl) c(gray-900) mb(lg)">
        <span class="c(135deg/purple-400..pink-400)">
          AdorableCSS
        </span>
        Showroom
      </h1>
      <p class="font(xl) c(gray-600)">
        Beautiful components built with AdorableCSS
      </p>
      
      <!-- Category Filter -->
      <div class="category-filter hbox(pack) gap(sm) mt(2xl)">
        {#each categories as category}
          <button
            class="px(lg) py(sm) r(full) font(sm) semibold transition
              {activeCategory === category 
                ? 'bg(purple-500) c(white)' 
                : 'bg(white) c(gray-600) hover:bg(purple-50) hover:c(purple-600)'}"
            on:click={() => activeCategory = category}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        {/each}
      </div>
    </div>
  </header>
  
  <!-- Showroom Grid -->
  <main class="flex(1) py(4xl)">
    <div class="container(xl)">
      <div class="showroom-grid grid grid-cols(3) gap(2xl)">
        
        <!-- Glassmorphism Card -->
        {#if activeCategory === 'all' || activeCategory === 'cards'}
          <div class="showcase-item">
            <div class="showcase-preview p(2xl) bg(gradient-to-br/purple-400/pink-400) r(xl) h(300px) vbox(pack)">
              <div class="glass-card w(full) p(xl) bg(white.2) backdrop-blur(lg) r(xl) b(1/white.3) shadow(xl)">
                <div class="hbox(middle) gap(lg) mb(lg)">
                  <div class="w(60px) h(60px) bg(white.3) r(full) vbox(pack)">
                    <Heart size="24" class="c(white)" />
                  </div>
                  <div class="flex(1)">
                    <h3 class="bold font(xl) c(white) mb(xs)">Glass Card</h3>
                    <p class="font(sm) c(white.8)">Stunning glassmorphism effect</p>
                  </div>
                </div>
                <button class="w(full) py(md) bg(white.2) c(white) r(lg) font(sm) semibold hover:bg(white.3) transition">
                  Learn More
                </button>
              </div>
            </div>
            <div class="showcase-info p(lg) bg(white) r(0/0/xl/xl)">
              <h4 class="bold font(md) c(gray-900) mb(sm)">Glassmorphism Card</h4>
              <p class="font(sm) c(gray-600)">backdrop-blur + transparent bg</p>
            </div>
          </div>
        {/if}
        
        <!-- Gradient Button Collection -->
        {#if activeCategory === 'all' || activeCategory === 'buttons'}
          <div class="showcase-item">
            <div class="showcase-preview p(2xl) bg(white) r(xl) h(300px) vbox(pack)">
              <div class="vbox gap(lg) w(full)">
                <button class="px(xl) py(lg) bg(135deg/purple-400..pink-400) c(white) r(lg) font(md) semibold shadow(lg) hover:shadow(2xl) hover:scale(1.05) transition">
                  Gradient Primary
                </button>
                <button class="px(xl) py(lg) bg(blue-400..teal-400/to-r) c(white) r(lg) font(md) semibold shadow(lg) hover:shadow(2xl) hover:scale(1.05) transition">
                  Ocean Gradient
                </button>
                <button class="px(xl) py(lg) bg(transparent) b(2/gradient-to-r/purple-400/pink-400) c(purple-600) r(lg) font(md) semibold hover:bg(purple-50) transition">
                  Gradient Border
                </button>
              </div>
            </div>
            <div class="showcase-info p(lg) bg(white) r(0/0/xl/xl)">
              <h4 class="bold font(md) c(gray-900) mb(sm)">Gradient Buttons</h4>
              <p class="font(sm) c(gray-600)">Beautiful gradient effects</p>
            </div>
          </div>
        {/if}
        
        <!-- Neumorphic Card -->
        {#if activeCategory === 'all' || activeCategory === 'cards'}
          <div class="showcase-item">
            <div class="showcase-preview p(2xl) bg(gray-100) r(xl) h(300px) vbox(pack)">
              <div class="neumorph-card w(full) p(xl) bg(gray-100) r(2xl) shadow(6px/6px/12px/rgba(0,0,0,0.1),-6px/-6px/12px/white)">
                <div class="vbox gap(lg)">
                  <div class="w(60px) h(60px) bg(gray-100) r(xl) vbox(pack) shadow(inset/4px/4px/8px/rgba(0,0,0,0.1),inset/-4px/-4px/8px/white)">
                    <Star size="24" class="c(yellow-500)" />
                  </div>
                  <h3 class="bold font(xl) c(gray-800)">Neumorphism</h3>
                  <p class="font(sm) c(gray-600)">Soft UI design trend with depth</p>
                </div>
              </div>
            </div>
            <div class="showcase-info p(lg) bg(white) r(0/0/xl/xl)">
              <h4 class="bold font(md) c(gray-900) mb(sm)">Neumorphic Card</h4>
              <p class="font(sm) c(gray-600)">Soft shadows & inset effects</p>
            </div>
          </div>
        {/if}
        
        <!-- Animated Hover Card -->
        {#if activeCategory === 'all' || activeCategory === 'effects'}
          <div class="showcase-item">
            <div class="showcase-preview p(2xl) bg(gray-900) r(xl) h(300px) vbox(pack)">
              <div class="hover-card group w(full) p(xl) bg(gray-800) r(xl) cursor(pointer) hover:bg(gray-700) transition relative clip">
                <div class="layer(top+left) w(full) h(full) bg(gradient-to-br/purple-600/pink-600) opacity(0) group-hover:opacity(0.2) transition"></div>
                <div class="relative z(10)">
                  <ShoppingBag size="32" class="c(purple-400) mb(lg) group-hover:scale(1.2) transition" />
                  <h3 class="bold font(xl) c(white) mb(sm)">Hover Effects</h3>
                  <p class="font(sm) c(gray-400) group-hover:c(gray-300) transition">
                    Smooth animations on hover
                  </p>
                </div>
                <div class="layer(bottom:-100%+left) w(full) h(1px) bg(gradient-to-r/purple-400/pink-400) group-hover:bottom(0) transition"></div>
              </div>
            </div>
            <div class="showcase-info p(lg) bg(white) r(0/0/xl/xl)">
              <h4 class="bold font(md) c(gray-900) mb(sm)">Animated Hover Card</h4>
              <p class="font(sm) c(gray-600)">Group hover + transitions</p>
            </div>
          </div>
        {/if}
        
        <!-- Floating Input -->
        {#if activeCategory === 'all' || activeCategory === 'forms'}
          <div class="showcase-item">
            <div class="showcase-preview p(2xl) bg(white) r(xl) h(300px) vbox(pack)">
              <div class="vbox gap(xl) w(full)">
                <div class="floating-input relative">
                  <input type="text" class="w(full) px(lg) py(lg) bg(gray-50) b(2/gray-200) r(lg) focus:b(2/purple-400) focus:bg(white) transition peer" placeholder=" " />
                  <label class="layer(top:50%+left:lg) translate(-50%) bg(white) px(sm) c(gray-500) transition peer-focus:top(0) peer-focus:font(sm) peer-focus:c(purple-600) peer-placeholder-shown:top(50%)">
                    Email Address
                  </label>
                </div>
                <div class="floating-input relative">
                  <input type="password" class="w(full) px(lg) py(lg) bg(gray-50) b(2/gray-200) r(lg) focus:b(2/purple-400) focus:bg(white) transition peer" placeholder=" " />
                  <label class="layer(top:50%+left:lg) translate(-50%) bg(white) px(sm) c(gray-500) transition peer-focus:top(0) peer-focus:font(sm) peer-focus:c(purple-600) peer-placeholder-shown:top(50%)">
                    Password
                  </label>
                </div>
              </div>
            </div>
            <div class="showcase-info p(lg) bg(white) r(0/0/xl/xl)">
              <h4 class="bold font(md) c(gray-900) mb(sm)">Floating Label Input</h4>
              <p class="font(sm) c(gray-600)">Modern form inputs</p>
            </div>
          </div>
        {/if}
        
        <!-- 3D Transform Card -->
        {#if activeCategory === 'all' || activeCategory === 'effects'}
          <div class="showcase-item">
            <div class="showcase-preview p(2xl) bg(gray-100) r(xl) h(300px) vbox(pack) perspective(1000)">
              <div class="transform-card w(full) h(200px) relative transform-style(preserve-3d) hover:rotate-y(180deg) transition(600ms)">
                <!-- Front -->
                <div class="layer(fill) bg(gradient-to-br/purple-500/pink-500) r(xl) vbox(pack) backface(hidden)">
                  <Play size="48" class="c(white) mb(lg)" />
                  <h3 class="bold font(xl) c(white)">3D Flip Card</h3>
                </div>
                <!-- Back -->
                <div class="layer(fill) bg(gradient-to-br/blue-500/teal-500) r(xl) vbox(pack) backface(hidden) rotate-y(180deg)">
                  <MessageCircle size="48" class="c(white) mb(lg)" />
                  <h3 class="font(xl) bold c(white)">Back Side</h3>
                </div>
              </div>
            </div>
            <div class="showcase-info p(lg) bg(white) r(0/0/xl/xl)">
              <h4 class="font(md) bold c(gray-900) mb(sm)">3D Flip Card</h4>
              <p class="font(sm) c(gray-600)">transform + perspective</p>
            </div>
          </div>
        {/if}
        
        <!-- Image Gallery Card -->
        {#if activeCategory === 'all' || activeCategory === 'cards'}
          <div class="showcase-item">
            <div class="showcase-preview p(2xl) bg(white) r(xl) h(300px) vbox(pack)">
              <div class="gallery-card w(full) bg(white) r(xl) shadow(lg) clip">
                <div class="relative h(150px) bg(gradient-to-br/purple-400/pink-400) clip">
                  <div class="layer(center) vbox(pack)">
                    <Image size="48" class="c(white)" />
                  </div>
                  <div class="layer(bottom+left+right) h(50%) bg(gradient-to-t/black/transparent) opacity(0.6)"></div>
                  <div class="layer(bottom:lg+left:lg) c(white)">
                    <h3 class="font(lg) bold mb(xs)">Gallery Card</h3>
                    <p class="font(sm) opacity(0.9)">Beautiful image overlays</p>
                  </div>
                </div>
                <div class="p(lg)">
                  <div class="hbox gap(sm)">
                    <span class="px(sm) py(xs) bg(purple-100) c(purple-700) r(sm) font(xs) semibold">Design</span>
                    <span class="px(sm) py(xs) bg(pink-100) c(pink-700) r(sm) font(xs) semibold">UI/UX</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="showcase-info p(lg) bg(white) r(0/0/xl/xl)">
              <h4 class="font(md) bold c(gray-900) mb(sm)">Image Gallery Card</h4>
              <p class="font(sm) c(gray-600)">Overlay effects & tags</p>
            </div>
          </div>
        {/if}
        
        <!-- Animated Navigation -->
        {#if activeCategory === 'all' || activeCategory === 'navigation'}
          <div class="showcase-item">
            <div class="showcase-preview p(2xl) bg(gray-900) r(xl) h(300px) vbox(pack)">
              <nav class="nav-modern hbox gap(xs) p(xs) bg(gray-800) r(lg)">
                <a href="#" class="nav-item px(lg) py(md) c(gray-400) r(md) hover:bg(gray-700) hover:c(white) transition relative group">
                  <span class="relative z(10)">Home</span>
                  <div class="layer(bottom+left+right) h(2px) bg(purple-500) scale-x(0) group-hover:scale-x(100) transition"></div>
                </a>
                <a href="#" class="nav-item px(lg) py(md) c(white) bg(purple-600) r(md) relative">
                  <span class="relative z(10)">Products</span>
                </a>
                <a href="#" class="nav-item px(lg) py(md) c(gray-400) r(md) hover:bg(gray-700) hover:c(white) transition relative group">
                  <span class="relative z(10)">About</span>
                  <div class="layer(bottom+left+right) h(2px) bg(purple-500) scale-x(0) group-hover:scale-x(100) transition"></div>
                </a>
              </nav>
            </div>
            <div class="showcase-info p(lg) bg(white) r(0/0/xl/xl)">
              <h4 class="font(md) bold c(gray-900) mb(sm)">Modern Navigation</h4>
              <p class="font(sm) c(gray-600)">Animated underlines</p>
            </div>
          </div>
        {/if}
        
        <!-- Notification Badge -->
        {#if activeCategory === 'all' || activeCategory === 'effects'}
          <div class="showcase-item">
            <div class="showcase-preview p(2xl) bg(white) r(xl) h(300px) vbox(pack)">
              <div class="vbox gap(xl) items(center)">
                <div class="relative">
                  <div class="w(80px) h(80px) bg(purple-100) r(xl) vbox(pack)">
                    <Mail size="32" class="c(purple-600)" />
                  </div>
                  <div class="layer(top:-8px+right:-8px) w(32px) h(32px) bg(red-500) r(full) vbox(pack) c(white) font(sm) bold shadow(lg) animate-pulse">
                    5
                  </div>
                </div>
                
                <div class="relative">
                  <div class="w(80px) h(80px) bg(blue-100) r(xl) vbox(pack)">
                    <Calendar size="32" class="c(blue-600)" />
                  </div>
                  <div class="layer(top:-8px+right:-8px) px(sm) py(xs) bg(gradient-to-r/orange-400/red-500) r(full) c(white) font(xs) bold shadow(lg) min-w(24px)">
                    New
                  </div>
                </div>
              </div>
            </div>
            <div class="showcase-info p(lg) bg(white) r(0/0/xl/xl)">
              <h4 class="font(md) bold c(gray-900) mb(sm)">Notification Badges</h4>
              <p class="font(sm) c(gray-600)">Animated badges & alerts</p>
            </div>
          </div>
        {/if}
        
      </div>
    </div>
  </main>
</div>

<style>
  .showcase-item {
    transition: all 0.3s ease;
  }
  
  .showcase-item:hover {
    transform: translateY(-4px);
  }
  
  .showcase-preview {
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .transform-card {
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  
  .transform-card > div {
    backface-visibility: hidden;
  }
  
  .animate-pulse {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
  
  .group:hover .group-hover\:scale-x\(100\) {
    transform: scaleX(1);
  }
  
  .scale-x\(0\) {
    transform: scaleX(0);
  }
</style>