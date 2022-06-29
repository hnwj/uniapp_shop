<template>
	<view>
		<!-- 搜索框区域-->
		<!-- <mySearch :bgcolor="'pink'" :radius="3"></mySearch> -->
		<mySearch @myclick="gotoSearch"></mySearch>
		<view class="scroll-view-container">
			<!-- 左侧滑动区域 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height:wh+'px'}">
				<block v-for="(item,index) in cateList" :key="index">
					<view :class="['left-scroll-view-item',index === active ? 'active':'']"
						@click="activeChanged(index)">{{item.cat_name}}</view>
				</block>
			</scroll-view>


			<!-- 右侧滑动区域 -->
			<scroll-view class="right-scroll-view" scroll-y :style="{height:wh+'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,index2) in cateLevel2" :key="index2">
					<!-- 二级分类标题 -->
					<view class="cate-lv2-title">/ {{item2.cat_name}} / </view>
					<!-- 二级分类下的三级分类标题 -->
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,index3) in item2.children" :key="index3"
							@click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
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
				// 当前设备可用的高度
				wh: 0,
				// 分类数据
				cateList: [],
				// 默认激活项
				active: 0,
				// 二级分类的列表
				cateLevel2: [],
				// 滚动条距离顶部的距离
				scrollTop: 0
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			console.log(sysInfo)
			this.wh = sysInfo.windowHeight
			this.getCateList()
		},
		methods: {
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.cateList = res.message
				// 为二级分类赋值
				this.cateLevel2 = res.message[0].children
				console.log(this.cateList);
				console.log(this.cateLevel2);
			},
			// 激活不同的选项值
			activeChanged(index) {
				this.active = index
				this.cateLevel2 = this.cateList[index].children
				// 让 scrollTop 的值在 0 与 1 之间切换
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			// 跳转到商品页面
			gotoGoodsList(item3) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
				})
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
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;

			.left-scroll-view-item {
				background-color: #f7f7f7;
				line-height: 60px;
				font-size: 12px;
				text-align: center;


				&.active {
					background-color: #fff;
					position: relative;

					&::before {
						content: '';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #C00000;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
				}
			}
		}
	}

	.cate-lv2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}

	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;

		.cate-lv3-item {
			width: 33.33%;
			margin-bottom: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 60px;
				height: 60px;
			}

			text {
				font-size: 12px;
			}
		}

	}
</style>
