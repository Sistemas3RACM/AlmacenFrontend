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
import store from "../store/auth";

export default {
    name: 'Dashboard', 
    components: {
        Nvar
    },
    methods: {
    handleLogout() {
      // Llama a la acción de logout en tu módulo Vuex 'auth'
      store.dispatch("auth/logout").then(() => {
        // Después del cierre de sesión, redirige al usuario a la página de inicio de sesión
        this.$router.push("/");
      });
    },
  },
}
</script>
