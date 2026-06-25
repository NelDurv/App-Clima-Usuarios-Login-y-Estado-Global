<template>
  <div class="bg-secondary py-4 min-vh-100">
    <div class="container">
      <header class="py-3 text-center text-white">
        <h1 class="display-5">Clima en Ciudades de Chile</h1>
        <p class="lead">Datos actualizados desde Open-Meteo</p>

        <div class="row justify-content-center mt-3 g-2">
          <div class="col-md-4 col-12">
            <div class="input-group">
              <span class="input-group-text bg-white"><i class="fas fa-search"></i></span>
              <input
                type="text"
                class="form-control"
                placeholder="Buscar ciudad..."
                v-model="searchTerm"
              />
            </div>
          </div>
          <div class="col-md-3 col-6">
            <button class="btn btn-light w-100" @click="toggleUnit">
              <i class="fas fa-thermometer-half me-1"></i>
              Cambiar a {{ unitSymbol === '°C' ? '°F' : '°C' }}
            </button>
          </div>
          <div class="col-md-4 col-6">
            <button class="btn btn-danger w-100" @click="mostrarAlertaCultivos">
              <i class="fas fa-leaf me-1"></i> Peligro para Cultivos
            </button>
          </div>
        </div>
        
        <div class="mt-2">
          <span class="badge" :class="apiConnected ? 'bg-success' : 'bg-warning'">
            {{ apiConnected ? '🌐 Conectado a Open-Meteo' : '📀 Usando datos locales' }}
          </span>
          <span v-if="isAuthenticated" class="badge bg-info ms-2">
            <i class="fas fa-user-check"></i> {{ userName }}
          </span>
        </div>
      </header>

      <div v-if="loadingCities" class="text-center py-5">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="text-white mt-3">Cargando clima de ciudades...</p>
      </div>

      <div v-else class="grid-container">
        <WeatherCard
          v-for="clima in filteredClimas"
          :key="clima.nombre"
          :clima="clima"
          :convertTemp="convertTemp"
          :unitSymbol="unitSymbol"
        />
        <div v-if="filteredClimas.length === 0" class="text-center text-white w-100 py-5">
          <i class="fas fa-city fa-3x mb-3"></i>
          <h4>No se encontraron ciudades con "{{ searchTerm }}"</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useWeather } from '../composables/useWeather'
import { useUnit } from '../composables/useUnit'
import WeatherCard from '../components/weather/WeatherCard.vue'

const store = useStore()
const { fetchCurrentWeather } = useWeather()
const { unitSymbol, toggleUnit, convertTemp } = useUnit()

const isAuthenticated = computed(() => store.state.auth.isAuthenticated)
const userName = computed(() => store.getters['auth/getUserName'])

const ciudades = [
  'Arica', 'Antofagasta', 'Iquique', 'La Serena', 'Valparaíso',
  'Santiago', 'Rancagua', 'Concepción', 'Temuco', 'Puerto Montt'
]

const climas = ref([])
const loadingCities = ref(true)
const apiConnected = ref(true)
const searchTerm = ref('')
const ciudadesEnPeligro = ref([])

const filteredClimas = computed(() => {
  if (!searchTerm.value) return climas.value
  return climas.value.filter(c => c.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()))
})

const mostrarAlertaCultivos = () => {
  const peligro = climas.value
    .filter(c => c.temperatura - 5 < 2)
    .map(c => ({ nombre: c.nombre, tempMin: c.temperatura - 5 }))
  
  ciudadesEnPeligro.value = peligro
  alert(peligro.length 
    ? `Ciudades en riesgo: ${peligro.map(c => `${c.nombre} (${c.tempMin}°C)`).join(', ')}`
    : 'No hay peligro para cultivos.')
}

onMounted(async () => {
  loadingCities.value = true
  const resultados = []
  for (const nombre of ciudades) {
    const clima = await fetchCurrentWeather({ nombre })
    resultados.push(clima)
    if (!clima.esReal) apiConnected.value = false
  }
  climas.value = resultados
  loadingCities.value = false
})
</script>