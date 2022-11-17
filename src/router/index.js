import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'
import loginPage from "../views/loginPage";
import registerPage from "../views/registerPage";

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: loginPage
  },{
    path: '/register',
    name: 'Register',
    component: registerPage
  },
  {
    path: '/',
    component: TabsPage,
    children: [
      {
        path: 'home',
        component: () => import('@/views/homePage.vue')
      },
      {
        path: 'AddList',
        component: () => import('@/views/Tab2Page.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
