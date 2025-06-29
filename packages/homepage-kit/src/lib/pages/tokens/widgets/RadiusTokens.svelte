<script lang="ts">
  import { defaultTokens } from 'adorable-css';
</script>

<div class="radius-tokens">
  <!-- Border Radius Tokens -->
  <div class="section-card bg(white.9) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100) mb(2xl)">
    <h3 class="700 font(xl) c(gray-900) mb(lg)">Border Radius Tokens</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Consistent corner radius for UI elements</p>
    
    <div class="grid grid-cols(3) md:grid-cols(5) gap(lg)">
      {#each Object.entries(defaultTokens.radius) as [key, value]}
        <div class="radius-demo text(center) group">
          <div class="3200x3200 bg(to-br/rgb(251,146,60)..rgb(239,68,68)) r({key}) mx(auto) mb(md) shadow(lg) hover:shadow(2xl) hover:scale(1.1) transition"></div>
          <code class="600 font(sm) c(135deg/#3b82f6..#8b5cf6)">r({key})</code>
          <div class="font(xs) c(gray-600) font-family(mono)">{value}</div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Radius Usage Examples -->
  <div class="section-card bg(white.9) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100)">
    <h3 class="700 font(xl) c(gray-900) mb(lg)">Common Usage Patterns</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Border radius in different contexts</p>
    
    <div class="grid grid-cols(1) md:grid-cols(3) gap(lg)">
      <div class="usage-example">
        <div class="p(lg) bg(to-br/rgb(255,237,213)..rgb(254,226,226)) r(sm) b(1/orange-200) hover:shadow(lg) transition">
          <div class="600 font(md) mb(xs) c(gray-800)">Small Components</div>
          <div class="font(sm) c(gray-600)">Badges, tags, inputs</div>
          <div class="mt(md) hbox gap(sm)">
            <span class="px(sm) py(xs) bg(orange-500) c(white) r(sm) font(xs)">Badge</span>
            <span class="px(sm) py(xs) bg(red-500) c(white) r(sm) font(xs)">Tag</span>
          </div>
        </div>
      </div>
      <div class="usage-example">
        <div class="p(lg) bg(to-br/rgb(255,237,213)..rgb(254,226,226)) r(lg) b(1/orange-200) hover:shadow(lg) transition">
          <div class="600 font(md) mb(xs) c(gray-800)">Medium Components</div>
          <div class="font(sm) c(gray-600)">Cards, buttons, modals</div>
          <div class="mt(md)">
            <button class="px(lg) py(sm) bg(to-right/rgb(249,115,22)..rgb(239,68,68)) c(white) r(lg) font(sm) hover:shadow(md) transition">
              Button
            </button>
          </div>
        </div>
      </div>
      <div class="usage-example">
        <div class="p(lg) bg(to-br/rgb(255,237,213)..rgb(254,226,226)) r(2xl) b(1/orange-200) hover:shadow(lg) transition">
          <div class="600 font(md) mb(xs) c(gray-800)">Large Components</div>
          <div class="font(sm) c(gray-600)">Hero sections, containers</div>
          <div class="mt(md) p(md) bg(white.8) r(xl)">
            <div class="font(xs) c(gray-700)">Container example</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>