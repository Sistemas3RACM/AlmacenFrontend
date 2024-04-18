<template>
    <div class="principal" v-if="visible">
        <form @submit.prevent="enviar">
            <div class="mb-3 modal-content">
                <h3>Editar Producto</h3>
                <div class="row">
                    <div class="alert alert-info" role="alert">
                        Si deseas agregar un <b>servicio</b>, marca la casilla <b>"¿Es servicio?"</b> al final y en
                        automatico se completa el campo localizacion y unidad de medida.
                    </div>
                </div>
                <hr>
                <div class="row mt-3">
                    <div class="row">
                        <div class="col-12 col-md-4">
                            <label class="form-label label-left">Nombre</label>
                            <input type="text" class="form-control" placeholder="Ingrese el nombre"
                                v-model="objetoLocal.nombre" required>
                        </div>
                        <div class="col-12 col-md-4">
                            <label class="form-label label-left">Categoría.</label>
                            <div class="row mb-3">
                                <div class="col-10 col-md-9 m-0 p-0">
                                    <select class="form-select" id="categorias" aria-label="categorias"
                                        v-model="objetoLocal.idCategoria" @change="listarSubcategoriasPorCategoria"
                                        required>
                                        <option disabled value="">Selecciona una categoría.</option>
                                        <option v-for="categoria in categorias" :key="categoria.idCategoria"
                                            :value="categoria.idCategoria">
                                            {{
                                                categoria.nombre
                                            }}</option>
                                    </select>
                                </div>
                                <div class="col-2 col-md-2 m-0 p-0">
                                    <a class="btn btn-primary" @click.prevent="mostrarAgregarCategoria">Agregar</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-4">
                            <label class="form-label label-left">Subcategoría.</label>
                            <div class="row">
                                <div class="col-10 col-md-4 m-0 p-0">
                                    <select class="form-select" id="subcategorias" aria-label="subcategorias"
                                        v-model="objetoLocal.idSubcategoria" required>
                                        <option disabled value="">Selecciona una subcategoría.</option>
                                        <option v-for="subcategoria in subcategorias" :key="subcategoria.idSubcategoria"
                                            :value="subcategoria.idSubcategoria">
                                            {{
                                                subcategoria.nombre
                                            }}</option>
                                    </select>
                                </div>
                                <div class="col-2 col-md-2 m-0 p-0">
                                    <a class="btn btn-primary" @click.prevent="mostrarAgregarSubcategoria">Agregar</a>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="row mt-3">
                        <div class="col-12 col-md-2">
                            <label class="form-label label-left">Cuentas de cargo.</label>
                            <select class="form-select" id="cuentas" aria-label="cuentas" v-model="objetoLocal.idCuenta"
                                required>
                                <option disabled value="">Selecciona una cuenta de cargo.</option>
                                <option v-for="cuenta in cuentas" :key="cuenta.idCuenta" :value="cuenta.idCuenta">
                                    {{
                                        cuenta.nombreCuenta
                                    }}</option>
                            </select>
                        </div>

                        <div class="col-12 col-md-2">
                            <label class="form-label label-left">Unidad de Medida. </label>
                            <select class="form-select" v-model="objetoLocal.unidadMedida" required>
                                <!-- Agrega v-bind:key con option.valor -->
                                <option v-for="option in unidadMedidaOptions" :key="option.valor" :value="option.valor">{{
                                    option.etiqueta }}</option>
                            </select>
                        </div>
                        <!-- <div class="col">
                            <label class="form-label label-left">Cantidad</label>
                            <input type="text" class="form-control" placeholder="Ingrese la cantidad"
                                v-model="objetoLocal.cantidad" required>
                        </div> -->
                        <div class="col-12 col-md-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Marca</label>
                            <input class="form-control" type="text" v-model="objetoLocal.marca">
                        </div>

                        <div class="col-12 col-md-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Modelo</label>
                            <input class="form-control" type="text" v-model="objetoLocal.modelo">
                        </div>

                        <div class="col-12 col-md-2">
                            <label class="form-label label-left">Precio</label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="text" class="form-control" placeholder="Ingrese el precio"
                                    v-model="objetoLocal.precioUnitario" required>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-12 col-md-4 mb-3">
                            <label class="form-label label-left">Proveedores.</label>
                            <div class="row">
                                <div class="col-10 col-md-9 m-0 p-0">
                                    <select class="form-select" id="proveedores" aria-label="proveedores"
                                        v-model="objetoLocal.idProveedor" required>
                                        <option disabled value="">Selecciona un proveedor.</option>
                                        <option v-for="proveedor in proveedores" :key="proveedor.idProveedor"
                                            :value="proveedor.idProveedor">
                                            {{
                                                proveedor.nombre
                                            }}</option>
                                    </select>
                                </div>
                                <div class="col-2 col-md-2 m-0 p-0">
                                    <a class="btn btn-primary" @click.prevent="mostrarAgregarProveedor">Agregar</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-3">
                            <label class="form-label label-left">Localización. </label>
                            <select class="form-select" v-model="objetoLocal.localizacion" required>
                                <!-- Agrega v-bind:key con option.valor -->
                                <option v-for="option in localizacionOptions" :key="option.valor" :value="option.valor">{{
                                    option.etiqueta }}</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                placeholder="Ingrese la descripción del producto..."
                                v-model="objetoLocal.descripcion"></textarea>
                        </div>

                        <div class="col-12 col-md-2 mt-3">
                            <div class="form-check d-flex flex-column align-items-center">
                                <label class="form-check-label mb-0" for="defaultCheck1">
                                    ¿Es servicio?
                                </label>
                                <input class="form-check-input mt-0" type="checkbox" value="" id="defaultCheck1"
                                    v-model="esServicio" @change="seleccionServicio">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="button-container">
                        <button type="submit" class="btn m-1 btn-primary">Guardar</button>
                        <button @click="closeModal" class="btn m-1 btn-danger">Cancelar</button>
                    </div>
                </div>
            </div>

        </form>
    </div>
    <FormularioProveedor @recargar-Cambios="openModal" ref="FormularioProveedor" />
    <FormularioCategoria @recargar-Cambios="openModal" ref="FormularioCategoria" />
    <FormularioSubcategoriaVue @recargar-Cambios="openModal" ref="FormularioSubcategoria" />
</template>
      
<script>
import FormularioProveedor from '@/components/Proveedor/FormularioProveedor.vue';
import FormularioCategoria from '@/components/Categoria/FormularioCategoria.vue';
import FormularioSubcategoriaVue from '@/components/Subcategoria/FormularioSubcategoria.vue';
import EditarProductoScript from './EditarProductoScript';
export default {
    ...EditarProductoScript,
    components: {
        FormularioProveedor,
        FormularioCategoria,
        FormularioSubcategoriaVue,
    },
};
</script>
  
<style scoped>
.principal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    margin: 20px;
    text-align: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    max-width: 95%;
    /* Ajusta el ancho máximo del modal según sea necesario */
}

.modal-title {
    margin-top: 0;
}

.button-container {
    margin-top: 20px;
}
@media (max-width:750px) {
    .principal {
        margin: 0;

    }

    .modal-content {
        margin: 10px;
        padding: 20px; /* Ajusta el padding para mantener un espacio interior adecuado */
        overflow-y: auto; /* Agrega desplazamiento vertical si el contenido excede la altura de la pantalla */
        max-height: calc(100vh - 40px);
    }

}
</style>
