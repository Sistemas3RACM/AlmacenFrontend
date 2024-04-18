<template>
  <div v-if="show" class="modal-error">
    <div class="modal-content">
      <h3 class="modal-title">Error</h3>
      <p>{{ message }}</p>
      <button @click="closeModal" type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    openModal() {
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
  },
};
</script>

<style scoped>
.modal-error {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  width: 40%;
  border-radius: 10px;
}
@media (max-width: 750px) {
    .modal-content {
    width: 70%;
  }
  }
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
