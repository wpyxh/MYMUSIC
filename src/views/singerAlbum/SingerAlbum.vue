<template>
	<transition name="slide"   mode="in-out">
	<div class="song-sheet" mode="out-in">
		<nav-bar class="nav" ref="nav">
			<template v-slot:left>
				<i class="el-icon-arrow-left" @click="backClick"></i>
			</template>
			<template v-slot:between class="between">
				<span class="title">{{title}}</span>
		</template>
		</nav-bar>
		
		<scroll class="song-sheet-scroll" ref="scroll" @scroll="scrollY">
			<div class="bgImg">
				<img :src="this.$store.state.sheetImgUrl"/>
				<h2 class="songSheet-name">{{this.$store.state.sheetName}}</h2>
			</div>
			
			<div class="songs">
				<div class="songs-title">
					<i class="el-icon-video-play"></i>
					<span>播放全部(共{{songsLength}}首)</span>
				</div>
				<div class="song-item" v-for="(item,index) in songSheet.hotSongs" :key="item.id" 
					@click="singerClick(index)">
						<span class="index">{{index+1}}</span>
					<div class="song-item-name">
						<span class="song-name">{{item.name}}</span>
			 			<span class="artist-name">{{item.ar[0].name}}</span>
					</div>
				</div>
				
				<img v-if="show" src="../../assets/img/loading.gif"/>
			</div>
		</scroll>
	</div>
	</transition>
</template>

<script>
	import navBar from "@/components/NavBar.vue"
	import scroll from "@/components/scroll.vue"
	
	import {getSingerAlbum} from '@/network/singerAlbum.js'
	export default{
		components:{
			navBar,
			scroll ,
		},
		data(){
			return {
				title:"歌手",
				fl:true,
				songSheet:[],
				songsLength:0,
				show:true,
			}
		},
		created(){
			this.getSingerAlbum(this.$store.state.sheetId);
		},
	
		methods:{
			getSingerAlbum(id){
			getSingerAlbum(id).then(res=>{
			this.songSheet=res;
			//console.log(res.hotSongs)
			
			let songsInportantInfoArr=[];
			for(let i=0;i<res.hotSongs.length;i++){
				let songSheetInportantInfo={
				id:res.hotSongs[i].id,
				songName:res.hotSongs[i].name,
				singerName:res.hotSongs[i].ar[0].name,
				picUrl:res.hotSongs[i].al.picUrl,
				playTime:res.hotSongs[i].dt
				}
				songsInportantInfoArr.push(songSheetInportantInfo);
			}
			//console.log(songsInportantInfoArr)
			this.$store.commit("songsInportantInfoArr",songsInportantInfoArr)
			
			
			this.songsLength=res.hotSongs.length
			if(this.songsLength!=0){
				this.show=!this.show;
			}
		
		//	console.log(res.result)
		})
		},
			backClick(){
				this.$router.back();
		
				//console.log(this.$store.state.sheetId)
			},
			scrollY(scrollY){
				
				if(scrollY>=250&&this.fl){
					this.fl=false;
					this.title=this.$store.state.sheetName;
					this.$refs.nav.$el.style.backgroundColor=`rgba(212,68,57,1)`;
				}else if(scrollY<250){
					this.fl=true;
					this.title='歌手';
					this.$refs.nav.$el.style.backgroundColor=`rgba(212,68,57,${scrollY*0.004})`;
					
				}
			
			},
			singerClick(index){
				this.$store.commit("songindex",index)
				this.$router.push("/song");
//				this.$store.commit("songData",{
//					songId,
//					songName,
//					singerName,
//					songImg,
//					playTime
//				})
		},
		},
//		mounted(){
//			this.$refs.scroll.scroll.refresh();
//			let saveY=this.$store.state.songSheetY;
//			this.$refs.scroll.scroll.scrollTo(0,saveY,0);
//			console.log(this.$store.state.songSheetY)
//		},
//	beforeDestroy(){
//		//保留页面离开前的位置
//		
//		this.$store.commit("songSheetSaveY",this.$refs.scroll.scroll.y)
//	}
}
		
</script>

<style scoped>
.slide-enter-active {
	  transition:all .5s ease-in-out;
}
.slide-leave-active {
  transition: all .5s;
}
.slide-enter {
	
	transform: translateX(100%);
  opacity: 0;
}
 .slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
	.nav{
		background-color: rgba(212,68,57,0);
		z-index: 99;
	}
	.nav .title{
		white-space: nowrap;
	}
	.song-sheet{
		color: #fff;
		position: fixed;
	  z-index: 90;
	  top: 0;
	  left: 0;
	  bottom: 0;
	  right: 0;
	}
	.song-sheet i{
		font-size: 28px;
	}
	.song-sheet .title{
		display: inline-block;
		width: 100%;
		height: 100%;
		text-align: left;
		font-size: 18px;
	}
	.song-sheet-scroll{
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0;
		right: 0;
		overflow: hidden;
		background:#f1f1f1;
		color: #000000;
	}
	.bgImg{
		width: 100%;
		height: 250px;
		background: #000;
		position: relative;
		overflow: hidden;
		z-index: 9;
	}
	.bgImg img{
		width: 100%;
		height: 100%;
		opacity: 0.8;
	}
	.bgImg .songSheet-name{
		position: absolute;
		bottom: 20px;
		left: 15px;
		color: #fff;
		font-size: 16px;
		font-weight: 700;
	}
	.songs{
		width: 100%;
		background:#f2f3f4;
		z-index: 9999;
		border-radius: 10px 10px 0 0;
		position: relative;
		top: -20px;
	}
	.songs-title{
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		height: 40px;
		line-height: 41px;
		padding-left: 16px;
		border-bottom: 1px solid #e4e4e4;
	}
	.songs-title i{
		font-size: 18px;
		padding-right: 14px;
	}
	.song-item{
		width: 100%;
		height: 60px;
		padding-left: 16px;
		border-bottom: 1px solid #e4e4e4;
		position: relative;
	}
	.song-item .index{
		padding-right: 14px;
		color: #757575;
		line-height: 60px;
		font-size: 16px
	}
	.song-item .song-item-name{
		display: inline-block;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 200px;
		height: 40px;
	}
	.song-item .song-item-name .song-name{
		position: absolute;
		top: 0;
		left: 0;
		font-size: 16px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.song-item .song-item-name .artist-name{
		position: absolute;
		bottom: 0;
		left: 0;
		font-size: 12px;
		color: #757575;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		}
		.songs img{
			width: 50px;
			height: 50px;
			margin-top: 50%;
			margin-left: 50%;
			transform: translate(-50%,-50%);
		}
</style>