##jy-image是什么?
* jy-image是一个uni-app缓存组件

##jy-image特性
* 支持图片缓存及placeholer
2. 支持数据缓存
---
##使用
- ##图片缓存
 导入组件后，批量替换page目录下的image标签到jy-image即可  
`<jy-image :src="url" :placeholder="url" :complete="complete"></jy-image>`

- ##数据缓存
 - ###导入  
 `import JyReq from '@/components/jy-image/libs/jy-request'`
 - ###初始化    
```
const req = new JyReq({})
export const req = new JyReq({
	host: 'host', //接口域名
	//...更多见本文档props列表
})
```
 - ###请求数据并进行缓
   ####1. 简单的例子
   ```
   req.get('api').back(resp=>{}).exec()
   ```
   ####2. 传递数据和请求头
   ```
   req.post('api').header({}).send({}).back(resp=>{}).exec()
   ```
   ####3. 额外的缓存  
   由于默认只对未传参的请求进行缓存，如果需要则调用cache()方法
   ```
   req.get('api').back(resp=>{}).cache().exec() 
   //或通过cacheList进行配置
   req.opt({
       cacheList: ['api1', 'api2']
   })
   ```
  ####4. Promise方式
   ```
   async fetch() {
   	const {code, msg} = await req.post('api').send({}).cache().exec()
   }
   ```
  ####5. method列表
   1. 请求方式  
   `post('')` `get('')` `put('')` 等等
   2. 请求数据  
   `send({})`
   3. 请求头  
   `header({})`
   4. 回调  
   `back(resp=>{})`
   5. 指定缓存  
   `cache()`
   6. 执行请求  
   `exec()`
   7. 取消所有请求  
   `abort()`
   8. 设置全局props  
   `opt({})`
   9. 设置本次请求props  
   `exec({})`  

   ####6. props列表
    1. `host:`  
    见uni-app文档描述
    2. `header:`  
    见uni-app文档描述
    3. `timeout:`  
    见uni-app文档描述
    4. `dataType:`  
    见uni-app文档描述
    5. `responseType:`  
    见uni-app文档描述
    6. `sslVerify:`  
    见uni-app文档描述
    7. `apiList: []`  
    设置额外缓存的api, 同cache()
    8. `interceptor: (resp)=>{}`  
    拦截器
    9. `offline: Boolean`  
    仅显示离线数据，测试缓存使用
    10. `verbose: Boolean`  
    是否显示打印信息

