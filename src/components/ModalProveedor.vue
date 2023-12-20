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
import {
    API_URL, ENDPOINT_AGREGAR_PROVEEDOR, ENDPOINT_AGREGAR_MOVIMIENTO,
} from '../keys';
import ModalSuccess from '@/components/ModalSuccess.vue';
import ModalError from '@/components/ModalError.vue';
export default {
    components: {
        ModalSuccess,
        ModalError,
    },
    props: {
        show: Boolean,
    },
    data() {
        return {
            proveedores: null,
            successMessage: '',
            errorMessage: '',
            proveedor: {
                nombre: '',
                direccion: '',
                telefono: '',
            },

        };
    },
    methods: {
        cerrarModalProveedor() {
            this.$emit('cerrar-modal-proveedor');
        },
        openModal() {
            this.show = true;
        },
        closeModal() {
            this.show = false;
        },
        agregarProveedor() {
            console.log(this.proveedor);
            // const url = `${API_URL}/${ENDPOINT_AGREGAR_PROVEEDOR}`;

            // const nuevoJSON = {};

            // for (const campo of datos) {
            //     nuevoJSON[campo.id] = campo.valor;
            // }
            // if (nuevoJSON.telefono == "") {
            //     nuevoJSON.telefono = "";
            // }


            // if (!nuevoJSON.nombre) {
            //     console.error('El campo "nombre" es obligatorio.');
            //     return;
            // }

            // fetch(url, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(nuevoJSON),
            // })
            //     .then(response => {
            //         if (response.status === 201) {
            //             this.successMessage = 'Proveedor agregado con éxito';
            //             this.registroDeMovimientos(`Proveedor ${nuevoJSON.nombre} agregado`);
            //             this.$refs.modalSuccess.openModal();
            //             this.closeModal();
            //         }
            //         else {
            //             if (response.status === 409) {
            //                 this.errorMessage = 'El proveedor ya existe';
            //                 this.$refs.modalError.openModal();
            //             } else {
            //                 this.errorMessage = 'Error al agregar el proveedor';
            //                 this.$refs.modalError.openModal();
            //             }
            //         }
            //     })
            //     .catch(error => {
            //         this.errorMessage = 'Error en la solicitud';
            //         this.$refs.modalError.openModal();
            //     });
        },
        registroDeMovimientos(mensaje) {
            const idUsuario = this.$store.state.auth.userId;

            const JSONmovimientos = {
                "tipoMovimiento": mensaje,
                "encargado": idUsuario,
                "fechaDeMovimiento": null
            };

            const url = `${API_URL}/${ENDPOINT_AGREGAR_MOVIMIENTO}`;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(JSONmovimientos),
            })
                .then(response => {
                    if (response.status === 201) {
                        this.closeModal();
                    }
                    else {
                        if (response.status === 409) {
                            this.errorMessage = 'Error al agregar el movimiento';
                            this.$refs.modalError.openModal();
                        }
                    }
                })
                .catch(error => {
                    this.errorMessage = 'Error en la solicitud';
                });

        },
    },
}
</script>