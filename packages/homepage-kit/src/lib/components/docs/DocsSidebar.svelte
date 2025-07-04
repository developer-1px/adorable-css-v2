<script lang="ts">
  import type { ComponentType } from 'svelte';
  
  export let title: string = 'Navigation';
  export let items: Array<{
    title: string;
    icon?: ComponentType;
    color?: string;
    onClick?: () => void;
    active?: boolean;
    href?: string;
    badge?: string;
    children?: Array<{
      title: string;
      onClick?: () => void;
      active?: boolean;
      href?: string;
      count?: number;
    }>;
    expanded?: boolean;
  }> = [];
  export let className: string = '';
  export let sticky: boolean = true;
  export let width: string = '280px';
  export let variant: 'simple' | 'sections' | 'hierarchical' = 'simple';
  
  function handleItemClick(item: any) {
    if (item.onClick) {
      item.onClick();
    }
  }
</script>

<aside class="docs-sidebar shrink(0) {className}" style="width: {width}">
  <nav class="{sticky ? 'sticky top(120px)' : ''}">
    {#if variant === 'simple'}
      <div class="vbox gap(xs)">
        {#if title}
          <h3 class="font(sm) bold uppercase c(neutral-500) mb(md) px(md) tracking(0.1em)">{title}</h3>
        {/if}
        
        {#each items as item}
          {#if item.href}
            <a
              href={item.href}
              class="docs-sidebar-item w(full) text(left) px(md) py(sm) r(lg) transition hbox(middle) gap(sm)"
              class:active={item.active}
            >
              {#if item.icon}
                <svelte:component this={item.icon} size="16" class={item.color ? `c(${item.color}-500)` : 'c(neutral-500)'} />
              {/if}
              <span class="font(sm) medium">{item.title}</span>
            </a>
          {:else}
            <button
              class="docs-sidebar-item w(full) text(left) px(md) py(sm) r(lg) transition hbox(middle) gap(sm)"
              class:active={item.active}
              on:click={() => handleItemClick(item)}
            >
              {#if item.icon}
                <svelte:component this={item.icon} size="16" class={item.color ? `c(${item.color}-500)` : 'c(neutral-500)'} />
              {/if}
              <span class="font(sm) medium">{item.title}</span>
            </button>
          {/if}
        {/each}
      </div>
    
    {:else if variant === 'sections'}
      <div class="px(md) py(lg) scroll(y) flex(1)">
        {#each items as section}
          <div class="mb(lg)">
            <h3 class="px(sm) font(xs) bold uppercase tracking(wider) c(neutral-500) mb(sm)">{section.title}</h3>
            <ul class="vbox gap(xs)">
              {#each section.children || [] as item}
                <li>
                  {#if item.href}
                    <a 
                      href={item.href}
                      class="docs-sidebar-item nav-link"
                      class:active={item.active}
                    >
                      <span class="hbox(middle) gap(sm)">
                        {#if section.icon}
                          <svelte:component this={section.icon} size="14" class="transition" />
                        {/if}
                        {item.title}
                        {#if section.badge}
                          <span class="font(xs) px(xs) py(0.5) r(sm) uppercase {section.badge === 'new' ? 'bg(success-100) c(success-700)' : section.badge === 'beta' ? 'bg(warning-100) c(warning-700)' : 'bg(neutral-100) c(neutral-700)'}">
                            {section.badge}
                          </span>
                        {/if}
                      </span>
                    </a>
                  {:else}
                    <button
                      class="docs-sidebar-item nav-link"
                      class:active={item.active}
                      on:click={() => handleItemClick(item)}
                    >
                      {item.title}
                    </button>
                  {/if}
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    
    {:else if variant === 'hierarchical'}
      <div class="px(md) py(lg)">
        {#if title}
          <h3 class="font(xs) mono uppercase tracking(wider) c(neutral-500) mb(lg) px(md)">{title}</h3>
        {/if}
        <ul class="vbox gap(lg)">
          {#each items as item}
            <li>
              <button
                class="w(full) text(left) px(md) py(sm) font(lg) bold transition {item.expanded !== false ? 'c(neutral-900)' : 'c(neutral-600)'}"
                on:click={() => handleItemClick(item)}
              >
                <div class="hbox(middle) gap(auto)">
                  <span>{item.title}</span>
                  {#if item.count}
                    <span class="font(xs) mono c(neutral-400)">
                      {item.count}
                    </span>
                  {/if}
                </div>
              </button>
              
              {#if item.expanded !== false && item.children}
                <ul class="vbox gap(0) mt(sm) mb(sm)">
                  {#each item.children as child}
                    <li>
                      <button
                        class="w(full) text(left) px(md) pl(2xl) py(xs) font(sm) transition {child.active ? 'c(neutral-900)' : 'c(neutral-500)'}"
                        on:click={() => handleItemClick(child)}
                      >
                        <div class="hbox(middle) gap(auto)">
                          <span>· {child.title}</span>
                          {#if child.count}
                            <span class="font(xs) mono c(neutral-400)">
                              {child.count}
                            </span>
                          {/if}
                        </div>
                      </button>
                    </li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </nav>
</aside>

<style>
  .docs-sidebar-item {
    color: var(--neutral-600, #6b7280);
    border: none;
    background: transparent;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: all 0.15s ease;
  }
  
  .docs-sidebar-item.active {
    background-color: var(--white, #ffffff);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    color: var(--neutral-900, #111827);
  }
  
  .docs-sidebar-item:hover:not(.active) {
    background-color: var(--neutral-100, #f3f4f6);
  }
  
  .docs-sidebar-item:focus {
    outline: 2px solid rgba(59, 130, 246, 0.5);
    outline-offset: 2px;
  }
</style>