export default {
    props: {
        titulo: String,
        objeto: {
            type: Object,
            required: true,
        },
        id: String,
        camposMostrados: {
            type: Array,
            default: () => [],
        },
        categoriaOptions: Array,
    },
    data() {
        return {
            show: false,
            puestoOptions: [
                { valor: '1', etiqueta: 'Administrativo del Sistema' },
                { valor: '2', etiqueta: 'Administrativo' },
                { valor: '3', etiqueta: 'Sin permisos' },
            ],
        };
    },

    methods: {
        openModal() {
            this.show = true;
        },
        closeModal() {
            this.show = false;
        },
        enviarCambios() {
            this.$emit('guardar-cambios', this.objeto);
            this.closeModal();
        },
        getLabel(key) {
            switch (key) {
                case 'idCategoria':
                    return 'Categoría';
                case 'nombre':
                    return 'Nombre';
                case 'direccion':
                    return 'Dirección';
                case 'telefono':
                    return 'Teléfono';
                case 'apellidoMaterno':
                    return 'Apellido Materno';
                case 'apellidoPaterno':
                    return 'Apellido Paterno';
                case 'correo':
                    return 'Correo';
                case 'puesto':
                    return 'Permisos';
                default:
                    return key;
            }
        },
    },

};
