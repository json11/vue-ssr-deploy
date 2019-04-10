// import Todo from '../views/todo/todo.vue';
//
// import Login from '../views/login/login.vue';

export default [
    {
      path: '/',
      redirect: '/app'
    },
    {
        path: '/app',
        component: () => import(/* webpackChunkName: "todo-view" */ '../views/todo/todo.vue'),
        // component: Todo
    },
    {
        path: '/login',
        // component: Login
        component: () => import(/* webpackChunkName:"login-view" */ '../views/login/login.vue')
    }
]