import {
  API_URL,
  ENDPOINT_AGREGAR_SOLICITUD,
  ENDPOINT_LISTAR_USUARIOS,
} from "@/keys";
import axios from "axios";
export default {
  data() {
    return {
      show: false,
      solicitud: {
        idProducto: 0,
        solicitante: "",
        correo: "",
        estado: true,
        regresoProducto: false,
        cantidad: 0,
        fechaSolicitud: "",
        proyectoCuenta: "",
      },
      producto: {},
      usuarios: [],
      usuarioSeleccionado: {},
      esAjuste: 0,
    };
  },
  methods: {
    async openModal(producto) {
      this.solicitud = {
        idProducto: 0,
        solicitante: "",
        correo: "",
        estado: true,
        regresoProducto: false,
        cantidad: 0,
        fechaSolicitud: "",
        proyectoCuenta: "",
      };
      this.usuarioSeleccionado = {};
      this.producto = producto;
      this.esAjuste = 0;
      await this.listarUsuarios();
      this.show = true;
    },

    closeModal() {
      this.show = false;
    },

    async listarUsuarios() {
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

    async crearSalida() {
      if (this.producto.cantidad >= this.solicitud.cantidad) {
        if (this.esAjuste == 1) {
          this.solicitud.esAjuste = true;
        } else {
          this.solicitud.esAjuste = false;
          this.solicitud.solicitante = this.usuarioSeleccionado.nombre;
          this.solicitud.correo = this.usuarioSeleccionado.correo;
        }

        this.solicitud.idProducto = this.producto.idProducto;

        const ID = this.$store.state.auth.userId;
        const token = this.$store.state.auth.token;

        const url = `${API_URL}/${ENDPOINT_AGREGAR_SOLICITUD}`;

        try {
          const objetoAenviar = {
            solicitud: this.solicitud,
            solicitante: ID,
          };

          await axios.post(url, objetoAenviar, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          alert("Se ha creado la salida del producto.");
          this.$emit("recargar-cambios");
          this.closeModal();
        } catch (error) {
          console.log(error);
          if (error.response && error.response.status === 530) {
            alert(
              "Surgio un problema enviando el correo, intentelo nuevamente."
            );
          } else {
            alert(
              "Ha ocurrido un problema creando la salida, inténtelo nuevamente."
            );
          }
        }
      } else {
        alert(
          "La cantidad de salida no puede ser mayor que la que hay en existencia."
        );
      }
    },
  },
};
