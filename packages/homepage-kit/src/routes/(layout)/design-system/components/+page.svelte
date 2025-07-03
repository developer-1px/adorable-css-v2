<script>
  import { onMount } from 'svelte';
  
  let selectedSize = 'md';
  let selectedVariant = 'primary';
  let isLoading = false;
  
  const buttonSizes = {
    sm: 'px(md) py(sm) text(sm)',
    md: 'px(xl) py(md) text(base)',
    lg: 'px(2xl) py(lg) text(lg)',
  };
  
  const buttonVariants = {
    primary: 'bg(primary) c(white) hover:bg(primary-600) active:bg(primary-700)',
    secondary: 'bg(gray-100) c(gray-700) hover:bg(gray-200) active:bg(gray-300)',
    ghost: 'bg(transparent) c(gray-700) hover:bg(gray-100) active:bg(gray-200)',
    danger: 'bg(red-500) c(white) hover:bg(red-600) active:bg(red-700)',
    success: 'bg(green-500) c(white) hover:bg(green-600) active:bg(green-700)',
  };
  
  const inputStates = [
    { label: 'Default', class: '', value: 'hello@example.com' },
    { label: 'Focused', class: 'ring(2/4/primary.2) border(primary)', value: 'hello@example.com' },
    { label: 'Error', class: 'border(red-500) ring(2/4/red.2)', value: 'invalid-email' },
    { label: 'Disabled', class: 'bg(gray-50) c(gray-400) cursor(not-allowed)', value: 'disabled@example.com', disabled: true },
  ];
  
  const cardVariants = [
    { name: 'Default', class: 'bg(white) border(1/gray-200)' },
    { name: 'Elevated', class: 'bg(white) shadow(md) hover:shadow(lg)' },
    { name: 'Interactive', class: 'bg(white) border(1/gray-200) hover:border(primary) hover:shadow(md) cursor(pointer)' },
    { name: 'Gradient', class: 'bg(gradient) c(white) border(none)' },
  ];
  
  const badges = [
    { label: 'New', class: 'bg(blue-100) c(blue-700)' },
    { label: 'Sale', class: 'bg(red-100) c(red-700)' },
    { label: 'Pro', class: 'bg(purple-100) c(purple-700)' },
    { label: 'Beta', class: 'bg(amber-100) c(amber-700)' },
  ];
  
  const alerts = [
    { 
      type: 'info',
      icon: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>`,
      title: 'Information',
      message: 'This is an informational message to keep you updated.',
      class: 'bg(blue-50) border(blue-200) c(blue-700)'
    },
    {
      type: 'success',
      icon: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>`,
      title: 'Success!',
      message: 'Your changes have been saved successfully.',
      class: 'bg(green-50) border(green-200) c(green-700)'
    },
    {
      type: 'warning',
      icon: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`,
      title: 'Warning',
      message: 'Please review your input before proceeding.',
      class: 'bg(amber-50) border(amber-200) c(amber-700)'
    },
    {
      type: 'error',
      icon: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>`,
      title: 'Error',
      message: 'Something went wrong. Please try again.',
      class: 'bg(red-50) border(red-200) c(red-700)'
    }
  ];
  
  const toggleStates = [
    { checked: false, label: 'Unchecked' },
    { checked: true, label: 'Checked' },
  ];
</script>

<div class="vbox gap(4xl) py(4xl)">
  <!-- Header -->
  <section class="vbox gap(xl) container(7xl) mx(auto) px(2xl)">
    <h1 class="display(lg) bold(800)">Component Showcase</h1>
    <p class="title(lg) c(muted) max-w(3xl)">
      재사용 가능한 컴포넌트들의 모든 변형과 상태를 확인하세요
    </p>
  </section>

  <!-- Buttons -->
  <section class="vbox gap(2xl) container(7xl) mx(auto) px(2xl)">
    <h2 class="heading(lg) bold(700)">Buttons</h2>
    
    <!-- Interactive Controls -->
    <div class="hbox gap(2xl) p(xl) r(lg) bg(gray-50) border(1/gray-200)">
      <div class="vbox gap(md)">
        <label class="label(md) c(gray-700)">Size</label>
        <select 
          bind:value={selectedSize}
          class="px(md) py(sm) r(md) border(1/gray-300) bg(white)"
        >
          {#each Object.keys(buttonSizes) as size}
            <option value={size}>{size}</option>
          {/each}
        </select>
      </div>
      
      <div class="vbox gap(md)">
        <label class="label(md) c(gray-700)">Variant</label>
        <select 
          bind:value={selectedVariant}
          class="px(md) py(sm) r(md) border(1/gray-300) bg(white)"
        >
          {#each Object.keys(buttonVariants) as variant}
            <option value={variant}>{variant}</option>
          {/each}
        </select>
      </div>
    </div>
    
    <!-- Button Preview -->
    <div class="p(3xl) r(xl) bg(white) border(1/gray-200) hbox(center/middle)">
      <button 
        class="{buttonSizes[selectedSize]} {buttonVariants[selectedVariant]} r(md) bold(500) transition interactive(3)"
        on:click={() => alert('Button clicked!')}
      >
        Button Text
      </button>
    </div>
    
    <!-- All Variants -->
    <div class="vbox gap(xl)">
      <h3 class="title(md) bold(600)">모든 버튼 변형</h3>
      <div class="grid(3) gap(xl)">
        {#each Object.entries(buttonVariants) as [variant, variantClass]}
          <div class="vbox gap(md)">
            <p class="label(sm) c(muted) capitalize">{variant}</p>
            <div class="hbox gap(md)">
              {#each Object.entries(buttonSizes) as [size, sizeClass]}
                <button 
                  class="{sizeClass} {variantClass} r(md) bold(500) transition interactive(2)"
                >
                  {size}
                </button>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Button States -->
    <div class="vbox gap(xl)">
      <h3 class="title(md) bold(600)">버튼 상태</h3>
      <div class="hbox gap(lg)">
        <button class="px(xl) py(md) r(md) bg(primary) c(white) bold(500) hover:bg(primary-600) transition">
          Normal
        </button>
        <button class="px(xl) py(md) r(md) bg(primary-600) c(white) bold(500) ring(2/4/primary.3)">
          Focused
        </button>
        <button class="px(xl) py(md) r(md) bg(gray-100) c(gray-400) bold(500) cursor(not-allowed)" disabled>
          Disabled
        </button>
        <button class="px(xl) py(md) r(md) bg(primary) c(white) bold(500) hbox gap(sm) items(center)">
          <span class="animate(spin) size(16)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v4m0 12v4m10-10h-4M6 12H2"/>
            </svg>
          </span>
          Loading
        </button>
      </div>
    </div>
  </section>

  <!-- Form Elements -->
  <section class="vbox gap(2xl) container(7xl) mx(auto) px(2xl) border(t/1/gray-200) pt(4xl)">
    <h2 class="heading(lg) bold(700)">Form Elements</h2>
    
    <!-- Text Inputs -->
    <div class="vbox gap(xl)">
      <h3 class="title(md) bold(600)">Text Inputs</h3>
      <div class="grid(2) gap(xl)">
        {#each inputStates as state}
          <div class="vbox gap(sm)">
            <label class="label(md) c(gray-700)">{state.label}</label>
            <input 
              type="email"
              value={state.value}
              disabled={state.disabled}
              class="w(full) px(lg) py(md) r(md) border(1/gray-300) transition {state.class}"
              placeholder="Enter your email"
            />
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Select -->
    <div class="vbox gap(xl)">
      <h3 class="title(md) bold(600)">Select Dropdown</h3>
      <div class="max-w(md)">
        <label class="label(md) c(gray-700)">Choose an option</label>
        <select class="w(full) px(lg) py(md) r(md) border(1/gray-300) bg(white) focus:border(primary) focus:ring(2/4/primary.2) transition">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
    </div>
    
    <!-- Textarea -->
    <div class="vbox gap(xl)">
      <h3 class="title(md) bold(600)">Textarea</h3>
      <div class="max-w(md)">
        <label class="label(md) c(gray-700)">Description</label>
        <textarea 
          rows="4"
          class="w(full) px(lg) py(md) r(md) border(1/gray-300) focus:border(primary) focus:ring(2/4/primary.2) transition resize(vertical)"
          placeholder="Enter a description..."
        ></textarea>
      </div>
    </div>
    
    <!-- Checkbox and Radio -->
    <div class="grid(2) gap(xl)">
      <div class="vbox gap(md)">
        <h3 class="title(md) bold(600)">Checkboxes</h3>
        <div class="vbox gap(sm)">
          <label class="hbox gap(sm) items(center) cursor(pointer)">
            <input type="checkbox" class="size(20) r(sm) border(1/gray-300) c(primary)" />
            <span class="body(md)">Option 1</span>
          </label>
          <label class="hbox gap(sm) items(center) cursor(pointer)">
            <input type="checkbox" checked class="size(20) r(sm) border(1/gray-300) c(primary)" />
            <span class="body(md)">Option 2 (checked)</span>
          </label>
          <label class="hbox gap(sm) items(center) cursor(pointer)">
            <input type="checkbox" disabled class="size(20) r(sm) border(1/gray-300) c(gray-300)" />
            <span class="body(md) c(gray-400)">Option 3 (disabled)</span>
          </label>
        </div>
      </div>
      
      <div class="vbox gap(md)">
        <h3 class="title(md) bold(600)">Radio Buttons</h3>
        <div class="vbox gap(sm)">
          <label class="hbox gap(sm) items(center) cursor(pointer)">
            <input type="radio" name="radio-group" class="size(20) border(1/gray-300) c(primary)" />
            <span class="body(md)">Option A</span>
          </label>
          <label class="hbox gap(sm) items(center) cursor(pointer)">
            <input type="radio" name="radio-group" checked class="size(20) border(1/gray-300) c(primary)" />
            <span class="body(md)">Option B (selected)</span>
          </label>
          <label class="hbox gap(sm) items(center) cursor(pointer)">
            <input type="radio" name="radio-group" disabled class="size(20) border(1/gray-300) c(gray-300)" />
            <span class="body(md) c(gray-400)">Option C (disabled)</span>
          </label>
        </div>
      </div>
    </div>
  </section>

  <!-- Cards -->
  <section class="vbox gap(2xl) container(7xl) mx(auto) px(2xl) border(t/1/gray-200) pt(4xl)">
    <h2 class="heading(lg) bold(700)">Cards</h2>
    
    <div class="grid(2) gap(xl)">
      {#each cardVariants as variant}
        <div class="vbox gap(lg) p(2xl) r(lg) transition {variant.class}">
          <h3 class="title(lg) bold(600)">{variant.name} Card</h3>
          <p class="body(md) c(muted)">
            This is a {variant.name.toLowerCase()} card variant demonstrating different visual styles and interactions.
          </p>
          <button class="mt(md) px(lg) py(sm) r(md) bg(primary) c(white) bold(500) hover:bg(primary-600) transition w(fit)">
            Learn More
          </button>
        </div>
      {/each}
    </div>
  </section>

  <!-- Badges -->
  <section class="vbox gap(2xl) container(7xl) mx(auto) px(2xl) border(t/1/gray-200) pt(4xl)">
    <h2 class="heading(lg) bold(700)">Badges & Tags</h2>
    
    <div class="vbox gap(xl)">
      <div class="hbox gap(md) flex-wrap">
        {#each badges as badge}
          <span class="px(md) py(xs) r(full) text(sm) bold(500) {badge.class}">
            {badge.label}
          </span>
        {/each}
      </div>
      
      <div class="hbox gap(md) flex-wrap">
        <span class="px(lg) py(sm) r(md) bg(gray-100) c(gray-700) text(sm) bold(500)">Default</span>
        <span class="px(lg) py(sm) r(md) bg(primary.1) c(primary) text(sm) bold(500)">Primary</span>
        <span class="px(lg) py(sm) r(md) bg(green-100) c(green-700) text(sm) bold(500) hbox gap(xs) items(center)">
          <svg class="size(14)" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          Success
        </span>
      </div>
    </div>
  </section>

  <!-- Alerts -->
  <section class="vbox gap(2xl) container(7xl) mx(auto) px(2xl) border(t/1/gray-200) pt(4xl)">
    <h2 class="heading(lg) bold(700)">Alerts</h2>
    
    <div class="vbox gap(xl)">
      {#each alerts as alert}
        <div class="hbox gap(lg) p(lg) r(lg) border(1) {alert.class}">
          <div class="size(20) flex-shrink(0)">
            {@html alert.icon}
          </div>
          <div class="vbox gap(xs) flex(1)">
            <h4 class="title(sm) bold(600)">{alert.title}</h4>
            <p class="body(sm)">{alert.message}</p>
          </div>
          <button class="p(sm) hover:bg(black.1) r(md) transition">
            <svg class="size(16)" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      {/each}
    </div>
  </section>

  <!-- Navigation -->
  <section class="vbox gap(2xl) container(7xl) mx(auto) px(2xl) border(t/1/gray-200) pt(4xl)">
    <h2 class="heading(lg) bold(700)">Navigation</h2>
    
    <!-- Tabs -->
    <div class="vbox gap(xl)">
      <h3 class="title(md) bold(600)">Tabs</h3>
      <div class="border(b/1/gray-200)">
        <nav class="hbox gap(0)">
          <button class="px(xl) py(md) border(b/2/primary) c(primary) bold(600)">Active</button>
          <button class="px(xl) py(md) border(b/2/transparent) c(gray-600) hover:c(gray-900) transition">Tab 2</button>
          <button class="px(xl) py(md) border(b/2/transparent) c(gray-600) hover:c(gray-900) transition">Tab 3</button>
        </nav>
      </div>
    </div>
    
    <!-- Breadcrumbs -->
    <div class="vbox gap(xl)">
      <h3 class="title(md) bold(600)">Breadcrumbs</h3>
      <nav class="hbox gap(sm) items(center) text(sm)">
        <a href="/packages/homepage-kit/static" class="c(gray-600) hover:c(primary) transition">Home</a>
        <span class="c(gray-400)">/</span>
        <a href="/design-system" class="c(gray-600) hover:c(primary) transition">Design System</a>
        <span class="c(gray-400)">/</span>
        <span class="c(gray-900) bold(500)">Components</span>
      </nav>
    </div>
    
    <!-- Pagination -->
    <div class="vbox gap(xl)">
      <h3 class="title(md) bold(600)">Pagination</h3>
      <div class="hbox gap(sm)">
        <button class="px(md) py(sm) r(md) border(1/gray-300) c(gray-600) hover:bg(gray-50) transition">
          Previous
        </button>
        <button class="size(40) r(md) bg(primary) c(white) bold(500)">1</button>
        <button class="size(40) r(md) border(1/gray-300) c(gray-600) hover:bg(gray-50) transition">2</button>
        <button class="size(40) r(md) border(1/gray-300) c(gray-600) hover:bg(gray-50) transition">3</button>
        <span class="px(md) hbox(middle) c(gray-400)">...</span>
        <button class="size(40) r(md) border(1/gray-300) c(gray-600) hover:bg(gray-50) transition">10</button>
        <button class="px(md) py(sm) r(md) border(1/gray-300) c(gray-600) hover:bg(gray-50) transition">
          Next
        </button>
      </div>
    </div>
  </section>

  <!-- Modals -->
  <section class="vbox gap(2xl) container(7xl) mx(auto) px(2xl) border(t/1/gray-200) pt(4xl)">
    <h2 class="heading(lg) bold(700)">Modals & Overlays</h2>
    
    <div class="p(3xl) r(lg) bg(gray-50) border(1/gray-200)">
      <div class="max-w(lg) mx(auto) bg(white) r(xl) shadow(2xl) overflow(hidden)">
        <div class="hbox(between) p(xl) border(b/1/gray-200)">
          <h3 class="title(lg) bold(600)">Modal Title</h3>
          <button class="p(sm) hover:bg(gray-100) r(md) transition">
            <svg class="size(20)" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
        <div class="p(xl)">
          <p class="body(md) c(gray-600)">
            This is a modal dialog example. Modals are used for important interactions that require user attention.
          </p>
        </div>
        <div class="hbox(end) gap(md) p(xl) bg(gray-50) border(t/1/gray-200)">
          <button class="px(lg) py(md) r(md) border(1/gray-300) c(gray-700) hover:bg(gray-100) transition">
            Cancel
          </button>
          <button class="px(lg) py(md) r(md) bg(primary) c(white) bold(500) hover:bg(primary-600) transition">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </section>
</div>