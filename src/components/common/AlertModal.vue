<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-contenido">
        <div class="modal-header-cultivos">
          <i :class="iconClass"></i>
          <h5 class="modal-titulo">{{ titulo }}</h5>
          <button class="btn-cerrar" @click="$emit('close')">&times;</button>
        </div>
        <div class="modal-body-cultivos">
          <slot />
        </div>
        <div class="modal-footer-cultivos">
          <button class="btn-aceptar" @click="$emit('close')">Aceptar</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  visible: Boolean,
  titulo: { type: String, default: 'Alerta' },
  iconClass: { type: String, default: 'fas fa-leaf' }
})

defineEmits(['close'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-contenido {
  background: #ffffff;
  border-radius: 16px;
  width: 90%;
  max-width: 460px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: modalEntrada 0.25s ease-out;
}

@keyframes modalEntrada {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-header-cultivos {
  background: linear-gradient(135deg, #D4813D 0%, #E8A87C 100%);
  color: #000000;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-header-cultivos i {
  font-size: 1.5rem;
  color: #000000;
}

.modal-titulo {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #000000;
  flex: 1;
}

.btn-cerrar {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #000000;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
}

.btn-cerrar:hover {
  color: #333333;
}

.modal-body-cultivos {
  background: #E3F2FD;
  color: #000000;
  padding: 24px;
  font-size: 0.95rem;
  line-height: 1.6;
}

.modal-footer-cultivos {
  background: #E3F2FD;
  padding: 12px 24px 16px;
  display: flex;
  justify-content: flex-end;
}

.btn-aceptar {
  background: #D4813D;
  color: #000000;
  border: none;
  padding: 8px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-aceptar:hover {
  background: #c0702e;
}
</style>
