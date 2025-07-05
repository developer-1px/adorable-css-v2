<script lang="ts">
  import ComponentVariantsPreview from '$lib/components/docs/ComponentVariantsPreview.svelte';
  
  // Import AdorableCSS components and their definitions
  import { 
    btnString, 
    badgeString, 
    cardString, 
    headingString, 
    inputString, 
    textareaString,
    buttonDefinition,
    badgeDefinition,
    cardDefinition,
    headingDefinition,
    inputDefinition,
    textareaDefinition
  } from 'adorable-css';
</script>

<div class="min-h(screen) bg(gray-50)">
  <!-- Header -->
  <header class="pt(4xl) pb(2xl) px(2xl) bg(white) border-b(1/gray-200)">
    <div class="max-w(full)">
      <h1 class="display(lg) text(center) mb(lg)">
        Component Showcase
      </h1>
      <p class="text(xl) text(center) c(gray-600) max-w(4xl) mx(auto)">
        Explore all component variants and combinations with live preview and code generation
      </p>
    </div>
  </header>
  
  <!-- Main Content -->
  <main class="py(4xl)">
    <div class="max-w(full) px(2xl)">
      <div class="vbox gap(6xl)">
        
        <!-- Button Component -->
        <section>
          <ComponentVariantsPreview
            componentName="btn"
            componentFunction={btnString}
            definition={buttonDefinition}
            showCode={false}
            childrenContent="Button"
          />
        </section>
        
        <!-- Badge Component -->
        <section>
          <ComponentVariantsPreview
            componentName="badge"
            componentFunction={badgeString}
            definition={badgeDefinition}
            showCode={false}
            childrenContent="Badge"
          />
        </section>
        
        <!-- Card Component -->
        <section>
          <ComponentVariantsPreview
            componentName="card"
            componentFunction={cardString}
            definition={cardDefinition}
            showCode={false}
            childrenContent="Card content goes here"
            customExamples={[
              {
                label: 'Card with content',
                args: 'elevated/lg',
                children: 'This is a card with some example content to show how it looks with real data.'
              }
            ]}
          />
        </section>
        
        <!-- Heading Component -->
        <section>
          <ComponentVariantsPreview
            componentName="heading"
            componentFunction={headingString}
            definition={headingDefinition}
            showCode={false}
            childrenContent="Heading Text"
          />
        </section>
        
        <!-- Input Component -->
        <section>
          <ComponentVariantsPreview
            componentName="input"
            componentFunction={inputString}
            definition={inputDefinition}
            showCode={false}
            childrenContent="Placeholder text..."
          />
        </section>
        
        <!-- Textarea Component -->
        <section>
          <ComponentVariantsPreview
            componentName="textarea"
            componentFunction={textareaString}
            definition={textareaDefinition}
            showCode={false}
            childrenContent="Enter your message..."
          />
        </section>
        
      </div>
    </div>
  </main>
</div>