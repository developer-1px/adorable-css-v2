<script lang="ts">
  import ParserVisualizer from './lib/ParserVisualizer.svelte';
  import Reference from './lib/Reference.svelte';
  import TestPage from './TestPage.svelte';
  import ShowcasePage from './ShowcasePage.svelte';
  
  let currentPage = 'showcase'; // 'showcase', 'parser', 'reference', or 'test'
  
  // Simple hash-based routing
  function updatePage() {
    const hash = window.location.hash.slice(1) || 'showcase';
    currentPage = hash;
  }
  
  // Listen for hash changes
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', updatePage);
    updatePage(); // Set initial page
  }
  
  function navigateTo(page: string) {
    window.location.hash = page;
  }
</script>

<div class="app">
  <nav class="navigation">
    <div class="nav-container">
      <h1 class="nav-title">AdorableCSS</h1>
      <div class="nav-links">
        <button 
          class="nav-link {currentPage === 'showcase' ? 'active' : ''}"
          on:click={() => navigateTo('showcase')}
        >
          홈
        </button>
        <button 
          class="nav-link {currentPage === 'parser' ? 'active' : ''}"
          on:click={() => navigateTo('parser')}
        >
          문법 가이드
        </button>
        <button 
          class="nav-link {currentPage === 'reference' ? 'active' : ''}"
          on:click={() => navigateTo('reference')}
        >
          레퍼런스
        </button>
        <button 
          class="nav-link {currentPage === 'test' ? 'active' : ''}"
          on:click={() => navigateTo('test')}
        >
          CDN 테스트
        </button>
      </div>
    </div>
  </nav>
  
  <main class="main-content">
    {#if currentPage === 'showcase'}
      <ShowcasePage />
    {:else if currentPage === 'parser'}
      <ParserVisualizer />
    {:else if currentPage === 'reference'}
      <Reference />
    {:else if currentPage === 'test'}
      <TestPage />
    {/if}
  </main>
</div>

<style>
  .app {
    min-height: 100vh;
    background: #ffffff;
  }
  
  .navigation {
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
  }
  
  .nav-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }
  
  .nav-links {
    display: flex;
    gap: 0.5rem;
  }
  
  .nav-link {
    padding: 0.5rem 1rem;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
    color: #6b7280;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  
  .nav-link:hover {
    color: #374151;
    background: #f9fafb;
  }
  
  .nav-link.active {
    color: #1f2937;
    background: #f3f4f6;
    border-color: #d1d5db;
  }
  
  .main-content {
    min-height: calc(100vh - 4rem);
  }
  
  @media (max-width: 768px) {
    .nav-container {
      flex-direction: column;
      height: auto;
      padding: 1rem;
      gap: 1rem;
    }
    
    .nav-links {
      width: 100%;
      justify-content: center;
    }
    
    .nav-link {
      flex: 1;
      text-align: center;
    }
  }
</style>
