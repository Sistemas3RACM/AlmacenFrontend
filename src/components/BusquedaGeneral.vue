<template>
    <div>
      <input type="text" v-model="terminoBusqueda" @input="realizarBusqueda" class="custom-input" placeholder="Buscar...">
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        terminoBusqueda: "",
      };
    },
    methods: {
      realizarBusqueda() {
        // Emitir un evento para notificar a la vista padre que se ha realizado una búsqueda
        this.$emit("busqueda", this.terminoBusqueda);
      },
    },
  };
  </script>
  <style scoped>
  .custom-input {
    border-radius: 15px; /* Hace que los bordes sean redondos */
    border: 1px solid rgba(0, 0, 0, 0.2); /* Borde más opaco */
    padding: 10px;
    font-color: rgba(0, 0, 0, 0.5); /* Color de texto más opaco */
    /* Agrega otros estilos de diseño según tus preferencias */
  }
  </style>
  