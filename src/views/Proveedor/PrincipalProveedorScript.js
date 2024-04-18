import {
  API_URL, ENDPOINT_LISTAR_PROVEEDORES, ENDPOINT_AGREGAR_MOVIMIENTO,
  ENDPOINT_ELIMINAR_PROVEEDOR, ENDPOINT_EDITAR_PROVEEDOR, ENDPOINT_BUSCAR_PROVEEDOR, ENDPOINT_CONSULTAR_PROVEEDOR
} from '../../keys';

export default {
  name: 'InicioProveedor',
  data() {
    return {
      proveedores: null,
      type: 'proveedores',
      successMessage: '',
      errorMessage: '',
      TituloEditar: 'Editar Proveedor',
      objetoEditar: [],
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
    abrirAgregarProveedor(){
      this.$refs.formularioAgregar.openModal();
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
