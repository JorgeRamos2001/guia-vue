
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth.js'
import LoginView  from '../views/LoginView.vue'
import AdminView  from '../views/AdminView.vue'
import UserView   from '../views/UserView.vue'
import NotFound   from '../views/NotFound.vue'

// Cada objeto es una ruta de la aplicación
const routes = [
    { path: '/', redirect: '/login' },
    {
        path: '/login', name: 'Login', component: LoginView,
        meta: { requiresGuest: true }  // Solo accesible sin sesión
    },
    {
        path: '/admin', name: 'Admin', component: AdminView,
        meta: { requiresAuth: true, role: 'admin' }
    },
    {
        path: '/usuario', name: 'User', component: UserView,
        meta: { requiresAuth: true, role: 'user' }
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
    history: createWebHistory(), // URLs limpias sin #
    routes
})

// Guard global: se ejecuta ANTES de cada cambio de ruta
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    // Ruta protegida y no está logueado → va al login
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next({ name: 'Login' })
    }

    // Logueado pero con rol incorrecto → va a su panel
    if (to.meta.role && authStore.userRole !== to.meta.role) {
        const dest = authStore.isAdmin ? 'Admin' : 'User'
        return next({ name: dest })
    }

    // Ya logueado intenta ir al login → va a su panel
    if (to.meta.requiresGuest && authStore.isAuthenticated) {
        const dest = authStore.isAdmin ? 'Admin' : 'User'
        return next({ name: dest })
    }

    next() // Todo correcto, permite la navegación
})

export default router