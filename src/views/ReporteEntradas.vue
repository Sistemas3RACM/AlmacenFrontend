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
                                    <div class="col-2 mt-4">
                                        <button type="button" @click="redirigirAEntradas"
                                            class="btn m-1 btn-warning" v-if="mostrarGenerar"><font-awesome-icon :icon="['fas', 'sync-alt']" /></button>
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
        // The above code is a method in a Vue component that calculates the total number of pages based on the
        // number of entries and the page size. It first checks if there are any entries, and if not, it
        // returns 0. Otherwise, it divides the number of entries by the page size and rounds up using the
        // Math.ceil() function to get the total number of pages.
        totalPages() {
            if (!this.entradas) return 0;
            return Math.ceil(this.entradas.length / this.pageSize);
        },
        // The above code is a method in a Vue component that is used for pagination.
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
        // The above code is a method in a Vue component that is used to navigate to a specific page. It takes
        // a parameter `page` which represents the page number to navigate to.
        goToPage(page) {
            if (page < 1) page = 1;
            if (page > this.totalPages) page = this.totalPages;
            this.currentPage = page;
        },
        async generatePDF() {
            try {
                if (this.startDate && this.endDate && isValid(parseISO(this.startDate)) && isValid(parseISO(this.endDate))) {
                    const pdf = new jsPDF();
                    // The above code is formatting the start and end dates using the date-fns library in a Vue component.
                    // It is using the `parseISO` function to parse the start and end dates from ISO 8601 format to a
                    // JavaScript Date object. Then, it is using the `format` function to format the dates in the
                    // 'yyyy-MM-dd' format, with the timezone set to 'America/New_York'. The formatted start and end dates
                    // are stored in the `formattedStartDate` and `formattedEndDate` variables, respectively.
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

                    // The above code is capturing a screenshot of a specific HTML element using the html2canvas library in
                    // a Vue application. It first references the HTML element with the ref "chartContainer2" and then uses
                    // the html2canvas function to capture the screenshot and store it in the "chartImage2" variable.
                    const chartContainer2 = this.$refs.chartContainer2;
                    const chartImage2 = await html2canvas(chartContainer2);

                    pdf.setFontSize(12);
                    pdf.setFont("helvetica", "bold");
                    pdf.text(`Cantidad de entradas`, 35, 68);

                    pdf.addImage(chartImage1.toDataURL(), 'JPEG', 15, 70, 80, 50);

                    pdf.setFontSize(12);
                    pdf.setFont("helvetica", "bold");
                    pdf.text(`Dinero de entradas`, 139, 68);

                    // The above code is adding an image to a PDF document using the jsPDF library in a Vue HTML file. The
                    // image is sourced from a chartImage2 object, which is converted to a data URL using the toDataURL()
                    // method. The image is then added to the PDF document at coordinates (115, 70) with a width of 80 and
                    // a height of 50.
                    pdf.addImage(chartImage2.toDataURL(), 'JPEG', 115, 70, 80, 50);

                    // The above code is setting the font size to 14 and the font family to "helvetica" with a bold style.
                    pdf.setFontSize(14);
                    pdf.setFont("helvetica", "bold");

                    // The above code is calculating the total number of entries by summing up the "cantidad" property of
                    // each object in the "entradas" array.
                    const totalEntradas = this.entradas.reduce((total, entrada) => total + entrada.cantidad, 0);

                    // The above code is creating an array of promises called `totalDineroPromises`. Each promise in the
                    // array calculates the total price of a product by multiplying the product price (`productoPrecio`)
                    // with the quantity (`entrada.cantidad`). The product price is obtained by calling the
                    // `obtenerPrecioProducto` method with the product ID (`entrada.idProducto`) as an argument.
                    const totalDineroPromises = this.entradas.map(async (entrada) => {
                        const productoPrecio = await this.obtenerPrecioProducto(entrada.idProducto);
                        return productoPrecio * entrada.cantidad;
                    });

                    // The above code is using the `Promise.all` method to asynchronously execute an array of promises
                    // (`totalDineroPromises`). It waits for all the promises to resolve or reject, and then returns an
                    // array of the resolved values. The `await` keyword is used to wait for the `Promise.all` to complete
                    // before assigning the result to the `totalDineroArray` variable.
                    const totalDineroArray = await Promise.all(totalDineroPromises);

                    // The above code is using the reduce method to calculate the sum of all the elements in the
                    // totalDineroArray. The reduce method takes a callback function as an argument, which is executed on
                    // each element of the array. In this case, the callback function takes two parameters: total and
                    // dinero. The total parameter represents the accumulated value, and the dinero parameter represents
                    // the current element being processed. The callback function adds the current dinero value to the
                    // total value. The reduce method also takes an initial value of 0 as the second argument, which is
                    // used as the initial value of the total parameter.
                    const totalDinero = totalDineroArray.reduce((total, dinero) => total + dinero, 0);

                    // The above code is defining variables for the x and y coordinates of two rectangles, as well as their
                    // widths and heights. These variables can be used in a Vue HTML template to position and size the
                    // rectangles on the page.
                    const rectX = 105;
                    const rectY = 145;
                    const rectX2 = 20;
                    const rectWidth = 95;
                    const rectWidth2 = 80;  // Ajusta el ancho del rectángulo según tus preferencias
                    const rectHeight = 10; // Ajusta la altura del rectángulo según tus preferencias

                    // The above code is using the Vue framework to create an HTML template. It is drawing two rectangles
                    // on a PDF document using the `rect` method. The first rectangle is defined by the variables `rectX`,
                    // `rectY`, `rectWidth`, and `rectHeight`. The second rectangle is defined by the variables `rectX2`,
                    // `rectY`, `rectWidth2`, and `rectHeight`. The 'S' parameter passed to the `rect` method specifies
                    // that the rectangles should be stroked (outlined) rather than filled.
                    pdf.rect(rectX - 2, rectY - 8, rectWidth, rectHeight, 'S');
                    pdf.rect(rectX2 - 2, rectY - 8, rectWidth2, rectHeight, 'S');

                    // The above code is using Vue.js to display a text string that includes the value of the variable
                    // `totalEntradas`. The text is being positioned at the coordinates `(rectX2, rectY)` on the PDF
                    // document.
                    pdf.text(`Total de entradas: ${totalEntradas}`, rectX2, rectY);

                    // The above code is using Vue.js to generate HTML. It is using the `pdf.text()` function to display a
                    // text string that includes the value of the `totalDinero` variable. The text being displayed is
                    // "Ingreso total: $<value of totalDinero> MNX". The `rectX` and `rectY` variables are likely used to
                    // position the text on the page.
                    pdf.text(`Ingreso total: $${totalDinero} MNX`, rectX, rectY);

                    pdf.text('Entradas:', 15, 170);

                    // The above code is creating an array of promises called `tableDataPromises`. Each promise in the
                    // array is created by mapping over the `entradas` array and using the `async` keyword to create an
                    // asynchronous function. Inside the function, it awaits the result of the `obtenerNombreProducto`
                    // function and assigns it to the `productoNombre` variable. Then, it returns an array containing
                    // `productoNombre`, the formatted date of `entrada.fechaEntrada`, and `entrada.cantidad`.
                    const tableDataPromises = this.entradas.map(async (entrada) => {
                        const productoNombre = await this.obtenerNombreProducto(entrada.idProducto);
                        return [productoNombre, format(parseISO(entrada.fechaEntrada), 'yyyy-MM-dd', { timeZone: 'America/New_York' }), entrada.cantidad];
                    });

                    // The above code is using the `await` keyword to wait for all the promises in the `tableDataPromises`
                    // array to resolve. Once all the promises have resolved, the `Promise.all` method returns a new
                    // promise that resolves to an array of the resolved values from the original promises. This array is
                    // then assigned to the `tableData` variable.
                    const tableData = await Promise.all(tableDataPromises);

                    const headers = [['Producto', 'Fecha', 'Cantidad']];

                    // The above code is using the autoTable function from the pdf library in Vue to generate a table in a
                    // PDF document. The table will start at the y-coordinate 175 and will have a header row defined by the
                    // headers variable and a body with data defined by the tableData variable.
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
        // The above code is defining a method called `formatDate` in a Vue component. This method takes a
        // `dateString` parameter and converts it into a `Date` object. It then uses the `toLocaleDateString`
        // method to format the date as a string in the Spanish (Spain) locale. The formatted date string is
        // then returned by the method.
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES');
        },
        redirigirAEntradas() {
            this.startDate= null;
            this.endDate= null;
            this.entradas= [];
            this.flatpickrOptions= {
                mode: 'single',
                dateFormat: 'Y-m-d',
            };
            this.mostrarGrafico= false;
            this.chartData= {
                labels: [],
                datasets: [
                    {
                        label: 'Cantidad',
                        borderColor: '#f87979',
                        pointBackgroundColor: '#f87979',
                        data: [],
                    },
                ],
            };
            this.chartData2= {
                labels: [],
                datasets: [
                    {
                        label: 'Dinero ingresado',
                        borderColor: '#f87979',
                        pointBackgroundColor: '#f87979',
                        data: [],
                    },
                ],
            };
            this.mostrarGenerar= false;
        },
    },
};
</script>
  