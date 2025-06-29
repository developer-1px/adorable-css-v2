<script lang="ts">
  const spacingScale = [
    { name: 'xs', value: '4px', multiplier: 1 },
    { name: 'sm', value: '8px', multiplier: 2 },
    { name: 'md', value: '12px', multiplier: 3 },
    { name: 'lg', value: '16px', multiplier: 4 },
    { name: 'xl', value: '20px', multiplier: 5 },
    { name: '2xl', value: '24px', multiplier: 6 },
    { name: '3xl', value: '32px', multiplier: 8 },
    { name: '4xl', value: '48px', multiplier: 12 },
    { name: '5xl', value: '64px', multiplier: 16 },
    { name: '6xl', value: '96px', multiplier: 24 }
  ];
  
  const spacingExamples = [
    { type: 'Padding', class: 'p(xl)', desc: 'Padding all sides' },
    { type: 'Margin', class: 'my(lg)', desc: 'Vertical margin' },
    { type: 'Gap', class: 'gap(md)', desc: 'Flexbox/Grid gap' },
    { type: 'Space', class: 'space-x(sm)', desc: 'Horizontal spacing between children' }
  ];
</script>

<section id="spacing" class="section()">
  <div class="container()">
    <h2 class="heading()">Spacing System</h2>
    <p class="prose()">
      Consistent spacing scale based on a 4px grid system for harmonious layouts.
    </p>
  </div>

  <!-- Spacing Scale Visual -->
  <div class="card() container()">
    <h3 class="heading()">Spacing Scale</h3>
    <div class="vbox() gap()">
      {#each spacingScale as space}
        <div class="hbox() gap()">
          <code class="prose() w(64px) text(right)">{space.name}</code>
          <div class="h(40px) bg(brand) r()" 
               style="width: {space.multiplier * 16}px">
          </div>
          <span class="prose()">{space.value}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Spacing Examples Grid -->
  <div class="container() grid(2) gap()">
    <!-- Padding Example -->
    <div class="card()">
      <h3 class="heading()">Padding</h3>
      <div class="vbox() gap()">
        <div class="bg(accent) p(xs) r()">
          <div class="bg(white) p() r()">
            <code class="prose()">p(xs)</code>
          </div>
        </div>
        <div class="bg(accent) p(md) r()">
          <div class="bg(white) p() r()">
            <code class="prose()">p(md)</code>
          </div>
        </div>
        <div class="bg(accent) p(xl) r()">
          <div class="bg(white) p() r()">
            <code class="prose()">p(xl)</code>
          </div>
        </div>
        <div class="bg(accent) px(2xl) py(md) r()">
          <div class="bg(white) p() r()">
            <code class="prose()">px(2xl) py(md)</code>
          </div>
        </div>
      </div>
    </div>

    <!-- Gap Example -->
    <div class="card()">
      <h3 class="heading()">Gap</h3>
      <div class="vbox() gap()">
        <div>
          <code class="prose() mb()">gap(sm)</code>
          <div class="hbox gap(sm)">
            <div class="48x48 bg(brand) r()"></div>
            <div class="48x48 bg(brand) r()"></div>
            <div class="48x48 bg(brand) r()"></div>
          </div>
        </div>
        <div>
          <code class="prose() mb()">gap(lg)</code>
          <div class="hbox gap(lg)">
            <div class="48x48 bg(brand) r()"></div>
            <div class="48x48 bg(brand) r()"></div>
            <div class="48x48 bg(brand) r()"></div>
          </div>
        </div>
        <div>
          <code class="prose() mb()">gap(2xl)</code>
          <div class="hbox gap(2xl)">
            <div class="48x48 bg(brand) r()"></div>
            <div class="48x48 bg(brand) r()"></div>
            <div class="48x48 bg(brand) r()"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Common Patterns -->
  <div class="card() container()">
    <h3 class="heading()">Common Spacing Patterns</h3>
    <div class="grid() gap()">
      <div class="card()">
        <h4 class="heading()">Card Spacing</h4>
        <code class="prose() mb()">p(xl)</code>
        <p class="prose()">Standard card padding for comfortable reading</p>
      </div>
      <div class="card()">
        <h4 class="heading()">Section Spacing</h4>
        <code class="prose() mb()">py(4xl)</code>
        <p class="prose()">Vertical rhythm between page sections</p>
      </div>
      <div class="card()">
        <h4 class="heading()">Component Gap</h4>
        <code class="prose() mb()">gap(lg)</code>
        <p class="prose()">Consistent spacing between elements</p>
      </div>
    </div>
  </div>
</section>