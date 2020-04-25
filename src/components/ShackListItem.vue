<template>
  <v-row class="text-center">
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
      <p>{{ shack.name }}</p>
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
.shack-img {
  border-radius: 8px;
}

.v-carousel {
  border-radius: 8px !important;
}

</style>
