<script lang="ts">
  import { Terminal, Download, Code2, Sparkles } from 'lucide-svelte';
  import GradientButton from '../brand/GradientButton.svelte';
</script>

<section class="getting-started py(6xl) bg(gray-50)">
  <div class="container(4xl) px(lg) vbox gap(4xl)">
    <!-- Section Header -->
    <div class="text(center) vbox gap(lg)">
      <h2 class="heading(h1/section)">
        Get Started in 60 Seconds
      </h2>
      <p class="heading(h4/subtitle) container(2xl)">
        No complex setup, no configuration files. Just install and start building.
      </p>
    </div>
    
    <!-- Installation Steps -->
    <div class="grid grid-cols(1) md:grid-cols(3) gap(2xl)">
      <!-- Step 1 -->
      <div class="card(elevated) text(center) vbox gap(xl)">
        <div class="w(80px) h(80px) bg(blue-100) r(full) vbox(pack) mx(auto)">
          <Terminal size="40" class="c(blue-600)" />
        </div>
        <div class="vbox gap(md)">
          <h3 class="heading(h4)">1. Install</h3>
          <div class="bg(gray-900) r(lg) p(lg)">
            <code class="font(sm) c(white) font-family(mono)">npm install adorable-css</code>
          </div>
          <p class="font(sm) c(gray-600)">Add to your project with one command</p>
        </div>
      </div>
      
      <!-- Step 2 -->
      <div class="card(elevated) text(center) vbox gap(xl)">
        <div class="w(80px) h(80px) bg(green-100) r(full) vbox(pack) mx(auto)">
          <Code2 size="40" class="c(green-600)" />
        </div>
        <div class="vbox gap(md)">
          <h3 class="heading(h4)">2. Import</h3>
          <div class="bg(gray-900) r(lg) p(lg)">
            <code class="font(sm) c(white) font-family(mono)">import 'adorable-css'</code>
          </div>
          <p class="font(sm) c(gray-600)">Zero configuration needed</p>
        </div>
      </div>
      
      <!-- Step 3 -->
      <div class="card(elevated) text(center) vbox gap(xl)">
        <div class="w(80px) h(80px) bg(purple-100) r(full) vbox(pack) mx(auto)">
          <Sparkles size="40" class="c(purple-600)" />
        </div>
        <div class="vbox gap(md)">
          <h3 class="heading(h4)">3. Build</h3>
          <div class="bg(gray-900) r(lg) p(lg)">
            <code class="font(sm) c(white) font-family(mono)">class="vbox(pack)"</code>
          </div>
          <p class="font(sm) c(gray-600)">Start creating beautiful UIs</p>
        </div>
      </div>
    </div>
    
    <!-- Live Example -->
    <div class="card(elevated/xl) container(4xl) vbox gap(lg)">
      <h3 class="heading(h3) text(center)">Your First Component</h3>
      
      <div class="grid grid-cols(1) lg:grid-cols(2) gap(2xl) items(center)">
        <!-- Code -->
        <div class="vbox gap(sm)">
          <div class="font(sm) c(gray-500)">Copy this code:</div>
          <div class="bg(gray-900) r(lg) p(xl)">
            <pre class="font(sm/1.6) c(white) font-family(mono)"><code>{`<div class="
  vbox(pack) gap(lg) p(2xl)
  bg(135deg/purple-500..pink-500)
  r(xl) shadow(2xl)
  hover:scale(1.05) transition
">
  <h2 class="heading(h3) c(white)">
    Hello AdorableCSS!
  </h2>
  <p class="c(white.8)">
    Beautiful by default
  </p>
</div>`}</code></pre>
          </div>
        </div>
        
        <!-- Preview -->
        <div class="vbox gap(sm)">
          <div class="font(sm) c(gray-500)">See the result:</div>
          <div class="vbox(pack) gap(lg) p(2xl) bg(135deg/purple-500..pink-500) 
                      r(xl) shadow(2xl) hover:scale(1.05) transition cursor(pointer)">
            <h2 class="heading(h3) c(white)">Hello AdorableCSS!</h2>
            <p class="c(white.8)">Beautiful by default</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Framework Support -->
    <div class="text(center) vbox gap(lg)">
      <h3 class="heading(h2)">Works With Everything</h3>
      <div class="hbox(center) gap(2xl) flex-wrap">
        <div class="card(interactive) px(xl) py(lg)">
          <div class="font(lg) 600 c(gray-700)">React</div>
        </div>
        <div class="card(interactive) px(xl) py(lg)">
          <div class="font(lg) 600 c(gray-700)">Vue</div>
        </div>
        <div class="card(interactive) px(xl) py(lg)">
          <div class="font(lg) 600 c(gray-700)">Svelte</div>
        </div>
        <div class="card(interactive) px(xl) py(lg)">
          <div class="font(lg) 600 c(gray-700)">Angular</div>
        </div>
        <div class="card(interactive) px(xl) py(lg)">
          <div class="font(lg) 600 c(gray-700)">HTML</div>
        </div>
      </div>
    </div>
    
    <!-- CTA -->
    <div class="text(center) vbox gap(lg)">
      <div class="hbox(center) gap(lg) flex-wrap">
        <GradientButton variant="adorable" size="lg" arrow>
          Start Building Now
        </GradientButton>
        
        <button class="btn(secondary/lg) hbox(middle) gap(sm)">
          <Download size="20" />
          Download Examples
        </button>
      </div>
      
      <p class="font(sm) c(gray-500)">
        Free & Open Source • MIT License • 
        <a href="#" class="c(purple-600) hover:underline">View on GitHub</a>
      </p>
    </div>
  </div>
</section>

