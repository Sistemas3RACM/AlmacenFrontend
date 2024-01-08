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
                            <div class="mt-5 tablaP">
                                <div class="row">
                                    <div class="col-3">
                                        <h1 class="h1 m-3">Movimientos</h1>
                                    </div>
                                    <div class="col-4 mt-4">
                                        <button @click="mostrar()" class="btn m-1 btn-warning">
                                            <font-awesome-icon :icon="['fas', 'sync-alt']" />
                                        </button>
                                    </div>
                                    <div class="col-4 mt-4">
                                        <BusquedaGeneral @busqueda="buscarProducto" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-10">
                                        <table class="table table-striped" v-if="paginated" :type="type" :data="paginated">
                                            <thead>
                                                <tr>
                                                    <th>Movimiento</th>
                                                    <th>Responsable</th>
                                                    <th>Fecha</th>
                                                    <th>Hora</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="movimiento in paginated" :key="movimiento.id">
                                                    <td>{{ movimiento.tipoMovimiento }}</td>
                                                    <td>{{ movimiento.encargadoName }}</td>
                                                    <td>{{ obtenerFecha(movimiento.fechaDeMovimiento) }}</td>
                                                    <td>{{ obtenerHora(movimiento.fechaDeMovimiento) }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="pagination-buttons boton-container">
                                            <button @click="goToPage(currentPage - 1)" class="btn btn-info"
                                                :disabled="currentPage === 1">
                                                Anterior
                                            </button>
                                            <button @click="goToPage(currentPage + 1)" class="btn btn-info"
                                                :disabled="currentPage === totalPages">
                                                Siguiente
                                            </button>
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
<style scoped>
.boton-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}
</style>
  
<script>
import Nvar from '../components/Nvar';
import BusquedaGeneral from '@/components/BusquedaGeneral.vue';
import PrincipalMovimientosScript from './PrincipalMovimientosScript';

export default {
    ...PrincipalMovimientosScript,
    components: {
        Nvar,
        BusquedaGeneral,
    },
};
</script>
  