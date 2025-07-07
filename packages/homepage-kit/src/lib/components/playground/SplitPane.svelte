<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  export let minLeftWidth = 300;
  export let minRightWidth = 300;
  export let initialLeftWidth = 50; // percentage
  
  let container: HTMLDivElement;
  let isDragging = false;
  let leftWidth = initialLeftWidth;
  
  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    e.preventDefault();
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }
  
  function handleMouseMove(e: MouseEvent) {
    if (!isDragging || !container) return;
    
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const x = e.clientX - containerRect.left;
    
    const minLeftPercent = (minLeftWidth / containerWidth) * 100;
    const minRightPercent = (minRightWidth / containerWidth) * 100;
    
    const newLeftWidth = (x / containerWidth) * 100;
    
    if (newLeftWidth >= minLeftPercent && newLeftWidth <= 100 - minRightPercent) {
      leftWidth = newLeftWidth;
    }
  }
  
  function handleMouseUp() {
    isDragging = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }
  
  onMount(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  });
  
  onDestroy(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  });
</script>

<div bind:this={container} class="split-pane hbox(fill) h(full) relative">
  <div class="split-pane-left vbox" style="width: {leftWidth}%">
    <slot name="left" />
  </div>
  
  <div 
    class="split-pane-divider"
    on:mousedown={handleMouseDown}
    role="separator"
    aria-orientation="vertical"
    aria-label="Resize panels"
  >
    <div class="split-pane-handle"></div>
  </div>
  
  <div class="split-pane-right vbox flex(1)">
    <slot name="right" />
  </div>
</div>

<style>
  .split-pane {
    position: relative;
    overflow: hidden;
  }
  
  .split-pane-left,
  .split-pane-right {
    overflow: hidden;
    position: relative;
  }
  
  .split-pane-divider {
    width: 4px;
    background: #e5e7eb;
    cursor: col-resize;
    position: relative;
    flex-shrink: 0;
    transition: background-color 0.2s;
    border-left: 1px solid #d1d5db;
    border-right: 1px solid #d1d5db;
  }
  
  .split-pane-divider:hover {
    background: #d1d5db;
    border-color: #9ca3af;
  }
  
  .split-pane-divider:hover .split-pane-handle,
  :global(.split-pane-divider:active) .split-pane-handle {
    opacity: 1;
  }
  
  .split-pane-handle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 40px;
    background: #9ca3af;
    border-radius: 3px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  
  @media (max-width: 768px) {
    .split-pane {
      flex-direction: column !important;
    }
    
    .split-pane-left {
      width: 100% !important;
      height: 50%;
    }
    
    .split-pane-divider {
      width: 100%;
      height: 4px;
      cursor: row-resize;
    }
    
    .split-pane-handle {
      width: 40px;
      height: 6px;
    }
  }
</style>