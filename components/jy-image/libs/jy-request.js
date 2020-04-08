/**
 * JyRequest
 * uni-app网络请求库
 * */

import Cache from './jy-cache.js'

export default class JyRequest {
	constructor(opt) {
		Object.assign(this._opt, opt)
	}
	_cache = new Cache()
	_tasks = new Map()
	_opt = {
		host: '',
		header: {},
		timeout:'6000',
		dataType:'json',
		responseType: 'text',
		sslVerify: true,
		interceptor: null,
		apiList: [],
		//调试选项
		verbose: true,
		offline: false,
	}
	opt = opt=> {
		this._opt = Object.assign(this._opt, opt)
	}
	header = opt=> {
		this._opt.header = Object.assign(this._opt.header, opt)
	}
	target = (url, method)=> {
		return new JyWrapper(Object.assign({url, method}, this._opt), this)
	}
	post = url=> { 
		return this.target(url, 'POST')
	}
	get = url=> { 
		return this.target(url, 'GET')
	}
	put = url=> {
		return this.target(url, 'PUT')
	}
	delete = url=> {
		return this.target(url, 'DELETE')
	}
	connect = url=> {
		return this.target(url, 'CONNECT')
	}
	head = url=> {
		return this.target(url, 'HEAD')
	}
	options = url=> {
		return this.target(url, 'OPTIONS')
	}
	trace = url=> {
		return this.target(url, 'TRACE')
	}
	exec = (opt={})=> {
		let task = this._tasks.get(opt.api)
		if (task !== undefined) {
			task.abort()
			this._tasks.delete(opt.api)
		}
		if (!opt.data || this._opt.apiList.includes(opt.api) || opt.offline) {
			this._read(opt, ()=>{
				!opt.offline && this._tasks.set(opt.api, uni.request(opt))
			})
		}
		else {
			!opt.offline && this._tasks.set(opt.api, uni.request(opt))
		}
	}
	abort = ()=> {
		for (const [k, v] of this._tasks) {
			v.abort()
		}
		this._tasks.clear()
		return this
	}
	_handle = (complete, e, opt)=> {
		if (e.statusCode !== undefined) {
			this._tasks.delete(opt.api)
			typeof(this._opt.interceptor) === 'function' && this._opt.interceptor(e)
			if (e.statusCode === 200) {
				complete(e.data);
				opt.resolve(e.data);
				(!opt.data || this._opt.apiList.includes(opt.api)) && this._write(e, opt)
			}
			else {
				this._read(opt)
			}
		}
		else {
			if (e.offline) {
				complete(e)
				opt.resolve(e)
			}
			else {
				this._read(opt)
			}
		}
		this._opt.verbose && Tools.log(e, opt)
	}
	_read = (opt, next)=> {
		this._cache.read({
			key: opt.api,
			complete: data=>{
				if (data) {
					data.offline = true
					opt.complete(data)
				}
				next && next()
			}
		})
	}
	_write = (e, opt)=> {
		this._cache.write({
			key: opt.api,
			data: e.data 
		})
	}
}
class JyWrapper {
	constructor(opt, req) {
		this._req = req
	    this._opt = Object.assign({}, opt)
		this._opt.api = opt.url
		this._opt.url = Tools.combineURLs(req._opt.host, opt.url)
		this._promise = new Promise((resolve, reject)=>{
			this._opt.resolve = resolve
			this._opt.reject = reject
		})
	}
	header = opt=> {
		this._opt.header = Object.assign(this._req._opt.header, opt)
		return this
	}
	send = data=> {
		this._opt.data = data
		return this
	}
	back = complete=> {
		const _ = this
		this._opt.complete = (function(e) {
			_._req._handle(complete, e, this)
		}).bind(this._opt)
		return this
	}
	cache = ()=> {
		const api = this._opt.api
		const list = this._req._opt.apiList
		!list.includes(api) && list.push(this._opt.api)
		return this
	}
	exec = (opt={})=> {
		!this._opt.complete && this.back((resp)=>{})
		this._req.exec(Object.assign(this._opt, opt))
		return this._promise
	}
}
const Tools = {
	combineURLs: (baseURL, relativeURL)=> {
		return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
	},
	log: (e, opt)=> {
		if (e.statusCode !== 200 && !e.offline) {
			console.error('['+opt.api+' '+opt.method+']')
			console.error('    [状态码]', e.statusCode)
			console.error('    [请求头]', opt.header)
			opt.data && console.error('    [请求数据]', opt.data)
			console.error('    [返回数据]', e.statusCode === undefined ? e : e.data)
		}
		else {
			console.log('['+opt.api+' '+opt.method+']')
			e.offline && console.log('    [本地数据]')
			console.log('    [请求头]', opt.header)
			opt.data && console.log('    [请求数据]', opt.data)
			console.log('    [返回数据]', e.statusCode === undefined ? e : e.data)
		}
	}
}