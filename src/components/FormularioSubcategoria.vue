<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <h3>Agregar Subcategoría</h3>
        <form @submit.prevent="enviarFormulario">
            <div v-for="campo in camposSubcategoria" :key="campo.id" class="mb-3">
                <div class="row">
                    <div v-if="!campo.hidden">
                        <label :for="campo.id" class="form-label">{{ campo.label }}</label>
                    </div>
                    <div v-if="!campo.hidden">
                        <div v-if="campo.type === 'select'" class="form-group">
                            <select class="form-control" :id="campo.id" v-model="campo.valor" :required="campo.required">
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
  
          <div class="button-container">
            <button type="submit" class="btn m-1 btn-primary">Guardar</button>
            <button @click="cerrarFormulario" class="btn m-1 btn-danger">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { API_URL, ENDPOINT_AGREGAR_SUBCATEGORIA,ENDPOINT_LISTAR_CATEGORIAS, ENDPOINT_AGREGAR_MOVIMIENTO } from '../keys';
  
  export default {
    data() {
      return {
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
            categoriasDisponibles: [],
      };
    },
    props: {
      visible: Boolean,
    },
    mounted() {
        this.obtenerCategoriasDisponibles();
    },
    methods: {
      enviarFormulario() {
        const campoNombre = this.camposSubcategoria.find(campo => campo.id === 'nombre');
        const campoNomenclatura = this.camposSubcategoria.find(campo => campo.id === 'nomenclatura');
        const campoCategoria = this.camposSubcategoria.find(campo => campo.id === 'idCategoria');

        if (campoNombre && campoNombre.valor) {
          const camposJSON = {
            nombre: campoNombre.valor,
            nomenclatura: campoNomenclatura.valor,
            idCategoria: campoCategoria.valor
          };
  
          this.agregarSubcategoria(camposJSON);
        } else {
          alert('Por favor, ingrese el nombre de la subcategoría.');
        }
      },
      cerrarFormulario() {
        this.$emit('cerrar-formulario');
      },
      obtenerCategoriasDisponibles() {
            const url = `${API_URL}/${ENDPOINT_LISTAR_CATEGORIAS}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.categoriasDisponibles = data;
                    const campoCategoria = this.camposSubcategoria.find(campo => campo.id === 'idCategoria');
                    campoCategoria.opciones = data.map(categoria => ({ valor: categoria.idCategoria, etiqueta: categoria.nombre }));
                })
                .catch(error => {
                    console.error('Error al obtener categorías:', error);
                });
        },
      agregarSubcategoria(datos) {
        const url = `${API_URL}/${ENDPOINT_AGREGAR_SUBCATEGORIA}`;
  
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datos),
        })
        .then(response => {
          if (response.ok) {
            alert('Subcategoría agregada con éxito.');
            this.registroDeMovimientos(`Subcategoría ${datos.nombre} agregada`);
            this.$emit('actualizar-listas-subcategorias');
          } else if (response.status === 409) {
            alert('La subcategoría ya existe.');
          } else {
            alert('Error al agregar la subcategoría.');
          }
        })
        .catch(error => {
          alert('Error en la solicitud de la subcategoría');
        });
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
          if (response.ok) {
            this.cerrarFormulario();
          } else if (response.status === 409) {
            alert('Error al agregar el movimiento.');
          }
        })
        .catch(error => {
          alert('Error en la solicitud del movimiento.');
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    border-radius: 10px;
  }
  
  .modal-content {
    width: 40%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
  }
  
  .button-container {
    text-align: center;
  }
  </style>
  