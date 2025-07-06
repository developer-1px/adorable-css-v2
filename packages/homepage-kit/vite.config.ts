import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [
		sveltekit({
			// Enable experimental inspector
			experimental: {
				inspector: true
			}
		}),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	],
	ssr: {
		noExternal: ['@docs/config']
	},
	define: {
		global: 'globalThis'
	},
	resolve: {
		alias: {
			'adorable-css': path.resolve(__dirname, '../adorable-css/src'),
			'adorable-css-cdn': path.resolve(__dirname, '../adorable-css-cdn/src'),
			'@': path.resolve(__dirname, './src'),
			'@docs': path.resolve(__dirname, '../../docs')
		}
	},
	// Enable debug mode
	logLevel: 'info',
	server: {
		// Enable HMR debug
		hmr: {
			overlay: true
		}
	},
	test: {
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					environment: 'browser',
					browser: {
						enabled: true,
						provider: 'playwright',
						instances: [{ browser: 'chromium' }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
