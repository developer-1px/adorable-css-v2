<script lang="ts">
  import { onMount } from 'svelte';
  import Navbar from '../../components/home/Navbar.svelte';
  import FigmaHero from '../../components/home/FigmaHero.svelte';
  import ThemeForgeDemo from '../../components/home/ThemeForgeDemo.svelte';
  import LivingSystemDemo from '../../components/home/LivingSystemDemo.svelte';
  import EscapeHatchDemo from '../../components/home/EscapeHatchDemo.svelte';
  import BlackBoxProblem from '../../components/home/BlackBoxProblem.svelte';
  import ComponentGallery from '../../components/home/ComponentGallery.svelte';
  import ModernLayoutShowcase from '../../components/home/ModernLayoutShowcase.svelte';
  import InstallSection from '../../components/home/InstallSection.svelte';
  import Footer from '../../components/home/Footer.svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    return () => {
      mounted = false;
    };
  });
</script>

<div class="homepage-v2 w(full) bg(white) {mounted ? 'mounted' : ''}">
  <!-- Hero Section -->
  <FigmaHero />
  
  <!-- Problem Statement -->
  <BlackBoxProblem />
  
  <!-- Core Feature Demos -->
  <section id="features">
    <ThemeForgeDemo />
  </section>
  
  <section id="living-system">
    <LivingSystemDemo />
  </section>
  
  <section id="flexibility">
    <EscapeHatchDemo />
  </section>
  
  <!-- Component Gallery -->
  <section id="components">
    <ComponentGallery />
  </section>
  
  <!-- Modern Layout Showcase -->
  <section id="patterns">
    <ModernLayoutShowcase />
  </section>
  
  <!-- Quick Install -->
  <InstallSection />
</div>

<style>
  :global(.homepage-v2.mounted) {
    animation: pageLoad 0.6s ease-out;
  }
  
  @keyframes pageLoad {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>