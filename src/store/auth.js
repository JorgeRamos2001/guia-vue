import { defineStore } from 'pinia'

// Usuarios simulados (en producción vendrían de una API)
const USERS = [
    { id: 1, username: 'admin',   password: 'admin123',
        role: 'admin', name: 'Carlos Admin' },
    { id: 2, username: 'usuario', password: 'usuario123',
        role: 'user',  name: 'María Usuario' }
]

export const useAuthStore = defineStore('auth', {

    // state: datos reactivos accesibles desde cualquier componente
    state: () => ({
        // Intenta recuperar la sesión guardada en localStorage
        user: JSON.parse(localStorage.getItem('user')) || null,
        isAuthenticated: !!localStorage.getItem('user')
    }),

    // getters: propiedades calculadas (como computed)
    getters: {
        userRole: (state) => state.user?.role || null,
        userName: (state) => state.user?.name || '',
        isAdmin:  (state) => state.user?.role === 'admin'
    },

    // actions: funciones que modifican el state
    actions: {
        login(username, password) {
            const found = USERS.find(
                u => u.username === username && u.password === password
            )
            if (found) {
                // Guardamos el usuario SIN la contraseña por seguridad
                const userData = { id: found.id, username: found.username,
                    role: found.role, name: found.name }
                this.user = userData
                this.isAuthenticated = true
                localStorage.setItem('user', JSON.stringify(userData))
                return { success: true, role: found.role }
            }
            return { success: false, message: 'Credenciales incorrectas' }
        },

        logout() {
            this.user = null
            this.isAuthenticated = false
            localStorage.removeItem('user')
        }
    }
})