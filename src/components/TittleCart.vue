<template>
    <div>
        <h2 class="text-2xl md:ml-3 pt-20 mb-5">
            <font-awesome-icon :icon="'fa-solid ' + icon" class="text-grey-700 mr-1.5" />
            My <span class="font-bold">{{ title }}</span>
        </h2>
        <div class="flex justify-between items-center p-5 rounded-lg shadow">
            <div class="">
                <h2 class="font-semibold">{{ promo }}</h2>
                <p class="text-xs">{{ desc }}</p>
            </div>
            <div class="">
                <router-link to="/foods" class="py-2 px-3 rounded-full font-semibold text-amber-700 text-sm border border-amber-700 focus:bg-amber-700 focus:text-white focus:ring focus:ring-amber-300">{{btn}}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['icon', 'title', 'promo', 'desc', 'btn']
}
</script>