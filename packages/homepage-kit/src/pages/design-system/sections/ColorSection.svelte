<script lang="ts">
  import { Copy, Check } from 'lucide-svelte';
  
  let copiedColor = '';
  
  const colorGroups = [
    { name: 'gray', label: 'Gray' },
    { name: 'red', label: 'Red' },
    { name: 'orange', label: 'Orange' },
    { name: 'yellow', label: 'Yellow' },
    { name: 'green', label: 'Green' },
    { name: 'blue', label: 'Blue' },
    { name: 'purple', label: 'Purple' },
    { name: 'pink', label: 'Pink' }
  ];
  
  const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
  
  function copyColor(color: string) {
    navigator.clipboard.writeText(`c(${color})`);
    copiedColor = color;
    setTimeout(() => copiedColor = '', 2000);
  }
  
  const semanticColors = [
    { name: 'brand', value: 'primary', desc: 'Primary brand color' },
    { name: 'accent', value: 'primary-500', desc: 'Accent for highlights' },
    { name: 'success', value: 'green-500', desc: 'Success states' },
    { name: 'warning', value: 'yellow-500', desc: 'Warning messages' },
    { name: 'danger', value: 'red-500', desc: 'Error states' },
    { name: 'info', value: 'blue-500', desc: 'Informational' }
  ];
</script>

<section id="colors" class="section()">
  <div class="container()">
    <h2 class="heading()">Color System</h2>
    <p class="prose()">
      A carefully crafted color palette with semantic meanings and accessibility in mind.
    </p>
  </div>

  <!-- Semantic Colors -->
  <div class="container()">
    <h3 class="heading()">Semantic Colors</h3>
    <div class="grid() gap()">
      {#each semanticColors as color}
        <button 
          class="card() text(left)"
          on:click={() => copyColor(color.name)}
        >
          <div class="hbox() gap() mb()">
            <div class="48x48 bg({color.value}) r()"></div>
            <div class="flex(1)">
              <div class="heading()">{color.name}</div>
              <code class="prose()">c({color.name})</code>
            </div>
            {#if copiedColor === color.name}
              <Check size="20" />
            {:else}
              <Copy size="20" />
            {/if}
          </div>
          <p class="prose()">{color.desc}</p>
        </button>
      {/each}
    </div>
  </div>

  <!-- Color Palette -->
  <div class="container()">
    <h3 class="heading()">Full Palette</h3>
    <div class="vbox() gap()">
      {#each colorGroups as group}
        <div>
          <h4 class="heading()">{group.label}</h4>
          <div class="grid(10) gap()">
            {#each shades as shade}
              <button
                class="vbox() gap()"
                on:click={() => copyColor(`${group.name}-${shade}`)}
              >
                <div class="aspect(1/1) r() bg({group.name}-{shade})">
                  {#if copiedColor === `${group.name}-${shade}`}
                    <div class="layer hbox(pack)">
                      <Check size="24" />
                    </div>
                  {/if}
                </div>
                <span class="prose()">{shade}</span>
              </button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Gradient Examples -->
  <div class="container()">
    <h3 class="heading()">Gradients</h3>
    <div class="grid() gap()">
      {#each [
        { name: 'Sunset', value: 'warning-400..error-500/135deg' },
        { name: 'Ocean', value: 'primary-400..primary-600/to-br' },
        { name: 'Forest', value: 'success-400..primary-500/90deg' },
        { name: 'Berry', value: 'primary-500..error-400/45deg' },
        { name: 'Fire', value: 'yellow-400..red-500/to-tr' },
        { name: 'Night', value: 'neutral-700..neutral-900/180deg' }
      ] as gradient}
        <button 
          class="h(120px) r() bg({gradient.value}) relative clip"
          on:click={() => copyColor(gradient.value)}
        >
          <div class="layer bottom(0) left(0) right(0) p()">
            <div class="heading()">{gradient.name}</div>
            <code class="prose()">bg({gradient.value})</code>
          </div>
        </button>
      {/each}
    </div>
  </div>
</section>