import axios from 'axios';
import {
    API_URL, ENDPOINT_LISTAR_PRODUCTOS, ENDPOINT_AGREGAR_PRODUCTO, ENDPOINT_CONSULTAR_PRODUCTO,
    ENDPOINT_EDITAR_PRODUCTO, ENDPOINT_BUSCAR_PRODUCTO
} from '../../keys';

export default {
    name: 'InicioSubcategoria',
    data() {
        return {
            currentPage: 1,
            pageSize: 6,
            producto: {
                nombre: '',
                numeroDeSerie: '',
                idCategoria: 0,
                idSubcategoria: 0,
                marca: '',
                modelo: '',
                descripcion: '',
                status: false,
                unidadMedida: '',
                cantidad: 0,
                precioUnitario: 0,
                consumible: false,
                servicio: false,
                idProveedor: 0,
                localizacion: '',
                cantidadMin: 0,
                idCuenta: 0
            },
            permisos: 0,
            productos: [],
            proveedores: [],
            categorias: [],
            errorMessage: '',
            successMessage: '',
            cambioProductoServicio: false,
        }
    },

    mounted() {

        this.mostrar();
        this.obtenerPermisos();

    },

    computed: {

        totalPages() {
            if (!this.productos) return 0;
            return Math.ceil(this.productos.length / this.pageSize);
        },

        paginated() {
            if (!Array.isArray(this.productos) || this.productos.length === 0) {

                return null;
            }

            const sortedProductos = this.productos.slice().reverse();

            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            return sortedProductos.slice(startIndex, endIndex);
        },

    },

    methods: {

        goToPage(page) {
            if (page < 1) page = 1;
            if (page > this.totalPages) page = this.totalPages;
            this.currentPage = page;
        },

        obtenerPermisos() {
            const idUsuario = this.$store.state.auth.userAdmin;

            this.permisos = idUsuario;
        },

        async mostrar() {
            await this.listarProductos();

        },

        listarProductos() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_PRODUCTOS}`;

            return axios.get(url)
                .then(response => {
                    // Guardar una copia de respaldo de los productos originales
                    this.productosOriginales = response.data;
                    // Filtrar los productos para mostrar solo los que son productos (servicio = 0)
                    this.productos = this.productosOriginales.filter(producto => producto.servicio === 0);
                    this.cambioProductoServicio = true;
                })
                .catch(() => {
                    console.log("Error al listar los productos existentes");
                });
        },

        cambiarProductoServicio() {
            if (this.cambioProductoServicio) {
                // Mostrar solo productos
                this.productos = this.productosOriginales.filter(producto => producto.servicio === 1);
            } else {
                // Mostrar solo servicios
                this.productos = this.productosOriginales.filter(producto => producto.servicio === 0);
            }
            // Cambiar el estado de cambioProductoServicio para alternar entre productos y servicios
            this.cambioProductoServicio = !this.cambioProductoServicio;
        },

        buscarProducto(termino) {
            const url = `${API_URL}/${ENDPOINT_BUSCAR_PRODUCTO}?nombre=${termino}`;

            axios.get(url)
                .then(response => {
                    this.productos = response.data;
                }).catch(() => {
                    console.log("No se ha encontrado ningún producto con esa caracteristica.")
                });
        },

        async abrirAgregarProducto() {
            await this.limpiarObjeto();
            this.$refs.agregarProducto.openModal();
        },

        limpiarObjeto() {
            return this.producto = {
                nombre: '',
                numeroDeSerie: '',
                idCategoria: 0,
                idSubcategoria: 0,
                marca: '',
                modelo: '',
                descripcion: '',
                status: false,
                unidadMedida: '',
                cantidad: 0,
                precioUnitario: 0,
                consumible: false,
                servicio: false,
                idProveedor: 0,
                localizacion: '',
                cantidadMin: 0,
                idCuenta: 0
            };
        },

        agregarProducto(objeto) {

            const idUsuario = this.$store.state.auth.userId;

            const url = `${API_URL}/${ENDPOINT_AGREGAR_PRODUCTO}?idSolicitante=${idUsuario}`;

            if (objeto.servicio && objeto.localizacion != "100") {

                this.errorMessage = 'Si registra un servicio seleccione en ubicacion "SERVICIO"';
                this.$refs.modalError.openModal();
                return;
            }
            if (!objeto.servicio && objeto.localizacion == "100") {

                this.errorMessage = 'Si registra un producto seleccione alguna ubicacion difernte a SERVICIO';
                this.$refs.modalError.openModal();
                return;
            }

            var servicio = objeto.servicio ? "S" : "P";

            if (objeto.marca == '') {
                objeto.marca = 'S/M';
            }
            if (objeto.modelo == '') {
                objeto.modelo = 'S/M';
            }


            objeto.numeroDeSerie = servicio;

            if (objeto.servicio) {
                objeto.servicio = 1;
            } else {
                objeto.servicio = 0;
            }

            objeto.consumible = 1;
            objeto.status = 1;

            const precioCadena = objeto.precioUnitario;
            const precioNum = parseFloat(precioCadena);

            objeto.precioUnitario = precioNum;

            const cantidadCadena = objeto.cantidad;
            const cantidadNum = parseFloat(cantidadCadena);

            objeto.cantidad = cantidadNum;

            objeto.cantidadMin = 0;


            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            axios.post(url, objeto, config)
                .then(() => {
                    this.successMessage = 'Producto agregado con éxito';
                    this.$refs.modalSuccess.openModal();
                    this.mostrar();
                })
                .catch(response => {
                    if (response.status === 409) {
                        this.errorMessage = 'El producto ya existe y no se pueden repetir';
                        this.$refs.modalError.openModal();
                        return;
                    } else {
                        this.errorMessage = 'Error al agregar el producto';
                        this.$refs.modalError.openModal();
                        return;
                    }
                });

        },

        async abrirEntrada(id) {
            await this.consultarProductoPorID(id);
            this.$refs.EntradaProducto.openModal();
        },

        async abrirSalida(id) {
            await this.consultarProductoPorID(id);
            this.$refs.SalidaProducto.openModal();
        },

        async mostrarInformacion(id) {
            await this.consultarProductoPorID(id);
            this.$refs.verProducto.openModal();
        },

        async mostrarEdicion(id) {
            await this.consultarProductoPorID(id);
            this.$refs.editarProducto.openModal();
        },

        consultarProductoPorID(id) {
            const url = `${API_URL}/${ENDPOINT_CONSULTAR_PRODUCTO}/${id}`;
            return axios.get(url)
                .then(response => {
                    this.producto = response.data;
                }).catch(() => {
                    console.log("Error al consultar el producto");
                });
        },

        editarProducto(objeto) {

            const idUsuario = this.$store.state.auth.userId;

            const url = `${API_URL}/${ENDPOINT_EDITAR_PRODUCTO}?idSolicitante=${idUsuario}`;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            if (objeto.marca == '') {
                objeto.marca = 'S/M';
            }
            if (objeto.modelo == '') {
                objeto.modelo = 'S/M';
            }


            axios.put(url, objeto, config)
                .then(() => {
                    this.successMessage = 'Producto editado correctamente.';
                    this.$refs.modalSuccess.openModal();
                    this.mostrar();
                })
                .catch(() => {
                    this.errorMessage = 'Error al editar el producto';
                    this.$refs.modalError.openModal();
                    return;
                });
        },


    },
}