import { describe, it, expect } from 'vitest'
import { RULES_FOR_UNOCSS } from './rules'

describe('RULES_FOR_UNOCSS', () => {
  describe('Layout utilities', () => {
    it('should have block utility', () => {
      expect(RULES_FOR_UNOCSS.block).toBeDefined()
      expect(typeof RULES_FOR_UNOCSS.block).toBe('function')
    })

    it('should have hbox utility', () => {
      expect(RULES_FOR_UNOCSS.hbox).toBeDefined()
      expect(typeof RULES_FOR_UNOCSS.hbox).toBe('function')
    })

    it('should have vbox utility', () => {
      expect(RULES_FOR_UNOCSS.vbox).toBeDefined()
      expect(typeof RULES_FOR_UNOCSS.vbox).toBe('function')
    })

    it('should have pack utility', () => {
      expect(RULES_FOR_UNOCSS.pack).toBeDefined()
      expect(typeof RULES_FOR_UNOCSS.pack).toBe('function')
    })

    it('should have gap utility', () => {
      expect(RULES_FOR_UNOCSS.gap).toBeDefined()
      expect(typeof RULES_FOR_UNOCSS.gap).toBe('function')
    })
  })

  describe('Sizing utilities', () => {
    it('should have w utility', () => {
      expect(RULES_FOR_UNOCSS.w).toBeDefined()
      expect(typeof RULES_FOR_UNOCSS.w).toBe('function')
    })

    it('should have h utility', () => {
      expect(RULES_FOR_UNOCSS.h).toBeDefined()
      expect(typeof RULES_FOR_UNOCSS.h).toBe('function')
    })
  })

  describe('Spacing utilities', () => {
    it('should have padding utilities', () => {
      expect(RULES_FOR_UNOCSS.p).toBeDefined()
      expect(RULES_FOR_UNOCSS.pt).toBeDefined()
      expect(RULES_FOR_UNOCSS.pr).toBeDefined()
      expect(RULES_FOR_UNOCSS.pb).toBeDefined()
      expect(RULES_FOR_UNOCSS.pl).toBeDefined()
    })

    it('should have margin utilities', () => {
      expect(RULES_FOR_UNOCSS.m).toBeDefined()
      expect(RULES_FOR_UNOCSS.mt).toBeDefined()
      expect(RULES_FOR_UNOCSS.mr).toBeDefined()
      expect(RULES_FOR_UNOCSS.mb).toBeDefined()
      expect(RULES_FOR_UNOCSS.ml).toBeDefined()
    })
  })

  describe('Typography utilities', () => {
    it('should have font utility', () => {
      expect(RULES_FOR_UNOCSS.font).toBeDefined()
      expect(typeof RULES_FOR_UNOCSS.font).toBe('function')
    })

    it('should have color utility', () => {
      expect(RULES_FOR_UNOCSS.c).toBeDefined()
      expect(typeof RULES_FOR_UNOCSS.c).toBe('function')
    })

    it('should have text utility', () => {
      expect(RULES_FOR_UNOCSS.text).toBeDefined()
      expect(typeof RULES_FOR_UNOCSS.text).toBe('function')
    })
  })

  describe('Visual utilities', () => {
    it('should have background utility', () => {
      expect(RULES_FOR_UNOCSS.bg).toBeDefined()
      expect(typeof RULES_FOR_UNOCSS.bg).toBe('function')
    })

    it('should have border utilities', () => {
      expect(RULES_FOR_UNOCSS.b).toBeDefined()
      expect(RULES_FOR_UNOCSS.bt).toBeDefined()
      expect(RULES_FOR_UNOCSS.br).toBeDefined()
      expect(RULES_FOR_UNOCSS.bb).toBeDefined()
      expect(RULES_FOR_UNOCSS.bl).toBeDefined()
    })

    it('should have radius utility', () => {
      expect(RULES_FOR_UNOCSS.r).toBeDefined()
      expect(typeof RULES_FOR_UNOCSS.r).toBe('function')
    })
  })

  describe('Position utilities', () => {
    it('should have position utilities', () => {
      expect(RULES_FOR_UNOCSS.relative).toBeDefined()
      expect(RULES_FOR_UNOCSS.absolute).toBeDefined()
      expect(RULES_FOR_UNOCSS.fixed).toBeDefined()
      expect(RULES_FOR_UNOCSS.sticky).toBeDefined()
    })

    it('should have layer utility', () => {
      expect(RULES_FOR_UNOCSS.layer).toBeDefined()
      expect(typeof RULES_FOR_UNOCSS.layer).toBe('function')
    })

    it('should have z-index utility', () => {
      expect(RULES_FOR_UNOCSS.z).toBeDefined()
      expect(typeof RULES_FOR_UNOCSS.z).toBe('function')
    })
  })

  describe('Function arity checking', () => {
    it('should have correct arity for keyword utilities', () => {
      // Keyword utilities should have arity 0
      const keywordUtilities = ['block', 'inline', 'pack', 'relative', 'absolute']
      
      keywordUtilities.forEach(util => {
        if (RULES_FOR_UNOCSS[util]) {
          expect(RULES_FOR_UNOCSS[util].length).toBe(0)
        }
      })
    })

    it('should have correct arity for function utilities', () => {
      // Function utilities should have arity >= 1
      const functionUtilities = ['w', 'h', 'p', 'm', 'bg', 'font', 'gap']
      
      functionUtilities.forEach(util => {
        if (RULES_FOR_UNOCSS[util]) {
          expect(RULES_FOR_UNOCSS[util].length).toBeGreaterThanOrEqual(1)
        }
      })
    })
  })

  describe('Rule consistency', () => {
    it('should have all layout rules defined', () => {
      const layoutRules = [
        'block', 'inline', 'inline-block', 'none', 'hidden',
        'hbox', 'vbox', 'pack', 'wrap', 'gap'
      ]
      
      layoutRules.forEach(rule => {
        expect(RULES_FOR_UNOCSS[rule]).toBeDefined()
      })
    })

    it('should have all sizing rules defined', () => {
      const sizingRules = ['w', 'h', 'min-w', 'max-w', 'min-h', 'max-h']
      
      sizingRules.forEach(rule => {
        expect(RULES_FOR_UNOCSS[rule]).toBeDefined()
      })
    })

    it('should have all spacing rules defined', () => {
      const spacingRules = [
        'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py',
        'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my'
      ]
      
      spacingRules.forEach(rule => {
        expect(RULES_FOR_UNOCSS[rule]).toBeDefined()
      })
    })
  })

  describe('Edge cases', () => {
    it('should not have undefined rules', () => {
      Object.entries(RULES_FOR_UNOCSS).forEach(([key, value]) => {
        expect(value).toBeDefined()
        expect(value).not.toBeNull()
        expect(typeof value).toBe('function')
      })
    })

    it('should handle special characters in rule names', () => {
      // Test that rules with special characters (if any) are properly defined
      const specialRules = Object.keys(RULES_FOR_UNOCSS).filter(key => 
        /[-_]/.test(key)
      )
      
      specialRules.forEach(rule => {
        expect(RULES_FOR_UNOCSS[rule]).toBeDefined()
        expect(typeof RULES_FOR_UNOCSS[rule]).toBe('function')
      })
    })
  })
})