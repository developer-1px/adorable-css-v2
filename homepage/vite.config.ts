import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
      providerImportSource: 'mdx-svelte',
      jsx: true,
      jsxImportSource: 'svelte-jsx',
      format: 'mdx'
    }),
    svelte({ 
      extensions: ['.svelte', '.md', '.mdx'],
      compilerOptions: {
        hydratable: true
      }
    })
  ],
  resolve: {
    alias: {
      'adorable-css': path.resolve(__dirname, '../packages/adorable-css-core/src'),
      'adorable-css-cdn': path.resolve(__dirname, '../packages/adorable-css-cdn/src'),
      '@': path.resolve(__dirname, './src')
    }
  }
})
