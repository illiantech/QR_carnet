import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve } from 'path';

export default defineConfig({
	publicDir: '../public',
	base: './',
	plugins: [
		createHtmlPlugin({
			minify: true
		})
	],
	root: 'src',
	build: {
		outDir: '../dist',
		emptyOutDir: true,
		target: 'es2015',
		rollupOptions: {
			input: {
				index: resolve(__dirname, './src/index.html')
			}
		}
	},
	css: {
		postcss: {
			plugins: [autoprefixer()]
		}
	}
});
