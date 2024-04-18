import { API_URL, ENDPOINT_AGREGAR_SUBCATEGORIA, ENDPOINT_LISTAR_CATEGORIAS } from '@/keys';
import axios from 'axios';

export default {
  data() {
    return {
      subcategoria: {
        nombre: '',
        idCategoria: ''
      },
      categorias: [],
      show: false,
      mensajeCorrecto: 'Subcategoría agregada con exito.',
      mensajeError: 'Ha ocurrido un error al agregar la subcategoria...',
    };
  },

  methods: {
    async openModal() {
      await this.listarCategorias();
      this.show = true;
    },

    closeModal() {
      this.subcategoria.nombre = '';
      this.subcategoria.idCategoria = '';
      this.show = false;
    },

    listarCategorias() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_CATEGORIAS}`;

      return axios.get(url)
        .then(response => {
          this.categorias = response.data;
        })
        .catch(() => {
          console.log("No se han podido listar las categorias disponibles.");
        });
    },

    guardarSubcategoria() {
      const idUsuario = this.$store.state.auth.userId;

      const url = `${API_URL}/${ENDPOINT_AGREGAR_SUBCATEGORIA}?idSolicitante=${idUsuario}`;

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      return axios.post(url, this.subcategoria, config)
        .then(() => {
          //Mensaje correcto si todo va bien
          this.$refs.ModalCorrecto.openModal();
          this.$emit('recargar-Cambios');
          this.closeModal();
        })
        .catch(() => {
          //Mensaje de error si no se ha guardado correcto
          this.$refs.ModalError.openModal();
          this.closeModal();
        });

    },

  },
};
