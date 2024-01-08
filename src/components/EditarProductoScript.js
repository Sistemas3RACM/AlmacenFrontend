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
        proveedoresOptions: Array,
        camposMostrados: Array,
    },
    data() {
        return {
            show: false,
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
        cambioServicio() {
            if (this.objeto.servicio) {
                this.objeto.localizacion = '00';
                this.objeto.unidadMedida = 'Ninguno'
                this.objeto.servicio = 0;
            } else {
                this.objeto.localizacion = '100';
                this.objeto.unidadMedida = 'Servicio'
                this.objeto.servicio = 1;
            }
        },
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
        categoriaCambiada(event) {
            const categoriaId = event.target.value;
            this.objeto.idCategoria = categoriaId;
            this.$emit('categoria-cambiada', categoriaId);
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
                default:
                    return key; // por defecto, devuelve el valor original de campo
            }
        },
    },
};
