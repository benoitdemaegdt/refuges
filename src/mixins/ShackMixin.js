export default {
  methods: {
    goToShack(shack) {
      if (this.isPwa) {
        this.$router.push({ name: 'shacks', params: { massif: this.massif.key, cabane: shack.key }});
      } else {
        const route = this.$router.resolve({ name: 'shacks', params: { massif: this.massif.key, cabane: shack.key }});
        window.open(route.href, '_blank');
      }
    },
  },
};
