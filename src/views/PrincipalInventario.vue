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
                                        <h1 class="h1 m-3 text-center">Inventario</h1>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="card mb-3">
                                            <img src="../assets/repartidor.png" class="card-img-top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title text-center">Ver productos por proveedor</h5>
                                                <div class="d-grid">
                                                    <router-link to="/productosProveedores" class="btn btn-info">
                                                        Ver los Productos
                                                    </router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="card mb-3">
                                            <img src="../assets/subcarpeta.png" class="card-img-top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title text-center">Ver productos por categorías</h5>
                                                <div class="d-grid">
                                                    <router-link to="/productosCategorias" class="btn btn-info">
                                                        Ver los productos
                                                    </router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="card mb-3">
                                            <img src="../assets/almacen.png" class="card-img-top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title text-center">Ver todos los productos</h5>
                                                <div class="d-grid">
                                                    <router-link to="/productosTotales" class="btn btn-info">
                                                        Ver los productos
                                                    </router-link>
                                                </div>
                                            </div>
                                        </div>
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
  
<style scoped>
.boton-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.tarjetas {
    width: 300px;
    height: 400px;

}
</style>
  
<script>
import Nvar from '../components/Nvar';

export default {
    name: 'InicioProveedor',
    components: {
        Nvar,
    },

};
</script>
    