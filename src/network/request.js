import axios from 'axios'
export  function getMessges(){
    return axios({
        url:'http://106.54.54.237:8000/api/mn/home/multidata',
        timeout: 5000
      })
    }
 
export function getGoodsList(type,page){
    return axios({
      url:'http://106.54.54.237:8000/api/mn/home/data',
      params:{
        type,
        page
      }
    })
}

export function getGoodsDetail(iid){
  return axios({
    url:'http://106.54.54.237:8000/api/mn/detail',
    params:{
      iid
    }
  })
}

   // 左侧列表
    // http://106.54.54.237:8000/api/mn/category
    // 列表相关数据
    // http://106.54.54.237:8000/api/mn/subcategory?maitKey=3627
    // 列表详情数据
    // http://106.54.54.237:8000/api/mn/subcategory/detail?miniWallkey=10062603&type=new
    
export function getCategoryList(){
  return axios({
    url:'http://106.54.54.237:8000/api/mn/category',
    timeout:5000
  })
}


export function getCategoryDetail(maitKey){
  return axios({
    url:'http://106.54.54.237:8000/api/mn/subcategory',
    params:{
      maitKey
    },
    timeout:5000
  })
}

//疫情数据
export function getCovInfo(province){
  return axios({
    url:'https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list',
    params:{
      province
    },
    timeout:5000
  })
}
// export function getCovInfo(province){
//     return axios({
//       url:'https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province=广东',
//     })
//   }