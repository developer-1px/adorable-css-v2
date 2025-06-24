<script lang="ts">
  import { onMount } from 'svelte';
  import { defaultTokens } from 'adorable-css';
  import Card from './components/ui/Card.svelte';
  import CardHeader from './components/ui/CardHeader.svelte';
  import CardTitle from './components/ui/CardTitle.svelte';
  import CardDescription from './components/ui/CardDescription.svelte';
  import CardContent from './components/ui/CardContent.svelte';
  import Badge from './components/ui/Badge.svelte';
  
  // Import Lucide icons
  import { 
    Type as TextIcon,
    Grid3x3 as GridIcon,
    Palette as ColorSwatchIcon,
    RectangleHorizontal as BorderRadiusIcon,
    Zap as Shadow01Icon,
    Sparkles,
    Ruler as RulerIcon
  } from 'lucide-svelte';
  
  let activeTab = 'typography';
  
  const tokenCategories = {
    typography: {
      name: 'Typography',
      icon: TextIcon,
      description: 'Font sizes, line heights, letter spacing, and font weights'
    },
    spacing: {
      name: 'Spacing',
      icon: RulerIcon,
      description: 'Consistent spacing scale for margins, padding, and gaps'
    },
    colors: {
      name: 'Colors',
      icon: ColorSwatchIcon,
      description: 'Semantic color palette with variants for every state'
    },
    radius: {
      name: 'Border Radius',
      icon: BorderRadiusIcon,
      description: 'Corner radius tokens for consistent rounding'
    },
    shadows: {
      name: 'Shadows',
      icon: Shadow01Icon,
      description: 'Elevation system with multiple shadow levels'
    },
    effects: {
      name: 'Effects',
      icon: Sparkles,
      description: 'Opacity, z-index, animations, and transitions'
    }
  };
  
  // Get color groups
  function getColorGroups() {
    const groups = {
      brand: ['primary', 'secondary'],
      semantic: ['success', 'warning', 'error', 'info'],
      neutral: ['white', 'black', 'gray'],
      palette: []
    };
    
    // Group color scales
    const scales = {};
    Object.entries(defaultTokens.colors).forEach(([key, value]) => {
      if (key.includes('-')) {
        const [colorName, shade] = key.split('-');
        if (!scales[colorName]) scales[colorName] = {};
        scales[colorName][shade] = value;
      }
    });
    
    groups.palette = Object.entries(scales);
    return groups;
  }
  
  const colorGroups = getColorGroups();
</script>

<div class="tokens-page min-h(screen) bg(--colors-gray-50)">
  <!-- Header -->
  <div class="header-section bg(--colors-white) border-b(1/--colors-gray-200) py(xl)">
    <div class="container max-w(7xl) mx(auto) px(lg)">
      <div class="vbox gap(md) text(center)">
        <Badge variant="secondary" className="mx(auto) mb(sm)">Design System</Badge>
        <h1 class="font(3xl/1.2/-0.02em) bold c(--colors-gray-900)">
          Design Tokens Reference
        </h1>
        <p class="font(lg/1.6) c(--colors-gray-600) max-w(2xl) mx(auto)">
          A comprehensive collection of design tokens that power AdorableCSS. 
          All tokens are available as CSS variables for consistent theming.
        </p>
      </div>
    </div>
  </div>
  
  <!-- Navigation Tabs -->
  <div class="sticky top(0) bg(--colors-white) border-b(1/--colors-gray-200) z(sticky) shadow(xs)">
    <div class="container max-w(7xl) mx(auto) px(lg)">
      <div class="hbox gap(xs) overflow-x(auto) py(xs)">
        {#each Object.entries(tokenCategories) as [key, category]}
          <button
            class="tab-button px(lg) py(sm) r(md) font(sm) medium nowrap transition
                   {activeTab === key 
                     ? 'bg(--colors-primary-100) c(--colors-primary-700) border(1/--colors-primary-200)' 
                     : 'hover:bg(--colors-gray-100) c(--colors-gray-700) border(1/transparent)'}"
            on:click={() => activeTab = key}
          >
            <span class="hbox gap(xs) items(center)">
              <svelte:component this={category.icon} size="16" />
              <span>{category.name}</span>
            </span>
          </button>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Content -->
  <div class="container max-w(7xl) mx(auto) px(lg) py(2xl)">
    {#if activeTab === 'typography'}
      <div class="vbox gap(2xl)">
        <!-- Font Sizes -->
        <Card>
          <CardHeader>
            <CardTitle>Font Sizes</CardTitle>
            <CardDescription>Modular type scale with consistent ratios</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="vbox gap(lg)">
              {#each Object.entries(defaultTokens.font) as [key, value]}
                <div class="token-row hbox gap(lg) items(center) py(sm) border-b(1/--colors-gray-100) last:border-b(0)">
                  <div class="token-info min-w(3xl)">
                    <code class="font(sm) c(--colors-primary-600) bg(--colors-primary-50) px(sm) py(xs) r(sm)">
                      font({key})
                    </code>
                    <div class="font(xs) c(--colors-gray-500) mt(xs)">{value}</div>
                  </div>
                  <div class="token-preview flex items(center)">
                    <span class="font({key}) c(--colors-gray-900)">The quick brown fox jumps</span>
                  </div>
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
        
        <!-- Line Heights -->
        <Card>
          <CardHeader>
            <CardTitle>Line Heights</CardTitle>
            <CardDescription>Consistent vertical rhythm for readability</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid(2) gap(lg)">
              {#each Object.entries(defaultTokens.lineHeight) as [key, value]}
                <div class="token-item p(lg) bg(--colors-gray-50) r(lg)">
                  <div class="hbox gap(sm) items(center) mb(sm)">
                    <code class="font(sm) c(--colors-primary-600)">line-height({key})</code>
                    <Badge variant="outline" className="font(xs)">{value}</Badge>
                  </div>
                  <p class="font(sm) c(--colors-gray-700)" style="line-height: {value}">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore.
                  </p>
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
        
        <!-- Letter Spacing -->
        <Card>
          <CardHeader>
            <CardTitle>Letter Spacing</CardTitle>
            <CardDescription>Fine-tune character spacing for optimal legibility</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="vbox gap(md)">
              {#each Object.entries(defaultTokens.letterSpacing) as [key, value]}
                <div class="token-row py(md) border-b(1/--colors-gray-100) last:border-b(0)">
                  <div class="hbox gap(lg) items(center) mb(sm)">
                    <code class="font(sm) c(--colors-primary-600)">letter-spacing({key})</code>
                    <Badge variant="outline" className="font(xs)">{value}</Badge>
                  </div>
                  <p class="font(lg) c(--colors-gray-900)" style="letter-spacing: {value}">
                    TYPOGRAPHY IS THE ART OF ARRANGING TYPE
                  </p>
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
        
        <!-- Font Weights -->
        <Card>
          <CardHeader>
            <CardTitle>Font Weights</CardTitle>
            <CardDescription>Complete weight scale from thin to black</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="hbox flex-wrwap gap(md)">
              {#each Object.entries(defaultTokens.fontWeight) as [key, value]}
                <div class="token-item p(md) bg(--colors-gray-50) r(lg) text(center)">
                  <div class="font(2xl) mb(sm)" style="font-weight: {value}">Aa</div>
                  <code class="font(xs) c(--colors-primary-600)">{key}</code>
                  <div class="font(xs) c(--colors-gray-500)">{value}</div>
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
      </div>
      
    {:else if activeTab === 'spacing'}
      <div class="vbox gap(2xl)">
        <Card>
          <CardHeader>
            <CardTitle>Spacing Scale</CardTitle>
            <CardDescription>Consistent spacing system with practical increments</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="vbox gap(lg)">
              {#each Object.entries(defaultTokens.spacing) as [key, value]}
                <div class="spacing-row hbox gap(lg) items(center)">
                  <div class="token-label min-w(xl) text(right)">
                    <code class="font(sm) c(--colors-primary-600)">p({key})</code>
                    <div class="font(xs) c(--colors-gray-500)">{value}</div>
                  </div>
                  <div class="spacing-visual flex items(center) gap(sm)">
                    <div class="h(2xl) bg(--colors-primary-500)" style="width: {value}"></div>
                    <div class="p({key}) bg(--colors-primary-100) border(1/--colors-primary-300) r(md)">
                      <div class="bg(--colors-primary-500) w(2xl) h(lg) r(sm)"></div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
        
        <!-- Spacing Usage Examples -->
        <Card>
          <CardHeader>
            <CardTitle>Spacing Usage</CardTitle>
            <CardDescription>Common spacing patterns and combinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid(3) gap(lg)">
              <div class="example-card p(xs) bg(--colors-gray-100) r(lg)">
                <div class="bg(--colors-white) p(xs) r(md) font(sm) text(center)">p(xs)</div>
              </div>
              <div class="example-card p(sm) bg(--colors-gray-100) r(lg)">
                <div class="bg(--colors-white) p(sm) r(md) font(sm) text(center)">p(sm)</div>
              </div>
              <div class="example-card p(md) bg(--colors-gray-100) r(lg)">
                <div class="bg(--colors-white) p(md) r(md) font(sm) text(center)">p(md)</div>
              </div>
              <div class="example-card p(lg) bg(--colors-gray-100) r(lg)">
                <div class="bg(--colors-white) p(lg) r(md) font(sm) text(center)">p(lg)</div>
              </div>
              <div class="example-card p(xl) bg(--colors-gray-100) r(lg)">
                <div class="bg(--colors-white) p(xl) r(md) font(sm) text(center)">p(xl)</div>
              </div>
              <div class="example-card p(2xl) bg(--colors-gray-100) r(lg)">
                <div class="bg(--colors-white) p(2xl) r(md) font(sm) text(center)">p(2xl)</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <!-- Size Tokens -->
        <Card>
          <CardHeader>
            <CardTitle>Size Tokens</CardTitle>
            <CardDescription>Width and height tokens for consistent sizing (w(5xl), h(5xl) now supported!)</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="vbox gap(lg)">
              {#each Object.entries(defaultTokens.size) as [key, value]}
                <div class="size-row hbox gap(lg) items(center)">
                  <div class="token-label min-w(xl) text(right)">
                    <code class="font(sm) c(--colors-primary-600)">w({key})</code>
                    <div class="font(xs) c(--colors-gray-500)">{value}</div>
                  </div>
                  <div class="size-visual flex items(center) gap(md)">
                    <div class="w({key}) h({key}) bg(--colors-primary-500) r(md)"></div>
                    <div class="font(xs) c(--colors-gray-600)">h({key})</div>
                  </div>
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
      </div>
      
    {:else if activeTab === 'colors'}
      <div class="vbox gap(2xl)">
        <!-- Brand Colors -->
        <Card>
          <CardHeader>
            <CardTitle>Brand Colors</CardTitle>
            <CardDescription>Primary brand identity colors</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid(2) gap(lg)">
              {#each colorGroups.brand as colorName}
                <div class="color-swatch">
                  <div class="h(5xl) r(lg) bg(--colors-{colorName}) hbox(center+center) c(white) font(sm) semibold shadow(md)">
                    {colorName}
                  </div>
                  <div class="mt(sm) font(xs) c(--colors-gray-600)">
                    <code>c({colorName})</code> · {defaultTokens.colors[colorName]}
                  </div>
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
        
        <!-- Semantic Colors -->
        <Card>
          <CardHeader>
            <CardTitle>Semantic Colors</CardTitle>
            <CardDescription>Colors with specific meanings for UI feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid(4) gap(lg)">
              {#each colorGroups.semantic as colorName}
                <div class="color-swatch">
                  <div class="h(5xl) r(lg) bg(--colors-{colorName}) hbox(center+center) c(white) font(sm) semibold shadow(md)">
                    {colorName}
                  </div>
                  <div class="mt(sm) font(xs) c(--colors-gray-600)">
                    <code>c({colorName})</code>
                  </div>
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
        
        <!-- Color Scales -->
        <Card>
          <CardHeader>
            <CardTitle>Color Scales</CardTitle>
            <CardDescription>Complete color palettes with 11 shades each</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="vbox gap(xl)">
              {#each colorGroups.palette as [colorName, shades]}
                <div class="color-scale">
                  <h4 class="font(sm) semibold c(--colors-gray-700) mb(md) capitalize">{colorName}</h4>
                  <div class="hbox gap(xs)">
                    {#each Object.entries(shades) as [shade, value]}
                      <div class="flex-1">
                        <div 
                          class="h(3xl) r(md) shadow(sm) border(1/--colors-gray-200)" 
                          style="background-color: {value}"
                          title="{colorName}-{shade}: {value}"
                        ></div>
                        <div class="font(xs) c(--colors-gray-600) text(center) mt(xs)">{shade}</div>
                      </div>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
      </div>
      
    {:else if activeTab === 'radius'}
      <div class="vbox gap(2xl)">
        <Card>
          <CardHeader>
            <CardTitle>Border Radius Tokens</CardTitle>
            <CardDescription>Consistent corner radius for UI elements</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid(5) gap(lg)">
              {#each Object.entries(defaultTokens.radius) as [key, value]}
                <div class="radius-demo text(center)">
                  <div class="w(5xl) h(5xl) bg(--colors-primary-500) r({key}) mx(auto) mb(sm) shadow(md)"></div>
                  <code class="font(xs) c(--colors-primary-600)">r({key})</code>
                  <div class="font(xs) c(--colors-gray-500)">{value}</div>
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
        
        <!-- Radius Usage Examples -->
        <Card>
          <CardHeader>
            <CardTitle>Common Usage Patterns</CardTitle>
            <CardDescription>Border radius in different contexts</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid(3) gap(lg)">
              <div class="usage-example">
                <div class="p(lg) bg(--colors-gray-100) r(sm)">
                  <div class="font(sm) semibold mb(xs)">Small Components</div>
                  <div class="font(xs) c(--colors-gray-600)">Badges, tags, inputs</div>
                </div>
              </div>
              <div class="usage-example">
                <div class="p(lg) bg(--colors-gray-100) r(lg)">
                  <div class="font(sm) semibold mb(xs)">Medium Components</div>
                  <div class="font(xs) c(--colors-gray-600)">Cards, buttons, modals</div>
                </div>
              </div>
              <div class="usage-example">
                <div class="p(lg) bg(--colors-gray-100) r(2xl)">
                  <div class="font(sm) semibold mb(xs)">Large Components</div>
                  <div class="font(xs) c(--colors-gray-600)">Hero sections, containers</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
    {:else if activeTab === 'shadows'}
      <div class="vbox gap(2xl)">
        <Card>
          <CardHeader>
            <CardTitle>Shadow System</CardTitle>
            <CardDescription>Elevation hierarchy for depth and layering</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="vbox gap(xl)">
              {#each Object.entries(defaultTokens.shadow) as [key, value]}
                <div class="shadow-demo">
                  <div class="hbox gap(lg) items(center)">
                    <div class="min-w(3xl)">
                      <code class="font(sm) c(--colors-primary-600)">shadow({key})</code>
                      <div class="font(xs) c(--colors-gray-500) mt(xs)">{value}</div>
                    </div>
                    <div class="flex p(xl) bg(--colors-white) r(lg) shadow({key})">
                      <div class="font(sm) c(--colors-gray-700)">Elevation level: {key}</div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
      </div>
      
    {:else if activeTab === 'effects'}
      <div class="vbox gap(2xl)">
        <!-- Opacity -->
        <Card>
          <CardHeader>
            <CardTitle>Opacity Levels</CardTitle>
            <CardDescription>Consistent transparency values</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid(5) gap(md)">
              {#each Object.entries(defaultTokens.opacity) as [key, value]}
                <div class="opacity-demo text(center)">
                  <div class="w(3xl) h(3xl) bg(--colors-primary-500) opacity({key}) r(lg) mx(auto) mb(sm)"></div>
                  <code class="font(xs)">opacity({key})</code>
                  <div class="font(xs) c(--colors-gray-500)">{value}</div>
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
        
        <!-- Z-Index -->
        <Card>
          <CardHeader>
            <CardTitle>Z-Index Scale</CardTitle>
            <CardDescription>Layering system for overlapping elements</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid(3) gap(lg)">
              {#each Object.entries(defaultTokens.zIndex) as [key, value]}
                <div class="z-index-item p(md) bg(--colors-gray-50) r(lg)">
                  <code class="font(sm) c(--colors-primary-600)">z({key})</code>
                  <div class="font(xs) c(--colors-gray-500) mt(xs)">{value}</div>
                  <div class="font(xs) c(--colors-gray-600) mt(sm)">
                    {key === 'modal' && 'Modals and dialogs'}
                    {key === 'popover' && 'Popovers and tooltips'}
                    {key === 'dropdown' && 'Dropdown menus'}
                    {key === 'sticky' && 'Sticky headers'}
                    {key === 'overlay' && 'Overlays and backdrops'}
                    {key === 'base' && 'Base level content'}
                  </div>
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
        
        <!-- Animations -->
        <Card>
          <CardHeader>
            <CardTitle>Animation Tokens</CardTitle>
            <CardDescription>Duration and easing functions for smooth animations</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="vbox gap(xl)">
              <!-- Durations -->
              <div>
                <h4 class="font(md) semibold mb(md)">Durations</h4>
                <div class="grid(3) gap(md)">
                  {#each Object.entries(defaultTokens.duration) as [key, value]}
                    <div class="duration-item p(md) bg(--colors-gray-50) r(lg) hbox gap(sm) items(center)">
                      <div class="w(2xl) h(2xl) bg(--colors-primary-500) r(md) animate-demo" 
                           style="animation-duration: {value}"></div>
                      <div>
                        <code class="font(xs) c(--colors-primary-600)">duration({key})</code>
                        <div class="font(xs) c(--colors-gray-500)">{value}</div>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
              
              <!-- Easing -->
              <div>
                <h4 class="font(md) semibold mb(md)">Easing Functions</h4>
                <div class="grid(3) gap(md)">
                  {#each Object.entries(defaultTokens.ease) as [key, value]}
                    <div class="easing-item p(md) bg(--colors-gray-50) r(lg)">
                      <code class="font(xs) c(--colors-primary-600)">ease({key})</code>
                      <div class="font(xs) c(--colors-gray-500) mt(xs)">{value}</div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    {/if}
  </div>
</div>

<style>
  .tab-button {
    transition: all 0.2s ease-out;
  }
  
  .token-row:last-child {
    border-bottom: none;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
  
  .animate-demo {
    animation: pulse infinite ease-in-out;
  }
  
  .color-swatch {
    transition: transform 0.2s ease-out;
  }
  
  .color-swatch:hover {
    transform: translateY(-2px);
  }
  
  .shadow-demo {
    background: var(--colors-gray-50);
    padding: var(--spacing-xl);
    border-radius: var(--radius-md);
  }
</style>