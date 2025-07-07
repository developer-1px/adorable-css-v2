<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { EditorView, basicSetup } from 'codemirror';
  import { EditorState, Compartment } from '@codemirror/state';
  import { html } from '@codemirror/lang-html';
  import { css } from '@codemirror/lang-css';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { ViewUpdate } from '@codemirror/view';
  import { autocompletion } from '@codemirror/autocomplete';
  
  export let value = '';
  export let language: 'html' | 'css' = 'html';
  export let theme: 'light' | 'dark' = 'light';
  export let placeholder = '';
  
  const dispatch = createEventDispatcher();
  
  let container: HTMLDivElement;
  let view: EditorView;
  let updateListenerExtension: any;
  
  const themeConfig = new Compartment();
  const languageConfig = new Compartment();
  
  // AdorableCSS autocomplete suggestions
  const adorableCompletions = [
    // Layout
    { label: 'hbox', type: 'function', info: 'Horizontal flexbox layout' },
    { label: 'vbox', type: 'function', info: 'Vertical flexbox layout' },
    { label: 'grid', type: 'function', info: 'CSS Grid layout' },
    { label: 'container', type: 'function', info: 'Container with max-width' },
    
    // Spacing
    { label: 'p', type: 'function', info: 'Padding' },
    { label: 'px', type: 'function', info: 'Padding horizontal' },
    { label: 'py', type: 'function', info: 'Padding vertical' },
    { label: 'pt', type: 'function', info: 'Padding top' },
    { label: 'pr', type: 'function', info: 'Padding right' },
    { label: 'pb', type: 'function', info: 'Padding bottom' },
    { label: 'pl', type: 'function', info: 'Padding left' },
    { label: 'gap', type: 'function', info: 'Gap between flex/grid items' },
    
    // Colors
    { label: 'bg', type: 'function', info: 'Background color' },
    { label: 'c', type: 'function', info: 'Text color' },
    { label: 'border', type: 'function', info: 'Border' },
    
    // Typography
    { label: 'text', type: 'function', info: 'Font size and text properties' },
    { label: 'font', type: 'function', info: 'Font weight' },
    { label: 'heading', type: 'function', info: 'Heading typography' },
    { label: 'body', type: 'function', info: 'Body text typography' },
    { label: 'caption', type: 'function', info: 'Caption text' },
    { label: 'title', type: 'function', info: 'Title text' },
    
    // Effects
    { label: 'shadow', type: 'function', info: 'Box shadow' },
    { label: 'r', type: 'function', info: 'Border radius' },
    { label: 'opacity', type: 'function', info: 'Opacity' },
    { label: 'transition', type: 'keyword', info: 'CSS transition' },
    { label: 'scale', type: 'function', info: 'Transform scale' },
    { label: 'rotate', type: 'function', info: 'Transform rotate' },
    
    // Components
    { label: 'btn', type: 'function', info: 'Button component' },
    { label: 'card', type: 'function', info: 'Card component' },
    { label: 'badge', type: 'function', info: 'Badge component' },
    { label: 'input', type: 'function', info: 'Input component' },
    
    // Utilities
    { label: 'w', type: 'function', info: 'Width' },
    { label: 'h', type: 'function', info: 'Height' },
    { label: 'size', type: 'function', info: 'Width and height' },
    { label: 'min-w', type: 'function', info: 'Min width' },
    { label: 'min-h', type: 'function', info: 'Min height' },
    { label: 'max-w', type: 'function', info: 'Max width' },
    { label: 'max-h', type: 'function', info: 'Max height' },
    { label: 'cursor', type: 'function', info: 'Cursor style' },
    { label: 'z', type: 'function', info: 'Z-index' },
    { label: 'layer', type: 'function', info: 'Position layer' },
    
    // Glassmorphism
    { label: 'glassmorphism', type: 'function', info: 'Glassmorphism effect' },
    
    // Animation
    { label: 'slide-up', type: 'function', info: 'Slide up animation' },
    { label: 'float', type: 'function', info: 'Float animation' },
    { label: 'pulse', type: 'keyword', info: 'Pulse animation' },
  ];
  
  // Custom autocomplete for AdorableCSS
  function adorableCSSAutocomplete(context: any) {
    const word = context.matchBefore(/\w*/);
    if (!word) return null;
    if (word.from == word.to && !context.explicit) return null;
    
    const inClassAttribute = context.state.sliceDoc(0, context.pos).match(/class\s*=\s*["'][^"']*$/);
    if (!inClassAttribute) return null;
    
    return {
      from: word.from,
      options: adorableCompletions
        .filter(item => item.label.toLowerCase().startsWith(word.text.toLowerCase()))
        .map(item => ({
          label: item.label,
          type: item.type,
          info: item.info,
          apply: item.type === 'function' ? `${item.label}()` : item.label
        }))
    };
  }
  
  // Custom theme for light mode
  const lightTheme = EditorView.theme({
    '&': {
      color: '#24292e',
      backgroundColor: '#ffffff'
    },
    '.cm-content': {
      caretColor: '#667eea',
      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
      fontSize: '14px',
      lineHeight: '1.6'
    },
    '.cm-line': {
      padding: '0 2px'
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#667eea'
    },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: '#667eea20'
    },
    '.cm-gutters': {
      backgroundColor: '#f6f8fa',
      color: '#57606a',
      border: 'none',
      borderRight: '1px solid #e1e4e8'
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#f6f8fa'
    },
    '.cm-lineNumbers': {
      minWidth: '40px'
    },
    '.cm-tooltip': {
      backgroundColor: '#24292e',
      color: '#ffffff',
      border: 'none'
    },
    '.cm-tooltip-autocomplete': {
      '& > ul': {
        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
        fontSize: '13px'
      }
    }
  });
  
  onMount(() => {
    const startState = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        themeConfig.of(theme === 'dark' ? oneDark : lightTheme),
        languageConfig.of(language === 'html' ? html() : css()),
        autocompletion({
          override: [adorableCSSAutocomplete],
          activateOnTyping: true
        }),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update: ViewUpdate) => {
          if (update.docChanged) {
            const newValue = update.state.doc.toString();
            if (newValue !== value) {
              value = newValue;
              dispatch('change', newValue);
            }
          }
        }),
        EditorView.domEventHandlers({
          keydown(event, view) {
            if (event.key === 'Tab' && !event.ctrlKey && !event.metaKey) {
              event.preventDefault();
              const { state, dispatch } = view;
              dispatch(state.update(state.replaceSelection('  ')));
              return true;
            }
            return false;
          }
        })
      ]
    });
    
    view = new EditorView({
      state: startState,
      parent: container,
    });
  });
  
  onDestroy(() => {
    if (view) {
      view.destroy();
    }
  });
  
  // React to prop changes
  $: if (view && value !== view.state.doc.toString()) {
    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: value
      }
    });
  }
  
  $: if (view) {
    view.dispatch({
      effects: [
        themeConfig.reconfigure(theme === 'dark' ? oneDark : lightTheme),
        languageConfig.reconfigure(language === 'html' ? html() : css())
      ]
    });
  }
</script>

<div 
  bind:this={container} 
  class="codemirror-container w(full) h(full) overflow(hidden) r(lg)"
/>

<style>
  :global(.cm-editor) {
    height: 100%;
  }
  
  :global(.cm-scroller) {
    font-family: Consolas, Monaco, 'Courier New', monospace;
  }
  
  :global(.cm-focused) {
    outline: none !important;
  }
  
  :global(.cm-tooltip-autocomplete) {
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  :global(.cm-completionIcon) {
    margin-right: 4px;
  }
  
  :global(.cm-completionIcon-function)::after {
    content: 'ƒ';
    color: #667eea;
    font-weight: bold;
  }
  
  :global(.cm-completionIcon-keyword)::after {
    content: '◆';
    color: #10b981;
  }
  
  :global(.cm-completionInfo) {
    margin-left: 8px;
    font-size: 12px;
    color: #6b7280;
  }
</style>