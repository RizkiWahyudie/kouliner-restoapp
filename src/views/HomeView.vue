<template>
    <div class="containerr">
        <!-- HERO SECTION -->
        <div class="hero">
            <div class="flex-1 heroLeft">
                <div class="heroDesc">
                    <span>
                        Fast Delivery
                    </span>
                    <img class="w-6" src="../assets/delivery.png" alt="">
                </div>
                <h1 class="heroTitle">Order your favourite <span>foods</span></h1>
                <span class="hero-subTitle">Fresh and testy food dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                <button type="button">Order Now</button>
            </div>
            <div class="flex-1 heroRight">
                <img src="../assets/hero.png" alt="">
            </div>
        </div>

        <!-- BEST PRODUCTS -->
        <h2 class="font-bold text-2xl my-4 md:ml-3">Best Foods</h2>
        <div class="flex mb-10 flex-col md:flex-row justify-around">
            <popular-foods 
                v-for="product in products" 
                :key="product.id"
                :img="product.gambar"
                :title="product.nama"
                :price="product.harga"
                :icons="product.icons"
                class="shadow md:w-[30%] rounded-3xl px-6 py-8 relative mb-4"
            ></popular-foods>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import PopularFoods from '../components/PopularFoods.vue';
export default {
    components: {
        PopularFoods
    },
    data() {
        return {
            products: []
        }
    },
    methods: {
        getData() {
            axios.get('https://restovue-9057d-default-rtdb.asia-southeast1.firebasedatabase.app/best-products.json')
            .then((response) => {
                const results = [];
                for(const i in response.data) {
                    results.push({
                        id: response.data[i].id,
                        kode: response.data[i].kode,
                        nama: response.data[i].nama,
                        harga : response.data[i].harga,
                        is_ready: response.data[i].is_ready,
                        gambar: response.data[i].gambar,
                        icons: response.data[i].icons
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