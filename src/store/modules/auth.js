const state = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
}

const getters = {
    currentUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
    getUserName: state => state.user?.name || 'Invitado',
    getUserEmail: state => state.user?.email || '',
    getUserPreferences: state => state.user?.preferences || { unit: 'C', theme: 'light' },
    getFavoriteCities: state => state.user?.favorites || []
}

const mutations = {
    SET_USER(state, user) {
        state.user = user
    },
    SET_TOKEN(state, token) {
        state.token = token
        localStorage.setItem('auth_token', token)
    },
    SET_AUTH_STATUS(state, status) {
        state.isAuthenticated = status
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_ERROR(state, error) {
        state.error = error
    },
    CLEAR_AUTH(state) {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
    },
    UPDATE_USER(state, userData) {
        state.user = { ...state.user, ...userData }
        localStorage.setItem('user_data', JSON.stringify(state.user))
    },
    ADD_FAVORITE(state, city) {
        if (state.user && !state.user.favorites.includes(city)) {
            state.user.favorites.push(city)
            localStorage.setItem('user_data', JSON.stringify(state.user))
        }
    },
    REMOVE_FAVORITE(state, city) {
        if (state.user) {
            state.user.favorites = state.user.favorites.filter(c => c !== city)
            localStorage.setItem('user_data', JSON.stringify(state.user))
        }
    }
}

const actions = {
    async login({ commit }, credentials) {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        try {
            const mockApi = await import('@/services/mockApi').then(m => m.default)
            const response = await mockApi.login(credentials)

            if (response.success) {
                commit('SET_USER', response.user)
                commit('SET_TOKEN', response.token)
                commit('SET_AUTH_STATUS', true)
                commit('SET_LOADING', false)

                localStorage.setItem('user_data', JSON.stringify(response.user))

                return { success: true, user: response.user }
            } else {
                commit('SET_ERROR', response.message || 'Credenciales incorrectas')
                commit('SET_LOADING', false)
                return { success: false, error: response.message }
            }
        } catch (error) {
            commit('SET_ERROR', 'Error al iniciar sesión')
            commit('SET_LOADING', false)
            return { success: false, error: error.message }
        }
    },

    async register({ commit }, userData) {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        try {
            const mockApi = await import('@/services/mockApi').then(m => m.default)
            const response = await mockApi.register(userData)

            if (response.success) {
                commit('SET_USER', response.user)
                commit('SET_TOKEN', response.token)
                commit('SET_AUTH_STATUS', true)
                commit('SET_LOADING', false)

                localStorage.setItem('user_data', JSON.stringify(response.user))

                return { success: true, user: response.user }
            } else {
                commit('SET_ERROR', response.message || 'Error en el registro')
                commit('SET_LOADING', false)
                return { success: false, error: response.message }
            }
        } catch (error) {
            commit('SET_ERROR', 'Error al registrar usuario')
            commit('SET_LOADING', false)
            return { success: false, error: error.message }
        }
    },

    async logout({ commit }) {
        try {
            commit('CLEAR_AUTH')
            return { success: true }
        } catch (error) {
            return { success: false, error: error.message }
        }
    },

    initializeAuth({ commit }) {
        const token = localStorage.getItem('auth_token')
        const userData = localStorage.getItem('user_data')

        if (token && userData) {
            try {
                const user = JSON.parse(userData)
                commit('SET_USER', user)
                commit('SET_TOKEN', token)
                commit('SET_AUTH_STATUS', true)
                return { success: true }
            } catch (error) {
                commit('CLEAR_AUTH')
                return { success: false }
            }
        }
        return { success: false }
    },

    updateUser({ commit }, userData) {
        commit('UPDATE_USER', userData)
    },

    addFavorite({ commit }, city) {
        commit('ADD_FAVORITE', city)
    },

    removeFavorite({ commit }, city) {
        commit('REMOVE_FAVORITE', city)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
