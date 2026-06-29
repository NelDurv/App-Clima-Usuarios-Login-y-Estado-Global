<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <i class="fas fa-cloud-sun auth-icon"></i>
        <h1>Iniciar Sesión</h1>
        <p>Accede a tu cuenta para personalizar tu experiencia</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label><i class="fas fa-envelope"></i> Correo Electrónico</label>
          <input
            type="email"
            v-model="form.email"
            placeholder="ejemplo@email.com"
            required
          />
        </div>
        
        <div class="form-group">
          <label><i class="fas fa-lock"></i> Contraseña</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="form.password"
            placeholder="••••••••"
            required
          />
        </div>
        
        <div v-if="error" class="error-message">
          <i class="fas fa-exclamation-circle"></i> {{ error }}
        </div>
        
        <button type="submit" class="btn-login" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status"></span>
          <span v-else><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</span>
        </button>
      </form>
      
      <div class="auth-footer">
        <p>¿No tienes cuenta? <router-link to="/register" class="link-register">Regístrate aquí</router-link></p>
        <div class="demo-credentials">
          <small>Usuarios demo (contraseña: 123456):</small>
          <div class="demo-list">
            <span class="demo-item" @click="fillDemo('juan@email.com')">juan@email.com</span>
            <span class="demo-item" @click="fillDemo('maria@email.com')">maria@email.com</span>
            <span class="demo-item" @click="fillDemo('carlos@email.com')">carlos@email.com</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()

const form = ref({ email: '', password: '' })
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const fillDemo = (email) => {
  form.value.email = email
  form.value.password = '123456'
}

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  
  try {
    const result = await store.dispatch('auth/login', {
      email: form.value.email,
      password: form.value.password
    })
    
    if (result.success) {
      router.push(route.query.redirect || '/')
    } else {
      error.value = result.error || 'Credenciales incorrectas'
    }
  } catch (err) {
    error.value = 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>