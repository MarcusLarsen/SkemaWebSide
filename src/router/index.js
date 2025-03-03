import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SkemaView from '../views/SkemaView.vue'

const routes = [
  { path: '/', redirect: '/login' }, 
  { path: '/login', component: LoginView },
  { path: '/home', component: HomeView },
  { path: '/skema', component: SkemaView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
