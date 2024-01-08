import {
    API_URL, ENDPOINT_AGREGAR_MOVIMIENTO
} from '../keys';
export default {
    props: {
        objetoEntrada: {
            type: Object,
            required: true,
        },
        id: String,
    },
    data() {
        return {
            show: false,
            permisos: false,
            mostrarMotivo: false, // Nuevo dato para controlar la visibilidad del motivo
            cantidadInicial: 0,
        };
    },
    mounted() {
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
            const cantidadFinal = parseInt(this.objetoEntrada.cantidad) + parseInt(this.cantidadInicial);
            if (!isNaN(cantidadFinal) && cantidadFinal >= 0) {
                return cantidadFinal;
            } else {
                return -1;
            }
        },

        enviarCambios() {
            if (this.mostrarMotivo) {
                this.registroDeMovimientos("Se realizo una entrada con ajuste de inventario");
            }
            if (!this.mostrarMotivo) {
                this.registroDeMovimientos("Se realizo una entrada");
            }

            this.objetoEntrada.cantidad = this.obtenerCantidad();


            this.$emit('guardar-cambios', this.objetoEntrada);
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
    },
};
