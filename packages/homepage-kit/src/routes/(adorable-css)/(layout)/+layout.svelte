<script>
  import Navbar from '$lib/components/home/Navbar.svelte'
</script>

<!-- Alpha Version Ribbon -->
<div class="fixed top(0) left(0) z(100) w(100) h(100) clip pointer-events(none)">
  <div class="absolute top(20) left(-35) z(top) w(120) bg(warning) py(4) text(center) shadow(sm) rotate(-45) pointer-events(auto)">
    <span class="caption(xs) c(white) bold uppercase">Alpha</span>
  </div>
</div>

<div class="min-h(screen) vbox">
  <Navbar />
  <main class="flex(1)">
    <slot />
  </main>
</div>

