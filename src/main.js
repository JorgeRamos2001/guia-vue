import { createApp } from 'vue'       // Función principal de Vue 3
import { createPinia } from 'pinia'   // Manejador de estado global
import App from './App.vue'
import router from './router/index.js'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia()) // Registra Pinia para el estado global
app.use(router)        // Registra Vue Router para la navegación
app.mount('#app')      // Conecta Vue al div#app del HTML