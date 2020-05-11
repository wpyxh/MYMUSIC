import {request} from './request.js'

export function getHotSearch(){//热门搜索
	return request({
		url:"/search/hot"
	})
}

export function getSearch(keywords,offset=0){//热门搜索
	return request({
		url:"/search?keywords="+keywords+"&offset="+offset
	})
}