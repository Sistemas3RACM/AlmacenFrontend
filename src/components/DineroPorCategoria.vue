<template>
    <div class="contenedor">
        <div v-if="mostrarTablaCategorias">
            <h2 class="text-center">Dinero por categoría</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="categoria in categorias" :key="categoria.id">
                        <td>{{ categoria.nombre }}</td>
                        <td> <button @click="obtenerIDCategoria(categoria)" class="btn m-1 btn-primary">
                                Seleccionar
                            </button>
                        </td>
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
        <div class="col-md-12" v-if="!mostrarTablaCategorias">
            <button @click="mostrar()" class="btn m-2 col-12 btn-warning">
                Volver a seleccionar
            </button>
            <div class="contador">
                <h3>Dinero dentro de esta categoría:</h3>
                <div class="numero">$ {{ total }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import tabla from '../components/tablainformacion.vue';

import {
    API_URL, ENDPOINT_LISTAR_CATEGORIAS, ENDPOINT_BUSCAR_CATEGORIA, ENDPOINT_LISTAR_PRODUCTO_POR_CATEGORIA
} from '../keys';

export default {
    name: 'ProductoPorCategoria',
    components: {
        tabla,
    },
    data() {
        return {
            categorias: null,
            productos: null,
            mostrarTablaCategorias: true,
            total: 0,
            currentPage: 1,
            pageSize: 6,
        };
    },
    mounted() {
        this.mostrar();
    },
    computed: {

        totalPages() {
            if (!this.categorias) return 0;
            return Math.ceil(this.categorias.length / this.pageSize);
        },

        paginated() {
            if (!this.categorias) return null;

            const sortedcategorias = this.categorias.slice().reverse();

            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            return sortedcategorias.slice(startIndex, endIndex);
        },
    },
    methods: {
        goToPage(page) {
            if (page < 1) page = 1;
            if (page > this.totalPages) page = this.totalPages;
            this.currentPage = page;
        },
        mostrar() {
            this.productos= null;
            this.mostrarTablaCategorias= true;
            this.total= 0;
            const url = `${API_URL}/${ENDPOINT_LISTAR_CATEGORIAS}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.categorias = data;
                })
                .catch(error => console.log(error));
        },
        calcularCantidad(productos) {
            let total = 0;

            for (const producto of productos) {
                const precioUnitario = producto.precioUnitario;
                const cantidad = producto.cantidad;

                const subtotal = precioUnitario * cantidad;

                total += subtotal;
            }
            this.total = total;
            this.total = total.toLocaleString('en-US');
        },
        obtenerIDCategoria(categoria) {
            const id = categoria.idCategoria;
            this.selectedCategoria = categoria;
            const url = `${API_URL}/${ENDPOINT_LISTAR_PRODUCTO_POR_CATEGORIA}/${id}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.mostrarTablaCategorias = false;
                    this.productos = data;
                    this.calcularCantidad(this.productos);
                })
                .catch(error => console.log(error));
        },
    },

};
</script>
<style scoped>
.contenedor{
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}
.boton-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.contador {
    width: 100%;

    background-color: rgb(33, 12, 109);
    color: #fff;
    text-align: center;
    border-radius: 10px;

}

.contador .numero {
    font-size: 50px;
    font-weight: bold;
}
</style>