import { API_REQUISICIONES_URL, API_URL, ENDPOINT_LISTAR_CUENTAS, ENDPOINT_LISTAR_ENTRADAS, ENDPOINT_LISTAR_PRODUCTOS, ENDPOINT_LISTAR_SALIDAS, ENDPOINT_LISTAR_SOLICITUDES } from "@/keys";
import axios from "axios";

export default {
    name: 'PrincipalReportes',
    data() {
        return {
            mostrarRegistros: false,
            tipos: [
                { valor: 1, etiqueta: 'Entrada' },
                { valor: 2, etiqueta: 'Salida' }
            ],
            tipoSeleccionado: 0,
            fechaInicial: '',
            fechaFinal: '',
            showTooltipFI: false,
            showTooltipFF: false,
            registros: [],
            cuentas: [],
            productos: [],
            cuentaSeleccionada: 0,
            esSalida: false,
            cuentaEscrita: '',
        }
    },

    mounted() {
        this.mostrar();
    },

    methods: {
        async mostrar() {
            try {
                await this.listarCuentas();
                await this.listarProductos();
            } catch (error) {

            }
        },

        listarCuentas() {
            const url = `${API_REQUISICIONES_URL}/${ENDPOINT_LISTAR_CUENTAS}`;

            return axios.get(url)
                .then(response => {
                    this.cuentas = response.data;
                })
                .catch(() => {
                    console.log("Error al listar las cuentas existentes");
                });
        },

        listarProductos() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_PRODUCTOS}`;

            return axios.get(url)
                .then(response => {
                    this.productos = response.data;
                })
                .catch(() => {
                    console.log("Error al listar los productos.");
                });
        },

        async buscarRegistros() {
            if (this.tipoSeleccionado == 1) {
                await this.generarRegistrosEntrada();
                this.$refs.ReporteEntrada.openModal();
            } else {
                await this.generarRegistrosSalida();
                this.$refs.ReporteSalida.openModal();
            }

            this.mostrarRegistros = true;
        },

        generarRegistrosEntrada() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_ENTRADAS}`;

            return axios.get(url)
                .then(response => {
                    this.registros = response.data.filter(entrada => {
                        if (this.fechaInicial && this.fechaFinal) {
                            // Convertir las fechas de string a objetos Date
                            const fechaInicialSeleccionada = new Date(this.fechaInicial);
                            const fechaFinalSeleccionada = new Date(this.fechaFinal);
                            // Convertir la fecha de entrada del registro a un objeto Date
                            const fechaEntradaRegistro = new Date(entrada.fechaEntrada);
                            // Verificar si la fecha de entrada del registro está dentro del rango seleccionado
                            if (!(fechaEntradaRegistro >= fechaInicialSeleccionada && fechaEntradaRegistro <= fechaFinalSeleccionada)) {
                                return false; // El registro no está en el rango de fechas, por lo tanto, no se incluye
                            }
                        } else if (this.fechaInicial && !this.fechaFinal) {
                            // Si solo se ha seleccionado una fecha inicial
                            const fechaInicialSeleccionada = new Date(this.fechaInicial);
                            const fechaEntradaRegistro = new Date(entrada.fechaEntrada);
                            // Verificar si la fecha de entrada del registro es posterior a la fecha inicial seleccionada
                            if (fechaEntradaRegistro < fechaInicialSeleccionada) {
                                return false; // El registro no está en el rango de fechas, por lo tanto, no se incluye
                            }
                        }

                        if (this.cuentaSeleccionada) {
                            // Obtener el ID del producto asociado a la entrada
                            const idProducto = entrada.idProducto;
                            // Buscar el producto en la lista de productos disponibles
                            const producto = this.productos.find(producto => producto.idProducto === idProducto);
                            // Verificar si se encontró el producto y si coincide con la cuenta seleccionada
                            if (!producto || producto.idCuenta !== this.cuentaSeleccionada) {
                                return false; // El producto no pertenece a la cuenta seleccionada, por lo tanto, no se incluye
                            }
                        }
                        return true;
                    });
                })
                .catch(() => {
                    console.log("No se han podido listar las entradas.");
                });
        },

        generarRegistrosSalida() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_SOLICITUDES}`;

            return axios.get(url)
                .then(response => {
                    this.registros = response.data.filter(salida => {
                        if (this.fechaInicial && this.fechaFinal) {
                            // Convertir las fechas de string a objetos Date
                            const fechaInicialSeleccionada = new Date(this.fechaInicial);
                            const fechaFinalSeleccionada = new Date(this.fechaFinal);
                            // Convertir la fecha de entrada del registro a un objeto Date
                            const fechaSalidaRegistro = new Date(salida.fechaSolicitud);
                            // Verificar si la fecha de entrada del registro está dentro del rango seleccionado
                            if (!(fechaSalidaRegistro >= fechaInicialSeleccionada && fechaSalidaRegistro <= fechaFinalSeleccionada)) {
                                return false; // El registro no está en el rango de fechas, por lo tanto, no se incluye
                            }
                        } else if (this.fechaInicial && !this.fechaFinal) {
                            // Si solo se ha seleccionado una fecha inicial
                            const fechaInicialSeleccionada = new Date(this.fechaInicial);
                            const fechaSalidaRegistro = new Date(salida.fechaSolicitud);
                            // Verificar si la fecha de entrada del registro es posterior a la fecha inicial seleccionada
                            if (fechaSalidaRegistro < fechaInicialSeleccionada) {
                                return false; // El registro no está en el rango de fechas, por lo tanto, no se incluye
                            }
                        }
                        if (this.cuentaEscrita) {
                            const cuentaEscritaLower = this.cuentaEscrita.toLowerCase(); // Convertir el texto ingresado a minúsculas
                            const proyectoCuentaLower = salida.proyectoCuenta.toLowerCase(); // Convertir la cuenta del proyecto a minúsculas

                            // Verificar si la cuenta escrita coincide con la cuenta del proyecto en alguna de las salidas
                            if(cuentaEscritaLower === proyectoCuentaLower){
                                return true;
                            }else{
                                return false; // La cuenta escrita no coincide con ninguna cuenta de proyecto, por lo tanto, no se incluye
                            }

                        }
                        return true;

                    });
                })
                .catch(() => {
                    console.log("No se han podido listar las salidas.");
                });
        },

        limpiarFiltros() {
            this.$refs.ReporteEntrada.closeModal();
            this.$refs.ReporteSalida.closeModal();
        },

        cambioSalida() {
            if (this.tipoSeleccionado == 1) {
                this.esSalida = false;
            } else {
                this.esSalida = true;
            }
        },
    },
}
