<template>
    <div :class="{ 'contador-dias': true, 'rojo': diasRestantes < 15 }">
        <h3>Próximo Inventario:</h3>
        <p>Última Fecha: {{ ultimaFecha }}</p>
        <p>Próxima Fecha: {{ proximaFecha }}</p>
        <h4>Días restantes: {{ diasRestantes }}</h4>
        <div>
            <button type="button" @click="añadirFecha" class="btn btn-success">Registrar Inventario</button>
        </div>
    </div>
</template>
  
<script>
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
        async obtenerUltimaFecha() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_FECHAS}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.length > 0) {
                    const ultimaFecha = data[data.length - 1];

                    // Formatea la última fecha para mostrar solo la parte de la fecha
                    const fechaUltima = new Date(ultimaFecha.ultimaFecha);
                    this.ultimaFecha = fechaUltima.toLocaleDateString(); // O utiliza fechaUltima.toISOString().split('T')[0];

                    // Formatea la próxima fecha para mostrar solo la parte de la fecha
                    const fechaProxima = new Date(ultimaFecha.proximaFecha);
                    this.proximaFecha = fechaProxima.toLocaleDateString(); // O utiliza fechaProxima.toISOString().split('T')[0];

                    // Calcula los días restantes entre la próxima fecha y la fecha actual
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
</script>
  
<style scoped>
.contador-dias {
    text-align: center;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.rojo {
    background-color: red;
    color: white;
}
</style>
  