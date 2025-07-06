<script lang="ts">
  import { Type, Hash, AlignLeft, Minus, Heading1, Type as TypeIcon, FileText, Tag, MessageSquare, Info, Palette, Star, Heart, Zap, Shield, AlertTriangle, X } from 'lucide-svelte';
  import { Card } from '$lib/components/ui';

  // Semantic color system
  const semanticColors = [
    {
      name: 'Primary',
      description: 'Main brand color for primary actions and emphasis',
      usage: 'Buttons, links, focus states, important UI elements',
      colors: {
        50: 'indigo-50',
        100: 'indigo-100', 
        200: 'indigo-200',
        300: 'indigo-300',
        400: 'indigo-400',
        500: 'indigo-500',
        600: 'indigo-600',
        700: 'indigo-700',
        800: 'indigo-800',
        900: 'indigo-900',
        950: 'indigo-950'
      }
    },
    {
      name: 'Secondary',
      description: 'Supporting color for secondary actions and content',
      usage: 'Secondary buttons, inactive states, supporting text',
      colors: {
        50: 'slate-50',
        100: 'slate-100',
        200: 'slate-200', 
        300: 'slate-300',
        400: 'slate-400',
        500: 'slate-500',
        600: 'slate-600',
        700: 'slate-700',
        800: 'slate-800',
        900: 'slate-900',
        950: 'slate-950'
      }
    },
    {
      name: 'Success',
      description: 'Positive states and successful actions',
      usage: 'Success messages, confirmations, positive indicators',
      colors: {
        50: 'emerald-50',
        100: 'emerald-100',
        200: 'emerald-200',
        300: 'emerald-300', 
        400: 'emerald-400',
        500: 'emerald-500',
        600: 'emerald-600',
        700: 'emerald-700',
        800: 'emerald-800',
        900: 'emerald-900',
        950: 'emerald-950'
      }
    },
    {
      name: 'Warning',
      description: 'Caution states and important notices',
      usage: 'Warning messages, attention-needed states, important alerts',
      colors: {
        50: 'amber-50',
        100: 'amber-100',
        200: 'amber-200',
        300: 'amber-300',
        400: 'amber-400',
        500: 'amber-500',
        600: 'amber-600',
        700: 'amber-700',
        800: 'amber-800',
        900: 'amber-900',
        950: 'amber-950'
      }
    },
    {
      name: 'Error',
      description: 'Error states and destructive actions',
      usage: 'Error messages, destructive buttons, invalid states',
      colors: {
        50: 'red-50',
        100: 'red-100',
        200: 'red-200',
        300: 'red-300',
        400: 'red-400',
        500: 'red-500',
        600: 'red-600',
        700: 'red-700',
        800: 'red-800',
        900: 'red-900',
        950: 'red-950'
      }
    },
    {
      name: 'Info',
      description: 'Informational states and neutral notices',
      usage: 'Info messages, tips, neutral notifications',
      colors: {
        50: 'sky-50',
        100: 'sky-100',
        200: 'sky-200',
        300: 'sky-300',
        400: 'sky-400',
        500: 'sky-500',
        600: 'sky-600',
        700: 'sky-700',
        800: 'sky-800',
        900: 'sky-900',
        950: 'sky-950'
      }
    }
  ];

  // Brand gradient examples
  const brandGradients = [
    {
      name: 'Primary Gradient',
      gradient: 'bg(to-r/indigo-500..violet-500)',
      usage: 'Hero sections, call-to-action buttons',
      colors: ['indigo-500', 'violet-500']
    },
    {
      name: 'Success Gradient', 
      gradient: 'bg(to-r/emerald-500..teal-500)',
      usage: 'Success states, positive confirmations',
      colors: ['emerald-500', 'teal-500']
    },
    {
      name: 'Warning Gradient',
      gradient: 'bg(to-r/amber-500..orange-500)',
      usage: 'Warnings, important notices',
      colors: ['amber-500', 'orange-500']
    }
  ];

  // Text hierarchy colors
  const textHierarchy = [
    {
      name: 'Primary Text',
      color: 'gray-900',
      usage: 'Main headings, important content',
      description: 'Highest contrast for primary content'
    },
    {
      name: 'Secondary Text',
      color: 'gray-700', 
      usage: 'Subheadings, secondary content',
      description: 'Medium contrast for supporting content'
    },
    {
      name: 'Tertiary Text',
      color: 'gray-600',
      usage: 'Body text, descriptions',
      description: 'Standard contrast for regular content'
    },
    {
      name: 'Subtle Text',
      color: 'gray-500',
      usage: 'Captions, labels, placeholders',
      description: 'Lower contrast for subtle content'
    }
  ];

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }
</script>

<div class="vbox gap(4xl)">
  <!-- Section Header -->
  <div class="text(center)">
    <div class="hbox(pack) gap(sm)">
      <Palette size="2xl" class="c(primary)" />
      <h1 class="display(lg) gradient">Semantic Color System</h1>
    </div>
    <p class="body(lg) c(neutral-600) max-w(4xl) mx(auto) pt(xl)">
      A comprehensive semantic color system that provides meaning and context to your interface colors. 
      Built on OKLCH for perceptual uniformity and accessibility.
    </p>
  </div>

  <!-- Semantic Colors -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Semantic Colors</h2>
      <p class="body(md) c(gray-600)">
        Each semantic color provides clear meaning and context, with a full shade range for flexibility.
      </p>
    </div>

    <div class="vbox gap(2xl)">
      {#each semanticColors as semantic}
        <Card size="lg" class="overflow(hidden)">
          <div class="vbox gap(xl)">
            <!-- Header -->
            <div class="vbox gap(sm)">
              <h3 class="title(lg) c(gray-900)">{semantic.name}</h3>
              <p class="body(sm) c(gray-600)">{semantic.description}</p>
              <div class="caption c(gray-500)">
                <strong>Usage:</strong> {semantic.usage}
              </div>
            </div>

            <!-- Color Scale -->
            <div class="grid(11) gap(xs)">
              {#each Object.entries(semantic.colors) as [shade, colorClass]}
                <button
                  class="group vbox gap(xs) text(center) transition-all hover:scale(105)"
                  on:click={() => copyToClipboard(`c(${colorClass})`)}
                >
                  <div 
                    class="aspect-ratio(1/1) r(md) bg({colorClass}) border(1/gray-200) group-hover:shadow(md) transition-all"
                  ></div>
                  <div class="caption c(gray-600)">{shade}</div>
                </button>
              {/each}
            </div>

            <!-- Usage Examples -->
            <div class="hbox gap(md) flex-wrap">
              <div class="px(md) py(sm) bg({semantic.colors[100]) c({semantic.colors[700]}) r(md) caption">
                Background
              </div>
              <div class="px(md) py(sm) bg({semantic.colors[500]) c(white) r(md) caption">
                Primary
              </div>
              <div class="px(md) py(sm) bg({semantic.colors[700]) c(white) r(md) caption">
                Hover
              </div>
            </div>
          </div>
        </Card>
      {/each}
    </div>
  </div>

  <!-- Brand Gradients -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Brand Gradients</h2>
      <p class="body(md) c(gray-600)">
        Pre-designed gradient combinations for impactful brand moments.
      </p>
    </div>

    <div class="grid(3) gap(xl)">
      {#each brandGradients as gradient}
        <Card size="lg" class="overflow(hidden)">
          <div class="vbox gap(lg)">
            <div 
              class="h(7xl) r(lg) {gradient.gradient} hbox(center) text(center)"
            >
              <div class="c(white) vbox gap(xs)">
                <div class="title(lg)">{gradient.name}</div>
                <div class="caption opacity(80)">{gradient.usage}</div>
              </div>
            </div>
            
            <div class="vbox gap(sm)">
              <div class="caption c(gray-700)">CSS Class:</div>
              <code 
                class="mono caption bg(gray-50) p(sm) r(sm) cursor(pointer) hover:bg(gray-100) transition"
                on:click={() => copyToClipboard(gradient.gradient)}
              >
                {gradient.gradient}
              </code>
            </div>
          </div>
        </Card>
      {/each}
    </div>
  </div>

  <!-- Text Hierarchy -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Text Color Hierarchy</h2>
      <p class="body(md) c(gray-600)">
        Consistent text color hierarchy for optimal readability and visual hierarchy.
      </p>
    </div>

    <div class="grid(2) gap(xl)">
      {#each textHierarchy as text}
        <Card size="lg">
          <div class="vbox gap(lg)">
            <div class="hbox gap(lg) items(center)">
              <div 
                class="w(3xl) h(3xl) r(lg) bg({text.color}) flex(center)"
              >
                <Type size="lg" class="c(white)" />
              </div>
              <div class="vbox gap(xs)">
                <div class="title(md) c({text.color})">{text.name}</div>
                <div class="caption c(gray-600)">{text.description}</div>
              </div>
            </div>
            
            <div class="vbox gap(sm)">
              <div class="body(sm) c({text.color})">
                {text.usage}
              </div>
              <code 
                class="mono caption bg(gray-50) p(sm) r(sm) cursor(pointer) hover:bg(gray-100) transition"
                on:click={() => copyToClipboard(`c(${text.color})`)}
              >
                c({text.color})
              </code>
            </div>
          </div>
        </Card>
      {/each}
    </div>
  </div>

  <!-- Implementation Guide -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Implementation Guide</h2>
      <p class="body(md) c(gray-600)">
        Best practices for using semantic colors in your design system.
      </p>
    </div>

    <div class="grid(2) gap(xl)">
      <!-- Do's -->
      <Card size="lg" class="border(2/emerald-200) bg(emerald-50)">
        <div class="vbox gap(lg)">
          <div class="hbox gap(sm) items(center)">
            <Shield size="xl" class="c(emerald-600)" />
            <div class="title(md) c(emerald-900)">Do's</div>
          </div>
          
          <div class="vbox gap(md)">
            <div class="body(sm) c(emerald-800)">
              ✓ Use semantic colors for their intended purpose
            </div>
            <div class="body(sm) c(emerald-800)">
              ✓ Maintain consistent usage across your application
            </div>
            <div class="body(sm) c(emerald-800)">
              ✓ Test color combinations for accessibility
            </div>
            <div class="body(sm) c(emerald-800)">
              ✓ Use lighter shades for backgrounds, darker for text
            </div>
          </div>
        </div>
      </Card>

      <!-- Don'ts -->
      <Card size="lg" class="border(2/red-200) bg(red-50)">
        <div class="vbox gap(lg)">
          <div class="hbox gap(sm) items(center)">
            <AlertTriangle size="xl" class="c(red-600)" />
            <div class="title(md) c(red-900)">Don'ts</div>
          </div>
          
          <div class="vbox gap(md)">
            <div class="body(sm) c(red-800)">
              ✗ Don't use error colors for positive actions
            </div>
            <div class="body(sm) c(red-800)">
              ✗ Don't mix semantic meanings within components
            </div>
            <div class="body(sm) c(red-800)">
              ✗ Don't use too many semantic colors at once
            </div>
            <div class="body(sm) c(red-800)">
              ✗ Don't ignore accessibility contrast requirements
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</div>