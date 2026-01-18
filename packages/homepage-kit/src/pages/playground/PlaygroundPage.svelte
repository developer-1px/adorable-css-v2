<script lang="ts">
  import { onMount } from 'svelte';
  import { generateCSS } from 'adorable-css';
  
  // Minimal default template
  let htmlInput = `<div class="vbox(fill) pack bg(gray-100)">
  <div class="vbox gap(md) p(2xl) bg(white) r(2xl) shadow(xl) text(center)">
    <div class="size(64) bg(blue-500) r(full) pack c(white) text(2xl)">
      ✨
    </div>
    <div class="vbox gap(xs)">
      <h1 class="text(xl) bold">Hello, AdorableCSS!</h1>
      <p class="c(gray-500)">Edit this code to see changes instantly.</p>
    </div>
    <button class="py(md) px(xl) bg(black) c(white) r(full) font(semibold) hover:scale(1.05) transition">
      Get Started
    </button>
  </div>
</div>`;

  let generatedCSS = '';
  let showCSS = false;
  let iframeDoc: Document | null = null;
  let debounceTimer: number | null = null;
  let highlightedHTML = '';
  
  // Simple syntax highlighting
  function highlightHTML(html: string): string {
    const escaped = html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    return escaped
      // HTML tags and attributes
      .replace(/(&lt;\/?)(\w+)(.*?)(&gt;)/g, (match, p1, p2, p3, p4) => {
        const attrs = p3.replace(/(\s+)([a-zA-Z0-9-]+)(=)/g, '$1<span class="c(purple-600)">$2</span>$3');
        return `<span class="c(blue-600)">${p1}${p2}</span>${attrs}<span class="c(blue-600)">${p4}</span>`;
      })
      // HTML strings
      .replace(/(&quot;.*?&quot;|&#039;.*?&#039;)/g, '<span class="c(green-600)">$1</span>');
  }
  
  function updatePreview() {
    if (!iframeDoc) return;
    try {
      // Generate CSS
      const classRegex = /class="([^"]*)"/g;
      const classes = new Set<string>();
      let match;
      while ((match = classRegex.exec(htmlInput)) !== null) {
        match[1].split(/\s+/).forEach(c => c && classes.add(c));
      }
      
      generatedCSS = generateCSS(Array.from(classes));
      
      // Update iframe
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: -apple-system, system-ui, sans-serif;
                min-height: 100vh;
              }
              ${generatedCSS}
            </style>
          </head>
          <body>
            ${htmlInput}
          </body>
        </html>
      `);
      iframeDoc.close();
    } catch (e) {
      console.error('Error updating preview:', e);
    }
  }
  
  function handleInput() {
    highlightedHTML = highlightHTML(htmlInput);
    
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(updatePreview, 150) as unknown as number;
  }
  
  onMount(() => {
    const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
    iframeDoc = iframe.contentDocument || iframe.contentWindow?.document || null;
    highlightedHTML = highlightHTML(htmlInput);
    updatePreview();
  });
</script>

<!-- Use inline styles for layout to guarantee full screen even if utility engine fails -->
<div style="position: fixed; inset: 0; z-index: 9999; background: white; display: flex; flex-direction: row; width: 100vw; height: 100vh; overflow: hidden;">
  
  <!-- Editor Pane -->
  <div style="flex: 1; display: flex; flex-direction: column; border-right: 1px solid #e5e7eb; position: relative; min-width: 320px;">
    
    <!-- Toolbar -->
    <div class="hbox(middle) gap(auto) px(lg) py(md) b-b(1/gray-200) bg(white)" style="flex-shrink: 0; display: flex; align-items: center; justify-content: space-between;">
      <div class="hbox(middle) gap(md)">
        <div class="font(mono) text(sm) bold c(gray-900)">Playground</div>
      </div>
      <button 
        class="px(md) py(xs) text(xs) font(medium) r(md) transition {showCSS ? 'bg(gray-100) c(gray-900)' : 'c(gray-500) hover:c(gray-900)'}"
        on:click={() => showCSS = !showCSS}
      >
        {showCSS ? 'Hide CSS' : 'Show CSS'}
      </button>
    </div>

    <!-- Code Editor -->
    <div style="flex: 1; position: relative; background-color: #f9fafb; min-height: 0;">
      <pre 
        class="layer(fill) p(lg) font(mono) text(sm) leading(relaxed) pointer-events(none) whitespace(pre-wrap) overflow(auto) z(10)"
        aria-hidden="true"
        style="position: absolute; inset: 0;"
      ><code>{@html highlightedHTML}</code></pre>
      <textarea
        bind:value={htmlInput}
        on:input={handleInput}
        class="layer(fill) p(lg) font(mono) text(sm) leading(relaxed) bg(transparent) c(transparent) caret-c(black) resize(none) outline(none) z(20)"
        spellcheck="false"
        placeholder="Type HTML here..."
        style="position: absolute; inset: 0; width: 100%; height: 100%; border: none; background: transparent; color: transparent; caret-color: black; resize: none; outline: none; z-index: 20;"
      ></textarea>
    </div>
    
    <!-- CSS Panel (Conditional) -->
    {#if showCSS}
      <div class="h(200) b-t(1/gray-200) bg(white) vbox" style="height: 200px; border-top: 1px solid #e5e7eb; background: white; display: flex; flex-direction: column; flex-shrink: 0;">
        <div class="px(lg) py(xs) bg(gray-50) b-b(1/gray-200) text(xs) font(medium) c(gray-500)">Generated CSS</div>
        <div class="flex(1) overflow(auto) p(lg)" style="flex: 1; overflow: auto;">
          <pre class="font(mono) text(xs) c(gray-600) whitespace(pre-wrap) break-all">{generatedCSS}</pre>
        </div>
      </div>
    {/if}
  </div>

  <!-- Preview Pane -->
  <div style="flex: 1; background: white; position: relative; min-width: 320px;">
    <iframe
      id="preview-iframe"
      style="width: 100%; height: 100%; border: none;"
      title="Preview"
    ></iframe>
  </div>
</div>