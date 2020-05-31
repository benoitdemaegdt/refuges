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
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <router-link :to="{ name: 'home'}" class='toolbar-title'>Refuges</router-link>
      </v-toolbar-title>

      <!-- search bar -->
      <v-autocomplete
        v-if="!isHomePage"
        v-model="searchNavigation"
        @change="goToPage"
        flat
        solo
        background-color="#EEEEEE"
        hide-details
        no-data-text="Nous ne connaissons pas encore cet endroit  😢"
        clearable
        prepend-inner-icon="mdi-magnify"
        label="Chercher un refuge"
        class="hidden-sm-and-down"
        :items="search"
        item-text="name"
        item-value="path"
        return-object
      >
        <template v-slot:item="data">
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>
            <v-list-item-subtitle v-html="data.item.type"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-autocomplete>
      <v-spacer />
      <v-btn
        text
        outlined
        rounded
        elevation="1"
        @click="$router.push({ name: 'about' })"
      >À Propos</v-btn>
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
import search from '@/data/search.json'

export default {
  name: 'Navigation',
  data: () => ({
    drawer: false,
    searchNavigation: undefined,
    search,
    massifs,
  }),
  methods: {
    goToPage() {
      if (this.$route.path !== this.searchNavigation.path) {
        this.$router.push({ path: this.searchNavigation.path });
        this.$nextTick(() => {
          this.searchNavigation = undefined;
        });
      }
    },
  },
  computed: {
    isHomePage() {
      return this.$route.name === 'home';
    },
  },
};
</script>

<style scoped>
.toolbar-title {
  color: #222222;
  text-decoration: none;
}
</style>