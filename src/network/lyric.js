import {request} from './lyricApi.js'

export function getLyric(id){//歌词
	return request({
		url:"/cloudmusic/?type=lyric&id="+id
	})
}