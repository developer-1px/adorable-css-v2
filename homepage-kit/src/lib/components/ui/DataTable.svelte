<script lang="ts">
  import { BarChart3 as ChartIcon } from 'lucide-svelte';
  
  export let columns: Array<{
    key: string;
    label: string;
    align?: 'left' | 'center' | 'right';
    width?: string;
  }> = [];
  
  export let data: Array<Record<string, any>> = [];
  export let selectable = false;
  export let hoverable = true;
  
  let selectedRows = new Set<number>();
  
  function toggleRow(index: number) {
    if (selectedRows.has(index)) {
      selectedRows.delete(index);
    } else {
      selectedRows.add(index);
    }
    selectedRows = selectedRows;
  }
  
  function toggleAll() {
    if (selectedRows.size === data.length) {
      selectedRows.clear();
    } else {
      data.forEach((_, i) => selectedRows.add(i));
    }
    selectedRows = selectedRows;
  }
</script>

<div class="table-container w(fill) overflow(auto) r(lg) border(1/#e5e7eb) bg(white)">
  <table class="data-table w(fill)">
    <thead class="bg(#f9fafb) border-bottom(1/#e5e7eb)">
      <tr>
        {#if selectable}
          <th class="px(md) py(sm) w(3xl)">
            <input 
              type="checkbox"
              checked={selectedRows.size === data.length && data.length > 0}
              indeterminate={selectedRows.size > 0 && selectedRows.size < data.length}
              on:change={toggleAll}
              class="checkbox w(md) h(md) r(xs) border(1/#d1d5db) cursor(pointer)"
            />
          </th>
        {/if}
        {#each columns as column}
          <th 
            class="px(md) py(sm) text({column.align || 'left'}) 500 font(xs/normal/0.05em) c(#6b7280) uppercase"
            style={column.width ? `width: ${column.width}` : ''}
          >
            {column.label}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data as row, index}
        <tr 
          class="border-bottom(1/#f3f4f6) transition
            {hoverable ? 'hover:bg(#f9fafb)' : ''}
            {selectedRows.has(index) ? 'bg(#eff6ff)' : ''}"
        >
          {#if selectable}
            <td class="px(md) py(md)">
              <input 
                type="checkbox"
                checked={selectedRows.has(index)}
                on:change={() => toggleRow(index)}
                class="checkbox w(md) h(md) r(xs) border(1/#d1d5db) cursor(pointer)"
              />
            </td>
          {/if}
          {#each columns as column}
            <td class="px(md) py(md) text({column.align || 'left'})">
              <slot name="cell" {column} {row} value={row[column.key]}>
                <span class="font(sm) c(#374151)">{row[column.key]}</span>
              </slot>
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  
  {#if data.length === 0}
    <div class="empty-state vbox(pack) gap(sm) py(3xl) text(center)">
      <ChartIcon size="48" class="c(#e5e7eb)" />
      <p class="font(sm) c(#9ca3af)">No data available</p>
    </div>
  {/if}
</div>

<style>
  .data-table {
    border-collapse: collapse;
    table-layout: fixed;
  }
  
  .checkbox {
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    background: white;
    transition: all 0.15s ease;
  }
  
  .checkbox:checked {
    background: #3b82f6;
    border-color: #3b82f6;
  }
  
  .checkbox:checked::after {
    content: '';
    position: absolute;
    left: 4px;
    top: 1px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  
  .checkbox[indeterminate="true"]::after {
    content: '';
    position: absolute;
    left: 3px;
    top: 6px;
    width: 8px;
    height: 2px;
    background: #3b82f6;
    border: none;
    transform: none;
  }
  
  tbody tr {
    position: relative;
  }
  
  tbody tr::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    background: #f3f4f6;
  }
</style>