<template>
	<view>
		<!-- 搜索框区域 -->
		<view class="search-box">
			<mySearch @myclick="gotoSearch"></mySearch>
		</view>

		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src" mode="" class="nav-item-img"></image>
			</view>
		</view>


		<!-- 楼层数据区域 -->
		<view class="floor-list">
			<!-- 楼层 item 项 -->
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" mode="" class="floor-title"></image>
				<view class="floor-img-box">
					<!-- 左侧大盒子 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" mode="widthFix"
							:style="{width:item.product_list[0].image_width+'rpx'}"></image>
					</navigator>
					<!-- 右侧四个盒子 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2,index2) in item.product_list" :key="index2"
							v-if="index2!==0" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width+'rpx'}">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import mySearch from '@/compontents/my-search/my-search.vue'
	export default {
		mixins: [badgeMix],
		components: {
			mySearch
		},
		data() {
			return {
				// 轮播图的数据
				swiperList: [],
				// 导航区
				navList: [],
				//楼层数据
				floorList: []
			}
		},
		onLoad() {
			// 调用方法，获取轮播图数据
			this.getSwiperList()
			// 调用方法，获取导航数据
			this.getNavList()
			// 获取楼层数据
			this.getFloorList()
		},
		methods: {
			// 获取轮播图数据方法
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.swiperList = res.message
				console.log(this.swiperList);
			},
			// 获取导航数据方法
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.navList = res.message
				console.log(this.navList);
			},
			navClickHandler(item) {
				if (item.name === '分类') {
					// 类似于路由跳转
					uni.switchTab({
						url: "/pages/cate/cate"
					})
				}
			},

			// 获取楼层数据
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}

				// 对数据进行处理
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
				console.log('floor', this.floorList);
			},
			// 跳转到搜索页面
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-item-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;

	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
