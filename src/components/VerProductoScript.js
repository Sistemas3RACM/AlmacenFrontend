export default {
    props: {
        titulo: String,
        objeto: {
            type: Object,
            required: true,
        },
        id: String,
        categoriaOptions: Array,
        subcategoriaOptions: Array,
        proveedorOptions: Array,
    },
    data() {
        return {
            show: false,
            puestoOptions: [
                { valor: '0', etiqueta: 'Administrativo' },
                { valor: '1', etiqueta: 'Sin permisos' },
            ],
            esServicio: false,
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
                { valor: '00', etiqueta: 'Ninguno' },
                { valor: '100', etiqueta: 'Servicio' },
            ],
        };
    },
    methods: {
        openModal() {
            this.show = true;
            if (this.objeto.servicio) {
                this.esServicio = true;
            } else {
                this.esServicio = false;
            }
        },
        closeModal() {
            this.show = false;
            this.esServicio = false;
        },
        getLabel(key) {
            switch (key) {
                case 'idCategoria':
                    return 'Categoría';
                case 'idSubcategoria':
                    return 'Subcategoría';
                case 'idProveedor':
                    return 'Proveedor';
                case 'unidadMedida':
                    return 'Unidad de medida';
                case 'localizacion':
                    return 'Localización';
                case 'nombre':
                    return 'Nombre';
                case 'precioUnitario':
                    return 'Precio unitario';
                case 'descripcion':
                    return 'Descripción';
                case 'cantidadMin':
                    return 'Cantidad Minima';
                case 'numeroDeSerie':
                    return 'Número de parte';
                default:
                    return key;
            }
        },
    },

};
