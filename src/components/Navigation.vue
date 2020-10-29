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
      <template v-if="!isMobile">
        <div v-for="tab in tabs" :key="tab.name" class="tab" @click="tab.clickAction">
          {{ tab.name}}
        </div>
      </template>
      <template v-else>
        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>{{ mdiDotsVertical }}</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="tab in tabs" :key="tab.name" @click="tab.clickAction">
              <v-list-item-title>{{ tab.name}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
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
import { mdiHomeOutline, mdiWalk, mdiDotsVertical } from '@mdi/js';

// data
import massifs from '@/data/massifs.json';

// mixin
import LayoutMixin from '@/mixins/LayoutMixin.js';

export default {
  name: 'Navigation',
  mixins: [ LayoutMixin ],
  data: (vm) => ({
    mdiHomeOutline,
    mdiWalk,
    mdiDotsVertical,
    drawer: false,
    massifs,
    activitiesConfig: {
      shack: { title: 'Refuges', icon: mdiHomeOutline, routeName: 'shackList' },
      trek: { title: 'Randonnées', icon: mdiWalk, routeName: 'trekList' },
    },
    tabs: [
      { name: 'Blog', clickAction: () => { console.log('Blog does not exist yet'); } },
      { name: 'À Propos', clickAction: () => { vm.$router.push({ name: 'about' }); } },
      { name: 'Contact', clickAction: () => { console.log('Contact page does not exist yet'); } },
    ]
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
