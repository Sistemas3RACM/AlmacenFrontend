import {
    API_URL, ENDPOINT_EDITAR_PRODUCTO
} from '@/keys';
import axios from 'axios';
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
            errorMessage: '',
            successMessage: '',
            cantidad: 0,
        };
    },
    methods: {

        openModal() {
            this.cantidad = this.objetoEntrada.cantidad;
            this.cantidadInicial = 0;
            // this.obtenerPermisos();
            this.show = true;
        },

        closeModal() {
            this.cantidadInicial = 0;
            this.show = false;
        },

        // obtenerPermisos() {
        //     const idUsuario = this.$store.state.auth.userAdmin;

        //     if (idUsuario == 1) {
        //         this.permisos = true;
        //     }

        // },

        obtenerCantidad() {
            const cantidadInicial = parseInt(this.cantidadInicial);
            if (!isNaN(cantidadInicial) && cantidadInicial >= 0) {
                return parseInt(this.objetoEntrada.cantidad) + cantidadInicial;
            } else {
                this.errorMessage = 'La cantidad inicial debe ser un número válido y no puede ser negativa.';
                this.$refs.modalError.openModal();
                this.closeModal();
            }
        },

        async guardarEntrada() {
            this.objetoEntrada.cantidad = await this.obtenerCantidad();

            if (this.objetoEntrada.cantidad >= 1) {
                this.agregarEntrada();
            }

        },

        async agregarEntrada() {
            const idUsuario = this.$store.state.auth.userId;

            const url = `${API_URL}/${ENDPOINT_EDITAR_PRODUCTO}?idSolicitante=${idUsuario}`;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            axios.put(url, this.objetoEntrada, config)
                .then(() => {
                    this.successMessage = 'Entrada agregada correctamente.';
                    this.$refs.modalSuccess.openModal();
                    this.$emit('recargar-pagina');
                    this.closeModal();
                })
                .catch(() => {
                    this.errorMessage = 'Error al agregar la entrada.';
                    this.$refs.modalError.openModal();
                    this.openModal();
                });

        }

    },
};
