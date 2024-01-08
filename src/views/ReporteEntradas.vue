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
                            <div class="col-7 mt-5 tablaP">
                                <div class="row">
                                    <div class="col-4">
                                        <h1 class="h1 m-3">Reportes</h1>
                                    </div>
                                    <div class="col-2 mt-4">
                                        <button @click="ListarEntradas" class="btn m-1 btn-warning">
                                            obtener
                                        </button>
                                    </div>
                                    <div class="col-4 mt-4">
                                        <button @click="generatePDF" class="btn m-1 btn-info" v-if="mostrarGenerar">
                                            Generar PDF
                                        </button>
                                    </div>
                                    <div class="col-2 mt-4">
                                        <button type="button" @click="redirigirAEntradas"
                                            class="btn m-1 btn-warning" v-if="mostrarGenerar"><font-awesome-icon :icon="['fas', 'sync-alt']" /></button>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <!-- Modifica la propiedad mode a 'single' -->
                                    <div class="row">
                                        <div class="col-6">
                                            <label>Fecha de Inicio:</label>
                                            <flat-pickr v-model="startDate" :config="flatpickrOptions"></flat-pickr>
                                        </div>
                                        <div class="col-6">
                                            <label>Fecha de Término:</label>
                                            <flat-pickr v-model="endDate" :config="flatpickrOptions"></flat-pickr>
                                        </div>
                                    </div>
                                    <div class="row mt-5" v-if="mostrarGrafico" ref="chartContainer">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Cantidad de entrada</th>
                                                    <th>Fecha de entrada</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="entrada in paginated" :key="entrada.id">
                                                    <td>{{ entrada.cantidad }}</td>
                                                    <td>{{ formatDate(entrada.fechaEntrada) }}</td>
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
                            <div class="col-5 mt-5" v-if="mostrarGrafico" ref="chartContainer">
                                <div ref="chartContainer1">
                                    <Line :data="chartData" ref="lineChart" />
                                </div>
                                <div ref="chartContainer2">
                                    <Line :data="chartData2" ref="lineChart2" class="mt-3" />
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
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { Line } from 'vue-chartjs';
import ReporteEntradasScript from './ReporteEntradasScript';
export default {
    ...ReporteEntradasScript,
    components: {
        Nvar,
        flatPickr,
        Line,
    },
};
</script>
  