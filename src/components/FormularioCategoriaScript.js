import { API_URL, ENDPOINT_AGREGAR_CATEGORIA, ENDPOINT_AGREGAR_MOVIMIENTO } from '../keys';

export default {
  data() {
    return {
      camposCategoria: [
              { id: 'nombre', label: 'Nombre', nombre: 'nombre', type: 'text', valor: '', ayuda: 'Ingrese el nombre de la categoría', required: true },
          ],
    };
  },
  props: {
    visible: Boolean,
  },
  methods: {
    enviarFormulario() {
      const campoNombre = this.camposCategoria.find(campo => campo.id === 'nombre');

      if (campoNombre && campoNombre.valor) {
        const camposJSON = {
          nombre: campoNombre.valor
        };

        this.agregarCategoria(camposJSON);
      } else {
        alert('Por favor, ingrese el nombre de la categoría.');
      }
    },
    cerrarFormulario() {
      this.$emit('cerrar-formulario');
    },
    agregarCategoria(datos) {
      const url = `${API_URL}/${ENDPOINT_AGREGAR_CATEGORIA}`;

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      })
      .then(response => {
        if (response.ok) {
          alert('Categoría agregada con éxito.');
          this.registroDeMovimientos(`Categoría ${datos.nombre} agregada`);
          this.$emit('actualizar-listas-categorias');
        } else if (response.status === 409) {
          alert('La categoría ya existe.');
        } else {
          alert('Error al agregar la categoría.');
        }
      })
      .catch(error => {
        alert('Error en la solicitud de la categoría');
      });
    },
    registroDeMovimientos(mensaje) {
      const idUsuario = this.$store.state.auth.userId;

      const JSONmovimientos = {
        "tipoMovimiento": mensaje,
        "encargado": idUsuario,
        "fechaDeMovimiento": null
      };

      const url = `${API_URL}/${ENDPOINT_AGREGAR_MOVIMIENTO}`;

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(JSONmovimientos),
      })
      .then(response => {
        if (response.ok) {
          this.cerrarFormulario();
        } else if (response.status === 409) {
          alert('Error al agregar el movimiento.');
        }
      })
      .catch(error => {
        alert('Error en la solicitud del movimiento.');
      });
    },
  },
};
