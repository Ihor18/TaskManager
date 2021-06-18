import { createWebHistory, createRouter } from 'vue-router';
import Todos from "./components/Todos";


const routes = [
    {
        path: '/todos/:id',
        name: 'home',
        component: Todos
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
