<template>
    <div class="row" v-if="show">
        <div class="col-md-12" v-if="productos.length > 0">
            <table class="table table-striped justify-content-center text-center">
                <thead>
                    <tr class="table-active">
                        <th>Número de serie</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Unidad de medida</th>
                        <!-- <th>Acciones</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="producto in paginated" :key="producto.idProducto">
                        <td>{{ producto.numeroDeSerie }}</td>
                        <td>{{ producto.nombre }}</td>
                        <td>{{ producto.cantidad }}</td>
                        <td>{{ producto.unidadMedida }}</td>
                        <!-- <td class="button-container">

                            <button @click="abrirModalInformacion(producto.idProducto)"
                                class="btn btn-primary btn-redondo">
                                <font-awesome-icon :icon="['fas', 'eye']" />
                            </button>


                        </td> -->
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
            <h1 class="text-center">No hay ningún producto registrado.</h1>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            productos: [],
            currentPage: 1,
            pageSize: 8,

        };
    },
    computed: {
        // The above code is a method in a Vue component that calculates the total number of pages based on the
        // number of users and the page size. It first checks if the `usuarios` array is defined, and if not,
        // it returns 0. If the `usuarios` array is defined, it calculates the total number of pages by
        // dividing the length of the `usuarios` array by the `pageSize` property and rounding up using the
        // `Math.ceil()` function.
        totalPages() {
            if (!this.productos) return 0;
            return Math.ceil(this.productos.length / this.pageSize);
        },
        // The above code is a method in a Vue component that is used for pagination.
        paginated() {
            if (!this.productos) return null;

            const sortedproductos = this.productos.slice().reverse();

            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            return sortedproductos.slice(startIndex, endIndex);
        },
    },
    methods: {
        goToPage(page) {
            if (page < 1) page = 1;
            if (page > this.totalPages) page = this.totalPages;
            this.currentPage = page;
        },

        openModal(registros) {
            this.productos = registros;
            this.show = true;
        },
        closeModal() {
            this.show = false;
        },
    },
};
</script>
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
