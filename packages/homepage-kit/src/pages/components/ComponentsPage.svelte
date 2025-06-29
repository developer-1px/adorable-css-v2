<script lang="ts">
  // Import shadcn/ui style components
  import Button from '$lib/components/ui/Button.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import CardHeader from '$lib/components/ui/CardHeader.svelte';
  import CardTitle from '$lib/components/ui/CardTitle.svelte';
  import CardDescription from '$lib/components/ui/CardDescription.svelte';
  import CardContent from '$lib/components/ui/CardContent.svelte';
  import CardFooter from '$lib/components/ui/CardFooter.svelte';
  import Avatar from '$lib/components/ui/Avatar.svelte';
  import AvatarImage from '$lib/components/ui/AvatarImage.svelte';
  import AvatarFallback from '$lib/components/ui/AvatarFallback.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import { 
    Flame as FireIcon, 
    Palette, 
    Layers,
    Copy,
    Sparkles,
    Component,
    MousePointer,
    User,
    Hash,
    Type,
    Square
  } from 'lucide-svelte';
  
  let searchValue = '';
  let copiedCode = '';
  
  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    copiedCode = code;
    setTimeout(() => copiedCode = '', 2000);
  }
</script>

<div class="min-h(screen) bg(gray-50) relative">
  <!-- Premium Background Pattern -->
  <div class="layer(fill) clip pointer-events(none) opacity(0.4)">
    <!-- Gradient mesh background -->
    <div class="absolute inset(0) bg(to-br/purple-50..transparent_40%..blue-50)"></div>
    <div class="absolute inset(0) bg(to-tl/pink-50..transparent_60%..indigo-50)"></div>
    
    <!-- Floating orbs for depth -->
    <div class="absolute w(600px) h(600px) r(full) bg(radial-gradient/purple-200.3..transparent) blur(3xl) top(-200px) left(-200px) float-slow"></div>
    <div class="absolute w(500px) h(500px) r(full) bg(radial-gradient/blue-200.3..transparent) blur(3xl) bottom(-150px) right(-150px) float-slow-delayed"></div>
    <div class="absolute w(400px) h(400px) r(full) bg(radial-gradient/indigo-200.3..transparent) blur(3xl) top(50%) left(50%) translate(-50%,-50%) float-slow-delayed-more"></div>
  </div>
  
  <!-- Header with refined design -->
  <header class="relative z(10) pt(4xl) pb(3xl) px(xl) overflow(hidden)">
    <div class="container(7xl) mx(auto)">
      <!-- Decorative element -->
      <div class="hbox(center) gap(xs) mb(xl) fade-down">
        <span class="inline-block w(40px) h(1px) bg(to-r/transparent..purple-400)"></span>
        <span class="text(xs) uppercase tracking(0.2em) c(purple-600) font(medium)">Component Library</span>
        <span class="inline-block w(40px) h(1px) bg(to-l/transparent..purple-400)"></span>
      </div>
      
      <h1 class="font(4xl) bold(800) text(center) letter-spacing(-0.035em) c(gray-900) mb(lg) fade-up">
        UI Components
      </h1>
      
      <p class="text(xl) text(center) c(gray-600) max-w(2xl) mx(auto) fade-up-delayed">
        Modern, accessible, and beautifully designed components inspired by shadcn/ui
      </p>
    </div>
  </header>
  
  <!-- Main Content -->
  <main class="relative z(10)">
    <div class="container(7xl) mx(auto) px(xl) pb(4xl)">
      <div class="vbox gap(4xl)">
  
        <!-- Button Components -->
        <div class="bg(white) r(3xl) shadow(2xl) shadow(purple-100.3) overflow(hidden) border(1px/gray-100)">
          <div class="bg(to-r/purple-50..indigo-50) p(2xl) border-b(1px/purple-100)">
            <div class="hbox(between/middle) mb(xl)">
              <div>
                <h2 class="heading(h2) c(gray-900) mb(sm)">Button Components</h2>
                <p class="text(base) c(gray-600) max-w(xl)">Interactive elements with multiple variants, sizes, and states</p>
              </div>
              <div class="p(lg) r(2xl) bg(white) shadow(lg)">
                <MousePointer size="24" class="c(purple-500)" />
              </div>
            </div>
          </div>
          
          <div class="p(2xl)">
            <div class="vbox gap(2xl)">
              <!-- Variants -->
              <div class="vbox gap(lg)">
                <div class="hbox(between/middle)">
                  <h3 class="heading(h4) c(gray-900)">Variants</h3>
                  <button 
                    class="px(sm) py(xs) r(lg) bg(purple-100) c(purple-700) text(xs) hover:bg(purple-200) transition hbox(middle) gap(xs)"
                    on:click={() => copyCode('<Button variant="default">Text</Button>')}>
                    <Copy size="12" />
                    {copiedCode.includes('Button') ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
                <div class="hbox gap(md) flex-wrap">
                  <Button>Default</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
              
              <!-- Sizes -->
              <div class="vbox gap(lg)">
                <h3 class="heading(h4) c(gray-900)">Sizes</h3>
                <div class="hbox(middle) gap(md)">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon"><FireIcon size="16" /></Button>
                </div>
              </div>
              
              <!-- States -->
              <div class="vbox gap(lg)">
                <h3 class="heading(h4) c(gray-900)">States</h3>
                <div class="hbox gap(md) flex-wrap">
                  <Button loading>Loading</Button>
                  <Button disabled>Disabled</Button>
                  <Button href="#showcase">As Link</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Card Components -->
        <div class="bg(white) r(3xl) shadow(2xl) shadow(blue-100.3) overflow(hidden) border(1px/gray-100)">
          <div class="bg(to-r/blue-50..indigo-50) p(2xl) border-b(1px/blue-100)">
            <div class="hbox(between/middle) mb(xl)">
              <div>
                <h2 class="heading(h2) c(gray-900) mb(sm)">Card Components</h2>
                <p class="text(base) c(gray-600) max-w(xl)">Composable card structure with header, content, and footer sections</p>
              </div>
              <div class="p(lg) r(2xl) bg(white) shadow(lg)">
                <Layers size="24" class="c(blue-500)" />
              </div>
            </div>
          </div>
          
          <div class="p(2xl)">
            <div class="grid(3) gap(xl)">
              <!-- Simple Card -->
              <div class="bg(gray-50) r(2xl) p(xl) hover:bg(white) hover:shadow(lg) transition-all duration-300 border(1px/transparent) hover:border(blue-200)">
                <h4 class="heading(h4) c(gray-900) mb(sm)">Simple Card</h4>
                <p class="text(sm) c(gray-600) mb(lg)">A basic card example with header and content</p>
                <div class="bg(white) r(lg) p(md) shadow(sm)">
                  <p class="text(xs) c(gray-600)">This is the card content area where you can put any content.</p>
                </div>
              </div>
              
              <!-- Card with Footer -->
              <div class="bg(gray-50) r(2xl) p(xl) hover:bg(white) hover:shadow(lg) transition-all duration-300 border(1px/transparent) hover:border(blue-200)">
                <h4 class="heading(h4) c(gray-900) mb(sm)">Card with Footer</h4>
                <p class="text(sm) c(gray-600) mb(lg)">Includes action buttons in footer</p>
                <div class="bg(white) r(lg) p(md) shadow(sm) vbox gap(md)">
                  <p class="text(xs) c(gray-600)">Content with actions in the footer.</p>
                  <div class="hbox gap(xs) pt(sm) border-t(1px/gray-100)">
                    <Button size="sm" variant="outline">Cancel</Button>
                    <Button size="sm">Save</Button>
                  </div>
                </div>
              </div>
              
              <!-- Card with Avatar -->
              <div class="bg(gray-50) r(2xl) p(xl) hover:bg(white) hover:shadow(lg) transition-all duration-300 border(1px/transparent) hover:border(blue-200)">
                <h4 class="heading(h4) c(gray-900) mb(sm)">Profile Card</h4>
                <p class="text(sm) c(gray-600) mb(lg)">Card with avatar and user info</p>
                <div class="bg(white) r(lg) p(md) shadow(sm)">
                  <div class="hbox(middle) gap(sm) mb(sm)">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div class="vbox gap(xs)">
                      <div class="text(sm) bold c(gray-900)">John Doe</div>
                      <div class="text(xs) c(gray-500)">Software Engineer</div>
                    </div>
                  </div>
                  <p class="text(xs) c(gray-600)">Profile card with avatar and user information.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Avatar Components -->
        <div class="bg(white) r(3xl) shadow(2xl) shadow(green-100.3) overflow(hidden) border(1px/gray-100)">
          <div class="bg(to-r/green-50..emerald-50) p(2xl) border-b(1px/green-100)">
            <div class="hbox(between/middle) mb(xl)">
              <div>
                <h2 class="heading(h2) c(gray-900) mb(sm)">Avatar Components</h2>
                <p class="text(base) c(gray-600) max-w(xl)">User avatars with multiple sizes and automatic image fallback</p>
              </div>
              <div class="p(lg) r(2xl) bg(white) shadow(lg)">
                <User size="24" class="c(green-500)" />
              </div>
            </div>
          </div>
          
          <div class="p(2xl)">
            <div class="vbox gap(2xl)">
              <!-- Sizes -->
              <div class="vbox gap(lg)">
                <h3 class="heading(h4) c(gray-900)">Sizes</h3>
                <div class="hbox(middle) gap(xl)">
                  <div class="vbox(center) gap(sm)">
                    <Avatar size="sm">
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <span class="text(xs) c(gray-500) font(mono)">sm</span>
                  </div>
                  <div class="vbox(center) gap(sm)">
                    <Avatar>
                      <AvatarFallback>MD</AvatarFallback>
                    </Avatar>
                    <span class="text(xs) c(gray-500) font(mono)">default</span>
                  </div>
                  <div class="vbox(center) gap(sm)">
                    <Avatar size="lg">
                      <AvatarFallback>LG</AvatarFallback>
                    </Avatar>
                    <span class="text(xs) c(gray-500) font(mono)">lg</span>
                  </div>
                  <div class="vbox(center) gap(sm)">
                    <Avatar size="xl">
                      <AvatarFallback>XL</AvatarFallback>
                    </Avatar>
                    <span class="text(xs) c(gray-500) font(mono)">xl</span>
                  </div>
                </div>
              </div>
              
              <!-- With Images -->
              <div class="vbox gap(lg)">
                <h3 class="heading(h4) c(gray-900)">Image Fallback</h3>
                <div class="hbox gap(xl)">
                  <div class="vbox(center) gap(sm)">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span class="text(xs) c(gray-500)">Valid image</span>
                  </div>
                  <div class="vbox(center) gap(sm)">
                    <Avatar>
                      <AvatarImage src="https://invalid-url.jpg" alt="broken" />
                      <AvatarFallback>FB</AvatarFallback>
                    </Avatar>
                    <span class="text(xs) c(gray-500)">Fallback text</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Badge Components -->
        <div class="bg(white) r(3xl) shadow(2xl) shadow(orange-100.3) overflow(hidden) border(1px/gray-100)">
          <div class="bg(to-r/orange-50..amber-50) p(2xl) border-b(1px/orange-100)">
            <div class="hbox(between/middle) mb(xl)">
              <div>
                <h2 class="heading(h2) c(gray-900) mb(sm)">Badge Components</h2>
                <p class="text(base) c(gray-600) max-w(xl)">Small status indicators and labels for UI states</p>
              </div>
              <div class="p(lg) r(2xl) bg(white) shadow(lg)">
                <Hash size="24" class="c(orange-500)" />
              </div>
            </div>
          </div>
          
          <div class="p(2xl)">
            <div class="vbox gap(2xl)">
              <!-- Variants -->
              <div class="vbox gap(lg)">
                <h3 class="heading(h4) c(gray-900)">Variants</h3>
                <div class="hbox(middle) gap(md)">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>
              
              <!-- In Context -->
              <div class="vbox gap(lg)">
                <h3 class="heading(h4) c(gray-900)">Usage Examples</h3>
                <div class="grid(3) gap(lg)">
                  <div class="bg(gray-50) r(lg) p(lg) vbox gap(sm)">
                    <div class="hbox(between/middle)">
                      <span class="text(sm) c(gray-700)">Server Status:</span>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div class="hbox(between/middle)">
                      <span class="text(sm) c(gray-700)">Environment:</span>
                      <Badge>Production</Badge>
                    </div>
                  </div>
                  <div class="bg(gray-50) r(lg) p(lg) vbox gap(sm)">
                    <div class="hbox(between/middle)">
                      <span class="text(sm) c(gray-700)">Priority:</span>
                      <Badge variant="destructive">High</Badge>
                    </div>
                    <div class="hbox(between/middle)">
                      <span class="text(sm) c(gray-700)">Type:</span>
                      <Badge variant="outline">Bug</Badge>
                    </div>
                  </div>
                  <div class="bg(gray-50) r(lg) p(lg) vbox gap(sm)">
                    <div class="hbox(between/middle)">
                      <span class="text(sm) c(gray-700)">Version:</span>
                      <Badge variant="outline">v2.0.0</Badge>
                    </div>
                    <div class="hbox(between/middle)">
                      <span class="text(sm) c(gray-700)">Build:</span>
                      <Badge variant="secondary">Latest</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Input Components -->
        <div class="bg(white) r(3xl) shadow(2xl) shadow(indigo-100.3) overflow(hidden) border(1px/gray-100)">
          <div class="bg(to-r/indigo-50..purple-50) p(2xl) border-b(1px/indigo-100)">
            <div class="hbox(between/middle) mb(xl)">
              <div>
                <h2 class="heading(h2) c(gray-900) mb(sm)">Input Components</h2>
                <p class="text(base) c(gray-600) max-w(xl)">Form input fields with proper focus states and validation</p>
              </div>
              <div class="p(lg) r(2xl) bg(white) shadow(lg)">
                <Type size="24" class="c(indigo-500)" />
              </div>
            </div>
          </div>
          
          <div class="p(2xl)">
            <div class="vbox gap(2xl)">
              <!-- Interactive Input -->
              <div class="vbox gap(lg)">
                <h3 class="heading(h4) c(gray-900)">Interactive Demo</h3>
                <div class="vbox gap(md)">
                  <Input 
                    bind:value={searchValue} 
                    placeholder="Type something to see it react..." 
                    className="max-w(md)"
                  />
                  {#if searchValue}
                    <div class="bg(indigo-50) border(1px/indigo-200) r(lg) p(md)">
                      <p class="text(sm) c(indigo-700)">✓ You typed: <strong>{searchValue}</strong></p>
                    </div>
                  {/if}
                </div>
              </div>
              
              <!-- Input Types -->
              <div class="vbox gap(lg)">
                <h3 class="heading(h4) c(gray-900)">Input Types</h3>
                <div class="grid(2) gap(lg)">
                  <div class="vbox gap(sm)">
                    <label class="text(sm) c(gray-700) font(medium)">Email</label>
                    <Input type="email" placeholder="user@example.com" />
                  </div>
                  <div class="vbox gap(sm)">
                    <label class="text(sm) c(gray-700) font(medium)">Password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div class="vbox gap(sm)">
                    <label class="text(sm) c(gray-700) font(medium)">Number</label>
                    <Input type="number" placeholder="25" />
                  </div>
                  <div class="vbox gap(sm)">
                    <label class="text(sm) c(gray-700) font(medium)">Search</label>
                    <Input type="search" placeholder="Search components..." />
                  </div>
                </div>
              </div>
              
              <!-- Input States -->
              <div class="vbox gap(lg)">
                <h3 class="heading(h4) c(gray-900)">States</h3>
                <div class="grid(3) gap(lg)">
                  <div class="vbox gap(sm)">
                    <label class="text(sm) c(gray-700) font(medium)">Normal</label>
                    <Input placeholder="Enter text..." />
                  </div>
                  <div class="vbox gap(sm)">
                    <label class="text(sm) c(gray-400) font(medium)">Disabled</label>
                    <Input placeholder="Cannot edit" disabled />
                  </div>
                  <div class="vbox gap(sm)">
                    <label class="text(sm) c(gray-700) font(medium)">Read-only</label>
                    <Input placeholder="Read only" readonly value="Fixed value" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  /* Premium animations */
  @keyframes float-slow {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -30px) scale(1.05); }
    66% { transform: translate(-20px, 20px) scale(0.95); }
  }
  
  @keyframes float-slow-delayed {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-40px, 20px) scale(1.08); }
    66% { transform: translate(25px, -35px) scale(0.92); }
  }
  
  @keyframes float-slow-delayed-more {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    33% { transform: translate(calc(-50% + 25px), calc(-50% - 25px)) scale(1.1); }
    66% { transform: translate(calc(-50% - 30px), calc(-50% + 15px)) scale(0.9); }
  }
  
  @keyframes fade-down {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fade-up-delayed {
    0% { opacity: 0; transform: translateY(20px); }
    50% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  /* Apply animations */
  :global(.float-slow) {
    animation: float-slow 20s ease-in-out infinite;
  }
  
  :global(.float-slow-delayed) {
    animation: float-slow-delayed 20s ease-in-out infinite;
    animation-delay: 6.66s;
  }
  
  :global(.float-slow-delayed-more) {
    animation: float-slow-delayed-more 20s ease-in-out infinite;
    animation-delay: 13.33s;
  }
  
  :global(.fade-down) {
    animation: fade-down 0.6s ease-out;
  }
  
  :global(.fade-up) {
    animation: fade-up 0.6s ease-out;
  }
  
  :global(.fade-up-delayed) {
    animation: fade-up-delayed 1s ease-out;
  }
  
  /* Smooth scrolling */
  :global(html) {
    scroll-behavior: smooth;
  }
</style>