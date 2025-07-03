import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import matter from 'gray-matter';

// markdown-it 인스턴스 생성
const md = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
	breaks: true,
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(str, { language: lang }).value;
			} catch (__) {}
		}
		return ''; // 언어가 없으면 하이라이팅 없이
	}
});

// 커스텀 렌더러 규칙들

// 코드 블록
md.renderer.rules.fence = (tokens, idx) => {
	const token = tokens[idx];
	const lang = token.info || 'text';
	const content = token.content;

	const highlighted =
		lang && hljs.getLanguage(lang)
			? hljs.highlight(content, { language: lang }).value
			: hljs.highlightAuto(content).value;

	return `
  <pre><code class="hljs language-${lang}">${highlighted}</code></pre>
`;
};

// 링크
md.renderer.rules.link_open = (tokens, idx) => {
	const href = tokens[idx].attrGet('href');
	const title = tokens[idx].attrGet('title');
	return `<a href="${href}" ${title ? `title="${title}"` : ''} class="c(primary) underline decoration(primary-200) hover:decoration(primary) transition(all/150ms)">`;
};

// 리스트
md.renderer.rules.bullet_list_open = () => {
	return '<ul class="list(disc) pl(xl) my(lg)">';
};

md.renderer.rules.ordered_list_open = (tokens, idx) => {
	const start = tokens[idx].attrGet('start');
	return `<ol class="list(decimal) pl(xl) my(lg)"${start ? ` start="${start}"` : ''}>`;
};

// 테이블
md.renderer.rules.table_open = () => {
	return '<div class="overflow(auto) my(xl)"><table class="w(full) r(lg) border(1/neutral-200)">';
};

md.renderer.rules.table_close = () => {
	return '</table></div>';
};

md.renderer.rules.tr_open = () => {
	return '<tr class="hover:bg(neutral-50) transition(colors/150ms)">';
};

md.renderer.rules.th_open = () => {
	return '<th class="bg(neutral-100) px(md) py(sm) text(left) font(semi) c(gray-900) border-b(2/neutral-200)">';
};

md.renderer.rules.td_open = () => {
	return '<td class="px(md) py(sm) border-b(1/neutral-100)">';
};

// 인용구
md.renderer.rules.blockquote_open = () => {
	return '<blockquote class="border-l(4/neutral-300) pl(lg) my(xl) italic c(neutral-700)">';
};

// 인라인 코드
md.renderer.rules.code_inline = (tokens, idx) => {
	const content = tokens[idx].content;
	return `<code class="bg(neutral-50) c(primary-700) px(xs) py(0.5) r(sm) border(1/neutral-200) font(mono) text(sm)">${md.utils.escapeHtml(content)}</code>`;
};

/**
 * markdown-it을 사용한 마크다운 프로세서
 */
export async function processMarkdownIt(content) {
	try {
		// Frontmatter 추출
		const { data: frontmatter, content: mdContent } = matter(content);

		// markdown-it으로 변환
		const html = md.render(mdContent);

		// Highlight.js CSS
		const css = `
      /* Highlight.js Light Theme inspired by GitHub */
      .hljs { background: rgb(249 250 251); color: #24292e; }
      .hljs-comment, .hljs-quote { color: #6a737d; }
      .hljs-keyword, .hljs-selector-tag, .hljs-literal { color: #d73a49; }
      .hljs-string { color: #032f62; }
      .hljs-number { color: #005cc5; }
      .hljs-variable, .hljs-template-variable, .hljs-attr { color: #e36209; }
      .hljs-name, .hljs-selector-class, .hljs-selector-id { color: #22863a; }
      .hljs-title, .hljs-function { color: #6f42c1; }
      .hljs-built_in { color: #005cc5; }
      .hljs-params { color: #24292e; }
      .hljs-meta { color: #005cc5; }
      .hljs-emphasis { font-style: italic; }
      .hljs-strong { font-weight: bold; }
      .hljs-deletion { color: #b31d28; background-color: #ffeef0; }
      .hljs-addition { color: #22863a; background-color: #f0fff4; }
      
      /* Code blocks */
      pre { 
        background-color: rgb(249 250 251);
        border: 1px solid rgb(229 231 235);
      }
      
      /* Copy button */
      .copy-btn {
        background-color: rgb(243 244 246);
        border: 1px solid rgb(209 213 219);
        color: rgb(55 65 81);
      }
      .copy-btn:hover {
        background-color: rgb(229 231 235);
      }
    `;

		return {
			code: html,
			frontmatter,
			css
		};
	} catch (error) {
		console.error('markdown-it 처리 오류:', error);
		throw error;
	}
}
