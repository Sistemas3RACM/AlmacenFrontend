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
                            <div class="mt-5 tablaP">
                                <div class="row">
                                    <div class="col-4">
                                        <h1 class="h1 m-3">Almacen</h1>
                                    </div>
                                    <div class="col-2 mt-4">
                                        <button @click="mostrar()" class="btn m-1 btn-warning">
                                            <font-awesome-icon :icon="['fas', 'sync-alt']" />
                                        </button>
                                    </div>
                                    <div class="col-2 mt-4">
                                        <button @click="mostrarFormulario" class="btn m-1 btn-warning">
                                            Agregar
                                        </button>

                                    </div>
                                    <div class="col-4 mt-4">
                                        <BusquedaGeneral @busqueda="buscarProducto" />
                                    </div>
                                </div>
                                <tabla v-if="paginated" :type="type" :data="paginated"
                                    :fields="['nombre', 'numeroDeSerie', 'cantidad']" :eliminar="eliminar">
                                    <template #default="{ item }">
                                        <button @click="eliminarProducto(item.idProducto)" class="btn m-1 btn-danger">
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
                            <div class="mt-4">
                                <div class="formulario" v-if="formularioVisible">
                                    <FormularioProducto ref="formularioProducto" :campos="camposProducto"
                                        :textoBoton="textoBotonSubcategoria" @formulario-enviado="agregarProducto"
                                        @categoria-cambiada="cargarSubcategorias" :visible="formularioVisible"
                                        @cerrar-formulario="ocultarFormulario" />
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
        <EditarProducto :titulo="TituloEditar" :subcategoriaOptions="subcategoriasDisponibles" :proveedoresOptions="proveedoresDisponibles" :categoriaOptions="categoriasDisponibles" :camposMostrados="camposMostrados"
            :objeto="objetoEditar" :id="id" @categoria-cambiada="cargarSubcategorias" @guardar-cambios="editarSubcategoria" ref="modalEditar" />

        <VerProducto :titulo="TituloVer" :proveedorOptions="proveedoresDisponibles" :subcategoriaOptions="subcategoriasDisponibles" :categoriaOptions="categoriasDisponibles" :objeto="objetoEditar" :id="id"
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
    border-radius: 10px;
    width: 80%;
    /* Ancho del 80% de la pantalla */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    /* Asegura que esté al frente de todo */
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
    API_URL, ENDPOINT_LISTAR_PRODUCTOS, ENDPOINT_AGREGAR_PRODUCTO,
    ENDPOINT_ELIMINAR_PRODUCTO, ENDPOINT_EDITAR_PRODUCTO, ENDPOINT_BUSCAR_PRODUCTO, ENDPOINT_LISTAR_CATEGORIAS,
    ENDPOINT_LISTAR_SUBCATEGORIAS_POR_CATEGORIAS, ENDPOINT_LISTAR_PROVEEDORES
} from '../keys';
import FormularioProducto from '@/components/FormularioProducto.vue';
import ModalSuccess from '@/components/ModalSuccess.vue';
import ModalError from '@/components/ModalError.vue';
import VerProducto from '@/components/VerProducto.vue';
import EditarProducto from '@/components/EditarProducto.vue';
import BusquedaGeneral from '@/components/BusquedaGeneral.vue';

export default {
    name: 'InicioSubcategoria',
    components: {
        tabla,
        Nvar,
        FormularioProducto,
        ModalSuccess,
        ModalError,
        EditarProducto,
        VerProducto,
        BusquedaGeneral,
    },
    data() {
        return {
            productos: null,
            type: 'productos',
            camposProducto: [
                { id: 'nombre', label: 'Nombre', nombre: 'nombre', type: 'text', valor: '', required: true },
                {
                    id: 'idCategoria',
                    label: 'Categoria perteneciente',
                    nombre: 'idCategoria',
                    type: 'select',
                    valor: '',
                    required: true,
                    opciones: []
                },
                {
                    id: 'idSubcategoria',
                    label: 'Subcategoria perteneciente',
                    nombre: 'idSubcategoria',
                    type: 'select',
                    valor: '',
                    required: true,
                    opciones: []
                },
                { id: 'descripcion', label: 'Descripcion', nombre: 'descripcion', type: 'text', valor: '' },
                {
                    id: 'unidadMedida',
                    label: 'Unidad de Medida',
                    nombre: 'unidadMedida',
                    type: 'select',
                    valor: '',
                    required: true,
                    opciones: [
                        { valor: 'Piezas', etiqueta: 'Piezas' },
                        { valor: 'Kilogramos', etiqueta: 'Kilogramos' },
                        { valor: 'Cajas', etiqueta: 'Cajas' },
                        { valor: 'Pares', etiqueta: 'Pares' },
                        { valor: 'Metros', etiqueta: 'Metros' },
                        { valor: 'Docenas', etiqueta: 'Docenas' },
                        { valor: 'Litros', etiqueta: 'Litros' },
                        { valor: 'Mililitros', etiqueta: 'Mililitros' },
                        { valor: 'Gramos', etiqueta: 'Gramos' },
                        { valor: 'Centímetros', etiqueta: 'Centímetros' },
                    ],
                },
                { id: 'cantidad', label: 'Cantidad', nombre: 'cantidad', type: 'number', valor: '', required: true },
                { id: 'precioUnitario', label: 'Precio Unitario', nombre: 'precioUnitario', type: 'number', valor: '', required: true },
                {
                    id: 'idProveedor',
                    label: 'Proveedor perteneciente',
                    nombre: 'idProveedor',
                    type: 'select',
                    valor: '',
                    required: true,
                    opciones: []
                },
                {
                    id: 'localizacion',
                    label: 'Ubicación',
                    nombre: 'localizacion',
                    type: 'select',
                    valor: '',
                    required: true,
                    opciones: [
                        { valor: '01', etiqueta: 'Anaquel 1' },
                        { valor: '02', etiqueta: 'Anaquel 2' },
                        { valor: '03', etiqueta: 'Anaquel 3' },
                        { valor: '04', etiqueta: 'Anaquel 4' },
                        { valor: '05', etiqueta: 'Anaquel 5' },
                        { valor: '100', etiqueta: 'Servicio' },
                    ],
                },
                { id: 'cantidadMin', label: 'Cantidad Minima', nombre: 'cantidadMin', type: 'number', valor: '', required: true },
                { id: 'servicio', label: '¿Es servicio? ', nombre: 'servicio', type: 'checkbox', valor: false },
                { id: 'numeroDeSerie', label: 'Número De Serie', nombre: 'numeroDeSerie', type: 'text', valor: '', hidden: true },
                { id: 'consumible', nombre: 'consumible', type: 'checkbox', valor: true, hidden: true },
                { id: 'status', nombre: 'status', type: 'checkbox', valor: false, hidden: true },

            ],
            textoBotonSubcategoria: 'Agregar Producto',
            successMessage: '',
            errorMessage: '',
            TituloEditar: 'Editar Producto',
            objetoEditar: {
                nombre: '',
                numeroDeSerie: '',
                idCategoria: 0,
                idSubcategoria: 0,
                descripcion: '',
                unidadMedida: '',
                cantidad: 0,
                precioUnitario: 0,
                idProveedor: 0,
                localizacion: '',
                cantidadMin: 0,
                idProducto: '',
                status: true,
                consumible: true,
                servicio: true,
            },
            camposMostrados: ['nombre', 'idCategoria', 'idSubcategoria', 'descripcion', 'unidadMedida', 'cantidad',
                'precioUnitario', 'idProveedor', 'localizacion', 'cantidadMin'],
            id: 'idProducto',
            TituloVer: 'Información de la Subcategoria',
            currentPage: 1,
            pageSize: 6,
            categoriasDisponibles: [],
            subcategoriasDisponibles: [],
            proveedoresDisponibles: [],
            formularioVisible: false,
        };
    },
    mounted() {
        this.mostrar();
        this.obtenerCategoriasDisponibles();
        this.obtenerProveedoresDisponibles();
    },
    computed: {
        totalPages() {
            if (!this.productos) return 0;
            return Math.ceil(this.productos.length / this.pageSize);
        },
        paginated() {
            if (!this.productos) return null;

            const sortedproductos = this.productos.slice().reverse();

            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            return sortedproductos.slice(startIndex, endIndex);
        },
    },
    methods: {
        goToPage(page) {
            if (page < 1) page = 1;
            if (page > this.totalPages) page = this.totalPages;
            this.currentPage = page;
        },
        mostrar() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_PRODUCTOS}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    console.log(this.productos);
                })
                .catch(error => console.log(error));
        },
        obtenerProveedoresDisponibles() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_PROVEEDORES}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.proveedoresDisponibles = data;
                    const campoProveedor = this.camposProducto.find(campo => campo.id === 'idProveedor');
                    campoProveedor.opciones = data.map(proveedor => ({ valor: proveedor.idProveedor, etiqueta: proveedor.nombre }));
                })
                .catch(error => {
                    console.error('Error al obtener proveedores: ', error);
                });
        },
        obtenerCategoriasDisponibles() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_CATEGORIAS}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.categoriasDisponibles = data;
                    const campoCategoria = this.camposProducto.find(campo => campo.id === 'idCategoria');
                    campoCategoria.opciones = data.map(categoria => ({ valor: categoria.idCategoria, etiqueta: categoria.nombre }));
                })
                .catch(error => {
                    console.error('Error al obtener categorías:', error);
                });
        },
        cargarSubcategorias(categoriaId) {

            const url = `${API_URL}/${ENDPOINT_LISTAR_SUBCATEGORIAS_POR_CATEGORIAS}/${categoriaId}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.subcategoriasDisponibles = data;
                    const campoSubcategoria = this.camposProducto.find(campo => campo.id === 'idSubcategoria');
                    campoSubcategoria.opciones = data.map(subcategoria => ({ valor: subcategoria.idSubcategoria, etiqueta: subcategoria.nombre }));
                })
                .catch(error => {
                    console.error('Error al obtener subcategorías:', error);
                });
        },
        buscarProducto(termino) {
            const url = `${API_URL}/${ENDPOINT_BUSCAR_PRODUCTO}?nombre=${termino}`;

            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Error en la solicitud.");
                    }
                })
                .then(data => {
                    this.productos = data;
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        },
        eliminarProducto(id) {
            if (!id) {
                this.errorMessage = 'Surgio un problema con el ID';
                this.$refs.modalError.openModal();
                return;
            }

            const url = `${API_URL}/${ENDPOINT_ELIMINAR_PRODUCTO}/${id}`;


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
        mostrarFormulario() {
            this.formularioVisible = true;
        },
        ocultarFormulario() {
            this.formularioVisible = false;
        },

        mostrarInformacion(datos) {
            this.$refs.modalVer.openModal();
        },
        mostrarEdicion(datos) {
            this.objetoEditar = datos;

            this.objetoEditar.idCategoria = datos.idCategoria;
            this.cargarSubcategorias(datos.idCategoria);

            this.$refs.modalEditar.openModal();
        },
        editarSubcategoria(objetoModificado) {

            const objetoJSON = JSON.stringify(objetoModificado);

            console.log(objetoJSON);

            // if (!objetoModificado.nombre || !objetoModificado.nomenclatura) {
            //     this.errorMessage = 'El campo nombre o nomenclatura no puede estar vacio';
            //     this.$refs.modalError.openModal();
            //     this.mostrar();
            // } else {

            //     const url = `${API_URL}/${ENDPOINT_EDITAR_PRODUCTO}`;

            //     fetch(url, {
            //         method: 'PUT',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: objetoJSON,
            //     })
            //         .then(response => {
            //             if (response.status === 200) {
            //                 this.successMessage = 'Subcategoria editada con éxito';
            //                 this.$refs.modalSuccess.openModal();
            //                 this.mostrar();
            //             }
            //             else {
            //                 if (response.status === 400) {
            //                     this.errorMessage = 'Surgio un problema con la edición';
            //                     this.$refs.modalError.openModal();
            //                 } else {
            //                     this.errorMessage = 'Error al editar la Subcategoria';
            //                     this.$refs.modalError.openModal();
            //                 }
            //             }
            //         })
            //         .catch(error => {
            //             this.errorMessage = 'Error en la solicitud';
            //             this.$refs.modalError.openModal();
            //         });
            // }

        },

        agregarProducto(datos) {


            const url = `${API_URL}/${ENDPOINT_AGREGAR_PRODUCTO}`;

            const nuevoJSON = {};

            for (const campo of datos) {
                nuevoJSON[campo.id] = campo.valor;
            }

            if (nuevoJSON.servicio && nuevoJSON.localizacion != "100") {

                this.errorMessage = 'Si registra un servicio seleccione en ubicacion "SERVICIO"';
                this.$refs.modalError.openModal();
                this.ocultarFormulario();
                return;
            }
            if (!nuevoJSON.servicio && nuevoJSON.localizacion == "100") {

                this.errorMessage = 'Si registra un producto seleccione alguna ubicacion difernte a SERVICIO';
                this.$refs.modalError.openModal();
                this.ocultarFormulario();
                return;
            }

            var servicio = nuevoJSON.servicio ? "S" : "P";

            nuevoJSON.numeroDeSerie = servicio;

            if (nuevoJSON.servicio) {
                nuevoJSON.servicio = 1;
            } else {
                nuevoJSON.servicio = 0;
            }

            nuevoJSON.consumible = 1;
            nuevoJSON.status = 1;


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
                        this.successMessage = 'Producto agregado con éxito';
                        this.ocultarFormulario();
                        this.$refs.modalSuccess.openModal();
                        this.mostrar();
                    }
                    else {
                        if (response.status === 409) {
                            this.errorMessage = 'El producto ya existe y no se pueden repetir';
                            this.$refs.modalError.openModal();
                            this.ocultarFormulario();
                            return;
                        } else {
                            this.errorMessage = 'Error al agregar el producto';
                            this.$refs.modalError.openModal();
                            this.ocultarFormulario();
                            return;
                        }
                    }
                })
                .catch(error => {
                    this.errorMessage = 'Error en la solicitud';
                    this.$refs.modalError.openModal();
                    this.ocultarFormulario();
                    return;
                });
        },
    },
};
</script>
