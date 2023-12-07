<template>
    <section class="container-fluid">
        <div>
            <div class="row">
                <div class="col-2 m-0 p-0 bg-dark">
                    <Nvar />
                </div>
                <div class="col-10 m-0 p-0">
                    <section class="container-fluid">
                        <div class="row">
                            <div class="col-7 mt-5 tablaP">
                                <div class="row">
                                    <div class="col-6">
                                        <h1 class="h1 m-3">Usuarios</h1>
                                    </div>
                                    <div class="col-2 mt-4">
                                        <button @click="mostrar()" class="btn m-1 btn-warning">
                                            <font-awesome-icon :icon="['fas', 'sync-alt']" />
                                        </button>
                                    </div>
                                    <div class="col-4 mt-4">
                                        <BusquedaGeneral @busqueda="buscarUsuario" />
                                    </div>
                                </div>
                                <tabla v-if="paginated" :type="type" :data="paginated" :fields="['nombre', 'correo']"
                                    :eliminar="eliminar">
                                    <template #default="{ item }">
                                        <button @click="eliminarUsuario(item.idUsuario)" class="btn m-1 btn-danger">
                                            <font-awesome-icon :icon="['fas', 'trash']" />
                                        </button>
                                        <button @click="mostrarEdicion(item)" class="btn m-1 btn-warning">
                                            <font-awesome-icon :icon="['fas', 'edit']" />
                                        </button>
                                        <button @click="mostrarInformacion(item)" class="btn m-1 btn-primary">
                                            <font-awesome-icon :icon="['fas', 'eye']" />
                                        </button>
                                    </template>
                                </tabla>
                                <!-- Botones de navegación -->
                                <div class="pagination-buttons boton-container">
                                    <button @click="goToPage(currentPage - 1)" class="btn btn-info"
                                        :disabled="currentPage === 1">Anterior</button>
                                    <button @click="goToPage(currentPage + 1)" class="btn btn-info"
                                        :disabled="currentPage === totalPages">Siguiente</button>
                                </div>
                            </div>
                            <div class="col-4 m-1">
                                <div class="formulario">
                                    <h3>Agregar Usuario</h3>

                                    <FormularioGeneral ref="formularioGeneral" :campos="camposUsuario"
                                        :textoBoton="textoBotonSubcategoria" @formulario-enviado="agregarUsuario" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <ModalSuccess :message="successMessage" ref="modalSuccess" />

        <ModalError :message="errorMessage" ref="modalError" />

        <ModalEditar :titulo="TituloEditar" :camposMostrados="camposMostrados" :objeto="objetoEditar" :id="id"
            @guardar-cambios="editarUsuario" ref="modalEditar" />

        <ModalInformacion :titulo="TituloVer" :camposMostrados="camposMostrados" :objeto="objetoEditar" :id="id"
            ref="modalVer" />
    </section>
</template>

<style scoped>
.boton-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.formulario {
    background: white;
    padding: 20px;
    margin-top: 100px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    height: 55vh;
    border-radius: 10px;
    width: 100%;
}

.tablaP {
    margin-left: 10px;
    margin-right: 40px;
}
</style>

<script>
import tabla from '../components/tablainformacion.vue';
import Nvar from '../components/Nvar';
import {
    API_URL, ENDPOINT_LISTAR_USUARIOS, ENDPOINT_AGREGAR_USUARIO, ENDPOINT_CONSULTAR_USUARIO,
    ENDPOINT_ELIMINAR_USUARIO, ENDPOINT_EDITAR_USUARIO, ENDPOINT_BUSCAR_USUARIO, ENDPOINT_AGREGAR_MOVIMIENTO
} from '../keys';
import FormularioGeneral from '@/components/FormularioGeneral.vue';
import ModalSuccess from '@/components/ModalSuccess.vue';
import ModalError from '@/components/ModalError.vue';
import ModalEditar from '@/components/ModalEditar.vue';
import ModalInformacion from '@/components/ModalInformacion.vue';
import BusquedaGeneral from '@/components/BusquedaGeneral.vue';

export default {
    name: 'InicioSubcategoria',
    components: {
        tabla,
        Nvar,
        FormularioGeneral,
        ModalSuccess,
        ModalError,
        ModalEditar,
        ModalInformacion,
        BusquedaGeneral,
    },
    data() {
        return {
            usuarios: null,
            type: 'usuario',
            camposUsuario: [
                { id: 'nombre', label: 'Nombre Completo', nombre: 'nombre', type: 'text', valor: '', required: true },
                // { id: 'apellidoPaterno', label: 'Primer Apellido', nombre: 'apellidoPaterno', type: 'text', valor: '', required: true },
                // { id: 'apellidoMaterno', label: 'Segundo Apellido', nombre: 'apellidoMaterno', type: 'text', valor: '', required: true },
                { id: 'correo', label: 'Correo', nombre: 'correo', type: 'text', valor: '', required: true },
                { id: 'contraseña', label: 'Contraseña', nombre: 'contraseña', type: 'text', valor: '', required: true },
                {
                    id: 'puesto',
                    label: 'Permisos',
                    nombre: 'puesto',
                    type: 'select',
                    valor: '',
                    required: true,
                    opciones: [
                        { valor: '1', etiqueta: 'Administrativo del Sistema' },
                        { valor: '2', etiqueta: 'Administrativo' },
                        { valor: '3', etiqueta: 'Sin permisos' },
                    ],
                },],
            textoBotonSubcategoria: 'Agregar Usuario',
            successMessage: '',
            errorMessage: '',
            TituloEditar: 'Editar Usuario',
            objetoEditar: {
                idUsuario: '',
                nombre: '',
                // apellidoPaterno: '',
                // apellidoMaterno: '',
                correo: '',
                contraseña: '',
                puesto: '',
            },
            camposMostrados: [
                'nombre',
                // 'apellidoPaterno',
                // 'apellidoMaterno',
                'correo',
                'puesto'

            ],
            id: 'idUsuario',
            TituloVer: 'Información del Usuario',
            currentPage: 1,
            pageSize: 6,
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
            if (!this.usuarios) return 0;
            return Math.ceil(this.usuarios.length / this.pageSize);
        },
        // The above code is a method in a Vue component that is used for pagination.
        paginated() {
            if (!this.usuarios) return null;

            const sortedusuarios = this.usuarios.slice().reverse();

            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            return sortedusuarios.slice(startIndex, endIndex);
        },
    },
    methods: {
        // The above code is defining a method called "goToPage" in a Vue component. This method takes a
        // parameter called "page" and is used to navigate to a specific page.
        goToPage(page) {
            if (page < 1) page = 1;
            if (page > this.totalPages) page = this.totalPages;
            this.currentPage = page;
        },
        mostrar() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_USUARIOS}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
                    console.log(this.usuarios);
                })
                .catch(error => console.log(error));
        },
        buscarUsuario(termino) {
            const url = `${API_URL}/${ENDPOINT_BUSCAR_USUARIO}?nombre=${termino}`;

            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Error en la solicitud.");
                    }
                })
                .then(data => {
                    this.usuarios = data;
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        },
        buscarUsuarioID(id) {
            const url = `${API_URL}/${ENDPOINT_CONSULTAR_USUARIO}/${id}`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                })
                .then(usuario => {
                    this.registroDeMovimientos(`Usuario ${usuario.nombre} eliminado`);
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
        },
        eliminarUsuario(id) {
            console.log(id);
            if (!id) {
                this.errorMessage = 'Surgio un problema con el ID';
                this.$refs.modalError.openModal();
                return;
            }

            const url = `${API_URL}/${ENDPOINT_ELIMINAR_USUARIO}/${id}`;

            this.buscarUsuarioID(id);

            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.status === 200) {
                        this.successMessage = 'Usuario eliminado con éxito';
                        this.$refs.modalSuccess.openModal();
                        this.mostrar();
                    } else if (response.status === 404) {
                        this.errorMessage = 'Usuario no encontrado';
                        this.$refs.modalError.openModal();
                    } else {
                        this.errorMessage = 'Error al eliminar el usuario';
                        this.$refs.modalError.openModal();
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                    this.errorMessage = 'Error en la solicitud';
                    this.$refs.modalError.openModal();
                });
        },
        mostrarInformacion(datos) {
            this.objetoEditar = datos;

            this.$refs.modalVer.openModal();
        },
        mostrarEdicion(datos) {
            this.objetoEditar = datos;

            this.$refs.modalEditar.openModal();
        },
        editarUsuario(objetoModificado) {


            const objetoJSON = JSON.stringify(objetoModificado);

            if (!objetoModificado.nombre) {
                this.errorMessage = 'El campo nombre no puede estar vacio';
                this.$refs.modalError.openModal();
                this.mostrar();
            } else {

                const url = `${API_URL}/${ENDPOINT_EDITAR_USUARIO}`;

                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: objetoJSON,
                })
                    .then(response => {
                        if (response.status === 200) {
                            this.successMessage = 'Usuario editado con éxito';
                            this.registroDeMovimientos(`Usuario ${objetoModificado.nombre} editado`);
                            this.$refs.modalSuccess.openModal();
                            this.mostrar();
                        }
                        else {
                            if (response.status === 400) {
                                this.errorMessage = 'Surgio un problema con la edición';
                                this.$refs.modalError.openModal();
                            } else {
                                this.errorMessage = 'Error al editar el Usuario';
                                this.$refs.modalError.openModal();
                            }
                        }
                    })
                    .catch(error => {
                        this.errorMessage = 'Error en la solicitud';
                        this.$refs.modalError.openModal();
                    });
            }

        },

        agregarUsuario(datos) {
            const url = `${API_URL}/${ENDPOINT_AGREGAR_USUARIO}`;

            const nuevoJSON = {};

            for (const campo of datos) {
                nuevoJSON[campo.id] = campo.valor;
            }

            nuevoJSON.apellidoMaterno='vacio';
            nuevoJSON.apellidoPaterno='vacio';


            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoJSON),
            })
                .then(response => {
                    if (response.status === 201) {
                        this.successMessage = 'Usuario agregado con éxito';
                        this.registroDeMovimientos(`Usuario ${nuevoJSON.nombre} agregado`);
                        this.$refs.modalSuccess.openModal();
                        this.mostrar();
                    }
                    else {
                        if (response.status === 409) {
                            this.errorMessage = 'El Correo ya existe y no se pueden repetir';
                            this.$refs.modalError.openModal();
                        } else {
                            this.errorMessage = 'Error al agregar el Usuario';
                            this.$refs.modalError.openModal();
                        }
                    }
                })
                .catch(error => {
                    this.errorMessage = 'Error en la solicitud';
                    this.$refs.modalError.openModal();
                });
        },
        registroDeMovimientos(mensaje) {
            const idUsuario = this.$store.state.auth.userId;

            const JSONmovimientos = {
                "tipoMovimiento": mensaje,
                "encargado": idUsuario,
                "fechaDeMovimiento": null
            };

            const url = `${API_URL}/${ENDPOINT_AGREGAR_MOVIMIENTO}`;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(JSONmovimientos),
            })
                .then(response => {
                    if (response.status === 201) {
                        this.mostrar();
                    }
                    else {
                        if (response.status === 409) {
                            this.errorMessage = 'Error al agregar el movimiento';
                            this.$refs.modalError.openModal();
                        }
                    }
                })
                .catch(error => {
                    this.errorMessage = 'Error en la solicitud';
                });

        },
    },
};
</script>
