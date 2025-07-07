import { RuleTester } from 'eslint';
import { noMargin } from '../src/rules/no-margin';

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

describe('no-margin rule', () => {
  ruleTester.run('no-margin', noMargin, {
    valid: [
      // 올바른 gap 기반 레이아웃
      {
        code: '<div className="vbox gap(lg)">Content</div>'
      },
      {
        code: '<div className="hbox gap(md) p(xl)">Content</div>'
      },
      {
        code: '<div className="w(fill) h(auto)">Content</div>'
      },
      // 허용된 margin (옵션 설정 시)
      {
        code: '<div className="mx(auto)">Content</div>',
        options: [{ allowedMargins: ['mx(auto)'] }]
      }
    ],

    invalid: [
      // margin 사용 오류들
      {
        code: '<div className="mb(lg)">Content</div>',
        errors: [
          {
            messageId: 'noMargin',
            data: {
              className: 'mb(lg)',
              suggestion: 'vbox gap()으로 부모에서 관리'
            }
          }
        ]
      },
      {
        code: '<div className="mt(xl) p(md)">Content</div>',
        errors: [
          {
            messageId: 'noMargin',
            data: {
              className: 'mt(xl)',
              suggestion: 'vbox gap()으로 부모에서 관리'
            }
          }
        ]
      },
      {
        code: '<div className="mx(auto) my(lg)">Content</div>',
        errors: [
          {
            messageId: 'noMargin',
            data: {
              className: 'mx(auto)',
              suggestion: 'hbox(pack) 또는 w(fit) mx(auto)'
            }
          },
          {
            messageId: 'noMargin',
            data: {
              className: 'my(lg)',
              suggestion: 'vbox gap()'
            }
          }
        ]
      },
      // 다양한 margin 변형들
      {
        code: '<button className="m(sm) bg(blue-500)">Click</button>',
        errors: [
          {
            messageId: 'noMargin',
            data: {
              className: 'm(sm)',
              suggestion: 'vbox gap() 또는 hbox gap()'
            }
          }
        ]
      },
      {
        code: '<span className="ml(md) mr(lg)">Text</span>',
        errors: [
          {
            messageId: 'noMargin',
            data: {
              className: 'ml(md)',
              suggestion: 'hbox gap()으로 부모에서 관리'
            }
          },
          {
            messageId: 'noMargin',
            data: {
              className: 'mr(lg)',
              suggestion: 'hbox gap()으로 부모에서 관리'
            }
          }
        ]
      }
    ]
  });
});