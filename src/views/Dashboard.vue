<template>
  <section class="container-fluid">
    <div>
      <div class="row">
        <div class="col-12 col-md-2 m-0 p-0">
          <Nvar />
        </div>
        <div class="col-12 col-md-10">
          <h1 class="col-sm-12 Titulo">Estado de Almacén</h1>
          <div class="col-sm-12 informacion">
            <p>{{ fechaYHora }}</p>
          </div>
          <div class="row">
            <div class="col-sm-4 dineroT">
              <DineroEntradas />
            </div>
            <div class="col-sm-4 productoT">
              <ProductosTotales />
            </div>
            <div class="col-sm-4 seleccion">
              <label for="categoriaSeleccionada" class="categoriasD grande">Informacion por categoría</label>
              <select v-model="categoriaSeleccionada" @change="categoriaselect" id="categoriaSeleccionada"
                class="form-select centrado">
                <option value="" disabled selected>Categorías disponibles</option>
                <option v-for="categoria in categorias" :key="categoria.idCategoria" :value="categoria.idCategoria">
                  {{ categoria.nombre }}
                </option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-md-9">
              <div class="row">
                <div class="col-md-5 dineroCategoria">
                  <DineroPorCategoria :categoriaSeleccionada="idCategoriaS" :nombreCategoria="nombreCategoria" />
                </div>
                <div class="col-md-4 menosCantidad">
                  <MenosCantidadPorCategoria :categoriaSeleccionada="idCategoriaS" :nombreCategoria="nombreCategoria" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 dineroCategoria">
                  <TotalProductosCategoria :categoriaSeleccionada="idCategoriaS" :nombreCategoria="nombreCategoria" />
                </div>
                <div class="col-md-6 logo">
                  <img src="../assets/logo3R.png" alt="Logo">
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="row">
                <div class="col-md-12 inventario">
                  <AlertaInventario />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.Titulo {
  text-align: center;
  size: 30px;
  margin: 15px;
}

.cont {
  background-color: aqua;
}

.informacion {
  text-align: center;
  size: 50px;
  margin: 10px;
}

.dineroT {
  width: 350px;
}

.productoT {
  width: 450px;

}

.inventario {
  width: 280px;
}

.seleccion {
  width: 250px;
  text-align: center;

  /* Agregado para centrar horizontalmente */
}

.categoriasD {
  display: block;
  margin-bottom: 5px;
}

.dineroCategoria {
  width: 350px;
  margin-top: 15px;
}

.menosCantidad {
  width: 450px;
  margin-top: 15px;
}
.logo{
  margin: 10px;
  width: 50%;
  margin-left: auto; 
}

.grande {
  font-size: 17px;
  /* Ajusta el tamaño del texto según tus necesidades */
}

@media (max-width: 767px) {
  .dineroT {
    width: 99%;
  }

  .productoT {
    width: 99%;
  }

  .inventario {
    width: 99%;
    display: none;
  }

  .seleccion {
    width: 99%;
    margin-top: 15px;
  }
  .logo{
    margin-left: 10px;
  }

}
</style>

<script>
import Nvar from '@/components/Nvar.vue';
import GraficoProductos from '@/components/GraficoProductos'
import GraficoCategorias from '@/components/GraficoCategorias.vue';
import DineroPorCategoria from '@/components/DineroPorCategoria'
import MenosCantidadPorCategoria from '@/components/MenosCantidadPorCategoria'
import DineroEntradas from '@/components/DineroEntradas.vue';
import ProductosTotales from '@/components/ProductosTotales.vue';
import AlertaInventario from '@/components/AlertaInventario.vue';
import { API_URL, ENDPOINT_LISTAR_CATEGORIAS, } from '@/keys';
import TotalProductosCategoria from '@/components/TotalProductosCategoria.vue';

export default {
  name: 'Dashboard',
  components: {
    Nvar,
    GraficoProductos,
    GraficoCategorias,
    DineroPorCategoria,
    MenosCantidadPorCategoria,
    DineroEntradas,
    ProductosTotales,
    AlertaInventario,
    TotalProductosCategoria,
  },
  data() {
    return {
      fechaYHora: "",
      categorias: [],
      categoriaSeleccionada: null,
      idCategoriaS: 0,
      nombreCategoria: '',
    };
  },
  methods: {
    async handleLogout() {
      try {
        this.$store.dispatch('auth/logout');
        this.$router.push("/");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    },
    obtenerFecha() {
      var fechaYHoraActual = new Date();
      var options = {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
      };
      var formatoFechaYHora = fechaYHoraActual.toLocaleString('es-ES', options);
      this.fechaYHora = formatoFechaYHora;
    },
    obtenerCategoriasDisponibles() {
      const url = `${API_URL}/${ENDPOINT_LISTAR_CATEGORIAS}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.categorias = data;
        })
        .catch(error => {
          console.error('Error al obtener categorías:', error);
        });
    },
    categoriaselect() {
      // Verifica si se ha seleccionado una categoría
      if (this.categoriaSeleccionada) {
        // Encuentra la información de la categoría seleccionada
        const categoriaSeleccionadaData = this.categorias.find(categoria => categoria.idCategoria === this.categoriaSeleccionada);
        this.idCategoriaS = categoriaSeleccionadaData.idCategoria;
        this.nombreCategoria = categoriaSeleccionadaData.nombre;
      } else {
        // Si no se ha seleccionado ninguna categoría, muestra un mensaje o realiza alguna acción apropiada
        console.log('Ninguna categoría seleccionada');
      }
    },
  },
  mounted() {
    this.obtenerFecha();
    this.obtenerCategoriasDisponibles();
    setInterval(() => {
      this.obtenerFecha();
    }, 20000);
  },
}
</script>
