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

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json),
            })
                // Dentro de la promesa de la solicitud fetch después de una respuesta exitosa
                .then((response) => {
                    if (response.ok) {

                        // Actualiza la autenticación en el store Vuex
                        this.$store.dispatch('auth/login');

                        // Obtiene el userId después del inicio de sesión exitoso
                        return response.json(); // Parsea la respuesta como JSON
                    } else {
                        // Maneja el caso de respuesta no exitosa
                        this.error = true;
                        this.error_message = 'Error en el inicio de sesión. Verifica tus credenciales.';
                        throw new Error('Error en la respuesta del servidor');
                    }
                })
                .then((data) => {
                    const userId = data.id;
                    const userAdmin = data.userAdmin; // Asumiendo que se recibe el userAdmin desde el servidor

                    this.$store.commit('auth/SET_USER_ID', userId);
                    this.$store.commit('auth/SET_USER_ADMIN', userAdmin); // Guarda userAdmin en el store


                    if (userAdmin == 3) {
                        this.$router.push('/principalProducto');
                    } else {
                        this.$router.push('/dashboard');
                    }

                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        },
    },
};
