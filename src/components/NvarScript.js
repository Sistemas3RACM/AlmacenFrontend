export default {
  data() {
    return {
      isNavbarOpen: false,
      mostrarUsuario: false,
      mostrarCampos: false,
    };
  },
  mounted() {
    this.esAdministrador();
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    },
    logout() {
      this.$emit("logoutClicked");
    },
    esAdministrador() {
      const admin = this.$store.state.auth.userAdmin;

      if (admin === 1) {
        this.mostrarCampos = true;
        this.mostrarUsuario = true; // Muestra el enlace Usuarios
      } else if (admin === 2) {
        // Mostrar todos los campos excepto el de Usuarios
        this.mostrarCampos = true;
        this.mostrarUsuario = false; // Oculta el enlace Usuarios
      }
    },
  },
};
