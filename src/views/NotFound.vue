<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center p-8">
      <div class="text-9xl font-black text-indigo-600 leading-none mb-4">404</div>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">Página no encontrada</h1>
      <p class="text-gray-500 mb-8">La ruta no existe o no tienes permisos de acceso.</p>
      <router-link to="/login"
                   class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md transition">
        Volver al Inicio
      </router-link>
    </div>
  </div>
</template>