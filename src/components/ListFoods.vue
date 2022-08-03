<template>
    <div>
        <div class="flex justify-center">
            <img :src="img" alt="Makanan" class="bestImg h-36 w-36 object-cover" />
        </div>
        <h1 class="text-lg font-semibold mt-4">{{title}}</h1>
        <p class="font-semibold text-amber-500 text-sm">{{convert(price)}}</p>
        <router-link :to="'/foods/' + kode" class="bestBtn">+</router-link>
    </div>
</template>

<script>
export default {
    props: ['img', 'title', 'price', 'kode'],
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