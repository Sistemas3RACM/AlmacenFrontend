import * as XLSX from 'xlsx';

import {
    API_URL, ENDPOINT_LISTAR_CATEGORIAS, ENDPOINT_BUSCAR_CATEGORIA, ENDPOINT_LISTAR_PRODUCTO_POR_CATEGORIA
} from '../keys';

export default {
    name: 'ProductoPorCategoria',
    data() {
        return {
            categorias: null,
            productos: null,
            selectedCategoria: null,
            currentPage: 1,
            pageSize: 6,
            mostrarExportar: false,
        };
    },
    mounted() {
        this.mostrar();
    },
    computed: {

        // The `totalPages()` method is a computed property that calculates the total number of pages based on
        // the number of categories and the page size.
        totalPages() {
            if (!this.categorias) return 0;
            return Math.ceil(this.categorias.length / this.pageSize);
        },

        // The `paginated()` method is a computed property that returns a subset of the `categorias` array
        // based on the current page and page size.
        paginated() {
            if (!this.categorias) return null;

            const sortedcategorias = this.categorias.slice().reverse();

            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            return sortedcategorias.slice(startIndex, endIndex);
        },
    },
    methods: {
        // The `goToPage` method is used to navigate to a specific page in the paginated list of categories.
        goToPage(page) {
            if (page < 1) page = 1;
            if (page > this.totalPages) page = this.totalPages;
            this.currentPage = page;
        },
        mostrar() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_CATEGORIAS}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.categorias = data;
                    console.log(this.categorias);
                })
                .catch(error => console.log(error));
        },
        obtenerIDCategoria(categoria) {
            const id = categoria.idCategoria;
            this.selectedCategoria = categoria;
            const url = `${API_URL}/${ENDPOINT_LISTAR_PRODUCTO_POR_CATEGORIA}/${id}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    console.log(this.productos);
                })
                .catch(error => console.log(error));
        },
        buscarCategoria(termino) {
            const url = `${API_URL}/${ENDPOINT_BUSCAR_CATEGORIA}?nombre=${termino}`;

            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Error en la solicitud.");
                    }
                })
                .then(data => {
                    this.categorias = data;
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        },
        // The `exportToExcel()` method is a function that exports the data of the selected products to an
        // Excel file.
        exportToExcel() {
            // The `exportData` variable is an array that is created by mapping over the `productos` array. For
            // each `producto` object in the `productos` array, a new object is created with the keys `'Número de
            // serie'`, `'Nombre'`, and `'Cantidad'`. The values for these keys are taken from the corresponding
            // properties of each `producto` object (`producto.numeroDeSerie`, `producto.nombre`, and
            // `producto.cantidad`).
            const exportData = this.productos.map(producto => ({
                'Número de serie': producto.numeroDeSerie,
                'Nombre': producto.nombre,
                'Cantidad': producto.cantidad,
            }));

            // The line `const wb = XLSX.utils.book_new();` is creating a new Excel workbook object using the
            // `book_new()` function from the XLSX library. This workbook object will be used to store the data and
            // configuration for the Excel file that will be exported.
            const wb = XLSX.utils.book_new();

            // The `wsConfig` object is used to configure the headers (column names) for the worksheet in the Excel
            // file. In this case, the headers are set to 'Número de serie', 'Nombre', and 'Cantidad'. These
            // headers will be displayed as the first row in the Excel file.
            const wsConfig = {
                header: ['Número de serie', 'Nombre', 'Cantidad'],
            };

            // The line `const ws = XLSX.utils.json_to_sheet(exportData, wsConfig);` is using the `json_to_sheet()`
            // function from the XLSX library to convert the `exportData` array into a worksheet object.
            const ws = XLSX.utils.json_to_sheet(exportData, wsConfig);

            // The line `XLSX.utils.book_append_sheet(wb, ws, 'Productos');` is appending a worksheet (`ws`) to a
            // workbook (`wb`) with the name 'Productos'.
            XLSX.utils.book_append_sheet(wb, ws, 'Productos');

            // The line `XLSX.writeFile(wb, 'productos.xlsx');` is a function call that exports the data stored in
            // the `wb` (workbook) object to an Excel file named 'productos.xlsx'. The `writeFile()` function is
            // provided by the XLSX library and takes two arguments: the workbook object and the filename for the
            // exported Excel file.
            XLSX.writeFile(wb, 'productos.xlsx');
        },

    },

};
