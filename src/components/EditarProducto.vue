<template>
    <div v-if="show" class="modal-success">
        <div class="modal-content">
            <h3 class="modal-title">{{ titulo }}</h3>
            <div class="principal">
                <form @submit.prevent="enviarCambios">
                    <div class="mb-3 container-fluid">
                        <div class="row">
                            <template v-for="(campo, key) in objeto">
                                <div v-if="key != 'idProducto' &&
                                    key != 'status' &&
                                    key != 'consumible' &&
                                    key != 'numeroDeSerie' &&
                                    key != 'servicio' &&
                                    key != 'cantidad' &&
                                    key != 'cantidadMin'
                                    " :key="key" class="col-sm-6 form-group">
                                    <div v-if="(key != 'localizacion' || key != 'unidadMedida') && objeto.servicio == 0">
                                        <label :for="key" class="form-label label-left">{{ getLabel(key) }}</label>
                                    </div>
                                    <div v-else-if="key != 'localizacion' && key != 'unidadMedida'">
                                        <label :for="key" class="form-label label-left">{{ getLabel(key) }}</label>
                                    </div>

                                    <div>

                                        <div v-if="typeof campo === 'boolean'" class="form-check">
                                            <input type="checkbox" class="form-check-input" :id="key"
                                                v-model="objeto[key]" />
                                        </div>
                                        <div v-else-if="key === 'idCategoria'" class="form-group">
                                            <select class="form-control" :id="key" v-model="objeto[key]"
                                                @change="categoriaCambiada">
                                                <option v-for="option in categoriaOptions" :value="option.idCategoria">
                                                    {{
                                                        option.nombre }}</option>
                                            </select>
                                        </div>
                                        <div v-else-if="key === 'idSubcategoria'" class="form-group">
                                            <select class="form-control" :id="key" v-model="objeto[key]">
                                                <option v-for="option in subcategoriaOptions"
                                                    :value="option.idSubcategoria">{{ option.nombre }}</option>
                                            </select>
                                        </div>
                                        <div v-else-if="key === 'idProveedor'" class="form-group">
                                            <select class="form-control" :id="key" v-model="objeto[key]">
                                                <option v-for="option in proveedoresOptions" :value="option.idProveedor">{{
                                                    option.nombre }}</option>
                                            </select>
                                        </div>
                                        <div v-else-if="key === 'cantidad'">
                                            <input type="text" class="form-control" :id="key" v-model="objeto[key]" />
                                        </div>
                                        <div v-else-if="key === 'precioUnitario'">
                                            <input type="text" class="form-control" :id="key" v-model="objeto[key]" />
                                        </div>

                                        <div v-else-if="typeof campo === 'number'">
                                            <input type="number" class="form-control" :id="key" v-model="objeto[key]" />
                                        </div>
                                        <div v-else-if="key === 'unidadMedida'" class="form-group">
                                            <div v-if="objeto.servicio == 0">
                                                <select class="form-control" :id="key" v-model="objeto[key]"
                                                    :readonly="true">
                                                    <option v-for="option in unidadMedidaOptions" :value="option.valor">{{
                                                        option.etiqueta }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div v-else-if="key === 'localizacion'" class="form-group">
                                            <div v-if="objeto.servicio == 0">
                                                <select class="form-control" :id="key" v-model="objeto[key]"
                                                    :readonly="true">
                                                    <option v-for="option in localizacionOptions" :value="option.valor">{{
                                                        option.etiqueta }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div v-else class="form-group">
                                            <input type="text" class="form-control" :id="key" v-model="objeto[key]" />
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div class="col-sm-6 form-group">
                                <input type="checkbox" class="form-check-input" :id="key" :checked="objeto.servicio === 1"
                                    @change="objeto.servicio = objeto.servicio === 1 ? 0 : 1" />
                                <label :for="servicio" class="form-label label-left">Servicio</label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn m-1 btn-primary">Guardar Cambios</button>
                    <button @click="closeModal" class="btn m-1 btn-danger">Cerrar</button>
                </form>
            </div>
        </div>
    </div>
</template>
  
  
<script>
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
                { valor: '00', etiqueta: 'Ninguno' },
                { valor: '100', etiqueta: 'Servicio' },
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
</script>
  
<style scoped>
.modal-success {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.principal {
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    text-align: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    width: 90%;
    border-radius: 10px;
}

button {
    margin-top: 10px;
}
</style>
  