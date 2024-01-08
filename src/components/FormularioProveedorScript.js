import { API_URL, ENDPOINT_AGREGAR_PROVEEDOR, ENDPOINT_AGREGAR_MOVIMIENTO } from '../keys';

export default {
  data() {
    return {
      camposProveedor: [
        { id: 'nombre', label: 'Nombre', nombre: 'nombre', type: 'text', valor: '', ayuda: 'Ingrese el nombre del proveedor', required: true },
        { id: 'direccion', label: 'Dirección', nombre: 'direccion', type: 'text', valor: '', ayuda: 'Ingrese la dirección del proveedor' },
        { id: 'telefono', label: 'Teléfono', nombre: 'telefono', type: 'text', valor: '', ayuda: 'Ingrese el teléfono del proveedor' },
      ],
    };
  },
  props: {
    visible: Boolean,
  },
  methods: {
    enviarFormulario() {
      const campoNombre = this.camposProveedor.find(campo => campo.id === 'nombre');
      const campoDireccion = this.camposProveedor.find(campo => campo.id === 'direccion');
      const campoTelefono = this.camposProveedor.find(campo => campo.id === 'telefono');

      if (campoNombre && campoNombre.valor) {
        const camposJSON = {
          nombre: campoNombre.valor,
          direccion: campoDireccion.valor,
          telefono: campoTelefono.valor
        };

        this.agregarProveedor(camposJSON);
      } else {
        alert('Por favor, ingrese el nombre del proveedor.');
      }
    },
    cerrarFormulario() {
      this.$emit('cerrar-formulario');
    },
    agregarProveedor(datos) {
      const url = `${API_URL}/${ENDPOINT_AGREGAR_PROVEEDOR}`;

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      })
      .then(response => {
        if (response.ok) {
          alert('Proveedor agregado con éxito.');
          this.registroDeMovimientos(`Proveedor ${datos.nombre} agregado`);
          this.$emit('actualizar-listas-proveedor');
        } else if (response.status === 409) {
          alert('El proveedor ya existe.');
        } else {
          alert('Error al agregar el proveedor.');
        }
      })
      .catch(error => {
        alert('Error en la solicitud del proveedor');
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
