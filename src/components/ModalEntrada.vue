<template>
    <div v-if="show" class="modal-success">
        <div class="modal-content">
            <h3 class="modal-title">Entrada</h3>
            <div class="principal">
                <form @submit.prevent="enviarCambios">
                    <div class="mb-3 container-fluid">
                        <div class="row">
                            <template v-for="(campo, key) in objetoEntrada">
                                <div v-if="key == 'cantidad'
                                    " :key="key" class="col-sm-12 form-group">
                                    <label :for="key" class="form-label label-left">{{ key }}</label>
                                    <div>
                                        <div v-if="key == 'cantidad'">
                                            <input type="text" class="form-control" :id="key" v-model="objetoEntrada[key]" />
                                        </div>
                                    </div>
                                </div>
                            </template>
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
export default {
    props: {
        objetoEntrada: {
            type: Object,
            required: true,
        },
        id: String,
    },
    data() {
        return {
            show: false,
        };
    },
    methods: {
        openModal() {
            this.show = true;
        },
        closeModal() {
            this.show = false;
        },
        enviarCambios() {
            this.$emit('guardar-cambios', this.objetoEntrada);
            this.closeModal();
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
  