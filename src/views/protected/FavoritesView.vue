<template>
  <div class="container py-4">
    <div class="favorites-header">
      <h1><i class="fas fa-heart text-terracota"></i> Mis Lugares Favoritos</h1>
      <p>Gestiona tus ciudades favoritas para acceder rápidamente</p>
    </div>
    
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
    
    <div v-else-if="favorites.length === 0" class="empty-state">
      <i class="fas fa-heart-broken fa-4x mb-3"></i>
      <h3>No tienes lugares favoritos</h3>
      <p>Explora las ciudades y agrega tus favoritas</p>
      <router-link to="/" class="btn btn-primary">
        <i class="fas fa-search"></i> Explorar Ciudades
      </router-link>
    </div>
    
    <div v-else class="favorites-grid">
      <div
        v-for="city in favoriteCitiesData"
        :key="city.nombre"
        class="favorite-card"
        @click="goToCity(city.nombre)"
      >
        <div class="favorite-card-content d-flex justify-content-between align-items-start">
          <div class="city-info">
            <h3>{{ city.nombre }}</h3>
            <p class="temp">{{ convertTemp(city.temperatura) }}{{ unitSymbol }}</p>
            <p class="weather-type">
              <i :class="['fas', getIconoClima(city.tipoClima)]"></i>
              {{ capitalizar(city.tipoClima) }}
            </p>
          </div>
          <button class="btn-remove-favorite" @click.stop="removeFavorite(city.nombre)">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useWeather, capitalizar, getIconoByTipo } from '@/composables/useWeather'
import { useUnit } from '@/composables/useUnit'

const router = useRouter()
const store = useStore()
const { fetchCurrentWeather } = useWeather()
const { convertTemp, unitSymbol } = useUnit()

const loading = ref(true)
const favoriteCitiesData = ref([])
const favorites = computed(() => store.getters['auth/getFavoriteCities'])

const loadFavoriteCities = async () => {
  loading.value = true
  const citiesData = []
  for (const cityName of favorites.value) {
    const weather = await fetchCurrentWeather({ nombre: cityName })
    citiesData.push(weather)
  }
  favoriteCitiesData.value = citiesData
  loading.value = false
}

const removeFavorite = (cityName) => {
  store.dispatch('auth/removeFavorite', cityName)
  favoriteCitiesData.value = favoriteCitiesData.value.filter(c => c.nombre !== cityName)
}

const goToCity = (cityName) => {
  router.push(`/lugar/${encodeURIComponent(cityName)}`)
}

const getIconoClima = (tipo) => getIconoByTipo(tipo)

onMounted(() => {
  loadFavoriteCities()
})
</script>