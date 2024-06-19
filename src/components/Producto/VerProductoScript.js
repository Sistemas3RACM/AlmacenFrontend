export default {
  data() {
    return {
      objetoLocal: {},
      localizacionOptions: [
        { valor: "01", etiqueta: "Anaquel 1" },
        { valor: "02", etiqueta: "Anaquel 2" },
        { valor: "03", etiqueta: "Anaquel 3" },
        { valor: "04", etiqueta: "Anaquel 4" },
        { valor: "05", etiqueta: "Anaquel 5" },
        { valor: "06", etiqueta: "Anaquel 6" },
        { valor: "07", etiqueta: "Anaquel 7" },
        { valor: "08", etiqueta: "Anaquel 8" },
        { valor: "09", etiqueta: "Anaquel 9" },
        { valor: "00", etiqueta: "Ninguno" },
        { valor: "100", etiqueta: "Servicio" },
      ],
      servicioOptions: [
        { valor: 0, etiqueta: "No" },
        { valor: 1, etiqueta: "Si" },

      ],
      show: false,
    };
  },
  methods: {
    openModal(objeto) {
      this.objetoLocal = objeto;
      this.show = true;
    },

    closeModal() {
      this.$emit("regresar-listado");
      this.show = false;
    },

    formatCurrency(amount) {
      if (amount === undefined || amount === null) return "";
      return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },

  },
};
