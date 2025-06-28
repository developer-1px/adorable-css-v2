<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { Copy, Check, Eye, EyeOff, X } from 'lucide-svelte';

  let isEnabled = false;
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

  function handleElementClick(event: MouseEvent) {
    if (!isEnabled) return;
    
    event.preventDefault();
    event.stopPropagation();
    
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

  function toggleInspector() {
    isEnabled = !isEnabled;
    if (!isEnabled) {
      removeHighlight();
      document.body.classList.remove('inspector-enabled');
    } else {
      document.body.classList.add('inspector-enabled');
    }
  }

  function closeInspector() {
    removeHighlight();
  }

  onMount(() => {
    document.addEventListener('click', handleElementClick, true);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      document.removeEventListener('click', handleElementClick, true);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
      document.body.classList.remove('inspector-enabled');
      removeHighlight();
    };
  });
</script>

<!-- Toggle Button -->
<div class="class-inspector fixed bottom(lg) right(lg) z(100)">
  <button
    class="w(48px) h(48px) r(full) bg(purple-600) hover:bg(purple-700) c(white) 
           shadow(lg) transition hbox(center) {isEnabled ? 'bg(green-600) hover:bg(green-700)' : ''}"
    on:click={toggleInspector}
    title={isEnabled ? 'Disable Class Inspector' : 'Enable Class Inspector'}
  >
    {#if isEnabled}
      <EyeOff size="20" />
    {:else}
      <Eye size="20" />
    {/if}
  </button>
</div>

<!-- Fixed Class Label -->
{#if isEnabled && classString && inspectedElement}
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