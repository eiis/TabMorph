import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: ['index.html'],
      output:{
        entryFileNames: '[name].js',
      }
    }
  }
})
