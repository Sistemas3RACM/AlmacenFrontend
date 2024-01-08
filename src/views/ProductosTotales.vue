<template>
  <section class="container-fluid">
    <div>
      <div class="row">
        <div class="col-2 m-0 p-0">
          <Nvar />
        </div>
        <div class="col-10 m-0 p-0">
          <section class="container-fluid">
            <div class="row">
              <div class="mt-5">
                <div class="row">
                  <div class="col-md-3">
                    <h1 class="h1 m-3">Inventario</h1>
                  </div>
                  <div class="col-md-2 mt-4">
                    <button @click="mostrar()" class="btn m-1 btn-warning">
                      <font-awesome-icon :icon="['fas', 'sync-alt']" />
                    </button>
                  </div>
                  <div class="col-md-3 mt-4">
                    <button @click="exportToExcel" class="btn btn-success">Exportar a Excel</button>
                  </div>
                  <div class="col-md-4 mt-4">
                    <BusquedaGeneral @busqueda="buscarProducto" />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-10">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Numero de Serie</th>
                          <th>Cantidad</th>
                          <th>Anaquel</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="producto in paginated" :key="producto.id">
                          <td>{{ producto.nombre }}</td>
                          <td>{{ producto.numeroDeSerie }}</td>
                          <td>{{ producto.cantidad }}</td>
                          <td>{{ producto.localizacion }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="pagination-buttons boton-container">
                      <button @click="goToPage(currentPage - 1)" class="btn btn-info"
                        :disabled="currentPage === 1">Anterior</button>
                      <button @click="goToPage(currentPage + 1)" class="btn btn-info"
                        :disabled="currentPage === totalPages">Siguiente</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import tabla from '../components/tablainformacion.vue';
import Nvar from '../components/Nvar';
import BusquedaGeneral from '@/components/BusquedaGeneral.vue';
import ProductosTotalesScript from './ProductosTotalesScript';

export default {
  ...ProductosTotalesScript,
  components: {
    tabla,
    BusquedaGeneral,
    Nvar,
  },
};
</script>

<style scoped>
.boton-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
