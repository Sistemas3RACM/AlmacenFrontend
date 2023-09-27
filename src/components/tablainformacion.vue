<template>
  <table class="table" v-if="data && data.length">
    <thead>
      <tr>
        <th v-for="field in fields" :key="field">{{ field }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td v-for="field in fields" :key="field">{{ item[field] }}</td>
      </tr>
    </tbody>
  </table>
  <p v-if="data.length === 0">No hay datos disponibles.</p>
</template>

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
  },
};
</script>
