// Import all handlers at the top
import { font, italic } from './figma/text/font'
import * as paddingHandlers from './figma/layout/padding'
import * as marginHandlers from './misc-css/margin'
import * as sizeHandlers from './figma/layout/size'
import * as displayHandlers from './misc-css/display'
import * as positionHandlers from './figma/layout/position'
import * as overflowHandlers from './figma/layout/overflow'
import * as gridHandlers from './figma/layout/grid'
import { colorHandlers } from './figma/fill/color'
import * as backgroundHandlers from './figma/fill/background'
import * as objectHandlers from './figma/fill/object'
import * as textHandlers from './figma/text/text'
import * as truncateHandlers from './figma/text/truncate'
import * as borderHandlers from './figma/style/border'
import * as effectsHandlers from './figma/style/effects'
import * as transformHandlers from './figma/style/transform'
import * as trackingHandlers from './figma/text/tracking'
import * as leadingHandlers from './figma/text/leading'
import * as transformEffectsHandlers from './figma/effects/transform'
import * as whitespaceHandlers from './figma/text/whitespace'
import * as flexboxHandlers from './misc-css/flexbox'
import * as pointerEventsHandlers from './misc-css/pointer-events'
import * as transitionHandlers from './misc-css/transition'
import * as animationHandlers from './misc-css/animation'
import * as glassmorphismHandlers from './figma/effects/glassmorphism'
import * as cssLiteralHandlers from './misc-css/css-literal'

export type Rule2Handler = (args: any) => string
export type Rule2Definition = {
  handler: Rule2Handler
  layer?: string
}

const rule2Registry = new Map<string, Rule2Definition>()

export function registerRule2(
  nameOrHandlers: string | Record<string, Rule2Handler>,
  handlerOrLayer?: Rule2Handler | string,
  layer?: string,
): void {
  if (typeof nameOrHandlers === 'string') {
    const handler = handlerOrLayer as Rule2Handler
    rule2Registry.set(nameOrHandlers, { handler, layer: layer || 'utilities' })
  } else {
    const defaultLayer = typeof handlerOrLayer === 'string' ? handlerOrLayer : 'utilities'
    Object.entries(nameOrHandlers).forEach(([name, handler]) => {
      rule2Registry.set(name, { handler, layer: defaultLayer })
    })
  }
}

export function getRule2Handler(name: string): Rule2Handler | undefined {
  return rule2Registry.get(name)?.handler
}

export function getRule2Definition(name: string): Rule2Definition | undefined {
  return rule2Registry.get(name)
}

export function getRegisteredRule2HandlerNames(): string[] {
  return Array.from(rule2Registry.keys())
}

export function getAllRule2Handlers(): Map<string, Rule2Definition> {
  return new Map(rule2Registry)
}

/**
 * Initialize all Rule2 handlers
 */
export function initializeRule2Handlers(): void {
  // Composition layer - Components that combine multiple CSS properties
  const compositionDefs = {
    // Layout compositions
    hbox: flexboxHandlers.hbox,
    vbox: flexboxHandlers.vbox,
    pack: flexboxHandlers.pack,

    // Size compositions
    size: sizeHandlers.size, // width + height

    // Typography compositions
    truncate: truncateHandlers.truncate, // overflow + text-overflow + white-space
  }
  registerRule2(compositionDefs, 'composition')

  // All utilities
  const utilityDefs = {
    // Gap
    'gap': flexboxHandlers.gap,
    'gap-x': flexboxHandlers.gapX,
    'gap-y': flexboxHandlers.gapY,

    // Padding
    'p': paddingHandlers.p,
    'pt': paddingHandlers.pt,
    'pr': paddingHandlers.pr,
    'pb': paddingHandlers.pb,
    'pl': paddingHandlers.pl,
    'px': paddingHandlers.px,
    'py': paddingHandlers.py,

    // Margin
    'm': marginHandlers.m,
    'mt': marginHandlers.mt,
    'mr': marginHandlers.mr,
    'mb': marginHandlers.mb,
    'ml': marginHandlers.ml,
    'mx': marginHandlers.mx,
    'my': marginHandlers.my,

    // Size
    'w': sizeHandlers.w,
    'h': sizeHandlers.h,
    'min-w': sizeHandlers.minW,
    'max-w': sizeHandlers.maxW,
    'min-h': sizeHandlers.minH,
    'max-h': sizeHandlers.maxH,

    // Color
    'c': colorHandlers.c,

    // Typography & Text properties (unified)
    'text': textHandlers.text, // Universal text handler
    'font': font, // font-weight
    'italic': italic,

    // Text properties shortcuts
    'underline': textHandlers.underline,
    'overline': textHandlers.overline,
    'strike': textHandlers.strike,
    'decoration': textHandlers.decoration,
    'no-underline': textHandlers.noUnderline || textHandlers.decoration, // alias
    'uppercase': textHandlers.uppercase,
    'lowercase': textHandlers.lowercase,
    'capitalize': textHandlers.capitalize,
    'nowrap': textHandlers.nowrap,
    'wrap': textHandlers.wrap,
    'pre': textHandlers.pre,
    'pre-wrap': textHandlers.preWrap,
    'pre-line': textHandlers.preLine,
    'tracking': trackingHandlers.tracking,
    'leading': leadingHandlers.leading,
    'whitespace': whitespaceHandlers.whitespace,

    // Border
    'border': borderHandlers.border,
    'b': borderHandlers.b,
    'r': borderHandlers.r,
    'bt': borderHandlers.bt,
    'br': borderHandlers.br,
    'bb': borderHandlers.bb,
    'bl': borderHandlers.bl,
    'border-t': borderHandlers.borderT,
    'border-r': borderHandlers.borderR,
    'border-b': borderHandlers.borderB,
    'border-l': borderHandlers.borderL,

    // Flexbox
    'flex': flexboxHandlers.flex,
    'inline-flex': flexboxHandlers.inlineFlex,
    'flex-row': flexboxHandlers.flexRow,
    'flex-row-reverse': flexboxHandlers.flexRowReverse,
    'flex-col': flexboxHandlers.flexCol,
    'flex-col-reverse': flexboxHandlers.flexColReverse,
    'flex-wrap': flexboxHandlers.flexWrap,
    'flex-no-wrap': flexboxHandlers.flexNoWrap,
    'flex-wrap-reverse': flexboxHandlers.flexWrapReverse,
    'items': flexboxHandlers.items,
    'justify': flexboxHandlers.justify,
    'content': flexboxHandlers.content,
    'self': flexboxHandlers.self,
    'grow': flexboxHandlers.grow,
    'shrink': flexboxHandlers.shrink,
    'basis': flexboxHandlers.basis,
    'order': flexboxHandlers.order,

    // Effects
    'opacity': effectsHandlers.opacity,
    'blur': effectsHandlers.blur,
    'brightness': effectsHandlers.brightness,
    'contrast': effectsHandlers.contrast,
    'saturate': effectsHandlers.saturate,
    'sepia': effectsHandlers.sepia,
    'grayscale': effectsHandlers.grayscale,
    'hue-rotate': effectsHandlers.hueRotate,
    'invert': effectsHandlers.invert,
    'backdrop': effectsHandlers.backdrop,
    'shadow': effectsHandlers.shadow,
    'elevation': effectsHandlers.elevation,

    // Display
    'block': displayHandlers.block,
    'inline': displayHandlers.inline,
    'inline-block': displayHandlers.inlineBlock,
    'none': displayHandlers.none,
    'hidden': displayHandlers.hidden,
    'grid': displayHandlers.grid,
    'inline-grid': displayHandlers.inlineGrid,
    'contents': flexboxHandlers.contents,
    'table-display': displayHandlers.tableDisplay,
    'table-cell': displayHandlers.tableCell,
    'table-row': displayHandlers.tableRow,

    // Position
    'absolute': positionHandlers.absolute,
    'relative': positionHandlers.relative,
    'fixed': positionHandlers.fixed,
    'sticky': positionHandlers.sticky,
    'static': positionHandlers.static_,
    'x': positionHandlers.x,
    'y': positionHandlers.y,
    'top': positionHandlers.top,
    'right': positionHandlers.right,
    'bottom': positionHandlers.bottom,
    'left': positionHandlers.left,
    'inset': positionHandlers.inset,
    'inset-x': positionHandlers.insetX,
    'inset-y': positionHandlers.insetY,
    'z': positionHandlers.z,
    'layer': positionHandlers.layer,
    'position': positionHandlers.position,
    '__positionType': positionHandlers.__positionType,

    // Overflow
    'overflow': overflowHandlers.overflow,
    'overflow-x': overflowHandlers.overflowX,
    'overflow-y': overflowHandlers.overflowY,
    'clip': overflowHandlers.clip,
    'scrollable': overflowHandlers.scrollable,
    'scroll-x': overflowHandlers.scrollX,
    'scroll-y': overflowHandlers.scrollY,

    // Background
    'bg': backgroundHandlers.bg,
    'bg-color': backgroundHandlers.bgColor,
    'bg-image': backgroundHandlers.bgImage,
    'bg-size': backgroundHandlers.bgSize,
    'bg-position': backgroundHandlers.bgPosition,
    'bg-repeat': backgroundHandlers.bgRepeat,
    'bg-attachment': backgroundHandlers.bgAttachment,

    // Object fit/position
    'object': objectHandlers.object,
    'object-fit': objectHandlers.objectFit,
    'object-position': objectHandlers.objectPosition,

    // Universal utilities
    'cover': objectHandlers.cover,
    'contain': objectHandlers.contain,
    'fill': objectHandlers.fill,

    // Transform
    'transform': transformHandlers.transform,
    'scale': transformEffectsHandlers.scale,
    'scale-x': transformHandlers.scaleX,
    'scale-y': transformHandlers.scaleY,
    'rotate': transformEffectsHandlers.rotate,
    'rotate-x': transformHandlers.rotateX,
    'rotate-y': transformHandlers.rotateY,
    'rotate-z': transformHandlers.rotateZ,
    'translate': transformEffectsHandlers.translate,
    'translate-x': transformEffectsHandlers.translateX,
    'translate-y': transformEffectsHandlers.translateY,
    'translate-z': transformHandlers.translateZ,
    'skew': transformHandlers.skew,
    'skew-x': transformHandlers.skewX,
    'skew-y': transformHandlers.skewY,
    'transform-origin': transformHandlers.transformOrigin,
    'transform-style': transformHandlers.transformStyle,
    'perspective': transformHandlers.perspective,
    'perspective-origin': transformHandlers.perspectiveOrigin,

    // Grid
    'grid-display': gridHandlers.gridDisplay,
    'grid-cols': gridHandlers.gridCols,
    'grid-rows': gridHandlers.gridRows,
    'grid-gap': gridHandlers.gridGap,
    'grid-col-gap': gridHandlers.gridColGap,
    'grid-row-gap': gridHandlers.gridRowGap,
    'col-span': gridHandlers.colSpan,
    'row-span': gridHandlers.rowSpan,
    'col-start': gridHandlers.colStart,
    'col-end': gridHandlers.colEnd,
    'row-start': gridHandlers.rowStart,
    'row-end': gridHandlers.rowEnd,
    'grid-flow': gridHandlers.gridFlow,
    'grid-auto-cols': gridHandlers.gridAutoCols,
    'grid-auto-rows': gridHandlers.gridAutoRows,
    'grid-areas': gridHandlers.gridAreas,
    'grid-area': gridHandlers.gridArea,

    // Pointer Events
    'pointer-events': pointerEventsHandlers.pointerEvents,

    // Transitions
    'transition': transitionHandlers.transition,

    // Animations
    'float': animationHandlers.float,
    'slide-up': animationHandlers.slideUp,

    // Glassmorphism
    'glassmorphism': glassmorphismHandlers.glassmorphism,

    // CSS Literal
    'css_literal': cssLiteralHandlers.cssLiteral,
    'css_nested_literal': cssLiteralHandlers.cssNestedLiteral,
  }
  registerRule2(utilityDefs, 'utilities')

  // Components will be registered separately to avoid circular dependencies
  // Use registerComponentsAsRule2() from the main entry point if needed
}