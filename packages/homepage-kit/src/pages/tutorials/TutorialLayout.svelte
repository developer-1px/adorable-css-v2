<script lang="ts">
  import { onMount } from 'svelte';
  
  interface Props {
    title: string;
    code: string;
    children?: {
      instructions?: () => any;
    };
  }
  
  let { title, code, children }: Props = $props();
  
  let editorValue = $state(code);
  let iframe: HTMLIFrameElement;
  
  onMount(() => {
    updatePreview();
  });
  
  function updatePreview() {
    if (!iframe) return;
    
    const html = `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/adorable-css.css">
  <style>body { margin: 0; padding: 20px; font-family: system-ui; }</style>
</head>
<body>${editorValue}</body>
</html>`;
    
    const doc = iframe.contentDocument;
    doc?.open();
    doc?.write(html);
    doc?.close();
  }
  
  function handleInput(e: Event) {
    editorValue = (e.target as HTMLTextAreaElement).value;
    updatePreview();
  }
</script>

<!-- 3열 레이아웃을 hbox로 간단하게 -->
<div class="h(100vh) hbox bg(neutral-50)">
  <!-- 왼쪽: 설명 -->
  <div class="w(300px) vbox bg(white) br(neutral-200)">
    <div class="p(lg) border(1px/neutral-200)">
      <h1 class="700 font(lg) c(neutral-900)">{title}</h1>
    </div>
    <div class="flex(1) p(lg)" style="overflow-y: auto;">
      {@render children?.instructions?.()}
    </div>
  </div>
  
  <!-- 가운데: 코드 -->
  <div class="flex(1) vbox br(neutral-200)">
    <div class="p(sm) border(1px/neutral-200) bg(neutral-100) hbox gap(auto)">
      <span class="600 font(sm) c(neutral-700)">Code</span>
      <button 
        class="px(sm) py(xs) bg(primary) c(white) r(sm) 600 font(xs)"
        onclick={() => { editorValue = code; updatePreview(); }}>
        Reset
      </button>
    </div>
    <textarea
      class="flex(1) p(md) bg(neutral-900) c(white) font(sm)"
      style="font-family: monospace; resize: none; border: 0; outline: none;"
      value={editorValue}
      oninput={handleInput}
    />
  </div>
  
  <!-- 오른쪽: 미리보기 -->
  <div class="w(400px) vbox">
    <div class="p(sm) border(1px/neutral-200) bg(neutral-100)">
      <span class="600 font(sm) c(neutral-700)">Preview</span>
    </div>
    <iframe
      bind:this={iframe}
      class="flex(1) bg(white)"
      style="border: 0;"
    />
  </div>
</div>