import {
    API_URL, ENDPOINT_AGREGAR_PROVEEDOR, ENDPOINT_AGREGAR_MOVIMIENTO,
} from '../keys';
export default {
    props: {
        show: Boolean,
    },
    data() {
        return {
            proveedores: null,
            successMessage: '',
            errorMessage: '',
            proveedor: {
                nombre: '',
                direccion: '',
                telefono: '',
            },

        };
    },
    methods: {
        cerrarModalProveedor() {
            this.$emit('cerrar-modal-proveedor');
        },
        openModal() {
            this.show = true;
        },
        closeModal() {
            this.show = false;
        },
        agregarProveedor() {
            // const url = `${API_URL}/${ENDPOINT_AGREGAR_PROVEEDOR}`;

            // const nuevoJSON = {};

            // for (const campo of datos) {
            //     nuevoJSON[campo.id] = campo.valor;
            // }
            // if (nuevoJSON.telefono == "") {
            //     nuevoJSON.telefono = "";
            // }


            // if (!nuevoJSON.nombre) {
            //     console.error('El campo "nombre" es obligatorio.');
            //     return;
            // }

            // fetch(url, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(nuevoJSON),
            // })
            //     .then(response => {
            //         if (response.status === 201) {
            //             this.successMessage = 'Proveedor agregado con éxito';
            //             this.registroDeMovimientos(`Proveedor ${nuevoJSON.nombre} agregado`);
            //             this.$refs.modalSuccess.openModal();
            //             this.closeModal();
            //         }
            //         else {
            //             if (response.status === 409) {
            //                 this.errorMessage = 'El proveedor ya existe';
            //                 this.$refs.modalError.openModal();
            //             } else {
            //                 this.errorMessage = 'Error al agregar el proveedor';
            //                 this.$refs.modalError.openModal();
            //             }
            //         }
            //     })
            //     .catch(error => {
            //         this.errorMessage = 'Error en la solicitud';
            //         this.$refs.modalError.openModal();
            //     });
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
                        this.closeModal();
                    }
                    else {
                        if (response.status === 409) {
                            this.errorMessage = 'Error al agregar el movimiento';
                            this.$refs.modalError.openModal();
                        }
                    }
                })
                .catch(error => {
                    this.errorMessage = 'Error en la solicitud';
                });

        },
    },
}
