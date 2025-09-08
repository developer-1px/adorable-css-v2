<script>
    import { onMount } from 'svelte';
    
    let mounted = false;
    
    onMount(() => {
        mounted = true;
    });
</script>

<svelte:head>
    <title>AdorableCSS - Design to Code, Magically</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Kalam:wght@300;400;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
</svelte:head>

<div class="vbox w(full) min-h(100vh) bg(cream) c(soft-black) relative overflow-x(hidden)">
    <!-- Doodle background pattern -->
    <div class="doodle-bg"></div>
    
    <!-- Floating doodles -->
    <div class="absolute top(10%) left(5%) text(2rem) c(warm-gray) opacity(50) pointer-events(none) rotate(-15) font(caveat)">✨</div>
    <div class="absolute top(20%) right(10%) text(1.5rem) c(warm-gray) opacity(50) pointer-events(none) rotate(20) font(caveat)">→</div>
    <div class="absolute bottom(30%) left(8%) text(2rem) c(warm-gray) opacity(50) pointer-events(none) rotate(-10) font(caveat)">&lbrace; &rbrace;</div>
    <div class="absolute bottom(20%) right(5%) text(3rem) c(warm-gray) opacity(50) pointer-events(none) rotate(15) font(caveat)">♥</div>

    <!-- Container -->
    <div class="vbox w(full) max-w(1200) mx(auto) p(32) relative z(1)">
        <!-- Header -->
        <header class="vbox items(center) py(64) relative">
            <h1 class="font(caveat) text(clamp(4rem,10vw,7rem)) font(700) tracking(-0.02em) mb(16) rotate(-2) hover:rotate(2) hover:scale(105) transition">
                Adorable<span class="relative inline-block after:content('') after:absolute after:bottom(-5) after:left(-5) after:right(-5) after:h(15) after:bg(accent-yellow) after:rotate(-1) after:z(-1) after:opacity(80)">CSS</span>
            </h1>
            <p class="font(kalam) text(1.8rem) font(300) c(warm-gray) mb(32) rotate(1)">
                where design meets code with a smile
            </p>
        </header>

        <!-- Hero Section -->
        <section class="vbox bg(white) border(2/solid/soft-black) r(20) p(48) mb(64) relative rotate(-0.5) shadow(8/8/0/soft-black) before:content('FIGMA_→_CODE') before:absolute before:top(-15) before:left(30) before:bg(accent-coral) before:c(white) before:font(space-mono) before:font(700) before:text(0.9rem) before:px(16) before:py(8) before:rotate(-3)">
            <div class="vbox text(1.3rem) leading(1.8) max-w(800) mx(auto) text(center) font(400)">
                <p class="mb(32)">
                    <strong>AdorableCSS</strong> is a <span class="relative inline-block before:content('') before:absolute before:top(50%) before:left(50%) before:w(120%) before:h(120%) before:border(3/solid/accent-coral) before:r(full) before:translate(-50%,-50%) before:rotate(-5) before:z(-1)">Figma-first</span> CSS framework 
                    that speaks your design language. No more translation between design and code—just pure, 
                    intuitive syntax that makes sense.
                </p>
                
                <div class="vbox font(space-mono) bg(soft-black) c(accent-yellow) p(32) r(10) my(32) text(1rem) overflow-x(auto) relative before:content('//_adorable.css') before:absolute before:top(10) before:left(20) before:c(warm-gray) before:text(0.85rem)">
                    <div class="my(8) pl(32)">hbox(pack) gap(16) p(24) r(lg) bg(white) shadow(soft)</div>
                    <div class="my(8) pl(32)">text(title/2xl) font(bold) c(charcoal)</div>
                    <div class="my(8) pl(32)">w(fill) h(hug) hover:scale(1.05) transition</div>
                </div>

                <p class="mt(32) italic">
                    It's like Figma auto-layout, but in code. Magic? Pretty much.
                </p>
            </div>
        </section>

        <!-- Features Grid -->
        <section class="grid grid-cols(1) md:grid-cols(3) gap(48) my(64)">
            <!-- Feature 1 -->
            <div class="vbox bg(white) border(2/solid/soft-black) p(32) relative transition hover:translate-y(-5) hover:shadow(10/10/0/accent-blue) rotate(1) r(30/15/30/15)">
                <span class="absolute top(-20) left(20) font(caveat) text(3rem) font(700) c(accent-coral)">01</span>
                <h3 class="font(kalam) text(2rem) font(700) mb(16) mt(16)">Figma Native</h3>
                <p class="text(1.1rem) leading(1.6) c(charcoal)">
                    Use the same mental model as Figma. <code class="font(space-mono) text(0.9em) bg(light-gray) px(4) r(4)">hbox()</code>, <code class="font(space-mono) text(0.9em) bg(light-gray) px(4) r(4)">vbox()</code>, 
                    <code class="font(space-mono) text(0.9em) bg(light-gray) px(4) r(4)">w(fill)</code>—it all just works exactly as you'd expect.
                </p>
            </div>

            <!-- Feature 2 -->
            <div class="vbox bg(white) border(2/solid/soft-black) p(32) relative transition hover:translate-y(-5) hover:shadow(10/10/0/accent-blue) rotate(-1) r(15/30/15/30)">
                <span class="absolute top(-20) left(20) font(caveat) text(3rem) font(700) c(accent-coral)">02</span>
                <h3 class="font(kalam) text(2rem) font(700) mb(16) mt(16)">Token Everything</h3>
                <p class="text(1.1rem) leading(1.6) c(charcoal)">
                    15 design token categories cover every design decision. 
                    Consistency isn't just easy—it's automatic.
                </p>
            </div>

            <!-- Feature 3 -->
            <div class="vbox bg(white) border(2/solid/soft-black) p(32) relative transition hover:translate-y(-5) hover:shadow(10/10/0/accent-blue) rotate(0.5) r(20)">
                <span class="absolute top(-20) left(20) font(caveat) text(3rem) font(700) c(accent-coral)">03</span>
                <h3 class="font(kalam) text(2rem) font(700) mb(16) mt(16)">Zero Runtime</h3>
                <p class="text(1.1rem) leading(1.6) c(charcoal)">
                    Compiles to pure CSS at build time. No JavaScript, 
                    no runtime overhead. Just clean, fast styles.
                </p>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="vbox items(center) my(96) relative">
            <span class="absolute top(-40) left(50%) translate-x(-50%) font(caveat) text(1.5rem) c(warm-gray) rotate(-10)">
                ready to try?
            </span>
            <a href="#" class="inline-block font(space-mono) font(700) text(1.4rem) c(soft-black) bg(accent-yellow) px(48) py(24) no-underline border(3/solid/soft-black) r(50) relative transition rotate(-1) hover:rotate(1) hover:translate-y(-3) hover:shadow(5/5/0/soft-black)">
                Get Started →
            </a>
        </section>
    </div>
</div>

<style lang="postcss">
    /* Doodle background pattern */
    :global(.doodle-bg) {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        opacity: 0.03;
        background-image: 
            radial-gradient(circle at 20% 30%, #1A1A1A 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, #1A1A1A 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, #1A1A1A 1px, transparent 1px);
        background-size: 50px 50px, 30px 30px, 40px 40px;
    }

    /* Custom colors that aren't in the default palette */
    :global(:root) {
        --cream: #FFFEF9;
        --soft-black: #1A1A1A;
        --charcoal: #2D2D2D;
        --warm-gray: #6B6B6B;
        --light-gray: #E8E8E8;
        --accent-coral: #FF6B6B;
        --accent-blue: #4ECDC4;
        --accent-yellow: #FFE66D;
        --accent-purple: #9B59B6;
    }

    /* Font families */
    :global(.font\(caveat\)) {
        font-family: 'Caveat', cursive;
    }
    
    :global(.font\(kalam\)) {
        font-family: 'Kalam', cursive;
    }
    
    :global(.font\(space-mono\)) {
        font-family: 'Space Mono', monospace;
    }
    
    :global(.font\(inter\)) {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    /* Custom utility classes for complex styles */
    :global(.rotate\(-0\.5\)) {
        transform: rotate(-0.5deg);
    }
    
    :global(.rotate\(0\.5\)) {
        transform: rotate(0.5deg);
    }
    
    :global(.rotate\(-15\)) {
        transform: rotate(-15deg);
    }
    
    :global(.rotate\(20\)) {
        transform: rotate(20deg);
    }
    
    :global(.rotate\(-10\)) {
        transform: rotate(-10deg);
    }
    
    :global(.rotate\(15\)) {
        transform: rotate(15deg);
    }
    
    :global(.rotate\(-2\)) {
        transform: rotate(-2deg);
    }
    
    :global(.rotate\(1\)) {
        transform: rotate(1deg);
    }
    
    :global(.rotate\(-1\)) {
        transform: rotate(-1deg);
    }
    
    :global(.rotate\(-3\)) {
        transform: rotate(-3deg);
    }

    /* Typography utilities */
    :global(.italic) {
        font-style: italic;
    }
    
    :global(strong) {
        font-weight: 700;
    }
    
    :global(em) {
        font-style: italic;
    }
    
    :global(code) {
        font-family: 'Space Mono', monospace;
        font-size: 0.9em;
        background: var(--light-gray);
        padding: 0.25rem;
        border-radius: 0.25rem;
    }

    /* Hover states */
    :global(.hover\:rotate\(2\)):hover {
        transform: rotate(2deg);
    }
    
    :global(.hover\:scale\(105\)):hover {
        transform: scale(1.05);
    }
    
    :global(.hover\:translate-y\(-5\)):hover {
        transform: translateY(-5px);
    }
    
    :global(.hover\:shadow\(10\/10\/0\/accent-blue\)):hover {
        box-shadow: 10px 10px 0 var(--accent-blue);
    }
    
    :global(.hover\:rotate\(1\)):hover {
        transform: rotate(1deg);
    }
    
    :global(.hover\:translate-y\(-3\)):hover {
        transform: translateY(-3px);
    }
    
    :global(.hover\:shadow\(5\/5\/0\/soft-black\)):hover {
        box-shadow: 5px 5px 0 var(--soft-black);
    }

    /* Transition utilities */
    :global(.transition) {
        transition: all 0.3s ease;
    }

    /* Special border-radius */
    :global(.r\(30\/15\/30\/15\)) {
        border-radius: 30px 15px 30px 15px;
    }
    
    :global(.r\(15\/30\/15\/30\)) {
        border-radius: 15px 30px 15px 30px;
    }

    /* Translate utilities */
    :global(.translate-x\(-50\%\)) {
        transform: translateX(-50%);
    }
    
    :global(.translate\(-50\%\,-50\%\)) {
        transform: translate(-50%, -50%);
    }

    /* Fix for responsive grid */
    @media (max-width: 768px) {
        :global(.md\:grid-cols\(3\)) {
            grid-template-columns: 1fr;
        }
        
        :global(.font\(caveat\)) {
            font-size: 3rem;
        }
    }
</style>