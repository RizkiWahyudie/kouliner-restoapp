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
                        <span class="text-xs navv block">0</span>
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
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            stateBtn: true
        }
    },
    methods: {
        clickNav() {
            this.stateBtn = !this.stateBtn
        }
    },
    computed: {
        navLink() {
            return "font-semibold block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 md:border-0 md:hover:text-amber-700 md:p-0"
        }
    }
}
</script>