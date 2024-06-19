<template>
    <section class="container-fluid">
        <div>
            <div class="row">
                <Nvar />
            </div>
            <div class="row m-4">
                <div class="col-md-9">
                    <div class="row">
                        <div class="col-md-9 ">
                            <h1 class="titulo-seccion ">Usuarios</h1>
                        </div>
                        <hr>
                        <div class="col-md-12" v-if="usuarios.length > 0">
                            <table class="table table-striped justify-content-center text-center">
                                <thead>
                                    <tr class="table-active">
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Permisos</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="usuario in paginated" :key="usuario.idUsuario">
                                        <td>{{ usuario.nombre }}</td>
                                        <td>{{ usuario.correo }}</td>
                                        <td>{{ usuario.puestoEscrito }}</td>
                                        <td class="button-container">
                                            <button @click="abrirModalEdicion(usuario)"
                                                class="btn btn-warning btn-redondo">
                                                <font-awesome-icon :icon="['fas', 'edit']" />
                                            </button>
                                            <button @click="abrirModalInformacion(usuario)"
                                                class="btn btn-primary btn-redondo">
                                                <font-awesome-icon :icon="['fas', 'eye']" />
                                            </button>
                                            <button @click="eliminar(usuario)" class="btn btn-danger btn-redondo">
                                                <font-awesome-icon :icon="['fas', 'trash']" />
                                            </button>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- Botones de navegación -->
                            <div class="pagination-buttons boton-container">
                                <button @click="goToPage(currentPage - 1)" class="btn btn-secondary"
                                    :disabled="currentPage === 1">&lt;</button>
                                <button @click="goToPage(currentPage + 1)" class="btn btn-secondary"
                                    :disabled="currentPage === totalPages">&gt;</button>
                            </div>
                        </div>
                        <div class="col-md-9" v-else>
                            <h1 class="text-center">No hay ningún usuario registrado.</h1>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 agregar">
                    <h3>Agregar Usuario</h3>
                    <form @submit.prevent="guardarUsuario">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Nombre completo:</label>
                            <input class="form-control" type="text" aria-label="default input example"
                                v-model="nuevoUsuario.nombre" required>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Correo:</label>
                            <input type="email" class="form-control" id="exampleInputEmail1"
                                aria-describedby="emailHelp" v-model="nuevoUsuario.correo" required>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Contraseña:</label>
                            <input type="password" class="form-control" id="exampleInputPassword1"
                                v-model="nuevoUsuario.contraseña" required>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Puesto:</label>
                            <select class="form-select" aria-label="Default select example"
                                v-model="nuevoUsuario.puesto" required>
                                <option v-for="puesto in listaPuestos" :key="puesto.valor" :value="puesto.valor">
                                    {{ puesto.etiqueta }}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn col-12 btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </section>
    <EditarUsuario @guardar-cambios="editar" ref="EditarUsuario" />
    <InformacionUsuario ref="InformacionUsuario" />
</template>

<style scoped>
.formulario {
    background: white;
    padding: 20px;
    margin-top: 100px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    height: 55vh;
    border-radius: 10px;
    width: 100%;
}

.agregar {
    background: white;
    margin-top: 100px;
    margin-left: auto;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    height: 60vh;
    border-radius: 10px;
    width: 300px;
}

.titulo-seccion {
    font-size: 3.4rem;
    /* Puedes ajustar el tamaño según prefieras */
    margin: 1.2rem;
}

.boton-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    /* Espacio entre botones */
}

.btn {
    border-radius: 0;
    /* Esquinas en punta */
    margin-right: 27px;
    /* Separación de 27px */
    padding: 10px 20px;
    /* Espaciado interno del botón */
    text-align: center;
    /* Alineación del texto */
    display: inline-block;
    /* Asegura que los botones estén en línea */
    text-decoration: none;
    /* Elimina el subrayado de los enlaces */
    font-weight: bold;
    /* Texto en negritas */
    cursor: pointer;
    /* Cursor en forma de mano */
    font-size: 1rem
}

thead tr {
    font-size: 1.1rem;
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
</style>

<script>
import Nvar from '@/components/Nvar.vue';
import UsuariosViewScript from '@/views/Usuario/PrincipalUsuarioScript';
import EditarUsuario from '@/components/Usuario/EditarUsuario.vue';
import InformacionUsuario from '@/components/Usuario/InformacionUsuario.vue';

export default {
    ...UsuariosViewScript,
    components: {
        Nvar,
        EditarUsuario,
        InformacionUsuario
    }
};
</script>