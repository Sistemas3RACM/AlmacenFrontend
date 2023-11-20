<template>
    <div v-if="show" class="modal-success">
        <div class="modal-content">
            <h3 class="modal-title">Salida</h3>
            <div class="principal">
                <form @submit.prevent="enviarCambios">
                    <div class="mb-3 container-fluid">
                        <div class="row">
                            <template v-for="(campo, key) in objetoSalida">
                                <div v-if="key === 'cantidad'" :key="key" class="form-group">
                                    <label :for="key" class="form-label label-left">{{ key }}</label>
                                    <div>
                                        <div v-if="key === 'cantidad'">
                                            <input type="text" class="form-control" :id="key" v-model="objetoSalida[key]" />
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <!-- <div v-if="mostrarMotivo">
                                <label class="form-label mt-1">Motivo:</label>
                                <input type="text" class="form-control" v-model="objetoSalida.motivo" placeholder="Motivo" />
                            </div> -->
                            <div v-if="!mostrarMotivo">
                                <label class="form-label mt-1">Nombre del solicitante:</label>
                                <input type="text" class="form-control" v-model="solicitante"
                                    placeholder="Nombre del solicitante" />
                                <label class="form-label mt-1">Correo:</label>
                                <input type="text" class="form-control" v-model="correo" placeholder="Correo" />
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
</template>

<script>
import {
    API_URL, ENDPOINT_AGREGAR_MOVIMIENTO
} from '../keys';
export default {
    props: {
        objetoSalida: {
            type: Object,
            required: true,
        },
        id: String,
    },
    data() {
        return {
            show: false,
            solicitante: '',
            correo: '',
            mostrarMotivo: false,
            permisos: false,
        };
    },
    mounted() {
        this.obtenerPermisos();
    },
    methods: {
        openModal() {
            this.show = true;
        },
        closeModal() {
            this.show = false;
        },
        enviarCambios() {
            const idUsuario = this.$store.state.auth.userId;

            if (this.mostrarMotivo) {
                console.log("verdadero motivo");
                this.solicitante = `${idUsuario}`;
                this.correo = 'Ajuste de inventario@gmail.com';
                this.registroDeMovimientos("Se realizo una salida con ajuste de inventario");
            }
            if(!this.mostrarMotivo) {
                console.log("falso motivo");
                this.registroDeMovimientos("Se realizo una salida");
            }

            const objetoCombinado = {
                ...this.objetoSalida,
                solicitante: this.solicitante,
                correo: this.correo,
            };

            this.$emit('guardar-cambios', objetoCombinado);
            this.closeModal();
        },
        obtenerPermisos() {
            const idUsuario = this.$store.state.auth.userAdmin;

            if (idUsuario == 1) {
                this.permisos = true;
            }

        },
        registroDeMovimientos(mensaje) {
            const idUsuario = this.$store.state.auth.userId;

            console.log(mensaje);

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

                    }
                    else {
                        if (response.status === 409) {
                        }
                    }
                })
                .catch(error => {

                });

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
    width: 30%;
    border-radius: 10px;
}

button {
    margin-top: 10px;
}
</style>
  