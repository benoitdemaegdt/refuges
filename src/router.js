import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';

// import views
const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue');
const About = () => import(/* webpackChunkName: "about" */ '@/views/About.vue');
const Massifs = () => import(/* webpackChunkName: "massifs" */ /* webpackPrefetch: true */ '@/views/Massifs.vue');
const Shacks = () => import(/* webpackChunkName: "shacks" */ '@/views/Shacks.vue');
const NotFound = () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound.vue');

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
      path: '/massifs/:massif/refuges',
      name: 'shackList',
      component: Massifs,
    },
    {
      path: '/massifs/:massif/refuges/:refuge',
      name: 'shackDetails',
      component: Shacks,
    },
    {
      path: '*',
      component: NotFound,
    }
  ],
});

export default router;