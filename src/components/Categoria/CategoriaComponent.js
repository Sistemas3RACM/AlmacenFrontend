export default {
  name: "CategoriasComponent",
  props: {
    categoriasEntrantes: Array,
  },
  data() {
    return {
      categorias: [],
      currentPage: 1,
      pageSize: 7,
    };
  },
  emits: [
    "agregar-categoria",
    "informacion-categoria",
    "editar-categoria",
    "eliminar-categoria",
  ],
  watch: {
    categoriasEntrantes: {
      handler(newValue) {
        this.categorias = newValue;
      },
      immediate: true,
    },
  },

  computed: {
    // The above code is a method in a Vue component that calculates the total number of pages based on the
    // number of users and the page size. It first checks if the `usuarios` array is defined, and if not,
    // it returns 0. If the `usuarios` array is defined, it calculates the total number of pages by
    // dividing the length of the `usuarios` array by the `pageSize` property and rounding up using the
    // `Math.ceil()` function.
    totalPages() {
      if (!this.categorias) return 0;
      return Math.ceil(this.categorias.length / this.pageSize);
    },
    // The above code is a method in a Vue component that is used for pagination.
    paginated() {
      if (!this.categorias) return null;

      const sortedcategorias = this.categorias.slice().reverse();

      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return sortedcategorias.slice(startIndex, endIndex);
    },
  },
  methods: {
    goToPage(page) {
      if (page < 1) page = 1;
      if (page > this.totalPages) page = this.totalPages;
      this.currentPage = page;
    },

    mostrar() {
      this.categorias = this.categoriasEntrantes;
    },

    abrirAgregar() {
      this.$emit("agregar-categoria");
    },

    abrirModalInformacion(categoria) {
      this.$emit("informacion-categoria", categoria);
    },

    abrirModalEdicion(categoria) {
      this.$emit("editar-categoria", categoria);
    },

    eliminar(objeto) {
      this.$emit("eliminar-categoria", objeto);
    },
  },
};
