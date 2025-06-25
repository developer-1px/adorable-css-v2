<script lang="ts">
  import HeroSection from '../../components/home/HeroSection.svelte';
  import DesignShowcase from '../../components/home/DesignShowcase.svelte';
  import ColorPalette from '../../components/home/ColorPalette.svelte';
  import LayoutSystem from '../../components/home/LayoutSystem.svelte';
  import EffectsPlayground from '../../components/home/EffectsPlayground.svelte';
  import QuickStart from '../../components/home/QuickStart.svelte';
</script>

<div class="homepage">
  <HeroSection />
  <DesignShowcase />
  <ColorPalette />
  <LayoutSystem />
  <EffectsPlayground />
  <QuickStart />
</div>

<style>
  :global(body) {
    overflow-x: hidden;
  }
  
  .homepage {
    width: 100%;
    min-height: 100vh;
    background: white;
  }
</style>