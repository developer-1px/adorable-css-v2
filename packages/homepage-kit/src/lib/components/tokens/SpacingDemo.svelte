<script lang="ts">
  export let spacing: string;
  export let value: string;
  export let label: string = '';
  export let variant: 'horizontal' | 'vertical' | 'box' = 'horizontal';
</script>

{#if variant === 'horizontal'}
  <div class="hbox(middle) gap(lg)">
    <div class="font(mono/sm) c(gray-600) w(60px) text(right)">{spacing}</div>
    <div class="flex(1) h(40px) bg(gray-100) r(md) relative overflow(hidden)">
      <div 
        class="h(full) bg(to-r/green-400..emerald-400) r(md)"
        style="width: {value}"
      ></div>
      <div class="absolute left(50%) top(50%) translate(-50%,-50%) font(xs) c(gray-700) mix-blend(multiply)">
        {value}
      </div>
    </div>
    {#if label}
      <div class="text(xs) c(gray-500) w(180px)">{label}</div>
    {/if}
  </div>
{:else if variant === 'vertical'}
  <div class="vbox(center) gap(sm) text(center)">
    <div class="font(mono/sm) c(gray-700)">{spacing}</div>
    <div class="w(48px) h(120px) bg(gray-100) r(md) relative">
      <div 
        class="w(full) bg(to-b/green-400..emerald-400) r(md) absolute bottom(0)"
        style="height: {value}"
      ></div>
    </div>
    <div class="font(xs) c(gray-500)">{value}</div>
  </div>
{:else}
  <div class="vbox(center) gap(sm) text(center)">
    <div 
      class="bg(white) border(2/dashed) border(green-400) r(lg) relative"
      style="padding: {value}"
    >
      <div class="w(64px) h(64px) bg(green-100) r(md) hbox(center/middle)">
        <span class="font(xs) c(green-700)">{spacing}</span>
      </div>
    </div>
    <div class="font(xs) c(gray-500)">{label}</div>
  </div>
{/if}