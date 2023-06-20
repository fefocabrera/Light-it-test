import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import EvaluationView from '../views/EvaluationView.vue'
import DiagnosesHistoryView from '../views/DiagnosesHistoryView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/evaluation',
        name: 'evaluation',
        component: EvaluationView
    },
    {
        path: '/diagnosesHistory',
        name: 'diagnosesHistory',
        component: DiagnosesHistoryView
    },
  ]
  
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
  export default router