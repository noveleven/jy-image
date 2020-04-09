# jy-image是什么
* jy-image是一个uni-app缓存组件

# jy-image特性
* 支持图片缓存及placeholer

# 使用
- ## 安装依赖
   ```sh
   npm i jy-request
   ```
- ## 图片缓存
   导入组件，将page目录下的image标签批量替换到jy-image标签，即可实现图片缓存  
   ```html
   <jy-image :src="url" :placeholder="url" :complete="complete"></jy-image>
   ```
