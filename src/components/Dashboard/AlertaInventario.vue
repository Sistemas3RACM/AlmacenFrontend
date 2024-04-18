<template>
    <div :class="{ 'contador-dias': true, 'rojo': diasRestantes < 15 }">
        <h3>Próximo Inventario:</h3>
        <p>Última Fecha: {{ ultimaFecha }}</p>
        <p>Próxima Fecha: {{ proximaFecha }}</p>
        <h4>Días restantes: {{ diasRestantes }}</h4>
        <div>
            <button type="button" @click="añadirFecha" class="btn btn-success">Registrar Inventario</button>
        </div>
    </div>
</template>
  
<script>
import AlertaInventarioScript from './AlertaInventarioScript';
export default {
    ...AlertaInventarioScript,
};
</script>
  
<style scoped>
.contador-dias {
    text-align: center;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.rojo {
    background-color: red;
    color: white;
}
</style>