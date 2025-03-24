import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignInView from '../views/SignInView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/sign-in', component: SignInView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
