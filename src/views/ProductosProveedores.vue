<template>
    <section class="container-fluid">
        <div>
            <div class="row">
                <div class="col-2 m-0 p-0" v-flex="fill">
                    <Nvar />
                </div>
                <div class="col-10 m-0 p-0">
                    <section class="container-fluid">
                        <div class="row">
                            <div class="mt-5">
                                <div class="row">
                                    <div class="">
                                        <h1 class="h1 m-3">Inventario</h1>
                                    </div>
                                </div>
                                <div class="row">

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
import Nvar from '../components/Nvar';
import {
  API_URL, ENDPOINT_LISTAR_PROVEEDORES, ENDPOINT_BUSCAR_PROVEEDOR
} from '../keys';

export default {
    name: 'InicioProveedor',
    components: {
        Nvar,
    },

};
</script>
  
<style scoped>
/* Estilos del componente aquí */
</style>
  