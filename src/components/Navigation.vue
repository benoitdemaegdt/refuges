<template>
  <nav>
    <!-- app bar -->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      elevation="1"
      color="white"
    >
      <v-col cols="6" md="3">
        <v-row align="center">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="primary"/>
          <v-toolbar-title class="ml-0 pl-4">
            <router-link :to="{ name: 'home'}" class='toolbar-title'>Mon Petit Sommet</router-link>
          </v-toolbar-title>
        </v-row>
      </v-col>

      <!-- search bar -->
      <v-col cols="0" md="6">
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
          :prepend-inner-icon="mdiMagnify"
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
              <v-list-item-subtitle v-html="`${data.item.type}, ${data.item.massif}`"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-autocomplete>
      </v-col>
      <v-spacer />
      <v-btn
        class="hidden-xs-only"
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
        <v-list-group
          v-for="range in mountainRanges"
          :key="range">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ range }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="massif in massifsByRange(range)"
            color='primary'
            :key="massif.key"
            :to="{ name: 'shackList', params: { massif: massif.key }}"
          >
            <v-list-item-icon><v-icon>{{ mdiImage }}</v-icon></v-list-item-icon>
            <v-list-item-title> {{ massif.name }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
// icons
import { mdiImage, mdiMagnify } from '@mdi/js';

// data
import massifs from '@/data/massifs.json';

// services
import { getAllShacks } from '@/services/MassifService';

export default {
  name: 'Navigation',
  data: () => ({
    mdiImage,
    mdiMagnify,
    drawer: false,
    searchNavigation: undefined,
    search: [],
    massifs,
  }),
  watch: {
    $route: {
      async handler() {
        if (!this.isHomePage && this.search.length === 0) {
          this.search = await getAllShacks();
        }
      },
      immediate: true,
    },
  },
  methods: {
    goToPage() {
      if (this.$route.path !== this.searchNavigation.path) {
        this.$router.push({
          name: 'shackDetails',
          params: { massif: this.searchNavigation.massif_key, refuge: this.searchNavigation.key },
        });
        this.$nextTick(() => {
          this.searchNavigation = undefined;
        });
      }
    },
    massifsByRange(mountainRange) {
      return this.massifs.filter(massif => massif.location.mountain_range === mountainRange);
    },
  },
  computed: {
    isHomePage() {
      return this.$route.name === 'home';
    },
    mountainRanges() {
      return [...new Set(this.massifs.map(massif => massif.location.mountain_range))];
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