<template>
  <div v-if="show" class="modal-success">
    <div class="modal-content">
      <h3 class="modal-title">Información de inventario</h3>
      <hr>
      <div v-show="hayRegistro">
        <p>Se ha realizado un registro previo con la siguiente información:</p>
        <p><b>Fecha de registro: </b> {{ ultimaFechaInventario }}</p>
        <p><b>Fecha de de vencimiento: </b>{{ proximaFechaInventario }}</p>
        <p>Si desea agregar una nueva fecha de inventario pulse "Agregar nueva fecha".</p>
      </div>
      <div v-show="!hayRegistro">
        <p>No hay ningún registro de inventario, puede agregar uno nuevo pulsando "Agregar nueva fecha".</p><br>
      </div>
      <div class="m-3" v-show="mostrarCalendarioV">
        <input type="date" class="form-control" v-model="fechaSeleccionada">
      </div>
      <a v-show="mostrarCalendarioV" class="btn btn-primary" @click="agregarNuevaFecha">Guardar fecha</a>
      <a v-show="!mostrarCalendarioV" class="btn btn-primary" @click="mostrarCalendario">Agregar nueva fecha</a>
      <button @click="closeModal" class="btn btn-danger">Cerrar</button>
    </div>
  </div>
</template>

<script>
import ModalInventario from './ModalInventario.js';
export default {
  ...ModalInventario,
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