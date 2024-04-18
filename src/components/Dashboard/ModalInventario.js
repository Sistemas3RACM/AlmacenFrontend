import { API_URL, ENDPOINT_AGREGAR_FECHA } from "@/keys";
import axios from "axios";

export default {
  props: {
    ultimaFechaInventario: {
      type: String,
    },
    proximaFechaInventario: {
      type: String,
    },
    registro: {
      type: Boolean,
    }
  },
  data() {
    return {
      show: false,
      hayRegistro: false,
      mostrarCalendarioV: false,
      fechaSeleccionada: null,
      fecha: {
        ultimaFecha: '',
        proximaFecha: '',
      },
    };
  },
  methods: {
    openModal() {
      this.hayRegistro = this.registro;
      this.show = true;
    },

    mostrarCalendario() {
      this.mostrarCalendarioV = true;
    },

    agregarNuevaFecha() {
      const hoy = new Date();
      const year = hoy.getFullYear();
      const month = String(hoy.getMonth() + 1).padStart(2, '0');
      const day = String(hoy.getDate()).padStart(2, '0');
      const fechaFormateada = `${year}-${month}-${day}`;
      this.agregarFecha(fechaFormateada);
    },

    agregarFecha(fechaActual) {
      const url = `${API_URL}/${ENDPOINT_AGREGAR_FECHA}`;

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      this.fecha.ultimaFecha = fechaActual;
      this.fecha.proximaFecha = this.fechaSeleccionada;

      axios.post(url, this.fecha, config)
        .then(() => {
          this.$emit('cargar-pagina');
          this.closeModal();
        })
        .catch(() => {
          console.log("Ha surgido un problema al agregar la fecha.");
        });

    },

    closeModal() {
      this.mostrarCalendarioV = false;
      this.show = false;
    },
  },
};
