<template>
    <section class="container-fluid">
        <div>
            <div class="row">
                <div class="col-2 m-0 p-0">
                    <Nvar />
                </div>
                <div class="col m-0 p-0">
                    <section class="container-fluid">
                        <div class="row">
                            <div class="col mt-3 tablaP">
                                <div class="row">
                                    <div class="col-6">
                                        <h1 class="h1 m-3">Reportes</h1>
                                    </div>
                                    <div class="col-2 mt-4" v-show="mostrarRegistros">
                                        <a class="btn btn-secondary" @click="limpiarFiltros">Limpiar filtros</a>
                                    </div>
                                    <div class="col-2 mt-4">
                                        <a class="btn btn-warning" @click="buscarRegistros">Buscar</a>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-3 mb-3">
                                        <label class="row form-label label-left m-2">Seleccione el el tipo:</label>
                                        <select class="form-select" aria-label="Default select example" @change="cambioSalida"
                                            v-model="tipoSeleccionado" >
                                            <option value="">Seleccione un tipo...</option>
                                            <option v-for="tipo in tipos" :key="tipo.valor" :value="tipo.valor">
                                                {{ tipo.etiqueta }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-3 mb-3">
                                        <label class="form-label label-left m-2">Seleccione la fecha inicial:</label>
                                        <div class="tooltip-trigger" @mouseover="showTooltipFI = true"
                                            @mouseleave="showTooltipFI = false">
                                            <span class="tooltip-symbol"> ?</span>
                                        </div>
                                        <div class="tooltip" :class="{ 'show': showTooltipFI }">
                                            <div class="alert alert-primary" role="alert">
                                                Se ingresa desde la fecha que se desee buscar, ejemplo: 01/01/2024
                                                (Buscará
                                                desde el primero de enero del 2024 en adelante).
                                            </div>
                                        </div>
                                        <input type="date" class="form-control" aria-describedby="basic-addon1"
                                            v-model="fechaInicial">
                                    </div>
                                    <div class="col-3 mb-3">
                                        <label class=" form-label label-left m-2">Seleccione la fecha final:</label>
                                        <div class="tooltip-trigger" @mouseover="showTooltipFF = true"
                                            @mouseleave="showTooltipFF = false">
                                            <span class="tooltip-symbol"> ?</span>
                                        </div>
                                        <div class="tooltip" :class="{ 'show': showTooltipFF }">
                                            <div class="alert alert-primary" role="alert">
                                                Si no se ingresa una fecha inicial no se puede ingresar una fecha
                                                limite.
                                            </div>
                                        </div>
                                        <input type="date" class="form-control" aria-describedby="basic-addon1"
                                            v-model="fechaFinal">
                                    </div>

                                    <div class="col-3 mb-3" v-show="!esSalida">
                                        <label class="row form-label label-left m-2">Seleccione una cuenta:</label>
                                        <select class="form-select" aria-label="Default select example"
                                            v-model="cuentaSeleccionada">
                                            <option value="">Seleccione una cuenta...</option>
                                            <option v-for="cuenta in cuentas" :key="cuenta.idCuenta"
                                                :value="cuenta.idCuenta">
                                                {{ cuenta.nombreCuenta }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="col-3 mb-3" v-show="esSalida">
                                        <label class="row form-label label-left m-2">Ingrese la cuenta de salida:</label>
                                        <input type="text" class="form-control" v-model="cuentaEscrita">
                                    </div>

                                </div>
                                <div class="row">
                                    <div>
                                        <ReporteEntrada :registros="registros" ref="ReporteEntrada" />
                                        <ReporteSalida :registros="registros" ref="ReporteSalida" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Nvar from '@/components/Nvar';
import PrincipalReportesScript from './PrincipalReportesScript';
import ReporteEntrada from '@/components/Entrada/ReporteEntrada.vue';
import ReporteSalida from '@/components/Salida/ReporteSalida.vue';

export default {
    ...PrincipalReportesScript,
    components: {
        Nvar,
        ReporteEntrada,
        ReporteSalida,
    },
};
</script>

<style scoped>
.tooltip-trigger {
    position: relative;
    cursor: pointer;
    margin-right: 5px;
    display: inline-block;
}

.tooltip-symbol {
    border-radius: 50%;
    border: 1px solid #5e2828;
    /* Color del borde del círculo */
    width: 20px;
    /* Tamaño del círculo */
    height: 20px;
    /* Tamaño del círculo */
    display: flex;
    justify-content: center;
    vertical-align: middle;
    margin-right: 0.25rem;
    align-items: center;
}

.tooltip {
    display: none;
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    z-index: 999;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.tooltip.show {
    display: block;
}

.tooltip .alert {
    margin-bottom: 10px;
}
</style>