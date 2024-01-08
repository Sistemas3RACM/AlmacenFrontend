export default {
    props: {
        campos: {
            type: Array,
            required: true,
        },
        visible: Boolean,
        textoBoton: {
            type: String,
            default: 'Agregar',
        },
        modoInicial: {
            type: String,
            default: 'agregar',
        },
    },
    data() {
        return {
            modo: this.modoInicial,
            esServicio: false,
            mostrarFormularioProveedor: false,
            mostrarFormularioCategoria: false,
            mostrarFormularioSubcategoria: false,
        };
    },
    methods: {

        actualizarListas() {
            this.$emit('actualizar-listas');
        },
        mostrarProveedor() {
            this.mostrarFormularioProveedor = true;
        },
        cerrarFormularioProveedor() {
            this.mostrarFormularioProveedor = false;
        },
        mostrarCategoria() {
            this.mostrarFormularioCategoria = true;
        },
        cerrarFormularioCategoria() {
            this.mostrarFormularioCategoria = false;
        },
        mostrarSubcategoria() {
            this.mostrarFormularioSubcategoria = true;
        },
        cerrarFormularioSubcategoria() {
            this.mostrarFormularioSubcategoria = false;
        },
        enviar() {
            this.$emit('formulario-enviado', this.campos, this.modo);
        },
        inicializarCampos() {
            // Inicializa los campos según el modo actual
            if (this.modo === 'agregar') {
                for (const campo of this.campos) {
                    campo.valor = campo.type === 'checkbox' ? false : '';
                }
            }
        },
        cambioServicio() {
            this.esServicio = !this.esServicio;

            // Buscar el campo con id 'localizacion' en la matriz campos
            const localizacionCampo = this.campos.find(campo => campo.id === 'localizacion');
            const MedidaCampo = this.campos.find(campo => campo.id === 'unidadMedida');

            // Actualizar el atributo hidden del campo 'localizacion'
            if (localizacionCampo) {
                localizacionCampo.hidden = this.esServicio;
                localizacionCampo.valor = '100';
                MedidaCampo.hidden = this.esServicio;
                MedidaCampo.valor = 'Servicio';
            } else {
                localizacionCampo.valor = '';
                MedidaCampo.valor = '';
            }
        },
        categoriaCambiada(valor) {
            // Emitir el evento cuando cambia la categoría seleccionada
            this.$emit('categoria-cambiada', valor);
        },
        cerrarFormulario() {
            this.$emit('cerrar-formulario'); // Emitir un evento para indicar al componente principal que cierre el formulario
        },
    },
    mounted() {
        // Inicializa los campos según el modo inicial
        this.inicializarCampos();
    },
};
