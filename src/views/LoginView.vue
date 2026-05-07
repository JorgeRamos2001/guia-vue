<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-600 to-purple-700 p-4">
    <div class="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">

      <div class="text-center mb-8">
        <div class="text-5xl mb-3">🔐</div>
        <h1 class="text-2xl font-bold text-gray-800">Iniciar Sesión</h1>
        <p class="text-gray-500 text-sm mt-1">Ingresa tus credenciales para continuar</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">

        <div class="flex flex-col gap-1">
          <label class="text-sm font-semibold text-gray-700">Usuario</label>
          <input
              v-model="form.username"
              type="text"
              placeholder="Ingresa tu usuario"
              :class="['w-full px-4 py-3 border-2 rounded-md outline-none transition',
              errors.username ? 'border-red-500' : 'border-gray-200 focus:border-indigo-500']"
          />
          <span v-if="errors.username" class="text-red-500 text-xs">{{ errors.username }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-semibold text-gray-700">Contraseña</label>
          <div class="relative">
            <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Ingresa tu contraseña"
                :class="['w-full px-4 py-3 pr-12 border-2 rounded-md outline-none transition',
                errors.password ? 'border-red-500' : 'border-gray-200 focus:border-indigo-500']"
            />
            <button type="button" @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-lg">
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
          <span v-if="errors.password" class="text-red-500 text-xs">{{ errors.password }}</span>
        </div>

        <div v-if="loginError" class="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-md">
          ⚠️ {{ loginError }}
        </div>

        <button type="submit" :disabled="isLoading"
                class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-md flex items-center justify-center gap-2 transition mt-2">
          <span v-if="isLoading" class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
          {{ isLoading ? 'Verificando...' : 'Ingresar' }}
        </button>
      </form>

      <div class="mt-6 p-4 bg-gray-50 border border-dashed border-gray-200 rounded-md text-sm">
        <p class="text-gray-500 mb-3 font-semibold">🧪 Credenciales de prueba:</p>
        <div class="grid grid-cols-2 gap-2">
          <div @click="fillCredentials('admin', 'admin123')"
               class="bg-white border border-gray-200 rounded-md p-2 cursor-pointer hover:border-indigo-400 transition flex flex-col gap-1">
            <span class="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full w-fit">Admin</span>
            <code class="text-xs text-gray-500">admin / admin123</code>
          </div>
          <div @click="fillCredentials('usuario', 'usuario123')"
               class="bg-white border border-gray-200 rounded-md p-2 cursor-pointer hover:border-sky-400 transition flex flex-col gap-1">
            <span class="text-xs font-bold bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full w-fit">Usuario</span>
            <code class="text-xs text-gray-500">usuario / usuario123</code>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth.js'

const router    = useRouter()
const authStore = useAuthStore()

const isLoading    = ref(false)
const loginError   = ref('')
const showPassword = ref(false)

const form   = reactive({ username: '', password: '' })
const errors = reactive({ username: '', password: '' })

function validateForm() {
  errors.username = ''
  errors.password = ''
  let isValid = true
  if (!form.username.trim()) {
    errors.username = 'El usuario es requerido'
    isValid = false
  }
  if (form.password.length < 6) {
    errors.password = 'Mínimo 6 caracteres'
    isValid = false
  }
  return isValid
}

async function handleLogin() {
  if (!validateForm()) return
  isLoading.value = true
  loginError.value = ''
  await new Promise(resolve => setTimeout(resolve, 200))
  const result = authStore.login(form.username, form.password)
  isLoading.value = false
  if (result.success) {
    router.push({ name: result.role === 'admin' ? 'Admin' : 'User' })
  } else {
    loginError.value = result.message
  }
}

function fillCredentials(username, password) {
  form.username = username
  form.password = password
  loginError.value = ''
}
</script>