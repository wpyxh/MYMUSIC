import {request} from './request.js'

export function getSingerAlbum(id){//歌手专辑
	return request({
		url:"/artists?id="+id
	})
}