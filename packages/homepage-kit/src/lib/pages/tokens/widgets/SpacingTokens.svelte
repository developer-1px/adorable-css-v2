<script lang="ts">
  import { defaultTokens } from 'adorable-css';
</script>

<div class="spacing-tokens">
  <!-- Spacing Scale -->
  <div class="section-card bg(white.9) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100) mb(2xl)">
    <h3 class="700 font(xl) c(gray-900) mb(lg)">Spacing Scale</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Consistent spacing system with practical increments</p>
    
    <div class="vbox gap(sm)">
      {#each Object.entries(defaultTokens.spacing) as [key, value]}
        <div class="spacing-row p(md) hover:bg(to-right/rgb(240,253,244)..transparent)) r(xl) transition group">
          <div class="hbox(middle) gap(lg)">
            <div class="token-label min-w(xl) text(right)">
              <code class="600 font(sm) c(135deg/#3b82f6..#8b5cf6)">p({key})</code>
              <div class="font(xs) c(gray-600) font-family(mono)">{value}</div>
            </div>
            <div class="spacing-visual flex(middle) gap(md)">
              <div class="h(2xl) bg(to-right/rgb(34,197,94)..rgb(20,184,166))) r(sm) shadow(sm) group-hover:shadow(md) transition" style="width: {value}"></div>
              <div class="p({key}) bg(to-br/rgb(220,252,231)..rgb(204,251,241))) b(1/green-300) r(lg) group-hover:shadow(md) transition">
                <div class="bg(to-br/rgb(34,197,94)..rgb(20,184,166))) w(2xl) h(lg) r(sm)"></div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Spacing Usage Examples -->
  <div class="section-card bg(white.9) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100) mb(2xl)">
    <h3 class="700 font(xl) c(gray-900) mb(lg)">Spacing Usage</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Common spacing patterns and combinations</p>
    
    <div class="grid grid-cols(2) md:grid-cols(3) gap(lg)">
      <div class="example-card p(xs) bg(to-br/rgb(220,252,231)..rgb(204,251,241))) r(xl) b(1/green-200) hover:shadow(lg) transition">
        <div class="bg(white.9) p(xs) r(lg) 600 font(sm) text(center) c(green-700) shadow(sm)">p(xs)</div>
      </div>
      <div class="example-card p(sm) bg(to-br/rgb(220,252,231)..rgb(204,251,241))) r(xl) b(1/green-200) hover:shadow(lg) transition">
        <div class="bg(white.9) p(sm) r(lg) 600 font(sm) text(center) c(green-700) shadow(sm)">p(sm)</div>
      </div>
      <div class="example-card p(md) bg(to-br/rgb(220,252,231)..rgb(204,251,241))) r(xl) b(1/green-200) hover:shadow(lg) transition">
        <div class="bg(white.9) p(md) r(lg) 600 font(sm) text(center) c(green-700) shadow(sm)">p(md)</div>
      </div>
      <div class="example-card p(lg) bg(to-br/rgb(220,252,231)..rgb(204,251,241))) r(xl) b(1/green-200) hover:shadow(lg) transition">
        <div class="bg(white.9) p(lg) r(lg) 600 font(sm) text(center) c(green-700) shadow(sm)">p(lg)</div>
      </div>
      <div class="example-card p(xl) bg(to-br/rgb(220,252,231)..rgb(204,251,241))) r(xl) b(1/green-200) hover:shadow(lg) transition">
        <div class="bg(white.9) p(xl) r(lg) 600 font(sm) text(center) c(green-700) shadow(sm)">p(xl)</div>
      </div>
      <div class="example-card p(2xl) bg(to-br/rgb(220,252,231)..rgb(204,251,241))) r(xl) b(1/green-200) hover:shadow(lg) transition">
        <div class="bg(white.9) p(2xl) r(lg) 600 font(sm) text(center) c(green-700) shadow(sm)">p(2xl)</div>
      </div>
    </div>
  </div>

  <!-- Size Tokens -->
  <div class="section-card bg(white.9) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100)">
    <h3 class="700 font(xl) c(gray-900) mb(lg)">Size Tokens</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Width and height tokens for consistent sizing</p>
    
    <div class="vbox gap(sm)">
      {#each Object.entries(defaultTokens.size) as [key, value]}
        <div class="size-row p(md) hover:bg(to-right/rgb(240,253,244)..transparent)) r(xl) transition group">
          <div class="hbox(middle) gap(lg)">
            <div class="token-label min-w(xl) text(right)">
              <code class="600 font(sm) c(135deg/#3b82f6..#8b5cf6)">w({key})</code>
              <div class="font(xs) c(gray-600) font-family(mono)">{value}</div>
            </div>
            <div class="size-visual flex(middle) gap(md)">
              <div class="w({key}) h({key}) bg(to-br/rgb(34,197,94)..rgb(20,184,166))) r(lg) shadow(md) hover:shadow(lg) transition"></div>
              <div class="font(xs) c(gray-600) font-family(mono)">h({key})</div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>