# AdorableCSS v2

> "세상에서 가장 Figma스러운 CSS 프레임워크"
> A Figma-first CSS framework for seamless design-code synchronization

## What's New in AdorableCSS 2.0

**Figma-First Approach**
- Direct mapping with Figma Auto Layout
- Designer-friendly syntax
- Real-time sync capabilities

## Core Concept

기존에는 CSS의 사고관을 중심으로 Utiliy class방식과 JIT를 중점으로 만들었지만 이제는 tailwindCSS가 대세가 되었습니다. 단순히 문법이 더 좋다는 이유만으로는 채택을 해야할 이유가 부족합니다.

**AdorableCSS v2는 이에 대한 차별화와 브랜딩을 css가 아니라 Figma에 두려고 합니다.**
이제 Figma는 디자인을 하기 위한 표준도구로 자리잡았으며 Figma가 정립한 레이아웃과 컴포넌트들을 CSS보다 덜 복잡하지만 충분한 역할을 하고 있습니다.

Figma가 디자인한 내용을 가져오고 또 개발자가 작업한 내용을 Figma에 반영하기 위해서는 figma - tailwindCSS에서는 2개의 언어를 서로 다른 언어를 각기 배워야 합니다.

온전히 Figma의 방식을 그대로 맞추어 디자이너가 작업한 그대로, 개발자가 구현한 그대로 동기화 될 수 있도록 만들고자 기존의 좋은 문법은 계승하고 CSS에 맞춰진 체계없던 문법을 정돈하려고 합니다.

---

몇가지 제약사항과 원칙에 대해서 전달드리겠습니다.

figma to code를 염두해두고 만든 만큼 2번째 인자는 className으로 활용하며 tailwindCSS와 같이 atomic CSS로 풀어가려고 합니다. 그래서 속성표현시 띄어쓰기는 안된다는 점 참고바랍니다.

이렇게 만든 이유는 컴파일 단계를 생략하도록 하고, 코드의 결과와 HTML의 렌더링의 최대한의 유사성을 확보해서 브라우저에서 디버깅을 할때에도 같은 결과물을 보기 위함입니다.

---

### With UnoCSS

그동안 AdorableCSS가 막혔던 부분은 다앙한 생태계에서 활용하기가 어렵다는 점이었습니다. 핵심 컨셉은 사용하기 편리한 문법과 체계에 있기에 다양한 프레임워크에서 활용할 수 있도록 하고자 Custom Atomic CSS를 만들수 있는 UnoCSS 플러그인 방식으로 만드려고 하고 있습니다. 이제 언제든지 새로운 환경에서 검증받은 방식으로 dev와 production에서 쓸 수 있도록 하려고 합니다.

### no-conflict tailwindCSS

일부 tailwindCSS와는 같은 이름인데 다른 서식을 취하거나 reset등이 겹치면서 함께 혼용하는 경우 문제가 되곤했습니다. tailwindCSS의 대체제나 경쟁자 포지션이 아닌만큼 기존에 이미 사용되고 있는 라이브러리와는 충돌하지 않도록 하려고 합니다.

```
ex) tailwindCSS
flex -> display: flex

ex) adorableCSS
flex -> flex: 1
```


### TBD: VSCODE IDE Plugin, Prettier Plugin...

실제 개발에서 사용할 수 있도록 개발에서 쓸 수 있는 플러그인이나 lint등을 만들어서 활용할 수 있도록 할 예정입니다.

[CSS Framework for WordPress](https://automaticcss.com/)


---
# Syntax

### Basic
```
prop(value)
```

### Advanced
```
property(value) 
  - 가장 기본적인 형태로 프로퍼티(값)의 형태를 가집니다.
  ex) class="w(240) h(100) c(#fff.3)"

property(value/value/...) 
  - 클래스는 띄어쓰기로 구분되므로 기존 css에서 띄어쓰기 구분자들은 '/'로 구분합니다.
  ex) class="gap(10/20) p(10/20/30/40)"

property
  - 값이 없는 프로퍼티는 ()를 사용하지 않습니다.
  ex) class="hbox absolute bold none"

selector:property(value) 
  - 조건부 렌더링 prefix를 통해 상황별로 서식을 다르게 적용할 수 있습니다.
  ex) class="hover:bg(red) focus:b(blue) .isSelected:underline mobile:vbox"

selector:property(value)+property(value)
  - +기호를 통해 같은 selector에 다른 속성들을 더할 수 있습니다.
  ex) class="hover:bg(red)+underline"

media:selector:property(value)! or property(value)! or property!
  - 마지막에 !를 붙이면 !important 로 만들어줍니다.
  ex) class="active:bg(red)! b(0)! none! fixed!"
```


### Naming Convention Principle
Figma만의 고유한 레이아웃 시스템 → Figma 따르기
CSS에 이미 확립된 개념이 있는 것 → CSS 따르기
일반적인 시각적 속성 → CSS 스타일 채택

---
## Size & Position

```
300x200					// fixed size (width)x(height)
16:9					// aspect-ratio	
(0,20)					// position absolute(x,y)
```

## Auto Layout
```
hbox(center) 			- Figma의 수평 Auto Layout
vbox(top+right) 	   	- Figma의 수직 Auto Layout
wrap(top)			    - Figma의 수직 Auto Layout

gap(16)				    - Auto Layout spacing

p(16)  			    	- Auto Layout padding
p(16/20)   		     	- Auto Layout padding
```

## Sizing
```
400x300						- Fixed Size Both
16:9						- aspect-ratio	

w(hug)						- Hug content
w(fill)						- Fill container
w(300)						- Fixed width
w(300..)					- Min width
w(..600)					- Max width
w(fill/200..400)			- min..max width

h(...)						- Height variants
```

## Visual
```
r(8)            - Radius
bg(#000)        - Background
b(#000)			- Border

blur(10)			- Blur effect
box-shadow(2)		- Shadow effect
```

## Appearance
```
opcacity(.5)		- Opacity
clip				- Overflow:clip
```

## Constraints
```
(0,0) 				// left:0; top: 0;
(100,200)		 	// left:100px; top: 200px;
(..50,..50) 		// right:50px; bottom: 50px;
(10..10,50) 		// left:10; right;10px; top: 50px;

layer				// position:absolute; inset: 0;
layer(top)			// position:absolute; inset: 0 0 auto 0;
```

---
## Text

```
font(16/1.5/-1%/600)    - Size/LineHeight/LetterSpacing/Weight

bold
italic
underline
strike

lowercase
uppercase

c(#000)  		   	    - Color

text(right)
text(middle)
text(bottom+justify)

nowrap nowrap...
max-lines(3)
```


---
## Etc (TBD)

### Position
```
absolute
fixed
relative
sticky

x(100)
y(100)
z(2)

rotate(45)
```

### Scroll
```
scroll                // overflow: auto (양방향)
scroll(x)             // overflow-x: auto
scroll(y)             // overflow-y: auto
scroll(smooth)        // scroll-behavior: smooth
```

### ScrollBar
```
scrollbar(none)       // 스크롤바 숨김
scrollbar(auto)       // 스크롤바 기본
scrollbar(always)     // 스크롤바 기본
scrollbar(thin)       // 얇은 스크롤바
```

### Scroll Snap
```
hslide                // 가로 슬라이드 (center + mandatory)
vslide                // 세로 슬라이드 (center + mandatory)

// 정렬
hslide(start)         // 시작점 정렬
hslide(end)           // 끝점 정렬

// 스냅 강도
hslide(soft)          // 부드러운 스냅 (proximity)

// 패딩/마진
hslide(p:20)          // 양쪽 패딩 20px
hslide(p:20/40)       // 좌우 패딩 20px/40px
hslide(m:20)          // 양쪽 마진 20px
hslide(m:20/40)       // 좌우 마진 20px/40px

// 복합 사용
hslide(start/soft/p:20)
```


### TBD (not yet)
translate rotate scale
grid
cursor
inert
disabled

---
<div class="400x300 (0,400) vbox"><div>

<div class="hover:c(#f00)+gap(20)"/>



#adorable-css