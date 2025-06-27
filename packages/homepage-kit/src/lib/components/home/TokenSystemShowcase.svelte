<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
</script>

<section class="section(feature) bg(white)">
  <div class="contain(wide)">
    
    <!-- The Universal Language -->
    <div class="content(centered)">
      <h2 class="900 font(4xl) c(gray-900)">
        One Language.
        <span class="block bg(135deg/#8b5cf6..#ec4899)" style="-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
          Everywhere.
        </span>
      </h2>
      <p class="lead() flow()">
        Imagine if <code class="bg(purple-100) px(sm) r(sm)">lg</code> meant the same thing 
        whether it's padding, margin, font size, border radius, or shadow. 
        <strong class="c(gray-900)">Now stop imagining. That's AdorableCSS.</strong>
      </p>
    </div>

    <!-- The Token Matrix -->
    <div class="card(elevated) p(xl) overflow-x(auto)">
      <h3 class="700 font(2xl) c(gray-800) mb(xl) text(center)">🎯 The Universal Scale: Same Tokens, Every Context</h3>
      
      <div class="overflow-x(auto)">
        <table class="w(full) min-w(800px)">
          <thead>
            <tr class="border-b(gray-200)">
              <th class="text(left) p(md) font(sm) c(gray-500)">Token</th>
              <th class="text(left) p(md) font(sm) c(gray-600)">Spacing</th>
              <th class="text(left) p(md) font(sm) c(gray-600)">Font Size</th>
              <th class="text(left) p(md) font(sm) c(gray-600)">Border Radius</th>
              <th class="text(left) p(md) font(sm) c(gray-600)">Shadow</th>
              <th class="text(left) p(md) font(sm) c(gray-600)">Gap</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b(gray-100) hover:bg(purple-50) transition">
              <td class="p(md) 700 c(purple-600)">xs</td>
              <td class="p(md)"><div class="inline-block px(xs) bg(purple-200)">4px (base)</div></td>
              <td class="p(md) font(xs)">12px text</td>
              <td class="p(md)"><div class="inline-block w(30px) h(30px) r(xs) bg(purple-200)"></div></td>
              <td class="p(md)"><div class="inline-block p(sm) r(sm) bg(white) shadow(xs)">subtle</div></td>
              <td class="p(md)"><div class="hbox gap(xs)"><div class="w(20px) h(20px) bg(purple-200) r(xs)"></div><div class="w(20px) h(20px) bg(purple-200) r(xs)"></div></div></td>
            </tr>
            <tr class="border-b(gray-100) hover:bg(purple-50) transition">
              <td class="p(md) 700 c(purple-600)">sm</td>
              <td class="p(md)"><div class="inline-block px(sm) bg(purple-300)">8px</div></td>
              <td class="p(md) font(sm)">14px text</td>
              <td class="p(md)"><div class="inline-block w(30px) h(30px) r(sm) bg(purple-300)"></div></td>
              <td class="p(md)"><div class="inline-block p(sm) r(sm) bg(white) shadow(sm)">soft</div></td>
              <td class="p(md)"><div class="hbox gap(sm)"><div class="w(20px) h(20px) bg(purple-300) r(xs)"></div><div class="w(20px) h(20px) bg(purple-300) r(xs)"></div></div></td>
            </tr>
            <tr class="border-b(gray-100) hover:bg(purple-50) transition">
              <td class="p(md) 700 c(purple-600)">md</td>
              <td class="p(md)"><div class="inline-block px(md) bg(purple-400)">12px</div></td>
              <td class="p(md) font(md)">16px text</td>
              <td class="p(md)"><div class="inline-block w(30px) h(30px) r(md) bg(purple-400)"></div></td>
              <td class="p(md)"><div class="inline-block p(sm) r(sm) bg(white) shadow(md)">normal</div></td>
              <td class="p(md)"><div class="hbox gap(md)"><div class="w(20px) h(20px) bg(purple-400) r(xs)"></div><div class="w(20px) h(20px) bg(purple-400) r(xs)"></div></div></td>
            </tr>
            <tr class="border-b(gray-100) hover:bg(purple-50) transition">
              <td class="p(md) 700 c(purple-600)">lg</td>
              <td class="p(md)"><div class="inline-block px(lg) bg(purple-500)">16px</div></td>
              <td class="p(md) font(lg)">20px text</td>
              <td class="p(md)"><div class="inline-block w(30px) h(30px) r(lg) bg(purple-500)"></div></td>
              <td class="p(md)"><div class="inline-block p(sm) r(sm) bg(white) shadow(lg)">elevated</div></td>
              <td class="p(md)"><div class="hbox gap(lg)"><div class="w(20px) h(20px) bg(purple-500) r(xs)"></div><div class="w(20px) h(20px) bg(purple-500) r(xs)"></div></div></td>
            </tr>
            <tr class="border-b(gray-100) hover:bg(purple-50) transition">
              <td class="p(md) 700 c(purple-600)">xl</td>
              <td class="p(md)"><div class="inline-block px(xl) bg(purple-600)">20px</div></td>
              <td class="p(md) font(xl)">24px text</td>
              <td class="p(md)"><div class="inline-block w(30px) h(30px) r(xl) bg(purple-600)"></div></td>
              <td class="p(md)"><div class="inline-block p(sm) r(sm) bg(white) shadow(xl)">floating</div></td>
              <td class="p(md)"><div class="hbox gap(xl)"><div class="w(20px) h(20px) bg(purple-600) r(xs)"></div><div class="w(20px) h(20px) bg(purple-600) r(xs)"></div></div></td>
            </tr>
            <tr class="hover:bg(purple-50) transition">
              <td class="p(md) 700 c(purple-600)">2xl</td>
              <td class="p(md)"><div class="inline-block px(2xl) bg(purple-700)">24px</div></td>
              <td class="p(md) font(2xl)">32px text</td>
              <td class="p(md)"><div class="inline-block w(30px) h(30px) r(2xl) bg(purple-700)"></div></td>
              <td class="p(md)"><div class="inline-block p(sm) r(sm) bg(white) shadow(2xl)">dramatic</div></td>
              <td class="p(md)"><div class="hbox gap(2xl)"><div class="w(20px) h(20px) bg(purple-700) r(xs)"></div><div class="w(20px) h(20px) bg(purple-700) r(xs)"></div></div></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="card(flat) mt(xl) p(lg) text(center) bg(purple-50)">
        <p class="font(md) c(purple-700)">
          <strong>The same mental model everywhere.</strong> 
          Once you learn that <code class="bg(purple-200) px(sm) r(sm)">lg</code> means "comfortably spaced", 
          it means that for padding, margins, gaps, radii—everything.
        </p>
      </div>
    </div>

    <!-- Real Code Examples -->
    <div class="grid grid-cols(1) md:grid-cols(2) gap(xl)">
      <div class="card() p(xl)">
        <h4 class="600 font(xl) c(gray-800) mb(lg)">🎪 The Chaos of Traditional CSS</h4>
        <div class="bg(gray-50) p(lg) r(md) font(sm/1.6) font-family(mono) mb(lg)">
          <div class="c(gray-600)">/* Different scales everywhere */</div>
          <div>padding: 1rem; /* What scale? */</div>
          <div>font-size: 18px; /* Random number */</div>
          <div>border-radius: 12px; /* Another random */</div>
          <div>gap: 24px; /* No relationship */</div>
          <div>box-shadow: /* 🤯 Don't ask */</div>
        </div>
        <p class="font(sm) c(gray-600)">
          Every property has its own scale. Nothing relates to anything. 
          You're juggling 5 different measurement systems in your head.
        </p>
      </div>
      
      <div class="card() p(xl)">
        <h4 class="600 font(xl) c(gray-800) mb(lg)">✨ The Harmony of Token System</h4>
        <div class="bg(purple-50) p(lg) r(md) font(sm/1.6) font-family(mono) mb(lg)">
          <div class="c(purple-600)">/* One scale to rule them all */</div>
          <div>p(lg)       /* Large padding */</div>
          <div>font(lg)    /* Large font */</div>
          <div>r(lg)       /* Large radius */</div>
          <div>gap(lg)     /* Large gap */</div>
          <div>shadow(lg)  /* Large shadow */</div>
        </div>
        <p class="font(sm) c(gray-600)">
          One mental model. <code class="bg(purple-100) px(sm) r(sm)">lg</code> means "large" everywhere. 
          Your brain can focus on design, not memorizing arbitrary values.
        </p>
      </div>
    </div>

    <!-- The Power of Consistency -->
    <div class="vbox gap(xl) pt(xl)">
      <h3 class="700 font(2xl) c(gray-800) text(center)">🎼 Design Systems in 30 Seconds</h3>
      
      <div class="grid grid-cols(1) md:grid-cols(3) gap(lg)">
        <!-- Step 1 -->
        <div class="card(elevated) p(lg) text(center)">
          <div class="900 font(4xl) c(purple-600) mb(md)">1</div>
          <h4 class="600 font(lg) c(gray-800) mb(sm)">Define Your Tokens</h4>
          <div class="bg(gray-50) p(md) r(md) font(xs/1.5) font-family(mono) text(left) mb(md)">
            <div>:root {'{'}</div>
            <div class="pl(md)">--spacing-lg: 1.5rem;</div>
            <div class="pl(md)">--font-lg: 1.25rem;</div>
            <div class="pl(md)">--radius-lg: 0.75rem;</div>
            <div>{'}'}</div>
          </div>
          <p class="font(sm) c(gray-600)">
            Override any token. The relationships stay perfect.
          </p>
        </div>
        
        <!-- Step 2 -->
        <div class="card(elevated) p(lg) text(center)">
          <div class="900 font(4xl) c(purple-600) mb(md)">2</div>
          <h4 class="600 font(lg) c(gray-800) mb(sm)">Use Everywhere</h4>
          <div class="vbox gap(sm) mb(md)">
            <div class="p(lg) bg(purple-100) r(lg) font(sm)">p(lg)</div>
            <div class="hbox gap(lg)">
              <div class="w(40px) h(40px) bg(purple-200) r(lg)"></div>
              <div class="w(40px) h(40px) bg(purple-300) r(lg)"></div>
            </div>
            <button class="btn() px(lg) font(lg)">Button lg</button>
          </div>
          <p class="font(sm) c(gray-600)">
            Same token, perfect harmony across all properties.
          </p>
        </div>
        
        <!-- Step 3 -->
        <div class="card(elevated) p(lg) text(center)">
          <div class="900 font(4xl) c(purple-600) mb(md)">3</div>
          <h4 class="600 font(lg) c(gray-800) mb(sm)">Scale Infinitely</h4>
          <div class="vbox gap(sm) mb(md)">
            <div class="hbox gap(xs) text(xs)">
              <span class="px(xs) py(xs) bg(green-100) r(xs)">xs</span>
              <span class="px(sm) py(xs) bg(green-200) r(sm)">sm</span>
              <span class="px(md) py(xs) bg(green-300) r(md)">md</span>
              <span class="px(lg) py(xs) bg(green-400) r(lg)">lg</span>
              <span class="px(xl) py(xs) bg(green-500) r(xl)">xl</span>
            </div>
          </div>
          <p class="font(sm) c(gray-600)">
            Add your own tokens. The system adapts automatically.
          </p>
        </div>
      </div>
    </div>

    <!-- The Paradigm Shift -->
    <div class="vbox(center) text(center) gap(lg) pt(xl)">
      <div class="card() p(xl) container(5xl) bg(gradient-to-br/purple-50..pink-50)">
        <h3 class="700 font(2xl) c(gray-800) mb(lg)">💡 The Paradigm Shift</h3>
        <p class="font(lg) c(gray-700) leading(1.7) mb(lg)">
          Traditional CSS frameworks give you components.<br/>
          <strong class="c(gray-900)">AdorableCSS gives you a design language.</strong>
        </p>
        <p class="font(md) c(gray-600) mb(xl)">
          When <code class="bg(purple-100) px(sm) r(sm)">lg</code> means "large" everywhere, 
          your entire team speaks the same language. Designers say "use large spacing". 
          Developers write <code class="bg(purple-100) px(sm) r(sm)">gap(lg)</code>. 
          It just works.
        </p>
        
        <div class="hbox(pack) gap(sm) flex-wrap">
          <div class="card(flat) px(lg) py(md)">
            <span class="700 font(2xl) c(purple-600)">1</span>
            <span class="font(sm) c(gray-600) ml(sm)">Token System</span>
          </div>
          <ArrowRight class="c(gray-400)" size="20" />
          <div class="card(flat) px(lg) py(md)">
            <span class="700 font(2xl) c(purple-600)">∞</span>
            <span class="font(sm) c(gray-600) ml(sm)">Design Systems</span>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</section>