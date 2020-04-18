<template>
  <nav>
    <!-- app bar -->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      dense
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <router-link :to="{ name: 'home'}" class='toolbar-title'>Refuges</router-link>
      </v-toolbar-title>
      <v-spacer />
      <a href="https://github.com/benoitdemaegdt/refuges" target="_blank">
        <v-btn icon class="d-none d-sm-flex">
          <v-icon size="27">mdi-github</v-icon>
        </v-btn>
      </a>
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
  color: white;
  text-decoration: none;
}
</style>