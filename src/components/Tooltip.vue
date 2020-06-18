<template>
  <v-card class="mx-auto" max-width="250" min-width="250" flat>
    <v-img
      v-if="images.length !== 0"
      class="white--text align-end"
      height="150px"
      :src="getImage(images, 0, { height: 150 })"
    >
    </v-img>

    <v-card-text @click="goToShack(cabane)" class="text--primary pb-4">
      <v-row>
        <v-col cols="12" class="card-title">
          {{ cabane.name }}
        </v-col>
      </v-row>
      <v-row>
        <!-- altitude -->
        <v-col cols="6">
          <div class="flex-container">
            <div class="flex-child"><v-img height="25px" width="25px" :src="require('@/assets/icons/mountain.png')"></v-img></div>
            <div class="flex-child">{{ cabane.altitude }}m</div>
          </div>
        </v-col>
        <!-- beds -->
        <v-col cols="6">
          <div class="flex-container">
            <div class="flex-child"><v-img height="25px" width="25px" :src="require('@/assets/icons/bed.png')"></v-img></div>
            <div class="flex-child">{{ cabane.beds }}</div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <!-- stove -->
        <template v-if="cabane.stove">
          <v-col cols="6">
            <div class="flex-container">
              <div class="flex-child"><v-img height="25px" width="25px" :src="require('@/assets/icons/stove.png')"></v-img></div>
              <div class="flex-child">Poêle</div>
            </div>
          </v-col>
        </template>
        <!-- water -->
        <template v-if="cabane.water">
          <v-col cols="6">
            <div class="flex-container">
              <div class="flex-child"><v-img height="25px" width="25px" :src="require('@/assets/icons/water.png')"></v-img></div>
              <div class="flex-child">Source</div>
            </div>
          </v-col>
        </template>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import ImageMixin from '@/mixins/ImageMixin.js';

export default {
  name: 'Tooltip',
  mixins: [ ImageMixin ],
  props: {
    cabane: { type: Object, required: true },
    goToShack: { type: Function, required: true },
  },
  computed: {
    images() {
      return this.cabane.images_outdoor;
    },
  },
}
</script>

<style scoped>
.v-card {
  border-radius: 12px !important;
}

.card-title {
  padding-top: 0px !important;
}
.col {
  padding-bottom: 0px !important;
}

.flex-container {
  display: flex;
}

.flex-child {
  flex: 1;
} 

.flex-child:last-child {
  margin-right: 25px;
} 
</style>