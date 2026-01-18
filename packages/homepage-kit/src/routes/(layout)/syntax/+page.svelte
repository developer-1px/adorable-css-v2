<script>
  import Container from '$lib/components/ui/Container.svelte';
  // Simple syntax documentation page
  // Focuses on the core grammar of AdorableCSS
</script>

<div class="min-h-screen bg(white)">
  <!-- Hero -->
  <div class="border-b(1/gray-100) bg(gray-50/50)">
    <Container size="lg">
      <div class="py(4xl)">
        <div class="vbox gap(md)">
          <h1 class="text(3xl) font(bold) tracking(tight) c(gray-900)">
            Syntax Guide
          </h1>
          <p class="text(lg) c(gray-500) max-w(600px)">
            AdorableCSS uses a unified, functional syntax. Learn the few rules you need to express any style.
          </p>
        </div>
      </div>
    </Container>
  </div>

  <Container size="lg">
    <div class="py(4xl)">
      <div class="vbox gap(5xl)">

      <!-- Section 1: The Functional Syntax -->
      <section class="vbox gap(lg)">
        <div class="vbox gap(xs)">
          <h2 class="text(xl) font(bold) c(gray-900)">1. The Functional Syntax</h2>
          <p class="c(gray-600)">Everything is a function call. No more guessing if it's a dash, underscore, or camelCase.</p>
        </div>

        <div class="grid(1) sm:grid(2) gap(md)">
          <div class="card p(lg) border(1/gray-200) bg(white) r(lg) vbox gap(sm)">
            <div class="text(sm) font(medium) c(gray-500) uppercase tracking(wider)">Structure</div>
            <code class="text(lg) font(mono) c(indigo-600)">rule(value)</code>
            <div class="c(gray-600) text(sm)">
              <div class="hbox gap(xs) items(center)">
                <span class="w(6px) h(6px) r(full) bg(gray-300)"></span>
                <span><strong>rule</strong>: The property (e.g. `w`, `text`, `bg`)</span>
              </div>
              <div class="hbox gap(xs) items(center)">
                <span class="w(6px) h(6px) r(full) bg(gray-300)"></span>
                <span><strong>value</strong>: The argument (e.g. `100px`, `red`, `bold`)</span>
              </div>
            </div>
          </div>
          
           <div class="card p(lg) border(1/gray-200) bg(white) r(lg) vbox gap(sm)">
            <div class="text(sm) font(medium) c(gray-500) uppercase tracking(wider)">Examples</div>
            <div class="vbox gap(xs)">
              <div class="hbox gap(md)">
                <code class="font(mono) c(gray-900)">w(100px)</code>
                <span class="c(gray-400)">→</span>
                <code class="font(mono) c(gray-500)">width: 100px</code>
              </div>
              <div class="hbox gap(md)">
                <code class="font(mono) c(gray-900)">c(blue)</code>
                <span class="c(gray-400)">→</span>
                <code class="font(mono) c(gray-500)">color: blue</code>
              </div>
              <div class="hbox gap(md)">
                <code class="font(mono) c(gray-900)">grid(2)</code>
                <span class="c(gray-400)">→</span>
                <code class="font(mono) c(gray-500)">grid-template-columns: repeat(2, 1fr)</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Arguments & Delimiters -->
      <section class="vbox gap(lg)">
        <div class="vbox gap(xs)">
          <h2 class="text(xl) font(bold) c(gray-900)">2. Arguments & Composition</h2>
          <p class="c(gray-600)">Pass multiple values using the slash <code>/</code> separator. No spaces allowed inside.</p>
        </div>

        <div class="vbox border(1/gray-200) r(lg) overflow(hidden)">
          <table class="w(full)">
            <thead class="bg(gray-50) border-b(1/gray-200)">
              <tr>
                <th class="text(left) p(md) text(xs) font(medium) c(gray-500) uppercase tracking(wider)">Pattern</th>
                <th class="text(left) p(md) text(xs) font(medium) c(gray-500) uppercase tracking(wider)">Usage</th>
                <th class="text(left) p(md) text(xs) font(medium) c(gray-500) uppercase tracking(wider)">Example</th>
              </tr>
            </thead>
            <tbody class="divide-y(gray-100)">
              <tr>
                <td class="p(md)"><code class="bg(gray-100) px(xs) r(sm)">/</code> Slash</td>
                <td class="p(md) c(gray-600)">Separate multiple arguments</td>
                <td class="p(md)"><code class="c(indigo-600)">text(xl/1.5)</code> <span class="c(gray-400) text(xs)">(size/leading)</span></td>
              </tr>
              <tr>
                <td class="p(md)"><code class="bg(gray-100) px(xs) r(sm)">.</code> Dot</td>
                <td class="p(md) c(gray-600)">Opacity modifier</td>
                <td class="p(md)"><code class="c(indigo-600)">bg(red.5)</code> <span class="c(gray-400) text(xs)">(50% opacity)</span></td>
              </tr>
              <tr>
                <td class="p(md)"><code class="bg(gray-100) px(xs) r(sm)">+</code> Plus</td>
                <td class="p(md) c(gray-600)">Combine keywords</td>
                <td class="p(md)"><code class="c(indigo-600)">hbox(top+center)</code></td>
              </tr>
               <tr>
                <td class="p(md)"><code class="bg(gray-100) px(xs) r(sm)">-</code> Minus</td>
                <td class="p(md) c(gray-600)">Negative numbers</td>
                <td class="p(md)"><code class="c(indigo-600)">m(-20px)</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section 3: Modifiers -->
      <section class="vbox gap(lg)">
         <div class="vbox gap(xs)">
          <h2 class="text(xl) font(bold) c(gray-900)">3. Modifiers (States & Responsive)</h2>
          <p class="c(gray-600)">Chain modifiers with a colon <code>:</code>. Order doesn't matter, but convention is <code>breakpoint:state:rule</code>.</p>
        </div>

        <div class="grid(1) sm:grid(3) gap(md)">
          <div class="vbox gap(sm)">
            <h3 class="font(medium) c(gray-900)">States</h3>
            <ul class="vbox gap(xs) c(gray-600) text(sm)">
              <li><code class="c(purple-600)">hover:</code>bg(red)</li>
              <li><code class="c(purple-600)">focus:</code>ring(2)</li>
              <li><code class="c(purple-600)">active:</code>scale(0.9)</li>
              <li><code class="c(purple-600)">disabled:</code>opacity(0.5)</li>
            </ul>
          </div>
          
          <div class="vbox gap(sm)">
             <h3 class="font(medium) c(gray-900)">Breakpoints</h3>
             <ul class="vbox gap(xs) c(gray-600) text(sm)">
              <li><code class="c(purple-600)">sm:</code>w(full)</li>
              <li><code class="c(purple-600)">md:</code>hbox</li>
              <li><code class="c(purple-600)">lg:</code>p(xl)</li>
              <li><code class="c(purple-600)">..md:</code>hidden <span class="c(gray-400)">(max-width)</span></li>
            </ul>
          </div>

          <div class="vbox gap(sm)">
             <h3 class="font(medium) c(gray-900)">Advanced</h3>
             <ul class="vbox gap(xs) c(gray-600) text(sm)">
              <li><code class="c(purple-600)">dark:</code>c(white)</li>
              <li><code class="c(purple-600)">search:</code>w(full) <span class="c(gray-400)">(container query)</span></li>
              <li><code class="c(purple-600)">!</code>important (at end)</li>
              <li><code class="c(purple-600)">@print:</code>hidden</li>
            </ul>
          </div>
        </div>
      </section>

      </div>
    </div>
  </Container>
</div>