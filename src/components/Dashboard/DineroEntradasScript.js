import {
    API_URL, ENDPOINT_LISTAR_PRODUCTOS
} from '@/keys';

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
                this.calcularCantidad();
                this.cuentaSeleccionada = true;
            } else {
                this.cuentaSeleccionada = false;
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
