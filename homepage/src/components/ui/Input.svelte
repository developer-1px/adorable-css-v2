<script lang="ts">
  export let type: string = 'text';
  export let placeholder: string = '';
  export let value: string = '';
  export let disabled: boolean = false;
  export let error: boolean = false;
  export let icon: string = '';
  export let label: string = '';
  export let helper: string = '';
  
  let focused = false;
</script>

<div class="input-wrapper vbox gap(6)">
  {#if label}
    <label class="input-label font(13) medium c(#374151)">
      {label}
      {#if $$slots.required}
        <span class="c(#ef4444)">*</span>
      {/if}
    </label>
  {/if}
  
  <div class="input-container relative">
    {#if icon}
      <span class="input-icon absolute left(12) y(center) c(#9ca3af) font(16) pointer-events(none)">
        {icon}
      </span>
    {/if}
    
    <input
      {type}
      {placeholder}
      bind:value
      {disabled}
      on:focus={() => focused = true}
      on:blur={() => focused = false}
      on:input
      on:change
      on:keydown
      class="input w(fill) h(40) r(8) border(1) font(14) c(#111827) bg(white) transition
        {icon ? 'pl(40) pr(16)' : 'px(16)'}
        {error ? 'border(1/#ef4444) focus:border(1/#dc2626)' : 'border(1/#e5e7eb) focus:border(1/#3b82f6)'}
        {disabled ? 'bg(#f9fafb) c(#9ca3af) cursor(not-allowed)' : ''}
        placeholder:c(#9ca3af)
        focus:shadow(0/0/0/3px/{error ? '#ef444420' : '#3b82f620'})
        hover:border(1/{error ? '#ef4444' : '#d1d5db'})"
    />
    
    {#if $$slots.suffix}
      <div class="input-suffix absolute right(12) y(center)">
        <slot name="suffix" />
      </div>
    {/if}
  </div>
  
  {#if helper || error}
    <p class="input-helper font(12) {error ? 'c(#ef4444)' : 'c(#6b7280)'}">
      {error ? helper : helper}
    </p>
  {/if}
</div>

<style>
  .input {
    outline: none;
    font-family: inherit;
  }
  
  .input::-webkit-search-decoration,
  .input::-webkit-search-cancel-button,
  .input::-webkit-search-results-button,
  .input::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
  
  /* Number input spinner buttons */
  .input[type="number"]::-webkit-inner-spin-button,
  .input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  .input[type="number"] {
    -moz-appearance: textfield;
  }
</style>