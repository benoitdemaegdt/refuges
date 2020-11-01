<template>
  <v-card :max-width="isMobile ? 350 : 400">
    <v-img height="230px" :src="getImage(images, 0, { height: 450 })"></v-img>
    <v-card-title>{{ shack.name }}</v-card-title>
    <v-card-subtitle>{{ shack.type }}</v-card-subtitle>
    <v-card-text class="text--primary">
      <v-row>
        <!-- altitude -->
        <v-col cols="6">
          <div class="flex-container">
            <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/mountain.png')"></v-img></div>
            <div class="flex-child">Altitude : {{ shack.altitude }} m</div>
          </div>
        </v-col>
        <!-- beds -->
        <v-col cols="6">
          <div class="flex-container">
            <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/bed.png')"></v-img></div>
            <div class="flex-child">{{ shack.beds }} personnes</div>
          </div>
        </v-col>
        <!-- stove -->
        <v-col cols="6">
          <div class="flex-container">
            <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/stove.png')"></v-img></div>
            <div class="flex-child">Poêle : {{ shack.stove ? 'oui' : 'non'}}</div>
          </div>
        </v-col>
        <!-- water -->
        <v-col cols="6">
          <div class="flex-container">
            <div class="mr-3"><v-img height="25px" width="25px" :src="require('@/assets/icons/water.png')"></v-img></div>
            <div class="flex-child">Source : {{ shack.water ? 'oui' : 'non'}}</div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn text @click="goToShackDetails()">Voir</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ImageMixin from '@/mixins/ImageMixin.js';
import LayoutMixin from '@/mixins/LayoutMixin.js';

export default {
  name: 'ShackListItemVertical',
  props: {
    shack: { type: Object, required: true },
  },
  mixins: [ ImageMixin, LayoutMixin ],
  computed: {
    images() {
      return this.shack.images_outdoor;
    },
  },
  methods: {
    goToShackDetails() {
      const massif = this.shack.massif || this.$route.params.massif;
      this.$router.push({ name: 'shackDetails', params: { massif, refuge: this.shack.key }});
    },
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
}

.flex-child {
  flex: 1;
}
</style>
