<template>
  <div id="app" :class="themeClass">
    <NavBar />
    <main>
      <router-view />
    </main>
    <footer class="bg-dark mt-5">
      <p class="text-white text-center p-3 mb-0">
        © Neldur 2026 - App del Clima Chile | Datos: Open-Meteo
      </p>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import NavBar from './components/common/NavBar.vue'

const store = useStore()

const themeClass = computed(() => {
  const theme = store.getters['user/getTheme'] || 'light'
  return theme === 'dark' ? 'dark-theme' : ''
})

onMounted(() => {
  // Inicializar autenticación
  store.dispatch('auth/initializeAuth')
  
  // Aplicar tema guardado
  const theme = store.getters['user/getTheme'] || 'light'
  if (theme === 'dark') {
    document.body.classList.add('dark-theme')
  }
})
</script>

<style>
/* Estilos globales para dark theme */
.dark-theme {
  background: #1a202c;
  color: #e2e8f0;
}

.dark-theme .bg-secondary {
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%) !important;
}

.dark-theme .container.py-4 {
  background: rgba(26, 32, 44, 0.95) !important;
}

.dark-theme .card {
  background: #2d3748 !important;
  color: #e2e8f0 !important;
}

.dark-theme .card-header {
  background: #4a5568 !important;
}

.dark-theme .text-muted {
  color: #a0aec0 !important;
}

.dark-theme .grid-container {
  background: #2d3748 !important;
}

.dark-theme .forecast-card {
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%) !important;
  color: #e2e8f0 !important;
}

.dark-theme .forecast-card .fw-bold {
  color: #e2e8f0 !important;
}

.dark-theme .forecast-card .small.text-muted {
  color: #a0aec0 !important;
}

.dark-theme .forecast-card .small.text-muted.mt-2 {
  border-top-color: #4a5568 !important;
  color: #e2e8f0 !important;
}

.dark-theme .favorite-card {
  background: #2d3748 !important;
  color: #e2e8f0 !important;
}

.dark-theme .favorite-card .city-info h3 {
  color: #e2e8f0 !important;
}

.dark-theme .favorite-card .city-info .weather-type {
  color: #a0aec0 !important;
}

.dark-theme .empty-state {
  background: #2d3748 !important;
}

.dark-theme .empty-state h3 {
  color: #e2e8f0 !important;
}

.dark-theme .empty-state p {
  color: #a0aec0 !important;
}

.dark-theme .preference-card {
  background: #2d3748 !important;
}

.dark-theme .preference-content h3 {
  color: #e2e8f0 !important;
}

.dark-theme .preference-content p {
  color: #a0aec0 !important;
}

.dark-theme .preference-content .detail-item .value {
  color: #e2e8f0 !important;
}

.dark-theme .auth-card {
  background: #2d3748 !important;
}

.dark-theme .auth-header h1 {
  color: #e2e8f0 !important;
}

.dark-theme .auth-header p {
  color: #a0aec0 !important;
}

.dark-theme .form-group label {
  color: #e2e8f0 !important;
}

.dark-theme .form-group input {
  background: #4a5568 !important;
  border-color: #4a5568 !important;
  color: #e2e8f0 !important;
}

.dark-theme .form-group input:focus {
  border-color: #667eea !important;
}

.dark-theme .auth-footer p {
  color: #a0aec0 !important;
}

.dark-theme .demo-credentials {
  background: #4a5568 !important;
}

.dark-theme .demo-item {
  background: #2d3748 !important;
  color: #e2e8f0 !important;
}

.dark-theme .demo-item:hover {
  background: #667eea !important;
}

.dark-theme .demo-password {
  color: #a0aec0 !important;
}
</style>