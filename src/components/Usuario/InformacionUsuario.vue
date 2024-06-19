<template>
    <div v-if="show" class="modal-error">
        <div class="modal-content">
            <h3>Información del usuario</h3>
            <hr>
            <form @submit.prevent="enviarUsuario">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nombre completo:</label>
                    <input class="form-control" type="text" aria-label="default input example" v-model="usuario.nombre"
                        readonly>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Correo:</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        v-model="usuario.correo" readonly>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Puesto:</label>
                    <select class="form-select" aria-label="Default select example" v-model="usuario.puesto" required>
                        <option v-for="puesto in listaPuestos" :key="puesto.valor" :value="puesto.valor">
                            {{ puesto.etiqueta }}</option>
                    </select>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                    <a class="btn m-1 col-12 btn-danger" @click="closeModal">Cerrar</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            usuario: {},
            show: false,
            listaPuestos: [
                { valor: 1, etiqueta: "Administrador del sistema" },
                { valor: 2, etiqueta: "Administrativo" },
                { valor: 3, etiqueta: "Sin permisos" },
            ],
        };
    },
    methods: {
        openModal(usuario) {
            this.usuario = usuario;
            this.show = true;
        },

        closeModal() {
            this.show = false;
        },

    },
};
</script>

<style scoped>
.modal-error {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    text-align: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    width: 30%;
    border-radius: 10px;
}

/* Puedes agregar estilos personalizados aquí si es necesario */
</style>