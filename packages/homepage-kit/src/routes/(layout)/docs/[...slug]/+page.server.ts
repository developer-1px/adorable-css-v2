import { error } from '@sveltejs/kit';
import { readFile } from 'fs/promises';
import { join, resolve } from 'path';
import { docsConfig } from '@docs/config';
import { processMarkdownIt } from '$lib/mdx/markdown-it-processor.js';
import type { EntryGenerator } from '../../../../../.svelte-kit/types/src/routes';

export const entries: EntryGenerator = () => {
  // Generate entries for all docs pages from docsConfig
  return docsConfig.flatMap(section => 
    section.items.map(item => {
      // Extract slug from href (remove /docs/ prefix)
      const slug = item.href.replace('/docs/', '');
      // For [...slug] route, we need to return the slug as a string
      return { slug };
    })
  );
};

export const prerender = true;

export async function load({ params }) {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : (params.slug || 'introduction');
  const href = `/docs/${slug}`;
  
  // 문서 설정에서 찾기
  const docItem = docsConfig
    .flatMap(section => section.items)
    .find(item => item.href === href);
    
  if (!docItem) {
    throw error(404, '문서를 찾을 수 없습니다');
  }
  
  // 소스 파일이 있으면 읽기
  if (docItem.source) {
    try {
      const monorepoRoot = resolve(process.cwd(), '../..');
      const filePath = docItem.source.startsWith('/')
        ? join(monorepoRoot, docItem.source)
        : resolve(process.cwd(), docItem.source);
      
      const content = await readFile(filePath, 'utf-8');
      
      // markdown-it으로 처리
      const result = await processMarkdownIt(content);
      
      return {
        title: result.frontmatter?.title || docItem.title,
        description: result.frontmatter?.description || docItem.description,
        code: result.code,
        frontmatter: result.frontmatter,
        css: result.css
      };
      
    } catch (err) {
      console.error(`파일 읽기 오류 ${docItem.source}:`, err);
      const message = err instanceof Error ? err.message : '알 수 없는 오류';
      throw error(500, `문서 로드 실패: ${message}`);
    }
  }
  
  // 소스 파일이 없으면 기본 정보 반환
  return {
    title: docItem.title,
    description: docItem.description,
    code: `<h1>${docItem.title}</h1><p>${docItem.description || '준비 중입니다...'}</p>`,
    frontmatter: {},
    css: null
  };
}