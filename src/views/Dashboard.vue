<template>
  <section class="container-fluid">
    <div>
      <div class="row">
        <div class="col-2 m-0 p-0" v-flex="fill">
          <Nvar/>
        </div>
        <div class="col-10 m-0 p-0 bg-success">

        </div>
      </div>
    </div>
  </section>
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
