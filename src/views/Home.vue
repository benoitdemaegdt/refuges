<template>
  <v-container fluid class="pt-0">

    <!-- first section -->
    <v-row class="section" align="center">
      <v-row class="landing-main-row" :style="`height: ${isMobile ? '100' : '90'}%;`" align="center" justify="center" no-gutters>
        <div class="image" v-if="!isMobile">
          <v-img  width="100%" height="100%" :src="getImage(image, 0, { height: sreenHeight })"></v-img>
        </div>
        <v-col cols="12" md="11" class="landing-second-row" :style="`height: ${isMobile ? '90' : '80'}%;`" no-gutters>
          <v-row align="center" justify="center" style="height: 100%;" no-gutters>
            <v-col cols="11" md="5" offset-md="6" no-gutters>
              <h1 :style="mainTitleStyle">Préparez votre prochaine aventure en montagne</h1>
              <p :style="mainSubtitleStyle">Découvrez les topos détaillés d'aventures sportives en montagne. Parfois engagées. Souvent loin des foules. Toujours mémorables.</p>
              <v-btn class="mt-8" outlined large color="white">voir les topos →</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-row>

    <!-- second section -->
    <v-row  class="mt-8 mb-4" justify="center" no-gutters>
      <h2 :style="sectionTitleStyle">Randonnez en autonomie sur plusieurs jours</h2>
    </v-row>
    <v-row justify="center" class="mb-4" no-gutters>
      <v-col cols="12" md="9">
        <p :style="sectionSubtitleStyle">
          Des randonnées, il y en a pour tout le monde et pour tous les goûts. On laissera ici de côté les sorties familiales
          pour ne présenter que des topos détaillés de randonnées exigeantes. Plus de 1500m de dénivelé par jour en moyenne, de la distance,
          des itinéraires parfois techniques ou peu visibles et toujours au moins une nuit en montagne. Car quoi de plus dépaysant que
          d'installer son bivouac au soleil tombant en attendant les étoiles...
        </p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-for="trek in trekList" :key="trek.key" cols="12" sm="4">
        <v-row justify="center">
          <TrekListItem :trek="trek" :isExpandable="false" />
        </v-row>
      </v-col>
    </v-row>

    <!-- third section -->
    <v-row  class="mt-8 mb-4" justify="center" no-gutters>
      <h2 :style="sectionTitleStyle">Dormez en refuge ou en cabane non gardée</h2>
    </v-row>
    <v-row justify="center" class="mb-4" no-gutters>
      <v-col cols="12" md="9">
        <p :style="sectionSubtitleStyle">
          En plus des refuges, on trouve de nombreuses cabanes non gardées dans les massifs français. Il s'agit la plupart du temps
          d'abris très sommaires, ouverts été comme hiver afin d'accueillir les randonneurs de passage. Passer une nuit
          dans l'une de ces cabanes est une occasion unique de vivre une expérience inoubliable en plein coeur de la nature.
        </p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-for="shack in shackList" :key="shack.key" cols="12" sm="4">
        <v-row justify="center">
          <ShackListItem vertical :shack="shack" />
        </v-row>
      </v-col>
    </v-row>

    <!-- 4th section -->
    <v-row class="mt-8 mb-4" justify="center" no-gutters>
      <h2 :style="sectionTitleStyle">Découvrez vos prochaines aventures</h2>
    </v-row>
    <v-row justify="center" no-gutters>
      <v-col cols="12" md="9">
        <p :style="sectionSubtitleStyle">
          Randonnées, bivouac, escalade, alpinisme, ski de rando et même snowkite : des aventures en montagne il y en a pour tous les goûts !
          Inscrivez vous à la newsletter de Mon Petit Sommet pour recevoir directement dans votre boite mail les dernières sorties publiées sur le site.
        </p>
      </v-col>
    </v-row>
    <v-row class="my-4" justify="center" no-gutters>
      <iframe src="https://monpetitsommet.substack.com/embed" width="700px" height="250" style="border:1px solid #EEE; background:white;" frameborder="0" scrolling="no"></iframe>
    </v-row>

    <!-- footer -->
    <v-footer padless light>
      <v-card flat tile class="grey lighten-3 text-center" width="100%">
        <v-card-text>
          <v-btn v-for="icon in footerIcons" :key="icon" class="mx-4" icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="pt-0">
          Grâce à Mon Petit Sommet, découvrez les topos détaillés d'aventures sportives en montagne.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          {{ new Date().getFullYear() }} — <strong>Mon Petit Sommet</strong>
        </v-card-text>
      </v-card>
    </v-footer>

  </v-container>
</template>

<script>
// icons
import { mdiFacebook, mdiTwitter, mdiInstagram } from '@mdi/js';

// mixins
import ImageMixin from '@/mixins/ImageMixin.js';
import LayoutMixin from '@/mixins/LayoutMixin.js';

// components
import TrekListItem from '@/components/TrekListItem.vue';
import ShackListItem from '@/components/shackListItem/ShackListItem.vue';

export default {
  name: 'Home',
  components: {
    TrekListItem,
    ShackListItem,
  },
  mixins: [ ImageMixin, LayoutMixin ],
  metaInfo() {
    return {
      titleTemplate: null,
      meta: [
        // Google
        { name: 'description', content: "Découvrez les topos détaillés d'aventures sportives en montagne. Parfois engagées. Souvent loin des foules. Toujours mémorables." },
        // Facebook
        { property: 'og:title', content: 'Mon Petit Sommet' },
        { property: 'og:description', content: "Découvrez les topos détaillés d'aventures sportives en montagne. Parfois engagées. Souvent loin des foules. Toujours mémorables." },
        { property: 'og:url', content: 'https://monpetitsommet.fr/' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: this.image },
        { property: 'og:image:width', content: '1920' },
        { property: 'og:image:height', content: '1440' },
        // Twitter Card
        { name: 'twitter:title', content: 'Mon Petit Sommet' },
        { name: 'twitter:description', content: "Découvrez les topos détaillés d'aventures sportives en montagne. Parfois engagées. Souvent loin des foules. Toujours mémorables." },
        { name: 'twitter:image', content: this.image },
      ],
    };
  },
  data: () => ({
    image: ['https://res.cloudinary.com/monpetitsommet/image/upload/v1604305406/vercors/randonnees/traversee-vercors-balcon-est/intro_xhbx3y.png'],
    trekList: [
      {
        title: 'Traversée des Bauges',
        key: 'traversee-bauges-frontenex-annecy',
        massif: 'bauges',
        summary: { distance: 66.8, elevation: 5150.15, duration: '3 à 4 jours', rating: "T2", from: 'Frontenex', to: 'Annecy' },
        introduction: {
          image: 'https://res.cloudinary.com/monpetitsommet/image/upload/v1603218138/bauges/randonnees/traversee-bauges-frontenex-annecy/intro_ppjy7g.jpg'
        }
      },
      {
        title: 'Traversée du Vercors (Balcon Est)',
        key: 'traversee-du-vercors-balcon-est',
        massif: 'vercors',
        summary: { distance: 46.02, elevation: 5110.85, duration: '2 à 3 jours', rating: 'T3', from: 'Clelles', to: 'Villard-de-Lans' },
        introduction: {
          image: 'https://res.cloudinary.com/monpetitsommet/image/upload/v1604305406/vercors/randonnees/traversee-vercors-balcon-est/intro_xhbx3y.png'
        },
      },
    ],
    shackList: [
      {
        name: 'Refuge de la Jasse du Play',
        type: 'cabane non gardée, Vercors',
        key: 'refuge-de-la-jasse-du-play',
        massif: 'vercors',
        images_outdoor: [
          'https://res.cloudinary.com/monpetitsommet/image/upload/h_800,f_auto/v1591018140/vercors/refuge-de-la-jasse-du-play-1_gw7gif.jpg',
        ],
        altitude: 1629, beds: 10, stove: true, water: true,
      },
      {
        name: 'Cabane des Aiguillettes',
        key: 'cabane-des-aiguillettes',
        type: 'cabane non gardée, Vercors',
        massif: 'vercors',
        images_outdoor: [
          'https://res.cloudinary.com/monpetitsommet/image/upload/h_800,f_auto/v1591018111/vercors/cabane-des-aiguillettes-1_i9komu.jpg',
        ],
        altitude: 1880, beds: 4, stove: false, water: true,
      },
      {
        name: 'Cabane des Chaumailloux',
        key: 'cabane-pnrv-des-chaumailloux',
        type: 'cabane non gardée, Vercors',
        massif: 'vercors',
        images_outdoor: [
          'https://res.cloudinary.com/monpetitsommet/image/upload/h_800,f_auto/v1591018146/vercors/cabane-pnrv-des-chaumailloux-1_ujyt32.jpg',
        ],
        altitude: 1665, beds: 19, stove: true, water: true,
      },
    ],
    footerIcons: [ mdiFacebook, mdiTwitter, mdiInstagram ],
  }),
  computed: {
    mainTitleStyle() {
      const baseStyle = { 'color': 'white' };
      const responsiveStyle = this.screenWidth < this.$vuetify.breakpoint.thresholds.xs
        ? { 'font-size': '35px' }
        : { 'font-size': '45px' };
      return {
        ...baseStyle,
        ...responsiveStyle,
      };
    },
    mainSubtitleStyle() {
      const baseStyle = { 'color': 'white', 'font-family': 'MrEaves', 'font-weight': '50', 'margin-top': '20px' };
      const responsiveStyle = this.screenWidth < this.$vuetify.breakpoint.thresholds.xs
        ? { 'font-size': '20px' }
        : { 'font-size': '26px' };
      return {
        ...baseStyle,
        ...responsiveStyle,
      };
    },
    sectionTitleStyle() {
      return this.screenWidth < this.$vuetify.breakpoint.thresholds.xs
        ? { 'font-size': '35px' }
        : { 'font-size': '45px' };
    },
    sectionSubtitleStyle() {
      const baseStyle = { 'font-family': 'MrEaves', 'text-align': 'justify' };
      const responsiveStyle = this.screenWidth < this.$vuetify.breakpoint.thresholds.xs
        ? { 'font-size': '20px' }
        : { 'font-size': '24px' };
      return {
        ...baseStyle,
        ...responsiveStyle,
      };
    },
  },
}
</script>

<style scoped>
.section {
  height: calc(100vh - 48px);
}

.landing-main-row {
  position: relative;
}

.landing-second-row {
  background-color: rgb(31, 55, 76);
}

.image {
  position: absolute;
  top: 0;
  left: 10%;
  height: 100%;
  width: 35%;
}

.v-card__title {
  word-break: normal;
}
</style>
