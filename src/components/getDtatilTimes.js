export function getDtatilTimes(diff){
    var days = Math.floor(diff / (24 * 3600 * 1000));
				// 计算天数后剩余的毫秒数
				var leave1 = diff % (24 * 3600 * 1000);
				// 计算出小时数
				var hours = Math.floor(leave1 / (3600 * 1000));
				// 计算小时数后剩余的毫秒数
				var leave2 = leave1 % (3600 * 1000);
				// 计算相差分钟数
				var minutes = Math.floor(leave2 / (60 * 1000));
				// 计算相差秒数
				var leave3 = leave2 % (60 * 1000);
				var seconds = Math.floor(leave3 / 1000);

				var returnStr = seconds + '秒';
				if (minutes>0) {
					var returnStr = minutes + '分' + returnStr;
				}
				if (hours>0) {
					var returnStr = hours + '小时' + returnStr;
				}
				if (days>0) {
					var returnStr = days + '天' + returnStr;
				}
				return returnStr;
}