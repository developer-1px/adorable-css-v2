<script lang="ts">
  import { onMount } from 'svelte';
  import { 
    Plus, Send, User, Settings, HelpCircle, MessageSquare, 
    Edit3, Trash2, Copy, ThumbsUp, ThumbsDown, RotateCcw,
    Search, Menu, X, Paperclip, Mic, Square, MoreHorizontal
  } from 'lucide-svelte';
  
  let mounted = false;
  let currentMessage = '';
  let sidebarOpen = true;
  let selectedConversation = 1;
  
  // Mock conversations data
  const conversations = [
    {
      id: 1,
      title: "AdorableCSS 프로젝트 질문",
      preview: "AdorableCSS에서 hbox(fill)을 어떻게 사용하나요?",
      timestamp: "방금 전",
      active: true
    },
    {
      id: 2,
      title: "React 컴포넌트 최적화",
      preview: "useState와 useEffect를 어떻게 최적화할 수 있을까요?",
      timestamp: "2시간 전",
      active: false
    },
    {
      id: 3,
      title: "TypeScript 타입 정의",
      preview: "복잡한 타입을 어떻게 정의하는지 알려주세요",
      timestamp: "어제",
      active: false
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox",
      preview: "언제 Grid를 쓰고 언제 Flexbox를 써야 하나요?",
      timestamp: "2일 전",
      active: false
    },
    {
      id: 5,
      title: "JavaScript 비동기 처리",
      preview: "async/await와 Promise의 차이점은?",
      timestamp: "3일 전",
      active: false
    }
  ];

  // Mock messages for current conversation
  const messages = [
    {
      type: 'user',
      content: "안녕하세요! AdorableCSS에서 hbox(fill)을 어떻게 사용하나요?",
      timestamp: "오후 2:30"
    },
    {
      type: 'assistant',
      content: `안녕하세요! AdorableCSS에서 \`hbox(fill)\`은 flexbox 컨테이너의 자식 요소들이 사용 가능한 공간을 균등하게 분배하도록 하는 유틸리티입니다.

기본적으로 \`hbox\`는 가운데 정렬이 기본값이지만, \`hbox(fill)\`을 사용하면:

1. **공간 분배**: 자식 요소들이 컨테이너의 전체 너비를 균등하게 차지합니다
2. **레이아웃 제어**: 특히 툴바나 네비게이션에서 유용합니다
3. **반응형 디자인**: 화면 크기에 따라 자동으로 조정됩니다

예시:
\`\`\`html
<!-- 기본 hbox (가운데 정렬) -->
<div class="hbox gap(md)">
  <button>버튼1</button>
  <button>버튼2</button>
</div>

<!-- hbox(fill) - 공간을 균등 분배 -->
<div class="hbox(fill) gap(md)">
  <button>버튼1</button>
  <button>버튼2</button>
</div>
\`\`\`

특히 복잡한 인터페이스에서 패널들을 균등하게 배치할 때 매우 유용합니다!`,
      timestamp: "오후 2:31"
    },
    {
      type: 'user',
      content: "그럼 언제 hbox를 쓰고 언제 hbox(fill)을 써야 하나요?",
      timestamp: "오후 2:32"
    },
    {
      type: 'assistant',
      content: `좋은 질문이네요! 사용 시나리오에 따라 구분하면:

## hbox 사용 시기:
- **컨텐츠 중심**: 버튼 그룹, 아이콘 + 텍스트 조합
- **자연스러운 크기**: 각 요소가 내용에 따라 크기 결정
- **가운데 정렬**: 요소들을 컨테이너 중앙에 배치

## hbox(fill) 사용 시기:
- **레이아웃 분할**: 사이드바 + 메인 콘텐츠
- **균등 분배**: 탭, 툴바, 네비게이션 메뉴
- **공간 활용**: 전체 너비를 효율적으로 사용

실제 예시로 지금 이 Claude 인터페이스도:
\`\`\`html
<div class="hbox(fill)">
  <aside class="w(280)">사이드바</aside>
  <main class="flex(1)">메인 채팅</main>
</div>
\`\`\`

이런 식으로 \`hbox(fill)\`을 사용해서 사이드바와 메인 영역이 전체 화면을 채우도록 만들어져 있어요!`,
      timestamp: "오후 2:33"
    }
  ];

  function selectConversation(id: number) {
    selectedConversation = id;
  }

  function sendMessage() {
    if (currentMessage.trim()) {
      // 여기서 실제로는 메시지를 전송하겠지만, 데모용이므로 생략
      console.log('메시지 전송:', currentMessage);
      currentMessage = '';
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>Claude AI - Showroom 5</title>
  <meta name="description" content="Claude AI interface mockup" />
</svelte:head>

<div class="min-h(screen) bg(white) hbox(fill)">
  
  <!-- Sidebar -->
  <aside class="w(280) bg(gray-50) border-r(1/gray-200) vbox {sidebarOpen ? 'block' : 'hidden'} md:block">
    <!-- Sidebar Header -->
    <div class="p(lg) bb(1/gray-200)">
      <button class="w(full) hbox(start/middle) gap(sm) p(md) r(lg) bg(white) border(1/gray-200) hover:bg(gray-50) transition">
        <Plus size="16" class="c(gray-600)" />
        <span class="font(sm) c(gray-700)">새 대화</span>
      </button>
    </div>

    <!-- Search -->
    <div class="p(lg) pb(0)">
      <div class="relative">
        <Search size="16" class="absolute left(sm) top(50%) translate-y(-50%) c(gray-400)" />
        <input 
          type="text" 
          placeholder="대화 검색..."
          class="w(full) pl(2xl) pr(md) py(sm) bg(white) border(1/gray-200) r(lg) font(sm) placeholder:c(gray-400) focus:border(blue-500) focus:ring(2/blue-500/0.2)"
        />
      </div>
    </div>
    
    <!-- Conversations List -->
    <div class="flex(1) scroll(y) p(lg) pt(md)">
      <div class="vbox gap(xs)">
        {#each conversations as conversation}
          <button 
            class="w(full) p(md) r(lg) text(left) hover:bg(white transition {selectedConversation === conversation.id ? 'bg(white) border(1/gray-200)' : 'hover:bg(white)'}"
            on:click={() => selectConversation(conversation.id)}
          >
            <div class="vbox gap(xs)">
              <h3 class="font(sm) font(medium) c(gray-900) truncate">{conversation.title}</h3>
              <p class="font(xs) c(gray-500) truncate leading(relaxed)">{conversation.preview}</p>
              <span class="font(2xs) c(gray-400)">{conversation.timestamp}</span>
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Sidebar Footer -->
    <div class="p(lg) bt(1/gray-200)">
      <div class="vbox gap(sm)">
        <button class="hbox(start/middle) gap(sm) w(full) p(sm) r(md) hover:bg(white transition">
          <User size="16" class="c(gray-600)" />
          <span class="font(sm) c(gray-700)">계정 설정</span>
        </button>
        <button class="hbox(start/middle) gap(sm) w(full) p(sm) r(md) hover:bg(white transition">
          <Settings size="16" class="c(gray-600)" />
          <span class="font(sm) c(gray-700)">설정</span>
        </button>
        <button class="hbox(start/middle) gap(sm) w(full) p(sm) r(md) hover:bg(white transition">
          <HelpCircle size="16" class="c(gray-600)" />
          <span class="font(sm) c(gray-700)">도움말</span>
        </button>
      </div>
    </div>
  </aside>

  <!-- Main Chat Area -->
  <main class="flex(1) vbox">
    
    <!-- Chat Header -->
    <header class="p(lg) bb(1/gray-200) hbox(fill/middle)">
      <div class="hbox(start/middle) gap(md)">
        <button 
          class="p(sm) r(md) hover:bg(gray-100) transition md:hidden"
          on:click={() => sidebarOpen = !sidebarOpen}
        >
          <Menu size="20" class="c(gray-600)" />
        </button>
        <div class="vbox gap(xs)">
          <h1 class="font(lg) font(medium) c(gray-900)">Claude</h1>
          <p class="font(sm) c(gray-500)">AI 어시스턴트와 대화중</p>
        </div>
      </div>
      
      <div class="hbox gap(sm)">
        <button class="p(sm) r(md) hover:bg(gray-100) transition" title="대화 초기화">
          <RotateCcw size="16" class="c(gray-600)" />
        </button>
        <button class="p(sm) r(md) hover:bg(gray-100) transition" title="더보기">
          <MoreHorizontal size="16" class="c(gray-600)" />
        </button>
      </div>
    </header>

    <!-- Messages Area -->
    <div class="flex(1) scroll(y) p(lg)">
      <div class="max-w(4xl) mx(auto) vbox gap(xl)">
        {#each messages as message}
          <div class="vbox gap(sm)">
            {#if message.type === 'user'}
              <!-- User Message -->
              <div class="hbox(end) gap(md)">
                <div class="max-w(70%) vbox gap(xs)">
                  <div class="bg(blue-600) c(white) p(lg) r(xl) r-br(sm)">
                    <p class="font(sm) leading(relaxed) whitespace(pre-wrap)">{message.content}</p>
                  </div>
                  <span class="font(xs) c(gray-400) text(right)">{message.timestamp}</span>
                </div>
                <div class="size(32) bg(blue-100) r(full) hbox(center/middle) flex-shrink(0)">
                  <User size="16" class="c(blue-600)" />
                </div>
              </div>
            {:else}
              <!-- Assistant Message -->
              <div class="hbox(start) gap(md)">
                <div class="size(32) bg(gray-100) r(full) hbox(center/middle) flex-shrink(0)">
                  <MessageSquare size="16" class="c(gray-600)" />
                </div>
                <div class="max-w(70%) vbox gap(xs)">
                  <div class="bg(gray-50) border(1/gray-200) p(lg) r(xl) r-bl(sm)">
                    <div class="font(sm) leading(relaxed) whitespace(pre-wrap) c(gray-800)">{@html message.content.replace(/`([^`]+)`/g, '<code class="bg(gray-200) px(xs) py(2xs) r(xs) font(mono) font(xs)">$1</code>').replace(/```([^```]+)```/g, '<pre class="bg(gray-800) c(white) p(md) r(md) font(mono) font(xs) overflow(auto) my(sm)">$1</pre>')}</div>
                  </div>
                  <div class="hbox(between/middle)">
                    <span class="font(xs) c(gray-400)">{message.timestamp}</span>
                    <div class="hbox gap(xs)">
                      <button class="p(xs) r(sm) hover:bg(gray-100) transition" title="좋아요">
                        <ThumbsUp size="12" class="c(gray-400)" />
                      </button>
                      <button class="p(xs) r(sm) hover:bg(gray-100) transition" title="싫어요">
                        <ThumbsDown size="12" class="c(gray-400)" />
                      </button>
                      <button class="p(xs) r(sm) hover:bg(gray-100) transition" title="복사">
                        <Copy size="12" class="c(gray-400)" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Message Input -->
    <div class="p(lg) bt(1/gray-200)">
      <div class="max-w(4xl) mx(auto)">
        <div class="relative">
          <textarea 
            bind:value={currentMessage}
            on:keydown={handleKeydown}
            placeholder="Claude에게 메시지를 보내세요..."
            class="w(full) min-h(60) max-h(200) p(md) pr(5xl) bg(white) border(1/gray-300) r(xl) font(sm) resize(none) focus:border(blue-500) focus:ring(2/blue-500/0.2) placeholder:c(gray-400)"
            rows="1"
          ></textarea>
          
          <!-- Input Actions -->
          <div class="absolute right(md) bottom(md) hbox gap(xs)">
            <button class="p(sm) r(md) hover:bg(gray-100) transition" title="파일 첨부">
              <Paperclip size="16" class="c(gray-400)" />
            </button>
            <button class="p(sm) r(md) hover:bg(gray-100) transition" title="음성 입력">
              <Mic size="16" class="c(gray-400)" />
            </button>
            <button 
              on:click={sendMessage}
              disabled={!currentMessage.trim()}
              class="p(sm) r(md) bg(blue-600) hover:bg(blue-700) transition disabled:opacity(50) disabled:cursor(not-allowed)"
              title="전송 (Enter)"
            >
              <Send size="16" class="c(white)" />
            </button>
          </div>
        </div>
        
        <!-- Input Helper Text -->
        <p class="font(xs) c(gray-400) text(center) mt(sm)">
          Claude는 실수할 수 있습니다. 중요한 정보는 확인해 주세요.
        </p>
      </div>
    </div>
  </main>
</div>