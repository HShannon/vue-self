import Vue from 'vue'
import Router from 'vue-router'
import {routes, paths} from '@/router/routerConfig'
Vue.use(Router)
var router = new Router({
  mode: 'history',
  routes
})

router.beforeEach( (to, from, next) => {
  next();
})

export default router;
