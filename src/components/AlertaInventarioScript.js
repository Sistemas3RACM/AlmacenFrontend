import { API_URL, ENDPOINT_AGREGAR_FECHA, ENDPOINT_LISTAR_FECHAS } from '../keys';

export default {
    data() {
        return {
            ultimaFecha: '',
            proximaFecha: '',
            diasRestantes: 0
        };
    },
    mounted() {
        this.obtenerUltimaFecha();
    },
    methods: {
        // The `obtenerUltimaFecha()` method is an asynchronous function that retrieves the last date from an
        // API endpoint.
        async obtenerUltimaFecha() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_FECHAS}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.length > 0) {
                    const ultimaFecha = data[data.length - 1];

                    const fechaUltima = new Date(ultimaFecha.ultimaFecha);
                    this.ultimaFecha = fechaUltima.toLocaleDateString();

                    const fechaProxima = new Date(ultimaFecha.proximaFecha);
                    this.proximaFecha = fechaProxima.toLocaleDateString();

                    const hoy = new Date();
                    const diffTime = fechaProxima - hoy;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    this.diasRestantes = diffDays;
                }
            } catch (error) {
                console.error('Error al obtener la última fecha:', error);
            }
        },
        añadirFecha() {
            const url = `${API_URL}/${ENDPOINT_AGREGAR_FECHA}`;
            const fechaActual = new Date().toISOString();

            const nuevoJSON = {
                fecha: {
                    ultimaFecha: fechaActual
                }
            };


            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoJSON),
            })
                .then(response => {
                    if (response.status === 201) {
                        // this.registroDeMovimientos(`Usuario ${nuevoJSON.nombre} agregado`);
                        console.log("Nueva fecha añadida");
                        this.obtenerUltimaFecha();
                    }
                    else {
                        if (response.status === 409) {

                        } else {
                            console.log("error al agregar la nueva fecha");
                        }
                    }
                })
                .catch(error => {
                    this.errorMessage = 'Error en la solicitud';
                    this.$refs.modalError.openModal();
                });
        }
    }
};
