<script lang="ts">
  import FontTokenGenerator from '../../../pages/tokens/widgets/FontTokenGenerator.svelte';
  import SpacingTokenGenerator from '../../../pages/tokens/widgets/SpacingTokenGenerator.svelte';
  import RadiusTokenGenerator from '../../../pages/tokens/widgets/RadiusTokenGenerator.svelte';
  import ShadowTokenGenerator from '../../../pages/tokens/widgets/ShadowTokenGenerator.svelte';
  import ContainerTokenGenerator from '../../../pages/tokens/widgets/ContainerTokenGenerator.svelte';
</script>

<div class="min-h(screen) bg(white)">
  <!-- Hero Section -->
  <section class="py(5xl) text(center) border-b(4/black)">
    <div class="vbox(center) gap(xl)">
      <h1 class="display(3xl) font(black) tracking(tighter)">
        TOKEN GENERATORS
      </h1>
      <div class="vbox(center)">
        <p class="text(xl) font(medium) max-w(2xl) leading(relaxed)">
          Mathematical design scales.<br/>
          Configure. Preview. Copy.
        </p>
      </div>
    </div>
  </section>

  <!-- Generators -->
  <section>
    <div class="vbox">
      <FontTokenGenerator />
      
      <div class="border-t(8/black)">
        <SpacingTokenGenerator />
      </div>
      
      <div class="border-t(8/black)">
        <RadiusTokenGenerator />
      </div>
      
      <div class="border-t(8/black)">
        <ShadowTokenGenerator />
      </div>
      
      <div class="border-t(8/black)">
        <ContainerTokenGenerator />
      </div>
    </div>
  </section>
</div>