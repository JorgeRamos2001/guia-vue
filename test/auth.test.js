import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../src/store/auth.js'

describe('Auth Store', () => {

    // beforeEach crea un Pinia limpio antes de cada prueba
    // para que no se "contaminen" entre sí
    beforeEach(() => {
        setActivePinia(createPinia())
        localStorage.clear()
    })

    it('debe iniciar sin usuario autenticado', () => {
        const store = useAuthStore()
        expect(store.isAuthenticated).toBe(false)
        expect(store.user).toBeNull()
    })

    it('debe autenticar correctamente al admin', () => {
        const store = useAuthStore()
        const result = store.login('admin', 'admin123')
        expect(result.success).toBe(true)
        expect(result.role).toBe('admin')
        expect(store.isAdmin).toBe(true)
        expect(store.userName).toBe('Carlos Admin')
    })

    it('debe autenticar correctamente al usuario', () => {
        const store = useAuthStore()
        const result = store.login('usuario', 'usuario123')
        expect(result.success).toBe(true)
        expect(result.role).toBe('user')
        expect(store.isAdmin).toBe(false)
    })

    it('debe rechazar credenciales incorrectas', () => {
        const store = useAuthStore()
        const result = store.login('admin', 'clave-mal')
        expect(result.success).toBe(false)
        expect(store.isAuthenticated).toBe(false)
    })

    it('debe rechazar usuarios inexistentes', () => {
        const store = useAuthStore()
        const result = store.login('noexiste', '123456')
        expect(result.success).toBe(false)
    })

    it('debe cerrar sesión correctamente', () => {
        const store = useAuthStore()
        store.login('admin', 'admin123')
        store.logout()
        expect(store.isAuthenticated).toBe(false)
        expect(store.user).toBeNull()
        expect(localStorage.getItem('user')).toBeNull()
    })

    it('debe guardar la sesión en localStorage', () => {
        const store = useAuthStore()
        store.login('admin', 'admin123')
        const saved = JSON.parse(localStorage.getItem('user'))
        expect(saved.role).toBe('admin')
        expect(saved.password).toBeUndefined() // Sin contraseña
    })

    it('isAdmin debe ser false para rol user', () => {
        const store = useAuthStore()
        store.login('usuario', 'usuario123')
        expect(store.isAdmin).toBe(false)
    })
})