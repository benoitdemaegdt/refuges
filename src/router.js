import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';

// import views
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Massifs from '@/views/Massifs.vue';
import Shacks from '@/views/Shacks.vue';
import NotFound from '@/views/NotFound.vue';

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