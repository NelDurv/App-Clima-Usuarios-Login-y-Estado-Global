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
          <label for="email">
            <i class="fas fa-envelope"></i> Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="ejemplo@email.com"
            required
            autocomplete="email"
          />
        </div>
        
        <div class="form-group">
          <label for="password">
            <i class="fas fa-lock"></i> Contraseña
          </label>
          <div class="password-wrapper">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="form.password"
              placeholder="••••••••"
              required
              autocomplete="current-password"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>
        
        <div v-if="error" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </div>
        
        <button type="submit" class="btn-login" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status"></span>
          <span v-else><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</span>
        </button>
      </form>
      
      <div class="auth-footer">
        <p>
          ¿No tienes cuenta?
          <router-link to="/register" class="link-register">Regístrate aquí</router-link>
        </p>
        <div class="demo-credentials">
          <small>Usuarios demo:</small>
          <div class="demo-list">
            <span class="demo-item" @click="fillDemo('juan@email.com')">juan@email.com</span>
            <span class="demo-item" @click="fillDemo('maria@email.com')">maria@email.com</span>
            <span class="demo-item" @click="fillDemo('carlos@email.com')">carlos@email.com</span>
          </div>
          <small class="demo-password">Contraseña: 123456</small>
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

const form = ref({
  email: '',
  password: ''
})

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
      const redirect = route.query.redirect || '/'
      router.push(redirect)
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

<style scoped>
.auth-container {
  min-height: calc(100vh - 130px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-icon {
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.auth-header h1 {
  font-size: 1.75rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: #718096;
  font-size: 0.95rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
}

.form-group label i {
  color: #667eea;
  margin-right: 0.5rem;
}

.form-group input {
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.password-wrapper {
  position: relative;
}

.password-wrapper input {
  width: 100%;
  padding-right: 3rem;
}

.toggle-password {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 0.25rem;
}

.toggle-password:hover {
  color: #667eea;
}

.error-message {
  background: #fed7d7;
  color: #c53030;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-login {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.875rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
}

.auth-footer p {
  color: #718096;
  margin-bottom: 1rem;
}

.link-register {
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
}

.link-register:hover {
  text-decoration: underline;
}

.demo-credentials {
  background: #f7fafc;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
}

.demo-credentials small {
  display: block;
  color: #718096;
  margin-bottom: 0.5rem;
}

.demo-list {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.demo-item {
  background: #edf2f7;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #2d3748;
}

.demo-item:hover {
  background: #667eea;
  color: white;
}

.demo-password {
  color: #a0aec0;
  font-size: 0.8rem !important;
}
</style>