import * as VueRouter from 'vue-router'
import FilterView from './views/filter.vue'
import RegionView from './views/region.vue'
import Demo from './views/demo.vue'
const routes = [
  {
    path: '/',
    redirect: '/filter'
  },
  {
    path: '/filter',
    component: FilterView
  },
  {
    path: '/region',
    component: RegionView
  },
  {
    path: '/demo',
    component: Demo
  }
]
export default VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})
