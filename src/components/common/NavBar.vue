<template>
  <nav class="navbar navbar-expand-lg px-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
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
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <i class="fas fa-home"></i> Inicio
            </router-link>
          </li>
          
          <template v-if="isAuthenticated">
            <li class="nav-item">
              <router-link to="/favoritos" class="nav-link">
                <i class="fas fa-heart text-danger"></i> Favoritos
                <span v-if="favoritesCount > 0" class="badge bg-danger rounded-pill ms-1">
                  {{ favoritesCount }}
                </span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/preferencias" class="nav-link">
                <i class="fas fa-cog"></i> Preferencias
              </router-link>
            </li>
          </template>
          
          <li class="nav-item">
            <template v-if="isAuthenticated">
              <div class="d-flex align-items-center gap-2 ms-2">
                <span class="text-white-50">|</span>
                <span class="text-crema">
                  <i class="fas fa-user-circle"></i> {{ userName }}
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