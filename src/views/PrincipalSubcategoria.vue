<template>
    <section class="container-fluid">
        <div>
            <div class="row">
                <div class="col-2 m-0 p-0" v-flex="fill">
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
                                        <BusquedaGeneral @busqueda="buscarProveedor" />
                                    </div>
                                </div>
                                <tabla v-if="paginated" :type="type" :data="paginated" :fields="['nombre', 'nomenclatura']"
                                    :eliminar="eliminar">
                                    <template #default="{ item }">
                                        <button @click="eliminarSubcategoria(item.idSubcategoria)"
                                            class="btn m-1 btn-danger">
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
                                        :textoBoton="textoBotonSubcategoria"
                                        @formulario-enviado="agregarSubcategoria" />
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
        <ModalEditar :titulo="TituloEditar" :objeto="objetoEditar" :id="id" @guardar-cambios="editarSubcategoria"
            ref="modalEditar" />

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
    height: 65vh;
    border-radius: 10px;
    margin-top: 18%;
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
    API_URL, ENDPOINT_LISTAR_SUBCATEGORIAS, ENDPOINT_AGREGAR_SUBCATEGORIA,
    ENDPOINT_ELIMINAR_SUBCATEGORIA, ENDPOINT_EDITAR_SUBCATEGORIA, ENDPOINT_BUSCAR_SUBCATEGORIA
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
                { id: 'nombre', label: 'Nombre', nombre: 'nombre', type: 'text', valor: '', ayuda: 'Ingrese el nombre de la Subcategoria', required: true  },
                { id: 'status', label: 'Estado', nombre: 'status', type: 'checkbox', valor: false},
                { id: 'nomenclatura', label: 'Nomenclatura', nombre: 'nomenclatura', type: 'number', valor: '', ayuda: 'Ingrese la Nomenclatura deseada', required: true },
            ],
            textoBotonSubcategoria: 'Agregar Subcategoria',
            successMessage: '',
            errorMessage: '',
            TituloEditar: 'Editar Subcategoria',
            objetoEditar: {
                idSubcategoria: '',
                nombre: '',
                status: false,
                nomenclatura: 0,
            },
            id: 'idSubcategoria',
            TituloVer: 'Información de la Subcategoria',
            currentPage: 1,
            pageSize: 6,
        };
    },
    mounted() {
        this.mostrar();
    },
    computed: {
        // Calcular el número total de páginas
        totalPages() {
            if (!this.subcategorias) return 0;
            return Math.ceil(this.subcategorias.length / this.pageSize);
        },
        // Filtrar y ordenar los registros para mostrar en la página actual
        paginated() {
            if (!this.subcategorias) return null;

            // Ordenar los registros del último al primero (puedes ajustar esto)
            const sortedSubcategorias = this.subcategorias.slice().reverse();

            // Calcular el índice de inicio y fin de la página actual
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            // Devolver los registros para la página actual
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
                    console.log(this.subcategorias);
                })
                .catch(error => console.log(error));
        },
        buscarProveedor(termino) {
            const url = `${API_URL}/${ENDPOINT_BUSCAR_SUBCATEGORIA}?nombre=${termino}`;

            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json(); // Convierte la respuesta a JSON si la solicitud es exitosa
                    } else {
                        throw new Error("Error en la solicitud.");
                    }
                })
                .then(data => {
                    // Actualiza la lista de proveedores con los resultados de la búsqueda
                    this.subcategorias = data; // Suponiendo que 'proveedores' es la lista donde deseas almacenar los resultados
                })
                .catch(error => {
                    // Maneja los errores de la solicitud aquí
                    console.error("Error:", error);
                });
        },
        eliminarSubcategoria(id) {
            if (!id) {
                this.errorMessage = 'Surgio un problema con el ID';
                this.$refs.modalError.openModal();
                return;
            }

            const url = `${API_URL}/${ENDPOINT_ELIMINAR_SUBCATEGORIA}/${id}`;


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
            this.objetoEditar = datos;
            if (this.objetoEditar.status == 1) {
                this.objetoEditar.status = true;
            } else {
                this.objetoEditar.status = false;
            }
            this.$refs.modalVer.openModal();
        },
        mostrarEdicion(datos) {
            this.objetoEditar = datos;
            if (this.objetoEditar.status == 1) {
                this.objetoEditar.status = true;
            } else {
                this.objetoEditar.status = false;
            }
            this.$refs.modalEditar.openModal();
        },
        editarSubcategoria(objetoModificado) {
            if (objetoModificado.status) {
                objetoModificado.status = 1;
            } else {
                objetoModificado.status = 0;
            }

            const objetoJSON = JSON.stringify(objetoModificado);

            if (!objetoModificado.nombre) {
                this.errorMessage = 'El campo nombre no puede estar vacio';
                this.$refs.modalError.openModal();
                this.mostrar();
            } else {

                if (objetoJSON.telefono == "") {
                    objetoJSON.telefono = 0;
                }


                console.log(objetoJSON);

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
        validarFormulario(datos) {
    console.log(datos);

    // for (const campo of datos) {
    //     if (!campo.valor) {
    //         this.errorMessage = `El campo ${campo.label} es obligatorio.`;
    //         this.$refs.modalError.openModal();
    //         return;
    //     }
    // }

    // if (esEdicion) {
    //     this.editarSubcategoria(datos);
    // } else {
    //     this.agregarSubcategoria(datos);
    // }
},

        agregarSubcategoria(datos) {
            const url = `${API_URL}/${ENDPOINT_AGREGAR_SUBCATEGORIA}`;

            const nuevoJSON = {};

            for (const campo of datos) {
                nuevoJSON[campo.id] = campo.valor;
            }

            if (nuevoJSON.status) {
                nuevoJSON.status = 1;
            } else {
                nuevoJSON.status = 0;
            }


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
                        this.$refs.modalSuccess.openModal();
                        this.mostrar();
                    }
                    else {
                        if (response.status === 409) {
                            this.errorMessage = 'La Subcategoria ya existe';
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
    },
};
</script>
