<template>
    <section class="container-fluid">
        <div>
            <div class="row">
                <div class="col-2 m-0 p-0 nvar">
                    <Nvar />
                </div>
                <div class="col-10 m-0 p-0">
                    <section class="container-fluid">
                        <div class="row">
                            <div class="mt-5 tablaP">
                                <div class="row">
                                    <div class="col-2 titulo">
                                        <h1 class="h1 m-3">Almacén</h1>
                                    </div>
                                    <div class="col-6 mt-4 titulo">
                                        <button @click="mostrar()" class="btn m-1 btn-warning">
                                            <font-awesome-icon :icon="['fas', 'sync-alt']" />
                                        </button>
                                        <button @click="mostrarFormulario" class="btn m-1 btn-success">
                                            Agregar
                                        </button>
                                    </div>
                                    <div class="col-4 mt-4">
                                        <BusquedaGeneral @busqueda="buscarProducto" />
                                    </div>
                                </div>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th class="d-none d-sm-table-cell">Número de Parte</th>
                                            <th>Cantidad</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="producto in paginated" :key="producto.id">
                                            <td>{{ producto.nombre }}</td>
                                            <td class="d-none d-sm-table-cell">{{ producto.numeroDeSerie }}</td>
                                            <td>{{ producto.cantidad }}</td>
                                            <td>
                                                <button @click="mostrarSalida(producto)" class="btn m-1 btn-secondary"
                                                    v-if="sinPermiso" title="Baja de producto">
                                                    <font-awesome-icon :icon="['fas', 'minus']" />
                                                </button>
                                                <!-- <button @click="eliminarProducto(producto.idProducto)"
                                                    class="btn m-1 btn-danger" v-if="permisos">
                                                    <font-awesome-icon :icon="['fas', 'trash']" />
                                                </button> -->
                                                <button @click="mostrarEdicion(producto)" class="btn m-1 btn-warning">
                                                    <font-awesome-icon :icon="['fas', 'edit']" />
                                                </button>
                                                <button @click="mostrarInformacion(producto)" class="btn m-1 btn-primary">
                                                    <font-awesome-icon :icon="['fas', 'eye']" />
                                                </button>
                                                <button @click="mostrarEntrada(producto)" class="btn m-1 btn-secondary"
                                                    v-if="sinPermiso" title="Alta de producto">
                                                    <font-awesome-icon :icon="['fas', 'plus']" />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
                                        @cerrar-formulario="ocultarFormulario" @actualizar-listas="actualizarListas" />
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

        <ModalEntrada :id="id" :objetoEntrada="objetoEditar" @guardar-cambios="editarSubcategoria" ref="modalEntrada" />

        <ModalSalida :id="id" :objetoSalida="objetoEditar" @guardar-cambios="crearSalida" ref="modalSalida" />

        <!-- Modal de Error -->
        <EditarProducto :titulo="TituloEditar" :subcategoriaOptions="subcategoriasDisponibles"
            :proveedoresOptions="proveedoresDisponibles" :categoriaOptions="categoriasDisponibles" :objeto="objetoEditar" :servicioCampo="objetoEditar.servicio"
            :id="id" @categoria-cambiada="cargarSubcategorias" @guardar-cambios="editarSubcategoria" ref="modalEditar" />

        <VerProducto :titulo="TituloVer" :proveedorOptions="proveedoresDisponibles"
            :subcategoriaOptions="subcategoriasDisponibles" :categoriaOptions="categoriasDisponibles" :objeto="objetoEditar"
            :id="id" ref="modalVer" />
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
@media (max-width: 750px) {
    .nvar{
        width: 100%;
    }
    .titulo{
        size: 50px;
        text-align: center;
        margin: 0px;
        padding: 0px;
        width: 100%;
    }
}
</style>

<script>


import tabla from '../components/tablainformacion.vue';
import Nvar from '../components/Nvar';
import {
    API_URL, ENDPOINT_LISTAR_PRODUCTOS, ENDPOINT_AGREGAR_PRODUCTO, ENDPOINT_AGREGAR_MOVIMIENTO, ENDPOINT_CONSULTAR_PRODUCTO,
    ENDPOINT_ELIMINAR_PRODUCTO, ENDPOINT_EDITAR_PRODUCTO, ENDPOINT_BUSCAR_PRODUCTO, ENDPOINT_LISTAR_CATEGORIAS,
    ENDPOINT_LISTAR_SUBCATEGORIAS_POR_CATEGORIAS, ENDPOINT_LISTAR_PROVEEDORES, ENDPOINT_AGREGAR_SOLICITUD
} from '../keys';
import FormularioProducto from '@/components/FormularioProducto.vue';
import ModalSuccess from '@/components/ModalSuccess.vue';
import ModalError from '@/components/ModalError.vue';
import VerProducto from '@/components/VerProducto.vue';
import EditarProducto from '@/components/EditarProducto.vue';
import BusquedaGeneral from '@/components/BusquedaGeneral.vue';
import ModalEntrada from '@/components/ModalEntrada.vue';
import ModalSalida from '@/components/ModalSalida.vue';

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
        ModalEntrada,
        ModalSalida,
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
                { id: 'descripcion', label: 'Descripción', nombre: 'descripcion', type: 'text', valor: '' },
                { id: 'cantidad', label: 'Cantidad', nombre: 'cantidad', type: 'text', valor: '', required: true },
                { id: 'precioUnitario', label: 'Precio unitario', nombre: 'precioUnitario', type: 'text', valor: '', required: true },
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
                        { valor: '06', etiqueta: 'Anaquel 6' },
                        { valor: '07', etiqueta: 'Anaquel 7' },
                        { valor: '08', etiqueta: 'Anaquel 8' },
                        { valor: '00', etiqueta: 'Ninguno' },
                    ],
                },
                {
                    id: 'unidadMedida',
                    label: 'Unidad de medida',
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
                        { valor: 'Ninguno', etiqueta: 'Ninguno' },
                        
                    ],
                },
                { id: 'cantidadMin', label: 'Cantidad Minima', nombre: 'cantidadMin', type: 'number', valor: 0, hidden: true },
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
                cantidad: '',
                precioUnitario: '',
                idProveedor: 0,
                localizacion: '',
                cantidadMin: 0,
                idProducto: '',
                status: true,
                consumible: true,
                servicio: true,
            },
            id: 'idProducto',
            TituloVer: 'Información de la Subcategoria',
            currentPage: 1,
            pageSize: 6,
            categoriasDisponibles: [],
            subcategoriasDisponibles: [],
            proveedoresDisponibles: [],
            productosDisponibles: [],
            formularioVisible: false,
            permisos: false,
            sinPermiso: false,
        };
    },
    mounted() {
        this.mostrar();
        this.obtenerCategoriasDisponibles();
        this.obtenerProveedoresDisponibles();
        this.obtenerPermisos();
    },
    computed: {
        // The above code is a method in a Vue component that calculates the total number of pages based on the
        // number of products and the page size. It first checks if the `productos` array is defined, and if
        // not, it returns 0. If the `productos` array is defined, it calculates the total number of pages by
        // dividing the length of the `productos` array by the `pageSize` property and rounding up using the
        // `Math.ceil()` function. The calculated total number of pages is then returned.
        totalPages() {
            if (!this.productos) return 0;
            return Math.ceil(this.productos.length / this.pageSize);
        },
        // The above code is a method in a Vue component that is used for pagination.
        paginated() {
            if (!Array.isArray(this.productos) || this.productos.length === 0) {

                return null;
            }

            const sortedProductos = this.productos.slice().reverse();

            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            return sortedProductos.slice(startIndex, endIndex);
        },
    },
    methods: {
        // The above code is a method in a Vue component that is used to navigate to a specific page. It takes
        // a parameter `page` which represents the page number to navigate to.
        goToPage(page) {
            if (page < 1) page = 1;
            if (page > this.totalPages) page = this.totalPages;
            this.currentPage = page;
        },
        obtenerPermisos() {
            const idUsuario = this.$store.state.auth.userAdmin;


            if (idUsuario === 1) {
                this.permisos = true;
                this.sinPermiso = true;
            }
            else if (idUsuario === 2) {
                this.permisos = false;
                this.sinPermiso = true;
            }
        },
        mostrar() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_PRODUCTOS}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                })
                .catch(error => console.log(error));
        },
        actualizarListas() {
            this.obtenerCategoriasDisponibles();
            this.obtenerProveedoresDisponibles();
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

            this.buscarProductoID(id);


            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.status === 200) {
                        this.successMessage = 'Producto eliminado con éxito';
                        this.$refs.modalSuccess.openModal();
                        this.mostrar();
                    } else if (response.status === 404) {
                        this.errorMessage = 'Producto no encontrado';
                        this.$refs.modalError.openModal();
                    } else {
                        this.errorMessage = 'Error al eliminar el Producto';
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
        mostrarEntrada(datos) {
            this.objetoEditar = datos;
            this.$refs.modalEntrada.openModal();
        },
        mostrarSalida(datos) {
            this.objetoEditar = datos;
            this.$refs.modalSalida.openModal();
        },

        mostrarInformacion(datos) {
            this.objetoEditar = datos;
            this.$refs.modalVer.openModal();
        },
        mostrarEdicion(datos) {
            this.objetoEditar = datos;

            this.objetoEditar.idCategoria = datos.idCategoria;
            this.cargarSubcategorias(datos.idCategoria);

            this.$refs.modalEditar.openModal();
        },
        crearSalida(datos) {

            const url = `${API_URL}/${ENDPOINT_AGREGAR_SOLICITUD}`;


            const objetoProducto = {
                idProducto: datos.idProducto,
                nombre: datos.nombre,
                numeroDeSerie: datos.numeroDeSerie,
                idCategoria: datos.idCategoria,
                idSubcategoria: datos.idSubcategoria,
                descripcion: datos.descripcion,
                unidadMedida: datos.unidadMedida,
                cantidad: datos.cantidad,
                precioUnitario: datos.precioUnitario,
                idProveedor: datos.idProveedor,
                localizacion: datos.localizacion,
                cantidadMin: datos.cantidadMin,
                status: 1,
                consumible: 1,
                servicio: datos.servicio,
            };


            const objetoSolicitud = {
                idProducto: datos.idProducto,
                solicitante: datos.solicitante,
                correo: datos.correo,
                estado: true,
                regresoProducto: false,
                cantidad: datos.cantidad,
            };

            console.log(objetoSolicitud);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objetoSolicitud),
            })
                .then(response => {
                    console.log('Respuesta del servidor:', response);
                    if (response.status === 201) {
                        this.ocultarFormulario();
                        this.editarSubcategoria(objetoProducto);
                    }
                    else {
                        if (response.status === 409) {
                            this.errorMessage = 'La solicitud ya existe y no se pueden repetir';
                            this.$refs.modalError.openModal();
                            this.ocultarFormulario();
                            return;
                        } else {
                            this.errorMessage = 'Error al agregar la solicitud';
                            this.$refs.modalError.openModal();
                            this.ocultarFormulario();
                            return;
                        }
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                    this.errorMessage = 'Error en la solicitud';
                    this.$refs.modalError.openModal();
                    this.ocultarFormulario();
                    return;
                });


        },
        buscarProductoID(id) {
            const url = `${API_URL}/${ENDPOINT_CONSULTAR_PRODUCTO}/${id}`;

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
                .then(producto => {
                    this.registroDeMovimientos(`Producto ${producto.nombre} eliminado`);
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
        },

        editarSubcategoria(objetoJSON) {
            //const objetoJSON = JSON.stringify(objetoModificado);

            const cantidadInicial = objetoJSON.cantidad;

            if (objetoJSON.servicio && objetoJSON.localizacion != "100") {

                this.errorMessage = 'Si registra un servicio seleccione en ubicacion "SERVICIO"';
                this.$refs.modalError.openModal();
                this.ocultarFormulario();
                return;
            }
            if (!objetoJSON.servicio && objetoJSON.localizacion == "100") {

                this.errorMessage = 'Si registra un producto seleccione alguna ubicacion difernte a SERVICIO';
                this.$refs.modalError.openModal();
                this.ocultarFormulario();
                return;
            }

            if (objetoJSON.servicio == 1) {
                objetoJSON.numeroDeSerie = "S";
            }
            if (objetoJSON.servicio == 0) {
                objetoJSON.numeroDeSerie = "P";
            }

            const precioCadena = objetoJSON.precioUnitario;
            const precioNum = parseFloat(precioCadena);

            objetoJSON.precioUnitario = precioNum;




            const objetoModificado = JSON.stringify(objetoJSON);
            
            

            if (!objetoJSON.nombre || !objetoJSON.precioUnitario) {
                this.errorMessage = 'El campo nombre, precio unitario o cantidad minima no puede estar vacio';
                this.$refs.modalError.openModal();
                this.mostrar();
            } else {

                const url = `${API_URL}/${ENDPOINT_EDITAR_PRODUCTO}`;

                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: objetoModificado,
                })
                    .then(response => {
                        if (response.status === 200) {
                            this.successMessage = 'Producto editado con éxito';
                            this.registroDeMovimientos(`Producto ${objetoJSON.nombre} editado`);
                            this.$refs.modalSuccess.openModal();
                            this.mostrar();
                        }
                        else {
                            if (response.status === 400) {
                                this.errorMessage = 'Surgio un problema con la edición';
                                this.$refs.modalError.openModal();
                            } else {
                                this.errorMessage = 'Error al editar el Producto';
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

            const precioCadena = nuevoJSON.precioUnitario;
            const precioNum = parseFloat(precioCadena);

            nuevoJSON.precioUnitario = precioNum;

            const cantidadCadena = nuevoJSON.cantidad;
            const cantidadNum = parseFloat(cantidadCadena);

            nuevoJSON.cantidad = cantidadNum;

            nuevoJSON.cantidadMin = 0;

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
                        this.registroDeMovimientos(`Producto ${nuevoJSON.nombre} agregado`);
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
