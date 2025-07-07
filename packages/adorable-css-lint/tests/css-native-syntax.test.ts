import { RuleTester } from 'eslint';
import { cssNativeSyntax } from '../src/rules/css-native-syntax';

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

describe('css-native-syntax rule', () => {
  ruleTester.run('css-native-syntax', cssNativeSyntax, {
    valid: [
      // 올바른 CSS 네이티브 문법
      {
        code: '<div className="scale(1.05)">Content</div>'
      },
      {
        code: '<div className="opacity(0.8)">Content</div>'
      },
      {
        code: '<div className="rotate(45deg)">Content</div>'
      },
      {
        code: '<div className="scale(0.95) opacity(0.5)">Content</div>'
      },
      // 이미 올바른 값들
      {
        code: '<div className="scale(1.2) rotate(90deg)">Content</div>'
      }
    ],

    invalid: [
      // 백분율 scale 값
      {
        code: '<div className="scale(105)">Content</div>',
        errors: [
          {
            messageId: 'invalidScale',
            data: {
              value: '105',
              fix: '1.05'
            }
          }
        ],
        output: '<div className="scale(1.05)">Content</div>'
      },
      {
        code: '<div className="scale(95)">Content</div>',
        errors: [
          {
            messageId: 'invalidScale',
            data: {
              value: '95',
              fix: '0.95'
            }
          }
        ],
        output: '<div className="scale(0.95)">Content</div>'
      },
      
      // 백분율 opacity 값
      {
        code: '<div className="opacity(80)">Content</div>',
        errors: [
          {
            messageId: 'invalidOpacity',
            data: {
              value: '80',
              fix: '0.8'
            }
          }
        ],
        output: '<div className="opacity(0.8)">Content</div>'
      },
      {
        code: '<div className="opacity(50)">Content</div>',
        errors: [
          {
            messageId: 'invalidOpacity',
            data: {
              value: '50',
              fix: '0.5'
            }
          }
        ],
        output: '<div className="opacity(0.5)">Content</div>'
      },
      
      // 단위 없는 rotate 값
      {
        code: '<div className="rotate(45)">Content</div>',
        errors: [
          {
            messageId: 'invalidRotate',
            data: {
              value: '45',
              fix: '45deg'
            }
          }
        ],
        output: '<div className="rotate(45deg)">Content</div>'
      },
      {
        code: '<div className="rotate(180)">Content</div>',
        errors: [
          {
            messageId: 'invalidRotate',
            data: {
              value: '180',
              fix: '180deg'
            }
          }
        ],
        output: '<div className="rotate(180deg)">Content</div>'
      },
      
      // 하이픈 transform 문법
      {
        code: '<div className="scale-105">Content</div>',
        errors: [
          {
            messageId: 'invalidTransform',
            data: {
              fix: 'scale(1.05)'
            }
          }
        ],
        output: '<div className="scale(1.05)">Content</div>'
      },
      {
        code: '<div className="rotate-45">Content</div>',
        errors: [
          {
            messageId: 'invalidTransform',
            data: {
              fix: 'rotate(45deg)'
            }
          }
        ],
        output: '<div className="rotate(45deg)">Content</div>'
      },
      
      // 복합 오류
      {
        code: '<div className="scale(110) opacity(70) rotate(90)">Content</div>',
        errors: [
          {
            messageId: 'invalidScale',
            data: {
              value: '110',
              fix: '1.1'
            }
          },
          {
            messageId: 'invalidOpacity',
            data: {
              value: '70',
              fix: '0.7'
            }
          },
          {
            messageId: 'invalidRotate',
            data: {
              value: '90',
              fix: '90deg'
            }
          }
        ],
        output: '<div className="scale(1.1) opacity(0.7) rotate(90deg)">Content</div>'
      }
    ]
  });
});