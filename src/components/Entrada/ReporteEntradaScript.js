import { API_REQUISICIONES_URL, API_URL, ENDPOINT_LISTAR_CUENTAS, ENDPOINT_LISTAR_PRODUCTOS, ENDPOINT_LISTAR_PROVEEDORES } from "@/keys";
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
            cuentas: [],
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
            await this.listarProveedores();
            await this.consultarCuentas();
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

        listarProveedores() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_PROVEEDORES}`;

            return axios.get(url)
                .then(response => {
                    this.proveedores = response.data;
                })
                .catch(() => {
                    console.log("Error al obtener el nombre del proveedor");
                });
        },

        getNombreProveedor(idProveedor) {
            const proveedor = this.proveedores.find(proveedor => proveedor.idProveedor === idProveedor);
            return proveedor ? proveedor.nombre : 'Nombre no encontrado';
        },

        getNombreCuenta(idCuenta) {
            console.log(idCuenta);
            const cuenta = this.cuentas.find(cuenta => cuenta.idCuenta === idCuenta);
            return cuenta ? cuenta.nombre : 'Nombre no encontrado';
        },

        consultarCuentas() {
            const url = `${API_REQUISICIONES_URL}/${ENDPOINT_LISTAR_CUENTAS}`;

            return axios.get(url)
                .then(response => {
                    this.cuentas = response.data;
                    console.log(this.cuentas);
                })
                .catch(() => {
                    console.log("Error al listar las cuentas");
                });
        },

        obtenerNombreProducto(idProducto) {
            const producto = this.productos.find(producto => producto.idProducto === idProducto);
            return producto ? producto.nombre : 'Nombre no encontrado';
        },

        obtenerIdCuentaProducto(idProducto) {
            const producto = this.productos.find(producto => producto.idProducto === idProducto);
            return producto ? producto.idCuenta : 'Nombre no encontrado';
        },

        async generarExcel() {
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('Entradas');

            // Encabezados
            sheet.addRow(['Producto', 'Fecha de entrada', 'Cantidad', 'Cuenta cargo', 'Proveedor']);


            // Iterar sobre las requisiciones y agregar datos
            for (const registro of this.registros) {
                const fecha = registro.fechaEntrada.slice(0, 10);
                const productos = await this.obtenerNombreProducto(registro.idProducto);
                const cuenta = this.getNombreCuenta(this.obtenerIdCuentaProducto(registro.idProducto));
                const proveedores = this.getNombreProveedor(registro.idProveedor);

                // Agregar fila para la requisición
                sheet.addRow([productos, fecha, registro.cantidad, cuenta, proveedores]);

            }

            // Generar el archivo Excel
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const fileName = 'entradas.xlsx';
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
