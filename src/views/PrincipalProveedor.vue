<template>
    <templatePrincipal :vistaPasadaComoProp="tabla"></templatePrincipal>
</template>
<script>
import tabla from '../components/tablainformacion.vue'
import templatePrincipal from '@/components/templatePrincipal.vue';

export default {
    name: 'Inicio Proveedor',
    components: {
        tabla,
        templatePrincipal,
    },
    data(){
        return{
            tabla: tabla,
        };
    },
};
</script>