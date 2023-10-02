<template>
  <section class="container-fluid">
    <div>
      <div class="row">
        <div class="col-2 m-0 p-0" v-flex="fill">
          <Nvar />
        </div>
        <div class="col-10 m-0 p-0">
          <section class="container-fluid">
            <div class="row">
              <div class="col-7 mt-5 tablaP">
                <div class="row">
                  <div class="col-6">
                    <h1 class="h1 m-3">Proveedores</h1>
                  </div>
                  <div class="col-2 mt-4">
                    <button @click="mostrar()" class="btn m-1 btn-warning"><font-awesome-icon
                      :icon="['fas', 'sync-alt']" /></button>
                  </div>
                </div>
                <tabla v-if="this.proveedores" :type="type" :data="this.proveedores" :fields="['nombre']"
                  :eliminar="eliminar">
                  <template #default="{ item }">
                    <button @click="eliminarProveedor(item.idProveedor)" class="btn m-1 btn-danger"><font-awesome-icon
                        :icon="['fas', 'trash']" /></button>
                    <button @click="mostrarEdicion(item)" class="btn m-1 btn-warning"><font-awesome-icon
                        :icon="['fas', 'edit']" /></button>
                    <button @click="mostrarInformacion(item)" class="btn m-1 btn-primary"><font-awesome-icon
                        :icon="['fas', 'eye']" /></button>

                  </template>
                </tabla>
              </div>
              <div class="col-4 mt-5">
                <div class="formulario">
                  <h3>Agregar Proveedor</h3>
                  <!-- Utiliza el formulario para agregar proveedores -->
                  <FormularioGeneral ref="formularioGeneral" :campos="camposProveedor" :textoBoton="textoBotonProveedor"
                    @formulario-enviado="agregarProveedor" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <!-- Modal de Éxito -->
    <ModalSuccess :message="successMessage" ref="modalSuccess" />

    <!-- Modal de Error -->
    <ModalError :message="errorMessage" ref="modalError" />

    <!-- Modal de Error -->
    <ModalEditar :titulo="TituloEditar" :objeto="objetoEditar" :id="id" @guardar-cambios="editarProveedor"
      ref="modalEditar" />

    <ModalInformacion :titulo="TituloVer" :objeto="objetoEditar" :id="id" ref="modalVer" />
  </section>
</template>
<style scoped>
.formulario {
  background: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  height: 50vh;
  border-radius: 10px;
  margin-top: 18%;
  width: 100%;

}

.tablaP {
  margin-left: 10px;
  margin-right: 40px;
}
</style>
  
<script>
import tabla from '../components/tablainformacion.vue';
import Nvar from '../components/Nvar';
import {
  API_URL, ENDPOINT_LISTAR_PROVEEDORES, ENDPOINT_AGREGAR_PROVEEDOR,
  ENDPOINT_ELIMINAR_PROVEEDOR, ENDPOINT_EDITAR_PROVEEDOR
} from '../keys';
import FormularioGeneral from '@/components/FormularioGeneral.vue';
import ModalSuccess from '@/components/ModalSuccess.vue';
import ModalError from '@/components/ModalError.vue';
import ModalEditar from '@/components/ModalEditar.vue';
import ModalInformacion from '@/components/ModalInformacion.vue';



export default {
  name: 'Inicio Proveedor',
  components: {
    tabla,
    Nvar,
    FormularioGeneral,
    ModalSuccess,
    ModalError,
    ModalEditar,
    ModalInformacion,
  },
  data() {
    return {
      proveedores: null,
      type: 'proveedores',
      camposProveedor: [
        { id: 'nombre', label: 'Nombre', nombre: 'nombre', type: 'text', valor: '', ayuda: 'Ingrese el nombre del proveedor' },
        { id: 'status', label: 'Estado', nombre: 'status', type: 'checkbox', valor: false },

      ],
      textoBotonProveedor: 'Agregar Proveedor',
      successMessage: '',
      errorMessage: '',
      TituloEditar: 'Editar Proveedor',
      objetoEditar: {
        idProveedor: '',
        nombre: '',
        status: false,
      },
      id: 'idProveedor',
      TituloVer: 'Información del Proveedor',
    };
  },
  mounted() {
    this.mostrar();
  },
  methods: {
    mostrar() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_PROVEEDORES}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.proveedores = data;
        })
        .catch(error => console.log(error));
    },
    eliminarProveedor(id) {
      if (!id) {
        this.errorMessage = 'Surgio un problema con el ID';
        this.$refs.modalError.openModal();
        return;
      }

      const url = `${API_URL}/${ENDPOINT_ELIMINAR_PROVEEDOR}/${id}`;


      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.status === 200) {
            this.successMessage = 'Proveedor eliminado con éxito';
            this.$refs.modalSuccess.openModal();
            this.mostrar();
          } else if (response.status === 404) {
            this.errorMessage = 'Proveedor no encontrado';
            this.$refs.modalError.openModal();
          } else {
            this.errorMessage = 'Error al eliminar el proveedor';
            this.$refs.modalError.openModal();
          }
        })
        .catch(error => {
          console.error('Error en la solicitud:', error);
          this.errorMessage = 'Error en la solicitud';
          this.$refs.modalError.openModal();
        });
    },
    mostrarEdicion(datos) {
      this.objetoEditar = datos;
      this.$refs.modalEditar.openModal();
    },
    mostrarInformacion(datos) {
      this.objetoEditar = datos;
      this.$refs.modalVer.openModal();
    },
    editarProveedor(objetoModificado) {

      const objetoJSON = JSON.stringify(objetoModificado);

      if (!objetoModificado.nombre) {
        this.errorMessage = 'El campo nombre no puede estar vacio';
        this.$refs.modalError.openModal();
        this.mostrar();
      } else {
        console.log(objetoJSON);

        const url = `${API_URL}/${ENDPOINT_EDITAR_PROVEEDOR}`;

        fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: objetoJSON,
        })
          .then(response => {
            if (response.status === 200) {
              this.successMessage = 'Proveedor editado con éxito';
              this.$refs.modalSuccess.openModal();
              this.mostrar();
            }
            else {
              if (response.status === 400) {
                this.errorMessage = 'Surgio un problema con la edición';
                this.$refs.modalError.openModal();
              } else {
                this.errorMessage = 'Error al editar el proveedor';
                this.$refs.modalError.openModal();
              }
            }
          })
          .catch(error => {
            this.errorMessage = 'Error en la solicitud';
            this.$refs.modalError.openModal();
          });
      }

    },
    agregarProveedor(datos) {
      console.log(datos);
      const url = `${API_URL}/${ENDPOINT_AGREGAR_PROVEEDOR}`;

      const nuevoJSON = {};

      for (const campo of datos) {
        nuevoJSON[campo.id] = campo.valor;
      }

      console.log(JSON.stringify(nuevoJSON, null, 2));

      if (!nuevoJSON.nombre) {
        console.error('El campo "nombre" es obligatorio.');
        return;
      }

      // Realiza una solicitud HTTP POST al servidor para agregar el proveedor
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoJSON),
      })
        .then(response => {
          if (response.status === 201) {
            this.successMessage = 'Proveedor agregado con éxito';
            this.$refs.modalSuccess.openModal();
            this.mostrar();
          }
          else {
            if (response.status === 409) {
              this.errorMessage = 'El proveedor ya existe';
              this.$refs.modalError.openModal();
            } else {
              this.errorMessage = 'Error al agregar el proveedor';
              this.$refs.modalError.openModal();
            }
          }
        })
        .catch(error => {
          this.errorMessage = 'Error en la solicitud';
          this.$refs.modalError.openModal();
        });
    },
  },
};
</script>
  