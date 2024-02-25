import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { UserConfig, defineConfig } from 'vite'
// https://vitejs.dev/config/

const a: UserConfig = {
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  }
}
export default defineConfig(a)
