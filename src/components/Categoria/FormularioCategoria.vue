<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h3>Agregar Categoría</h3>
      <form @submit.prevent="agregarCategoria">
        <div class="col mb-3">
          <label>Nombre</label>
          <input type="text" class="form-control" placeholder="Ingrese el nombre" v-model="categoria.nombre">
        </div>

        <div class="button-container">
          <button type="submit" class="btn m-1 btn-primary">Guardar</button>
          <button @click="cerrarFormulario" class="btn m-1 btn-danger">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
  <ModalSuccess :message="mensajeCorrecto" ref="ModalCorrecto" />
  <ModalError :message="mensajeError" ref="ModalError" />
</template>

<script>
import FormularioCategoriaScript from './FormularioCategoriaScript';
import ModalSuccess from '../ModalSuccess.vue';
import ModalError from '../ModalError.vue';
export default {
  ...FormularioCategoriaScript,
  components: {
    ModalSuccess,
    ModalError,
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  border-radius: 10px;
}

.modal-content {
  width: 27%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
}

.button-container {
  text-align: center;
}

@media screen and (max-width: 1000px) {
  .modal-content {
    width: 45%;
    /* Cambiar el ancho según lo necesites */
  }
}

@media screen and (max-width: 620px) {
  .modal-content {
    width: 55%;
    /* Cambiar el ancho según lo necesites */
  }
}

@media screen and (max-width: 480px) {
  .modal-content {
    width: 70%;
    /* Cambiar el ancho según lo necesites */
  }
}
</style>