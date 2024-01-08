import { reactive } from 'vue';

export default {
  name: 'Tabla',
  props: {
    type: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    eliminar: {
      type: Function,
      required: true,
    },
    editar: {
      type: Function,
      required: true,
    },
  },
  methods: {
    getLabel(field) {
      switch (field) {
        case 'nomenclatura':
          return 'Nomenclatura';
        case 'nombre':
          return 'Nombre';
        case 'correo':
          return 'Correo';
        case 'telefono':
          return 'Teléfono';
        default:
          return field;
      }
    },
  },
};
