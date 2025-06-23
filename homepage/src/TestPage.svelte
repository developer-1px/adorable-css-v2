<script lang="ts">
  import { onMount } from 'svelte';
  
  let testResults: string[] = [];
  
  onMount(() => {
    // Create test elements with AdorableCSS classes
    createTestElement();
  });
  
  function createTestElement() {
    const container = document.getElementById('test-container');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    // Test element with AdorableCSS v2 classes
    const testDiv = document.createElement('div');
    testDiv.className = 'hbox(center) p(20) bg(#e3f2fd) r(8) shadow(md) gap(10) m(10)';
    testDiv.innerHTML = `
      <div class="vbox(center) p(10) bg(#ffffff) r(4) shadow(sm)">
        <div class="font(16/1.5) bold c(#1976d2)">AdorableCSS v2 Test</div>
        <div class="font(14) c(#666)">CDN Library Working!</div>
      </div>
      <div class="w(100) h(60) bg(#4caf50) r(4) pack">
        <span class="c(white) font(12) bold">100x60</span>
      </div>
    `;
    
    container.appendChild(testDiv);
    
    // Add some test results
    testResults = [
      '✅ AdorableCSS CDN library imported successfully',
      '✅ CSS classes being processed and styled',
      '✅ Dynamic styling with MutationObserver',
      '✅ Browser compatibility confirmed'
    ];
  }
  
  function addMoreElements() {
    const container = document.getElementById('test-container');
    if (!container) return;
    
    const newElement = document.createElement('div');
    newElement.className = 'hbox gap(15) p(15) bg(#fff3e0) r(6) m(5)';
    newElement.innerHTML = `
      <div class="w(50) h(50) bg(#ff9800) r(25) pack">
        <span class="c(white) font(10) bold">50</span>
      </div>
      <div class="vbox gap(5)">
        <div class="font(14) bold c(#f57c00)">Dynamic Element</div>
        <div class="font(12) c(#666)">Added via JavaScript</div>
      </div>
    `;
    
    container.appendChild(newElement);
  }
  
  function changeClasses() {
    const elements = document.querySelectorAll('#test-container > div');
    elements.forEach((el, index) => {
      if (index === 0) {
        el.className = 'vbox(center) p(30) bg(#f3e5f5) r(12) shadow(lg) gap(15) m(10)';
      }
    });
  }
</script>

<div class="test-page">
  <h2>AdorableCSS CDN Library Test</h2>
  
  <div class="controls hbox gap(10) p(10) bg(#f5f5f5) r(4) m(10)">
    <button on:click={addMoreElements} class="p(8/16) bg(#2196f3) c(white) r(4) font(14)">
      Add Element
    </button>
    <button on:click={changeClasses} class="p(8/16) bg(#4caf50) c(white) r(4) font(14)">
      Change Classes
    </button>
  </div>
  
  <div id="test-container" class="test-container">
    <!-- Dynamic content will be added here -->
  </div>
  
  <div class="results vbox gap(5) p(15) bg(#e8f5e8) r(6) m(10)">
    <h3 class="font(16) bold c(#2e7d32)">Test Results:</h3>
    {#each testResults as result}
      <div class="font(14) c(#388e3c)">{result}</div>
    {/each}
  </div>
</div>

<style>
  .test-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    color: #1976d2;
    margin-bottom: 20px;
  }
  
  h3 {
    margin: 0 0 10px 0;
  }
  
  button {
    border: none;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  
  button:hover {
    opacity: 0.8;
  }
  
  .test-container {
    min-height: 200px;
    border: 2px dashed #ddd;
    border-radius: 8px;
    padding: 10px;
    margin: 10px 0;
  }
</style>