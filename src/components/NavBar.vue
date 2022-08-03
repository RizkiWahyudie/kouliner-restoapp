<template>
    <div class="absolute w-full md:z-50">
        <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded-b">
            <div class="container flex flex-wrap justify-between items-center mx-auto">
                <a href="#" class="flex items-center">
                    <img src="../assets/logo.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo">
                    <span class="self-center text-xl font-semibold whitespace-nowrap">Flowbite</span>
                </a>
                <div class="flex md:order-2">
                    <div class="flex items-center">
                        <font-awesome-icon icon="fa-solid fa-cart-shopping" class="text-grey-700 mr-1.5" />
                        <button class="text-xs navv block" @click="execute()">
                            <span v-if="!stateCart">{{cart.length}}</span>
                            <div v-else role="status">
                                <svg class="inline w-4 h-4 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </button>
                    </div>
                    <button type="button" @click="clickNav" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div class="justify-between items-center w-full md:flex md:w-auto md:order-1 z-50" :class="{'hidden' : stateBtn}">
                    <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li>
                            <router-link to="/" @click="clickNav" :class="navLink">Home</router-link>
                        </li>
                        <li>
                            <router-link to="/foods" @click="clickNav" :class="navLink">Foods</router-link>
                        </li>
                        <li>
                            <router-link to="/order" @click="clickNav" :class="navLink">
                                <font-awesome-icon icon="fa-solid fa-clock-rotate-left" />
                                Order
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
// import axios from 'axios';
import cart from '../firebase/cart.js';

export default {
    data() {
        return {
            stateBtn: true,
            cart: [],
            stateCart: false
        }
    },
    mounted() {
        this.execute()
    },
    methods: {
        clickNav() {
            this.stateBtn = !this.stateBtn
        },
        getCart(items) {
            this.stateCart = true
            const carts = [];

            items.forEach((item) => {
                const key = item.key;
                const data = item.val();
                carts.push({
                    key: key,
                    jumlah_pesanan: data.jumlah_pesanan,
                    keterangan: data.keterangan,
                    products: data.products,
                })
            })

            this.cart = carts;
            this.stateCart = false
        },
        execute() {
            cart.getAll().on('value', this.getCart);
        }
    },
    computed: {
        navLink() {
            return "font-semibold block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 md:border-0 md:hover:text-amber-700 md:p-0"
        }
    },
}
</script>