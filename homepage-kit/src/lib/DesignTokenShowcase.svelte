<script>
  import Card from '../components/ui/Card.svelte';
  import CardHeader from '../components/ui/CardHeader.svelte';
  import CardTitle from '../components/ui/CardTitle.svelte';
  import CardContent from '../components/ui/CardContent.svelte';
  import Button from '../components/ui/Button.svelte';
  import ColorPalette from '../components/ui/ColorPalette.svelte';
</script>

<div class="showcase-container p(xl) bg(--colors-gray-50) min-h(screen)">
  <div class="container  mx(auto) vbox gap(xl)">
    <!-- Hero Section -->
    <div class="text(center) vbox gap(lg) fade-up(0.8s/ease-out)">
      <h1 class="700 font(5xl/1.1/-0.02em) c(--colors-gray-900)">
        Refined Design Tokens
      </h1>
      <p class="font(xl/1.6) c(--colors-gray-600)  mx(auto)">
        A sophisticated design system with carefully crafted values for modern interfaces
      </p>
    </div>
    
    <!-- Typography Showcase -->
    <Card className="clip fade-up(0.8s/ease-out/delay:100ms)">
      <CardHeader className="bg(--colors-gray-100) border-b(1/--colors-gray-200)">
        <CardTitle>Typography Scale</CardTitle>
      </CardHeader>
      <CardContent className="vbox gap(sm) py(md)">
        <div class="700 font(2xl/1) c(--colors-gray-900) fade-up(0.6s/ease-out/delay:200ms)">2xl - Display</div>
        <div class="600 font(xl/1.1) c(--colors-gray-800) fade-up(0.6s/ease-out/delay:250ms)">xl - Heading Large</div>
        <div class="500 font(lg/1.2) c(--colors-gray-700) fade-up(0.6s/ease-out/delay:300ms)">lg - Heading Medium</div>
        <div class="font(md/1.4) c(--colors-gray-600) fade-up(0.6s/ease-out/delay:350ms)">md - Subheading</div>
        <div class="font(sm/1.6) c(--colors-gray-600) fade-up(0.6s/ease-out/delay:400ms)">sm - Body Text</div>
        <div class="font(xs/1.5) c(--colors-gray-500) fade-up(0.6s/ease-out/delay:450ms)">xs - Caption</div>
      </CardContent>
    </Card>
    
    <!-- Advanced OKLCH Color System -->
    <div class="fade-up(0.8s/ease-out/delay:200ms)">
      <ColorPalette />
    </div>
    
    <!-- Spacing & Layout -->
    <Card className="fade-up(0.8s/ease-out/delay:300ms)">
      <CardHeader>
        <CardTitle>Spacing System</CardTitle>
      </CardHeader>
      <CardContent className="py(md)">
        <div class="hbox(bottom) gap(sm)">
          <div class="vbox(pack) gap(xs) scale-up(0.5s/ease-out/delay:400ms)">
            <div class="w(lg) h(xs) bg(--colors-primary-500) r(sm)"></div>
            <span class="font(xs) c(--colors-gray-500)">xs</span>
          </div>
          <div class="vbox(pack) gap(xs) scale-up(0.5s/ease-out/delay:450ms)">
            <div class="w(lg) h(sm) bg(--colors-primary-500) r(sm)"></div>
            <span class="font(xs) c(--colors-gray-500)">sm</span>
          </div>
          <div class="vbox(pack) gap(xs) scale-up(0.5s/ease-out/delay:500ms)">
            <div class="w(lg) h(md) bg(--colors-primary-500) r(sm)"></div>
            <span class="font(xs) c(--colors-gray-500)">md</span>
          </div>
          <div class="vbox(pack) gap(xs) scale-up(0.5s/ease-out/delay:550ms)">
            <div class="w(lg) h(lg) bg(--colors-primary-500) r(sm)"></div>
            <span class="font(xs) c(--colors-gray-500)">lg</span>
          </div>
          <div class="vbox(pack) gap(xs) scale-up(0.5s/ease-out/delay:600ms)">
            <div class="w(lg) h(xl) bg(--colors-primary-500) r(sm)"></div>
            <span class="font(xs) c(--colors-gray-500)">xl</span>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <!-- Shadows & Effects -->
    <div class="vbox gap(md) fade-up(0.8s/ease-out/delay:400ms)">
      <h2 class="600 font(lg) c(--colors-gray-900)">Elevation & Shadows</h2>
      <div class="grid(3) gap(md)">
        <div class="p(md) bg(--colors-white) r(md) shadow(sm) vbox gap(xs) fade-up(0.6s/ease-out/delay:500ms)">
          <div class="600 font(sm)">Small Shadow</div>
          <div class="font(xs) c(--colors-gray-500)">Subtle elevation</div>
        </div>
        <div class="p(md) bg(--colors-white) r(md) shadow(md) vbox gap(xs) fade-up(0.6s/ease-out/delay:600ms)">
          <div class="600 font(sm)">Medium Shadow</div>
          <div class="font(xs) c(--colors-gray-500)">Cards & containers</div>
        </div>
        <div class="p(md) bg(--colors-white) r(md) shadow(lg) vbox gap(xs) fade-up(0.6s/ease-out/delay:700ms)">
          <div class="600 font(sm)">Large Shadow</div>
          <div class="font(xs) c(--colors-gray-500)">Modals & dropdowns</div>
        </div>
      </div>
    </div>
    
    <!-- Component Examples -->
    <Card className="fade-up(0.8s/ease-out/delay:500ms)">
      <CardHeader>
        <CardTitle>Component Examples</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="vbox gap(lg)">
          <!-- Buttons -->
          <div class="vbox gap(md) fade-up(0.6s/ease-out/delay:600ms)">
            <h3 class="600 font(md)">Buttons</h3>
            <div class="hbox gap(sm) flex-wrap">
              <div class="scale-up(0.4s/ease-out/delay:700ms)"><Button>Primary Action</Button></div>
              <div class="scale-up(0.4s/ease-out/delay:750ms)"><Button variant="secondary">Secondary</Button></div>
              <div class="scale-up(0.4s/ease-out/delay:800ms)"><Button variant="outline">Outline</Button></div>
              <div class="scale-up(0.4s/ease-out/delay:850ms)"><Button variant="ghost">Ghost</Button></div>
              <div class="scale-up(0.4s/ease-out/delay:900ms)"><Button variant="destructive">Destructive</Button></div>
            </div>
          </div>
          
          <!-- Cards with different radius -->
          <div class="vbox gap(md) fade-up(0.6s/ease-out/delay:700ms)">
            <h3 class="600 font(md)">Border Radius</h3>
            <div class="grid(4) gap(sm)">
              <div class="p(md) bg(--colors-gray-100) r(sm) text(center) font(sm) scale-up(0.4s/ease-out/delay:800ms)">sm</div>
              <div class="p(md) bg(--colors-gray-100) r(md) text(center) font(sm) scale-up(0.4s/ease-out/delay:850ms)">md</div>
              <div class="p(md) bg(--colors-gray-100) r(lg) text(center) font(sm) scale-up(0.4s/ease-out/delay:900ms)">lg</div>
              <div class="p(md) bg(--colors-gray-100) r(xl) text(center) font(sm) scale-up(0.4s/ease-out/delay:950ms)">xl</div>
            </div>
          </div>
          
          <!-- Modern Card Design -->
          <div class="vbox gap(md) fade-up(0.6s/ease-out/delay:800ms)">
            <h3 class="600 font(md)">Modern Card</h3>
            <div class="p(lg) bg(--colors-white) r(lg) shadow(lg) border(1/--colors-gray-200) scale-up(0.5s/ease-out/delay:900ms)">
              <div class="hbox(middle) gap(md)">
                <div class="w(2xl) h(2xl) r(md) bg(135deg/--colors-primary-400,--colors-primary-600) bounce-in(0.6s/elastic/delay:1000ms)"></div>
                <div class="vbox gap(xs) flex fade-left(0.5s/ease-out/delay:1100ms)">
                  <div class="600 font(md) c(--colors-gray-900)">Premium Feature</div>
                  <div class="font(sm) c(--colors-gray-600)">Experience the refined design system</div>
                </div>
                <div class="fade-right(0.5s/ease-out/delay:1200ms)"><Button size="sm">Try Now</Button></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</div>

<style>
  .showcase-container {
    background: linear-gradient(180deg, 
      var(--colors-gray-50) 0%, 
      var(--colors-white) 50%, 
      var(--colors-gray-50) 100%
    );
  }
</style>