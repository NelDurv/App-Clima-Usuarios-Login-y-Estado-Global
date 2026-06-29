<template>
  <div class="container py-4">
    <div class="preferences-header">
      <h1><i class="fas fa-cog text-verde"></i> Mis Preferencias</h1>
      <p>Personaliza tu experiencia en la aplicación</p>
    </div>
    
    <div class="preferences-grid">
      <div class="preference-card">
        <div class="preference-icon"><i class="fas fa-thermometer-half"></i></div>
        <div class="preference-content">
          <h3>Unidad de Temperatura</h3>
          <p>Selecciona tu unidad de temperatura preferida</p>
          <div class="btn-group w-100" role="group">
            <button class="btn" :class="unit === 'C' ? 'btn-primary' : 'btn-outline-primary'" @click="setUnit('C')">
              <i class="fas fa-temperature-low"></i> °C
            </button>
            <button class="btn" :class="unit === 'F' ? 'btn-primary' : 'btn-outline-primary'" @click="setUnit('F')">
              <i class="fas fa-temperature-high"></i> °F
            </button>
          </div>
        </div>
      </div>
      
      <div class="preference-card">
        <div class="preference-icon"><i class="fas fa-palette"></i></div>
        <div class="preference-content">
          <h3>Tema de la Aplicación</h3>
          <p>Elige entre tema claro u oscuro</p>
          <div class="btn-group w-100" role="group">
            <button class="btn" :class="theme === 'light' ? 'btn-primary' : 'btn-outline-primary'" @click="setTheme('light')">
              <i class="fas fa-sun"></i> Claro
            </button>
            <button class="btn" :class="theme === 'dark' ? 'btn-primary' : 'btn-outline-primary'" @click="setTheme('dark')">
              <i class="fas fa-moon"></i> Oscuro
            </button>
          </div>
        </div>
      </div>
      
      <div class="preference-card user-info">
        <div class="preference-icon"><i class="fas fa-user-circle"></i></div>
        <div class="preference-content">
          <h3>Información de Usuario</h3>
          <div class="user-details">
            <div class="detail-item"><span class="label">Nombre:</span><span class="value">{{ user.name }}</span></div>
            <div class="detail-item"><span class="label">Email:</span><span class="value">{{ user.email }}</span></div>
            <div class="detail-item"><span class="label">Favoritos:</span><span class="value">{{ favorites.length }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const user = computed(() => store.state.auth.user || {})
const unit = computed(() => store.getters['user/getUnit'] || 'C')
const theme = computed(() => store.getters['user/getTheme'] || 'light')
const favorites = computed(() => store.getters['auth/getFavoriteCities'])

const setUnit = (newUnit) => {
  store.dispatch('user/setUnit', newUnit)
  store.dispatch('auth/updateUser', { preferences: { unit: newUnit } })
}

const setTheme = (newTheme) => {
  store.dispatch('user/setTheme', newTheme)
  store.dispatch('auth/updateUser', { preferences: { theme: newTheme } })
  document.body.classList.toggle('dark-theme', newTheme === 'dark')
}
</script>