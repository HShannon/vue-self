import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import store from './store'
import router from './router' 
import './styles/normalize.scss'
import './styles/app.scss'
import './styles/pages/common.scss'
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
Vue.component(VueCropper);
Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.component('v-icon', Icon)
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
