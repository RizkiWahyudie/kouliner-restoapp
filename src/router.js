import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import FoodsView from './views/FoodsView.vue';
import FoodsDetail from './views/FoodsDetail.vue';
import CartList from './views/CartList.vue';
import CheckoutSuccess from './components/CheckoutSuccess.vue';
import ListPesanan from '@/views/ListPesanan.vue';

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
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartList
        },
        {
            path: '/cart/checkout',
            name: 'checkout',
            component: CheckoutSuccess
        },
        {
            path: '/order',
            name: 'order',
            component: ListPesanan
        }
    ],
    linkActiveClass: 'active'
});

export default router;