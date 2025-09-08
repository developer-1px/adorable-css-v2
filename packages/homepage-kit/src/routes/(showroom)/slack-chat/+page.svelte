<script>
  let currentChannel = 'general';
  let message = '';
  let channels = [
    { id: 'general', name: 'general', unread: 3 },
    { id: 'random', name: 'random', unread: 0 },
    { id: 'design', name: 'design', unread: 7 },
    { id: 'frontend', name: 'frontend', unread: 1 },
    { id: 'backend', name: 'backend', unread: 0 }
  ];
  
  let messages = [
    {
      id: 1,
      user: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=36&h=36&fit=crop&crop=face',
      time: '9:12 AM',
      content: 'Hey everyone! Just finished the new login component. What do you think?',
      reactions: [{ emoji: '👍', count: 3 }, { emoji: '🔥', count: 1 }]
    },
    {
      id: 2,
      user: 'Bob Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=36&h=36&fit=crop&crop=face',
      time: '9:15 AM',
      content: 'Looks great! The animations are smooth 🎉',
      reactions: []
    },
    {
      id: 3,
      user: 'Carol Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=36&h=36&fit=crop&crop=face',
      time: '9:18 AM',
      content: 'I love the color scheme. Can you share the design tokens?',
      reactions: [{ emoji: '❤️', count: 2 }]
    }
  ];
  
  function sendMessage() {
    if (message.trim()) {
      messages = [...messages, {
        id: messages.length + 1,
        user: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=36&h=36&fit=crop&crop=face',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        content: message,
        reactions: []
      }];
      message = '';
    }
  }
  
  function selectChannel(channelId) {
    currentChannel = channelId;
    channels = channels.map(ch => ({
      ...ch,
      unread: ch.id === channelId ? 0 : ch.unread
    }));
  }
</script>

<svelte:head>
  <title>Slack Chat - AdorableCSS</title>
</svelte:head>

<!-- Main Layout -->
<div class="hbox h(100vh) bg(gray-900) c(gray-300) text(sm)">
  
  <!-- Sidebar -->
  <div class="w(260) bg(gray-950) vbox">
    <!-- Workspace Header -->
    <div class="p(md) border-b(1/gray-800) vbox gap(xs)">
      <div class="hbox justify(between) items(center)">
        <div class="vbox gap(2xs)">
          <h1 class="text(lg) font(bold) c(white)">DevTeam</h1>
          <div class="hbox items(center) gap(xs) text(xs) c(gray-400)">
            <span class="w(8) h(8) r(full) bg(green-500)"></span>
            <span>24 members online</span>
          </div>
        </div>
        <button class="w(32) h(32) r(md) hbox(center) hover:bg(gray-800) transition cursor(pointer)">
          <span class="text(lg)">✏️</span>
        </button>
      </div>
    </div>
    
    <!-- Sidebar Navigation -->
    <div class="flex(1) overflow-y(auto) p(sm)">
      <!-- Quick Actions -->
      <div class="vbox gap(1)">
        <button class="hbox items(center) gap(sm) px(sm) py(xs) r(md) hover:bg(gray-800) transition cursor(pointer) text(left) w(full)">
          <span>💬</span>
          <span>Threads</span>
        </button>
        <button class="hbox items(center) gap(sm) px(sm) py(xs) r(md) hover:bg(gray-800) transition cursor(pointer) text(left) w(full)">
          <span>📝</span>
          <span>Drafts & Sent</span>
        </button>
        <button class="hbox items(center) gap(sm) px(sm) py(xs) r(md) hover:bg(gray-800) transition cursor(pointer) text(left) w(full)">
          <span>🔖</span>
          <span>Saved items</span>
        </button>
      </div>
      
      <!-- Channels Section -->
      <div class="vbox gap(xs) pt(lg)">
        <div class="hbox items(center) justify(between) px(sm) py(xs)">
          <div class="hbox items(center) gap(xs) c(gray-400) text(xs) font(medium)">
            <span class="text(2xs)">▼</span>
            <span>Channels</span>
          </div>
          <button class="text(lg) hover:bg(gray-800) w(24) h(24) r(sm) hbox(center) transition">+</button>
        </div>
        
        <div class="vbox">
          {#each channels as channel}
            <button 
              class="hbox items(center) gap(sm) px(sm) py(xs) r(md) hover:bg(gray-800) transition cursor(pointer) text(left) w(full) {currentChannel === channel.id ? 'bg(blue-900) c(white)' : ''}"
              on:click={() => selectChannel(channel.id)}
            >
              <span class="c(gray-500)">#</span>
              <span class="flex(1)">{channel.name}</span>
              {#if channel.unread > 0}
                <span class="bg(red-600) c(white) px(xs) py(2xs) r(full) text(xs) font(bold) min-w(20) text(center)">{channel.unread}</span>
              {/if}
            </button>
          {/each}
        </div>
      </div>
      
      <!-- Direct Messages -->
      <div class="vbox gap(xs) pt(lg)">
        <div class="hbox items(center) justify(between) px(sm) py(xs)">
          <div class="hbox items(center) gap(xs) c(gray-400) text(xs) font(medium)">
            <span class="text(2xs)">▼</span>
            <span>Direct messages</span>
          </div>
          <button class="text(lg) hover:bg(gray-800) w(24) h(24) r(sm) hbox(center) transition">+</button>
        </div>
        
        <div class="vbox">
          <button class="hbox items(center) gap(sm) px(sm) py(xs) r(md) hover:bg(gray-800) transition cursor(pointer) text(left) w(full)">
            <div class="relative">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=20&h=20&fit=crop&crop=face" 
                   alt="Alice" class="w(20) h(20) r(sm) object(cover)">
              <span class="absolute bottom(-2) right(-2) w(8) h(8) r(full) bg(green-500) border(2/gray-950)"></span>
            </div>
            <span>Alice Johnson</span>
          </button>
          <button class="hbox items(center) gap(sm) px(sm) py(xs) r(md) hover:bg(gray-800) transition cursor(pointer) text(left) w(full)">
            <div class="relative">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=20&h=20&fit=crop&crop=face" 
                   alt="Bob" class="w(20) h(20) r(sm) object(cover)">
              <span class="absolute bottom(-2) right(-2) w(8) h(8) r(full) bg(yellow-500) border(2/gray-950)"></span>
            </div>
            <span>Bob Smith</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Main Content Area -->
  <div class="flex(1) vbox">
    <!-- Channel Header -->
    <div class="h(56) px(lg) border-b(1/gray-800) hbox items(center) justify(between)">
      <div class="vbox gap(2xs)">
        <h2 class="text(lg) font(bold) c(white) hbox items(center) gap(xs)">
          <span class="c(gray-500)">#</span>
          <span>{currentChannel}</span>
        </h2>
        <span class="text(xs) c(gray-500)">Topic: General discussion and updates</span>
      </div>
      
      <div class="hbox gap(xs)">
        <button class="w(36) h(36) r(md) hbox(center) hover:bg(gray-800) transition">📞</button>
        <button class="w(36) h(36) r(md) hbox(center) hover:bg(gray-800) transition">🎥</button>
        <button class="w(36) h(36) r(md) hbox(center) hover:bg(gray-800) transition">ℹ️</button>
      </div>
    </div>
    
    <!-- Messages Area -->
    <div class="flex(1) overflow-y(auto) p(lg)">
      <div class="vbox gap(md)">
        {#each messages as msg}
          <div class="hbox gap(sm) items(start)">
            <img src={msg.avatar} alt={msg.user} class="w(36) h(36) r(md) object(cover)">
            <div class="flex(1) vbox gap(xs)">
              <div class="hbox items(baseline) gap(xs)">
                <span class="font(bold) c(white)">{msg.user}</span>
                <span class="text(xs) c(gray-500)">{msg.time}</span>
              </div>
              <p class="leading(relaxed)">{msg.content}</p>
              {#if msg.reactions.length > 0}
                <div class="hbox gap(xs) pt(xs)">
                  {#each msg.reactions as reaction}
                    <button class="hbox items(center) gap(xs) px(xs) py(2xs) r(lg) border(1/gray-700) hover:bg(gray-800) transition">
                      <span>{reaction.emoji}</span>
                      <span class="text(xs)">{reaction.count}</span>
                    </button>
                  {/each}
                  <button class="w(24) h(24) r(lg) border(1/gray-700) hbox(center) hover:bg(gray-800) transition text(xs)">+</button>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Message Input -->
    <div class="p(lg) border-t(1/gray-800)">
      <div class="border(1/gray-700) r(md) bg(gray-850) p(sm)">
        <div class="hbox gap(sm) items(center)">
          <input 
            type="text"
            bind:value={message}
            placeholder="Message #{currentChannel}"
            on:keydown={(e) => e.key === 'Enter' && sendMessage()}
            class="flex(1) bg(transparent) outline(none) placeholder:c(gray-500)"
          >
          <div class="hbox gap(xs)">
            <button class="w(32) h(32) r(md) hbox(center) hover:bg(gray-700) transition">📎</button>
            <button class="w(32) h(32) r(md) hbox(center) hover:bg(gray-700) transition">😀</button>
            <button class="w(32) h(32) r(md) hbox(center) hover:bg(gray-700) transition">@</button>
            <button 
              class="w(32) h(32) r(md) bg(green-600) hover:bg(green-700) c(white) hbox(center) transition"
              on:click={sendMessage}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-7-7a.5.5 0 1 0-.708.708L14.293 8 8.146 14.146a.5.5 0 0 0 .708.708l7-7z"/>
                <path d="M.5 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Right Sidebar (Thread) -->
  <div class="w(320) bg(gray-950) border-l(1/gray-800) vbox">
    <div class="p(md) border-b(1/gray-800) hbox items(center) justify(between)">
      <h3 class="text(lg) font(bold) c(white)">Thread</h3>
      <button class="w(32) h(32) r(md) hbox(center) hover:bg(gray-800) transition">✕</button>
    </div>
    
    <div class="flex(1) overflow-y(auto) p(lg)">
      <div class="vbox gap(md)">
        <!-- Original Message -->
        <div class="vbox gap(sm) pb(md) border-b(1/gray-800)">
          <div class="hbox gap(sm)">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=36&h=36&fit=crop&crop=face" 
                 alt="Alice" class="w(36) h(36) r(md) object(cover)">
            <div class="vbox gap(xs)">
              <span class="font(bold) c(white)">Alice Johnson</span>
              <p class="leading(relaxed)">Hey everyone! Just finished the new login component...</p>
              <span class="text(xs) c(gray-500)">9:12 AM</span>
            </div>
          </div>
        </div>
        
        <!-- Thread Replies -->
        <div class="vbox gap(sm)">
          <div class="hbox gap(sm) items(start)">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face" 
                 alt="Bob" class="w(24) h(24) r(sm) object(cover)">
            <div class="vbox gap(xs)">
              <div class="hbox items(baseline) gap(xs)">
                <span class="font(medium) c(white) text(sm)">Bob Smith</span>
                <span class="text(xs) c(gray-500)">9:25 AM</span>
              </div>
              <p class="text(sm) leading(relaxed)">Looks amazing! The attention to detail is perfect 🚀</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Custom scrollbar for better Slack feel */
  :global(*::-webkit-scrollbar) {
    width: 8px;
  }
  
  :global(*::-webkit-scrollbar-track) {
    background: transparent;
  }
  
  :global(*::-webkit-scrollbar-thumb) {
    background: #4a5568;
    border-radius: 4px;
  }
  
  :global(*::-webkit-scrollbar-thumb:hover) {
    background: #718096;
  }
</style>