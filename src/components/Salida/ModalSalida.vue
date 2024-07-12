<template>
    <div v-if="show" class="modal-success">
        <div class="modal-content">
            <h3 class="modal-title">Salida</h3>
            <div class="alert alert-info" role="alert">
                La cantidad actual del producto es de {{ producto.cantidad }} {{ producto.unidadMedida }}
            </div>
            <div class="principal">
                <form @submit.prevent="crearSalida">
                    <div class="mb-3 container-fluid">
                        <div class="row">
                            <div class="form-group">
                                <label class="form-label mt-1">Ajuste de inventario:</label>
                                <select v-model="esAjuste" class="form-control">
                                    <option :value=0>No</option>
                                    <option :value=1>Si</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label label-left">Cantidad:</label>

                                <input type="text" class="form-control" v-model="solicitud.cantidad" />

                            </div>
                            <div class="form-group" v-if="esAjuste == 0">
                                <label class="form-label mt-1">Nombre del solicitante:</label>
                                <select v-model="usuarioSeleccionado" class="form-control">
                                    <option v-for="usuario in usuarios" :key="usuario.idUsuario" :value="usuario">
                                        {{
                                            usuario.nombre }}</option>
                                </select>
                            </div>
                            <div class="form-group" v-if="esAjuste == 0">
                                <label class="form-label mt-1">Cuenta cargo o proyecto:</label>
                                <input type="text" class="form-control" v-model="solicitud.proyectoCuenta" required />

                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn m-1 btn-primary">Agregar</button>
                    <button @click.prevent="closeModal" class="btn m-1 btn-danger">Cerrar</button>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
import ModalSalidaScript from '@/components/Salida/ModalSalidaScript';

export default {
    ...ModalSalidaScript,
    components: {
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
    width: 25%;
    border-radius: 10px;
}

button {
    margin-top: 10px;
}

@media (max-width: 750px) {
    .modal-content {
        padding: 10px;
        text-align: center;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        width: 100%;
        border-radius: 10px;
    }
}
</style>