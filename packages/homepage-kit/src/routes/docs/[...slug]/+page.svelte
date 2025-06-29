<script>
  import SimpleMDXRenderer from '$lib/components/docs/SimpleMDXRenderer.svelte';
  
  export let data;
</script>

<svelte:head>
  <title>{data.title} - AdorableCSS Documentation</title>
  <meta name="description" content={data.description} />
</svelte:head>

<SimpleMDXRenderer 
  html={data.html}
  isMdx={data.isMdx || false}
/>

<style>
  /* prose 클래스가 제대로 작동하도록 추가 스타일 */
  :global(.prose) {
    max-width: none !important; /* 문서 레이아웃에서는 전체 너비 사용 */
  }
  
  /* 코드 하이라이팅을 위한 추가 스타일 */
  :global(.prose .hljs-keyword) {
    color: var(--indigo-600);
  }
  
  :global(.prose .hljs-string) {
    color: var(--emerald-600);
  }
  
  :global(.prose .hljs-comment) {
    color: var(--gray-500);
    font-style: italic;
  }
  
  :global(.prose .hljs-number) {
    color: var(--orange-600);
  }
  
  :global(.prose .hljs-function) {
    color: var(--blue-600);
  }
  
  :global(.prose .hljs-class) {
    color: var(--purple-600);
  }
  
  /* MDX 특별 처리 */
  :global(.prose > *:first-child) {
    margin-top: 0 !important;
  }
</style>