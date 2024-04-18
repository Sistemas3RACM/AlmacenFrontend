
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
            total: 0,
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

            let total = 0;

            for (const producto of this.productos) {
                const precioUnitario = producto.precioUnitario;
                const cantidad = producto.cantidad;

                const subtotal = precioUnitario * cantidad;

                total += subtotal;
            }
            this.total = total;
            this.total = total.toLocaleString('en-US');
        },
    },

};
