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
    getTheme: state => state.preferences.theme
}

const mutations = {
    SET_UNIT(state, unit) {
        state.preferences.unit = unit
    },
    SET_THEME(state, theme) {
        state.preferences.theme = theme
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
    }
}

const actions = {
    setUnit({ commit }, unit) {
        commit('SET_UNIT', unit)
    },
    setTheme({ commit }, theme) {
        commit('SET_THEME', theme)
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