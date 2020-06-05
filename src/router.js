import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';

// import views
const Home = () => import('@/views/Home.vue');
const About = () => import('@/views/About.vue');
const Massifs = () => import('@/views/Massifs.vue');
const Shacks = () => import('@/views/Shacks.vue');
const NotFound = () => import('@/views/NotFound.vue');

Vue.use(VueRouter);
Vue.use(VueMeta);

const router = new VueRouter({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/a-propos',
      name: 'about',
      component: About,
    },
    {
      path: '/massifs/:name',
      name: 'massifs',
      component: Massifs,
    },
    {
      path: '/massifs/:massif/cabanes/:cabane',
      name: 'shacks',
      component: Shacks,
    },
    {
      path: '*',
      component: NotFound,
    }
  ],
});

export default router;