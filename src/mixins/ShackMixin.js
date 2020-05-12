export default {
  methods: {
    goToShack(shack) {
      this.$router.push({ name: 'shacks', params: { massif: this.massif.key, cabane: shack.key }});
      // const route = this.$router.resolve({ name: 'shacks', params: { massif: this.massif.key, cabane: shack.key }});
      // window.open(route.href, '_blank');
    },
  },
};
