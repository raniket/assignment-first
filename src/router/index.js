import Vue from 'vue'
import Router from 'vue-router'
import Chart from '@/components/Chart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Chart',
      component: Chart
    }
  ]
})
