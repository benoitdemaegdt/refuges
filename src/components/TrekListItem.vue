<template>
  <v-card :max-width="isMobile ? 350 : 400">
    <v-img height="230px" :src="getImage([trek.introduction.image], 0, { height: 450 })"></v-img>
    <v-card-title>{{ trek.title }}</v-card-title>
    <v-card-subtitle>De {{ trek.summary.from }} à {{ trek.summary.to }}</v-card-subtitle>
    <v-card-text class="text--primary">
      <v-row>
        <!-- distance -->
        <v-col cols="6" v-if="trek.summary.distance !== undefined">
          <div class="flex-container">
            <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/distance.png')"></v-img></div>
            <div v-if="!isMobile" class="flex-child">Distance : {{ trek.summary.distance }}km</div>
            <div v-else class="flex-child">{{ trek.summary.distance }}km</div>
          </div>
        </v-col>
        <!-- duration -->
        <v-col cols="6" v-if="trek.summary.duration !== undefined">
          <div class="flex-container">
            <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/temps.png')"></v-img></div>
            <div v-if="!isMobile" class="flex-child">Durée : {{ trek.summary.duration }}</div>
            <div v-else class="flex-child">{{ trek.summary.duration }}</div>
          </div>
        </v-col>
        <!-- elevation -->
        <v-col cols="6" v-if="trek.summary.elevation !== undefined">
          <div class="flex-container">
            <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/mountain.png')"></v-img></div>
            <div class="flex-child">D+ : {{ Math.round(trek.summary.elevation) }}m</div>
          </div>
        </v-col>
        <!-- rating -->
        <v-col cols="6" v-if="trek.summary.rating !== undefined">
          <div class="flex-container">
            <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/hook.png')"></v-img></div>
            <div class="flex-child">
              <a href="http://www.rando-marche.fr/_88181_2_les-cotations" target="_blank">Cotation : {{ trek.summary.rating }}</a>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn text @click="goToTrekDetails(trek)">Voir</v-btn>
      <template v-if="isExpandable">
        <v-spacer></v-spacer>
        <v-btn icon @click="showIntro = !showIntro">
          <v-icon>{{ showIntro ? mdiChevronUp : mdiChevronDown }}</v-icon>
        </v-btn>
      </template>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showIntro">
        <v-divider></v-divider>
        <v-card-text>
          <p class="trek-intro">{{ trek.introduction.text }}</p>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
// mixin
import LayoutMixin from '@/mixins/LayoutMixin.js';
import ImageMixin from '@/mixins/ImageMixin.js';

// icons
import { mdiChevronUp, mdiChevronDown } from '@mdi/js';

export default {
  name: 'TrekListItem',
  props: {
    trek: { type: Object, required: true },
    isExpandable: { type: Boolean, default: true },
  },
  mixins: [ ImageMixin, LayoutMixin ],
  data: () => ({
    mdiChevronUp,
    mdiChevronDown,
    showIntro: false,
  }),
  methods: {
    goToTrekDetails(trek) {
      const massif = this.trek.massif || this.$route.params.massif;
      this.$router.push({ name: 'trekDetails', params: { massif, randonnee: trek.key }});
    },
  },
}
</script>

<style scoped>
.trek-intro {
  text-align: justify;
}

.flex-container {
  display: flex;
}

.flex-child {
  flex: 1;
}

a {
  text-decoration: none;
}

a:hover {
  border-bottom: 1px solid black;
}

.v-card__title {
  word-break: normal;
}
</style>
