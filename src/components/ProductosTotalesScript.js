import {
    API_URL, ENDPOINT_LISTAR_PRODUCTOS
} from '../keys';

export default {
    name: 'ProductoPorCategoria',
    data() {
        return {
            productos: null,
            total: 0,
        };
    },
    mounted() {
        this.mostrar();
    },
    methods: {
        mostrar() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_PRODUCTOS}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.calcularCantidad(this.productos);
                })
                .catch(error => console.log(error));
        },
        calcularCantidad(productos) {
            let total = 0;

            for (const producto of productos) {
                const cantidad = producto.cantidad;

                total += cantidad;
            }
            this.total = total;
        },
    },

};
