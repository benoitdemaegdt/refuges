<template>
  <v-row>
    <v-col cols="5">
      <template v-if="shack.images.length === 1">
        <v-img
          height="200px"
          class="shack-img"
          :key="shack.key"
          :src="require('@/assets/images/' + shack.images[0] + '?vuetify-preload')">
        </v-img>
      </template>
      <template v-else>
        <v-carousel
          height="200px"
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
    <v-col cols="7">
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
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ShackListItem',
  props: {
    shack: {
      type: Object,
      required: true,
    },
  }
}
</script>

<style scoped>
/* shack image */
.shack-img {
  border-radius: 8px;
}

.v-carousel {
  border-radius: 8px !important;
}

/* shack info */
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
