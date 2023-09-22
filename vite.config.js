import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const stylePlugin = (options = {}) => {
  const virtualModuleId = 'virtual:style-module'
  const resolvedVirtualModuleId = '\0' + virtualModuleId
  return {
    name: 'style-plugin', // 必须的，将会在 warning 和 error 中显示
    resolveId (id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load (id) {
      let result = ''
      if (id === resolvedVirtualModuleId) {
        const filterStyle = 'import \'@ER/theme/filter/index.scss\''
        const messageStyle = 'import \'element-plus/es/components/message/style/css\''
        if (options.mode === 'development') {
          result = messageStyle + '\n' + filterStyle
        } else {
          if (options.FORMATS === 'with-element-plus') {
            result = messageStyle + '\n' + filterStyle
          }
          if (options.FORMATS === 'without-element-plus') {
            result = filterStyle
          }
        }
        return result
      }
    }
  }
}
export default defineConfig(({ command, mode }) => {
  const FORMATS = process.env.FORMATS
  const config = {
    test: {
      environment: 'jsdom',
      clearMocks: true,
      setupFiles: ['./vitest.setup.js'],
      transformMode: {
        web: [/\.[jt]sx$/]
      },
      deps: {
        inline: ['element-plus']
      }
    },
    base: './',
    define: {
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      'import.meta.env.FORMATS': FORMATS
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
        },
        {
          find: '@ER-server',
          replacement: resolve(__dirname, 'server')
        }
      ]
    },
    plugins: [
      vue(),
      eslintPlugin(),
      vueJsx({
      }),
      stylePlugin({
        mode,
        FORMATS
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
  }
  if (command === 'serve') {
    config.plugins.push(
      Components({
        resolvers: [ElementPlusResolver()]
      })
    )
  }
  if (command === 'build') {
    const buildConfig = {
      emptyOutDir: false,
      lib: {
        entry: resolve(__dirname, 'packages/filter/index.js'),
        name: 'EverrightFilter',
        formats: ['es', 'umd', 'iife'],
        fileName: `EverrightFilter-${FORMATS}`
      },
      rollupOptions: {
        external: ['vue', 'lodash-es'],
        output: {
          globals: {
            vue: 'Vue',
            'lodash-es': '_'
          },
          assetFileNames: `EverrightFilter-${FORMATS}.css`
        }
      }
    }
    if (FORMATS === 'without-element-plus') {
      buildConfig.rollupOptions.external.push('element-plus')
      buildConfig.rollupOptions.output.globals['element-plus'] = 'ElementPlus'
    }
    if (FORMATS === 'with-element-plus') {
      config.plugins.push(
        Components({
          resolvers: [ElementPlusResolver()]
        })
      )
    }
    config.build = buildConfig
  }
  return config
})
