<template>
  <div class="page-spinner" v-if="visible">
    <!--<i class="fas fa-circle-notch fa-spin"></i>-->
    <img class="base-spinner img-fluid" src="../../assets/images/es-loading-100x100-transparente.gif">
    <!-- <div class="base-spinner">
      <lottie-animation path="sh-spinner.json" />
    </div> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: true,
      }
    },
    created() {
      this.$root.$on('Spinner::show', () => {
        this.visible = true
      })

      this.$root.$on('Spinner::hide', () => {
        this.visible = false
      })
    },
  }
</script>

<style lang="scss" scoped>
  .page-spinner {
    height: 100vh !important;
    background: var(--background-gray) !important;
    z-index: 9999 !important;
    position: fixed;
    height: 100% !important;
    width: 100% !important;
  }
  .base-spinner {
    position: fixed;
    top: 50%;
    left: 50%;
    height: 70px;
    transform: translate(-50%, -50%);
    z-index: 9999 !important;
  }
</style>
