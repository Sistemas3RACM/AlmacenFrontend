<template>
    <div v-if="show">
        <form @submit.prevent="agregarProveedor">
            <div class="mb-3 container-fluid">
                <div class="row">
                    <div class="form-group">
                        <label class="form-label label-left">Nombre:</label>
                        <div>
                            <div>
                                <input type="text" class="form-control" v-model="proveedor.nombre" required />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label label-left">Dirección:</label>
                        <div>
                            <div>
                                <input type="text" class="form-control" v-model="proveedor.direccion" />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label label-left">Teléfono:</label>
                        <div>
                            <div>
                                <input type="text" class="form-control" v-model="proveedor.telefono" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <button type="submit" class="btn m-1 btn-primary">Agregar</button>
            <button @click="cerrarModalProveedor" class="btn m-1 btn-danger">Cerrar</button>
        </form>
    </div>
    <!-- Modal de Éxito -->
    <ModalSuccess :message="successMessage" ref="modalSuccess" />

    <!-- Modal de Error -->
    <ModalError :message="errorMessage" ref="modalError" />
</template>
<script>
import ModalSuccess from '@/components/ModalSuccess.vue';
import ModalError from '@/components/ModalError.vue';
import ModalProveedorScript from './ModalProveedorScript';
export default {
    ...ModalProveedorScript,
    components: {
        ModalSuccess,
        ModalError,
    },
}
</script>