const state = {
    preferences: {
        unit: 'C',
        theme: 'light'
    },
    favorites: []
}

const getters = {
    getUserPreferences: state => state.preferences,
    getFavoriteCities: state => state.favorites,
    getUnit: state => state.preferences.unit,
    getTheme: state => state.preferences.theme,
    isFavorite: (state) => (city) => state.favorites.includes(city)
}

const mutations = {
    SET_PREFERENCES(state, preferences) {
        state.preferences = { ...state.preferences, ...preferences }
    },
    SET_FAVORITES(state, favorites) {
        state.favorites = favorites
    },
    ADD_FAVORITE(state, city) {
        if (!state.favorites.includes(city)) {
            state.favorites.push(city)
        }
    },
    REMOVE_FAVORITE(state, city) {
        state.favorites = state.favorites.filter(c => c !== city)
    },
    SET_UNIT(state, unit) {
        state.preferences.unit = unit
    },
    SET_THEME(state, theme) {
        state.preferences.theme = theme
    }
}

const actions = {
    updatePreferences({ commit }, preferences) {
        commit('SET_PREFERENCES', preferences)
    },

    toggleUnit({ commit, state }) {
        const newUnit = state.preferences.unit === 'C' ? 'F' : 'C'
        commit('SET_UNIT', newUnit)
        return newUnit
    },

    toggleTheme({ commit, state }) {
        const newTheme = state.preferences.theme === 'light' ? 'dark' : 'light'
        commit('SET_THEME', newTheme)
        return newTheme
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