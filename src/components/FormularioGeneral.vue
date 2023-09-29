<template>
    <div class="principal">
        <form @submit.prevent="enviar">
            <div v-for="campo in campos" :key="campo.id" class="mb-3">
                <label :for="campo.id" class="form-label">{{ campo.label }}</label>
                <div v-if="campo.type === 'checkbox'" class="form-check">
                    <input :type="campo.type" class="form-check-input" :id="campo.id" v-model="campo.valor">
                    <label :for="campo.id" class="form-check-label">{{ campo.ayuda }}</label>
                </div>
                <div v-else>
                    <input :type="campo.type" class="form-control" :id="campo.id" v-model="campo.valor">
                    <div v-if="campo.ayuda" class="form-text">{{ campo.ayuda }}</div>
                </div>
            </div>
            <button type="submit" class="btn m-1 btn-primary">{{ modo === 'agregar' ? textoBoton : 'Editar' }}</button>
            <button type="button" class="btn m-1 btn-secondary" @click="cambiarModo" v-if="modo === 'editar'">Cancelar</button>
        </form>
    </div>
</template>
  
<script>
export default {
    props: {
        campos: {
            type: Array,
            required: true,
        },
        textoBoton: {
            type: String,
            default: 'Agregar',
        },
        modoInicial: {
            type: String,
            default: 'agregar',
        },
    },
    data() {
        return {
            modo: this.modoInicial,
        };
    },
    methods: {
        enviar() {
            // Aquí puedes emitir un evento personalizado para manejar el envío del formulario
            this.$emit('formulario-enviado', this.campos, this.modo);
        },
        cambiarModo() {
            // Cambia el modo entre 'agregar' y 'editar'
            this.modo = this.modo === 'agregar' ? 'editar' : 'agregar';
            // Inicializa los campos según el nuevo modo
            this.inicializarCampos();
        },
        inicializarCampos() {
            // Inicializa los campos según el modo actual
            if (this.modo === 'agregar') {
                for (const campo of this.campos) {
                    campo.valor = campo.type === 'checkbox' ? false : '';
                }
            } else {
                // Aquí debes asignar los valores del objeto que deseas editar a los campos correspondientes
                // Por ejemplo, si tienes un objeto `objetoAEditar`, puedes hacer algo como:
                // for (const campo of this.campos) {
                //   campo.valor = objetoAEditar[campo.id];
                // }
            }
        },
    },
    mounted() {
        // Inicializa los campos según el modo inicial
        this.inicializarCampos();
    },
};
</script>
  