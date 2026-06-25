<template>
  <nav class="navbar navbar-expand-lg bg-primary bg-gradient px-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand text-white">
        <i class="fas fa-cloud-sun me-2"></i>Vue Clima Chile
      </router-link>
      
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <!-- Inicio -->
          <li class="nav-item">
            <router-link to="/" class="nav-link text-white">
              <i class="fas fa-home"></i> Inicio
            </router-link>
          </li>
          
          <!-- Rutas protegidas (solo si está autenticado) -->
          <template v-if="isAuthenticated">
            <li class="nav-item">
              <router-link to="/favoritos" class="nav-link text-white">
                <i class="fas fa-heart text-danger"></i> Favoritos
                <span v-if="favoritesCount > 0" class="badge bg-danger rounded-pill ms-1">
                  {{ favoritesCount }}
                </span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/preferencias" class="nav-link text-white">
                <i class="fas fa-cog"></i> Preferencias
              </router-link>
            </li>
          </template>
          
          <!-- Autenticación -->
          <li class="nav-item">
            <template v-if="isAuthenticated">
              <div class="d-flex align-items-center gap-2 ms-2">
                <span class="text-white-50">|</span>
                <span class="text-white">
                  <i class="fas fa-user-circle"></i>
                  {{ userName }}
                </span>
                <button class="btn btn-outline-light btn-sm" @click="handleLogout">
                  <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                </button>
              </div>
            </template>
            <template v-else>
              <div class="d-flex gap-2 ms-2">
                <router-link to="/login" class="btn btn-outline-light btn-sm">
                  <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                </router-link>
                <router-link to="/register" class="btn btn-light btn-sm">
                  <i class="fas fa-user-plus"></i> Registrarse
                </router-link>
              </div>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const isAuthenticated = computed(() => store.state.auth.isAuthenticated)
const userName = computed(() => store.getters['auth/getUserName'])
const favoritesCount = computed(() => store.getters['auth/getFavoriteCities']?.length || 0)

const handleLogout = async () => {
  await store.dispatch('auth/logout')
  router.push('/login')
}
</script>

<style scoped>
.navbar-nav .nav-link {
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
  border-radius: 8px;
}

.navbar-nav .nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

.navbar-nav .nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.15);
}

.btn-outline-light:hover {
  background: rgba(255, 255, 255, 0.2);
}

.navbar-toggler {
  border-color: rgba(255, 255, 255, 0.5);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255,255,255,0.8)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

@media (max-width: 991px) {
  .navbar-nav .nav-item {
    margin: 0.25rem 0;
  }
  
  .navbar-nav .d-flex {
    flex-direction: column;
    gap: 0.5rem !important;
    width: 100%;
  }
  
  .navbar-nav .btn {
    width: 100%;
  }
}
</style>