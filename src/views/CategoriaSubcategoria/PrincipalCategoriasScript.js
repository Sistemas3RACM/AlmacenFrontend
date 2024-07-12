import {
  API_URL,
  ENDPOINT_AGREGAR_CATEGORIA,
  ENDPOINT_AGREGAR_SUBCATEGORIA,
  ENDPOINT_EDITAR_CATEGORIA,
  ENDPOINT_EDITAR_SUBCATEGORIA,
  ENDPOINT_ELIMINAR_CATEGORIA,
  ENDPOINT_ELIMINAR_SUBCATEGORIA,
  ENDPOINT_LISTAR_CATEGORIAS,
  ENDPOINT_LISTAR_SUBCATEGORIAS,
} from "@/keys";
import axios from "axios";

export default {
  name: "InicioCategoria",
  data() {
    return {
      categorias: [],
      edicionCategoria: false,
      subcategorias: [],
      edicionSubcategoria: false,
    };
  },
  mounted() {
    this.mostrar();
  },
  methods: {
    async mostrar() {
      await this.listarCategorias();
      await this.listarSubcategorias();
    },

    async listarCategorias() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_CATEGORIAS}`;
      const token = this.$store.state.auth.token;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.categorias = response.data;
      } catch (error) {
        console.log(error);
        alert(
          "Ha surgido un problema listando las categorías, intentelo nuevamente."
        );
      }
    },

    async listarSubcategorias() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_SUBCATEGORIAS}`;
      const token = this.$store.state.auth.token;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.subcategorias = response.data;
      } catch (error) {
        console.log(error);
        alert(
          "Ha surgido un problema listando las subcategorías, intentelo nuevamente."
        );
      }
    },

    async agregarCategoria(categoria) {
      const ID = this.$store.state.auth.userId;
      const url = `${API_URL}/${ENDPOINT_AGREGAR_CATEGORIA}`;
      const token = this.$store.state.auth.token;

      const objetoAenviar = {
        categoria: categoria,
        solicitante: ID,
      };

      try {
        await axios.post(url, objetoAenviar, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Se ha agregado la categoría correctamente.");
        this.mostrar();
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 530) {
          alert(
            "Ya existe una categoría con el mismo nombre, ingrese un nuevo nombre.."
          );
        } else {
          alert(
            "Ha surgido un problema agregando la categoría, intentelo nuevamente."
          );
        }
      }
    },

    async agregarSubcategoria(subcategoria) {
      const ID = this.$store.state.auth.userId;
      const url = `${API_URL}/${ENDPOINT_AGREGAR_SUBCATEGORIA}`;
      const token = this.$store.state.auth.token;

      const objetoAenviar = {
        subcategoria: subcategoria,
        solicitante: ID,
      };

      try {
        await axios.post(url, objetoAenviar, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Se ha agregado la subcategoría correctamente.");
        this.mostrar();
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 530) {
          alert(
            "Ya existe una subcategoría con el mismo nombre en esa categoria, ingrese un nuevo nombre.."
          );
        } else {
          alert(
            "Ha surgido un problema agregando la subcategoría, intentelo nuevamente."
          );
        }
      }
    },

    async editarCategoria(categoria) {
      const ID = this.$store.state.auth.userId;
      const url = `${API_URL}/${ENDPOINT_EDITAR_CATEGORIA}`;
      const token = this.$store.state.auth.token;

      const objetoAenviar = {
        categoria: categoria,
        solicitante: ID,
      };

      try {
        await axios.put(url, objetoAenviar, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Se ha editado la categoría correctamente.");
        this.mostrar();
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 530) {
          alert(
            "Ya existe una categoría con el mismo nombre, ingrese un nuevo nombre.."
          );
        } else {
          alert(
            "Ha surgido un problema editando la categoría, intentelo nuevamente."
          );
        }
      }
    },

    async editarSubcategoria(subcategoria) {
      const ID = this.$store.state.auth.userId;
      const url = `${API_URL}/${ENDPOINT_EDITAR_SUBCATEGORIA}`;
      const token = this.$store.state.auth.token;

      const objetoAenviar = {
        subcategoria: subcategoria,
        solicitante: ID,
      };

      try {
        await axios.put(url, objetoAenviar, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Se ha editando la subcategoría correctamente.");
        this.mostrar();
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 530) {
          alert(
            "Ya existe una subcategoría con el mismo nombre en esa categoria, ingrese un nuevo nombre.."
          );
        } else {
          alert(
            "Ha surgido un problema editando la subcategoría, intentelo nuevamente."
          );
        }
      }
    },

    async eliminarCategoria(categoria) {
      try {
        const confirmacion = confirm(
          "¿Estás seguro de que deseas eliminar esta categoría?"
        );
        if (confirmacion) {
          const ID = this.$store.state.auth.userId;

          const url = `${API_URL}/${ENDPOINT_ELIMINAR_CATEGORIA}`;
          const token = this.$store.state.auth.token;

          const objeto = {
            categoria: categoria,
            solicitante: ID,
          };

          await axios.post(url, objeto, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          alert("Se ha eliminado la categoría correctamente.");
          this.mostrar();
        }
      } catch (error) {
        console.error(error);
        alert(
          "Ha surgido un problema eliminando la categoría, intentelo nuevamente."
        );
      }
    },

    async eliminarSubcategoria(subcategoria) {
      try {
        const confirmacion = confirm(
          "¿Estás seguro de que deseas eliminar esta subcategoría?"
        );
        if (confirmacion) {
          const ID = this.$store.state.auth.userId;

          const url = `${API_URL}/${ENDPOINT_ELIMINAR_SUBCATEGORIA}`;
          const token = this.$store.state.auth.token;

          const objeto = {
            subcategoria: subcategoria,
            solicitante: ID,
          };

          await axios.post(url, objeto, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          alert("Se ha eliminado la subcategoría correctamente.");
          this.mostrar();
        }
      } catch (error) {
        console.error(error);
        alert(
          "Ha surgido un problema subeliminando la categoría, intentelo nuevamente."
        );
      }
    },

    abrirAgregarCategoria() {
      this.$refs.AgregarCategoria.openModal();
    },

    abrirAgregarSubcategoria() {
      this.$refs.AgregarSubcategoria.openModal(this.categorias);
    },

    abrirEditarCategoria(categoria) {
      this.edicionCategoria = true;
      this.$refs.EditarCategoria.openModal(categoria);
    },

    abrirEditarSubcategoria(subcategoria) {
      this.edicionSubcategoria = true;
      this.$refs.EditarSubcategoria.openModal(subcategoria);
    },

    abrirInformacionCategoria(categoria) {
      this.edicionCategoria = false;
      this.$refs.EditarCategoria.openModal(categoria);
    },

    abrirInformacionSubcategoria(subcategoria) {
      this.edicionSubcategoria = false;
      this.$refs.EditarSubcategoria.openModal(subcategoria);
    },
  },
};
