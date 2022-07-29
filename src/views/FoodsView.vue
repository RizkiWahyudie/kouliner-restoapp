<template>
    <div>
        <div class="containerr">
            <!-- PRODUCTS -->
            <h2 class="text-2xl mb-2 md:ml-3 pt-20">All <span class="font-bold">Foods</span></h2>
            <label class="sr-only">Search</label>
            <div class="md:mx-2">
                <div class="relative w-full mb-8">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" v-model="filterFoods" class="bg-white border border-gray-300 focus:outline-transparent text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5" placeholder="Search" required>
                </div>
            </div>
            <div class="flex mb-10 flex-col flex-wrap md:flex-row justify-around">
                <list-foods 
                    v-for="product in filter" 
                    :key="product.id"
                    :img="product.gambar"
                    :title="product.nama"
                    :price="product.harga"
                    :kode="product.kode"
                    class="shadow md:w-[31%] rounded-3xl px-6 py-8 relative mb-4"
                ></list-foods>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ListFoods from '../components/ListFoods.vue';
export default {
    components: {
        ListFoods
    },
    data() {
        return {
            products: [],
            filterFoods: ''
        }
    },
    computed: {
        filter() {
            let list = [];
            if(this.filterFoods === '') {
                list = this.products
            } else {
                list = this.products.filter(foods => 
                    foods.nama.includes(this.filterFoods)
                );
            }
            return list
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
                this.products = results;
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