import { createRouter,createWebHashHistory } from 'vue-router'//createWebHistory
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      title:"首页"
    }
  },
  {
    path: '/database',
    name: 'database',
    component: () => import('../views/DatabaseView.vue'),
    meta: {
      title:"资料库详情"
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue'),
    meta: {
      title:"搜索"
    }
  },
  {
    path: '/link',
    name: 'link',
    component: () => import('../views/LinkView.vue'),
    meta: {
      title:"常用链接"
    }
  },
  {
    path: '/more',
    name: 'more',
    component: () => import('../views/MoreView'),
    meta: {
      title:"资料库"
    }
  },
  {
    path: '/iframe',
    name: 'iframe',
    component: () => import('../views/IframeView'),
    meta: {
      title:"链接"
    }
  },
  {
    path: '/iframeExam',
    name: 'iframeExam',
    component: () => import('../views/IframeExamView'),
    meta: {
      title:"在线考试"
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  document.title=to.meta.title
  next()
});



export default router
