<template>
  <v-container fluid class="pt-0">
    <v-row>
      <v-col cols="6">
        <div class="pt-10 pl-24">
          <h1 class="trek-title">{{ trek.title}}</h1>
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
          <v-img height="350px" class="trek-img" key="bauges" :src="getImage(trek.introduction.image)"></v-img>
          <div v-for="step in trek.steps" :key="step.title">
            <h2>{{ step.title }}</h2>
            <p>{{ step.text }}</p>
          </div>
        </div>
      </v-col>
      <v-col cols="6" class="map-col pa-0">
        <div class="map-container-desktop">
          <TrekMap :coordinates="trek.coordinates"/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import trek from '@/data/bauges/bauges.json';

// components
import TrekMap from '@/components/TrekMap';

export default {
  name: 'TrekDetails',
  components: {
    TrekMap,
  },
  data: () => ({
    trek
  }),
  methods: {
    getImage(file){
      return require('@/assets/' + file);
    }
  }
};
</script>

<style scoped>
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
