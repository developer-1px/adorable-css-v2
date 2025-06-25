<script lang="ts">
  import Code from '../Code.svelte';
  
  const layoutExamples = [
    {
      title: 'Auto Layout → CSS',
      desc: 'Figma Auto Layout maps directly to flexbox utilities',
      examples: [
        {
          figma: 'Auto Layout: Vertical, Gap: 16px',
          code: 'vbox gap(16)',
          preview: `
            <div class="vbox gap(16) p(xl) bg(gray-100) r(lg)">
              <div class="w(full) h(40px) bg(purple-400) r(md)"></div>
              <div class="w(full) h(40px) bg(purple-500) r(md)"></div>
              <div class="w(full) h(40px) bg(purple-600) r(md)"></div>
            </div>
          `
        },
        {
          figma: 'Auto Layout: Horizontal, Align: Center',
          code: 'hbox(middle) gap(12)',
          preview: `
            <div class="hbox(middle) gap(12) p(xl) bg(gray-100) r(lg)">
              <div class="w(60px) h(60px) bg(blue-400) r(md)"></div>
              <div class="w(80px) h(40px) bg(blue-500) r(md)"></div>
              <div class="w(50px) h(50px) bg(blue-600) r(md)"></div>
            </div>
          `
        }
      ]
    },
    {
      title: 'Constraints → Sizing',
      desc: 'Figma constraints translate to intuitive sizing utilities',
      examples: [
        {
          figma: 'Width: Fill container',
          code: 'w(fill)',
          preview: `
            <div class="w(300px) p(lg) bg(gray-100) r(lg)">
              <div class="w(fill) h(40px) bg(pink-400) r(md) vbox(pack) font(sm) c(white)">
                w(fill)
              </div>
            </div>
          `
        },
        {
          figma: 'Width: Hug contents',
          code: 'w(hug)',
          preview: `
            <div class="w(300px) p(lg) bg(gray-100) r(lg)">
              <div class="w(hug) px(lg) py(md) bg(teal-400) r(md) c(white) font(sm)">
                w(hug)
              </div>
            </div>
          `
        }
      ]
    }
  ];
</script>

<section class="layout-system w(fill) py(5xl) bg(gray-50)">
  <div class="container(xl)">
    <!-- Section Header -->
    <div class="text(center) mb(4xl)">
      <h2 class="font(5xl) bold c(gray-900) mb(lg)">
        Figma-Native Layout
      </h2>
      <p class="font(xl) c(gray-600) container(md/px:0)">
        Layout utilities that match exactly how you think in Figma
      </p>
    </div>
    
    <!-- Layout Examples -->
    <div class="vbox gap(4xl)">
      {#each layoutExamples as section}
        <div class="layout-section">
          <h3 class="font(3xl) bold c(gray-900) mb(lg)">{section.title}</h3>
          <p class="font(lg) c(gray-600) mb(2xl)">{section.desc}</p>
          
          <div class="grid grid-cols(2) gap(2xl)">
            {#each section.examples as example}
              <div class="example-card p(2xl) bg(white) r(xl) shadow(lg)">
                <div class="mb(lg)">
                  <div class="font(sm) c(gray-500) mb(sm)">Figma:</div>
                  <div class="font(md) c(gray-700) mb(lg)">{example.figma}</div>
                  
                  <div class="font(sm) c(gray-500) mb(sm)">AdorableCSS:</div>
                  <Code code={example.code} />
                </div>
                
                <div class="preview-box">
                  {@html example.preview}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Complex Layout Example -->
    <div class="complex-example mt(5xl) p(3xl) bg(white) r(2xl) shadow(xl)">
      <h3 class="font(2xl) bold c(gray-900) mb(2xl) text(center)">Real-World Layout</h3>
      
      <div class="hbox gap(2xl) mb(2xl)">
        <div class="flex(1)">
          <h4 class="font(lg) bold c(gray-700) mb(lg)">Card Layout</h4>
          <Code code={`<div class="
  vbox gap(lg) p(xl)
  bg(white) r(xl) shadow(lg)
  hover:shadow(2xl) transition
">
  <img class="w(fill) h(200px) object(cover) r(lg)">
  <h3 class="font(xl) bold">Card Title</h3>
  <p class="c(gray-600)">Description text</p>
  <button class="w(fill) py(md) bg(primary) c(white) r(lg)">
    Action
  </button>
</div>`} />
        </div>
        
        <div class="flex(1)">
          <h4 class="font(lg) bold c(gray-700) mb(lg)">Preview</h4>
          <div class="vbox gap(lg) p(xl) bg(white) r(xl) shadow(lg) hover:shadow(2xl) transition">
            <div class="w(fill) h(200px) bg(gradient-to-br/purple-400/pink-400) r(lg)"></div>
            <h3 class="font(xl) bold c(gray-900)">Card Title</h3>
            <p class="c(gray-600)">Beautiful card component with hover effects</p>
            <button class="w(fill) py(md) bg(purple-500) c(white) r(lg) hover:bg(purple-600) transition">
              Action Button
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .example-card {
    transition: all 0.3s ease;
  }
  
  .example-card:hover {
    transform: translateY(-2px);
  }
  
  :global(.preview-box > div) {
    margin-top: 1rem;
  }
</style>