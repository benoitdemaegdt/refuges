<template>
  <nav>
    <!-- app bar -->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="white"
      dense
      :elevate="isHomePage ? 0 : 3"
      :elevate-on-scroll="isHomePage"
    >

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="primary"/>
      <v-toolbar-title>
        <router-link :to="{ name: 'home'}" class='toolbar-title'>Mon Petit Sommet</router-link>
      </v-toolbar-title>
      <v-spacer />
      <div class="tab">Blog</div>
      <div class="tab" @click="$router.push({ name: 'about' })">À Propos</div>
      <div class="tab">Contact</div>
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
          :key="range"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ range }}</v-list-item-title>
          </template>
          <v-list-group
            v-for="massif in massifsByRange(range)"
            color='primary'
            :key="massif.key"
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ massif.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="activity in massif.activities"
              :key="activity"
              :to="{ name: activitiesConfig[activity].routeName, params: { massif: massif.key }}"
              link
            >
              <v-list-item-title>{{activitiesConfig[activity].title}}</v-list-item-title>
              <v-list-item-icon><v-icon v-text="activitiesConfig[activity].icon"></v-icon></v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
// icons
import { mdiHomeOutline, mdiWalk } from '@mdi/js';

// data
import massifs from '@/data/massifs.json';

export default {
  name: 'Navigation',
  data: () => ({
    mdiHomeOutline,
    mdiWalk,
    drawer: false,
    massifs,
    activitiesConfig: {
      shack: { title: 'Refuges', icon: mdiHomeOutline, routeName: 'shackList' },
      trek: { title: 'Randonnées', icon: mdiWalk, routeName: 'trekList' },
    },
  }),
  methods: {
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
  font-family: "Recoleta";
  color: #222222;
  text-decoration: none;
}

.tab {
  font-family: "MrEaves";
  font-size: 19px;
  padding: 8px 16px 8px 16px;
  cursor: pointer;
}

.tab:hover {
  border-bottom: 2px solid black;
}
</style>
