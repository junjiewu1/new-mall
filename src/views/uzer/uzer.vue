<template>
  <div id="uzer">
    <my-tab-bar></my-tab-bar>

    <van-nav-bar title="我的" >
      <template #left>
        <img src="../../assets/img/logo1.png" class="navBarImg">
      </template>
      <template #right>
        <van-icon name="setting-o" size="18" color="#000" />
      </template>
    </van-nav-bar>

  <div v-if="$store.state.uzerInfo.isLoken">

    <div class="info">
      <img src="../../assets/img/mocadandan.png">
      <div class="detailInfo" >
        <div class="detailInfo-left">
          <div class="name">
            <div>{{uzerInfo.name}}</div>
            <div class="manlogo" v-if="uzerInfo.sex=='男'">♂</div>
            <div class="womenlogo" v-else-if="uzerInfo.sex=='女'">♀</div>
          </div>
          <div class="message" >{{uzerInfo.message.length==0? '未填写签名':uzerInfo.message}}</div>
        </div>
        <van-icon name="arrow" color="rgb(180, 180, 180)" @click="setUzerClick"/>
      </div>
    </div>

    <div class="myfavo">
      <div class="myfavo-left">
        <div class="myfavo-text">收藏</div>
        <van-icon name="arrow" color="rgb(180, 180, 180)"/>
      </div>
      <div class="myfavo-right" @click="footClick">
        <div class="myfavo-text">足迹{{$store.state.footList.length==0? '':'('+$store.state.footList.length+')'}}</div>
        <van-icon name="arrow" color="rgb(180, 180, 180)"/>
      </div>
    </div>
    <!-- 购买 -->
    <div class="buybuy">
      <div class="buy-top">
        <div>购买</div>
        <van-icon name="arrow" color="rgb(180, 180, 180)"/>
      </div>
      <van-grid :column-num="5" :border="false" clickable square icon-size="20px">
        <van-grid-item icon="peer-pay" text="待付款" />
        <van-grid-item icon="gift-card-o" text="待发货" />
        <van-grid-item icon="logistics" text="待收货" />
        <van-grid-item icon="comment-o" text="评价" />
        <van-grid-item icon="notes-o" text="退款/售后" />

      </van-grid>
    </div>

    <div class="covid" >
        <span class="covidtitle1" @click="covadreeshowPicker = true">实时新冠疫情 / {{covadree}}</span>
        <span class="covidtitle2">更新时间：{{cov.date}}</span>
        <div class="covidbodyTop">
            <div class="confirm bor">
              <div class="covidtext">累计确诊</div>
              <div class="covidspan">{{cov.confirm}}</div>
            </div> 
            <div class="confirm bor">
              <div class="covidtext">累计治愈</div>
              <div class="covidspan">{{cov.heal}}</div>
            </div>
            <div class="confirm">
              <div class="covidtext">累计死亡</div>
              <div class="covidspan">{{cov.dead}}</div>
            </div> 
        </div>
        <div class="covidbodyBtm">
          <div class="confirm  bor">
            <div class="covidtext">现有确诊</div>
            <div class="covidspan">{{cov.confirm-cov.heal-cov.dead}}</div>
          </div> 
          <div class="confirm bor" >
            <div class="covidtext">新增确诊</div>
            <div class="covidspan" :class="{'red':cov.newConfirm>0}">{{cov.newConfirm}}</div>
          </div>
          <div class="confirm">
            <div class="covidtext">新增治愈</div>
            <div class="covidspan" :class="{'green':cov.newHeal>0}">{{cov.newHeal}}</div>
          </div> 
        </div>
      </div>
      <van-popup v-model="covadreeshowPicker" round position="bottom">
                <van-area title="选择省市区"  :area-list="areaList" @confirm="covClick" @cancel="covadreeshowPicker=false" columns-num="1" />
      </van-popup>

    </div>

    <div v-else class="noloken">
      <span class="lokentext">登录后继续操作</span>
      <img src="../../assets/img/dandan.jpg" class="dandanImg">
      <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" block @click="setUzerClick">登录</van-button>
    </div>
  </div>
</template>

<script>
import {getCovInfo} from '../../network/request'

import myTabBar from '../../components/myTabBar.vue'

import Vue from 'vue';
import { NavBar, Icon,Area ,Popup,Grid, GridItem,Button} from 'vant';
Vue.use(NavBar).use(Icon).use(Area).use(Popup).use(Grid).use(GridItem).use(Button);

import { mapState } from 'vuex'
import areaList from '../../common/areaList';
let mapStateObj = mapState(['uzerInfo'])

export default {
  components: { myTabBar },
  data () {
    return {
      cov: {
          date:''
      },
      covadree:'广东省',
      covadreeshowPicker:false,
      areaList:areaList
    }
  },
  computed: {
    ...mapStateObj,
  },
  methods: {
    setUzerClick(){
      this.$router.push('/uzer/setuzer')
    },
    footClick(){
      this.$router.push('/uzer/foot')
    },
     covClick(value){
      this.covadree = value[0].name
      let adree =  value[0].name.slice(0,value[0].name.length-1)
      this.getCovInfo(adree)
      setTimeout(()=>{
      this.covadreeshowPicker = false
      },200)
    },
    async getCovInfo(province){
      let res = await getCovInfo(province)
      let data = res.data.data
      this.cov.date = data[data.length-1].date
      this.cov.confirm = data[data.length-1].confirm
      this.cov.dead = data[data.length-1].dead
      this.cov.heal = data[data.length-1].heal
      this.cov.newConfirm = data[data.length-1].newConfirm
      this.cov.newHeal = data[data.length-1].newHeal
      this.cov.newDead = data[data.length-1].newDead
    }
  },
  created () {
      this.getCovInfo('广东')
  }
}
</script>

<style>
#uzer {
  /* background-color: #eee; */
}
#uzer .navBarImg{
  width: 20px;
  margin-right: 12px;
  margin-left: 10px;
}
#uzer .info{
  padding: 6vw 4vw;
  background-color: white;
  display: flex;
  align-items: center;
  border-bottom: 2vw solid #eee;
}
#uzer .info img{
  border-radius: 50%;
  width: 16vw;
  /* object-fit: cover; */
  
}
#uzer .detailInfo {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 4vw;
}
.name {
  font-size: 6vw;
  /* font-weight: 550; */
  margin-bottom: 2vw;
  display: flex;
  align-items: center;
}
.manlogo{
  margin-left: 2vw;
  font-size: 4vw;
  color: rgb(0, 226, 226);
}
.womenlogo{
  margin-left: 2vw;
  font-size: 4vw;
  color: rgb(255, 0, 128);
}
.message {
  color: rgb(180, 180, 180);
  font-size: 2vw;
  overflow: hidden;
  word-wrap: inherit;
}
.myfavo{
  display: flex;
  background-color: white;
  border-bottom: 0.1px solid rgba(180, 180, 180, 0.2);
}
.myfavo-left{
  padding: 4vw 4vw;
  width: 50%;
  display: flex;
  align-items: center;
  font-weight: 550;
  color: rgb(102, 102, 102);
  justify-content: space-between;
  border-right: 0.1px solid rgba(180, 180, 180, 0.2);
}
.myfavo-right{
  padding: 4vw 4vw;
  width: 50%;
  display: flex;
  color: rgb(102, 102, 102);
  font-weight: 550;
  justify-content: space-between;
  align-items: center;
}
  /* 新冠 */
  .covid {
    background-color: white;
    padding-top: 4vw;
    padding-bottom: 5vw;
  
  }
  .covidtitle1 {
    margin-left: 4vw;
    color: rgb(102, 102, 102);
    font-weight: 550;
  }
  .covidtitle2 {
    color: rgb(102, 102, 102);

    float: right;
    font-size: 1vw;
    margin-right: 4vw;
  }
  .covidbodyTop {
    margin-top: 300px;
    width: 100%;
    display: flex;
    text-align: center;
    margin-top: 4vw;
  }
  .covidbodyBtm{
    width: 100%;
    display: flex;
    text-align: center;
    margin-top: 20px;
  }
  .confirm {
    flex: 1;
    /* border-right: 1px solid #909399; */
  }
  .bor {
    border-right: 1px solid #909399;

  }
  .covidtext {
    font-size: 0.8vw;
    color: #909399;
  }
  .covidspan {
    font-size: 1.5vw;
    margin-top: 10px;
  }
  .red {
    color: red;
  }
  .green {
    color: green;
  }

  /* 购买模块 */
  .buybuy{
    padding: 4vw 4vw 0 4vw;
    background-color: white;
    border-bottom: 2vw solid #eee;
    
  }
  .buy-top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgb(102, 102, 102);
    font-weight: 550;
  }
  .buybuy .van-grid{
    border: none;
    margin-top: 2vw;
  }
  .noloken {
    margin-top: 20vw;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .dandanImg{
    width: 40vw;
    object-fit: cover;
    margin-bottom: 10vw;
    
  }
  .lokentext {
    margin-bottom: 10vw;
    font-weight: 550;
    font-size: 6vw;
    color: rgb(102, 102, 102);

  }
  .noloken .van-button--block {
    width: 60%;
  }
</style>