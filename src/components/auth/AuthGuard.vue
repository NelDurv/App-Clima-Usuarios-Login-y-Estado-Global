<template>
  <div v-if="isAuthenticated">
    <slot />
  </div>
  <div v-else class="auth-guard-message">
    <div class="container text-center py-5">
      <i class="fas fa-lock fa-4x text-primary mb-3"></i>
      <h2>Acceso Restringido</h2>
      <p class="text-muted">Debes iniciar sesión para acceder a esta sección</p>
      <router-link to="/login" class="btn btn-primary">
        <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isAuthenticated = computed(() => store.state.auth.isAuthenticated)
</script>

<style scoped>
.auth-guard-message {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>