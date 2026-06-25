<template>
  <div class="city-card" @click="verDetalle">
    <img class="card-bg-img" :src="imagenClima" :alt="clima.nombre" @error="handleImageError">
    <div class="card-overlay"></div>
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <div class="city-name">{{ clima.nombre }}</div>
          <div class="small opacity-75">Chile</div>
        </div>
        <button 
          v-if="isAuthenticated" 
          class="btn-favorite"
          :class="{ 'is-favorite': isFavoriteCity }"
          @click.stop="toggleFavorite"
        >
          <i :class="isFavoriteCity ? 'fas fa-heart' : 'far fa-heart'"></i>
        </button>
      </div>
      
      <div class="mt-3">
        <div class="temp-actual">
          {{ convertTemp(clima.temperatura) }}<small>{{ unitSymbol }}</small>
        </div>
        <div class="temp-range-btn mt-2 bg-dark bg-opacity-25 p-2 rounded">
          <span class="text-danger fw-bold">
            <i class="fas fa-arrow-up"></i> {{ convertTemp(tempMax) }}°
          </span>
          <span class="mx-2">|</span>
          <span class="text-info fw-bold">
            <i class="fas fa-arrow-down"></i> {{ convertTemp(tempMin) }}°
          </span>
        </div>
      </div>
      
      <div class="mt-4 text-center">
        <div class="clase-dia-badge d-inline-block mb-2 px-3 py-1 rounded-pill bg-dark bg-opacity-25">
          <i :class="['fas', iconoClima]"></i> {{ capitalizar(clima.tipoClima) }}
        </div>
        <button class="btn-detalle w-100">Ver pronóstico 6 días</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { capitalizar } from '@/composables/useWeather'

const props = defineProps({
  clima: Object,
  convertTemp: Function,
  unitSymbol: String
})

const router = useRouter()
const store = useStore()

const isAuthenticated = computed(() => store.state.auth.isAuthenticated)
const favorites = computed(() => store.getters['auth/getFavoriteCities'] || [])
const isFavoriteCity = computed(() => favorites.value.includes(props.clima.nombre))

const imagenesClima = {
  "soleado": "/src/assets/img/dia soleado.jpg",
  "parcial despejado": "/src/assets/img/parcial_despejado.jpg",
  "nublado": "/src/assets/img/dia-nublado2.jpg",
  "lluvioso": "/src/assets/img/lluvia.jpg",
  "tormenta eléctrica": "/src/assets/img/tormenta_electrica.jpg"
}

const iconosClima = {
  "soleado": "fa-sun",
  "parcial despejado": "fa-cloud-sun",
  "nublado": "fa-cloud",
  "lluvioso": "fa-cloud-showers-heavy",
  "tormenta eléctrica": "fa-bolt"
}

const imagenClima = computed(() => imagenesClima[props.clima.tipoClima] || imagenesClima["parcial despejado"])
const iconoClima = computed(() => iconosClima[props.clima.tipoClima] || "fa-cloud")

const tempMax = computed(() => props.clima.temperatura + Math.floor(Math.random() * 4) + 2)
const tempMin = computed(() => props.clima.temperatura - Math.floor(Math.random() * 5) - 1)

const verDetalle = () => {
  router.push(`/lugar/${encodeURIComponent(props.clima.nombre)}`)
}

const toggleFavorite = (e) => {
  e.stopPropagation()
  if (isFavoriteCity.value) {
    store.dispatch('auth/removeFavorite', props.clima.nombre)
  } else {
    store.dispatch('auth/addFavorite', props.clima.nombre)
  }
}

const handleImageError = (e) => {
  e.target.src = 'https://picsum.photos/id/29/400/300'
}
</script>