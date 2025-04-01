import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignInView from '../views/SignInView.vue';
import TodoListView from '../views/TodoListView.vue';
import TaskView from '../views/TaskView.vue';
import SignUpView from '../views/SignUpView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/sign-in', component: SignInView },
  { path: '/sign-up', component: SignUpView },
  { path:'/todolist',component:TodoListView },
  { path:'/todolist/task/:id',component:TaskView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
