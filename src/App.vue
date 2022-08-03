<template>
  <nav-bar></nav-bar>
  <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
      </transition>
  </router-view>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>
