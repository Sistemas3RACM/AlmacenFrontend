export default {
  data() {
    return {
      show: false,
      objeto: {},
    };
  },
  methods: {
    openModal(objeto) {
      this.objeto = objeto;
      this.show = true;
    },

    closeModal() {
      this.show = false;
    },
  },
};
