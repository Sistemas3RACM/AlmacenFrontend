<template>
    <div v-if="show" class="modal-success">
        <div class="modal-content">
            <h3 class="modal-title">Salida</h3>
            <div class="principal">
                <form @submit.prevent="enviarCambios">
                    <div class="mb-3 container-fluid">
                        <div class="row">
                            <div class="form-group">
                                <label class="form-label label-left">Cantidad:</label>
                                <div>
                                    <div>
                                        <input type="text" class="form-control" v-model="cantidadInicial" />
                                    </div>
                                </div>
                            </div>
                            <div v-if="!mostrarMotivo">
                                <label class="form-label mt-1">Nombre del solicitante:</label>
                                <select v-model="solicitanteId" class="form-control">
                                    <option v-for="usuario in usuarios" :key="usuario.idUsuario" :value="usuario.idUsuario">
                                        {{
                                            usuario.nombre }}</option>
                                </select>

                                <label class="form-label mt-1">Correo:</label>
                                <select v-model="correo" class="form-control">
                                    <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.correo">{{
                                        usuario.correo }}</option>
                                </select>
                                <label class="form-label mt-1">Cuenta cargo o proyecto:</label>
                                <input type="text" class="form-control" v-model="proyectoCuenta" required />
                            </div>
                            <div v-if="permisos">
                                <input type="checkbox" v-model="mostrarMotivo" /> Ajuste de inventario
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn m-1 btn-primary">Agregar</button>
                    <button @click="closeModal" class="btn m-1 btn-danger">Cerrar</button>
                </form>
            </div>
        </div>
    </div>
    <ModalError :message="errorMessage" ref="modalError" />
</template>

<script>
import ModalError from './ModalError.vue';
import ModalSalidaScript from '@/components/ModalSalidaScript';
export default {
    ...ModalSalidaScript,
    props: {
        objetoSalida: {
            type: Object,
            required: true,
        },
        id: String,
    },
    components: {
        ModalError,
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
    width: 30%;
    border-radius: 10px;
}

button {
    margin-top: 10px;
}
</style>
  