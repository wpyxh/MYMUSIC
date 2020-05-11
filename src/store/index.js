import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	sheetId:0,
  	sheetImgUrl:null,
  	sheetPlayCount:0,
  	sheetName:null,
  	songId:null,
  	songName:null,
  	singerName:null,
  	songImg:null,
  	playTime:0,
  	songSheetY:0,
  	searchSongs:null,
  	searchInput:null,
  	searchHistoryArr:[],
  	songsInportantInfoArr:[],
  	songindex:0,
  	searchSongsInportantInfoArr:[],
  },
  mutations: {
  	songSheetId(state,data){
  		state.sheetId=data.id;
  		state.sheetImgUrl=data.imgUrl;
  		state.sheetPlayCount=data.playCount;
  		state.sheetName=data.name;
  	},
//	songData(state,data){
//		state.songId=data.songId;
//		state.songName=data.songName;
//		state.singerName=data.singerName;
//		state.songImg=data.songImg;
//		state.playTime=data.playTime;
//	},
  	songsInportantInfoArr(state,data){
  		state.songsInportantInfoArr=data;
  	},
  	searchSongsInportantInfoArrPush(state,data){
  		state.searchSongsInportantInfoArr.push(data);
  	},
		searchSongsInportantInfoArr(state,data){
			state.searchSongsInportantInfoArr=data;
		},
		clearScreachSongsInportantInfoArr(state){
			state.searchSongsInportantInfoArr=[];
		},
  	songindex(state,index){
  		state.songindex=index;
  	},
  	clearSongsIndex(state){
  		state.songindex=0;
  	},
  	addSongsIndex(state){
  		state.songindex=state.songindex+1;
  	},
  	reduceSongsIndex(state){
  		state.songindex=state.songindex-1;
  	},
  	randomSongsIndex(state,data){
  		state.songindex=data;
  	},
  	lastSongsIndex(state){
  		state.songindex=state.songsInportantInfoArr.length-1;
  	},
//	lastSong(state,data){
//		state.songId=state.songsInportantInfoArr[data].id;
//		state.songName=state.songsInportantInfoArr[data].songName;
//		state.singerName=state.songsInportantInfoArr[data].singerName;
//		state.songImg=state.songsInportantInfoArr[data].picUrl;
//		state.playTime=state.songsInportantInfoArr[data].playTime;
//	},
  	songSheetSaveY(state,saveY){
  		state.songSheetY=saveY;
  	},
//	searchSongs(state,data){
//		state.searchSongs=data;
//	},
  	delSearchSongs(state){
  		state.searchSongs=null;
  	},
  	searchInput(state,data){
  		state.searchInput=data;
  	},
		searchHistoryArr(state){
			state.searchHistoryArr.push(state.searchInput)
			state.searchHistoryArr=[...new Set(state.searchHistoryArr)]
		},
		delAllHistory(state){
			state.searchHistoryArr=[];
		},
		delHistorySong(state,data){
			state.searchHistoryArr.filter((item,index,arr)=>{
				if(item===data){
					arr.splice(index,1)
				}
			})
		},
		emptyClick(state,data){
			if(data==="'是否清空历史记录?"){
				state.searchHistoryArr=[];
			}
		},
  },
  	
  actions: {
  },
  modules: {
  }
})
