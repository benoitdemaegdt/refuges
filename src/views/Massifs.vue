<template>
  <v-container fluid class="pt-0">

      <template v-if="!massif.name">
        <v-row class="text-center">
          <v-col cols="12">
            <h1 class="display-2">Nous n'avons pas encore ajouté ce massif 😢</h1>
          </v-col>
        </v-row>
      </template>

      <template v-else-if="shacks.length === 0 && !isLoading">
        <v-row class="text-center">
          <v-col cols="12">
            <h1 class="display-2">Les cabanes de ce massif seront bientôt disponibles 😁</h1>
          </v-col>
        </v-row>
      </template>

      <!-- desktop design (must split desktop / mobile because of mapbox resizing issue) -->
      <template v-else-if="screenWidth > $vuetify.breakpoint.thresholds.sm">
        <v-row>
          <v-col cols="7" class="shack-list">
            <template v-if="isLoading">
              <v-skeleton-loader class="mb-6" type="list-item-two-line"></v-skeleton-loader>
              <v-skeleton-loader class="mb-6" type="image"></v-skeleton-loader>
              <v-skeleton-loader class="mb-6" type="image"></v-skeleton-loader>
              <v-skeleton-loader type="image"></v-skeleton-loader>
            </template>
            <template v-else>
              <div class="pt-10 pl-24">
                <p class="massif-subtitle mb-0">{{ shacks.length }} refuges, cabanes ou abris dans ce massif</p>
                <h1 class="massif-title">Refuges {{ massif.connector }} {{ massif.name }}</h1>
                <v-select
                  class="mt-4 selectShackType"
                  v-model="filterType"
                  :items="getTypes"
                  multiple
                  chips
                  deletable-chips
                  outlined
                  single-line
                  label="Type de refuge"
                  rounded
                ></v-select>
              </div>
              <div
                v-for="(cabane, index) in getPageCabanes"
                :key="cabane.key"
                @mouseenter="onMouseEnter(cabane, index)"
                @mouseleave="onMouseLeave"
              >
                <v-divider></v-divider>
                <ShackListItem :massif="massif" :shack="cabane"></ShackListItem>
              </div>
              <div v-if="shacks.length > cabanesPerPage" class="text-center mt-4">
                <v-pagination v-model="page" circle color="#78909C" :length="getPages"></v-pagination>
              </div>
            </template>
          </v-col>
          <v-col cols="5" class="map-col pa-0">
            <div class="map-container-desktop">
              <Mapbox
                v-if="useMapboxGlMap"
                :massif="massif"
                :shacks="getPageCabanes"
                :mouseOveredShackIndex="mouseOveredCabaneIndex"
              ></Mapbox>
              <Map 
                v-else
                :massif="massif"
                :cabanes="getPageCabanes"
                :mouseOveredCabaneKey="mouseOveredCabaneKey"
              ></Map>
            </div>
          </v-col>
        </v-row>
      </template>

      <!-- mobile design -->
      <template v-else-if="screenWidth < $vuetify.breakpoint.thresholds.sm">
        <v-row>
          <!-- list -->
          <template v-if="!isShowingMap">
            <v-col cols="12" class="shack-list">
              <template v-if="isLoading">
                <v-skeleton-loader class="mb-6" type="list-item-two-line"></v-skeleton-loader>
                <v-skeleton-loader class="mb-6" type="image"></v-skeleton-loader>
                <v-skeleton-loader class="mb-6" type="image"></v-skeleton-loader>
                <v-skeleton-loader type="image"></v-skeleton-loader>
              </template>
              <template v-else>
                <div class="pt-10 pl-24">
                  <p class="massif-subtitle mb-0">{{ shacks.length }} refuges, cabanes ou abris dans ce massif</p>
                  <h1 class="massif-title">Cabanes {{ massif.connector }} {{ massif.name }}</h1>
                  <v-select
                    class="mt-4 selectShackType"
                    v-model="filterType"
                    :items="getTypes"
                    multiple
                    chips
                    deletable-chips
                    outlined
                    single-line
                    label="Type de refuge"
                    rounded
                  ></v-select>
                </div>
                <div
                  v-for="(cabane, index) in getPageCabanes"
                  :key="cabane.key"
                  @mouseenter="onMouseEnter(cabane, index)"
                  @mouseleave="onMouseLeave"
                >
                  <v-divider></v-divider>
                  <ShackListItem :massif="massif" :shack="cabane"></ShackListItem>
                </div>
                <div v-if="shacks.length > cabanesPerPage" class="text-center mt-4">
                  <v-pagination v-model="page" circle color="#78909C" :length="getPages"></v-pagination>
                </div>
              </template>
            </v-col>
          </template>
          <!-- map -->
          <template v-else>
            <v-col cols="12" class="map-col pa-0">
              <div class="map-container-mobile">
                <Mapbox
                  v-if="useMapboxGlMap"
                  :massif="massif"
                  :shacks="getPageCabanes"
                ></Mapbox>
                <Map 
                  v-else
                  :massif="massif"
                  :cabanes="getPageCabanes"
                ></Map>
              </div>
            </v-col>
          </template>
        </v-row>
        <v-btn fab dark color="#71717E" fixed right bottom @click="isShowingMap = !isShowingMap">
          <v-icon v-if="isShowingMap">{{ mdiFormatListBulletedSquare }}</v-icon>
          <v-icon v-else>{{ mdiMap }}</v-icon>
        </v-btn>
      </template>

  </v-container>
</template>

<script>
// icons
import { mdiMap, mdiFormatListBulletedSquare } from '@mdi/js';

// data
import massifs from '@/data/massifs.json';

// services
import { getShacksByMassif } from '@/services/MassifService';

// mixins
import LayoutMixin from '@/mixins/LayoutMixin.js';

// components
import ShackListItem from '@/components/ShackListItem';
const Map = () => import(/* webpackChunkName: "leaflet" */ '@/components/Map');
const Mapbox = () => import(/* webpackChunkName: "mapbox" */ '@/components/Mapbox');

export default {
  name: 'Massifs',
  components: {
    ShackListItem,
    Map,
    Mapbox,
  },
  metaInfo() {
    if (this.massif && this.massif.name) {
      return {
        title: `${this.massif.name}`,
        meta: [
          // Google
          { name: 'description', content: `${this.massif.name} : Préparez votre randonnée en repérant les cabanes, abris et refuges de montagne !` },
          // Facebook
          { property: 'og:title', content: `${this.massif.name} | Mon Petit Sommet` },
          { property: 'og:description', content: `Préparez votre randonnée en repérant les cabanes, abris et refuges de montagne !` },
          { property: 'og:url', content: `https://monpetitsommet.fr/massifs/${this.massif.key}` },
          { property: 'og:type', content: 'website' },
          // Twitter Card
          { name: 'twitter:title', content: `${this.massif.name} | Mon Petit Sommet` },
          { name: 'twitter:description', content: 'Préparez votre randonnée en repérant les cabanes, abris et refuges de montagne !' },
        ].concat(this.massif.image ? [
          { property: 'og:image', content: this.massif.image.src },
          { property: 'og:image:width', content: this.massif.image.width },
          { property: 'og:image:height', content: this.massif.image.height },
          { name: 'twitter:image', content: this.massif.image.src },
        ] : []),
      };
    }
  },
  mixins: [ LayoutMixin ],
  data: () => ({
    mdiMap,
    mdiFormatListBulletedSquare,
    useMapboxGlMap: process.env.VUE_APP_MAPBOX_GL_TOKEN,
    isLoading: true,
    massif: undefined,
    filterType: [],
    allShacks: [],
    mouseOveredCabaneKey: undefined,
    mouseOveredCabaneIndex: undefined,
    cabanesPerPage: 40,
    page: 1,
    isShowingMap: false,
  }),
  watch: {
    $route: {
      async handler() {
        this.isLoading = true;
        this.page = 1;
        this.isShowingMap = false;
        this.filterType = [];
        this.massif = massifs.find(massif => massif.key === this.$route.params.name);
        this.allShacks = await getShacksByMassif(this.massif);
        this.isLoading = false;
      },
      immediate: true,
    },
    page: {
      handler() {
        window.scrollTo(0, 0);
      },
    },
  },
  computed: {
    getTypes() {
      const types = this.allShacks.map(shack => shack.type);
      return [...new Set(types)];
    },
    shacks() {
      return this.allShacks
      .filter(shack => {
        return this.filterType.length === 0 ? true : this.filterType.includes(shack.type);
      });
    },
    getPageCabanes() {
      const startIdx = (this.page - 1) * this.cabanesPerPage;
      const endIdx = startIdx + this.cabanesPerPage;
      return this.shacks.slice(startIdx, endIdx);
    },
    getPages() {
      const modulo = this.shacks.length % this.cabanesPerPage;
      return Math.floor(this.shacks.length / this.cabanesPerPage) + (modulo && 1);
    },
  },
  methods: {
    onMouseEnter(cabane, index) {
      this.mouseOveredCabaneKey = cabane.key;
      this.mouseOveredCabaneIndex = index;
    },
    onMouseLeave() {
      this.mouseOveredCabaneKey = undefined;
      this.mouseOveredCabaneIndex = undefined;
    },
  }
};
</script>

<style scoped>
/* If the screen size is 1101px wide or more */
@media screen and (min-width: 1101px) {
  .selectShackType {
    width: 50%;
  }
}
/* If the screen is between 801px and 1100x wide */
@media (max-width: 1100px) and (min-width: 701px) {
  .selectShackType {
    width: 75%;
  }
}
/* If the screen size is 800px wide or less */
@media screen and (max-width: 700px) {
  .selectShackType {
    width: 100%;
  }
}


/** left column : shack list */
.shack-list {
  padding-left: 24px !important;
  padding-right: 24px !important;
}

.massif-title {
  font-size: 32px;
  color: #222222;
}

.massif-subtitle {
  font-size: 16px;
  color: #222222;
}

/** right column : map */
.map-col {
  position: fixed;
  right: 0;
}

.map-container-desktop {
  height: calc(100vh - 64px);
}

.map-container-mobile {
  height: calc(100vh - 56px);
}

/deep/ .v-pagination__item, /deep/ .v-pagination__navigation {
  outline: none !important;
}
</style>
