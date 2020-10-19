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

        <v-col v-if="!isMobile || !isShowingMap" :cols="leftCols">
          <div class="pl-24">
            <h1 class="trek-title">{{ trek.title}}</h1>
            <p class="trek-intro">{{ trek.introduction.text }}</p>
            <v-img height="350px" class="trek-img" key="bauges" :src="getImage(trek.introduction.image)"></v-img>
            <h2><span class="highlight">En Bref</span></h2>
            <v-row>
              <!-- distance -->
              <v-col cols="4" v-if="trek.summary.distance !== undefined">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/distance.png')"></v-img></div>
                  <div class="flex-child">Distance : {{ trek.summary.distance }}km</div>
                </div>
              </v-col>
              <!-- duration -->
              <v-col cols="4" v-if="trek.summary.duration !== undefined">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/temps.png')"></v-img></div>
                  <div class="flex-child">Durée : {{ trek.summary.duration }}</div>
                </div>
              </v-col>
              <!-- elevation -->
              <v-col cols="4" v-if="trek.summary.elevation !== undefined">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/mountain.png')"></v-img></div>
                  <div class="flex-child">D+ : {{ Math.round(trek.summary.elevation) }}m</div>
                </div>
              </v-col>
              <!-- cotation -->
              <v-col cols="4" v-if="trek.summary.rating !== undefined">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/hook.png')"></v-img></div>
                  <div class="flex-child">Cotation : {{ trek.summary.rating }}</div>
                </div>
              </v-col>
              <!-- water -->
              <v-col cols="4" v-if="trek.summary.water !== undefined">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/water.png')"></v-img></div>
                  <div class="flex-child">Eau : {{ trek.summary.water | booleanToFrench }}</div>
                </div>
              </v-col>
              <!-- tent -->
              <v-col cols="4" v-if="trek.summary.tent !== undefined">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/tent.png')"></v-img></div>
                  <div class="flex-child">Bivouac : {{ trek.summary.tent | booleanToFrench }}</div>
                </div>
              </v-col>
            </v-row>
            <h2><span class="highlight">Le Topo</span></h2>
            <div v-for="step in trek.steps" :key="step.title">
              <h3>
                <v-tooltip top :disabled="isMobile || !step.coordinates">
                  <template v-slot:activator="{ on }">
                    <span
                      :class="{ 'step-title': !isMobile && step.coordinates  }"
                      v-on="on"
                      @click="setZoomIndexes(step.coordinates)"
                    >
                      {{ step.title }}
                    </span>
                  </template>
                  <span>Zoomer sur cette étape <v-icon small dark>{{ mdiMagnifyPlusOutline }}</v-icon></span>
                </v-tooltip>
              </h3>
              <p class="step-text">{{ step.text }}</p>
            </div>
          </div>
        </v-col>

        <v-col v-if="!isMobile || isShowingMap" :cols="leftCols" class="map-col pa-0">
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

      <v-btn v-if="isMobile" fab dark color="#71717E" fixed right bottom @click="isShowingMap = !isShowingMap">
        <v-icon v-if="isShowingMap">{{ mdiFormatListBulletedSquare }}</v-icon>
        <v-icon v-else>{{ mdiMap }}</v-icon>
      </v-btn>
    </template>
  </v-container>
</template>

<script>
// icons
import { mdiMagnifyPlusOutline, mdiMap, mdiFormatListBulletedSquare } from '@mdi/js';

// components
import TrekDetailsSkeleton from '@/components/skeletons/TrekDetailsSkeleton';
import TrekMap from '@/components/TrekMap';

// mixin
import LayoutMixin from '@/mixins/LayoutMixin.js';

// services
import { getTrekData } from '@/services/TrekService';

export default {
  name: 'TrekDetails',
  components: {
    TrekDetailsSkeleton,
    TrekMap,
  },
  mixins: [ LayoutMixin ],
  data: () => ({
    mdiMagnifyPlusOutline,
    mdiMap,
    mdiFormatListBulletedSquare,
    zoomIndexes: undefined,
    trek: undefined,
    isShowingMap: false,
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
  computed: {
    leftCols() {
      if (!this.isMobile) return 6;
      return this.isShowingMap ? 0 : 12;
    },
    rightCols() {
      if (!this.isMobile) return 6;
      return this.isShowingMap ? 12 : 0;
    }
  },
  methods: {
    getImage(file){
      return require('@/assets/' + file);
    },
    setZoomIndexes(zoomIndexes) {
      if (this.isMobile) return;
      this.zoomIndexes = zoomIndexes;
    },
    resetZoomIndexes() {
      this.zoomIndexes = undefined;
    }
  },
  filters: {
    booleanToFrench(value) {
      if (!value) return 'Non';
      return 'oui';
    }
  }
};
</script>

<style scoped>

.highlight {
  background: linear-gradient(180deg,rgba(255,255,255,0) 50%, #C8E6C9 50%);
}

.step-title {
  cursor: pointer;
}
.step-title:hover {
  border-bottom: 2px solid black;
}

.trek-intro, .step-text {
  text-align: justify;
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