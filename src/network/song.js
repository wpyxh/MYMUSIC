import {request} from './request.js'

export function getSong(id){//推荐歌单每个歌曲的MP3
	return request({
		url:"/music/url?id="+id
	})
}

export function getSongInfo(id){//推荐歌单每个歌曲的数据
	return request({
		url:"/song/detail?ids="+id
	})
}
