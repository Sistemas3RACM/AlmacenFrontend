import axios from 'axios';
import {
    API_URL,
    ENDPOINT_LISTAR_MOVIMIENTOS,
} from '../keys';

export default {
    name: 'InicioSubcategoria',
    data() {
        return {
            movimientos: [],
            currentPage: 1,
            pageSize: 11,
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

        async mostrar() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_MOVIMIENTOS}`;
            const token = this.$store.state.auth.token;
      
            try {
              const response = await axios.get(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              this.movimientos = response.data;
            } catch (error) {
              console.log(error);
              alert(
                "Ha surgido un problema listando los movimientos, intentelo nuevamente."
              );
            }
              },
    },
};
