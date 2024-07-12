export default {
  data() {
    return {
      categoria: {
        nombre: "",
      },
      show: false,
    };
  },
  methods: {
    async openModal() {
      this.categoria = {
        nombre: "",
      };
      this.show = true;
    },

    cerrarFormulario() {
      this.show = false;
    },

    agregarCategoria() {
      this.$emit("guardar-categoria", this.categoria);
      this.cerrarFormulario();
    },
  },
};
