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
import Tabs from '$lib/components/ui/Tabs.svelte'
import TabsList from '$lib/components/ui/TabsList.svelte'
import TabsTrigger from '$lib/components/ui/TabsTrigger.svelte'
import TabsContent from '$lib/components/ui/TabsContent.svelte'
import Table from '$lib/components/ui/Table.svelte'
import TableHeader from '$lib/components/ui/TableHeader.svelte'
import TableRow from '$lib/components/ui/TableRow.svelte'
import TableCell from '$lib/components/ui/TableCell.svelte'
import TableHeaderCell from '$lib/components/ui/TableHeaderCell.svelte'
import Skeleton from '$lib/components/ui/Skeleton.svelte'
import Accordion from '$lib/components/ui/Accordion.svelte'
import AccordionItem from '$lib/components/ui/AccordionItem.svelte'
import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte'
import BreadcrumbItem from '$lib/components/ui/BreadcrumbItem.svelte'
import Tooltip from '$lib/components/ui/Tooltip.svelte'
</script>

<div class="bg(mute-50) min-h(screen)">
  <!-- Hero Section -->
  <section class="relative overflow(hidden) bg(to-br/mute-900..mute-800) py(3xl)">
    <div class="pack px(2xl)">
      <div class="container(6xl) vbox gap(2xl) text(center) relative z(10)">
        <div class="vbox(center) gap(lg)">
          <Badge variant="outline">
            <span class="c(white)">47 UI Components</span>
          </Badge>
          <h1 class="display(lg) c(white)">
            Component Showcase
          </h1>
          <div class="pack">
            <p class="body(base) c(white.8) max-w(4xl)">
              모든 컴포넌트를 실제 사용 시나리오에 맞게 조합하여 구성적인 미를 보여주는 종합 전시관
            </p>
          </div>
        </div>

        <div class="pack gap(lg)">
          <Button size="lg" variant="secondary">
            Explore Components
          </Button>
          <Button size="lg" variant="outline">
            <span class="c(white)">View Documentation</span>
          </Button>
        </div>
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="absolute top(0) left(0) w(80%) h(80%) bg(to-br/white.05..transparent) r(full) blur(3xl)"></div>
    <div
      class="absolute bottom(0) right(0) w(60%) h(60%) bg(gradient-to-tl/accent.1..transparent) r(full) blur(3xl)"></div>
  </section>

  <!-- Dashboard Layout Example -->
  <section class="pack px(2xl) py(6xl)">
    <div class="container(6xl)">
      <div class="vbox gap(4xl)">
        <!-- Header with Breadcrumb -->
        <div class="vbox gap(lg)">
          <Breadcrumb>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
          </Breadcrumb>

          <div class="hbox(between) gap(lg)">
            <div class="vbox gap(sm)">
              <h1 class="heading(h1) c(mute-900)">Dashboard Overview</h1>
              <p class="body(base) c(mute-600)">실제 대시보드 구성을 통한 컴포넌트 조합 시연</p>
            </div>

            <div class="hbox gap(md)">
              <Button variant="outline">Export</Button>
              <Button>New Project</Button>
            </div>
          </div>
        </div>

        <!-- Stats Cards - 수학적 간격 시스템 실험 -->
        <div class="grid(4) gap(3xl)">
          <Card size="xl">
            <div class="vbox gap(xl)">
              <div class="vbox gap(sm)">
                <div class="hbox(between)">
                  <p class="caption c(mute-600)">Total Users</p>
                  <Badge variant="secondary">+12%</Badge>
                </div>
                <p class="heading(h2) c(mute-900)">12,543</p>
              </div>
              <Progress value={75}/>
            </div>
          </Card>

          <Card size="xl">
            <div class="vbox gap(xl)">
              <div class="vbox gap(sm)">
                <div class="hbox(between)">
                  <p class="caption c(mute-600)">Revenue</p>
                  <Badge>+8%</Badge>
                </div>
                <p class="heading(h2) c(mute-900)">$45,231</p>
              </div>
              <Progress value={60}/>
            </div>
          </Card>

          <Card size="xl">
            <div class="vbox gap(xl)">
              <div class="vbox gap(sm)">
                <div class="hbox(between)">
                  <p class="caption c(mute-600)">Projects</p>
                  <Badge variant="outline">+3</Badge>
                </div>
                <p class="heading(h2) c(mute-900)">89</p>
              </div>
              <Progress value={45}/>
            </div>
          </Card>

          <Card size="xl">
            <div class="vbox gap(xl)">
              <div class="vbox gap(sm)">
                <div class="hbox(between)">
                  <p class="caption c(mute-600)">Tasks</p>
                  <Badge variant="destructive">-2%</Badge>
                </div>
                <p class="heading(h2) c(mute-900)">234</p>
              </div>
              <Progress value={90}/>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </section>

  <!-- User Profile Section -->
  <section class="py(6xl) bg(white)">
    <div class="pack px(2xl)">
      <div class="container(6xl)">
        <div class="vbox gap(4xl)">
          <!-- Profile Header -->
          <Card variant="elevated" size="xl">
            <div class="vbox gap(2xl)">
              <!-- Profile Header -->
              <div class="hbox gap(2xl)">
                <!-- Left: Profile Info -->
                <div class="vbox gap(xl)">
                  <div class="hbox gap(xl)">
                    <Avatar size="lg">JD</Avatar>
                    <div class="vbox gap(sm)">
                      <h2 class="heading(h2) c(mute-900)">John Doe</h2>
                      <p class="body(base) c(mute-600)">Senior Product Manager</p>
                      <div class="hbox gap(md)">
                        <Badge>Pro User</Badge>
                        <Badge variant="outline">Verified</Badge>
                      </div>
                    </div>
                  </div>

                  <div class="hbox gap(lg)">
                    <Button>Edit Profile</Button>
                    <Button variant="outline">Settings</Button>
                    <Button variant="ghost">Share</Button>
                  </div>
                </div>

                <!-- Right: Stats -->
                <div class="flex(1) vbox gap(xl)">
                  <div class="grid(3) gap(lg)">
                    <div class="vbox gap(xs) text(center)">
                      <p class="heading(h3) c(mute-900)">127</p>
                      <p class="caption c(mute-600)">Projects</p>
                    </div>
                    <div class="vbox gap(xs) text(center)">
                      <p class="heading(h3) c(mute-900)">2.4k</p>
                      <p class="caption c(mute-600)">Followers</p>
                    </div>
                    <div class="vbox gap(xs) text(center)">
                      <p class="heading(h3) c(mute-900)">891</p>
                      <p class="caption c(mute-600)">Following</p>
                    </div>
                  </div>

                  <div class="vbox gap(sm)">
                    <Label>Profile Completion</Label>
                    <Progress value={85}/>
                    <p class="caption c(mute-600)">85% completed</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <!-- Tabs Content -->
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div class="grid(2) gap(xl)">
                <Card size="xl">
                  <div class="vbox gap(xl)">
                    <h3 class="heading(h4) c(mute-900)">Recent Activity</h3>
                    <div class="vbox gap(lg)">
                      <div class="hbox gap(md)">
                        <Avatar size="sm">AB</Avatar>
                        <div class="vbox gap(xs)">
                          <p class="body(sm) c(mute-900)">Alice updated Project Alpha</p>
                          <p class="caption c(mute-600)">2 hours ago</p>
                        </div>
                      </div>
                      <div class="hbox gap(md)">
                        <Avatar size="sm">BK</Avatar>
                        <div class="vbox gap(xs)">
                          <p class="body(sm) c(mute-900)">Bob created new task</p>
                          <p class="caption c(mute-600)">5 hours ago</p>
                        </div>
                      </div>
                      <div class="hbox gap(md)">
                        <Avatar size="sm">CM</Avatar>
                        <div class="vbox gap(xs)">
                          <p class="body(sm) c(mute-900)">Carol finished milestone</p>
                          <p class="caption c(mute-600)">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card size="xl">
                  <div class="vbox gap(xl)">
                    <h3 class="heading(h4) c(mute-900)">Quick Actions</h3>
                    <div class="vbox gap(md)">
                      <Button variant="outline" class="w(full) justify(start)">
                        <svg class="size(16)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M12 5v14m-7-7h14"/>
                        </svg>
                        Create New Project
                      </Button>
                      <Button variant="outline" class="w(full) justify(start)">
                        <svg class="size(16)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="m22 22-1.5-1.5"/>
                        </svg>
                        Invite Team Member
                      </Button>
                      <Button variant="outline" class="w(full) justify(start)">
                        <svg class="size(16)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M9 12l2 2 4-4"/>
                          <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1"/>
                        </svg>
                        Review Tasks
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projects">
              <Card size="xl">
                <div class="vbox gap(xl)">
                  <h3 class="heading(h4) c(mute-900)">Active Projects</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderCell>Project</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Progress</TableHeaderCell>
                        <TableHeaderCell>Team</TableHeaderCell>
                        <TableHeaderCell>Actions</TableHeaderCell>
                      </TableRow>
                    </TableHeader>
                    <TableRow>
                      <TableCell>Project Alpha</TableCell>
                      <TableCell>
                        <Badge>Active</Badge>
                      </TableCell>
                      <TableCell>
                        <Progress value={75}/>
                      </TableCell>
                      <TableCell>
                        <div class="hbox gap(sm)">
                          <Avatar size="sm">AB</Avatar>
                          <Avatar size="sm">CD</Avatar>
                          <Avatar size="sm">+3</Avatar>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div class="hbox gap(sm)">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Beta Launch</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Planning</Badge>
                      </TableCell>
                      <TableCell>
                        <Progress value={25}/>
                      </TableCell>
                      <TableCell>
                        <div class="hbox gap(sm)">
                          <Avatar size="sm">EF</Avatar>
                          <Avatar size="sm">GH</Avatar>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div class="hbox gap(sm)">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </Table>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  </section>

  <!-- Form Registration Example -->
  <section class="py(6xl) bg(mute-100)">
    <div class="pack px(2xl)">
      <div class="container(6xl)">
        <div class="hbox gap(4xl)">
          <!-- Registration Form -->
          <div class="w(480px) vbox gap(2xl)">
            <Card size="xl">
              <div class="vbox gap(xl)">
                <!-- Header -->
                <div class="vbox gap(sm)">
                  <h2 class="heading(h2) c(mute-900)">Create Account</h2>
                  <p class="body(base) c(mute-600)">Join our community today</p>
                </div>

                <!-- Form Fields -->
                <div class="vbox gap(lg)">
                  <div class="vbox gap(sm)">
                    <Label>Full Name</Label>
                    <Input placeholder="John Doe"/>
                  </div>

                  <div class="vbox gap(sm)">
                    <Label>Email Address</Label>
                    <Input type="email" placeholder="john@example.com"/>
                  </div>

                  <div class="vbox gap(sm)">
                    <Label>Password</Label>
                    <Input type="password" placeholder="Create a strong password"/>
                  </div>

                  <div class="vbox gap(sm)">
                    <Label>Country</Label>
                    <Select>
                      <option>Select your country</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </Select>
                  </div>

                  <div class="vbox gap(sm)">
                    <Label>Bio</Label>
                    <Textarea placeholder="Tell us about yourself..."/>
                  </div>

                  <div class="vbox gap(md)">
                    <Checkbox>I agree to the Terms of Service</Checkbox>
                    <Checkbox>Subscribe to newsletter</Checkbox>
                  </div>

                  <div class="vbox gap(sm)">
                    <Button class="w(full)" size="lg">Create Account</Button>
                    <Button variant="outline" class="w(full)">Sign in with Google</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <!-- Settings Panel -->
          <div class="flex(1) vbox gap(xl)">
            <Card size="xl">
              <div class="vbox gap(xl)">
                <h3 class="heading(h4) c(mute-900)">Account Preferences</h3>
                <div class="vbox gap(lg)">
                  <div class="hbox(between)">
                    <div class="vbox gap(xs)">
                      <p class="body(sm) c(mute-900)">Email Notifications</p>
                      <p class="caption c(mute-600)">Receive updates about your account</p>
                    </div>
                    <Switch checked/>
                  </div>

                  <div class="hbox(between)">
                    <div class="vbox gap(xs)">
                      <p class="body(sm) c(mute-900)">Marketing Emails</p>
                      <p class="caption c(mute-600)">Get notified about new features</p>
                    </div>
                    <Switch/>
                  </div>

                  <div class="hbox(between)">
                    <div class="vbox gap(xs)">
                      <p class="body(sm) c(mute-900)">Two-Factor Auth</p>
                      <p class="caption c(mute-600)">Add an extra layer of security</p>
                    </div>
                    <Switch checked/>
                  </div>
                </div>
              </div>
            </Card>

            <Card size="xl">
              <div class="vbox gap(xl)">
                <h3 class="heading(h4) c(mute-900)">Display Settings</h3>
                <div class="vbox gap(lg)">
                  <div class="vbox gap(sm)">
                    <Label>Theme Preference</Label>
                    <RadioGroup>
                      <RadioButton checked>Light Mode</RadioButton>
                      <RadioButton>Dark Mode</RadioButton>
                      <RadioButton>System Default</RadioButton>
                    </RadioGroup>
                  </div>

                  <div class="vbox gap(sm)">
                    <Label>Font Size</Label>
                    <Slider value={16}/>
                    <div class="hbox(between)">
                      <span class="caption c(mute-600)">Small</span>
                      <span class="caption c(mute-600)">Large</span>
                    </div>
                  </div>

                  <div class="vbox gap(sm)">
                    <Label>Sidebar Position</Label>
                    <RadioGroup>
                      <RadioButton checked>Left</RadioButton>
                      <RadioButton>Right</RadioButton>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- E-commerce Product Page -->
  <section class="py(6xl) bg(white)">
    <div class="pack px(2xl)">
      <div class="container(6xl)">
        <div class="vbox gap(4xl)">
          <!-- Alert Notifications -->
          <div class="vbox gap(md)">
            <Alert>Free shipping on orders over $50! Use code FREESHIP</Alert>
            <Alert variant="warning">Only 3 items left in stock</Alert>
          </div>

          <div class="hbox gap(3xl)">
            <!-- Product Images -->
            <div class="w(480px) vbox gap(lg)">
              <div class="aspect(square) bg(mute-100) r(xl) pack">
                <p class="body(lg) c(mute-600)">Product Image</p>
              </div>

              <div class="hbox gap(md)">
                <div class="w(80px) h(80px) bg(mute-100) r(md)"></div>
                <div class="w(80px) h(80px) bg(mute-100) r(md)"></div>
                <div class="w(80px) h(80px) bg(mute-100) r(md)"></div>
                <div class="w(80px) h(80px) bg(mute-100) r(md)"></div>
              </div>
            </div>

            <!-- Product Details -->
            <div class="flex(1) vbox gap(xl)">
              <div class="vbox gap(lg)">
                <div class="hbox gap(md)">
                  <Badge>New Arrival</Badge>
                  <Badge variant="secondary">Best Seller</Badge>
                </div>

                <div class="vbox gap(sm)">
                  <h1 class="heading(h1) c(mute-900)">Premium Wireless Headphones</h1>
                  <p class="body(lg) c(mute-600)">Experience crystal-clear audio with our latest wireless technology</p>
                </div>

                <div class="hbox gap(md)">
                  <div class="hbox gap(sm)">
                    <span class="heading(h2) c(mute-900)">$199.99</span>
                    <span class="body(base) c(mute-500) line-through">$249.99</span>
                  </div>
                  <Badge variant="destructive">20% OFF</Badge>
                </div>

                <div class="hbox gap(lg)">
                  <div class="hbox gap(sm)">
                    <Avatar size="sm">★</Avatar>
                    <Avatar size="sm">★</Avatar>
                    <Avatar size="sm">★</Avatar>
                    <Avatar size="sm">★</Avatar>
                    <Avatar size="sm">★</Avatar>
                  </div>
                  <p class="body(sm) c(mute-600)">4.8 (247 reviews)</p>
                </div>
              </div>

              <Separator/>

              <div class="vbox gap(lg)">
                <div class="vbox gap(sm)">
                  <Label>Color</Label>
                  <RadioGroup>
                    <RadioButton checked>Midnight Black</RadioButton>
                    <RadioButton>Pearl White</RadioButton>
                    <RadioButton>Rose Gold</RadioButton>
                  </RadioGroup>
                </div>

                <div class="vbox gap(sm)">
                  <Label>Size</Label>
                  <Select>
                    <option>Standard</option>
                    <option>Large</option>
                    <option>Extra Large</option>
                  </Select>
                </div>

                <div class="vbox gap(sm)">
                  <Label>Quantity</Label>
                  <div class="hbox gap(md) w(120px)">
                    <Button variant="outline" size="sm">-</Button>
                    <Input value="1" class="text(center)"/>
                    <Button variant="outline" size="sm">+</Button>
                  </div>
                </div>
              </div>

              <div class="vbox gap(md)">
                <Button size="lg" class="w(full)">Add to Cart</Button>
                <Button variant="outline" size="lg" class="w(full)">Add to Wishlist</Button>
              </div>

              <div class="vbox gap(sm)">
                <div class="hbox gap(md)">
                  <Checkbox>Extended Warranty (+$29.99)</Checkbox>
                </div>
                <div class="hbox gap(md)">
                  <Checkbox>Gift Wrapping (+$9.99)</Checkbox>
                </div>
              </div>
            </div>
          </div>

          <!-- Loading States -->
          <Card size="xl">
            <div class="vbox gap(xl)">
              <h3 class="heading(h4) c(mute-900)">Loading States</h3>
              <div class="vbox gap(lg)">
                <div class="hbox gap(md)">
                  <Skeleton class="w(60px) h(60px) r(full)"/>
                  <div class="vbox gap(sm)">
                    <Skeleton class="w(200px) h(xl)"/>
                    <Skeleton class="w(150px) h(lg)"/>
                  </div>
                </div>
                <div class="vbox gap(sm)">
                  <Skeleton class="w(full) h(200px)"/>
                  <Skeleton class="w(80%) h(lg)"/>
                  <Skeleton class="w(60%) h(lg)"/>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </section>

  <!-- Accordion FAQ Section -->
  <section class="py(3xl) bg(mute-100)">
    <div class="pack px(2xl)">
      <div class="container(6xl)">
        <div class="vbox gap(2xl)">
          <div class="vbox gap(lg) text(center)">
            <h2 class="heading(h2) c(mute-900)">Frequently Asked Questions</h2>
            <p class="body(base) c(mute-600)">Find answers to common questions about our components</p>
          </div>

          <div class="pack w(full)">
            <div class="max-w(4xl) w(full)">
              <Accordion>
                <AccordionItem>
                  <summary class="p(lg) cursor(pointer) hbox(between) hover:bg(mute-200) transition-colors">
                    <p class="body(base) c(mute-900)">How do I install AdorableCSS components?</p>
                  </summary>
                  <div class="p(lg) pt(0) vbox gap(md)">
                    <p class="body(sm) c(mute-700)">You can install our components using npm or yarn. Simply run the
                      installation command and import the components you need.</p>
                    <div class="p(md) bg(mute-900) r(md)">
                      <code class="caption mono c(white)">npm install adorable-css-components</code>
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem>
                  <summary class="p(lg) cursor(pointer) hbox(between) hover:bg(mute-200) transition-colors">
                    <p class="body(base) c(mute-900)">Are components accessible by default?</p>
                  </summary>
                  <div class="p(lg) pt(0)">
                    <p class="body(sm) c(mute-700)">Yes, all our components are built with accessibility in mind. They
                      include proper ARIA labels, keyboard navigation, and screen reader support.</p>
                  </div>
                </AccordionItem>

                <AccordionItem>
                  <summary class="p(lg) cursor(pointer) hbox(between) hover:bg(mute-200) transition-colors">
                    <p class="body(base) c(mute-900)">Can I customize the component styles?</p>
                  </summary>
                  <div class="p(lg) pt(0)">
                    <p class="body(sm) c(mute-700)">Absolutely! Our components are designed to be easily customizable
                      using CSS variables and utility classes. You can also extend them with your own styles.</p>
                  </div>
                </AccordionItem>

                <AccordionItem>
                  <summary class="p(lg) cursor(pointer) hbox(between) hover:bg(mute-200) transition-colors">
                    <p class="body(base) c(mute-900)">What frameworks are supported?</p>
                  </summary>
                  <div class="p(lg) pt(0)">
                    <p class="body(sm) c(mute-700)">Our components work with React, Vue, Svelte, and vanilla JavaScript.
                      We provide framework-specific packages for each platform.</p>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg(mute-900) py(3xl)">
    <div class="pack px(2xl)">
      <div class="container(6xl)">
        <div class="vbox gap(2xl) text(center)">
          <div class="vbox gap(lg)">
            <h3 class="heading(h3) c(white)">AdorableCSS Component Showcase</h3>
            <p class="body(base) c(mute-400)">모든 컴포넌트를 실제 사용 시나리오로 구성한 종합 전시관</p>
          </div>

          <div class="pack gap(xl)">
            <Button variant="ghost">
              <span class="c(mute-400) hover:c(white)">Documentation</span>
            </Button>
            <Button variant="ghost">
              <span class="c(mute-400) hover:c(white)">GitHub</span>
            </Button>
            <Button variant="ghost">
              <span class="c(mute-400) hover:c(white)">Components</span>
            </Button>
          </div>

          <div class="pt(lg)">
            <p class="caption c(mute-500)">Built with AdorableCSS • No margins used • Only gap and padding</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>