<template>
  <div class="city-card" @click="verDetalle">
    <img class="card-bg-img" :src="imagenClima" :alt="clima.nombre" @error="handleImageError">
    <div class="card-overlay"></div>
    <div class="card-body">
      <div>
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
          <div class="temp-range-btn mt-2">
            <span class="temp-max-val"><i class="fas fa-arrow-up"></i> {{ convertTemp(tempMax) }}{{ unitSymbol === '°C' ? '°' : '°F' }}</span>
            <span class="mx-2">|</span>
            <span class="temp-min-val"><i class="fas fa-arrow-down"></i> {{ convertTemp(tempMin) }}{{ unitSymbol === '°C' ? '°' : '°F' }}</span>
          </div>
        </div>
      </div>
      <div class="mt-4 text-center">
        <div class="clase-dia-badge d-inline-block mb-2">
          <i :class="['fas', iconoClima]"></i> {{ capitalizar(clima.tipoClima) }}
        </div>
        <button class="btn-detalle w-100">
          Ver pronóstico 6 días
        </button>
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
  "viento": "/src/assets/img/dia de viento.jpg",
  "tormenta eléctrica": "/src/assets/img/tormenta_electrica.jpg"
}

const iconosClima = {
  "soleado": "fa-sun",
  "parcial despejado": "fa-cloud-sun",
  "nublado": "fa-cloud",
  "lluvioso": "fa-cloud-showers-heavy",
  "viento": "fa-wind",
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

<style scoped>
.city-card {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  color: white;
  min-height: 380px;
  height: 100%;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.city-card:hover {
  transform: translateY(-5px);
}

.card-bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7));
  z-index: 2;
  transition: background 0.3s ease;
}

.city-card:hover .card-overlay {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8));
}

.card-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  z-index: 3;
  padding: 20px;
}

.btn-favorite {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.btn-favorite:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.btn-favorite.is-favorite {
  background: rgba(255, 0, 0, 0.8);
  color: white;
}

.btn-favorite.is-favorite:hover {
  background: rgba(255, 0, 0, 1);
}

.city-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
}

.temp-actual {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
}

.temp-actual small {
  font-size: 1.5rem;
  vertical-align: top;
}

.temp-range-btn {
  background-color: rgba(0, 0, 0, 0.4);
  color: #eeeff3;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 8px 15px;
  font-size: 0.9rem;
  display: inline-block;
  cursor: default;
}

.temp-max-val {
  color: #ff6b6b;
  font-weight: bold;
}

.temp-min-val {
  color: #4ecdc4;
  font-weight: bold;
}

.clase-dia-badge {
  background: rgba(216, 108, 21, 0.3);
  backdrop-filter: blur(5px);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 1rem;
}

.btn-detalle {
  background-color: rgba(255, 255, 255, 0.9);
  color: #333333;
  border: none;
  border-radius: 25px;
  padding: 12px;
  font-weight: bold;
  font-size: 0.95rem;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.btn-detalle:hover {
  background-color: #ffffff;
  transform: scale(1.03) translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
}
</style>