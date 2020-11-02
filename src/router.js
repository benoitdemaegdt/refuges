import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';

// import views
const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue');
const Blog = () => import(/* webpackChunkName: "blog" */ '@/views/Blog.vue');
const About = () => import(/* webpackChunkName: "about" */ '@/views/About.vue');
const Contact = () => import(/* webpackChunkName: "contact" */ '@/views/Contact.vue');
const ShackList = () => import(/* webpackChunkName: "shackList" */ /* webpackPrefetch: true */ '@/views/ShackList.vue');
const ShackDetails = () => import(/* webpackChunkName: "shackDetails" */ '@/views/ShackDetails.vue');
const TrekList = () => import(/* webpackChunkName: "trekList" */ /* webpackPrefetch: true */ '@/views/TrekList.vue');
const TrekDetails = () => import(/* webpackChunkName: "trekDetails" */ '@/views/TrekDetails.vue');
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
      path: '/blog',
      name: 'blog',
      component: Blog,
    },
    {
      path: '/a-propos',
      name: 'about',
      component: About,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    {
      path: '/massifs/:massif/refuges',
      name: 'shackList',
      component: ShackList,
    },
    {
      path: '/massifs/:massif/refuges/:refuge',
      name: 'shackDetails',
      component: ShackDetails,
    },
    {
      path: '/massifs/:massif/randonnees/',
      name: 'trekList',
      component: TrekList,
    },
    {
      path: '/massifs/:massif/randonnees/:randonnee',
      name: 'trekDetails',
      component: TrekDetails,
    },
    {
      path: '*',
      component: NotFound,
    }
  ],
});

export default router;
