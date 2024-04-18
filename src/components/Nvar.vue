<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark m-0">
    <button class="navbar-toggler" type="button" @click="toggleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" :class="{ 'show': isNavbarOpen }">
      <ul class="navbar-nav flex-column">
        <li class="nav-item m-3">
          <a class="navbar-brand titulo" href="#">Almacén</a>
        </li>
        <router-link to="/dashboard" class="nav-link opciones" v-if="mostrarCampos">
          <font-awesome-icon :icon="['fas', 'home']" />
          Inicio
        </router-link>
        <router-link to="/principalProducto" class="nav-link opciones">
          <font-awesome-icon :icon="['fas', 'store']" />
          Productos
        </router-link>
        <router-link to="/principalProveedor" class="nav-link opciones" v-if="mostrarCampos">
          <font-awesome-icon :icon="['fas', 'user-tie']" />
          Proveedores
        </router-link>
        <router-link to="/principalCategorias" class="nav-link opciones" v-if="mostrarCampos">
          <font-awesome-icon :icon="['fas', 'th-large']" />
          Categorías
        </router-link>
        <router-link to="/principalSubcategoria" class="nav-link opciones" v-if="mostrarCampos">
          <font-awesome-icon :icon="['fas', 'th-list']" />
          Subcategorías
        </router-link>
        <router-link to="/principalReportes" class="nav-link opciones" v-if="mostrarCampos">
          <font-awesome-icon :icon="['fas', 'book']" />
          Reportes
        </router-link>
        <router-link to="/principalInventario" class="nav-link opciones" v-if="mostrarCampos">
          <font-awesome-icon :icon="['fas', 'warehouse']" />
          Inventario
        </router-link>
        <router-link to="/principalUsuario" class="nav-link opciones" v-if="mostrarUsuario">
          <font-awesome-icon :icon="['fas', 'users']" />
          Usuarios
        </router-link>
        <router-link to="/principalMovimientos" class="nav-link opciones" v-if="mostrarUsuario">
          <font-awesome-icon :icon="['fas', 'warehouse']" />
          Movimientos
        </router-link>
        <router-link to="/" class="nav-link opciones salida">
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
          Salida
        </router-link>
      </ul>
    </div>
  </nav>
</template>
  
<script>
import NvarScript from './NvarScript';
export default {
  ...NvarScript,
};
</script>
  
<style scoped>
/* Estilos CSS específicos del componente */
/* Estilos CSS específicos del componente */

.bg-color {
  background-color: #0056FF; /* Cambiar al color deseado */
}

.opciones:hover {
  background: #5F5B5B;
}

.navbar-dark .navbar-toggler-icon {
  color: white;
  /* Color del ícono del botón de navegación */
}

.navbar-dark .navbar-nav .nav-link {
  color: white;
  /* Color del texto del enlace */
}

.navbar-dark .navbar-brand {
  padding-left: 0;
  /* Elimina el espacio izquierdo en el título */
  margin-bottom: 10px;
  /* Añade espacio entre el título y los enlaces */
}

.navbar-dark .navbar-collapse {
  padding-left: 0;
  /* Elimina el espacio izquierdo en el menú desplegable */
}

.navbar-dark .navbar-nav .nav-item {
  width: 100%;
  /* Ancho completo para cada elemento del menú */
}

.navbar-dark .navbar-nav {
  width: 100%;
  height: 98vh;
}

.salida {
  margin-top: auto;
  /* Empuja la opción de "Salida" hacia la parte inferior */
}
@media (max-width: 767px) {
  .navbar-nav.flex-column {
    align-items: center;
  }
  .titulo {
    display: block; /* Muestra el título */
    text-align: center;
    margin: auto; /* Centra el título */
  }
  .navbar-dark .navbar-nav {
  width: 100%;
  height: 80vh;
}
}


</style>
  