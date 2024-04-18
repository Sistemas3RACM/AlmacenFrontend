<template>
    <div class="contenedor">
        <div class="col-md-12" v-show="cuentaSeleccionada">
            <div class="contador">
                <h1>Productos en {{ nombreCuenta }}</h1>
                <div class="numero">{{ total }} Productos</div>
            </div>
        </div>
        <div class="col-md-12" v-show="!cuentaSeleccionada">
            <div class="contador">
                <h4 class="titulo">Seleccione una cuenta.</h4>
            </div>
        </div>
    </div>
</template>
<script>
import ProductosTotalesScript from './ProductosTotalesScript';

export default {
    ...ProductosTotalesScript,
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
    font-size: 45px;
    font-weight: bold;
}

@media (max-width: 750px) {
    .contador .numero {
        font-size: 30px;
    }
}
</style>