<template>
	<div class="recommend-song">
		<div class="recommend-song-title">
			<span>推荐歌单</span>
		</div>
		
		<div class="recommend-song-list" @click="recommendSongList">
			<div class="song-list" v-for="(item,index) in recommendsongs" :key="item.id"  
				@click="songListClick(item.id,item.picUrl,item.playCount,item.name,item)">
				<div class="song-img">
					<img v-lazy="item.picUrl" />
					<div class="playCount">
						<i class="el-icon-headset"></i>
					<span>{{Math.floor(item.playCount / 10000) }}万</span>
					</div>
					
				</div>
				<div class="song-name">
					<span>{{item.name}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			recommendsongs:{
				type:Array,
				default(){
					return []
			}
		}
		},
		methods:{
			recommendSongList(){
				//document.body.style.background="#f1f1f1";
				//console.log(document.body)
				this.$router.push("/SongSheet")
			},
			songListClick(id,imgUrl,playCount,name,item){
				//console.log(item)
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
	.recommend-song{
		background: #F1F1F1;
	}
	.recommend-song-title {
		width: 100%;
		height: 65px;
		background: #f1f1f1;
	}
	.recommend-song-title span{
		line-height: 65px;
		margin-left: 5px;
	}
	.recommend-song-list{
		width: 100%;
		display: flex;
		justify-content:space-between;
		flex-wrap: wrap;
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
	.song-list .song-img .playCount{
		position: absolute;
		font-size: 8px;
		top: 5px;
		right: 8px;
		color: #f1f1f1;
	}
	.song-list .song-img i{
		margin-right: 3px;
	}
	.song-list .song-img img{
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}
	
	.song-name{
		width: 100px;
		height: 40px;
		position: relative;
		text-align: left;
	}
	.song-name span{
		font-size: 11px;
		font-weight: 400;
		position: absolute;
		top: 10px;
		font-family: PingFang SC,STHeitiSC-Light,Helvetica-Light,arial,sans-serif;
		color: #2e3030;
	}
</style>