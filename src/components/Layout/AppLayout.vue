<template>
  <layout>
    <transition name="page-transition">
      <view-layout />
    </transition>
  </layout>
</template>

<script>
import Layout from './App/Layout'
import ViewLayout from './ViewLayout'

export default {
  name: 'AppLayout',
  components: {
    Layout,
    ViewLayout
  }
}
</script>

<style lang="scss" scoped>
  .page-transition-enter {
    opacity: 0;
  }
  
  .page-transition-leave-active {
    opacity: 0;
  }
  
  .page-transition-enter .page-transition-container,
  .page-transition-leave-active .page-transition-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
