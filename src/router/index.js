import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'

// Vistas públicas
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'

// Vistas de autenticación
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'

// Vistas protegidas
import FavoritesView from '../views/protected/FavoritesView.vue'
import PreferencesView from '../views/protected/PreferencesView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/lugar/:nombre',
        name: 'detail',
        component: DetailView,
        props: true
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { guest: true }
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
        meta: { guest: true }
    },
    {
        path: '/favoritos',
        name: 'favorites',
        component: FavoritesView,
        meta: { requiresAuth: true }
    },
    {
        path: '/preferencias',
        name: 'preferences',
        component: PreferencesView,
        meta: { requiresAuth: true }
    }
]

// ✅ Crear la instancia del router
const router = createRouter({
    history: createWebHistory(),
    routes
})

// ✅ Navigation Guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.state.auth.isAuthenticated

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'login', query: { redirect: to.fullPath } })
        return
    }

    if (to.meta.guest && isAuthenticated) {
        next({ name: 'home' })
        return
    }

    next()
})

// ✅ EXPORTACIÓN POR DEFECTO - ¡ESTA LÍNEA ES LA QUE FALTA!
export default router