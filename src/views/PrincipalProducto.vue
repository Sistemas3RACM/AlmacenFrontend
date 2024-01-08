<template>
    <section class="container-fluid">
        <div>
            <div class="row">
                <div class="col-2 m-0 p-0 nvar">
                    <Nvar />
                </div>
                <div class="col-10 m-0 p-0">
                    <section class="container-fluid">
                        <div class="row">
                            <div class="mt-5 tablaP">
                                <div class="row">
                                    <div class="col-2 titulo">
                                        <h1 class="h1 m-3">Almacén</h1>
                                    </div>
                                    <div class="col-6 mt-4 titulo">
                                        <button @click="mostrar()" class="btn m-1 btn-warning">
                                            <font-awesome-icon :icon="['fas', 'sync-alt']" />
                                        </button>
                                        <button @click="mostrarFormulario" class="btn m-1 btn-success">
                                            Agregar
                                        </button>
                                    </div>
                                    <div class="col-4 mt-4">
                                        <BusquedaGeneral @busqueda="buscarProducto" />
                                    </div>
                                </div>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th class="d-none d-sm-table-cell">Número de Parte</th>
                                            <th>Cantidad</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="producto in paginated" :key="producto.id">
                                            <td>{{ producto.nombre }}</td>
                                            <td class="d-none d-sm-table-cell">{{ producto.numeroDeSerie }}</td>
                                            <td>{{ producto.cantidad }}</td>
                                            <td>
                                                <button @click="mostrarSalida(producto)" class="btn m-1 btn-secondary"
                                                    v-if="sinPermiso" title="Baja de producto">
                                                    <font-awesome-icon :icon="['fas', 'minus']" />
                                                </button>
                                                <!-- <button @click="eliminarProducto(producto.idProducto)"
                                                    class="btn m-1 btn-danger" v-if="permisos">
                                                    <font-awesome-icon :icon="['fas', 'trash']" />
                                                </button> -->
                                                <button @click="mostrarEdicion(producto)" class="btn m-1 btn-warning">
                                                    <font-awesome-icon :icon="['fas', 'edit']" />
                                                </button>
                                                <button @click="mostrarInformacion(producto)" class="btn m-1 btn-primary">
                                                    <font-awesome-icon :icon="['fas', 'eye']" />
                                                </button>
                                                <button @click="mostrarEntrada(producto)" class="btn m-1 btn-secondary"
                                                    v-if="sinPermiso" title="Alta de producto">
                                                    <font-awesome-icon :icon="['fas', 'plus']" />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- Botones de navegación -->
                                <div class="pagination-buttons boton-container">
                                    <button @click="goToPage(currentPage - 1)" class="btn btn-info"
                                        :disabled="currentPage === 1">Anterior</button>
                                    <button @click="goToPage(currentPage + 1)" class="btn btn-info"
                                        :disabled="currentPage === totalPages">Siguiente</button>
                                </div>
                            </div>
                            <div class="mt-4">
                                <div class="formulario" v-if="formularioVisible">
                                    <FormularioProducto ref="formularioProducto" :campos="camposProducto"
                                        :textoBoton="textoBotonSubcategoria" @formulario-enviado="agregarProducto"
                                        @categoria-cambiada="cargarSubcategorias" :visible="formularioVisible"
                                        @cerrar-formulario="ocultarFormulario" @actualizar-listas="actualizarListas" />
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <!-- Modal de Éxito -->
        <ModalSuccess :message="successMessage" ref="modalSuccess" />

        <!-- Modal de Error -->
        <ModalError :message="errorMessage" ref="modalError" />

        <ModalEntrada :id="id" :objetoEntrada="objetoEditar" @guardar-cambios="editarSubcategoria" ref="modalEntrada" />

        <ModalSalida :id="id" :objetoSalida="objetoEditar" @guardar-cambios="crearSalida" ref="modalSalida" />

        <!-- Modal de Error -->
        <EditarProducto :titulo="TituloEditar" :subcategoriaOptions="subcategoriasDisponibles"
            :proveedoresOptions="proveedoresDisponibles" :categoriaOptions="categoriasDisponibles" :objeto="objetoEditar" :servicioCampo="objetoEditar.servicio"
            :id="id" @categoria-cambiada="cargarSubcategorias" @guardar-cambios="editarSubcategoria" ref="modalEditar" />

        <VerProducto :titulo="TituloVer" :proveedorOptions="proveedoresDisponibles"
            :subcategoriaOptions="subcategoriasDisponibles" :categoriaOptions="categoriasDisponibles" :objeto="objetoEditar"
            :id="id" ref="modalVer" />
    </section>
</template>

<style scoped>
.boton-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.formulario {
    background: white;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    width: 80%;
    /* Ancho del 80% de la pantalla */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    /* Asegura que esté al frente de todo */
}

.tablaP {
    margin-left: 10px;
    margin-right: 40px;
}
@media (max-width: 750px) {
    .nvar{
        width: 100%;
    }
    .titulo{
        size: 50px;
        text-align: center;
        margin: 0px;
        padding: 0px;
        width: 100%;
    }
}
</style>

<script>
import tabla from '../components/tablainformacion.vue';
import Nvar from '../components/Nvar';
import FormularioProducto from '@/components/FormularioProducto.vue';
import ModalSuccess from '@/components/ModalSuccess.vue';
import ModalError from '@/components/ModalError.vue';
import VerProducto from '@/components/VerProducto.vue';
import EditarProducto from '@/components/EditarProducto.vue';
import BusquedaGeneral from '@/components/BusquedaGeneral.vue';
import ModalEntrada from '@/components/ModalEntrada.vue';
import ModalSalida from '@/components/ModalSalida.vue';
import PrincipalProductoScript from './PrincipalProductoScript';

export default {
    ...PrincipalProductoScript,
    components: {
        tabla,
        Nvar,
        FormularioProducto,
        ModalSuccess,
        ModalError,
        EditarProducto,
        VerProducto,
        BusquedaGeneral,
        ModalEntrada,
        ModalSalida,
    },
};
</script>
