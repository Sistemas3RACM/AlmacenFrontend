<template>
    <section class="container-fluid">
        <div>
            <div class="row">
                <div class="col-12 col-md-2 m-0 p-0">
                    <Nvar />
                </div>
                <div class="col-12 col-md-10 m-0 p-0">
                    <section class="container-fluid">
                        <div class="row contenidoEnvuelto">
                            <div class="col-12 col-md-7 tablaP">
                                <div class="row">
                                    <div class="col-12 col-md-6 titulo">
                                        <h1 class="h1 m-3">Categorías</h1>
                                    </div>
                                    <div class="col-2 mt-4">
                                        <button @click="mostrar()" class="btn m-1 btn-warning">
                                            <font-awesome-icon :icon="['fas', 'sync-alt']" />
                                        </button>
                                    </div>
                                    <div class="col-4 mt-4">
                                        <BusquedaGeneral @busqueda="buscarCategoria" />
                                    </div>
                                </div>
                                <tabla v-if="paginated" :type="type" :data="paginated" :fields="['nombre', 'nomenclatura']"
                                    :eliminar="eliminar">
                                    <template #default="{ item }">
                                        <button @click="eliminarCategoria(item.idCategoria)" class="btn m-1 btn-danger"
                                            v-if="permisos">
                                            <font-awesome-icon :icon="['fas', 'trash']" />
                                        </button>
                                        <button @click="mostrarEdicion(item)" class="btn m-1 btn-warning">
                                            <font-awesome-icon :icon="['fas', 'edit']" />
                                        </button>
                                        <button @click="mostrarInformacion(item)" class="btn m-1 btn-primary">
                                            <font-awesome-icon :icon="['fas', 'eye']" />
                                        </button>
                                    </template>
                                </tabla>
                                <!-- <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Nomanclatura</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="categoria in paginated" :key="categoria.idCategoria">
                                            <td>{{ categoria.nombre }}</td>
                                            <td>{{ categoria.nomenclatura }}</td>
                                            <td>
                                                <button @click="eliminarCategoria(categoria.idCategoria)" class="btn m-1 btn-danger"
                                            v-if="permisos">
                                            <font-awesome-icon :icon="['fas', 'trash']" />
                                        </button>
                                        <button @click="mostrarEdicion(categoria)" class="btn m-1 btn-warning">
                                            <font-awesome-icon :icon="['fas', 'edit']" />
                                        </button>
                                        <button @click="mostrarInformacion(categoria)" class="btn m-1 btn-primary">
                                            <font-awesome-icon :icon="['fas', 'eye']" />
                                        </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> -->
                                <!-- Botones de navegación -->
                                <div class="pagination-buttons boton-container">
                                    <button @click="goToPage(currentPage - 1)" class="btn btn-info"
                                        :disabled="currentPage === 1">Anterior</button>
                                    <button @click="goToPage(currentPage + 1)" class="btn btn-info"
                                        :disabled="currentPage === totalPages">Siguiente</button>
                                </div>
                            </div>
                            <div class="col-4 mt-4">
                                <div class="formulario">
                                    <h3>Agregar Categoría</h3>

                                    <FormularioGeneral ref="formularioGeneral" :campos="camposCategoria"
                                        :textoBoton="textoBotonCategoria" @formulario-enviado="agregarCategoria" />
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

        <!-- Modal de Error -->
        <ModalEditar :titulo="TituloEditar" :camposMostrados="camposMostrados" :objeto="objetoEditar" :id="id"
            @guardar-cambios="editarCategoria" ref="modalEditar" />
        <!-- Modal de Informacion -->
        <ModalInformacion :titulo="TituloVer" :objeto="objetoEditar" :id="id" ref="modalVer" />
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
    height: 35vh;
    border-radius: 10px;
    margin-top: 50%;
    width: 100%;
}

.tablaP {
    margin-left: 10px;
    margin-right: 40px;
}
@media (max-width: 750px) {
  .container-fluid {
    margin: 0;
  }

  .contenidoEnvuelto {
    margin: 0;
    margin-bottom: 20px;
    padding: 0;
  }

  .tablaP {
    margin: 0
  }

  .botonCargar {
    margin-top: 5px;
    display: flex;
    justify-content: center;

  }

  .titulo h1 {
    font-size: 35px;
    text-align: center;
    margin: 0;
    padding: 0;
    width: 100%;
  }


}

</style>

<script>
import tabla from '../../components/tablainformacion.vue';
import Nvar from '../../components/Nvar';
import FormularioGeneral from '@/components/FormularioGeneral.vue';
import ModalSuccess from '@/components/ModalSuccess.vue';
import ModalError from '@/components/ModalError.vue';
import ModalEditar from '@/components/ModalEditar.vue';
import ModalInformacion from '@/components/ModalInformacion.vue';
import BusquedaGeneral from '@/components/BusquedaGeneral.vue';
import PrincipalCategoriasScript from '@/views/CategoriaSubcategoria/PrincipalCategoriasScript';

export default {
    ...PrincipalCategoriasScript,
    components: {
        tabla,
        Nvar,
        FormularioGeneral,
        ModalSuccess,
        ModalError,
        ModalEditar,
        ModalInformacion,
        BusquedaGeneral,
    },
};
</script>
