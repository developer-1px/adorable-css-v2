<script lang="ts">
  const footerLinks = [
    {
      title: 'Documentation',
      links: [
        { label: 'Introduction', href: '/docs' },
        { label: 'Components', href: '/components' },
        { label: 'Playground', href: '/playground' },
        { label: 'Examples', href: 'https://github.com/developer-1px/adorable-css-v2', external: true }
      ]
    },
    {
      title: 'Community',
      links: [
        { label: 'GitHub', href: 'https://github.com/developer-1px/adorable-css-v2', external: true },
        { label: 'Discord', href: 'https://github.com/developer-1px/adorable-css-v2', external: true },
        { label: 'Twitter', href: 'https://twitter.com/adorablecss', external: true }
      ]
    },
    {
      title: 'More',
      links: [
        { label: 'Blog', href: 'https://velog.io/@teo/series/AdorableCSS', external: true },
        { label: 'Releases', href: 'https://github.com/developer-1px/adorable-css-v2', external: true },
        { label: 'License', href: 'https://github.com/developer-1px/adorable-css-v2', external: true }
      ]
    }
  ];
</script>

<footer class="bg(gray-50) border-t(1/gray-200)">
  <div class="container() py(10xl)">
    <div class="grid(1) lg:grid(4) gap(6xl) mb(8xl)">
      <!-- Brand -->
      <div class="vbox gap(xl)">
        <div class="hbox(middle) gap(sm)">
          <div class="size(32) bg(indigo-600) r(lg)"></div>
          <h3 class="text(xl/-/tight) bold c(gray-900)">AdorableCSS</h3>
        </div>
        <p class="text(md/relaxed) c(gray-500) max-w(300)">
          Beautifully designed components built with Figma and AdorableCSS. Copy and paste into your apps.
        </p>
      </div>
      
      <!-- Links -->
      {#each footerLinks as section}
        <div class="vbox gap(xl)">
          <h4 class="text(xs/-/widest) bold c(gray-900) uppercase">{section.title}</h4>
          <ul class="vbox gap(md)">
            {#each section.links as link}
              <li>
                <a 
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  class="text(sm) bold(medium) c(gray-500) hover:c(indigo-600) transition"
                >
                  {link.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
    
    <!-- Bottom -->
    <div class="pt(4xl) border-t(1/gray-200) hbox(center) md:justify(between) wrap gap(xl)">
      <p class="text(sm) c(gray-400)">
        © 2024 AdorableCSS. Built by <a href="https://twitter.com/1px" class="c(gray-500) hover:c(gray-900) transition">@1px</a>.
      </p>
      <div class="hbox gap(lg)">
        <a href="https://github.com/developer-1px/adorable-css-v2" class="text(sm) c(gray-400) hover:c(gray-900) transition">GitHub</a>
        <a href="https://twitter.com/adorablecss" class="text(sm) c(gray-400) hover:c(gray-900) transition">Twitter</a>
      </div>
    </div>
  </div>
</footer>