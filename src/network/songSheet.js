import {request} from './request.js'

export function getSongSheet(id){//推荐歌单每个歌单的数据
	return request({
		url:"/playlist/detail?id="+id
	})
}