import {JyReq} from 'jy-request'
export const req = new JyReq({
	host: 'https://api.apiopen.top/', //接口域名
	verbose: true, //显示打印信息
	/**
	 * 其他属性
	 * header:
	 * timeout:
	 * dataType:
	 * responseType:
	 * sslVerify:
	 * apiList: [], //设置额外缓存的Api
	 * interceptor: //拦截器
	 * offline: //仅显示离线数据
	 * */
})