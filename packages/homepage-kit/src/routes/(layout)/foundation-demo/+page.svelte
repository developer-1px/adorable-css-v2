<script lang="ts">
  // Foundation만 사용한 실제 디자인 예제
  
  const features = [
    {
      title: "Type Scale",
      description: "Mathematical progression ensures consistent visual hierarchy across all content types.",
      status: "Complete"
    },
    {
      title: "Color System", 
      description: "Semantic colors with accessibility-first approach and WCAG compliance.",
      status: "In Progress"
    },
    {
      title: "Spacing Grid",
      description: "Modular spacing system for consistent layouts and component composition.",
      status: "Planning"
    }
  ];

  const testimonials = [
    {
      quote: "The foundation system made our design process 3x faster and completely eliminated inconsistencies.",
      author: "Sarah Chen",
      role: "Design Lead",
      company: "TechCorp"
    },
    {
      quote: "Finally, a design system that developers actually want to use. The tokens are so clear.",
      author: "Marcus Rodriguez", 
      role: "Frontend Engineer",
      company: "StartupCo"
    }
  ];
</script>

<svelte:head>
  <title>Foundation Demo - Design with Foundation Only</title>
</svelte:head>

<!-- Foundation만 사용한 완전한 페이지 디자인 -->
<div class="min-h(screen) bg(white)">
  <!-- Hero Section - Typography + Spacing + Color Hierarchy 만 사용 -->
  <header class="vbox(center) py(9xl)">
    <div class="max-w(5xl) vbox gap(6xl) text(center)">
      <!-- Primary Heading - Display Typography -->
      <h1 class="display(4xl) font(black) tracking(tighter) c(black) leading(none)">
        DESIGN WITH<br>FOUNDATION
      </h1>
      
      <!-- Secondary Text - Text Hierarchy -->
      <p class="text(2xl) c(gray-600) max-w(3xl) leading(relaxed) font(light)">
        Build consistent, scalable interfaces using only typography, color, and spacing foundations
      </p>
      
      <!-- CTA Section - Using spacing and text hierarchy -->
      <div class="vbox gap(3xl)">
        <div class="px(4xl) py(2xl) bg(black) c(white) font(black) tracking(wider) uppercase text(lg)">
          GET STARTED
        </div>
        
        <div class="text(md) c(gray-500) font(medium) tracking(wide) uppercase">
          No custom components needed
        </div>
      </div>
    </div>
  </header>

  <!-- Features Section - Grid + Typography + Color -->
  <section class="vbox(center) py(9xl)">
    <div class="max-w(6xl) vbox gap(8xl)">
      <!-- Section Header -->
      <div class="text(center) vbox gap(3xl)">
        <h2 class="display(3xl) font(black) c(black) tracking(tight) leading(none)">
          FOUNDATION<br>ELEMENTS
        </h2>
        <p class="text(xl) c(gray-500) font(light) leading(relaxed) max-w(3xl)">
          Everything you need is already in the foundation
        </p>
      </div>
      
      <!-- Feature Grid - Using Spacing Grid -->
      <div class="vbox gap(8xl)">
        {#each features as feature, index}
          <div class="vbox gap(4xl) {index !== features.length - 1 ? 'pb(8xl)' : ''}">
            <!-- Status - Clean Typography -->
            <div class="text(center)">
              <div class="text(sm) font(black) uppercase tracking(widest) c(gray-400)">
                {String(index + 1).padStart(2, '0')} — {feature.status.toUpperCase()}
              </div>
            </div>
            
            <!-- Content - Text Hierarchy -->
            <div class="text(center) vbox gap(2xl)">
              <h3 class="display(2xl) font(black) c(black) tracking(tight)">
                {feature.title}
              </h3>
              <p class="text(xl) c(gray-600) leading(relaxed) font(light) max-w(4xl)">
                {feature.description}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Stats Section - Typography Scales -->
  <section class="vbox(center) py(9xl)">
    <div class="max-w(5xl) vbox gap(8xl)">
      <!-- Stats Grid -->
      <div class="grid(2) gap(8xl)">
        <div class="text(center) vbox gap(3xl)">
          <div class="display(5xl) font(black) c(black) leading(none)">15+</div>
          <div class="text(lg) c(gray-500) uppercase tracking(widest) font(medium)">FONT SIZES</div>
        </div>
        <div class="text(center) vbox gap(3xl)">
          <div class="display(5xl) font(black) c(black) leading(none)">9</div>
          <div class="text(lg) c(gray-500) uppercase tracking(widest) font(medium)">FONT WEIGHTS</div>
        </div>
        <div class="text(center) vbox gap(3xl)">
          <div class="display(5xl) font(black) c(black) leading(none)">13+</div>
          <div class="text(lg) c(gray-500) uppercase tracking(widest) font(medium)">SPACING UNITS</div>
        </div>
        <div class="text(center) vbox gap(3xl)">
          <div class="display(5xl) font(black) c(black) leading(none)">4</div>
          <div class="text(lg) c(gray-500) uppercase tracking(widest) font(medium)">COLOR LEVELS</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials - Typography + Spacing -->
  <section class="vbox(center) py(9xl) bg(black)">
    <div class="max-w(5xl) vbox gap(8xl)">
      <!-- Section Header -->
      <div class="text(center) vbox gap(3xl)">
        <h2 class="display(3xl) font(black) c(white) tracking(tight) leading(none)">
          WHAT PEOPLE<br>SAY
        </h2>
      </div>
      
      <!-- Testimonials -->
      <div class="vbox gap(8xl)">
        {#each testimonials as testimonial, index}
          <div class="vbox gap(4xl) text(center)">
            <!-- Quote Number -->
            <div class="text(sm) font(black) uppercase tracking(widest) c(gray-600)">
              {String(index + 1).padStart(2, '0')}
            </div>
            
            <!-- Quote - Typography Hierarchy -->
            <blockquote class="display(lg) c(white) leading(tight) font(light) max-w(4xl)">
              {testimonial.quote}
            </blockquote>
            
            <!-- Author Info - Text Hierarchy + Spacing -->
            <div class="vbox gap(md)">
              <div class="text(lg) c(white) font(medium) tracking(wide) uppercase">
                {testimonial.author}
              </div>
              <div class="text(md) c(gray-400) font(light)">
                {testimonial.role} at {testimonial.company}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section - All Foundation Elements -->
  <section class="vbox(center) py(9xl)">
    <div class="max-w(4xl) vbox gap(6xl) text(center)">
      <div class="vbox gap(3xl)">
        <h2 class="display(4xl) font(black) c(black) tracking(tighter) leading(none)">
          START BUILDING<br>TODAY
        </h2>
        
        <p class="text(xl) c(gray-500) font(light) leading(relaxed) max-w(3xl)">
          Use typography, color, and spacing foundations to create beautiful, 
          consistent interfaces without any custom components
        </p>
      </div>
      
      <!-- Single CTA -->
      <div class="px(5xl) py(3xl) bg(black) c(white) font(black) tracking(widest) uppercase text(lg)">
        DOWNLOAD FOUNDATION
      </div>
      
      <!-- Secondary Action -->
      <div class="text(md) c(gray-400) font(medium) tracking(wide) uppercase">
        View Documentation →
      </div>
    </div>
  </section>

  <!-- Footer - Typography + Spacing Only -->
  <footer class="vbox(center) py(9xl)">
    <div class="max-w(4xl) vbox gap(8xl) text(center)">
      <!-- Links -->
      <div class="vbox gap(4xl)">
        <div class="hbox(center) gap(6xl)">
          <div class="text(md) c(gray-400) font(medium) tracking(wide) uppercase hover:c(black)">
            Typography
          </div>
          <div class="text(md) c(gray-400) font(medium) tracking(wide) uppercase hover:c(black)">
            Colors
          </div>
          <div class="text(md) c(gray-400) font(medium) tracking(wide) uppercase hover:c(black)">
            Spacing
          </div>
          <div class="text(md) c(gray-400) font(medium) tracking(wide) uppercase hover:c(black)">
            Elevation
          </div>
        </div>
        
        <div class="hbox(center) gap(6xl)">
          <div class="text(md) c(gray-400) font(medium) tracking(wide) uppercase hover:c(black)">
            Documentation
          </div>
          <div class="text(md) c(gray-400) font(medium) tracking(wide) uppercase hover:c(black)">
            Examples
          </div>
          <div class="text(md) c(gray-400) font(medium) tracking(wide) uppercase hover:c(black)">
            GitHub
          </div>
        </div>
      </div>
      
      <!-- Copyright -->
      <div class="vbox gap(2xl)">
        <div class="text(xs) c(gray-400) font(medium) tracking(widest) uppercase">
          Built with Foundation Only
        </div>
        <div class="text(xs) c(gray-300) font(light)">
          © 2024 Foundation Demo
        </div>
      </div>
    </div>
  </footer>
</div>