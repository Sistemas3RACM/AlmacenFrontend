import axios from 'axios';
import { API_URL, ENDPOINT_INICIO_SESION } from '../../keys';

export default {
    name: 'Login',
    data() {
        return {
            datos: {
                contraseña: '',
                correo: ''
            },
            usuario: '',
            password: '',
            error: false,
            error_message: '',
        };
    },
    methods: {
        login() {

            const url = `${API_URL}/${ENDPOINT_INICIO_SESION}`;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            axios.post(url, this.datos, config)
                .then(response => {
                    this.$store.dispatch('auth/login');
                    const userId = response.data.idUsuario;
                    const userAdmin = response.data.puesto; // Asumiendo que se recibe el userAdmin desde el servidor

                    this.$store.commit('auth/SET_USER_ID', userId);
                    this.$store.commit('auth/SET_USER_ADMIN', userAdmin); // Guarda userAdmin en el store


                    if (userAdmin == 3) {
                        this.$router.push('/principalProducto');
                    } else {
                        this.$router.push('/dashboard');
                    }

                })
                .catch(() => {
                    this.error_message = 'Credenciales incorrectas...';
                    this.error = true;
                });

        },
    },
};
