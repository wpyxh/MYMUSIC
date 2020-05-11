<template>
	<div class="my-collection">
		<div class="songs-title">
			<i class="el-icon-video-play"></i>
			<span>播放全部(共{{songsLength}}首)</span>
		</div>
		
		<div class="song-item" v-for="(item,index) in shoucangSongs" @click="songClick(index)">
			<span class="index">{{index+1}}</span>
			<div class="song-item-name">
				<p class="song-name">{{item.songName}}</p>
			 	<p class="artist-name">{{item.singerName}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				songsLength:0,
				shoucangSongs:[],
			}
		},
		created(){
			this.collection();
		},
		methods:{
			collection(){
				let songsdata=songsdata=JSON.parse(localStorage.getItem("__shoucang__"));
				this.songsLength=songsdata.length;
				this.shoucangSongs=songsdata;
				this.$store.commit("songsInportantInfoArr",songsdata)
			},
			songClick(index){
				this.$store.commit("randomSongsIndex",index)
				this.$router.push("/song")
			}
		}
	}
</script>

<style scoped>
	.my-collection{
		width: 100%;
		background:#f2f3f4;
		z-index: 9999;
		position: relative;	
	}
	.my-collection .songs-title{
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		height: 40px;
		padding-left: 16px;
		border-bottom: 1px solid #e4e4e4;
		overflow: hidden;
	}
	.my-collection .songs-title i,span{
		position: relative;
		font-size: 24px;
		line-height: 40px;
		padding-right: 14px;
	}
	.my-collection .songs-title span{
		font-size: 16px;
		top: -2px;
	}
	.my-collection .song-item{
		width: 100%;
		height: 60px;
		padding-left: 16px;
		border-bottom: 1px solid #e4e4e4;
		position: relative;
	}
	.my-collection .song-item .index{
		padding-right: 14px;
		color: #757575;
		line-height: 60px;
		font-size: 16px
	}
	.my-collection .song-item .song-item-name{
		display: inline-block;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		width: 200px;
		height: 40px;
	}
	.my-collection .song-item .song-item-name .song-name{
		position: absolute;
		top: 0px;
		left: 0;
		font-size: 16px;
		width: 280px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin: 0;
	}
	.my-collection .song-item .song-item-name .artist-name{
		position: absolute;
		bottom: 0px;
		left: 0;
		font-size: 12px;
		color: #757575;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin: 0;
		}
</style>