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
import {
    API_URL,
    ENDPOINT_BUSCAR_PRODUCTO,
    ENDPOINT_LISTAR_MOVIMIENTOS,
    ENDPOINT_CONSULTAR_USUARIO,
} from '../keys';
import BusquedaGeneral from '@/components/BusquedaGeneral.vue';

export default {
    name: 'InicioSubcategoria',
    components: {
        Nvar,
        BusquedaGeneral,
    },
    data() {
        return {
            movimientos: null,
            type: 'movimientos',
            currentPage: 1,
            pageSize: 6,
        };
    },
    mounted() {
        this.mostrar();
    },
    // The `computed` property in Vue is used to define properties that are derived from the component's
    // data and are reactive.
    computed: {
        totalPages() {
            if (!this.movimientos) return 0;
            return Math.ceil(this.movimientos.length / this.pageSize);
        },
        // The `paginated()` method is a computed property in the Vue component. It is used to calculate and
        // return a subset of the `movimientos` data based on the current page and page size.
        paginated() {
            if (!this.movimientos) return null;

            const sortedmovimientos = this.movimientos.slice().reverse();

            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            return sortedmovimientos.slice(startIndex, endIndex);
        },
    },
    methods: {
        // The `goToPage` method is used to navigate to a specific page in the paginated table. It takes a
        // `page` parameter which represents the page number to navigate to.
        async goToPage(page) {
            if (page < 1) page = 1;
            if (page > this.totalPages) page = this.totalPages;
            this.currentPage = page;
        },
        async buscarNombreUsuario(id) {
            const url = `${API_URL}/${ENDPOINT_CONSULTAR_USUARIO}/${id}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const usuario = await response.json();
                    return usuario.nombre || 'Nombre no encontrado';
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                return 'Nombre no encontrado';
            }
        },
        // The `updateMovimientosWithNames()` method is an asynchronous function that updates the `movimientos`
        // data with the names of the responsible users.
        async updateMovimientosWithNames() {
            if (!this.movimientos) return;

            const movimientosWithNames = await Promise.all(
                this.movimientos.map(async (movimiento) => {
                    console.log(movimiento.encargado);
                    const nombre = await this.buscarNombreUsuario(movimiento.encargado);
                    return { ...movimiento, encargadoName: nombre };
                })
            );

            this.movimientos = movimientosWithNames;
        },
        async mostrar() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_MOVIMIENTOS}`;

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    this.movimientos = data;
                    this.currentPage = 1;
                    await this.updateMovimientosWithNames();
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async buscarProducto(termino) {
            const url = `${API_URL}/${ENDPOINT_BUSCAR_PRODUCTO}?nombre=${termino}`;

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    this.movimientos = data;
                    this.currentPage = 1;
                    await this.updateMovimientosWithNames();
                } else {
                    throw new Error("Error en la solicitud.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
        // The `obtenerFecha` method is a helper function that takes a `fechaCompleta` parameter, which
        // represents a full date and time string.
        obtenerFecha(fechaCompleta) {
            if (fechaCompleta) {
                return fechaCompleta.split('T')[0];
            }
            return '';
        },
        // The `obtenerHora` method is a helper function that takes a `fechaCompleta` parameter, which
        // represents a full date and time string.
        obtenerHora(fechaCompleta) {
            if (fechaCompleta) {
                return fechaCompleta.split('T')[1].substr(0, 5);
            }
            return '';
        },
    },
};
</script>
  