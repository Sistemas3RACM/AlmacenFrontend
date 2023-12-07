<template>
  <section class="container-fluid">
    <div>
      <div class="row">
        <div class="col-2 m-0 p-0">
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
                    <button @click="mostrar()" class="btn m-1 btn-warning">
                      <font-awesome-icon :icon="['fas', 'sync-alt']" />
                    </button>
                  </div>
                  <div class="col-4 mt-4">
                    <BusquedaGeneral @busqueda="buscarProveedor" />
                  </div>
                </div>
                <tabla v-if="paginatedProveedores" :type="type" :data="paginatedProveedores" :fields="['nombre']"
                  :eliminar="eliminar">
                  <template #default="{ item }">
                    <button @click="eliminarProveedor(item.idProveedor)" class="btn m-1 btn-danger" v-if="permisos">
                      <font-awesome-icon :icon="['fas', 'trash']" />
                    </button>
                    <button @click="mostrarEdicion(item)" class="btn m-1 btn-warning">
                      <font-awesome-icon :icon="['fas', 'edit']" />
                    </button>
                    <button @click="mostrarInformacion(item)" class="btn m-1 btn-primary">
                      <font-awesome-icon :icon="['fas', 'eye']" />
                    </button>
                  </template>
                </tabla>
                <!-- Botones de navegación -->
                <div class="pagination-buttons boton-container">
                  <button @click="goToPage(currentPage - 1)" class="btn btn-info"
                    :disabled="currentPage === 1">Anterior</button>
                  <button @click="goToPage(currentPage + 1)" class="btn btn-info"
                    :disabled="currentPage === totalPages">Siguiente</button>
                </div>
              </div>
              <div class="col-4 mt-4">
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
    <ModalEditar :titulo="TituloEditar" :camposMostrados="camposMostrados" :objeto="objetoEditar" :id="id"
      @guardar-cambios="editarProveedor" ref="modalEditar" />

    <ModalInformacion :titulo="TituloVer" :objeto="objetoEditar" :id="id" ref="modalVer" />
  </section>
</template>

<style scoped>
.boton-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.formulario {
  background: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  height: 52vh;
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
  API_URL, ENDPOINT_LISTAR_PROVEEDORES, ENDPOINT_AGREGAR_PROVEEDOR, ENDPOINT_AGREGAR_MOVIMIENTO,
  ENDPOINT_ELIMINAR_PROVEEDOR, ENDPOINT_EDITAR_PROVEEDOR, ENDPOINT_BUSCAR_PROVEEDOR, ENDPOINT_CONSULTAR_PROVEEDOR
} from '../keys';
import FormularioGeneral from '@/components/FormularioGeneral.vue';
import ModalSuccess from '@/components/ModalSuccess.vue';
import ModalError from '@/components/ModalError.vue';
import ModalEditar from '@/components/ModalEditar.vue';
import ModalInformacion from '@/components/ModalInformacion.vue';
import BusquedaGeneral from '@/components/BusquedaGeneral.vue';

export default {
  name: 'InicioProveedor',
  components: {
    tabla,
    Nvar,
    FormularioGeneral,
    ModalSuccess,
    ModalError,
    ModalEditar,
    ModalInformacion,
    BusquedaGeneral,
  },
  data() {
    return {
      proveedores: null,
      type: 'proveedores',
      camposProveedor: [
        { id: 'nombre', label: 'Nombre', nombre: 'nombre', type: 'text', valor: '', ayuda: 'Ingrese el nombre del proveedor', required: true },
        { id: 'direccion', label: 'Dirección', nombre: 'direccion', type: 'text', valor: '', ayuda: 'Ingrese la dirección del proveedor' },
        { id: 'telefono', label: 'Teléfono', nombre: 'telefono', type: 'text', valor: '', ayuda: 'Ingrese el teléfono del proveedor' },
      ],
      textoBotonProveedor: 'Agregar Proveedor',
      successMessage: '',
      errorMessage: '',
      TituloEditar: 'Editar Proveedor',
      objetoEditar: {
        idProveedor: '',
        nombre: '',
      },
      camposMostrados: ['nombre', 'direccion', 'telefono'],
      id: 'idProveedor',
      TituloVer: 'Información del Proveedor',
      currentPage: 1,
      pageSize: 6,
      permisos: false,
    };
  },
  mounted() {
    this.mostrar();
    this.obtenerPermisos();
  },
  computed: {
    // The above code is a method in a Vue component that calculates the total number of pages based on the
    // number of items in the "proveedores" array and the "pageSize" value. It returns the total number of
    // pages by dividing the length of the "proveedores" array by the "pageSize" and rounding up the result
    // using the Math.ceil() function.
    totalPages() {
      if (!this.proveedores) return 0;
      return Math.ceil(this.proveedores.length / this.pageSize);
    },
    // The above code is a method in a Vue component that is used to paginate a list of "proveedores"
    // (suppliers).
    paginatedProveedores() {
      if (!this.proveedores) return null;

      const sortedProveedores = this.proveedores.slice().reverse();

      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return sortedProveedores.slice(startIndex, endIndex);
    },
  },
  methods: {
    // The above code is defining a method called "goToPage" in a Vue component. This method takes a
    // parameter called "page" and is used to navigate to a specific page.
    goToPage(page) {
      if (page < 1) page = 1;
      if (page > this.totalPages) page = this.totalPages;
      this.currentPage = page;
    },
    // The above code is a method in a Vue component that is making an HTTP GET request to a specified API
    // endpoint. It is using the `fetch` function to send the request and receive the response. Once the
    // response is received, it is converted to JSON format using the `response.json()` method. The
    // resulting data is then assigned to the `proveedores` property of the component. If there is an error
    // during the request or response handling, the error is logged to the console.
    mostrar() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_PROVEEDORES}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.proveedores = data;
        })
        .catch(error => console.log(error));
    },
    buscarProveedor(termino) {
      const url = `${API_URL}/${ENDPOINT_BUSCAR_PROVEEDOR}?nombre=${termino}`;

      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error en la solicitud.");
          }
        })
        .then(data => {

          this.proveedores = data;
        })
        .catch(error => {

          console.error("Error:", error);
        });
    },
    buscarProveedorID(id) {
      const url = `${API_URL}/${ENDPOINT_CONSULTAR_PROVEEDOR}/${id}`;

      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        })
        .then(proveedor => {
          this.registroDeMovimientos(`Proveedor ${proveedor.nombre} eliminado`);
        })
        .catch(error => {
          console.error('Error en la solicitud:', error);
        });
    },
    eliminarProveedor(id) {
      if (!id) {
        this.errorMessage = 'Surgió un problema con el ID';
        this.$refs.modalError.openModal();
        return;
      }

      const url = `${API_URL}/${ENDPOINT_ELIMINAR_PROVEEDOR}/${id}`;

      this.buscarProveedorID(id);

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

      if (objetoModificado.telefono === "") {
        objetoModificado.telefono = "";
      }
      const objetoJSON = JSON.stringify(objetoModificado);

      if (!objetoModificado.nombre) {
        this.errorMessage = 'El campo nombre no puede estar vacío';
        this.$refs.modalError.openModal();
        this.mostrar();
      } else {

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
              this.registroDeMovimientos(`Proveedor ${objetoModificado.nombre} editado`);
              this.$refs.modalSuccess.openModal();
              this.mostrar();
            }
            else {
              if (response.status === 400) {
                this.errorMessage = 'Surgió un problema con la edición';
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
      const url = `${API_URL}/${ENDPOINT_AGREGAR_PROVEEDOR}`;

      const nuevoJSON = {};

      for (const campo of datos) {
        nuevoJSON[campo.id] = campo.valor;
      }
      if (nuevoJSON.telefono == "") {
        nuevoJSON.telefono = "";
      }


      if (!nuevoJSON.nombre) {
        console.error('El campo "nombre" es obligatorio.');
        return;
      }

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
            this.registroDeMovimientos(`Proveedor ${nuevoJSON.nombre} agregado`);
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
    // The above code is a method in a Vue component that is used to obtain permissions for a user. It
    // first retrieves the user's ID from the Vuex store. If the user's ID is equal to 1, it sets the
    // "permisos" data property to true.
    obtenerPermisos() {
      const idUsuario = this.$store.state.auth.userId;

      if (idUsuario == 1) {
        this.permisos = true;
      }
    },

    // The above code is defining a method called "registroDeMovimientos" in a Vue component. This method
    // takes a parameter called "mensaje".
    registroDeMovimientos(mensaje) {
      const idUsuario = this.$store.state.auth.userId;

      const JSONmovimientos = {
        "tipoMovimiento": mensaje,
        "encargado": idUsuario,
        "fechaDeMovimiento": null
      };

      const url = `${API_URL}/${ENDPOINT_AGREGAR_MOVIMIENTO}`;

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(JSONmovimientos),
      })
        .then(response => {
          if (response.status === 201) {
            this.mostrar();
          }
          else {
            if (response.status === 409) {
              this.errorMessage = 'Error al agregar el movimiento';
              this.$refs.modalError.openModal();
            }
          }
        })
        .catch(error => {
          this.errorMessage = 'Error en la solicitud';
        });

    },
  },
};
</script>
  