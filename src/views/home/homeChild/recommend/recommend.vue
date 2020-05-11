<template>
	<div class="recommend">
		<scroll class="scroll" ref="scroll">
			<banner :banners="banners"></banner>
			<recommend-songs :recommendsongs='recommendsongs'></recommend-songs>
			<recommended-songs :recommendedsongs='recommendedsongs'></recommended-songs>
		</scroll>
	</div>
</template>

<script>
	import scroll from "@/components/scroll.vue"
	import banner from "./banner.vue"
	import recommendSongs from "./RecommendSongs.vue"
	import recommendedSongs from "./RecommendedSongs.vue"
	
	
	import {getHomeBanner,getHomeRecommendSongs,getHomeRecommendedSongs} from '@/network/home.js'
	export default{
		name:'recommend',
		components:{
			banner,
			scroll,
			recommendSongs,
			recommendedSongs,
		},
		data(){
			return{
				banners:[],
				recommendsongs:[],
				recommendedsongs:[],
				saveY:0,
			}
		},
		
		created(){
		//请求走马灯图片
		this.getHomeBanner();
		this.getHomeRecommendSongs();
		this.getHomeRecommendedSongs();
		},
		
		
		methods:{
		getHomeBanner(){//请求banner中的数据
			getHomeBanner().then(res=>{
			this.banners=res.banners;
			//console.log(res.banners)
		})
		},
		
		getHomeRecommendSongs(){//请求推荐歌单中的数据
			getHomeRecommendSongs().then(res=>{
			this.recommendsongs=res.result;
			//console.log(this.recommendsongs)
		})
		},
		
		getHomeRecommendedSongs(){//请求推荐歌单中的数据
			getHomeRecommendedSongs().then(res=>{
			this.recommendedsongs=res.result;
			//console.log(this.recommendsongs)
		})
		},
		},
		activated(){
		this.$refs.scroll.scroll.refresh();
		this.$refs.scroll.scroll.scrollTo(0,this.saveY,0);//重新回到页面时，页面回到离开前的位置
		
	},
	deactivated(){
		this.saveY=this.$refs.scroll.scroll.y;//保留页面离开前的位置
		
	},
		
	}
</script>

<style scoped>
	.scroll{
		position: absolute;
		top: 88px;
		bottom:0px;
		left: 0;
		right: 0;
		overflow: hidden;
		background:linear-gradient(to bottom,#d44439 0%,#d44439 50%,#f1f1f1 51%,#f1f1f1 100%);
	}

</style>