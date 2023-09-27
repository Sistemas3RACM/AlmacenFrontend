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
            <button type="submit" class="btn btn-primary">{{ textoBoton }}</button>
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
    },
    methods: {
        enviar() {
            // Aquí puedes emitir un evento personalizado para manejar el envío del formulario
            this.$emit('formulario-enviado', this.campos);
        },
    },
};
</script>
  