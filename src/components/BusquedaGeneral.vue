<template>
  <div class="input-container">
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
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
  font-color: rgba(0, 0, 0, 0.5);

}

@media (max-width: 750px) {
  .custom-input {
    width: 100%;
    margin: 0px;
  }

}
</style>