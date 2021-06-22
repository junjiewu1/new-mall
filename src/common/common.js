
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


  // 时间戳转换
export function formatDate(date, fmt) {
    //1、获取年份
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    //2、获取
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };
  
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };

  //获取cookie、
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
  }
  
  //设置cookie,增加到vue实例方便全局调用
  /*
  * 键 c_name
  * 值 value
  * 时间 expiredays
  * */
  export function setCookie (c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  };
  
  //删除cookie
  export function delCookie (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  };
  