<script>
  import { onMount } from 'svelte';
  
  // Product data
  const product = {
    name: "AirPods Pro Max Studio",
    brand: "Apple", 
    price: 549.99,
    originalPrice: 599.99,
    rating: 4.8,
    reviews: 2847,
    images: [
      "https://images.unsplash.com/photo-1625227431331-33b1c0e03a0c?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1484704324500-b23545a6f4c6?w=800&h=800&fit=crop&auto=format", 
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop&auto=format"
    ],
    colors: [
      { name: "Space Gray", color: "#8E8E93", available: true },
      { name: "Silver", color: "#F2F2F7", available: true },
      { name: "Sky Blue", color: "#007AFF", available: true },
      { name: "Pink", color: "#FF2D92", available: false }
    ],
    storage: [
      { size: "64GB", price: 549.99, available: true },
      { size: "256GB", price: 649.99, available: true },
      { size: "512GB", price: 749.99, available: true }
    ],
    features: [
      "Active Noise Cancellation",
      "Transparency Mode", 
      "Spatial Audio with dynamic head tracking",
      "Up to 20 hours of battery life",
      "Digital Crown for precise volume control"
    ],
    specs: {
      "Weight": "384.8 grams",
      "Dimensions": "187.3 x 168.6 x 83.4 mm",
      "Battery": "Up to 20 hours",
      "Connectivity": "Bluetooth 5.0",
      "Chip": "Apple H1"
    }
  };

  // State management
  let currentImageIndex = 0;
  let selectedColor = 0;
  let selectedStorage = 0;
  let quantity = 1;
  let activeTab = 'description';

  // Related products
  const relatedProducts = [
    {
      name: "iPhone 15 Pro",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop&auto=format",
      rating: 4.9
    },
    {
      name: "MacBook Air M2",
      price: 1199.99,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&auto=format",
      rating: 4.7
    },
    {
      name: "Apple Watch Ultra",
      price: 799.99,
      image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop&auto=format",
      rating: 4.6
    },
    {
      name: "iPad Pro 12.9",
      price: 1099.99,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&auto=format", 
      rating: 4.8
    }
  ];

  // Icons
  const icons = {
    star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
    truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 3v8c0 1.5-.8 4-8 7-7.2-3-8-5.5-8-7V5l8-3z"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
    minus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`
  };

  function formatPrice(price) {
    return `$${price.toFixed(2)}`;
  }

  function selectImage(index) {
    currentImageIndex = index;
  }

  function addToCart() {
    alert(`Added ${quantity} ${product.name} to cart!`);
  }

  function buyNow() {
    alert(`Proceeding to checkout with ${quantity} ${product.name}`);
  }
</script>

<div class="min-h(screen) bg(neutral-50)">
  <!-- Navigation -->
  <nav class="bg(white/auto-text) border-b(1/neutral-100) sticky top(0) z(50) backdrop-blur">
    <div class="container(7xl) mx(auto) px(2xl) py(md)">
      <div class="hbox(between/middle)">
        <div class="hbox gap(3xl) items(center)">
          <h1 class="body(lg) bold c(neutral-900)">techstore</h1>
          <div class="hbox gap(2xl) ..md:hidden">
            <a href="#" class="caption c(neutral-600) hover:c(neutral-900) transition">Products</a>
            <a href="#" class="caption c(neutral-600) hover:c(neutral-900) transition">Categories</a>
            <a href="#" class="caption c(neutral-600) hover:c(neutral-900) transition">About</a>
            <a href="#" class="caption c(neutral-600) hover:c(neutral-900) transition">Support</a>
          </div>
        </div>
        <div class="hbox gap(lg) items(center)">
          <button class="p(xs) hover:bg(neutral-50) r(md) transition">
            <div class="size(18) c(neutral-500)">{@html icons.heart}</div>
          </button>
          <button class="relative p(xs) hover:bg(neutral-50) r(md) transition">
            <div class="size(18) c(neutral-500)">{@html icons.cart}</div>
            <span class="absolute top(-6) right(-6) size(14) bg(neutral-900/auto-text) r(full) text(2xs) hbox(center/middle)">3</span>
          </button>
          <button class="px(md) py(xs) c(neutral-600) hover:c(neutral-900) caption transition">
            Sign In
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Breadcrumb -->
  <div class="container(7xl) mx(auto) px(2xl) pt(lg)">
    <div class="hbox gap(xs) items(center) text(2xs) c(neutral-500)">
      <a href="#" class="hover:c(neutral-700) transition">Home</a>
      <span>·</span>
      <a href="#" class="hover:c(neutral-700) transition">Electronics</a>
      <span>·</span>
      <a href="#" class="hover:c(neutral-700) transition">Audio</a>
      <span>·</span>
      <span class="c(neutral-700)">{product.name}</span>
    </div>
  </div>

  <!-- Product Section -->
  <div class="container(7xl) mx(auto) px(2xl) py(xl)">
    <div class="grid(2) gap(4xl) items(start) ..lg:grid(1)">
      <!-- Product Images -->
      <div class="vbox gap(md) sticky top(20)">
        <!-- Main Image -->
        <div class="relative">
          <img 
            src={product.images[currentImageIndex]} 
            alt={product.name}
            class="w(full) aspect(1) object(cover) r(lg) bg(neutral-50)"
          />
          <button class="absolute top(md) right(md) p(sm) bg(white/auto-text) r(md) hover:scale(110) transition">
            <div class="size(16) c(neutral-600)">{@html icons.heart}</div>
          </button>
        </div>
        
        <!-- Thumbnail Images -->
        <div class="hbox gap(sm)">
          {#each product.images as image, index}
            <button 
              class="size(64) r(md) clip {currentImageIndex === index ? 'ring(2/neutral-900)' : 'opacity(60) hover:opacity(100)'} transition"
              on:click={() => selectImage(index)}
            >
              <img src={image} alt="{product.name} view {index + 1}" class="w(full) h(full) object(cover)"/>
            </button>
          {/each}
        </div>
      </div>

      <!-- Product Info -->
      <div class="vbox gap(lg)">
        <!-- Title & Rating -->
        <div class="vbox gap(sm)">
          <div class="text(2xs) c(neutral-500)">{product.brand}</div>
          <h1 class="heading(lg) c(neutral-900) leading(tight)">{product.name}</h1>
          <div class="hbox gap(md) items(center)">
            <div class="hbox gap(xs) items(center)">
              <div class="hbox gap(0)">
                {#each Array(5) as _, i}
                  <div class="size(14) {i < Math.floor(product.rating) ? 'c(yellow-500)' : 'c(neutral-200)'}">
                    {@html icons.star}
                  </div>
                {/each}
              </div>
              <span class="caption c(neutral-700)">{product.rating}</span>
            </div>
            <span class="text(2xs) c(neutral-500)">({product.reviews.toLocaleString()} reviews)</span>
          </div>
        </div>

        <!-- Price -->
        <div class="vbox gap(xs)">
          <div class="hbox gap(sm) items(baseline)">
            <span class="heading(md) c(neutral-900)">{formatPrice(product.storage[selectedStorage].price)}</span>
            {#if product.originalPrice > product.storage[selectedStorage].price}
              <span class="body(sm) c(neutral-400) line-through">{formatPrice(product.originalPrice)}</span>
            {/if}
          </div>
          {#if product.originalPrice > product.storage[selectedStorage].price}
            <span class="text(2xs) c(green-600)">
              Save {Math.round((1 - product.storage[selectedStorage].price / product.originalPrice) * 100)}% today
            </span>
          {/if}
        </div>

        <!-- Color Selection -->
        <div class="vbox gap(sm)">
          <h3 class="caption c(neutral-700)">Color</h3>
          <div class="hbox gap(xs)">
            {#each product.colors as color, index}
              <button 
                class="relative size(32) r(md) border(1/{selectedColor === index ? 'neutral-900' : 'neutral-200'}) hover:border(neutral-400) transition {!color.available ? 'opacity(40) cursor(not-allowed)' : ''}"
                style="background-color: {color.color}"
                on:click={() => color.available && (selectedColor = index)}
                disabled={!color.available}
              >
                {#if selectedColor === index}
                  <div class="absolute inset(0) hbox(center/middle)">
                    <div class="size(12) c(white)">{@html icons.check}</div>
                  </div>
                {/if}
                {#if !color.available}
                  <div class="absolute inset(0) bg(white.5) r(md)"></div>
                {/if}
              </button>
            {/each}
          </div>
          <p class="text(2xs) c(neutral-500)">{product.colors[selectedColor].name}</p>
        </div>

        <!-- Storage Selection -->
        <div class="vbox gap(sm)">
          <h3 class="caption c(neutral-700)">Storage</h3>
          <div class="hbox gap(xs) flex-wrap">
            {#each product.storage as storage, index}
              <button 
                class="px(md) py(sm) border(1/{selectedStorage === index ? 'neutral-900' : 'neutral-200'}) r(md) hover:border(neutral-400) transition {!storage.available ? 'opacity(40) cursor(not-allowed)' : ''}"
                on:click={() => storage.available && (selectedStorage = index)}
                disabled={!storage.available}
              >
                <span class="caption c(neutral-900)">{storage.size}</span>
              </button>
            {/each}
          </div>
        </div>

        <!-- Quantity & Actions -->
        <div class="vbox gap(md) pt(md)">
          <div class="hbox gap(xl) items(center)">
            <div class="vbox gap(xs)">
              <label class="text(2xs) c(neutral-500)">Quantity</label>
              <div class="hbox border(1/neutral-200) r(md) clip">
                <button 
                  class="px(sm) py(xs) hover:bg(neutral-50) transition disabled:opacity(40)"
                  on:click={() => quantity > 1 && quantity--}
                  disabled={quantity <= 1}
                >
                  <div class="size(12) c(neutral-500)">{@html icons.minus}</div>
                </button>
                <span class="px(md) py(xs) caption">{quantity}</span>
                <button 
                  class="px(sm) py(xs) hover:bg(neutral-50) transition"
                  on:click={() => quantity++}
                >
                  <div class="size(12) c(neutral-500)">{@html icons.plus}</div>
                </button>
              </div>
            </div>
            <div class="text(2xs) c(green-600)">
              ✓ In stock · Ships today
            </div>
          </div>

          <div class="vbox gap(sm)">
            <button 
              class="w(full) py(md) bg(neutral-900/auto-text) r(md) body(sm) hover:bg(neutral-800) transition"
              on:click={buyNow}
            >
              Buy Now
            </button>
            <button 
              class="w(full) py(md) border(1/neutral-900) r(md) body(sm) c(neutral-900) hover:bg(neutral-50) transition"
              on:click={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <!-- Features -->
        <div class="vbox gap(xs) pt(sm)">
          {#each product.features.slice(0, 3) as feature}
            <div class="hbox gap(sm) items(center)">
              <div class="size(12) c(neutral-400)">{@html icons.check}</div>
              <span class="text(2xs) c(neutral-600)">{feature}</span>
            </div>
          {/each}
        </div>

        <!-- Shipping & Returns -->
        <div class="hbox gap(lg) pt(md) border-t(1/neutral-100)">
          <div class="vbox gap(0)">
            <span class="text(2xs) c(neutral-700)">Free Shipping</span>
            <span class="text(3xs) c(neutral-500)">Orders $50+</span>
          </div>
          <div class="vbox gap(0)">
            <span class="text(2xs) c(neutral-700)">2 Year Warranty</span>
            <span class="text(3xs) c(neutral-500)">Full coverage</span>
          </div>
          <div class="vbox gap(0)">
            <span class="text(2xs) c(neutral-700)">Easy Returns</span>
            <span class="text(3xs) c(neutral-500)">30 days</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Details Tabs -->
    <div class="vbox gap(lg) pt(3xl)">
      <!-- Tab Navigation -->
      <div class="hbox gap(xl) border-b(1/neutral-100)">
        {#each ['description', 'specifications', 'reviews'] as tab}
          <button 
            class="pb(sm) border-b(2/{activeTab === tab ? 'neutral-900' : 'transparent'}) caption {activeTab === tab ? 'c(neutral-900)' : 'c(neutral-500)'} hover:c(neutral-700) transition"
            on:click={() => activeTab = tab}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        {/each}
      </div>

      <!-- Tab Content -->
      <div class="pt(lg)">
        {#if activeTab === 'description'}
          <div class="max-w(4xl)">
            <div class="vbox gap(md)">
              <p class="body(sm) c(neutral-700) leading(relaxed)">
                Experience premium sound quality with the AirPods Pro Max Studio. These over-ear headphones deliver 
                industry-leading Active Noise Cancellation and Transparency mode, allowing you to control how much 
                of your surroundings you hear.
              </p>
              <p class="body(sm) c(neutral-700) leading(relaxed)">
                With Spatial Audio featuring dynamic head tracking, you'll feel like you're inside the song or movie. 
                The Digital Crown gives you precise control over volume, track selection, and Siri activation.
              </p>
              <div class="vbox gap(xs) pt(md)">
                <h4 class="caption c(neutral-900)">What's in the Box</h4>
                <div class="vbox gap(xs)">
                  {#each ['AirPods Pro Max Studio', 'Lightning to USB-C Cable', 'Smart Case', 'Documentation'] as item}
                    <div class="hbox gap(sm)">
                      <span class="text(2xs) c(neutral-500)">•</span>
                      <span class="text(2xs) c(neutral-600)">{item}</span>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {:else if activeTab === 'specifications'}
          <div class="max-w(2xl) vbox gap(0)">
            {#each Object.entries(product.specs) as [key, value]}
              <div class="hbox(between) py(sm) border-b(1/neutral-100)">
                <span class="caption c(neutral-600)">{key}</span>
                <span class="caption c(neutral-900)">{value}</span>
              </div>
            {/each}
          </div>
        {:else if activeTab === 'reviews'}
          <div class="vbox gap(xl)">
            <!-- Review Summary -->
            <div class="hbox gap(xl) items(center)">
              <div class="vbox gap(xs)">
                <div class="heading(md) c(neutral-900)">{product.rating}</div>
                <div class="hbox gap(0)">
                  {#each Array(5) as _, i}
                    <div class="size(12) {i < Math.floor(product.rating) ? 'c(yellow-500)' : 'c(neutral-200)'}">
                      {@html icons.star}
                    </div>
                  {/each}
                </div>
                <span class="text(2xs) c(neutral-500)">{product.reviews.toLocaleString()} reviews</span>
              </div>
              <div class="vbox gap(xs) flex-1 max-w(sm)">
                {#each [5,4,3,2,1] as stars}
                  <div class="hbox gap(sm) items(center)">
                    <span class="text(2xs) c(neutral-500) w(8)">{stars}</span>
                    <div class="flex-1 h(4) bg(neutral-100) r(full) clip">
                      <div class="h(full) bg(neutral-900) r(full)" style="width: {stars === 5 ? 70 : stars === 4 ? 20 : 5}%"></div>
                    </div>
                    <span class="text(2xs) c(neutral-500) w(24)">{stars === 5 ? '70%' : stars === 4 ? '20%' : '5%'}</span>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Sample Reviews -->
            <div class="vbox gap(md)">
              {#each [
                { name: "Sarah M.", rating: 5, date: "2 weeks ago", text: "Absolutely love these headphones! The sound quality is incredible and the noise cancellation works perfectly." },
                { name: "Mike K.", rating: 4, date: "1 month ago", text: "Great headphones overall. The only downside is they're a bit heavy for long listening sessions." },
                { name: "Jessica L.", rating: 5, date: "3 weeks ago", text: "Best investment I've made this year. The spatial audio feature is mind-blowing!" }
              ] as review}
                <div class="vbox gap(sm) py(md) border-b(1/neutral-100)">
                  <div class="hbox(between) items(start)">
                    <div class="hbox gap(sm) items(center)">
                      <span class="caption c(neutral-900)">{review.name}</span>
                      <div class="hbox gap(0)">
                        {#each Array(5) as _, i}
                          <div class="size(10) {i < review.rating ? 'c(yellow-500)' : 'c(neutral-200)'}">
                            {@html icons.star}
                          </div>
                        {/each}
                      </div>
                      <span class="text(2xs) c(neutral-500)">{review.date}</span>
                    </div>
                  </div>
                  <p class="caption c(neutral-600)">{review.text}</p>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- Related Products -->
    <div class="vbox gap(md) pt(3xl)">
      <h2 class="body(md) c(neutral-900)">You might also like</h2>
      <div class="grid(4) gap(md) ..lg:grid(2) ..sm:grid(1)">
        {#each relatedProducts as item}
          <div class="bg(white/auto-text) r(md) group">
            <div class="relative">
              <img src={item.image} alt={item.name} class="w(full) aspect(1) object(cover) r-t(md)"/>
              <button class="absolute top(sm) right(sm) p(xs) bg(white.9) r(sm) opacity(0) group-hover:opacity(100) transition">
                <div class="size(12) c(neutral-600)">{@html icons.heart}</div>
              </button>
            </div>
            <div class="p(md) vbox gap(xs)">
              <h3 class="caption c(neutral-900) truncate">{item.name}</h3>
              <div class="hbox gap(xs) items(center)">
                <div class="hbox gap(0)">
                  {#each Array(5) as _, i}
                    <div class="size(10) {i < Math.floor(item.rating) ? 'c(yellow-500)' : 'c(neutral-200)'}">
                      {@html icons.star}
                    </div>
                  {/each}
                </div>
                <span class="text(2xs) c(neutral-500)">({item.rating})</span>
              </div>
              <div class="hbox(between) items(center) pt(xs)">
                <span class="body(sm) c(neutral-900)">{formatPrice(item.price)}</span>
                <button class="px(sm) py(2xs) border(1/neutral-900) r(sm) text(2xs) c(neutral-900) hover:bg(neutral-50) transition">
                  Add
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg(neutral-900/auto-text) pt(3xl) pb(xl) mt(3xl)">
    <div class="container(7xl) mx(auto) px(2xl)">
      <div class="grid(4) gap(3xl) ..lg:grid(2) ..sm:grid(1) pb(2xl) border-b(1/neutral-800)">
        <div class="vbox gap(sm)">
          <h3 class="body(md)">techstore</h3>
          <p class="text(2xs) c(neutral-500) leading(relaxed)">
            Your trusted destination for the latest technology products.
          </p>
        </div>
        <div class="vbox gap(sm)">
          <h4 class="caption">Shop</h4>
          <div class="vbox gap(xs)">
            <a href="#" class="text(2xs) c(neutral-500) hover:c(white) transition">All Products</a>
            <a href="#" class="text(2xs) c(neutral-500) hover:c(white) transition">New Arrivals</a>
            <a href="#" class="text(2xs) c(neutral-500) hover:c(white) transition">Best Sellers</a>
            <a href="#" class="text(2xs) c(neutral-500) hover:c(white) transition">Sale</a>
          </div>
        </div>
        <div class="vbox gap(sm)">
          <h4 class="caption">Support</h4>
          <div class="vbox gap(xs)">
            <a href="#" class="text(2xs) c(neutral-500) hover:c(white) transition">Contact Us</a>
            <a href="#" class="text(2xs) c(neutral-500) hover:c(white) transition">FAQs</a>
            <a href="#" class="text(2xs) c(neutral-500) hover:c(white) transition">Shipping</a>
            <a href="#" class="text(2xs) c(neutral-500) hover:c(white) transition">Returns</a>
          </div>
        </div>
        <div class="vbox gap(sm)">
          <h4 class="caption">Stay Updated</h4>
          <p class="text(2xs) c(neutral-500)">Get special offers and new product updates</p>
          <div class="hbox gap(xs)">
            <input 
              type="email" 
              placeholder="Email"
              class="flex-1 px(sm) py(xs) bg(transparent) border(1/neutral-700) r(sm) text(2xs) c(white) placeholder:c(neutral-600)"
            />
            <button class="px(md) py(xs) bg(white) c(neutral-900) r(sm) text(2xs) hover:bg(neutral-200) transition">
              Join
            </button>
          </div>
        </div>
      </div>
      <div class="pt(lg) hbox(between) items(center) ..sm:vbox ..sm:gap(sm)">
        <p class="text(2xs) c(neutral-500)">© 2024 TechStore. All rights reserved.</p>
        <div class="hbox gap(md)">
          <a href="#" class="text(2xs) c(neutral-500) hover:c(white) transition">Privacy</a>
          <a href="#" class="text(2xs) c(neutral-500) hover:c(white) transition">Terms</a>
        </div>
      </div>
    </div>
  </footer>
</div>