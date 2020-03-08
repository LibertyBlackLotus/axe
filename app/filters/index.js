import Vue from 'vue';

// 时间格式化
// Vue.filter('dateFormat', (dateStr, pattern = "YYYY-MM-DD HH:mm:ss") => {
//   return new Date(dateStr).format('YYYY-MM-DD HH:mm:ss');
// })

Vue.filter('dateFormat', function (dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
	return new Date(dateStr).format('YYYY-MM-DD HH:mm:ss');
});