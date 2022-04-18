import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/pages/app/Layout';
import Main from '@/pages/app/Main';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '/', name: '主页', component: Main }
      ]
    }
  ]
});
