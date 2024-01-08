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
            mostrarTablaCategorias: true,
            total: 0,
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
            this.total = 0;
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

            let total = 0;

            for (const producto of productos) {
                const precioUnitario = producto.precioUnitario;
                const cantidad = producto.cantidad;

                const subtotal = precioUnitario * cantidad;

                total += subtotal;
            }
            this.total = total;
            this.total = total.toLocaleString('en-US');
            this.conCategoria = true;
        },
    },

};
