<script>
  export let data;
</script>

<svelte:head>
  <title>{data.title} - AdorableCSS Documentation</title>
  <meta name="description" content={data.description} />
  {#if data.css}
    {@html `<style>${data.css}</style>`}
  {/if}
</svelte:head>

<article class="prose max-w(4xl) p(2xl)">
  {@html data.code}
</article>