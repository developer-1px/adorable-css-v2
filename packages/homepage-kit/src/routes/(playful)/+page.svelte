<script lang="ts">
  import { Code, Layout, Palette, Zap, Github, ArrowRight, Play } from 'lucide-svelte';
  
  let currentTab = 'before';
  
  let beforeCode = `<!-- Traditional CSS Framework -->
<div class="flex items-center justify-center gap-4 p-6 bg-white rounded-lg shadow-sm">
  <div class="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg">
    <i class="ph-heart"></i>
  </div>
  <div class="flex flex-col gap-1">
    <h3 class="text-lg font-semibold">Component</h3>
    <p class="text-sm text-gray-600">Description</p>
  </div>
</div>`;

  let afterCode = `<!-- AdorableCSS -->
<div class="card() hbox(center) gap(md)">
  <div class="icon-box(48) bg(primary.1) c(primary)">
    <i class="ph-heart"></i>
  </div>
  <div class="vbox gap(xs)">
    <h3 class="heading(h3)">Component</h3>
    <p class="body() c(muted)">Description</p>
  </div>
</div>`;
</script>

<svelte:head>
  <title>AdorableCSS - Figma-first CSS Framework</title>
  <meta name="description" content="CSS 프레임워크의 새로운 패러다임. Figma Auto Layout을 CSS로 직접 번역하는 혁신적인 접근법으로 디자인과 개발 사이의 격차를 줄입니다." />
</svelte:head>

<!-- Hero Section -->
<section class="hero(gradient)">
  <div class="hero-content">
    <!-- Alpha Badge -->
    <div class="badge(info) mb(lg)">
      🚀 v2.0 Beta Available Now
    </div>

    <!-- Main Title -->
    <h1 class="display(hero) mb(lg)">
      CSS that speaks
      <span class="c(gradient-purple)">Figma</span>
    </h1>

    <!-- Subtitle -->
    <p class="lead() mb(3xl)">
      AdorableCSS는 Figma의 Auto Layout을 CSS로 직접 번역합니다. 
      디자인 시스템이 내장되어 있어 별도 설정 없이 바로 사용할 수 있습니다.
    </p>

    <!-- CTA Buttons -->
    <div class="hbox(center) gap(lg) mb(3xl)">
      <a href="/docs/getting-started" class="btn(primary/lg)">
        <span>시작하기</span>
        <ArrowRight size="20" />
      </a>
      <a href="/playground" class="btn(outline/lg)">
        <Play size="20" />
        <span>플레이그라운드</span>
      </a>
    </div>

    <!-- Code Preview -->
    <div class="card(elevated) max-w(4xl) mx(auto)">
      <!-- Tab Headers -->
      <div class="hbox bg(muted/50) border-b">
        <button 
          class="tab-trigger {currentTab === 'before' ? 'active' : ''}"
          on:click={() => currentTab = 'before'}
        >
          기존 방식
        </button>
        <button 
          class="tab-trigger {currentTab === 'after' ? 'active' : ''}"
          on:click={() => currentTab = 'after'}
        >
          AdorableCSS
        </button>
      </div>
      
      <!-- Code Content -->
      <div class="code-block()">
        {#if currentTab === 'before'}
          <pre><code>{beforeCode}</code></pre>
        {:else}
          <pre><code>{afterCode}</code></pre>
        {/if}
      </div>
    </div>
  </div>
</section>

<!-- Problem Statement -->
<section class="section(wide) py(6xl)">
  <div class="content(centered)">
    <h2 class="heading(h1) mb(xl)">
      기존 CSS 프레임워크의 한계
    </h2>
    <p class="lead() mb(3xl)">
      기존 프레임워크들은 블랙박스처럼 작동하며, 디자인 시스템과의 불일치로 인해 
      개발자와 디자이너 사이에 소통 비용이 발생합니다.
    </p>
    
    <div class="grid(3fr) gap(xl)">
      <div class="card(elevated) p(xl) text(center) bg(error.subtle)">
        <div class="icon-box(64) bg(error.1) c(error) mx(auto) mb(lg)">
          <span class="text(2xl)">🚫</span>
        </div>
        <h3 class="heading(h3) mb(md) c(error.strong)">블랙박스 문제</h3>
        <p class="body(sm) c(error)">클래스 이름만으로는 실제 CSS가 어떻게 생성되는지 알 수 없음</p>
      </div>
      
      <div class="card(elevated) p(xl) text(center) bg(warning.subtle)">
        <div class="icon-box(64) bg(warning.1) c(warning) mx(auto) mb(lg)">
          <span class="text(2xl)">⚠️</span>
        </div>
        <h3 class="heading(h3) mb(md) c(warning.strong)">디자인 시스템 불일치</h3>
        <p class="body(sm) c(warning)">Figma 디자인과 실제 구현 사이의 괴리로 인한 소통 비용</p>
      </div>
      
      <div class="card(elevated) p(xl) text(center) bg(info.subtle)">
        <div class="icon-box(64) bg(info.1) c(info) mx(auto) mb(lg)">
          <span class="text(2xl)">📚</span>
        </div>
        <h3 class="heading(h3) mb(md) c(info.strong)">높은 학습 곡선</h3>
        <p class="body(sm) c(info)">프레임워크만의 독특한 클래스명과 규칙을 별도로 학습해야 함</p>
      </div>
    </div>
  </div>
</section>

<!-- Solution Showcase -->
<section class="section(wide) py(6xl) bg(gradient-subtle)">
  <div class="content(centered)">
    <h2 class="heading(h1) mb(xl)">
      AdorableCSS만의 차별점
    </h2>
    <p class="lead() mb(3xl)">
      CSS 네이티브 문법과 Figma 개념을 그대로 사용하여 직관적이고 예측 가능한 개발 경험을 제공합니다.
    </p>

    <div class="grid(4fr) gap(xl)">
      <div class="card(feature) text(center)">
        <div class="icon-box(64) bg(blue.1) c(blue) mx(auto) mb(lg)">
          <Code size="24" />
        </div>
        <h3 class="heading(h3) mb(md)">CSS Native</h3>
        <p class="body(sm) c(muted)">scale(1.05), opacity(0.5) 등 CSS 표준 문법을 그대로 사용하여 학습 비용 없음</p>
      </div>
      
      <div class="card(feature) text(center)">
        <div class="icon-box(64) bg(green.1) c(green) mx(auto) mb(lg)">
          <Layout size="24" />
        </div>
        <h3 class="heading(h3) mb(md)">Figma-First</h3>
        <p class="body(sm) c(muted)">hbox(), vbox(), w(fill) 등 Figma Auto Layout과 1:1 매핑으로 디자인 의도 그대로 구현</p>
      </div>
      
      <div class="card(feature) text(center)">
        <div class="icon-box(64) bg(purple.1) c(purple) mx(auto) mb(lg)">
          <Palette size="24" />
        </div>
        <h3 class="heading(h3) mb(md)">Built-in Design System</h3>
        <p class="body(sm) c(muted)">색상, 타이포그래피, 간격 등 디자인 시스템이 내장되어 있어 일관된 UI 자동 보장</p>
      </div>
      
      <div class="card(feature) text(center)">
        <div class="icon-box(64) bg(orange.1) c(orange) mx(auto) mb(lg)">
          <Zap size="24" />
        </div>
        <h3 class="heading(h3) mb(md)">Zero Runtime</h3>
        <p class="body(sm) c(muted)">빌드 타임에 CSS를 생성하여 런타임 오버헤드 없이 최적의 성능 제공</p>
      </div>
    </div>
  </div>
</section>

<!-- Quick Start -->
<section class="section(wide) py(6xl)">
  <div class="content(centered)">
    <h2 class="heading(h1) mb(xl)">
      3분만에 시작하기
    </h2>
    <p class="lead() mb(3xl)">
      복잡한 설정 없이 바로 사용할 수 있습니다
    </p>

    <div class="grid(2fr) gap(3xl) items(center)">
      <!-- Installation Steps -->
      <div class="stack(xl)">
        <div>
          <h3 class="heading(h3) mb(md)">1. 설치</h3>
          <div class="card() p(lg) bg(inverse) c(inverse)">
            <div class="code-block()">
              <div><span class="c(success)">$</span> npm install adorable-css</div>
              <div class="c(muted)"># 또는 CDN으로 바로 사용</div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="heading(h3) mb(md)">2. HTML에 추가</h3>
          <div class="card() p(lg)">
            <div class="code-block()">
              &lt;script src="https://cdn.adorable-css.com/v2">&lt;/script>
            </div>
          </div>
        </div>

        <div>
          <h3 class="heading(h3) mb(md)">3. 바로 사용</h3>
          <div class="card() p(lg)">
            <div class="code-block()">
              {afterCode}
            </div>
          </div>
        </div>
      </div>

      <!-- Live Preview -->
      <div class="stack(lg)">
        <h3 class="heading(h3)">미리보기</h3>
        <div class="card(elevated) p(2xl) bg(gradient-subtle)">
          <!-- Generated Component -->
          <div class="card() hbox(center) gap(md)">
            <div class="icon-box(48) bg(purple.1) c(purple)">
              <span class="text(xl)">💜</span>
            </div>
            <div class="vbox gap(xs)">
              <h3 class="heading(h3)">AdorableCSS</h3>
              <p class="body() c(muted)">Figma-first CSS framework</p>
            </div>
          </div>
        </div>
        <p class="caption() text(center)">
          위 코드로 생성된 실제 컴포넌트
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Call to Action -->
<section class="section(wide) py(6xl) bg(inverse) c(inverse)">
  <div class="content(centered)">
    <h2 class="heading(h1) mb(xl)">
      지금 시작해보세요
    </h2>
    <p class="lead() mb(3xl) c(inverse.muted)">
      복잡한 설정 없이 바로 사용할 수 있습니다. 
      문서를 읽어보거나 플레이그라운드에서 직접 체험해보세요.
    </p>
    
    <div class="hbox(center) gap(lg)">
      <a href="/docs/getting-started" class="btn(secondary/lg)">
        <span>문서 읽기</span>
        <ArrowRight size="20" />
      </a>
      <a href="/playground" class="btn(outline/lg)">
        <Play size="20" />
        <span>플레이그라운드</span>
      </a>
      <a href="https://github.com/developer-1px/adorable-css-v2" class="btn(outline/lg)">
        <Github size="20" />
        <span>GitHub</span>
      </a>
    </div>
  </div>
</section>