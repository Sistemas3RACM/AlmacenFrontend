<template>
    <section class="container-fluid">
        <div>
            <div class="row">
                <div class="col-12 col-md-2 m-0 p-0 nvar">
                    <Nvar />
                </div>
                <div class="col-12 col-md-10 m-0 p-0">
                    <section>
                        <div class="row contenidoEnvuelto">
                            <div class="contenidoPrincipal">
                                <div class="row">
                                    <div class="col-12 col-lg-2 titulo">
                                        <h1 class="h1">Almacén</h1>
                                    </div>
                                    <div class="col botonCargar">
                                        <button @click="mostrar()" class="btn m-1 btn-warning">
                                            <font-awesome-icon :icon="['fas', 'sync-alt']" />
                                        </button>
                                        <button @click="abrirAgregarProducto()" class="btn m-1 btn-primary">
                                            Agregar
                                        </button>
                                    </div>
                                    <div class="col-12 col-lg-4 mt-4 buscador input-container">
                                        <BusquedaGeneral @busqueda="buscarProducto" />
                                    </div>
                                </div>
                                <div class="row m-2 categorias">
                                    <a class="col-6 btn btn-success" @click="cambiarProductoServicio">Productos</a>
                                    <a class="col-6 btn btn-secondary" @click="cambiarProductoServicio">Servicios</a>
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
                                        <tr v-for="producto in paginated" :key="producto.idProducto">
                                            <td>{{ producto.nombre }}</td>
                                            <td class="d-none d-sm-table-cell">{{ producto.numeroDeSerie }}</td>
                                            <td>{{ producto.cantidad }}</td>
                                            <td>
                                                <button @click="abrirSalida(producto.idProducto)"
                                                    class="btn m-1 btn-secondary" v-if="permisos != 3"
                                                    title="Baja de producto">
                                                    <font-awesome-icon :icon="['fas', 'minus']" />
                                                </button>
                                                <button @click="mostrarEdicion(producto.idProducto)"
                                                    class="btn m-1 btn-warning">
                                                    <font-awesome-icon :icon="['fas', 'edit']" />
                                                </button>
                                                <button @click="mostrarInformacion(producto.idProducto)"
                                                    class="btn m-1 btn-primary">
                                                    <font-awesome-icon :icon="['fas', 'eye']" />
                                                </button>
                                                <button @click="abrirEntrada(producto.idProducto)"
                                                    class="btn m-1 btn-secondary" v-if="permisos != 3"
                                                    title="Alta de producto">
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
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </section>
    <ModalError :message="errorMessage" ref="modalError" />
    <ModalSuccess :message="successMessage" ref="modalSuccess" />
    <FormularioProducto :objeto="producto" @formulario-enviado="agregarProducto" ref="agregarProducto" />
    <EditarProducto :objeto="producto" @formulario-enviado="editarProducto" ref="editarProducto" />
    <VerProducto :objeto="producto" ref="verProducto" />
    <ModalEntrada :objetoEntrada="producto" @recargar-pagina="mostrar" ref="EntradaProducto" />
    <ModalSalida :objetoSalida="producto" @recargar-pagina="mostrar" ref="SalidaProducto" />

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

.contenidoPrincipal {
    margin: 10px;
    margin-top: 50px;
}

.botonCargar {
    margin-top: 15px;
    margin-left: 25px;
}

.tablaP {
    margin-left: 10px;
    margin-right: 40px;
}

@media (max-width: 750px) {
    .nvar {
        width: 100%;
    }

    .contenidoPrincipal {
        margin: 0px;
    }
    .contenidoPrincipal .titulo{
        margin: 0;
        padding: 0;
    }

    .contenidoPrincipal .titulo h1 {
        font-size: 50px;
        text-align: center;
        margin: 0;
        padding: 0;
        width: 100%;
    }

    .contenidoPrincipal .buscador {
        margin: 0
    }

    .input-container {
        display: flex;
        justify-content: center;
    }

    .botonCargar {
        margin-top: 5px;
        display: flex;
        justify-content: center;

    }

    .categorias {
        margin: 0;
        display: flex;
        justify-content: center;
    }

    .table {
        width: 100%;
        margin: 0;
    }

    .tablaP {
        margin: 0;
    }
    .contenidoEnvuelto{
        margin: 0;
        margin-bottom: 20px;
        padding: 0;
    }

}
</style>

<script>
import tabla from '../../components/tablainformacion.vue';
import Nvar from '../../components/Nvar';
import FormularioProducto from '@/components/Producto/FormularioProducto.vue';
import ModalSuccess from '@/components/ModalSuccess.vue';
import ModalError from '@/components/ModalError.vue';
import VerProducto from '@/components/Producto/VerProducto.vue';
import EditarProducto from '@/components/Producto/EditarProducto.vue';
import BusquedaGeneral from '@/components/BusquedaGeneral.vue';
import ModalEntrada from '@/components/Entrada/ModalEntrada.vue';
import ModalSalida from '@/components/Salida/ModalSalida.vue';
import PrincipalProducto from './PrincipalProducto';

export default {
    ...PrincipalProducto,
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
