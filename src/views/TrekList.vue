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
        <h1 class="display-2 text-center mt-6 mb-6">{{ title }}</h1>
        <v-row>
          <v-col v-for="trek in trekList" :key="trek.key" cols="12" sm="4">
            <TrekListItem :trek="trek"/>
          </v-col>
        </v-row>
      </template>

    </template>

  </v-container>
</template>

<script>
// services
import { getTrekList } from '@/services/TrekService.js';

// data
import massifs from '@/data/massifs.json';

// mixin
import ImageMixin from '@/mixins/ImageMixin.js';

// components
import TrekListSkeleton from '@/components/skeletons/TrekListSkeleton';
import TrekListItem from '@/components/TrekListItem.vue'

export default {
  name: 'TrekList',
  components: {
    TrekListSkeleton,
    TrekListItem,
  },
  mixins: [ ImageMixin ],
  metaInfo() {
    if (this.massif && this.massif.name && this.trekList) {
      return {
        meta: [
          // Google
          { name: 'description', content: `Découvrez des randonnées sportives, engagées, parfois vertigineuses et toujours loin des foules dans le massif ${this.massif.connector} ${this.massif.name}` },
          // Facebook
          { property: 'og:title', content: `Randonnées sportives dans le massif ${this.massif.connector} ${this.massif.name}` },
          { property: 'og:description', content: `Découvrez des randonnées sportives, engagées, parfois vertigineuses et toujours loin des foules dans le massif ${this.massif.connector} ${this.massif.name}` },
          { property: 'og:url', content: `https://monpetitsommet.fr/massifs/${this.$route.params.massif}/randonnees` },
          { property: 'og:type', content: 'website' },
          // Twitter Card
          { name: 'twitter:title', content: `Randonnées sportives dans le massif ${this.massif.connector} ${this.massif.name}` },
          { name: 'twitter:description', content: `Découvrez des randonnées sportives, engagées, parfois vertigineuses et toujours loin des foules dans le massif ${this.massif.connector} ${this.massif.name}` },
        ].concat(this.trekList[0].introduction.image !== undefined ? [
          { property: 'og:image', content: this.getImage([this.trekList[0].introduction.image], 0, { height: 450 }) },
          { property: 'og:image:width', content: '600' },
          { property: 'og:image:height', content: '450' },
          { name: 'twitter:image', content: this.getImage([this.trekList[0].introduction.image], 0, { height: 450 }) },
        ] : []),
      };
    }
  },
  data: () => ({
    trekList: undefined,
    massif: undefined,
    isLoading: false,
  }),
  computed: {
    title() {
      return this.trekList.length > 1
        ? `${this.trekList.length} randonnées dans ce massif`
        : `${this.trekList.length} randonnée dans ce massif`
    },
  },
  watch: {
    $route: {
      async handler() {
        this.isLoading = true;
        this.isError = false;
        try {
          this.massif = massifs.find(massif => massif.key === this.$route.params.massif);
          this.trekList = await getTrekList(this.$route.params.massif);
        } catch (error) {
          this.isError = true;
        }
        this.isLoading = false;
      },
      immediate: true,
    },
  },
}
</script>
