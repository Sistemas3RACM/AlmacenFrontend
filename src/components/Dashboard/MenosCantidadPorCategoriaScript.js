export default {
    name: 'ProductoPorCategoria',
    props: {
        Categoria: {
            type: Object,
        },
        productos: {
            type: Object,
        },
    },
    data() {
        return {
            productosConMenos: [],
            conCategoria: false,
            nombreCategoria: 'Sin registro.',
        };
    },
    mounted() {
        this.mostrar();
    },
    methods: {
        async mostrar() {
            if (this.Categoria !== null) {
                this.nombreCategoria = this.Categoria.nombre;
                this.calcularCantidad();
                this.conCategoria = true;
            } else {
                this.conCategoria = false;
            }

        },
        calcularCantidad() {
            // Ordena los productos por cantidad en orden ascendente
            this.productos.sort((a, b) => a.cantidad - b.cantidad);

            // Toma los 3 primeros productos con las cantidades más bajas
            const tresProductosConMenosCantidad = this.productos.slice(0, 3);
            this.productosConMenos = tresProductosConMenosCantidad;
            this.conCategoria = true;
        },
    },

};
