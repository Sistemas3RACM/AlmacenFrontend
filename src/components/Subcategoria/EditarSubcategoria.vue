<template>
  <div v-if="show" class="modal-error">
    <div class="modal-content">
      <h3 class="modal-title" v-if="edicion">Editar subcategoría</h3>
      <h3 class="modal-title" v-if="!edicion">Información subcategoría</h3>
      <hr>
      <div class="row">
        <form @submit.prevent>

          <div class="col-11 mb-3">
            <label>Nombre</label>
            <input type="text" class="form-control" placeholder="Ingrese el nombre" v-model="subcategoria.nombre">
          </div>

          <div class="col-11 mb-3">
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


          <div class="col-11 mb-3" v-if="!edicion">
            <label>Nomenclatura</label>
            <input type="text" class="form-control" v-model="subcategoria.nomenclatura" readonly>
          </div>

          <div class="button-container">
            <button @click.prevent="editar" class="btn m-1 btn-primary" v-if="edicion">Actualizar</button>
            <button @click.prevent="closeModal" class="btn m-1 btn-danger">Cancelar</button>
          </div>


        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    edicion: Boolean,
    categorias: Array
  },
  data() {
    return {
      show: false,
      subcategoria: {},
    };
  },
  methods: {
    openModal(subcategoria) {
      this.subcategoria = subcategoria;
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
    editar() {
      this.$emit('editar-subcategoria', this.subcategoria);
      this.closeModal();
    }
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
  width: 30%;
  border-radius: 10px;
}

@media (max-width: 750px) {
  .modal-content {
    width: 70%;
  }
}

/* Puedes agregar estilos personalizados aquí si es necesario */
</style>