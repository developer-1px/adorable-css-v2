<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  
  const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
</script>

<div class="min-h(100vh) bg(white)">
  <!-- Hero Section -->
  <section class="bg(mute-50) py(4xl)">
    <div class="container(5xl) mx(auto) px(2xl)">
      <div class="vbox(center) gap(2xl)">
        <Badge variant="secondary">New Rule</Badge>
        <h1 class="heading(display/xl) c(mute-900)">
          Truncate Rule
        </h1>
        <p class="body(xl) c(mute-600) max-w(4xl)">
          Elegant text truncation with ellipsis. Single-line by default, multi-line with line clamping.
        </p>
      </div>
    </div>
  </section>

  <!-- Examples Section -->
  <section class="py(6xl)">
    <div class="container(5xl) mx(auto) px(2xl)">
      <div class="vbox gap(4xl)">
        
        <!-- Single Line Truncation -->
        <div class="vbox gap(2xl)">
          <h2 class="heading(h2) c(mute-900)">Single Line Truncation</h2>
          <p class="body(lg) c(mute-600)">
            Use <code class="code">truncate</code> or <code class="code">truncate(1)</code> for single-line ellipsis.
          </p>
          
          <div class="grid(2) gap(xl)">
            <Card>
              <div class="p(2xl) vbox gap(xl)">
                <h3 class="heading(h4) c(mute-800)">Default (No truncate)</h3>
                <div class="p(xl) bg(mute-50) r(lg)">
                  <p class="body(base) c(mute-700)">
                    {longText}
                  </p>
                </div>
                <code class="code(sm) c(mute-600)">body(base) c(mute-700)</code>
              </div>
            </Card>
            
            <Card>
              <div class="p(2xl) vbox gap(xl)">
                <h3 class="heading(h4) c(mute-800)">With truncate</h3>
                <div class="p(xl) bg(mute-50) r(lg)">
                  <p class="body(base) c(mute-700) truncate">
                    {longText}
                  </p>
                </div>
                <code class="code(sm) c(primary)">body(base) c(mute-700) truncate</code>
              </div>
            </Card>
          </div>
        </div>

        <!-- Multi-line Truncation -->
        <div class="vbox gap(2xl)">
          <h2 class="heading(h2) c(mute-900)">Multi-line Truncation</h2>
          <p class="body(lg) c(mute-600)">
            Use <code class="code">truncate(2)</code>, <code class="code">truncate(3)</code>, etc. for line clamping.
          </p>
          
          <div class="grid(3) gap(xl)">
            <Card>
              <div class="p(xl) vbox gap(lg)">
                <h3 class="heading(h5) c(mute-800)">2 Lines</h3>
                <p class="body(base) c(mute-700) truncate(2)">
                  {longText}
                </p>
                <code class="code(xs) c(primary)">truncate(2)</code>
              </div>
            </Card>
            
            <Card>
              <div class="p(xl) vbox gap(lg)">
                <h3 class="heading(h5) c(mute-800)">3 Lines</h3>
                <p class="body(base) c(mute-700) truncate(3)">
                  {longText}
                </p>
                <code class="code(xs) c(primary)">truncate(3)</code>
              </div>
            </Card>
            
            <Card>
              <div class="p(xl) vbox gap(lg)">
                <h3 class="heading(h5) c(mute-800)">4 Lines</h3>
                <p class="body(base) c(mute-700) truncate(4)">
                  {longText}
                </p>
                <code class="code(xs) c(primary)">truncate(4)</code>
              </div>
            </Card>
          </div>
        </div>

        <!-- Real-world Examples -->
        <div class="vbox gap(2xl)">
          <h2 class="heading(h2) c(mute-900)">Real-world Examples</h2>
          
          <div class="grid(2) gap(xl)">
            <!-- Card Example -->
            <Card variant="elevated">
              <div class="p(2xl) vbox gap(lg)">
                <Badge variant="secondary" size="sm">Article</Badge>
                <h3 class="heading(h3) c(mute-900) truncate">
                  Building Scalable Web Applications with Modern JavaScript Frameworks and Best Practices
                </h3>
                <p class="body(base) c(mute-600) truncate(3)">
                  In this comprehensive guide, we'll explore the essential patterns and practices for building scalable web applications. From architecture decisions to performance optimization, we'll cover everything you need to know to create robust, maintainable applications that can grow with your business needs.
                </p>
                <div class="hbox(middle) gap(md)">
                  <div class="w(32) h(32) r(full) bg(mute-200)"></div>
                  <div class="vbox gap(xs)">
                    <p class="label(sm) c(mute-800) truncate">
                      Dr. Sarah Johnson, Senior Software Engineer
                    </p>
                    <p class="caption c(mute-600)">5 min read</p>
                  </div>
                </div>
              </div>
            </Card>

            <!-- List Example -->
            <Card variant="elevated">
              <div class="p(2xl) vbox gap(xl)">
                <h3 class="heading(h3) c(mute-900)">Recent Messages</h3>
                <div class="vbox gap(lg)">
                  {#each [1, 2, 3] as i}
                    <div class="hbox gap(lg) pb(lg) border-b(1/mute-100)">
                      <div class="w(40) h(40) r(full) bg(primary.1) flex-shrink(0)"></div>
                      <div class="vbox gap(xs) flex(1) min-w(0)">
                        <div class="hbox(middle) gap(sm)">
                          <p class="label(sm) c(mute-900) truncate">
                            Team Discussion: Q4 Planning and Strategy Meeting Notes
                          </p>
                          <span class="caption c(mute-500) flex-shrink(0)">2h</span>
                        </div>
                        <p class="body(sm) c(mute-600) truncate(2)">
                          Hey team, I've compiled all the notes from our planning session. The key priorities we discussed include the new feature rollout, infrastructure improvements, and the upcoming marketing campaign. Let me know if you have any questions or if I missed anything important.
                        </p>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </Card>
          </div>
        </div>

        <!-- Usage Guide -->
        <Card variant="elevated">
          <div class="p(3xl) vbox gap(2xl)">
            <h2 class="heading(h2) c(mute-900)">Usage Guide</h2>
            
            <div class="grid(2) gap(2xl)">
              <div class="vbox gap(lg)">
                <h3 class="heading(h4) c(mute-800)">Syntax</h3>
                <div class="vbox gap(md)">
                  <div class="p(lg) bg(mute-50) r(lg)">
                    <code class="code c(mute-800)">truncate</code>
                    <p class="caption c(mute-600) pt(sm)">Single line with ellipsis</p>
                  </div>
                  <div class="p(lg) bg(mute-50) r(lg)">
                    <code class="code c(mute-800)">truncate(n)</code>
                    <p class="caption c(mute-600) pt(sm)">Clamp to n lines (n ≥ 2)</p>
                  </div>
                </div>
              </div>
              
              <div class="vbox gap(lg)">
                <h3 class="heading(h4) c(mute-800)">CSS Output</h3>
                <div class="vbox gap(md)">
                  <div class="p(lg) bg(mute-900) r(lg)">
                    <pre class="code(sm) c(white)">/* truncate */
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;</pre>
                  </div>
                  <div class="p(lg) bg(mute-900) r(lg)">
                    <pre class="code(sm) c(white)">/* truncate(3) */
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
      </div>
    </div>
  </section>
</div>