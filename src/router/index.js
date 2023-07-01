import Vue from 'vue';
import Router from 'vue-router';
import DataSource from '@/pages/warehouse/DataSource';
import TableList from '@/pages/tables/TableList';
import TableDetail from '@/pages/tables/TableDetail';
import Layout from '@/pages/app/Layout';
import Main from '@/pages/app/Main';
import About from '@/pages/commons/About';
import Page404 from '@/pages/commons/Page404';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '/ds', name: '数据源', component: DataSource },
        { path: '/meta', name: '浏览数据', component: TableList },
        { path: '/meta/:id(\\d+)', name: '数据详情', component: TableDetail },
        { path: '/about', name: '关于', component: About },
        { path: '/', name: '主页', component: Main },
        { path: '*', name: '404', component: Page404 }
      ]
    }
  ]
});
