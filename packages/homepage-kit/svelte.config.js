import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// GitHub Pages를 위한 설정
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		alias: {
			'@docs': path.resolve('../../docs')
		},
		paths: {
			base: process.env.NODE_ENV === 'production' ? '' : ''
		},
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn',
			handleEntryGeneratorMismatch: 'warn',
			entries: ['*']
		}
	},
	extensions: ['.svelte']
};

export default config;
