# Dead Code Analysis - Quick Reference

## At a Glance

**Total Dead Code:** 116 lines (HIGH priority) + 33+ lines (MEDIUM priority)

## High Priority Removals (116 lines - SAFE)

### 1. Color Processor Classes (21 lines)
```
File: src/01-core/values/color-processor.ts
Lines 97-122
Delete: HexColorProcessor, HslColorProcessor, RgbColorProcessor
Delete: makeHEX, makeHLS, makeRGB exports
Reason: Never instantiated, only used through factory
Risk: NONE - No imports exist
```

### 2. Scale Utilities File (84 lines)
```
File: src/01-core/values/scaleUtilities.ts
Delete: Entire file
Functions: generateFontScaleVariables, generateSpacingScaleVariables, generateScaleSystem
Constants: SCALE_RATIOS, DEFAULT_SCALE_STEPS
Reason: Complete orphan file (no imports anywhere)
Related: Test file __tests__/scale-generator.test.ts already deleted
Risk: NONE - Completely unused
```

### 3. Parser Utilities (11 lines)
```
File: src/01-core/parser/parser-utils.ts
Lines 92-103
Delete: many_sep() and many1_sep() functions
Also remove from: createParser() return object
Reason: Defined but never called, alternatives exist
Risk: NONE - Not used in parser.ts
```

## Medium Priority Refactorings (33+ lines)

### 4. Duplicate Validation Pattern (28+ lines)
```
File: src/02-design_tokens/design-system/colors/semantic-colors.ts
Pattern: validShades + getShade selection repeated 14+ times
Action: Extract to helper function
Expected Reduction: 20+ lines
Risk: NONE - Just refactoring
```

### 5. Legacy Comments (5 lines)
```
Files: src/03-rules/text/text.ts, src/03-rules/layout/display.ts
Action: Remove legacy/deprecated comments
Risk: NONE - Just cleanup
```

## Low Priority Cleanup (9 lines)

### 6. TODO Marker (1 line)
```
File: src/01-core/values/makeValue.ts, line 68
Action: Complete or remove
```

### 7. Deprecated Syntax (3 lines)
```
File: src/02-design_tokens/design-system/colors/colors.ts, line 449
Action: Complete deprecation or remove
```

## Verification Commands

```bash
# Verify unused color processors
grep -r "HexColorProcessor\|HslColorProcessor\|RgbColorProcessor" src/ --include="*.ts" | grep -v "color-processor.ts"
# Result: Should be EMPTY

# Verify unused scale utilities
grep -r "generateFontScaleVariables\|generateSpacingScaleVariables\|SCALE_RATIOS" src/ --include="*.ts" | grep -v "scaleUtilities.ts"
# Result: Should be EMPTY

# Verify parser utilities not used
grep -r "many_sep\|many1_sep" src/ --include="*.ts" | grep -v "parser-utils.ts"
# Result: Should be EMPTY

# Run tests
pnpm test
```

## Implementation Order

1. **First:** Remove HIGH priority items (safe, no tests needed)
2. **Then:** Run full test suite to verify
3. **Next:** Refactor MEDIUM priority items
4. **Finally:** Clean up LOW priority items

## Files Involved

**HIGH Priority:**
- src/01-core/values/color-processor.ts
- src/01-core/values/scaleUtilities.ts (DELETE entire file)
- src/01-core/parser/parser-utils.ts

**MEDIUM Priority:**
- src/02-design_tokens/design-system/colors/semantic-colors.ts
- src/03-rules/text/text.ts
- src/03-rules/layout/display.ts

**LOW Priority:**
- src/01-core/values/makeValue.ts
- src/02-design_tokens/design-system/colors/colors.ts

## Related Resources

- Full detailed report: DEAD_CODE_ANALYSIS.md
- Refactoring guide: src/01-core/REFACTORING_REPORT.md
