<template>
  <div class="container py-4">
    <div class="favorites-header">
      <h1>
        <i class="fas fa-heart text-danger"></i> Mis Lugares Favoritos
      </h1>
      <p class="text-muted">Gestiona tus ciudades favoritas para acceder rápidamente</p>
    </div>
    
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3">Cargando tus ciudades favoritas...</p>
    </div>
    
    <div v-else-if="favorites.length === 0" class="empty-state">
      <i class="fas fa-heart-broken fa-4x text-muted mb-3"></i>
      <h3>No tienes lugares favoritos</h3>
      <p>Explora las ciudades y agrega tus favoritas para acceder rápidamente</p>
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
        <div class="favorite-card-content">
          <div class="city-info">
            <h3>{{ city.nombre }}</h3>
            <p class="temp">
              {{ convertTemp(city.temperatura) }}{{ unitSymbol }}
            </p>
            <p class="weather-type">
              <i :class="['fas', getIconoClima(city.tipoClima)]"></i>
              {{ capitalizar(city.tipoClima) }}
            </p>
          </div>
          <button
            class="btn-remove-favorite"
            @click.stop="removeFavorite(city.nombre)"
            title="Eliminar de favoritos"
          >
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

const getIconoClima = (tipo) => {
  return getIconoByTipo(tipo)
}

onMounted(() => {
  loadFavoriteCities()
})
</script>

<style scoped>
.favorites-header {
  margin-bottom: 2rem;
}

.favorites-header h1 {
  font-size: 2rem;
  color: #2d3748;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: #f7fafc;
  border-radius: 20px;
}

.empty-state h3 {
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #718096;
  margin-bottom: 1.5rem;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.favorite-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.favorite-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.favorite-card-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.city-info h3 {
  margin: 0 0 0.5rem 0;
  color: #2d3748;
}

.city-info .temp {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
  margin: 0.25rem 0;
}

.city-info .weather-type {
  color: #718096;
  margin: 0;
}

.btn-remove-favorite {
  background: none;
  border: none;
  color: #fc8181;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.btn-remove-favorite:hover {
  background: #fed7d7;
  color: #c53030;
}
</style>