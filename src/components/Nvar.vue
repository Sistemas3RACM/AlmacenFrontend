<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark m-0">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav flex-column"> <!-- Utiliza la clase flex-column para hacerlo vertical -->
                <li class="nav-item m-3">
                    <a class="navbar-brand" href="#">Almacen</a>
                </li>
                <li class="nav-item opciones">
                    <a class="nav-link active" aria-current="page" href="#">
                        <font-awesome-icon :icon="['fas', 'home']" />
                        Inicio</a>
                </li>
                <li class="nav-item opciones">
                    <a class="nav-link" href="#">
                        <font-awesome-icon :icon="['fas', 'store']" />
                        Productos</a>
                </li>
                <router-link to="/principalProveedor" class="nav-link opciones">
                    <font-awesome-icon :icon="['fas', 'user-tie']" />
                    Proveedores
                </router-link>
                <li class="nav-item opciones">
                    <a class="nav-link" href="#">
                        <font-awesome-icon :icon="['fas', 'th-large']" />
                        Categorias</a>
                </li>
                <li class="nav-item opciones">
                    <a class="nav-link" href="#">
                        <font-awesome-icon :icon="['fas', 'th-list']" />
                        Subcategorias</a>
                </li>
                <li class="nav-item opciones">
                    <a class="nav-link" href="#">
                        <font-awesome-icon :icon="['fas', 'users']" />
                        Usuarios</a>
                </li>
                <li class="nav-item opciones">
                    <a class="nav-link" href="#">
                        <font-awesome-icon :icon="['fas', 'book']" />
                        Reportes</a>
                </li>
                <li class="nav-item opciones">
                    <a class="nav-link" href="#">
                        <font-awesome-icon :icon="['fas', 'warehouse']" />
                        Inventario</a>
                </li>
                <router-link to="/" class="nav-link opciones salida">
                    <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
                    Salida
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<script>

export default {
    components: {
    },  
    methods: {
    logout() {
      this.$emit("logoutClicked"); // Emitir un evento cuando se hace clic en "Salida"
    },
  },
};
</script>

<style>
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
    /* Ancho completo para el menú */
    height: 98vh;
}

.salida {
    margin-top: auto;
    /* Empuja la opción de "Salida" hacia la parte inferior */

}
</style>
