<script lang="ts">
  const footerLinks = [
    {
      title: 'Documentation',
      links: [
        { label: 'Introduction', href: '/docs' },
        { label: 'Installation', href: '/docs/installation' },
        { label: 'Components', href: '/docs/components' },
        { label: 'Examples', href: '/examples' }
      ]
    },
    {
      title: 'Community',
      links: [
        { label: 'GitHub', href: 'https://github.com/adorablecss/adorable-css', external: true },
        { label: 'Discord', href: '/discord', external: true },
        { label: 'Twitter', href: 'https://twitter.com/adorablecss', external: true }
      ]
    },
    {
      title: 'More',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Releases', href: '/releases' },
        { label: 'License', href: '/license' }
      ]
    }
  ];
</script>

<footer class="border-t(1/gray-200)">
  <div class="container() py(4xl)">
    <div class="grid(4) gap(2xl) mb(4xl)">
      <!-- Brand -->
      <div class="vbox gap(lg)">
        <h3 class="font(md) bold">adorable/css</h3>
        <p class="font(sm) c(mute)">
          Beautifully designed components built with Figma and AdorableCSS. Copy and paste into your apps.
        </p>
      </div>
      
      <!-- Links -->
      {#each footerLinks as section}
        <div class="vbox gap(lg)">
          <h4 class="font(sm) bold">{section.title}</h4>
          <ul class="vbox gap(sm)">
            {#each section.links as link}
              <li>
                <a 
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  class="font(sm) c(mute) hover:c(gray-900) transition"
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
    <div class="pt(2xl) border-t(1/gray-200)">
      <p class="font(sm) c(mute)">
        Built by <a href="https://twitter.com/1px" class="underline hover:c(gray-900)">@1px</a>. 
        The source code is available on <a href="https://github.com/adorablecss/adorable-css" class="underline hover:c(gray-900)">GitHub</a>.
      </p>
    </div>
  </div>
</footer>