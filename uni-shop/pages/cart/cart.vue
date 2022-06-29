<template>
	<view class="cart-container" v-if="cart.length!==0">
		<!-- 收货地址 -->
		<myAddress></myAddress>
		<!-- 商品列表区域 -->
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧的文本 -->
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 循环渲染购物车中的商品信息 -->
		<uni-swipe-action>
			<block v-for="(goods,index) in cart" :key="index">
				<uni-swipe-action-item :options="options" @click="">
					<template v-slot:right>
						<view class="slot-button">
							<text @click="bindClick(goods)">删除</text>
						</view>
					</template>
					<view>
						<myGoods :item="goods" :showRadio="true" @radio-change="radioChangeHandler" :showNum="true"
							@num-change="numberChange"></myGoods>
					</view>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>

		<!-- 使用自定义的结算组件 -->
		<mySettle></mySettle>


	</view>

	<!-- 空白购物车区域 -->
	<view class="empty-cart" v-else>
		<image src="../../static/cart_empty.png" mode="" class="empty-img"></image>
		<text class="tip-text">空空如也</text>
	</view>
</template>

<script>
	import myGoods from '@/compontents/my-goods/my-goods'
	import myAddress from '@/compontents/my-address/my-address.vue'
	import mySettle from '@/compontents/my-settle/my-settle.vue'
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		mixins: [badgeMix],
		components: {
			myGoods,
			myAddress,
			mySettle
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			}
		},
		computed: {
			...mapState('m_cart', ['cart'])
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			radioChangeHandler(e) {
				console.log(e);
				this.updateGoodsState(e)
			},
			numberChange(e) {
				console.log(e);
				this.updateGoodsCount(e)
			},
			// 点击了滑动操作按钮
			bindClick(goods) {
				console.log('1111', goods);
				this.removeGoodsById(goods.goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 50px;
	}

	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			font-size: 14px;
			margin-left: 10px;
		}
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;

		.empty-img {
			width: 90px;
			height: 90px;

			.tip-text {
				font-size: 12px;
				color: gray;
				margin-top: 15px;
			}
		}
	}
</style>
