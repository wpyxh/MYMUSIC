import {request} from './request.js'

export function getHomeBanner(){//走马灯
	return request({
		url:'/banner'
	})
}

export function getHomeRecommendSongs(){//推荐歌单
	return request({
		url:'/personalized'
	})
}

export function getHomeRecommendedSongs(){//推荐歌曲
	return request({
		url:'/personalized/newsong'
	})
}

export function getHomeTop(id){//排行数据
	return request({
		url:"/top/list?idx="+id
	})
}

export function getHomeTopSingers(){//热门歌手
	return request({
		url:"/top/artists"
	})
}

export function getHomeSingers(){//歌手
	return request({
		url:"/top/artists?limit=100"
	})
}

