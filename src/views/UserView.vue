<template>
  <div class="min-h-screen bg-sky-50">

    <nav class="bg-sky-600 text-white px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div class="flex items-center gap-2 font-bold text-lg">
        <span>🏠</span>
        <span>Mi Panel</span>
      </div>
      <div class="flex items-center gap-4">
        <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
          👤 {{ authStore.userName }}
        </span>
        <button @click="handleLogout"
                class="bg-white/10 hover:bg-white/25 border border-white/30 px-4 py-1.5 rounded-md text-sm transition">
          Cerrar Sesión
        </button>
      </div>
    </nav>

    <main class="max-w-4xl mx-auto px-6 py-8">

      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800">
          ¡Hola, <span class="text-sky-600">{{ authStore.userName }}</span>!
        </h1>
        <p class="text-gray-500 mt-1">Bienvenido a tu espacio personal</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div v-for="item in quickAccess" :key="item.id"
             class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:-translate-y-1 hover:border-sky-300 hover:shadow-md transition cursor-default">
          <div class="text-4xl mb-3">{{ item.icon }}</div>
          <h3 class="font-bold text-gray-800 mb-1">{{ item.title }}</h3>
          <p class="text-sm text-gray-500">{{ item.description }}</p>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-4">
        <h2 class="font-bold text-gray-800 mb-4">📋 Mi Perfil</h2>
        <div class="divide-y divide-gray-50">
          <div class="flex justify-between items-center py-3">
            <span class="text-sm text-gray-400 font-medium">Nombre completo</span>
            <span class="font-semibold text-sm">{{ authStore.userName }}</span>
          </div>
          <div class="flex justify-between items-center py-3">
            <span class="text-sm text-gray-400 font-medium">Usuario</span>
            <code class="bg-gray-100 px-2 py-0.5 rounded text-xs">{{ authStore.user?.username }}</code>
          </div>
          <div class="flex justify-between items-center py-3">
            <span class="text-sm text-gray-400 font-medium">Rol asignado</span>
            <span class="bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full text-xs font-semibold">👤 Usuario</span>
          </div>
        </div>
      </div>

      <div class="bg-sky-50 border border-sky-200 text-sky-700 text-sm px-4 py-3 rounded-md">
        ℹ️ Tu cuenta tiene acceso estándar. Para solicitar más permisos, contacta al administrador.
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth.js'

const router    = useRouter()
const authStore = useAuthStore()

const quickAccess = ref([
  { id: 1, icon: '📊', title: 'Mi actividad',  description: 'Revisa tu historial reciente en el sistema' },
  { id: 2, icon: '⚙️', title: 'Configuración', description: 'Personaliza las preferencias de tu cuenta' },
  { id: 3, icon: '📩', title: 'Mensajes',       description: 'Tienes 3 mensajes sin leer' }
])

function handleLogout() {
  authStore.logout()
  router.push({ name: 'Login' })
}
</script>