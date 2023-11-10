<template>
  <div id="app">
    <base-spinner/>
    <router-view/>
  </div>
</template>

<script>
import BaseSpinner from './components/global/BaseSpinner.vue'

export default {
  name: 'App',
  components: {
    BaseSpinner
  },
  mounted () {
    document.body.style.backgroundColor = 'var(--background-gray)'
    if (window.screen.width <= 1000 && this.$route.name !== 'index') {
      document.body.style.zoom = '54%'
      document.body.style.msTransform = '54%'
      document.body.style.transform = '54%'
    } else if (window.screen.width <= 1100 && this.$route.name !== 'index') {
      document.body.style.zoom = '59.5%'
      document.body.style.msTransform = '59.5%'
      document.body.style.transform = '59.5%'
    } else if (window.screen.width <= 1200 && this.$route.name !== 'index') {
      document.body.style.zoom = '65%'
      document.body.style.msTransform = '65%'
      document.body.style.transform = '65%'
    } else if (window.screen.width <= 1300 && this.$route.name !== 'index') {
      document.body.style.zoom = '70%'
      document.body.style.msTransform = '70%'
      document.body.style.transform = '70%'
    } else if (window.screen.width <= 1400 && this.$route.name !== 'index') {
      document.body.style.zoom = '75%'
      document.body.style.msTransform = '75%'
      document.body.style.transform = '75%'
    } else if (window.screen.width <= 1500 && this.$route.name !== 'index') {
      document.body.style.zoom = '80%'
      document.body.style.msTransform = '80%'
      document.body.style.transform = '80%'
    } else if (window.screen.width <= 1600 && this.$route.name !== 'index') {
      document.body.style.zoom = '86%'
      document.body.style.msTransform = '86%'
      document.body.style.transform = '86%'
    } else if (window.screen.width <= 1700 && this.$route.name !== 'index') {
      document.body.style.zoom = '90%'
      document.body.style.msTransform = '90%'
      document.body.style.transform = '90%'
    } else if (window.screen.width <= 1800 && this.$route.name !== 'index') {
      document.body.style.zoom = '95%'
      document.body.style.msTransform = '95%'
      document.body.style.transform = '95%'
    }
    setTimeout(() => {
      this.$root.$emit('Spinner::hide')
    }, 500)
    // await this.$firebase.auth().onAuthStateChanged(user => {
    //   window.uid = user ? user.uid : null

    //   setTimeout(() => {
    //     this.$root.$emit('Spinner::hide')
    //   }, 1200)
    // })
  }
}
</script>

<style lang="scss">
#app{
  min-height: 100vh !important;
  height: 100vh !important;
  background-color: var(--background-gray);
}
.Vue-Toastification__toast--default.my-custom-toast-class {
    background-color: #0dce9a !important;
}
</style>
