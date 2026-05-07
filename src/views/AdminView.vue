<template>
  <div class="min-h-screen bg-indigo-50">

    <nav class="bg-indigo-600 text-white px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div class="flex items-center gap-2 font-bold text-lg">
        <span>⚡</span>
        <span>Panel de Administración</span>
      </div>
      <div class="flex items-center gap-4">
        <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
          👑 {{ authStore.userName }}
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
          Bienvenido, <span class="text-indigo-600">{{ authStore.userName }}</span>
        </h1>
        <p class="text-gray-500 mt-1">Tienes acceso completo al sistema como Administrador</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div v-for="stat in stats" :key="stat.id"
             class="bg-white rounded-xl p-5 flex items-center gap-4 border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition">
          <span class="text-3xl">{{ stat.icon }}</span>
          <div>
            <div class="text-xl font-bold text-indigo-600">{{ stat.value }}</div>
            <div class="text-xs text-gray-500">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 class="font-bold text-gray-800 mb-4">👥 Gestión de Usuarios</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
            <tr class="text-left text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
              <th class="pb-3 px-2">ID</th>
              <th class="pb-3 px-2">Nombre</th>
              <th class="pb-3 px-2">Usuario</th>
              <th class="pb-3 px-2">Rol</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id"
                class="border-b border-gray-50 hover:bg-gray-50 transition last:border-0">
              <td class="py-3 px-2 text-gray-400">#{{ user.id }}</td>
              <td class="py-3 px-2 font-medium">{{ user.name }}</td>
              <td class="py-3 px-2"><code class="bg-gray-100 px-2 py-0.5 rounded text-xs">{{ user.username }}</code></td>
              <td class="py-3 px-2">
                  <span :class="user.role === 'admin'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-sky-100 text-sky-700'"
                        class="px-2 py-0.5 rounded-full text-xs font-semibold">
                    {{ user.role === 'admin' ? '👑 Admin' : '👤 Usuario' }}
                  </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
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

const stats = ref([
  { id: 1, icon: '👥', label: 'Usuarios registrados', value: '2' },
  { id: 2, icon: '🔑', label: 'Roles activos',         value: '2' },
  { id: 3, icon: '✅', label: 'Sesiones hoy',          value: '1' },
  { id: 4, icon: '🛡️', label: 'Nivel de acceso',       value: 'Total' }
])

const users = ref([
  { id: 1, name: 'Carlos Admin',  username: 'admin',   role: 'admin' },
  { id: 2, name: 'María Usuario', username: 'usuario', role: 'user'  }
])

function handleLogout() {
  authStore.logout()
  router.push({ name: 'Login' })
}
</script>