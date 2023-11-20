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
                    Categorias
                </router-link>
                <router-link to="/principalSubcategoria" class="nav-link opciones" v-if="mostrarCampos">
                    <font-awesome-icon :icon="['fas', 'th-list']" />
                    Subcategorias
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

export default {
    components: {
    },
    data() {
        return {
            mostrarUsuario: false,
            mostrarCampos: false,
        }
    },
    mounted() {
        this.esAdministrador();
    },
    methods: {
        logout() {
            this.$emit("logoutClicked");
        },
        esAdministrador() {
            const admin = this.$store.state.auth.userAdmin;


            if (admin === 1) {
                this.mostrarCampos = true;
                this.mostrarUsuario = true; // Muestra el enlace Usuarios
            } else if (admin === 2) {
                // Mostrar todos los campos excepto el de Usuarios
                this.mostrarCampos = true;
                this.mostrarUsuario = false; // Oculta el enlace Usuarios
            }

        }
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
