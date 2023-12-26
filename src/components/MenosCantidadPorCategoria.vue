<template>
    <div class="contenedor">
        <div v-if="!conCategoria">
            <div class="contador">
                <h3>Ninguna categoría seleccionada</h3>
            </div>
        </div>
        <div class="col-md-12" v-if="conCategoria">
            <div class="contador">
                <h3>Productos con menos cantidad:</h3>
                <ul class="productos-list">
                    <li v-for="producto in productosConMenos" :key="producto.id">
                        {{ producto.nombre }} - Cantidad: {{ producto.cantidad }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {
    API_URL, ENDPOINT_LISTAR_PRODUCTO_POR_CATEGORIA
} from '../keys';

export default {
    name: 'ProductoPorCategoria',
    props: {
        categoriaSeleccionada: {
            type: Number,
        },
        nombreCategoria:{
            type:String,
        }
    },
    data() {
        return {
            productos: null,
            productosConMenos: [],
            conCategoria: false,
        };
    },
    mounted() {
        this.mostrar();
    },
    watch: {
        categoriaSeleccionada(newCategoria, oldCategoria) {
            if (newCategoria !== oldCategoria) {
                this.mostrar();
            }
        },
    },
    methods: {
        mostrar() {
            this.productos= null;
            this.productosConMenos= [];
            const id = this.categoriaSeleccionada;

            const url = `${API_URL}/${ENDPOINT_LISTAR_PRODUCTO_POR_CATEGORIA}/${id}`;
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                    }
                    return response.json();
                })
                .then(data => {
                    this.productos = data;
                    this.calcularCantidad(this.productos);
                })
                .catch(error => console.error(error));

        },
        calcularCantidad(productos) {
            if (!productos || !Array.isArray(productos)) {
                return;
            }
            // Ordena los productos por cantidad en orden ascendente
            productos.sort((a, b) => a.cantidad - b.cantidad);

            // Toma los 3 primeros productos con las cantidades más bajas
            const tresProductosConMenosCantidad = productos.slice(0, 3);
            this.productosConMenos = tresProductosConMenosCantidad;
            this.conCategoria = true;
        },
    },

};
</script>
<style scoped>
.contenedor {
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
    font-size: 30px;
    font-weight: bold;
}

.productos-list {
    padding-left: 3px;
    list-style: none;
    padding: 0;
}
</style>