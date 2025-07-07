import { describe, it, expect } from 'vitest'
import { generateCSS } from '../index'

describe('Homepage Classes Test - 실제 사용된 클래스들 검증', () => {
  describe('Basic Layout Classes', () => {
    it('should generate vbox(pack) - 세로 중앙 정렬', () => {
      const css = generateCSS(['vbox(pack)'])
      console.log('Generated CSS for vbox(pack):', css)
      expect(css).toContain('display:flex')
      expect(css).toContain('flex-direction:column')
      expect(css).toContain('justify-content:center')
    })

    it('should generate hbox(middle) - 가로 세로 중앙 정렬', () => {
      const css = generateCSS(['hbox(middle)'])
      console.log('Generated CSS for hbox(middle):', css)
      expect(css).toContain('display:flex')
      expect(css).toContain('flex-direction:row')
      expect(css).toContain('align-items:center')
    })

    it('should generate hbox(middle) gap(auto) - 공간 분산', () => {
      const css = generateCSS(['hbox(middle) gap(auto)'])
      console.log('Generated CSS for hbox(middle) gap(auto):', css)
      expect(css).toContain('display:flex')
      expect(css).toContain('justify-content:space-between')
    })

    it('should generate gap(auto) for space-between', () => {
      const css = generateCSS(['gap(auto)'])
      console.log('Generated CSS for gap(auto):', css)
      expect(css).toContain('justify-content:space-between')
    })
  })

  describe('Typography Classes - heading() 컴포넌트', () => {
    it('should generate heading() - 기본 h2', () => {
      const css = generateCSS(['heading()'])
      console.log('Generated CSS for heading():', css)
      expect(css).toContain('font-size:var(--font-3xl)')
      expect(css).toContain('font-weight:var(--fontWeight-semi)')
      expect(css).toContain('color:oklch(')
    })

    it('should generate heading(h1/hero) - 대형 제목', () => {
      const css = generateCSS(['heading(h1/hero)'])
      console.log('Generated CSS for heading(h1/hero):', css)
      expect(css).toContain('font-size:clamp(')
      expect(css).toContain('font-weight:700')
      expect(css).toContain('line-height:1.1')
    })

    it('should generate heading(h4/subtitle) - 부제목', () => {
      const css = generateCSS(['heading(h4/subtitle)'])
      console.log('Generated CSS for heading(h4/subtitle):', css)
      expect(css).toContain('font-weight:var(--fontWeight-semi)')
      expect(css).toContain('color:oklch(')
    })

    it('should generate heading(h1/gradient) - 그라디언트 텍스트', () => {
      const css = generateCSS(['heading(h1/gradient)'])
      console.log('Generated CSS for heading(h1/gradient):', css)
      expect(css).toContain('background:linear-gradient(')
      expect(css).toContain('-webkit-background-clip:text')
      expect(css).toContain('-webkit-text-fill-color:transparent')
    })
  })

  describe('UI Component Classes', () => {
    it('should generate card() - 기본 카드', () => {
      const css = generateCSS(['card()'])
      console.log('Generated CSS for card():', css)
      expect(css).toContain('background-color:#ffffff')
      expect(css).toContain('border-radius:var(--radius-lg)')
      expect(css).toContain('padding:24px')
      expect(css).toContain('box-shadow:var(--shadow-sm)')
    })

    it('should generate card(elevated) - 떠있는 카드', () => {
      const css = generateCSS(['card(elevated)'])
      console.log('Generated CSS for card(elevated):', css)
      expect(css).toContain('background-color:#ffffff')
      expect(css).toContain('border:1px solid color-mix')
    })

    it('should generate card(flat) - 플랫 카드', () => {
      const css = generateCSS(['card(flat)'])
      console.log('Generated CSS for card(flat):', css)
      expect(css).toContain('position:relative')
      expect(css).toContain('border-radius:var(--radius-lg)')
    })

    it('should generate btn() - 기본 버튼', () => {
      const css = generateCSS(['btn()'])
      console.log('Generated CSS for btn():', css)
      expect(css).toContain('display:inline-flex')
      expect(css).toContain('background-color:var(--gray-900)')
      expect(css).toContain('height:40px')
    })

    it('should generate btn(secondary/lg) - 세컨더리 라지 버튼', () => {
      const css = generateCSS(['btn(secondary/lg)'])
      console.log('Generated CSS for btn(secondary/lg):', css)
      expect(css).toContain('height:44px')
      expect(css).toContain('background-color:#ffffff')
    })
  })

  describe('Color and Background Classes', () => {
    it('should generate bg(135deg/purple-500..pink-500) - 그라디언트', () => {
      const css = generateCSS(['bg(135deg/purple-500..pink-500)'])
      console.log('Generated CSS for bg(135deg/purple-500..pink-500):', css)
      expect(css).toContain('background:linear-gradient(')
      expect(css).toContain('purple-500')
      expect(css).toContain('pink-500')
    })

    it('should generate c(white.8) - 투명도가 있는 색상', () => {
      const css = generateCSS(['c(white.8)'])
      console.log('Generated CSS for c(white.8):', css)
      expect(css).toContain('color:rgba(255,255,255,0.8)')
    })

    it('should generate bg(white.2) - 투명도가 있는 배경', () => {
      const css = generateCSS(['bg(white.2)'])
      console.log('Generated CSS for bg(white.2):', css)
      expect(css).toContain('background-color:rgba(255,255,255,0.2)')
    })
  })

  describe('Spacing and Sizing Classes', () => {
    it('should generate container(3xl) - 컨테이너', () => {
      const css = generateCSS(['container(3xl)'])
      console.log('Generated CSS for container(3xl):', css)
      expect(css).toContain('max-width')
      expect(css).toContain('margin-left:auto')
      expect(css).toContain('margin-right:auto')
    })

    it('should generate p(2xl) - 패딩', () => {
      const css = generateCSS(['p(2xl)'])
      console.log('Generated CSS for p(2xl):', css)
      expect(css).toContain('padding:var(--spacing-2xl)')
    })

    it('should generate gap(lg) - 갭', () => {
      const css = generateCSS(['gap(lg)'])
      console.log('Generated CSS for gap(lg):', css)
      expect(css).toContain('gap:var(--spacing-lg)')
    })

    it('should generate r(full) - 완전 둥근 모서리', () => {
      const css = generateCSS(['r(full)'])
      console.log('Generated CSS for r(full):', css)
      expect(css).toContain('border-radius:var(--radius-full)')
    })
  })

  describe('Effects and Interactions', () => {
    it('should generate shadow(xl) - 큰 그림자', () => {
      const css = generateCSS(['shadow(xl)'])
      console.log('Generated CSS for shadow(xl):', css)
      expect(css).toContain('box-shadow')
    })

    it('should generate hover:scale(1.05) - 호버 스케일', () => {
      const css = generateCSS(['hover:scale(1.05)'])
      console.log('Generated CSS for hover:scale(1.05):', css)
      expect(css).toContain(':hover')
      expect(css).toContain('transform:scale(1.05)')
    })

    it('should generate transition - 트랜지션', () => {
      const css = generateCSS(['transition'])
      console.log('Generated CSS for transition:', css)
      expect(css).toContain('transition')
    })

    it('should generate backdrop-blur(sm) - 백드롭 블러', () => {
      const css = generateCSS(['backdrop-blur(sm)'])
      console.log('Generated CSS for backdrop-blur(sm):', css)
      expect(css).toContain('backdrop-filter:blur')
    })
  })

  describe('Position and Display Classes', () => {
    it('should generate fixed - 고정 위치', () => {
      const css = generateCSS(['fixed'])
      console.log('Generated CSS for fixed:', css)
      expect(css).toContain('position:fixed')
    })

    it('should generate bottom(2xl) - 하단 위치', () => {
      const css = generateCSS(['bottom(2xl)'])
      console.log('Generated CSS for bottom(2xl):', css)
      expect(css).toContain('bottom:var(--spacing-2xl)')
    })

    it('should generate z(100) - z-index', () => {
      const css = generateCSS(['z(100)'])
      console.log('Generated CSS for z(100):', css)
      expect(css).toContain('z-index:100')
    })

    it('should generate clip - overflow hidden', () => {
      const css = generateCSS(['clip'])
      console.log('Generated CSS for clip:', css)
      expect(css).toContain('overflow:hidden')
    })
  })

  describe('Border Classes', () => {
    it('should generate bl(6px/transparent) - 왼쪽 테두리', () => {
      const css = generateCSS(['bl(6px/transparent)'])
      console.log('Generated CSS for bl(6px/transparent):', css)
      expect(css).toContain('border-left:6px')
      expect(css).toContain('transparent')
    })

    it('should generate bt(1/gray-200) - 상단 테두리', () => {
      const css = generateCSS(['bt(1/gray-200)'])
      console.log('Generated CSS for bt(1/gray-200):', css)
      expect(css).toContain('border-top:1px')
      expect(css).toContain('gray-200')
    })
  })

  describe('Text and Font Classes', () => {
    it('should generate text(center) - 중앙 정렬', () => {
      const css = generateCSS(['text(center)'])
      console.log('Generated CSS for text(center):', css)
      expect(css).toContain('text-align:center')
    })

    it('should generate font(700) - 폰트 굵기', () => {
      const css = generateCSS(['font(700)'])
      console.log('Generated CSS for font(700):', css)
      expect(css).toContain('font-weight:700')
    })

    it('should generate text(xl/1.6) - 폰트 사이즈와 라인 높이', () => {
      const css = generateCSS(['text(xl/1.6)'])
      console.log('Generated CSS for text(xl/1.6):', css)
      expect(css).toContain('font-size')
      expect(css).toContain('line-height:1.6')
    })
  })

  describe('Grid Classes', () => {
    it('should generate grid - 그리드 디스플레이', () => {
      const css = generateCSS(['grid'])
      console.log('Generated CSS for grid:', css)
      expect(css).toContain('display:grid')
    })

    it('should generate grid-cols(3) - 3열 그리드', () => {
      const css = generateCSS(['grid-cols(3)'])
      console.log('Generated CSS for grid-cols(3):', css)
      expect(css).toContain('grid-template-columns:repeat(3, minmax(0, 1fr))')
    })
  })
})