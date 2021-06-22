
//加强版抖动加节流
export function  debounce(func, delay){
    let timer = null
    let last = 0
    return function(){
      clearTimeout(timer)
      let now = +new Date()
      if ((now - last) < delay){        //这里是抖动   事件一传入就会重新计时   
        clearTimeout(timer)
        timer = setTimeout(()=>{
          last = now
          func.apply(this, arguments)
        }, delay)
        } else {                        //这里是节流   持续的时间大于传入的delay时间 func就一定要执行一次
          last = now
          func.apply(this, arguments)
      } 
    } 
  }



        //抖动
     
       //
  //      debounce(func, delay) {
  //   let timer = null
  //   return function () {
  //     clearTimeout(timer)
  //     timer = setTimeout(() => {
  //       func.apply(this, arguments)
  //     }, delay)
  //   }
  // }