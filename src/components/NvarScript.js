export default {
  data() {
    return {
      isNavbarOpen: false,
      isDropdownOpen: false,
      permisosAdmin: 0,
    };
  },
  mounted() {
    this.obtenerPermisos();
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
    obtenerPermisos() {
      const permisos = this.$store.state.auth.userAdmin;
      this.permisosAdmin = permisos;
    },
    toggleDropdown(status) {
      this.isDropdownOpen = status;
    },
  },
};
