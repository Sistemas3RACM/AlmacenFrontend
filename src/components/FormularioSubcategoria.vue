<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <h3>Agregar Subcategoría</h3>
        <form @submit.prevent="enviarFormulario">
            <div v-for="campo in camposSubcategoria" :key="campo.id" class="mb-3">
                <div class="row">
                    <div v-if="!campo.hidden">
                        <label :for="campo.id" class="form-label">{{ campo.label }}</label>
                    </div>
                    <div v-if="!campo.hidden">
                        <div v-if="campo.type === 'select'" class="form-group">
                            <select class="form-control" :id="campo.id" v-model="campo.valor" :required="campo.required">
                                <option value="" disabled>Seleccione una opción</option>
                                <option v-for="opcion in campo.opciones" :key="opcion.valor" :value="opcion.valor">{{
                                    opcion.etiqueta }}</option>
                            </select>
                            <div v-if="campo.ayuda" class="form-text">{{ campo.ayuda }}</div>
                        </div>
                        <div v-else>
                            <input :type="campo.type" class="form-control" :id="campo.id" v-model="campo.valor"
                                :required="campo.required" :hidden="campo.hidden">
                            <div v-if="campo.ayuda" class="form-text">{{ campo.ayuda }}</div>
                        </div>
                    </div>

                </div>

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
import FormularioSubcategoriaScript from './FormularioSubcategoriaScript';

  export default {
    ...FormularioSubcategoriaScript,
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
    width: 40%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
  }
  
  .button-container {
    text-align: center;
  }
  </style>
  