<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,index) in goodsList" :key="index" @click="gotoDetail(item)">
				<!-- 自定义组件 -->
				<myGoods :item="item"></myGoods>
			</view>
		</view>
	</view>
</template>

<script>
	import myGoods from '@/compontents/my-goods/my-goods.vue'
	export default {
		components: {
			myGoods
		},
		data() {
			return {
				// 请求参数对象
				queryObj: {
					// 查询关键词
					query: '',
					// 商品分类Id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示多少条数据
					pagesize: 10
				},
				// 商品列表的数据
				goodsList: [],
				// 总数量，用来实现分页
				total: 0,
				// 是否正在请求数据
				isloading: false

			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			console.log(this.queryObj);
			// 调用获取商品列表数据的方法
			this.getGoodsList()
		},
		methods: {
			async getGoodsList(cb) {
				// 打开请求阀
				this.isloading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search')
				// 关闭请求阀
				this.isloading = false
				// 只要数据请求完毕，就立即按需调用 cb 回调函数
				cb && cb()
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
				// console.log(this.total);
				// console.log(this.goodsList);

			},
			onReachBottom() {
				if (this.isloading) {
					return
				}
				// 判断是否还有下一页数据
				if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
					return uni.$showMsg('数据加载完毕！')
				}
				// 让页码自己加1
				this.queryObj.pagenum++
				this.getGoodsList()
			},
			onPullDownRefresh() {
				// 1. 重置关键数据
				this.queryObj.pagenum = 1
				this.total = 0
				this.isloading = false
				this.goodsList = []

				// 2. 重新发起请求
				this.getGoodsList(() => uni.stopPullDownRefresh())
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'../goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
