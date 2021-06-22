import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    footList:[
    ],
    cartList:[],
    uzerInfo:{
            name:'',
            phone:'',
            sex:'',
            adree:'',
            message:'',
            birdthday:'',
            isLoken:false
    }
  },
  mutations: {
    addCart(state, payload){
      let oldgoods = state.cartList.find( item => {
        return item.iid === payload.iid
      })
      if(oldgoods){
        oldgoods.count += 1
      }else {
        payload.count = 1
        state.cartList.push(payload)
      }
    },
    goodsIsChecked(state, payload){    
      state.cartList[payload.index].checked = payload.isChecked
    },
    isAllchecked(state, payload){
      state.cartList.forEach(item =>{
        return item.checked = payload
      })
    },
    goodsCountAdd(state, payload){
      state.cartList[payload].count ++
    },
    goodsCountReduce(state, payload){
      state.cartList[payload].count --  
    },
    goodsDetel(state, payload){
      state.cartList.splice(payload, 1)
    },
    changeUzerInfo(state, payload){
      state.uzerInfo = payload
    },
    addFoot(state, payload){
      let oldfoot = state.footList.find( item => {
        return item.iid === payload.iid
      })
      // if(oldfoot){
      //   return
      // }else {
      //   state.footList.push(payload)
      //   console.log('足迹');
      // }
      if(!oldfoot){
        state.footList.push(payload)
        }
    },
    clearFoot(state, payload){
      state.footList = []
    }
  },
  actions: {
  },
  modules: {
  }
})
