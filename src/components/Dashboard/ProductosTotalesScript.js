
export default {
    name: 'ProductoPorCategoria',
    props: {
        cuenta: {
            type: Object,
        },
        productos: {
            type: Object,
        },
    },
    data() {
        return {
            total: 0,
            productosActuales: [],
            cuentaSeleccionada: false,
            nombreCuenta: 'Sin selección.',
        };
    },
    mounted() {
        this.mostrar();
    },
    methods: {
        mostrar() {
            if (this.cuenta !== null) {
                this.nombreCuenta = this.cuenta.nombreCuenta;
                this.calcularCantidad(this.cuenta.idCuenta)
                this.cuentaSeleccionada = true;
            } else {
                this.cuentaSeleccionada = false;
            }
        },
        calcularCantidad(idCuenta) {
            this.productosActuales = this.productos.filter(producto => producto.idCuenta === idCuenta);

            let total = 0;

            for (const producto of this.productosActuales) {
                const cantidad = producto.cantidad;

                total += cantidad;
            }
            this.total = total;
        },
    },

};
