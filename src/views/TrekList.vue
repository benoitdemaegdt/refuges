<template>
  <v-container>

    <template v-if="isLoading">
      <TrekListSkeleton/>
    </template>

    <template v-else>

      <template v-if="isError">
        <h1 class="display-2 text-center mt-6">Nous n'avons pas encore de randonnées dans ce massif 😢</h1>
      </template>

      <template v-else>
        <h1 class="display-2 text-center mt-6 mb-6">{{ trekList.length }} randonnées dans ce massif</h1>
        <v-row>
          <v-col v-for="trek in trekList" :key="trek.key" cols="12" sm="4">
              <v-card max-width="400">
                <v-img height="200px" :src="trek.introduction.image"></v-img>
                <v-card-title>{{ trek.title }}</v-card-title>
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
                  <v-spacer></v-spacer>
                  <v-btn icon @click="showIntro = !showIntro">
                    <v-icon>{{ showIntro ? mdiChevronUp : mdiChevronDown }}</v-icon>
                  </v-btn>
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
          </v-col>
        </v-row>
      </template>

    </template>

  </v-container>
</template>

<script>
// services
import { getTrekList } from '@/services/TrekService.js';

// data
import massifs from '@/data/massifs.json';

// mixin
import LayoutMixin from '@/mixins/LayoutMixin.js';
import ImageMixin from '@/mixins/ImageMixin.js';

// components
import TrekListSkeleton from '@/components/skeletons/TrekListSkeleton';

// icons
import { mdiChevronUp, mdiChevronDown } from '@mdi/js';

export default {
  name: 'TrekList',
  components: {
    TrekListSkeleton,
  },
  mixins: [ LayoutMixin, ImageMixin ],
  metaInfo() {
    if (this.massif && this.massif.name && this.trekList) {
      return {
        meta: [
          // Google
          { name: 'description', content: `Découvrez des randonnées sportives, engagées, parfois vertigineuses et toujours loin des foules dans le massif ${this.massif.connector} ${this.massif.name}` },
          // Facebook
          { property: 'og:title', content: `Randonnées sportives dans le massif ${this.massif.connector} ${this.massif.name}` },
          { property: 'og:description', content: `Découvrez des randonnées sportives, engagées, parfois vertigineuses et toujours loin des foules dans le massif ${this.massif.connector} ${this.massif.name}` },
          { property: 'og:url', content: `https://monpetitsommet.fr/massifs/${this.$route.params.massif}/randonnees` },
          { property: 'og:type', content: 'website' },
          // Twitter Card
          { name: 'twitter:title', content: `Randonnées sportives dans le massif ${this.massif.connector} ${this.massif.name}` },
          { name: 'twitter:description', content: `Découvrez des randonnées sportives, engagées, parfois vertigineuses et toujours loin des foules dans le massif ${this.massif.connector} ${this.massif.name}` },
        ].concat(this.trekList[0].introduction.image !== undefined ? [
          { property: 'og:image', content: this.getImage([this.trekList[0].introduction.image], 0, { height: 450 }) },
          { property: 'og:image:width', content: '600' },
          { property: 'og:image:height', content: '450' },
          { name: 'twitter:image', content: this.getImage([this.trekList[0].introduction.image], 0, { height: 450 }) },
        ] : []),
      };
    }
  },
  data: () => ({
    mdiChevronUp,
    mdiChevronDown,
    trekList: undefined,
    showIntro: false,
    massif: undefined,
    isLoading: false,
  }),
  watch: {
    $route: {
      async handler() {
        this.isLoading = true;
        this.isError = false;
        try {
          this.massif = massifs.find(massif => massif.key === this.$route.params.massif);
          this.trekList = await getTrekList(this.$route.params.massif);
        } catch (error) {
          this.isError = true;
        }
        this.isLoading = false;
      },
      immediate: true,
    },
  },
  methods: {
    goToTrekDetails(trek) {
      this.$router.push({ name: 'trekDetails', params: { massif: this.$route.params.massif, randonnee: trek.key }});
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
</style>
