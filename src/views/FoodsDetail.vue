<template>
    <div class="detailContainer">
        <div class="detail">
            <div class="detailLeft">
                <router-link to="/foods">
                    <font-awesome-icon icon="fa-solid fa-angle-left" class="absolute text-xl m-3 bg-gray-100/75 text-gray-700 py-2 px-3 rounded-full md:hidden" />
                </router-link>
                <!-- <bread-crumb class="absolute -top-20"></bread-crumb> -->
                <img :src="selectedFood.gambar" alt="">
            </div>
            <div class="detailRight">
                <h1 class="text-3xl font-bold">{{ selectedFood.nama }}</h1>
                <div class=" h-[1px] bg-gray-100 mt-2 mb-3"></div>
                <span class="text-base text-gray-600">Harga :  </span><span class="text-xs text-amber-500 font-bold">Rp. <span class="text-amber-500 text-lg">{{ selectedFood.harga }}</span></span>
                <div class="mt-2">
                    <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900">Jumlah Pesan</label>
                    <input type="number" class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div class="mt-3">
                    <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900">Keterangan</label>
                    <textarea class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                <button><font-awesome-icon icon="fa-solid fa-clipboard" class="text-slate-100 mr-1" /> Pesan</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
// import BreadCrumb from '../components/BreadCrumb.vue';

export default {
    components: {
        // BreadCrumb
    },
    data() {
        return {
            products: [],
            selectedFood: {},
            filterFoods: null
        }
    },
    methods: {
        getData() {
            axios.get('https://restovue-9057d-default-rtdb.asia-southeast1.firebasedatabase.app/products.json')
            .then((response) => {
                const results = [];
                for(const i in response.data) {
                    results.push({
                        id: response.data[i].id,
                        kode: response.data[i].kode,
                        nama: response.data[i].nama,
                        harga : response.data[i].harga,
                        is_ready: response.data[i].is_ready,
                        gambar: response.data[i].gambar
                    })
                }
                const params = this.$route.params.id;
                this.selectedFood = results.find(food => food.kode === params);
            })
            .catch((error) => {
                // handle error
                console.log('Gagal : ' + error);
            })
        }
    },
    mounted() {
        this.getData();
    }
}
</script>