import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'
import loginPage from "../views/loginPage";
import registerPage from "../views/registerPage";
import homePage from "../views/homePage";

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: loginPage
  },
  {
    path: '/home',
    name: 'Home',
    component: homePage
  },{
    path: '/register',
    name: 'Register',
    component: registerPage
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
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
