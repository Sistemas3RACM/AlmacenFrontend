import {
    API_URL, ENDPOINT_LISTAR_SUBCATEGORIAS, ENDPOINT_AGREGAR_SUBCATEGORIA, ENDPOINT_AGREGAR_MOVIMIENTO,
    ENDPOINT_ELIMINAR_SUBCATEGORIA, ENDPOINT_EDITAR_SUBCATEGORIA, ENDPOINT_BUSCAR_SUBCATEGORIA, ENDPOINT_LISTAR_CATEGORIAS, ENDPOINT_CONSULTAR_SUBCATEGORIA
} from '../keys';

export default {
    name: 'InicioSubcategoria',
    data() {
        return {
            subcategorias: null,
            type: 'subcategoria',
            camposSubcategoria: [
                { id: 'nombre', label: 'Nombre', nombre: 'nombre', type: 'text', valor: '', ayuda: 'Ingrese el nombre de la Subcategoria', required: true },
                { id: 'nomenclatura', label: 'Nomenclatura', nombre: 'nomenclatura', type: 'number', valor: '0', ayuda: 'Ingrese la Nomenclatura deseada', hidden: true },
                {
                    id: 'idCategoria',
                    label: 'Categoría perteneciente',
                    nombre: 'idCategoria',
                    type: 'select',
                    valor: '',
                    ayuda: 'Seleccione la categoría correspondiente',
                    required: true,
                    opciones: []
                }
            ],
            textoBotonSubcategoria: 'Agregar Subcategoría',
            successMessage: '',
            errorMessage: '',
            TituloEditar: 'Editar Subcategoría',
            objetoEditar: {
                idSubcategoria: '',
                nombre: '',
                nomenclatura: 0,
                idCategoria: 0,
            },
            camposMostrados: ['nombre', 'idCategoria'],
            id: 'idSubcategoria',
            TituloVer: 'Información de la subcategoría',
            currentPage: 1,
            pageSize: 6,
            categoriasDisponibles: [],
            permisos: false,
        };
    },
    mounted() {
        this.mostrar();
        this.obtenerCategoriasDisponibles();
        this.obtenerPermisos();
    },
    computed: {
        // The above code is a part of a Vue component and it is calculating the total number of pages and
        // returning a paginated subset of an array of subcategories.
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
                this.errorMessage = 'Surgió un problema con el ID';
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
                        this.successMessage = 'Subcategoría eliminada con éxito';
                        this.$refs.modalSuccess.openModal();
                        this.mostrar();
                    } else if (response.status === 404) {
                        this.errorMessage = 'Subcategoría no encontrada';
                        this.$refs.modalError.openModal();
                    } else {
                        this.errorMessage = 'Error al eliminar la Subcategoría';
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

            this.objetoEditar.idCategoria = datos.idCategoria;

            this.$refs.modalEditar.openModal();
        },
        editarSubcategoria(objetoModificado) {

            const objetoJSON = JSON.stringify(objetoModificado);

            if (!objetoModificado.nombre || !objetoModificado.nomenclatura) {
                this.errorMessage = 'El campo nombre o nomenclatura no puede estar vacío';
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
                            this.successMessage = 'Subcategoría editada con éxito';
                            this.registroDeMovimientos(`Subcategoría ${objetoModificado.nombre} editada`);
                            this.$refs.modalSuccess.openModal();
                            this.mostrar();
                        }
                        else {
                            if (response.status === 400) {
                                this.errorMessage = 'Surgió un problema con la edición';
                                this.$refs.modalError.openModal();
                            } else {
                                this.errorMessage = 'Error al editar la Subcategoría';
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

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoJSON),
            })
                .then(response => {
                    if (response.status === 201) {
                        this.successMessage = 'Subcategoría agregada con éxito';
                        this.registroDeMovimientos(`Subcategoría ${nuevoJSON.nombre} agregada`);
                        this.$refs.modalSuccess.openModal();
                        this.mostrar();
                    }
                    else {
                        if (response.status === 409) {
                            this.errorMessage = 'La Subcategoría ya existe y no se pueden repetir';
                            this.$refs.modalError.openModal();
                        } else {
                            this.errorMessage = 'Error al agregar la Subcategoría';
                            this.$refs.modalError.openModal();
                        }
                    }
                })
                .catch(error => {
                    this.errorMessage = 'Error en la solicitud';
                    this.$refs.modalError.openModal();
                });
        },
        // The above code is a method in a Vue component that is used to obtain permissions for a user. It
        // first retrieves the user ID from the Vuex store using `this..state.auth.userId`. If the user
        // ID is equal to 1, it sets the `permisos` data property to `true`.
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
