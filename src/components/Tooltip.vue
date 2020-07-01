<template>
  <v-card
    class="pointer" 
    max-width="250"
    min-width="250" 
    flat
    @click.native="goToShack(cabane)">
    <v-img
      v-if="images.length !== 0"
      class="white--text align-end"
      height="150px"
      :src="getImage(images, 0, { height: 150 })"
    >
    </v-img>

    <v-card-text>
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
        <v-col cols="6">
          <div class="flex-container">
            <div class="flex-child"><v-img height="25px" width="25px" :src="require('@/assets/icons/stove.png')"></v-img></div>
            <div :class="cabane.stove ? 'flex-child' : 'flex-child-strikethrough'">Poêle</div>
          </div>
        </v-col>
        <!-- water -->
        <v-col cols="6">
          <div class="flex-container">
            <div class="flex-child"><v-img height="25px" width="25px" :src="require('@/assets/icons/water.png')"></v-img></div>
            <div :class="cabane.water ? 'flex-child' : 'flex-child-strikethrough'">Source</div>
          </div>
        </v-col>
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

.flex-child-strikethrough {
  flex: 2;
  text-decoration: line-through;
}

.flex-child:last-child {
  margin-right: 25px;
}

.pointer {
  cursor: pointer;
}
</style>