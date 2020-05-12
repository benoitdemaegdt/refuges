import Vue from 'vue'
import VueRouter from 'vue-router'

// import views
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Massifs from '@/views/Massifs.vue';
import Shacks from '@/views/Shacks.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/refuges',
      name: 'home',
      component: Home,
    },
    {
      path: '/a-propos',
      name: 'about',
      component: About,
    },
    {
      path: '/refuges/massifs/:name',
      name: 'massifs',
      component: Massifs,
    },
    {
      path: '/refuges/massifs/:massif/cabanes/:cabane',
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