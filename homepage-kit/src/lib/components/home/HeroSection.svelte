<script lang="ts">
  import { ArrowRight, Zap } from 'lucide-svelte';
  import CodeHighlighter from '../CodeHighlighter.svelte';
  
  // Live demo state
  let beforeCode = `<!-- TailwindCSS: 18 lines of repetitive code -->
<div class="flex flex-col justify-center items-center gap-6 p-8
     bg-gradient-to-br from-purple-500 to-pink-500 
     rounded-2xl shadow-xl transform hover:scale-105 
     transition-all duration-300">
  <h2 class="text-2xl font-bold text-white text-center">
    Beautiful Component
  </h2>
  <p class="text-white opacity-80 text-center">
    Complex but powerful
  </p>
</div>`;

  let afterCode = `<!-- AdorableCSS: 1 intuitive line -->
<div class="vbox(pack) gap(lg) p(2xl) 
     bg(135deg/purple-500..pink-500) r(2xl) shadow(xl) 
     hover:scale(1.05) transition">
  <h2 class="700 font(2xl) c(white) text(center)">
    Beautiful Component
  </h2>
  <p class="c(white.8) text(center)">
    Simple and elegant
  </p>
</div>`;
</script>

<!-- Hero Section -->
<section class="min-h(100vh) vbox(pack) bg(white) relative clip">
  <!-- Background -->
  <div class="layer pointer-events(none)">
    <div class="absolute w(400px) h(400px) r(full) blur(120px) opacity(0.1) 
                bg(135deg/purple-500..pink-500) top(-200px) right(-100px)"></div>
    <div class="absolute w(300px) h(300px) r(full) blur(100px) opacity(0.08) 
                bg(135deg/blue-500..teal-500) bottom(-150px) left(-150px)"></div>
  </div>
  
  <div class="container(6xl) px(xl) py(6xl) relative z(10)">
    <div class="text(center) vbox gap(3xl)">
      
      <!-- Main Heading -->
      <div class="vbox gap(xl)">
        <h1 class="heading(h1/hero)">
          Finally, CSS That
          <span class="block heading(h1/gradient)">
            Just Works ✨
          </span>
        </h1>
        
        <p class="heading(h4/subtitle) container(3xl)">
          <strong class="c(gray-900)">No design skills?</strong> No problem. 
          AdorableCSS makes beautiful UIs automatic. 
          <strong class="c(gray-900)">Write simple syntax, get gorgeous results.</strong>
        </p>
        
        <div class="card(flat) container(2xl)">
          <p class="font(lg) c(gray-700)">
            💡 <strong>The Philosophy:</strong> "Anyone should be able to create Apple-quality designs 
            by just following the syntax. No design degree required."
          </p>
        </div>
      </div>
      
      <!-- Key Benefits -->
      <div class="hbox(pack) gap(3xl) flex-wrap">
        <div class="vbox gap(sm)">
          <div class="hbox(middle) gap(sm)">
            <Zap class="c(orange-500)" size="24" />
            <span class="900 font(3xl) c(gray-900)">96%</span>
          </div>
          <span class="font(sm) c(gray-600)">Less Code to Write</span>
          <span class="font(xs) c(gray-500)">Same beauty, less typing</span>
        </div>
        
        <div class="vbox gap(sm)">
          <span class="900 font(3xl) c(purple-600)">Auto</span>
          <span class="font(sm) c(gray-600)">Good Design</span>
          <span class="font(xs) c(gray-500)">No design skills needed</span>
        </div>
        
        <div class="vbox gap(sm)">
          <span class="900 font(3xl) c(green-600)">AI</span>
          <span class="font(sm) c(gray-600)">Friendly</span>
          <span class="font(xs) c(gray-500)">Easy patterns to learn</span>
        </div>
      </div>
      
      <!-- Live Demo -->
      <div class="container(6xl) vbox gap(xl)">
        <div class="vbox gap(md) text(center)">
          <h2 class="700 font(2xl) c(gray-800)">The Magic in Action</h2>
          <p class="c(gray-600) container(4xl)">
            Same beautiful component, <strong class="c(gray-900)">96% less code.</strong> 
            This isn't just about syntax—it's about <strong class="c(gray-900)">automatic good design</strong>.
          </p>
        </div>
        
        <!-- Side by Side Comparison -->
        <div class="grid grid-cols(1) lg:grid-cols(2) gap(2xl)">
          <!-- Before: TailwindCSS -->
          <div class="card(outlined) vbox gap(lg)">
            <div class="hbox(middle+between)">
              <h3 class="heading(h5)">TailwindCSS Way</h3>
              <span class="px(sm) py(xs) bg(red-100) c(red-700) r(full) font(xs) 600">18 Lines</span>
            </div>
            
            <div class="bg(gray-900) r(lg) p(lg) clip">
              <CodeHighlighter 
                code={beforeCode} 
                language="css" 
                className="font(xs/1.4)" 
              />
            </div>
            
            <div class="p(lg) bg(gray-50) r(lg) border(2/gray-200)">
              <div class="card(gradient) vbox(pack) gap(lg) hover:scale(1.05) transition cursor(pointer)">
                <h4 class="700 font(xl) c(white) text(center)">Beautiful Component</h4>
                <p class="c(white.8) text(center)">Complex but powerful</p>
              </div>
            </div>
          </div>
          
          <!-- After: AdorableCSS -->
          <div class="card(outlined) vbox gap(lg)">
            <div class="hbox(middle+between)">
              <h3 class="heading(h5)">AdorableCSS Way</h3>
              <span class="px(sm) py(xs) bg(green-100) c(green-700) r(full) font(xs) 600">1 Line</span>
            </div>
            
            <div class="bg(gray-900) r(lg) p(lg) clip">
              <CodeHighlighter 
                code={afterCode} 
                language="adorable" 
                className="font(xs/1.4)" 
              />
            </div>
            
            <div class="p(lg) bg(purple-50) r(lg) border(2/purple-200)">
              <div class="card(gradient) vbox(pack) gap(lg) hover:scale(1.05) transition cursor(pointer)">
                <h4 class="700 font(xl) c(white) text(center)">Beautiful Component</h4>
                <p class="c(white.8) text(center)">Simple and elegant</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Key Benefits -->
        <div class="text(center) pt(xl) bt(1/gray-200)">
          <p class="font(lg) c(gray-700) mb(md)">
            <strong class="c(purple-600)">Same professional result.</strong> 
            Perfect spacing, beautiful colors, smooth interactions—all automatic.
          </p>
          <p class="font(sm) c(gray-600)">
            💡 No design knowledge required. Just follow the syntax and get Apple-quality UI.
          </p>
        </div>
      </div>
      
      <!-- Design Token Showcase -->
      <div class="vbox gap(xl) pt(2xl) bt(1/gray-200)">
        <div class="text(center) vbox gap(md)">
          <h2 class="heading(h2/section)">Beautiful by Default, Yours by Design</h2>
          <p class="heading(h5/subtitle) container(4xl)">
            <strong class="c(gray-900)">Design tokens make customization effortless.</strong> 
            Apple-quality defaults that adapt to your brand in seconds.
          </p>
        </div>
        
        <!-- Design Token Demo -->
        <div class="grid grid-cols(1) md:grid-cols(3) gap(xl)">
          <!-- Default Apple Theme -->
          <div class="card(elevated/sm) vbox gap(md)">
            <div class="hbox(middle+between)">
              <h4 class="heading(h6)">Apple Default</h4>
              <span class="font(xs) c(gray-500)">#007AFF</span>
            </div>
            <div class="vbox gap(sm)">
              <button class="btn()">Primary Action</button>
              <div class="card() p(sm)">
                <h5 class="heading(h6)">Card Component</h5>
                <p class="font(sm) c(gray-600)">Perfect spacing and shadows</p>
              </div>
            </div>
          </div>
          
          <!-- Custom Brand Theme -->
          <div class="card(elevated/sm) vbox gap(md)" style="--primary: #8b5cf6; --primary-light: #a78bfa;">
            <div class="hbox(middle+between)">
              <h4 class="heading(h6)">Your Brand</h4>
              <span class="font(xs) c(gray-500)">#8b5cf6</span>
            </div>
            <div class="vbox gap(sm)">
              <button class="btn() bg(--primary) hover:bg(--primary-light)">Primary Action</button>
              <div class="card() p(sm) border(1/--primary.2)">
                <h5 class="heading(h6)">Card Component</h5>
                <p class="font(sm) c(gray-600)">Same quality, your colors</p>
              </div>
            </div>
          </div>
          
          <!-- Enterprise Theme -->
          <div class="card(elevated/sm) vbox gap(md)" style="--primary: #059669; --primary-light: #10b981;">
            <div class="hbox(middle+between)">
              <h4 class="heading(h6)">Enterprise</h4>
              <span class="font(xs) c(gray-500)">#059669</span>
            </div>
            <div class="vbox gap(sm)">
              <button class="btn() bg(--primary) hover:bg(--primary-light)">Primary Action</button>
              <div class="card() p(sm) border(1/--primary.2)">
                <h5 class="heading(h6)">Card Component</h5>
                <p class="font(sm) c(gray-600)">Professional and trustworthy</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Simple Customization Code -->
        <div class="card(flat) text(center) vbox gap(sm)">
          <p class="font(md) c(gray-700)">
            <strong>One line of CSS to rebrand everything:</strong>
          </p>
          <code class="font(mono/sm) bg(gray-100) px(md) py(xs) r(md)">
            :root &#123; --primary: #8b5cf6; &#125;
          </code>
          <p class="font(xs) c(gray-500)">
            All components automatically adapt. Apple-quality design, your brand.
          </p>
        </div>
      </div>
      
      <!-- CTA -->
      <div class="vbox gap(lg)">
        <div class="hbox(pack) gap(lg)">
          <button class="btn(primary/lg) hbox(middle) gap(sm)">
            Start Creating Beautiful UIs
            <ArrowRight size="20" />
          </button>
          
          <button class="btn(secondary/lg)">
            npm install adorable-css
          </button>
        </div>
        
        <p class="font(sm) c(gray-500) text(center)">
          ⚡ <strong>Zero learning curve</strong> if you know Figma • 
          🎨 <strong>Design tokens for easy branding</strong> • 
          🤖 <strong>AI-friendly syntax</strong>
        </p>
      </div>
      
    </div>
  </div>
</section>

