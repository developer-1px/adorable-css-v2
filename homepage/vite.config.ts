import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      'adorable-css': path.resolve(__dirname, '../packages/adorable-css-core/src'),
      'adorable-css-cdn': path.resolve(__dirname, '../packages/adorable-css-cdn/src')
    }
  }
})
