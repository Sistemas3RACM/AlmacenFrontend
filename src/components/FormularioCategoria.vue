<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <h3>Agregar Categoría</h3>
        <form @submit.prevent="enviarFormulario">
          <div v-for="campo in camposCategoria" :key="campo.id" class="mb-3">
            <label :for="campo.id" class="form-label">{{ campo.label }}</label>
            <input :type="campo.type" :id="campo.id" v-model="campo.valor" :required="campo.required" class="form-control" :placeholder="campo.ayuda" />
          </div>
  
          <div class="button-container">
            <button type="submit" class="btn m-1 btn-primary">Guardar</button>
            <button @click="cerrarFormulario" class="btn m-1 btn-danger">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
import FormularioCategoriaScript from './FormularioCategoriaScript';  
  export default {
    ...FormularioCategoriaScript,
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
    width: 30%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
  }
  
  .button-container {
    text-align: center;
  }
  </style>
  