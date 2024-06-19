<template>
    <div v-if="show" class="modal-success">
        <div class="modal-content modal-left">
            <div class="row align-items-center justify-content-between m-4">
                <div class="col-auto">
                    <a class="btn btn-regresar" @click="closeModal">Regresar</a>
                </div>
                <div class="col text-center">
                    <h1 class="modal-title">Información del producto</h1>
                </div>
            </div>
            <hr>
            <div class="m-3">

                <div class="row mt-3">
                    <div class="col-md-4">
                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Nombre.</label>
                            <input type="text" class="form-control" v-model="objetoLocal.producto.nombre" readonly>
                        </div>
                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left etiqueta ">Número de serie.</label>
                            <input type="text" class="form-control" v-model="objetoLocal.producto.numeroDeSerie"
                                readonly>
                        </div>
                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Categoría.</label>
                            <input type="text" class="form-control" v-model="objetoLocal.categoria.nombre" readonly>
                        </div>
                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Subcategoría.</label>
                            <input type="text" class="form-control" v-model="objetoLocal.subcategoria.nombre" readonly>
                        </div>

                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Marca.</label>
                            <input type="text" class="form-control" v-model="objetoLocal.producto.marca" readonly>
                        </div>

                    </div>

                    <div class="col-md-4">
                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Modelo.</label>
                            <input type="text" class="form-control" v-model="objetoLocal.producto.modelo" readonly>
                        </div>

                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left etiqueta ">Descripción.</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="4"
                                v-model="objetoLocal.producto.descripcion"
                                placeholder="Aquí se muestra la descripción agregada al producto..."
                                readonly></textarea>
                        </div>

                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Cantidad.</label>
                            <input type="text" class="form-control" v-model="objetoLocal.producto.cantidad" readonly>
                        </div>

                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Unidad de medida.</label>
                            <input type="text" class="form-control" v-model="objetoLocal.producto.unidadMedida"
                                readonly>
                        </div>

                    </div>

                    <div class="col-md-4">
                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Proveedor.</label>
                            <input type="text" class="form-control" v-model="objetoLocal.proveedor.nombre" readonly>
                        </div>

                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Precio unitario.</label>
                            <input type="text" class="form-control"
                                :value="formatCurrency(objetoLocal.producto.precioUnitario)" readonly>
                        </div>

                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Localización.</label>
                            <select class="form-select" v-model="objetoLocal.producto.localizacion" required>
                                <option v-for="localizacion in localizacionOptions" :key="localizacion.valor"
                                    :value="localizacion.valor">{{
                                        localizacion.etiqueta }}</option>
                            </select>
                        </div>

                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Cuenta.</label>
                            <input type="text" class="form-control" v-model="objetoLocal.cuenta.NombreCuenta" readonly>
                        </div>

                        <div class="col-md-10 mb-3">
                            <label class="form-label label-left mr-1 etiqueta">Es servicio.</label>
                            <select class="form-select" v-model="objetoLocal.producto.servicio">
                                <option v-for="servicio in servicioOptions" :key="servicio.valor"
                                    :value="servicio.valor">{{
                                        servicio.etiqueta }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import VerProducto from './VerProductoScript.js';

export default {
    ...VerProducto,
    components: {
    },
};
</script>

<style scoped>
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