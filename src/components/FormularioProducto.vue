<template>
    <h3>Agregar Producto</h3>
    <div class="principal" v-if="visible">
        <form @submit.prevent="enviar">
            <div class="mb-3 container-fluid">
                <div class="row">
                    <div v-for="campo in campos" :key="campo.id" class="col-sm-6">
                        <div v-if="!campo.hidden">
                            <label :for="campo.id" class="form-label">{{ campo.label }}</label>
                        </div>
                        <div v-if="!campo.hidden">
                            <div v-if="campo.type === 'checkbox'" class="form-check">
                                <input :type="campo.type" class="form-check-input" :id="campo.id" v-model="campo.valor"
                                    :required="campo.required" @change="cambioServicio">
                                <label :for="campo.id" class="form-check-label">{{ campo.ayuda }}</label>
                            </div>
                            <div v-else-if="campo.type === 'select'" class="form-group">
                                <div
                                    v-if="campo.id != 'idProveedor' && campo.id != 'idCategoria' && campo.id != 'idSubcategoria'">
                                    <select class="form-select" :id="campo.id" v-model="campo.valor"
                                        :required="campo.required">
                                        <option value="" disabled>Seleccione una opción</option>
                                        <option v-for="opcion in campo.opciones" :key="opcion.valor" :value="opcion.valor">
                                            {{
                                                opcion.etiqueta }}</option>
                                    </select>
                                </div>
                                <div v-else-if="campo.id === 'idProveedor'">
                                    <select class="form-select" :id="campo.id" v-model="campo.valor"
                                        :required="campo.required">
                                        <option value="" disabled>Seleccione una opción</option>
                                        <option v-for="opcion in campo.opciones" :key="opcion.valor" :value="opcion.valor">
                                            {{
                                                opcion.etiqueta }}</option>
                                    </select>
                                    <a href="#" @click.prevent="mostrarProveedor">Agregar</a>
                                </div>
                                <div v-else-if="campo.id === 'idCategoria'">
                                    <select class="form-select" :id="campo.id" v-model="campo.valor"
                                        :required="campo.required" @change="categoriaCambiada(campo.valor)">
                                        <option value="" disabled>Seleccione una opción</option>
                                        <option v-for="opcion in campo.opciones" :key="opcion.valor" :value="opcion.valor">
                                            {{
                                                opcion.etiqueta }}</option>
                                    </select>
                                    <a href="#" @click.prevent="mostrarCategoria">Agregar</a>
                                </div>
                                <div v-else-if="campo.id === 'idSubcategoria'">
                                    <select class="form-select" :id="campo.id" v-model="campo.valor"
                                        :required="campo.required">
                                        <option value="" disabled>Seleccione una opción</option>
                                        <option v-for="opcion in campo.opciones" :key="opcion.valor" :value="opcion.valor">
                                            {{
                                                opcion.etiqueta }}</option>
                                    </select>
                                    <a href="#" @click.prevent="mostrarSubcategoria">Agregar</a>
                                </div>

                                <div v-if="campo.ayuda" class="form-text">{{ campo.ayuda }}</div>
                            </div>
                            <div v-else>
                                <input :type="campo.type" class="form-control" :id="campo.id" v-model="campo.valor"
                                    :required="campo.required" :hidden="campo.hidden">
                                <div v-if="campo.ayuda" class="form-text">{{ campo.ayuda }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="button-container">
                <button type="submit" class="btn m-1 btn-primary">{{ textoBoton }}</button>
                <button @click="cerrarFormulario" class="btn m-1 btn-danger">Cancelar</button>
            </div>
        </form>
    </div>
    <FormularioProveedor v-if="mostrarFormularioProveedor" :visible="mostrarFormularioProveedor"
        @cerrar-formulario="cerrarFormularioProveedor" @actualizar-listas-proveedor="actualizarListas" />
    <FormularioCategoria v-if="mostrarFormularioCategoria" :visible="mostrarFormularioCategoria"
        @cerrar-formulario="cerrarFormularioCategoria" @actualizar-listas-categorias="actualizarListas" />
    <FormularioSubcategoriaVue v-if="mostrarFormularioSubcategoria" :visible="mostrarFormularioSubcategoria"
        @cerrar-formulario="cerrarFormularioSubcategoria" @actualizar-listas-categorias="actualizarListas" />
</template>
      
<script>
import FormularioProveedor from './FormularioProveedor.vue';
import FormularioCategoria from './FormularioCategoria.vue';
import FormularioSubcategoriaVue from './FormularioSubcategoria.vue';
import FormularioProductoScript from './FormularioProductoScript';

export default {
    ...FormularioProductoScript,
    components: {
        FormularioProveedor,
        FormularioCategoria,
        FormularioSubcategoriaVue,
    },
};
</script>
  
<style scoope>
.principal {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>