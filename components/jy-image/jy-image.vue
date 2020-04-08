<template>
	<image 
	:src="native" 
	:mode="mode"
	:lazy-load="this.$props['lazy-load']"
	:fade-show="this.$props['fade-show']"
	:show-menu-by-longpress="this.$props['show-menu-by-longpress']"
	:webp="webp"
	@load="load"
	@error="error">
	</image>
</template>

<script>
	import {imageCache} from './libs/jy-cache'
	export default {
		name: 'JyImage',
		props: {
			src: {
				type: String,
				default: ''
			},
			mode: {
				type: String,
				default: ''
			},
			"lazy-load": {
				type: Boolean,
				default: false
			},
			"fade-show": {
				type: Boolean,
				default: true
			},
			"webp": {
				type: Boolean,
				default: false
			},
			"show-menu-by-longpress": {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: ''
			},
			complete: {
				type: Function,
				default: null
			}
		},
		watch: {
			src: function(n, o) {
				n && this.convert(n)
			}
		},
		data() {
			return {
				native: this.placeholder
			};
		},
		created() {
			this.convert(this.src)
		},
		methods: {
			convert(src) {
				if (src.match(/(http:|https:)/)) {
					const native = imageCache(src, e=>{
						this.native = e
						this.complete && this.complete(e)
					})
					if (native != src)
						this.native = native
				}
				else {
					this.native = src
				}
			},
			load() {
				this.$emit("load")
			},
			error() {
				this.$emit("error")
			}
		}
	}
</script>

<style>

</style>
