<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { Copy, Check, X } from 'lucide-svelte';

  let isModifierKeyPressed = false;
  let inspectedElement: HTMLElement | null = null;
  let classString = '';
  let copied = false;
  let labelX = 0;
  let labelY = 0;

  function updateLabelPosition() {
    if (!inspectedElement) return;
    
    const rect = inspectedElement.getBoundingClientRect();
    labelX = rect.left;
    labelY = rect.top - 40; // 40px above element
    
    // Ensure label doesn't go off screen
    if (labelY < 10) {
      labelY = rect.bottom + 10; // Below element if no space above
    }
    if (labelX < 10) {
      labelX = 10; // Minimum left margin
    }
  }

  function handleElementHover(event: MouseEvent) {
    if (!isModifierKeyPressed) return;
    
    const target = event.target as HTMLElement;
    if (!target || target.closest('.class-inspector')) {
      return;
    }

    // Remove previous highlight
    removeHighlight();
    
    // Set new inspected element
    inspectedElement = target;
    target.classList.add('inspector-highlight');
    
    // Get class string
    const classes = Array.from(target.classList).filter(cls => cls !== 'inspector-highlight');
    classString = classes.join(' ');
    
    // Update label position
    updateLabelPosition();
    
    // Reset copied state when showing new element
    copied = false;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Meta' || event.key === 'Control') {
      isModifierKeyPressed = true;
      document.body.classList.add('inspector-enabled');
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Meta' || event.key === 'Control') {
      isModifierKeyPressed = false;
      document.body.classList.remove('inspector-enabled');
      removeHighlight();
    }
  }

  function handleScroll() {
    if (inspectedElement) {
      updateLabelPosition();
    }
  }

  function copyClasses() {
    if (classString) {
      navigator.clipboard.writeText(classString);
      copied = true;
      setTimeout(() => copied = false, 1500);
    }
  }

  function removeHighlight() {
    if (inspectedElement) {
      inspectedElement.classList.remove('inspector-highlight');
    }
    inspectedElement = null;
    classString = '';
  }


  function closeInspector() {
    removeHighlight();
  }

  onMount(() => {
    document.addEventListener('mouseover', handleElementHover, true);
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('keyup', handleKeyUp, true);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      document.removeEventListener('mouseover', handleElementHover, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('keyup', handleKeyUp, true);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
      document.body.classList.remove('inspector-enabled');
      removeHighlight();
    };
  });
</script>

<!-- Permanent Indicator -->
<div class="class-inspector fixed bottom(lg) right(lg) z(100)">
  <div class="{isModifierKeyPressed ? 'bg(green-600) c(white)' : 'bg(gray-700) c(gray-300)'} px(md) py(sm) r(md) shadow(lg) text(xs) transition-all duration(200ms) hbox gap(xs) items(center)">
    <span class="text(xs)">Class Inspector:</span>
    <kbd class="bg({isModifierKeyPressed ? 'green-500' : 'gray-600'}) c(white) px(xs) py(xxs) r(xs) font(mono) text(xxs) transition-all duration(200ms)">
      {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}
    </kbd>
    <span class="text(xs)">+ hover</span>
  </div>
</div>

<!-- Fixed Class Label -->
{#if isModifierKeyPressed && classString && inspectedElement}
  <div 
    class="class-inspector fixed z(200) bg(gray-900) c(white) px(sm) py(xs) r(sm) 
           shadow(lg) font(mono) text(xs) max-w(600px) overflow(hidden) hbox gap(xs) items(center)"
    style="left: {labelX}px; top: {labelY}px;"
    in:fade="{{ duration: 200 }}"
  >
    {#if copied}
      <Check size="12" class="c(green-400) shrink(0)" />
      <span class="c(green-400) text(xs)">Copied!</span>
    {:else}
      <span class="truncate text(xs)">{classString || 'No classes'}</span>
      <button 
        class="p(xs) hover:bg(gray-700) r(xs) transition shrink(0)"
        on:click={copyClasses}
        title="Copy classes"
      >
        <Copy size="12" class="c(gray-400)" />
      </button>
    {/if}
    <button 
      class="p(xs) hover:bg(gray-700) r(xs) transition shrink(0)"
      on:click={closeInspector}
      title="Close"
    >
      <X size="10" class="c(gray-400)" />
    </button>
  </div>
{/if}

<style>
  :global(body.inspector-enabled) {
    cursor: crosshair !important;
  }
  
  :global(.inspector-highlight) {
    outline: 2px solid #8b5cf6 !important;
    outline-offset: 2px !important;
    background-color: rgba(139, 92, 246, 0.05) !important;
  }
  
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>