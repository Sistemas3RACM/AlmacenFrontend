import { API_URL, ENDPOINT_AGREGAR_CATEGORIA } from '@/keys';
import axios from 'axios';

export default {
  data() {
    return {
      categoria: {
        nombre: ''
      },
      show: false,
      mensajeCorrecto: 'Categoría agregada con exito.',
      mensajeError: 'Ha ocurrido un error al agregar la categoria...',
    };
  },
  methods: {
    async openModal() {
      this.show = true;
    },
    cerrarFormulario() {
      this.$emit('recargar-Cambios');
      this.show = false;
    },
    agregarCategoria() {
      const idUsuario = this.$store.state.auth.userId;
      const url = `${API_URL}/${ENDPOINT_AGREGAR_CATEGORIA}?idSolicitante=${idUsuario}`;

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      axios.post(url, this.categoria, config)
        .then(() => {
          //AQUI AGREGAR EL MODAL DE INFORMACION CORRECTA
          this.$refs.ModalCorrecto.openModal();
          this.$emit('recargar-Cambios');
          this.cerrarFormulario();
        })
        .catch(() => {
          //AQUI AGREGAR EL MODAL DE INFORMACION DE ERROR
          alert("No se ha agregado la categoria");
          this.$refs.ModalError.openModal();
          this.cerrarFormulario();
        });

    },
  },
};
