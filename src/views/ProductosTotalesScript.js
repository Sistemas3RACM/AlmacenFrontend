import * as XLSX from 'xlsx';

import {
  API_URL, ENDPOINT_BUSCAR_PRODUCTO, ENDPOINT_LISTAR_PRODUCTOS
} from '../keys';

export default {
  name: 'TodosLosProductos',
  data() {
    return {
      productos: null,
      currentPage: 1,
      pageSize: 6,
    };
  },
  mounted() {
    this.mostrar();
  },
  computed: {

    totalPages() {
      if (!this.productos) return 0;
      return Math.ceil(this.productos.length / this.pageSize);
    },

    paginated() {
      if (!this.productos) return null;

      const sortedcategorias = this.productos.slice().reverse();

      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return sortedcategorias.slice(startIndex, endIndex);
    },
  },
  methods: {
    goToPage(page) {
      if (page < 1) page = 1;
      if (page > this.totalPages) page = this.totalPages;
      this.currentPage = page;
    },
    mostrar() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_PRODUCTOS}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.productos = data;
        })
        .catch(error => console.log(error));
    },
    buscarProducto(termino) {
      const url = `${API_URL}/${ENDPOINT_BUSCAR_PRODUCTO}?nombre=${termino}`;

      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error en la solicitud.");
          }
        })
        .then(data => {
          this.productos = data;
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
    // The `exportToExcel()` method is responsible for exporting the data from the `productos` array to an
    // Excel file.
    exportToExcel() {
      // The `exportData` variable is created using the `map()` method on the `productos` array. It creates a
      // new array by iterating over each element in the `productos` array and transforming it into an object
      // with three properties: 'Número de serie', 'Nombre', and 'Cantidad'. The values of these properties
      // are taken from the corresponding properties of each `producto` object in the `productos` array. This
      // new array is then used to export the data to an Excel file.
      const exportData = this.productos.map(producto => ({
        'Número de serie': producto.numeroDeSerie,
        'Nombre': producto.nombre,
        'Cantidad': producto.cantidad,
      }));

      // The line `const wb = XLSX.utils.book_new();` is creating a new Excel workbook object using the
      // `book_new()` function from the XLSX library. This workbook object will be used to store the data and
      // sheets of the Excel file that will be generated.
      const wb = XLSX.utils.book_new();

      // The `wsConfig` object is used to configure the headers of the worksheet in the Excel file. In this
      // case, the headers are set to 'Número de serie', 'Nombre', and 'Cantidad'. These headers will be
      // displayed as the first row in the Excel file, indicating the columns of data that follow.
      const wsConfig = {
        header: ['Número de serie', 'Nombre', 'Cantidad'],
      };

      // The line `const ws = XLSX.utils.json_to_sheet(exportData, wsConfig);` is using the `json_to_sheet()`
      // function from the XLSX library to convert the `exportData` array into a worksheet object (`ws`).
      const ws = XLSX.utils.json_to_sheet(exportData, wsConfig);

      // The line `XLSX.utils.book_append_sheet(wb, ws, 'Productos');` is appending a worksheet (`ws`) to a
      // workbook (`wb`) with the name 'Productos'.
      XLSX.utils.book_append_sheet(wb, ws, 'Productos');

      // The line `XLSX.writeFile(wb, 'productos.xlsx');` is using the `writeFile()` function from the XLSX
      // library to generate and download an Excel file.
      XLSX.writeFile(wb, 'productos.xlsx');
    },
  },

};
