<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <i class="fas fa-user-plus auth-icon"></i>
        <h1>Crear Cuenta</h1>
        <p>Regístrate para acceder a todas las funcionalidades</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="name">
            <i class="fas fa-user"></i> Nombre Completo
          </label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            placeholder="Tu nombre"
            required
          />
        </div>
        
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
              placeholder="Mínimo 6 caracteres"
              required
              minlength="6"
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
        
        <div class="form-group">
          <label for="confirmPassword">
            <i class="fas fa-check-circle"></i> Confirmar Contraseña
          </label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="confirmPassword"
            v-model="form.confirmPassword"
            placeholder="Confirmar contraseña"
            required
          />
        </div>
        
        <div v-if="error" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </div>
        
        <button type="submit" class="btn-register" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status"></span>
          <span v-else><i class="fas fa-user-plus"></i> Registrarse</span>
        </button>
      </form>
      
      <div class="auth-footer">
        <p>
          ¿Ya tienes cuenta?
          <router-link to="/login" class="link-login">Inicia sesión aquí</router-link>
        </p>
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

<style scoped>
.auth-container {
  min-height: calc(100vh - 130px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
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
  color: #48bb78;
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
  color: #48bb78;
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
  border-color: #48bb78;
  box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
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
  color: #48bb78;
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

.btn-register {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
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

.btn-register:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(72, 187, 120, 0.4);
}

.btn-register:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
}

.auth-footer p {
  color: #718096;
  margin-bottom: 0;
}

.link-login {
  color: #48bb78;
  font-weight: 600;
  text-decoration: none;
}

.link-login:hover {
  text-decoration: underline;
}
</style>