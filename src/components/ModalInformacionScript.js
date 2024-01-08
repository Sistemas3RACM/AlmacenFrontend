export default {
    props: {
        titulo: String,
        objeto: {
            type: Object,
            required: true,
        },
        id: String,
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
                case 'nomenclatura':
                    return 'Nomenclatura';
                case 'correo':
                    return 'Correo';
                case 'puesto':
                    return 'Permisos';
                case 'contraseña':
                    return 'Contraseña';
                default:
                    return key;
            }
        },
    },

};
