<template>
    <div class="relative">
        <div class="containerr mb-40">
            <tittle-cart
                icon="fa-basket-shopping"
                title="Carts"
                promo="Ada lagi pesanannya?"
                desc="Masih bisa nambah menu lain, ya"
                btn="Tambah"
            ></tittle-cart>
            <!-- LIST MAKANAN -->
            <div v-if="!cartList.length" class="text-center my-3">Kosong, silakan memesan terlebih dahulu</div>
            <div v-else class="flex py-5 border-b mb-5" v-for="carts in cartList" :key="carts.key">
                <div class="flex-auto w-1/4">
                    <img class="w-full h-20 object-cover rounded-lg" :src="carts.products.gambar" alt="">
                </div>
                <div class="flex-auto w-3/4 ml-3">
                    <div class="flex justify-between items-center">
                        <h2 class="font-semibold">{{carts.products.nama}}</h2>
                        <button type="button" @click="removeCart(carts.key)"><font-awesome-icon icon="fa-solid fa-trash" class="text-red-500" /></button>
                    </div>
                    <div class="flex items-center text-xs mb-4">
                        <div class="relative w-3/4">
                            <input @blur="editDesc(carts.key)" type="text" class="w-full pl-4 outline-none border-dotted border-b-2 focus:border-gray-500" v-model="carts.keterangan" />
                            <font-awesome-icon icon="fa-solid fa-pencil" class="absolute left-0 bottom-0 mb-1 text-amber-600" />
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <h3 class="text-sm font-semibold text-amber-600">{{convert(carts.products.harga)}}</h3>
                        <div class="flex items-center space-x-1">
                            <button @click="minOrder(carts.key)" class="inline-flex items-center p-0.5 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                                <span class="sr-only">Quantity button</span>
                                <svg class="w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                            </button>
                            <div>
                                <input readonly type="number" class="bg-gray-50 w-6 md:w-10 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-amber-500 focus:border-amber-500 block text-center md:pl-3.5 pt-0.5 pb-0.5" v-model="carts.jumlah_pesanan">
                            </div>
                            <button @click="addOrder(carts.key)" class="inline-flex items-center p-0.5 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                                <span class="sr-only">Quantity button</span>
                                <svg class="w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- DETAIL PEMBAYARAN -->
            <div class=" p-5 rounded-lg shadow">
                <h2 class="font-semibold text-lg mb-3">Detail Pembayaran</h2>
                <div v-for="cartt in cartList" :key="cartt.key" class="flex justify-between items-center mb-1">
                    <div class="">
                        <p>{{cartt.products.nama}} <span class="text-xs">({{cartt.jumlah_pesanan}}x)</span></p>
                    </div>
                    <div class="">
                        <p>{{convert(cartt.totalHarga)}}</p>
                    </div>
                </div>
                <div class="h-[1px] bg-slate-200 my-5"></div>
                <div class="flex justify-between items-center font-bold">
                    <h2>Total Bayar</h2>
                    <h2>{{convert(totalHarga)}}</h2>
                </div>
            </div>
        </div>
        <!-- FIXED SUBTOTAL -->
        <div class="fixed bottom-0 border-t-[1px] rounded-t-lg bg-white w-full px-5 pt-3 pb-4">
            <div class="md:max-w-2xl lg:max-w-4xl md:mx-auto">
                <div class="flex justify-between items-center mb-1">
                    <h2 class="text-lg font-bold">Subtotal</h2>
                    <h2 class="text-lg font-bold"><font-awesome-icon icon="fa-solid fa-money-bill-wave" class="mr-1 text-amber-600" />{{convert(totalHarga)}}</h2>
                </div>
                <form @submit.prevent="checkout">
                    <div class="flex mb-3">
                        <input v-model="guest" placeholder="Nama" type="text" class="mr-1 block p-2 w-full text-gray-900 bg-gray-50 rounded-full border border-gray-300 text-xs focus:outline focus:outline-amber-500">
                        <input v-model="noMeja" placeholder="No Meja" type="text" class="ml-1 block p-2 w-full text-gray-900 bg-gray-50 rounded-full border border-gray-300 text-xs focus:outline focus:outline-amber-500">
                    </div>
                    <button class="text-center w-full bg-amber-500 text-white py-3 rounded-full font-bold hover:bg-amber-600 focus:ring focus:ring-amber-300">Pesan dan dimasak sekarang</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
import { useToast } from "vue-toastification";
import cart from '../firebase/cart.js';
import checkout from '../firebase/checkout.js';
import TittleCart from '../components/TittleCart.vue'

export default {
    components: {
        TittleCart
    },
    data() {
        return {
            cartList: [],
            guest: '',
            noMeja: null
        }
    },
    mounted() {
        this.execute();
    },
    methods: {
        getCart(items) {
            const carts = [];

            items.forEach((item) => {
                const key = item.key;
                const data = item.val();
                carts.push({
                    key: key,
                    jumlah_pesanan: data.jumlah_pesanan,
                    keterangan: data.keterangan,
                    products: data.products,
                    totalHarga: data.products.harga*data.jumlah_pesanan
                })
            })

            this.cartList = carts;
        },
        execute() {
            cart.getAll().on('value', this.getCart);
        },
        removeCart(key) {
            const toast = useToast();
            // axios.delete(`https://restovue-9057d-default-rtdb.asia-southeast1.firebasedatabase.app/keranjangs/${key}.json`)
            cart.delete(key)
            .then(() => {
                toast.info('Remove menu successfull!')
            })
            .catch((error) => {
                // handle error
                console.log('Gagal : ' + error);
            })
        },
        convert(num) {
            return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            }).format(num);
        },
        editDesc(descKey) {
            const toast = useToast();
            const data = this.cartList.find(cart => cart.key === descKey)
            if(data.keterangan) {
                const updateCart = {
                    jumlah_pesanan: data.jumlah_pesanan,
                    keterangan: data.keterangan,
                    products: data.products,
                }
                cart.update(data.key, updateCart)
                .then(() => {
                    toast.success('Desc has been updated!');
                })
                .catch((error) => {
                    toast.error('Your cart not successfull!' + error);
                });
            } else {
                data.keterangan = '-'
            }
        },
        addOrder(orderKey) {
            const toast = useToast();
            const data = this.cartList.find(cart => cart.key === orderKey)
            data.jumlah_pesanan = data.jumlah_pesanan + 1
            const updateCart = {
                jumlah_pesanan: data.jumlah_pesanan,
                keterangan: data.keterangan,
                products: data.products,
            }
            cart.update(data.key, updateCart)
            .catch((error) => {
                toast.error('Order not successfull!' + error);
            });
        },
        minOrder(orderKey) {
            const toast = useToast();
            const data = this.cartList.find(cart => cart.key === orderKey)
            data.jumlah_pesanan = data.jumlah_pesanan - 1
            if(data.jumlah_pesanan > 0) {
                const updateCart = {
                    jumlah_pesanan: data.jumlah_pesanan,
                    keterangan: data.keterangan,
                    products: data.products,
                }
                cart.update(data.key, updateCart)
                .catch((error) => {
                    toast.error('Order not successfull!' + error);
                });
            } else {
                cart.delete(orderKey)
                .then(() => {
                    toast.info('Remove menu successfull!')
                })
                .catch((error) => {
                    // handle error
                    console.log('Gagal : ' + error);
                })
            }
        },
        checkout() {
            const toast = useToast();
            if(this.guest === '') {
                toast.error('Kamu belum mengisi nama')
                return
            }
            if(!this.noMeja) {
                toast.error('Maaf, no berapa meja kamu?')
                return
            }
            const data = {
                guest: this.guest,
                noMeja: this.noMeja,
                checkout: this.cartList,
                timeOrder: this.setTime,
                dateOrder: this.setDate,
                totalBayar: this.totalHarga
            };

            checkout.create(data)
            .then(() => {
                const toast = useToast();
                toast.success('Checkout success!')
                cart.deleteAll()
                this.$router.push('/cart/checkout')
            })
            .catch((e) => {
                console.log(e);
            })
        }
    },
    computed: {
        totalHarga() {
            return this.cartList.reduce((items, data) => {
                return items+data.totalHarga
            }, 0)
        },
        setDate() {
            var date = new Date();
            var tahun = date.getFullYear();
            var bulan = date.getMonth();
            var tanggal = date.getDate();
            var hari = date.getDay();
            switch(hari) {
                case 0: hari = "Minggu"; break;
                case 1: hari = "Senin"; break;
                case 2: hari = "Selasa"; break;
                case 3: hari = "Rabu"; break;
                case 4: hari = "Kamis"; break;
                case 5: hari = "Jum'at"; break;
                case 6: hari = "Sabtu"; break;
            }
            switch(bulan) {
                case 0: bulan = "Januari"; break;
                case 1: bulan = "Februari"; break;
                case 2: bulan = "Maret"; break;
                case 3: bulan = "April"; break;
                case 4: bulan = "Mei"; break;
                case 5: bulan = "Juni"; break;
                case 6: bulan = "Juli"; break;
                case 7: bulan = "Agustus"; break;
                case 8: bulan = "September"; break;
                case 9: bulan = "Oktober"; break;
                case 10: bulan = "November"; break;
                case 11: bulan = "Desember"; break;
            }
            var tampilTanggal = tanggal + " " + bulan + " " + tahun;
            return tampilTanggal
        },
        setTime() {
            var date = new Date();
            var jam = date.getHours();
            var menit = date.getMinutes();
            var detik = date.getSeconds();
            var tampilWaktu = jam + ":" + menit + ":" + detik;
            return tampilWaktu
        }
    },
}
</script>