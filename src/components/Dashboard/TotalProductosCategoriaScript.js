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
            cantidadProductos: 0,
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
                this.cantidadProductos = this.productos.length;
                this.conCategoria = true;
            } else {
                this.conCategoria = false;
            }
        },
    },

};
