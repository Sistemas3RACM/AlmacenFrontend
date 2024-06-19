export default {
  data() {
    return {
      show: false,
      producto: {},
      cantidad: 0,
    };
  },
  methods: {
    openModal(objeto) {
      this.cantidad = 0;
      this.producto = objeto;
      this.show = true;
    },

    closeModal() {
      this.show = false;
    },

    guardar() {
      if (this.cantidad > 0) {
        this.producto.CantidadAgregada = this.cantidad;
        this.producto.esEntrada = true;

        this.$emit("crear-entrada", this.producto);
        this.closeModal();
      } else {
        alert("La cantidad a ingresar tiene que ser mayor a 0.");
      }
    },
  },
};
