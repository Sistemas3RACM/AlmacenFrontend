<template>
    <div class="contenedor">
        <div class="col-md-12" v-if="conCategoria">
            <div class="contador">
                <h1>Dinero dentro de {{ nombreCategoria }}:</h1>
                <div class="numero">$ {{ total }}</div>
            </div>
        </div>
        <div class="col-md-12" v-if="!conCategoria">
            <div class="contador">
                <h3>Ninguna categoría seleccionada</h3>
            </div>
        </div>
    </div>
</template>
<script>
import DineroPorCategoriaScript from './DineroPorCategoriaScript';
export default {
    ...DineroPorCategoriaScript,

};
</script>
<style scoped>
.contenedor {
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.boton-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.contador {
    width: 100%;

    background-color: rgb(33, 12, 109);
    color: #fff;
    text-align: center;
    border-radius: 10px;

}

.contador .numero {
    font-size: 50px;
    font-weight: bold;
}
</style>