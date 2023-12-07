<template>
    <div class="contenedor">
        <div class="col-md-12">
            <div class="contador">
                <h3>Dinero en almacén</h3>
                <div class="numero">$ {{ total }}</div>
            </div>
        </div>
    </div>
</template>
<script>
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
</script>
<style scoped>
.contenedor{
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
    font-size: 50px;
    font-weight: bold;
}
</style>