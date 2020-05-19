<template>
  <v-app id="app">
    <!-- navigation -->
    <navigation></navigation>
    <!-- content -->
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'App',
  metaInfo: {
    title: 'Mon Petit Sommet | Refuges, cabanes et abris de montagne',
    titleTemplate: '%s | Mon Petit Sommet'
  },
  components: {
    Navigation,
  },
};
</script>
