<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h3 class="mb-3">Agregar Subcategoría</h3>
      
      <form @submit.prevent="guardarSubcategoria">
        <div class="mb-3">
          <div class="row">
            <div class="col mb-3">
              <label class="form-label label-left">Nombre</label>
              <input type="text" class="form-control" placeholder="Ingrese el nombre" v-model="subcategoria.nombre"
                required>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label class="form-label label-left">Selecciona la categoría:</label>
              <select class="form-select" id="categorias" aria-label="categorias" v-model="subcategoria.idCategoria"
                required>
                <option disabled value="">Selecciona una categoría.</option>
                <option v-for="categoria in categorias" :key="categoria.idCategoria" :value="categoria.idCategoria">
                  {{
                    categoria.nombre
                  }}</option>
              </select>
            </div>
          </div>

        </div>

        <div class="button-container">
          <button type="submit" class="btn m-1 btn-primary">Guardar</button>
          <button @click="closeModal" class="btn m-1 btn-danger">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
  <ModalSuccess :message="mensajeCorrecto" ref="ModalCorrecto" />
  <ModalError :message="mensajeError" ref="ModalError" />
</template>
  
<script>
import FormularioSubcategoriaScript from './FormularioSubcategoriaScript';
import ModalSuccess from '../ModalSuccess.vue';
import ModalError from '../ModalError.vue';

export default {
  ...FormularioSubcategoriaScript,
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
  padding: 0;
  border-radius: 10px;
}

.modal-content {
  width: 28%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 0px;
}

.button-container {
  text-align: center;
}
@media screen and (max-width: 1000px) {
  .modal-content {
    width: 45%; /* Cambiar el ancho según lo necesites */
  }
}
@media screen and (max-width: 620px) {
  .modal-content {
    width: 55%; /* Cambiar el ancho según lo necesites */
    padding: 15px;
  }
}

@media screen and (max-width: 480px) {
  .modal-content {
    width: 70%; /* Cambiar el ancho según lo necesites */
  }
}
</style>
  