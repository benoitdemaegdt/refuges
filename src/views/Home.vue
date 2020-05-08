<template>
  <div class="wrapper">
    <v-row
      class="section bg"
      align="center"
      justify="center"
      :style="{ backgroundImage: 'url(' + require('@/assets/images/home.png') + ')' }"
    >
      <v-col cols="12" sm="6">
        <h1 class="font-weight-black display1 white--text">Votre prochaine aventure en montagne<br>commence ici</h1>
        <v-autocomplete
          class="mt-8"
          v-model="searchMassif"
          flat
          solo
          background-color="#EEEEEE"
          hide-details
          no-data-text="Ce massif sera bientôt ajouté 🙂"
          clearable
          prepend-inner-icon="mdi-magnify"
          label="Chercher un massif"
          :items="searchMassif"
          item-text="title"
          item-value="path"
          return-object
        >
          <template v-slot:item="data">
            <v-list-item-content>
              <v-list-item-title v-html="data.item.title"></v-list-item-title>
              <v-list-item-subtitle v-html="data.item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <!-- <div class="section">
      <h1 class="display-4">Home</h1>
    </div>
    <div class="section">
      <h1 class="display-4">Home</h1>
    </div> -->
  </div>
</template>

<script>
import massifs from '@/data/massifs.json';

export default {
  name: 'Home',
  data: () => ({
    searchMassif: massifs.map(massif => ({
      title: massif.name,
      subtitle: `${massif.location.region} | ${massif.location.department}`,
      path: `/refuges/massifs/${massif.key}`,
    })),
  }),
  watch: {
    searchMassif: {
      handler(newRoute) {
        if (newRoute) {
          this.$router.push({ path: newRoute.path });
        }
      },
    },
  },
}
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 64px);
}
.section {
  height: calc(100vh - 64px);
  
  /* For text formatting. */
  display: flex;
  flex-direction: column;
}

.bg {
  height: calc(100vh - 64px); 

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
