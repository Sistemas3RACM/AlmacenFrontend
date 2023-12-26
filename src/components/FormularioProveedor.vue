<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h3>Agregar Proveedor</h3>
      <form @submit.prevent="enviarFormulario">
        <div v-for="campo in camposProveedor" :key="campo.id" class="mb-3">
          <label :for="campo.id" class="form-label">{{ campo.label }}</label>
          <input :type="campo.type" :id="campo.id" v-model="campo.valor" :required="campo.required" class="form-control" :placeholder="campo.ayuda" />
        </div>

        <div class="button-container">
          <button type="submit" class="btn m-1 btn-primary">Guardar</button>
          <button @click="cerrarFormulario" class="btn m-1 btn-danger">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
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
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  border-radius: 10px;
}

.modal-content {
  width: 40%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
}

.button-container {
  text-align: center;
}
</style>
