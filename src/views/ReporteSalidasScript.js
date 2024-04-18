import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'flatpickr/dist/flatpickr.css';
import { isValid, parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import { API_URL, ENDPOINT_LISTAR_SALIDAS, ENDPOINT_CONSULTAR_SOLICITUD, ENDPOINT_LISTAR_SOLICITUDES_ENTRE_FECHAS, ENDPOINT_CONSULTAR_PRODUCTO } from '../keys';
import html2canvas from 'html2canvas';
import logo3RACM from '@/assets/logo3RACM.jpg'

import { Chart, LineController, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ENDPOINT_LISTAR_SOLICITUDES } from '../keys';

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
    data() {
        return {
            startDate: null,
            endDate: null,
            salidas: [],
            solicitudes: [],
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
            if (!this.solicitudes) return 0;
            return Math.ceil(this.solicitudes.length / this.pageSize);
        },
        paginated() {
            if (!Array.isArray(this.solicitudes) || this.solicitudes.length === 0) {

                return null;
            }

            const sortedSolicitudes = this.solicitudes.slice().reverse();

            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            return sortedSolicitudes.slice(startIndex, endIndex);
        },
    },
    methods: {
        goToPage(page) {
            if (page < 1) page = 1;
            if (page > this.totalPages) page = this.totalPages;
            this.currentPage = page;
        },
        // The above code is a method in a Vue component that generates a PDF report. It first checks if the
        // start date and end date are valid. If they are valid, it creates a new instance of jsPDF and sets
        // up the header and title of the report.
        async generatePDF() {
            try {
                if (this.startDate && this.endDate && isValid(parseISO(this.startDate)) && isValid(parseISO(this.endDate))) {
                    const pdf = new jsPDF();
                    const formattedStartDate = format(parseISO(this.startDate), 'yyyy-MM-dd', { timeZone: 'America/New_York' });
                    const formattedEndDate = format(parseISO(this.endDate), 'yyyy-MM-dd', { timeZone: 'America/New_York' });


                    pdf.addImage(logo3RACM, 'JPG', 15, 10, 60, 25);

                    pdf.setFontSize(20);
                    pdf.setFont("helvetica", "bold");
                    pdf.text(`Reporte de salidas`, 100, 25);

                    pdf.setFontSize(14);
                    pdf.setFont("helvetica", "normal");
                    pdf.text(`Fecha de salida: ${formattedStartDate} - ${formattedEndDate}`, 20, 50);


                    const chartContainer1 = this.$refs.chartContainer1;
                    const chartImage1 = await html2canvas(chartContainer1);

                    const chartContainer2 = this.$refs.chartContainer2;
                    const chartImage2 = await html2canvas(chartContainer2);

                    pdf.setFontSize(12);
                    pdf.setFont("helvetica", "bold");
                    pdf.text(`Cantidad de salidas`, 35, 68);

                    pdf.addImage(chartImage1.toDataURL(), 'JPEG', 15, 70, 80, 50);

                    pdf.setFontSize(12);
                    pdf.setFont("helvetica", "bold");
                    pdf.text(`Dinero de salidas`, 139, 68);

                    pdf.addImage(chartImage2.toDataURL(), 'JPEG', 115, 70, 80, 50);

                    pdf.setFontSize(14);
                    pdf.setFont("helvetica", "bold");

                    const totalsolicitud = this.solicitudes.reduce((total, solicitud) => total + solicitud.cantidad, 0);

                    const totalDineroPromises = this.solicitudes.map(async (solicitud) => {
                        const productoPrecio = await this.obtenerPrecioProducto(solicitud.idProducto);
                        return productoPrecio * solicitud.cantidad;
                    });

                    const totalDineroArray = await Promise.all(totalDineroPromises);

                    const totalDinero = totalDineroArray.reduce((total, dinero) => total + dinero, 0);

                    const rectX = 100;
                    const rectY = 145;
                    const rectX2 = 20;
                    const rectWidth = 95;
                    const rectWidth2 = 60;  // Ajusta el ancho del rectángulo según tus preferencias
                    const rectHeight = 10; // Ajusta la altura del rectángulo según tus preferencias

                    pdf.rect(rectX - 2, rectY - 8, rectWidth, rectHeight, 'S');
                    pdf.rect(rectX2 - 2, rectY - 8, rectWidth2, rectHeight, 'S');

                    pdf.text(`Total de salidas: ${totalsolicitud}`, rectX2, rectY);

                    pdf.text(`Ingreso total: $${totalDinero} MNX`, rectX, rectY);

                    pdf.text('salidas:', 15, 170);

                    const tableDataPromises = this.solicitudes.map(async (solicitud) => {
                        const productoNombre = await this.obtenerNombreProducto(solicitud.idProducto);
                        return [productoNombre, format(parseISO(solicitud.fechaSolicitud), 'yyyy-MM-dd', { timeZone: 'America/New_York' }), solicitud.cantidad];
                    });

                    const tableData = await Promise.all(tableDataPromises);

                    const headers = [['Producto', 'Fecha', 'Cantidad']];

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
        async ListarSolicitudes() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_SOLICITUDES}`;
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
                this.solicitudes = data;

                this.chartData2.labels = [];
                this.chartData2.datasets[0].data = [];

                this.chartData.labels = [];
                this.chartData.datasets[0].data = [];

                let cantidadAcumulada = 0;
                let PrecioTotal = 0; // Nuevo
                for (const solicitud of data) {
                    const productoNombre = await this.obtenerNombreProducto(solicitud.idProducto);
                    const productoPrecio = await this.obtenerPrecioProducto(solicitud.idProducto);

                    this.chartData.labels.push(this.formatDate(solicitud.fechaSolicitud));
                    cantidadAcumulada += solicitud.cantidad;
                    this.chartData.datasets[0].data.push(cantidadAcumulada);

                    PrecioTotal += productoPrecio * solicitud.cantidad;
                    this.chartData2.labels.push(this.formatDate(solicitud.fechaSolicitud));
                    this.chartData2.datasets[0].data.push(PrecioTotal);
                }
                this.mostrarGrafico = true;
                this.mostrarGenerar = true;
            } catch (error) {
                console.error(error);
            }
        },
        async ListarSolicitudesEntreFechas() {
            try {
                if (this.startDate && this.endDate && isValid(parseISO(this.startDate)) && isValid(parseISO(this.endDate))) {
                    const url = `${API_URL}/${ENDPOINT_LISTAR_SOLICITUDES_ENTRE_FECHAS}?fechaInicio=${this.startDate}&fechaFin=${this.endDate}`;

                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Error al obtener las solicitudes');
                    }

                    const data = await response.json();

                    for (const solicitud of data) {
                        const salidas = await this.obtenerSalidasPorSolicitud(solicitud.idSolicitud);
                        solicitud.salidas = salidas;
                    }

                    this.solicitudes = data;

                    this.chartData2.labels = [];
                    this.chartData2.datasets[0].data = [];

                    this.chartData.labels = [];
                    this.chartData.datasets[0].data = [];

                    let cantidadAcumulada = 0;
                    let PrecioTotal = 0;
                    for (const solicitud of data) {
                        const productoNombre = await this.obtenerNombreProducto(solicitud.idProducto);

                        for (const salida of solicitud.salidas) {
                            this.chartData.labels.push(
                                format(parseISO(salida.fechaSalida), 'yyyy-MM-dd', { timeZone: 'America/New_York' })
                            );
                            cantidadAcumulada += solicitud.cantidad;
                            this.chartData.datasets[0].data.push(cantidadAcumulada);

                            PrecioTotal += productoPrecio * solicitud.cantidad;
                            this.chartData2.labels.push(
                                format(parseISO(salida.fechaSalida), 'yyyy-MM-dd', { timeZone: 'America/New_York' })
                            );
                            this.chartData2.datasets[0].data.push(PrecioTotal);
                        }
                    }

                    this.mostrarGenerar = true;
                    this.mostrarGrafico = true;



                } else {
                    console.error('Las fechas no son válidas');
                }
            } catch (error) {
                console.error('Error al listar las solicitudes entre fechas', error);
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
        async obtenerSalidasPorSolicitud(idSolicitud) {
            try {
                const url = `${API_URL}/${ENDPOINT_CONSULTAR_SOLICITUD}/${idSolicitud}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error al obtener las salidas para la solicitud ${idSolicitud}`);
                }

                const data = await response.json();

                return data;
            } catch (error) {
                console.error('Error al obtener salidas por solicitud', error);
                return [];
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
        // method to format the date in the Spanish (Spain) locale and returns the formatted date as a string.
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES');
        },
        redirigirASalidas() {
            this.startDate = null;
            this.endDate = null;
            this.salidas = [];
            this.solicitudes = [];
            this.flatpickrOptions = {
                mode: 'single',
                dateFormat: 'Y-m-d',
            };
            this.mostrarGrafico = false;
            this.chartData = {
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
            this.chartData2 = {
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
            this.mostrarGenerar = false;
        },
    },
};
