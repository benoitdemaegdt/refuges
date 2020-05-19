<template>
  <v-container>

    <template v-if="isLoading">
      <v-skeleton-loader class="mb-6" type="image"></v-skeleton-loader>
      <v-skeleton-loader class="mb-6" type="list-item-two-line"></v-skeleton-loader>
      <v-skeleton-loader class="mb-6" type="article"></v-skeleton-loader>
    </template>

    <template v-else>

      <!-- images -->
      <v-row>
        <v-col cols="12">
          <template v-if="shack.images.length === 0">
            <v-sheet height="300px" color="#E0E0E0"></v-sheet>
          </template>
          <template v-else-if="shack.images.length === 1">
            <v-img
              class="shack-img"
              :height="imageHeight"
              :key="shack.key"
              :src="require('@/assets/images/' + shack.images[0] + '?vuetify-preload')">
            </v-img>
          </template>
          <template v-else>
            <v-carousel
              class="shack-img"
              :height="imageHeight"
              hide-delimiters
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="(image, i) in shack.images"
                :key="i"
                :src="require('@/assets/images/' + image + '?vuetify-preload')"
              >
              </v-carousel-item>
            </v-carousel>
          </template>
        </v-col>
      </v-row>

      <!-- name -->
      <v-row>
        <v-col cols="12">
          <h1 class="main-title">{{ shack.name }} ({{ shack.altitude }}m)</h1>
          <p class="main-subtitle"> {{ shack.type }}, {{ shack.massif }}</p>
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <!-- about -->
      <template v-if="shack.description">
        <v-row>
          <v-col cols="12">
            <h2 class="section-title" color="primary">À Propos</h2>
            <p class="section-paragraph"> {{ shack.description }}</p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </template>

      <!-- amenities -->
      <v-row>
        <v-col cols="12">
          <h2 class="section-title">Équipements</h2>
          <div class="amenities-container">
            <v-row>
              <!-- capacity -->
              <v-col cols="6" sm="4">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/capacity.png')"></v-img></div>
                  <div class="flex-child">Capacité : {{ shack.beds }} personnes</div>
                </div>
              </v-col>
              <!-- mattresses -->
              <v-col cols="6" sm="4">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/bed.png')"></v-img></div>
                  <div class="flex-child">Matelas : {{ shack.mattresses ? 'oui' : 'non' }}</div>
                </div>
              </v-col>
              <!-- blankets -->
              <v-col cols="6" sm="4">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/blanket.png')"></v-img></div>
                  <div class="flex-child">Couvertures : {{ shack.blankets ? 'oui' : 'non' }}</div>
                </div>
              </v-col>
              <!-- stove -->
              <v-col cols="6" sm="4">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/stove.png')"></v-img></div>
                  <div class="flex-child">Poêle : {{ shack.stove ? 'oui' : 'non' }}</div>
                </div>
              </v-col>
              <!-- wood -->
              <v-col cols="6" sm="4">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/wood.png')"></v-img></div>
                  <div class="flex-child">Bois à proximité : {{ shack.wood ? 'oui' : 'non' }}</div>
                </div>
              </v-col>
              <!-- water -->
              <v-col cols="6" sm="4">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/water.png')"></v-img></div>
                  <div class="flex-child">Source à proximité : {{ shack.water ? 'oui' : 'non' }}</div>
                </div>
              </v-col>
              <!-- toilets -->
              <v-col cols="6" sm="4">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/toilet.png')"></v-img></div>
                  <div class="flex-child">Toilettes : {{ shack.toilets ? 'oui' : 'non' }}</div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>

      <!-- access -->
      <template v-if="(shack.accesses && shack.accesses.length > 0) || (shack.transports && shack.transports.length > 0)">
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">Accès</h2>
            <template v-if="shack.accesses && shack.accesses.length > 0">
              <h3 class="section-subtitle">Rando / Ski de rando / Raquettes</h3>
              <p
                v-for="(access, index) in shack.accesses"
                :key="index"
                class="section-paragraph"
              >{{ access }}</p>
            </template>
            <template v-if="shack.transports && shack.transports.length > 0">
              <h3 class="section-subtitle">Transports en commun</h3>
              <p
                v-for="(transport, index) in shack.transports"
                :key="index"
                class="section-paragraph"
              >{{ transport }}</p>
            </template>
          </v-col>
        </v-row>
      </template>
    </template>

  </v-container>
</template>

<script>
// data
import massifs from '@/data/massifs.json';

// services
import { getShacksByMassif } from '@/services/MassifService';

// mixins
import LayoutMixin from '@/mixins/LayoutMixin.js';

export default {
  name: 'Shack',
  mixins: [ LayoutMixin ],
  metaInfo: {
    title: `${this.shack.name}`,
  },
  data: () => ({
    isLoading: true,
    shack: undefined,
  }),
  watch: {
    $route: {
      async handler() {
        this.isLoading = true;
        const massif = massifs.find(massif => massif.key === this.$route.params.massif);
        const shacks = await getShacksByMassif(massif);
        this.shack = shacks.find(shack => shack.key === this.$route.params.cabane);
        this.isLoading = false;
      },
      immediate: true,
    },
  },
  computed: {
    imageHeight() {
      const MOBILE_IMG_HEIGHT = "250px";
      const DESKTOP_IMG_HEIGHT = "400px";
      return this.screenWidth > 700 ? DESKTOP_IMG_HEIGHT : MOBILE_IMG_HEIGHT;
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans');

/* If the screen size is 1101px wide or more */
@media screen and (min-width: 1101px) {
  .container {
    width: 50%;
  }
}
/* If the screen is between 801px and 1100x wide */
@media (max-width: 1100px) and (min-width: 801px) {
  .container {
    width: 75%;
  }
}
/* If the screen size is 800px wide or less */
@media screen and (max-width: 800px) {
  .container {
    width: 100%;
  }
}


.shack-img, .v-sheet {
  border-radius: 8px;
}

.main-title {
  font-family: 'Open Sans', sans-serif;
  font-size: 32px;
  font-weight: 700;
}
.main-subtitle {
  font-family: 'Open Sans', sans-serif;
  font-size: 15px;
  color: #71717E;
}

.section-title {
  font-family: 'Open Sans', sans-serif;
  margin-top: 4px;
  font-size: 22px;
}
.section-subtitle {
  font-family: 'Open Sans', sans-serif;
  margin-top: 4px;
  font-size: 17px;
}
.section-paragraph {
  font-family: 'Open Sans', sans-serif;
  font-size: 17px;
  margin-top: 16px;
}

.amenities-container {
  margin-top: 4px;
}
.flex-container {
  display: flex;
  justify-content: center;
}
.flex-child {
  flex: 1;
}

</style>