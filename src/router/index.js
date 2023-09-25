import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import store from '@/store';



const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/principalProveedor',
    name: 'principalProveedor',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/PrincipalProveedor.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {

    if (store.state.auth.isAuthenticated) {

      next();
    } else {

      next('/');
    }
  } else {
    next(); 
  }
});


export default router
