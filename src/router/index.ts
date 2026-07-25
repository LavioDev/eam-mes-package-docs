import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/architecture'
    },
    {
      path: '/architecture',
      name: 'architecture',
      component: () => import('../views/EamArchView.vue')
    },
    {
      path: '/deployment',
      name: 'deployment',
      component: () => import('../views/EamDeployView.vue')
    },
    {
      path: '/apis',
      name: 'apis',
      component: () => import('../views/EamApisView.vue')
    },
    {
      path: '/schema/class',
      name: 'schema-class',
      component: () => import('../views/SchemaClassView.vue')
    },
    {
      path: '/schema/api',
      name: 'schema-api',
      component: () => import('../views/SchemaApiView.vue')
    },
    {
      path: '/schema/generator',
      name: 'schema-generator',
      component: () => import('../views/SchemaGenView.vue')
    },
    {
      path: '/schema/api-generator',
      name: 'schema-api-generator',
      component: () => import('../views/SchemaApiGenView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/architecture'
    }
  ]
})

export default router
