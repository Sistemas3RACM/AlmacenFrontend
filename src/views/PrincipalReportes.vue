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
                                        <h1 class="h1 m-3">Reportes</h1>
                                    </div>
                                </div>
                                <div class="col-4 mt-4">
                                    <!-- Modifica la propiedad mode a 'single' -->
                                    <div class="row">
                                        <div class="col-6">
                                            <button type="button" @click="redirigirAEntradas"
                                                class="btn btn-success">Entradas</button>
                                        </div>
                                        <div class="col-6">
                                            <button type="button" @click="redirigirASalidas"
                                                class="btn btn-danger">Salidas</button>
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
  
<script>
import Nvar from '../components/Nvar';


export default {
    components: {
        Nvar,

    },
    data() {
        return {
        };
    },
    methods: {
        // The `redirigirAEntradas()` and `redirigirASalidas()` methods are used to redirect the user to
        // different routes within the Vue application.
        redirigirAEntradas() {
            this.$router.push({ name: 'reporteEntradas' });
        },
        redirigirASalidas() {
            this.$router.push({ name: 'reporteSalidas' });
        },
    },
};
</script>
  