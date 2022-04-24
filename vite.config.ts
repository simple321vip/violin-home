import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression';

// https://vitejs.cn/guide/env-and-mode.html#env-files
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  return {
    plugins: [
      vue(),
      // this is a gzip plugin to generate the .js.gz file
      viteCompression()
    ],
    base: env.VITE_RES_URL
  }
})
