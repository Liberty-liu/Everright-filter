import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'
export default defineConfig({
  base: './',
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/filter/index.js'),
      name: 'Everright-filter',
      formats: ['es', 'umd'],
      fileName: 'Everright-filter'
    },
    rollupOptions: {
      external: ['vue', 'element-plus'],
      // https://rollupjs.org/guide/en/#big-list-of-options
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'elementPlus'
        }
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@ER',
        replacement: resolve(__dirname, 'packages')
      },
      {
        find: '@ER-examples',
        replacement: resolve(__dirname, 'examples')
      }
    ]
  },
  plugins: [
    vue(),
    eslintPlugin(),
    vueJsx({
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use 'sass:math';
        @use 'sass:map';
        @use '@ER/theme/base.scss' as *;
        `
      }
    }
  }
})
