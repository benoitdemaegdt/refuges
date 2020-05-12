<template>
  <v-card class="mx-auto" max-width="250" min-width="250" flat>
    <v-img
      v-if="cabane.images.length !== 0"
      class="white--text align-end"
      height="150px"
      :src="require('@/assets/images/' + cabane.images[0])"
    >
    </v-img>

    <v-card-text class="text--primary pb-0">
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
            <div class="flex-child">{{ cabane.stove ? 'oui' : 'non' }}</div>
          </div>
        </v-col>
        <!-- water -->
        <v-col cols="6">
          <div class="flex-container">
            <div class="flex-child"><v-img height="25px" width="25px" :src="require('@/assets/icons/water.png')"></v-img></div>
            <div class="flex-child">{{ cabane.water ? 'oui' : 'non' }}</div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn text @click="goToShack(cabane)">détails</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    cabane: { type: Object, required: true },
    goToShack: { type: Function, required: true },
  },
}
</script>

<style scoped>
.v-card {
  border-radius: 12px !important;
}

.v-btn {
  font-weight: inherit;
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