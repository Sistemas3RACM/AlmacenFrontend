import {
    API_URL,
    ENDPOINT_BUSCAR_PRODUCTO,
    ENDPOINT_LISTAR_MOVIMIENTOS,
    ENDPOINT_CONSULTAR_USUARIO,
} from '../keys';

export default {
    name: 'InicioSubcategoria',
    data() {
        return {
            movimientos: null,
            type: 'movimientos',
            currentPage: 1,
            pageSize: 6,
        };
    },
    mounted() {
        this.mostrar();
    },
    // The `computed` property in Vue is used to define properties that are derived from the component's
    // data and are reactive.
    computed: {
        totalPages() {
            if (!this.movimientos) return 0;
            return Math.ceil(this.movimientos.length / this.pageSize);
        },
        // The `paginated()` method is a computed property in the Vue component. It is used to calculate and
        // return a subset of the `movimientos` data based on the current page and page size.
        paginated() {
            if (!this.movimientos) return null;

            const sortedmovimientos = this.movimientos.slice().reverse();

            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            return sortedmovimientos.slice(startIndex, endIndex);
        },
    },
    methods: {
        // The `goToPage` method is used to navigate to a specific page in the paginated table. It takes a
        // `page` parameter which represents the page number to navigate to.
        async goToPage(page) {
            if (page < 1) page = 1;
            if (page > this.totalPages) page = this.totalPages;
            this.currentPage = page;
        },
        async buscarNombreUsuario(id) {
            const url = `${API_URL}/${ENDPOINT_CONSULTAR_USUARIO}/${id}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const usuario = await response.json();
                    return usuario.nombre || 'Nombre no encontrado';
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                return 'Nombre no encontrado';
            }
        },
        // The `updateMovimientosWithNames()` method is an asynchronous function that updates the `movimientos`
        // data with the names of the responsible users.
        async updateMovimientosWithNames() {
            if (!this.movimientos) return;

            const movimientosWithNames = await Promise.all(
                this.movimientos.map(async (movimiento) => {
                    const nombre = await this.buscarNombreUsuario(movimiento.encargado);
                    return { ...movimiento, encargadoName: nombre };
                })
            );

            this.movimientos = movimientosWithNames;
        },
        async mostrar() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_MOVIMIENTOS}`;

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    this.movimientos = data;
                    this.currentPage = 1;
                    await this.updateMovimientosWithNames();
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async buscarProducto(termino) {
            const url = `${API_URL}/${ENDPOINT_BUSCAR_PRODUCTO}?nombre=${termino}`;

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    this.movimientos = data;
                    this.currentPage = 1;
                    await this.updateMovimientosWithNames();
                } else {
                    throw new Error("Error en la solicitud.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
        // The `obtenerFecha` method is a helper function that takes a `fechaCompleta` parameter, which
        // represents a full date and time string.
        obtenerFecha(fechaCompleta) {
            if (fechaCompleta) {
                return fechaCompleta.split('T')[0];
            }
            return '';
        },
        // The `obtenerHora` method is a helper function that takes a `fechaCompleta` parameter, which
        // represents a full date and time string.
        obtenerHora(fechaCompleta) {
            if (fechaCompleta) {
                return fechaCompleta.split('T')[1].substr(0, 5);
            }
            return '';
        },
    },
};
