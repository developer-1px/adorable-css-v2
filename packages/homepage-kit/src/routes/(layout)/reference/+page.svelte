<script>
  let activeSection = 'core';
</script>

<div class="hbox w(full) min-h(screen) bg(gray-50)">
  
  <!-- Sidebar -->
  <aside class="w(240) fixed h(screen) overflow-y(auto) border-r(1/gray-200) bg(white) p(6) vbox gap(8)">
    <div class="vbox gap(4)">
      <h3 class="font(caption) c(gray-500) bold(600) uppercase tracking(wider)">Core</h3>
      <a href="#core" class="p(2) c(gray-900) hover:c(indigo-600) transition">Concepts</a>
    </div>

    <div class="vbox gap(4) mt(6)">
      <h3 class="font(caption) c(gray-500) bold(600) uppercase tracking(wider)">Layout</h3>
      <a href="#hbox" class="p(2) c(gray-900) hover:c(indigo-600) transition">HBox / VBox</a>
      <a href="#grid" class="p(2) c(gray-900) hover:c(indigo-600) transition">Grid</a>
    </div>

    <div class="vbox gap(4) mt(6)">
      <h3 class="font(caption) c(gray-500) bold(600) uppercase tracking(wider)">Spacing</h3>
      <a href="#spacing" class="p(2) c(gray-900) hover:c(indigo-600) transition">Padding & Margin</a>
      <a href="#gap" class="p(2) c(gray-900) hover:c(indigo-600) transition">Gap</a>
    </div>

    <div class="vbox gap(4) mt(6)">
      <h3 class="font(caption) c(gray-500) bold(600) uppercase tracking(wider)">Visual</h3>
      <a href="#color" class="p(2) c(gray-900) hover:c(indigo-600) transition">Color & Background</a>
      <a href="#radius" class="p(2) c(gray-900) hover:c(indigo-600) transition">Radius</a>
      <a href="#effects" class="p(2) c(gray-900) hover:c(indigo-600) transition">Shadow & Effects</a>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="ml(240) flex(1) p(12) max-w(1000px)">
    <div class="vbox gap(16)">
      
      <!-- Intro -->
      <section id="core" class="vbox gap(4) pb(12) border-b(1/gray-200)">
        <h1 class="font(display-lg) bold(900)">Reference</h1>
        <p class="font(body-lg) c(gray-600)">The complete API reference for AdorableCSS.</p>
      </section>

      <!-- Layout -->
      <section id="hbox" class="vbox gap(6) mt(8) py(8)">
        <h2 class="font(heading-lg)">Layout Primitives</h2>
        <div class="vbox gap(4)">
          <div class="vbox gap(2)">
            <code class="font(mono) c(indigo-600) text(lg) bg(indigo-50) w(fit) px(2) r(md)">hbox(alignment?)</code>
            <p class="c(gray-700)">Horizontal Flex container. Shortcut for `display: flex; flex-direction: row`.</p>
          </div>
          <div class="grid(2) gap(4)">
             <div class="p(6) bg(white) r(lg) shadow(sm) vbox gap(2)">
               <code class="text(sm) c(gray-500)">hbox(left)</code>
               <div class="hbox(left) gap(2) bg(gray-100) p(2) r(md) h(20)">
                 <div class="size(16) bg(indigo-500) r(full)"></div>
                 <div class="size(16) bg(indigo-500) r(full) opacity(50)"></div>
               </div>
             </div>
             <div class="p(6) bg(white) r(lg) shadow(sm) vbox gap(2)">
                <code class="text(sm) c(gray-500)">hbox(center)</code>
                <div class="hbox(center) gap(2) bg(gray-100) p(2) r(md) h(20)">
                  <div class="size(16) bg(indigo-500) r(full)"></div>
                  <div class="size(16) bg(indigo-500) r(full) opacity(50)"></div>
                </div>
              </div>
          </div>
        </div>
      </section>

      <!-- Spacing -->
      <section id="spacing" class="vbox gap(6) mt(8) py(8) border-t(1/gray-200)">
        <h2 class="font(heading-lg)">Spacing & Sizing</h2>
        <div class="vbox gap(4) p(6) bg(yellow-50) r(lg) border(1/yellow-200)">
          <h3 class="font(title-md) c(yellow-800)">Hybrid Unit System</h3>
          <p class="c(yellow-900)">
            <strong>Spacing</strong> (`p`, `m`, `gap`) uses <strong>4px grid units</strong>.<br>
            <strong>Sizing</strong> (`w`, `h`, `size`) uses <strong>physical pixels</strong>.
          </p>
        </div>
        
        <div class="grid(2) gap(8)">
          <div class="vbox gap(2)">
            <code class="font(mono) c(indigo-600) text(lg)">gap(4)</code>
            <p class="c(gray-600)">= 16px (4 * 4px)</p>
          </div>
          <div class="vbox gap(2)">
            <code class="font(mono) c(indigo-600) text(lg)">size(32)</code>
            <p class="c(gray-600)">= 32px (Physical)</p>
          </div>
        </div>
      </section>

    </div>
  </main>

</div>
