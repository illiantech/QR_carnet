import autoprefixer from 'autoprefixer'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

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
    outDir: '../docs',
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
})
