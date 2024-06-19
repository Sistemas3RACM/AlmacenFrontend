import {
  API_URL,
  ENDPOINT_AGREGAR_USUARIO,
  ENDPOINT_EDITAR_USUARIO,
  ENDPOINT_ELIMINAR_USUARIO,
  ENDPOINT_LISTAR_USUARIOS,
} from "@/keys";
import axios from "axios";

export default {
  name: "UsuariosView",
  data() {
    return {
      usuarios: [],
      nuevoUsuario: {
        nombre: "",
        correo: "",
        contraseña: "",
        puesto: 0,
      },
      listaPuestos: [
        { valor: 1, etiqueta: "Administrador del sistema" },
        { valor: 2, etiqueta: "Administrativo" },
        { valor: 3, etiqueta: "Sin permisos" },
      ],
      currentPage: 1,
      pageSize: 8,
    };
  },
  mounted() {
    this.mostrar();
  },
  computed: {
    // The above code is a method in a Vue component that calculates the total number of pages based on the
    // number of users and the page size. It first checks if the `usuarios` array is defined, and if not,
    // it returns 0. If the `usuarios` array is defined, it calculates the total number of pages by
    // dividing the length of the `usuarios` array by the `pageSize` property and rounding up using the
    // `Math.ceil()` function.
    totalPages() {
      if (!this.usuarios) return 0;
      return Math.ceil(this.usuarios.length / this.pageSize);
    },
    // The above code is a method in a Vue component that is used for pagination.
    paginated() {
      if (!this.usuarios) return null;

      const sortedusuarios = this.usuarios.slice().reverse();

      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return sortedusuarios.slice(startIndex, endIndex);
    },
  },
  methods: {
    goToPage(page) {
      if (page < 1) page = 1;
      if (page > this.totalPages) page = this.totalPages;
      this.currentPage = page;
    },

    async mostrar() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_USUARIOS}`;
      const token = this.$store.state.auth.token;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.usuarios = response.data;
      } catch (error) {
        console.log(error);
        alert(
          "Ha surgido un problema listando los usuarios, intentelo nuevamente."
        );
      }
    },

    async guardarUsuario() {
      const ID = this.$store.state.auth.userId;
      const token = this.$store.state.auth.token;

      const url = `${API_URL}/${ENDPOINT_AGREGAR_USUARIO}`;

      try {
        const objetoAenviar = {
          usuario: this.nuevoUsuario,
          solicitante: ID,
        };

        await axios.post(url, objetoAenviar, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Se ha creado el usuario con éxito");
        this.mostrar();
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 530) {
          alert("Ya existe un usuario con el mismo correo registrado.");
        } else {
          alert(
            "Ha ocurrido un problema creando el usuario, inténtelo nuevamente."
          );
        }
      }
    },

    abrirModalInformacion(objeto) {
      this.$refs.InformacionUsuario.openModal(objeto);
    },

    abrirModalEdicion(objeto) {
      this.$refs.EditarUsuario.openModal(objeto);
    },

    async editar(objeto) {
      try {
        const url = `${API_URL}/${ENDPOINT_EDITAR_USUARIO}`;

        const ID = this.$store.state.auth.userId;

        const token = this.$store.state.auth.token;

        const objetoAenviar = {
          usuario: objeto,
          solicitante: ID,
        };

        await axios.put(url, objetoAenviar, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Se ha editado el usuario correctamente.");
        this.mostrar();
      } catch (error) {
        if (error.response && error.response.status === 530) {
          alert("Ya existe un usuario con el mismo correo registrado.");
        } else {
          alert(
            "Ha ocurrido un problema editando el usuario, inténtelo nuevamente."
          );
        }
        this.mostrar();
      }
    },

    async eliminar(usuario) {
      try {
        const confirmacion = confirm(
          "¿Estás seguro de que deseas eliminar este usuario? Si lo hace, todas los movimientos que realizo se eliminarán incluyendo solicitudes y salidas."
        );
        if (confirmacion) {
          const ID = this.$store.state.auth.userId;

          const url = `${API_URL}/${ENDPOINT_ELIMINAR_USUARIO}`;
          const token = this.$store.state.auth.token;

          const objeto = {
            usuario: usuario,
            solicitante: ID,
          };

          await axios.post(url, objeto, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          alert("Se ha eliminado el usuario correctamente.");
          this.mostrar();
        }
      } catch (error) {
        console.error(error);
        alert(
          "Ha surgido un problema eliminando el usuario, intentelo nuevamente."
        );
      }
    },
  },
};
