import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],   // Habilita soporte para archivos .vue
  test: {
    environment: 'jsdom', // Simula el navegador en las pruebas
    globals: true         // Permite usar describe/it sin importar
  }
})