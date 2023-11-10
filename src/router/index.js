import { createRouter, createWebHistory } from 'vue-router'
import login from '../pages/login/Login.vue'
import firebase from 'firebase'

const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: 'Entrar',
      public: true
    },
    component: login
  },
  {
    path: '/login/:email?/:password?',
    name: 'login',
    meta: {
      title: 'Entrar',
      public: true
    },
    component: login
  },
  {
    path: '/users/:searchValue?',
    name: 'users',
    meta: {
      title: 'Clientes'
    },
    component: () => import(/* webpackChunkName: "Login" */ '../pages/users/Users.vue')
  },
  {
    path: '/home/',
    name: 'home',
    meta: {
      title: 'Resumo'
    },
    component: () => import(/* webpackChunkName: "Home" */ '../pages/home/Home.vue')
  },
  {
    path: '/hotleads/',
    name: 'hotleads',
    meta: {
      title: 'Hot Leads'
    },
    component: () => import(/* webpackChunkName: "HotLeads" */ '../pages/hotleads/Leads.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = 'Simples Hub | ' + to.meta.title
  document.public = to.meta.public
  if (to.matched.some(record => !record.meta.public)) {
    if (!firebase.auth().currentUser) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
