import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from './store/store.js'
Vue.config.productionTip = false
App.mpType = 'app'

// 按需导入 $http 对象
import {
	$http
} from '@escook/request-miniprogram'

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http

// 设置基本的路径
// $http.baseUrl = 'https://www.uninav.com'
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 挂载一个请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中....'
	})
}

// 响应拦截器
$http.afterRequest = function() {
	// 数据加载完成，隐藏加载
	uni.hideLoading()
}

// 封装弹窗方法
uni.$showMsg = function(title = '数据请求失败', duration = 1500) {
	uni.$showMsg({
		title,
		duration,
		icon: 'none'
	})
}

const app = new Vue({
	...App,
	// 2. 将 store 挂载到 Vue 实例上
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
