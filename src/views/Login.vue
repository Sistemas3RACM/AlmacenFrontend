

<template>
    <section class="vh-100">
        <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-4">
                    <img src="@/assets/logo3RACM.jpg" class="img-fluid" alt="3Racm" />
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form v-on:submit.prevent="login">
                        <h1 class="mb-3">Datos de Ingreso</h1>
                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <input type="email" id="form3Example3" class="form-control form-control-lg"
                                placeholder="Ingrese el correo" v-model="usuario" />
                        </div>

                        <!-- Password input -->
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

@media (max-width: 450px) {
    .h-custom {
        height: 100%;
    }
}

.bg-custom {
    background-color: #F02B2B;

}

img {
    width: 250px;
    height: 100px;
    margin-bottom: 70px;
}

/* Evitar que el botón cambie de color al pasar el puntero sobre él */
.btn:hover {
    background-color: #D92828;
    color: #fff;
}
</style>

<script>
import { API_URL, ENDPOINT_INICIO_SESION } from '../keys';

export default {
    name: 'Login',
    data() {
        return {
            usuario: '',
            password: '',
            error: false,
            error_message: '',
        };
    },
    methods: {
        login() {
            let json = {
                correo: this.usuario,
                contraseña: this.password,
            };

            const url = `${API_URL}/${ENDPOINT_INICIO_SESION}`;

            console.log(url);

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('Respuesta exitosa');
                        // Actualiza la autenticación en el store Vuex antes de redirigir
                        this.$store
                            .dispatch('auth/login')
                            .then(() => {
                                // Ahora que la autenticación se ha actualizado, redirige al usuario
                                this.$router.push('/dashboard');
                            })
                            .catch((error) => {
                                console.error('Error al actualizar la autenticación:', error);
                            });
                    } else {
                        // Manejar el caso de respuesta no exitosa aquí
                        console.log('Respuesta no exitosa');
                        this.error = true;
                        this.error_message = 'Error en el inicio de sesión. Verifica tus credenciales.';
                    }
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        },
    },
};
</script>