import { API_URL, ENDPOINT_LISTAR_PRODUCTOS } from "@/keys";
import axios from "axios";
import ExcelJS from 'exceljs';

export default {
    props: {
        registros: {
            type: Object
        }
    },
    data() {
        return {
            show: false,
            currentPage: 1,
            pageSize: 6,
            productos: [],

            proveedores: [],
        };
    },

    computed: {
        // The above code is a method in a Vue component that calculates the total number of pages based on the
        // number of users and the page size. It first checks if the `usuarios` array is defined, and if not,
        // it returns 0. If the `usuarios` array is defined, it calculates the total number of pages by
        // dividing the length of the `usuarios` array by the `pageSize` property and rounding up using the
        // `Math.ceil()` function.
        totalPages() {
            if (!this.registros) return 0;
            return Math.ceil(this.registros.length / this.pageSize);
        },
        // The above code is a method in a Vue component that is used for pagination.
        paginated() {
            if (!this.registros) return null;

            const sortedregistros = this.registros.slice().reverse();

            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            return sortedregistros.slice(startIndex, endIndex);
        },
    },

    methods: {
        goToPage(page) {
            if (page < 1) page = 1;
            if (page > this.totalPages) page = this.totalPages;
            this.currentPage = page;
        },

        async openModal() {
            await this.listarProductos();
            this.show = true;
        },

        closeModal() {
            this.show = false;
        },

        listarProductos() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_PRODUCTOS}`;

            return axios.get(url)
                .then(response => {
                    this.productos = response.data;
                })
                .catch(() => {
                    console.log("Error al obtener el nombre del producto");
                });
        },

        getNombreProducto(idProducto) {
            const producto = this.productos.find(producto => producto.idProducto === idProducto);
            return producto ? producto.nombre : 'Nombre no encontrado';
        },

        async generarExcel() {
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('Salidas');

            // Encabezados
            sheet.addRow(['Producto', 'Solicitante', 'Fecha de salida', 'Cantidad de salida', 'Cuenta cargo']);


            // Iterar sobre las requisiciones y agregar datos
            for (const registro of this.registros) {
                const solicitante = registro.solicitante;
                const cuenta = registro.proyectoCuenta;
                const fecha =  registro.fechaSolicitud.slice(0, 10);
                const productos = this.getNombreProducto(registro.idProducto);

                // Agregar fila para la requisición
                sheet.addRow([productos, solicitante, fecha, registro.cantidad, cuenta]);

            }

            // Generar el archivo Excel
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const fileName = 'salidas.xlsx';
            if (window.navigator.msSaveOrOpenBlob) {
                // Para IE
                window.navigator.msSaveOrOpenBlob(blob, fileName);
            } else {
                // Para otros navegadores
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        },



    },
};
