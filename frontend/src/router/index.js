import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/', //adresse URL de la route
    name: 'Login', //Le nom
    component: Login //Le composant rendu à la visite
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/:pathMatch(.*)*', //Redirection si url incorrect
    name: 'not-found',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/admin/:id(\\d+)',
    name: 'AdminPage',
    component: () => import('../views/AdminPage.vue')
  },
  {
    path: '/profile/:id(\\d+)',
    name: 'ProfilePage',
    component: () => import('../views/ProfilePage.vue')
  },
  {
    path: '/profile/:id(\\d+)/update',
    name: 'ProfileUpdate',
    component: () => import('../views/ProfileUpdate.vue')
  },
  {
    path: '/profile/:id(\\d+)/delete',
    name: 'ProfileDelete',
    component: () => import('../views/ProfileDelete.vue')
  },
  {
    path: '/post/create',
    name: 'PostCreate',
    component: () => import('../views/PostCreate.vue')
  },
  {
    path: '/post/:id(\\d+)', //Alphanumérique obligatoire 
    name: 'PostUnique',
    component: () => import('../views/PostUnique.vue')
  },
  {
    path: '/post/:id(\\d+)/update', //Alphanumérique obligatoire 
    name: 'PostUpdate',
    component: () => import('../views/PostUpdate.vue')
  },
  {
    path: '/post/:id(\\d+)/comment/create', //Alphanumérique obligatoire 
    name: 'CommentCreate',
    component: () => import('../views/CommentCreate.vue')
  },
  {
    path: '/comment/:id(\\d+)/update', //Alphanumérique obligatoire 
    name: 'CommentUpdate',
    component: () => import('../views/CommentUpdate.vue')
  },
]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes
})

export default router
