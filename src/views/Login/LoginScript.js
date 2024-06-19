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
            error: false,
            error_message: '',
        };
    },
    methods: {

        async login() {
            const url = `${API_URL}/${ENDPOINT_INICIO_SESION}`;

            try {
                const response = await axios.post(url, this.datos);

                const data = response.data;

                if (data.objetoEnviado.match) {
                    const token = data.objetoEnviado.token;
                    this.$store.dispatch('auth/login');
                    this.$store.commit('auth/SET_TOKEN', token);
                    const userId = data.objetoEnviado.usuario.idUsuario;
                    const userAdmin = data.objetoEnviado.usuario.puesto;

                    this.$store.commit('auth/SET_USER_ID', userId);
                    this.$store.commit('auth/SET_USER_ADMIN', userAdmin);


                    this.$router.push('/principalProducto');

                } else {
                    this.error_message = 'Credenciales incorrectas...';
                    this.error = true;                }

            } catch (error) {
                console.error(error);
                this.error_message = 'Credenciales incorrectas...';
                this.error = true;
            }
        },
    },
};
