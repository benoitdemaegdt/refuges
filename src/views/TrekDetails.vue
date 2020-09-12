<template>
  <v-container fluid class="pt-0">
    <template v-if="isError">
      <h1 class="display-2 text-center mt-6">La page que vous cherchez n'existe pas 😢</h1>
    </template>
    <template v-else-if="!trek">
      <TrekDetailsSkeleton />
    </template>
    <template v-else>
      <v-row>
        <v-col cols="6">
          <div class="pt-10 pl-24">
            <h1 class="trek-title">{{ trek.title}}</h1>
            <p>{{ trek.introduction.text }}</p>
            <v-img height="350px" class="trek-img" key="bauges" :src="getImage(trek.introduction.image)"></v-img>
            <h2>En Bref</h2>
            <v-row>
              <!-- distance -->
              <v-col cols="4">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/distance.png')"></v-img></div>
                  <div class="flex-child">Distance : {{ trek.summary.distance }}km</div>
                </div>
              </v-col>
              <!-- duration -->
              <v-col cols="4">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/temps.png')"></v-img></div>
                  <div class="flex-child">Durée : {{ trek.summary.duration }}</div>
                </div>
              </v-col>
              <!-- elevation -->
              <v-col cols="4">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/mountain.png')"></v-img></div>
                  <div class="flex-child">D+ : {{ trek.summary.elevation }}m</div>
                </div>
              </v-col>
            </v-row>
            <h2>Le Topo</h2>
            <div v-for="step in trek.steps" :key="step.title">
              <div class="title">
                <h3>{{ step.title }}</h3>
                <div v-if="step.coordinates" class="ml-2">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="black"
                        v-bind="attrs"
                        v-on="on"
                        @click="setZoomIndexes(step.coordinates)">{{ mdiEyeOutline }}
                      </v-icon>
                    </template>
                    <span>Zoomer sur cette étape</span>
                  </v-tooltip>
                </div>
              </div>
              <p>{{ step.text }}</p>
            </div>
          </div>
        </v-col>
        <v-col cols="6" class="map-col pa-0">
          <div class="map-container-desktop">
            <TrekMap
              :coordinates="trek.coordinates"
              :pointsOfInterest="trek.pointsOfInterest"
              :zoomIndexes="zoomIndexes"
              @zooming-done="resetZoomIndexes"
            />
          </div>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
// icons
import { mdiEyeOutline } from '@mdi/js';

// components
import TrekDetailsSkeleton from '@/components/skeletons/TrekDetailsSkeleton';
import TrekMap from '@/components/TrekMap';

// services
import { getTrekData } from '@/services/TrekService';

export default {
  name: 'TrekDetails',
  components: {
    TrekDetailsSkeleton,
    TrekMap,
  },
  data: () => ({
    mdiEyeOutline,
    zoomIndexes: undefined,
    trek: undefined,
    isError: false,
  }),
  watch: {
    $route: {
      async handler() {
        try {
          this.isError = false;
          const massif = this.$route.params.massif;
          const trek = this.$route.params.randonnee;
          this.trek = await getTrekData(massif, trek); 
        } catch (error) {
          this.isError = true;
        }
      },
      immediate: true,
    },
  },
  methods: {
    getImage(file){
      return require('@/assets/' + file);
    },
    setZoomIndexes(zoomIndexes) {
      this.zoomIndexes = zoomIndexes;
    },
    resetZoomIndexes() {
      this.zoomIndexes = undefined;
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
}

/** right column : map */
.map-col {
  position: fixed;
  right: 0;
}

.map-container-desktop {
  height: calc(100vh - 64px);
}

.trek-title {
  font-size: 28px;
  color: #222222;
}

.trek-img, .v-sheet {
  border-radius: 8px;
}

.flex-container {
  display: flex;
}

.flex-child {
  flex: 1;
}

</style>
