<template>
    <div>
        <font-awesome-icon :icon="icons" 
            :class="{
                'bg-amber-100 text-amber-500': icons === 'fa-solid fa-fire', 
                'bg-pink-100 text-pink-500': icons === 'fa-solid fa-heart',
                'bg-blue-100 text-blue-500': icons === 'fa-solid fa-star'
            }" 
            class="absolute top-4 left-4 p-2 rounded-full" 
        />
        <div class="flex justify-center">
            <img :src="img" alt="Makanan" class="bestImg h-36 w-36 object-cover" />
        </div>
        <h1 class="text-lg font-semibold mt-4">{{title}}</h1>
        <p class="font-semibold text-amber-500 text-sm">{{ convert(price) }}</p>
        <router-link :to="'/foods/' + kode" class="bestBtn">+</router-link>
    </div>
</template>

<script>
export default {
    props: ['img', 'title', 'price', 'icons', 'kode'],
    methods: {
        convert(num) {
            return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            }).format(num);
        },
    }
}
</script>