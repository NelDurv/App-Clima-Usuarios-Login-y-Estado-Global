import { useWeather } from '../../composables/useWeather'

const state = {
    cities: [
        'Arica', 'Antofagasta', 'Iquique', 'La Serena', 'Valparaíso',
        'Santiago', 'Rancagua', 'Concepción', 'Temuco', 'Puerto Montt'
    ],
    currentWeather: {},
    forecast: {},
    loading: false,
    error: null
}

const getters = {
    getCities: state => state.cities,
    getCurrentWeather: state => state.currentWeather,
    getForecast: state => state.forecast,
    isLoading: state => state.loading
}

const mutations = {
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_ERROR(state, error) {
        state.error = error
    },
    SET_CURRENT_WEATHER(state, data) {
        state.currentWeather = data
    },
    SET_FORECAST(state, data) {
        state.forecast = data
    }
}

const actions = {
    async fetchCurrentWeather({ commit }, cityName) {
        commit('SET_LOADING', true)
        try {
            const { fetchCurrentWeather } = useWeather()
            const result = await fetchCurrentWeather({ nombre: cityName })
            commit('SET_CURRENT_WEATHER', result)
            commit('SET_LOADING', false)
            return result
        } catch (error) {
            commit('SET_ERROR', error.message)
            commit('SET_LOADING', false)
            return null
        }
    },

    async fetchForecast({ commit }, cityName) {
        commit('SET_LOADING', true)
        try {
            const { fetchForecast } = useWeather()
            const result = await fetchForecast(cityName)
            commit('SET_FORECAST', result)
            commit('SET_LOADING', false)
            return result
        } catch (error) {
            commit('SET_ERROR', error.message)
            commit('SET_LOADING', false)
            return null
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}