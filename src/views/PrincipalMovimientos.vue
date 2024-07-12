<template>
    <section class="container-fluid">
        <div>
            <div class="row">
                <Nvar />
            </div>
            <div class="row ">
                <div class="col-md-12">
                    <div class="row">
                        <div class="row m-2 align-items-center">
                            <div class="col-md-5">
                                <h1 class="titulo-seccion">Movimientos</h1>
                            </div>
                        </div>

                        <hr>
                        <div class="col-md-12" v-if="movimientos.length > 0">
                            <table class="table table-striped justify-content-center text-center">
                                <thead>
                                    <tr class="table-active">
                                        <th>Movimiento</th>
                                        <th>Solicitante</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="movimiento in paginated" :key="movimiento.idMovimiento">
                                        <td>{{ movimiento.tipoMovimiento }}</td>
                                        <td>{{ movimiento.solicitante }}</td>
                                        <td>{{ movimiento.fechaDeMovimiento.slice(0, 10) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- Botones de navegación -->
                            <div class="pagination-buttons boton-container">
                                <button @click="goToPage(currentPage - 1)" class="btn btn-secondary"
                                    :disabled="currentPage === 1">&lt;</button>
                                <button @click="goToPage(currentPage + 1)" class="btn btn-secondary"
                                    :disabled="currentPage === totalPages">&gt;</button>
                            </div>
                        </div>
                        <div class="col-md-9" v-else>
                            <h1 class="text-center">No hay ningún movimiento registrado.</h1>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

</template>

<style scoped>
.btn-mas {
    background-color: #28A745;
    /* Color de fondo */
    color: white;
    /* Color del texto */
}

/* Elimina el margen derecho del último botón */
.col-md-7 .btn:last-child {
    margin-right: 0;
}

.titulo-seccion {
    font-size: 3.4rem;
    /* Puedes ajustar el tamaño según prefieras */
    margin: 1.2rem;
}

.boton-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    /* Espacio entre botones */
}

.btn {
    border-radius: 0;
    /* Esquinas en punta */
    margin-right: 27px;
    /* Separación de 27px */
    padding: 10px 20px;
    /* Espaciado interno del botón */
    text-align: center;
    /* Alineación del texto */
    display: inline-block;
    /* Asegura que los botones estén en línea */
    text-decoration: none;
    /* Elimina el subrayado de los enlaces */
    font-weight: bold;
    /* Texto en negritas */
    cursor: pointer;
    /* Cursor en forma de mano */
    font-size: 1rem
}

thead tr {
    font-size: 1.1rem;
}

.btn-redondo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
}

.btn-anchura {
    width: 400px;
}

/* Botón de Pendientes */
.btn-servicios {
    background-color: #bf9f3f;
    /* Color de fondo */
    color: rgb(255, 255, 255);
    /* Color del texto */
}
</style>

<script>
import Nvar from '@/components/Nvar.vue';
import PrincipalMovimientosScript from './PrincipalMovimientosScript';

export default {
    ...PrincipalMovimientosScript,
    components: {
        Nvar,
    }
};
</script>