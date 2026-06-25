<template>
  <div class="container py-4">
    <div class="preferences-header">
      <h1>
        <i class="fas fa-cog text-primary"></i> Mis Preferencias
      </h1>
      <p class="text-muted">Personaliza tu experiencia en la aplicación</p>
    </div>
    
    <div class="preferences-grid">
      <!-- Unidad de Temperatura -->
      <div class="preference-card">
        <div class="preference-icon">
          <i class="fas fa-thermometer-half"></i>
        </div>
        <div class="preference-content">
          <h3>Unidad de Temperatura</h3>
          <p>Selecciona tu unidad de temperatura preferida</p>
          <div class="btn-group w-100" role="group">
            <button
              type="button"
              class="btn"
              :class="unit === 'C' ? 'btn-primary' : 'btn-outline-primary'"
              @click="setUnit('C')"
            >
              <i class="fas fa-temperature-low"></i> °C (Celsius)
            </button>
            <button
              type="button"
              class="btn"
              :class="unit === 'F' ? 'btn-primary' : 'btn-outline-primary'"
              @click="setUnit('F')"
            >
              <i class="fas fa-temperature-high"></i> °F (Fahrenheit)
            </button>
          </div>
        </div>
      </div>
      
      <!-- Tema -->
      <div class="preference-card">
        <div class="preference-icon">
          <i class="fas fa-palette"></i>
        </div>
        <div class="preference-content">
          <h3>Tema de la Aplicación</h3>
          <p>Elige entre tema claro u oscuro</p>
          <div class="btn-group w-100" role="group">
            <button
              type="button"
              class="btn"
              :class="theme === 'light' ? 'btn-primary' : 'btn-outline-primary'"
              @click="setTheme('light')"
            >
              <i class="fas fa-sun"></i> Claro
            </button>
            <button
              type="button"
              class="btn"
              :class="theme === 'dark' ? 'btn-primary' : 'btn-outline-primary'"
              @click="setTheme('dark')"
            >
              <i class="fas fa-moon"></i> Oscuro
            </button>
          </div>
        </div>
      </div>
      
      <!-- Información de Usuario -->
      <div class="preference-card user-info">
        <div class="preference-icon">
          <i class="fas fa-user-circle"></i>
        </div>
        <div class="preference-content">
          <h3>Información de Usuario</h3>
          <div class="user-details">
            <div class="detail-item">
              <span class="label">Nombre:</span>
              <span class="value">{{ user.name }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Email:</span>
              <span class="value">{{ user.email }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Ciudades Favoritas:</span>
              <span class="value">{{ favorites.length }}</span>
            </div>
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
  
  if (newTheme === 'dark') {
    document.body.classList.add('dark-theme')
  } else {
    document.body.classList.remove('dark-theme')
  }
}
</script>

<style scoped>
.preferences-header {
  margin-bottom: 2rem;
}

.preferences-header h1 {
  font-size: 2rem;
  color: #2d3748;
}

.preferences-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.preference-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.preference-icon {
  font-size: 2rem;
  color: #667eea;
  min-width: 3rem;
  text-align: center;
}

.preference-content {
  flex: 1;
}

.preference-content h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  color: #2d3748;
}

.preference-content p {
  margin: 0 0 1rem 0;
  color: #718096;
  font-size: 0.9rem;
}

.btn-group {
  gap: 0.5rem;
}

.btn-group .btn {
  flex: 1;
  border-radius: 8px !important;
}

.user-info .user-details {
  margin-top: 0.5rem;
}

.detail-item {
  padding: 0.25rem 0;
  display: flex;
  justify-content: space-between;
}

.detail-item .label {
  color: #718096;
  font-weight: 500;
}

.detail-item .value {
  color: #2d3748;
  font-weight: 600;
}

/* Dark Theme Styles */
.dark-theme .preference-card {
  background: #2d3748;
  color: #e2e8f0;
}

.dark-theme .preference-content h3 {
  color: #e2e8f0;
}

.dark-theme .detail-item .value {
  color: #e2e8f0;
}

.dark-theme .preferences-header h1 {
  color: #e2e8f0;
}
</style>