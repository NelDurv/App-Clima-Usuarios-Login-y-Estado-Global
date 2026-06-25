<template>
  <div class="auth-container" style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);">
    <div class="auth-card">
      <div class="auth-header">
        <i class="fas fa-user-plus auth-icon" style="color: #48bb78;"></i>
        <h1>Crear Cuenta</h1>
        <p>Regístrate para acceder a todas las funcionalidades</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label><i class="fas fa-user"></i> Nombre Completo</label>
          <input type="text" v-model="form.name" placeholder="Tu nombre" required />
        </div>
        
        <div class="form-group">
          <label><i class="fas fa-envelope"></i> Correo Electrónico</label>
          <input type="email" v-model="form.email" placeholder="ejemplo@email.com" required />
        </div>
        
        <div class="form-group">
          <label><i class="fas fa-lock"></i> Contraseña</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="form.password"
            placeholder="Mínimo 6 caracteres"
            required
            minlength="6"
          />
        </div>
        
        <div class="form-group">
          <label><i class="fas fa-check-circle"></i> Confirmar Contraseña</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="form.confirmPassword"
            placeholder="Confirmar contraseña"
            required
          />
        </div>
        
        <div v-if="error" class="error-message">
          <i class="fas fa-exclamation-circle"></i> {{ error }}
        </div>
        
        <button type="submit" class="btn-login" style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status"></span>
          <span v-else><i class="fas fa-user-plus"></i> Registrarse</span>
        </button>
      </form>
      
      <div class="auth-footer">
        <p>¿Ya tienes cuenta? <router-link to="/login" style="color: #48bb78; font-weight: 600;">Inicia sesión aquí</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  error.value = ''
  
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Las contraseñas no coinciden'
    return
  }
  
  if (form.value.password.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }
  
  loading.value = true
  
  try {
    const result = await store.dispatch('auth/register', {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password
    })
    
    if (result.success) {
      router.push('/')
    } else {
      error.value = result.error || 'Error en el registro'
    }
  } catch (err) {
    error.value = 'Error al registrar usuario'
  } finally {
    loading.value = false
  }
}
</script>