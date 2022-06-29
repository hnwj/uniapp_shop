<template>
	<view class="goods-item">
		<!-- 左侧盒子 -->
		<view class="goods-item-left">
			<radio :checked="item.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
			<image :src="item.goods_small_logo || defaultPic" mode="" class="goods-pic"></image>
		</view>
		<!-- 右侧盒子 -->
		<view class="goods-item-right">
			<!-- 商品名称 -->
			<view class="goods-name">
				{{item.goods_name}}
			</view>
			<!--  -->
			<view class="goods-info-box">
				<view class="goods-price">
					￥{{item.goods_price | tofixed}}
				</view>
				<uni-number-box :min="1" :value="item.goods_count" v-if="showNum" @change="numChangeHandler">
				</uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 商品的信息对象
			item: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				// 默认情况下，不展示
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters: {
			// 把数字处理为带两位小数点的数字
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			// 这是radio组件的点击事件处理函数
			radioClickHandler() {
				this.$emit('radio-change', {
					goods_id: this.item.goods_id,
					goods_state: !this.item.goods_state
				})
			},
			// 监听numberBox的变化
			numChangeHandler(val) {
				console.log(val);
				this.$emit('num-change', {
					goods_id: this.item.goods_id,
					goods_count: +val // 将val设置为数值类型
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #CCC;

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			margin-left: 10px;
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.goods-price {
					color: #C00000;
					font-size: 16px;
				}
			}
		}
	}
</style>
