<template>
  <div class="forecast-card">
    <div class="fw-bold">{{ dia.diaSemana }}</div>
    <div class="small text-muted mb-2">{{ dia.fecha }}</div>
    <i :class="['fas', dia.icono, 'fa-2x', 'my-2']"></i>
    <div class="d-flex justify-content-center gap-3">
      <span class="text-danger fw-bold">
        <i class="fas fa-arrow-up"></i> 
        {{ convertTemp(dia.tempMax) }}{{ unitSymbol }}
      </span>
      <span class="text-primary fw-bold">
        <i class="fas fa-arrow-down"></i> 
        {{ convertTemp(dia.tempMin) }}{{ unitSymbol }}
      </span>
    </div>
    <div class="small text-muted mt-2">{{ capitalizar(dia.tipoClima) }}</div>
  </div>
</template>

<script setup>
import { capitalizar } from '@/composables/useWeather'

defineProps({
  dia: Object,
  convertTemp: Function,
  unitSymbol: String
})
</script>

<style scoped>
.forecast-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 240, 240, 0.95) 100%);
  border-radius: 20px;
  padding: 20px 12px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 3px solid rgba(18, 223, 46, 0.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 100%;
  position: relative;
  overflow: hidden;
}

.forecast-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 8px;
  background: linear-gradient(90deg, #667eea, #764ba2, #48bb78);
  transition: left 0.3s ease;
}

.forecast-card:hover::before {
  left: 0;
}

.forecast-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
}

.forecast-card .fw-bold {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2d3748;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
}

.forecast-card .small.text-muted {
  font-size: 0.9rem;
  color: #718096;
  font-weight: bold;
  margin-bottom: 10px;
}

.forecast-card i {
  font-size: 3rem;
  margin: 15px 0;
  color: #667eea;
  transition: transform 0.3s ease;
}

.forecast-card:hover i {
  transform: scale(1.1);
}

.forecast-card .text-danger {
  color: #fc8181 !important;
  font-weight: bold;
  font-size: 1.2rem;
}

.forecast-card .text-primary {
  color: #667eea !important;
  font-weight: bold;
  font-size: 1.2rem;
}

.forecast-card .small.text-muted.mt-2 {
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 600;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 2px dashed #e2e8f0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.forecast-card {
  animation: fadeIn 0.5s ease forwards;
}

.forecast-card:nth-child(1) { animation-delay: 0.1s; }
.forecast-card:nth-child(2) { animation-delay: 0.2s; }
.forecast-card:nth-child(3) { animation-delay: 0.3s; }
.forecast-card:nth-child(4) { animation-delay: 0.4s; }
.forecast-card:nth-child(5) { animation-delay: 0.5s; }
.forecast-card:nth-child(6) { animation-delay: 0.6s; }
</style>