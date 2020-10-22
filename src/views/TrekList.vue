<template>
  <v-container>

    <template v-if="isLoading">
      <TrekListSkeleton/>
    </template>

    <template v-else>

      <template v-if="isError">
        <h1 class="display-2 text-center mt-6">Nous n'avons pas encore de randonnées dans ce massif 😢</h1>
      </template>

      <template v-else>
        <h1 class="display-2 text-center mt-6 mb-6">{{ trekList.length }} randonnées dans ce massif</h1>
        <v-row>
          <v-col v-for="trek in trekList" :key="trek.key" cols="12" sm="4">
              <v-card max-width="400">
                <v-img height="200px" :src="trek.introduction.image"></v-img>
                <v-card-title>{{ trek.title }}</v-card-title>
                <v-card-text class="text--primary">
                  <p>{{ trek.introduction.text }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn text @click="goToTrekDetails(trek)">Voir</v-btn>
                </v-card-actions>
              </v-card>
          </v-col>
        </v-row>
      </template>

    </template>

  </v-container>
</template>

<script>
// services
import { getTrekList } from '@/services/TrekService.js';

// components
import TrekListSkeleton from '@/components/skeletons/TrekListSkeleton';

export default {
  name: 'TrekList',
  components: {
    TrekListSkeleton,
  },
  data: () => ({
    trekList: undefined,
    isLoading: false,
  }),
  watch: {
    $route: {
      async handler() {
        this.isLoading = true;
        this.isError = false;
        try {
          const massif = this.$route.params.massif;
          this.trekList = await getTrekList(massif);
          console.log('trekList :>> ', this.trekList);
        } catch (error) {
          this.isError = true;
        }
        this.isLoading = false;
      },
      immediate: true,
    },
  },
  methods: {
    goToTrekDetails(trek) {
      this.$router.push({ name: 'trekDetails', params: { massif: this.$route.params.massif, randonnee: trek.key }});
    },
  },
}
</script>
