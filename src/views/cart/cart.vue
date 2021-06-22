<template>
 <div id="cart">

   <!-- 占位 -->
   <div style="height:46px"></div>


  <van-nav-bar >
    <template #title>
      <div class="carttitle">购物车{{$store.state.cartList.length>0? '('+$store.state.cartList.length+')' : ''}}</div>
    </template>
  </van-nav-bar>

  <my-tab-bar></my-tab-bar>

  <van-submit-bar :price="totalPrice" button-text="提交订单" >
  <van-checkbox v-model="allChecked" >全选</van-checkbox>
  </van-submit-bar>

  <div class="goodsCard" v-for="(item, index) in cartList" :key="index">
    <div class="goodsCardTop">
      <img :src="item.shopLogo">
      <div>{{item.shopName}}</div>
    </div>
    <div class="goodsCardBtm">
      <van-checkbox v-model="item.checked" @change="checkboxClick($event, item, index)"></van-checkbox>
      <van-card :num=item.count :price=item.price :desc=item.size :title=item.title :thumb=item.goodsImg @click="goodsCartClick(item.iid)"/>
      <van-button round color="rgb(250, 54, 48)" size="mini" class="addBtn" @click="addClick(index)">+</van-button>
      <van-button round color="rgb(250, 54, 48)" size="mini" class="reduceBtn" @click="reduceClick(index)" >-</van-button>
    </div>
  </div>
  <!-- 占位 -->
   <div style="height:100px"></div>

  </div>
</template>

<script>
import myTabBar from '../../components/myTabBar.vue';

import {mapState} from 'vuex';
let mapStateObj = mapState(['cartList'])

import Vue from 'vue';
import { Checkbox, CheckboxGroup,NavBar,SubmitBar,Card,Button} from 'vant';
Vue.use(NavBar).use(SubmitBar).use(Checkbox).use(CheckboxGroup).use(Card).use(Button);

export default {
  components: { myTabBar },
  data () {
    return {
      
    }
  },
  computed: {
    ...mapStateObj,
    totalPrice(){
      return this.cartList.filter( item =>{
        return item.checked
      }).reduce((preValue, item)=>{
        return ( preValue + item.price * item.count)
      }, 0)*100
    },
    allChecked:{
      set(val){
          this.$store.commit('isAllchecked', val)
        
      },
      get(){
        if(this.cartList.length === 0){
          return false
        }
        return !this.cartList.some(item =>{
          return  !item.checked
        })
      }
    }
  },
  methods: {
    checkboxClick(event,item,index){
      let checkdeMessage = {
        isChecked:event,
        index:index
      }
      this.$store.commit('goodsIsChecked', checkdeMessage)
    },
    goodsCartClick(iid){
      this.$router.push('/goodsDetail/'+ iid)
    },
    addClick(index){
      this.$store.commit('goodsCountAdd', index)
    },
    reduceClick(index){
      if(this.cartList[index].count > 1){
          this.$store.commit('goodsCountReduce', index)
      }else{
        this.$store.commit('goodsDetel',index)
      }
      
    },
  mounted () {
    
    }
  }
}
</script>

<style>
#cart .van-nav-bar{
  background: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.van-submit-bar {
  bottom: 50px;
  border-bottom: 1px solid #eee ;
}
.goodsCard {
  background-color: #fafafa;
  width: 100%;
  margin-top: 2vw;
  border-radius: 0.5rem;
}
.goodsCardBtm {
  display: flex;
  align-items: center;
  width: 100%;
}
.van-checkbox {
  margin-left: 3vw;
}
.van-card {
  width: 85%;
  padding:4px 8px;
  margin-bottom: 8px;
}
.van-card__thumb img {
  border-radius: 4px;
}
.van-card__price{
 color: rgb(250, 54, 48);
}
.carttitle {
  color: white;
}
.goodsCardTop {
  display: flex;
  align-items: center;
  font-size: 4vw;
  font-weight: 550;
  margin-top: 2vw;
    float: left;
}
.goodsCardTop img{
  width: 6vw;
  margin-right: 2vw;
  margin-left: 10vw;
}
.goodsCard .van-card__num {
  margin-right: 3vw;
}
.addBtn{
  position: relative;
  right: 62px;
  top: 33px;
}
.reduceBtn{
  position: relative;
  right: 30px;
  top: 33px;
}
</style>