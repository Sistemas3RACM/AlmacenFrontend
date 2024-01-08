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
                  <div v-if="selectedCategoria" class="col-md-3 mt-4">
                    <button @click="exportToExcel" class="btn btn-success">Exportar a Excel</button>
                  </div>
                  <div class="col-md-4 mt-4">
                    <BusquedaGeneral @busqueda="buscarCategoria" />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-5">
                    <tabla v-if="paginated" :type="type" :data="paginated" :fields="['nombre']">
                      <template #default="{ item }">
                        <button @click="obtenerIDCategoria(item)" class="btn m-1 btn-primary">
                          Seleccionar
                        </button>
                      </template>
                    </tabla>
                    <div class="pagination-buttons boton-container">
                      <button @click="goToPage(currentPage - 1)" class="btn btn-info"
                        :disabled="currentPage === 1">Anterior</button>
                      <button @click="goToPage(currentPage + 1)" class="btn btn-info"
                        :disabled="currentPage === totalPages">Siguiente</button>
                    </div>
                  </div>
                  <div class="col-md-6" v-if="selectedCategoria">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Cantidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="producto in productos" :key="producto.id">
                          <td>{{ producto.nombre }}</td>
                          <td>{{ producto.cantidad }}</td>
                        </tr>
                      </tbody>
                    </table>
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
import ProductosCategoriasScript from './ProductosCategoriasScript';


export default {
  ...ProductosCategoriasScript,
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
