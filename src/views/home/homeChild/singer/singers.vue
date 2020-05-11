<template>
	<div class="singers">
		<div class="singers-initials" v-for="(v,i) in singersS">
			<div class="initials">
					<span>{{v}}</span>
			</div>
			
			
			<div v-for="(item,index) in singers" class="list" :key="item.img1v1Id"
				@click="singer(item.id,item.picUrl,item.playCount,item.name)"
				v-if="v===singersSum[index]">
					<img v-lazy="item.picUrl"/>
					<div class="singer-name">
						<span>{{item.name}}</span>
					</div>
			</div>
		</div>
	
	</div>
</template>

<script>
	import {getHomeSingers} from '@/network/home.js'
	
	import {pinyin} from "@/assets/js/until.js"
	
	export default{
		data(){
			return{
				singers:[],//歌手
				singersSum:[],//每个歌手name首字母 AAABBBBBB........
				singersInitials:{},//所有歌手的name首字母的相同的歌手 A:3 B:6 C:11...
				singersI:[],//3 6 11....
				singersS:[],//singersSum去重
			}
		},
		
		created(){
			this.getHomeSingers();
		},
		
		
		methods:{
		getHomeSingers(){
				getHomeSingers().then(res=>{
					let Singers=res.artists;
					Singers.sort((a,b)=>{
						let aName=pinyin.getFullChars(a.name).charAt(0).toUpperCase().charCodeAt();
						let bName=pinyin.getFullChars(b.name).charAt(0).toUpperCase().charCodeAt();
						return aName-bName;
					})
					this.singers=Singers;
					
					
					let sum=[];
					for(let item of Singers){
						let initials=pinyin.getFullChars(item.name).charAt(0).toUpperCase();
						sum.push(initials);
					}
					//console.log(sum)
					this.singersSum=sum;
					
					this.singersInitials=this.getSingersInitials(sum);
					
					let I=this.getSingrtsI(this.singersInitials).filter(item => item!=0);
					this.singersI=I;
					//console.log(this.singersI)
					
					this.singersS=[...new Set(this.singersSum)];
					
					this.$emit("singerData",{
						singersSum:this.singersSum,
						singersI:this.singersI,
						singersS:this.singersS
					})
					//console.log(this.singersS)
					//console.log(this.singersSum)
					//console.log(this.singersInitials)
				})
		},
		
		getSingersInitials(target){
			let obj={A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0,K:0,L:0,M:0,N:0,O:0,P:0,Q:0,R:0,S:0,T:0,U:0,V:0,W:0,X:0,Y:0,Z:0};
			for(const item of target){
				if(item in obj){
					obj[item]++
				}
			}
			return obj;
		},
		
		getSingrtsI(target){
			let arr=[]
			for(const [key,value] of Object.entries(target)){
				arr.push(value);
			}
		 return arr;
		},
		singer(id,imgUrl,playCount,name){
				this.$router.push("/SingerAlbum")
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
	.singers .initials{
		width: 100%;
		height: 20px;
		background: rgba(0,0,0,.1);
		color: #fff;
		font-size: 12px;
		position: relative;
	}
	.singers .initials span{
		position: absolute;
		left: 20px;
		line-height: 20px;
	}
 .singers .list{
 	width: 93.25%;
 	height: 65px;
 	position: relative;
 	left: 3.75%;
 	padding-bottom: 5px;
 	border-bottom: 1px solid #d1d1d1;
 }
 .singers .list img{
 	position: absolute;
 	width: 60px;
 	height: 60px;
 	bottom: 5px;
 	left: 0px;
 	border-radius: 5px;
 }
 .singers .list .singer-name{
 	width: 220px;
 	height: 65px;
 	position: absolute;
 	bottom: 5px;
 	left: 70px;
 	font-size: 14px;
 	overflow: hidden;
 }
 .singers .list .singer-name span{
 	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	line-height: 65px;
 }
</style>