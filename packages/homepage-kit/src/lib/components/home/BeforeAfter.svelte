<script lang="ts">
  import { ArrowRight, Copy, Check } from 'lucide-svelte';
  
  let copied = false;
  
  function copyCode() {
    navigator.clipboard.writeText(`<div class="vbox(pack) gap(24) p(32) bg(135deg/purple-500,pink-500) r(16) shadow(xl) hover:scale(1.05) transition">`);
    copied = true;
    setTimeout(() => copied = false, 2000);
  }
</script>

<section class="comparison py(6xl) bg(white)">
  <div class="container(5xl) px(lg) vbox gap(4xl)">
    <!-- Section Header -->
    <div class="vbox(center) text(center) gap(lg)">
      <h2 class="heading(h1/section)">
        The Dramatic Difference
      </h2>
      <p class="heading(h4/subtitle) container(2xl)">
        See how AdorableCSS transforms verbose CSS into elegant, readable code
      </p>
    </div>
    
    <!-- Main Comparison -->
    <div class="card(elevated/xl) vbox gap(2xl) items(center)">
      <div class="grid grid-cols(1) xl:grid-cols(5) gap(2xl) items(center) w(full)">
        <!-- Before -->
        <div class="xl:col(2) vbox gap(lg)">
          <div class="vbox gap(md)">
            <span class="hbox(middle) px(md) py(sm) bg(red-100) c(red-700) r(full) font(sm) 600">
              Traditional CSS
            </span>
            <h3 class="heading(h4)">Complex & Verbose</h3>
          </div>
          
          <div class="bg(gray-900) r(lg) p(lg)">
            <pre class="font(xs/1.4) c(white) font-family(mono) scroll(x/auto)"><code>{`.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 32px;
  background: linear-gradient(
    135deg,
    #8b5cf6 0%,
    #ec4899 100%
  );
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px
    rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: scale(1.05);
}`}</code></pre>
          </div>
          
          <div class="hbox(between)">
            <span class="font(sm) c(gray-500)">18 lines of CSS</span>
            <span class="font(sm) c(red-600) 600">Hard to maintain</span>
          </div>
        </div>
        
        <!-- Arrow -->
        <div class="xl:col(1) vbox(center) text(center)(pack) gap(md)">
          <div class="w(80px) h(80px) bg(135deg/oklch(0.65,0.28,295),oklch(0.7,0.23,0)) 
                      r(full) vbox(pack) mx(auto) shadow(xl)">
            <ArrowRight size="32" class="c(white)" />
          </div>
          <div class="font(sm) 600 c(gray-700) hidden xl:block">BECOMES</div>
        </div>
        
        <!-- After -->
        <div class="xl:col(2) vbox gap(lg)">
          <div class="vbox gap(md)">
            <span class="hbox(middle) px(md) py(sm) bg(green-100) c(green-700) r(full) font(sm) 600">
              AdorableCSS
            </span>
            <h3 class="heading(h4)">Simple & Elegant</h3>
          </div>
          
          <div class="bg(gray-900) r(lg) p(lg) relative group cursor(pointer)" on:click={copyCode}>
            <pre class="font(xs/1.4) c(white) font-family(mono)"><code>{`<div class="
  vbox(pack) gap(24) p(32)
  bg(135deg/purple-500,pink-500)
  r(16) shadow(xl)
  hover:scale(1.05) transition
">`}</code></pre>
            
            <!-- Copy Button -->
            <button class="absolute top(md) right(md) p(sm) bg(white.2) backdrop-blur(sm) 
                           r(md) opacity(0) group-hover:opacity(1) transition hbox(middle) gap(xs)">
              {#if copied}
                <Check size="14" class="c(white)" />
                <span class="font(xs) c(white)">Copied!</span>
              {:else}
                <Copy size="14" class="c(white)" />
                <span class="font(xs) c(white)">Copy</span>
              {/if}
            </button>
          </div>
          
          <div class="hbox(between)">
            <span class="font(sm) c(gray-500)">1 line of HTML</span>
            <span class="font(sm) c(green-600) 600">Self-documenting</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Impact Stats -->
    <div class="grid grid-cols(1) md:grid-cols(4) gap(xl)">
      <div class="card(outlined) vbox(center) text(center) gap(sm) bg(purple-50) border(1/purple-200)">
        <div class="font(3xl) 900 text(transparent) bg(135deg/oklch(0.65,0.28,295),oklch(0.7,0.23,0)) bg-clip(text)">
          96%
        </div>
        <div class="font(sm) c(gray-600) 600">Less Code</div>
        <div class="font(xs) c(gray-500)">18 lines → 1 line</div>
      </div>
      
      <div class="card(outlined) vbox(center) text(center) gap(sm) bg(green-50) border(1/green-200)">
        <div class="font(3xl) 900 c(green-600)">10x</div>
        <div class="font(sm) c(gray-600) 600">Faster Writing</div>
        <div class="font(xs) c(gray-500)">Design to code speed</div>
      </div>
      
      <div class="card(outlined) vbox(center) text(center) gap(sm) bg(blue-50) border(1/blue-200)">
        <div class="font(3xl) 900 c(blue-600)">100%</div>
        <div class="font(sm) c(gray-600) 600">Readable</div>
        <div class="font(xs) c(gray-500)">Self-documenting code</div>
      </div>
      
      <div class="card(outlined) vbox(center) text(center) gap(sm) bg(orange-50) border(1/orange-200)">
        <div class="font(3xl) 900 c(orange-600)">0ms</div>
        <div class="font(sm) c(gray-600) 600">Runtime</div>
        <div class="font(xs) c(gray-500)">Pure CSS output</div>
      </div>
    </div>
    
    <!-- Live Preview -->
    <div class="text(center)">
      <div class="card(elevated) container(2xl) vbox gap(lg)">
        <h3 class="heading(h3)">Live Result</h3>
        <div class="vbox(pack) gap(24) p(32) bg(135deg/purple-500,pink-500) 
                    r(16) shadow(xl) hover:scale(1.05) transition cursor(pointer)">
          <div class="w(60px) h(60px) bg(white.2) r(full) vbox(pack) backdrop-blur(sm)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="c(white)">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
            </svg>
          </div>
          <div class="vbox(center) text(center) gap(sm)">
            <h4 class="heading(h5) c(white)">Beautiful Component</h4>
            <p class="font(sm) c(white.8)">Built with one line of AdorableCSS</p>
          </div>
        </div>
        <p class="font(sm) c(gray-600)">
          Hover the card above to see the smooth scale animation in action
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  code {
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  }
  
  pre {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
  }
</style>