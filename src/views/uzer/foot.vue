<template>
  <div id="foot">
      <van-nav-bar
        title="我的足迹"
        right-text="清空"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        />
        
        <van-grid :column-num="3"  :border="false" :icon-size="100" clickable square class="foot-girl" v-if="$store.state.footList.length">
            <van-grid-item  v-for="(item, index) in  footList" :key="index"  :text="item.price" :icon="item.goodsImg"  @click="footItemClick(item.iid)" class="footItem"/>
        </van-grid>
  </div>
</template>

<script>

import { mapState } from 'vuex'
let mapStateObj = mapState(['footList'])


import Vue from 'vue';
import { NavBar } from 'vant';
Vue.use(NavBar);
export default {
    data () {
        return {
            
        }
    },
    computed: {
        ...mapStateObj


        
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        onClickRight(){
            this.$store.commit('clearFoot', 1)
        },
        footItemClick(iid){
            this.$router.push('/goodsDetail/'+ iid)
        }
    }
}   
</script>

<style>
.foot-girl {
    border-bottom: 2vw solid #eee;
    padding-top: 4vw;
}
.foot-girl img{
    object-fit: cover;
}
 .foot-girl .van-grid-item__text {
     font-size: 4vw;
     font-weight: 550;
 }
  .foot-girl .van-grid-item__text::before {
      content: '￥';
      font-size: 2vw;
  }
  .footItem {
      margin-bottom: 2vw;
  }
</style>