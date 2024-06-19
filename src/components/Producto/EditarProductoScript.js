import {
  API_URL,
  ENDPOINT_LISTAR_CATEGORIAS,
  ENDPOINT_LISTAR_CUENTAS,
  ENDPOINT_LISTAR_PROVEEDORES,
  ENDPOINT_LISTAR_SUBCATEGORIAS_POR_CATEGORIAS,
} from "@/keys";
import axios from "axios";

export default {
  data() {
    return {
      objetoLocal: {},
      categorias: [],
      subcategorias: [],
      cuentas: [],
      proveedores: [],
      unidadMedidaOptions: [
        { valor: "Piezas", etiqueta: "Piezas" },
        { valor: "Kilogramos", etiqueta: "Kilogramos" },
        { valor: "Cajas", etiqueta: "Cajas" },
        { valor: "Pares", etiqueta: "Pares" },
        { valor: "Metros", etiqueta: "Metros" },
        { valor: "Docenas", etiqueta: "Docenas" },
        { valor: "Litros", etiqueta: "Litros" },
        { valor: "Mililitros", etiqueta: "Mililitros" },
        { valor: "Gramos", etiqueta: "Gramos" },
        { valor: "Centímetros", etiqueta: "Centímetros" },
        { valor: "Ninguno", etiqueta: "Ninguno" },
        { valor: "Servicio", etiqueta: "Servicio" },
      ],
      localizacionOptions: [
        { valor: "01", etiqueta: "Anaquel 1" },
        { valor: "02", etiqueta: "Anaquel 2" },
        { valor: "03", etiqueta: "Anaquel 3" },
        { valor: "04", etiqueta: "Anaquel 4" },
        { valor: "05", etiqueta: "Anaquel 5" },
        { valor: "06", etiqueta: "Anaquel 6" },
        { valor: "07", etiqueta: "Anaquel 7" },
        { valor: "08", etiqueta: "Anaquel 8" },
        { valor: "09", etiqueta: "Anaquel 9" },
        { valor: "00", etiqueta: "Ninguno" },
        { valor: "100", etiqueta: "Servicio" },
      ],
      servicioOptions: [
        { valor: 0, etiqueta: "No" },
        { valor: 1, etiqueta: "Si" },
      ],
      show: false,
    };
  },
  methods: {
    async openModal(objeto) {
      this.objetoLocal = objeto;
      this.objetoLocal.precioUnitario = this.formatCurrency(
        this.objetoLocal.precioUnitario
      );
      this.listarCategorias();
      this.listarCuentas();
      this.listarProveedores();
      this.listarSubcategorias();
      this.show = true;
    },

    closeModal() {
      this.$emit("regresar-listado");
      this.show = false;
    },

    async listarProveedores() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_PROVEEDORES}`;
      const token = this.$store.state.auth.token;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.proveedores = response.data;
      } catch (error) {
        console.log(error);
        alert(
          "Ha surgido un problema listando los proveedores, intentelo nuevamente."
        );
      }
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
          "Ha surgido un problema listando las categorias, intentelo nuevamente."
        );
      }
    },

    async listarSubcategorias() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_SUBCATEGORIAS_POR_CATEGORIAS}/${this.objetoLocal.idCategoria}`;
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
          "Ha surgido un problema listando las subcategorias, intentelo nuevamente."
        );
      }
    },

    async listarCuentas() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_CUENTAS}`;
      const token = this.$store.state.auth.token;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.cuentas = response.data;
      } catch (error) {
        console.log(error);
        alert(
          "Ha surgido un problema listando las cuentas, intentelo nuevamente."
        );
      }
    },

    enviar() {
      if (!this.comprobarCampos()) {
        this.objetoLocal.precioUnitario = this.limpiarFormatoMoneda(
          this.objetoLocal.precioUnitario
        );

        this.$emit("editar-producto", this.objetoLocal);
        this.closeModal();
      }
    },

    limpiarFormatoMoneda(valor) {
      // Convertir el valor a string si no lo es y luego eliminar las comas
      return parseFloat(valor.toString().replace(/,/g, ""));
    },

    formatCurrency(amount) {
      if (amount === undefined || amount === null) return "";

      // Formatear el número con estilo de moneda
      let formattedAmount = amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "code", // Usar el código de moneda en lugar del símbolo
      });

      // Remover el código de moneda (USD)
      return formattedAmount.replace("USD", "").trim();
    },

    comprobarCampos() {
      let mensaje = "Los siguentes campos no pueden estar vacios: \n";
      let campos = [];

      if (this.objetoLocal.nombre == "") {
        campos.push("-Nombre");
      }
      if (this.objetoLocal.precioUnitario == "") {
        campos.push("-Precio unitario");
      }

      if (campos.length > 0) {
        mensaje += campos.join(", \n");
        alert(mensaje);
        return true;
      }
      return false;
    },
  },
};
