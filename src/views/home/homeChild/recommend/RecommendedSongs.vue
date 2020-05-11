<template>
	<div class="recommended-song">
		<div class="recommended-song-title">
			<span>推荐歌曲</span>
		</div>
		
		<div class="recommended-song-list">
			<div class="song-list" v-for="(item,index) in recommendedsongs" :key="item.id"
				@click="recommendedSongClick(item.id,item.name,item.song.artists[0].name,item.picUrl,item.song.bMusic.playTime)">
				<div class="song-img">
					<img v-lazy="item.picUrl" />
				</div>
				<div class="song-name">
					<p class="name">{{item.name}}</p>
					<p class="artists">{{item.song.artists[0].name}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			recommendedsongs:{
				type:Array,
				default(){
					return []
			}
		}
		},
		methods:{
			recommendedSongClick(songId,songName,singerName,songImg,playTime){
				let songsInportantInfoArr=[];
						let songSheetInportantInfo={
						id:songId,
						songName:songName,
						singerName:singerName,
						picUrl:songImg,
						playTime:playTime
					}
						songsInportantInfoArr.push(songSheetInportantInfo);
					//console.log(songsInportantInfoArr)

						this.$store.commit("songsInportantInfoArr",songsInportantInfoArr)
				
				
				this.$router.push("/song");
//				this.$store.commit("songData",{
//					songId,
//					songName,
//					singerName,
//					songImg,
//					playTime
//				})
		},
		}
	}
</script>

<style scoped>
	.recommended-song{
		width: 100%;
		background: #F1F1F1;
	}
	.recommended-song-title {
		width: 100%;
		height: 65px;
		background: #f1f1f1;
	}
	.recommended-song-title span{
		line-height: 65px;
		margin-left: 5px;
	}
	.recommended-song-list{
		width: 100%;
		display: flex;
		flex-wrap:wrap;
		justify-content:space-between;
	}
	.song-list{
		width: 31%;
		height: 180px;
		background: #f1f1f1;
		margin-left: 3.33px;
		margin-right: 3.33px;
		border-radius: 5px;
		position: relative;
	}
	.song-list .song-img{
		width: 100%;
		height: 130px;
		border-radius: 5px;
		position: relative;
		margin-bottom: 0px;
	}
	.song-list .song-img img{
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}
	
	.song-name{
		width: 100px;
		height: 50px;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		text-align: left;
	}
	.song-name .name{
		font-size: 11px;
		font-weight: 400;
		font-family: PingFang SC,STHeitiSC-Light,Helvetica-Light,arial,sans-serif;
		color: #2e3030;
		line-height: 16px;
		text-align: left;
		height: 16px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.artists{
		line-height: 16px;
		margin-bottom: 10px;
		text-align: left;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-size: 11px;
		color: #757575;
		opacity: 0.8;
		margin-top: -10px;
		margin-bottom: 10px;
	}
</style>