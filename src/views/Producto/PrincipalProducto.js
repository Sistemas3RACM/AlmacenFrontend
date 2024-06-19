import {
  API_URL,
  ENDPOINT_AGREGAR_PRODUCTO,
  ENDPOINT_CONSULTAR_PRODUCTO,
  ENDPOINT_EDITAR_PRODUCTO,
  ENDPOINT_ELIMINAR_PRODUCTO,
  ENDPOINT_LISTAR_PRODUCTOS,
} from "@/keys";
import axios from "axios";

export default {
  name: "UsuariosView",
  data() {
    return {
      todosProductos: [],
      productos: [],
      enProductos: true,
      showInput: false,
      searchTerm: "",
      show: true,
      permisosAdmin: 0,

      currentPage: 1,
      pageSize: 8,
    };
  },
  mounted() {
    this.mostrar();
    this.obtenerPermisos();
  },
  computed: {
    // The above code is a method in a Vue component that calculates the total number of pages based on the
    // number of users and the page size. It first checks if the `usuarios` array is defined, and if not,
    // it returns 0. If the `usuarios` array is defined, it calculates the total number of pages by
    // dividing the length of the `usuarios` array by the `pageSize` property and rounding up using the
    // `Math.ceil()` function.
    totalPages() {
      if (!this.productos) return 0;
      return Math.ceil(this.productos.length / this.pageSize);
    },
    // The above code is a method in a Vue component that is used for pagination.
    paginated() {
      if (!this.productos) return null;

      const sortedproductos = this.productos.slice().reverse();

      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return sortedproductos.slice(startIndex, endIndex);
    },
  },
  methods: {
    goToPage(page) {
      if (page < 1) page = 1;
      if (page > this.totalPages) page = this.totalPages;
      this.currentPage = page;
    },

    async mostrar() {
      this.enProductos = true;
      const url = `${API_URL}/${ENDPOINT_LISTAR_PRODUCTOS}`;
      const token = this.$store.state.auth.token;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.todosProductos = response.data;
        this.productos = this.todosProductos.filter(
          (producto) => producto.servicio == 0
        );
        this.show = true;
      } catch (error) {
        console.log(error);
        alert(
          "Ha surgido un problema listando los productos, intentelo nuevamente."
        );
      }
    },

    async guardar(objeto) {
      const ID = this.$store.state.auth.userId;
      const token = this.$store.state.auth.token;

      const url = `${API_URL}/${ENDPOINT_AGREGAR_PRODUCTO}`;

      try {
        const objetoAenviar = {
          producto: objeto,
          solicitante: ID,
        };

        await axios.post(url, objetoAenviar, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Se ha creado el producto con éxito");
        this.mostrar();
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 530) {
          alert("Ya existe un producto con el mismo nombre registrado.");
        } else {
          alert(
            "Ha ocurrido un problema creando el producto, inténtelo nuevamente."
          );
        }
        this.mostrar();
      }
    },

    async abrirModalInformacion(id) {
      let objeto = await this.consultarProducto(id);
      this.show = false;
      this.$refs.Informacion.openModal(objeto);
    },

    abrirModalEdicion(objeto) {
      this.show = false;
      this.$refs.Editar.openModal(objeto);
    },

    abrirModalEntrada(objeto) {
      this.$refs.Entrada.openModal(objeto);
    },

    abrirModalSalida(objeto) {
      this.$refs.Salida.openModal(objeto);
    },

    abrirAgregar() {
      this.show = false;
      this.$refs.Agregar.openModal();
    },

    async consultarProducto(id) {
      const url = `${API_URL}/${ENDPOINT_CONSULTAR_PRODUCTO}/${id}`;
      const token = this.$store.state.auth.token;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.log(error);
        alert(
          "Ha surgido un problema listando los productos, intentelo nuevamente."
        );
      }
    },

    async editar(objeto) {
      try {
        const url = `${API_URL}/${ENDPOINT_EDITAR_PRODUCTO}`;

        const ID = this.$store.state.auth.userId;

        const token = this.$store.state.auth.token;

        const objetoAenviar = {
          producto: objeto,
          solicitante: ID,
        };

        await axios.put(url, objetoAenviar, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (objeto.esEntrada) {
          alert("Se ha agregado cantidad a este producto.");
        } else {
          alert("Se ha editado el producto correctamente.");
        }
        this.mostrar();
      } catch (error) {
        if (error.response && error.response.status === 530) {
          alert("Ya existe un producto con el mismo nombre registrado.");
        } else {
          alert(
            "Ha ocurrido un problema editando el producto, inténtelo nuevamente."
          );
        }
        this.mostrar();
      }
    },

    async eliminar(producto) {
      try {
        const confirmacion = confirm(
          "¿Estás seguro de que deseas eliminar este producto?"
        );
        if (confirmacion) {
          const ID = this.$store.state.auth.userId;

          const url = `${API_URL}/${ENDPOINT_ELIMINAR_PRODUCTO}`;
          const token = this.$store.state.auth.token;

          const objeto = {
            producto: producto,
            solicitante: ID,
          };

          await axios.post(url, objeto, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          alert("Se ha eliminado el producto correctamente.");
          this.mostrar();
        }
      } catch (error) {
        console.error(error);
        alert(
          "Ha surgido un problema eliminando el producto, intentelo nuevamente."
        );
      }
    },

    toggleSearchInput() {
      this.showInput = !this.showInput;
      if (!this.showInput) {
        this.searchTerm = "";
        this.mostrar();
      }
    },

    buscar(cadena) {
      let nuevaCadena = cadena.toLowerCase();
      this.productos = this.todosProductos.filter(
        (producto) =>
          producto.nombre.toLowerCase().includes(nuevaCadena) ||
          producto.numeroDeSerie.toLowerCase().includes(nuevaCadena)
      );
    },

    cambioServicio() {
      if (this.enProductos == true) {
        this.productos = this.todosProductos.filter(
          (producto) => producto.servicio == 1
        );
        this.enProductos = false;
      } else {
        this.productos = this.todosProductos.filter(
          (producto) => producto.servicio == 0
        );
        this.enProductos = true;
      }
    },

    obtenerPermisos() {
      const permisos = this.$store.state.auth.userAdmin;
      this.permisosAdmin = permisos;
    },
  },
};
