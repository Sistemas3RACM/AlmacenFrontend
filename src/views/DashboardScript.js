import { API_URL, ENDPOINT_LISTAR_CATEGORIAS, } from '@/keys';

export default {
  name: 'Dashboard',
  data() {
    return {
      fechaYHora: "",
      categorias: [],
      categoriaSeleccionada: null,
      idCategoriaS: 0,
      nombreCategoria: '',
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
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.categorias = data;
        })
        .catch(error => {
          console.error('Error al obtener categorías:', error);
        });
    },
    categoriaselect() {
      // Verifica si se ha seleccionado una categoría
      if (this.categoriaSeleccionada) {
        // Encuentra la información de la categoría seleccionada
        const categoriaSeleccionadaData = this.categorias.find(categoria => categoria.idCategoria === this.categoriaSeleccionada);
        this.idCategoriaS = categoriaSeleccionadaData.idCategoria;
        this.nombreCategoria = categoriaSeleccionadaData.nombre;
      } else {
        // Si no se ha seleccionado ninguna categoría, muestra un mensaje o realiza alguna acción apropiada
        console.log('Ninguna categoría seleccionada');
      }
    },
  },
  mounted() {
    this.obtenerFecha();
    this.obtenerCategoriasDisponibles();
    setInterval(() => {
      this.obtenerFecha();
    }, 20000);
  },
}
