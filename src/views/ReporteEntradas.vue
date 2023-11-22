<template>
    <section class="container-fluid">
        <div>
            <div class="row">
                <div class="col-2 m-0 p-0">
                    <Nvar />
                </div>
                <div class="col-10 m-0 p-0">
                    <section class="container-fluid">
                        <div class="row">
                            <div class="col-7 mt-5 tablaP">
                                <div class="row">
                                    <div class="col-4">
                                        <h1 class="h1 m-3">Reportes</h1>
                                    </div>
                                    <div class="col-2 mt-4">
                                        <button @click="ListarEntradas" class="btn m-1 btn-warning">
                                            obtener
                                        </button>
                                    </div>
                                    <div class="col-4 mt-4">
                                        <button @click="generatePDF" class="btn m-1 btn-info" v-if="mostrarGenerar">
                                            Generar PDF
                                        </button>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <!-- Modifica la propiedad mode a 'single' -->
                                    <div class="row">
                                        <div class="col-6">
                                            <label>Fecha de Inicio:</label>
                                            <flat-pickr v-model="startDate" :config="flatpickrOptions"></flat-pickr>
                                        </div>
                                        <div class="col-6">
                                            <label>Fecha de Término:</label>
                                            <flat-pickr v-model="endDate" :config="flatpickrOptions"></flat-pickr>
                                        </div>
                                    </div>
                                    <div class="row mt-5" v-if="mostrarGrafico" ref="chartContainer">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Cantidad de entrada</th>
                                                    <th>Fecha de entrada</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="entrada in paginated" :key="entrada.id">
                                                    <td>{{ entrada.cantidad }}</td>
                                                    <td>{{ formatDate(entrada.fechaEntrada) }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="pagination-buttons boton-container">
                                            <button @click="goToPage(currentPage - 1)" class="btn btn-info"
                                                :disabled="currentPage === 1">Anterior</button>
                                            <button @click="goToPage(currentPage + 1)" class="btn btn-info"
                                                :disabled="currentPage === totalPages">Siguiente</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-5 mt-5" v-if="mostrarGrafico" ref="chartContainer">
                                <div ref="chartContainer1">
                                    <Line :data="chartData" ref="lineChart" />
                                </div>
                                <div ref="chartContainer2">
                                    <Line :data="chartData2" ref="lineChart2" class="mt-3" />
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.boton-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}
</style>
  
<script>
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Nvar from '../components/Nvar';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { isValid, parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import { Line } from 'vue-chartjs';
import { API_URL, ENDPOINT_LISTAR_ENTRADAS, ENDPOINT_CONSULTAR_PRODUCTO } from '../keys';
import html2canvas from 'html2canvas';
import logo3RACM from '@/assets/logo3RACM.jpg'

import { Chart, LineController, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(
    LineController,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default {
    components: {
        Nvar,
        flatPickr,
        Line,
    },
    data() {
        return {
            startDate: null,
            endDate: null,
            entradas: [],
            flatpickrOptions: {
                mode: 'single',
                dateFormat: 'Y-m-d',
            },
            mostrarGrafico: false,
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Cantidad',
                        borderColor: '#f87979',
                        pointBackgroundColor: '#f87979',
                        data: [],
                    },
                ],
            },
            chartData2: {
                labels: [],
                datasets: [
                    {
                        label: 'Dinero ingresado',
                        borderColor: '#f87979',
                        pointBackgroundColor: '#f87979',
                        data: [],
                    },
                ],
            },
            mostrarGenerar: false,
            currentPage: 1,
            pageSize: 6,
        };
    },
    computed: {
        totalPages() {
            if (!this.entradas) return 0;
            return Math.ceil(this.entradas.length / this.pageSize);
        },
        paginated() {
            if (!Array.isArray(this.entradas) || this.entradas.length === 0) {

                return null;
            }

            const sortedEntradas = this.entradas.slice().reverse();

            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            return sortedEntradas.slice(startIndex, endIndex);
        },
    },
    methods: {
        goToPage(page) {
            if (page < 1) page = 1;
            if (page > this.totalPages) page = this.totalPages;
            this.currentPage = page;
        },
        async generatePDF() {
            try {
                if (this.startDate && this.endDate && isValid(parseISO(this.startDate)) && isValid(parseISO(this.endDate))) {
                    const pdf = new jsPDF();
                    const formattedStartDate = format(parseISO(this.startDate), 'yyyy-MM-dd', { timeZone: 'America/New_York' });
                    const formattedEndDate = format(parseISO(this.endDate), 'yyyy-MM-dd', { timeZone: 'America/New_York' });


                    pdf.addImage(logo3RACM, 'JPG', 15, 10, 60, 25);

                    pdf.setFontSize(20);
                    pdf.setFont("helvetica", "bold");
                    pdf.text(`Reporte de entradas`, 100, 25);

                    pdf.setFontSize(14);
                    pdf.setFont("helvetica", "normal");
                    pdf.text(`Fecha de entrada: ${formattedStartDate} - ${formattedEndDate}`, 20, 50);


                    const chartContainer1 = this.$refs.chartContainer1;
                    const chartImage1 = await html2canvas(chartContainer1);

                    const chartContainer2 = this.$refs.chartContainer2;
                    const chartImage2 = await html2canvas(chartContainer2);

                    pdf.setFontSize(12);
                    pdf.setFont("helvetica", "bold");
                    pdf.text(`Cantidad de entradas`, 35, 68);

                    pdf.addImage(chartImage1.toDataURL(), 'JPEG', 15, 70, 80, 50);

                    pdf.setFontSize(12);
                    pdf.setFont("helvetica", "bold");
                    pdf.text(`Dinero de entradas`, 139, 68);

                    pdf.addImage(chartImage2.toDataURL(), 'JPEG', 115, 70, 80, 50);

                    pdf.setFontSize(14);
                    pdf.setFont("helvetica", "bold");

                    // Calcular la cantidad total de entradas
                    const totalEntradas = this.entradas.reduce((total, entrada) => total + entrada.cantidad, 0);

                    // Calcular el dinero total de las entradas
                    const totalDineroPromises = this.entradas.map(async (entrada) => {
                        const productoPrecio = await this.obtenerPrecioProducto(entrada.idProducto);
                        return productoPrecio * entrada.cantidad;
                    });

                    // Esperar a que todas las promesas se resuelvan antes de continuar
                    const totalDineroArray = await Promise.all(totalDineroPromises);

                    // Sumar los valores del array
                    const totalDinero = totalDineroArray.reduce((total, dinero) => total + dinero, 0);

                    // Definir posición y tamaño del rectángulo
                    const rectX = 105;
                    const rectY = 145;
                    const rectX2 = 20;
                    const rectWidth = 95;
                    const rectWidth2 = 80;  // Ajusta el ancho del rectángulo según tus preferencias
                    const rectHeight = 10; // Ajusta la altura del rectángulo según tus preferencias

                    // Agregar el rectángulo al PDF
                    pdf.rect(rectX - 2, rectY - 8, rectWidth, rectHeight, 'S');
                    pdf.rect(rectX2 - 2, rectY - 8, rectWidth2, rectHeight, 'S');

                    // Agregar la cantidad total de entradas al PDF
                    pdf.text(`Total de entradas: ${totalEntradas}`, rectX2, rectY);

                    // Agregar el texto dentro del rectángulo
                    pdf.text(`Ingreso total: $${totalDinero} MNX`, rectX, rectY);

                    // Agrega información de las entradas al PDF
                    pdf.text('Entradas:', 15, 170);

                    // Construir datos de la tabla
                    const tableDataPromises = this.entradas.map(async (entrada) => {
                        const productoNombre = await this.obtenerNombreProducto(entrada.idProducto);
                        return [productoNombre, format(parseISO(entrada.fechaEntrada), 'yyyy-MM-dd', { timeZone: 'America/New_York' }), entrada.cantidad];
                    });

                    // Esperar a que todas las promesas se resuelvan antes de continuar
                    const tableData = await Promise.all(tableDataPromises);

                    // Encabezados de la tabla
                    const headers = [['Producto', 'Fecha', 'Cantidad']];

                    // Agregar la tabla al PDF
                    pdf.autoTable({
                        startY: 175,
                        head: headers,
                        body: tableData,
                    });


                    pdf.output('dataurlnewwindow');
                } else {
                    console.error('Las fechas no son válidas');
                }
            } catch (error) {
                console.error('Error al generar el PDF', error);
            }
        },

        async ListarEntradas() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_ENTRADAS}`;
            const queryParameters = `?fechaInicio=${this.startDate}&fechaTermino=${this.endDate}`;
            try {
                const response = await fetch(url + queryParameters, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener las entradas');
                }

                const data = await response.json();
                this.entradas = data;

                this.chartData2.labels = [];
                this.chartData2.datasets[0].data = [];

                this.chartData.labels = [];
                this.chartData.datasets[0].data = [];

                let cantidadAcumulada = 0;
                let PrecioTotal = 0; // Nuevo
                for (const entrada of data) {
                    const productoNombre = await this.obtenerNombreProducto(entrada.idProducto);
                    const productoPrecio = await this.obtenerPrecioProducto(entrada.idProducto);

                    this.chartData.labels.push(
                        format(parseISO(entrada.fechaEntrada), 'yyyy-MM-dd', { timeZone: 'America/New_York' })
                    );
                    cantidadAcumulada += entrada.cantidad;
                    this.chartData.datasets[0].data.push(cantidadAcumulada);

                    PrecioTotal += productoPrecio * entrada.cantidad;
                    this.chartData2.labels.push(
                        format(parseISO(entrada.fechaEntrada), 'yyyy-MM-dd', { timeZone: 'America/New_York' })
                    );
                    this.chartData2.datasets[0].data.push(PrecioTotal);
                }

                // Muestra el gráfico cuando se obtienen los datos
                this.mostrarGrafico = true;
                this.mostrarGenerar = true;
            } catch (error) {
                console.error(error);
            }
        },
        async obtenerPrecioProducto(idProducto) {
            const url = `${API_URL}/${ENDPOINT_CONSULTAR_PRODUCTO}/${idProducto}`;
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error al obtener el precio del producto: ${response.statusText}`);
                }

                const data = await response.json();

                if (data && data.precioUnitario) {
                    return data.precioUnitario;
                } else {
                    return 'Precio no disponible';
                }
            } catch (error) {
                console.error(error);
                return 'Precio no disponible';
            }
        },
        async obtenerNombreProducto(idProducto) {
            const url = `${API_URL}/${ENDPOINT_CONSULTAR_PRODUCTO}/${idProducto}`;
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error al obtener el nombre del producto: ${response.statusText}`);
                }

                const data = await response.json();

                if (data && data.nombre) {
                    return data.nombre;
                } else {
                    return 'Nombre no disponible';
                }
            } catch (error) {
                console.error(error);
                return 'Nombre no disponible';
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES'); // Ajusta el local según tus preferencias
        },
    },
};
</script>
  