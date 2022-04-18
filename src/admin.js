import 'hui-vue/dist/index.css';
import '@/style/main.less';
import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Hex, filters } from 'hui-vue';
import App from '@/pages/app/App';
import router from '@/router';
import store from '@/store';

Vue.use(Element, { size: 'mini' });
Vue.prototype.hex = Hex;
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
/* eslint-enable no-new */
