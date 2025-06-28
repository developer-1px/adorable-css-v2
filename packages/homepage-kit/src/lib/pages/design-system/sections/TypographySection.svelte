<script lang="ts">
  import { Copy, Check } from 'lucide-svelte';
  
  let copiedItem = '';
  
  const typeScale = [
    { size: 'xs', value: '12px', sample: 'The quick brown fox jumps over the lazy dog' },
    { size: 'sm', value: '14px', sample: 'The quick brown fox jumps over the lazy dog' },
    { size: 'md', value: '16px', sample: 'The quick brown fox jumps over the lazy dog' },
    { size: 'lg', value: '18px', sample: 'The quick brown fox jumps over the lazy dog' },
    { size: 'xl', value: '20px', sample: 'The quick brown fox jumps over the lazy dog' },
    { size: '2xl', value: '24px', sample: 'The quick brown fox jumps over the lazy dog' },
    { size: '3xl', value: '30px', sample: 'The quick brown fox jumps over the lazy' },
    { size: '4xl', value: '36px', sample: 'The quick brown fox jumps' },
    { size: '5xl', value: '48px', sample: 'The quick brown fox' },
    { size: '6xl', value: '60px', sample: 'The quick brown' }
  ];
  
  const fontWeights = [
    { name: 'normal', value: '400', class: '' },
    { name: 'medium', value: '500', class: 'bold(500)' },
    { name: 'semibold', value: '600', class: 'bold(600)' },
    { name: 'bold', value: '700', class: 'bold' },
    { name: 'extrabold', value: '800', class: 'bold(800)' }
  ];
  
  const textStyles = [
    { name: 'italic', desc: 'Italic text style' },
    { name: 'underline', desc: 'Underlined text' },
    { name: 'line-through', desc: 'Strike through text' },
    { name: 'uppercase', desc: 'UPPERCASE TEXT' },
    { name: 'lowercase', desc: 'lowercase text' },
    { name: 'capitalize', desc: 'Capitalize Each Word' }
  ];
  
  function copyCode(code: string, id: string) {
    navigator.clipboard.writeText(code);
    copiedItem = id;
    setTimeout(() => copiedItem = '', 2000);
  }
</script>

<section id="typography" class="section()">
  <div class="container()">
    <h2 class="heading()">Typography</h2>
    <p class="prose()">
      A flexible type system that scales beautifully across all screen sizes.
    </p>
  </div>

  <!-- Type Scale -->
  <div class="card() container()">
    <h3 class="heading()">Type Scale</h3>
    <div class="vbox() gap()">
      {#each typeScale as type}
        <div class="hbox() gap() py() bb()">
          <div class="flex(1)">
            <p class="font({type.size})">{type.sample}</p>
          </div>
          <div class="hbox() gap()">
            <div class="text(right)">
              <code class="prose()">font({type.size})</code>
              <p class="prose()">{type.value}</p>
            </div>
            <button 
              class="p()"
              on:click={() => copyCode(`font(${type.size})`, type.size)}
            >
              {#if copiedItem === type.size}
                <Check size="16" />
              {:else}
                <Copy size="16" />
              {/if}
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Font Weights -->
  <div class="container() grid(2) gap()">
    <div class="card()">
      <h3 class="heading()">Font Weights</h3>
      <div class="vbox() gap()">
        {#each fontWeights as weight}
          <div class="hbox() p()">
            <div class="flex(1)">
              <p class="font(lg) {weight.class}">{weight.name}</p>
              <code class="prose()">{weight.class || 'default'}</code>
            </div>
            <span class="prose()">{weight.value}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="card()">
      <h3 class="heading()">Text Styles</h3>
      <div class="vbox() gap()">
        {#each textStyles as style}
          <div class="hbox() p()">
            <div class="flex(1)">
              <p class="font(lg) {style.name}">{style.desc}</p>
              <code class="prose()">{style.name}</code>
            </div>
            <button 
              class="p()"
              on:click={() => copyCode(style.name, style.name)}
            >
              {#if copiedItem === style.name}
                <Check size="16" />
              {:else}
                <Copy size="16" />
              {/if}
            </button>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Line Height Examples -->
  <div class="card() container()">
    <h3 class="heading()">Line Height & Letter Spacing</h3>
    <div class="grid(2) gap()">
      <div class="vbox() gap()">
        <h4 class="heading()">Line Height</h4>
        {#each ['1', '1.25', '1.5', '1.75', '2'] as height}
          <div class="vbox() gap()">
            <code class="prose()">font(lg/{height})</code>
            <p class="font(lg/{height}) card() p()">
              The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        {/each}
      </div>
      
      <div class="vbox() gap()">
        <h4 class="heading()">Letter Spacing</h4>
        {#each ['-2%', '-1%', '0', '1%', '2%'] as spacing}
          <div class="vbox() gap()">
            <code class="prose()">font(lg/1.5/{spacing})</code>
            <p class="font(lg/1.5/{spacing}) card() p()">
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>