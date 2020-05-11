import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
   		path:'',
   		redirect:'/home',
   		meta:{
   		title:'首页'
   		}
   	},
   	{
   		path: '/home',
   		component: ()=>import('../views/home/Home.vue'),
   		meta:{
   		title:'首页'
   		},
   		children:[
		   {
		   		path: '',
		   		redirect:'/recommend',
		   		meta:{
		   		title:'推荐'
		   		}
		   	},
		   	{
		   		path: '/recommend',
		   		component: ()=>import('../views/home/homeChild/recommend/recommend.vue'),
		   		meta:{
		   		title:'推荐'
		   		}
		   	},
		   	{
		   		path: '/top',
		   		component: ()=>import('../views/home/homeChild/top/top.vue'),
		   		meta:{
		   		title:'排行'
		   		}
		   	},
		   	{
		   		path: '/singer',
		   		component: ()=>import('../views/home/homeChild/singer/singer.vue'),
		   		meta:{
		   		title:'歌手'
		   		}
		   	}
   		]
   	},
   	{
   		path: '/SongSheet',
   		name:'SongSheet',
   		component: ()=>import('../views/songSheet/SongSheet.vue'),
   		meta:{
   		title:'歌单'
   		}
   	},
   	{
   		path: '/SingerAlbum',
   		name:'SingerAlbum',
   		component: ()=>import('../views/singerAlbum/SingerAlbum.vue'),
   		meta:{
   		title:'歌单'
   		}
   	},
   	{
   		path: '/song',
   		component: ()=>import('../views/song/Song.vue'),
   		meta:{
   		title:'歌曲'
   		}
   	},
   	{
   		path: '/collection',
   		component: ()=>import('../views/collection/Collection.vue'),
   		meta:{
   		title:'收藏'
   		},
   		children:[
		   {
		   		path: '',
		   		redirect:'/myCollection',
		   		meta:{
		   		title:'收藏'
		   		}
		   	},
		   	{
		   		path: '/myCollection',
		   		component: ()=>import('../views/collection/collectionChild/myCollection.vue'),
		   		meta:{
		   		title:'我的收藏'
		   		}
		   	},
		   	{
		   		path: '/recentlyPlayed',
		   		component: ()=>import('../views/collection/collectionChild/recentlyPlayed.vue'),
		   		meta:{
		   		title:'最近播放'
		   		}
		   	}
		   ]
   	},
   	{
   		path: '/search',
   		component: ()=>import('../views/search/Search.vue'),
   		meta:{
   		title:'搜索'
   		},
   		children:[
		   {
		   		path: '',
		   		redirect:'/hotSearch',
		   	},
		   	{
		   		path: '/hotSearch',
		   		component: ()=>import('../views/search/searchChild/hotSearch.vue'),
		   	},
		   	{
		   		path: '/inputSearch',
		   		component: ()=>import('../views/search/searchChild/inputSearch.vue'),
		   	},
		   ]
   	}
]

const router = new VueRouter({
  routes
})


export default router
