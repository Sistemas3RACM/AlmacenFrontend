<template>
  <section class="container-fluid">
    <div>
      <div class="row">
        <div class="col-2 m-0 p-0">
          <Nvar />
        </div>
        <div class="col-10 m-0 p-0">
          <section class="container-fluid">
            <div class="row">
              <div class="col-7 mt-5 tablaP">
                <div class="row">
                  <div class="col-6">
                    <h1 class="h1 m-3">Proveedores</h1>
                  </div>
                  <div class="col-2 mt-4">
                    <button @click="mostrar()" class="btn m-1 btn-warning">
                      <font-awesome-icon :icon="['fas', 'sync-alt']" />
                    </button>
                  </div>
                  <div class="col-4 mt-4">
                    <BusquedaGeneral @busqueda="buscarProveedor" />
                  </div>
                </div>
                <tabla v-if="paginatedProveedores" :type="type" :data="paginatedProveedores" :fields="['nombre']"
                  :eliminar="eliminar">
                  <template #default="{ item }">
                    <button @click="eliminarProveedor(item.idProveedor)" class="btn m-1 btn-danger" v-if="permisos">
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
                  <h3>Agregar Proveedor</h3>
                  <!-- Utiliza el formulario para agregar proveedores -->
                  <FormularioGeneral ref="formularioGeneral" :campos="camposProveedor" :textoBoton="textoBotonProveedor"
                    @formulario-enviado="agregarProveedor" />
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
      @guardar-cambios="editarProveedor" ref="modalEditar" />

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
  height: 52vh;
  border-radius: 10px;
  margin-top: 18%;
  width: 100%;
}

.tablaP {
  margin-left: 10px;
  margin-right: 40px;
}
</style>

<script>
import tabla from '../components/tablainformacion.vue';
import Nvar from '../components/Nvar';
import FormularioGeneral from '@/components/FormularioGeneral.vue';
import ModalSuccess from '@/components/ModalSuccess.vue';
import ModalError from '@/components/ModalError.vue';
import ModalEditar from '@/components/ModalEditar.vue';
import ModalInformacion from '@/components/ModalInformacion.vue';
import BusquedaGeneral from '@/components/BusquedaGeneral.vue';
import PrincipalProveedorScript from './PrincipalProveedorScript';

export default {
  ...PrincipalProveedorScript,
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
  