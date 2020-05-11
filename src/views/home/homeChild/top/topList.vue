<template>
	<div class="topList">
			<div v-for="(item,index) in top" class="top-list" :key="item.coverImgId"
				 @click="topListClick(item.id,item.coverImgUrl,item.playCount,item.name)">
				<img v-lazy="item.coverImgUrl"/>
				<div class="top-three">
					<p v-for="i in 3">{{i}}.{{item.tracks[i].name}}-{{item.tracks[i].ar[0].name}}</p>
				</div>
			</div> 
	</div>
</template>

<script>
	import {getHomeTop} from '@/network/home.js'
	export default{
		data(){
			return{
				top:[],
			}
		},
		
		created(){
			this.getHomeTop();
		},
		
		
		methods:{
		getHomeTop(){//请求banner中的数据
			for(let id=0;id<=11;id++){
				getHomeTop(id).then(res=>{
				this.top.push(res.playlist)
			//console.log(res)
				})
			}
		},
		topListClick(id,imgUrl,playCount,name){
			this.$router.push("/SongSheet")
			this.$store.commit("songSheetId",{
					id,
					imgUrl,
					playCount,
					name,
				});
		}
	}
	}
	
</script>

<style scoped>
 .topList .top-list{
 	width: 93.25%;
 	height: 105px;
 	position: relative;
 	left: 3.75%;
 	padding-bottom: 5px;
 	border-bottom: 1px solid #d1d1d1;
 }
 .topList .top-list img{
 	position: absolute;
 	width: 100px;
 	height: 100px;
 	bottom: 5px;
 	left: 0px;
 	border-radius: 5px;
 }
 .topList .top-list .top-three{
 	width: 180px;
 	height: 100px;
 	position: absolute;
 	bottom: 5px;
 	right: 0px;
 	font-size: 12px;
 	overflow: hidden;
 }
 .topList .top-list .top-three p{
 	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
 }
</style>