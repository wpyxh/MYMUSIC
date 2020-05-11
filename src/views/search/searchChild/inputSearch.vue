<template>
	<div class="input-search">
		<p class="best-march">最佳匹配</p>
		<div class="search-songs">
			<div class="search-song-item" v-for="(item,index) in this.$store.state.searchSongsInportantInfoArr"
				@click="searchSongItemClick(item.id)">
				<p class="song-name">{{item.songName}}</p>
				<p class="singer-name">{{item.singerName}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import {getSong,getSongInfo} from '@/network/song.js'
	export default{
		data(){
			return {
				songId:null,
				a:null,
			}
		},
		methods:{
			searchSongItemClick(id){
				getSongInfo(id).then(res => {
					//console.log(res)
					let songsInportantInfoArr=[];
					for(let i=0;i<res.songs.length;i++){
						let songSheetInportantInfo={
						id:res.songs[i].id,
						songName:res.songs[i].name,
						singerName:res.songs[i].ar[0].name,
						picUrl:res.songs[i].al.picUrl,
						playTime:res.songs[i].dt
						}
						songsInportantInfoArr.push(songSheetInportantInfo);
					}
					//console.log(songsInportantInfoArr)

						this.$store.commit("songsInportantInfoArr",songsInportantInfoArr)

					//console.log(res.songs[0].name,res.songs[0].ar[0].name,res.songs[0].al.picUrl,res.songs[0].dt)
//					this.$store.commit("songData",{
//					songId:this.songId,
//					songName:res.songs[0].name,
//					singerName:res.songs[0].ar[0].name,
//					songImg:res.songs[0].al.picUrl,
//					playTime:res.songs[0].dt
//				})
             	this.$router.push("/song");
				})
			}
		}
	}
</script>

<style scoped>
	.input-search{
		position: relative;
	}
	.input-search .best-march{
		margin: 0;
		padding-top: 20px;
		padding-left: 20px;
		padding-bottom: 10px;
		color: #d44439;
		font-size: 11px;
	}
	.input-search .search-song-item{
		display: flex;
		position: relative;
		padding: 3px 20px;
		height: 50px;
		align-items: center;
		border-bottom: 1px solid #e4e4e4;
	}
	.input-search .song-name{
		width: 280px;
		margin: 0;
		padding: 0;
		position: absolute;
		top: 5px;
		font-size: 16px;
		color: #2e3030;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 3px 0;
	}
	.input-search .singer-name{
		margin: 0;
		padding: 0;
		position: absolute;
		bottom: 5px;
		font-size: 12px;
		color: #757575;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 3px 0;
	}
</style>