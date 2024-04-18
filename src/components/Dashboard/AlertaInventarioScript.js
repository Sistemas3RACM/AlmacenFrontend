import { API_URL, ENDPOINT_AGREGAR_FECHA, ENDPOINT_LISTAR_FECHAS } from '@/keys';
import axios from 'axios';

export default {
    data() {
        return {
            fechaInventario: [],
            ultimoRegistro: null,
            ultimaFecha: '',
            proximaFecha: '',
            diasRestantes: 0,
        };
    },
    mounted() {
        this.mostrar();
    },
    methods: {
        async mostrar() {
            await this.obtenerUltimaFecha();
            await this.calcularDias();
        },

        async obtenerUltimaFecha() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_FECHAS}`;

            return axios.get(url)
                .then(response => {
                    this.fechaInventario = response.data;
                    const ultimoRegistro = this.fechaInventario[this.fechaInventario.length - 1];
                    this.ultimoRegistro = ultimoRegistro;
                    const opcionesFormato = { day: '2-digit', month: '2-digit', year: 'numeric' };
                    this.ultimaFecha = new Date(ultimoRegistro.ultimaFecha).toLocaleDateString('es-ES', opcionesFormato);
                    this.proximaFecha = new Date(ultimoRegistro.proximaFecha).toLocaleDateString('es-ES', opcionesFormato);
                })
                .catch(() => {
                    console.log("No se ha obtenido la ultima fecha.");
                });
        },

        calcularDias() {
            // Convertir las fechas a objetos Date
            const proximaFecha = new Date(this.ultimoRegistro.proximaFecha);
            const ultimaFecha = new Date(this.ultimoRegistro.ultimaFecha);
        
            // Calcular la diferencia en milisegundos
            const diferenciaEnMilisegundos = proximaFecha - ultimaFecha;
        
            // Convertir la diferencia en días
            const diasRestantes = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);

            this.diasRestantes=diasRestantes;
        
            console.log("Próxima fecha:", proximaFecha);
            console.log("Última fecha:", ultimaFecha);
            console.log("Días restantes:", diasRestantes);
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
