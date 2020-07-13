<template>
  <v-container fluid class="pt-0">
    <v-row>
      <v-col cols="6">
        <div class="pt-10 pl-24">
          <h1 class="trek-title">Traversée des Bauges (Frontenex -> Annecy)</h1>
            <v-row>
              <!-- distance -->
              <v-col cols="4">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/distance.png')"></v-img></div>
                  <div class="flex-child">Distance : 79km</div>
                </div>
              </v-col>
              <!-- temps -->
              <v-col cols="4">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/temps.png')"></v-img></div>
                  <div class="flex-child">Durée : 19h54min</div>
                </div>
              </v-col>
              <!-- D+ -->
              <v-col cols="4">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/mountain.png')"></v-img></div>
                  <div class="flex-child">D+ : 4800m</div>
                </div>
              </v-col>
            </v-row>
            <v-img height="350px" class="trek-img" key="bauges" :src="require('@/assets/bauges.jpg')"></v-img>
          <h2>Étape 1 : de Frontenex au chalet d'Orisan</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
          </p>
          <h2>Étape 2 : du chalet d'orisan à la pointe de la Chaurionde</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
          </p>
          <h2>Étape 3 : de la pointe de la Chaurionde au col d'orgeval</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
          </p>
        </div>
      </v-col>
      <v-col cols="6" class="map-col pa-0">
        <div class="map-container-desktop">
          <TrekMap/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TrekMap from '@/components/TrekMap';

export default {
  name: 'TrekDetails',
  components: {
    TrekMap,
  },
  data: () => ({}),
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
