<template>
	<view>
		<myLogin v-if="!token"></myLogin>
		<myUserInfo v-else></myUserInfo>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import myLogin from '@/compontents/my-login/my-login.vue'
	import myUserInfo from '@/compontents/my-userinfo/my-userinfo.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		mixins: [badgeMix],
		components: {
			myLogin,
			myUserInfo
		},
		data() {
			return {

			}
		},
		computed:{
			...mapState('m_user',['token'])
		},
		methods: {

		}
	}
</script>

<style>

</style>
