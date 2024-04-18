import { API_URL, ENDPOINT_EDITAR_PROVEEDOR } from '@/keys';
import axios from 'axios';

export default {
  props: {
    objeto: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      show: false,
      mensajeCorrecto: 'Proveedor editado con exito.',
      mensajeError: 'Ha ocurrido un error al editar el proveedor...',

    };
  },
  methods: {
    openModal() {
      this.show = true;
    },

    closeModal() {
      this.show = false;
    },

    editarProveedor() {

      if (!this.objeto.nombre) {
        this.errorMessage = 'El campo nombre no puede estar vacío';
        this.$refs.modalError.openModal();
        this.mostrar();
      } else {
        if (this.objeto.telefono === "") {
          this.objeto.telefono = "S/T";
        }
        if (this.objeto.direccion === "") {
          this.objeto.direccion = "S/D";
        }

        if (this.objeto.infoContacto === "") {
          this.objeto.infoContacto = "Sin Contacto";
        }
        if (this.objeto.descripcion === "") {
          this.objeto.descripcion = "Sin descripción";
        }


        const url = `${API_URL}/${ENDPOINT_EDITAR_PROVEEDOR}`;

        axios.put(url, this.objeto)
          .then(() => {
            this.$refs.ModalCorrecto.openModal();
            this.$emit('proveedor-editado');
            this.closeModal();
          })
          .catch(()=>{
            this.$refs.ModalError.openModal();
          });

      }

    },

  },
};
