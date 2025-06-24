<script>
  import Card from '../components/ui/Card.svelte';
  import CardHeader from '../components/ui/CardHeader.svelte';
  import CardTitle from '../components/ui/CardTitle.svelte';
  import CardContent from '../components/ui/CardContent.svelte';
  import Button from '../components/ui/Button.svelte';
</script>

<div class="showcase-container p(2xl) bg(--colors-gray-50) min-h(screen)">
  <div class="container max-w(7xl) mx(auto) vbox gap(2xl)">
    <!-- Hero Section -->
    <div class="text(center) vbox gap(lg)">
      <h1 class="font(5xl/1.1/-0.02em) bold c(--colors-gray-900)">
        Refined Design Tokens
      </h1>
      <p class="font(xl/1.6) c(--colors-gray-600) max-w(2xl) mx(auto)">
        A sophisticated design system with carefully crafted values for modern interfaces
      </p>
    </div>
    
    <!-- Typography Showcase -->
    <Card className="overflow(hidden)">
      <CardHeader className="bg(--colors-gray-100) border-b(1/--colors-gray-200)">
        <CardTitle>Typography Scale</CardTitle>
      </CardHeader>
      <CardContent className="vbox gap(lg) py(xl)">
        <div class="font(7xl/1) bold c(--colors-gray-900)">Display</div>
        <div class="font(5xl/1.1) semibold c(--colors-gray-800)">Heading Large</div>
        <div class="font(3xl/1.2) medium c(--colors-gray-700)">Heading Medium</div>
        <div class="font(xl/1.4) c(--colors-gray-600)">Subheading</div>
        <div class="font(lg/1.6) c(--colors-gray-600)">Body Large</div>
        <div class="font(md/1.6) c(--colors-gray-600)">Body Regular</div>
        <div class="font(sm/1.5) c(--colors-gray-500)">Caption</div>
      </CardContent>
    </Card>
    
    <!-- Color Palette -->
    <div class="grid(3) gap(xl)">
      <!-- Primary Colors -->
      <Card>
        <CardHeader>
          <CardTitle>Primary Palette</CardTitle>
        </CardHeader>
        <CardContent className="vbox gap(sm)">
          <div class="h(3xl) bg(--colors-primary-500) r(lg) shadow(md)"></div>
          <div class="hbox gap(xs)">
            <div class="flex h(2xl) bg(--colors-primary-100) r(md)"></div>
            <div class="flex h(2xl) bg(--colors-primary-300) r(md)"></div>
            <div class="flex h(2xl) bg(--colors-primary-700) r(md)"></div>
            <div class="flex h(2xl) bg(--colors-primary-900) r(md)"></div>
          </div>
        </CardContent>
      </Card>
      
      <!-- Gray Scale -->
      <Card>
        <CardHeader>
          <CardTitle>Neutral Tones</CardTitle>
        </CardHeader>
        <CardContent className="vbox gap(sm)">
          <div class="h(3xl) bg(--colors-gray-600) r(lg) shadow(md)"></div>
          <div class="hbox gap(xs)">
            <div class="flex h(2xl) bg(--colors-gray-100) r(md) border(1/--colors-gray-200)"></div>
            <div class="flex h(2xl) bg(--colors-gray-300) r(md)"></div>
            <div class="flex h(2xl) bg(--colors-gray-700) r(md)"></div>
            <div class="flex h(2xl) bg(--colors-gray-900) r(md)"></div>
          </div>
        </CardContent>
      </Card>
      
      <!-- Semantic Colors -->
      <Card>
        <CardHeader>
          <CardTitle>Semantic Colors</CardTitle>
        </CardHeader>
        <CardContent className="vbox gap(sm)">
          <div class="grid(2) gap(sm)">
            <div class="h(2xl) bg(--colors-success) r(md) shadow(sm)"></div>
            <div class="h(2xl) bg(--colors-warning) r(md) shadow(sm)"></div>
            <div class="h(2xl) bg(--colors-error) r(md) shadow(sm)"></div>
            <div class="h(2xl) bg(--colors-info) r(md) shadow(sm)"></div>
          </div>
        </CardContent>
      </Card>
    </div>
    
    <!-- Spacing & Layout -->
    <Card>
      <CardHeader>
        <CardTitle>Spacing System</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="hbox gap(lg) items(end)">
          <div class="vbox gap(xs) items(center)">
            <div class="w(2xl) h(xs) bg(--colors-primary-500) r(sm)"></div>
            <span class="font(xs) c(--colors-gray-500)">xs</span>
          </div>
          <div class="vbox gap(xs) items(center)">
            <div class="w(2xl) h(sm) bg(--colors-primary-500) r(sm)"></div>
            <span class="font(xs) c(--colors-gray-500)">sm</span>
          </div>
          <div class="vbox gap(xs) items(center)">
            <div class="w(2xl) h(md) bg(--colors-primary-500) r(sm)"></div>
            <span class="font(xs) c(--colors-gray-500)">md</span>
          </div>
          <div class="vbox gap(xs) items(center)">
            <div class="w(2xl) h(lg) bg(--colors-primary-500) r(sm)"></div>
            <span class="font(xs) c(--colors-gray-500)">lg</span>
          </div>
          <div class="vbox gap(xs) items(center)">
            <div class="w(2xl) h(xl) bg(--colors-primary-500) r(sm)"></div>
            <span class="font(xs) c(--colors-gray-500)">xl</span>
          </div>
          <div class="vbox gap(xs) items(center)">
            <div class="w(2xl) h(2xl) bg(--colors-primary-500) r(sm)"></div>
            <span class="font(xs) c(--colors-gray-500)">2xl</span>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <!-- Shadows & Effects -->
    <div class="vbox gap(xl)">
      <h2 class="font(2xl) semibold c(--colors-gray-900)">Elevation & Shadows</h2>
      <div class="grid(3) gap(xl)">
        <div class="p(xl) bg(--colors-white) r(lg) shadow(sm) vbox gap(sm)">
          <div class="font(sm) semibold">Small Shadow</div>
          <div class="font(xs) c(--colors-gray-500)">Subtle elevation</div>
        </div>
        <div class="p(xl) bg(--colors-white) r(lg) shadow(md) vbox gap(sm)">
          <div class="font(sm) semibold">Medium Shadow</div>
          <div class="font(xs) c(--colors-gray-500)">Cards & containers</div>
        </div>
        <div class="p(xl) bg(--colors-white) r(lg) shadow(lg) vbox gap(sm)">
          <div class="font(sm) semibold">Large Shadow</div>
          <div class="font(xs) c(--colors-gray-500)">Modals & dropdowns</div>
        </div>
      </div>
    </div>
    
    <!-- Component Examples -->
    <Card>
      <CardHeader>
        <CardTitle>Component Examples</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="vbox gap(xl)">
          <!-- Buttons -->
          <div class="vbox gap(md)">
            <h3 class="font(lg) semibold">Buttons</h3>
            <div class="hbox gap(md) flex-wrap">
              <Button>Primary Action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>
          
          <!-- Cards with different radius -->
          <div class="vbox gap(md)">
            <h3 class="font(lg) semibold">Border Radius</h3>
            <div class="grid(4) gap(md)">
              <div class="p(lg) bg(--colors-gray-100) r(sm) text(center) font(sm)">sm</div>
              <div class="p(lg) bg(--colors-gray-100) r(md) text(center) font(sm)">md</div>
              <div class="p(lg) bg(--colors-gray-100) r(lg) text(center) font(sm)">lg</div>
              <div class="p(lg) bg(--colors-gray-100) r(xl) text(center) font(sm)">xl</div>
            </div>
          </div>
          
          <!-- Modern Card Design -->
          <div class="vbox gap(md)">
            <h3 class="font(lg) semibold">Modern Card</h3>
            <div class="p(xl) bg(--colors-white) r(xl) shadow(lg) border(1/--colors-gray-200)">
              <div class="hbox gap(lg) items(center)">
                <div class="w(3xl) h(3xl) r(lg) bg(gradient/135deg/--colors-primary-400/--colors-primary-600)"></div>
                <div class="vbox gap(xs) flex">
                  <div class="font(lg) semibold c(--colors-gray-900)">Premium Feature</div>
                  <div class="font(sm) c(--colors-gray-600)">Experience the refined design system</div>
                </div>
                <Button size="sm">Try Now</Button>
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