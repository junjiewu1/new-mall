<template>
  <div id="home">
    <van-search v-model="value" show-action  placeholder="请输入搜索关键词" @search="onSearch"   background= "white"  shape="round"
     class="my-search" >
      <template #left>
        <img class="searchImg" src="../../assets/img/logo1.png">
      </template>    
      <template #action>
        <img  class="searchImgRight" src="../../assets/img/message.png">
      </template>
    </van-search>
    <van-swipe :autoplay="3000"    class="my-swipe">
      <van-swipe-item v-for="(item, index) in swipeImages" :key="index"  > 
        <a :href="item.link">
          <img v-lazy="item.image" width="100%"/>
        </a>
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="4" :gutter="10" :border="false" :icon-size="34 ">
      <van-grid-item  v-for="(item, index) in  jinganImages" :key="index"  :text="item.name" :icon="item.img"  />
    </van-grid>

    <div class="new-user">
      <img src="../../assets/img/9b32dc8c183e624e3b128285f3483c19.png" >
    </div>
    
    <div class="killing">
      <div class="killing-top">
         <div class="killing-top-left">
            <span class="killingfont">限时秒杀</span>
            <van-count-down :time="time">
                <template #default="timeData">
                  <span class="block">{{ timeData.hours }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.minutes }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.seconds }}</span>
                </template>
            </van-count-down>
         </div>
         <span class="killing-more">更多</span>
      </div>
      <div class="killing-btm"> 
        <div class="killing-btm-item" v-for="(item, index) in killingData" :key="index">
          <van-image width="100" height="100" lazy-load radius="6px"
            :src="item.img"
          />
          <span class="newplice">{{item.oldplice}}</span>
          <span class="oldplice">{{item.newplice}}</span>
        </div>
      </div>
    </div>

    <div class="home-cartgory" >
      <div class="home-cartgory-left" @click="popClick">
        <div class="span-title">潮流前线</div>
        <div class="span-text">潮牌限时抢购</div>
      </div>
      <div class="home-cartgory-right">
        <div class="sell" @click="sellClick">
          <div class="span-title">今日爆款</div>
          <div class="span-text">每天热卖商品</div>
        </div>
        <div class="new" @click="newClick">
          <div class="span-title">新品促销</div>
          <div class="span-text">全网实时低价</div>
        </div>
      </div>
    </div>
    <my-tab-bar></my-tab-bar>
  </div>
</template>

<script>
import {getMessges} from '../../network/request'
import {getDtatilTimes} from '../../components/getDtatilTimes'
//vant组件引入
import Vue from 'vue';
import { Lazyload, Icon, Grid, GridItem, Search, Swipe, SwipeItem, Image as VanImage, CountDown, Tabbar, TabbarItem} from 'vant';
import MyTabBar from '../../components/myTabBar.vue';
Vue.use(Lazyload).use(Grid).use(GridItem).use(Search).use(Swipe).use(SwipeItem).use(VanImage).use(Icon).use(CountDown).use(Tabbar).use(TabbarItem);

export default {
  components: {
    MyTabBar
  },
  data () {
    return {
      value: '',
      swipeImages: null,
      jinganImages:[{
        id: 1,
        name:'卫衣',
        img: "https://i.loli.net/2020/12/10/9hM2xvUlLTNndmZ.png"
      },{
         id: 2,
        name:'短裤',
        img:"https://i.loli.net/2020/12/10/Fe8ICYgJvadqKUs.png"
      },{
         id: 3,
        name:'衬衫',
        img:"https://i.loli.net/2020/12/10/aevm5xw3hfWkN6D.png"
      },{
         id: 4,
        name:'女包',
        img:"https://i.loli.net/2020/12/10/5CVSd4wkhY1enTu.png"
      },{
         id: 5,
        name:'短裙',
        img:"https://i.loli.net/2020/12/10/Cr3ljeFxR8nPqwW.png"
      },{
         id: 6,
        name:'连衣裙',
        img:"https://i.loli.net/2020/12/10/MR8CiDVkLzm6BfT.png"
      },{
         id: 7,
        name:'长裤',
        img:"https://i.loli.net/2020/12/10/8NrFntKEuvxTVUX.png"
      },{
         id: 8,
        name:'鞋子',
        img:"https://i.loli.net/2020/12/10/LOY5f7vzq9pwesa.png"
      }],
      killingData:[{
        newplice: 9.9,
        oldplice: 78,
        img:'http://s11.mogucdn.com/mlcdn/c45406/180828_550k23i82cbibh32602fl43jc9aid_800x1200.jpg_320x999.jpg'
      },{
        newplice: 59.9,
        oldplice: 78,
        img:'http://s11.mogucdn.com/mlcdn/c45406/180827_1590j44g2bk619i6655ji20ihikfb_640x960.jpg_560x999.jpg'
      },{
        newplice: 67.9,
        oldplice: 98,
        img:'http://s3.mogucdn.com/mlcdn/17f85e/180927_5i77e04lhaalbg3dai0j4588lbahh_640x960.jpg_320x999.jpg'
      },{
        newplice: 9.9,
        oldplice: 78,
        img:'http://s3.mogucdn.com/mlcdn/c45406/180514_104a5k2f09808h371j8b3h299e870_640x960.jpg_560x999.jpg'
      }]
    }
  },
  methods: {
    onSearch(){
     
    },
    popClick(){
      this.$router.push('/goodsList/pop')
    },
    sellClick(){
      this.$router.push('/goodsList/sell')
    },
    newClick(){
      this.$router.push('/goodsList/new')
    }
  },
  async mounted () {
    let res = await getMessges()
    let data = res.data.data
    this.swipeImages = data.banner.list 
  },
  computed: {
    //计算限时抢购时间
    time(){
      let startime = new Date().getTime();
      let endTime = new Date(new Date(new Date().getTime()).setHours(9,59,59,999)).getTime()
      let bestTime = 0
      if(startime - endTime < 0){
        bestTime = Math.abs(startime - endTime)
      }else{
        let nextTime = new Date(new Date(new Date().getTime()+24*60*60*1000).setHours(9,59,59,999)).getTime()
        bestTime = Math.abs(startime - nextTime)
      }
      return bestTime
      }
  },
  created () {
    
  }
}
</script>

<style>
.my-search {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 4px;
  position:fixed;
  z-index: 3;
  top: 0;
  width: 100%;
  box-shadow: 0 -2px 1px 2px #e7e7e7;
}
.searchImg{
  width: 20px;
  margin-right: 12px;
  margin-left: 10px;
}
.searchImgRight{
  padding-top: 10px;
  width: 26px;
  margin-left: 8px;
}
.my-swipe {
  width: 100%;
  margin-top: 48px;
  height: 195px;
}
.my-swipe img{
  width: 100%;
  object-fit: cover;
}
.van-grid {
  margin-top: 6px;
  border-bottom: 4px solid #eee;
  padding-bottom: 6px;
}
.van-grid-item__content {
  padding: 2px 2px;
  
}
.van-grid-item__text {
  font-size: 2px;
  line-height: 1;
}
.new-user {
  margin: 14px 0 12px;
  text-align: center;

}
.new-user img{
  width: 200px;
}
.killing {
  margin-top: 10px; 
  padding-bottom: 10px;
  border-bottom: 4px solid #eee;
}
.killing .colon {
    display: inline-block;
    margin: 0 4px;
    color: #ee0a24;
  }
.killing  .block {
    display: inline-block;
    width: 22px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: #ee0a24;
  }
  .killing-top {
    display: flex;
     justify-content:space-between;
  }
  .killing-top-left{
    display: flex;
  }
  .killingfont {
    font-weight: bold;
    /* color: #ee0a24; */
    width: 80px;
    text-align: center;
  }
  .killing-more {
    font-size: 14px;
    line-height: 20px;
    color: #858080;
    align-items: flex-end;
    margin-right: 10px;
  } 
  .killing-btm {
    margin-top: 6px;
    display: flex;
    overflow: hidden;
  }
  .killing-btm-item {
    margin: 4px 0 4px 0;

  }
  .killing-btm-item img {
    width: 90px;
    height: 100px;
  }
  .newplice {
    position: relative;
    margin-left: 18px;
  }
  .killing-btm-item .newplice::before{
    content: '￥';
    font-size: 2px;
    position: absolute;
    left: -10px;
    bottom: 0.5;
    z-index: 2;
  }
  .killing-btm-item .oldplice {
    color: gray;
    text-decoration:line-through;
    font-size: 4px;
    margin-bottom: 4px;
    margin-left: 2px;
  }
  .home-cartgory {
    display: flex;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 50px;
    height: 320px;
  }
  .home-cartgory-left {
    width: 50%;
    height: 100%;
    background: url('https://i.loli.net/2020/12/10/xrCv9GZOkJW4TEN.png') ;
    background-size: cover;
  }
  .home-cartgory-right {
    width: 50%;
    height: 100%;
  }
  .home-cartgory-right .sell{
    width: 100%;
    height: 50%;
    background: url('https://i.loli.net/2020/12/10/WBaqYtobTLDG2Ci.png') ;
    background-size: cover;
  }
  .home-cartgory-right .new{
    width: 100%;
    height: 50%;
    background: url('https://i.loli.net/2020/12/10/t9UJaOsiLmXKEyn.png') ;
    background-size: cover;
  }
  .home-cartgory .span-title{
    color: rgb(77, 77, 77);
    font-weight: 550;
    font-size: 4vw; 
    padding: 3vw 2vw 0 0;
    margin-left: 3vw;
  }
  .home-cartgory .span-text{
    color: rgb(77, 77, 77);
    font-size: 1vw;
    margin-left: 3vw;

  }
</style>