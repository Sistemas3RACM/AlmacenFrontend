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
    handleLogout() {
      this.$router.push("/");
    },
  },
}
</script>
