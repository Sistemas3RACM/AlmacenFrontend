export default {
  name: "SubcategoriasComponent",
  props: {
    subcategoriasEntrantes: Array,
  },
  data() {
    return {
      subcategorias: [],
      currentPage: 1,
      pageSize: 7,
    };
  },
  emits: [
    "agregar-subcategoria",
    "informacion-subcategoria",
    "editar-subcategoria",
    "eliminar-subcategoria",
  ],
  watch: {
    subcategoriasEntrantes: {
      handler(newValue) {
        this.subcategorias = newValue;
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
      if (!this.subcategorias) return 0;
      return Math.ceil(this.subcategorias.length / this.pageSize);
    },
    // The above code is a method in a Vue component that is used for pagination.
    paginated() {
      if (!this.subcategorias) return null;

      const sortedsubcategorias = this.subcategorias.slice().reverse();

      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return sortedsubcategorias.slice(startIndex, endIndex);
    },
  },
  methods: {
    goToPage(page) {
      if (page < 1) page = 1;
      if (page > this.totalPages) page = this.totalPages;
      this.currentPage = page;
    },

    mostrar() {
      this.subcategorias = this.subcategoriasEntrantes;
    },

    abrirAgregar() {
      this.$emit("agregar-subcategoria");
    },

    abrirModalInformacion(subcategoria) {
      this.$emit("informacion-subcategoria", subcategoria);
    },

    abrirModalEdicion(subcategoria) {
      this.$emit("editar-subcategoria", subcategoria);
    },

    eliminar(objeto) {
      this.$emit("eliminar-subcategoria", objeto);
    },
  },
};
