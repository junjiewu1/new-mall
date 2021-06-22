<template>
  <div id="goodsDetail">
      <van-nav-bar  @click-left="onClickLeft" @click-right="onClickRight" class="my-nav-bar"> 
        <template #left>
            <van-icon name="arrow-left" size="18"  color="black"/>
        </template>
        <template #right>
            <van-icon name="cart-o" size="18" color="black"/>
        </template>
        <template #title>
          <van-tabs v-model="active" @click="tabsClick">
            <van-tab title="宝贝" ></van-tab>
            <van-tab title="评价"></van-tab>
            <van-tab title="详情"></van-tab>
            <van-tab title="推荐"></van-tab>
          </van-tabs>
        </template>
      </van-nav-bar>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="cartClick" :badge="$store.state.cartList.length===0? '':$store.state.cartList.length"/>
        <van-goods-action-icon icon="star-o" text="收藏"  />
        <van-goods-action-button type="warning" text="加入购物车"  @click="addCartClick"/>
        <van-goods-action-button type="danger" text="立即购买" @click="buyClick"/>
      </van-goods-action>
      
      <van-swipe class="my-swiper" @change="swpieChange">
        <van-swipe-item v-for="(item,index) in goodsdetail.swiperImg" :key="index">
          <img v-lazy="item"  />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{current+1}}/{{imgLength}}</div>
        </template>
      </van-swipe>


      <div class="basegoodsinfo">
        <div class="price">
          <span class="newprice">{{goodsdetail.newPrice}}</span>
          <span class="oldprice">{{goodsdetail.oldPrice}}</span>
        </div>
        <div class="title">{{goodsdetail.title}}</div>
      </div>

      <div class="midgoodsinfo">
        <div class="addressinfo">
          <span class="fahuo">发货</span>
          <span class="address">{{goodsdetail.extra['sendAddress']}}</span>
          <span class="line">|</span>
          <span class="time">{{goodsdetail.extra['deliveryTime']}}小时内发货</span>
          <span class="columns">{{goodsdetail.columns[0]}}</span>
        </div>

        <div class="parms" @click="parmsClick">
            <span class="canshu">参数</span>
            <span class="canshutext">产品详情参数</span>
            <van-icon name="arrow" size="10" class="parmsicon"/>
            
        </div>

        <div class="services">
          <div v-for="(item, index) in goodsdetail.services" :key="index" class="services-item">
            <van-icon name="checked"  color="#ee0a24"/>
            <span class="services-name">{{item.name}}</span>
          </div>
        </div>
        <!-- 弹出层 -->
        <van-popup v-model="show" position="bottom" class="my-popup">
          <div v-for="(item,index) in goodsdetail.itemParams" :key="index" class="popup-item">
            <span class="popup-key">{{item.key}}</span>
            <span class="popup-value">{{item.value}}</span>
          </div>
        </van-popup>
         <!-- sku -->
        <van-sku
          v-model="showSku"
          :sku="sku"
          :goods="goods" 
          :hide-stock="sku.hide_stock"
        />
      </div>

      <!-- 评价 -->
      <div class="goodsrate" ref="goodsrate" v-if="Object.keys(goodsrate).length !== 0">
          <div class="goodsratetitle">
            <div class="ratetitle" >全部评价({{goodsrate.length}})</div>
            <div class="rateall">
              <span class="all-text">查看全部</span>
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="goodsratebody"  >
            <div class="ratebodytop">
              <div class="ratebodytop-left">
                <img  :src='goodsrate[0].user.avatar'>
                <div>{{goodsrate[0].user.uname}}</div>
              </div>
              <div class="ratetime" >{{goodsrate[0].created | showDate}}</div>
            </div>
            <div class="ratebodymid">{{goodsrate[0].content}}</div>
            <div class="ratebodybtm" >
              <img v-for="(item, index) in goodsrate[0].images" :key="index" v-lazy="item" class="goodsrateImg">
            </div>
          </div>
       </div>
      <div v-else class="goodsrate" ref="goodsrate">
        <div class="goodsratetitle">
            <div class="ratetitle" >全部评价(0)</div>
        </div>
         <div class="ratebodymid" style="padding-bottom: 4vw;color:rgb(138, 138, 138)">没有任何评价</div>
      </div>


      <!-- 商家 -->
      <div class="shopInfo" v-if="shopInfo">
          <div class="shopinfo-top">
            <img :src="shopInfo.shopLogo">
            <span>{{shopInfo.name}}</span>
          </div>
        <div class="shopinfo-mid">
          <!-- 左边 -->
          <div class="shop-middle-item shop-middle-left">
              <div class="info-sells">
                  <div class="sells-count">{{shopInfo.cSells | sellCountFilter}}</div>
                  <div class="sells-text">总销量</div>
              </div>
              <div class="info-goods">  
                  <div class="goods-count">{{shopInfo.cGoods}}</div>
                  <div class="goods-text">全部宝贝</div>
              </div>
          </div>
          <!-- 右边 -->
          <div class="shop-middle-item shop-middle-right">
              <table>
                  <tr v-for="(item, index) in shopInfo.score" :key="index">
                      <td>{{item.name}}</td>
                      <td class="score" :class="{'better-score':item.isBetter}">{{item.score}}</td>
                      <td class="better" :class="{'better-more':item.isBetter}"><span>{{item.isBetter? '高':'低'}}</span></td>
                  </tr>
              </table>
          </div>
        </div>
      </div>
      
      <div class="detailInfo"  ref="detailInfo" v-if="detailInfo">
          <img  v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" v-lazy="item">
      </div>
  </div>
</template>

<script>

import Vue from 'vue';
import { NavBar,Tab, Tabs, Icon,Skeleton , GoodsAction, Badge,GoodsActionIcon,Toast, GoodsActionButton, Swipe, SwipeItem,Lazyload,Popup, Sku} from 'vant';
Vue.use(NavBar).use(Tab).use(Tabs).use(Icon).use(Skeleton).use(Toast).use(Badge).use(GoodsAction).use(Popup).use(GoodsActionButton).use(GoodsActionIcon).use(Sku).use(Swipe).use(SwipeItem).use(Lazyload);

import {getGoodsDetail} from '../../network/request'


import {formatDate} from '../../common/formatdata'
import {debounce} from '../../common/debounce'


let sku = {
  // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
  // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
  tree: [
    {
      k: '颜色', // skuKeyName：规格类目名称
      k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
      v: [
        {
          id: '1', // skuValueId：规格值 id
          name: '红色', // skuValueName：规格值名称
        },
        {
          id: '1',
          name: '蓝色',
        }
      ],
      largeImageMode: true, //  是否展示大图模式
    }
  ],
  // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
  list: [
    {
      id: 2259, // skuId
      "s-1": '2', // 规格类目 k_s 为 s1 的对应规格值 id
      "s-2": '3', // 规格类目 k_s 为 s2 的对应规格值 id
      price: 100, // 价格（单位分）
      stock_num: 110 // 当前 sku 组合对应的库存
    },{
      id: 2259, // skuId
      "s-1": '1', // 规格类目 k_s 为 s1 的对应规格值 id
      "s-2": '3', // 规格类目 k_s 为 s2 的对应规格值 id
      price: 100, // 价格（单位分）
      stock_num: 110 // 当前 sku 组合对应的库存
    },{
      id: 2259, // skuId
      "s-1": '2', // 规格类目 k_s 为 s1 的对应规格值 id
      "s-2": '5', // 规格类目 k_s 为 s2 的对应规格值 id
      price: 100, // 价格（单位分）
      stock_num: 110 // 当前 sku 组合对应的库存
    }
  ],
  price: '1.00', // 默认价格（单位元）
  stock_num: 227, // 商品总库存
  // collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
  // none_sku: false, // 是否无规格商品
  // hide_stock: false // 是否隐藏剩余库存
}
export default {
  name: 'goodsDetail',
  data () {
    return {
      active: 0,
      current: 0,
      goodsdetail:{
        title:'',
        newPrice:null,      
        oldPrice:null,    
        swiperImg:[],
        columns:[],   //销量  快递  收藏人数
        itemParams: null,      //产品参数
        skuInfo:null,    //商品尺码信息
        services: [],    //服务
        extra: {}
      },
      shopInfo: null,
      goodsrate:{},         //评价
      detailInfo:null,       //详情
      show: false,

      showSku: false,
      sku: sku,
      goods: {
        picture: null
      },
      position:{
        goodsrate: 0,
        detailInfo: 0
      }

    }
  },
  methods: {
    onClickLeft() {
        this.$router.go(-1)
        },
    onClickRight() {
        Toast('按钮');
        },
    tabsClick(index){
      if(index === 0){
        document.documentElement.scrollTo(0, 0)
      }else if(index === 1){
        document.documentElement.scrollTo(0, this.position.goodsrate-45)
      }else if(index ===2){
        document.documentElement.scrollTo(0, this.position.detailInfo-45)
      }
    },
    scroll(){
        this.debounceScroll(scrollY)
    },
    swpieChange(index){
      this.current = index
    },
    parmsClick(){
      this.show = true
    },
    buyClick(){
      this.showSku = true
    },
    async getGoodsDetail(){
      let iid = this.$route.params.iid
      let res = await getGoodsDetail(iid)
        let tree = []
        let data = res.data.result
        this.goodsdetail.title = data.itemInfo.title
        this.goodsdetail.newPrice = data.itemInfo.lowNowPrice
        this.goodsdetail.oldPrice = data.itemInfo.oldPrice
        this.goodsdetail.swiperImg = data.itemInfo.topImages
        this.goodsdetail.columns = data.columns
        this.goodsdetail.itemParams = data.itemParams.info.set
        this.goodsdetail.skuInfo = data.skuInfo
        this.goodsdetail.extra = data.itemInfo.extra
        this.goodsdetail.services = data.shopInfo.services

        if(data.rate.list) {
          this.goodsrate= data.rate.list
          
        }

        this.detailInfo = data.detailInfo
        this.shopInfo = data.shopInfo
          console.log(data)
        this.goods.picture = data.itemInfo.topImages[0]
        this.sku.price = data.itemInfo.highNowPrice
        this.sku.stock_num = data.skuInfo.totalStock
        
        data.skuInfo.props.forEach((item, index)=>{
          let arr=[]  
          
            item.list.forEach((pro, i)=>{
              arr.push({
                    id: pro.styleId, // skuValueId：规格值 id
                    name: pro.name, // skuValueName：规格值名称
                  })
            })
         
            tree.push({
                k: item.label, // skuKeyName：规格类目名称
                k_s: "s-"+ (index + 1), // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                v: arr, 
                // largeImageMode: true, //  是否展示大图模式
            })
        })
        this.sku.tree = tree
    },
    cartClick(){
      this.$router.push('/Cart')
    },
    addCartClick(){
      if(this.$store.state.uzerInfo.isLoken){
        let cartInfo = {}
        cartInfo.iid = this.$route.params.iid
        cartInfo.price = Number(this.goodsdetail.newPrice)
        cartInfo.size = 'L码'
        cartInfo.iid = this.$route.params.iid
        cartInfo.goodsImg = this.goodsdetail.swiperImg[0]
        cartInfo.shopLogo = this.shopInfo.shopLogo
        cartInfo.shopName = this.shopInfo.name
        cartInfo.title = this.goodsdetail.title
        cartInfo.checked = false
        this.$store.commit('addCart', cartInfo)
        Toast({
        message: '加购成功'
        });
      }else{
        this.$router.push('/uzer')
      }
    },
    addFoot(){
      if(this.$store.state.uzerInfo.isLoken){
        let footInfo = {}
        footInfo.iid = this.$route.params.iid
        footInfo.goodsImg = this.goodsdetail.swiperImg[0]
        footInfo.price = this.goodsdetail.newPrice
        this.$store.commit('addFoot', footInfo)
      }
    }
  },
  filters: {
      showDate: function (value) {
        let date = new Date(value * 1000);       
        return formatDate(date, 'yyyy-MM-dd');
      },
      sellCountFilter: function (value) {
        if (value < 10000) return value;
        return (value/10000).toFixed(1) + '万'   
      }
    },
  computed: {
    
    imgLength(){
      return this.goodsdetail.swiperImg.length
    },
    goodsratelength(){
      if(this.goodsrate.list === undefined){
        return 0
      }else{
        return this.goodsrate.list.length
      }
    }
  },
  created () {
    this.getGoodsDetail()
    this.debounceScroll = debounce((scrollY)=>{
        if(scrollY < this.position.goodsrate - 46){
        this.active = 0
      }else if(scrollY < this.position.detailInfo - 46){
        this.active = 1
      }else if(scrollY > this.position.detailInfo - 46){
        this.active = 2
      }
        },100)
  },
    mounted () {  
     setTimeout(()=>{
      document.addEventListener('scroll', this.scroll, true)
      this.position.goodsrate = this.$refs.goodsrate.offsetTop
      this.position.detailInfo = this.$refs.detailInfo.offsetTop
    },1000)
    setTimeout(()=>{
      this.addFoot()
    },2000)
    
  },
  destroyed () {
    document.removeEventListener('scroll',this.scroll)
  }
}
</script>

<style >
 #goodsDetail {
    position: absolute;
    z-index: 6;
    background-color: #eee;
    width: 100%;
 }
 #goodsDetail .my-nav-bar {
   width: 100%;
   position: fixed;
   left: 0;
   top: 0;
 }
 #goodsDetail .van-nav-bar__title{
   width: 90%;
 }
 #goodsDetail .my-swiper {
   width: 100%;
   height: 50vh;
   margin-top: 46px;
 }
 #goodsDetail .my-swiper img {
   width: 100%;
   height: 100%;
   object-fit: cover;
 }
 #goodsDetail .van-nav-bar__title {
    max-width: 60%;
 
 }

 #goodsDetail .custom-indicator {
    position: absolute;
    color: white;
    border-radius:  2rem;
    right: 5px;
    bottom: 5px;
    padding: 4px 7px;
    font-size: 12px;
    background: rgba(94, 94, 94, 0.6);
  }
  #goodsDetail .basegoodsinfo {
    width: 100%;
    background-color: white;
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    margin-bottom: 2vw;
  }
  #goodsDetail .price {
    padding: 2vw 4vw 1vw 4vw;
  }
  #goodsDetail .newprice {
    font-size: 8vw;
    color: rgb(250, 54, 48);
    font-weight: bold;
  }
   #goodsDetail .newprice::before {
     content: '￥';
     font-size: 4vw;
 }
 #goodsDetail .oldprice {
   margin-left: 2vw;
   text-decoration:line-through;
   color: rgb(153, 153, 153);
   font-size: 4vw;
 }
 #goodsDetail .title {
   padding: 0 4vw 4vw 4vw;
   font-weight: 550;
   word-break:normal; 
 }

 /* addgoodsinfo .style */
 #goodsDetail .midgoodsinfo {
    width: 100%;
    background-color: white;
    border-radius: 0.5rem;
    margin-bottom: 2vw;
 }
 #goodsDetail .addressinfo {
    padding: 3vw 4vw 3vw 4vw;
    margin: 0 auto;
    font-size: 3.5vw;
    border-bottom: 1px solid #eee;
 }
 #goodsDetail .columns {
   color: rgb(138, 138, 138);
   float: right;
 }
 #goodsDetail .fahuo {
    color: rgb(138, 138, 138);
   float: left;
   margin-right: 4vw;
 }
 #goodsDetail .line {
   margin-left: 2vw;
   margin-right: 2vw;
   color:  rgb(138, 138, 138);
 }

 #goodsDetail  .parms{
    font-size: 3.5vw;
    padding: 3vw 4vw 3vw 4vw;
    border-bottom: 1px solid #eee;
    
  }
  #goodsDetail .canshu {
    color: rgb(138, 138, 138);
    float: left;
   margin-right: 4vw;
  }
  #goodsDetail .parmsicon {
    float: right;
  }
 #goodsDetail .services {
   padding: 2vw 4vw 2vw 4vw;
    margin: 0 auto;
    font-size: 3.5vw;
    display: inline-block;
 }
 #goodsDetail .services-item{
   margin-right: 2vw;
   display: flex;
   font-size: 2vw;
   align-items: center;
   float: left;
 }

 #goodsDetail .my-popup {
   border-top-right-radius: 1rem;
   border-top-left-radius: 1rem;
   padding: 2vw 4vw;
   font-size: 3vw;
 }
 #goodsDetail .popup-item {
   padding: 3vw 0;
   border-bottom: 1px solid #eee;
 }
 #goodsDetail .popup-value {
   margin-left: 6vw;
   color: rgb(138, 138, 138);
 }
 #goodsDetail .goodsrate {
    width: 100%;
    background-color: white;
    border-radius: 0.5rem;
    margin-bottom: 2vw;
 }
 #goodsDetail .goodsratetitle {
    padding: 3vw 4vw 3vw 4vw;
   display: flex;
   align-items: center;
   justify-content: space-between;
 }
 #goodsDetail .rateall {
   display: flex;
   align-items: center;
   font-size: 3vw;
   color:rgb(138, 138, 138);
 }
 #goodsDetail .ratebodytop {
   display: flex;
   align-items: center;
   justify-content: space-between;
    padding: 0 4vw 1vw 4vw;
 }
 #goodsDetail .ratebodytop-left {
   display: flex;
   align-items: center;
   font-size: 3vw;
   color: rgb(138, 138, 138);
 }
 #goodsDetail .ratebodytop-left img{
   width: 8vw;
   border-radius: 50%;
   margin-right: 2vw;
 }
 #goodsDetail .ratetime {
   color: rgb(138, 138, 138);
   font-size: 3vw;
 }
 #goodsDetail .ratebodymid {
   font-size: 3.2vw;
    padding: 1vw 4vw 1vw 4vw;
 }
 #goodsDetail .ratebodybtm {
   display: flex;
    padding: 1vw 4vw 4vw 4vw;
 }
 #goodsDetail .ratebodybtm img{
   width: 20vw;
   margin-right: 1vw;
 }



 .shopInfo{
   background-color: white;
   border-radius: 0.5rem;
    padding: 4vw 4vw 4vw 4vw;

 }
 .shop-info {
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }
.shopinfo-top {
    /* 让元素垂直中心对齐 */
    display: flex;
    align-items: center;
    color: rgb(138, 138, 138);
  }
  .shopinfo-top img {
    width: 10vw;
    border-radius: 50%;
  }
  .shopinfo-top span {
    margin-left: 2vw;
    vertical-align: center;
  }
  .shopinfo-mid {
    margin-top: 1vw;
    display: flex;
    align-items: center;
  }
    .shop-middle-item {
    flex: 1;
  }
   .shop-middle-left {
    display: flex;
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1);
  }
   .sells-count, .goods-count {
    font-size: 4vw;
  }
   .sells-text, .goods-text {
    margin-top: 10px;
    font-size: 12px;
  }
    .shop-middle-right {
    font-size: 13px;
    color: #333;
  }
    .shop-middle-right table {
    width: 120px;
    margin-left: 30px;
  }
    .shop-middle-right table td {
    padding: 5px 0;
  }
    .shop-middle-right .score {
    color: #5ea732;
  }
    .shop-middle-right .better-score {
    color: #f13e3a;
  }
      .shop-middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }
    .shop-middle-right .better-more span {
    background-color: #f13e3a;
  }
   .shopinfo-btm {
    text-align: center;
    margin-top: 10px;
  }

  .enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }

  #goodsDetail .detailInfo {
    margin-bottom: 50px;
    border-radius: 0.5rem;
    padding: 2vw 4vw 0 4vw;
    border-top: 1px solid white;
  }
  #goodsDetail .detailInfo img {
    width: 100%;
  }
  #goodsDetail .van-goods-action{
    z-index: 4;
  }
</style>