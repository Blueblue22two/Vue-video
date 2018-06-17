/**
 * Created by Laughing on 2018/3/5.
 */
import Vue from 'vue'
import Router from 'vue-router'
import hotLine from '../hotLine/hotLine.vue'
import cinecism from '../cinecism/cinecism.vue'
import top250 from '../top250/top250.vue'
import info from '../info/info.vue'
import cinecismInfo from '../info/cinecismInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/hotLine'
    },
    {
      path: '/hotLine',
      component: hotLine
    },
    {
      path: '/cinecism',
      component: cinecism
    },
    {
      path: '/top250',
      component: top250
    },
    {
      path: '/info',
      name: 'info',
      component: info
    },
    {
      path: '/cinecismInfo',
      name: 'cinecismInfo',
      component: cinecismInfo
    }
  ]
})
