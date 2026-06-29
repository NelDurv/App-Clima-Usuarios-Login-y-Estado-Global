<template>
  <div id="app">
    <NavBar />
    <main>
      <router-view />
    </main>
    <footer>
      <p class="text-center p-3 mb-0 text-crema">
        © Neldur 2026 - App del Clima Chile | Datos: Open-Meteo
      </p>
    </footer>
  </div>
</template>

<script setup>
import NavBar from './components/common/NavBar.vue'
</script>

<style>
main {
  min-height: calc(100vh - 130px);
}
</style>