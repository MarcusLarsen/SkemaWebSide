import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import SkemaView from '../views/SkemaView.vue';
import RegisterView from '../views/RegisterView.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView }, 
  { path: '/skema', component: SkemaView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;