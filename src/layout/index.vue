<template>
  <div class="sys-wraper">
    <v-head />
    <div class="sys-layout">
      <div class="sys-content">
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import VHead from './components/v-head'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    VHead,
  },
  methods: {
    
  },
  watch: {
  
  }
}
</script>

<style scoped>
  .app-wrapper {
    height: 100%;
    width: 100%;
  }
</style>
