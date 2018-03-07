import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/login/LoginComponent.js'
import Admin from '@/components/admin/AdminComponent.js'
import Dashboard from '@/components/dashboard/DashboardComponent.js'
import Library from '@/components/library/LibraryComponent.js'
import Reclain from '@/components/reclain/ReclainComponent'
import Clone from '@/components/clone/CloneComponent.js'
import Users from '@/components/users/UsersComponent.js'

import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true
      },
      children: [
        {path: 'dashboard', name: 'dashboard', component: Dashboard},
        {path: 'library', name: 'library', component: Library},
        {path: 'reclain-brochure', name: 'reclain', component: Reclain},
        {path: 'clone-brochure', name: 'clone', component: Clone},
        {path: 'users', name: 'users', component: Users}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next({path: '/'})
  else if (!requiresAuth && currentUser) next({path: '/admin'})
  else next()
})

export default router