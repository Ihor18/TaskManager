require('./bootstrap');



import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import App from './components/ExampleComponent'
import Todos from './components/Todos'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/todos/:id',
            name: 'todos',
            component: Todos
        },
    ],
});

window.onload = function () {
    const app = new Vue({
        el: '#app',
        components: { App },
        router,
    });

}
