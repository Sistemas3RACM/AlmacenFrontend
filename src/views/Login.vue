

<template>
    <section class="vh-100">
        <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-4">
                    <h1 class="m-3 tituloNombre">Sistema de almacén</h1>
                    <img src="@/assets/logo3RACM.jpg" class="img-fluid" alt="3Racm" />
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1 contenedorPrincipal">
                    <form v-on:submit.prevent="login">
                        <h1 class="mb-3">Datos de Ingreso</h1>
                        <div class="form-outline mb-4">
                            <input type="email" id="form3Example3" class="form-control form-control-lg"
                                placeholder="Ingrese el correo" v-model="usuario" />
                        </div>

                        <div class="form-outline mb-3">
                            <input type="password" id="form3Example4" class="form-control form-control-lg"
                                placeholder="Ingrese la contraseña" v-model="password" />
                        </div>

                        <div class="d-flex justify-content-between align-items-center">
                            <a href="#!" class="text-body">¿Olvidaste la contraseña?</a>
                        </div>

                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button type="submit" class="btn bg-custom  btn-lg text-white"
                                style="padding-left: 2.5rem; padding-right: 2.5rem;">Ingresar</button>
                            <div v-if="error" class="text-danger">{{ error_message }}</div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        <div
            class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-custom">
            <!-- Copyright -->
            <div class="text-white mb-3 mb-md-0">
                Copyright © 2023. Todos los derechos reservados.
            </div>
            <!-- Copyright -->

        </div>
    </section>
</template>


<style scoped>
.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #fff;
}

.h-custom {
    height: calc(100% - 73px);
}

.bg-custom {
    background-color: #F02B2B;

}

img {
    width: 250px;
    height: 100px;
    margin-bottom: 70px;
}

.btn:hover {
    background-color: #D92828;
    color: #fff;
}

@media (max-width: 767px) {
    img {
        width: 100%;
        max-width: 250px;
        margin: 0 auto;
        display: block;
    }

    .tituloNombre {
        margin: 0px;
        padding: 0px;
        text-align: center;
    }

    .contenedorPrincipal {
        margin: 0px;
        padding: 0;
        text-align: center;
        justify-content: center;
    }

    .h-custom {
        height: 70%;
    }
}
</style>

<script>
import LoginScript from './LoginScript';
export default {
    ...LoginScript,
};
</script>