export default {
  methods: {
    goToShack(shack) {
      const route = this.$router.resolve({ name: 'shacks', params: { massif: this.massif.key, cabane: shack.key }});
      window.open(route.href, '_blank');
    },
  },
};
