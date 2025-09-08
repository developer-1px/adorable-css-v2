<script lang="ts">
  // Import AdorableCSS components
  import { 
    btnString, 
    badgeString, 
    cardString, 
    headingString, 
    inputString, 
    textareaString,
  } from 'adorable-css';
</script>

<div class="min-h(screen) bg(gray-50)">
  <!-- Header -->
  <header class="pt(4xl) pb(2xl) px(2xl) bg(white) bb(1/gray-200)">
    <div class="max-w(full)">
      <h1 class="display(lg) text(center) mb(lg)">
        Component Showcase
      </h1>
      <p class="text(xl) text(center) c(gray-600) max-w(4xl) mx(auto)">
        Explore all component variants and combinations
      </p>
    </div>
  </header>
  
  <!-- Main Content -->
  <main class="py(4xl)">
    <div class="max-w(full) px(2xl)">
      <div class="vbox gap(6xl)">
        
        <!-- Button Component -->
        <section class="vbox gap(2xl)">
          <h2 class="heading(h1) c(gray-900)">Buttons</h2>
          <div class="hbox gap(lg) flex-wrap">
            <button class={btnString()}>Default Button</button>
            <button class={btnString('primary')}>Primary Button</button>
            <button class={btnString('secondary')}>Secondary Button</button>
            <button class={btnString('danger')}>Danger Button</button>
            <button class={btnString('success')}>Success Button</button>
          </div>
          <div class="hbox gap(lg) flex-wrap">
            <button class={btnString('primary/sm')}>Small</button>
            <button class={btnString('primary')}>Medium</button>
            <button class={btnString('primary/lg')}>Large</button>
            <button class={btnString('primary/xl')}>Extra Large</button>
          </div>
        </section>
        
        <!-- Badge Component -->
        <section class="vbox gap(2xl)">
          <h2 class="heading(h1) c(gray-900)">Badges</h2>
          <div class="hbox gap(lg) flex-wrap">
            <span class={badgeString()}>Default</span>
            <span class={badgeString('primary')}>Primary</span>
            <span class={badgeString('secondary')}>Secondary</span>
            <span class={badgeString('success')}>Success</span>
            <span class={badgeString('warning')}>Warning</span>
            <span class={badgeString('danger')}>Danger</span>
          </div>
          <div class="hbox gap(lg) flex-wrap">
            <span class={badgeString('primary/sm')}>Small</span>
            <span class={badgeString('primary')}>Medium</span>
            <span class={badgeString('primary/lg')}>Large</span>
          </div>
        </section>
        
        <!-- Card Component -->
        <section class="vbox gap(2xl)">
          <h2 class="heading(h1) c(gray-900)">Cards</h2>
          <div class="grid(3) gap(xl)">
            <div class={cardString()}>
              <h3 class="heading(h3) mb(md)">Default Card</h3>
              <p class="body(md) c(gray-600)">This is a default card with some example content.</p>
            </div>
            <div class={cardString('elevated')}>
              <h3 class="heading(h3) mb(md)">Elevated Card</h3>
              <p class="body(md) c(gray-600)">This card has elevated shadow for more prominence.</p>
            </div>
            <div class={cardString('bordered')}>
              <h3 class="heading(h3) mb(md)">Bordered Card</h3>
              <p class="body(md) c(gray-600)">This card uses a border instead of shadow.</p>
            </div>
          </div>
        </section>
        
        <!-- Heading Component -->
        <section class="vbox gap(2xl)">
          <h2 class="heading(h1) c(gray-900)">Headings</h2>
          <div class="vbox gap(lg)">
            <h1 class={headingString('hero')}>Hero Heading</h1>
            <h1 class={headingString('display')}>Display Heading</h1>
            <h1 class={headingString('h1')}>Heading 1</h1>
            <h2 class={headingString('h2')}>Heading 2</h2>
            <h3 class={headingString('h3')}>Heading 3</h3>
            <h4 class={headingString('h4')}>Heading 4</h4>
            <h5 class={headingString('h5')}>Heading 5</h5>
            <h6 class={headingString('h6')}>Heading 6</h6>
          </div>
        </section>
        
        <!-- Input Component -->
        <section class="vbox gap(2xl)">
          <h2 class="heading(h1) c(gray-900)">Inputs</h2>
          <div class="vbox gap(lg) max-w(xl)">
            <input class={inputString()} placeholder="Default input" />
            <input class={inputString('primary')} placeholder="Primary input" />
            <input class={inputString('error')} placeholder="Error state" />
            <input class={inputString('success')} placeholder="Success state" />
          </div>
          <div class="vbox gap(lg) max-w(xl)">
            <input class={inputString('sm')} placeholder="Small input" />
            <input class={inputString()} placeholder="Medium input" />
            <input class={inputString('lg')} placeholder="Large input" />
          </div>
        </section>
        
        <!-- Textarea Component -->
        <section class="vbox gap(2xl)">
          <h2 class="heading(h1) c(gray-900)">Textareas</h2>
          <div class="vbox gap(lg) max-w(xl)">
            <textarea class={textareaString()} placeholder="Default textarea" rows="3"></textarea>
            <textarea class={textareaString('primary')} placeholder="Primary textarea" rows="3"></textarea>
            <textarea class={textareaString('error')} placeholder="Error state" rows="3"></textarea>
          </div>
        </section>
        
      </div>
    </div>
  </main>
</div>