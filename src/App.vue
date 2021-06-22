<template>
  <div id="app">
    <keep-alive >
      <router-view  v-if="$route.meta.keepAlive"/>
    </keep-alive>
      <router-view  v-if="!$route.meta.keepAlive"/>
  </div>
</template>
<script>
import Vue from 'vue';

export default {
    data () {
      return {
        
      }
    }
}
</script>
<style>
  @import './assets/css/base.css';
  
</style>
