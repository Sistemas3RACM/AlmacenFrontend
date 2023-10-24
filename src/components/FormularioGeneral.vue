<template>
    <div class="principal">
        <form @submit.prevent="enviar">
            <div v-for="campo in campos" :key="campo.id" class="mb-3 container-fluid">
                <div class="row">
                    <div v-if="!campo.hidden">
                        <label :for="campo.id" class="form-label">{{ campo.label }}</label>
                    </div>
                    <div v-if="!campo.hidden">
                        <div v-if="campo.type === 'checkbox'" class="form-check">
                            <input :type="campo.type" class="form-check-input" :id="campo.id" v-model="campo.valor"
                                :required="campo.required">
                            <label :for="campo.id" class="form-check-label">{{ campo.ayuda }}</label>
                        </div>
                        <div v-else-if="campo.type === 'select'" class="form-group">
                            <select class="form-control" :id="campo.id" v-model="campo.valor" :required="campo.required"
                                @change="categoriaCambiada(campo.valor)">
                                <option value="" disabled>Seleccione una opción</option>
                                <option v-for="opcion in campo.opciones" :key="opcion.valor" :value="opcion.valor">{{
                                    opcion.etiqueta }}</option>
                            </select>
                            <div v-if="campo.ayuda" class="form-text">{{ campo.ayuda }}</div>
                        </div>
                        <div v-else>
                            <input :type="campo.type" class="form-control" :id="campo.id" v-model="campo.valor"
                                :required="campo.required" :hidden="campo.hidden">
                            <div v-if="campo.ayuda" class="form-text">{{ campo.ayuda }}</div>
                        </div>
                    </div>

                </div>

            </div>
            <button type="submit" class="btn m-1 btn-primary">{{ textoBoton }}</button>
        </form>
    </div>
</template>
<style scoope>
.principal {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
  
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
            this.$emit('formulario-enviado', this.campos, this.modo);
        },
        inicializarCampos() {
            // Inicializa los campos según el modo actual
            if (this.modo === 'agregar') {
                for (const campo of this.campos) {
                    campo.valor = campo.type === 'checkbox' ? false : '';
                }
            }
        },
        categoriaCambiada(valor) {
            // Emitir el evento cuando cambia la categoría seleccionada
            this.$emit('categoria-cambiada', valor);
        }
    },
    mounted() {
        // Inicializa los campos según el modo inicial
        this.inicializarCampos();
    },
};
</script>
  