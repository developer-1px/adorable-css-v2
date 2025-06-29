<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' = 'text';
  export let value = '';
  export let placeholder = '';
  export let disabled = false;
  export let readonly = false;
  export let className = '';
  export let id = '';
  export let name = '';
  export let required = false;
  export let autocomplete = '';
  
  const dispatch = createEventDispatcher();
  
  const baseClasses = `
    flex h(40) w(full) r(md) border(1/gray-300) bg(white) px(sm) py(xs) 
    font(sm) file:border(0) file:bg(transparent) 
    file:font(sm) file:medium placeholder:c(gray-500) 
    focus-visible:outline(none) focus-visible:ring(2/blue-500) focus-visible:ring-offset(2) 
    disabled:cursor(not-allowed) disabled:opacity(0.5) disabled:bg(gray-50)
    hover:border(1/gray-400) transition-colors duration(150)
  `.replace(/\s+/g, ' ').trim();
  
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    dispatch('input', event);
  }
  
  function handleChange(event: Event) {
    dispatch('change', event);
  }
  
  function handleFocus(event: FocusEvent) {
    dispatch('focus', event);
  }
  
  function handleBlur(event: FocusEvent) {
    dispatch('blur', event);
  }
</script>

<input
  {type}
  {value}
  {placeholder}
  {disabled}
  {readonly}
  {id}
  {name}
  {required}
  {autocomplete}
  class="{baseClasses} {className}"
  on:input={handleInput}
  on:change={handleChange}
  on:focus={handleFocus}
  on:blur={handleBlur}
  on:keydown
  on:keypress
  on:keyup
/>

<style>
  input {
    font-family: inherit;
  }
  
  /* Remove default browser styling */
  input:focus {
    outline: none;
  }
  
  /* File input specific styling */
  input[type="file"]::file-selector-button {
    background: none;
    border: none;
    font-size: inherit;
    font-weight: 500;
    cursor: pointer;
  }
</style>