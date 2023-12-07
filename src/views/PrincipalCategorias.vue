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
                            <div class="col-7 mt-5 tablaP">
                                <div class="row">
                                    <div class="col-6">
                                        <h1 class="h1 m-3">Categorías</h1>
                                    </div>
                                    <div class="col-2 mt-4">
                                        <button @click="mostrar()" class="btn m-1 btn-warning">
                                            <font-awesome-icon :icon="['fas', 'sync-alt']" />
                                        </button>
                                    </div>
                                    <div class="col-4 mt-4">
                                        <BusquedaGeneral @busqueda="buscarCategoria" />
                                    </div>
                                </div>
                                <tabla v-if="paginated" :type="type" :data="paginated" :fields="['nombre', 'nomenclatura']"
                                    :eliminar="eliminar">
                                    <template #default="{ item }">
                                        <button @click="eliminarCategoria(item.idCategoria)" class="btn m-1 btn-danger"
                                            v-if="permisos">
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
                                <!-- <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Nomanclatura</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="categoria in paginated" :key="categoria.idCategoria">
                                            <td>{{ categoria.nombre }}</td>
                                            <td>{{ categoria.nomenclatura }}</td>
                                            <td>
                                                <button @click="eliminarCategoria(categoria.idCategoria)" class="btn m-1 btn-danger"
                                            v-if="permisos">
                                            <font-awesome-icon :icon="['fas', 'trash']" />
                                        </button>
                                        <button @click="mostrarEdicion(categoria)" class="btn m-1 btn-warning">
                                            <font-awesome-icon :icon="['fas', 'edit']" />
                                        </button>
                                        <button @click="mostrarInformacion(categoria)" class="btn m-1 btn-primary">
                                            <font-awesome-icon :icon="['fas', 'eye']" />
                                        </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> -->
                                <!-- Botones de navegación -->
                                <div class="pagination-buttons boton-container">
                                    <button @click="goToPage(currentPage - 1)" class="btn btn-info"
                                        :disabled="currentPage === 1">Anterior</button>
                                    <button @click="goToPage(currentPage + 1)" class="btn btn-info"
                                        :disabled="currentPage === totalPages">Siguiente</button>
                                </div>
                            </div>
                            <div class="col-4 mt-4">
                                <div class="formulario">
                                    <h3>Agregar Categoría</h3>

                                    <FormularioGeneral ref="formularioGeneral" :campos="camposCategoria"
                                        :textoBoton="textoBotonCategoria" @formulario-enviado="agregarCategoria" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <!-- Modal de Éxito -->
        <ModalSuccess :message="successMessage" ref="modalSuccess" />

        <!-- Modal de Error -->
        <ModalError :message="errorMessage" ref="modalError" />

        <!-- Modal de Error -->
        <ModalEditar :titulo="TituloEditar" :camposMostrados="camposMostrados" :objeto="objetoEditar" :id="id"
            @guardar-cambios="editarCategoria" ref="modalEditar" />
        <!-- Modal de Informacion -->
        <ModalInformacion :titulo="TituloVer" :objeto="objetoEditar" :id="id" ref="modalVer" />
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
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    height: 27vh;
    border-radius: 10px;
    margin-top: 24%;
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
    API_URL, ENDPOINT_LISTAR_CATEGORIAS, ENDPOINT_AGREGAR_CATEGORIA, ENDPOINT_CONSULTAR_CATEGORIA,
    ENDPOINT_ELIMINAR_CATEGORIA, ENDPOINT_EDITAR_CATEGORIA, ENDPOINT_BUSCAR_CATEGORIA, ENDPOINT_AGREGAR_MOVIMIENTO
} from '../keys';
import FormularioGeneral from '@/components/FormularioGeneral.vue';
import ModalSuccess from '@/components/ModalSuccess.vue';
import ModalError from '@/components/ModalError.vue';
import ModalEditar from '@/components/ModalEditar.vue';
import ModalInformacion from '@/components/ModalInformacion.vue';
import BusquedaGeneral from '@/components/BusquedaGeneral.vue';

export default {
    name: 'InicioCategoria',
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
            categorias: null,
            type: 'categoria',
            camposCategoria: [
                { id: 'nombre', label: 'Nombre', nombre: 'nombre', type: 'text', valor: '', ayuda: 'Ingrese el nombre de la categoría', required: true },
            ],
            textoBotonCategoria: 'Agregar Categoría',
            successMessage: '',
            errorMessage: '',
            TituloEditar: 'Editar Categoría',
            objetoEditar: {
                idCategoria: '',
                nombre: '',
            },
            camposMostrados: ['nombre'],
            id: 'idCategoria',
            TituloVer: 'Información de la categoría',
            currentPage: 1,
            pageSize: 6,
            permisos: false,
        };
    },
    mounted() {
        this.mostrar();
        this.obtenerPermisos();
    },
    computed: {
        /**
         * Calculates the total number of pages needed to display all categories
         * @returns {number} The number of pages
         */
        totalPages() {
            // If there are no categories, return 0
            if (!this.categories) return 0;
            // Divide the number of categories by the page size and round up
            return Math.ceil(this.categories.length / this.pageSize);
        },

        /**
         * Returns an array of paginated and sorted categories in descending order
         * @returns {Array} The array of categories for the current page
         */
        paginated() {
            // If there are no categories, return null
            if (!this.categorias) return null;

            // Create a copy of the categories array and reverse the order
            const sortedCategorias = this.categorias.slice().reverse();

            // Calculate the start and end index of the current page
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            // Return a slice of the categories array that corresponds to the current page
            return sortedCategorias.slice(startIndex, endIndex);
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
            const url = `${API_URL}/${ENDPOINT_LISTAR_CATEGORIAS}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.categorias = data;
                    console.log(this.categorias);
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
        buscarCategoriaID(id) {
            const url = `${API_URL}/${ENDPOINT_CONSULTAR_CATEGORIA}/${id}`;

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
                .then(categoria => {
                    this.registroDeMovimientos(`Categoría ${categoria.nombre} eliminada`);
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
        },

        eliminarCategoria(id) {
            if (!id) {
                this.errorMessage = 'Surgió un problema con el ID';
                this.$refs.modalError.openModal();
                return;
            }

            const url = `${API_URL}/${ENDPOINT_ELIMINAR_CATEGORIA}/${id}`;

            this.buscarCategoriaID(id);


            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.status === 200) {
                        this.successMessage = 'Categoría eliminada con éxito';
                        this.$refs.modalSuccess.openModal();
                        this.mostrar();
                    } else if (response.status === 404) {
                        this.errorMessage = 'Categoría no encontrada';
                        this.$refs.modalError.openModal();
                    } else {
                        this.errorMessage = 'Error al eliminar la categoría';
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
        editarCategoria(objetoModificado) {

            const objetoJSON = JSON.stringify(objetoModificado);

            if (!objetoModificado.nombre || !objetoModificado.nomenclatura) {
                this.errorMessage = 'El campo nombre o nomenclatura no puede estar vacío';
                this.$refs.modalError.openModal();
                this.mostrar();
            } else {

                const url = `${API_URL}/${ENDPOINT_EDITAR_CATEGORIA}`;

                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: objetoJSON,
                })
                    .then(response => {
                        if (response.status === 200) {
                            this.successMessage = 'Categoría editada con éxito';
                            this.registroDeMovimientos(`Categoría ${objetoModificado.nombre} editada`);
                            this.$refs.modalSuccess.openModal();
                            this.mostrar();
                        }
                        else {
                            if (response.status === 400) {
                                this.errorMessage = 'Surgió un problema con la edición';
                                this.$refs.modalError.openModal();
                            } else {
                                this.errorMessage = 'Error al editar la categoría';
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

        agregarCategoria(datos) {
            const url = `${API_URL}/${ENDPOINT_AGREGAR_CATEGORIA}`;

            const nuevoJSON = {};

            for (const campo of datos) {
                nuevoJSON[campo.id] = campo.valor;
            }

            nuevoJSON.nomenclatura = 0;


            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoJSON),
            })
                .then(response => {
                    if (response.status === 201) {
                        this.successMessage = 'Categoría agregada con éxito';
                        this.registroDeMovimientos(`Categoría ${nuevoJSON.nombre} agregada`);
                        this.$refs.modalSuccess.openModal();
                        this.mostrar();
                    }
                    else {
                        if (response.status === 409) {
                            this.errorMessage = 'La categoría ya existe y no se pueden repetir';
                            this.$refs.modalError.openModal();
                        } else {
                            this.errorMessage = 'Error al agregar la categoría';
                            this.$refs.modalError.openModal();
                        }
                    }
                })
                .catch(error => {
                    this.errorMessage = 'Error en la solicitud';
                    this.$refs.modalError.openModal();
                });
        },
        obtenerPermisos() {
            const idUsuario = this.$store.state.auth.userId;

            if (idUsuario == 1) {
                this.permisos = true;
            }
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
