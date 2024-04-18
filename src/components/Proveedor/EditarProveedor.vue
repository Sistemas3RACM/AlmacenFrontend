<template>
    <div v-if="show" class="modal-overlay">
        <div class="modal-content">
            <h3>Editar Proveedor</h3>
            
            <form @submit.prevent="editarProveedor">
                <div class="mb-3">
                    <div class=".col-xl-12 ">
                        <label class="form-label label-left">Nombre *</label>
                        <input type="text" class="form-control" placeholder="Ingrese el nombre"
                            v-model="objeto.nombre" required>
                    </div>
                    <div class="col">
                        <label class="form-label label-left">Dirección</label>
                        <input type="text" class="form-control" placeholder="Ingrese la dirección"
                            v-model="objeto.direccion">
                    </div>
                    <div class="col">
                        <label class="form-label label-left">Teléfono</label>
                        <input type="text" class="form-control" placeholder="Ingrese el teléfono"
                            v-model="objeto.telefono">
                    </div>
                    <div class="col">
                        <label class="form-label label-left">Información de contacto</label>
                        <textarea class="form-control" placeholder="Ingrese la información del contacto"
                            v-model="objeto.infoContacto" rows="3"></textarea>
                    </div>
                    <div class="col">
                        <label class="form-label label-left">Descripción del proveedor *</label>
                        <textarea class="form-control" placeholder="Ingrese la descripción del proveedor"
                            v-model="objeto.descripcion" rows="3" required></textarea>
                    </div>

                </div>

                <div class="button-container">
                    <button type="submit" class="btn m-1 btn-primary">Actualizar</button>
                    <button @click="closeModal" class="btn m-1 btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
    <ModalSuccess :message="mensajeCorrecto" ref="ModalCorrecto" />
    <ModalError :message="mensajeError" ref="ModalError" />
</template>

<script>
import EditarProveedorScript from './EditarProveedorScript.js';
import ModalSuccess from '../ModalSuccess.vue';
import ModalError from '../ModalError.vue';

export default {
    ...EditarProveedorScript,
    components: {
        ModalSuccess,
        ModalError,
    },

};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    border-radius: 10px;
}

.modal-content {
    width: 25%;
    /* Cambiar el ancho según lo necesites */
    height: auto;
    /* Permitir que la altura se ajuste automáticamente */
    padding: 20px;
    /* Añadir un espacio interno */
    margin: 10px;
    /* Añadir un margen exterior */
    display: flex;
    flex-direction: column;
    /* Alinear los elementos verticalmente */
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
}

@media screen and (max-width: 1000px) {
    .modal-content {
        width: 45%;
        /* Cambiar el ancho según lo necesites */
    }
}

@media screen and (max-width: 620px) {
    .modal-content {
        width: 55%;
        /* Cambiar el ancho según lo necesites */
    }
}

@media screen and (max-width: 480px) {
    .modal-content {
        width: 70%;
        /* Cambiar el ancho según lo necesites */
    }
}

.button-container {
    text-align: center;
}
</style>