<template>
    <div class="principal">
        <div class="col-lg-8 col-sm-6 contenedor">
            <div class="row">
                <div class="col-lg-6 col-sm-6 border-end d-flex justify-content-center align-items-center">
                    <div>
                        <h1 class="text-center">Sistema de almacén</h1>
                        <div class="contenedorImagen">
                            <img src="@/assets/logo3RACM.jpg" alt="Logo" class="imagen">
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-sm-6 ">
                    <h2 class="text-center mb-4">Datos de usuario</h2>
                    <div class="form-outline mb-4">
                        <input type="email" id="form3Example3" class="form-control form-control-lg"
                            placeholder="Ingrese el correo" v-model="datos.correo" />
                    </div>
                    <div class="form-outline mb-3">
                        <input type="password" id="form3Example4" class="form-control form-control-lg"
                            placeholder="Ingrese la contraseña" v-model="datos.contraseña" />
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                        <div class="text-center">
                            <div v-if="error" class="text-danger">{{ error_message }}</div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                        <div class="text-center">
                            <a href="#!" class="text-body">¿Olvidaste la contraseña?</a>
                        </div>
                    </div>
                    <div class="col text-center text-lg-start mt-4 pt-2">
                        <a class="btn btn-lg btn-danger text-white col-12" @click="login">Ingresar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.principal {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(/src/assets/fondo.jpg);
    width: 100%;
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}

.contenedor {
    background-color: #fff;
    border-radius: 10px;
    height: auto;
    padding: 15px;
}

.imagen {
    max-width: 90%;
    max-height: 90%;
    width: auto;
    height: auto;
}
</style>

<script>
import LoginScript from './LoginScript';
export default {
    ...LoginScript,
};
</script>