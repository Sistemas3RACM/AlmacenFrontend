export default {
  data() {
    return {
      subcategoria: {
        nombre: "",
        idCategoria: "",
      },
      categorias: [],
      show: false,
    };
  },

  methods: {
    async openModal(categorias) {
      this.categorias = categorias;
      this.show = true;
    },

    closeModal() {
      this.subcategoria.nombre = "";
      this.subcategoria.idCategoria = "";
      this.show = false;
    },

    agregarSubcategoria() {
      this.$emit("guardar-subcategoria", this.subcategoria);
      this.closeModal();
    },
  },
};
