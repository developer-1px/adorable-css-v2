<script lang="ts">
  import { Check, X, Sparkles } from 'lucide-svelte';
</script>

<section class="section(feature) bg(gray-50)">
  <div class="contain(wide)">
    
    <!-- The Component Revolution -->
    <div class="content(centered)">
      <h2 class="900 font(4xl) c(gray-900)">
        Beautiful by Default,
        <span class="block bg(135deg/#8b5cf6..#ec4899)" style="-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
          Not by Accident
        </span>
      </h2>
      <p class="lead() flow()">
        Traditional CSS gives you endless ways to create inconsistent designs. 
        <strong class="c(gray-900)">AdorableCSS gives you guardrails.</strong> 
        Our smart defaults and design tokens ensure every component looks professional, automatically.
      </p>
    </div>

    <!-- Side by Side: Beginner's Code -->
    <div class="grid grid-cols(1) lg:grid-cols(2) gap(xl)">
      <!-- Without AdorableCSS -->
      <div class="vbox gap(lg)">
        <div class="hbox(middle) gap(md)">
          <X class="c(red-500)" size="24" />
          <h3 class="700 font(xl) c(gray-800)">Without Design System</h3>
        </div>
        
        <div class="card() p(xl) stack(lg)">
          <div class="bg(gray-100) p(md) r(md) font(sm/1.6) font-family(mono)">
            <div class="c(gray-600)">/* Without a design system */</div>
            <div>&lt;div style="</div>
            <div class="pl(lg)">padding: 23px;</div>
            <div class="pl(lg)">margin: 17px;</div>
            <div class="pl(lg)">box-shadow: 3px 3px 10px gray;</div>
            <div class="pl(lg)">border-radius: 7px;</div>
            <div>"&gt;</div>
            <div>&nbsp;&nbsp;&lt;h2 style="font-size: 27px"&gt;Title&lt;/h2&gt;</div>
            <div>&nbsp;&nbsp;&lt;p style="color: #555"&gt;Content&lt;/p&gt;</div>
            <div>&lt;/div&gt;</div>
          </div>
          
          <div class="p(lg) bg(white) r(md)" style="padding: 23px; margin: 17px; box-shadow: 3px 3px 10px gray; border-radius: 7px;">
            <h2 style="font-size: 27px; margin: 0 0 10px 0;">Inconsistent Card</h2>
            <p style="color: #555; margin: 0;">Random values everywhere. No visual harmony. This is CSS without a system.</p>
          </div>
          
          <div class="hbox gap(sm) flex-wrap">
            <span class="px(sm) py(xs) bg(red-100) c(red-700) r(sm) font(xs)">❌ Inconsistent spacing</span>
            <span class="px(sm) py(xs) bg(red-100) c(red-700) r(sm) font(xs)">❌ Random values</span>
            <span class="px(sm) py(xs) bg(red-100) c(red-700) r(sm) font(xs)">❌ No harmony</span>
          </div>
        </div>
      </div>
      
      <!-- With AdorableCSS -->
      <div class="vbox gap(lg)">
        <div class="hbox(middle) gap(md)">
          <Check class="c(green-500)" size="24" />
          <h3 class="700 font(xl) c(gray-800)">With AdorableCSS</h3>
        </div>
        
        <div class="card() p(xl) stack(lg)">
          <div class="bg(purple-50) p(md) r(md) font(sm/1.6) font-family(mono)">
            <div class="c(purple-600)">/* With AdorableCSS */</div>
            <div>&lt;div class="card()"&gt;</div>
            <div>&nbsp;&nbsp;&lt;h2 class="heading(h2)"&gt;Title&lt;/h2&gt;</div>
            <div>&nbsp;&nbsp;&lt;p&gt;Content&lt;/p&gt;</div>
            <div>&lt;/div&gt;</div>
          </div>
          
          <div class="card()">
            <h2 class="heading(h2)">Beautiful Card</h2>
            <p>Everything matches. Spacing is perfect. This is what happens when design intelligence is built into the system.</p>
          </div>
          
          <div class="hbox gap(sm) flex-wrap">
            <span class="px(sm) py(xs) bg(green-100) c(green-700) r(sm) font(xs)">✅ Perfect proportions</span>
            <span class="px(sm) py(xs) bg(green-100) c(green-700) r(sm) font(xs)">✅ Harmonic scale</span>
            <span class="px(sm) py(xs) bg(green-100) c(green-700) r(sm) font(xs)">✅ Automatic beauty</span>
          </div>
        </div>
      </div>
    </div>

    <!-- The Science Behind It -->
    <div class="vbox gap(xl) pt(xl)">
      <div class="card(elevated) p(xl)">
        <h3 class="700 font(2xl) c(gray-800) mb(lg) text(center)">
          <Sparkles class="inline c(purple-500)" size="28" />
          The Science of "Automatic Beautiful"
        </h3>
        
        <div class="grid grid-cols(1) md:grid-cols(3) gap(xl)">
          <div class="vbox gap(md) text(center)">
            <div class="w(80px) h(80px) bg(purple-100) r(full) vbox(pack) mx(auto) mb(md)">
              <span class="font(2xl)">📐</span>
            </div>
            <h4 class="600 font(lg) c(gray-800)">Golden Ratios</h4>
            <p class="font(sm) c(gray-600)">
              Our spacing scale follows mathematical ratios found in nature. 
              Your brain perceives it as "naturally pleasing."
            </p>
          </div>
          
          <div class="vbox gap(md) text(center)">
            <div class="w(80px) h(80px) bg(purple-100) r(full) vbox(pack) mx(auto) mb(md)">
              <span class="font(2xl)">🎨</span>
            </div>
            <h4 class="600 font(lg) c(gray-800)">Color Harmony</h4>
            <p class="font(sm) c(gray-600)">
              OKLCH color space ensures every generated shade has consistent 
              perceived brightness. No more "why does this yellow look weird?"
            </p>
          </div>
          
          <div class="vbox gap(md) text(center)">
            <div class="w(80px) h(80px) bg(purple-100) r(full) vbox(pack) mx(auto) mb(md)">
              <span class="font(2xl)">🎼</span>
            </div>
            <h4 class="600 font(lg) c(gray-800)">Visual Rhythm</h4>
            <p class="font(sm) c(gray-600)">
              Components maintain consistent visual weight and rhythm. 
              Like music theory, but for your eyes.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Real Examples -->
    <div class="vbox gap(xl)">
      <h3 class="700 font(2xl) c(gray-800) text(center)">Components That Just Work™</h3>
      
      <div class="grid grid-cols(1) md:grid-cols(2) lg:grid-cols(3) gap(lg)">
        <!-- Form Example -->
        <div class="card() p(lg)">
          <h4 class="heading(h4) mb(md)">Simple Form</h4>
          <form class="vbox gap(md)">
            <input type="text" class="input()" placeholder="Your name" />
            <input type="email" class="input()" placeholder="Email" />
            <textarea class="input() min-h(100px)" placeholder="Message"></textarea>
            <button class="btn(primary) w(full)">Send Message</button>
          </form>
          <p class="font(xs) c(gray-500) mt(md) text(center)">
            Zero design decisions. Still beautiful.
          </p>
        </div>
        
        <!-- Notification Examples -->
        <div class="card() p(lg) vbox gap(md)">
          <h4 class="heading(h4) mb(md)">Notifications</h4>
          <div class="alert(success)">
            ✓ Payment successful
          </div>
          <div class="alert(warning)">
            ⚠ Low storage space
          </div>
          <div class="alert(error)">
            ✗ Connection failed
          </div>
          <div class="alert(info)">
            ℹ New update available
          </div>
          <p class="font(xs) c(gray-500) mt(md) text(center)">
            Consistent. Clear. Automatic.
          </p>
        </div>
        
        <!-- Badge & Tag Examples -->
        <div class="card() p(lg)">
          <h4 class="heading(h4) mb(md)">Status & Labels</h4>
          <div class="hbox gap(sm) flex-wrap mb(md)">
            <span class="badge()">Default</span>
            <span class="badge(primary)">Primary</span>
            <span class="badge(success)">Active</span>
            <span class="badge(warning)">Pending</span>
            <span class="badge(error)">Failed</span>
          </div>
          <div class="hbox gap(sm) flex-wrap">
            <span class="tag()">React</span>
            <span class="tag(purple)">Design</span>
            <span class="tag(green)">API</span>
            <span class="tag(orange)">Beta</span>
          </div>
          <p class="font(xs) c(gray-500) mt(md) text(center)">
            Every color works with every other color.
          </p>
        </div>
      </div>
    </div>

    <!-- The Bottom Line -->
    <div class="vbox(center) text(center) gap(lg) pt(xl)">
      <div class="card(gradient) p(xl) container(4xl)">
        <h3 class="700 font(2xl) c(white) mb(lg)">The Bottom Line</h3>
        <p class="font(lg) c(white.9) leading(1.7) mb(lg)">
          <strong class="c(white)">Good design isn't about talent. It's about systems.</strong> 
          When the system is smart enough, anyone can create beautiful interfaces. 
          That's not dumbing down design—that's democratizing it.
        </p>
        <p class="font(md) c(white.8)">
          Just like calculators didn't make us worse at math, 
          they freed us to solve bigger problems.
        </p>
      </div>
    </div>
    
  </div>
</section>