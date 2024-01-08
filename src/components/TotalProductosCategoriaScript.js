import {
    API_URL, ENDPOINT_LISTAR_PRODUCTO_POR_CATEGORIA
} from '../keys';

export default {
    name: 'ProductoPorCategoria',
    props: {
        categoriaSeleccionada: {
            type: Number,
        },
        nombreCategoria: {
            type: String,
        }
    },
    data() {
        return {
            productos: null,
            cantidadProductos: 0,
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
            this.productos = null;
            this.cantidadProductos = 0;
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
                    this.mostrarCantidadProductos();
                })
                .catch(error => console.error(error));

        },
        mostrarCantidadProductos() {
            if (this.productos && Array.isArray(this.productos)) {
                this.cantidadProductos = this.productos.length;
            }
            this.conCategoria = true;
        },
    },

};
