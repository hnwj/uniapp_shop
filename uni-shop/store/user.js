export default {
	// 开启命名空间
	namespaced: true,

	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		// 这是用户的信息
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
	}),

	// 方法
	mutations: {
		// 更新收货地址
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddressToStorage')
		},
		// 持续化存储
		saveAddressToStorage(state) {
			uni.setStorage('address', JSON.stringify(state.address))
		},
		// 更新收货人的基本信息
		updateUserInfo(state, userinfo) {
			state.userinfo = userinfo
			this.commit('m_user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state) {
			uni.setStorage('userinfo', JSON.stringify(state.userinfo))
		},
		updateToken(state, token) {
			state.token = token
			this.commit('m_user/saveTokenStorage')
		},
		saveTokenStorage(state) {
			uni.setStorageSync('token', state.token)
		}
	},
	getters: {
		addStr(state) {
			if (!state.address.provinceName) return ''
			//  拼接 省，市，区，详细地址 的字符串并返回给用户
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}
	}
}
