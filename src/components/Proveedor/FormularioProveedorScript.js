import { API_URL, ENDPOINT_AGREGAR_PROVEEDOR } from '@/keys';
import axios from 'axios';

export default {
  data() {
    return {
      proveedor: {
        nombre: '',
        direccion: '',
        telefono: '',
        descripcion:'',
        infoContacto:''
      },
      show: false,
      mensajeCorrecto: 'Proveedor agregado con exito.',
      mensajeError: 'Ha ocurrido un error al agregar el proveedor...',

    };
  },
  methods: {
    openModal() {
      this.show = true;
    },

    closeModal() {
      this.show = false;
    },

    guardarProveedor() {
      const idUsuario = this.$store.state.auth.userId;

      const url = `${API_URL}/${ENDPOINT_AGREGAR_PROVEEDOR}?idSolicitante=${idUsuario}`;

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      axios.post(url, this.proveedor, config)
        .then(() => {
          //AQUI AGREGAR EL MODAL DE INFORMACION CORRECTA
          this.$refs.ModalCorrecto.openModal();
          this.$emit('recargar-Cambios');
          this.closeModal();
        })
        .catch(() => {
          //AQUI AGREGAR EL MODAL DE INFORMACION DE ERROR
          this.$refs.ModalError.openModal();
          this.closeModal();
        });
    },


  },
};
