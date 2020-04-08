/**
 * JyCache
 * uni-app缓存库
 * */

export const imageCache = (url, complete=null)=> {
	const key = btoa(url)
	try{
		const path = uni.getStorageSync(key)
		if(path.length == 0) {
			uni.downloadFile({
				url: url,
				success: (res) => {
					if (res.statusCode === 200) {
						const tempFilePath = res.tempFilePath
						uni.saveFile({
							tempFilePath: tempFilePath,
							success: function (res) {
								const savedFilePath = res.savedFilePath
								uni.setStorage({
									key: key,
									data: savedFilePath
								})
								complete && complete(savedFilePath)
							}
						})
					}
				}
			})
			return url
		}
		return path
	}catch(e){

	}
}

export const cacheSize = complete=> {
	uni.getStorageInfo({
		complete: (e) => {
			let total = e.currentSize ? e.currentSize : 0
			let unit = 'kb'
			uni.getSavedFileList({
				success: (res)=> {
					let size = 0
					for (let doc of res.fileList) {
						size += doc.size
					}
					total = total + size/1024
					if (total >= 1024) {
						unit = 'mb'
						total /= 1024
					}
					complete(total.toFixed(2)+unit)
				},
				fail: ()=> {
					complete(total+unit)
				}
			})
		}
	})
}

export const cleanCache = object=> {
	uni.getSavedFileList({
		success: (res)=> {
			for (let doc of res.fileList) {
				uni.removeSavedFile({
					filePath: doc.filePath,
				})
			}
			uni.getStorageInfo({
				success: (res)=> {
					for (let key of res.keys) {
						if (object.except.indexOf(key) < 0) {
							uni.removeStorage({
								key: key,
								success: (res)=> {}
							})
						}
					}
					object.complete()
				}
			})
		}
	})
}

export default class JyCache {
	constructor(bind) {
		this.route = bind ? bind.$scope.route+'/' : null
	}
	
	_key = key=> {
		return this.route ? this.route+key : key
	}

	write = object=> {
		const key = this._key(object.key)
		const data = JSON.stringify(object.data)
		uni.setStorage({key,data,
			complete: object.complete
		})
	}
	read = object=> {
		const key = this._key(object.key)
		uni.getStorage({key,
			complete: (res) => {
				object.complete(res.data.length ? JSON.parse(res.data) : null)
			}
		})
	}
}