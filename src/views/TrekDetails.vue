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
            <h1 class="trek-title" :style="trekTitleStyle">{{ trek.title}}</h1>
            <p class="trek-from-to" :style="trekFromToStyle">De {{ trek.summary.from }} à {{ trek.summary.to }}</p>
            <p class="trek-intro">{{ trek.introduction.text }}</p>
            <figure v-if="trek.introduction.image.url">
              <v-img max-height="350px" class="trek-img" :src="getImage([trek.introduction.image.url], 0, { height: 350 })" :lazy-src="trek.introduction.image.placeholder"></v-img>
              <figcaption class="caption">{{ trek.introduction.image.caption }}</figcaption>
            </figure>
            <h2><span class="highlight">En Bref</span></h2>
            <v-row>
              <!-- distance -->
              <v-col cols="6" sm="4" v-if="trek.summary.distance !== undefined">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/distance.png')"></v-img></div>
                  <div v-if="!isMobile" class="flex-child">Distance : {{ trek.summary.distance }}km</div>
                  <div v-else class="flex-child">{{ trek.summary.distance }}km</div>
                </div>
              </v-col>
              <!-- duration -->
              <v-col cols="6" sm="4" v-if="trek.summary.duration !== undefined">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/temps.png')"></v-img></div>
                  <div v-if="!isMobile" class="flex-child">Durée : {{ trek.summary.duration }}</div>
                  <div v-else class="flex-child">{{ trek.summary.duration }}</div>
                </div>
              </v-col>
              <!-- elevation -->
              <v-col cols="6" sm="4" v-if="trek.summary.elevation !== undefined">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/mountain.png')"></v-img></div>
                  <div class="flex-child">D+ : {{ Math.round(trek.summary.elevation) }}m</div>
                </div>
              </v-col>
              <!-- rating -->
              <v-col cols="6" sm="4" v-if="trek.summary.rating !== undefined">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/hook.png')"></v-img></div>
                  <div class="flex-child">
                    <a href="http://www.rando-marche.fr/_88181_2_les-cotations" target="_blank">Cotation : {{ trek.summary.rating }}</a>
                  </div>
                </div>
              </v-col>
              <!-- water -->
              <v-col cols="6" sm="4" v-if="trek.summary.water !== undefined">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/water.png')"></v-img></div>
                  <div class="flex-child">Eau : {{ trek.summary.water | booleanToFrench }}</div>
                </div>
              </v-col>
              <!-- tent -->
              <v-col cols="6" sm="4" v-if="trek.summary.tent !== undefined">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/tent.png')"></v-img></div>
                  <div class="flex-child">Bivouac : {{ trek.summary.tent | booleanToFrench }}</div>
                </div>
              </v-col>
            </v-row>
            <h2><span class="highlight">Le Topo détaillé</span></h2>
            <div v-for="step in trek.steps" :key="step.title">
              <h3 class="step-title">
                <v-tooltip top :disabled="isMobile || !step.coordinates">
                  <template v-slot:activator="{ on }">
                    <span
                      :class="{ 'step-title-action': !isMobile && step.coordinates  }"
                      v-on="on"
                      @click="setZoomIndexes(step.coordinates)"
                    >
                      {{ step.title }}
                    </span>
                  </template>
                  <span>Zoomer sur cette étape <v-icon small dark>{{ mdiMagnifyPlusOutline }}</v-icon></span>
                </v-tooltip>
              </h3>
              <component :is="getStepText(step)" v-bind="$props"/>
              <figure v-if="step.image" class="mb-4">
                <v-img max-height="350px" class="trek-img" :src="getImage([step.image.url], 0, { height: 350 })" :lazy-src="step.image.placeholder"></v-img>
                <figcaption class="caption">{{ step.image.caption }}</figcaption>
              </figure>
            </div>
          </div>
        </v-col>

        <v-col v-if="!isMobile || isShowingMap" :cols="leftCols" class="map-col pa-0">
          <div class="map-container">
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
import ImageMixin from '@/mixins/ImageMixin.js';

// services
import { getTrekData } from '@/services/TrekService';

export default {
  name: 'TrekDetails',
  components: {
    TrekDetailsSkeleton,
    TrekMap,
  },
  mixins: [ LayoutMixin, ImageMixin ],
  metaInfo() {
    if (this.trek && this.trek.title) {
      return {
        meta: [
          // Google
          { name: 'description', content: `${this.trek.introduction.text}` },
          // Facebook
          { property: 'og:title', content: `${this.trek.title}` },
          { property: 'og:description', content: `${this.trek.introduction.text}` },
          { property: 'og:url', content: `https://monpetitsommet.fr/massifs/${this.$route.params.massif}/randonnees/${this.trek.key}` },
          { property: 'og:type', content: 'website' },
          // Twitter Card
          { name: 'twitter:title', content: `${this.trek.title}` },
          { name: 'twitter:description', content: `${this.trek.introduction.text}` },
        ].concat(this.trek.introduction.image !== undefined ? [
          { property: 'og:image', content: this.getImage(this.trek.introduction.image, 0, { height: 450 }) },
          { property: 'og:image:width', content: '600' },
          { property: 'og:image:height', content: '450' },
          { name: 'twitter:image', content: this.getImage(this.trek.introduction.image, 0, { height: 450 }) },
        ] : []),
      };
    }
  },
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
    },
    trekTitleStyle() {
      return this.screenWidth < this.$vuetify.breakpoint.thresholds.xs
        ? { 'font-size': '30px' }
        : { 'font-size': '35px' };
    },
    trekFromToStyle() {
      return this.screenWidth < this.$vuetify.breakpoint.thresholds.xs
        ? { 'font-size': '22px' }
        : { 'font-size': '25px' };
    }
  },
  methods: {
    setZoomIndexes(zoomIndexes) {
      if (this.isMobile) return;
      this.zoomIndexes = zoomIndexes;
    },
    resetZoomIndexes() {
      this.zoomIndexes = undefined;
    },
    getStepText(step) {
      let html = `<p class="step-text">${step.text}</p>`;
      if (step.links) {
        for (const link of step.links) {
          html = html.replace(link.text, `<router-link class="step-text-link" :to="{ name: 'shackDetails', params: { massif: '${link.params.massif}', refuge: '${link.params.refuge}' } }">${link.text}</router-link>`);
        }
      }
      return {
        template: html,
        props: this.$options.props,
      };
    },
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

a {
  text-decoration: none;
}

a:hover {
  border-bottom: 1px solid black;
}

.highlight {
  background: linear-gradient(180deg,rgba(255,255,255,0) 50%, #C8E6C9 50%);
}

.step-title-action {
  cursor: pointer;
}
.step-title-action:hover {
  border-bottom: 2px solid black;
}

.trek-intro, .step-text {
  text-align: justify;
}

.caption {
  text-align: center;
  font-style: italic;
  font-size: 8px;
}

/** right column : map */
.map-col {
  position: fixed;
  right: 0;
}

.map-container {
  height: calc(100vh - 48px);
}

.trek-title {
  color: #222222;
}

.trek-from-to {
  font-family: 'MrEaves';
}

.trek-img, .v-sheet {
  border-radius: 8px;
}

.step-title {
  font-size: 22px;
}

/deep/ .step-text-link {
  text-decoration: none;
  border-bottom: 2px solid #009b50;
  color: #009b50;
}

.flex-container {
  display: flex;
}

.flex-child {
  flex: 1;
}

</style>
