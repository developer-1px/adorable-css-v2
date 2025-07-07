import { describe, it, expect } from 'vitest'
import { glow, glowPulse, glowRing } from '../06-plugins/effects/glow' // Corrected import path
import { glass, glassCard, glassDark } from '../06-plugins/effects/glass' // Corrected import path
import { card, cardHover, cardDark, cardGradient } from '../05-components/primitives/card' // Corrected import path
import { fontResponsive, gapResponsive, pResponsive } from '../06-plugins/responsive/responsive' // Corrected import path
import { gradientText, backdropBlur, morphism, neon } from '../06-plugins/advanced/advanced' // Corrected import path

describe('Plugin Rules - Glow Effects', () => {
  it('should generate basic glow effect', () => {
    const result = glow()
    expect(result).toEqual({
      'box-shadow': '0 0 20px rgba(99, 102, 241, 0.5)',
      filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.3))'
    })
  })

  it('should generate glow with custom color and size', () => {
    const result = glow('#ff0000/32/0.8')
    expect(result['box-shadow']).toContain('32px')
    expect(result['box-shadow']).toContain('0.8')
    expect(result['box-shadow']).toContain('rgb(255, 0, 0)'); // Check for color
    expect(result.filter).toContain('rgb(255, 0, 0)'); // Check for color in filter
  })

  it('should generate glow-pulse animation', () => {
    const result = glowPulse('#00ff00')
    expect(result).toHaveProperty('animation')
    expect(result.animation).toContain('glow-pulse')
    expect(result.animation).toContain('var(--duration-1000)'); // Check for default duration
    expect(result.animation).toContain('infinite'); // Check for infinite iteration
  })

  it('should generate glow-ring effect', () => {
    const result = glowRing('#0000ff/6')
    expect(result).toHaveProperty('box-shadow')
    expect(result).toHaveProperty('outline', 'none')
    expect(result['box-shadow']).toContain('rgb(0, 0, 255)'); // Check for color
  })

  it('should return empty object for invalid glow arguments', () => { // Added new test case
    const result = glow('invalid');
    expect(result).toEqual({});
  });
});

describe('Plugin Rules - Glass Effects', () => {
  it('should generate basic glass effect', () => {
    const result = glass()
    expect(result).toEqual({
      background: 'rgba(255, 255, 255, 0.1)',
      'backdrop-filter': 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      'border-radius': '12px'
    })
  })

  it('should generate glass with custom blur and opacity', () => {
    const result = glass('20/0.3')
    expect(result['backdrop-filter']).toBe('blur(20px)')
    expect(result.background).toContain('0.3')
  })

  it('should generate glass-card with padding and shadow', () => {
    const result = glassCard()
    expect(result).toHaveProperty('padding', '24px')
    expect(result).toHaveProperty('box-shadow')
    expect(result).toHaveProperty('overflow', 'hidden')
    expect(result.background).toContain('rgba(255, 255, 255, 0.1)'); // Check glass properties
  })

  it('should generate glass-dark effect', () => {
    const result = glassDark('15/0.2')
    expect(result.background).toContain('0, 0, 0') // Black color
    expect(result.background).toContain('0.2') // Opacity
    expect(result['backdrop-filter']).toBe('blur(15px)')
  })

  it('should return empty object for invalid glass arguments', () => { // Added new test case
    const result = glass('invalid');
    expect(result).toEqual({});
  });
});

describe('Plugin Rules - Card Effects', () => {
  it('should generate basic card', () => {
    const result = card()
    expect(result).toEqual({
      background: 'white',
      'border-radius': '12px',
      'box-shadow': '0 4px 16px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      overflow: 'hidden'
    })
  })

  it('should generate card with elevation and radius', () => {
    const result = card('4/20')
    expect(result['border-radius']).toBe('20px')
    expect(result['box-shadow']).toContain('16px 32px') // Check elevation
  })

  it('should generate card-hover with transition', () => {
    const result = cardHover()
    expect(result).toHaveProperty('transition', 'all 0.3s ease')
    expect(result).toHaveProperty('cursor', 'pointer')
    expect(result).toHaveProperty('&:hover') // Check for pseudo-selector
  })

  it('should generate card-dark', () => {
    const result = cardDark('3/16')
    expect(result.background).toBe('#1a1a1a')
    expect(result['border-radius']).toBe('16px')
  })

  it('should generate card-gradient', () => {
    const result = cardGradient('#ff0000/#00ff00/90deg/3')
    expect(result.background).toContain('linear-gradient')
    expect(result.background).toContain('90deg')
    expect(result.border).toBe('none')
    expect(result.color).toBe('white')
  })

  it('should return empty object for invalid card arguments', () => { // Added new test case
    const result = card('invalid');
    expect(result).toEqual({});
  });
});

describe('Plugin Rules - Responsive', () => {
  it('should generate responsive font size', () => {
    const result = fontResponsive('16/32')
    expect(result['font-size']).toContain('clamp')
    expect(result['font-size']).toContain('16px')
    expect(result['font-size']).toContain('32px')
    expect(result['font-size']).toContain('vw') // Check for viewport unit
  })

  it('should generate responsive gap', () => {
    const result = gapResponsive('12/24')
    expect(result.gap).toContain('clamp')
    expect(result.gap).toContain('12px')
    expect(result.gap).toContain('24px')
    expect(result.gap).toContain('vw'); // Check for viewport unit
  })

  it('should generate responsive padding', () => {
    const result = pResponsive('16/32')
    expect(result.padding).toContain('clamp')
    expect(result.padding).toContain('16px')
    expect(result.padding).toContain('32px')
    expect(result.padding).toContain('vw'); // Check for viewport unit
  })

  it('should generate default responsive values', () => {
    const result = fontResponsive()
    expect(result['font-size']).toBe('clamp(1rem, 4vw, 2rem)')
  })

  it('should return empty object for invalid responsive arguments', () => { // Added new test case
    const result = fontResponsive('invalid');
    expect(result).toEqual({});
  });
});

describe('Plugin Rules - Advanced Effects', () => {
  it('should generate gradient text', () => {
    const result = gradientText()
    expect(result).toHaveProperty('background')
    expect(result).toHaveProperty('-webkit-background-clip', 'text')
    expect(result).toHaveProperty('background-clip', 'text')
    expect(result).toHaveProperty('-webkit-text-fill-color', 'transparent')
  })

  it('should generate gradient text with custom colors', () => {
    const result = gradientText('#ff0000/#00ff00/45deg')
    expect(result.background).toContain('45deg')
    expect(result.background).toContain('#ff0000')
    expect(result.background).toContain('#00ff00')
  })

  it('should generate backdrop blur', () => {
    const result = backdropBlur('20')
    expect(result['backdrop-filter']).toBe('blur(20px)')
  })

  it('should generate morphism effect', () => {
    const result = morphism('24/0.2')
    expect(result.background).toBe('#e0e0e0')
    expect(result['border-radius']).toBe('24px')
    expect(result['box-shadow']).toContain('24px 24px')
    expect(result['box-shadow']).toContain('-24px -24px')
    expect(result.border).toBe('none')
  })

  it('should generate neon effect', () => {
    const result = neon('#00ff00')
    expect(result.color).toBe('#00ff00')
    expect(result['text-shadow']).toContain('#00ff00')
    expect(result.animation).toContain('neon-flicker')
  })

  it('should return empty object for invalid advanced effect arguments', () => { // Added new test case
    const result = gradientText('invalid');
    expect(result).toEqual({});
  });
});
