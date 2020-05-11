<template>
	<transition name="slide"   mode="in-out">
	<div class="song">
		<div class="bgimg">
			<div class="filter"></div>
			<img :src="this.$store.state.songsInportantInfoArr[this.$store.state.songindex].picUrl"/>
		</div>
		<div class="song-nav">
			<div class="back">
				<i class="el-icon-arrow-down" @click="back"></i>
			</div>
			
			<div class="title">
				<p class="song-name" >
					{{this.$store.state.songsInportantInfoArr[this.$store.state.songindex].songName}}
				</p>
				<p class="singer-name">
					{{this.$store.state.songsInportantInfoArr[this.$store.state.songindex].singerName}}
				</p>
			</div>
		</div>
		
		<div class="song-content" @click="lyricClick">
			<scroll class="scroll" ref="songSecroll">
				<img :src="this.$store.state.songsInportantInfoArr[this.$store.state.songindex].picUrl" 
				:class="{'active':true,'pause':imgActive}"
				v-show="imgShow"
				/>
				<div class="lyric" v-show="!imgShow" ref="lyric">
					<p class="noLyric" v-if="noLyricShow">暂无歌词</p>
					<p v-for="(item,index) in lyric" 
						:class="{lyricActive:index+1==lyric.length?(item.t<=onlineTime):(item.t<=onlineTime&&onlineTime<lyric[index+1].t)}"
						:key="index"
						:ref="index">{{item.c}}</p>
				</div>
			</scroll>
		</div>
		
		<div class="song-play">
			<video :src="songUrl" controls="controls" autoplay v-show="false" ref="video"></video>
			<div class="progress-bar">
				<span class="playS">{{playedTime}}</span>
				<div class="bar-inner" ref="barInner" @click="barInnerClick">
					<div class="progress" ref="progress"></div>
					<div class="progress-btn" ref="progressBtn"></div>
				</div>
				<span class="playE">{{playE}}</span>
			</div>
			<div class="operate">
				<img src="../../assets/img/play/xunhuan.svg" v-show="randomShow===1" @click="randomShow=2"/>
				<img src="../../assets/img/play/danquxunhuan.svg" v-show="randomShow===2" @click="randomShow=3"/>
				<img src="../../assets/img/play/RandomPlay.svg" v-show="randomShow===3" @click="randomShow=1"/>
				<img src="../../assets/img/play/xiayishou_1.svg" @click="lastSong"/>
				<img src="../../assets/img/play/zanting.svg" v-show="bofang===1" @click="stop"/>
				<img src="../../assets/img/play/bofang.svg" v-show="bofang===2" @click="start"/>
				<img src="../../assets/img/play/xiayishou.svg" @click="nextSong"/>
				<img src="../../assets/img/play/shoucang_1.svg" v-show="shoucang===1" @click="shoucangClick"/>
				<img src="../../assets/img/play/shoucang.svg" v-show="shoucang===2" @click="clearshoucangClick"/>
			</div>
		</div>
	</div>
	
	</transition>
</template>

<script>
import {getSong} from '@/network/song.js'
import {getLyric} from '@/network/lyric.js'

import scroll from "@/components/scroll.vue"
	
	export default{
		components:{
			scroll,
		},
		data(){
			return{
				songUrl:null,
				//progressRollTime:null,
				//progressBtnTime:null,
				randomShow:1,
				shoucang:1,
				bofang:1,
				imgActive:false,
				//progressBtnLeft:0,
				//progressRollWidth:0,
				playStartS:0,
				lyric:null,
				imgShow:true,
				noLyricShow:false,
				playedTime:"0:00",
				lyricActive:false,
				onlineTime:0,
			}
		},
		created(){
		
				this.getSong(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id);
				this.getLyric(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id);
	
			
			
			if(this.$store.state.searchInput){
				this.$store.commit("searchHistoryArr")
			}
			
			this.isCollection();
			this.addRecentlyPlayed();
		},
		watch:{
			playedTime(){
				if(this.lyric){
					let height=0;
					if(this.lyric.length>11){
						for (let n=5;n<this.lyric.length;n++) {
					 height=height+this.$refs[n][0].offsetHeight+12;
					if(this.$refs[n][0].className=="lyricActive"&&this.$refs[n][0].offsetTop>=159&&n<this.lyric.length-6){
					this.$refs.songSecroll.scroll.scrollTo(0,-height,500);
					//console.log(height)
				}if(this.$refs[n][0].className=="lyricActive"&&this.$refs[n][0].offsetTop>=159&&n>=this.lyric.length-6){
					this.$refs.songSecroll.scroll.scrollTo(0,-this.$refs.lyric.offsetHeight+318,500);
				}
			}
					}
				}
				this.progressRoll();
				this.progressBtn();
			},
			onlineTime(){//判断是否循环播放
				//循环播放
				if(this.randomShow===1&&parseInt(this.onlineTime)>=parseInt(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].playTime/1000)){
					this.nextSong()
				//单曲循环
				}else if(this.randomShow===2&&parseInt(this.onlineTime)>=parseInt(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].playTime/1000)){
					this.getSong(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id);
					this.getLyric(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id);
					this.start()
				//随机播放
				}else if(this.randomShow===3&&parseInt(this.onlineTime)>=parseInt(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].playTime/1000)){
					this.lyric=null;
					let random=this.random(0,this.$store.state.songsInportantInfoArr.length-1);
					this.$store.commit("randomSongsIndex",random)
					console.log(random)
					this.getSong(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id);
					this.getLyric(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id);
					this.start()
				}
			}
		},
		computed:{
			playE(){
				let minutes=parseInt(Math.floor(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].playTime/1000)/60)
				let second=Math.floor(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].playTime/1000)%60;
				if(second<10){
					second="0"+second;
				}
				return minutes +":"+ second;
			},
		},
		methods:{
			getLyric(id){
				getLyric(id).then(res => {
					if(res.lrc){
						//this.lyric=res.lrc.lyric.replace(/\[\d{2}:\d{2}\.\d+\]/g,"").split("\n");
						//console.log(res)
						//console.log(res.lrc.lyric.replace(/\[\d{2}:\d{2}\.\d+\]/g,""))
						let medisArray = new Array();
						let medises=res.lrc.lyric.split("\n");
						medises.forEach((item,index)=>{
							let	t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
							if(item.substring(item.indexOf("]") + 1, item.length)){
								medisArray.push({
					      t: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
					      c: item.substring(item.indexOf("]") + 1, item.length)
					   });
							}
						})
						this.lyric=medisArray;
						this.noLyricShow=false;
						//console.log(medisArray)
					}else{
						this.noLyricShow=true;
						console.log("暂无歌词")
					}
					
				})
			},
			getSong(id){
			getSong(id).then(res=>{
			this.songUrl=res.data[0].url;
			//console.log(this.song)
			this.currentSongTime();
			this.progressRoll()
			this.progressBtn()
			})
		},
		progressRoll(){
			if(this.$refs.progress.style){
				let time=(this.$refs.barInner.offsetWidth/Math.floor(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].playTime/1000));
				this.$refs.progress.style.width=(time*this.onlineTime)*(100/this.$refs.barInner.offsetWidth)+'%';
//			this.progressRollTime=setInterval(()=>{
//				this.progressRollWidth=this.progressRollWidth+time;
//				this.$refs.progress.style.width=this.progressRollWidth+'px';
//				if(this.progressRollWidth>=185){
//					clearInterval(this.progressRollTime)
//				}
//			},1000)
			}
		},
		progressBtn(){
			if(this.$refs.progressBtn.style){
				let time=((this.$refs.barInner.offsetWidth-11)/Math.floor(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].playTime/1000));
				this.$refs.progressBtn.style.left=(time*this.onlineTime)*(100/this.$refs.barInner.offsetWidth)+'%';
//			this.progressBtnTime=setInterval(()=>{
//				//console.log(this.$refs.video.currentTime)
//				this.progressBtnLeft=this.progressBtnLeft+time;
//				this.$refs.progressBtn.style.left=this.progressBtnLeft+'px';
//				if(this.progressBtnLeft>=175){
//					clearInterval(this.progressBtnTime)
//					this.imgActive=!this.imgActive;
//				}
//			},1000)
			}
		},
			back(){
				this.$router.back()
			},
			stop(){
//						if(this.playStartTime||this.progressRollTime||this.progressBtnTime){
//						clearInterval(this.playStartTime);
//						clearInterval(this.progressRollTime);
//						clearInterval(this.progressBtnTime);
//						}
						this.imgActive=true;
						this.bofang=2;
						this.$refs.video.pause();
						//console.log(this.$refs.video)
			},
			start(){
				this.isCollection()
				this.imgActive=false;
				this.bofang=1;
				this.$refs.video.play();
			},
			lyricClick(){
				this.imgShow=!this.imgShow;
			},
			currentSongTime(){
				let athis=this;
				this.$refs.video.ontimeupdate=function(){
					athis.onlineTime=this.currentTime;
					let sec=Math.floor(this.currentTime);
					let mins=parseInt(sec/60);
					if(sec%60<10){
						athis.playedTime=mins+":"+"0"+sec%60;
					}else{
						athis.playedTime=mins+":"+sec%60;
					}
					//console.log(this.currentTime);
					//console.log(this.onlineTime);
				};
			},
			lastSong(){
				let songs=this.$store.state.songsInportantInfoArr;
				if(this.$store.state.songindex>=1){
					this.lyric=null;
					this.$store.commit("reduceSongsIndex")
					this.getSong(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id);
					this.getLyric(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id);
					this.start()
				}else if(this.$store.state.songindex==0){
					this.lyric=null;
					this.$store.commit("lastSongsIndex")
					this.getSong(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id);
					this.getLyric(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id);
					this.start()
				}	
			},
			nextSong(){
				this.isCollection()
				let songs=this.$store.state.songsInportantInfoArr;
				if(this.$store.state.songindex<songs.length-1){
					this.lyric=null;
					this.$store.commit("addSongsIndex")
					this.getSong(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id);
					this.getLyric(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id);
					this.start()
				}else if(this.$store.state.songindex==songs.length-1){
					this.lyric=null;
					this.$store.commit("clearSongsIndex")
					this.getSong(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id);
					this.getLyric(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id);
					this.start()
				}	
				//console.log(this.$store.state.songindex)
				//console.log(this.$store.state.songsInportantInfoArr)
			},
			barInnerClick(e){
				this.isCollection()
				let rest=this.$refs.barInner.getBoundingClientRect();// 这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。
				let offsetWidth=e.pageX-rest.x;
				this.$refs.video.currentTime=offsetWidth/this.$refs.barInner.offsetWidth*Math.floor(this.$store.state.songsInportantInfoArr[this.$store.state.songindex].playTime/1000);
				//console.log(offsetWidth)
			},
			random(min, max) {
     		 return Math.floor(Math.random() * (max - min)) + min;
    	},
    	filterRepeat(arr,prop){//对象数组去重
			  return arr.filter(function(element,index,self){
			    return self.findIndex(el=>el[prop]==element[prop])===index
			  })
			},
    	shoucangClick(){
			this.shoucang=2;
			let shoucangSong={
				id:this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id,
				songName:this.$store.state.songsInportantInfoArr[this.$store.state.songindex].songName,
				singerName:this.$store.state.songsInportantInfoArr[this.$store.state.songindex].singerName,
				picUrl:this.$store.state.songsInportantInfoArr[this.$store.state.songindex].picUrl,
				playTime:this.$store.state.songsInportantInfoArr[this.$store.state.songindex].playTime,
				shouCang:2,
			}
			
			if(localStorage.getItem("__shoucang__")===null){
				let song=[];
				song.push(shoucangSong);
				localStorage.setItem("__shoucang__",JSON.stringify(song))
			}
			else{
				let songsdata=JSON.parse(localStorage.getItem("__shoucang__"));
				songsdata.push(shoucangSong);
				songsdata=this.filterRepeat(songsdata,"id")
				localStorage.setItem("__shoucang__",JSON.stringify(songsdata))
			}
			
			//console.log(JSON.stringify(shoucangSong))
		},
		clearshoucangClick(){
			this.shoucang=1;
			let songsdata=JSON.parse(localStorage.getItem("__shoucang__"));
			songsdata.forEach((item,index) => {
					if(item.id===this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id){
						songsdata.splice(index,1)
						localStorage.setItem("__shoucang__",JSON.stringify(songsdata))
					}
				})
		},
		isCollection(){//判断是否为收藏歌曲
			let songsdata=JSON.parse(localStorage.getItem("__shoucang__"));
			let n=0;
			if(songsdata){
				songsdata.forEach((item,index) => {
					if(item.id===this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id){
						this.shoucang=2;
						n=1;
					}else if(n==0){
						this.shoucang=1;
					}
				})
			}
		},
		addRecentlyPlayed(){//添加到最近播放歌单
			let shoucangSong={
				id:this.$store.state.songsInportantInfoArr[this.$store.state.songindex].id,
				songName:this.$store.state.songsInportantInfoArr[this.$store.state.songindex].songName,
				singerName:this.$store.state.songsInportantInfoArr[this.$store.state.songindex].singerName,
				picUrl:this.$store.state.songsInportantInfoArr[this.$store.state.songindex].picUrl,
				playTime:this.$store.state.songsInportantInfoArr[this.$store.state.songindex].playTime,
			}
			if(localStorage.getItem("__recplayed__")===null){
				let song=[];
				song.push(shoucangSong);
				localStorage.setItem("__recplayed__",JSON.stringify(song))
			}else{
				let songsdata=JSON.parse(localStorage.getItem("__recplayed__"));
				songsdata.push(shoucangSong);
				songsdata=this.filterRepeat(songsdata,"id")
				localStorage.setItem("__recplayed__",JSON.stringify(songsdata))
			}
		}
		},
		
//		destroyed(){
//			if(this.progressRollTime||this.progressBtnTime){
//				clearInterval(this.progressRollTime);
//				clearInterval(this.progressBtnTime);
//			}
//		}
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
	.song{
		width: 100%;
		height: 568px;
		background:#d2d3d4;
		position: fixed;
	  z-index: 90;
	  top: 0;
	  left: 0;
	  bottom: 0;
	  right: 0;
	}
	.song .bgimg{
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: .7;
		filter: blur(60px);
	}
	.song .bgimg .filter{
		position: absolute;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: .6;
	}
	.song .bgimg img{
		width: 250%;
		height: 250%;
		margin-top: -50%;
		margin-left: -50%;
	}
	.song-nav{
		height: 50px;
		background-color: rgba(212,68,57,0);
		z-index: 99;
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		color: #f1f1f1;
		margin-bottom: 25px;
		
	}
	.song .song-nav .back{
		font-size: 28px;
		display: inline-block;
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
	.song .song-nav .title{
		display: inline-block;
		height: 50px;
		width: calc(100vw - 100px);
		position: absolute;
		top: 0;
		text-align: center;
	}
	.song .song-nav .title p{
		margin-top: 0;
		margin-bottom: 0;
	}
	.song .song-nav .title .song-name{
		height: 30px;
		line-height: 30px;
		font-weight: 700;
		font-size: 18px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.song .song-nav .title .singer-name{
		height: 20px;
		line-height: 20px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 12px;
	}
	.song .song-content{
		width: 100%;
		height: 100%;
		text-align: center;
		overflow: hidden;
		position: relative;
	}
	.song .scroll{
	position: absolute;
	width: 100%;
	height: 318px;
	overflow: hidden;
}
	.song .song-content img{
		margin-top: 49px;
		width: 220px;
		height: 220px;
		border-radius: 50%;
		border: 15px solid hsla(0,0%,100%,.1);
	}
	.song .song-content .noLyric{
		font-size: 24px;
		color: #f1f1f1;
		margin-top: 50%;
		font-weight: 600;
		opacity: .5;
		letter-spacing: 5px;
	}
	.song .song-content p{
		margin-top: 0;
		margin-bottom: 12px;
	}
	.song .song-content .active{
		animation: play 20s linear infinite;
	}
	.song .song-content .pause {
          animation-play-state: paused;
        }
	@keyframes play{
		0% {
    transform: rotate(0);
	}
	100% {
    transform: rotate(1turn);
		}
	}
	 .song-play{
		height: 90px;
		position: absolute;
		bottom: 50px;
		left: 0;
		right: 0;
	}
	 .song .progress-bar{
		width: 80%;
		height: 50px;
		margin-left: 10%;
		left: 10%;
		color: #dbdbdb;
		text-align: center;
	}
	 .song .progress-bar .playS{
		position: relative;
		font-size: 11px;
		display:inline-block;
		height: 30px;
		width: 30px;
		margin-top: 20px;
		line-height: 30px;
		text-align: left;
		padding-right:5px ;
	}
	 .progress-bar .bar-inner{
		position: relative;
		display: inline-block;
		width: 185px;
		height: 4px;
		top: -2px;
		background: rgba(0,0,0,.3);
	}
	.song .progress-bar .bar-inner{
		top: -2px;
	}
	 .progress-bar .bar-inner .progress{
		position: relative;
		height: 4px;
		left: 0px;
		background: #d44439;
	}
	.song .progress-bar .bar-inner .progress{
		width: 0px;
	}
	 .song .progress-bar .bar-inner .progress-btn{
		position: relative;
		top: -10px;
		left: 0px;
		box-sizing: border-box;
		width: 16px;
		height: 16px;
		border: 5px solid #f1f1f1;
		border-radius: 50%;
		background: #d44439;

	}
	.song  .progress-bar .bar-inner{
		height: 4px;
	}
	.song  .progress-bar .bar-inner .progress{
		height: 4px;
	}

	.song .progress-bar .playE{
		position: relative;
		font-size: 11px;
		display:inline-block;
		height: 30px;
		width: 30px;
		margin-top: 20px;
		line-height: 30px;
		text-align: right;
		padding-left:5px ;
	}
	.song .song-play .operate{
		margin-top: 10px;
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: space-around;
	}
	.song .lyricActive{
		font-size: 18px;
		color: #f1f1f1;
	}
</style>