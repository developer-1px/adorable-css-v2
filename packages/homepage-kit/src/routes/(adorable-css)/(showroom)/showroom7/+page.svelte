미교<script>
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
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=32&h=32&fit=crop&crop=face',
      time: '9:12 AM',
      content: 'Hey everyone! Just finished the new login component. What do you think?',
      reactions: [{ emoji: '👍', count: 3 }, { emoji: '🔥', count: 1 }]
    },
    {
      id: 2,
      user: 'Bob Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      time: '9:15 AM',
      content: 'Looks great! The animations are smooth 🎉',
      reactions: []
    },
    {
      id: 3,
      user: 'Carol Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      time: '9:18 AM',
      content: 'I love the color scheme. Can you share the design tokens?',
      reactions: [{ emoji: '❤️', count: 2 }]
    },
    {
      id: 4,
      user: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      time: '9:22 AM',
      content: 'Sure! Here\'s the Figma link: https://figma.com/design-tokens',
      reactions: []
    }
  ];
  
  function sendMessage() {
    if (message.trim()) {
      messages = [...messages, {
        id: messages.length + 1,
        user: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        content: message,
        reactions: []
      }];
      message = '';
    }
  }
  
  function selectChannel(channelId) {
    currentChannel = channelId;
  }
</script>

<svelte:head>
  <title>Slack Chat App - Showroom 6</title>
</svelte:head>

<div class="chat-app">
  <!-- Sidebar -->
  <div class="sidebar">
    <!-- Workspace Header -->
    <div class="workspace-header">
      <div class="workspace-info">
        <div class="workspace-name">DevTeam Workspace</div>
        <div class="workspace-status">
          <span class="status-dot"></span>
          <span>24 members online</span>
        </div>
      </div>
      <button class="compose-btn()">✕</button>
    </div>
    
    <!-- Navigation -->
    <div class="sidebar-nav">
      <div class="nav-section">
        <div class="nav-item()">
          <span class="nav-icon">💬</span>
          <span>Threads</span>
        </div>
        <div class="nav-item()">
          <span class="nav-icon">📝</span>
          <span>Drafts & Sent</span>
        </div>
        <div class="nav-item()">
          <span class="nav-icon">🔖</span>
          <span>Saved items</span>
        </div>
        <div class="nav-item()">
          <span class="nav-icon">👥</span>
          <span>People & user groups</span>
        </div>
        <div class="nav-item()">
          <span class="nav-icon">📱</span>
          <span>Apps</span>
        </div>
      </div>
      
      <!-- Channels -->
      <div class="nav-section">
        <div class="section-header">
          <span class="dropdown-arrow">▼</span>
          <span>Channels</span>
        </div>
        <div class="channels-list">
          {#each channels as channel}
            <div 
              class="channel-item({currentChannel === channel.id ? 'active' : 'default'})"
              on:click={() => selectChannel(channel.id)}
            >
              <span class="channel-hash">#</span>
              <span class="channel-name">{channel.name}</span>
              {#if channel.unread > 0}
                <span class="unread-badge()">{channel.unread}</span>
              {/if}
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Direct Messages -->
      <div class="nav-section">
        <div class="section-header">
          <span class="dropdown-arrow">▼</span>
          <span>Direct messages</span>
        </div>
        <div class="dm-list">
          <div class="dm-item()">
            <div class="dm-avatar">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b647?w=24&h=24&fit=crop&crop=face" alt="Alice">
              <span class="status-dot(online)"></span>
            </div>
            <span class="dm-name">Alice Johnson</span>
          </div>
          <div class="dm-item()">
            <div class="dm-avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face" alt="Bob">
              <span class="status-dot(away)"></span>
            </div>
            <span class="dm-name">Bob Smith</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Main Chat Area -->
  <div class="main-chat">
    <!-- Chat Header -->
    <div class="chat-header">
      <div class="channel-info">
        <h2 class="channel-title"># {currentChannel}</h2>
        <div class="channel-meta">
          <span class="member-count">4 members</span>
          <span class="channel-description">| General discussion and updates</span>
        </div>
      </div>
      <div class="header-actions">
        <button class="action-btn()">📞</button>
        <button class="action-btn()">🎥</button>
        <button class="action-btn()">ℹ️</button>
      </div>
    </div>
    
    <!-- Messages Container -->
    <div class="messages-container">
      <div class="messages-list">
        {#each messages as message}
          <div class="message()">
            <div class="message-avatar()">
              <img src="{message.avatar}" alt="{message.user}">
            </div>
            <div class="message-content()">
              <div class="message-header()">
                <span class="message-user()">{message.user}</span>
                <span class="message-time()">{message.time}</span>
              </div>
              <div class="message-text()">{message.content}</div>
              {#if message.reactions.length > 0}
                <div class="message-reactions">
                  {#each message.reactions as reaction}
                    <button class="reaction()">
                      <span>{reaction.emoji}</span>
                      <span>{reaction.count}</span>
                    </button>
                  {/each}
                  <button class="add-reaction()">+</button>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Message Input -->
    <div class="input-container()">
      <div class="message-input()">
        <div class="input-wrapper()">
          <input 
            type="text" 
            bind:value={message}
            placeholder="Message #{currentChannel}"
            on:keydown={(e) => e.key === 'Enter' && sendMessage()}
          >
          <div class="input-actions">
            <button class="input-action()">📎</button>
            <button class="input-action()">😀</button>
            <button class="input-action()">@</button>
            <button class="send-btn()" on:click={sendMessage}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M15.854 7.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708L14.293 8.5H.5a.5.5 0 0 1 0-1h13.793L8.146.354a.5.5 0 1 1 .708-.708l7 7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Right Sidebar (Thread/Details) -->
  <div class="right-sidebar">
    <div class="thread-header">
      <h3>Thread</h3>
      <button class="close-thread">✕</button>
    </div>
    <div class="thread-content">
      <div class="thread-message">
        <div class="thread-avatar">
          <img src="https://images.unsplash.com/photo-1494790108755-2616b612b647?w=32&h=32&fit=crop&crop=face" alt="Alice">
        </div>
        <div class="thread-text">
          <div class="thread-user">Alice Johnson</div>
          <div class="thread-msg">Hey everyone! Just finished the new login component...</div>
          <div class="thread-time">9:12 AM</div>
        </div>
      </div>
      <div class="thread-replies">
        <div class="thread-reply">
          <div class="reply-avatar">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face" alt="Bob">
          </div>
          <div class="reply-content">
            <span class="reply-user">Bob Smith</span>
            <span class="reply-text">Looks amazing! 🚀</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .chat-app {
    display: flex;
    height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #1a1d21;
    color: #d1d2d3;
  }
  
  /* Sidebar Styles */
  .sidebar {
    width: 260px;
    background: #19171d;
    border-right: 1px solid #2c2d30;
    display: flex;
    flex-direction: column;
  }
  
  .workspace-header {
    padding: 16px;
    border-bottom: 1px solid #2c2d30;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .workspace-name {
    font-weight: 700;
    font-size: 18px;
    color: #ffffff;
    margin-bottom: 2px;
  }
  
  .workspace-status {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #9ca3af;
  }
  
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    margin-right: 6px;
  }
  
  /* compose-btn now uses AdorableCSS component */
  
  .sidebar-nav {
    flex: 1;
    padding: 16px 12px;
    overflow-y: auto;
  }
  
  .nav-section {
    margin-bottom: 24px;
  }
  
  /* nav-item now uses AdorableCSS component */
  
  .nav-icon {
    margin-right: 12px;
    font-size: 16px;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    font-size: 15px;
    font-weight: 600;
    color: #d1d2d3;
    margin-bottom: 4px;
  }
  
  .dropdown-arrow {
    margin-right: 8px;
    font-size: 12px;
    color: #9ca3af;
  }
  
  .channels-list, .dm-list {
    margin-left: 20px;
  }
  
  /* channel-item now uses AdorableCSS component */
  
  .channel-hash {
    margin-right: 8px;
    color: #9ca3af;
    font-weight: 600;
  }
  
  .channel-name {
    flex: 1;
  }
  
  /* unread-badge now uses AdorableCSS component */
  
  /* dm-item now uses AdorableCSS component */
  
  .dm-avatar {
    position: relative;
    margin-right: 8px;
  }
  
  .dm-avatar img {
    width: 24px;
    height: 24px;
    border-radius: 4px;
  }
  
  /* dm-avatar status dots now use AdorableCSS status-dot component */
  
  /* Main Chat Styles */
  .main-chat {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .chat-header {
    padding: 12px 20px;
    border-bottom: 1px solid #2c2d30;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #1a1d21;
  }
  
  .channel-title {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
  }
  
  .channel-meta {
    margin-top: 2px;
    font-size: 13px;
    color: #9ca3af;
  }
  
  .member-count {
    color: #d1d2d3;
  }
  
  .header-actions {
    display: flex;
    gap: 8px;
  }
  
  /* action-btn now uses AdorableCSS component */
  
  .messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
  }
  
  /* message components now use AdorableCSS */
  
  .message-reactions {
    display: flex;
    gap: 4px;
    margin-top: 8px;
  }
  
  /* reaction components now use AdorableCSS */
  
  /* input components now use AdorableCSS */
  
  .input-wrapper input {
    flex: 1;
    border: none;
    background: transparent;
    color: #ffffff;
    font-size: 15px;
    outline: none;
  }
  
  .input-wrapper input::placeholder {
    color: #9ca3af;
  }
  
  .input-actions {
    display: flex;
    gap: 8px;
    margin-left: 12px;
  }
  
  /* Right Sidebar Styles */
  .right-sidebar {
    width: 320px;
    background: #1a1d21;
    border-left: 1px solid #2c2d30;
    display: flex;
    flex-direction: column;
  }
  
  .thread-header {
    padding: 16px 20px;
    border-bottom: 1px solid #2c2d30;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .thread-header h3 {
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
  }
  
  .close-thread {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: none;
    background: transparent;
    color: #9ca3af;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
  }
  
  .close-thread:hover {
    background: #2c2d30;
    color: #d1d2d3;
  }
  
  .thread-content {
    padding: 20px;
    flex: 1;
    overflow-y: auto;
  }
  
  .thread-message {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #2c2d30;
  }
  
  .thread-avatar img {
    width: 36px;
    height: 36px;
    border-radius: 8px;
  }
  
  .thread-user {
    font-weight: 700;
    color: #ffffff;
    font-size: 15px;
    margin-bottom: 4px;
  }
  
  .thread-msg {
    color: #d1d2d3;
    font-size: 15px;
    line-height: 1.4;
    margin-bottom: 4px;
  }
  
  .thread-time {
    font-size: 12px;
    color: #9ca3af;
  }
  
  .thread-reply {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }
  
  .reply-avatar img {
    width: 24px;
    height: 24px;
    border-radius: 4px;
  }
  
  .reply-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .reply-user {
    font-weight: 600;
    color: #ffffff;
    font-size: 13px;
  }
  
  .reply-text {
    color: #d1d2d3;
    font-size: 13px;
    line-height: 1.4;
  }
  
  /* Scrollbar Styles */
  .sidebar-nav::-webkit-scrollbar,
  .messages-container::-webkit-scrollbar,
  .thread-content::-webkit-scrollbar {
    width: 6px;
  }
  
  .sidebar-nav::-webkit-scrollbar-track,
  .messages-container::-webkit-scrollbar-track,
  .thread-content::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .sidebar-nav::-webkit-scrollbar-thumb,
  .messages-container::-webkit-scrollbar-thumb,
  .thread-content::-webkit-scrollbar-thumb {
    background: #2c2d30;
    border-radius: 3px;
  }
  
  .sidebar-nav::-webkit-scrollbar-thumb:hover,
  .messages-container::-webkit-scrollbar-thumb:hover,
  .thread-content::-webkit-scrollbar-thumb:hover {
    background: #3c3d40;
  }
  
  /* Responsive Design */
  @media (max-width: 1024px) {
    .right-sidebar {
      display: none;
    }
  }
  
  @media (max-width: 768px) {
    .sidebar {
      width: 240px;
    }
    
    .chat-header {
      padding: 12px 16px;
    }
    
    .messages-container {
      padding: 16px;
    }
    
    .message-input-container {
      padding: 16px;
    }
  }
  
  @media (max-width: 640px) {
    .sidebar {
      position: absolute;
      left: -260px;
      z-index: 10;
      transition: left 0.3s;
    }
    
    .sidebar.open {
      left: 0;
    }
    
    .main-chat {
      width: 100%;
    }
  }
</style>