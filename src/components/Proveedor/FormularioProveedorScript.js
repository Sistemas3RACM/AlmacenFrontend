import { API_URL, ENDPOINT_AGREGAR_PROVEEDOR } from "@/keys";
import axios from "axios";

export default {
  data() {
    return {
      proveedor: {
        nombre: "",
        direccion: "",
        telefono: "",
        descripcion: "",
        infoContacto: "",
      },
      show: false,
    };
  },
  emits: ["recargar-cambios"],
  methods: {
    openModal() {
      this.show = true;
    },

    closeModal() {
      this.show = false;
    },

    async guardarProveedor() {
      const ID = this.$store.state.auth.userId;
      const token = this.$store.state.auth.token;

      const url = `${API_URL}/${ENDPOINT_AGREGAR_PROVEEDOR}`;

      try {
        const objetoAenviar = {
          proveedor: this.proveedor,
          solicitante: ID,
        };

        await axios.post(url, objetoAenviar, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Se ha creado el proveedor con éxito");
        this.$emit("recargar-cambios");
        this.closeModal();
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 530) {
          alert("Ya existe un proveedor con el mismo correo registrado.");
        } else {
          alert(
            "Ha ocurrido un problema creando el proveedor, inténtelo nuevamente."
          );
        }
      }
    },
  },
};
