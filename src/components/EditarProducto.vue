<template>
    <div v-if="show" class="modal-success">
      <div class="modal-content">
        <h3 class="modal-title">{{ titulo }}</h3>
        <div class="principal">
            <form @submit.prevent="enviarCambios">
            <div class="mb-3 container-fluid">
              <div class="row">
                <template v-for="(campo, key) in objeto">
                  <div
                    v-if="key != 'idProducto' && key != 'status' && key != 'consumible' && key != 'servicio'"
                    :key="key"
                    class="col-sm-6 form-group"
                  >
                    <label :for="key" class="form-label label-left">{{ key }}</label>
                    <div>
                      <div v-if="typeof campo === 'boolean'" class="form-check">
                        <input type="checkbox" class="form-check-input" :id="key" v-model="objeto[key]"/>
                      </div>
                      <div v-else-if="key === 'idCategoria'" class="form-group">
                        <select class="form-control" :id="key" v-model="objeto[key]" @change="categoriaCambiada">
                          <option v-for="option in categoriaOptions" :value="option.idCategoria">{{ option.nombre }}</option>
                        </select>
                      </div>
                      <div v-else-if="key === 'idSubcategoria'" class="form-group">
                        <select class="form-control" :id="key" v-model="objeto[key]">
                          <option v-for="option in subcategoriaOptions" :value="option.idSubcategoria">{{ option.nombre }}</option>
                        </select>
                      </div>
                      <div v-else-if="key === 'idProveedor'" class="form-group">
                        <select class="form-control" :id="key" v-model="objeto[key]" :readonly="true">
                          <option v-for="option in proveedoresOptions" :value="option.idProveedor">{{ option.nombre }}</option>
                        </select>
                      </div>
                      <div v-else-if="typeof campo === 'number'" class="form-group">
                        <input type="number" class="form-control" :id="key" v-model="objeto[key]" />
                      </div>
                      <div v-else class="form-group">
                        <input type="text" class="form-control" :id="key" v-model="objeto[key]"/>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <button type="submit" class="btn m-1 btn-primary">Guardar Cambios</button>
            <button @click="closeModal" class="btn m-1 btn-primary">Cerrar</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      titulo: String,
      objeto: {
        type: Object,
        required: true,
      },
      id: String,
      categoriaOptions: Array,
      subcategoriaOptions: Array,
      proveedoresOptions: Array,
    },
    data() {
      return {
        show: false,
        puestoOptions: [
          { valor: '0', etiqueta: 'Administrativo' },
          { valor: '1', etiqueta: 'Sin permisos' },
        ],
      };
    },
    methods: {
      openModal() {
        this.show = true;
      },
      closeModal() {
        this.show = false;
      },
      enviarCambios() {
            this.$emit('guardar-cambios', this.objeto);
            this.closeModal();
        },
      categoriaCambiada(event) {
            const categoriaId = event.target.value;
            this.objeto.idCategoria = categoriaId;
            this.$emit('categoria-cambiada', categoriaId);
        },
    },
  };
  </script>
  
  <style scoped>
  .modal-success {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .principal {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    text-align: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    width: 90%;
    border-radius: 10px;
  }
  
  button {
    margin-top: 10px;
  }
  </style>
  