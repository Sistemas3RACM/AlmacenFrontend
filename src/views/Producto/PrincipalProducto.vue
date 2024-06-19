<template>
    <section class="container-fluid">
        <div>
            <div class="row">
                <Nvar />
            </div>
            <div class="row ">
                <div class="col-md-12" v-if="show">
                    <div class="row">
                        <div class="row m-2 align-items-center">
                            <div class="col-md-5">
                                <h1 class="titulo-seccion" v-if="enProductos">Productos</h1>
                                <h1 class="titulo-seccion" v-if="!enProductos">Servicios</h1>
                            </div>
                            <div class="col-md-7 d-flex justify-content-end">
                                <a class="btn btn-servicios btn-anchura" @click="cambioServicio"
                                    v-if="enProductos">Servicios</a>
                                <a class="btn btn-servicios btn-anchura" @click="cambioServicio"
                                    v-if="!enProductos">Productos</a>
                                <button v-if="!showInput" class="btn btn-secondary btn-anchura"
                                    @click="toggleSearchInput">
                                    <font-awesome-icon :icon="['fas', 'search']" />
                                </button>
                                <!-- Input de búsqueda -->
                                <input v-model="searchTerm" v-if="showInput" type="text" class="form-control"
                                    placeholder="Buscar por producto..." @input="buscar(searchTerm)">
                                <button v-if="showInput" class="btn btn-danger m-1"
                                    @click="toggleSearchInput">Cancelar</button>

                                <a class="btn btn-mas" @click="abrirAgregar">+</a>

                            </div>
                        </div>

                        <hr>
                        <div class="col-md-12" v-if="productos.length > 0">
                            <table class="table table-striped justify-content-center text-center">
                                <thead>
                                    <tr class="table-active">
                                        <th>Número de serie</th>
                                        <th>Nombre</th>
                                        <th>Cantidad</th>
                                        <th>Unidad de medida</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="producto in paginated" :key="producto.idProducto">
                                        <td>{{ producto.numeroDeSerie }}</td>
                                        <td>{{ producto.nombre }}</td>
                                        <td>{{ producto.cantidad }}</td>
                                        <td>{{ producto.unidadMedida }}</td>
                                        <td class="button-container">
                                            <button @click="abrirModalEntrada(producto)"
                                                class="btn btn-success btn-redondo" v-if="permisosAdmin != 3">
                                                +
                                            </button>

                                            <button @click="abrirModalEdicion(producto)"
                                                class="btn btn-warning btn-redondo" v-if="permisosAdmin != 3">
                                                <font-awesome-icon :icon="['fas', 'edit']" />
                                            </button>
                                            <button @click="abrirModalInformacion(producto.idProducto)"
                                                class="btn btn-primary btn-redondo">
                                                <font-awesome-icon :icon="['fas', 'eye']" />
                                            </button>
                                            <button @click="eliminar(producto)" class="btn btn-danger btn-redondo"
                                                v-if="permisosAdmin != 3">
                                                <font-awesome-icon :icon="['fas', 'trash']" />
                                            </button>

                                            <button @click="abrirModalSalida(producto)"
                                                class="btn btn-secondary btn-redondo" v-if="permisosAdmin != 3">
                                                -
                                            </button>


                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- Botones de navegación -->
                            <div class="pagination-buttons boton-container">
                                <button @click="goToPage(currentPage - 1)" class="btn btn-secondary"
                                    :disabled="currentPage === 1">&lt;</button>
                                <button @click="goToPage(currentPage + 1)" class="btn btn-secondary"
                                    :disabled="currentPage === totalPages">&gt;</button>
                            </div>
                        </div>
                        <div class="col-md-9" v-else>
                            <h1 class="text-center">No hay ningún producto registrado.</h1>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <VerProducto @regresar-listado="mostrar" ref="Informacion" />
    <EditarProducto @regresar-listado="mostrar" @editar-producto="editar" ref="Editar" />
    <ModalEntrada @crear-entrada="editar" ref="Entrada" />
    <FormularioProducto @regresar-listado="mostrar" @guardar-producto="guardar" ref="Agregar" />
    <ModalSalida @recargar-cambios="mostrar" ref="Salida" />


</template>

<style scoped>
.btn-mas {
    background-color: #28A745;
    /* Color de fondo */
    color: white;
    /* Color del texto */
}

/* Elimina el margen derecho del último botón */
.col-md-7 .btn:last-child {
    margin-right: 0;
}

.titulo-seccion {
    font-size: 3.4rem;
    /* Puedes ajustar el tamaño según prefieras */
    margin: 1.2rem;
}

.boton-container {
    display: flex;
    justify-content: center;
    gap: 10px;
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

thead tr {
    font-size: 1.1rem;
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

.btn-anchura {
    width: 400px;
}

/* Botón de Pendientes */
.btn-servicios {
    background-color: #bf9f3f;
    /* Color de fondo */
    color: rgb(255, 255, 255);
    /* Color del texto */
}
</style>

<script>
import Nvar from '@/components/Nvar.vue';
import PrincipalProducto from './PrincipalProducto.js';
import VerProducto from '@/components/Producto/VerProducto.vue';
import EditarProducto from '@/components/Producto/EditarProducto.vue';
import ModalEntrada from '@/components/Entrada/ModalEntrada.vue';
import ModalSalida from '@/components/Salida/ModalSalida.vue';
import FormularioProducto from '@/components/Producto/FormularioProducto.vue';

export default {
    ...PrincipalProducto,
    components: {
        Nvar,
        VerProducto,
        EditarProducto,
        ModalEntrada,
        FormularioProducto,
        ModalSalida,
    }
};
</script>