<template>
  <div id="goodsList">
      <div class="goods-list-bar">
          <van-nav-bar :title="title"   @click-left="onClickLeft" @click-right="onClickRight" class="my-navbar">
             <template #left>
             <van-icon name="arrow-left" size="18"  color="black"/>
             </template>
             <template #right>
             <van-icon name="cart-o" size="18" color="black"/>
             </template>
          </van-nav-bar>
          <van-tabs v-model="clickIndex"  @click="tabsOnClick">
            <van-tab title="全部"></van-tab>
            <van-tab title="套装"></van-tab>
            <van-tab title="单件"></van-tab>
          </van-tabs>
      </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
                    <div class="goods">
                        <div class="goods-item" v-for="(item, index) in goods.list" :key="index" @click="goodsItemClick(item.iid)">
                            <img  v-lazy="item.show.img">
                            <div class="item-title">{{item.title}}</div>
                            <div class="item-bottom">
                                <span class="item-price">{{item.price}}</span>
                                <span class="item-sale">{{item.sale}}人付款</span>
                            </div>
                        </div>
                    </div>
      </van-list>
      <van-icon name="back-top" class="my-back-top" size="20" @click="backTopClick" v-show="isShowBackTop"/>


        
  </div>
</template>

<script>
import {getGoodsList} from '../../network/request'
import {debounce} from '../../common/debounce'
import Vue from 'vue';
import { NavBar, List, DropdownMenu, DropdownItem, Tab, Tabs, Lazyload, Icon } from 'vant';
Vue.use(List).use(NavBar).use(Tab).use(Tabs).use(Lazyload).use(Icon);

export default {
    name: 'goodsList',
    data () {
        return {    
            goods:{
                page: 1,
                list: []
            },
            loading: true,
            finished: false,
            clickIndex: 0,
            isShowBackTop: false,
            debounceScroll: null,
            aliveType:null
        }
    },
    computed: {
      title(){
          if(this.$route.params.type === 'pop'){
              return '潮流前线'
          }else if(this.$route.params.type === 'sell'){
              return '今日爆款'
          }else{
              return '新品促销'
          }
      }  
    },
    created () {
        this.tabsOnClick(0)
        this.debounceScroll = debounce((position)=>{
        this.isShowBackTop = position > 1000
        },1000)
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        onClickRight() {
            Toast('按钮');
        },
        scroll(){
            this.debounceScroll(scrollY)
        },
        backTopClick(){
            document.documentElement.scrollTo(0,0)
        },
        async getGoodsList(){
            let type = this.$route.params.type
            let res =  await getGoodsList(type, this.goods.page)
            this.goods.page += 1
            let data = res.data.data.list
            let showdata = null
            if(this.clickIndex === 0){
                showdata = data
            }else if(this.clickIndex === 1){
                showdata = data.filter((item)=>{
                return item.itemType === 5
            })
            }else if(this.clickIndex === 2){
                showdata = data.filter((item)=>{
                return item.itemType === 7    //7 单件
            })
            }
            for(let i = 0; i<showdata.length; i++){
                this.goods.list.push(showdata[i])
            }
            this.loading = false
        },
        onLoad(){
            setTimeout(()=>{
                this.getGoodsList()
            },1000)
        },
        tabsOnClick(index){
            this.goods = {
                page: 1,
                list:[]
            }
            this.clickIndex = index
            this.getGoodsList()
        },
        goodsItemClick(iid){
            this.$router.push('/goodsDetail/'+iid)
        },
        
    },
    mounted () {
        document.addEventListener('scroll',this.scroll, true)
    },
    activated () {
        if(this.$route.params.type != this.aliveType){
            this.tabsOnClick(0)
            this.aliveType = this.$route.params.type
        }
          
    }
}
</script>

<style>
 #goodsList{
    position: absolute;
    z-index: 6;
    background-color: #eee;
 }
 .nav-bar {
     position: fixed;
     left: 0;
     right: 0;
     z-index: 2;
 }
 .goods {
     width: 98%;
     display: flex;
     flex-wrap: wrap;
      background-color: white;
      margin: 0 auto;
     /* justify-content: space-evenly; */
 }
 .goods-item {
     width: 50%;
 }
 .goods-item img{
     width: 100%;
     height: 280px;
     object-fit: cover;
 }
 .item-title {
     width: 90%;
     margin: 1vw auto;
     text-align: center;
     font-size: 2.5vw;
     height: 28px;
     overflow: hidden;
     text-overflow: ellipsis;
     font-weight: 540;
 }
 .item-price {
     font-weight: bold;
     font-size: 4vw;
     color:rgb(255, 51, 0);
 }
 .item-price::before {
     content: '￥';
     font-size: 1vw;
 }
 .item-sale {
     font-size: 1vw;
     color: rgb(136, 136, 136);
 }
 .item-bottom {
     width: 90%;
     margin: 1.5vw auto;
     display: flex;
     justify-content: space-between;
     align-items: center;
 }
 .goods-list-bar {
     width: 100%;
     position: fixed;
     left: 0;
     right: 0;
     z-index: 3;
     background-color: white;
 }
 .van-list {
     margin-top: 90px;
 }
 .my-back-top {
     position: fixed;
     right: 3vw;
     bottom: 3vw;
     z-index: 99;
     background-color: rgba(238, 238, 238, 0.8);
     border: 0.1px solid rgba(116, 116, 116,0.5);
     border-radius: 50%;
     padding: 2vw;
     font-weight: 550;
 }
</style>