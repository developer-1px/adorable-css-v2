interface UtilityItem {
  property: string;
  syntax: string[];
}

interface CategoryData {
  [subcategory: string]: UtilityItem[];
}

export interface ReferenceData {
  [category: string]: CategoryData;
}

export const referenceData: ReferenceData = {
  '레이아웃 (Layout)': {
    'Display': [
      {property: 'display', syntax: ['block', 'inline-block', 'inline', 'none']},
      {property: 'flexbox', syntax: ['hbox', 'vbox']},
      {property: 'grid', syntax: ['grid']}
    ],
    'Flexbox': [
      {property: 'flex-wrap', syntax: ['wrap', 'nowrap']},
      {property: 'hbox-alignment', syntax: ['hbox(top)', 'hbox(bottom)', 'hbox(fill)', 'hbox(right)', 'hbox(reverse)']},
      {property: 'hbox-combined', syntax: ['hbox(top+right)', 'hbox(bottom+right)', 'hbox(fill+reverse+left)']},
      {
        property: 'vbox-alignment',
        syntax: ['vbox(top)', 'vbox(bottom)', 'vbox(fill)', 'vbox(left)', 'vbox(right)', 'vbox(reverse)']
      },
      {property: 'center-alignment', syntax: ['pack', 'vpack']},
      {property: 'justify-content(TBD)', syntax: ['hbox(between)', 'vbox(around)', 'hbox(evenly)']},
    ],
    'Grid': [
      {property: 'grid-template', syntax: ['grid-cols(3)', 'grid-rows(2)']},
      {property: 'grid-span', syntax: ['col-span(2)', 'row-span(3)']},
      {property: 'grid-position', syntax: ['col-start(2)', 'row-end(4)']}
    ],
    'Position': [
      {property: 'position', syntax: ['static', 'relative', 'absolute', 'fixed', 'sticky']},
      {property: 'coordinates', syntax: ['(0,0)', '(..0,..0)', '(10..20, 30..40)']},
      {property: 'layer', syntax: ['layer', 'layer(top)', 'layer(right)', 'layer(bottom+left)']}
    ],
    'Spacing': [
      {property: 'padding', syntax: ['p(16)', 'pt(16)', 'pr(16)', 'pb(16)', 'pl(16)', 'px(16)', 'py(16)']},
      {property: 'margin', syntax: ['m(16)', 'mt(16)', 'mx(auto)']},
      {property: 'gap', syntax: ['gap(16)', 'gap(16/24)', 'gap(auto)']}
    ]
  },
  '크기 및 제한 (Size & Constraints)': {
    'Width': [
      {property: 'width', syntax: ['w(300)', 'w(fill)', 'w(hug)', 'w(auto)']}
    ],
    'Height': [
      {property: 'height', syntax: ['h(200)', 'h(fill)', 'h(hug)', 'h(screen)']}
    ],
    'Size': [
      {property: 'size', syntax: ['300x200']}
    ],
    'Min/Max Size': [
      {property: 'constraints', syntax: ['w(300..)', 'h(..600)', 'w(300..600)']}
    ],
    'Aspect Ratio': [
      {property: 'aspect-ratio', syntax: ['16:9', '1:1', '4:3']}
    ]
  },
  '시각적 속성 (Visuals)': {
    'Background': [
      {property: 'background-color', syntax: ['bg(#fff)', 'bg(#000.5)', 'bg(transparent)']},
      {property: 'background-gradient', syntax: ['bg(linear/45deg/#f00/#00f)', 'bg(radial/circle/#f00/#00f)']},
      {property: 'background-image', syntax: ['bg-image(url)']}
    ],
    'Border': [
      {property: 'border', syntax: ['b(1/#000/solid)', 'bt(1/#000)', 'bx(1/#000)']}
    ],
    'Radius': [
      {property: 'border-radius', syntax: ['r(8)', 'r(8/0)', 'r(8/0/16/0)', 'r()']}
    ],
    'Shadow': [
      {property: 'box-shadow', syntax: ['shadow(md)', 'shadow(lg)', 'shadow(0/4/16/#000.1)', 'shadow(inner/...)']}
    ],
    'Opacity': [
      {property: 'opacity', syntax: ['opacity(.5)']}
    ],
    'Filters': [
      {
        property: 'filter',
        syntax: ['blur(4)', 'brightness(.8)', 'contrast(1.2)', 'grayscale', 'sepia', 'saturate(1.5)']
      }
    ],
    'Blend Mode': [
      {property: 'blend-mode', syntax: ['mix-blend(multiply)', 'bg-blend(screen)']}
    ]
  },
  '타이포그래피 (Typography)': {
    'Font': [
      {property: 'font-family', syntax: ['font(Inter)']},
      {property: 'font-size', syntax: ['font(16)', 'font(1rem)']},
      {property: 'font-weight', syntax: ['font(bold)', 'font(500)']},
      {property: 'font-combined', syntax: ['font(16/24)', 'font(16/24/-2%)', 'font(Inter/16/24/-2%/500)']}
    ],
    'Color': [
      {property: 'color', syntax: ['c(#000)', 'c(#000.5)']}
    ],
    'Alignment': [
      {property: 'text-align', syntax: ['text(left)', 'text(center)', 'text(right)']}
    ],
    'Decoration': [
      {property: 'text-decoration', syntax: ['underline', 'strike', 'no-underline']}
    ],
    'Transform': [
      {property: 'text-transform', syntax: ['uppercase', 'lowercase', 'capitalize']}
    ],
    'Style': [
      {property: 'font-style', syntax: ['italic', 'not-italic']}
    ],
    'Whitespace': [
      {property: 'white-space', syntax: ['nowrap', 'pre', 'pre-wrap']}
    ],
    'Overflow': [
      {property: 'text-overflow', syntax: ['truncate', 'max-lines(3)']}
    ],
    'Word Break': [
      {property: 'word-break', syntax: ['break(all)', 'break(word)']}
    ],
    'List Style': [
      {property: 'list-style', syntax: ['list(disc)', 'list(decimal)', 'list(none)']}
    ]
  },
  '인터랙션 제어 (Interaction Control)': {
    'Cursor': [
      {property: 'cursor', syntax: ['cursor(pointer)', 'cursor(not-allowed)']}
    ],
    'Pointer Events': [
      {property: 'pointer-events', syntax: ['pointer(none)', 'pointer(auto)']}
    ],
    'User Select': [
      {property: 'user-select', syntax: ['select(none)', 'select(text)', 'select(all)']}
    ],
    'Resize': [
      {property: 'resize', syntax: ['resize', 'resize(x)', 'resize(y)', 'resize-none']}
    ],
    'Appearance': [
      {property: 'appearance', syntax: ['appearance(none)']}
    ],
    'Inert': [
      {property: 'inert', syntax: ['inert']}
    ]
  },
  '상태, 전환, 애니메이션 (States, Transitions & Animations)': {
    'State': [
      {property: 'hover-states', syntax: ['hover:bg(blue)', 'active:scale(.98)']},
      {property: 'focus-states', syntax: ['focus:b(blue)', 'disabled:opacity(.5)']},
      {property: 'checked-states', syntax: ['checked:bg(blue)', 'first:r(0)', 'last:r(0)']},
      {property: 'group-states', syntax: ['group-hover:c(#fff)', 'peer-checked:b(blue)']}
    ],
    'Responsive': [
      {property: 'responsive', syntax: ['sm:vbox', 'md:p(32)', 'lg:hbox']}
    ],
    'Dark Mode': [
      {property: 'dark-mode', syntax: ['.dark:bg(#000)']}
    ],
    'Transition': [
      {property: 'transition', syntax: ['transition', 'transition(colors)']},
      {property: 'transition-timing', syntax: ['duration(300)', 'delay(100)', 'ease(in-out)', 'ease(linear)']}
    ],
    'Animation': [
      {property: 'animation', syntax: ['animate(spin)', 'animate(ping)']}
    ],
    'Transform': [
      {property: 'transform', syntax: ['scale(1.1)', 'rotate(45)', 'translate(10/20)', 'skew(x/12)', 'skew(y/12)']},
      {property: 'transform-origin', syntax: ['origin(center)', 'origin(top+left)']}
    ]
  },
  '고급 및 유틸리티 (Advanced & Utilities)': {
    'Stacking': [
      {property: 'z-index', syntax: ['z(0)', 'z(10)', 'z(auto)', 'z(top)']}
    ],
    'Scroll': [
      {property: 'overflow', syntax: ['scroll', 'scroll(x)', 'scroll(y)', 'clip']},
      {property: 'scrollbar', syntax: ['scrollbar(none)', 'scrollbar(thin)']},
      {property: 'scroll-behavior', syntax: ['scroll(smooth)']},
      {property: 'scroll-snap', syntax: ['snap', 'snap(x)', 'snap-item']}
    ],
    'Accessibility': [
      {property: 'screen-reader', syntax: ['sr-only']}
    ],
    'SVG': [
      {property: 'svg', syntax: ['fill(currentColor)', 'stroke(1/#fff)']}
    ],
    'Object Fit': [
      {property: 'object-fit', syntax: ['object(cover)', 'object(contain)']},
      {property: 'object-position', syntax: ['object(top)', 'object(center)']}
    ]
  }
}