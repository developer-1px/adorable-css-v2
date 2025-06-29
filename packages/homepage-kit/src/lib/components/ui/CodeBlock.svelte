<script lang="ts">
  export let code: string;
  export let language = 'html';
  export let theme: 'dark' | 'light' | 'branded' = 'dark';
</script>

<div class="code-block({theme})">
  <pre><code class="language-{language}">{code}</code></pre>
</div>

<style>
  /* Preserve whitespace in code blocks */
  pre {
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  
  code {
    display: block;
  }
</style>