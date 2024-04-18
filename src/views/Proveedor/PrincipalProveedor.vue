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
              <div class="tablaP">
                <div class="row">
                  <div class="col-12 col-md-3 titulo">
                    <h1 class="h1 m-3">Proveedores</h1>
                  </div>
                  <div class="col botonCargar">
                    <a class="btn m-1 btn-primary" @click="abrirAgregarProveedor">Agregar</a>
                    <button @click="mostrar()" class="btn m-1 btn-warning">
                      <font-awesome-icon :icon="['fas', 'sync-alt']" />
                    </button>
                  </div>
                  <div class="col-12 col-md-4 mt-4">
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
            </div>
          </section>
        </div>
      </div>
    </div>
    <FormularioProveedor @recargar-Cambios="mostrar" ref="formularioAgregar" />
    <!-- Modal de Éxito -->
    <ModalSuccess :message="successMessage" ref="modalSuccess" />

    <!-- Modal de Error -->
    <ModalError :message="errorMessage" ref="modalError" />

    <!-- Modal de Error -->
    <EditarProveedor :objeto="objetoEditar" @proveedor-editado="mostrar" ref="modalEditar" />

    <VerProveedor :objeto="objetoEditar" ref="modalVer" />
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
  height: 70vh;
  border-radius: 10px;
  margin-top: 35%;
  width: 100%;
}

.tablaP {
  margin-left: 10px;
  margin-right: 40px;
  margin-top: 10px;
}

.botonCargar {
  margin-top: 20px;
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
    font-size: 45px;
    text-align: center;
    margin: 0;
    padding: 0;
    width: 100%;
  }


}
</style>

<script>
import tabla from '@/components/tablainformacion.vue';
import Nvar from '@/components/Nvar.vue';
import FormularioGeneral from '@/components/FormularioGeneral.vue';
import ModalSuccess from '@/components/ModalSuccess.vue';
import ModalError from '@/components/ModalError.vue';
import EditarProveedor from '@/components/Proveedor/EditarProveedor.vue';
import VerProveedor from '@/components/Proveedor/VerProveedor.vue';
import BusquedaGeneral from '@/components/BusquedaGeneral.vue';
import PrincipalProveedorScript from './PrincipalProveedorScript';
import FormularioProveedor from '@/components/Proveedor/FormularioProveedor.vue';

export default {
  ...PrincipalProveedorScript,
  components: {
    tabla,
    Nvar,
    FormularioGeneral,
    ModalSuccess,
    ModalError,
    VerProveedor,
    BusquedaGeneral,
    FormularioProveedor,
    EditarProveedor,
  },
};
</script>