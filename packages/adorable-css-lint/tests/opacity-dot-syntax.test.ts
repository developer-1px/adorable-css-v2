import { RuleTester } from 'eslint';
import { opacityDotSyntax } from '../src/rules/opacity-dot-syntax';

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
});

describe('opacity-dot-syntax rule', () => {
  ruleTester.run('opacity-dot-syntax', opacityDotSyntax, {
    valid: [
      // 올바른 점 표기법
      {
        code: '<div className="bg(white.5)">Content</div>'
      },
      {
        code: '<div className="c(black.8)">Content</div>'
      },
      {
        code: '<div className="border(red.3)">Content</div>'
      },
      {
        code: '<div className="bg(blue-500.2) c(white.9)">Content</div>'
      },
      // 투명도가 없는 일반 색상
      {
        code: '<div className="bg(white) c(black)">Content</div>'
      },
      {
        code: '<div className="bg(blue-500)">Content</div>'
      }
    ],

    invalid: [
      // 슬래시 표기법을 점 표기법으로 변경
      {
        code: '<div className="bg(white/50)">Content</div>',
        errors: [
          {
            messageId: 'useSlashSyntax',
            data: {
              property: 'bg',
              fix: 'bg(white.0.5)'
            }
          }
        ],
        output: '<div className="bg(white.0.5)">Content</div>'
      },
      {
        code: '<div className="c(black/80)">Content</div>',
        errors: [
          {
            messageId: 'useSlashSyntax',
            data: {
              property: 'c',
              fix: 'c(black.0.8)'
            }
          }
        ],
        output: '<div className="c(black.0.8)">Content</div>'
      },
      {
        code: '<div className="border(red/30)">Content</div>',
        errors: [
          {
            messageId: 'useSlashSyntax',
            data: {
              property: 'border',
              fix: 'border(red.0.3)'
            }
          }
        ],
        output: '<div className="border(red.0.3)">Content</div>'
      },
      
      // 복합 오류
      {
        code: '<div className="bg(blue-500/60) c(white/90)">Content</div>',
        errors: [
          {
            messageId: 'useSlashSyntax',
            data: {
              property: 'bg',
              fix: 'bg(blue-500.0.6)'
            }
          },
          {
            messageId: 'useSlashSyntax',
            data: {
              property: 'c',
              fix: 'c(white.0.9)'
            }
          }
        ],
        output: '<div className="bg(blue-500.0.6) c(white.0.9)">Content</div>'
      },
      
      // 다양한 속성들
      {
        code: '<div className="shadow(black/20)">Content</div>',
        errors: [
          {
            messageId: 'useSlashSyntax',
            data: {
              property: 'shadow',
              fix: 'shadow(black.0.2)'
            }
          }
        ],
        output: '<div className="shadow(black.0.2)">Content</div>'
      },
      {
        code: '<div className="bt(gray-300/40) bl(blue-500/70)">Content</div>',
        errors: [
          {
            messageId: 'useSlashSyntax',
            data: {
              property: 'bt',
              fix: 'bt(gray-300.0.4)'
            }
          },
          {
            messageId: 'useSlashSyntax',
            data: {
              property: 'bl',
              fix: 'bl(blue-500.0.7)'
            }
          }
        ],
        output: '<div className="bt(gray-300.0.4) bl(blue-500.0.7)">Content</div>'
      },
      
      // 잘못된 투명도 범위
      {
        code: '<div className="bg(white.150)">Content</div>',
        errors: [
          {
            messageId: 'invalidOpacityRange',
            data: {
              value: '150'
            }
          }
        ]
      },
      {
        code: '<div className="c(black/-10)">Content</div>',
        errors: [
          {
            messageId: 'invalidOpacityRange',
            data: {
              value: '-10'
            }
          }
        ]
      }
    ]
  });
});