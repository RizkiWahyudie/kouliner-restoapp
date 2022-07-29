import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import FoodsView from './views/FoodsView.vue';
import FoodsDetail from './views/FoodsDetail.vue';

const router = createRouter({
    // history dan routes merupakan syntax bawaan dari vue router
    history: createWebHistory(),
    routes: [
        // {path: '/teams', component: TeamsList},
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/foods',
            name: 'foods',
            component: FoodsView
        },
        {
            path: '/foods/:id',
            name: 'detail',
            component: FoodsDetail
        }
    ],
    linkActiveClass: 'active'
});

export default router;