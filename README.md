# jy-image是什么
* jy-image是一个uni-app缓存组件

# jy-image特性
* 支持图片缓存及placeholer
* 支持数据缓存

# 使用
- ## 图片缓存
   导入组件，将page目录下的image标签批量替换到jy-image标签，即可实现图片缓存  
   ```html
   <jy-image :src="url" :placeholder="url" :complete="complete"></jy-image>
   ```

- ## 数据缓存
  #### 1. 初始化
  ```js
  import JyReq from '@/components/jy-image/libs/jy-request'
  export const req = new JyReq({
      host: 'host', //见本文档props列表
  })
  ```
  #### 2. 请求并缓存
  ```js
  req.get('api').back(resp=>{}).exec()
  ```
  #### 3. 传递数据和请求头
  ```js
  req.post('api').header({}).send({}).back(resp=>{}).exec()
  ```
  #### 4. 额外的缓存  
  由于默认只对未传参的请求进行缓存，如果需要缓存带参请求则需要调用cache()方法或者通过cacheList属性进行设置
  ```js
  req.get('api').back(resp=>{}).cache().exec() 
  //也可以通过cacheList属性来实现带参请求的缓存
  req.opt({
      cacheList: ['api1', 'api2']
  })
  ```
  #### 5. Promise方式
  ```js
  async fetch() {
      const {code, msg} = await req.post('api').send({}).cache().exec()
  }
  ```
  #### 6. Method列表
  - 请求方式  
  `post('')` `get('')` `put('')` 等  
  - 请求数据  
  `send({})`
  - 请求头  
  `header({})`
  - 回调  
  `back(resp=>{})`
  - 指定缓存  
  `cache()`
  - 执行请求  
  `exec()`
  - 取消所有请求  
  `abort()`
  - 设置全局props  
  `opt({})`
  - 设置本次请求props并执行请求  
  `exec({})`  

  #### 7. Props列表
  - `host:`  
  - `header:`  
  - `timeout:`  
  - `dataType:`  
  - `responseType:`  
  - `sslVerify:`  
  - `apiList: []`  
  设置额外缓存的api, 同cache()
  - `interceptor: (resp)=>{}`  
  拦截器
  - `offline: Boolean`  
  仅显示离线数据，测试缓存使用
  - `verbose: Boolean`  
  是否显示打印信息

