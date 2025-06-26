<script lang="ts">
  import { MDXProvider } from 'mdx-svelte';
  import Code from './Code.svelte';
  import CodeHighlighter from './CodeHighlighter.svelte';

  // Custom components for MDX
  const components = {
    // Use our custom code component for inline code
    code: (props: any) => {
      // If it's a code block (has className), use CodeHighlighter
      if (props.className) {
        const language = props.className.replace('language-', '');
        return {
          component: CodeHighlighter,
          props: { code: props.children, language }
        };
      }
      // Otherwise use inline code component
      return {
        component: Code,
        props: { children: props.children }
      };
    },
    
    // Custom pre component to handle code blocks
    pre: (props: any) => {
      // Return children directly as they'll be handled by the code component
      return props.children;
    }
  };
</script>

<MDXProvider {components}>
  <slot />
</MDXProvider>