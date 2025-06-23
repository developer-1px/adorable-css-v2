<script lang="ts">
  import { generateCSSFromAdorableCSS } from 'adorable-css';
  import { referenceData } from './referenceData';

  function generateCSS(syntax: string): string {
    try {
      return generateCSSFromAdorableCSS(syntax);
    } catch (error) {
      return `/* Error: ${syntax} */`;
    }
  }
</script>

<div class="container">
  <h1>AdorableCSS 레퍼런스</h1>
  <p class="intro">AdorableCSS에서 사용할 수 있는 모든 함수와 속성에 대한 완전한 참조 가이드입니다.</p>
  
  <div class="reference-section">
    {#each Object.entries(referenceData) as [categoryName, subcategories]}
      <div class="category-group">
        <h2 class="category-title">{categoryName}</h2>
        
        {#each Object.entries(subcategories) as [subcategoryName, utilities]}
          <div class="subcategory-group">
            <h3 class="subcategory-title">{subcategoryName}</h3>
            <div class="reference-table">
              <div class="table-header">
                <div class="col-property">속성</div>
                <div class="col-syntax">문법</div>
                <div class="col-css">생성되는 CSS</div>
              </div>
              {#each utilities as utility}
                {#each utility.syntax as syntaxItem}
                  <div class="table-row">
                    <div class="col-property">
                      <span class="property-name">{utility.property}</span>
                    </div>
                    <div class="col-syntax">
                      <code class="syntax-text">{syntaxItem}</code>
                    </div>
                    <div class="col-css">
                      <code class="css-output">{generateCSS(syntaxItem)}</code>
                    </div>
                  </div>
                {/each}
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    max-width: 1400px;
    margin: 0;
    padding: 2rem 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #1a1a1a;
    background: #ffffff;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 1rem;
    color: #1a1a1a;
    font-size: 1.75rem;
    font-weight: 300;
    letter-spacing: -0.025em;
  }
  
  .intro {
    color: #6b7280;
    font-size: 1rem;
    margin-bottom: 3rem;
    text-align: center;
    font-weight: 300;
    line-height: 1.6;
  }
  
  .reference-section {
    background: transparent;
    border-radius: 0;
    border: none;
    padding: 0;
    width: 100%;
    max-width: 1400px;
    margin: 0;
  }
  
  .category-group {
    margin-bottom: 3rem;
  }
  
  .category-group:last-child {
    margin-bottom: 0;
  }
  
  .category-title {
    background: transparent;
    color: #1f2937;
    padding: 0;
    margin: 0 0 1.5rem 0;
    border-radius: 0;
    font-size: 1.25rem;
    font-weight: 500;
    text-align: left;
    box-shadow: none;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.75rem;
  }
  
  .reference-table {
    background: transparent;
    border-radius: 0;
    overflow: hidden;
    border: none;
    width: 100%;
  }
  
  .subcategory-group {
    margin-bottom: 2rem;
  }
  
  .subcategory-title {
    color: #4b5563;
    font-size: 1rem;
    font-weight: 500;
    margin: 0 0 1rem 0;
    padding-left: 0.5rem;
    border-left: 3px solid #e5e7eb;
  }

  .table-header {
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
    background: #f9fafb;
    color: #374151;
    font-weight: 500;
    font-size: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .table-header > div {
    padding: 0.5rem 0.75rem;
    border-right: none;
  }
  
  .table-row {
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
    border-bottom: 1px solid #f3f4f6;
    transition: background-color 0.15s ease;
    font-size: 0.75rem;
  }
  
  .table-row:hover {
    background: #f9fafb;
  }
  
  .table-row > div {
    padding: 0.5rem 0.75rem;
    border-right: none;
    display: flex;
    align-items: center;
    min-height: auto;
    overflow: hidden;
  }
  
  .property-name {
    color: #4b5563;
    font-size: 0.75rem;
    font-weight: 500;
    word-break: keep-all;
  }
  
  .syntax-text {
    background: #fef3c7;
    color: #92400e;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    font-size: 0.75rem;
    border: 1px solid #fcd34d;
    font-weight: 600;
  }
  
  .css-output {
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    font-size: 0.6rem;
    color: #059669;
    background: #ecfdf5;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    word-break: break-all;
    border: 1px solid #d1fae5;
    overflow-wrap: break-word;
  }
  
  @media (max-width: 1200px) {
    .reference-section {
      max-width: 100%;
      overflow-x: auto;
    }
    
    .reference-table {
      min-width: 800px;
    }
  }
  
  @media (max-width: 800px) {
    .container {
      padding: 0.5rem;
    }
    
    .table-header,
    .table-row {
      grid-template-columns: 1fr;
      gap: 1px;
      min-width: auto;
    }
    
    .reference-table {
      min-width: auto;
    }
    
    .table-header > div,
    .table-row > div {
      border-right: none;
      border-bottom: 1px solid #e9ecef;
      padding: 0.4rem;
    }
    
    .table-header > div:last-child,
    .table-row > div:last-child {
      border-bottom: none;
    }
    
    .table-row > div::before {
      content: attr(data-label) ": ";
      font-weight: bold;
      display: inline-block;
      min-width: 80px;
    }
    
    .col-property::before { content: "속성: "; }
    .col-syntax::before { content: "문법: "; }
    .col-css::before { content: "CSS: "; }
  }
</style>