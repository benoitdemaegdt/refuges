<template>
  <v-container fluid class="pt-0">
    <v-row class="section" :class="`section-height-${screenWidth < $vuetify.breakpoint.thresholds.sm ? 'mobile' : 'desktop'}`">
      <v-img
        height="100%"
        :lazy-src="getImage(image, 0, { height: sreenHeight, type: 'preload' })"
        :src="getImage(image, 0, { height: sreenHeight })"
      >
        <v-sheet color="transparent" class="overflow-y-auto" height="100%">
          <v-row
            class="mr-0 ml-0"
            align="center"
            justify="center"
            :style="`height: ${screenWidth < $vuetify.breakpoint.thresholds.sm ? '60%' : '70%'};`"
          >
            <v-col cols="10" sm="6">
              <h1 class="font-weight-black display-1 white--text">Votre prochaine aventure en montagne<br>commence ici</h1>
              <v-autocomplete
                class="mt-8"
                v-model="searchMassif"
                flat
                solo
                background-color="#EEEEEE"
                hide-details
                no-data-text="Ce massif sera bientôt ajouté 🙂"
                clearable
                :prepend-inner-icon="mdiMagnify"
                label="Choisir un massif"
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
        </v-sheet>
      </v-img>
    </v-row>
    <v-row
      justify="center"
      align="center"
      class="section"
      :class="`section-height-${screenWidth < $vuetify.breakpoint.thresholds.sm ? 'mobile' : 'desktop'}`"
    >
      <h2
        :class="`home-title font-weight-black display-${screenWidth < $vuetify.breakpoint.thresholds.sm ? '1' : '3'}`">
          Préparez vos aventures en montagne en repérant les cabanes, abris et refuges qui abriteront vos nuits
        </h2>
    </v-row>
    <template v-if="screenWidth > 700">
      <!-- vercors -->
      <v-row>
        <v-col cols="12" sm="6">
          <v-img
            height="350px"
            max-width="450px"
            class="home-img"
            :src="getImage(descriptions.vercors.image, 0, { height: 200 })">
          </v-img>
        </v-col>
        <v-col cols="12" sm="6">
          <h3 class="home-content-title font-weight-black headline">{{ descriptions.vercors.title }}</h3>
          <p class="mt-4 pr-12">{{ descriptions.vercors.description }}</p>
          <v-btn class="mt-6" text outlined @click="$router.push({ name: 'shackList', params: { massif: 'vercors' }})">Voir les refuges</v-btn>
        </v-col>
      </v-row>
      <!-- belledonne -->
      <v-row class="mt-12">
        <v-col cols="12" sm="6">
          <h3 class="home-content-title font-weight-black headline">{{ descriptions.belledonne.title }}</h3>
          <p class="mt-4 pl-12">{{ descriptions.belledonne.description }}</p>
          <v-btn class="mt-6 ml-12" text outlined @click="$router.push({ name: 'shackList', params: { massif: 'belledonne' }})">Voir les refuges</v-btn>
        </v-col>
        <v-col cols="12" sm="6">
          <v-img
            height="350px"
            max-width="450px"
            class="home-img"
            :src="getImage(descriptions.belledonne.image, 0, { height: 200 })">
          </v-img>
        </v-col>
      </v-row>
      <!-- chartreuse -->
      <v-row class="mt-12">
        <v-col cols="12" sm="6">
          <v-img
            height="350px"
            max-width="450px"
            class="home-img"
            :src="getImage(descriptions.chartreuse.image, 0, { height: 200 })">
          </v-img>
        </v-col>
        <v-col cols="12" sm="6">
          <h3 class="home-content-title font-weight-black headline">{{ descriptions.chartreuse.title }}</h3>
          <p class="mt-4 pr-12">{{ descriptions.chartreuse.description }}</p>
          <v-btn class="mt-6" text outlined @click="$router.push({ name: 'shackList', params: { massif: 'chartreuse' }})">Voir les refuges</v-btn>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <!-- vercors -->
      <v-card flat>
        <v-img
          height="200px"
          :lazy-src="getImage(descriptions.vercors.image, 0, { height: 200, type: 'preload' })"
          :src="getImage(descriptions.vercors.image, 0, { height: 200 })"></v-img>
        <v-card-title>{{ descriptions.vercors.title }}</v-card-title>
        <v-card-text>{{ descriptions.vercors.description }}</v-card-text>
        <v-card-actions>
          <v-btn text outlined @click="$router.push({ name: 'shackList', params: { massif: 'vercors' }})">voir les refuges</v-btn>
        </v-card-actions>
      </v-card>
      <!-- belledonne -->
      <v-card flat class="mt-8">
        <v-img
          height="200px"
          :lazy-src="getImage(descriptions.belledonne.image, 0, { height: 200, type: 'preload' })"
          :src="getImage(descriptions.belledonne.image, 0, { height: 200 })"></v-img>
        <v-card-title>{{ descriptions.belledonne.title }}</v-card-title>
        <v-card-text>{{ descriptions.belledonne.description }}</v-card-text>
        <v-card-actions>
          <v-btn text outlined @click="$router.push({ name: 'shackList', params: { massif: 'belledonne' }})">voir les refuges</v-btn>
        </v-card-actions>
      </v-card>
      <!-- chartreuse -->
      <v-card flat class="mt-8">
        <v-img
          height="200px"
          :lazy-src="getImage(descriptions.chartreuse.image, 0, { height: 200, type: 'preload' })"
          :src="getImage(descriptions.chartreuse.image, 0, { height: 200 })"></v-img>
        <v-card-title>{{ descriptions.chartreuse.title }}</v-card-title>
        <v-card-text>{{ descriptions.chartreuse.description }}</v-card-text>
        <v-card-actions>
          <v-btn text outlined @click="$router.push({ name: 'shackList', params: { massif: 'chartreuse' }})">voir les refuges</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-container>
</template>

<script>
// icons
import { mdiMagnify } from '@mdi/js';

// data
import massifs from '@/data/massifs.json';

// mixins
import ImageMixin from '@/mixins/ImageMixin.js';
import LayoutMixin from '@/mixins/LayoutMixin.js';

export default {
  name: 'Home',
  mixins: [ ImageMixin, LayoutMixin ],
  metaInfo() {
    return {
      titleTemplate: null,
      meta: [
        // Google
        { name: 'description', content: 'Préparez votre randonnée en repérant les cabanes, abris et refuges de montagne !' },
        // Facebook
        { property: 'og:title', content: 'Mon Petit Sommet' },
        { property: 'og:description', content: 'Préparez votre randonnée en repérant les cabanes, abris et refuges de montagne !' },
        { property: 'og:url', content: 'https://monpetitsommet.fr/' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: this.image },
        { property: 'og:image:width', content: '1920' },
        { property: 'og:image:height', content: '1440' },
        // Twitter Card
        { name: 'twitter:title', content: 'Mon Petit Sommet' },
        { name: 'twitter:description', content: 'Préparez votre randonnée en repérant les cabanes, abris et refuges de montagne !' },
        { name: 'twitter:image', content: this.image },
      ],
    };
  },
  data: () => ({
    mdiMagnify,
    searchMassif: massifs.map(massif => ({
      title: massif.name,
      key: massif.key,
      subtitle: `${massif.location.region} | ${massif.location.department}`,
    })),
    image: ['https://res.cloudinary.com/monpetitsommet/image/upload/v1591291716/home/home_ofwjs8.png'],
    descriptions: {
      vercors: {
        title: `Parcourir l'immensité du Vercors`,
        description: `Été comme hiver, le Vercors est un fantastique terrain de jeu pour des sorties en pleine nature.
          Il abrite en particulier la très sauvage et préservée réserve naturelle des « Hauts-Plateaux »
          qui s'étend sur plus de 17 000 hectares et reste à ce jour la plus grande réserve naturelle de France métropolitaine.`,
        image: ['https://res.cloudinary.com/monpetitsommet/image/upload/v1591631199/home/vercors_lkgmgv.jpg'],
      },
      belledonne: {
        title: `Prendre de l'altitude en Belledonne`,
        description: `Avec ses sommets enneigés, ses lacs et ses glaciers, Belledonne est un massif de moyenne montagne situé à proximité immédiate de Grenoble.
          Ce massif est très réputé parmi les adeptes du ski de rando qui viennent y chercher de la poudreuse et des pentes raides.
          Les randonneurs estivaux ne sont pas en reste : le tout nouveau GR 738, long de 130km, permet de réaliser le Haute Traversée de Belledonne.`,
        image: ['https://res.cloudinary.com/monpetitsommet/image/upload/v1591631199/home/belledonne_p8kbuc.jpg'],
      },
      chartreuse: {
        title: `S'imprégner de nature en Chartreuse`,
        description: `On vient en Chartreuse pour son accès facile, sa nature verdoyante et ses immenses espaces.
          Entre la Chamechaude, Le cirque de Saint-Même et la réserve naturelle des Hauts de Chartreuse, ce massif regorge de merveilles.
          À découvrir en été comme en hiver.`,
        image: ['https://res.cloudinary.com/monpetitsommet/image/upload/v1591631199/home/chartreuse_se4al7.jpg'],
      },
    },
  }),
  watch: {
    searchMassif: {
      handler(newRoute) {
        if (newRoute) {
          this.$router.push({ name: 'shackList', params: { massif: newRoute.key }})
        }
      },
    },
  },
}
</script>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
}

.section-height-desktop {
  height: calc(100vh - 64px);
}

.section-height-mobile {
  height: calc(100vh - 56px);
}

/* If the screen size is 1101px wide or more */
@media screen and (min-width: 801px) {
  .home-title {
    max-width: 80%;
    text-align: center;
  }
}
/* If the screen size is 800px wide or less */
@media screen and (max-width: 800px) {
  .home-title {
    max-width: 95%;
    text-align: center;
  }
}

.v-card__title {
  word-break: normal;
}

.home-img {
  border-radius: 8px;
  box-shadow: 0 3px 20px 0 rgba(0,0,0,.2);
  margin: auto;
}

.home-content-title {
  text-align: center;
}
</style>
