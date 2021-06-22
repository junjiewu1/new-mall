<template>
      <van-tabbar v-model="tabActive" class="my-tabbar">
        <van-tabbar-item icon="home-o" to='/'>标签</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to='/category'>分类</van-tabbar-item>
        <van-tabbar-item icon="cart-o" to='/cart' >购物车</van-tabbar-item>
        <van-tabbar-item icon="user-circle-o" to='/uzer'>我的</van-tabbar-item>
      </van-tabbar>
</template>

<script>
import Vue from 'vue';
import { Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
    data () {
        return {
            tabActive: 0
        }
    },
    activated () {
      switch(this.$route.path){
        case "/":
          this.tabActive = 0;
          break;
          case "/category":
          this.tabActive = 1;
          break;
          case "/cart":
          this.tabActive = 2;
          break;
          case "/uzer":
          this.tabActive = 3;
          break;
          default:
          this.tabActive = 2;
      }
    }
}
</script>

<style>
  .my-tabbar {
    z-index: 4;
    box-shadow: 0 2px 1px 2px #e7e7e7;
  }
</style>