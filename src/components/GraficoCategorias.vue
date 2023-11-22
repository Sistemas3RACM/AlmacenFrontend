<template>
    <div class="container principal">
        <h2>Productos con menos cantidad</h2>
        <Bar v-if="loaded" :data="chartData" />
    </div>
</template>
<style scoped>
.principal {
    
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}
</style>


<script>
import { ENDPOINT_LISTAR_PRODUCTOS, API_URL } from '@/keys';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
    name: 'BarChart',
    components: { Bar },
    data: () => ({
        loaded: false,
        chartData: null,
    }),
    async mounted() {
        this.loaded = false;

        try {
            const url = `${API_URL}/${ENDPOINT_LISTAR_PRODUCTOS}`;
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();

                if (data && data.length >= 3) {

                    // Ordenar los productos por cantidad en orden ascendente
                    const sortedProducts = data.sort((a, b) => a.cantidad - b.cantidad);

                    // Tomar los tres primeros productos
                    const topThreeProducts = sortedProducts.slice(0, 3);

                    this.chartData = {
                        labels: topThreeProducts.map(product => product.nombre),
                        datasets: [
                            {
                                label: 'Cantidad',
                                backgroundColor: 'blue',
                                data: topThreeProducts.map(product => product.cantidad),
                            },
                        ],
                    };
                    this.loaded = true;
                } else {
                    console.error('No se encontraron suficientes productos en la respuesta.');
                }
            } else {
                console.error('Error en la respuesta de la API:', response.statusText);
            }
        } catch (e) {
            console.error(e);
        }
    },
};
</script>
