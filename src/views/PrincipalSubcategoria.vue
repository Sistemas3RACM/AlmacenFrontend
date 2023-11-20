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
                                        <h1 class="h1 m-3">Subcategorias</h1>
                                    </div>
                                    <div class="col-2 mt-4">
                                        <button @click="mostrar()" class="btn m-1 btn-warning">
                                            <font-awesome-icon :icon="['fas', 'sync-alt']" />
                                        </button>
                                    </div>
                                    <div class="col-4 mt-4">
                                        <BusquedaGeneral @busqueda="buscarSubcategoria" />
                                    </div>
                                </div>
                                <tabla v-if="paginated" :type="type" :data="paginated" :fields="['nombre', 'nomenclatura']"
                                    :eliminar="eliminar">
                                    <template #default="{ item }">
                                        <button @click="eliminarSubcategoria(item.idSubcategoria)"
                                            class="btn m-1 btn-danger" v-if="permisos">
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
                            <div class="col-4 mt-4">
                                <div class="formulario">
                                    <h3>Agregar Subcategoria</h3>

                                    <FormularioGeneral ref="formularioGeneral" :campos="camposSubcategoria"
                                        :textoBoton="textoBotonSubcategoria" @formulario-enviado="agregarSubcategoria" />
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
        <ModalEditar :titulo="TituloEditar" :categoriaOptions="categoriasDisponibles" :camposMostrados="camposMostrados"
            :objeto="objetoEditar" :id="id" @guardar-cambios="editarSubcategoria" ref="modalEditar" />

        <ModalInformacion :titulo="TituloVer" :categoriaOptions="categoriasDisponibles" :objeto="objetoEditar" :id="id"
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
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    height: 40vh;
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
    API_URL, ENDPOINT_LISTAR_SUBCATEGORIAS, ENDPOINT_AGREGAR_SUBCATEGORIA,ENDPOINT_AGREGAR_MOVIMIENTO,
    ENDPOINT_ELIMINAR_SUBCATEGORIA, ENDPOINT_EDITAR_SUBCATEGORIA, ENDPOINT_BUSCAR_SUBCATEGORIA, ENDPOINT_LISTAR_CATEGORIAS, ENDPOINT_CONSULTAR_SUBCATEGORIA
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
            subcategorias: null,
            type: 'subcategoria',
            camposSubcategoria: [
                { id: 'nombre', label: 'Nombre', nombre: 'nombre', type: 'text', valor: '', ayuda: 'Ingrese el nombre de la Subcategoria', required: true },
                { id: 'nomenclatura', label: 'Nomenclatura', nombre: 'nomenclatura', type: 'number', valor: '0', ayuda: 'Ingrese la Nomenclatura deseada', hidden: true },
                {
                    id: 'idCategoria',
                    label: 'Categoria perteneciente',
                    nombre: 'idCategoria',
                    type: 'select',
                    valor: '',
                    ayuda: 'Seleccione la Categoria correspondiente',
                    required: true,
                    opciones: []
                }
            ],
            textoBotonSubcategoria: 'Agregar Subcategoria',
            successMessage: '',
            errorMessage: '',
            TituloEditar: 'Editar Subcategoria',
            objetoEditar: {
                idSubcategoria: '',
                nombre: '',
                nomenclatura: 0,
                idCategoria: 0,
            },
            camposMostrados: ['nombre', 'idCategoria'],
            id: 'idSubcategoria',
            TituloVer: 'Información de la Subcategoria',
            currentPage: 1,
            pageSize: 6,
            categoriasDisponibles: [],
            permisos:false,
        };
    },
    mounted() {
        this.mostrar();
        this.obtenerCategoriasDisponibles();
        this.obtenerPermisos();
    },
    computed: {
        totalPages() {
            if (!this.subcategorias) return 0;
            return Math.ceil(this.subcategorias.length / this.pageSize);
        },
        paginated() {
            if (!this.subcategorias) return null;

            const sortedSubcategorias = this.subcategorias.slice().reverse();

            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            return sortedSubcategorias.slice(startIndex, endIndex);
        },
    },
    methods: {
        goToPage(page) {
            if (page < 1) page = 1;
            if (page > this.totalPages) page = this.totalPages;
            this.currentPage = page;
        },
        mostrar() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_SUBCATEGORIAS}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.subcategorias = data;
                })
                .catch(error => console.log(error));
        },
        obtenerCategoriasDisponibles() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_CATEGORIAS}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.categoriasDisponibles = data;
                    const campoCategoria = this.camposSubcategoria.find(campo => campo.id === 'idCategoria');
                    console.log(this.categoriasDisponibles);
                    campoCategoria.opciones = data.map(categoria => ({ valor: categoria.idCategoria, etiqueta: categoria.nombre }));
                })
                .catch(error => {
                    console.error('Error al obtener categorías:', error);
                });
        },
        buscarSubcategoria(termino) {
            const url = `${API_URL}/${ENDPOINT_BUSCAR_SUBCATEGORIA}?nombre=${termino}`;

            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Error en la solicitud.");
                    }
                })
                .then(data => {
                    this.subcategorias = data;
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        },
        buscarSubcategoriaID(id) {
            const url = `${API_URL}/${ENDPOINT_CONSULTAR_SUBCATEGORIA}/${id}`;

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
                .then(subcategoria => {
                    this.registroDeMovimientos(`Subcategoría ${subcategoria.nombre} eliminada`);                    
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
        },
        eliminarSubcategoria(id) {
            if (!id) {
                this.errorMessage = 'Surgio un problema con el ID';
                this.$refs.modalError.openModal();
                return;
            }

            const url = `${API_URL}/${ENDPOINT_ELIMINAR_SUBCATEGORIA}/${id}`;

            this.buscarSubcategoriaID(id);

            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.status === 200) {
                        this.successMessage = 'Subcategoria eliminada con éxito';
                        this.$refs.modalSuccess.openModal();
                        this.mostrar();
                    } else if (response.status === 404) {
                        this.errorMessage = 'Subcategoria no encontrada';
                        this.$refs.modalError.openModal();
                    } else {
                        this.errorMessage = 'Error al eliminar la Subcategoria';
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
            this.$refs.modalVer.openModal();
        },
        mostrarEdicion(datos) {
            this.objetoEditar = datos;

            this.objetoEditar.idCategoria = datos.idCategoria;

            console.log(this.objetoEditar)

            this.$refs.modalEditar.openModal();
        },
        editarSubcategoria(objetoModificado) {

            const objetoJSON = JSON.stringify(objetoModificado);

            if (!objetoModificado.nombre || !objetoModificado.nomenclatura) {
                this.errorMessage = 'El campo nombre o nomenclatura no puede estar vacio';
                this.$refs.modalError.openModal();
                this.mostrar();
            } else {

                const url = `${API_URL}/${ENDPOINT_EDITAR_SUBCATEGORIA}`;

                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: objetoJSON,
                })
                    .then(response => {
                        if (response.status === 200) {
                            this.successMessage = 'Subcategoria editada con éxito';
                            this.registroDeMovimientos(`Subcategoría ${objetoModificado.nombre} editada`);
                            this.$refs.modalSuccess.openModal();
                            this.mostrar();
                        }
                        else {
                            if (response.status === 400) {
                                this.errorMessage = 'Surgio un problema con la edición';
                                this.$refs.modalError.openModal();
                            } else {
                                this.errorMessage = 'Error al editar la Subcategoria';
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

        agregarSubcategoria(datos) {


            const url = `${API_URL}/${ENDPOINT_AGREGAR_SUBCATEGORIA}`;

            const nuevoJSON = {};

            for (const campo of datos) {
                nuevoJSON[campo.id] = campo.valor;
            }


            nuevoJSON.nomenclatura = 0;

            console.log(nuevoJSON);

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoJSON),
            })
                .then(response => {
                    if (response.status === 201) {
                        this.successMessage = 'Subcategoria agregada con éxito';
                        this.registroDeMovimientos(`Subcategoría ${nuevoJSON.nombre} agregada`);
                        this.$refs.modalSuccess.openModal();
                        this.mostrar();
                    }
                    else {
                        if (response.status === 409) {
                            this.errorMessage = 'La Subcategoria ya existe y no se pueden repetir';
                            this.$refs.modalError.openModal();
                        } else {
                            this.errorMessage = 'Error al agregar la Subcategoria';
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

            console.log(JSONmovimientos);

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
