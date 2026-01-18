<script>
  import Button from '$lib/components/ui/Button.svelte'
  import Badge from '$lib/components/ui/Badge.svelte'
  import Avatar from '$lib/components/ui/Avatar.svelte'
  import Input from '$lib/components/ui/Input.svelte'
  import Label from '$lib/components/ui/Label.svelte'
  import Alert from '$lib/components/ui/Alert.svelte'
  import Accordion from '$lib/components/ui/Accordion.svelte'
  import AccordionItem from '$lib/components/ui/AccordionItem.svelte'
  import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte'
  import BreadcrumbItem from '$lib/components/ui/BreadcrumbItem.svelte'
  import Checkbox from '$lib/components/ui/Checkbox.svelte'
  import RadioGroup from '$lib/components/ui/RadioGroup.svelte'
  import RadioButton from '$lib/components/ui/RadioButton.svelte'
  import Switch from '$lib/components/ui/Switch.svelte'
  import Slider from '$lib/components/ui/Slider.svelte'
  import Progress from '$lib/components/ui/Progress.svelte'
  import Tabs from '$lib/components/ui/Tabs.svelte'
  import TabsList from '$lib/components/ui/TabsList.svelte'
  import TabsTrigger from '$lib/components/ui/TabsTrigger.svelte'
  import TabsContent from '$lib/components/ui/TabsContent.svelte'
  import Dialog from '$lib/components/ui/Dialog.svelte'
  import Textarea from '$lib/components/ui/Textarea.svelte'
  import Select from '$lib/components/ui/Select.svelte'
  import Separator from '$lib/components/ui/Separator.svelte'
  import Table from '$lib/components/ui/Table.svelte'
  import TableHeader from '$lib/components/ui/TableHeader.svelte'
  import TableRow from '$lib/components/ui/TableRow.svelte'
  import TableCell from '$lib/components/ui/TableCell.svelte'
  import TableHeaderCell from '$lib/components/ui/TableHeaderCell.svelte'
  import Skeleton from '$lib/components/ui/Skeleton.svelte'
  import Toast from '$lib/components/ui/Toast.svelte'
  import Tooltip from '$lib/components/ui/Tooltip.svelte'
  import DropdownMenu from '$lib/components/ui/DropdownMenu.svelte'
  import DropdownMenuItem from '$lib/components/ui/DropdownMenuItem.svelte'
  import Pagination from '$lib/components/ui/Pagination.svelte'
  import NavigationMenu from '$lib/components/ui/NavigationMenu.svelte'
  import NavigationMenuItem from '$lib/components/ui/NavigationMenuItem.svelte'
  import Sheet from '$lib/components/ui/Sheet.svelte'
  import Sidebar from '$lib/components/ui/Sidebar.svelte'
  import Calendar from '$lib/components/ui/Calendar.svelte'
  import Card from '$lib/components/ui/Card.svelte'

  let dialogOpen = false
  let sheetOpen = false
</script>

<div class="vbox gap(48) py(48)">
  <!-- Header -->
  <section class="vbox gap(16) container mx(auto) px(24)">
    <h1 class="font(4xl/bold) c(gray-900)">Component Library</h1>
    <p class="font(lg) c(gray-600) max-w(4xl)">
      shadcn/ui에서 영감을 받아 AdorableCSS로 구현한 컴포넌트 라이브러리입니다.
      모든 컴포넌트는 순수 CSS 유틸리티만으로 스타일링되었습니다.
    </p>
  </section>

  <!-- Buttons -->
  <section class="vbox gap(24) container mx(auto) px(24)">
    <h2 class="font(2xl/bold) c(gray-900)">Buttons</h2>
    
    <div class="vbox gap(16) p(24) r(lg) bg(gray-50)">
      <div class="hbox(wrap) gap(12)">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      
      <Separator />
      
      <div class="hbox(wrap) gap(12)">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">🚀</Button>
      </div>
      
      <Separator />
      
      <div class="hbox gap(12)">
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
    </div>
  </section>

  <!-- Form Components -->
  <section class="vbox gap(24) container mx(auto) px(24)">
    <h2 class="font(2xl/bold) c(gray-900)">Form Components</h2>
    
    <div class="grid(1) md:grid(2) gap(24) p(24) r(lg) bg(gray-50)">
      <div class="vbox gap(16)">
        <div class="vbox gap(8)">
          <Label>Text Input</Label>
          <Input />
          <Input variant="error" />
        </div>
        
        <div class="vbox gap(8)">
          <Label>Select</Label>
          <Select>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </Select>
        </div>
        
        <div class="vbox gap(8)">
          <Label>Textarea</Label>
          <Textarea />
        </div>
      </div>
      
      <div class="vbox gap(16)">
        <div class="vbox gap(8)">
          <Label>Checkboxes</Label>
          <Checkbox>Option 1</Checkbox>
          <Checkbox checked>Option 2 (checked)</Checkbox>
        </div>
        
        <div class="vbox gap(8)">
          <Label>Radio Buttons</Label>
          <RadioGroup>
            <RadioButton>Option A</RadioButton>
            <RadioButton checked>Option B</RadioButton>
            <RadioButton>Option C</RadioButton>
          </RadioGroup>
        </div>
        
        <div class="vbox gap(8)">
          <Label>Switch</Label>
          <div class="hbox gap(16)">
            <Switch />
            <Switch checked />
          </div>
        </div>
        
        <div class="vbox gap(8)">
          <Label>Slider</Label>
          <Slider value={30} />
        </div>
      </div>
    </div>
  </section>

  <!-- Layout Components -->
  <section class="vbox gap(24) container mx(auto) px(24)">
    <h2 class="font(2xl/bold) c(gray-900)">Layout Components</h2>
    
    <div class="vbox gap(24)">
      <!-- Cards -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Cards</h3>
        <div class="grid(1) md:grid(3) gap(16)">
          <Card>
            <div class="p(20)">
              <h4 class="font(lg/semibold) mb(8)">Card Title</h4>
              <p class="c(gray-600)">This is a basic card component with some content.</p>
            </div>
          </Card>
          <Card>
            <div class="p(20)">
              <h4 class="font(lg/semibold) mb(8)">Another Card</h4>
              <p class="c(gray-600)">Cards are great for organizing content.</p>
            </div>
          </Card>
          <Card>
            <div class="p(20)">
              <h4 class="font(lg/semibold) mb(8)">Third Card</h4>
              <p class="c(gray-600)">They can contain any type of content.</p>
            </div>
          </Card>
        </div>
      </div>

      <!-- Accordion -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Accordion</h3>
        <Accordion variant="bordered">
          <AccordionItem>
            <span slot="trigger">Is it accessible?</span>
            <p slot="content">Yes. It adheres to the WAI-ARIA design pattern.</p>
          </AccordionItem>
          <AccordionItem>
            <span slot="trigger">Is it styled?</span>
            <p slot="content">Yes. It comes with default styles that matches the other components' aesthetic.</p>
          </AccordionItem>
          <AccordionItem>
            <span slot="trigger">Is it animated?</span>
            <p slot="content">Yes. It's animated by default, but you can disable it if you prefer.</p>
          </AccordionItem>
        </Accordion>
      </div>

      <!-- Tabs -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Tabs</h3>
        <Tabs>
          <TabsList>
            <TabsTrigger active>Account</TabsTrigger>
            <TabsTrigger>Password</TabsTrigger>
            <TabsTrigger>Settings</TabsTrigger>
          </TabsList>
          <TabsContent>
            <p>Make changes to your account here. Click save when you're done.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </section>

  <!-- Data Display -->
  <section class="vbox gap(24) container mx(auto) px(24)">
    <h2 class="font(2xl/bold) c(gray-900)">Data Display</h2>
    
    <div class="vbox gap(24)">
      <!-- Badges -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Badges</h3>
        <div class="hbox(wrap) gap(8)">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>

      <!-- Avatars -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Avatars</h3>
        <div class="hbox gap(12)">
          <Avatar size="sm">JD</Avatar>
          <Avatar>JD</Avatar>
          <Avatar size="lg">JD</Avatar>
        </div>
      </div>

      <!-- Alerts -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Alerts</h3>
        <Alert>This is a default alert</Alert>
        <Alert variant="destructive">This is a destructive alert</Alert>
        <Alert variant="warning">This is a warning alert</Alert>
      </div>

      <!-- Progress -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Progress</h3>
        <Progress value={60} />
      </div>

      <!-- Table -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Table</h3>
        <Table>
          <TableHeader>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
          </TableHeader>
          <tbody>
            <TableRow>
              <TableCell>Product 1</TableCell>
              <TableCell>
                <Badge variant="secondary">Active</Badge>
              </TableCell>
              <TableCell>$29.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Product 2</TableCell>
              <TableCell>
                <Badge variant="outline">Draft</Badge>
              </TableCell>
              <TableCell>$39.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Product 3</TableCell>
              <TableCell>
                <Badge variant="secondary">Active</Badge>
              </TableCell>
              <TableCell>$49.99</TableCell>
            </TableRow>
          </tbody>
        </Table>
      </div>

      <!-- Skeleton -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Skeleton</h3>
        <div class="vbox gap(8)">
          <Skeleton width="250px" />
          <Skeleton width="200px" />
          <Skeleton width="150px" />
        </div>
      </div>
    </div>
  </section>

  <!-- Navigation -->
  <section class="vbox gap(24) container mx(auto) px(24)">
    <h2 class="font(2xl/bold) c(gray-900)">Navigation</h2>
    
    <div class="vbox gap(24)">
      <!-- Breadcrumbs -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Breadcrumbs</h3>
        <Breadcrumb>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Design System</BreadcrumbItem>
          <BreadcrumbItem current>Components</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <!-- Navigation Menu -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Navigation Menu</h3>
        <NavigationMenu>
          <NavigationMenuItem active>Home</NavigationMenuItem>
          <NavigationMenuItem>About</NavigationMenuItem>
          <NavigationMenuItem>Services</NavigationMenuItem>
          <NavigationMenuItem>Contact</NavigationMenuItem>
        </NavigationMenu>
      </div>

      <!-- Pagination -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Pagination</h3>
        <Pagination />
      </div>
    </div>
  </section>

  <!-- Overlays -->
  <section class="vbox gap(24) container mx(auto) px(24)">
    <h2 class="font(2xl/bold) c(gray-900)">Overlays</h2>
    
    <div class="vbox gap(24)">
      <!-- Toast -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Toast</h3>
        <div class="vbox gap(12)">
          <Toast>
            <p class="font(sm/semibold)">Default Toast</p>
            <p class="font(sm) c(gray-600)">This is a default notification.</p>
          </Toast>
          <Toast variant="success">
            <p class="font(sm/semibold)">Success!</p>
            <p class="font(sm) c(gray-600)">Your action was successful.</p>
          </Toast>
          <Toast variant="error">
            <p class="font(sm/semibold)">Error</p>
            <p class="font(sm) c(gray-600)">Something went wrong.</p>
          </Toast>
          <Toast variant="warning">
            <p class="font(sm/semibold)">Warning</p>
            <p class="font(sm) c(gray-600)">Please be careful.</p>
          </Toast>
        </div>
      </div>

      <!-- Dialog Demo -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Dialog</h3>
        <Button on:click={() => dialogOpen = true}>Open Dialog</Button>
        <Dialog open={dialogOpen}>
          <div class="vbox gap(16)">
            <h3 class="font(xl/semibold)">Dialog Title</h3>
            <p class="c(gray-600)">This is a dialog component. You can put any content here.</p>
            <div class="hbox(right) gap(12)">
              <Button variant="outline" on:click={() => dialogOpen = false}>Cancel</Button>
              <Button on:click={() => dialogOpen = false}>Confirm</Button>
            </div>
          </div>
        </Dialog>
      </div>

      <!-- Sheet Demo -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Sheet</h3>
        <Button on:click={() => sheetOpen = true}>Open Sheet</Button>
        <Sheet open={sheetOpen}>
          <div class="p(24) vbox gap(16)">
            <h3 class="font(xl/semibold)">Sheet Title</h3>
            <p class="c(gray-600)">This is a sheet component sliding from the right.</p>
            <Button variant="outline" on:click={() => sheetOpen = false}>Close</Button>
          </div>
        </Sheet>
      </div>
    </div>
  </section>

  <!-- Other Components -->
  <section class="vbox gap(24) container mx(auto) px(24)">
    <h2 class="font(2xl/bold) c(gray-900)">Other Components</h2>
    
    <div class="vbox gap(24)">
      <!-- Calendar -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Calendar</h3>
        <Calendar />
      </div>

      <!-- Separator -->
      <div class="vbox gap(12)">
        <h3 class="font(xl/semibold)">Separator</h3>
        <div class="vbox gap(16)">
          <p>Some content above</p>
          <Separator />
          <p>Some content below</p>
        </div>
      </div>
    </div>
  </section>
</div>