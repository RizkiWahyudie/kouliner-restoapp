<template>
    <div class="relative">
        <div class="containerr mb-40">
            <tittle-cart
                icon="fa-clock-rotate-left"
                title="History Order"
                promo="Mau memesan lagi?"
                desc="Masih bisa nambah pesanan lagi, ya"
                btn="Tambah"
            ></tittle-cart>
            <div v-for="order in pesanan" :key="order.key" class="shadow rounded-lg bg-slate-100">
                <div class="w-full p-4 rounded-lg mt-4 relative bg-white cursor-pointer" @click="changeState(order.key)">
                    <div class="flex">
                        <font-awesome-icon icon="fa-solid fa-utensils" class="text-white bg-amber-500 p-3 rounded-xl text-2xl" />
                        <div class="ml-3">
                            <h2 class="font-semibold text-lg">{{ order.guest }}</h2>
                            <h5 class="text-sm">Total: {{ convert(order.bayar) }}</h5>
                        </div>
                        <div class="absolute right-3 bottom-3 flex items-center"><font-awesome-icon icon="fa-solid fa-bell" class="mr-1" /><span class="bg-amber-100 py-0.5 px-2 rounded text-xs font-semibold text-amber-800">{{ order.noMeja }}</span></div>
                        <div class="absolute right-7 top-2 transition-all ease-in-out" :class="order.state ? 'rotate-180' : ''"><font-awesome-icon icon="fa-solid fa-angle-up" /></div>
                        <div class="absolute left-1 top-1">
                            <div class="relative">
                                <font-awesome-icon icon="fa-solid fa-certificate" class="text-amber-500 text-3xl" />
                                <span class="absolute right-2 text-xs font-semibold text-white top-2">{{ order.listOrder.length }}x</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 py-2 text-sm bg-slate-100">
                    <transition-group name="animate">
                        <div class="flex justify-between">
                            <div class="flex items-center">
                                <font-awesome-icon icon="fa-solid fa-calendar-days" class="text-white bg-slate-700 text-xs p-1 rounded-full" />
                                <span class="block text-sm ml-1">{{ order.dateOrder }}</span>
                            </div>
                            <div class="flex items-center">
                                <span class="block text-sm ml-1">{{ order.timeOrder }}</span>
                            </div>
                        </div>
                        <div v-if="order.state" class="">
                            <div class="flex justify-between py-2">
                                <p>No. Meja</p>
                                <p>{{ order.noMeja }}</p>
                            </div>
                            <div class="border-dashed border-b-2 mb-2"></div>
                            <div v-for="makanan in order.listOrder" :key="makanan.key" class="mb-2">
                                <div class="flex justify-between">
                                    <span class="font-semibold">{{ makanan.products.nama }} ({{ makanan.jumlah_pesanan }})</span>
                                    <span>{{ convert(makanan.totalHarga) }}</span>
                                </div>
                                <p class="text-xs block ml-3">Catatan: {{ makanan.keterangan }}</p>
                            </div>
                            <div class="border-dashed border-b-2 mb-2"></div>
                            <div class="flex justify-between">
                                <span>Total Bayar</span>
                                <span class="font-bold">{{ convert(order.bayar) }}</span>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TittleCart from '../components/TittleCart.vue'
import checkout from '../firebase/checkout.js';

export default {
    components: {
        TittleCart
    },
    data() {
        return {
            pesanan: [],
            state: false
        }
    },
    methods: {
        convert(num) {
            return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            }).format(num);
        },
        changeState(key) {
            const state = this.pesanan.find((order) => order.key === key)
            state.state = !state.state
        },
        getPesanan(items) {
            const order = [];

            items.forEach((item) => {
                const key = item.key;
                const data = item.val();
                order.unshift({
                    key: key,
                    dateOrder: data.dateOrder,
                    timeOrder: data.timeOrder,
                    guest: data.guest,
                    noMeja: data.noMeja,
                    listOrder: data.checkout,
                    bayar: data.totalBayar,
                    state: false
                })
            })

            this.pesanan = order;
            // console.log(this.pesanan)
        },
    },
    mounted() {
        checkout.getAll().on('value', this.getPesanan);
    }
}
</script>