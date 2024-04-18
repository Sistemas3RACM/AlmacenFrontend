
export default {
    props: {
        objeto: {
            type: Object,
            required: true,
        },
    },

  data() {
    return {
      show: false,

    };
  },
  methods: {
    openModal() {
      this.show = true;
    },

    closeModal() {
      this.show = false;
    },


  },
};
