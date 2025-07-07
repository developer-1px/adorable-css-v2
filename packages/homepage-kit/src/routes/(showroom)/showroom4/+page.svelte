<script lang="ts">
  import { onMount } from 'svelte';
  import { 
    Play, Square, RotateCcw, RotateCw, ZoomIn, ZoomOut, Maximize,
    Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
    Type, Image, Shapes, LineChart, Table, Copy, Undo, Redo,
    Save, Share, Download, Settings, User, Search, Plus, Minus,
    ChevronDown, ChevronRight, ChevronLeft, Eye, Lock, Layers, Grid, Move,
    MoreHorizontal, FileText, Video, Music, PieChart, BarChart
  } from 'lucide-svelte';
  
  let mounted = false;
  let selectedSlide = 1;
  let selectedElement = null;
  let isPresenting = false;
  let zoom = 100;
  
  // Mock presentation data
  const presentation = {
    title: "Q4 Marketing Strategy 2024",
    author: "Sarah Kim",
    slides: [
      {
        id: 1,
        title: "Marketing Strategy Overview",
        type: "title",
        thumbnail: "bg(135deg/blue-500..purple-600)"
      },
      {
        id: 2,
        title: "Market Analysis",
        type: "content",
        thumbnail: "bg(white) border(1/gray-200)"
      },
      {
        id: 3,
        title: "Target Audience",
        type: "chart",
        thumbnail: "bg(white) border(1/gray-200)"
      },
      {
        id: 4,
        title: "Campaign Timeline",
        type: "timeline",
        thumbnail: "bg(white) border(1/gray-200)"
      },
      {
        id: 5,
        title: "Budget Allocation",
        type: "chart",
        thumbnail: "bg(white) border(1/gray-200)"
      },
      {
        id: 6,
        title: "Expected Results",
        type: "content",
        thumbnail: "bg(white) border(1/gray-200)"
      }
    ]
  };
  
  const toolbarItems = [
    { section: 'file', items: [
      { icon: FileText, label: 'New', shortcut: 'Ctrl+N' },
      { icon: Save, label: 'Save', shortcut: 'Ctrl+S' },
      { icon: Share, label: 'Share', shortcut: 'Ctrl+Shift+S' },
      { icon: Download, label: 'Export', shortcut: 'Ctrl+E' }
    ]},
    { section: 'edit', items: [
      { icon: Undo, label: 'Undo', shortcut: 'Ctrl+Z' },
      { icon: Redo, label: 'Redo', shortcut: 'Ctrl+Y' },
      { icon: Copy, label: 'Copy', shortcut: 'Ctrl+C' },
      { icon: Copy, label: 'Paste', shortcut: 'Ctrl+V' }
    ]},
    { section: 'insert', items: [
      { icon: Type, label: 'Text Box', shortcut: 'T' },
      { icon: Image, label: 'Image', shortcut: 'I' },
      { icon: Shapes, label: 'Shapes', shortcut: 'S' },
      { icon: LineChart, label: 'Chart', shortcut: 'C' },
      { icon: Table, label: 'Table', shortcut: 'Alt+T' },
      { icon: Video, label: 'Video', shortcut: 'V' }
    ]}
  ];
  
  function selectSlide(slideId: number) {
    selectedSlide = slideId;
    selectedElement = null;
  }
  
  function addSlide() {
    // Mock function - would add new slide
    console.log('Adding new slide...');
  }
  
  function startPresentation() {
    isPresenting = true;
  }
  
  function exitPresentation() {
    isPresenting = false;
  }
  
  function zoomIn() {
    zoom = Math.min(zoom + 25, 200);
  }
  
  function zoomOut() {
    zoom = Math.max(zoom - 25, 50);
  }
  
  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>PPT Studio - Showroom 4</title>
  <meta name="description" content="Professional presentation software mockup" />
</svelte:head>

{#if isPresenting}
  <!-- Presentation Mode -->
  <div class="fixed inset(0) bg(black) z(100) hbox(center/middle)">
    <div class="w(90vw) h(90vh) bg(white) r(lg) shadow(2xl) relative">
      <!-- Current Slide Content -->
      <div class="w(full) h(full) hbox(fill) p(4xl)">
        <div class="text(center) max-w(4xl)">
          <h1 class="display(4xl) font(black) c(gray-900) mb(2xl)">Marketing Strategy</h1>
          <h2 class="display(2xl) c(135deg/blue-500..purple-600) mb(3xl)">Q4 2024</h2>
          <p class="font(xl) c(gray-600) leading(relaxed)">
            Comprehensive strategy for maximizing market reach and revenue growth in the fourth quarter.
          </p>
        </div>
      </div>
      
      <!-- Presentation Controls -->
      <div class="absolute bottom(lg) left(50%) translate-x(-50%) hbox gap(sm) p(md) bg(black.8) r(xl) backdrop-blur(md)">
        <button class="size(40px) r(md) bg(white.2) hover:bg(white.3) transition hbox(center/middle)" on:click={exitPresentation}>
          <Square size="20" class="c(white)" />
        </button>
        <button class="size(40px) r(md) bg(white.2) hover:bg(white.3) transition hbox(center/middle)">
          <ChevronLeft size="20" class="c(white)" />
        </button>
        <span class="px(lg) py(sm) c(white) font(sm)">1 / 6</span>
        <button class="size(40px) r(md) bg(white.2) hover:bg(white.3) transition hbox(center/middle)">
          <ChevronRight size="20" class="c(white)" />
        </button>
      </div>
    </div>
  </div>
{:else}
  <!-- Main PPT Interface -->
  <div class="min-h(screen) bg(gray-100) hbox(fill)">
    
    <!-- Left Sidebar - Slide Thumbnails -->
    <aside class="w(200) bg(white) border-r(2/gray-200) vbox">
      <!-- Sidebar Header -->
      <div class="p(md) bb(1/gray-200)">
        <h3 class="font(xs) font(bold) c(gray-900) uppercase tracking(wide)">Slides</h3>
        <button class="mt(xs) hbox(start/middle) gap(xs) w(full) p(xs) r(sm) border(1/gray-300) hover:bg(gray-50) transition" on:click={addSlide}>
          <Plus size="14" class="c(gray-600)" />
          <span class="font(xs) c(gray-700)">Add Slide</span>
        </button>
      </div>
      
      <!-- Slide List -->
      <div class="flex(1) scroll(y) p(xs)">
        {#each presentation.slides as slide (slide.id)}
          <button 
            class="w(full) mb(xs) p(sm) r(md) transition {selectedSlide === slide.id ? 'bg(blue-50) border(2/blue-500)' : 'bg(gray-50) border(1/gray-200) hover:bg(gray-100)'}"
            on:click={() => selectSlide(slide.id)}
          >
            <div class="vbox gap(xs)">
              <!-- Slide Thumbnail -->
              <div class="w(full) h(60) {slide.thumbnail} r(xs) hbox(center/middle) relative">
                <span class="font(2xs) c(gray-500)">Slide {slide.id}</span>
                {#if slide.type === 'title'}
                  <div class="absolute inset(xs) vbox(center/middle) text(center)">
                    <div class="font(2xs) font(bold) c(white)">Title</div>
                  </div>
                {/if}
              </div>
              
              <!-- Slide Info -->
              <div class="vbox gap(xs)">
                <span class="font(2xs) font(medium) c(gray-800) truncate">{slide.title}</span>
                <span class="font(3xs) c(gray-500) uppercase">{slide.type}</span>
              </div>
            </div>
          </button>
        {/each}
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex(1) vbox">
      
      <!-- Top Toolbar -->
      <header class="bg(white) bb(1/gray-200) px(md) py(xs)">
        <div class="hbox(fill/middle)">
          <!-- Left Section - File Operations -->
          <div class="hbox(fill) gap(sm)">
            <div class="hbox gap(xs) pr(md) br(1/gray-200)">
              {#each toolbarItems[0].items as item}
                <button class="hbox(start/middle) gap(xs) px(xs) py(2xs) r(sm) hover:bg(gray-100) transition" title="{item.label} ({item.shortcut})">
                  <svelte:component this={item.icon} size="14" class="c(gray-600)" />
                  <span class="font(2xs) c(gray-700)">{item.label}</span>
                </button>
              {/each}
            </div>
            
            <!-- Edit Tools -->
            <div class="hbox gap(xs) pr(md) br(1/gray-200)">
              {#each toolbarItems[1].items as item}
                <button class="size(28px) r(sm) hover:bg(gray-100) transition hbox(center/middle)" title="{item.label} ({item.shortcut})">
                  <svelte:component this={item.icon} size="14" class="c(gray-600)" />
                </button>
              {/each}
            </div>
            
            <!-- Insert Tools -->
            <div class="hbox gap(xs)">
              {#each toolbarItems[2].items as item}
                <button class="size(28px) r(sm) hover:bg(gray-100) transition hbox(center/middle)" title="{item.label} ({item.shortcut})">
                  <svelte:component this={item.icon} size="14" class="c(gray-600)" />
                </button>
              {/each}
            </div>
          </div>
          
          <!-- Right Section - Presentation Controls -->
          <div class="hbox(fill) gap(xs)">
            <div class="hbox gap(xs) pl(md) bl(1/gray-200)">
              <button class="hbox(start/middle) gap(xs) px(md) py(xs) r(sm) bg(blue-600) c(white) hover:bg(blue-700) transition" on:click={startPresentation}>
                <Play size="14" />
                <span class="font(xs) font(medium)">Present</span>
              </button>
              <button class="size(28px) r(sm) hover:bg(gray-100) transition hbox(center/middle)" title="Settings">
                <Settings size="14" class="c(gray-600)" />
              </button>
              <button class="size(28px) r(sm) hover:bg(gray-100) transition hbox(center/middle)" title="User Profile">
                <User size="14" class="c(gray-600)" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Secondary Toolbar -->
      <div class="bg(gray-50) bb(1/gray-200) px(md) py(xs)">
        <div class="hbox(fill/middle)">
          <!-- Text Formatting -->
          <div class="hbox(fill) gap(sm)">
            <div class="hbox gap(xs) pr(xs) br(1/gray-300)">
              <select class="px(xs) py(2xs) r(xs) border(1/gray-300) font(xs) bg(white)">
                <option>Calibri</option>
                <option>Arial</option>
                <option>Times New Roman</option>
              </select>
              <select class="px(xs) py(2xs) r(xs) border(1/gray-300) font(xs) bg(white)">
                <option>24</option>
                <option>18</option>
                <option>16</option>
                <option>14</option>
              </select>
            </div>
            
            <div class="hbox gap(xs) pr(xs) br(1/gray-300)">
              <button class="size(24px) r(xs) hover:bg(gray-200) transition hbox(center/middle)">
                <Bold size="12" class="c(gray-600)" />
              </button>
              <button class="size(24px) r(xs) hover:bg(gray-200) transition hbox(center/middle)">
                <Italic size="12" class="c(gray-600)" />
              </button>
              <button class="size(24px) r(xs) hover:bg(gray-200) transition hbox(center/middle)">
                <Underline size="12" class="c(gray-600)" />
              </button>
            </div>
            
            <div class="hbox gap(xs)">
              <button class="size(24px) r(xs) hover:bg(gray-200) transition hbox(center/middle)">
                <AlignLeft size="12" class="c(gray-600)" />
              </button>
              <button class="size(24px) r(xs) hover:bg(gray-200) transition hbox(center/middle)">
                <AlignCenter size="12" class="c(gray-600)" />
              </button>
              <button class="size(24px) r(xs) hover:bg(gray-200) transition hbox(center/middle)">
                <AlignRight size="12" class="c(gray-600)" />
              </button>
            </div>
          </div>
          
          <!-- View Controls -->
          <div class="hbox(fill) gap(xs)">
            <div class="hbox(start/middle) gap(xs) px(xs) py(2xs) r(xs) border(1/gray-300) bg(white)">
              <button class="size(20px) r(xs) hover:bg(gray-100) transition hbox(center/middle)" on:click={zoomOut}>
                <ZoomOut size="10" class="c(gray-600)" />
              </button>
              <span class="font(2xs) c(gray-700) min-w(32px) text(center)">{zoom}%</span>
              <button class="size(20px) r(xs) hover:bg(gray-100) transition hbox(center/middle)" on:click={zoomIn}>
                <ZoomIn size="10" class="c(gray-600)" />
              </button>
            </div>
            
            <div class="hbox gap(xs)">
              <button class="size(24px) r(xs) hover:bg(gray-200) transition hbox(center/middle)" title="Grid">
                <Grid size="12" class="c(gray-600)" />
              </button>
              <button class="size(24px) r(xs) hover:bg(gray-200) transition hbox(center/middle)" title="Layers">
                <Layers size="12" class="c(gray-600)" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Canvas Area -->
      <div class="flex(1) bg(gray-200) p(lg) hbox(center/middle)">
        <div class="relative">
          <!-- Slide Canvas -->
          <div 
            class="bg(white) shadow(2xl) border(1/gray-300) relative"
            style="width: {zoom * 8}px; height: {zoom * 6}px; transform-origin: center;"
          >
            <!-- Slide Content Based on Selected Slide -->
            {#if selectedSlide === 1}
              <!-- Title Slide -->
              <div class="w(full) h(full) bg(135deg/blue-500..purple-600) hbox(center/middle) p(2xl)">
                <div class="text(center) c(white)">
                  <h1 class="display(2xl) font(black) mb(lg)">Marketing Strategy</h1>
                  <h2 class="font(xl) opacity(90) mb(xl)">Q4 2024</h2>
                  <p class="font(sm) opacity(80)">Prepared by Sarah Kim</p>
                </div>
              </div>
            {:else if selectedSlide === 2}
              <!-- Content Slide -->
              <div class="w(full) h(full) p(2xl) vbox gap(lg)">
                <h2 class="font(xl) font(bold) c(gray-900) mb(lg)">Market Analysis</h2>
                <div class="grid(2) gap(lg) flex(1)">
                  <div class="vbox gap(md)">
                    <h3 class="font(lg) font(bold) c(blue-600)">Current Market</h3>
                    <ul class="vbox gap(sm) font(sm) c(gray-700)">
                      <li class="hbox gap(sm)"><span class="w(4) h(4) r(full) bg(blue-500) mt(xs)"></span>Growing demand for digital solutions</li>
                      <li class="hbox gap(sm)"><span class="w(4) h(4) r(full) bg(blue-500) mt(xs)"></span>Increased competition in key segments</li>
                      <li class="hbox gap(sm)"><span class="w(4) h(4) r(full) bg(blue-500) mt(xs)"></span>Shifting consumer preferences</li>
                    </ul>
                  </div>
                  <div class="vbox gap(md)">
                    <h3 class="font(lg) font(bold) c(purple-600)">Opportunities</h3>
                    <ul class="vbox gap(sm) font(sm) c(gray-700)">
                      <li class="hbox gap(sm)"><span class="w(4) h(4) r(full) bg(purple-500) mt(xs)"></span>Emerging markets expansion</li>
                      <li class="hbox gap(sm)"><span class="w(4) h(4) r(full) bg(purple-500) mt(xs)"></span>Technology partnerships</li>
                      <li class="hbox gap(sm)"><span class="w(4) h(4) r(full) bg(purple-500) mt(xs)"></span>Sustainable product lines</li>
                    </ul>
                  </div>
                </div>
              </div>
            {:else if selectedSlide === 3}
              <!-- Chart Slide -->
              <div class="w(full) h(full) p(2xl) vbox gap(lg)">
                <h2 class="font(xl) font(bold) c(gray-900)">Target Audience Breakdown</h2>
                <div class="flex(1) hbox(center/middle)">
                  <div class="relative w(200) h(200)">
                    <!-- Mock Pie Chart -->
                    <div class="w(full) h(full) r(full) overflow(hidden) relative">
                      <div class="absolute inset(0) bg(blue-500)" style="clip-path: polygon(50% 50%, 100% 0%, 100% 70%, 50% 50%)"></div>
                      <div class="absolute inset(0) bg(green-500)" style="clip-path: polygon(50% 50%, 100% 70%, 70% 100%, 50% 50%)"></div>
                      <div class="absolute inset(0) bg(yellow-500)" style="clip-path: polygon(50% 50%, 70% 100%, 30% 100%, 50% 50%)"></div>
                      <div class="absolute inset(0) bg(red-500)" style="clip-path: polygon(50% 50%, 30% 100%, 0% 70%, 50% 50%)"></div>
                      <div class="absolute inset(0) bg(purple-500)" style="clip-path: polygon(50% 50%, 0% 70%, 0% 0%, 50% 50%)"></div>
                      <div class="absolute inset(0) bg(orange-500)" style="clip-path: polygon(50% 50%, 0% 0%, 100% 0%, 50% 50%)"></div>
                    </div>
                  </div>
                  <div class="ml(2xl) vbox gap(sm)">
                    <div class="hbox gap(sm) items(center)"><div class="w(12) h(12) bg(blue-500) r(sm)"></div><span class="font(sm)">Gen Z (35%)</span></div>
                    <div class="hbox gap(sm) items(center)"><div class="w(12) h(12) bg(green-500) r(sm)"></div><span class="font(sm)">Millennials (28%)</span></div>
                    <div class="hbox gap(sm) items(center)"><div class="w(12) h(12) bg(yellow-500) r(sm)"></div><span class="font(sm)">Gen X (20%)</span></div>
                    <div class="hbox gap(sm) items(center)"><div class="w(12) h(12) bg(red-500) r(sm)"></div><span class="font(sm)">Boomers (12%)</span></div>
                    <div class="hbox gap(sm) items(center)"><div class="w(12) h(12) bg(purple-500) r(sm)"></div><span class="font(sm)">Others (5%)</span></div>
                  </div>
                </div>
              </div>
            {:else}
              <!-- Default Content Slide -->
              <div class="w(full) h(full) p(2xl) hbox(center/middle)">
                <div class="text(center) c(gray-500)">
                  <h2 class="font(lg) font(bold) mb(md)">Slide {selectedSlide}</h2>
                  <p class="font(sm)">Click to add content</p>
                </div>
              </div>
            {/if}
            
            <!-- Selection Border (when element is selected) -->
            {#if selectedElement}
              <div class="absolute inset(sm) border(2/blue-500) pointer-events(none) r(sm)">
                <!-- Resize handles -->
                <div class="absolute -top(sm) -left(sm) w(sm) h(sm) bg(blue-500) r(sm)"></div>
                <div class="absolute -top(sm) right(-sm) w(sm) h(sm) bg(blue-500) r(sm)"></div>
                <div class="absolute -bottom(sm) -left(sm) w(sm) h(sm) bg(blue-500) r(sm)"></div>
                <div class="absolute -bottom(sm) right(-sm) w(sm) h(sm) bg(blue-500) r(sm)"></div>
              </div>
            {/if}
          </div>
          
          <!-- Canvas Tools -->
          <div class="absolute -top(xl) left(0) hbox gap(sm)">
            <div class="px(sm) py(xs) bg(white) r(sm) border(1/gray-300) shadow(sm) font(xs) c(gray-600)">
              Slide {selectedSlide} of {presentation.slides.length}
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Right Sidebar - Properties Panel -->
    <aside class="w(240) bg(white) border-l(2/gray-200) vbox">
      <!-- Properties Header -->
      <div class="p(md) bb(1/gray-200)">
        <h3 class="font(xs) font(bold) c(gray-900) uppercase tracking(wide)">Properties</h3>
      </div>
      
      <!-- Slide Properties -->
      <div class="p(md) bb(1/gray-200)">
        <h4 class="font(xs) font(medium) c(gray-800) mb(sm)">Slide Settings</h4>
        <div class="vbox gap(sm)">
          <div class="vbox gap(xs)">
            <label class="font(2xs) c(gray-600) uppercase tracking(wide)">Background</label>
            <div class="hbox gap(xs)">
              <button class="w(20) h(20) r(xs) bg(white) border(1/gray-300) hover:border(gray-400) transition"></button>
              <button class="w(20) h(20) r(xs) bg(135deg/blue-500..purple-600) border(1/gray-300) hover:border(gray-400) transition"></button>
              <button class="w(20) h(20) r(xs) bg(135deg/green-400..blue-500) border(1/gray-300) hover:border(gray-400) transition"></button>
              <button class="w(20) h(20) r(xs) bg(135deg/orange-400..red-500) border(1/gray-300) hover:border(gray-400) transition"></button>
            </div>
          </div>
          
          <div class="vbox gap(xs)">
            <label class="font(2xs) c(gray-600) uppercase tracking(wide)">Layout</label>
            <select class="px(xs) py(2xs) r(xs) border(1/gray-300) font(xs) bg(white)">
              <option>Title Slide</option>
              <option>Content with Title</option>
              <option>Two Column</option>
              <option>Blank</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Element Properties -->
      <div class="p(md) bb(1/gray-200)">
        <h4 class="font(xs) font(medium) c(gray-800) mb(sm)">Element</h4>
        {#if selectedElement}
          <div class="vbox gap(sm)">
            <div class="vbox gap(xs)">
              <label class="font(2xs) c(gray-600) uppercase tracking(wide)">Position</label>
              <div class="grid(2) gap(xs)">
                <input type="number" placeholder="X" class="px(xs) py(2xs) r(xs) border(1/gray-300) font(xs)">
                <input type="number" placeholder="Y" class="px(xs) py(2xs) r(xs) border(1/gray-300) font(xs)">
              </div>
            </div>
            <div class="vbox gap(xs)">
              <label class="font(2xs) c(gray-600) uppercase tracking(wide)">Size</label>
              <div class="grid(2) gap(xs)">
                <input type="number" placeholder="Width" class="px(xs) py(2xs) r(xs) border(1/gray-300) font(xs)">
                <input type="number" placeholder="Height" class="px(xs) py(2xs) r(xs) border(1/gray-300) font(xs)">
              </div>
            </div>
          </div>
        {:else}
          <p class="font(xs) c(gray-500) italic">No element selected</p>
        {/if}
      </div>
      
      <!-- Animation Panel -->
      <div class="p(md)">
        <h4 class="font(xs) font(medium) c(gray-800) mb(sm)">Animations</h4>
        <div class="vbox gap(xs)">
          <button class="hbox(start/middle) gap(xs) w(full) p(xs) r(xs) border(1/gray-300) hover:bg(gray-50) transition">
            <Play size="12" class="c(gray-600)" />
            <span class="font(xs) c(gray-700)">Fade In</span>
          </button>
          <button class="hbox(start/middle) gap(xs) w(full) p(xs) r(xs) border(1/gray-300) hover:bg(gray-50) transition">
            <Move size="12" class="c(gray-600)" />
            <span class="font(xs) c(gray-700)">Slide In</span>
          </button>
          <button class="hbox(start/middle) gap(xs) w(full) p(xs) r(xs) border(1/gray-300) hover:bg(gray-50) transition">
            <ZoomIn size="12" class="c(gray-600)" />
            <span class="font(xs) c(gray-700)">Zoom</span>
          </button>
        </div>
      </div>
    </aside>
  </div>
{/if}