<template>
  <v-container>

    <!-- images -->
    <v-row>
      <v-col cols="12">
        <template v-if="shack.images.length === 0">
          <v-sheet height="300px" color="#E0E0E0"></v-sheet>
        </template>
        <template v-else-if="shack.images.length === 1">
          <v-img
            class="shack-img"
            :key="shack.key"
            :src="require('@/assets/images/' + shack.images[0] + '?vuetify-preload')">
          </v-img>
        </template>
        <template v-else>
          <v-carousel
            class="shack-img"
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
        <h1 class="main-title">{{ shack.name }}</h1>
        <p class="main-subtitle"> {{ shack.type }}, {{ shack.massif }}</p>
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <!-- about -->
    <v-row>
      <v-col cols="12">
        <h2 class="section-title" color="primary">À Propos</h2>
        <p class="section-paragraph"> {{ shack.description }}</p>
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <!-- amenities -->
    <v-row>
      <v-col cols="12">
        <h2 class="section-title">Équipements</h2>
        <div class="amenities-container">
          <v-row>
            <!-- altitude -->
            <v-col cols="5">
              <div class="flex-container">
                <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/mountain.png')"></v-img></div>
                <div class="flex-child">Altitude : {{ shack.altitude }}m</div>
              </div>
            </v-col>
            <!-- beds -->
            <v-col cols="7">
              <div class="flex-container">
                <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/bed.png')"></v-img></div>
                <div class="flex-child">Capacité : {{ shack.beds }} personnes</div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <!-- stove -->
            <v-col cols="5">
              <div class="flex-container">
                <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/stove.png')"></v-img></div>
                <div class="flex-child">Poêle : {{ shack.stove ? 'oui' : 'non' }}</div>
              </div>
            </v-col>
            <!-- water -->
            <v-col cols="7">
              <div class="flex-container">
                <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/water.png')"></v-img></div>
                <div class="flex-child">Source : {{ shack.water ? 'oui' : 'non' }}</div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <!-- access -->
    <v-row>
      <v-col cols="12">
        <h2 class="section-title">Accès</h2>
        <p
          v-for="(access, index) in shack.accesses"
          :key="index"
          class="section-paragraph"
        >{{ access.description }}</p>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
// data
import cabanes from '@/data/cabanes.json';

export default {
  name: 'Shack',
  data: () => ({
    shack: undefined,
  }),
  watch: {
    $route: {
      handler() {
        this.shack = cabanes.find(cabane => cabane.key === this.$route.params.cabane);
      },
      immediate: true,
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans');

.container {
  width: 50%;
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
}
.flex-child {
  flex: 1;
}

</style>