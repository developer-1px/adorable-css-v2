<script>
  import Button from '$lib/components/ui/Button.svelte'
  import Badge from '$lib/components/ui/Badge.svelte'
  import Avatar from '$lib/components/ui/Avatar.svelte'
  import Input from '$lib/components/ui/Input.svelte'
  import Label from '$lib/components/ui/Label.svelte'
  import Alert from '$lib/components/ui/Alert.svelte'
  import Checkbox from '$lib/components/ui/Checkbox.svelte'
  import RadioGroup from '$lib/components/ui/RadioGroup.svelte'
  import RadioButton from '$lib/components/ui/RadioButton.svelte'
  import Switch from '$lib/components/ui/Switch.svelte'
  import Slider from '$lib/components/ui/Slider.svelte'
  import Progress from '$lib/components/ui/Progress.svelte'
  import Separator from '$lib/components/ui/Separator.svelte'
  import Select from '$lib/components/ui/Select.svelte'
  import Textarea from '$lib/components/ui/Textarea.svelte'
  import Card from '$lib/components/ui/Card.svelte'
</script>

<div class="bg(gray-50) min-h(screen)">
  <!-- Hero Section -->
  <section class="relative overflow(hidden) bg(to-br/primary..accent) py(8xl)">
    <div class="container(5xl) mx(auto) px(2xl)">
      <div class="vbox gap(3xl) text(center) relative z(10)">
        <div class="vbox(center) gap(xl)">
          <Badge variant="outline">
            <span class="c(white)">Component Library v2.0</span>
          </Badge>
          <h1 class="heading(display/lg) c(white)">
            Beautiful Components
          </h1>
          <p class="heading(title/sm) c(white.9) max-w(3xl) mx(auto)">
            AdorableCSS로 구현한 현대적인 UI 컴포넌트 라이브러리.
            디자인 시스템의 일관성과 미니멀한 아름다움을 경험하세요.
          </p>
        </div>
        
        <div class="hbox(center) gap(lg)">
          <Button size="lg" variant="secondary">
            Explore Components
          </Button>
          <Button size="lg" variant="outline">
            <span class="c(white)">View Showcase</span>
          </Button>
        </div>
      </div>
    </div>
    
    <!-- Decorative elements -->
    <div class="absolute top(0) left(0) w(80%) h(80%) bg(to-br/white.05..transparent) r(full) blur(3xl)"></div>
    <div class="absolute bottom(0) right(0) w(60%) h(60%) bg(gradient-to-tl/accent.1..transparent) r(full) blur(3xl)"></div>
  </section>

  <!-- Component Categories -->
  <section class="container(5xl) mx(auto) px(2xl) py(6xl)">
    <div class="vbox gap(4xl)">
      <div class="vbox gap(lg) text(center)">
        <h2 class="heading(h2) c(gray-900)">Component Categories</h2>
        <p class="body(lg) c(gray-600)">모든 컴포넌트를 한눈에 살펴보세요</p>
      </div>
      
      <div class="grid(3) gap(2xl)">
        <Card variant="interactive">
          <div class="p(2xl) vbox gap(xl) text(center)">
            <div class="icon-box(xl) bg(primary.1) c(primary) mx(auto)">
              <svg class="size(32)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <h3 class="heading(h4) c(gray-900)">Buttons & Actions</h3>
            <p class="body(md) c(gray-600)">인터랙션을 위한 버튼 컴포넌트</p>
            <Badge variant="secondary">6 components</Badge>
          </div>
        </Card>
        
        <Card variant="interactive">
          <div class="p(2xl) vbox gap(xl) text(center)">
            <div class="icon-box(xl) bg(accent.1) c(accent) mx(auto)">
              <svg class="size(32)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
              </svg>
            </div>
            <h3 class="heading(h4) c(gray-900)">Form Components</h3>
            <p class="body(md) c(gray-600)">폼 입력을 위한 다양한 컴포넌트</p>
            <Badge variant="secondary">8 components</Badge>
          </div>
        </Card>
        
        <Card variant="interactive">
          <div class="p(2xl) vbox gap(xl) text(center)">
            <div class="icon-box(xl) bg(success.1) c(success) mx(auto)">
              <svg class="size(32)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <h3 class="heading(h4) c(gray-900)">Layout Components</h3>
            <p class="body(md) c(gray-600)">레이아웃 구성을 위한 컴포넌트</p>
            <Badge variant="secondary">3 components</Badge>
          </div>
        </Card>
      </div>
    </div>
  </section>

  <!-- Buttons Section -->
  <section class="py(6xl) bg(white)">
    <div class="container(5xl) mx(auto) px(2xl)">
      <div class="vbox gap(4xl)">
        <div class="vbox gap(lg)">
          <Badge>Buttons</Badge>
          <h2 class="heading(h2) c(gray-900)">Button Components</h2>
          <p class="body(lg) c(gray-600)">다양한 스타일과 상태를 지원하는 버튼 컴포넌트</p>
        </div>
        
        <div class="grid(2) gap(2xl)">
          <!-- Interactive Demo -->
          <Card variant="elevated">
            <div class="p(3xl)">
              <div class="vbox gap(2xl)">
                <h3 class="heading(h4) c(gray-900)">Interactive Demo</h3>
                
                <!-- Live Button Demo -->
                <div class="p(2xl) bg(gray-50) r(xl) text(center)">
                  <div class="vbox gap(xl)">
                    <div class="mb(lg)">
                      <Button size="lg">Try Clicking Me!</Button>
                    </div>
                    <p class="caption c(gray-600)">Watch hover and click animations</p>
                  </div>
                </div>
                
                <!-- Usage Examples -->
                <div class="vbox gap(lg)">
                  <h4 class="title(sm) c(gray-700)">Common Usage</h4>
                  <div class="vbox gap(md)">
                    <div class="p(lg) bg(gray-50) r(lg)">
                      <code class="caption mono c(gray-700)">btn(primary/lg)</code>
                      <p class="caption c(gray-600) mt(xs)">→ Primary large button</p>
                    </div>
                    <div class="p(lg) bg(gray-50) r(lg)">
                      <code class="caption mono c(gray-700)">btn(outline/sm)</code>
                      <p class="caption c(gray-600) mt(xs)">→ Outline small button</p>
                    </div>
                    <div class="p(lg) bg(gray-50) r(lg)">
                      <code class="caption mono c(gray-700)">btn(ghost)</code>
                      <p class="caption c(gray-600) mt(xs)">→ Ghost button</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <!-- Variants Showcase -->
          <Card variant="elevated">
            <div class="p(3xl)">
              <div class="vbox gap(3xl)">
                <!-- Variants -->
                <div class="vbox gap(xl)">
                  <h3 class="heading(h4) c(gray-900)">All Variants</h3>
                  <div class="vbox gap(lg)">
                    <div class="hbox(middle) gap(lg) flex-wrap">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                    </div>
                    <div class="hbox(middle) gap(lg) flex-wrap">
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                      <Button variant="destructive">Destructive</Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <!-- Sizes -->
                <div class="vbox gap(xl)">
                  <h3 class="heading(h4) c(gray-900)">All Sizes</h3>
                  <div class="hbox(middle) gap(lg) flex-wrap">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <svg class="size(16)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 5v14m-7-7h14"/>
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </section>

  <!-- Form Components Section -->
  <section class="py(6xl) bg(gray-50)">
    <div class="container(5xl) mx(auto) px(2xl)">
      <div class="vbox gap(4xl)">
        <div class="vbox gap(lg)">
          <Badge>Forms</Badge>
          <h2 class="heading(h2) c(gray-900)">Form Components</h2>
          <p class="body(lg) c(gray-600)">사용자 입력을 받기 위한 폼 컴포넌트</p>
        </div>
        
        <div class="grid(2) gap(2xl)">
          <Card>
            <div class="p(3xl)">
              <div class="vbox gap(2xl)">
                <h3 class="heading(h4) c(gray-900)">Text Inputs</h3>
                
                <div class="vbox gap(xl)">
                  <div class="vbox gap(sm)">
                    <Label>Default Input</Label>
                    <Input placeholder="Enter text..." />
                  </div>
                  
                  <div class="vbox gap(sm)">
                    <Label>Error State</Label>
                    <Input variant="error" placeholder="Invalid input" />
                  </div>
                  
                  <div class="vbox gap(sm)">
                    <Label>Select</Label>
                    <Select>
                      <option>Choose an option</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </Select>
                  </div>
                  
                  <div class="vbox gap(sm)">
                    <Label>Textarea</Label>
                    <Textarea placeholder="Write your message..." />
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div class="p(3xl)">
              <div class="vbox gap(2xl)">
                <h3 class="heading(h4) c(gray-900)">Toggle Controls</h3>
                
                <div class="vbox gap(2xl)">
                  <div class="vbox gap(lg)">
                    <Label>Checkboxes</Label>
                    <Checkbox>Accept terms</Checkbox>
                    <Checkbox checked>Send updates</Checkbox>
                  </div>
                  
                  <div class="vbox gap(lg)">
                    <Label>Radio Buttons</Label>
                    <RadioGroup>
                      <RadioButton checked>Option A</RadioButton>
                      <RadioButton>Option B</RadioButton>
                      <RadioButton>Option C</RadioButton>
                    </RadioGroup>
                  </div>
                  
                  <div class="vbox gap(lg)">
                    <Label>Switch</Label>
                    <div class="hbox gap(xl)">
                      <Switch />
                      <Switch checked />
                    </div>
                  </div>
                  
                  <div class="vbox gap(lg)">
                    <Label>Slider</Label>
                    <Slider value={60} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </section>

  <!-- Data Display Section -->
  <section class="py(6xl) bg(white)">
    <div class="container(5xl) mx(auto) px(2xl)">
      <div class="vbox gap(4xl)">
        <div class="vbox gap(lg)">
          <Badge>Data Display</Badge>
          <h2 class="heading(h2) c(gray-900)">Data Display Components</h2>
          <p class="body(lg) c(gray-600)">정보를 효과적으로 표시하는 컴포넌트</p>
        </div>
        
        <div class="grid(3) gap(2xl)">
          <!-- Badges -->
          <Card variant="interactive">
            <div class="p(2xl)">
              <div class="vbox gap(xl)">
                <h3 class="heading(h5) c(gray-900)">Badges</h3>
                <div class="vbox gap(lg)">
                  <div class="hbox gap(md) flex-wrap">
                    <Badge>New</Badge>
                    <Badge variant="secondary">Beta</Badge>
                    <Badge variant="outline">Pro</Badge>
                  </div>
                  <div class="vbox gap(sm)">
                    <div class="p(md) bg(gray-50) r(md)">
                      <code class="caption mono c(gray-700)">badge(sm/success)</code>
                    </div>
                    <div class="p(md) bg(gray-50) r(md)">
                      <code class="caption mono c(gray-700)">badge(outline)</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <!-- Avatars -->
          <Card variant="interactive">
            <div class="p(2xl)">
              <div class="vbox gap(xl)">
                <h3 class="heading(h5) c(gray-900)">Avatars</h3>
                <div class="vbox gap(lg)">
                  <div class="hbox(middle) gap(lg)">
                    <Avatar size="sm">JD</Avatar>
                    <Avatar>AB</Avatar>
                    <Avatar size="lg">MK</Avatar>
                  </div>
                  <div class="vbox gap(sm)">
                    <div class="p(md) bg(gray-50) r(md) text(center)">
                      <code class="caption mono c(gray-700)">avatar(sm)</code>
                    </div>
                    <div class="p(md) bg(gray-50) r(md) text(center)">
                      <code class="caption mono c(gray-700)">avatar(lg)</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <!-- Progress -->
          <Card variant="interactive">
            <div class="p(2xl)">
              <div class="vbox gap(xl)">
                <h3 class="heading(h5) c(gray-900)">Progress</h3>
                <div class="vbox gap(lg)">
                  <div class="vbox gap(md)">
                    <div class="hbox(middle) gap(sm)">
                      <Progress value={25} />
                      <span class="caption c(gray-600)">25%</span>
                    </div>
                    <div class="hbox(middle) gap(sm)">
                      <Progress value={60} />
                      <span class="caption c(gray-600)">60%</span>
                    </div>
                    <div class="hbox(middle) gap(sm)">
                      <Progress value={90} />
                      <span class="caption c(gray-600)">90%</span>
                    </div>
                  </div>
                  <div class="p(md) bg(gray-50) r(md) text(center)">
                    <code class="caption mono c(gray-700)">progress(value)</code>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <!-- Alerts -->
        <Card variant="elevated">
          <div class="p(3xl)">
            <div class="vbox gap(xl)">
              <h3 class="heading(h4) c(gray-900)">Alert Components</h3>
              <div class="vbox gap(lg)">
                <Alert>Default alert message with important information</Alert>
                <Alert variant="destructive">Error alert that requires immediate attention</Alert>
                <Alert variant="warning">Warning alert for potential issues</Alert>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg(gray-900) py(4xl)">
    <div class="container(5xl) mx(auto) px(2xl)">
      <div class="vbox gap(2xl) text(center)">
        <div class="vbox gap(lg)">
          <h3 class="heading(h3) c(white)">AdorableCSS Component Library</h3>
          <p class="body(lg) c(gray-400)">디자인 시스템의 일관성과 아름다움</p>
        </div>
        
        <div class="hbox(center) gap(xl)">
          <Button variant="ghost">
            <span class="c(gray-400) hover:c(white)">Documentation</span>
          </Button>
          <Button variant="ghost">
            <span class="c(gray-400) hover:c(white)">GitHub</span>
          </Button>
          <Button variant="ghost">
            <span class="c(gray-400) hover:c(white)">Showcase</span>
          </Button>
        </div>
      </div>
    </div>
  </footer>
</div>