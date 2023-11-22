<template>
  <table class="table" v-if="data && data.length">
    <thead>
      <tr>
        <th v-for="field in fields" :key="field">{{ getLabel(field) }}</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td v-for="field in fields" :key="field">{{ item[field] }}</td>
        <td>
          <slot :item="item" />
        </td>
      </tr>
    </tbody>
  </table>
  <p v-if="data.length === 0">No hay datos disponibles.</p>
</template>
<style scoped>
.tabla {
  border: 1px solid #000;
  border-radius: 10px;
}
</style>

<script>
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
</script>
