export default {
  data() {
    return {
      show: false,
      objeto: {},
    };
  },
  emits: ["editar-proveedor"],
  methods: {
    openModal(objeto) {
      this.objeto = objeto;
      this.show = true;
    },

    closeModal() {
      this.show = false;
    },

    editarProveedor() {
      if (!this.comprobarCampos()) {
        this.$emit("editar-proveedor", this.objeto);
        this.closeModal();
      }
    },

    comprobarCampos() {
      let mensaje = "Los siguentes campos no pueden estar vacios: \n";
      let campos = [];

      if (this.objeto.nombre == "") {
        campos.push("-Nombre");
      }

      if (campos.length > 0) {
        mensaje += campos.join(", \n");
        alert(mensaje);
        return true;
      }
      return false;
    },
  },
};
