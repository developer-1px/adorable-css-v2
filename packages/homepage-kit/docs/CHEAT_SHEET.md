# 🎯 AdorableCSS Cheat Sheet

> 한 장으로 보는 핵심 문법 (인쇄 가능)

## 📦 Layout

### Flexbox
```css
hbox()              /* display: flex + align-items: center */
hbox(pack)          /* + justify-content: center */
hbox(top+left)      /* align top + justify left */
vbox()              /* flex-direction: column */
vbox(pack)          /* center all */
gap(md)             /* gap: 1rem */
gap(auto)           /* justify-content: space-between */
```

### Container & Sizing
```css
container(xl)       /* max-width: 1280px + auto margins */
w(100)             /* width: 100px */
w(fill)            /* width: 100% */
w(hug)             /* width: fit-content */
h(screen)          /* height: 100vh */
size(48)           /* width & height: 48px */
size(16:9)         /* aspect-ratio: 16/9 */
```

### Position
```css
layer(center)      /* absolute + centered */
layer(fill)        /* absolute + inset: 0 */
layer(top:20)      /* absolute + top: 20px */
relative, absolute, fixed, sticky
```

## 🎨 Visual

### Colors
```css
c(blue-500)        /* color */
c(blue-500.5)      /* 50% opacity */
bg(white)          /* background */
bg(to-r/red..blue) /* gradient */
bc(gray-200)       /* border color */
```

### Typography
```css
/* Semantic */
heading(lg)        /* h1-h3 styles */
body(md)          /* body text */
label(sm)         /* form labels */
caption(xs)       /* small text */

/* Utilities */
font(lg)          /* font-size */
bold(), bold(600) /* font-weight */
italic            /* font-style */
text(center)      /* text-align */
uppercase         /* text-transform */
```

### Effects
```css
shadow(md)        /* box-shadow */
r(lg)            /* border-radius */
r(full)          /* 9999px */
blur(4)          /* filter: blur(4px) */
opacity(50)      /* opacity: 0.5 */
```

## 🔧 Spacing

### Padding & Margin
```css
p(lg)            /* padding: 1.5rem */
px(md)           /* padding L&R */
py(sm)           /* padding T&B */
pt(xl)           /* padding-top */

m(auto)          /* margin: auto */
mx(auto)         /* center horizontally */
mt(-20)          /* negative margin */
```

### Tokens
```
xs: 0.25rem  sm: 0.5rem   md: 1rem
lg: 1.5rem   xl: 2rem     2xl: 3rem
```

## 🎭 States

### Pseudo Classes
```css
hover:bg(blue-500)
focus:ring(2/blue-500)
active:scale(95)
disabled:opacity(50)
checked:bg(green-500)
```

### Group & Peer
```css
group → group-hover:visible
peer → peer-checked:bg(blue)
```

## 📱 Responsive

### Breakpoints
```css
sm:  640px    md: 768px     lg: 1024px
xl: 1280px    2xl: 1536px
```

### Usage
```css
hidden md:block        /* hide mobile, show desktop */
grid(1) md:grid(2)     /* responsive grid */
p(md) lg:p(xl)        /* responsive spacing */
```

### Range Queries
```css
..md:hidden           /* up to 768px */
md..lg:block          /* 768px to 1024px */
```

## ⚡ Special

### Transforms
```css
scale(110)           /* transform: scale(1.1) */
rotate(45)           /* rotate 45deg */
translate-x(10)      /* translateX */
```

### Animations
```css
transition           /* all 150ms */
transition(300)      /* custom duration */
duration(500)        /* transition time */
ease-in-out         /* timing function */
```

### Components
```css
card                /* pre-styled card */
btn                 /* button styles */
heading             /* heading component */
hero                /* hero section */
prose               /* long-form text */
```

### Advanced
```css
glass(20)           /* glassmorphism */
w(100%-20)          /* calc() */
c(--custom-var)     /* CSS variables */
!                   /* !important */
```

## 🔍 Quick Reference

| Need to... | Use this |
|------------|----------|
| Center everything | `hbox(pack)` or `vbox(pack)` |
| Make responsive | `sm:` `md:` `lg:` prefixes |
| Add spacing | `gap()` for flex, `p()` `m()` for box |
| Style text | `heading()` `body()` `label()` |
| Add interactivity | `hover:` `focus:` `active:` |
| Position absolutely | `layer()` utilities |
| Create gradient | `bg(angle/color1..color2)` |
| Make it pretty | `shadow()` `r()` `glass()` |

---

📄 **Print Tip**: 가로 모드로 인쇄하면 한 장에 모두 들어갑니다!  
🔗 **온라인 버전**: [adorable-css.com/cheatsheet](/cheatsheet)