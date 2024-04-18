import {
    API_URL, ENDPOINT_LISTAR_USUARIOS, ENDPOINT_EDITAR_PRODUCTO, ENDPOINT_ENVIAR_CORREO, ENDPOINT_CONSULTAR_USUARIO, ENDPOINT_AGREGAR_SOLICITUD
} from '@/keys';
import axios from 'axios';
export default {
    props: {
        objetoSalida: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            show: false,
            permisos: false,
            usuarios: null,
            usuario: null,
            cantidadInicial: 0,
            errorMessage: '',
            successMessage: '',
            cantidadSolicitada: 0,
            mostrarMotivo: false,
            objetoCorreo: {
                correo: {
                    destinatario: '',
                    mensaje: '',
                    asunto: ''
                },
                idSolicitante: 0,
                producto: {
                    idProducto: 0,
                    nombre: '',
                    numeroDeSerie: '',
                    idCategoria: 0,
                    idSubcategoria: 0,
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
                cantidad: 0
            },
            solicitud: {
                idProducto: 0,
                solicitante: '',
                correo: '',
                estado: false,
                regresoProducto: false,
                cantidad: 0,
                fechaSolicitud: ''
            },

            proyectoCuenta: '',
        };
    },
    methods: {

        async openModal() {
            await this.listarUsuarios();
            await this.obtenerPermisos();
            this.objetoCorreo.producto = this.objetoSalida;
            this.show = true;
        },

        closeModal() {
            this.cantidadInicial = 0;
            this.show = false;
        },

        obtenerCantidad() {
            const cantidadFinal = this.objetoSalida.cantidad - this.cantidadInicial;
            if (cantidadFinal >= 0) {
                return cantidadFinal;
            } else {
                this.errorMessage = 'No se puede quitar esta cantidad porque excede de lo existente en almacén.';
                this.$refs.modalError.openModal();
                return -1;
            }
        },

        obtenerPermisos() {
            const Usuario = this.$store.state.auth.userAdmin;

            if (Usuario == 1) {
                this.permisos = true;
            }
        },

        consultarUsuario(idUsuario) {

            const url = `${API_URL}/${ENDPOINT_CONSULTAR_USUARIO}/${idUsuario}`;

            return axios.get(url)
                .then(response => {
                    this.usuario = response.data;
                })
                .catch(() => {
                    this.errorMessage = 'Ha surgido un problema al recuperar la información del usuario, intentelo nuevamente.';
                    this.$refs.modalError.openModal();
                });

        },

        listarUsuarios() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_USUARIOS}`;

            return axios.get(url)
                .then(response => {
                    this.usuarios = response.data;
                })
                .catch(() => {
                    console.log("Error listando los usuarios.")
                });
        },

        generarCorreo() {
            this.objetoCorreo.cantidad = this.cantidadInicial;

            this.objetoCorreo.correo.mensaje = 'Lea con atención el recibo de salida.';
            this.objetoCorreo.correo.asunto = 'Recibo de Salida de Almacén';

            const url = `${API_URL}/${ENDPOINT_ENVIAR_CORREO}`;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            return axios.post(url, this.objetoCorreo, config)
                .then(() => {
                })
                .catch(() => {
                    this.errorMessage = 'Ha surgido un problema al enviar el correo, intentelo nuevamente.';
                    this.$refs.modalError.openModal();
                });
        },

        agregarSolicitud() {
            const idUsuario = this.$store.state.auth.userId;
            const url = `${API_URL}/${ENDPOINT_AGREGAR_SOLICITUD}?idSolicitante=${idUsuario}`;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            if (this.objetoCorreo.idSolicitante > 0) {
                this.solicitud.solicitante = this.usuario.nombre;
                this.solicitud.correo = this.usuario.correo;
                this.solicitud.proyectoCuenta = this.proyectoCuenta;
            } else {
                this.solicitud.solicitante = 'Ajuste de inventario';
                this.solicitud.correo = 'AjusteDeinventario@gmail.com';
                this.solicitud.proyectoCuenta = 'Ajuste de inventario';
            }

            let fechaActual = new Date();

            this.solicitud.idProducto = this.objetoCorreo.producto.idProducto;
            this.solicitud.estado = true;
            this.solicitud.regresoProducto = true;
            this.solicitud.cantidad = this.cantidadInicial;
            this.solicitud.fechaSolicitud = fechaActual;



            return axios.post(url, this.solicitud, config)
                .then(() => {
                }).catch(error => {
                    console.log(error);
                    this.errorMessage = 'Ha surgido un problema al crear la salida, intentelo nuevamente.';
                    this.$refs.modalError.openModal();
                });

        },


        editarProducto() {

            const idUsuario = this.$store.state.auth.userId;

            const url = `${API_URL}/${ENDPOINT_EDITAR_PRODUCTO}?idSolicitante=${idUsuario}`;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };


            axios.put(url, this.objetoSalida, config)
                .then(() => {
                })
                .catch(() => {
                    this.errorMessage = 'Error al editar el producto';
                    this.$refs.modalError.openModal();
                });
        },

        async crearSalida() {
            this.objetoSalida.cantidad = this.obtenerCantidad();

            if (this.objetoSalida.cantidad >= 0) {

                if (!this.mostrarMotivo) {
                    try {
                        await this.consultarUsuario(this.objetoCorreo.idSolicitante);
                        await this.agregarSolicitud();
                        await this.editarProducto();
                        await this.generarCorreo();
                        this.successMessage = 'Salida creada correctamente.';
                        this.$refs.modalSuccess.openModal();
                        this.$emit('recargar-pagina');
                        this.closeModal();
                    } catch (error) {
                        this.closeModal();
                    }
                } else {
                    try {
                        await this.agregarSolicitud();
                        await this.editarProducto();
                        this.successMessage = 'Salida creada correctamente.';
                        this.$refs.modalSuccess.openModal();
                        this.$emit('recargar-pagina');
                        this.closeModal();
                    } catch (error) {
                        this.$emit('recargar-pagina');
                        this.closeModal();
                    }

                }
            }

        },

    },
};
