<script lang="ts">
  // Unified Design System for Homepage
  export const designSystem = {
    // Primary palette only
    colors: {
      primary: 'purple-600',
      primaryLight: 'purple-50',
      primaryDark: 'purple-700',
      
      text: {
        primary: 'gray-900',
        secondary: 'gray-600',
        inverse: 'white'
      },
      
      background: {
        primary: 'white',
        secondary: 'gray-50',
        accent: 'purple-50'
      },
      
      border: {
        default: 'gray-200',
        accent: 'purple-200'
      }
    },
    
    // Consistent spacing
    spacing: {
      section: 'section()',
      sectionCompact: 'section(compact)',
      gap: 'gap(lg)',
      gapLarge: 'gap(xl)',
      padding: 'p(lg)',
      paddingLarge: 'p(xl)'
    },
    
    // Unified components
    components: {
      card: 'card()',
      button: {
        primary: 'btn(primary)',
        secondary: 'btn(secondary)'
      },
      heading: {
        h1: 'heading(h1)',
        h2: 'heading(h2)',
        h3: 'heading(h3)'
      }
    }
  };
</script>