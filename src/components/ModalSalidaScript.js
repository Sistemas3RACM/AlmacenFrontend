import {
    API_URL, ENDPOINT_AGREGAR_MOVIMIENTO, ENDPOINT_LISTAR_USUARIOS, ENDPOINT_ENVIAR_CORREO
} from '../keys';
export default {
    props: {
        objetoSalida: {
            type: Object,
            required: true,
        },
        id: String,
    },
    data() {
        return {
            show: false,
            solicitanteId: null,
            correo: '',
            mostrarMotivo: false,
            permisos: false,
            usuarios: null,
            cantidadInicial: 0,
            errorMessage: '',
            cantidadSolicitada: 0,
            proyectoCuenta: '',
        };
    },
    mounted() {
        this.listarUsuarios();
        this.obtenerPermisos();
    },
    methods: {
        openModal() {
            this.show = true;
        },
        closeModal() {
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
        enviarCambios() {
            const idUsuario = this.$store.state.auth.userId;

            if (this.mostrarMotivo) {
                const usuario = this.usuarios.find(u => u.idUsuario === idUsuario);
                this.solicitante = usuario ? usuario.nombre : 'Nombre Desconocido';

                this.correo = 'AjusteDeinventario@gmail.com';
                this.registroDeMovimientos("Se realizo una salida con ajuste de inventario");
            }
            if (!this.mostrarMotivo) {
                this.registroDeMovimientos("Se realizo una salida");
            }

            this.objetoSalida.cantidad = this.obtenerCantidad();

            if (this.objetoSalida.cantidad >= 0 && !this.mostrarMotivo) {
                const objetoCombinado = {
                    ...this.objetoSalida,
                    solicitante: this.usuarios.find(u => u.idUsuario === this.solicitanteId)?.nombre,
                    correo: this.correo,
                    proyectoCuenta: this.proyectoCuenta
                };

                this.enviarCorreo(objetoCombinado);

                this.$emit('guardar-cambios', objetoCombinado);
            } else if (this.objetoSalida.cantidad >= 0 && this.mostrarMotivo) {

                const idUsuario = this.$store.state.auth.userId;


                const usuario = this.usuarios.find(u => u.idUsuario === idUsuario);

                this.solicitante = usuario ? usuario.nombre : 'Nombre Desconocido';
                this.correo = 'AjusteDeinventario@gmail.com';

                const objetoCombinado = {
                    ...this.objetoSalida,
                    solicitante: this.solicitante,
                    correo: this.correo,
                    proyectoCuenta: 'Ajuste de inventario'
                };

                this.enviarCorreo(objetoCombinado);
                this.$emit('guardar-cambios', objetoCombinado);
                this.closeModal();
            }
            this.cantidadInicial = 0;
            this.closeModal();


        },
        obtenerPermisos() {
            const idUsuario = this.$store.state.auth.userAdmin;

            if (idUsuario == 1) {
                this.permisos = true;
            }

        },
        registroDeMovimientos(mensaje) {
            const idUsuario = this.$store.state.auth.userId;


            const JSONmovimientos = {
                "tipoMovimiento": mensaje,
                "encargado": idUsuario,
                "fechaDeMovimiento": null
            };


            const url = `${API_URL}/${ENDPOINT_AGREGAR_MOVIMIENTO}`;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(JSONmovimientos),
            })
                .then(response => {
                    if (response.status === 201) {

                    }
                    else {
                        if (response.status === 409) {
                        }
                    }
                })
                .catch(error => {

                });

        },
        listarUsuarios() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_USUARIOS}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
                })
                .catch(error => console.log(error));
        },
        async enviarCorreo(objetoCombinado) {
            const url = `${API_URL}/${ENDPOINT_ENVIAR_CORREO}`;

            const mensajeCorreo = {
                "destinatario": objetoCombinado.correo,
                "mensaje": `Hola, ${objetoCombinado.solicitante}
            ¡Realizaste una solicitud de salida para un equipo o material!
            A continuación encontrarás el desglose de tu solicitud.
                
                Id producto: ${this.objetoSalida.numeroDeSerie}
                Cantidad: ${this.cantidadInicial} 
                Unidad de Medida: ${this.objetoSalida.unidadMedida}
                Descripción: ${this.objetoSalida.nombre}

            A la recepción del presente correo, hago constar que recibí los artículos listados en el 
            presente y me obligo a conservarlos en buen estado; y a utilizarlos para lo que están 
            destinados dentro de mis condiciones de trabajo, me obligo a regresarlos solo si aplica, al 
            finalizar mis actividades para las cuales fueron requeridos, y me responsabilizo de los mismos.

            En caso de robo, pérdida o deterioro voluntario de alguno de los objetos, será obligatorio 
            el pago o su restitución con iguales calidades.
                
            *Si esta solicitud no corresponde a tu solicitud o no eres el responsable de esto favor de responder 
            inmediatamente a este correo solicitando la aclaración y modificación.`,
                "asunto": "Recibo de Salida de Almacén"
            };


            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mensajeCorreo),
            })
                .then(response => {
                    if (response.status === 201) {
                        console.log("Exito en el envio del correo");
                    }
                    else {
                        if (response.status === 409) {
                            return;
                        } else {
                            console.log("Error al mandar el correo");
                            // this.errorMessage = 'Error al agregar la solicitud';
                            // this.$refs.modalError.openModal();
                            return;
                        }
                    }
                })
                .catch(error => {
                    this.errorMessage = 'Error en el envio';
                    this.$refs.modalError.openModal();
                    return;
                });
        },
    },
};
