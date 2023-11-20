<template>
  <section class="container-fluid">
    <div>
      <div class="row">
        <div class="col-2 m-0 p-0">
          <Nvar />
        </div>
        <div class="col-md-10">
          <div class="row">
            <div class="col-md-4 m-0 p-0">
              <DineroPorCategoria />
            </div>
            <div class="col-md-4 m-0 p-0">
              <MenosCantidadPorCategoria />
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 m-0 p-0">
              <DineroEntradas />
            </div>
            <div class="col-md-4 m-0 p-0">
              <ProductosTotales />
            </div>
            <div class="col-md-4 m-0 p-0">
              <AlertaInventario />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Nvar from '@/components/Nvar.vue';
import GraficoProductos from '@/components/GraficoProductos'
import GraficoCategorias from '@/components/GraficoCategorias.vue';
import DineroPorCategoria from '@/components/DineroPorCategoria'
import MenosCantidadPorCategoria from '@/components/MenosCantidadPorCategoria'
import DineroEntradas from '@/components/DineroEntradas.vue';
import ProductosTotales from '@/components/ProductosTotales.vue';
import AlertaInventario from '@/components/AlertaInventario.vue';

export default {
  name: 'Dashboard',
  components: {
    Nvar,
    GraficoProductos,
    GraficoCategorias,
    DineroPorCategoria,
    MenosCantidadPorCategoria,
    DineroEntradas,
    ProductosTotales,
    AlertaInventario,
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
