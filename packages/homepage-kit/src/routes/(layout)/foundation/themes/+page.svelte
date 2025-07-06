<script lang="ts">
  import { Paintbrush, Sun, Moon, Monitor, Palette, Star } from 'lucide-svelte';
  // import { Card } from '$lib/components/ui';

  // Theme configurations
  const themes = [
    {
      name: 'Light',
      id: 'light',
      primary: 'indigo-600',
      background: 'white',
      text: 'gray-900',
      border: 'gray-200',
      description: 'Clean and bright theme for optimal readability',
      icon: Sun
    },
    {
      name: 'Dark',
      id: 'dark', 
      primary: 'indigo-400',
      background: 'gray-900',
      text: 'gray-100',
      border: 'gray-700',
      description: 'Easy on the eyes for extended use',
      icon: Moon
    },
    {
      name: 'System',
      id: 'system',
      primary: 'indigo-500',
      background: 'adaptive',
      text: 'adaptive',
      border: 'adaptive',
      description: 'Follows system appearance preference',
      icon: Monitor
    }
  ];

  // Brand color configurations
  const brandColors = [
    {
      name: 'Primary Brand',
      colors: ['indigo-600', 'violet-500'],
      gradient: 'bg(to-r/indigo-600..violet-500)',
      usage: 'Main brand identity, primary actions'
    },
    {
      name: 'Success Brand',
      colors: ['emerald-600', 'teal-500'],
      gradient: 'bg(to-r/emerald-600..teal-500)',
      usage: 'Success states, positive feedback'
    },
    {
      name: 'Warning Brand', 
      colors: ['amber-500', 'orange-500'],
      gradient: 'bg(to-r/amber-500..orange-500)',
      usage: 'Warnings, important notices'
    }
  ];

  // Color token examples
  const colorTokens = [
    { token: 'primary', value: 'var(--color-primary)', usage: 'Main brand color' },
    { token: 'primary-contrast', value: 'var(--color-primary-contrast)', usage: 'Text on primary background' },
    { token: 'background', value: 'var(--color-background)', usage: 'Page background' },
    { token: 'surface', value: 'var(--color-surface)', usage: 'Card and container background' },
    { token: 'text-primary', value: 'var(--color-text-primary)', usage: 'Main text color' },
    { token: 'text-secondary', value: 'var(--color-text-secondary)', usage: 'Secondary text color' },
    { token: 'border', value: 'var(--color-border)', usage: 'Border and divider color' }
  ];

  let selectedTheme = 'light';
</script>

<svelte:head>
  <title>Themes & Branding - AdorableCSS Foundation</title>
  <meta name="description" content="Theme system and brand color configurations for consistent visual identity across your application." />
</svelte:head>

<div class="vbox gap(4xl)">
  <!-- Section Header -->
  <div class="text(center)">
    <div class="hbox(pack) gap(sm)">
      <Paintbrush size="32" class="c(primary)" />
      <h1 class="display(lg) gradient">Themes & Branding</h1>
    </div>
    <p class="body(lg) c(neutral-600) max-w(4xl) mx(auto) pt(xl)">
      Systematic theming and brand color management. Create consistent visual identity 
      that adapts to user preferences and brand requirements.
    </p>
  </div>

  <!-- Theme System -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Theme System</h2>
      <p class="body(md) c(gray-600)">
        Flexible theme system supporting light, dark, and system preferences with smooth transitions.
      </p>
    </div>

    <div class="grid(3) gap(xl)">
      {#each themes as theme}
        <Card 
          size="lg" 
          class="cursor(pointer) transition-all hover:scale(102) border(2/{theme.id === selectedTheme ? 'primary-300' : 'gray-200'})"
          on:click={() => selectedTheme = theme.id}
        >
          <div class="vbox gap(lg)">
            <!-- Theme Preview -->
            <div 
              class="h(120) r(lg) overflow(hidden) border(1/gray-200)"
              class:bg(white)={theme.id === 'light'}
              class:bg(gray-900)={theme.id === 'dark'}
              class:bg(gray-100)={theme.id === 'system'}
            >
              <div class="p(lg) h(full) vbox gap(sm)">
                <div class="hbox(between) items(center)">
                  <svelte:component 
                    this={theme.icon} 
                    size="24" 
                    class="c({theme.id === 'dark' ? 'gray-300' : 'gray-600'})" 
                  />
                  <div 
                    class="w(12) h(12) r(full) bg({theme.primary})"
                  ></div>
                </div>
                <div 
                  class="title(sm) c({theme.id === 'dark' ? 'gray-100' : 'gray-900'})"
                >
                  {theme.name} Theme
                </div>
                <div 
                  class="body(xs) c({theme.id === 'dark' ? 'gray-400' : 'gray-600'})"
                >
                  Sample content with theme colors
                </div>
              </div>
            </div>

            <!-- Theme Info -->
            <div class="vbox gap(sm)">
              <div class="title(md) c(gray-900)">{theme.name}</div>
              <div class="body(sm) c(gray-600)">{theme.description}</div>
            </div>

            <!-- Theme Properties -->
            <div class="vbox gap(xs)">
              <div class="caption c(gray-700)">Primary: <code class="mono">c({theme.primary})</code></div>
              <div class="caption c(gray-700)">Background: <code class="mono">{theme.background}</code></div>
              <div class="caption c(gray-700)">Text: <code class="mono">{theme.text}</code></div>
            </div>
          </div>
        </Card>
      {/each}
    </div>
  </div>

  <!-- Brand Colors -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Brand Colors</h2>
      <p class="body(md) c(gray-600)">
        Consistent brand color application across themes and components.
      </p>
    </div>

    <div class="grid(3) gap(xl)">
      {#each brandColors as brand}
        <Card size="lg" class="overflow(hidden)">
          <div class="vbox gap(lg)">
            <!-- Brand Preview -->
            <div class="h(100) r(lg) {brand.gradient} hbox(center)">
              <div class="c(white) text(center) vbox gap(xs)">
                <Palette size="24" />
                <div class="title(sm)">{brand.name}</div>
              </div>
            </div>

            <!-- Brand Info -->
            <div class="vbox gap(sm)">
              <div class="body(sm) c(gray-600)">{brand.usage}</div>
              
              <!-- Color Values -->
              <div class="hbox gap(sm)">
                {#each brand.colors as color}
                  <div class="vbox gap(xs) text(center)">
                    <div class="w(32) h(32) r(md) bg({color}) border(1/gray-200)"></div>
                    <code class="mono caption">{color}</code>
                  </div>
                {/each}
              </div>

              <!-- CSS Class -->
              <code class="mono caption bg(gray-50) p(sm) r(sm)">
                {brand.gradient}
              </code>
            </div>
          </div>
        </Card>
      {/each}
    </div>
  </div>

  <!-- Color Tokens -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Theme Color Tokens</h2>
      <p class="body(md) c(gray-600)">
        Semantic color tokens that automatically adapt to the active theme.
      </p>
    </div>

    <div class="grid(2) gap(xl)">
      {#each colorTokens as token}
        <Card size="md">
          <div class="hbox gap(lg) items(center)">
            <div class="w(48) h(48) r(lg) bg(gray-100) border(1/gray-200) flex(center)">
              <Star size="20" class="c(gray-500)" />
            </div>
            
            <div class="vbox gap(xs) flex(1)">
              <div class="title(sm) c(gray-900)">{token.token}</div>
              <div class="body(xs) c(gray-600)">{token.usage}</div>
              <code class="mono caption bg(gray-50) p(xs) r(xs)">{token.value}</code>
            </div>
          </div>
        </Card>
      {/each}
    </div>
  </div>

  <!-- Implementation Guide -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Implementation</h2>
      <p class="body(md) c(gray-600)">
        How to implement and customize themes in your application.
      </p>
    </div>

    <Card size="lg" class="bg(gray-50)">
      <div class="vbox gap(lg)">
        <div class="title(md) c(gray-900)">Theme Configuration</div>
        
        <pre class="mono caption leading(relaxed) overflow(x-auto)"><code>{`// Theme configuration
const themeConfig = {
  light: {
    primary: 'indigo-600',
    background: 'white',
    surface: 'gray-50',
    text: {
      primary: 'gray-900',
      secondary: 'gray-600'
    },
    border: 'gray-200'
  },
  dark: {
    primary: 'indigo-400', 
    background: 'gray-900',
    surface: 'gray-800',
    text: {
      primary: 'gray-100',
      secondary: 'gray-400'
    },
    border: 'gray-700'
  }
};

// Usage in components
<div class="bg(surface) c(text-primary) border(1/border)">
  Theme-aware component
</div>`}</code></pre>
      </div>
    </Card>
  </div>
</div>