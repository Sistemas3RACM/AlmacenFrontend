<template>
  <div class="container m-0 p-0">
    <div class="row">
      <div class="col col-lg-2 ">
        <Nvar @logoutClicked="handleLogout" />
      </div>
      <div class="col col-lg-8">

      </div>
    </div>
  </div>
</template>
<script>
import Nvar from '@/components/Nvar.vue';

export default {
  name: 'Dashboard',
  components: {
    Nvar
  },
  methods: {
    async handleLogout() {
      // Lógica para cerrar sesión en el servidor, si es necesario
      try {
        this.$store.dispatch('auth/logout');
        this.$router.push("/");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    },
  },
}
</script>
