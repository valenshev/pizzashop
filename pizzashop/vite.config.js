// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [],
  
  css: {
    preprocessorOptions: {
      scss: {
        // Глобальные переменные/миксины для всех SCSS файлов
        additionalData: `
        //   @import "@/styles/_variables.scss";
        //   @import "@/styles/_mixins.scss";
        //   @import "@/styles/_functions.scss";
        `,
        
        // Использование современного API компилятора
        api: 'modern-compiler',
        
      },
    },
    
    // Включение sourcemaps для CSS в дев-режиме
    devSourcemap: true,
    
    // Настройки для CSS модулей
    modules: {
      localsConvention: 'camelCase',
    },
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  
  // Дополнительно: оптимизация для production
  build: {
    cssCodeSplit: true, // Разделение CSS по чанкам
    sourcemap: false,   // Отключение sourcemap в продакшене
    minify: 'esbuild',  // Минификация CSS
    rollupOptions: {
      output: {
        assetFileNames: 'assets/css/[name].[hash].[ext]',
      },
    },
  },
})