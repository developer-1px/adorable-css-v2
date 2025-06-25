<script lang="ts">
  import { defaultTokens } from 'adorable-css';
  import Badge from '../../../components/ui/Badge.svelte';
</script>

<div class="typography-tokens">
  <!-- Font Sizes -->
  <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100) mb(2xl)">
    <h3 class="font(xl) bold c(gray-900) mb(lg)">Font Sizes</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Modular type scale with consistent ratios</p>
    
    <div class="vbox gap(md)">
      {#each Object.entries(defaultTokens.font).slice(0,6) as [key, value]}
        <div class="token-row p(md) bg(linear-gradient(to_right,rgb(249,250,251),transparent)) hover:bg(linear-gradient(to_right,rgb(239,246,255),transparent)) r(xl) transition group">
          <div class="hbox(middle) gap(md)">
            <div class="token-info min-w(3xl)">
              <code class="font(sm) font(semibold)" style="background: linear-gradient(135deg,#3b82f6,#8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                font({key})
              </code>
              <div class="font(xs) c(gray-600) mt(xs) font-family(mono)">{value}</div>
            </div>
            <div class="token-preview flex(middle) group-hover:scale(1.02) transition">
              <span class="font({key}) c(gray-800)">The quick brown fox jumps</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Line Heights -->
  <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100) mb(2xl)">
    <h3 class="font(xl) bold c(gray-900) mb(lg)">Line Heights</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Consistent vertical rhythm for readability</p>
    
    <div class="grid grid-cols(1) md:grid-cols(2) gap(md)">
      {#each Object.entries(defaultTokens.lineHeight) as [key, value]}
        <div class="token-item p(md) bg(linear-gradient(to_bottom_right,rgb(250,245,255),rgb(253,242,248))) r(xl) b(1/purple-100) hover:shadow(lg) transition group">
          <div class="hbox(middle) gap(sm) mb(sm)">
            <code class="font(sm) font(semibold)" style="background: linear-gradient(135deg,#3b82f6,#8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">line-height({key})</code>
            <span class="px(sm) py(xs) bg(white/80) r(full) font(xs) c(purple-700) b(1/purple-200)">{value}</span>
          </div>
          <p class="font(sm) c(gray-700) group-hover:c(gray-900) transition" style="line-height: {value}">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/>
            Sed do eiusmod tempor incididunt ut labore.
          </p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Letter Spacing -->
  <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100) mb(2xl)">
    <h3 class="font(xl) bold c(gray-900) mb(lg)">Letter Spacing</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Fine-tune character spacing for optimal legibility</p>
    
    <div class="vbox gap(md)">
      {#each Object.entries(defaultTokens.letterSpacing) as [key, value]}
        <div class="token-row p(md)">
          <div class="hbox(middle) gap(md) mb(sm)">
            <code class="font(sm) font(semibold)" style="background: linear-gradient(135deg,#3b82f6,#8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">letter-spacing({key})</code>
            <span class="px(sm) py(xs) bg(white/80) r(full) font(xs) c(orange-700) b(1/orange-200)">{value}</span>
          </div>
          <p class="font(lg) c(gray-800) group-hover:scale(1.02) transition transform-origin(left)" style="letter-spacing: {value}">
            TYPOGRAPHY IS THE ART OF ARRANGING TYPE
          </p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Font Weights -->
  <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100)">
    <h3 class="font(xl) bold c(gray-900) mb(lg)">Font Weights</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Complete weight scale from thin to black</p>
    
    <div class="grid grid-cols(3) md:grid-cols(5) gap(md)">
      {#each Object.entries(defaultTokens.fontWeight) as [key, value], i}
        <div class="token-item p(md) bg(linear-gradient(to_bottom_right,rgb(239,246,255),rgb(236,254,255))) r(xl) text(center) b(1/blue-100) hover:shadow(lg) hover:scale(1.05) transition group">
          <div class="font(3xl) mb(sm) group-hover:scale(1.02) transition" style="background: linear-gradient(135deg,#3b82f6,#8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: {value}">Aa</div>
          <code class="font(sm) font(semibold) c(blue-700)">{key}</code>
          <div class="font(xs) c(gray-600) font-family(mono)">{value}</div>
        </div>
      {/each}
    </div>
  </div>
</div>