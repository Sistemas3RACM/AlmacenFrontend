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
