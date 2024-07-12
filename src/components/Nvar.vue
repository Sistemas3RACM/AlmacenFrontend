<template>
  <nav class="navbar navbar-expand-lg navbar-dark general m-0 p-3">
    <div class="container-fluid">
      <!-- Título "Requisiciones" alineado a la izquierda -->
      <router-link to="/dashboard" class="navbar-brand titulo">
        Almacén
      </router-link>

      <!-- Elementos de navegación alineados a la derecha -->
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <!-- Enlaces de navegación -->
          <li class="nav-item">
            <router-link to="/principalProducto" class="nav-link">
              Productos
            </router-link>
          </li>
          <li class="nav-item" v-if="permisosAdmin != 3">
            <router-link to="/principalReportes" class="nav-link">
              Reportes
            </router-link>
          </li>
          <li class="nav-item dropdown" @mouseover="toggleDropdown(true)" @mouseleave="toggleDropdown(false)"
            v-if="permisosAdmin != 3">
            <a class="nav-link dropdown-toggle" href="#" role="button" aria-haspopup="true" aria-expanded="false">
              Administración
            </a>
            <div class="dropdown-menu" :class="{ show: isDropdownOpen }">
              <router-link to="/principalProveedor" class="dropdown-item"> Proveedores </router-link>
              <router-link to="/principalCategorias" class="dropdown-item">Categorías y Subcategorías</router-link>
              <router-link to="/principalUsuario" class="dropdown-item" v-if="permisosAdmin == 1">Usuarios</router-link>
              <router-link to="/principalMovimientos" class="dropdown-item"
                v-if="permisosAdmin == 1">Movimientos</router-link>
            </div>
          </li>

          <li class="nav-item">
            <a class="btn boton-salir" @click="logout">
              <strong>Salir</strong>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import NvarScript from './NvarScript';
export default {
  name: 'NvarComponent',
  ...NvarScript,
};
</script>

<style scoped>
.general {
  background-color: #B64040;
}

.titulo {
  font-size: 1.4rem;
  color: white;
  text-decoration: none;
}

.navbar-nav {
  margin-left: auto;
}

.nav-link {
  color: white !important;
  font-size: 1.2rem;
  margin-right: 1rem;
}

.nav-link:hover {
  color: #cecece !important;
}

.dropdown-menu {
  display: none;
}

.dropdown-menu.show {
  display: block;
}

.boton-salir {
  background-color: #ffff;
}
</style>
