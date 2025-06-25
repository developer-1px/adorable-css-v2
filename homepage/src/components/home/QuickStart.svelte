<script lang="ts">
  import { Terminal, Download, Code2, Sparkles } from 'lucide-svelte';
  import GradientButton from '../brand/GradientButton.svelte';
</script>

<section class="getting-started py(6xl) bg(gray-50)">
  <div class="container(4xl) px(lg)">
    <!-- Section Header -->
    <div class="text(center) mb(4xl)">
      <h2 class="900 font(4xl/1.2) c(gray-900) mb(lg)">
        Get Started in 60 Seconds
      </h2>
      <p class="font(lg) c(gray-600) container(2xl)">
        No complex setup, no configuration files. Just install and start building.
      </p>
    </div>
    
    <!-- Installation Steps -->
    <div class="grid grid-cols(1) md:grid-cols(3) gap(2xl) mb(4xl)">
      <!-- Step 1 -->
      <div class="text(center) p(2xl) bg(white) r(xl) border(1/gray-200)">
        <div class="w(80px) h(80px) bg(blue-100) r(full) vbox(pack) mx(auto) mb(xl)">
          <Terminal size="40" class="c(blue-600)" />
        </div>
        <h3 class="font(xl) 700 c(gray-900) mb(md)">1. Install</h3>
        <div class="bg(gray-900) r(lg) p(lg) mb(md)">
          <code class="font(sm) c(white) font-family(mono)">npm install adorable-css</code>
        </div>
        <p class="font(sm) c(gray-600)">Add to your project with one command</p>
      </div>
      
      <!-- Step 2 -->
      <div class="text(center) p(2xl) bg(white) r(xl) border(1/gray-200)">
        <div class="w(80px) h(80px) bg(green-100) r(full) vbox(pack) mx(auto) mb(xl)">
          <Code2 size="40" class="c(green-600)" />
        </div>
        <h3 class="font(xl) 700 c(gray-900) mb(md)">2. Import</h3>
        <div class="bg(gray-900) r(lg) p(lg) mb(md)">
          <code class="font(sm) c(white) font-family(mono)">import 'adorable-css'</code>
        </div>
        <p class="font(sm) c(gray-600)">Zero configuration needed</p>
      </div>
      
      <!-- Step 3 -->
      <div class="text(center) p(2xl) bg(white) r(xl) border(1/gray-200)">
        <div class="w(80px) h(80px) bg(purple-100) r(full) vbox(pack) mx(auto) mb(xl)">
          <Sparkles size="40" class="c(purple-600)" />
        </div>
        <h3 class="font(xl) 700 c(gray-900) mb(md)">3. Build</h3>
        <div class="bg(gray-900) r(lg) p(lg) mb(md)">
          <code class="font(sm) c(white) font-family(mono)">class="vbox(pack)"</code>
        </div>
        <p class="font(sm) c(gray-600)">Start creating beautiful UIs</p>
      </div>
    </div>
    
    <!-- Live Example -->
    <div class="container(4xl) mb(4xl)">
      <div class="p(3xl) bg(white) r(2xl) border(1/gray-200)">
        <h3 class="font(xl) 700 c(gray-900) mb(lg) text(center)">Your First Component</h3>
        
        <div class="grid grid-cols(1) lg:grid-cols(2) gap(2xl) items(center)">
          <!-- Code -->
          <div>
            <div class="font(sm) c(gray-500) mb(sm)">Copy this code:</div>
            <div class="bg(gray-900) r(lg) p(xl)">
              <pre class="font(sm/1.6) c(white) font-family(mono)"><code>{`<div class="
  vbox(pack) gap(lg) p(2xl)
  bg(gradient-to-br/purple-500/pink-500)
  r(xl) shadow(2xl)
  hover:scale(1.05) transition
">
  <h2 class="700 font(2xl) c(white)">
    Hello AdorableCSS!
  </h2>
  <p class="c(white.8)">
    Beautiful by default
  </p>
</div>`}</code></pre>
            </div>
          </div>
          
          <!-- Preview -->
          <div>
            <div class="font(sm) c(gray-500) mb(sm)">See the result:</div>
            <div class="vbox(pack) gap(lg) p(2xl) bg(gradient-to-br/purple-500/pink-500) 
                        r(xl) shadow(2xl) hover:scale(1.05) transition cursor(pointer)">
              <h2 class="700 font(2xl) c(white)">Hello AdorableCSS!</h2>
              <p class="c(white.8)">Beautiful by default</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Framework Support -->
    <div class="text(center) mb(4xl)">
      <h3 class="font(2xl) 700 c(gray-900) mb(lg)">Works With Everything</h3>
      <div class="hbox(center) gap(2xl) flex-wrap">
        <div class="px(xl) py(lg) bg(white) r(lg) border(1/gray-200) hover:shadow(md) transition">
          <div class="font(lg) 600 c(gray-700)">React</div>
        </div>
        <div class="px(xl) py(lg) bg(white) r(lg) border(1/gray-200) hover:shadow(md) transition">
          <div class="font(lg) 600 c(gray-700)">Vue</div>
        </div>
        <div class="px(xl) py(lg) bg(white) r(lg) border(1/gray-200) hover:shadow(md) transition">
          <div class="font(lg) 600 c(gray-700)">Svelte</div>
        </div>
        <div class="px(xl) py(lg) bg(white) r(lg) border(1/gray-200) hover:shadow(md) transition">
          <div class="font(lg) 600 c(gray-700)">Angular</div>
        </div>
        <div class="px(xl) py(lg) bg(white) r(lg) border(1/gray-200) hover:shadow(md) transition">
          <div class="font(lg) 600 c(gray-700)">HTML</div>
        </div>
      </div>
    </div>
    
    <!-- CTA -->
    <div class="text(center)">
      <div class="hbox(center) gap(lg) flex-wrap mb(lg)">
        <GradientButton variant="adorable" size="xl" arrow>
          Start Building Now
        </GradientButton>
        
        <button class="px(2xl) py(xl) bg(white) border(1/gray-200) r(lg) 
                       c(gray-700) 600 hover:bg(gray-50) hover:shadow(sm) transition">
          <span class="hbox(center) gap(sm)">
            <Download size="20" />
            Download Examples
          </span>
        </button>
      </div>
      
      <p class="font(sm) c(gray-500)">
        Free & Open Source • MIT License • 
        <a href="#" class="c(purple-600) hover:underline">View on GitHub</a>
      </p>
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