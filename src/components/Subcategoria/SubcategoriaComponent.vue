<template>
    <div class="row">
        <div class="col-md-5 ">
            <h1 class="titulo-seccion ">Subcategorías</h1>
        </div>
        <div class="col-md-7 d-flex justify-content-end">
            <a class="btn btn-success botonAgregar m-auto" @click="abrirAgregar">+</a>
        </div>
    </div>
    <hr>
    <div class="col-md-12 " v-if="subcategorias.length > 0">
        <table class="table table-striped justify-content-center text-center">
            <thead>
                <tr class="table-active">
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="subcategoria in paginated" :key="subcategoria.idSubcategoria">
                    <td>{{ subcategoria.nombre }}</td>
                    <td>{{ subcategoria.categoriaAsignada }}</td>
                    <td class="button-container">
                        <button @click="abrirModalEdicion(subcategoria)" class="btn btn-warning btn-redondo">
                            <font-awesome-icon :icon="['fas', 'edit']" />
                        </button>
                        <button @click="abrirModalInformacion(subcategoria)" class="btn btn-primary btn-redondo">
                            <font-awesome-icon :icon="['fas', 'eye']" />
                        </button>
                        <button v-if="!subcategoria.existeProducto" @click="eliminar(subcategoria)" class="btn btn-danger btn-redondo">
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </button>

                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Botones de navegación -->
        <div class="pagination-buttons boton-container">
            <button @click="goToPage(currentPage - 1)" class="btn btn-secondary botonAgregar"
                :disabled="currentPage === 1">&lt;</button>
            <button @click="goToPage(currentPage + 1)" class="btn btn-secondary botonAgregar"
                :disabled="currentPage === totalPages">&gt;</button>
        </div>
    </div>
    <div v-else>
        <h1 class="text-center">No hay ninguna subcategoría.</h1>
    </div>
</template>
<script>
import SubcategoriaComponent from './SubcategoriaComponent.js';

export default {
    ...SubcategoriaComponent,
};
</script>
<style scoped>
.agregar {
    background: white;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    width: 30%;
    /* Ancho del 80% de la pantalla */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    /* Asegura que esté al frente de todo */
}

.titulo-seccion {
    font-size: 3.4rem;
    /* Puedes ajustar el tamaño según prefieras */
    margin: 1.2rem;
}

.btn-redondo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    /* Espacio entre botones */
}

.botonAgregar {
    border-radius: 0;
    font-size: 1.5rem;
    width: 3rem;
    height: 3rem;
}

.boton-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}
</style>