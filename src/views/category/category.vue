<template>
  <div id="cartgory">
    <my-tab-bar></my-tab-bar>
    <div style="height: 54px"></div>
    <van-search v-model="value" placeholder="搜索店铺/商品" />
    
    <van-tree-select height="55vw" :items="items" :main-active-index.sync="active" class="mytree-select" @click-nav="selectLeftClick">
      <template #content>
        <van-grid :column-num="3"  :gutter="20">
          <van-grid-item v-for="(item, index) in categoryDetail" :key="index" class="my-grid-item">
            <img v-lazy="item.image">
            <div>{{item.title}}</div>
          </van-grid-item>
        </van-grid>
      </template>

    
    </van-tree-select>
    <div style="height:50px"></div>
  </div>
</template>

<script>
import {getCategoryList, getCategoryDetail} from '../../network/request'

import myTabBar from '../../components/myTabBar.vue'

import Vue from 'vue';
import { Search, TreeSelect,Grid, GridItem,Toast  } from 'vant';
Vue.use(Search).use(TreeSelect).use(Grid).use(GridItem).use(Toast);
export default {
  components: { myTabBar },
  data () {
    return {
       value: '',
       categoryList:null,
       active: 0,
       categoryDetail:null
    }
  },
  async created () {
    let res = await getCategoryList()
    this.categoryList = res.data.data.category.list
    this.getCategoryDetail(this.categoryList[0].maitKey)
  },
  computed: {
    items(){
      // [{ text: '分组 1' }, { text: '分组 2' }]
      if(this.categoryList == undefined){
        return []
      }else{
        let arr = []
        this.categoryList.forEach((item, index)=>{
          item.text = item.title
          arr.push(item)
        })
        return arr;
      }
    }
  },
  methods: {
    selectLeftClick(index){
      this.getCategoryDetail(this.categoryList[index].maitKey)
    },
    async getCategoryDetail(maitKey){
      let res = await getCategoryDetail(maitKey)
      this.categoryDetail = res.data.data.list
    }
  }
}
</script>

<style>
  #cartgory{
    background-color: #eee;
  }
  #cartgory .van-search{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  #cartgory .mytree-select{
    height: 100% !important;
  }
  #cartgory .van-tree-select__nav{
    flex: none;
  }
   #cartgory .van-grid {
     margin-bottom: 10vw;
     border-bottom:none
  }
  [class*=van-hairline]::after{
    border: none;
  }
  .my-grid-item {
    width: 33%;
  }
  .my-grid-item img{
    width: 100%;
  }
  .my-grid-item div{
    margin-top: 2vw;
    font-size: 2vw;
  }
</style>