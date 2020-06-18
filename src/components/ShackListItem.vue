<template>
  <v-container>
    <v-row>

      <!-- image -->
      <v-col cols="12" sm="5" class="pl-0" :class="images.length === 0 ? 'hidden-xs-only' : ''">
        <template v-if="images.length === 0">
          <v-sheet height="200px" color="#E0E0E0"></v-sheet>
        </template>
        <template v-else-if="images.length === 1">
          <v-img
            height="200px"
            class="shack-img"
            :key="shack.key"
            :src="getImage(images, 0, { height: 200 })"
          >
          </v-img>
        </template>
        <template v-else>
          <v-carousel
            height="200px"
            hide-delimiters
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="(image, i) in images"
              :key="i"
              :src="getImage(images, i, { height: 200 })"
            >
            </v-carousel-item>
          </v-carousel>
        </template>
      </v-col>

      <!-- info -->
      <v-col cols="12" sm="7" class="px-0 pb-0">
        <v-card flat>
          <v-card-text>
          <div class="shack-type mb-1">{{ shack.type }}</div>
          <div class="shack-name">{{ shack.name }}</div>
          <div class="shack-divider"></div>
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
            <!-- stove -->
            <template v-if="shack.stove">
              <v-col cols="5">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/stove.png')"></v-img></div>
                  <div class="flex-child">Poêle</div>
                </div>
              </v-col>
            </template>
            <!-- water -->
            <template v-if="shack.water">
              <v-col cols="7">
                <div class="flex-container">
                  <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/water.png')"></v-img></div>
                  <div class="flex-child">Source</div>
                </div>
              </v-col>
            </template>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            @click="goToShack(shack)"
          >détails</v-btn>
        </v-card-actions>
      </v-card>

      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import ImageMixin from '@/mixins/ImageMixin.js';
import LayoutMixin from '@/mixins/LayoutMixin.js';
import ShackMixin from '@/mixins/ShackMixin.js';

export default {
  name: 'ShackListItem',
  props: {
    massif: { type: Object, required: true },
    shack: { type: Object, required: true },
  },
  mixins: [ ImageMixin, LayoutMixin, ShackMixin ],
  computed: {
    images() {
      return this.shack.images_outdoor;
    },
  },
};
</script>

<style scoped>
/* shack image */
.shack-img, .v-sheet {
  border-radius: 8px;
}

.v-carousel {
  border-radius: 8px !important;
}

.v-card__text {
  padding-bottom: 0px !important;
  padding-top: 0px !important;
}

.v-card__actions {
  padding-bottom: 0px !important;
}

.shack-type {
  color: #71717E;
  font-size: 14px;
}
.shack-name {
  color: #222222;
  font-size: 18px;
}
.shack-divider {
  margin-top: 10px;
  width: 32px;
  border-top: 1px solid #DDDDDD;
}

.flex-container {
  display: flex;
}

.flex-child {
  flex: 1;
}

</style>
