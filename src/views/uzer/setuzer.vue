<template>
  <div id="setuzer">
    <van-nav-bar title="个人信息" left-arrow  right-text="完成" @click-left="onClickLeft"  @click-right="onClickRight"/>
    <div class="my-uploader">
        <van-uploader ref="uploader" :after-read="afterRead"   :max-count="1" :deletable="false" 
        :preview-full-image="false"  />
    </div>
    <van-field  v-model="uzerInfo.name" type="tel" label="昵称"  placeholder="请输入昵称" required size="4"/>
    <van-field  v-model="uzerInfo.phone" type="tel" label="手机号"  placeholder="请输入手机号"  :error-message="isPhone"/>
    <van-field  v-model="uzerInfo.birdthday" clickable label="生日" placeholder="请选择出生日期" right-icon="arrow" readonly @click="birshowPicker=true"></van-field>
        <van-popup v-model="birshowPicker" round position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                title="选择年月日"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="dataClick"
                @cancel="birshowPicker=false"
                />
        </van-popup>

    <van-field  v-model="uzerInfo.sex" clickable label="性别" placeholder="请选择性别" right-icon="arrow" readonly @click="sexshowPicker=true" ></van-field>
        <van-popup v-model="sexshowPicker" round position="bottom">
            <van-picker
            title="选择性别"
            show-toolbar
            :columns="columns"
            @confirm="sexClick"
            @cancel="sexshowPicker=false"
            />
        </van-popup>

    <van-field  v-model="uzerInfo.adree" clickable label="地址" placeholder="请选择地址" right-icon="arrow" readonly @click="adreeshowPicker=true"></van-field>
        <van-popup v-model="adreeshowPicker" round position="bottom">
                <van-area title="选择省市区" :area-list="areaList" @confirm="adreeClick" @cancel="adreeshowPicker=false"/>
         </van-popup>


    <van-field v-model="uzerInfo.message" rows="1" autosize label="个性签名" type="textarea" placeholder="请输入个性签名" clearable maxlength="50" />
  </div>
</template>

<script>
import areaList from '../../common/areaList'

import Vue from 'vue';
import { NavBar ,Field,Uploader,Popup,Picker,Area,DatetimePicker,Toast} from 'vant';
Vue.use(NavBar).use(Field).use(Uploader).use(Popup).use(Picker).use(Area).use(DatetimePicker).use(Toast);

import { mapState } from 'vuex'
let mapStateObj = mapState(['uzerInfo'])

export default {
    data () {
        return {
            // name:'',
            // phone:'',
            // sex:'',
            // adree:'',
            // message:'',
            // birdthday:'',
            birshowPicker:false,
            minDate: new Date(1900, 0, 1),
            maxDate: new Date(2025, 10, 1),
            currentDate: new Date(),
            sexshowPicker:false,
            columns: ['男', '女'],
            adreeshowPicker:false,
            areaList:areaList
        }
    },
    computed: {
        ...mapStateObj,
        isPhone(){
            var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
            if(!(telStr.test(this.uzerInfo.phone))){
                return '号码输入错'
            }else{
                return ''
            }
        },
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        async onClickRight(){
            let isname = this.uzerInfo.name.trim()
            if(isname.length>2){
                let uzerInfo = {
                name:this.uzerInfo.name,
                phone:this.uzerInfo.phone,
                sex:this.uzerInfo.sex,
                adree:this.uzerInfo.adree,
                message:this.uzerInfo.message,
                birdthday:this.uzerInfo.birdthday,
                isLoken:true
            }
            this.$store.commit('changeUzerInfo', uzerInfo)
            this.$router.go(-1)
            }else{
                Toast.fail('请输入昵称');
            }
        },
        afterRead(file){
            console.log(file);
            this.loadimg = file
        },
        dataClick(value){
            let birdthday = []
            birdthday[0] = new Date(value).getFullYear()
            birdthday[1] = new Date(value).getMonth()+1
            birdthday[2] = new Date(value).getDate()
            this.uzerInfo.birdthday = birdthday.join("-")
            this.birshowPicker = false
        },
        sexClick(value){
            this.uzerInfo.sex = value
            this.sexshowPicker = false
        },
        adreeClick(value){
            let adree = []
            value.forEach((item)=>{
                adree.push(item.name)
            })
            this.uzerInfo.adree = adree.join(',')
            this.adreeshowPicker = false
        }
    }
}
</script>

<style>
#setuzer {
    height: 100vh;
    background-color: #eee;
}
#setuzer .van-cell__title{
    font-size: 1.1em;
    font-weight: 550;
}
.my-uploader{
    background-color: white;
}
.my-uploader .van-uploader{
    margin: 2em auto;
    width: 100%;
}

.van-uploader__upload {
    margin: 0 auto;
}
 .my-uploader .van-uploader__preview{
     margin: 0 auto;
 }
</style>