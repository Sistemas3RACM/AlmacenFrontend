<template>
    <div v-if="show" class="modal-success">
        <div class="modal-content modal-left">
            <div class="row align-items-center justify-content-between m-4">
                <div class="col-auto">
                    <a class="btn btn-regresar" @click="closeModal">Regresar</a>
                </div>
                <div class="col text-center">
                    <h1 class="modal-title">Editar producto</h1>
                </div>
            </div>
            <hr>
            <div class="m-3">

                <div class="row mt-3">
                    <div class="col-md-4">
                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Nombre.</label>
                            <input type="text" class="form-control" v-model="objetoLocal.nombre">
                        </div>
                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left etiqueta ">Número de serie.</label>
                            <input type="text" class="form-control" v-model="objetoLocal.numeroDeSerie" readonly>
                        </div>
                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Categoría.</label>
                            <select class="form-select" v-model="objetoLocal.idCategoria" @change="listarSubcategorias"
                                required>
                                <option v-for="categoria in categorias" :key="categoria.idCategoria"
                                    :value="categoria.idCategoria">{{
                                        categoria.nombre }}</option>
                            </select>
                        </div>
                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Subcategoría.</label>
                            <select class="form-select" v-model="objetoLocal.idSubcategoria" required>
                                <option v-for="subcategoria in subcategorias" :key="subcategoria.idSubcategoria"
                                    :value="subcategoria.idSubcategoria">{{
                                        subcategoria.nombre }}</option>
                            </select>
                        </div>

                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Marca.</label>
                            <input type="text" class="form-control" v-model="objetoLocal.marca">
                        </div>

                    </div>

                    <div class="col-md-4">
                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Modelo.</label>
                            <input type="text" class="form-control" v-model="objetoLocal.modelo">
                        </div>

                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left etiqueta ">Descripción.</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="4"
                                v-model="objetoLocal.descripcion"
                                placeholder="Aquí se muestra la descripción agregada al producto..."></textarea>
                        </div>

                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Cantidad.</label>
                            <input type="text" class="form-control" v-model="objetoLocal.cantidad" readonly>
                        </div>

                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Unidad de medida.</label>
                            <select class="form-select" v-model="objetoLocal.unidadMedida" required>
                                <option v-for="unidad in unidadMedidaOptions" :key="unidad.valor" :value="unidad.valor">
                                    {{
                                        unidad.etiqueta }}</option>
                            </select>
                        </div>

                    </div>

                    <div class="col-md-4">
                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Proveedor.</label>
                            <select class="form-select" v-model="objetoLocal.idProveedor" required>
                                <option v-for="proveedor in proveedores" :key="proveedor.idProveedor"
                                    :value="proveedor.idProveedor">{{
                                        proveedor.nombre }}</option>
                            </select>
                        </div>

                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Precio unitario.</label>
                            <input type="text" class="form-control" v-model="objetoLocal.precioUnitario">
                        </div>

                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Localización.</label>
                            <select class="form-select" v-model="objetoLocal.localizacion" required>
                                <option v-for="localizacion in localizacionOptions" :key="localizacion.valor"
                                    :value="localizacion.valor">{{
                                        localizacion.etiqueta }}</option>
                            </select>
                        </div>

                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Cuenta.</label>
                            <select class="form-select" v-model="objetoLocal.idCuenta" required>
                                <option v-for="cuenta in cuentas" :key="cuenta.idCuenta" :value="cuenta.idCuenta">{{
                                    cuenta.NombreCuenta }}</option>
                            </select>
                        </div>

                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Es servicio.</label>
                            <select class="form-select" v-model="objetoLocal.servicio">
                                <option v-for="servicio in servicioOptions" :key="servicio.valor"
                                    :value="servicio.valor">{{
                                        servicio.etiqueta }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-md-12 bg-white p-3 d-flex justify-content-center">
                    <a @click="enviar" class="btn btn-guardar">Editar producto</a>
                </div>
            </div>


        </div>
    </div>


</template>

<script>
import EditarProductoScript from './EditarProductoScript.js';

export default {
    ...EditarProductoScript,
    components: {
    },
};
</script>

<style scoped>
.btn-guardar {
    background-color: #ffbb00;
    /* Color de fondo del botón */
    color: rgb(0, 0, 0);
    /* Color del texto */
    padding: 15px 30px;
    /* Tamaño del botón */
    font-size: 5rem;
    /* Tamaño del texto */
    border: none;
    /* Sin bordes adicionales */
    border-radius: 0;
    /* Esquinas cuadradas */
    text-decoration: none;
    /* Sin subrayado */
    display: inline-block;
    /* Para que el enlace se comporte como un botón */
    text-align: center;
    /* Centrar el texto */
    cursor: pointer;
    /* Cambiar el cursor al pasar por encima */
}

/* Botón Regresar */
.btn-regresar {
    background-color: #D9534F;
    color: white;
    border: none;
    border-radius: 0;
    padding: 10px 20px;
    text-decoration: none;
    display: inline-block;
    font-weight: bold;
    cursor: pointer;
}

/* Título */
.modal-title {
    font-size: 2.5rem;
    /* Ajusta el tamaño según tus necesidades */
    margin-bottom: 1.2rem;
    /* Margen inferior para separación */
    flex-grow: 1;
    /* Permite que el título crezca para ocupar el espacio restante */
}

/* Asegura que el título esté centrado */
.text-center {
    text-align: center;
    width: 100%;
}

/* Alineación vertical de los elementos en la fila */
.align-items-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Distribuye espacio entre los elementos */
.justify-content-between {
    justify-content: space-between;
}


.etiqueta {
    font-weight: bold;
}

.btn {
    border-radius: 0;
    /* Esquinas en punta */
    margin-right: 27px;
    /* Separación de 27px */
    padding: 10px 20px;
    /* Espaciado interno del botón */
    text-align: center;
    /* Alineación del texto */
    display: inline-block;
    /* Asegura que los botones estén en línea */
    text-decoration: none;
    /* Elimina el subrayado de los enlaces */
    font-weight: bold;
    /* Texto en negritas */
    cursor: pointer;
    /* Cursor en forma de mano */
    font-size: 1rem
}

.btn-redondo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
}
</style>