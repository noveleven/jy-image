<template>
	<view class="content">
		<view class="row">
			<view v-for="(src, index) in testSrc" :key="index">
				<jy-image mode="aspectFill" :src="src" placeholder="/static/logo.png" :complete="loadCompleted"></jy-image>
			</view>
		</view>
		<view class="row">
			<button @tap="makeClean">清理缓存 {{size}}</button>
			<button @tap="reload">重新加载</button>
		</view>
		<text class="output">{{output}}</text>
	</view>
</template>

<script>
	const testSrc = [
		'http://attach.bbs.miui.com/forum/201105/17/113554rnu40q7nbgnn3lgq.jpg',
		'http://pic1.win4000.com/wallpaper/b/55597435bb036.jpg',
		'http://attach.bbs.miui.com/forum/201111/21/205700txzuacubbcy91u99.jpg',
		'http://d.hiphotos.baidu.com/zhidao/pic/item/6a63f6246b600c334c3e91cb1e4c510fd9f9a16a.jpg',
		'http://attach.bbs.miui.com/forum/201408/07/194456i55q58pqnb55fi88.jpg',
		'http://pic1.win4000.com/wallpaper/4/542a392b9d382.jpg',
		'http://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&f=JPEG?w=1280&h=853',
		'http://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&f=JPEG?w=1280&h=853',
		'http://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&f=JPEG?w=4610&h=2968',
		'http://t9.baidu.com/it/u=3363001160,1163944807&fm=79&app=86&f=JPEG?w=1280&h=830',
		'http://t9.baidu.com/it/u=583874135,70653437&fm=79&app=86&f=JPEG?w=3607&h=2408',
		'http://t9.baidu.com/it/u=1307125826,3433407105&fm=79&app=86&f=JPEG?w=5760&h=3240',
		'http://t9.baidu.com/it/u=2268908537,2815455140&fm=79&app=86&f=JPEG?w=1280&h=719',
		'http://t9.baidu.com/it/u=4169540006,4220376401&fm=79&app=86&f=JPEG?w=1000&h=1500',
		'http://t7.baidu.com/it/u=1179872664,290201490&fm=79&app=86&f=JPEG?w=1280&h=854'
	]
	import {cacheSize, cleanCache} from '@/components/jy-image/libs/jy-cache'
	export default {
		data() {
			return {
				testSrc: [],
				output: '',
				size: 0,
				count: 0
			}
		},
		onShow() {
			this.getSize()
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/httpcache/httpcache'
			})
		},
		methods: {
			loadCompleted(e) {
				console.log(e);
				this.output += (e+'\n')
				if (++this.count === testSrc.length) {
					uni.showToast({
						title: '加载完毕'
					});
					this.count = 0
					this.getSize()
				}
					
			},
			getSize() {
				cacheSize(size=>{
					this.size = size
				})
			},
			makeClean() {
				cleanCache({
					except: ['do_not_clean', 'this_key', 'and_this_key', 'etc...'],
					complete: ()=> {
						this.getSize()
						this.testSrc = []
						this.output = ''
					}
				})
			},
			reload() {
				this.testSrc = []
				setTimeout(()=>{
					this.testSrc = [...testSrc];
				}, 100)	
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.row {
		margin-top: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	image {
		margin: 10rpx;
		width: 120rpx;
		height: 120rpx;
		flex-shrink: 0;
	}
	.output {
		flex: 1;
		font-size: 24rpx;
		margin: 20rpx;
	}
</style>
