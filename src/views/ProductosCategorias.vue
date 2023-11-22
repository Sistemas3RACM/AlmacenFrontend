<template>
  <section class="container-fluid">
    <div>
      <div class="row">
        <div class="col-2 m-0 p-0">
          <Nvar />
        </div>
        <div class="col-10 m-0 p-0">
          <section class="container-fluid">
            <div class="row">
              <div class="mt-5">
                <div class="row">
                  <div class="col-md-3">
                    <h1 class="h1 m-3">Inventario</h1>
                  </div>
                  <div class="col-md-2 mt-4">
                    <button @click="mostrar()" class="btn m-1 btn-warning">
                      <font-awesome-icon :icon="['fas', 'sync-alt']" />
                    </button>
                  </div>
                  <div v-if="selectedCategoria" class="col-md-3 mt-4">
                    <button @click="exportToExcel" class="btn btn-success">Exportar a Excel</button>
                  </div>
                  <div class="col-md-4 mt-4">
                    <BusquedaGeneral @busqueda="buscarCategoria" />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-5">
                    <tabla v-if="paginated" :type="type" :data="paginated" :fields="['nombre']">
                      <template #default="{ item }">
                        <button @click="obtenerIDCategoria(item)" class="btn m-1 btn-primary">
                          Seleccionar
                        </button>
                      </template>
                    </tabla>
                    <div class="pagination-buttons boton-container">
                      <button @click="goToPage(currentPage - 1)" class="btn btn-info"
                        :disabled="currentPage === 1">Anterior</button>
                      <button @click="goToPage(currentPage + 1)" class="btn btn-info"
                        :disabled="currentPage === totalPages">Siguiente</button>
                    </div>
                  </div>
                  <div class="col-md-6" v-if="selectedCategoria">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Cantidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="producto in productos" :key="producto.id">
                          <td>{{ producto.nombre }}</td>
                          <td>{{ producto.cantidad }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import tabla from '../components/tablainformacion.vue';
import Nvar from '../components/Nvar';
import BusquedaGeneral from '@/components/BusquedaGeneral.vue';
import * as XLSX from 'xlsx';

import {
  API_URL, ENDPOINT_LISTAR_CATEGORIAS, ENDPOINT_BUSCAR_CATEGORIA, ENDPOINT_LISTAR_PRODUCTO_POR_CATEGORIA
} from '../keys';

export default {
  name: 'ProductoPorCategoria',
  components: {
    tabla,
    BusquedaGeneral,
    Nvar,
  },
  data() {
    return {
      categorias: null,
      productos: null,
      selectedCategoria: null,
      currentPage: 1,
      pageSize: 6,
      mostrarExportar: false,
    };
  },
  mounted() {
    this.mostrar();
  },
  computed: {

    totalPages() {
      if (!this.categorias) return 0;
      return Math.ceil(this.categorias.length / this.pageSize);
    },

    paginated() {
      if (!this.categorias) return null;

      const sortedcategorias = this.categorias.slice().reverse();

      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return sortedcategorias.slice(startIndex, endIndex);
    },
  },
  methods: {
    goToPage(page) {
      if (page < 1) page = 1;
      if (page > this.totalPages) page = this.totalPages;
      this.currentPage = page;
    },
    mostrar() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_CATEGORIAS}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.categorias = data;
          console.log(this.categorias);
        })
        .catch(error => console.log(error));
    },
    obtenerIDCategoria(categoria) {
      const id = categoria.idCategoria;
      this.selectedCategoria = categoria;
      const url = `${API_URL}/${ENDPOINT_LISTAR_PRODUCTO_POR_CATEGORIA}/${id}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.productos = data;
          console.log(this.productos);
        })
        .catch(error => console.log(error));
    },
    buscarCategoria(termino) {
      const url = `${API_URL}/${ENDPOINT_BUSCAR_CATEGORIA}?nombre=${termino}`;

      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error en la solicitud.");
          }
        })
        .then(data => {
          this.categorias = data;
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
    exportToExcel() {
      // Crear una nueva matriz de objetos solo con las propiedades deseadas
      const exportData = this.productos.map(producto => ({
        'Número de serie': producto.numeroDeSerie,
        'Nombre': producto.nombre,
        'Cantidad': producto.cantidad,
      }));

      // Crear el libro de Excel y la hoja de cálculo
      const wb = XLSX.utils.book_new();

      // Definir la configuración de la hoja de cálculo con nombres personalizados
      const wsConfig = {
        header: ['Número de serie', 'Nombre', 'Cantidad'],
      };

      const ws = XLSX.utils.json_to_sheet(exportData, wsConfig);

      // Añade la hoja al libro
      XLSX.utils.book_append_sheet(wb, ws, 'Productos');

      // Guarda el libro como un archivo Excel
      XLSX.writeFile(wb, 'productos.xlsx');
    },

  },

};
</script>

<style scoped>
.boton-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
