<script>
import { onMount } from 'svelte';

let mouseX = 0;
let mouseY = 0;
let isHovering = false;

onMount(() => {
  const handleMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
});
</script>

<div class="vbox() gap(0) bg(gradient/45deg/#FFE5CC/#FFCCE5/#E5CCFF/#CCE5FF) minH(100vh) overflow(hidden)">
  <!-- Floating decorations -->
  <div class="absolute w(200) h(200) r(50%) bg(pink.30) blur(80) top(-100) left(-50) animate(float/6s)"></div>
  <div class="absolute w(300) h(300) r(50%) bg(purple.20) blur(100) bottom(-150) right(-100) animate(float/8s/reverse)"></div>
  <div class="absolute w(150) h(150) r(50%) bg(blue.30) blur(60) top(50%) left(70%) animate(float/5s)"></div>

  <!-- Hero Section -->
  <section class="vbox() items(center) justify(center) gap(48) py(80) px(24) relative">
    <div class="text(center) vbox() gap(24) items(center) animate(slideUp/0.6s)">
      <h1 class="display(3xl) c(gradient/45deg/#FF006E/#8338EC/#3A86FF) font(black) tracking(-2) transform(rotate/-2deg)">
        AdorableCSS
      </h1>
      <p class="title(xl) c(gray800) opacity(80) maxW(600)">
        Where pixels party and gradients groove! 🎉
      </p>
    </div>

    <!-- Interactive Cards -->
    <div class="hbox() gap(32) flex(wrap) justify(center) mt(40)">
      <div 
        class="card vbox() gap(24) p(40) bg(white.90) r(32) shadow(xl) hover:shadow(2xl) hover:transform(scale/1.05/rotate/1deg) transition(all/0.3s) cursor(pointer)"
        on:mouseenter={() => isHovering = true}
        on:mouseleave={() => isHovering = false}
      >
        <div class="text(6xl) animate(bounce/2s)">🎨</div>
        <h3 class="heading(lg) c(purple600)">Paint Mode</h3>
        <p class="body(md) c(gray600) maxW(200)">
          CSS that feels like finger painting!
        </p>
      </div>

      <div class="card vbox() gap(24) p(40) bg(gradient/135deg/#FFE5B4/#FFB6C1) r(32) shadow(xl) hover:shadow(2xl) hover:transform(scale/1.05/rotate/-1deg) transition(all/0.3s)">
        <div class="text(6xl) animate(spin/3s)">🌈</div>
        <h3 class="heading(lg) c(white)">Rainbow Power</h3>
        <p class="body(md) c(white.90) maxW(200)">
          Gradients so smooth they're illegal!
        </p>
      </div>

      <div class="card vbox() gap(24) p(40) bg(black.90) r(32) shadow(xl) hover:shadow(2xl) hover:transform(scale/1.05) transition(all/0.3s)">
        <div class="text(6xl) animate(wiggle/1s)">⚡</div>
        <h3 class="heading(lg) c(yellow400)">Speed Mode</h3>
        <p class="body(md) c(gray300) maxW(200)">
          Zero runtime, infinite fun!
        </p>
      </div>
    </div>
  </section>

  <!-- Feature Showcase -->
  <section class="vbox() gap(64) py(80) px(24) items(center)">
    <div class="grid(3) gap(40) maxW(1200) w(full)">
      <!-- Syntax Examples -->
      <div class="vbox() gap(24) p(32) bg(white.80) r(24) backdrop(blur/10px)">
        <h3 class="title(md) c(pink600)">Sweet Syntax 🍬</h3>
        <code class="vbox() gap(16) p(20) bg(gray900) c(green400) r(16) font(mono)">
          <span>p(20/40) // padding magic!</span>
          <span>gap(16/24) // responsive gaps!</span>
          <span>text(Inter/16/1.5/500) // all-in-one!</span>
        </code>
      </div>

      <!-- Animation Playground -->
      <div class="vbox() gap(24) p(32) bg(gradient/45deg/#B794F4/#9F7AEA) r(24)">
        <h3 class="title(md) c(white)">Animations 🎪</h3>
        <div class="hbox() gap(16) justify(around)">
          <div class="w(60) h(60) bg(white) r(12) animate(bounce/1s)"></div>
          <div class="w(60) h(60) bg(white) r(50%) animate(spin/2s)"></div>
          <div class="w(60) h(60) bg(white) r(12) animate(pulse/1.5s)"></div>
        </div>
      </div>

      <!-- Layout Demo -->
      <div class="vbox() gap(24) p(32) bg(mint.20) r(24)">
        <h3 class="title(md) c(mint800)">Layouts 📐</h3>
        <div class="vbox() gap(12)">
          <div class="hbox() gap(8)">
            <div class="w(fill) h(40) bg(mint400) r(8)"></div>
            <div class="w(80) h(40) bg(mint600) r(8)"></div>
          </div>
          <div class="hbox() gap(8)">
            <div class="w(100) h(40) bg(mint600) r(8)"></div>
            <div class="w(fill) h(40) bg(mint400) r(8)"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Interactive Demo -->
  <section class="vbox() items(center) py(80) px(24) bg(white.50) backdrop(blur/5px)">
    <div class="vbox() gap(32) items(center) maxW(800) w(full)">
      <h2 class="display(2xl) c(gradient/90deg/#F72585/#7209B7/#3A0CA3) text(center)">
        Try It Live! ✨
      </h2>
      
      <div class="vbox() gap(24) w(full)">
        <input 
          type="text" 
          placeholder="Type your class here: hbox() gap(16) p(20)"
          class="w(full) p(16/24) r(16) border(2/solid/purple300) focus:border(purple500) focus:shadow(lg) transition(all/0.3s) text(lg)"
        />
        
        <div class="hbox() gap(16) p(20) bg(gradient/135deg/#F3E5F5/#E1BEE7) r(20) min-h(100)">
          <div class="vbox() gap(12) w(fill)">
            <div class="h(20) bg(purple300) r(10) animate(pulse/2s)"></div>
            <div class="h(20) bg(purple400) r(10) animate(pulse/2s/0.5s)"></div>
            <div class="h(20) bg(purple500) r(10) animate(pulse/2s/1s)"></div>
          </div>
          <button class="px(32) py(12) bg(purple600) c(white) r(999) hover:bg(purple700) hover:shadow(xl) transition(all/0.2s) font(semibold)">
            Magic! ✨
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Call to Action -->
  <section class="vbox() items(center) justify(center) py(100) px(24) relative overflow(hidden)">
    <div class="absolute inset(0) bg(gradient/radial/white.20/transparent) animate(pulse/3s)"></div>
    
    <div class="vbox() gap(32) items(center) relative z(10)">
      <h2 class="display(2xl) c(white) text(center) drop-shadow(lg)">
        Ready to Make CSS Fun Again? 🎊
      </h2>
      
      <div class="hbox() gap(24) flex(wrap) justify(center)">
        <button class="px(40) py(16) bg(white) c(purple600) r(999) text(xl) font(bold) shadow(2xl) hover:transform(scale/1.1) hover:shadow(3xl) transition(all/0.3s)">
          Start Creating! 🚀
        </button>
        <button class="px(40) py(16) bg(transparent) c(white) r(999) text(xl) font(bold) border(3/solid/white) hover:bg(white.20) transition(all/0.3s)">
          Learn More 📚
        </button>
      </div>
    </div>
  </section>
</div>

<style>
  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    33% {
      transform: translateY(-30px) rotate(2deg);
    }
    66% {
      transform: translateY(20px) rotate(-2deg);
    }
  }

  @keyframes wiggle {
    0%, 100% {
      transform: rotate(-3deg);
    }
    50% {
      transform: rotate(3deg);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(0.95);
    }
  }

  /* Custom gradients for text */
  .c\(gradient\/45deg\/\#FF006E\/\#8338EC\/\#3A86FF\) {
    background: linear-gradient(45deg, #FF006E, #8338EC, #3A86FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .c\(gradient\/90deg\/\#F72585\/\#7209B7\/\#3A0CA3\) {
    background: linear-gradient(90deg, #F72585, #7209B7, #3A0CA3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Backdrop blur support */
  .backdrop\(blur\/10px\) {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .backdrop\(blur\/5px\) {
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
</style>