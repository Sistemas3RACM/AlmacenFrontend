<template>
    <div v-if="show">
        <div>
            <div class="col-2 mt-2">
                <a class="btn btn-success" @click="generarExcel">Generar excel</a>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Solicitante</th>
                        <th>Fecha de salida</th>
                        <th>Cantidad de salida</th>
                        <th>Cuenta de salida</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="registro in paginated" :key="registro.idSolicitud">
                        <td>{{ getNombreProducto(registro.idProducto) }}</td>
                        <td>{{ registro.solicitante }}</td>
                        <td>{{ registro.fechaSolicitud.slice(0, 10) }}</td>
                        <td>{{ registro.cantidad }}</td>
                        <td>{{ registro.proyectoCuenta }}</td>
                        <td>
                            <!-- <a class="btn m-1 btn-primary" @click="mostrarInformacion(requisicion.idRequisicion)">
                                <font-awesome-icon :icon="['fas', 'eye']" />
                            </a> -->
                        </td>
                        <!-- <td>{{ getNombreSubcuenta(requisicion.subcuenta) }}</td> -->
                    </tr>
                </tbody>
            </table>
            <!-- Botones de navegación -->
            <div class="pagination-buttons boton-container">
                <button @click="goToPage(currentPage - 1)" class="btn btn-info"
                    :disabled="currentPage === 1">Anterior</button>
                <button @click="goToPage(currentPage + 1)" class="btn btn-info"
                    :disabled="currentPage === totalPages">Siguiente</button>
            </div>
        </div>
    </div>
</template>

<script>
import ReporteSalidaScript from './ReporteSalidaScript';

export default {
    ...ReporteSalidaScript,
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>