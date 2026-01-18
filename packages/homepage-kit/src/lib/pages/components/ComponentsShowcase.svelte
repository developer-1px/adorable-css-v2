<script lang="ts">
  import ComponentCard from '$lib/components/docs/ComponentCard.svelte';
  
  // Import AdorableCSS components
  import { 
    btnString, 
    badgeString, 
    cardString, 
    headingString, 
    inputString, 
    textareaString
  } from 'adorable-css';

  const components = [
    {
      title: "Button",
      description: "Interactive button element",
      fn: btnString,
      args: "primary/lg",
      children: "Button",
      renderAs: "button"
    },
    {
      title: "Badge",
      description: "Status indicator",
      fn: badgeString,
      args: "neutral/md",
      children: "Badge",
      renderAs: "span"
    },
    {
      title: "Card",
      description: "Container for content",
      fn: cardString,
      args: "elevated/lg",
      children: "Card Content",
      renderAs: "div"
    },
    {
      title: "Heading",
      description: "Section titles",
      fn: headingString,
      args: "h3",
      children: "Typography",
      renderAs: "h3"
    },
    {
      title: "Input",
      description: "Form input field",
      fn: inputString,
      args: "text",
      children: "Type something...",
      renderAs: "input"
    },
    {
      title: "Textarea",
      description: "Multi-line input",
      fn: textareaString,
      args: "resize",
      children: "Type a message...",
      renderAs: "textarea"
    }
  ] as const;
</script>

<div class="min-h(screen) bg(white)">
  <!-- Header -->
  <header class="py(4xl) px(xl) border-b(1/gray-100)">
    <div class="max-w(7xl) mx(auto)">
      <h1 class="font(bold) text(4xl) tracking(tight) mb(md)">
        Components
      </h1>
      <p class="text(xl) c(gray-500) max-w(3xl)">
        Beautifully designed components built with AdorableCSS. 
        Copy and paste into your apps.
      </p>
    </div>
  </header>
  
  <!-- Main Grid -->
  <main class="max-w(7xl) mx(auto) px(xl) py(4xl)">
    <div class="grid gap(xl) grid-cols(1) sm:grid-cols(2) lg:grid-cols(3)">
      {#each components as comp}
        <ComponentCard
          title={comp.title}
          description={comp.description}
          componentFunction={comp.fn}
          exampleArgs={comp.args}
          children={comp.children}
          renderAs={comp.renderAs}
        />
      {/each}
    </div>
  </main>
</div>