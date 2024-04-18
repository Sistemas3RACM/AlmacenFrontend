import { API_REQUISICIONES_URL, API_URL, ENDPOINT_LISTAR_CATEGORIAS, ENDPOINT_LISTAR_CUENTAS, ENDPOINT_LISTAR_FECHAS, ENDPOINT_LISTAR_PRODUCTOS, } from '@/keys';
import axios from 'axios';

export default {
  name: 'Dashboard',
  data() {
    return {
      idCategoriaS: 0,
      nombreCategoria: '',

      cuentas: [],
      cuentaSeleccionada: null,
      categorias: [],
      categoriaSeleccionada: null,
      fechaYHora: "",
      productos: [],
      productosTotales: [],
      productosActuales: [],
      fechaInventario: '',
      ultimaFecha: '',
      proximaFecha: '',
      ultimoRegistro: '',
      existeFecha: false,
    };
  },
  methods: {
    async handleLogout() {
      try {
        this.$store.dispatch('auth/logout');
        this.$router.push("/");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    },

    obtenerFecha() {
      var fechaYHoraActual = new Date();
      var options = {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
      };
      var formatoFechaYHora = fechaYHoraActual.toLocaleString('es-ES', options);
      this.fechaYHora = formatoFechaYHora;
    },

    obtenerCategoriasDisponibles() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_CATEGORIAS}`;

      return axios.get(url)
        .then(response => {
          this.categorias = response.data;
        })
        .catch(() => {
          console.log("Error listando las categorias.");
        });
    },

    obtenerCuentasDisponibles() {
      const url = `${API_REQUISICIONES_URL}/${ENDPOINT_LISTAR_CUENTAS}`;

      return axios.get(url)
        .then(response => {
          this.cuentas = response.data;
        })
        .catch(() => {
          console.log("Error listando las cuentas.");
        });

    },

    obtenerProductos() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_PRODUCTOS}`;

      return axios.get(url)
        .then(response => {
          this.productos = response.data;
        })
        .catch(() => {
          console.log("Error listando los productos.");
        });

    },

    async cambiarSeleccion() {
      await this.cargarProductos();
      await this.actualizarComponentes();
    },

    async cargarProductos() {
      if (this.cuentaSeleccionada != null) {
        this.productosActuales = this.productos.filter(producto => producto.idCuenta == this.cuentaSeleccionada.idCuenta);
        this.productosTotales = this.productosActuales;
        if (this.categoriaSeleccionada != null) {
          this.productosActuales = this.productosActuales.filter(producto => producto.idCategoria == this.categoriaSeleccionada.idCategoria);
        }
      } else {
        if (this.categoriaSeleccionada != null) {
          this.productosActuales = this.productos.filter(producto => producto.idCategoria == this.categoriaSeleccionada.idCategoria);
        }
      }
    },

    async actualizarComponentes() {
      if (this.cuentaSeleccionada != null) {
        this.$refs.dineroEntradas.mostrar();
        this.$refs.productosTotales.mostrar();
        if (this.categoriaSeleccionada != null) {
          this.$refs.dineroPorCategoria.mostrar();
          // this.$refs.menosPorCategoria.mostrar();
          this.$refs.totalProductosCategoria.mostrar();
        }
      } else {
        if (this.categoriaSeleccionada != null) {
          this.$refs.dineroPorCategoria.mostrar();
          // this.$refs.menosPorCategoria.mostrar();
          this.$refs.totalProductosCategoria.mostrar();
        }
      }
    },

    async openScreen() {
      this.obtenerFecha();
      await this.obtenerCuentasDisponibles();
      await this.obtenerCategoriasDisponibles();
      await this.obtenerProductos();
      await this.obtenerUltimaFecha();
    },

    async obtenerUltimaFecha() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_FECHAS}`;

      return axios.get(url)
        .then(response => {
          this.fechaInventario = response.data;
          const ultimoRegistro = this.fechaInventario[this.fechaInventario.length - 1];
          this.ultimoRegistro = ultimoRegistro;
          this.existeFecha = true;
          const opcionesFormato = { day: '2-digit', month: '2-digit', year: 'numeric' };
          this.ultimaFecha = new Date(ultimoRegistro.ultimaFecha).toLocaleDateString('es-ES', opcionesFormato);
          this.proximaFecha = new Date(ultimoRegistro.proximaFecha).toLocaleDateString('es-ES', opcionesFormato);
        })
        .catch(() => {
          this.proximaFecha = 'Sin registro';
          this.existeFecha = false;
          console.log("No se ha obtenido la ultima fecha.");
        });
    },

    abrirModalInventario() {

      this.$refs.modalInventario.openModal();
    },

  },
  mounted() {
    this.openScreen();
    setInterval(() => {
      this.obtenerFecha();
    }, 20000);
  },
}
