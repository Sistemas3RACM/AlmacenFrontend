import {
  API_URL,
  ENDPOINT_LISTAR_CATEGORIAS,
  ENDPOINT_LISTAR_CUENTAS,
  ENDPOINT_LISTAR_PROVEEDORES,
  ENDPOINT_LISTAR_SUBCATEGORIAS_POR_CATEGORIAS,
  ENDPOINT_LISTAR_USUARIOS,
  ENDPOINT_REPORTE_ENTRADAS,
  ENDPOINT_REPORTE_PRODUCTOS,
  ENDPOINT_REPORTE_SALIDAS,
} from "@/keys";
import axios from "axios";
import ExcelJS from "exceljs";

export default {
  name: "ReportesView",
  data() {
    return {
      show: true,
      tipos: [
        { valor: 1, etiqueta: "Entrada" },
        { valor: 2, etiqueta: "Salida" },
        { valor: 3, etiqueta: "Producto" },
      ],
      tipoSeleccionado: {},
      proveedores: [],
      proveedorSeleccionado: 0,
      fechaInicial: "",
      fechaFinal: "",
      solicitantes: [],
      selectedSolicitante: {},
      cuentaProyecto: "",
      numSerie: "",
      categorias: [],
      categoriaSeleccionada: 0,
      subcategorias: [],
      subcategoriaSeleccionada: 0,
      cuentas: [],
      cuentaSeleccionada: 0,
      servicios: [
        { valor: 1, etiqueta: "Producto" },
        { valor: 2, etiqueta: "Servicio" },
      ],
      servicioSeleccionado: 1,

      solicitudes: [],
      entradas: [],
      currentPage: 1,
      pageSize: 6,
      registros: [],
      productos: [],
      modoEntrada: false,
      modoSalida: false,
      modoProducto: false,
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
      if (!this.registros) return 0;
      return Math.ceil(this.registros.length / this.pageSize);
    },
    // The above code is a method in a Vue component that is used for pagination.
    paginated() {
      if (!this.registros) return null;

      const sortedregistros = this.registros.slice().reverse();

      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return sortedregistros.slice(startIndex, endIndex);
    },
  },

  methods: {
    goToPage(page) {
      if (page < 1) page = 1;
      if (page > this.totalPages) page = this.totalPages;
      this.currentPage = page;
    },

    limpiarFiltros() {
      this.tipoSeleccionado = 0;
      this.proveedorSeleccionado = 0;
      this.fechaInicial = "";
      this.fechaFinal = "";
      this.selectedSolicitante = {};
      this.cuentaProyecto = "";
      this.numSerie = "";
      this.categoriaSeleccionada = 0;
      this.subcategoriaSeleccionada = 0;
      this.cuentaSeleccionada = 0;
      this.servicioSeleccionado = 1;
      this.registros = [];
      this.modoEntrada = false;
      this.modoSalida = false;
      this.modoProducto = false;
    },

    async mostrar() {
      await this.listarProveedores();
      await this.listarUsuarios();
      await this.listarCategorias();
      await this.listarProveedores();
      await this.listarCuentas();
      this.registros = [];
      this.modoEntrada = false;
      this.modoSalida = false;
      this.modoProducto = false;

      this.show = true;
    },

    async cambioBusqueda() {
      // BUSQUEDA POR ENTRADAS
      if (this.tipoSeleccionado == 1) {
        let objetoT1 = {};
        if (this.fechaInicial != "") {
          objetoT1.fechaInicio = this.fechaInicial;
        }
        if (this.fechaFinal != "") {
          objetoT1.fechaFin = this.fechaFinal;
        }
        if (this.proveedorSeleccionado != 0) {
          objetoT1.idProveedor = this.proveedorSeleccionado;
        }

        await this.ReporteEntradas(objetoT1);
        this.$refs.TablaEntradas.openModal(this.registros);
        this.modoEntrada=true;
      }

      // BUSQUEDA POR SALIDAS
      if (this.tipoSeleccionado == 2) {
        let objetoT2 = {};

        if (this.fechaInicial != "") {
          objetoT2.fechaInicio = this.fechaInicial;
        }

        if (this.fechaFinal != "") {
          objetoT2.fechaFin = this.fechaFinal;
        }

        if (this.numSerie != "") {
          objetoT2.numeroDeSerie = this.numSerie;
        }

        if (this.selectedSolicitante != null) {
          objetoT2.correo = this.selectedSolicitante.correo;
        }

        if (this.cuentaProyecto != "") {
          objetoT2.proyectoCuenta = this.cuentaProyecto;
        }
        await this.ReporteSolicitudes(objetoT2);
        this.modoSalida = true;
        this.$refs.TablaSalidas.openModal(this.registros);
      }
      // BUSQUEDA POR PRODUCTO
      if (this.tipoSeleccionado == 3) {
        let objetoT3 = {};

        if (this.numSerie != "") {
          objetoT3.numeroDeSerie = this.numSerie;
        }

        if (this.categoriaSeleccionada != 0) {
          objetoT3.idCategoria = this.categoriaSeleccionada;
        }

        if (this.subcategoriaSeleccionada != 0) {
          objetoT3.idSubcategoria = this.subcategoriaSeleccionada;
        }

        if (this.servicioSeleccionado != 0) {
          if (this.servicioSeleccionado == 1) {
            objetoT3.servicio = 0;
          } else {
            objetoT3.servicio = 1;
          }
        }

        if (this.proveedorSeleccionado != 0) {
          objetoT3.idProveedor = this.proveedorSeleccionado;
        }

        if (this.cuentaSeleccionada != 0) {
          objetoT3.idCuenta = this.cuentaSeleccionada;
        }
        await this.ReporteProductos(objetoT3);
        this.modoProducto = true;
        this.$refs.TablaProductos.openModal(this.registros);
      }
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

    async listarUsuarios() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_USUARIOS}`;
      const token = this.$store.state.auth.token;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.solicitantes = response.data;
      } catch (error) {
        console.log(error);
        alert(
          "Ha surgido un problema listando los usuarios, intentelo nuevamente."
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
          "Ha surgido un problema listando las categoría, intentelo nuevamente."
        );
      }
    },

    async listarSubcategorias() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_SUBCATEGORIAS_POR_CATEGORIAS}/${this.categoriaSeleccionada}`;
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

    async ReporteEntradas(objeto) {
      const url = `${API_URL}/${ENDPOINT_REPORTE_ENTRADAS}`;
      const token = this.$store.state.auth.token;

      try {
        const response = await axios.post(url, objeto, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.registros = response.data;
      } catch (error) {
        console.log(error);
        alert(
          "Ha surgido un problema buscando los registros, intentelo nuevamente."
        );
      }
    },

    async ReporteSolicitudes(objeto) {
      const url = `${API_URL}/${ENDPOINT_REPORTE_SALIDAS}`;
      const token = this.$store.state.auth.token;

      try {
        const response = await axios.post(url, objeto, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.registros = response.data;
      } catch (error) {
        console.log(error);
        alert(
          "Ha surgido un problema buscando los registros, intentelo nuevamente."
        );
      }
    },

    async ReporteProductos(objeto) {
      const url = `${API_URL}/${ENDPOINT_REPORTE_PRODUCTOS}`;
      const token = this.$store.state.auth.token;

      try {
        const response = await axios.post(url, objeto, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.registros = response.data;
      } catch (error) {
        console.log(error);
        alert(
          "Ha surgido un problema buscando los registros, intentelo nuevamente."
        );
      }
    },

    formatCurrency(amount) {
      if (amount === undefined || amount === null) return "";
      return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },

    async generarExcel() {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Requisiciones");

      // Encabezados
      sheet.addRow([
        "Número de requisición",
        "Estado",
        "Solicitante",
        "Fecha",
        "Cuenta cargo",
        "Subcuenta",
        "Monto total",
        "Método de pago",
        "Nombre de los productos",
        "Número de serie",
        "Cantidad de productos",
        "Monto unitario",
      ]);

      // Iterar sobre las requisiciones y agregar datos
      for (const requisicion of this.requisiciones) {
        const solicitante = requisicion.NombreSolicitante;
        const cuenta = requisicion.NombreCuenta;
        const fecha = new Date(requisicion.Fecha);
        const fechaFormateada = fecha.toISOString().slice(0, 10);
        const subcuenta = requisicion.NombreSubcuenta;
        const productos = await this.consultarProductos(
          requisicion.idRequisicion
        ); // Esperar a que se completen las consultas de productos
        const estado = requisicion.FiltroEscrito;

        // Agregar fila para la requisición
        sheet.addRow([
          requisicion.NumRequisicion,
          estado,
          solicitante,
          fechaFormateada,
          cuenta,
          subcuenta,
          this.formatCurrency(requisicion.Total),
          requisicion.MetodoPago,
        ]);

        // Construir una cadena con los detalles de los productos
        let cantidadProductos = "";
        let preciosUnitarios = "";
        let nombreProducto = "";
        let numeroDeSerieProducto = "";

        for (const producto of productos) {
          nombreProducto += `${producto.nombre}\n`;
          numeroDeSerieProducto += `${producto.numeroDeSerie}\n`;
          cantidadProductos += `${producto.Cantidad}\n`;
          preciosUnitarios += `${this.formatCurrency(producto.pUnitario)}\n`;
        }

        sheet.getCell(`I${sheet.rowCount}`).value = nombreProducto;
        sheet.getCell(`I${sheet.rowCount}`).alignment = { wrapText: true };
        // Calcular la altura de la fila para mostrar todos los detalles
        const numberOfRowsNeededNombre = nombreProducto.split("\n").length;
        sheet.getRow(sheet.rowCount).height = numberOfRowsNeededNombre * 15; // Ajustar según la altura de la fila deseada

        sheet.getCell(`J${sheet.rowCount}`).value = numeroDeSerieProducto;
        sheet.getCell(`J${sheet.rowCount}`).alignment = { wrapText: true };
        // Calcular la altura de la fila para mostrar todos los detalles
        const numberOfRowsNeededNumDeSerie =
          numeroDeSerieProducto.split("\n").length;
        sheet.getRow(sheet.rowCount).height =
          Math.max(numberOfRowsNeededNombre, numberOfRowsNeededNumDeSerie) * 15; // Ajustar según la altura de la fila deseada

        // Agregar la cantidad de productos en la misma celda
        sheet.getCell(`K${sheet.rowCount}`).value = cantidadProductos;
        sheet.getCell(`K${sheet.rowCount}`).alignment = { wrapText: true };
        // Calcular la altura de la fila para mostrar todos los detalles
        const numberOfRowsNeededCantidad = cantidadProductos.split("\n").length;
        sheet.getRow(sheet.rowCount).height =
          Math.max(
            numberOfRowsNeededNombre,
            numberOfRowsNeededNumDeSerie,
            numberOfRowsNeededCantidad
          ) * 15; // Ajustar según la altura de la fila deseada

        // Agregar los precios unitarios de los productos en la misma celda
        sheet.getCell(`L${sheet.rowCount}`).value = preciosUnitarios;
        sheet.getCell(`L${sheet.rowCount}`).alignment = { wrapText: true };
        // Calcular la altura de la fila para mostrar todos los detalles
        const numberOfRowsNeededPrecios = preciosUnitarios.split("\n").length;
        sheet.getRow(sheet.rowCount).height =
          Math.max(
            numberOfRowsNeededNombre,
            numberOfRowsNeededNumDeSerie,
            numberOfRowsNeededCantidad,
            numberOfRowsNeededPrecios
          ) * 15; // Ajustar según la altura de la fila deseada
      }

      // Generar el archivo Excel
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const fileName = "requisiciones.xlsx";
      if (window.navigator.msSaveOrOpenBlob) {
        // Para IE
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        // Para otros navegadores
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    },
  },
};
