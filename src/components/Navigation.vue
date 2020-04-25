<template>
  <nav>
    <!-- app bar -->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      elevation="1"
      color="white"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="primary"/>
      <v-toolbar-title>
        <router-link :to="{ name: 'home'}" class='toolbar-title'>Refuges</router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        href="https://github.com/benoitdemaegdt/refuges" target="_blank"
        icon
        class="d-none d-sm-flex">
        <v-icon large color="primary">mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- navigation drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      temporary
      app
    >
      <!-- title -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Massifs
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- massifs -->
      <v-list nav>

        <v-list-item
          v-for="massif in massifs"
          color='primary'
          :key="massif.key"
          :to="{ name: 'massifs', params: { name: massif.key }}"
        >
          <v-list-item-icon><v-icon>mdi-image</v-icon></v-list-item-icon>
          <v-list-item-title> {{ massif.name }}</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
// data
import massifs from '@/data/massifs.json';

export default {
  name: 'Navigation',
  data: () => ({
    drawer: false,
    massifs,
  })
}
</script>

<style scoped>
.toolbar-title {
  color: #222222;
  text-decoration: none;
}
</style>