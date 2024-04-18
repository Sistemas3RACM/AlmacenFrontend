import axios from 'axios';
import { API_URL, ENDPOINT_LISTAR_CATEGORIAS, ENDPOINT_LISTAR_SUBCATEGORIAS_POR_CATEGORIAS, ENDPOINT_LISTAR_PROVEEDORES, ENDPOINT_LISTAR_CUENTAS, API_REQUISICIONES_URL } from '@/keys';
export default {
    props: {
        objeto: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            categorias: [],
            subcategorias: [],
            proveedores: [],
            cuentas: [],
            objetoLocal: null,
            unidadMedidaOptions: [
                { valor: 'Piezas', etiqueta: 'Piezas' },
                { valor: 'Kilogramos', etiqueta: 'Kilogramos' },
                { valor: 'Cajas', etiqueta: 'Cajas' },
                { valor: 'Pares', etiqueta: 'Pares' },
                { valor: 'Metros', etiqueta: 'Metros' },
                { valor: 'Docenas', etiqueta: 'Docenas' },
                { valor: 'Litros', etiqueta: 'Litros' },
                { valor: 'Mililitros', etiqueta: 'Mililitros' },
                { valor: 'Gramos', etiqueta: 'Gramos' },
                { valor: 'Centímetros', etiqueta: 'Centímetros' },
                { valor: 'Ninguno', etiqueta: 'Ninguno' },
                { valor: 'Servicio', etiqueta: 'Servicio' },
            ],
            localizacionOptions: [
                { valor: '01', etiqueta: 'Anaquel 1' },
                { valor: '02', etiqueta: 'Anaquel 2' },
                { valor: '03', etiqueta: 'Anaquel 3' },
                { valor: '04', etiqueta: 'Anaquel 4' },
                { valor: '05', etiqueta: 'Anaquel 5' },
                { valor: '06', etiqueta: 'Anaquel 6' },
                { valor: '07', etiqueta: 'Anaquel 7' },
                { valor: '08', etiqueta: 'Anaquel 8' },
                { valor: '09', etiqueta: 'Anaquel 9' },
                { valor: '00', etiqueta: 'Ninguno' },
                { valor: '100', etiqueta: 'Servicio' },
            ],
            visible: false,
            esServicio: false,

        };
    },
    methods: {

        async openModal() {
            this.objetoLocal = { ...this.objeto };
            this.listarCategorias();
            this.listarProveedores();
            this.listarCuentas();
            this.listarSubcategoriasPorCategoria();
            if (this.objetoLocal.servicio == 1) {
                this.esServicio = true;
            } else {
                this.esServicio = false;
            }
            this.visible = true;
            // Inicializa los campos según el modo actual
        },

        closeModal() {
            this.visible = false;
        },

        listarCategorias() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_CATEGORIAS}`;
            return axios.get(url)
                .then(response => {
                    this.categorias = response.data;
                })
                .catch(() => {
                    console.log("Error al listar las categorias existentes");
                });
        },

        listarSubcategoriasPorCategoria() {
            var categoria = this.objetoLocal.idCategoria;
            const url = `${API_URL}/${ENDPOINT_LISTAR_SUBCATEGORIAS_POR_CATEGORIAS}/${categoria}`;

            return axios.get(url)
                .then(response => {
                    this.subcategorias = response.data;
                })
                .catch(() => {
                    console.log("Error al listar las subcategorias existentes");
                });
        },

        listarProveedores() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_PROVEEDORES}`;

            return axios.get(url)
                .then(response => {
                    this.proveedores = response.data;
                })
                .catch(() => {
                    console.log("Error al listar los proveedores existentes");
                });
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



    },

};