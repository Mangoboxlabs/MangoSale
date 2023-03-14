import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AirdropHome',
    redirect:"/Airdrop",
  },
  {
    path: '/Token',
    name: 'Token',
    component: () => import( '../views/Token.vue')
  },
  {
    path: '/CreateToken',
    name: 'CreateToken',
    component: () => import( '../views/CreateToken.vue')
  },
  {
    path: '/Lock',
    name: 'Lock',
    component: () => import( '../views/Lock.vue')
  },
  {
    path: '/CreateLock',
    name: 'CreateLock',
    component: () => import( '../views/CreateLock.vue')
  },
  {
    path: '/LockDetail',
    name: 'LockDetail',
    component: () => import( '../views/LockDetail.vue')
  },
  {
    path: '/Airdrop',
    name: 'Airdrop',
    component: () => import( '../views/Airdrop.vue')
  },
  {
    path: '/AirdropDetail',
    name: 'AirdropDetail',
    component: () => import( '../views/AirdropDetail.vue')
  },
  {
    path: '/CreateProject',
    name: 'CreateProject',
    component: () => import( '../views/CreateProject.vue')
  },
  {
    path: '/CreateAirdrop',
    name: 'CreateAirdrop',
    component: () => import( '../views/CreateAirdrop.vue')
  },
  {
    path: '/TokenAdmin',
    name: 'TokenAdmin',
    component: () => import( '../views/TokenAdmin.vue')
  },
  {
    path: '/Details',
    name: 'Details',
    component: () => import( '../views/Details.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
