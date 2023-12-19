<template>
  <section class="container-fluid">
    <div>
      <div class="row">
        <div class="col-12 col-md-2 m-0 p-0">
          <Nvar />
        </div>
        <div class="col-12 col-md-10">
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
    // Esta función maneja el cierre de sesión del usuario
    async handleLogout() {
      try {
        // Se llama a la acción de logout del módulo de autenticación del store
        this.$store.dispatch('auth/logout');
        // Se redirige al usuario a la página de inicio
        this.$router.push("/");
      } catch (error) {
        // Se muestra un mensaje de error en la consola si ocurre algún problema
        console.error("Error al cerrar sesión:", error);
      }
    },

  },
}
</script>
