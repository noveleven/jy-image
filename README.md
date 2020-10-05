# jy-image是什么

* jy-image是一个uni-app缓存组件

# jy-image特性

* 图片缓存
* 图片占位符

# 使用

- ## 安装依赖
   ```sh
   npm i jy-request
   ```

- ## 图片缓存
   将[jy-image](https://github.com/noveleven/jy-image/releases/download/1.0.1/jy-image.zip)放入components目录，再将page目录下的image标签批量替换到jy-image标签，即可实现图片缓存  

   ```html
   <jy-image :src="url" :placeholder="url" @complete="complete"></jy-image>
   ```

- ## 缓存大小与清理
   ```js
	import {cacheSize, cleanCache} from 'jy-request'
	cacheSize(size=>{
		//todo
	})
	cleanCache({
		except: ['do_not_clean', 'etc...'],//需要保留的Storage Key
		complete: ()=> {
			//todo
		}
	})
   ```