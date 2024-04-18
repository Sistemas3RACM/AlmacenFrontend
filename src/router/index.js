import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login/Login.vue'
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
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/principalProveedor',
    name: 'principalProveedor',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Proveedor/PrincipalProveedor.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/principalSubcategoria',
    name: 'principalSubcategoria',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/PrincipalSubcategoria.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/principalUsuario',
    name: 'principalUsuario',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/PrincipalUsuario.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/principalCategorias',
    name: 'principalCategorias',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/CategoriaSubcategoria/PrincipalCategorias.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/principalMovimientos',
    name: 'principalMovimientos',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/PrincipalMovimientos.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/principalReportes',
    name: 'principalReportes',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Reportes/PrincipalReportes.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/reporteEntradas',
    name: 'reporteEntradas',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/ReporteEntradas.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/reporteSalidas',
    name: 'reporteSalidas',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/ReporteSalidas.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/principalProducto',
    name: 'principalProducto',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Producto/PrincipalProducto.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/principalInventario',
    name: 'principalInventario',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/PrincipalInventario.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/productosCategorias',
    name: 'productosCategorias',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/ProductosCategorias.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/productosTotales',
    name: 'productosTotales',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/ProductosTotales.vue'),
    meta: { requiresAuth: true },
  },
  {
    /*LAS RUTAS ESTAN MODIFICADAS PARA QUE FUNCIONEN EN EL SERVIDOR SOLO SE LE AGREGO SistemaAlmacen/dist/  A TODO*/
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
