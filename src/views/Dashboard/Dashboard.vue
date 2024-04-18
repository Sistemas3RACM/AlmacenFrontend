<template>
  <section class="container-fluid">
    <div>
      <div class="row">
        <div class="col-12 col-md-2 m-0 p-0">
          <Nvar />
        </div>
        <div class="col-12 col-md-10">
          <div class="container">
            <div class="row">
              <div class="col-sm-2 mt-3 inventario">
                <h6>Proximo inventario</h6>
                <h6><b>{{ proximaFecha }}</b></h6>
                <a class="btn btn-primary" @click="abrirModalInventario">Ver información</a>
              </div>
              <div class="col-sm-5">
                <h1 class="Titulo">Estado de Almacén</h1>
                <div class="informacion">
                  <p>{{ fechaYHora }}</p>
                </div>
              </div>
              <div class="col-lg-5 d-flex justify-content-end align-items-start logoDiv">
                <div class="logo">
                  <img src="../../assets/logo3R.png" alt="Logo">
                </div>
              </div>
            </div>
            <hr>
          </div>
          <div class="row mb-3 d-flex justify-content-center align-items-center">
            <div class="col-sm-4">
              <label for="categoriaSeleccionada" class="categoriasD grande">Información por cuenta de cargo</label>
              <select v-model="cuentaSeleccionada" @change="cambiarSeleccion" id="categoriaSeleccionada"
                class="form-select centrado">
                <option value="" disabled selected>Cuentas disponibles</option>
                <option v-for="cuenta in cuentas" :key="cuenta.idCuenta" :value="cuenta">
                  {{ cuenta.nombreCuenta }}
                </option>
              </select>
            </div>
            <div class="col-sm-4 seleccion">
              <label for="categoriaSeleccionada" class="categoriasD grande">Información por categoría</label>
              <select v-model="categoriaSeleccionada" @change="cambiarSeleccion" id="categoriaSeleccionada"
                class="form-select centrado">
                <option value="" disabled selected>Categorías disponibles</option>
                <option v-for="categoria in categorias" :key="categoria.idCategoria" :value="categoria">
                  {{ categoria.nombre }}
                </option>
              </select>
            </div>
          </div>
          <div class="row d-flex justify-content-center align-items-center">
            <div class="col dineroT">
              <DineroEntradas :cuenta="cuentaSeleccionada" :productos="productosTotales" ref="dineroEntradas" />
            </div>
            <div class="col productoT">
              <ProductosTotales :cuenta="cuentaSeleccionada" :productos="productosTotales" ref="productosTotales" />
            </div>
          </div>
          <div class="row d-flex justify-content-center align-items-center">
            <div class="col">
              <div class="row">
                <div class="col dineroCategoria">
                  <DineroPorCategoria :Categoria="categoriaSeleccionada" :productos="productosActuales"
                    ref="dineroPorCategoria" />
                </div>
                <!-- <div class="col-md-4 menosCantidad">
                  <MenosCantidadPorCategoria :Categoria="categoriaSeleccionada" :productos="productosActuales"  ref="menosPorCategoria"/>
                </div> -->
                <div class="col dineroCategoria">
                  <TotalProductosCategoria :Categoria="categoriaSeleccionada" :productos="productosActuales"
                    ref="totalProductosCategoria" />
                </div>
              </div>
              <div class="row">
              </div>
            </div>
            <!-- <div class="col-md-3">
              <div class="row">
                <div class="col-md-12 inventario">
                  <AlertaInventario />
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <ModalInventario :ultimaFechaInventario="ultimaFecha" :proximaFechaInventario="proximaFecha" :registro="existeFecha"
    ref="modalInventario" @cargar-pagina="openScreen" />
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

.logo-container {
  position: relative;
  /* Establece el contenedor como relativo */
}

.logo {
  position: absolute;
  top: 15px;
  /* Distancia desde la parte superior del contenedor */
  right: 20px;
  /* Distancia desde el lado derecho del contenedor */
}

.logo img {
  width: 200px;
  /* Establece el ancho de la imagen */
  height: auto;
  /* Ajusta la altura automáticamente para mantener la proporción */
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

  .logo img {
    width: 99%;
    display: none;
  }

  .seleccion {
    width: 99%;
    margin-top: 15px;
  }

  .logo {
    margin-left: 10px;
  }

}
</style>

<script>
import Nvar from '@/components/Nvar.vue';
import GraficoProductos from '@/components/GraficoProductos'
import GraficoCategorias from '@/components/GraficoCategorias.vue';
import DineroPorCategoria from '@/components/Dashboard/DineroPorCategoria'
import MenosCantidadPorCategoria from '@/components/Dashboard/MenosCantidadPorCategoria'
import DineroEntradas from '@/components/Dashboard/DineroEntradas.vue';
import ProductosTotales from '@/components/Dashboard/ProductosTotales.vue';
import AlertaInventario from '@/components/Dashboard/AlertaInventario.vue';
import TotalProductosCategoria from '@/components/Dashboard/TotalProductosCategoria.vue';
import DashboardScript from './DashboardScript';
import ModalInventario from '@/components/Dashboard/ModalInventario.vue';

export default {
  ...DashboardScript,
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
    ModalInventario,
  },
}
</script>
