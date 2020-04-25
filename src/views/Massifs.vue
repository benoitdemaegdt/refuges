<template>
  <v-container fill-height fluid class="pt-0">
      <template v-if="!getMassifName">
        <v-row class="text-center">
          <v-col cols="12">
            <h1 class="display-2">Nous n'avons pas encore ajouté ce massif 😢</h1>
          </v-col>
        </v-row>
      </template>

      <template v-else-if="getCabanes.length === 0">
        <v-row class="text-center">
          <v-col cols="12">
            <h1 class="display-2">Les cabanes de ce massif seront bientôt disponibles 😁</h1>
          </v-col>
        </v-row>
      </template>

      <template v-else>
        <v-row>
          <v-col cols="12" md="7" class="cabane-list">
            <div class="py-10 pl-24">
              <p class="massif-subtitle mb-0">{{ getSubtitle }}</p>
              <h1 class="massif-title">{{ getTitle }}</h1>
            </div>
            <div
              v-for="(cabane) in getCabanes"
              :key="cabane.key"
              @mouseenter="onMouseEnter(cabane)"
              @mouseleave="onMouseLeave"
            >
              <v-divider></v-divider>
              <v-row
                class="text-center"
              >
                <v-col cols="5">
                  <template v-if="cabane.images.length === 1">
                    <v-img
                      height="200px"
                      class="cabane-img"
                      :key="cabane.key"
                      :src="require('@/assets/images/' + cabane.images[0] + '?vuetify-preload')">
                    </v-img>
                  </template>
                  <template v-else>
                    <v-carousel
                      height="200px"
                      hide-delimiters
                      show-arrows-on-hover
                    >
                      <v-carousel-item
                        v-for="(image, i) in cabane.images"
                        :key="i"
                        :src="require('@/assets/images/' + image + '?vuetify-preload')"
                      >
                      </v-carousel-item>
                    </v-carousel>
                  </template>
                </v-col>
                <v-col cols="7">
                  <p>{{ cabane.name }}</p>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="5" class="map-col pa-0 hidden-sm-and-down">
            <div class="map-container">
              <Map :cabanes="getCabanes" :mouseOveredCabaneKey="mouseOveredCabaneKey"></Map>
            </div>
          </v-col>
        </v-row>
      </template>

  </v-container>
</template>

<script>
// data
import massifs from '@/data/massifs.json';
import cabanes from '@/data/cabanes.json';

// components
import Map from '@/components/Map'

export default {
  name: 'Massifs',
  components: {
    Map,
  },
  data: () => ({
    massifName: undefined,
    mouseOveredCabaneKey: undefined,
  }),
  watch: {
    $route: {
      handler() {
        this.massifName = this.getMassifName;
      },
      immediate: true,
    }
  },
  computed: {
    getMassifName() {
      const massif = massifs.find(massif => massif.key === this.$route.params.name);
      return massif && massif.name;
    },
    getTitle() {
      const massif = massifs.find(massif => massif.key === this.$route.params.name);
      return `Cabanes ${massif.connector} ${massif.name}`;
    },
    getSubtitle() {
      return `${this.getCabanes.length} refuges, cabanes ou abris dans ce massif`;
    },
    getCabanes() {
      return cabanes.filter(cabane => cabane.massif === this.getMassifName);
    },
  },
  methods: {
    onMouseEnter(cabane) {
      this.mouseOveredCabaneKey = cabane.key;
    },
    onMouseLeave() {
      this.mouseOveredCabaneKey = undefined;
    },
  }
};
</script>

<style scoped>

/** left column : list */
.cabane-list {
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

.cabane-img {
  border-radius: 8px;
}

.v-carousel {
  border-radius: 8px !important;
}

/** right column : map */
.map-col {
  position: fixed;
  right: 0;
}

.map-container {
  height: calc(100vh - 48px);
}
</style>
