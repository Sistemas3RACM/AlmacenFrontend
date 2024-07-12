<template>
    <section class="container-fluid">
        <div>
            <div class="row">
                <Nvar />
            </div>
            <div class="row m-4" v-if="show">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-12 ">
                            <h1 class="titulo-seccion ">Reportes</h1>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="col-12 mb-2">
                                    <label class="form-label label-left mr-1 etiqueta">Busqueda de:</label>
                                    <select class="form-select" aria-label="Default select example"
                                        v-model="tipoSeleccionado">
                                        <option value="">Seleccione un tipo de busqueda...</option>
                                        <option v-for="tipo in tipos" :key="tipo.valor" :value="tipo.valor">
                                            {{ tipo.etiqueta }}
                                        </option>
                                    </select>
                                </div>
                                <!-- BUSQUEDA POR ENTRADA -->
                                <div v-if="tipoSeleccionado == 1">

                                    <div class="col-12 mb-2">
                                        <label class="form-label label-left mr-1 etiqueta">Proveedor:</label>
                                        <select class="form-select" aria-label="Default select example"
                                            v-model="proveedorSeleccionado">
                                            <option value="">Seleccione un proveedor...</option>
                                            <option v-for="proveedor in proveedores" :key="proveedor.idProveedor"
                                                :value="proveedor.idProveedor">
                                                {{ proveedor.nombre }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="col-12 mb-2">
                                        <label class="form-label label-left mr-1 etiqueta">Fecha Inicial:</label>
                                        <input type="date" class="form-control" v-model="fechaInicial">
                                    </div>

                                    <div class="col-12 mb-2">
                                        <label class="form-label label-left mr-1 etiqueta">Fecha Final:</label>
                                        <input type="date" class="form-control" v-model="fechaFinal">
                                    </div>


                                </div>

                                <!-- BUSQUEDA POR SALIDA -->
                                <div v-if="tipoSeleccionado == 2">

                                    <div class="col-12 mb-2">
                                        <label class="form-label label-left mr-1 etiqueta">Solicitante:</label>
                                        <select class="form-select" aria-label="Default select example"
                                            v-model="selectedSolicitante">
                                            <option value="">Seleccione una solicitante...</option>
                                            <option v-for="solicitante in solicitantes" :key="solicitante.idUsuario"
                                                :value="solicitante">
                                                {{ solicitante.correo }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="col-12 mb-2">
                                        <label class="form-label label-left mr-1 etiqueta">Fecha Inicial:</label>
                                        <input type="date" class="form-control" v-model="fechaInicial">
                                    </div>

                                    <div class="col-12 mb-2">
                                        <label class="form-label label-left mr-1 etiqueta">Fecha Final:</label>
                                        <input type="date" class="form-control" v-model="fechaFinal">
                                    </div>


                                    <div class="col-12 mb-2">
                                        <label class="form-label label-left mr-1 etiqueta">Cuenta:</label>
                                        <input type="text" class="form-control" v-model="cuentaProyecto">
                                    </div>

                                    <div class="col-12 mb-2">
                                        <label class="form-label label-left mr-1 etiqueta">Número de serie:</label>
                                        <input type="text" class="form-control" v-model="numSerie">
                                    </div>


                                </div>

                                <!-- BUSQUEDA POR PRODUCTOS -->
                                <div v-if="tipoSeleccionado == 3">
                                    <div class="col-12 mb-2">
                                        <label class="form-label label-left mr-1 etiqueta">Número de serie:</label>
                                        <input type="text" class="form-control" v-model="numSerie">
                                    </div>

                                    <div class="col-12 mb-2">
                                        <label class="form-label label-left mr-1 etiqueta">Categoría:</label>
                                        <select class="form-select" aria-label="Default select example"
                                            v-model="categoriaSeleccionada" @change="listarSubcategorias">
                                            <option value="">Seleccione una categoría...</option>
                                            <option v-for="categoria in categorias" :key="categoria.idCategoria"
                                                :value="categoria.idCategoria">
                                                {{ categoria.nombre }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="col-12 mb-2">
                                        <label class="form-label label-left mr-1 etiqueta">Subcategoría:</label>
                                        <select class="form-select" aria-label="Default select example"
                                            v-model="subcategoriaSeleccionada">
                                            <option value="">Seleccione una subcategoría...</option>
                                            <option v-for="subcategoria in subcategorias"
                                                :key="subcategoria.idSubcategoria" :value="subcategoria.idSubcategoria">
                                                {{ subcategoria.nombre }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="col-12 mb-2">
                                        <label class="form-label label-left mr-1 etiqueta">Tipo:</label>
                                        <select class="form-select" aria-label="Default select example"
                                            v-model="servicioSeleccionado">
                                            <option value="">Seleccione un tipo de busqueda...</option>
                                            <option v-for="servicio in servicios" :key="servicio.valor"
                                                :value="servicio.valor">
                                                {{ servicio.etiqueta }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="col-12 mb-2">
                                        <label class="form-label label-left mr-1 etiqueta">Proveedor:</label>
                                        <select class="form-select" aria-label="Default select example"
                                            v-model="proveedorSeleccionado">
                                            <option value="">Seleccione un proveedor...</option>
                                            <option v-for="proveedor in proveedores" :key="proveedor.idProveedor"
                                                :value="proveedor.idProveedor">
                                                {{ proveedor.nombre }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="col-12 mb-2">
                                        <label class="form-label label-left mr-1 etiqueta">Cuenta:</label>
                                        <select class="form-select" aria-label="Default select example"
                                            v-model="cuentaSeleccionada">
                                            <option value="">Seleccione una cuenta...</option>
                                            <option v-for="cuenta in cuentas" :key="cuenta.idCuenta"
                                                :value="cuenta.idCuenta">
                                                {{ cuenta.NombreCuenta }}
                                            </option>
                                        </select>
                                    </div>


                                </div>

                                <div class="col-md-12 mb-3">
                                    <div class="row justify-content-center">
                                        <div class="col-md-12 bg-white p-3 d-flex justify-content-center">
                                            <a @click="cambioBusqueda" class="btn btn-buscar"
                                                v-if="registros.length <= 0">Buscar</a>
                                            <a @click="limpiarFiltros" class="btn btn-cerrar"
                                                v-if="registros.length > 0">Limpiar filtros</a>
                                            <!-- <a @click="generarExcel" class="btn btn-revisar"
                                                v-if="registros.length > 0">Generar
                                                excel</a> -->
                                        </div>
                                    </div>

                                </div>


                            </div>
                            <div class="col-md-9">
                                <div v-show="modoProducto">
                                    <TablaProductos ref="TablaProductos" />
                                </div>
                                <div v-show="modoSalida">
                                    <TablaSalidas ref="TablaSalidas" />
                                </div>
                                <div v-show="modoEntrada">
                                    <TablaEntradas ref="TablaEntradas" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<style scoped>
.boton-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.titulo-seccion {
    font-size: 3.4rem;
    /* Puedes ajustar el tamaño según prefieras */
    margin: 1.2rem;
}

.btn-redondo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    /* Espacio entre botones */
}

.btn {
    border-radius: 0;
    /* Esquinas en punta */
    margin-right: 27px;
    /* Separación de 27px */
    padding: 10px 20px;
    /* Espaciado interno del botón */
    text-align: center;
    /* Alineación del texto */
    display: inline-block;
    /* Asegura que los botones estén en línea */
    text-decoration: none;
    /* Elimina el subrayado de los enlaces */
    font-weight: bold;
    /* Texto en negritas */
    cursor: pointer;
    /* Cursor en forma de mano */
    font-size: 1rem
}

.etiqueta {
    font-weight: bold;
}

.btn-cerrar {
    background-color: #bf473a;
    /* Color de fondo del botón */
    color: white;
    /* Color del texto */
    padding: 15px 30px;
    /* Tamaño del botón */
    font-size: 1.5rem;
    /* Tamaño del texto */
    border: none;
    /* Sin bordes adicionales */
    border-radius: 0;
    /* Esquinas cuadradas */
    text-decoration: none;
    /* Sin subrayado */
    display: inline-block;
    /* Para que el enlace se comporte como un botón */
    text-align: center;
    /* Centrar el texto */
    cursor: pointer;
    /* Cambiar el cursor al pasar por encima */
}

.btn-revisar {
    background-color: #3ABF52;
    /* Color de fondo del botón */
    color: white;
    /* Color del texto */
    padding: 15px 30px;
    /* Tamaño del botón */
    font-size: 1.5rem;
    /* Tamaño del texto */
    border: none;
    /* Sin bordes adicionales */
    border-radius: 0;
    /* Esquinas cuadradas */
    text-decoration: none;
    /* Sin subrayado */
    display: inline-block;
    /* Para que el enlace se comporte como un botón */
    text-align: center;
    /* Centrar el texto */
    cursor: pointer;
    /* Cambiar el cursor al pasar por encima */
}

.btn-buscar {
    background-color: #3a71bf;
    /* Color de fondo del botón */
    color: white;
    /* Color del texto */
    padding: 15px 30px;
    /* Tamaño del botón */
    font-size: 1.5rem;
    /* Tamaño del texto */
    border: none;
    /* Sin bordes adicionales */
    border-radius: 0;
    /* Esquinas cuadradas */
    text-decoration: none;
    /* Sin subrayado */
    display: inline-block;
    /* Para que el enlace se comporte como un botón */
    text-align: center;
    /* Centrar el texto */
    cursor: pointer;
    /* Cambiar el cursor al pasar por encima */
}
</style>

<script>
import Nvar from '@/components/Nvar.vue';
import PrincipalReportesScript from './PrincipalReportesScript';
import TablaProductos from '@/components/Reportes/TablaProductos.vue';
import TablaSalidas from '@/components/Reportes/TablaSalidas.vue';
import TablaEntradas from '@/components/Reportes/TablaEntradas.vue';

export default {
    ...PrincipalReportesScript,
    components: {
        Nvar,
        TablaProductos,
        TablaSalidas,
        TablaEntradas,
    }
};
</script>