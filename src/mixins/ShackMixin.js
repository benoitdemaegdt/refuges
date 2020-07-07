export default {
  methods: {
    goToShack(shack) {
      if (this.isPwa) {
        this.$router.push({ name: 'shackDetails', params: { massif: this.massif.key, refuge: shack.key }});
      } else {
        const route = this.$router.resolve({ name: 'shackDetails', params: { massif: this.massif.key, refuge: shack.key }});
        window.open(route.href, '_blank');
      }
    },
  },
};
