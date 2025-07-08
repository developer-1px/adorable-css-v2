<script>
  export let data;
</script>

<svelte:head>
  <title>{data.title} - AdorableCSS Documentation</title>
  <meta name="description" content={data.description} />
</svelte:head>

<div class="prose(docs)">
  {@html data.code}
</div>