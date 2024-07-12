import axios from "axios";
import {
  API_URL,
  ENDPOINT_LISTAR_PROVEEDORES,
  ENDPOINT_ELIMINAR_PROVEEDOR,
  ENDPOINT_EDITAR_PROVEEDOR,
} from "../../keys";

export default {
  name: "InicioProveedor",
  data() {
    return {
      proveedores: [],
      currentPage: 1,
      pageSize: 8,
    };
  },
  mounted() {
    this.mostrar();
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
    paginated() {
      if (!this.proveedores) return null;

      const sortedProveedores = this.proveedores.slice().reverse();

      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return sortedProveedores.slice(startIndex, endIndex);
    },
  },
  methods: {
    goToPage(page) {
      if (page < 1) page = 1;
      if (page > this.totalPages) page = this.totalPages;
      this.currentPage = page;
    },

    async mostrar() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_PROVEEDORES}`;
      const token = this.$store.state.auth.token;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.proveedores = response.data;
      } catch (error) {
        console.log(error);
        alert(
          "Ha surgido un problema listando los proveedores, intentelo nuevamente."
        );
      }
    },

    async eliminar(proveedor) {
      try {
        const confirmacion = confirm(
          "¿Estás seguro de que deseas eliminar este proveedor?"
        );
        if (confirmacion) {
          const ID = this.$store.state.auth.userId;

          const url = `${API_URL}/${ENDPOINT_ELIMINAR_PROVEEDOR}`;
          const token = this.$store.state.auth.token;

          const objeto = {
            proveedor: proveedor,
            solicitante: ID,
          };

          await axios.post(url, objeto, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          alert("Se ha eliminado el proveedor correctamente.");
          this.mostrar();
        }
      } catch (error) {
        console.error(error);
        alert(
          "Ha surgido un problema eliminando el proveedor, intentelo nuevamente."
        );
      }
    },

    mostrarEdicion(objeto) {
      this.$refs.modalEditar.openModal(objeto);
    },

    mostrarInformacion(datos) {
      this.$refs.modalVer.openModal(datos);
    },

    abrirAgregarProveedor() {
      this.$refs.formularioAgregar.openModal();
    },

    async editar(objeto) {
      try {
        const url = `${API_URL}/${ENDPOINT_EDITAR_PROVEEDOR}`;

        const ID = this.$store.state.auth.userId;

        const token = this.$store.state.auth.token;

        const objetoAenviar = {
          proveedor: objeto,
          solicitante: ID,
        };

        await axios.put(url, objetoAenviar, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Se ha editado el proveedor correctamente.");
        this.mostrar();
      } catch (error) {
        if (error.response && error.response.status === 530) {
          alert("Ya existe un proveedor con el mismo correo registrado.");
        } else {
          alert(
            "Ha ocurrido un problema editando el proveedor, inténtelo nuevamente."
          );
        }
        this.mostrar();
      }
    },
  },
};
