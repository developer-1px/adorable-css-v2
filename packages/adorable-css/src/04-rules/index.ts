/**
 * Rule2 System - Performance optimized rule handlers
 * 
 * Rule2 handlers receive AST directly and return CSS strings
 * This eliminates unnecessary string/object conversions
 */

export * from './rule2-registry';

import { registerRule2 } from './rule2-registry';

// Import handlers
import * as paddingHandlers from './figma/layout/padding';
import * as marginHandlers from './misc-css/margin';
import * as sizeHandlers from './figma/layout/size';
import * as displayHandlers from './misc-css/display';
import * as positionHandlers from './figma/layout/position';
import * as overflowHandlers from './figma/layout/overflow';
import * as gridHandlers from './figma/layout/grid';
import { colorHandlers } from './figma/fill/color';
import * as backgroundHandlers from './figma/fill/background';
import * as fontHandlers from './figma/text/font';
import * as textHandlers from './figma/text/text';
import * as truncateHandlers from './figma/text/truncate';
import * as borderHandlers from './figma/style/border';
import * as effectsHandlers from './figma/style/effects';
import * as transformHandlers from './figma/style/transform';
import * as trackingHandlers from './figma/text/tracking';
import * as leadingHandlers from './figma/text/leading';
// import * as borderSidesHandlers from './figma/style/border-sides'; // Deprecated
import * as transformEffectsHandlers from './figma/effects/transform';
import * as whitespaceHandlers from './figma/text/whitespace';
import * as flexboxHandlers from './misc-css/flexbox';
import * as pointerEventsHandlers from './misc-css/pointer-events';
import * as transitionHandlers from './misc-css/transition';
import * as animationHandlers from './misc-css/animation';
import * as glassmorphismHandlers from './figma/effects/glassmorphism';
import { registerComponentsAsRule2 } from '../05-components/register-components';

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
    wrap: flexboxHandlers.wrap,
    
    // Size compositions
    size: sizeHandlers.size,  // width + height
    
    // Typography compositions  
    font: fontHandlers.font,  // font-size + line-height + letter-spacing
    truncate: truncateHandlers.truncate,  // overflow + text-overflow + white-space
  };
  registerRule2(compositionDefs, 'composition');
  
  // All utilities
  const utilityDefs = {
    // Gap
    gap: flexboxHandlers.gap,
    'gap-x': flexboxHandlers.gapX,
    'gap-y': flexboxHandlers.gapY,
    
    // Padding
    p: paddingHandlers.p,
    pt: paddingHandlers.pt,
    pr: paddingHandlers.pr,
    pb: paddingHandlers.pb,
    pl: paddingHandlers.pl,
    px: paddingHandlers.px,
    py: paddingHandlers.py,
    
    // Margin
    m: marginHandlers.m,
    mt: marginHandlers.mt,
    mr: marginHandlers.mr,
    mb: marginHandlers.mb,
    ml: marginHandlers.ml,
    mx: marginHandlers.mx,
    my: marginHandlers.my,
    
    // Size
    w: sizeHandlers.w,
    h: sizeHandlers.h,
    'min-w': sizeHandlers.minW,
    'max-w': sizeHandlers.maxW,
    'min-h': sizeHandlers.minH,
    'max-h': sizeHandlers.maxH,
    
    // Color
    c: colorHandlers.c,
    
    // Font
    bold: fontHandlers.bold,
    italic: fontHandlers.italic,
    
    // Text
    text: textHandlers.text,
    underline: textHandlers.underline,
    overline: textHandlers.overline,
    strike: textHandlers.strike,
    uppercase: textHandlers.uppercase,
    lowercase: textHandlers.lowercase,
    capitalize: textHandlers.capitalize,
    tracking: trackingHandlers.tracking,
    leading: leadingHandlers.leading,
    whitespace: whitespaceHandlers.whitespace,
    
    // Border
    border: borderHandlers.border,
    b: borderHandlers.b,
    r: borderHandlers.r,
    bt: borderHandlers.bt,
    br: borderHandlers.br,
    bb: borderHandlers.bb,
    bl: borderHandlers.bl,
    
    // Flexbox
    flex: flexboxHandlers.flex,
    'inline-flex': flexboxHandlers.inlineFlex,
    'flex-row': flexboxHandlers.flexRow,
    'flex-row-reverse': flexboxHandlers.flexRowReverse,
    'flex-col': flexboxHandlers.flexCol,
    'flex-col-reverse': flexboxHandlers.flexColReverse,
    'flex-wrap': flexboxHandlers.flexWrap,
    'flex-no-wrap': flexboxHandlers.flexNoWrap,
    'flex-wrap-reverse': flexboxHandlers.flexWrapReverse,
    items: flexboxHandlers.items,
    justify: flexboxHandlers.justify,
    content: flexboxHandlers.content,
    self: flexboxHandlers.self,
    grow: flexboxHandlers.grow,
    shrink: flexboxHandlers.shrink,
    basis: flexboxHandlers.basis,
    order: flexboxHandlers.order,
    
    // Effects
    opacity: effectsHandlers.opacity,
    blur: effectsHandlers.blur,
    brightness: effectsHandlers.brightness,
    contrast: effectsHandlers.contrast,
    saturate: effectsHandlers.saturate,
    sepia: effectsHandlers.sepia,
    grayscale: effectsHandlers.grayscale,
    'hue-rotate': effectsHandlers.hueRotate,
    invert: effectsHandlers.invert,
    backdrop: effectsHandlers.backdrop,
    shadow: effectsHandlers.shadow,
    elevation: effectsHandlers.elevation,
    
    // Display
    block: displayHandlers.block,
    inline: displayHandlers.inline,
    'inline-block': displayHandlers.inlineBlock,
    none: displayHandlers.none,
    hidden: displayHandlers.hidden,
    grid: displayHandlers.grid,
    'inline-grid': displayHandlers.inlineGrid,
    contents: flexboxHandlers.contents,
    'table-display': displayHandlers.tableDisplay,
    'table-cell': displayHandlers.tableCell,
    'table-row': displayHandlers.tableRow,
    
    // Position
    absolute: positionHandlers.absolute,
    relative: positionHandlers.relative,
    fixed: positionHandlers.fixed,
    sticky: positionHandlers.sticky,
    static: positionHandlers.static_,
    x: positionHandlers.x,
    y: positionHandlers.y,
    top: positionHandlers.top,
    right: positionHandlers.right,
    bottom: positionHandlers.bottom,
    left: positionHandlers.left,
    inset: positionHandlers.inset,
    'inset-x': positionHandlers.insetX,
    'inset-y': positionHandlers.insetY,
    z: positionHandlers.z,
    layer: positionHandlers.layer,
    position: positionHandlers.position,
    '__positionType': positionHandlers.__positionType,
    
    // Overflow
    overflow: overflowHandlers.overflow,
    'overflow-x': overflowHandlers.overflowX,
    'overflow-y': overflowHandlers.overflowY,
    clip: overflowHandlers.clip,
    scrollable: overflowHandlers.scrollable,
    'scroll-x': overflowHandlers.scrollX,
    'scroll-y': overflowHandlers.scrollY,
    
    // Background
    bg: backgroundHandlers.bg,
    'bg-color': backgroundHandlers.bgColor,
    'bg-image': backgroundHandlers.bgImage,
    'bg-size': backgroundHandlers.bgSize,
    'bg-position': backgroundHandlers.bgPosition,
    'bg-repeat': backgroundHandlers.bgRepeat,
    'bg-attachment': backgroundHandlers.bgAttachment,
    
    // Transform
    transform: transformHandlers.transform,
    scale: transformEffectsHandlers.scale,
    'scale-x': transformHandlers.scaleX,
    'scale-y': transformHandlers.scaleY,
    rotate: transformEffectsHandlers.rotate,
    'rotate-x': transformHandlers.rotateX,
    'rotate-y': transformHandlers.rotateY,
    'rotate-z': transformHandlers.rotateZ,
    translate: transformEffectsHandlers.translate,
    'translate-x': transformEffectsHandlers.translateX,
    'translate-y': transformEffectsHandlers.translateY,
    'translate-z': transformHandlers.translateZ,
    skew: transformHandlers.skew,
    'skew-x': transformHandlers.skewX,
    'skew-y': transformHandlers.skewY,
    'transform-origin': transformHandlers.transformOrigin,
    'transform-style': transformHandlers.transformStyle,
    perspective: transformHandlers.perspective,
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
    transition: transitionHandlers.transition,
    
    // Animations
    float: animationHandlers.float,
    'slide-up': animationHandlers.slideUp,
    
    // Glassmorphism
    glassmorphism: glassmorphismHandlers.glassmorphism,
  };
  registerRule2(utilityDefs, 'utilities');
  
  // Register all components as Rule2 handlers
  registerComponentsAsRule2();
}