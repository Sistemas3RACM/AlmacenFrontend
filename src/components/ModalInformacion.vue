<template>
    <div v-if="show" class="modal-success">
        <div class="modal-content">
            <h3 class="modal-title">{{ titulo }}</h3>
            <form>


                <div v-for="(campo, key) in objeto" :key="key" class="mb-3">
                    <div v-if="key != id && key != 'apellidoMaterno' && key != 'apellidoPaterno' && key != 'contraseña'" class="row">
                        <div class="col-3">
                            <label :for="key" class="form-label label-left">{{ getLabel(key) }}</label>
                        </div>
                        <div class="col-9">
                            <div v-if="typeof campo === 'boolean'" class="form-check">
                                <input type="checkbox" class="form-check-input" :id="key" v-model="objeto[key]"
                                    :readonly="true">
                            </div>
                            <div v-else-if="key === 'idCategoria'" class="form-group">
                                <select class="form-control" :id="key" v-model="objeto[key]" :readonly="true">
                                    <option v-for="option in categoriaOptions" :value="option.idCategoria">{{ option.nombre
                                    }}
                                    </option>
                                </select>
                            </div>
                            <div v-else-if="key === 'puesto'" class="form-group">
                                <select class="form-control" :id="key" v-model="objeto[key]" :readonly="true">
                                    <option v-for="option in puestoOptions" :value="option.valor" :readonly="true">{{
                                        option.etiqueta }}
                                    </option>
                                </select>
                            </div>
                            <div v-else-if="typeof campo === 'number'">
                                <input type="number" class="form-control" :id="key" v-model="objeto[key]" :readonly="true">
                            </div>
                            <div v-else>
                                <input type="text" class="form-control" :id="key" v-model="objeto[key]" :readonly="true">
                            </div>
                        </div>

                    </div>
                </div>

                <button @click="closeModal" class="btn m-1 btn-primary">Cerrar</button>
            </form>
        </div>
    </div>
</template>
  
<script>
import ModalInformacionScript from './ModalInformacionScript';
export default {
    ...ModalInformacionScript,
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

.modal-content {
    background: white;
    padding: 20px;
    text-align: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    width: 40%;
    border-radius: 10px;
}

button {
    margin-top: 10px;
}
</style>
  