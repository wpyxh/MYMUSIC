<template>
	<div class="top-singers">
			<div class="hot" ref="hot">
				<span class="hot-left">热门</span>
				<span class="hot-right">热</span>
			</div>
			
				<div v-for="(item,index) in topSingers" class="top-list" :key="item.img1v1Id"
				@click="topSinger(item.id,item.picUrl,item.playCount,item.name)">
				<img v-lazy="item.picUrl"/>
				<div class="singer-name">
					<span>{{item.name}}</span>
			</div>
			</div> 
	</div>
</template>

<script>
	import {getHomeTopSingers} from '@/network/home.js'
	
	import {pinyin} from "@/assets/js/until.js"
	export default{
		data(){
			return{
				topSingers:[],
				nameInitials:[],
			}
		},
		
		created(){
			this.getHomeTopSingers();
			
		},
		methods:{
		getHomeTopSingers(){//请求banner中的数据
				getHomeTopSingers().then(res=>{
					let singers=res.artists;
			//	console.log(res.artists)
//					singers.sort((a,b)=>{
//						let aName=pinyin.getFullChars(a.name).charAt(0).charCodeAt();
//						let bName=pinyin.getFullChars(b.name).charAt(0).charCodeAt();
//						return aName-bName;
//					})
					let topSinger=this.topSingers;
					for(let index=0;index<=9;index++){
						topSinger.push(singers[index])
					}
					//console.log(topSinger)
					this.topSingers=topSinger;
				//this.topSingers=singers;
				//this.topSingers=res.artists;
				//this.getNameInitials()
			//console.log(this.topSingers)
			
				})
				
		},
			topSinger(id,imgUrl,playCount,name){
				
				this.$router.push("/SingerAlbum")
			this.$store.commit("songSheetId",{
					id,
					imgUrl,
					playCount,
					name,
				});
			}
//		getNameInitials(){
//			let name=this.topSingers;
//			for(let item of name){
//				let initials=pinyin.getFullChars(item.name).charAt(0)
//				this.nameInitials.push(initials)
//			}
//			this.nameInitials.sort((a,b)=>{
//				let aName=a.charCodeAt(),bName=b.charCodeAt();
//				return aName-bName;
//			})
//			console.log(this.nameInitials)
//		},
		},
	}
	
</script>

<style scoped>
	.top-singers .hot{
		width: 100%;
		height: 20px;
		background: rgba(0,0,0,.1);
		color: #fff;
		font-size: 12px;
		position: relative;
	}
	.top-singers .hot .hot-left{
		position: absolute;
		left: 20px;
		line-height: 20px;
	}
	.top-singers .hot .hot-right{
		position: absolute;
		right: 10px;
		line-height: 20px;
		color: #d44439;
	}
	.top-singers{
		padding-bottom: 5px;
	}
 .top-singers .top-list{
 	width: 93.25%;
 	height: 65px;
 	position: relative;
 	left: 3.75%;
 	padding-bottom: 5px;
 	border-bottom: 1px solid #d1d1d1;
 }
 .top-singers .top-list img{
 	position: absolute;
 	width: 60px;
 	height: 60px;
 	bottom: 5px;
 	left: 0px;
 	border-radius: 5px;
 }
 .top-singers .top-list .singer-name{
 	width: 220px;
 	height: 65px;
 	position: absolute;
 	bottom: 5px;
 	left: 70px;
 	font-size: 14px;
 	overflow: hidden;
 }
 .top-singers .top-list .singer-name span{
 	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	line-height: 65px;
 }
</style>