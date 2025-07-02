/**
 * Example showing the difference between priority-based and layer-based CSS generation
 */

// ===== OLD APPROACH (Priority-based with specificity hacks) =====
// Input: <div class="card(gradient) c(red)">

// OLD OUTPUT:
// .card\(gradient\) { background: linear-gradient(...); color: white; }
// .c\(red\).c\(red\) { color: red; }  // Double selector for higher specificity

// The utility class c(red) needed doubled selectors to override component styles


// ===== NEW APPROACH (Layer-based with CSS @layer) =====
// Input: <div class="card(gradient) c(red)">

// NEW OUTPUT:
/*
@layer component, layout, utility, state;

@layer component {
  .card\(gradient\) { 
    background: linear-gradient(...); 
    color: white; 
  }
}

@layer utility {
  .c\(red\) { 
    color: red; 
  }
}
*/

// Benefits of the layer approach:
// 1. No specificity hacks needed - layers handle cascade naturally
// 2. Cleaner CSS output without doubled selectors
// 3. Better browser DevTools support - layers are visible
// 4. More predictable cascade behavior
// 5. Easier to override with custom CSS

// Example with multiple layers:
/*
@layer component, layout, utility, state;

@layer component {
  .btn { 
    padding: 8px 16px;
    background: blue;
    color: white;
  }
}

@layer layout {
  .hbox { 
    display: flex;
    flex-direction: row;
  }
}

@layer utility {
  .p\(24\) { padding: 24px; }
  .bg\(red\) { background: red; }
}

@layer state {
  .hover\:bg\(darkred\):hover { 
    background: darkred; 
  }
}
*/

// The cascade order is: component < layout < utility < state
// Later layers always win, regardless of specificity