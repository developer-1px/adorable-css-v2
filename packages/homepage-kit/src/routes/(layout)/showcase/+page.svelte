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

  // --- Data for Examples Section ---
  const examples = [
    {
      title: "Documentation",
      description: "A complete documentation site layout with sidebar, search, and typography.",
      href: "/showcase/gitbook",
      color: "bg(indigo-50)",
      iconColor: "c(indigo-600)",
      preview: "bg(white) border(1/indigo-100) shadow(sm)" // simplified visual
    },
    {
      title: "Dashboard",
      description: "Analytical dashboard with metric cards, data tables, and charts.",
      href: "#", // Placeholder
      color: "bg(emerald-50)",
      iconColor: "c(emerald-600)",
      preview: "bg(white) border(1/emerald-100) shadow(sm)"
    },
    {
      title: "Authentication",
      description: "Login and sign-up flows with form validation and social auth.",
      href: "#", // Placeholder
      color: "bg(orange-50)",
      iconColor: "c(orange-600)",
      preview: "bg(white) border(1/orange-100) shadow(sm)"
    }
  ];

  // --- Data for Components Grid ---
  // Using direct strings for new components where exported functions might not exist
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
    },
    // New Components
    {
      title: "Alert",
      description: "Callout for user attention",
      fn: () => "p(lg) r(lg) bg(error-50) b(error-200) c(error-900)",
      args: "",
      children: "Error Message",
      renderAs: "div"
    },
    {
      title: "Avatar",
      description: "User profile image",
      fn: () => "hbox(pack) size(48) r(full) bg(gray-200) c(gray-700) font(bold)",
      args: "",
      children: "JD",
      renderAs: "div"
    },
    {
      title: "Switch",
      description: "Toggle selection",
      fn: () => "relative hbox h(24px) w(44px) r(full) bg(primary)",
      args: "",
      children: "", // We need to render the knot manually or use a custom component, but for 'drawing' generic div is ok? 
                    // Actually, let's use a simpler representation or just a pill for now.
                    // Better: use the card's children to render the knot.
      renderAs: "div" 
    }
  ];
</script>

<div class="min-h(screen) bg(white)">
  <!-- Header -->
  <header class="py(5xl) px(xl) border-b(1/gray-100)">
    <div class="max-w(7xl) mx(auto)">
      <h1 class="font(bold) text(5xl) tracking(tight) mb(lg)">
        Showcase
      </h1>
      <p class="text(xl) c(gray-500) max-w(3xl) leading(relaxed)">
        Real-world examples and components built with AdorableCSS. 
        Explore the possibilities of intent-based styling.
      </p>
    </div>
  </header>
  
  <main class="max-w(7xl) mx(auto) px(xl) py(5xl) vbox gap(6xl)">

    <!-- Examples Section -->
    <section>
      <div class="hbox(between) mb(2xl)">
        <h2 class="font(bold) text(2xl)">Examples</h2>
        <a href="#" class="text(sm) font(medium) c(gray-500) hover:c(primary)">View all examples &rarr;</a>
      </div>
      
      <div class="grid gap(xl) grid-cols(1) md:grid-cols(3)">
        {#each examples as ex}
          <a href={ex.href} class="group block relative overflow(hidden) r(2xl) border(1/gray-200) bg(white) hover:shadow(lg) hover:-translate-y(2px) transition duration(300)">
            <!-- Preview Window -->
            <div class={`h(240px) ${ex.color} p(xl) relative overflow(hidden)`}>
              <!-- Abstract Representation of App -->
              <div class={`w(full) h(full) r(tl/xl) ${ex.preview} p(lg) vbox gap(md)`}>
                 <!-- Mock UI Elements -->
                 <div class="w(30%) h(8px) bg(gray-200) r(full)"></div>
                 <div class="w(full) h(1px) bg(gray-100)"></div>
                 <div class="hbox gap(sm)">
                   <div class="w(20%) h(60px) bg(gray-50) r(md)"></div>
                   <div class="flex(1) h(60px) bg(gray-50) r(md)"></div>
                 </div>
              </div>
            </div>
            
            <!-- Content -->
            <div class="p(xl)">
              <h3 class={`font(bold) text(lg) mb(xs) ${ex.iconColor}`}>{ex.title}</h3>
              <p class="text(sm) c(gray-500) leading(relaxed)">{ex.description}</p>
            </div>
          </a>
        {/each}
      </div>
    </section>

    <!-- Components Section -->
    <section>
      <div class="hbox(between) mb(2xl)">
        <h2 class="font(bold) text(2xl)">Components</h2>
        <a href="#" class="text(sm) font(medium) c(gray-500) hover:c(primary)">View all components &rarr;</a>
      </div>

      <div class="grid gap(xl) grid-cols(2) sm:grid-cols(3) lg:grid-cols(4)">
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
    </section>

  </main>
</div>