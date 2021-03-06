<template>
  <v-container>

    <template v-if="isLoading">
      <v-skeleton-loader class="mb-6" type="image"></v-skeleton-loader>
      <v-skeleton-loader class="mb-6" type="list-item-two-line"></v-skeleton-loader>
      <v-skeleton-loader class="mb-6" type="article"></v-skeleton-loader>
    </template>

    <template v-else>

      <!-- return button -->
      <v-row v-if="isPwa">
        <v-col cols="12" class="pl-0 pb-0 pt-0">
          <v-btn text @click="$router.push({ name: 'shackList', params: { massif: massif.key}  })">
            <v-icon>{{ mdiChevronLeft }}</v-icon>Retour
          </v-btn>
        </v-col>
      </v-row>

      <!-- images -->
      <v-row>
        <v-col cols="12">
          <template v-if="images.length === 0">
            <v-sheet height="300px" color="#E0E0E0"></v-sheet>
          </template>
          <template v-else-if="images.length === 1">
            <v-img
              class="shack-img"
              :height="imageHeight"
              :key="shack.key"
              :lazy-src="getImage(images, 0, { height: imageHeight, type: 'preload' })"
              :src="getImage(images, 0, { height: imageHeight })">
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
                v-for="(image, i) in images"
                :key="i"
                :lazy-src="getImage(images, i, { height: imageHeight, type: 'preload' })"
                :src="getImage(images, i, { height: imageHeight })"
              >
              </v-carousel-item>
            </v-carousel>
          </template>
        </v-col>
      </v-row>

      <!-- name -->
      <v-row>
        <v-col cols="12">
          <h1 class="main-title">{{ shack.name }}</h1>
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

      <!-- informations -->
      <v-row>
        <v-col cols="12">
          <h2 class="section-title">Informations</h2>
          <div class="informations-container">
            <v-row>
              <!-- capacity -->
              <v-col
                :cols="12"
                :sm="(shack.phones.length > 0) === !!shack.email ? '12' : '5'"
              >
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/bed.png')"></v-img></div>
                  <div class="flex-child">Capacité : {{ shack.beds }} personnes</div>
                </div>
              </v-col>
              <!-- phone numbers -->
              <template v-if="shack.phones.length > 0">
                <v-col cols="12" sm="5">
                  <div class="flex-container">
                    <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/phone.png')"></v-img></div>
                    <div class="flex-child">
                      <a :href="`tel:${shack.phones[0]}`"> {{ shack.phones[0] }}</a>
                      <template v-if="shack.phones.length > 1">
                        <a> / </a>
                        <a :href="`tel:${shack.phones[1]}`"> {{ shack.phones[1] }}</a>
                      </template>
                    </div>
                  </div>
                </v-col>
              </template>
              <!-- email address -->
              <template v-if="shack.email">
                <v-col cols="12" sm="7">
                  <div class="flex-container">
                    <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/email.png')"></v-img></div>
                    <a class="flex-child-breakable" :href="`mailto:${shack.email}`">{{ shack.email }}</a>
                  </div>
                </v-col>
              </template>
              <!-- altitude -->
              <v-col cols="12" sm="5">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/mountain.png')"></v-img></div>
                  <div class="flex-child">Altitude : {{ shack.altitude }}m</div>
                </div>
              </v-col>
              <!-- gps -->
              <v-col cols="12" sm="7">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/pin.png')"></v-img></div>
                  <div class="flex-child">Long, Lat : {{ shack.longitude }}, {{ shack.latitude }}</div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>

      <!-- amenities -->
      <template v-if="displayAmenities">
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">Équipements</h2>
            <div class="amenities-container">
              <v-row>
                <!-- mattresses -->
                <template v-if="shack.mattresses !== undefined">
                  <v-col cols="6" sm="4">
                    <div class="flex-container">
                      <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/mattress.png')"></v-img></div>
                      <div :class="shack.mattresses ? 'flex-child' : 'flex-child-strikethrough'">Matelas</div>
                    </div>
                  </v-col>
                </template>
                <!-- blankets -->
                <template v-if="shack.blankets !== undefined">
                  <v-col cols="6" sm="4">
                    <div class="flex-container">
                      <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/blanket.png')"></v-img></div>
                      <div :class="shack.blankets ? 'flex-child' : 'flex-child-strikethrough'">Couvertures</div>
                    </div>
                  </v-col>
                </template>
                <!-- stove -->
                <template v-if="shack.stove !== undefined">
                  <v-col cols="6" sm="4">
                    <div class="flex-container">
                      <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/stove.png')"></v-img></div>
                      <div :class="shack.stove ? 'flex-child' : 'flex-child-strikethrough'">Poêle</div>
                    </div>
                  </v-col>
                </template>
                <!-- wood -->
                <template v-if="shack.wood !== undefined">
                  <v-col cols="6" sm="4">
                    <div class="flex-container">
                      <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/wood.png')"></v-img></div>
                      <div :class="shack.wood ? 'flex-child' : 'flex-child-strikethrough'">Bois</div>
                    </div>
                  </v-col>
                </template>
                <!-- water -->
                <template v-if="shack.water !== undefined">
                  <v-col cols="6" sm="4">
                    <div class="flex-container">
                      <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/water.png')"></v-img></div>
                      <div :class="shack.water ? 'flex-child' : 'flex-child-strikethrough'">Source</div>
                    </div>
                  </v-col>
                </template>
                <!-- toilets -->
                <template v-if="shack.toilets !== undefined">
                  <v-col cols="6" sm="4">
                    <div class="flex-container">
                      <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/toilet.png')"></v-img></div>
                      <div :class="shack.toilets ? 'flex-child' : 'flex-child-strikethrough'">Toilettes</div>
                    </div>
                  </v-col>
                </template>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </template>

      <!-- access -->
      <template v-if="displayAccesses">
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">Accès</h2>
            <template v-if="shack.accesses && shack.accesses.length > 0">
              <h3 class="section-subtitle">Rando / Ski de rando / Raquettes</h3>
              <p
                v-for="(access, index) in shack.accesses"
                :key="`access-${index}`"
                class="section-paragraph"
              >{{ access }}</p>
            </template>
            <template v-if="shack.transports && shack.transports.length > 0">
              <h3 class="section-subtitle">Transports en commun</h3>
              <p
                v-for="(transport, index) in shack.transports"
                :key="`transport-${index}`"
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
// icons
import { mdiChevronLeft } from '@mdi/js';

// data
import massifs from '@/data/massifs.json';

// services
import { getShacksByMassif } from '@/services/MassifService';

// mixins
import ImageMixin from '@/mixins/ImageMixin.js';
import LayoutMixin from '@/mixins/LayoutMixin.js';

export default {
  name: 'ShackDetails',
  mixins: [ ImageMixin, LayoutMixin ],
  metaInfo() {
    if (this.shack && this.shack.name) {
      return {
        meta: [
          // Google
          { name: 'description', content: `${this.shack.name} : informations, équipements, accès, fréquentation` },
          // Facebook
          { property: 'og:title', content: `${this.shack.name} | Mon Petit Sommet` },
          { property: 'og:description', content: `${this.shack.name} : informations, équipements, accès, fréquentation` },
          { property: 'og:url', content: `https://monpetitsommet.fr/massifs/${this.$route.params.massif}/refuges/${this.shack.key}` },
          { property: 'og:type', content: 'website' },
          // Twitter Card
          { name: 'twitter:title', content: `${this.shack.name} | Mon Petit Sommet` },
          { name: 'twitter:description', content: `${this.shack.name} : informations, équipements, accès, fréquentation` },
        ].concat(this.images.length > 0 ? [
          { property: 'og:image', content: this.getImage(this.images, 0, { height: 450 }) },
          { property: 'og:image:width', content: '600' },
          { property: 'og:image:height', content: '450' },
          { name: 'twitter:image', content: this.getImage(this.images, 0, { height: 450 }) },
        ] : []),
      };
    }
  },
  data: () => ({
    mdiChevronLeft,
    isLoading: true,
    massif: undefined,
    shack: undefined,
  }),
  watch: {
    $route: {
      async handler() {
        this.isLoading = true;
        this.massif = massifs.find(massif => massif.key === this.$route.params.massif);
        const shacks = await getShacksByMassif(this.massif);
        this.shack = shacks.find(shack => shack.key === this.$route.params.refuge);
        this.isLoading = false;
      },
      immediate: true,
    },
  },
  computed: {
    images() {
      return [...this.shack.images_outdoor, ...this.shack.images_indoor];
    },
    imageHeight() {
      const MOBILE_IMG_HEIGHT = 250;
      const DESKTOP_IMG_HEIGHT = 400;
      return this.screenWidth > 700 ? DESKTOP_IMG_HEIGHT : MOBILE_IMG_HEIGHT;
    },
    displayAmenities() {
      const amenities = ['mattresses', 'blankets', 'stove', 'wood', 'water', 'toilets'];
      return amenities.some(amenity => this.shack[amenity] !== undefined);
    },
    displayAccesses() {
      return ['accesses', 'transports'].some(access => this.shack[access] && this.shack[access].length > 0);
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

.amenities-container, .informations-container {
  margin-top: 4px;
}
.flex-container {
  display: flex;
  justify-content: center;
}
.flex-child {
  flex: 1;
}
.flex-child-breakable {
  flex: 1;
  word-break: break-all;
}
.flex-child-strikethrough {
  flex: 1;
  text-decoration: line-through;
}

</style>
