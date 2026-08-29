import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/introduce',
      name: 'home',
      component: () => import('../views/HomePageView.vue'),
      meta: { hideSidebar: true }
    },
    {
      path: '/docs',
      redirect: '/docs/overview'
    },
    {
      path: '/docs/overview',
      alias: '/overview',
      name: 'overview',
      component: () => import('../views/EamOverviewView.vue')
    },
    {
      path: '/docs/module-engine',
      alias: '/module-engine',
      name: 'module-engine',
      component: () => import('../views/EamEngineView.vue')
    },
    {
      path: '/docs/database',
      alias: ['/database', '/submodules'],
      name: 'database',
      component: () => import('../views/EamDatabaseView.vue')
    },
    {
      path: '/docs/architecture',
      alias: '/architecture',
      redirect: '/docs/overview'
    },
    {
      path: '/docs/deployment',
      alias: '/deployment',
      name: 'deployment',
      component: () => import('../views/EamDeployView.vue')
    },
    {
      path: '/docs/apis',
      alias: '/apis',
      name: 'apis',
      component: () => import('../views/EamApisView.vue')
    },
    {
      path: '/docs/schema/class',
      alias: '/schema/class',
      name: 'schema-class',
      component: () => import('../views/SchemaClassView.vue')
    },
    {
      path: '/docs/schema/api',
      alias: '/schema/api',
      name: 'schema-api',
      component: () => import('../views/SchemaApiView.vue')
    },
    {
      path: '/docs/schema/generator',
      alias: '/schema/generator',
      name: 'schema-generator',
      component: () => import('../views/SchemaGenView.vue')
    },
    {
      path: '/docs/schema/api-generator',
      alias: '/schema/api-generator',
      name: 'schema-api-generator',
      component: () => import('../views/SchemaApiGenView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
