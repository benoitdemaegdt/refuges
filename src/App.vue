<template>
  <v-app id="app">
    <!-- navigation -->
    <navigation></navigation>
    <!-- content -->
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'App',
  metaInfo: {
    titleTemplate: 'Mon Petit Sommet'
  },
  components: {
    Navigation,
  },
};
</script>
