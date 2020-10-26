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

<style>
@font-face {
  font-family: 'Recoleta';
  src: local('Recoleta Bold'), local('Recoleta-Bold'),
      url('./assets/fonts/Recoleta-Bold.woff2') format('woff2'),
      url('./assets/fonts/Recoleta-Bold.woff') format('woff'),
      url('./assets/fonts/Recoleta-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'MrEaves';
  src: local('MrEaves'), local('MrEaves'),
      url('./assets/fonts/MrEavesXLModOT-Reg.ttf') format('truetype');
  font-style: normal;
}
</style>
