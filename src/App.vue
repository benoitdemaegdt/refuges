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
  components: {
    Navigation,
  },
};
</script>
